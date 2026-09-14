---
id: OJI-2007-IX-cartele
title: Soluția problemei cartele (OJI 2007, clasa a IX-a)
problem_id: 759
authors: []
# prerequisites:
#    - placeholder
tags:
    - OJI
    - clasa IX
---

Articolul va fi disponibil curând în arhivă.

Până atunci, puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2007/09/cartele.txt).

<div class="editorial-text" markdown>

```text
Pentru fiecare cartela, se compara element cu element, matricea
care reprezinta sablonul, cu urmatoarele tablouri:

 1. Cartela
 2. Cartela rotita cu 90 grade
 3. Cartela rotita cu 180 grade
 4. Cartela rotita cu 270 grade

Daca nu s-a gasit o coincidenta, se intoarce cartela, printr-o operatie
de oglindire fata de linia i = n / 2, (sau fata de coloana j = n / 2),
dupa care se compara sablonul cu urmatoarele tablouri:

 5. Cartela oglindita
 6. Cartela oglindita rotita cu 90 grade
 7. Cartela oglindita rotita cu 180 grade
 8. Cartela oglindita rotita cu 270 grade

Rotirile se pot face in sens trigonometric sau orar.
Daca s-a gasit o coincidenta la oricare dintre pasii de mai sus,
se opreste cautarea, se afiseaza 1 si se trece la prelucrarea
urmatoarei cartele.

Daca nici dupa pasul 8 nu s-a gasit o potrivire exacta, se afiseaza 0
si se trece la prelucrarea urmatoarei cartele.
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
