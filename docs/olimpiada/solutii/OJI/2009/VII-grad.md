---
id: OJI-2009-VII-grad
title: Soluția problemei grad (OJI 2009, clasa a VII-a)
problem_id: 788
authors: []
# prerequisites:
#    - placeholder
tags:
    - OJI
    - clasa VII
---

Articolul va fi disponibil curând în arhivă.

Până atunci, puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2009/07/grad.txt).

<div class="editorial-text" markdown>

```text
Solutie- grad (Popescu Doru Anastasiu)

Pentru a determina numarul de ordine al unei litere in alfabet se poate folosi codul ASCII sau un
sir de caractere constant cu toate literele alfabetului (cautand litera in acest sir de caractere, pozitia
este chiar numarul de ordine). Gradul unui cuvant se obtine sumand numarul de ordine al fiecarei litere.
Se formeaza un vector cu gradul fiecarui cuvant:
g=(g[1],g[2],...,g[k]).
Nu este nevoie sa se retina fiecare cuvant.
Se determina numarul de grupe nrg, eventual ordonant crescator vectorul g.
Se afiseaza k si nrg.
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
