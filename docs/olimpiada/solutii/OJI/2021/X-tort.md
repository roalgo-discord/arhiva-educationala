---
id: OJI-2021-X-tort
title: Soluția problemei Tort (OJI 2021, clasa a X-a)
problem_id: 940
authors: [nicoli]
prerequisites:
    - sieve
    - divisibility
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2021/10.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2021/10.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2021/10.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>

using namespace std;

const int NMAX = 2e5;
const int SMAX = 4e5;

int n;
int v[NMAX + 1], sum[NMAX + 1], pos[SMAX + 1];

int main() {
    ifstream cin("tort.in");
    ofstream cout("tort.out");
    cin >> n;
    for (int i = 1; i <= n; i++) {
        cin >> v[i];
    }

    for (int i = 1; i <= n; i++) {
        sum[i] = sum[i - 1] + v[i];
        pos[sum[i]] = i;
    }

    long long ans = 0;
    for (int i = n; i >= 1; i--) {
        int s = sum[n] - sum[i - 1];
        int cnt = 1;

        while (sum[n] - cnt * s >= 0 && pos[sum[n] - cnt * s] > 0)
            cnt++;
        cnt--;
        ans += cnt;
    }

    cout << ans << '\n';
    return 0;
}
```
