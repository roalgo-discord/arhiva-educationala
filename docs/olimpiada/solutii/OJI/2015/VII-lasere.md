---
id: OJI-2015-VII-lasere
title: Soluția problemei lasere (OJI 2015, clasa a VII-a)
problem_id: 859
authors: []
# prerequisites:
#    - placeholder
tags:
    - OJI
    - clasa VII
---

Articolul va fi disponibil curând în arhivă.

Până atunci, puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2015/07/lasere.txt).

<div class="editorial-text" markdown>

```text
Descrierea solutiei
Autor: prof. Nicu Vad Laurentiu, Liceul Teoretic Mihail Kogalniceanu Vaslui

 Varianta 1 -100p

Se citesc datele si se modifica tabloul conform pozitilor laserelor in ordinea in care apar.
Pentru a afla numarul de gropi se calculeaza poziile valorilor minime in cele opt directii si contorizarea acestora.
Pentru transee se foloseste un vector auxiliar cu valori de 0 si 1, 1 pentru pozitia gropii se cauta secventa maxima de valori consecutive de 1 si se contorizeaza.
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
