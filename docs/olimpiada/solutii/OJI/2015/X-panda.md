---
id: OJI-2015-X-panda
title: Soluția problemei Panda (OJI 2015, clasa a X-a)
problem_id: 863
authors: [asimulescu]
prerequisites:
    - lee
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2015/10/panda.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2015/10/panda.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2015/10/panda.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: rhyhrrhy (kilonova)
#include <bits/stdc++.h>
using namespace std;
ifstream fin("panda.in");
ofstream fout("panda.out");
int mat[505][505];
int grid[505][505];
int verif[505][505];
int posibil[505][505];
int cost[505][505];
int cnt = 0;
int dx[4] = {0, 0, -1, 1};
int dy[4] = {1, -1, 0, 0};
int main() {

    int p;
    int n, m, t;
    int l, c, k, s;
    fin >> p;
    fin >> n >> m >> t;
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++)
            cost[i][j] = 1e9;
    fin >> l >> c >> k >> s;
    int mask = (1 << s) - 1;
    for (int i = 1; i <= t; i++) {
        int x, y;
        fin >> x >> y;
        mat[x][y] = 1;
    }
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            fin >> grid[i][j];
            if (i == l && j == c)
                continue;
            int ak = k & mask;
            int ag = grid[i][j] & mask;
            if ((ak ^ ag) == mask) {
                posibil[i][j] = 1;
                cnt++;
            }
        }
    }
    if (p == 1) {
        fout << cnt;
    } else {
        queue<pair<int, int>> a;
        cost[l][c] = 0;
        a.push({l, c});
        verif[l][c] = 1;
        while (!a.empty()) {
            int x = a.front().first;
            int y = a.front().second;
            a.pop();

            for (int i = 0; i < 4; i++) {
                int x_c = x + dx[i];
                int y_c = y + dy[i];
                if (x_c >= 1 && x_c <= n && y_c >= 1 && y_c <= m && posibil[x_c][y_c] && (!verif[x_c][y_c])) {

                    verif[x_c][y_c] = 1;
                    cost[x_c][y_c] = cost[x][y] + 1;
                    a.push({x_c, y_c});
                }
            }
        }
        int curent_cost_min = 1e9;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (mat[i][j]) {
                    if (cost[i][j] < curent_cost_min) {
                        curent_cost_min = cost[i][j];
                        cnt = 1;
                    } else if (cost[i][j] == curent_cost_min) {
                        cnt++;
                    }
                }
            }
        }
        fout << curent_cost_min << " " << cnt << '\n';
    }

    return 0;
}
```
