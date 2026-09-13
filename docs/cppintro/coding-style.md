---
id: coding-style
authors: [stefdasca]
tags:
  - C++
  - introducere
  - coding style
---

## Fundamente

Așa cum probabil ați mai observat când ați mai citit programe în limbajul C++,
există diverse convenții și reguli ce sunt respectate de programatori, lucru ce
nu reprezintă o excepție în articolele ce fac parte din Arhiva Educațională
RoAlgo.

Deși sunt multe stiluri de cod care pot fi utilizate, un stil de cod bun este
unul ușor de înțeles și concis, deoarece în timpul unui concurs de algoritmică,
ideile pe care le găsești trebuie implementate destul de rapid și fără a avea
riscul de a suferi de pe urma unor bug-uri care iau mult mai mult timp să fie
rezolvate decât în cazul folosirii unui stil de cod concis.

## Coding style-ul Arhivei Educaționale RoAlgo

De-a lungul acestei arhive, soluțiile prezentate de noi vor folosi stilul de cod
Google, cu următoarele caracteristici:

- 4 spații la indentare;
- Folosirea acoladelor pentru orice structură alternativă și repetitivă;
- Acolada deschisă se pune în același rând cu definiția structurii;
- Acolada închisă se pune în rândul de după finalul structurii;
- Folosirea extensivă a spațiilor pentru separarea diverselor instrucțiuni sau
  chiar a expresiilor;
- Nume sugestive pentru variabile.

Un astfel de exemplu îl puteți găsi în acest cod în care operăm cu cifrele unui
număr $n$ dat.

```cpp
--8<-- "cppintro/coding_style/yes.cpp"
```

Se poate observa faptul că acest cod este mult mai ușor de citit, datorită
spațiilor incluse și a poziției logice a acoladelor și nu numai.

## Exemple de așa nu

În mod evident, orice exemplu de cod care nu respectă un stil clar poate fi
considerat un exemplu de așa nu. Aici sunt câteva exemple, luate din examene și
concursuri de informatică românești, împreună cu explicația pentru care nu sunt
stiluri potrivite.

```cpp
--8<-- "cppintro/coding_style/no1.cpp"
```

Această secvență de cod are un stil foarte inconsistent în privința acoladelor
și a instrucțiunilor subordonate if-urilor, pe de o parte apărând pe aceeași
linie și apoi apărând pe următorul rând. De asemenea, nu se respectă vreo regulă
de spațiere ceea ce face codul (intenționat) mai greu de citit.

```cpp
--8<-- "cppintro/coding_style/no2.cpp"
```

În mod similar, acoladele sunt puse la întâmplare și instrucțiunile din switch
sunt scrise cu scopul de a bate recordul de cel mai scurt cod de pe CSES, nu
pentru a ajuta cititorul să înțeleagă ce se întâmplă în cod.

```cpp
--8<-- "cppintro/coding_style/no3.cpp"
```

Acest cod, deși are unele lucruri ce se întâmplă în mod constant, este foarte
greu de citit din cauza inconsistenței la structurile repetitive și acolade, pe
lângă rândurile scrise împreună.

## Alte coding style-uri bune

Dacă nu preferați stilul nostru, un alt stil bun este stilul Allman, foarte
similar dar acoladele apar mereu pe rânduri separate.

În general, orice stil folosiți trebuie să aibă o logică clară și să fie ușor de
citit pentru oricine vrea să vă urmeze ideea la o problemă, evident fără a cauza
dificultăți majore în ceea ce privește debugging-ul.

De asemenea, recomandăm și [acest ghid de pe
Codeforces](https://codeforces.com/blog/entry/64218).

## Concluzii

Formarea unui stil propriu de cod (sau utilizarea unuia din stilurile
consacrate) este foarte importantă în dezvoltarea oricărui programator, deoarece
aceste obiceiuri, odată deprinse, servesc drept o unealtă puternică indiferent
de proiectul sau programul scris.
