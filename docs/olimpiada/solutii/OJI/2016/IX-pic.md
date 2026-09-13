---
id: OJI-2016-IX-pic
title: Soluția problemei pic (OJI 2016, clasa a IX-a)
problem_id: 865
authors: [stefdasca]
prerequisites:
   - simulating-solution
   - binary-search
tags:
    - OJI
    - clasa IX
---


Pentru a rezolva prima cerință, tot ce trebuie să facem este să parcurgem
fiecare linie și să calculăm suma capacităților.

Pentru cea de-a doua cerință, o primă soluție la care ne putem gândi este să
simulăm procesul de turnare al lichidului și să aflăm primul moment de timp
în care se termină de turnat lichidul. Din păcate, această soluție este prea
înceată, deoarece ne poate lua foarte mult timp să ajungem la acest obiectiv.

Totuși, putem observa faptul că pe măsură ce turnăm tot mai mult lichid, vom
avea tot mai mult progres cu umplerea paharelor, ceea ce impune folosirea unei
alte metode de a gândi turnarea apei în pahare.

!!! note "Observație"

    Acum, ne putem gândi invers: Oare dacă turnăm toată apa la început?

Dacă turnăm toată apa la început, putem verifica în $\mathcal{O}(n^2)$ dacă această
cantitate de apă este îndeajuns pentru a realiza obiectivul propus. Astfel,
ne putem gândi acum mai departe la o idee pe baza unei căutări binare pe
răspuns, deoarece acum putem simula eficient dacă putem obține un răspuns,
iar în caz afirmativ, vom putea încerca un răspuns mai mic.

Tot ce ne mai rămâne să facem este să aproximăm valoarea maximă a răspunsului,
fapt ce se poate afla gândindu-ne la frecvența cu care ajung valorile mai mici
să fie umplute. Pentru o valoare de pe linia $i$, va fi atinsă aproximativ
o dată la $2^{i-1}$ pași, iar deoarece limita maximă este $25$ pentru cantitatea
unui pahar, înseamnă că vom avea nevoie de aproximativ $2^{49} \cdot 25$
picături pentru a ajunge la răspunsul final. Astfel, putem pune un capăt dreapta
egal cu $2^{60}$ fără probleme, lucru făcut în soluția de mai jos. 

Complexitatea va fi $\mathcal{O}(60 \cdot n^2)$.

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
--8<-- "olimpiada/IX/2016-pic.cpp"
```
