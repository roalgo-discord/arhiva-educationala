"""Generează paginile-index cu soluțiile OJI/ONI, grupate pe clasă.

Rulează `python solutions_index.py` din rădăcina proiectului după ce ai adăugat
articolele unui an nou în `mkdocs.yml`; scriptul rescrie cele 14 pagini din
`docs/olimpiada/solutii/{oji,oni}-clasa-*.md`.

Ordinea problemelor și împărțirea pe zile de concurs vin din câmpul
`source_credits` de pe Kilonova (ex. "ONI 2010 IX: Ziua 1 Problema 1"), citit
prin API și păstrat în cache-ul local `data/kilonova-sources.json`.
"""

import json
import re
import textwrap
import urllib.request
from collections import defaultdict
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

ROOT = Path(__file__).parent
MKDOCS = ROOT / "mkdocs.yml"
OUT_DIR = ROOT / "docs" / "olimpiada" / "solutii"
CACHE = ROOT / "data" / "kilonova-sources.json"

GRADES = ["V", "VI", "VII", "VIII", "IX", "X", "XI-XII"]
NAV_RE = re.compile(r"^\s*- (.+?): (olimpiada/solutii/(?:OJI|ONI)/.+\.md)\s*$")

# Prefixul din numele fișierului → clasele la care s-a dat problema. La ONI 2001
# gimnaziul a concurat pe grupe de două clase, deci aceleași probleme apar în
# două tabele. Ordinea contează: prefixele mai lungi trebuie testate primele.
PREFIXES = [
    ("XI-XII", ["XI-XII"]),
    ("VII-VIII", ["VII", "VIII"]),
    ("V-VI", ["V", "VI"]),
    ("VIII", ["VIII"]),
    ("VII", ["VII"]),
    ("VI", ["VI"]),
    ("V", ["V"]),
    ("IX", ["IX"]),
    ("X", ["X"]),
]

GRADE_LABEL = {
    "V": "clasa a V-a",
    "VI": "clasa a VI-a",
    "VII": "clasa a VII-a",
    "VIII": "clasa a VIII-a",
    "IX": "clasa a IX-a",
    "X": "clasa a X-a",
    "XI-XII": "clasele XI-XII",
}

CONTEST_NAME = {
    "OJI": "Olimpiada Județeană de Informatică (OJI)",
    "ONI": "Olimpiada Națională de Informatică (ONI)",
}

GRADE_TAG = {"XI-XII": "clasele XI-XII"}


# ---------------------------------------------------------------- date de intrare


def read_nav():
    """Lista (etichetă, cale) a articolelor de soluții, în ordinea din mkdocs.yml."""
    entries = []
    for line in MKDOCS.read_text(encoding="utf-8").splitlines():
        match = NAV_RE.match(line)
        if not match:
            continue
        label = match.group(1).strip()
        if len(label) > 1 and label[0] == label[-1] and label[0] in ('"', "'"):
            label = label[1:-1]
        entries.append((label, match.group(2)))
    return entries


def problem_id(path):
    text = (ROOT / "docs" / path).read_text(encoding="utf-8")
    return int(re.search(r"^problem_id: *(\d+)", text, re.M).group(1))


def kilonova_sources(pids):
    """`source_credits` pentru fiecare problemă, cu cache pe disc."""
    cache = json.loads(CACHE.read_text(encoding="utf-8")) if CACHE.exists() else {}
    missing = [pid for pid in pids if str(pid) not in cache]

    def fetch(pid):
        url = f"https://kilonova.ro/api/problem/{pid}"
        with urllib.request.urlopen(url, timeout=30) as response:
            data = json.load(response)
        if data.get("status") != "success":
            raise RuntimeError(f"Kilonova a răspuns cu eroare pentru #{pid}")
        return pid, data["data"].get("source_credits", "")

    if missing:
        print(f"Descarc {len(missing)} surse de pe Kilonova...")
        with ThreadPoolExecutor(8) as pool:
            for pid, source in pool.map(fetch, missing):
                cache[str(pid)] = source
        CACHE.parent.mkdir(parents=True, exist_ok=True)
        CACHE.write_text(
            json.dumps(cache, ensure_ascii=False, indent=0, sort_keys=True),
            encoding="utf-8",
        )
    return cache


def grades_of(filename):
    """(prefixul din nume, clasele la care se dă problema)."""
    for prefix, grades in PREFIXES:
        if filename.startswith(prefix + "-"):
            return prefix, grades
    raise ValueError(f"Nu recunosc clasa din numele {filename}")


def collect():
    """{(concurs, clasă): {an: {(zi, prefix): {număr problemă: (etichetă, cale)}}}}"""
    entries = read_nav()
    pids = {path: problem_id(path) for _, path in entries}
    sources = kilonova_sources(sorted(set(pids.values())))

    data = defaultdict(lambda: defaultdict(lambda: defaultdict(dict)))
    for label, path in entries:
        _, _, contest, year, filename = path.split("/")
        prefix, grades = grades_of(filename)
        source = sources[str(pids[path])]
        day = re.search(r"[Zz]iua *(\d+)", source)
        number = int(re.search(r"[Pp]roblema *(\d+)", source).group(1))
        key = (int(day.group(1)) if day else 0, prefix)
        for grade in grades:
            data[(contest, grade)][int(year)][key][number] = (label, path)
    return data


# ------------------------------------------------------------------- generare text


def table(years, grade, show_day, width):
    """Tabel markdown cu un rând per (an, zi), de la cel mai recent an."""
    head = ["An"] + (["Ziua"] if show_day else [])
    head += [f"Problema {i}" for i in range(1, width + 1)]
    lines = [
        "| " + " | ".join(head) + " |",
        "| " + " | ".join("-" * max(len(cell), 3) for cell in head) + " |",
    ]
    for year in sorted(years, reverse=True):
        for day, prefix in sorted(years[year]):
            # Anii în care clasa a concurat împreună cu alta sunt marcați ca atare.
            combined = "" if prefix == grade else f" (clasele {prefix})"
            row = [f"{year}{combined}"] + ([f"Ziua {day}"] if show_day else [])
            problems = years[year][(day, prefix)]
            for i in range(1, width + 1):
                if i not in problems:
                    row.append("—")
                    continue
                label, path = problems[i]
                row.append(f"[{label}]({path.replace('olimpiada/solutii/', './')})")
            lines.append("| " + " | ".join(row) + " |")
    return "\n".join(lines)


def wrap(text):
    """Paragrafe încadrate la 80 de coloane, ca restul articolelor din arhivă."""
    paragraphs = re.split(r"\n\s*\n", text.strip())
    return "\n\n".join(
        textwrap.fill(
            " ".join(p.split()),
            width=80,
            break_long_words=False,
            break_on_hyphens=False,
        )
        for p in paragraphs
    )


def width_of(years):
    return max(
        (max(problems) for days in years.values() for problems in days.values()),
        default=0,
    )


def page(contest, grade, years, about):
    out = [
        "---",
        f"title: Soluții {CONTEST_NAME[contest]}, {GRADE_LABEL[grade]}",
        "tags:",
        "    - meta",
        f"    - {contest}",
        f"    - {GRADE_TAG.get(grade, 'clasa ' + grade)}",
        "---",
        "",
        "## Despre",
        "",
        wrap(about),
        "",
    ]

    multi_day = {y: d for y, d in years.items() if any(day > 0 for day, _ in d)}
    single_day = {y: d for y, d in years.items() if y not in multi_day}

    if multi_day and single_day:
        out += [
            f"## Soluții ({min(single_day)}–{max(single_day)})",
            "",
            table(single_day, grade, False, width_of(single_day)),
            "",
            f"## Soluții ({min(multi_day)}–{max(multi_day)})",
            "",
            wrap(
                "În acei ani proba de concurs se desfășura pe parcursul a două"
                " zile, fiecare zi având propriul set de probleme."
            ),
            "",
            table(multi_day, grade, True, width_of(multi_day)),
            "",
        ]
    else:
        show_day = bool(multi_day)
        out += ["## Soluții", "", table(years, grade, show_day, width_of(years)), ""]

    return "\n".join(out)


# --------------------------------------------------------------------------- texte

COMMON = (
    "Fiecare problemă din tabelele de mai jos are propria pagină în arhivă, cu"
    " editorialul oficial atașat și cu o soluție care obține punctajul maxim."
    " Articolele scrise de noi, cu explicații pas cu pas, sunt adăugate treptat —"
    " dacă vrei să contribui cu unul, găsești detaliile în"
    " [ghidul de contribuție](https://github.com/roalgo-discord/arhiva-educationala/blob/main/CONTRIBUTING.md)."
)

ABOUT = {
    ("OJI", "V"): """
Aici găsești soluțiile problemelor date la etapa județeană a Olimpiadei de
Informatică pentru clasa a V-a, începând cu prima ediție din 2002. La această
clasă se dau două probleme, iar subiectele se pot rezolva folosind exclusiv
noțiunile din programa clasei a V-a.

Temele care apar cel mai des sunt prelucrarea cifrelor unui număr,
divizibilitatea, matematica elementară, instrucțiunile repetitive și simularea
directă a enunțului. Sunt frecvente și problemele ad-hoc, la care partea
dificilă este observația care simplifică enunțul, nu implementarea.
""",
    ("OJI", "VI"): """
Aici găsești soluțiile problemelor date la etapa județeană a Olimpiadei de
Informatică pentru clasa a VI-a, începând cu 2002. La această clasă se dau două
probleme, iar rezolvările folosesc noțiunile din programa clasei a VI-a.

Pe lângă temele de clasa a V-a, apar acum vectorii de frecvență, sumele
parțiale, tablourile unidimensionale și ciurul lui Eratostene. Multe subiecte
cer o simulare atentă a enunțului, combinată cu o preprocesare care face
răspunsurile la întrebări imediate.
""",
    ("OJI", "VII"): """
Aici găsești soluțiile problemelor date la etapa județeană a Olimpiadei de
Informatică pentru clasa a VII-a, începând cu 2002. La această clasă se dau două
probleme.

Temele întâlnite frecvent sunt simularea, sumele parțiale, vectorii de
frecvență, tablourile bidimensionale, sortarea și căutarea binară. Apar și
primele probleme la care o soluție de forță brută nu mai încape în limita de
timp, așa că e nevoie de o observație care reduce complexitatea.
""",
    ("OJI", "VIII"): """
Aici găsești soluțiile problemelor date la etapa județeană a Olimpiadei de
Informatică pentru clasa a VIII-a, începând cu 2002. La această clasă se dau
două probleme, iar programa permite acum și subprograme, structuri și lucrul cu
șiruri de caractere.

Cele mai frecvente teme sunt șirurile de caractere, divizibilitatea, sumele
parțiale, vectorii de frecvență, sortarea și structurile de date din STL.
Nivelul de dificultate este apropiat de cel al claselor de liceu, iar
problemele cer de multe ori combinarea a două idei diferite.
""",
    ("OJI", "IX"): """
Aici găsești soluțiile problemelor date la etapa județeană a Olimpiadei de
Informatică pentru clasa a IX-a, începând cu 2002. Până în 2016 se dădeau două
probleme, iar din 2017 încoace se dau trei.

Temele care apar cel mai des sunt matematica elementară și divizibilitatea,
simularea enunțului, problemele ad-hoc, matricile, ciurul lui Eratostene, sumele
parțiale, sortarea, căutarea binară, algoritmii greedy și operațiile pe biți.
Fiind primul an de liceu, accentul cade pe idei clare și implementări scurte, nu
pe algoritmi avansați.
""",
    ("OJI", "X"): """
Aici găsești soluțiile problemelor date la etapa județeană a Olimpiadei de
Informatică pentru clasa a X-a, începând cu 2002. Până în 2016 se dădeau două
probleme, iar din 2017 încoace se dau trei.

Programa clasei a X-a aduce recursivitatea, backtracking-ul și primele noțiuni
de programare dinamică, așa că acestea apar des în subiecte, alături de șiruri
de caractere, combinatorică, parcurgerea matricilor prin algoritmul lui Lee,
stive și cozi, evaluarea expresiilor și structurile de date din STL.
""",
    ("OJI", "XI-XII"): """
Aici găsești soluțiile problemelor date la etapa județeană a Olimpiadei de
Informatică pentru clasele XI-XII, începând cu 2002. Până în 2016 se dădeau două
probleme, iar din 2017 încoace se dau trei.

La acest nivel intră în joc toată programa de liceu: programarea dinamică,
grafurile și arborii, drumurile minime, sortarea topologică, combinatorica,
algoritmii greedy, geometria elementară și structurile de date. Subiectele sunt
de regulă cele mai dificile de la OJI, iar diferența dintre un punctaj bun și
unul foarte bun se face adesea pe optimizări de complexitate.
""",
    ("ONI", "V"): """
Aici găsești soluțiile problemelor date la etapa națională a Olimpiadei de
Informatică pentru clasa a V-a. Arhiva acoperă edițiile din 2001 încoace (ONI
2020 nu s-a desfășurat, din cauza pandemiei). În primii ani se dădeau două
probleme, iar din 2003 se dau trei; în 2001 clasele a V-a și a VI-a au concurat
împreună, pe același set de subiecte.

Temele sunt aceleași ca la faza județeană — cifre, divizibilitate, matematică
elementară, simulare — dar problemele sunt sensibil mai grele: de obicei e
nevoie de o observație suplimentară sau de o reformulare a enunțului pentru a
obține punctajul maxim.
""",
    ("ONI", "VI"): """
Aici găsești soluțiile problemelor date la etapa națională a Olimpiadei de
Informatică pentru clasa a VI-a. Arhiva acoperă edițiile din 2001 încoace (ONI
2020 nu s-a desfășurat, din cauza pandemiei). Din 2003 încoace se dau trei
probleme; în 2001 clasele a V-a și a VI-a au concurat împreună, pe același set de
subiecte.

Apar frecvent vectorii de frecvență, sumele parțiale, tablourile, ciurul lui
Eratostene și problemele de simulare cu multe cazuri particulare. Multe subiecte
sunt de tip ad-hoc și răsplătesc elevii care observă o proprietate matematică
simplă a enunțului.
""",
    ("ONI", "VII"): """
Aici găsești soluțiile problemelor date la etapa națională a Olimpiadei de
Informatică pentru clasa a VII-a. Arhiva acoperă edițiile din 2001 încoace (ONI
2020 nu s-a desfășurat, din cauza pandemiei). Din 2003 încoace se dau trei
probleme; în 2001 clasele a VII-a și a VIII-a au concurat împreună, pe același
set de subiecte.

Temele obișnuite sunt simularea, matricile, sumele parțiale, vectorii de
frecvență, sortarea, căutarea binară și șirurile de caractere. Spre deosebire de
faza județeană, aici aproape fiecare problemă are nevoie de o soluție eficientă,
iar forța brută obține doar punctaje parțiale.
""",
    ("ONI", "VIII"): """
Aici găsești soluțiile problemelor date la etapa națională a Olimpiadei de
Informatică pentru clasa a VIII-a. Arhiva acoperă edițiile din 2001 încoace (ONI
2020 nu s-a desfășurat, din cauza pandemiei). Din 2003 încoace se dau trei
probleme; în 2001 clasele a VII-a și a VIII-a au concurat împreună, pe același
set de subiecte.

Subiectele combină șirurile de caractere, structurile de date din STL,
divizibilitatea, sumele parțiale, tehnica celor două pointere și problemele de
tip greedy. Este cel mai dificil nivel de gimnaziu, iar problemele se apropie
uneori de nivelul claselor de liceu.
""",
    ("ONI", "IX"): """
Aici găsești soluțiile problemelor date la etapa națională a Olimpiadei de
Informatică pentru clasa a IX-a. Arhiva pornește de la ONI 1998 și acoperă toate
edițiile de la 2000 încoace (ONI 2020 nu s-a desfășurat, din cauza pandemiei).

Până în 2019 concursul avea două zile de probă, cu trei probleme în fiecare zi,
deci șase probleme pe ediție; din 2021 se dau trei probleme într-o singură zi.
Temele frecvente sunt matematica și divizibilitatea, algoritmii greedy,
matricile, sumele parțiale, sortarea, căutarea binară, precum și primele
probleme de programare dinamică și de grafuri.
""",
    ("ONI", "X"): """
Aici găsești soluțiile problemelor date la etapa națională a Olimpiadei de
Informatică pentru clasa a X-a. Arhiva pornește de la ONI 1998 și acoperă toate
edițiile de la 2000 încoace (ONI 2020 nu s-a desfășurat, din cauza pandemiei).

Până în 2019 concursul avea două zile de probă, cu trei probleme în fiecare zi,
deci șase probleme pe ediție; din 2021 se dau trei probleme într-o singură zi.
Subiectele se învârt în jurul programării dinamice, backtracking-ului,
combinatoricii, parcurgerilor pe matrice și în grafuri, șirurilor de caractere și
structurilor de date din STL.
""",
    ("ONI", "XI-XII"): """
Aici găsești soluțiile problemelor date la etapa națională a Olimpiadei de
Informatică pentru clasele XI-XII, începând cu ediția din 2000 (ONI 2020 nu s-a
desfășurat, din cauza pandemiei).

Până în 2019 concursul avea două zile de probă, cu trei probleme în fiecare zi,
deci șase probleme pe ediție; din 2021 se dau trei probleme într-o singură zi.
Sunt cele mai dificile subiecte din olimpiada națională: programare dinamică pe
stări, grafuri și arbori, drumuri minime, arbori de intervale și arbori indexați
binar, păduri de mulțimi disjuncte, geometrie și probleme de tip constructiv.
""",
}


def main():
    data = collect()
    for contest in ("OJI", "ONI"):
        for grade in GRADES:
            years = data[(contest, grade)]
            if not years:
                continue
            about = ABOUT[(contest, grade)].strip() + "\n\n" + COMMON
            out = OUT_DIR / f"{contest.lower()}-clasa-{grade}.md"
            out.write_text(page(contest, grade, years, about) + "\n", encoding="utf-8")
            total = sum(len(p) for d in years.values() for p in d.values())
            print(f"{out.relative_to(ROOT)}: {len(years)} ediții, {total} probleme")


if __name__ == "__main__":
    main()
