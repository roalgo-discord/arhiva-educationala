---
id: OJI-2007-VIII-afise
title: Soluția problemei afise (OJI 2007, clasa a VIII-a)
problem_id: 766
authors: []
# prerequisites:
#    - placeholder
tags:
    - OJI
    - clasa VIII
---

Articolul va fi disponibil curând în arhivă.

Până atunci, puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2007/08/afise.txt).

<div class="editorial-text" markdown>

```text
Problema AFISE

Se marcheaza care sunt zonele ce trebuie acoperite, o data cu citirea datelor.

Se retine intr-un vector care este lungimea zonei ce trebuie acoperita (cate unitati contine)
urmata de zona ce poate ramane neacoperita (alba).

Se realizeaza o ordonare dupa numarul de zone albe.

Constructia solutiei se realizeaza astfel:

 - se considera la inceput suma distantelor ce trebuie acoperite, numarand si cate zone sunt de acoperit, prin
parcurgerea componentelor ce trebuie acoperite din vectorul creat.
 - daca numarul de panorui este mai mare decat numarul admis, se considera in continuare si zonele
albe luand in considerare primele zone din vectorul ordonat, stiut fiind ca o zona alba urmeaza obligatoriu
dupa o zona ce trebuie acoperita.
 Se realizeaza in acest fel distanta minima ce trebuie acoperita.
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
