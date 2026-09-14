---
id: OJI-2006-X-ecuatii
title: Soluția problemei ecuatii (OJI 2006, clasa a X-a)
problem_id: 397
authors: []
# prerequisites:
#    - placeholder
tags:
    - OJI
    - clasa X
---

Articolul va fi disponibil curând în arhivă.

Până atunci, puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2006/10/ecuatii.txt).

<div class="editorial-text" markdown>

```text
Vom citi ecuatia intr-un sir de caractere, apoi vom imparti sirul in doua subsiruri (membrul stang, cu alte cuvinte caracterele pana la semnul egal formeaza primul sir, iar membrul drept, cu alte cuvinte caracterele de dupa semnul egal formeaza al doilea sir).
Problema este de a determina pentru fiecare dintre cele doua subsiruri coeficientul lui x si termenul liber.
Sa notam:
nr1 termenul liber din membrul stang
nr2 termenul liber din membrul stang
nrx1 coeficientul lui x din membrul stang
nrx2 coeficientul lui x din membrul drept.
Solutia ecuatiei este (nr2-nr1)/(nrx1-nrx2) daca nrx1<>nrx2.
Daca nrx1=nrx2, atunci ecuatia este imposibila (daca nr1<>nr2) sau nedeterminata (daca nr1=nr2).
Pentru a determina nr1 si nrx1, respectiv nr2 si nrx2 se prelucreaza cele doua siruri, identificand coeficientii necunoscutei, respectiv termenii liberi.
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
