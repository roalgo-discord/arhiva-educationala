---
id: OJI-2010-IX-numar
title: Soluția problemei numar (OJI 2010, clasa a IX-a)
problem_id: 794
authors: [ciurea]
prerequisites:
    - digits-manipulation
    - arrays
    - bignum
tags:
    - OJI
    - clasa IX
---

Se ia initial

- $a$ = numarul format din cifrele lui $q$ din care se “scoate” punctual zecimal
- $b = 1$ urmat de atatea cifre de $0$ cate cifre are partea zecimala (fractionara).

Evident, $a$ si $b$ trebuie implementate ca numere mari – fiecare cifra ca
element al unui vector.

Apoi simplificam fractia formata din $a$ si $b$. Matematic, simplificarea
ar trebui facuta cu cmmmdc-ul dintre $a$ si $b$,
dar nu are rost sa calculam acest numar deoarece $a$ si $b$ sunt numere
mari si acest calcul s-ar face prin scaderi
repetate sau implementarea impartirii pe numere mari, ceea ce e complicat
si nu garanteaza incadrarea in timp.

De fapt, cele doua numere $a$ si $b$ nu se pot simplifica decat cu o putere
a lui $2$ sau a lui $5$, avand in vedere ca $b$ este
o putere a lui $10$ – asa ca tot ce trebuie sa facem este sa implementam
impartirea unui numar mare la un numar de o singura cifra.

## Punctaje partiale

Pentru punctaje partiale, putem lucra cu variabile numerice:

- daca folosim tipuri pe 16 biti (integer in pascal) obtinem 10 puncte
- daca folosim tipuri pe 32 biti (longint in pascal respective long sau int
in C/C++) obtinem 20 de puncte
- daca folosim tipuri pe 64 biti (int64 in pascal respective long long in
C/C++) obtinem 35 de puncte

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
