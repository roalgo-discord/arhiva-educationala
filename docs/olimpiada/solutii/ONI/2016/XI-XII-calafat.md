---
id: ONI-2016-XI-XII-calafat
title: Soluția problemei calafat (ONI 2016, clasele XI-XII)
problem_id: 189
authors: []
prerequisites:
    - fenwick-tree
tags:
    - ONI
    - clasa XI-XII
---
Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/ONI%20%28national%20olympiad%29/2016/11-12/calafat.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/ONI%20%28national%20olympiad%29/2016/11-12/calafat.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/ONI%20%28national%20olympiad%29/2016/11-12/calafat.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;
ifstream f("calafat.in");
ofstream g("calafat.out");
int n, q, v[200002], last[200002];
long long crans, anss[200002], aib[200002];
struct queries {
    int a, b;
};
queries upd[200002];
vector<pair<int, int>> qq[200002];
void add(int nod, int val) {
    for (; nod <= n; nod += (nod & (-nod)))
        aib[nod] += val;
}
long long compute(int nod) {
    long long sol = 0;
    for (; nod; nod -= (nod & (-nod)))
        sol += aib[nod];
    return sol;
}
int main() {
    f >> n >> q;
    for (int i = 1; i <= n; ++i) {
        f >> v[i];
        if (last[v[i]])
            upd[i].a = last[v[i]], upd[i].b = i - last[v[i]];
        last[v[i]] = i;
    }
    for (int i = 1; i <= q; ++i) {
        int l, r;
        f >> l >> r;
        qq[r].push_back({l, i});
    }
    for (int i = 1; i <= n; ++i) {
        if (upd[i].a)
            add(upd[i].a, upd[i].b);
        for (int j = 0; j < qq[i].size(); ++j)
            anss[qq[i][j].second] = compute(i) - compute(qq[i][j].first - 1);
    }
    for (int i = 1; i <= q; ++i)
        g << anss[i] << '\n';
    return 0;
}
```
