---
id: OJI-2019-VI-album
title: Soluția problemei album (OJI 2019, clasa a VI-a)
problem_id: 908
authors: [vgrecea]
prerequisites:
    - simulating-solution
tags:
    - OJI
    - clasa VI
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2019/06/album.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2019/06/album.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2019/06/album.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;
ifstream f("album.in");
ofstream g("album.out");
int c, n;
int v[800002];
int cf[10], ct;
vector<int> tp[102];
bool viz[800002];
int main() {
    f >> c;
    f >> n;
    for (int i = 1; i <= n; ++i)
        f >> v[i];
    if (c == 1) {
        while (v[n]) {
            cf[++ct] = v[n] % 10;
            v[n] /= 10;
        }
        sort(cf + 1, cf + ct + 1);
        g << cf[ct - 1] << " " << cf[ct];
        return 0;
    }
    for (int i = 1; i <= n; ++i) {
        int nr = v[i];
        ct = 0;
        while (nr) {
            cf[++ct] = nr % 10;
            nr /= 10;
        }
        for (int a = 1; a <= ct; ++a)
            for (int b = a + 1; b <= ct; ++b) {
                int pp = min(cf[a], cf[b]);
                int qq = max(cf[a], cf[b]);
                tp[pp * 10 + qq].push_back(i);
            }
    }
    int nrV = 0, nrR = 0;
    bool of = 0;
    for (int i = 1; i <= n; ++i) {
        if (viz[i])
            continue;
        int nr = v[i];
        ct = 0;
        while (nr) {
            cf[++ct] = nr % 10;
            nr /= 10;
        }
        sort(cf + 1, cf + ct + 1);
        int tip = cf[ct - 1] * 10 + cf[ct];
        for (int j = 0; j < tp[tip].size(); ++j) {
            int pz = tp[tip][j];
            if (viz[pz])
                continue;
            if (of == 0)
                ++nrV;
            else
                ++nrR;
            viz[pz] = 1;
        }
        of ^= 1;
    }
    if (nrV >= nrR)
        g << "V ";
    if (nrV <= nrR)
        g << "R ";
    g << '\n';
    g << max(nrV, nrR);
    return 0;
}
```
