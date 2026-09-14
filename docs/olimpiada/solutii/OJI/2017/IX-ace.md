---
id: OJI-2017-IX-ace
title: Soluția problemei ace (OJI 2017, clasa a IX-a)
problem_id: 876
authors: []
# prerequisites:
#    - placeholder
tags:
    - OJI
    - clasa IX
---

Articolul va fi disponibil curând în arhivă.

Până atunci, puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2017/09/ace.txt).

<div class="editorial-text" markdown>

```text
Autor prof Octavian Dumitrascu Colegiul National Dinicu Golescu Campulung

Solutia 1
Solutia se bazeaza pe cateva observatii matematice.
Daca suntem in punctul N si M va vedea acul de coordonate x si y daca cmmdc(N-x,M-y) = 1 - in acest caz vede acul in totalitate altfel poate vedea varful acului x,y daca pe directia determinata de cele doua puncte nu  se gaseste un ac "prea inalt" pentru cele doua puncte
Pentru acest caz se verifica cu asemanarea triunghiurilor o relatie care determina posibilitatea de a fi vazut sau nu.
Pentru o abordare bruta a acestor idei nu se obtine punctaj maxim.
Punctajul maxim se obtine parcurgand matricea de la punctul N,M si mergand in dupa un sablon (l,c)
(adica (N,M) -> (N-l,M-c) ->(N-2l,M-2c)..etc) si mentinand la fiecare moment o inaltime maxima care determina posibilitatea vizualizarii sau nu.
Solutia optima are complexitate O(NxM).
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
