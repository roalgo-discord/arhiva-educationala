---
id: OJI-2010-VIII-secvente
title: Soluția problemei secvente (OJI 2010, clasa a VIII-a)
problem_id: 802
authors: [nicoli]
prerequisites:
    - divisibility
    - sieve
tags:
    - OJI
    - clasa VIII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2010/08/secvente.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2010/08/secvente.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2010/08/secvente.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

ifstream fin("secvente.in");
ofstream fout("secvente.out");

const int MAXNUM = 3e4, MAXN = 2e4, MAXD = 1;

int numToIndex[MAXN * MAXD];
char ciur[MAXNUM + 1];

int main() {
    int d, n, p, k, i, j, num, numPPrime;

    // Folosim Ciurul lui Eratostene pentru a calcula numerele prime
    for (i = 2; i * i <= MAXNUM; i++) {
        if (ciur[i] == 0) {
            for (j = i * i; j <= MAXNUM; j += i) {
                ciur[j] = 1;
            }
        }
    }

    fin >> d;
    while (d--) {
        fin >> n >> p >> k;

        numPPrime = 0;
        for (i = 1; i <= n; i++) {
            fin >> num;

            // Verificam daca numarul este p-prim
            if (num != 1) { // Numarul 1 nu este p-prim
                while (num % p == 0) {  // Impartim de cate ori se poate la p
                    num /= p;
                }
                if (!ciur[num]) {  // Daca numarul ramas este prim
                    numPPrime++;
                    numToIndex[numPPrime] = i; // Salvam indexul numarului
                }
            }
        }   
        fout << max(0, numPPrime - k + 1) << '\n';
        for(i = 1; i <= numPPrime - k + 1 && i + k - 1 <= numPPrime; i++){
            fout << numToIndex[i] << ' ' << numToIndex[i + k - 1] << '\n';
        }
    }

    
    return 0;
}
```
