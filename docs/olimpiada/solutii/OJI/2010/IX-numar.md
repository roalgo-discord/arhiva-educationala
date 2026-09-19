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
// credits: ema_nicole (kilonova)
#include <deque>
#include <fstream>

using namespace std;
const int NMAX = 2002;
int a[2 * NMAX], b[2 * NMAX];
deque<int> d, d2;

ifstream cin("numar.in");
ofstream cout("numar.out");

void init() {
    int pos = 0;
    a[0] = d.size() + d2.size();
    while (!d2.empty() || !d.empty()) {
        if (!d2.empty()) {
            a[++pos] = d2.back();
            d2.pop_back();
        } else {
            a[++pos] = d.back();
            d.pop_back();
        }
    }
}

void impartire(int x[2 * NMAX], int imp) {
    int r = 0;
    for (int i = x[0]; i >= 1; i--) {
        r = r * 10 + x[i];
        x[i] = r / imp;
        r %= imp;
    }
    while (x[0] > 1 && x[x[0]] == 0) /// zerouri nesemnificative :DD
        x[0]--;
}

void print(int x[2 * NMAX]) {
    for (int i = x[0]; i >= 1; i--)
        cout << x[i];
}

int main() {
    int pi, pf, x;
    cin >> pi >> pf;
    for (int i = 1; i <= pi; i++) {
        cin >> x;
        d.push_back(x);
    }
    while (!d.empty() && d.front() == 0)
        d.pop_front();
    pi = d.size();

    for (int i = 1; i <= pf; i++) {
        cin >> x;
        d2.push_back(x);
    }
    while (!d2.empty() && d2.back() == 0)
        d2.pop_back();
    pf = d2.size();

    init(); /// a
    b[0] = pf + 1;
    b[b[0]] = 1;

    int doi = pf, cinci = pf;
    while (a[1] == 0 && doi > 0 && cinci > 0) {
        impartire(a, 10);
        impartire(b, 10);
        doi--;
        cinci--;
    }
    while (a[1] % 5 == 0 && cinci > 0) {
        impartire(a, 5);
        impartire(b, 5);
        cinci--;
    }
    while (a[1] % 2 == 0 && doi > 0) {
        impartire(a, 2);
        impartire(b, 2);
        doi--;
    }
    cout << a[0] << '\n';
    print(a);
    cout << '\n' << b[0] << '\n';
    print(b);

    return 0;
}
```
