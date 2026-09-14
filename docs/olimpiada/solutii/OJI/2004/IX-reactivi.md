---
id: OJI-2004-IX-reactivi
title: Soluția problemei reactivi (OJI 2004, clasa a IX-a)
problem_id: 724
authors: []
# prerequisites:
#    - placeholder
tags:
    - OJI
    - clasa IX
---

Articolul va fi disponibil curând în arhivă.

Până atunci, puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2004/09/sol_reac.txt).

<div class="editorial-text" markdown>

```text
Problema cere, de fapt, determinarea numarului minim de intersectii intre
segmentele determinate de temperatura minima si maxima a unui reactiv.

Pentru a le determina procedez astfel:

   - ordonez intervalele de temperatura crescator dupa temperatura minima si
     descrescator dupa temperatura maxima
   - pun primul reactiv (deci cel cu intervalul cel mai mare) in primul frigider
   - pentru toate celelalte
         - caut un frigider in care a mai fost pus ceva si se poate pune si acesta
           (adica intersectia celor doua segmente sa fie nevida)
         - daca gasesc
              - ajustez temperatura din frigider ca sa poata cuprinde si acest recipient
         - altfel (daca nu gasesc)
              - "deschid" un frigider nou si pun aici reactivul
```

</div>

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;

    cout << a + b << '\n';
    return 0;
}
```
