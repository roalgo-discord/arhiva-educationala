---
id: OJI-2021-IX-logic
title: Soluția problemei logic (OJI 2021, clasa a IX-a)
problem_id: 357
authors: [aburta]
prerequisites:
    - bitwise-ops
    - intro-dp
    - basic-math
tags:
    - OJI
    - clasa IX
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2021/09.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2021/09.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2021/09.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;

char lines[8][256];
long long dp[2][9][512];

int main() {
    ifstream cin("logic.in");
    ofstream cout("logic.out");

    int c, n;
    cin >> c >> n;

    for (int i = 0; i < n; i++)
        cin >> lines[i];

    if (c == 1) {
        int t;
        cin >> t;

        while (t--) {
            string q;
            cin >> q;

            vector<int> vals;
            for (int i = 0; i < q.size(); i++)
                vals.push_back(q[i] - '0');
            for (int i = n - 1; i >= 0; i--) {
                vector<int> vals2;
                for (int pos = 0; pos < vals.size(); pos += 2) {
                    if (lines[i][pos / 2] == '&')
                        vals2.push_back(vals[pos] & vals[pos + 1]);
                    else
                        vals2.push_back(vals[pos] | vals[pos + 1]);
                }
                vals = vals2;
            }

            cout << vals[0] << '\n';
        }
    } else {
        int val;
        cin >> val;

        const int mod = 666013;

        for (int i = n - 1; i >= 0; i--)
            for (int pos = 0; pos < (1 << i); pos++)
                if (i == n - 1) {
                    if (lines[i][pos] == '&')
                        dp[1][i][pos] = 1, dp[0][i][pos] = 3;
                    else
                        dp[1][i][pos] = 3, dp[0][i][pos] = 1;
                } else {
                    if (lines[i][pos] == '&') {
                        dp[0][i][pos] += dp[1][i + 1][pos * 2] * dp[0][i + 1][pos * 2 + 1];
                        dp[0][i][pos] += dp[0][i + 1][pos * 2] * dp[1][i + 1][pos * 2 + 1];
                    } else {
                        dp[1][i][pos] += dp[1][i + 1][pos * 2] * dp[0][i + 1][pos * 2 + 1];
                        dp[1][i][pos] += dp[0][i + 1][pos * 2] * dp[1][i + 1][pos * 2 + 1];
                    }
                    dp[0][i][pos] += dp[0][i + 1][pos * 2] * dp[0][i + 1][pos * 2 + 1];
                    dp[1][i][pos] += dp[1][i + 1][pos * 2] * dp[1][i + 1][pos * 2 + 1];
                    dp[0][i][pos] %= mod;
                    dp[1][i][pos] %= mod;
                }

        if (val == 1)
            cout << dp[1][0][0] << '\n';
        else
            cout << dp[0][0][0] << '\n';
    }
    return 0;
}
```
