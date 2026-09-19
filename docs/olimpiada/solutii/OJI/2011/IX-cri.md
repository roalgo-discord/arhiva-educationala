---
id: OJI-2011-IX-cri
title: Soluția problemei cri (OJI 2011, clasa a IX-a)
problem_id: 806
authors: [cminca]
prerequisites:
    - matrices
    - simulating-solution
tags:
    - OJI
    - clasa IX
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2011/09/cri.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2011/09/cri.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2011/09/cri.pdf){ .md-button target="_blank" rel="noopener" }

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

signed main () {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    ifstream cin("cri.in");
    ofstream cout("cri.out");

    int n, m, x, y;
    cin >> n >> m >> x >> y;
    x--; y--;

    vector<vector<int>> v(n, vector<int>(m));
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cin >> v[i][j];
        }
    }

    ll w = 0;
    int k = oo, z = -1;

    int mn, cnt;
    ll sum;

    // zone 1
    mn = oo;
    sum = 0;
    cnt = 0;
    for (int i = 0; i <= x; i++) {
        for (int j = 0; j <= y; j++) {
            if ((i + j) % 2 != (x + y) % 2) {
                mn = min(mn, v[i][j]);
            }
            sum += v[i][j];
            cnt++;
        }
    }
    int l = y + 1;
    int u = x + 1;
    if (!(l % 2 == 1 || u % 2 == 1)) {
        sum -= mn;
        cnt--;
    }

    if (sum > w || (sum == w && cnt < k)) {
        w = sum;
        k = cnt;
        z = 1;
    }

    // zone 2
    mn = oo;
    sum = 0;
    cnt = 0;
    for (int i = 0; i <= x; i++) {
        for (int j = y; j < m; j++) {
            if ((i + j - y) % 2 != (x + y - y) % 2) {
                mn = min(mn, v[i][j]);
            }
            sum += v[i][j];
            cnt++;
        }
    }
    int r = m - y;
    u = x + 1;

    if (!(r % 2 == 1 || u % 2 == 1)) {
        sum -= mn;
        cnt--;
    }

    if (sum > w || (sum == w && cnt < k)) {
        w = sum;
        k = cnt;
        z = 2;
    }

    // zone 3
    mn = oo;
    sum = 0;
    cnt = 0;
    for (int i = x; i < n; i++) {
        for (int j = 0; j <= y; j++) {
            if ((i - x + j) % 2 != (x - x + y) % 2) {
                mn = min(mn, v[i][j]);
            }
            sum += v[i][j];
            cnt++;
        }
    }
    l = y + 1;
    int d = n - x;
    if (!(l % 2 == 1 || d % 2 == 1)) {
        sum -= mn;
        cnt--;
    }

    if (sum > w || (sum == w && cnt < k)) {
        w = sum;
        k = cnt;
        z = 3;
    }

    // zone 4
    mn = oo;
    sum = 0;
    cnt = 0;
    for (int i = x; i < n; i++) {
        for (int j = y; j < m; j++) {
            if ((i - x + j - y) % 2 != (x - x + y - y) % 2) {
                mn = min(mn, v[i][j]);
            }
            sum += v[i][j];
            cnt++;
        }
    }
    r = m - y;
    d = n - x;
    if (!(r % 2 == 1 || d % 2 == 1)) {
        sum -= mn;
        cnt--;
    }

    if (sum > w || (sum == w && cnt < k)) {
        w = sum;
        k = cnt;
        z = 4;
    }

    cout << z << " " << w << " " << k << "\n";
    return 0;
}
```
