---
id: OJI-2014-IX-cool
title: Soluția problemei cool (OJI 2014, clasa a IX-a)
problem_id: 840
authors: [nodea]
prerequisites:
    - sequences
tags:
    - OJI
    - clasa IX
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2014/09/cool.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2014/09/cool.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2014/09/cool.pdf){ .md-button target="_blank" rel="noopener" }

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
signed main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    ifstream cin("cool.in");
    ofstream cout("cool.out");
    int p;
    cin >> p;
    int n, k;
    cin >> n >> k;
    k--;
    vector<int> v(n);
    for (int i = 0; i < n; i++) {
        cin >> v[i];
    }
    if (p == 2) {
        int cnt = 0, cnt_mx = 0;
        int mx_len = -oo;
        for (int i = 0; i < n; i++) {
            int sum = 0, mx = -oo, mn = oo;
            vector<int> f(1005, 0);
            int num_di = 0;
            for (int j = i; j < n; j++) {
                sum += v[j];
                mx = max(mx, v[j]);
                mn = min(mn, v[j]);

                if (f[v[j]] == 0) {
                    num_di++;
                }
                f[v[j]]++;

                if (2 * sum == (mx - mn + 1) * (mx + mn) && (j - i + 1) == num_di) {
                    int len = j - i + 1;
                    cnt++;
                    if (len > mx_len) {
                        mx_len = len;
                        cnt_mx = 0;
                    }
                    if (len == mx_len) {
                        cnt_mx++;
                    }
                }
            }
        }
    } else {
        map<int, int> x;
        int sum = 0, mx = -oo, mn = oo;
        for (int i = 0; i <= k; i++) {
            x[v[i]]++;
            sum += v[i];
            mx = max(mx, v[i]);
            mn = min(mn, v[i]);
        }
        if (2 * sum == (mx - mn + 1) * (mx + mn) && x.size() == (k + 1)) {
            cout << mx << "\n";
        } else {
            int cntd = 0;
            for (auto [_, f] : x) {
                cntd += (f == 1);
            }
            cout << cntd;
        }
    }
    return 0;
}
```
