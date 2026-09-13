---
id: OJI-2012-V-alice
title: Soluția problemei alice (OJI 2012, clasa a V-a)
problem_id: 819
authors:
    - traian
prerequisites:
    - digits-manipulation
tags:
    - OJI
    - clasa V
    - cifre
---

## Cerința 1

Doar ne uităm prin toate numerele pare, înainte să le procesăm pentru cerința 2, iar dacă sunt pare, verificăm dacă sunt maxime.

## Cerința 2

Mai întâi, să aflăm cum complementăm un număr. Vom afla cifra maximă a numărului și numărul de cifre al acestuia ($c$). Din numărul format din cifra maximă repetată de $c$ ori, vom scădea numărul inițial.

Un număr nu este magic dacă ajungem la un moment dat la două numere care se repetă. Așa că, vom tot aplica operația de complementare până când numărul nou este egal cu cel precedent sau până când ajungem la o singură cifră, care va fi cheia ușii.

## Cod sursă

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <fstream>

using namespace std;

ifstream fin("alice.in");
ofstream fout("alice.out");

int main() {
    int n, k;
    fin >> n >> k;

    int maxim = 0, cntk = 0;
    for (int i = 1; i <= n; i++) {
        int x;
        fin >> x;

        if (x % 2 == 0) {
            if (x > maxim) {
                maxim = x;
            }
        }

        int prev = -1;
        while (x >= 10) {
            int maxcf = 0, copie = x, ncf = 0;
            while (copie > 0) {
                if (copie % 10 > maxcf) {
                    maxcf = copie % 10;
                }
                ncf++;
                copie /= 10;
            }

            int nrnou = 0;
            for (int i = 0; i < ncf; i++) {
                nrnou = nrnou * 10 + maxcf;
            }
            nrnou -= x;
            if (nrnou == prev) {
                break;
            }

            prev = x;
            x = nrnou;
        }

        if (x == k) {
            cntk++;
        }
    }

    fout << maxim << "\n" << cntk << "\n";
    return 0;
}
```
