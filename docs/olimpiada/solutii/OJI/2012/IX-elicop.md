---
id: OJI-2012-IX-elicop
title: Soluția problemei elicop (OJI 2012, clasa a IX-a)
problem_id: 817
authors: [dapopescu]
prerequisites:
    - matrices
    - partial-sums
tags:
    - OJI
    - clasa IX
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2012/09/elicop.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2012/09/elicop.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2012/09/elicop.pdf){ .md-button target="_blank" rel="noopener" }

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

    ifstream cin("elicop.in");
    ofstream cout("elicop.out");

    int n, m;
    cin >> n >> m;

    vector<vector<int>> v(n, vector<int>(m));
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cin >> v[i][j];
        }
    }

    vector<vector<int>> ps(n, vector<int>(m + 1, 0));
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            ps[i][j + 1] = ps[i][j] + v[i][j];
        }
    }

    int k;
    cin >> k;

    int cnt_full = 0;
    vector<int> a;
    for (int i = 0; i < k; i++) {
        int l1, c1, l2, c2, p;
        cin >> l1 >> c1 >> l2 >> c2 >> p;
        l1--; c1--; l2--; c2--;

        if (l1 > l2) {
            swap(l1, l2);
            swap(c1, c2);
        }

        int delta = l2 - l1 + 1;
        int sum = 0;
        if (c2 < c1) {
            if (p == 1) {
                int l = l1, c = c1;
                for (int j = delta; j >= 1; j--) {
                    sum += ps[l][c + 1] - ps[l][c - j + 1];
                    l++;
                    c--;
                }
            } else {
                int l = l1, c = c1;
                for (int j = 1; j <= delta; j++) {
                    sum += ps[l][c + j] - ps[l][c];
                    l++;
                    c--;
                }
            }
        } else {
            if (p == 1) {
                int l = l1, c = c1;
                for (int j = delta; j >= 1; j--) {
                    sum += ps[l][c + j] - ps[l][c];
                    l++;
                    c++;
                }
            } else {
                int l = l1, c = c1;
                for (int j = 1; j <= delta; j++) {
                    sum += ps[l][c + 1] - ps[l][c - j + 1];
                    l++;
                    c++;
                }
            }
        }
        int num_total = (delta * delta - delta) / 2 + delta;
        int num_affected = num_total - sum;
        if (sum == num_total) {
            cnt_full++;
        } else if (num_affected > num_total / 2) {
            a.push_back(i + 1);
        }
    }

    cout << cnt_full << "\n";
    cout << a.size() << " ";
    for (auto x : a) cout << x << " ";
    cout << "\n";
    return 0;
}
```
