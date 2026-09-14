---
id: OJI-2009-VIII-vecini
title: Soluția problemei vecini (OJI 2009, clasa a VIII-a)
problem_id: 791
authors: []
# prerequisites:
#    - placeholder
tags:
    - OJI
    - clasa VIII
---

Articolul va fi disponibil curând în arhivă.

Până atunci, puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2009/08/vecini.txt).

<div class="editorial-text" markdown>

```text
Solutia (program vecini.cpp)
=======
 - solutia se bazeaza pe memorarea a trei linii succesive din matrice la un moment dat;
 - pentru calculul vecinilor elementelor de pe prima linie (linia 1) si de pe ultima linie (linia m) se poate considera ca matricea contine doua linii suplimentare  (linia 0 si linia m+1) cu valori arbitrare diferite de 0 si 1;
 - cu ajutorul a doi vectori de directie pentru cei 8 vecini se calculeaza pentru linia din mijloc (linia 1) numarul maxim de vecini ai fiecarui element de pe linie si cate elemente au acest numar;
 - are loc translatarea "in sus" a liniilor in cadrul matricii:
	- linia anterioara <- linia curenta
	- linia curenta <- linia urmatoare
   si se citeste o noua linie din fisier;
 - complexiatea: O(m*n);
- valorile maxime pentru n si m sunt astfel date incat sa nu fie probleme de depasire a spatioului de memorie cand se retin simultan cele trei linii succesive ale matricei; solutia bruta care retine in intergime in memorie matricea  obtine 30 puncte.
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
