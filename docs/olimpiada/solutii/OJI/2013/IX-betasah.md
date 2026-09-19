---
id: OJI-2013-IX-betasah
title: Soluția problemei betasah (OJI 2013, clasa a IX-a)
problem_id: 829
authors: [cminca]
prerequisites:
    - matrices
tags:
    - OJI
    - clasa IX
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2013/09/betasah.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2013/09/betasah.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2013/09/betasah.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>

#define int int32_t
#define ll int64_t
#define long __int128_t

#define oo numeric_limits<int>::max() // inf
using namespace std;

const int DAMA = 67, GRI = 42;

signed main () {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    ifstream cin("betasah.in");
    ofstream cout("betasah.out");

    int n, d, k;
    cin >> n >> d >> k;

    vector<vector<int>> v(n, vector<int>(n));
    vector<pair<int, int>> pos;
    for (int i = 0; i < d; i++) {
        int x, y;
        cin >> x >> y;
        x--; y--;
        pos.push_back({x, y});

        v[x][y] = DAMA;
    }
    for (int i = 0; i < k; i++) {
        int x, y;
        cin >> x >> y;
        x--; y--;
        v[x][y] = GRI;
    }

    int mx = 0;
    for (int i = 0; i < n; i++) {
        int cnt = 0;
        for (int j = 0; j < i + 1; j++) {
            cnt += (v[i][j] != GRI);
        }
        mx = max(mx, cnt);
    }

    cout << mx << "\n";

    vector<int> di = {-1, -1, 0, 1, 1,  1,  0, -1};
    vector<int> dj = { 0,  1, 1, 1, 0, -1, -1, -1};

    vector<vector<bool>> vis(n, vector<bool>(n, false));
    for (auto [i, j] : pos) {
        for (int d = 0; d < 8; d++) {
            int ni = i + di[d];
            int nj = j + dj[d];
            while (0 <= ni && ni < n && 0 <= nj && nj <= ni && v[ni][nj] == 0) {
                vis[ni][nj] = true;
                ni += di[d];
                nj += dj[d];
            }
        }
    }

    int cnt2 = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j <= i; j++) {
            cnt2 += vis[i][j];
        }
    }
    cout << cnt2 << "\n";
    return 0;
}
```
