---
id: OJI-2019-VI-maxim
title: Soluția problemei maxim (OJI 2019, clasa a VI-a)
problem_id: 909
authors: [rpintea]
prerequisites:
    - ad-hoc
    - frequency-arrays
tags:
    - OJI
    - clasa VI
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2019/06/maxim.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2019/06/maxim.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2019/06/maxim.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;
ifstream f("maxim.in");
ofstream g("maxim.out");
int c;
int n, m, v[500002];
int frq[12];
int nrmax[12];
int main() {
    f >> c;
    f >> n >> m;
    for (int i = 1; i <= n; ++i)
        f >> v[i];
    for (int i = 1; i <= m; ++i)
        ++frq[v[i]];
    if (c == 1) {
        for (int i = 9; i >= 0; --i)
            for (int j = 1; j <= frq[i]; ++j)
                g << i;
        return 0;
    }
    --frq[v[m]];
    int ans = 0;
    for (int i = m; i <= n; ++i) {
        ++frq[v[i]];
        if (i > m)
            --frq[v[i - m]];
        int eq = 0;
        for (int j = 9; j >= 0; --j)
            if (frq[j] > nrmax[j]) {
                eq = 1;
                break;
            } else if (frq[j] < nrmax[j]) {
                eq = -1;
                break;
            }
        if (eq != -1) {
            ans = i - m + 1;
            for (int j = 9; j >= 0; --j)
                nrmax[j] = frq[j];
        }
    }
    g << ans;
    return 0;
}
```
