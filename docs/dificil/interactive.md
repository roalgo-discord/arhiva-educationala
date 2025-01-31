---
tags:
    - interactive
---

**Autor**: Ștefan-Cosmin Dăscălescu

!!! example "Cunoștințe necesare"
    - [Abordarea concursurilor de pe Codeforces/AtCoder](../mediu/cf-atcoder.md)
    - [Abordarea problemelor ad-hoc](../mediu/ad-hoc.md)
    - [Căutarea binară](../usor/binary-search.md)
    - [Tehnica divide et impera](../mediu/divide-et-impera.md)

## Introducere

La concursurile de informatică, pe lângă problemele obișnuite în care trebuie să
citiți inputul (sau eventual îl primiți ca parametri într-o funcție) și trebuie să
generați outputul (denumite de regulă probleme batch), mai există și alte tipuri
de probleme, pe care le voi numi în cele ce urmează probleme speciale.

Aceste probleme sunt preferate de autori deoarece de multe ori implică idei
non standard care ajung să se aplice pentru a găsi soluțiile, iar folosirea unor
șabloane tipice altor categorii de probleme este mult mai dificilă.

Acestea sunt de 3 tipuri:

- Probleme interactive: Probleme în care vi se dă un număr limitat de query-uri
și trebuie fie să găsiți o anumită valoare/șir, fie să găsiți răspunsul la o cerință
mai complexă, răspunsurile la query-uri fiind date de un alt program creat de comisie.
- Probleme output-only: Probleme în care se dau toate datele posibile de intrare
și trebuie generate răspunsuri cât mai apropiate de răspunsul optim, de regulă
inspirate din probleme NP-complete.
- Probleme de tip two-step (communication tasks): Probleme în care trebuie scrise
două programe care pot comunica de regulă între ele doar printr-un output
codificat care trebuie generat de primul program pentru a putea ajuta
cel de-al doilea program să rezolve problema.

În acest articol, vom discuta despre problemele interactive, deoarece acestea
sunt problemele speciale care apar cel mai des în competițiile de programare, mai
ales în fazele superioare și în cadrul etapelor mai dificile.

## Tipuri de probleme interactive

Când vine vorba de problemele interactive, există foarte multe tipuri de probleme
ale căror soluții se folosesc de tot felul de observații în ceea ce privește
optimizarea numărului de întrebări, precum și de tehnici care țin de diversele
relații și definiții care sunt prezente în probleme.

Există trei tipuri de probleme interactive:

- Probleme în care ni se zice direct complexitatea cerută (de exemplu,
[IOI 2014 Rail](https://oj.uz/problem/view/IOI14_rail)).
- Probleme în care doar știm numărul maxim de întrebări ce pot fi folosite
(de exemplu, [IOI 2013 Cave](https://oj.uz/problem/view/IOI13_cave)).
- Probleme care au o limită ascunsă a numărului de întrebări (de exemplu,
[IOI 2015 Scales](https://oj.uz/problem/view/IOI15_scales)).

Deoarece putem deduce în principiu complexitatea cerută de problemă, de cele mai
multe ori nu are sens să încercăm să obținem o complexitate mai bună decât
cea de care avem nevoie (dacă numărul de întrebări este $n^2$, nu are deloc
sens să obținem $\log n$ query-uri).

## Problema exemplu - [Guess the Number](https://codeforces.com/problemset/gymProblem/101021/1)

Aceasta este o problemă introductivă pentru acest tip de probleme. De cele
mai multe ori, vi se dau instrucțiunile în enunț legat de modul în care
interacționați cu platforma. De cele mai multe ori, trebuie să fiți atenți
să nu folosiți liniile de cod care implică fast input
```ios_base::sync_with_stdio(false); cin.tie(NULL);``` și să folosiți flush
la finalul fiecărei linii pe care o afișați (puteți folosi endl pentru asta).

Pentru a rezolva problema dată, trebuie să simulăm căutarea binară folosind
protocolul de interacțiune. În funcție de răspunsurile primite de programul
vostru, veți accesa jumătatea din stânga sau jumătatea din dreapta. Trebuie
să fim atenți la cazurile care sunt impuse de tipul răspunsurilor date de
enunț.

```cpp
--8<-- "dificil/interactive/guessthenumber.cpp"
```

## Sfaturi practice pentru problemele interactive

!!! note "Observație"
    În cele ce urmează, voi folosi exemple din [acest material](https://mamnoonsiam.github.io/files/notes/interactive-problems/inprogress-0.pdf),
    luând de acolo cele mai esențiale sfaturi și problemele la care se regăsesc.
    O mare parte dintre soluțiile problemelor menționate sunt
    explicate în detaliu în acel document.

- Există foarte multe probleme interactive care se bazează pe căutări binare sau
ternare, exemplele cele mai simple fiind bazate pe aceste tehnici,
dar se pot regăsi și exemple mai complicate care țin de diverse optimizări
sau de tehnici conexe precum divide et impera, continuitatea funcțiilor
(căutarea ternară poate fi folosită pentru aceste probleme).
- Nu ratați relațiile ușor de dedus - De exemplu, pentru problema [Chocolate Bunny](https://codeforces.com/problemset/problem/1407/C),
o soluție ușor de dedus este aceea de a afla mai întâi maximul, iar mai apoi să
aflăm valorile pe rând în $3 \cdot (n-1)$ query-uri. Totuși, dat fiind că
determinăm pe rând valorile, putem reduce numărul de întrebări la
$2 \cdot (n-1)$ query-uri, ceea ce e îndeajuns de bine.
- Încercați să găsiți diferite valori extreme - Putem împerechea diferite tipuri
de obiecte folosind stive, cum se poate face la această [problemă](https://atcoder.jp/contests/arc070/tasks/arc070_d)
dată la un AtCoder Regular Contest. O altă problemă în care putem împerechea
diferite tipuri de obiecte este
[IOI 2015 Towns](https://oj.uz/problem/view/IOI15_towns).
- Câteodată, găsirea unui singur obiect e importantă, deoarece în unele probleme
interactive, putem elimina pe rând obiecte până ce ajungem la răspuns.
- Rezolvarea cazurilor particulare poate ajuta la o soluție generală
- Probleme în care ne folosim de reprezentările binare pentru a reduce numărul
de query-uri. Fie că e vorba de operații pe biți sau de împărțiri
precum meet in the middle sau aflarea anumitor submulțimi,
aceste tipuri de probleme se pot transpune cu ușurință în probleme interactive.
- Structurile de date pot apărea și ele drept unealtă esențială pentru găsirea
soluțiilor la aceste tipuri de probleme, așa cum putem observa în problema
[Minimum and Maximum](https://codeforces.com/problemset/problem/730/B)
sau dacă vorbim de un exemplu mai dificil,
[Ehab and the Big Finale](https://codeforces.com/problemset/problem/1174/F).
- De ce nu, putem vorbi și de grafuri mai generale, de multe ori arborii DFS
sau arborii parțiali fiind foarte importanți pentru deducerea răspunsurilor
cerute de probleme.
- Nu în ultimul rând, și abordările probabilistice se găsesc în aceste tipuri
de probleme, mai ales pe Codeforces, exemple putând fi găsite acolo în
secțiunile mai dificile ale concursurilor de div2 și div1.

## Problemă rezolvată - [Word by Word - IIOT 2024-25](https://kilonova.ro/problems/3309/)

Primul pas în găsirea cuvântului ascuns este determinarea literelor
care îl compun. Având 26 de litere, împărțim alfabetul în blocuri de
câte 5 caractere. Putem verifica dacă literele a, b, c, d sau e apar
în cuvântul ascuns prin interogarea cuvântului "abcde". Apoi, facem
interogări pentru "fghij", "klmno" și așa mai departe. Observăm că 5
interogări sunt suficiente, deoarece putem omite interogarea pentru "z",
fiind singura literă din ultimul bloc.

Următorul pas este determinarea poziției exacte a fiecărei litere.
Să presupunem că literele identificate sunt a, b, c, d și e.
Putem interoga "aaaaa", "bbbbb", "ccccc" și "ddddd" pentru a afla
pozițiile exacte ale acestor patru litere. Ultima poziție rămasă
trebuie să conțină litera e, permițându-ne astfel să determinăm
cuvântul ascuns în cel mult 5 + 4 = 9 interogări.

Aceeași tehnică funcționează și în cazul în care cuvântul
conține mai puțin de cinci litere distincte.

```cpp
--8<-- "dificil/interactive/wordbyword.cpp"
```

## Concluzii

Problemele interactive reprezintă un tip de probleme care apar tot mai des la
concursurile de informatică românești, chiar și la nivelul olimpiadelor
internaționale de juniori, ceea ce le face tot mai utile și importante
pentru studiul individual. La fel ca la problemele ad-hoc, atenția va sta
la modul în care găsim idei noi și originale pentru aceste probleme.

## Probleme suplimentare

- [kilonova magie](https://kilonova.ro/problems/2614/)
- [Codeforces Lost Numbers](https://codeforces.com/problemset/problem/1167/B)
- [Codeforces Kachina's Favorite Binary String](https://codeforces.com/contest/2037/problem/E)
- [Codeforces Chocolate Bunny](https://codeforces.com/problemset/problem/1407/C)
- [CCO 2018 Gradient Descent](https://dmoj.ca/problem/cco18p4)
- [kilonova dragonul](https://kilonova.ro/problems/2966/)
- [Codeforces Minimum and Maximum](https://codeforces.com/problemset/problem/730/B)
- [IIOT 2022 Battle](https://kilonova.ro/problems/266)
- [RMI 2018 Password](https://www.infoarena.ro/problema/password2)
- [Info1Cup 2023 Caesar](https://kilonova.ro/problems/431/)
- [ONI 2010 conex](https://kilonova.ro/problems/62/)
- [JOI 2020 Stray Cat](https://oj.uz/problem/view/JOI20_stray)
- [Info1Cup 2018 Hidden](https://oj.uz/problem/view/info1cup18_hidden)
- [AtCoder HonestOrUnkind](https://atcoder.jp/contests/arc070/tasks/arc070_d)
- [Codeforces Ehab and the Big Finale](https://codeforces.com/problemset/problem/1174/F)
- [IOI 2015 Towns](https://oj.uz/problem/view/IOI15_towns)
- [Round 64 - CsAcademy](https://csacademy.com/contest/round-64)
- [Probleme interactive de pe kilonova](https://kilonova.ro/tags/301)
- [Probleme interactive de pe codeforces](https://codeforces.com/problemset?tags=interactive)

## Resurse suplimentare

- [Introduction to Interactive Problems](https://mamnoonsiam.github.io/cp-classes/week-4/overview)
- [Interactive Problems: Guide for Participants](https://codeforces.com/blog/entry/45307)
- [Interactive and Communication Problems](https://usaco.guide/adv/interactive)
- [Interactive, output only & Communication Task - HKOI](https://assets.hkoi.org/training2017/nbt.pdf)