---
id: OJI-2005-X-scara
title: Soluția problemei Scara (OJI 2005, clasa a X-a)
problem_id: 746
authors: [cerchez, marinel]
prerequisites:
    - dp
    - backtracking
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2005/10/scara.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2005/10/scara.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2005/10/scara.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: PetruApostol (kilonova)
#include <bits/stdc++.h>
using namespace std;

int h, n, m, po;

vector<int> rasp;
int v[100], sp[100], st[100];
double dp[100], min1;

void solve() {
    if (sp[n] != h)
        return;
    int p = 0, i;
    for (i = 1; i <= n; i++) {
        while (sp[i] - sp[p] > m)
            p++;
        if (dp[p] + 1.0f * (sp[i] - sp[p]) / (i - p) + po < dp[i - 1] + st[i])
            dp[i] = dp[p] + 1.0f * (sp[i] - sp[p]) / (i - p) + po;
        else
            dp[i] = dp[i - 1] + st[i];
    }

    if (dp[n] < min1) {
        min1 = dp[n];
        rasp.clear();
        for (i = 1; i <= n; i++)
            rasp.push_back(st[i]);
    }
}

void solve1(int a) {
    int i;
    if (a == n + 1) {
        solve();
        return;
    }
    for (i = 1; i <= m; i++) {
        if (!v[i]) {
            v[i] = 1;
            st[a] = i;
            sp[a] = sp[a - 1] + st[a];
            solve1(a + 1);
            v[i] = 0;
        }
    }
}

int main() {
    ifstream cin("scara.in");
    ofstream cout("scara.out");
    min1 = 1e8;
    int i;
    cin >> h >> n >> m >> po;
    solve1(1);
    cout << setprecision(2) << fixed << min1 << "\n";
    for (i = 0; i < rasp.size(); i++)
        cout << rasp[i] << " ";
    return 0;
}
```
