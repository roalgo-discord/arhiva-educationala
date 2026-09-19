---
id: OJI-2026-VII-bonsai
title: Soluția problemei bonsai (OJI 2026, clasa a VII-a)
problem_id: 4219
authors: [rcotoi]
prerequisites:
    - partial-sums
    - binary-search
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
/*
Bonsai - 100p
Complexitate - O(n x m)
Autor: prof. Adrian Panaete
*/

#include <algorithm>
#include <fstream>

using namespace std;
ifstream f("bonsai.in");
ofstream g("bonsai.out");
const int N = 1002;
int cer, n, m, L, R, U[N], D[N], SL[N][N], SC[N][N], C1, R2, C2, S3, R3, I3, J3;
int main() {
    f >> cer >> n >> m;
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++) {
            int x;
            f >> x;
            SL[i][j] = SL[i][j - 1] + x; /// sume partiale pe linia i
            SC[i][j] = SC[i - 1][j] + x; /// sume partiale pe coloana j
        }

    for (int i = 1; i <= n; i++) {
        L = R = -1;
        for (int j = 1; j <= m; j++) {
            int aij = SL[i][j] - SL[i][j - 1];
            if (!aij)
                continue;
            if (j > R) {
                L = R = j;
                while (SL[i][R + 1] > SL[i][R])
                    R++;
            }
            if (i > D[j]) {
                U[j] = D[j] = i;
                while (SC[D[j] + 1][j] > SC[D[j]][j])
                    D[j]++;
            }
            int r = min(min(i - U[j], D[j] - i), min(j - L, R - j));
            C1 += r ? 0 : 1;
            if (r > R2) {
                R2 = r;
                C2 = 1;
            } else if (r == R2)
                C2++;
            int s = SC[i + r][j] - SC[i - r - 1][j] + SL[i][j + r] - SL[i][j - r - 1] - aij;
            if (s > S3) {
                S3 = s;
                R3 = r;
                I3 = i;
                J3 = j;
            } else if (s == S3 && r > R3) {
                R3 = r;
                I3 = i;
                J3 = j;
            }
        }
    }
    if (cer == 1)
        g << C1 << '\n';
    else if (cer == 2)
        g << R2;
    else
        g << S3 << ' ' << I3 << ' ' << J3 << '\n';
    return 0;
}
```
