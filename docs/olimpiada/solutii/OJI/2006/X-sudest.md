---
id: OJI-2006-X-sudest
title: Soluția problemei sudest (OJI 2006, clasa a X-a)
problem_id: 757
authors: []
# prerequisites:
#    - placeholder
tags:
    - OJI
    - clasa X
---

Articolul va fi disponibil curând în arhivă.

Până atunci, puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2006/10/sudest.TXT).

<div class="editorial-text" markdown>

```text
Reprezentarea informatiilor
N		  - numarul de linii
K		  - numarul de comenzi
A[Nmax][Nmax];	  - memoreaza cantitatea de produs
C[Nmax][Nmax];	  - C[i][j]=cantitatea maxima de cartofi culeasa pe un traseu ce porneste din (1,1) si se termina in (i,j), respectand conditiile problemei

P[Nmax][Nmax]	  - P[i][j]= pasul la care am ajuns in pozitia i,j culegand o cantitate maxima de cartofi
Move[2*Nmax];     - memoreaza cele K comenzi


Parcurg sirul celor k mutari. La fiecare mutare marchez pozitiile in care pot ajunge la mutarea respectiva.
Mai exact, parcurg toate pozitiile in care am putut ajunge la pasul precedent (cele marcate in matricea P corespunzator cu numarul pasului precedent) si pentru fiecare pozitie verific daca la pasul curent pot sa execut mutarea la sud.
In caz afirmativ, verific daca in acest caz obtin o cantitate de cartofi mai mare decat cea obtinuta pana la la momentul curent (daca da, retin noua cantitate, si marchez in matricea P pozitia in care am ajuns cu indicele mutarii curente).
In mod similar procedez pentru o mutare spre est.
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
