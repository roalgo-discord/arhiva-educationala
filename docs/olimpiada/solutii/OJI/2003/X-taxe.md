---
id: OJI-2003-X-taxe
title: Soluția problemei Taxe (OJI 2003, clasa a X-a)
problem_id: 722
authors: []
# prerequisites:
#    - placeholder
tags:
    - OJI
    - clasa X
---

Articolul va fi disponibil curând în arhivă.

Până atunci, puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2003/10/rezolvare%20taxe.txt).

<div class="editorial-text" markdown>

```text
se aplica un algoritm de tip Lee care expandeaza o coada ce contine initial doar starea (1,1,S) cu toate starile in care se poate ajunge dintr-o pozitie data. Se adauga starile noi sau se actualizeaza starile in care se poate ajunge cu mai multi bani in buzunar.
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
