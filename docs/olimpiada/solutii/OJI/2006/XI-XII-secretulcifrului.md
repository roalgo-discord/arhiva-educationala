---
id: OJI-2006-XI-XII-secretulcifrului
title: Soluția problemei Secretul cifrului (OJI 2006, clasele XI-XII)
problem_id: 50
authors: [ciurea]
prerequisites:
    - intro-dp
    - intro-combinatorics
tags:
    - OJI
    - clasa XI-XII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2006/11-12/cifru.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2006/11-12/cifru.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2006/11-12/cifru.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
#define mod 19997
using namespace std;
ifstream f("cifru.in");
ofstream g("cifru.out");
int n, k;
int ar[2002][2002];
long long dp[2002];
int main() {
    f >> n >> k;
    ar[0][0] = ar[1][0] = ar[1][1] = 1;
    for (int i = 2; i <= n; ++i) {
        ar[i][0] = 1;
        for (int j = 1; j <= i; ++j) {
            ar[i][j] = ar[i - 1][j] + ar[i - 1][j - 1] * j;
            ar[i][j] %= mod;
        }
    }
    dp[0] = 1;
    dp[1] = 1;
    for (int i = 2; i <= n; i++)
        for (int j = 1; j <= i; j++)
            if (k % j == 0)
                dp[i] = (dp[i] + ar[i - 1][j - 1] * dp[i - j]) % mod;
    g << dp[n] << '\n';
    return 0;
}
```
