---
id: suffix-array-tree
authors: [moncalc]
tags:
    - structuri de date
    - siruri de caractere
---

!!! info "Disclaimer"

    Cu scopul de a micșora mărimea finală a articolului și deoarece cititorii
    cărora le este adresat acest articol ar trebui să fie informaticieni
    capabili, unele detalii de implementare nu vor fi discutate aici.

## Introducere

Șirul de sufixe (în engleză _suffix array_) reprezintă o structură de date
foarte versatilă ce se dovedește utilă în rezolvarea problemelor dificile pe
șiruri de caractere, dar nu numai. Această structură de date este folosită ca un
înlocuitor al arborelui de sufixe și are avantajul că folosește mai puțină
memorie, este mai ușoară de înțeles și implementarea durează mult mai puțin
comparativ cu acesta. În plus, împreună cu șirul $LCP$, care va fi de asemenea
explicat în acest articol, putem rezolva majoritatea problemelor pe care le
poate rezolva arborele de sufixe. Problemele care nu pot fi rezolvate doar cu
șirul de sufixe sunt adesea extrem de dificile și nu se dau în concursuri.

!!!info "Definiție" 

      Șirul de sufixe al unui șir este format din indicii
      sufixelor sortate în ordine lexicografică.

Spre exemplu, considerăm șirul de sufixe al stringului $banana$:

| Poziție în suffix array | Indicele de la care începe sufixul |  Sufixul |
| :---------------------- | :--------------------------------: | -------: |
| 0                       |                 5                  |      $a$ |
| 1                       |                 3                  |    $ana$ |
| 2                       |                 1                  |  $anana$ |
| 3                       |                 0                  | $banana$ |
| 4                       |                 4                  |     $na$ |
| 6                       |                 2                  |   $nana$ |

Astfel, suffix array-ul șirului este $5, 3, 1, 0, 4, 2$. Se observă că deoarece
toate sufixele au lungimi diferite, acest rezultat este unic.

Algoritmul pe care îl vom folosi pentru construire are defapt scopul de a sorta
în ordine lexicografică rotațiile circulare are șirului. Prin introducerea unui
caracter santinelă mai mic decât toate celelalte la final putem folosi acest
algoritm pentru a sorta sufixele, corectitudinea provenind din faptul că
santinela apare pe poziții diferite pentru fiecare rotație. Să observăm exemplul
de mai jos pentru stringul $banana$, unde am luat caracterul $ ca santinelă.

| Indicele de la care începe rotația |           Rotația |
| :--------------------------------: | ----------------: |
|                 6                  | $\text{\$banana}$ |
|                 5                  | $\text{a\$banan}$ |
|                 3                  | $\text{ana\$ban}$ |
|                 1                  | $\text{anana\$b}$ |
|                 0                  | $\text{banana\$}$ |
|                 4                  | $\text{na\$bana}$ |
|                 2                  | $\text{nana\$ba}$ |

!!! info "Observație"

    Se observa că ordinea este identică dupa ce ștergem primul element din
    tablou. Rotația ce începe cu santinela va fi mereu prima și nu ne modifică
    rezultatul.

## Construire

Sortarea va fi realizată în $\lceil{\log_2(N)}\rceil$ pași, unde $N$ este
mărimea șirului, la pasul $i$ având sortate rotațiile dupa prefixele lor de
lungime $2^i$. Pentru a ne ușura munca introducem conceptul de clase de
echivalență, fiecarui șir fiindu-i atribuit un număr natural, fie el $C_i$
pentru rotația ce începe din $i$, pe care le recalculăm la fiecare iterație a
sortării. Aceste clase de echivalență au următoarele proprietăți : dacă un șir
este mai mic lexicografic decât altul atunci are o clasă de echivalență mai mică
iar dacă două șiruri sunt egale atunci au aceeași clasă de echivalență. În plus,
numarul de clase de echivalență folosite trebuie să fie minim. Bazându-ne pe
aceste proprietăți, la pasul $i$ putem sorta prefixele rotațiilor folosind o
metodă similară cu radixsort : împărțim prefixul de lungime $2^i$ în două bucăți
de lungime $2^{i-1}$ și le sortăm întai după bucata din dreapta apoi după bucata
din stânga. Mare atenție : aceste sortări trebuie să nu schimbe ordinea relativă
în caz de egalitate, altfel se duce totul de râpă. Astfel, din proprietatea 3 a
claselor de echivalență știim că nu vor depăși niciodată valoarea $N$ și putem
folosi metode de sortare în $\mathcal{O}(N)$ precum counting sort sau, ce recomand eu,
doar ținem un vector de vectori unde $V_i = $ vectorul indicilor sufixelor ale
căror clasă de echivalență pe care o comparăm este $i$. Astfel, complexitatea de
timp este $\mathcal{O}(N \log_2{N})$ iar cea de spațiu este $\mathcal{O}(N)$.

## Câteva detalii de implementare

Pentru a obține clasele jumătăților prefixelor este necesar să lucrăm cu indici
modulo $N$. Spre exemplu, dacă $N = 5$, suntem la pasul 2 și ne dorim să obținem
clasele pentru jumătățile corespunzătoare prefixului rotației 3 atunci acestea
vor fi clasa rotației 3 în pasul 1 respectiv clasa lui $3 + 2 ^ 1 \equiv 0
\pmod{N}$ în pasul 1. Este lăsat ca demonstrație pentru cititor de ce algoritmul
rămâne corect și după pasul $\lceil{\log_2(N)}\rceil$ în care este posibil ca
jumătățile să se intersecteze. Vă puteți testa implementarea
[aici](https://judge.yosupo.jp/problem/suffixarray) și aveți mai jos
implementarea mea :

```cpp
void reorder(vector<int> r[], vector<int> &p) {
    for (int i = 0, cnt = 0; i < max((int)p.size(), 300); i++) {
        for (auto &it : r[i]) {
            p[cnt++] = it;
        }
        r[i].clear();
    }
}

vector<int> suffix(string s) {
    s += "$";
    int n = s.size();
    vector<int> c(n), p(n), nc(n), r[max(n, 300)];

    for (int i = 0; i < n; i++) {
        r[s[i]].emplace_back(i);
    }
    reorder(r, p);
    c[p[0]] = 0;

    for (int i = 1; i < n; i++) {
        c[p[i]] = c[p[i - 1]] + (int)(s[p[i]] != s[p[i - 1]]);
    }

    for (int len = 1; len < n; len <<= 1) {
        for (int i = 0; i < n; i++) {
            r[c[(p[i] + len) % n]].emplace_back(p[i]);
        }
        reorder(r, p);

        for (int i = 0; i < n; i++) {
            r[c[p[i]]].emplace_back(p[i]);
        }
        reorder(r, p);
        nc[p[0]] = 0;

        for (int i = 1; i < n; i++) {
            pair<int, int> last = {c[p[i - 1]], c[(p[i - 1] + len) % n]};
            pair<int, int> now = {c[p[i]], c[(p[i] + len) % n]};
            nc[p[i]] = nc[p[i - 1]] + (int)(last != now);
        }

        c.swap(nc);
    }

    p.erase(p.begin());
    return p;
}
```

## Aplicații elementare ale șirului de sufixe

Atenție: pentru toate aplicațiile de mai jos mai puțin prima este necesar să
păstrăm șirul de clase de la fiecare pas al sortării.

### Rotația circulară minim lexicografică

Putem să nu adăugăm santinela la finalul șirului iar astfel vom obține pe prima
poziție rotația minim lexicografică.

### Compararea a două subsecvențe

Fie $M$ minimul lungimilor subsecvențelor și $l = \lfloor \log_2{M} \rfloor$. Ca
la $RMQ$, putem compara cele două subsecvențe comparând perechile
corespunzătoare bucăților în care le împarțim folosind clasele de la pasul $l$.
$\mathcal{O}(1)$ pe query.

### Cel mai lung prefix comun dintre două subsecvențe

Cautăm binar pe lungimea răspunsului și ne folosim de aplicația 2 pentru a
verifica dacă subsecvențele corespunzătoare sunt egale. $\mathcal{O}(\log_2{N})$ pe query.

## Șirul LCP

Șirul $LCP$ este o structură de date auxiliară șirului de sufixe ce ne deschide
o întreagă nouă lume în privința problemelor ce pot fi abordate. Acesta este
definit astfel : $LCP_0 = 0$ sau doar rămâne nedefinit iar pentru restul avem
$LCP_i = $ cel mai lung prefix comun al sufixelor de pe pozițiile $i$ și $i - 1$
în șirul de sufixe. Acest șir are mai multe metode de construire : cea mai
simplă este folosirea repetată a aplicației 3 de mai sus. Cu toate acestea,
dorim să prezentăm și o altă metodă de construire în $\mathcal{O}(N)$ care nu necesită
menținerea tabloului de clase de la fiecare pas, algoritmul lui Kasai.

### Algoritmul lui Kasai

Acest algoritm se bazează pe două observații:  

1. dacă avem doua sufixe care încep de la pozițiile $i$ respectiv $j$ și $lcp(i,
   j) = x$ atunci $lcp(i + 1, j + 1) \geq x - 1$

2. $lcp(i, j) = \min\limits_{id = R_i + 1}^{R_j} LCP_{id}$ (lcp-ul dintre
   oricare două sufixe este minimul din subsecvența formată de pozițiile lor)

Acum că am prezentat aceste două observații, putem continua cu algoritmul:
iterăm prin toate sufixele, de la cel mai lung la cel mai scurt, și calculăm
valoarea din șirul $LCP$ la poziția în care se află el.

Dacă notăm cu $l > 0$ valoarea obținută la sufixul precedent, atunci ideea
pivotală din spatele acestui algoritm este următoarea: putem incepe compararea
direct de la indicele $l$ întrucât știm că lcp-ul este cel puțin $l - 1$.

De unde știm asta? Fie $i$ sufixul anterior si $j$ sufixul cu care l - am
comparat. A se observa ca $j$ apare înaintea lui $i$ în șirul de sufixe.
Deoarece avem $l > 0$, putem spune cu certitudine ca sufixul $j + 1$ apare
înaintea lui $i + 1$ iar din observația 1 știm că lcp-ul lor este cel puțin $l -
1$.

Dacă notăm cu $k$ sufixul cu care îl comparăm pe $i + 1$, atunci ordinea de
apariție în șirul de sufixe este $j + 1 \leq k < i + 1$. Folosind observația 2
obținem că $lcp(k, i + 1) \geq l - 1$.

Complexitatea de spațiu este evident $\mathcal{O}(N)$. Complexitatea de timp necesită mai
multă atenție: se observă că decrementăm variabila fun de maxim $N$ ori iar
valoarea maximă până la care o putem incrementa este $N$, așadar complexitatea
de timp este $\mathcal{O}(N)$.

Mai jos aveți un model de implementare:

```cpp
vector<int> lcp(string &s, vector<int> &p) {
    vector<int> r(s.size()), l(s.size(), 0);
    int n = p.size();
    for (int i = 0; i < n; i++) {
        r[p[i]] = i;  /// r[i] = pozitia sufixului i in sirul de sufixe
    }

    int fun = 0, j;
    for (int i = 0; i < n; i++) {
        if (!r[i]) {
            continue;
        }

        j = p[r[i] - 1];
        while (i + fun < n && j + fun < n && s[i + fun] == s[j + fun]) {
            fun++;
        }
        l[r[i]] = fun;
        if (fun) {
            fun--;
        }
    }

    return l;
}
```

## Aplicații ce folosesc șirul LCP precum și șirul de sufixe

!!! note "Legătura dintre subsecvențe, prefixe și sufixe"

    Reamintim că orice subsecvență este prefix al unui sufix.

### [Pattern Matching (CSES)](https://cses.fi/problemset/task/2103)

!!! note "Cerință"

    Se dă un text $T$ si multiple șiruri $P$ pentru care se cer să aflăm de câte
    ori apar în $T$ ca subsecvență.

În primul rând, orice subsecvența este un prefix al unui sufix. Astfel, se
observă că toate sufixele în care $P$ este prefix vor forma o subsecvență în
șirul de sufixe. Pentru a numara de câte ori apare $P$ este de ajuns să căutam
ternar primul sufix în care apare $P$ ca prefix iar apoi să căutam binar cât de
mult de putem extinde la dreapta astfel încât lcp-ul dintre $P$ și ultimul sufix
din subsecvență să fie $|P|$. Complexitate: $\mathcal{O}(|P| \log {N})$ pe query.

!!! warning "Soluția optimă"

    Este probabil să luați TLE pe această problemă deoarece soluția optimă este
    de complexitate liniară.

### [Repeating Substring (CSES)](https://cses.fi/problemset/task/2106)

!!! note "Cerință"

    Se dă un text și se cere să afișăm cel mai lung șir posibil care apare în
    text ca subsecvență de cel puțin două ori.

Răspunsul se obține analizând șirul LCP. Ne uităm la fiecare sufix pe rând și ne
întrebăm: "Care este lungimea maximă a unui șir care apare în acest sufix ca
prefix și respectă proprietatea din enunț ?". Răspunsul este evident LCP-ul
curent (poate fi și LCP-ul următor dar avem grijă de asta la urmatorul pas).
Astfel, este de ajuns să găsim minimul din șirul LCP. Această idee se poate
generaliza și pentru mai multe apariții, așa cum veți vedea la problemele
suplimentare. Aveți soluția autorului
[aici](https://cses.fi/problemset/result/9911439/).

### [Distinct substrings(CSES)](https://cses.fi/problemset/task/2105)

!!! note "Cerință"

    Câte subsecvențe distincte are un șir? Subsecvențele se disting în funcție
    de caractere, nu de indici.

Vom scădea din numărul total de subsecvențe numărul de subsecvențe greșite.
Pentru a calcula acest număr iterăm prin șirul LCP: atunci când suntem la
indicele $i$, prefixele acestui sufix care au apărut înainte sunt în număr de
$LCP_i$. Astfel, rezultatul se obține scăzând toate elementele din șirul $LCP$.
Soluția mea o găsiți [aici](https://cses.fi/paste/8201bc56d5efcfe197365b/).

## Probleme suplimentare

- [CSES Substring Order I](https://cses.fi/problemset/task/2108)
- [CSES Substring distribution](https://cses.fi/problemset/task/2110)
- [Kattis kindaokarray](https://open.kattis.com/problems/kindaokarray)
- [Lot Seniori 2016 - parb](https://kilonova.ro/problems/1926?list_id=819)
- [Codeforces Forbidden Indices](https://codeforces.com/contest/873/problem/F)
- [Probleme cu structuri pe siruri de caractere](https://codeforces.com/problemset?tags=string%20suffix%20structures,2200-)

## Materiale suplimentare

- [Codeforces - Dynamic Suffix Array](https://codeforces.com/blog/entry/93042)
- [Curs MIT de pe Youtube](https://www.youtube.com/watch?v=NinWEPPrkDQ)
- [Articolul de pe cp-algorithms](https://cp-algorithms.com/string/suffix-array.html)
