---
id: OJI-2012-X-culori
title: Soluția problemei Culori (OJI 2012, clasa a X-a)
problem_id: 828
authors: []
# prerequisites:
#    - placeholder
tags:
    - OJI
    - clasa X
---

Articolul va fi disponibil curând în arhivă.

Până atunci, puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2012/10/culori.txt).

<div class="editorial-text" markdown>

```text
culori - Descrierea solutiei
prof. Carmen Popescu - Col. Nat. Gh. Lazar sibiu


Notam
 nr[i,j] = numarul de variante de a vopsi primele i scanduri, daca scandura i o vopsim cu culoarea j, j=1,2,3,4,5
 S[i] = numarul de variante de a vopsi primele i scanduri din gard

Se observa ca au loc urmatoarele relatii:
  S[i]=nr[i,1]+nr[i,2]+nr[i,3]+nr[i,4]+nr[i,5]

  nr[i,1]=nr[i-1,2]
  nr[i,2]=nr[i-1,1]+nr[i-1,3]
  nr[i,3]=nr[i-1,2]+nr[i-1,4]
  nr[i,4]=nr[i-1,3]+nr[i-1,5]
  nr[i,5]=nr[i-1,4]

  Cum nr[1,j]=1 se poate observa usor ca
=>  nr[i,1]=nr[i,5]  si
    nr[i,2]=nr[i,4]

si
    nr[i,3]=2*nr[i,2]


  Asadar:
    nr[i,2]=nr[i-1,1]+nr[i-1,3]=nr[i-2,2]+2*nr[i-2,2]=3*nr[i-2,2]  pt i>2

    nr[i,1]=nr[i-1,2]=3*nr[i-3,2]=3*nr[i-2,1]  pt i>4

    nr[i,3]=2*nr[i-1,2]=6*nr[i-3,2]=3*nr[i-2,3]  pt i>4

=>  S[i]= 2*nr[i,1]+2*nr[i,2]+nr[i,3] =
        = 6*nr[i-2,1]+6*nr[i,2,2]+3*nr[i-2,3] = 3*S[i-2]

In concluzie obtinem:
     S[1]=5
     S[2]=8
     S[3]=14

     S[2k] = 3^(k-1) * S[2]  pt k>1
si   S[2k+1] = 3^(k-1) *S[3]  pt k>1

Pentru calcularea acestor expresii se vor folosi numere mari!
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
