---
id: OJI-2016-VIII-ks
title: Soluția problemei ks (OJI 2016, clasa a VIII-a)
problem_id: 873
authors: [cerchez]
prerequisites:
    - partial-sums
    - sequences
tags:
    - OJI
    - clasa VIII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2016/08/ks.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2016/08/ks.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2016/08/ks.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

using ll = long long;
#define int ll
#define pb push_back

const string FILE_NAME = "ks";
const int MAX_N = 1e5;

int p[MAX_N + 5], sp[MAX_N + 5], st[MAX_N + 5], dr[MAX_N + 5];

signed main() {
    ifstream cin(FILE_NAME + ".in");
    ofstream cout(FILE_NAME + ".out");

    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, k, i, sum, ans, pct, idx;

    cin >> n >> k;

    sum = 0;
    idx = 1;
    for (i = 1; i <= n; i++) {
        cin >> p[i];

        sum += p[i];
        if (i >= k) {
            sum -= p[i - k];
            sp[idx] = sum;
            idx++;
        }
    }
    idx--;

    for (i = 1; i <= idx; i++) {
        st[i] = max(st[i - 1], sp[i]);
    }
    for (i = idx; i >= 1; i--) {
        dr[i] = max(dr[i + 1], sp[i]);
    }

    ans = LLONG_MAX;
    for (i = 1; i <= idx - 2 * k + 1; i++) {
        pct = max(st[i - 1], dr[i + 2 * k - 1]);
        ans = min(ans, pct);
    }
    for (i = idx - 2 * k + 2; i <= idx; i++) {
        pct = st[i - 1];
        ans = min(ans, pct);
    }
    cout << ans;
    return 0;
}
```
