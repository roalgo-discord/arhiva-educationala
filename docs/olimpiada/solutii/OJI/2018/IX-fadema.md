---
id: OJI-2018-IX-fadema
title: Soluția problemei fadema (OJI 2018, clasa a IX-a)
problem_id: 891
authors: [galatan]
prerequisites:
    - ad-hoc
    - stack
    - partial-sums
tags:
    - OJI
    - clasa IX
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2018/09/fadema.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2018/09/fadema.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2018/09/fadema.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>

using namespace std;
const int NMAX = 1001;

ifstream cin("fadema.in");
ofstream cout("fadema.out");

int v[NMAX][NMAX];
int okdr[NMAX][NMAX];
int okst[NMAX][NMAX];
int col[NMAX][NMAX];
int n, m;
int main() {
    int maxx = 0;
    cin >> n >> m;
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++)
            cin >> v[i][j];

    for (int i = 1; i <= n; i++) {
        for (int j = m; j >= 1; j--) {
            if (j == m || v[i][j] == v[i][j + 1])
                okdr[i][j] = 1;
            else
                okdr[i][j] = okdr[i][j + 1] + 1;
        }
    }
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (j == 1 || v[i][j] == v[i][j - 1])
                okst[i][j] = 1;
            else
                okst[i][j] = okst[i][j - 1] + 1;
        }
    }
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (i == 1)
                col[i][j] = 1;
            else {
                if (v[i][j] != v[i - 1][j]) {
                    okst[i][j] = min(okst[i - 1][j], okst[i][j]);
                    okdr[i][j] = min(okdr[i - 1][j], okdr[i][j]);
                    col[i][j] = col[i - 1][j] + 1;
                } else
                    col[i][j] = 1;
            }
        }
    }
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (col[i][j] * (okst[i][j] + okdr[i][j] - 1) > maxx)
                maxx = col[i][j] * (okst[i][j] + okdr[i][j] - 1);
        }
    }
    cout << maxx;
    return 0;
}
```
