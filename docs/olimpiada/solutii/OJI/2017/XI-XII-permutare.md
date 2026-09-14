---
id: OJI-2017-XI-XII-permutare
title: Soluția problemei permutare (OJI 2017, clasele XI-XII)
problem_id: 28
authors: []
# prerequisites:
#    - placeholder
tags:
    - OJI
    - clasa XI-XII
---

Articolul va fi disponibil curând în arhivă.

Până atunci, puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2017/11-12/permutare.txt).

<div class="editorial-text" markdown>

```text
Problema permutare
autor prof. Szabo Zoltan, Liceul Tehnologic "Petru Maior" Reghin

Pentru simplitate "permutarea dubla de trei ori în crestere" o vom numi "permutare".
Prin definitia permutarii observam ca pentru fiecare element din a doua secventa, exista un element corespunzator din prima secventa cu valoare mai mica.
Astfel daca pentru fiecare permutare construim un sir de caractere in care pe pozitiile indicate de elementele primei secvente punem caracterul '(' iar pentru pozitiile indicate de elementele celei de a doua secvente punem caracterul ')', obtinem o parantezare formata din n perechi de paranteze.

Ordinea lexicografica a tuturor parantezarilor coincide cu cea a permutarilor.

Problema se poate rezolva cu programare dinamica bazata pe formula de recurenta
     P(i,j)=P(i-1,j)+P(i,j-1)

Reconstruirea solutiei porneste de la linia n catre linia 1 in matricea triunghiulara P.

Complexitatea unei cautari este O(n^2).
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
