---
id: OJI-2013-VII-unific
title: Soluția problemei unific (OJI 2013, clasa a VII-a)
problem_id: 835
authors: []
# prerequisites:
#    - placeholder
tags:
    - OJI
    - clasa VII
---

Articolul va fi disponibil curând în arhivă.

Până atunci, puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2013/07/unific.txt).

<div class="editorial-text" markdown>

```text
Solutie unific		- prof. Eugen Nodea
			Colegiul National "Tudor Vladimirescu", Tg-Jiu


Solutia propusa analizeaza secvential numerele inca din citirea din fisier.

a)
Pentru realizarea primei cerinta se construieste vectorul caracteristic al
cifrelor care apar in scrierea celor N numere naturale din sir.

b)
Trebuie avut in vedere ca prin unificarea lui A[i] cu A[i+1], numarul nou obtinut in A[i]
poate genera la randul lui posibile unificari cu numerele anterior determinate A[i-1],A[i-2],...

    Citeste a[1]
    i = 1,
    Cat timp Not Eof() Executa
        Citeste xa - valoarea curenta
        Daca comun(a[i], xa)
            Atunci
                a[i] = unifica (a[i],xa);

		//verificam posibile unificari
                Cat timp (comun(a[i],a[i-1]) && i>1) Executa
                    a[i-1] = unific(a[i-1],a[i])
                    i--;
                Sf. cat timp
            Altfel
                a[++i] = xa
        Sf. daca
    Sf. cat timp

Un caz aparte il reprezinta numerele care contin cifra 0.

O solutie brute-force care elimina prin deplasare elementele (A[i])i=1,N
obtine cel mult 50p.
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
