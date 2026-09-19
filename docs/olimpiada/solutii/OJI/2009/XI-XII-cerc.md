---
id: OJI-2009-XI-XII-cerc
title: Soluția problemei cerc (OJI 2009, clasele XI-XII)
problem_id: 43
authors: [cminca]
prerequisites:
    - intro-dp
tags:
    - OJI
    - clasa XI-XII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2009/11-12/cerc.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2009/11-12/cerc.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2009/11-12/cerc.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <algorithm>
#include <cmath>
#include <fstream>
#include <map>
#include <vector>

using namespace std;
const int NMAX = 2000;

ifstream cin("cerc.in");
ofstream cout("cerc.out");

struct cercuri {
    int x, y, r;
} v[NMAX + 2];

bool ok(int a, int b) {
    double dist = sqrt((v[a].x - v[b].x) * (v[a].x - v[b].x) + (v[a].y - v[b].y) * (v[a].y - v[b].y));
    if (dist >= v[a].r + v[b].r) /// SI dc se ating e ok (?)
        return true;
    return false;
}

bool cmp(const int &a, const int &b) {
    int dist1 = v[a].x * v[a].x + v[a].y * v[a].y;
    int dist2 = v[b].x * v[b].x + v[b].y * v[b].y;
    return dist1 < dist2;
}
map<pair<int, int>, int> umap;
vector<vector<int>> drepte;
int dp[NMAX + 2];
int main() {
    int n, cnt = -1;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        cin >> v[i].x >> v[i].y >> v[i].r;
        int xnou = v[i].x / __gcd(v[i].x, v[i].y);
        int ynou = v[i].y / __gcd(v[i].x, v[i].y);

        if (umap.find({xnou, ynou}) == umap.end()) {
            cnt++;
            drepte.push_back(vector<int>());
            drepte.back().push_back(i);
            umap[{xnou, ynou}] = cnt;
        } else
            drepte[umap[{xnou, ynou}]].push_back(i);
    }
    int maxx = 0;
    cnt = 0;
    for (int id = 0; id < drepte.size(); id++) {
        sort(drepte[id].begin(), drepte[id].end(), cmp);
        int sol = 1;
        for (int i = 0; i < drepte[id].size(); i++) {
            dp[drepte[id][i]] = 1;
            for (int j = 0; j < i; j++) {
                if (ok(drepte[id][i], drepte[id][j]))
                    dp[drepte[id][i]] = max(dp[drepte[id][i]], dp[drepte[id][j]] + 1);
            }
            sol = max(sol, dp[drepte[id][i]]);
        }
        if (sol > maxx) {
            maxx = sol;
            cnt = 1;
        } else if (sol == maxx)
            cnt++;
    }
    cout << drepte.size() << " " << maxx << " " << cnt;
    return 0;
}
/*
1- cate drepte
2- nrmax de cercuri care nu se intersecteaza pe o dreapta
3- cate drepte de la 2
*/
```
