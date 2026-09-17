---
id: OJI-2026-VII-mario
title: Soluția problemei mario (OJI 2026, clasa a VII-a)
problem_id: 4220
authors: []
prerequisites:
    - frequency-arrays
    - partial-sums
tags:
    - OJI
    - clasa VII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2026/07.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2026/07.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2026/07.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// prof. Raluca Costineanu
#include <cassert>
#include <fstream>
using namespace std;
#define Nmax 1000010
#define dif 450000
ifstream f("mario.in");
ofstream g("mario.out");

int n, C, K;
long long A[Nmax];
int B[Nmax];
int D[2][2 * dif + 1];
int main() {
    f >> C >> n >> K;
    int i;
    for (i = 1; i <= n; ++i)
        f >> A[i];
    for (i = 1; i <= n; ++i)
        f >> B[i];
    if (C == 1) {
        int d, dMx = 0, ind = 0;
        for (i = 1; i <= n; ++i) {
            if (A[i] > B[i])
                d = A[i] - B[i];
            else
                d = B[i] - A[i];
            if (d > dMx)
                dMx = d, ind = i;
        }
        g << ind << '\n';
    } else if (C == 2) {
        long long mx = 0;
        int start = 0;
        for (i = 1; i <= n; ++i)
            A[i] += A[i - 1];
        for (i = K; i <= n; ++i)
            if (A[i] - A[i - K] > mx)
                mx = A[i] - A[i - K], start = i - K + 1;
        g << start << '\n';
    } else if (C == 3) {
        int st = -1, dr = -1, k;
        for (i = 1; i <= n; ++i)
            A[i] = A[i] - B[i];
        for (i = 1; i <= n; ++i)
            A[i] += A[i - 1];
        for (i = 0; i <= n; ++i) {
            k = A[i] + dif;
            if (D[0][k] == 0)
                D[0][k] = i + 1;
            else if (D[1][k] == 0)
                D[1][k] = i;
        }
        for (i = 0; i <= 2 * dif; ++i)
            if (D[1][i])
                if (st == -1 || D[0][i] < st || (D[0][i] == st && D[1][i] < dr))
                    st = D[0][i], dr = D[1][i];
        g << st << ' ' << dr << '\n';
    }
    return 0;
}
```
