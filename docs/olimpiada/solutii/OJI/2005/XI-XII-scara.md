---
id: OJI-2005-XI-XII-scara
title: Soluția problemei scara (OJI 2005, clasele XI-XII)
problem_id: 52
authors: [ciurea]
prerequisites:
    - intro-dp
tags:
    - OJI
    - clasa XI-XII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2005/11-12/scara.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2005/11-12/scara.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2005/11-12/scara.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>

using namespace std;
const int NMAX = 120;
const int INF = 1e7;

ifstream cin("scara.in");
ofstream cout("scara.out");

int dp[NMAX + 2][NMAX + 2];   /// dp[i][j] - Smin a.i. sa ajungi pe scara i facand j pasi
int a[NMAX + 2], m[NMAX + 2]; /// monsterr
int main() {
    int n, k;
    cin >> n >> k;
    while (k--) { /// apa
        int ind, val;
        cin >> ind >> val;
        a[ind] = val;
    }
    cin >> k;
    while (k--) { /// monster
        int ind, val;
        cin >> ind >> val;
        m[ind] = val;
    }
    /// init
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j <= n; j++) {
            if (i - 1 <= j) /// asta e normal-ul init
                dp[i][j] = 0;
            else
                dp[i][j] = INF;
        }
    }
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (dp[i][j] >= INF)
                continue;
            /// normal
            dp[i + 1][j + 1] = min(dp[i + 1][j + 1], dp[i][j]);
            /// apa
            if (a[i] > 1) {
                for (int k = 2; k <= a[i] && i + k <= n; k++)
                    dp[i + k][j + 1] = min(dp[i + k][j + 1], dp[i][j]);
            }
            /// monster
            if (m[i] > 0) {
                for (int k = 2; k <= 2 * m[i] && i + k <= n; k++)
                    dp[i + k][j + 1] = min(dp[i + k][j + 1], dp[i][j] + (k + 1) / 2);
            }
        }
    }
    int minn = n - 1, ans = 0;
    for (int j = 0; j <= n; j++) {
        if (dp[n][j] < INF) {
            minn = j;
            ans = dp[n][j];
            break;
        }
    }
    cout << minn + 1 << " " << ans;
    return 0;
}
```
