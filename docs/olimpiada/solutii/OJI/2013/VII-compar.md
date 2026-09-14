---
id: OJI-2013-VII-compar
title: Soluția problemei compar (OJI 2013, clasa a VII-a)
problem_id: 834
authors: []
# prerequisites:
#    - placeholder
tags:
    - OJI
    - clasa VII
---

Articolul va fi disponibil curând în arhivă.

Până atunci, puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2013/07/compar.txt).

<div class="editorial-text" markdown>

```text
Compar - descrierea solutiei
prof. Emanuela Cerchez
C. N. "E. Racovita" iasi

Citim secventa de semne intr-un vector de caractere si calculam numarul de caractere citite.

Incepem sa reconstituim secventa initiala incepand de la valoarea crt=1.
Parcurgem secventa de semne si daca semnul curent este < atunci scriu valoarea curenta, apoi o incrementez.
Daca insa semnul curent este > identific intreaga subsecventa care urmeaza formata numai din semnul >; sa consideram ca lg este lungimea secventei; vom plasa valorile de la crt pana la crt+lg in ordine descrescatoare in secventa reconstituita.

Obtinem intotdeauna cea mai mica solutie din punct de vedere lexicografic.

Nu sunt necesare operatii cu siruri de caractere.

Complexitatea solutiei este liniara.

Solutia 2 - prof. Dana Marcu
Se considera un minim, initial 1 si un maxim, initial egal cu n.
Se parcurge sirul.
Daca pe pozitia curenta, i, din sir se afla caracterul '<', se afiseaza valoarea minimului si se reactualizeaza prin incrementare cu 1.
Daca caracterul curent din sir este '>', se afiseaza maximul si se micsoreaza cu 1 valoarea acestuia.
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
