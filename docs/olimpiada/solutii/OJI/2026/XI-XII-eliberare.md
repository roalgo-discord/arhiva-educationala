---
id: OJI-2026-XI-XII-eliberare
title: Soluția problemei eliberare (OJI 2026, clasele XI-XII)
problem_id: 4230
authors: []
prerequisites:
    - toposort
tags:
    - OJI
    - clasa XI-XII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2026/11-12.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2026/11-12.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2026/11-12.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: Mihai_Georgescu
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 1105;

int n, m;
char a[MAXN][MAXN];

int L[MAXN][MAXN], R[MAXN][MAXN], U[MAXN][MAXN], D[MAXN][MAXN];
bool alive[MAXN][MAXN];

ifstream fin("eliberare.in");
ofstream fout("eliberare.out");

bool free_car(int i, int j) {
    if (a[i][j] == '>')
        return R[i][j] == 0;
    if (a[i][j] == '<')
        return L[i][j] == 0;
    if (a[i][j] == '^')
        return U[i][j] == 0;
    if (a[i][j] == 'v')
        return D[i][j] == 0;
    return false;
}

int main() {
    fin >> n >> m;

    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++) {
            fin >> a[i][j];
            alive[i][j] = true;
        }

    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++) {
            L[i][j] = j - 1;
            R[i][j] = (j < m ? j + 1 : 0);
            U[i][j] = i - 1;
            D[i][j] = (i < n ? i + 1 : 0);
        }

    queue<pair<int, int>> q;

    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++)
            if (free_car(i, j))
                q.push({i, j});

    while (!q.empty()) {
        auto [x, y] = q.front();
        q.pop();

        if (!alive[x][y])
            continue;

        fout << x << " " << y << "\n";
        alive[x][y] = false;

        int l = L[x][y], r = R[x][y], u = U[x][y], d = D[x][y];

        if (l)
            R[x][l] = r;
        if (r)
            L[x][r] = l;
        if (u)
            D[u][y] = d;
        if (d)
            U[d][y] = u;

        if (l && free_car(x, l))
            q.push({x, l});
        if (r && free_car(x, r))
            q.push({x, r});
        if (u && free_car(u, y))
            q.push({u, y});
        if (d && free_car(d, y))
            q.push({d, y});
    }
}
```
