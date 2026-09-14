---
id: OJI-2016-VII-galerie
title: Soluția problemei galerie (OJI 2016, clasa a VII-a)
problem_id: 871
authors: []
# prerequisites:
#    - placeholder
tags:
    - OJI
    - clasa VII
---

Articolul va fi disponibil curând în arhivă.

Până atunci, puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2016/07/galerie.txt).

<div class="editorial-text" markdown>

```text
Problema  2 - galerie	100 puncte


Autor prof. Cristina Sichim
Colegiul Național „Ferdinand I”, Bacău
Descrierea soluției

Cerința 1     ( 30 puncte)

Problema se restrânge la fiecare pas la mulțimea cârtițelor active (cele care sapă).
Pentru fiecare moment de timp
•	se determină, pentru fiecare dintre cârtițele active, celula în care ajunge;
•	se elimină apoi din mulțimea cârtițelor active, cârtițele care se opresc, fie pentru că în celula în care au ajuns se mai află și alte cârtițe, fie pentru că au ajuns într-o altă galerie (pe marginea terenului sau într-o galerie interioară);
•	se contorizează momentele de timp în care cel puțin o cârtiță este activă.


Cerința 2    ( 70 de puncte)

Pentru fiecare cârtiță ci, se memorează lungimea li a galeriei interioare în care se află.
Dacă o cârtiță sapă singură într-o celulă, atunci, se adună o unitate la lungimea traseului săpat.
Dacă o cârtiță c1 sapă într-o galerie interioară, de lungime l1, și ajunge în galeria unei alte cârtițe c2, care se află într-o galerie interioară de lungime l2,  atunci cârtița c1 se oprește, galeriile se unesc, și lungimea galeriei l2,  în care se află cârtița c2, devine l1+l2.
Dacă într-o celulă ajung, în același moment de timp, mai multe cârtițe, c1, c2,…,ck, atunci, toate cârtițele se opresc și se formează o galerie de lungime l1+l2+..+lk.
Când toate cârtițele se opresc, se determină max{li|1≤i≤t}.
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
