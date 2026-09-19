---
id: OJI-2016-X-miting
title: Soluția problemei Miting (OJI 2016, clasa a X-a)
problem_id: 875
authors: [galatan]
prerequisites:
    - lee
    - intro-dp
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2016/10/miting.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2016/10/miting.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2016/10/miting.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>
#include <queue>
#include <map>

using namespace std;
const int LMAX = 12;
const int NMAX = 62;
const int INF = 21e8;
using ll = long long;

ifstream cin("miting.in");
ofstream cout("miting.out");

bool litera(char ch) {
    if('A' <= ch && ch <= 'Z')
        return true;
    return false;
}

char v[NMAX][NMAX];
int n, m;
string s;
map <char, pair <int, int>> umap;
vector <pair <int, int>> coord;

int dl[] = {-1, 0, 1, 0};
int dc[] = {0, -1, 0, 1};
bool inbound(int i, int j) {
    if(i < 1 || j < 1 || i > n || j > m)
        return false;
    return true;
}
int d[NMAX][NMAX];
bool f[NMAX][NMAX];

void reset() {
    for(int i = 1; i <= n; i++) {
        for(int j = 1; j <= m; j++) {
            f[i][j] = 0;
            d[i][j] = INF;
        }
    }
}
int bfs1(int starti, int startj) {
    reset();
    f[starti][startj] = 1;
    d[starti][startj] = 0;
    int cnt = 1;
    queue <pair <int, int>> q;
    q.push({starti, startj});
    while(!q.empty()) {
        pair <int, int> now = q.front();
        q.pop();
        for(int x = 0; x < 4; x++) {
            int lin = now.first + dl[x];
            int col = now.second + dc[x];
            if(inbound(lin, col) && !f[lin][col] && v[lin][col] != '#') {
                d[lin][col] = d[now.first][now.second] + 1;
                f[lin][col] = 1;
                q.push({lin, col});
                if(litera(v[lin][col]))
                    cnt++;
            }
        }
    }
    return cnt;
}
ll dist[NMAX][NMAX][LMAX][LMAX];
queue <pair <int, int>> q;
void bfs2(int l, int r) {
    while(!q.empty()) {
        pair <int, int> now = q.front();
        q.pop();
        for(int x = 0; x < 4; x++) {
            int lin = now.first + dl[x];
            int col = now.second + dc[x];
            if(inbound(lin, col) && v[lin][col] != '#' &&
               dist[lin][col][l][r] > dist[now.first][now.second][l][r] + 1) {
                dist[lin][col][l][r] = dist[now.first][now.second][l][r] + 1;
                q.push({lin, col});
            }
        }
    }
}

int main()
{
    int cer;
    cin >> cer >> n >> m >> s;
    for(int i = 1; i <= n; i++)
        for(int j = 1; j <= m; j++)
            cin >> v[i][j];
    if(cer == 1) {
        int mini = INF, minj = INF, maxi = 0, maxj = 0;
        for(int i = 1; i <= n; i++) {
            for(int j = 1; j <= m; j++) {
                if(litera(v[i][j])) {
                    mini = min(mini, i);
                    maxi = max(maxi, i);
                    minj = min(minj, j);
                    maxj = max(maxj, j);
                }
            }
        }
        cout << (maxi - mini + 1) * (maxj - minj + 1);
        return 0;
    }
    for(int i = 1; i <= n; i++)
        for(int j = 1; j <= m; j++)
            for(int l = 0; l < s.size(); l++)
                for(int r = l; r < s.size(); r++)
                    dist[i][j][l][r] = INF;
    bool ok = 0;
    for(int i = 1; i <= n; i++) {
        for(int j = 1; j <= m; j++) {
            if(litera(v[i][j])) {
                if(!ok) {
                   int cnt = bfs1(i, j);
                    if(cnt < s.size()) {
                        cout << "-1";
                        return 0;
                    }
                    ok = 1;
                }
                umap[v[i][j]] = {i, j};
            }
        }
    }
    for(int i = 0; i < s.size(); i++) {
        coord.push_back(umap[s[i]]);
        dist[umap[s[i]].first][umap[s[i]].second][i][i] = 0;
    }

    for(int len = 1; len <= s.size(); len++) { 
        for(int l = 0; l + len - 1 < s.size(); l++) {
            int r = l + len - 1;
            for(int i = 1; i <= n; i++) {
                for(int j = 1; j <= m; j++) {
                    for(int k = l; k < r; k++) {
                        dist[i][j][l][r] = min(dist[i][j][l][r], dist[i][j][l][k] + dist[i][j][k + 1][r]);
                    }
                    if(dist[i][j][l][r] != INF)
                            q.push({i, j});
                }
            }
            bfs2(l, r);
        }
    }
    ll ans = INF;
    for(int i = 1; i <= n; i++) {
        for(int j = 1; j <= m; j++) {
            ans = min(ans, dist[i][j][0][s.size() - 1]);
        }
    }
    cout << ans;
    return 0;
}
/*
BUN
    1 2 3 4 5 6 7
1   - # - # - # -
2   - - N # - - #
3   - # - - B - -
4   U - - # - # -
5   - # - # - # -
*/
```
