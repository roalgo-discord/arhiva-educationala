---
id: OJI-2012-XI-XII-blis
title: Soluția problemei blis (OJI 2012, clasele XI-XII)
problem_id: 37
authors: [pracsiu]
prerequisites:
    - intro-dp
tags:
    - OJI
    - clasa XI-XII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2012/11-12/blis.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2012/11-12/blis.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2012/11-12/blis.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: stefanrotaru (kilonova)
#include <cstring>
#include <fstream>
#include <vector>

using namespace std;

ifstream f("blis.in");
ofstream g("blis.out");

int k, val[100005][35], dp[100005], n, maxi = 0, ans = 0, len;

char a[100005];

vector<pair<int, int>> update[100005];

int main() {
    f >> k >> a;

    n = strlen(a);

    for (int i = 0; i <= n; ++i) {
        dp[i] = (1 << 30);
    }

    for (int i = 0; i <= n; ++i) {
        int v = 0;

        for (int j = 0; i + j < n && j < k; ++j) {
            v = v * 2 + (a[j + i] - '0');

            maxi = max(maxi, v);

            int poz = upper_bound(dp + 1, dp + i + j, v - 1) - dp;

            update[i + j].push_back({v, poz});
        }

        for (auto d : update[i]) {
            dp[d.second] = min(dp[d.second], d.first);
            len = max(len, d.second);
        }
    }

    g << maxi << '\n' << len;

    return 0;
}
```
