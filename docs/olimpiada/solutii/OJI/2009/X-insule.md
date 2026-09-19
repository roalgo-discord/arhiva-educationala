---
id: OJI-2009-X-insule
title: Soluția problemei insule (OJI 2009, clasa a X-a)
problem_id: 398
authors: [nmot]
prerequisites:
    - lee
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2009/10/solutii.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2009/10/solutii.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2009/10/solutii.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>
#include <bitset>
#include <queue>

using namespace std;
const int NMAX = 102;
const int INF = 21e8;

ifstream cin("insule.in");
ofstream cout("insule.out");

int v[NMAX][NMAX], n, m;
bitset <NMAX> f[NMAX];
int minn = INF;

int dl[] = {-1, 0, 1, 0};
int dc[] = {0, -1, 0, 1};

bool inbound(int i, int j) {
    if(i < 1 || j < 1 || i > n || j > m)
        return false;
    return true;
}

void bfs(int starti, int startj, int cul) { ///pt cer1, gasim cate insule de cul
    queue <pair <int, int>> q;
    q.push({starti, startj});
    f[starti][startj] = 1;
    while(!q.empty()) {
        pair <int, int> now = q.front();
        q.pop();
        for(int d = 0; d < 4; d++) {
            int lin = now.first + dl[d];
            int col = now.second + dc[d];
            if(inbound(lin, col) && !f[lin][col] && v[lin][col] == cul) {
                f[lin][col] = 1;
                q.push({lin, col});
            }
        }
    }
}
void lee(int starti, int startj) {
    bool ok = 0;
    for(int d = 0; d < 4; d++) { ///ver sa actual mearga, ca altfel facem n^2 degeaba
        int lin = starti + dl[d];
        int col = startj + dc[d];
        if(inbound(lin, col) && v[lin][col] == 0) {
            ok = 1;
            break;
        }
    }
    if(!ok)
        return;
        
    int ans[NMAX][NMAX];
    for(int i = 1; i <= n; i++) {
        for(int j = 1; j <= m; j++) {
            ans[i][j] = 0;
        }
    }
    queue <pair <int, int>> q;
    for(int d = 0; d < 4; d++) { ///DOAR dc are vecin apa, altfel nu ne pasa
        int lin = starti + dl[d];
        int col = startj + dc[d];
        if(inbound(lin, col) && v[lin][col] == 0) {
            ans[lin][col] = 1;
            q.push({lin, col});
        }
    }
    while(!q.empty()) {
        pair <int, int> now = q.front();
        q.pop();
        for(int d = 0; d < 4; d++) {
            int lin = now.first + dl[d];
            int col = now.second + dc[d];
            if(inbound(lin, col)) {
                if(v[lin][col] != 0 && v[lin][col] != 2) ///vrem doar drum / destinatie
                    continue;
                if(v[lin][col] == 2 && v[now.first][now.second] == 0) ///destinatie
                    minn = min(minn, ans[now.first][now.second]);
                else if(v[lin][col] == 0 && !ans[lin][col]) { ///ans ii 0 (dc e !=0, am mai ajuns, deci nu ne pasa)
                    ans[lin][col] = ans[now.first][now.second] + 1;
                    q.push({lin, col});
                }
            }
        }
    }
}


int main()
{
    char ch;
    cin >> n >> m;
    for(int i = 1; i <= n; i++)
        for(int j = 1; j <= m; j++) {
            cin >> ch;
            v[i][j] = ch - '0';
        }
    int cnt1 = 0, cnt2 = 0, cnt3 = 0;
    for(int i = 1; i <= n; i++) { ///cer1
        for(int j = 1; j <= m; j++) {
            if(!f[i][j] && v[i][j]) {
                bfs(i, j, v[i][j]);
                if(v[i][j] == 1)
                    cnt1++;
                else if(v[i][j] == 2)
                    cnt2++;
                else
                    cnt3++;
            }
        }
    }
    cout << cnt1 << " " << cnt2 << " " << cnt3 << " ";
    for(int i = 1; i <= n; i++) {
        for(int j = 1; j <= m; j++) {
            if(v[i][j] == 1) { ///facem lee de la fiec casuta de 1 sa gasim mindrum spre 3
                lee(i, j);
            }
        }
    }
    cout << minn;
    return 0;
}
```
