---
id: OJI-2004-X-rj
title: Soluția problemei rj (OJI 2004, clasa a X-a)
problem_id: 734
authors: [cerchez]
prerequisites:
    - lee
tags:
    - OJI
    - clasa X
---

Articolul va fi disponibil curând în arhivă.

Până atunci, puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2004/OJI%202004%20X.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2004/OJI%202004%20X.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2004/OJI%202004%20X.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <bitset>
#include <fstream>
#include <queue>
#include <vector>

using namespace std;
const int NMAX = 102;
const int INF = 21e8;

ifstream cin("rj.in");
ofstream cout("rj.out");

bitset<NMAX> v[NMAX];
int n, m;
vector<pair<int, int>> ind;

bool inbound(int i, int j) {
    if (i < 1 || j < 1 || i > n || j > m)
        return false;
    return true;
}
int dl[] = {-1, 0, -1, 1, -1, 1, 0, 1}; /// SI pe diag!
int dc[] = {0, -1, -1, -1, 1, 0, 1, 1};

int dist[NMAX][NMAX][4];
void bfs(bool nr) {
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++) {
            dist[i][j][nr] = INF;
        }

    queue<pair<int, int>> q;
    q.push({ind[nr]});
    dist[ind[nr].first][ind[nr].second][nr] = 1;

    while (!q.empty()) {
        pair<int, int> now = q.front();
        q.pop();
        for (int d = 0; d < 8; d++) {
            int lin = now.first + dl[d];
            int col = now.second + dc[d];
            if (inbound(lin, col) && !v[lin][col] && dist[lin][col][nr] == INF) {
                dist[lin][col][nr] = dist[now.first][now.second][nr] + 1;
                q.push({lin, col});
            }
        }
    }
}

int main() {
    string s;
    cin >> n >> m;
    getline(cin, s);
    for (int i = 1; i <= n; i++) { /// salvezi ch normal la cap
        getline(cin, s);
        for (int j = 0; j < s.size(); j++) {
            if (s[j] == 'X')
                v[i][j + 1] = 1;
            else if (s[j] == 'R' || s[j] == 'J') {
                ind.push_back({i, j + 1}); /// salvezi si coord lor
            }
        }
    }
    bfs(0);
    bfs(1);
    int minn = INF, x, y;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (dist[i][j][0] == dist[i][j][1] && dist[i][j][0] < minn) {
                minn = dist[i][j][0];
                x = i;
                y = j;
            }
        }
    }
    cout << minn << " " << x << " " << y;
    return 0;
}
```
