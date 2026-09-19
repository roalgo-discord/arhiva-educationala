---
id: OJI-2014-XI-XII-fractii2
title: Soluția problemei fractii2 (OJI 2014, clasele XI-XII)
problem_id: 34
authors: [panaete]
prerequisites:
    - intro-dp
tags:
    - OJI
    - clasa XI-XII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2014/11-12/fractii2.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2014/11-12/fractii2.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2014/11-12/fractii2.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: lucavlahovic (kilonova)
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int nmax = 2e3 + 1, mod = 1e5 + 3;

int dp[nmax][nmax];

int32_t main() {
    ifstream cin("fractii2.in");
    ofstream cout("fractii2.out");
    int n, cer;
    cin >> cer >> n;
    if (cer == 1) {
        vector<int> v;
        v.push_back(0);
        for (int i = 1; i < n; i++) {
            int x = v[i - 1];
            v.pop_back();
            v.push_back(x + 1);
            v.push_back(x + 1);
        }
        for (auto it : v) {
            cout << it << " ";
        }
    } else {
        dp[2][1] = 1;
        for (int i = 3; i <= n; i++) {
            for (int j = 1; j <= i / 2; j++) {
                dp[i][j] = dp[i][j - 1] + dp[i - j][(i - j) / 2] - dp[i - j][(j + 1) / 2 - 1];
                dp[i][j] %= mod;
                if (dp[i][j] <= 0) {
                    dp[i][j] += mod;
                }
            }
        }
        cout << dp[n][n / 2];
    }
    return 0;
}
```
