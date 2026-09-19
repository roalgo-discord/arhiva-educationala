---
id: OJI-2009-IX-expresie
title: Soluția problemei expresie (OJI 2009, clasa a IX-a)
problem_id: 782
authors: [aburta]
prerequisites:
    - partial-sums
tags:
    - OJI
    - clasa IX
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2009/09/expresie.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2009/09/expresie.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2009/09/expresie.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

using ll = long long;
using pii = pair<int, int>;
#define mp make_pair

const int N = 1e3;

int a[N + 1];

int main () {
    ifstream cin("expresie.in");
    ofstream cout("expresie.out");

    int n, ts;

    cin >> n;

    ts = 0;
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        ts += a[i];
    }

    ll ans = 0;
    for (int i = 2; i <= n - 1; i++) {
        ans = max(ans, ts - a[i - 1] - a[i] - a[i + 1] + (ll)a[i - 1] * a[i] * a[i + 1]);
    }

    for (int i = 1; i <= n - 3; i++) {
        for (int j = i + 2; j <= n - 1; j++) {
            ans = max(ans, ts - a[i] - a[i + 1] - a[j] - a[j + 1] + (ll)a[i] * a[i + 1] + (ll)a[j] * a[j + 1]);
        }
    }

    cout << ans;
    return 0;
}
```
