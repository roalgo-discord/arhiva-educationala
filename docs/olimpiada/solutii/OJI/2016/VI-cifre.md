---
id: OJI-2016-VI-cifre
title: Soluția problemei cifre (OJI 2016, clasa a VI-a)
problem_id: 868
authors: []
# prerequisites:
#    - placeholder
tags:
    - OJI
    - clasa VI
---

Articolul va fi disponibil curând în arhivă.

Până atunci, puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2016/06/cifre.txt).

<div class="editorial-text" markdown>

```text
Descriere solutie  – cifre

Se determină cifrele comune pentru cele 2 numere ce formează o pereche, utilizând doi vectori de aparitii.
Pentru fiecare cifră comună se determină minimul dintre a si b, unde a este numărul de aparitii a cifrei în primul număr iar b este numărul de aparitii a cifrei în cel de-al doilea număr.
Dacă există cifre comune se formează valoarea maximă luând toate cifrele comune în ordinea descrescătoare a valorii lor.
Dacă valoarea obtinută este strict pozitiva, se numără ca solutie, actualizandu-se daca este cazul si valoarea maxima pe  care o poate forma Andrei.
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
