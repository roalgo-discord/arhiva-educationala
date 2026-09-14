---
id: OJI-2007-VI-cod
title: Soluția problemei cod (OJI 2007, clasa a VI-a)
problem_id: 762
authors: []
# prerequisites:
#    - placeholder
tags:
    - OJI
    - clasa VI
---

Articolul va fi disponibil curând în arhivă.

Până atunci, puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2007/06/cod.txt).

<div class="editorial-text" markdown>

```text
	Solutie - COD

Se utilizeaza un vector v=(v[0],v[1],v[2], ...,v[99]), unde
v[i]=frecventa de aparitie a lui i in fisierul cod.in,
i=0,1,...99.
In fiserul de iesire cod.out se scriu acele numere i=0,1,...99
cu proprietatea ca v[i] mod 2=1.
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
