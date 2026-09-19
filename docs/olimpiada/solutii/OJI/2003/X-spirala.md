---
id: OJI-2003-X-spirala
title: Soluția problemei Spirala (OJI 2003, clasa a X-a)
problem_id: 721
authors: [rpintea]
prerequisites:
    - backtracking
    - divisibility
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2003/10/rezolvare%20spirala.txt).

<div class="editorial-text" markdown>

```text
Se calculeaza pentru fiecare pozitie numarul de amestecari dupa care se repeta pozitia respectiva (perioda principala).
Se calculeaza pentru toti divizorii d ai celui mai mic multiplu comun al numerelor calculate (tinut ca factori primi si exponentii corespunzatori) numarul de pozitii care se repeta dupa d amestecari.
Sursa comisiei genereaza divizorii cu bkt pe exponentii descompunerii in factori primi.
```

</div>

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: raulthestorm (kilonova)
#include <fstream>
#include <iostream>

using namespace std;

int N, K, N2, P[2501], L[2501], nrC, E[2501], D[51], nrD, nrAmestec = 0x7fffffff;
bool A[2501];

ifstream f("spirala.in");
ofstream g("spirala.out");

void permutare() {
    int m[51][51], i, j, nr = 0;
    int li = 0, ci = 0, lf = N + 1, cf = N + 1;
    while (nr < N2) {
        li++, ci++, lf--, cf--;
        for (i = ci; i <= cf; i++)
            m[li][i] = ++nr;
        for (i = li + 1; i <= lf; i++)
            m[i][cf] = ++nr;
        for (i = cf - 1; i >= ci; i--)
            m[lf][i] = ++nr;
        for (i = lf - 1; i > li; i--)
            m[i][ci] = ++nr;
    }
    //
    nr = 0;
    for (i = 1; i <= N; i++)
        if (i % 2 != 0)
            for (j = 1; j <= N; j++)
                P[++nr] = m[i][j];
        else
            for (j = N; j >= 1; j--)
                P[++nr] = m[i][j];
}

void expon(int &x, int d) {
    int ex = 0;
    while (x % d == 0) {
        x /= d;
        ex++;
    }
    if (E[d] < ex)
        E[d] = ex;
}

void factPrimi(int x) {
    expon(x, 2);
    for (int d = 3; d * d <= x; d += 2)
        expon(x, d);
    if (x > 1 && E[x] == 0)
        E[x] = 1;
}

void divizoriPrimi() {
    if (E[2] != 0)
        D[++nrD] = 2;
    for (int i = 3; i <= N2; i += 2)
        if (E[i] != 0)
            D[++nrD] = i;
}

void cicluri() {
    for (int i = N + 2; i <= N2; i++)
        if (A[i] == 0) {
            int j = i, lg = 0;
            do {
                lg++;
                A[j] = 1;
                j = P[j];
            } while (j != i);
            L[++nrC] = lg;
            factPrimi(lg);
        }
}

void backt(int k, long long prod) {
    if (k <= nrD) {
        long long p = 1;
        for (int i = 0; i <= E[D[k]]; i++) {
            backt(k + 1, prod * p);
            p *= D[k];
        }
    } else {
        int s = 0;
        for (int i = 1; i <= nrC; i++)
            if (prod % L[i] == 0)
                s += L[i];
        if (s == K && prod < nrAmestec)
            nrAmestec = prod;
    }
}

int main() {
    f >> N >> K;
    N2 = N * N;
    K -= N + 1;
    if (K < 0) {
        g << '0';
    } else {
        permutare();
        cicluri();
        divizoriPrimi();
        backt(1, 1LL);
        g << nrAmestec;
    }
    f.close();
    g.close();
    return 0;
}
```
