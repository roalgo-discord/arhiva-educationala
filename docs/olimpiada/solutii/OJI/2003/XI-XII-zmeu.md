---
id: OJI-2003-XI-XII-zmeu
title: Soluția problemei zmeu (OJI 2003, clasele XI-XII)
problem_id: 56
authors: []
# prerequisites:
#    - placeholder
tags:
    - OJI
    - clasa XI-XII
---

Articolul va fi disponibil curând în arhivă.

Până atunci, puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2003/11-12/solutie%20zmeu.txt).

<div class="editorial-text" markdown>

```text
Problema propusa de prof. Dana Lica (Ploiesti)

Se lucreaza pe un graf orientat in care nodurile reprezinta povesti
si din care s-au eliminat niste arce (date in zmeu.in, i->1,  p->i si 1->p)

Rezolvarea are la baza un algoritm de tip Lee cu memorarea in fiecare nod
a tuturor timpilor minimi cu care se ajunge in nodul respectiv cu 1,2,...,c
capete netaiate.

Pentru testele mari sunt necesare tehnici de alocare si optimizari legate de
parcurgerea in latime a grafului.
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
