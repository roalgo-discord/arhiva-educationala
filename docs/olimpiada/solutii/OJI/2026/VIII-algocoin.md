---
id: OJI-2026-VIII-algocoin
title: Soluția problemei algocoin (OJI 2026, clasa a VIII-a)
problem_id: 4221
authors: []
prerequisites:
    - ad-hoc
    - frequency-arrays
    - sorting
tags:
    - OJI
    - clasa VIII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2026/08.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2026/08.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2026/08.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// problema algocoin, 100 de puncte
// solutie fara cautare binara la cerinta 3
// Eduard Pirtac
#include <algorithm>
#include <climits>
#include <fstream>
using namespace std;

const int nMAX = 200000;
const int kMAX = 1000;

int v[nMAX + 1];
long long monezi[nMAX + 1];
int fv[kMAX]; // pentru cerinta 2

int main() {
    ifstream fin("algocoin.in");
    ofstream fout("algocoin.out");

    int cer, n, k, p;
    fin >> cer >> n >> k >> p;
    for (int i = 1; i <= n; ++i)
        fin >> v[i];

    sort(v + 1, v + n + 1);
    int idx = 1; // locul curent in clasament
    for (int i = 1; i <= n; ++i) {
        if (v[i] != v[i - 1])
            idx = i;
        monezi[i] = 1LL * idx * v[i];
    }

    if (cer == 1) {
        for (int i = 1; i <= n; ++i)
            fout << monezi[i] << ' ';
        fout << '\n';
    } else if (cer == 2) {
        // complexitate O(k)
        for (int i = 1; i <= n; ++i)
            fv[monezi[i] % k]++;

        long long ans = fv[0] * (fv[0] - 1LL) / 2; // 0 cu 0
        if (k % 2 == 0)
            ans += fv[k / 2] * (fv[k / 2] - 1LL) / 2; // k/2 cu k/2
        for (int x = 1; x < (k + 1) / 2; ++x)
            ans += 1LL * fv[x] * fv[k - x]; // x cu k-x

        fout << ans << '\n';
    } else if (cer == 3) {
        // complexitate O(p) sau O(n)
        // grupez elementele n-2p+1...n-p
        // cu elementele n...n-p+1
        long long mn = LLONG_MAX;
        for (int j = 0; j < p; ++j)
            mn = min(mn, monezi[n - j] + monezi[n - 2 * p + 1 + j]);

        fout << (mn - 1) / k * k << '\n';
    }
}
```
