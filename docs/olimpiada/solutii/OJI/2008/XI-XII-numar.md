---
id: OJI-2008-XI-XII-numar
title: Soluția problemei numar (OJI 2008, clasele XI-XII)
problem_id: 46
authors: [ciurea]
prerequisites:
    - ad-hoc
tags:
    - OJI
    - clasa XI-XII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2008/11-12/numar.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2008/11-12/numar.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2008/11-12/numar.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;
ifstream f("numar.in");
ofstream g("numar.out");
int n, m;
int v1[102], cd[102];
int prv, min1, poz1;
int main() {
    f >> n >> m;
    for (int i = 1; i <= n; ++i)
        f >> v1[i], cd[i] = v1[i];
    while (m) {
        min1 = cd[1];
        poz1 = 1;
        for (int i = 2; i <= n; ++i)
            if (cd[i] < min1)
                min1 = cd[i], poz1 = i;
        if (min1 != prv) {
            --m;
            prv = min1;
        }
        cd[poz1] += v1[poz1];
    }
    g << min1;
}
```
