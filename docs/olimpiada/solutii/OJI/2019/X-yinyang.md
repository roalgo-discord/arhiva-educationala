---
id: OJI-2019-X-yinyang
title: Soluția problemei yinyang (OJI 2019, clasa a X-a)
problem_id: 650
authors: [eudanip]
prerequisites:
    - ad-hoc
    - sorting
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2019/10/yinyang.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2019/10/yinyang.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2019/10/yinyang.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;
ifstream f("yinyang.in");
ofstream g("yinyang.out");
int n, m;
int a[102][102];
bool gg(int x, int y) {
    bool mic = 0;
    for (int j = 1; j <= m; ++j)
        if (a[x][j] < a[y][j])
            return 0;
        else if (a[x][j] > a[y][j])
            mic = 1;
    return mic;
}
bool gg2(int x, int y) {
    bool mic = 0;
    for (int j = 1; j <= n; ++j)
        if (a[j][x] < a[j][y])
            return 0;
        else if (a[j][x] > a[j][y])
            mic = 1;
    return mic;
}
int main() {
    f >> n >> m;
    for (int j = 1; j <= n; ++j)
        for (int i = 1; i <= m; ++i)
            f >> a[j][i];
    bool ok = 1;
    int op = 0;
    while (ok) {
        ok = 0;
        for (int i = 1; i < n; ++i)
            if (gg(i, i + 1)) {
                ++op;
                for (int j = 1; j <= m; ++j)
                    swap(a[i][j], a[i + 1][j]), ok = 1;
            }
    }
    ok = 1;
    while (ok) {
        ok = 0;
        for (int i = 1; i < m; ++i)
            if (gg2(i, i + 1)) {
                ++op;
                for (int j = 1; j <= n; ++j)
                    swap(a[j][i], a[j][i + 1]), ok = 1;
            }
    }
    for (int i = 1; i <= n; ++i)
        for (int j = 1; j <= m; ++j) {
            if (j != 1 && a[i][j] < a[i][j - 1]) {
                g << -1;
                return 0;
            }
            if (i != 1 && a[i][j] < a[i - 1][j]) {
                g << -1;
                return 0;
            }
        }
    g << op;
    return 0;
}
```
