---
id: OJI-2020-V-tai
author:
    - Ștefan-Cosmin Dăscălescu
prerequisites:
    - divisibility
    - loops
tags:
    - OJI
    - clasa V
    - divizibilitate
---

# Soluția problemei tai (OJI 2020, clasa a V-a)

!!! note "Link problemă"
    Această problemă poate fi accesată [aici](https://kilonova.ro/problems/920/).

Pentru a verifica dacă un număr este prim sau nu, folosim un algoritm de numărare
al divizorilor sau un algoritm care află primul divizor propriu, iar în funcție
de implementare, se pot obține punctaje parțiale.

Pentru a obține punctajul maxim, este optim să verificăm dacă un număr este prim
folosind algoritmul clasic de aflare al divizorilor în $\sqrt n$.

Știm deja conform proprietăților divizorilor că dacă un număr $n$ are un divizor
propriu mai mic sau egal cu $\sqrt n$, atunci nu este prim.

Pentru a rezolva cerințele $2$ și $3$, vom împărți numerele în bucăți folosind
structuri repetitive de tip for, care să proceseze fiecare bucată în parte și
să verifice primalitatea numerelor folosind algoritmul descris mai sus. Dacă
știți deja să lucrați cu vectori, acest lucru poate fi făcut chiar mai ușor
deoarece vă puteți afla numerele parcurgând cifrele de la capătul din stânga la
cel din dreapta.

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim care nu
foloseste vectori.

```cpp
--8<-- "olimpiada/V/2020-tai.cpp"
```