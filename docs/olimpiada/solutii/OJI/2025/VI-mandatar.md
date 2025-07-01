---
id: OJI-2025-VI-mandatar
title: Soluția problemei mandatar (OJI 2025, clasa a VI-a)
problem_id: 3638
authors: [nodea]
prerequisites:
    - sieve
    - arrays
tags:
    - OJI
    - clasa VI
---

## Cerința 1 - 50p

Se rețin numerele citite din fișierul de intrare în șirul $A$ - tablou
unidimensional (vector). Pentru determinarea celui mai mare număr prim din șirul
$A$ se folosește un algoritm de verificare a primalității unui număr. În funcție
de implementarea aleasă pentru verificarea primalității se pot obține punctaje
gradual, între 20-50p ($\mathcal{O}(n)$, $\mathcal{O}(\sqrt{n})$, ciurul lui
Eratostene).

## Cerința 2 - 30p

Pe baza șirului $A$, construim șirul $B$ folosind un algoritm de descompunere în
factori primi, unde fiecare element al șirului $B_i$ este cel mai mic număr
natural care are aceia și factori primi cu $A_i$, cu $1 \leq i \leq n$.

Algoritmul de descompunere în factori primi va determina, pentru fiecare element
al șirului $A$, atât elementele șirului $B$ cât și numărul de factori primi al
fiecărui element $B_i$ . Se va reține cel mai mare număr al șirului $B$ care are
un număr maxim de factori primi.

În funcție de implementarea aleasă pentru descompunerea în factori primi se pot
obține punctaje gradual, între 10-30p ($\mathcal{O}(n)$,
$\mathcal{O}(\sqrt{n})$, ciurul lui Eratostene sau optimizari ale
factorizării).

!!! note "Observație"

    Printr-un algoritm de descompunere în factori primi se poate rezolva atât
    Cerința 1 cât și Cerința 2.

## Cerința 3 - 20p

Pentru determinarea lungimii maxime a unei secvențe mandatorii din șirul $B$ se
poate folosi o structură for ce parcurge numerele mandatare. Acestea pot fi: 2,
3, 5, 6 sau 7.

```cpp
for (int x = 2; x <= 7; x++) {
    if (x == 4) continue;
    
    int k = 0;
    bool ok = false;

    for (int i = 1; i <= n; i++) {
        if (B[i] % x == 0) {
            k++;
            
            if (B[i] == x) {
                ok = true;
            }

            if (ok && k > lgmax) {
                lgmax = k;
            }
        } else {
            k = 0;
            ok = false;
        }
    }
}
```

## Rezolvare

Mai jos puteți găsi o soluție care ia punctajul maxim.

```cpp
//////Pit_Rada Ionel-Vasile
#include <fstream>
using namespace std;
ifstream fin("mandatar.in");
ofstream fout("mandatar.out");
int Ce, N, A, B[100002], P[5002], nP;
int pmax = 0, bmax, nrmax = 0, lg, nr, x, y, z, lgmax;

int main() {
    /// depozitez numerele prime <=3200 in vectorul P[]
    /// sunt suficiente pentru a verifica primalitatea oricarui numar <= 10^7
    P[1] = 2;
    P[2] = 3;
    P[3] = 5;
    P[4] = 7;
    nP = 4;
    for (int i = 11; i <= 3200; i += 2) {
        int ok = 1;
        /// verific daca i este prim folosind numere prime din P[]
        for (int j = 1; j <= nP && P[j] * P[j] <= i; j++) {
            if (i % P[j] == 0) {
                ok = 0;
                break;
            }
        }
        if (ok == 1) {
            P[++nP] = i;
        }
    }
    fin >> Ce >> N;
    for (int i = 1; i <= N; i++) {
        fin >> A;
        /// descompunere in factori primi
        x = A;
        y = 1;
        z = 0;
        for (int j = 1; P[j] * P[j] <= x; j++) {
            if (x % P[j] == 0) {
                z++;
                y *= P[j];
                while (x % P[j] == 0) {
                    x /= P[j];
                }
            }
        }
        if (x > 1) {
            z++;
            y *= x;
        }
        B[i] = y;
        if (z == 1) {
            if (A > pmax) {
                pmax = A;
            }
        }
        if (z > nrmax) {
            nrmax = z;
            bmax = y;
        } else {
            if (z == nrmax && y > bmax) {
                bmax = y;
            }
        }
    }
    lgmax = 0;
    /// pentru fiecare 2<=y<=7 calculez cea mai buna lungime a unei secvente
    /// mandatare
    for (int y = 7; y >= 2; y--) {
        if (y != 4) {
            lg = 0;
            nr = 0;
            for (int i = 1; i <= N; i++) {
                if (B[i] % y == 0) {
                    lg++;
                    if (B[i] == y) {
                        nr = 1;
                    }
                    if (nr == 1 && lg > lgmax) {
                        lgmax = lg;
                    }
                } else {
                    lg = 0;
                    nr = 0;
                }
            }
        }
    }
    if (Ce == 1) {
        fout << pmax;
    }
    if (Ce == 2) {
        fout << bmax;
    }
    if (Ce == 3) {
        fout << lgmax;
    }
    return 0;
}
```
