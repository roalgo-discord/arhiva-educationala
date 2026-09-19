---
id: OJI-2010-XI-XII-joc
title: Soluția problemei joc (OJI 2010, clasele XI-XII)
problem_id: 42
authors: [galatan]
prerequisites:
    - intro-dp
tags:
    - OJI
    - clasa XI-XII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2010/11-12/joc.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2010/11-12/joc.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2010/11-12/joc.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>

using namespace std;
const int NMAX = 5000;
const int INF = 11e6;

ifstream cin("joc.in");
ofstream cout("joc.out");

int v[NMAX + 2][4];
int dp[NMAX + 2][4][12];
int main() {
    int n, k;
    cin >> n >> k;
    for(int j = 1; j <= 2; j++)
        for(int i = 1; i <= n; i++)
            cin >> v[i][j];
    for(int i = 1; i <= n; i++)
        for(int j = 1; j <= 2; j++)
            for(int l = 1; l <= k; l++)
                dp[i][j][l] = -INF;
    dp[1][1][1] = v[1][1];
    for(int i = 1; i <= n; i++) {
        ///Cazul 1) updatam pe col, schimbarile
        int val1 = dp[i][1][1];
        int val2 = dp[i][2][1];
        for(int l = 1; l <= min(i, k); l++) {
            val1 = max(val1, dp[i][2][l] + v[i][1]);
            val2 = max(val2, dp[i][1][l] + v[i][2]);
        }
        dp[i][1][1] = val1;
        dp[i][2][1] = val2;
        if(i == n)
            break;
        for(int j = 1; j <= 2; j++)
            for(int l = 1; l <= min(i, k - 1); l++)
                dp[i + 1][j][l + 1] = max(dp[i + 1][j][l + 1], dp[i][j][l] + v[i + 1][j]);
    }
    int maxx = -INF;
    for(int l = 1; l <= k; l++)
        maxx = max(maxx, dp[n][2][l]);
    cout << maxx;
    return 0;
}
```
