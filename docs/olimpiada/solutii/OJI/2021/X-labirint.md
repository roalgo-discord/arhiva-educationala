---
id: OJI-2021-X-labirint
title: Soluția problemei Labirint (OJI 2021, clasa a X-a)
problem_id: 938
authors: [stefdasca, gelumnt]
prerequisites:
    - lee
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2021/10.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2021/10.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2021/10.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;

int n, m, q;

bool ok[1000002];
int mx[1000002];

char mat[1002][1002];
int dist[2][1002][1002];

bool viz[1002][1002];

int ox[] = {-1, 0, 1, 0};
int oy[] = {0, 1, 0, -1};

bool check(int x, int y) { return ((x >= 1) && (x <= n) && (y >= 1) && (y <= m) && (viz[x][y] == 0)); }
void lee(int drum, int x, int y) {
    memset(viz, 0, sizeof(viz));
    deque<pair<int, int>> d;
    d.push_back({x, y});
    viz[x][y] = 1;
    for (int i = 1; i <= n; ++i)
        for (int j = 1; j <= m; ++j)
            dist[drum][i][j] = -1;
    dist[drum][x][y] = 1;
    while (!d.empty()) {
        pair<int, int> nod = d[0];
        d.pop_front();
        for (int i = 0; i <= 3; ++i) {
            int nxt_x = ox[i] + nod.first;
            int nxt_y = oy[i] + nod.second;
            if (check(nxt_x, nxt_y) && dist[drum][nxt_x][nxt_y] == -1) {
                dist[drum][nxt_x][nxt_y] = dist[drum][nod.first][nod.second] + 1;
                if (mat[nxt_x][nxt_y] == '0') {
                    viz[nxt_x][nxt_y] = 1;
                    d.push_back({nxt_x, nxt_y});
                }
            }
        }
    }
}

char ans[1002][1002];
int main() {
    ifstream cin("labirint.in");
    ofstream cout("labirint.out");

    cin >> n >> m;
    for (int i = 1; i <= n; ++i) {
        cin >> (mat[i] + 1);
    }

    lee(0, 1, 1);
    lee(1, n, m);

    for (int i = 1; i <= n; ++i)
        for (int j = 1; j <= m; ++j)
            if (mat[i][j] == '1' && dist[0][i][j] != -1 && dist[1][i][j] != -1) {
                if (dist[0][i][j] + dist[1][i][j] - 1 < dist[1][1][1])
                    ans[i][j] = '1';
                else
                    ans[i][j] = '0';
            } else
                ans[i][j] = '0';

    for (int i = 1; i <= n; ++i)
        cout << (ans[i] + 1) << '\n';
    return 0;
}
```
