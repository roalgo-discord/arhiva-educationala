---
id: OJI-2014-X-ferma
title: Soluția problemei Ferma (OJI 2014, clasa a X-a)
problem_id: 850
authors: [ungureanu]
prerequisites:
    - lee
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2014/10/ferma.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2014/10/ferma.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2014/10/ferma.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>

#define int int32_t
#define ll int64_t
#define long __int128_t

#define oo numeric_limits<ll>::max() // inf
using namespace std;

#define int ll

const int D = 4;
vector<int> dlin = {0ll, 1ll, -1ll, 0ll};
vector<int> dcol = {1ll, 0ll, 0ll, -1ll};

signed main () {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    ifstream cin("ferma.in");
    ofstream cout("ferma.out");

    int v;
    cin >> v;

    int m, n;
    cin >> m >> n;

    vector<vector<char>> a(m + 1, vector<char>(n + 1));
    for (int i = 1; i <= m; i++) {
        string line;
        cin >> line;
        for (int j = 1; j <= n; j++) {
            a[i][j] = line[j - 1];
        }
    }

    vector<vector<int>> from(m + 1, vector<int>(n + 1, -1));
    vector<int> comp_sz;
    comp_sz.push_back(-1);

    vector<char> comp_color;
    comp_color.push_back('?');

    int mx_sz = 0;
    int comp = 1;
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (from[i][j] == -1) {
                int sz = 1;
                queue<pair<int, int>> q;
                q.push({i, j});
                from[i][j] = comp;

                while (!q.empty()) {
                    auto [l, c] = q.front();
                    q.pop();

                    for (int d = 0; d < D; d++) {
                        int nl = l + dlin[d];
                        int nc = c + dcol[d];
                        if (1 <= nl && nl <= m && 1 <= nc && nc <= n) {
                            if (from[nl][nc] == -1 && a[nl][nc] == a[i][j]) {
                                sz++;
                                from[nl][nc] = comp;
                                q.push({nl, nc});
                            }
                        }
                    }
                }
                comp_sz.push_back(sz);
                comp_color.push_back(a[i][j]);
                mx_sz = max(mx_sz, sz);
                comp++;
            }
        }
    }

    if (v == 1) {
        cout << mx_sz << "\n";
    } else {
        int new_mx_sz = mx_sz;
        int ans_i, ans_j;
        char ans_c;
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                unordered_set<int> comps;
                for (int d = 0; d < D; d++) {
                    int ni = i + dlin[d];
                    int nj = j + dcol[d];
                    if (1 <= ni && ni <= m && 1 <= nj && nj <= n && a[ni][nj] != a[i][j]) {
                        comps.insert(from[ni][nj]);
                    }
                }

                unordered_map<char, int> by_color;
                for (auto c : comps) {
                    by_color[comp_color[c]] += comp_sz[c];
                }

                for (auto [color, sz_sum] : by_color) {
                    if (sz_sum + 1 > new_mx_sz) {
                        new_mx_sz = sz_sum + 1;
                        ans_i = i;
                        ans_j = j;
                        ans_c = color;
                    }
                }
            }
        }
        cout << ans_i << " " << ans_j << "\n" << ans_c;
    }
    return 0;
}
```
