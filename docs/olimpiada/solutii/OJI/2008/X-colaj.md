---
id: OJI-2008-X-colaj
title: Soluția problemei Colaj (OJI 2008, clasa a X-a)
problem_id: 780
authors: [cminca]
prerequisites:
    - lee
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2008/10/colaj.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2008/10/colaj.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2008/10/colaj.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>
#include <bitset>
#include <queue>
#include <map>

using namespace std;
const int NMAX = 402; ///max 400 ca 200 in mod norm si la fiec mai putam adauga 1 si in extreme, deci sa fie

ifstream cin("colaj.in");
ofstream cout("colaj.out");

bitset <NMAX> v[NMAX];
int n, m;
void update(int i1, int j1, int i2, int j2) {
    for(int i = i1; i <= i2; i++)
        for(int j = j1; j <= j2; j++)
            v[i][j] = 1;
}

int dl[] = {-1, 0, 1, 0};
int dc[] = {0, -1, 0, 1};
bool inbound(int i, int j) {
    if(i < 1 || i > n || j < 1 || j > m)
        return false;
    return true;
}
void bfs(int i, int j) {
    queue < pair<int, int> > q;
    v[i][j] = 1;
    q.push({i, j});
    while(!q.empty()) {
        pair <int, int> now = q.front();
        q.pop();
        for(int d = 0; d < 4; d++) {
            int lin = now.first + dl[d];
            int col = now.second + dc[d];
            if(inbound(lin, col) && !v[lin][col]) {
                v[lin][col] = 1;
                q.push({lin, col});
            }
        }
    }
}

struct coord {
    int i1, j1, i2, j2;
};
vector <coord> ind;

bitset <8002> f1, f2; ///dc exista col resp
map <int, int> l, c; ///pt fiec poz, ce val are normalizata
int main()
{
    int d, i1, j1, i2, j2;
    cin >> d >> n >> m;
    for(int i = 1; i <= d; i++) {
        cin >> i1 >> j1 >> i2 >> j2;
        f1[i1] = 1; ///adaugam doar val de pe 'margine', dc e nevoie
        if(i1 > 0)
            f1[i1 - 1] = 1;
        f1[i2] = 1;
        if(i2 < n)
            f1[i2 + 1] = 1;

        f2[j1] = 1;
        if(j1 > 0)
            f2[j1 - 1] = 1;
        f2[j2] = 1;
        if(j2 < m)
            f2[j2 + 1] = 1;
        ind.push_back({i1, j1, i2, j2});
    }
    int cnt = -1; ///normalizam
    for(int i = 0; i <= n; i++) {
        if(f1[i]) {
            cnt++;
            l[i] = cnt;
        }
    }
    n = cnt; ///schimbam si size-urile
    cnt = -1;
    for(int j = 0; j <= m; j++) {
        if(f2[j]) {
            cnt++;
            c[j] = cnt;
        }
    }
    m = cnt;


    for(int i = 0; i < ind.size(); i++) {
        ind[i].i1 = l[ind[i].i1];
        ind[i].i2 = l[ind[i].i2];
        ind[i].j1 = c[ind[i].j1];
        ind[i].j2 = c[ind[i].j2];
        update(ind[i].i1 + 1, ind[i].j1 + 1, ind[i].i2, ind[i].j2);
    }
    int ans = 0;
    for(int i = 1; i <= n; i++) {
        for(int j = 1; j <= m; j++) {
            if(!v[i][j]) {
                ans++;
                bfs(i, j);
            }
        }
    }
    cout << ans;
    return 0;
}
```
