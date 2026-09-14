---
id: OJI-2005-X-lacusta
title: Soluția problemei Lăcusta (OJI 2005, clasa a X-a)
problem_id: 745
authors: []
# prerequisites:
#    - placeholder
tags:
    - OJI
    - clasa X
---

Articolul va fi disponibil curând în arhivă.

Până atunci, puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2005/10/lacusta.txt).

<div class="editorial-text" markdown>

```text
 Enuntul ne sugereaza metoda folosita: programarea dinamica. Fie A matricea data. Vom construi
o matrice B, in  care Bij=suma minima pentru a ajunge in celula (i,j) venind din celula (i-1,j) .
Prima linie completata va fi linia a doua: B[2,1]=infinit (in conditiile probleei nu putem ajunge
in aceasta celula venind de deasupra), iar B[2,j]=A[1,1]+A[1,j]+A[2,j]. Pentru celelalte linii
B[i,j]=A[i,j]+A[i-1,j]+minimul dintre B[i-1,1],B[i-1,2],...,B[i-1,n], daca j este diferit de
coloana minimului. Pentru coloana minimului, deoarece nu putem cobora direct ci trebuie sa facem
un salt pe orizontala, vom determina al doilea minim de pe linia i-1. Dupa ce calculam linia m,
gasim minimul dintre B[m,1],B[m,2],...,B[m,n-1] si-l adunam cu A[m,n] obtinand suma minima ceruta.
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
