---
id: OJI-2003-X-spirala
title: Soluția problemei Spirala (OJI 2003, clasa a X-a)
problem_id: 721
authors: []
# prerequisites:
#    - placeholder
tags:
    - OJI
    - clasa X
---

Articolul va fi disponibil curând în arhivă.

Până atunci, puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2003/10/rezolvare%20spirala.txt).

<div class="editorial-text" markdown>

```text
Se calculeaza pentru fiecare pozitie numarul de amestecari dupa care se repeta pozitia respectiva (perioda principala).
Se calculeaza pentru toti divizorii d ai celui mai mic multiplu comun al numerelor calculate (tinut ca factori primi si exponentii corespunzatori) numarul de pozitii care se repeta dupa d amestecari.
Sursa comisiei genereaza divizorii cu bkt pe exponentii descompunerii in factori primi.
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
