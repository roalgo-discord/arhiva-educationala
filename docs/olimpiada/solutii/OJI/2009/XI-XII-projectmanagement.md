---
id: OJI-2009-XI-XII-projectmanagement
title: Soluția problemei Project Management (OJI 2009, clasele XI-XII)
problem_id: 44
authors: [cpatcas]
prerequisites:
    - toposort
    - intro-dp
tags:
    - OJI
    - clasa XI-XII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2009/11-12/project_management.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2009/11-12/project_management.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2009/11-12/project_management.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;
ifstream f("pm.in");
ofstream g("pm.out");
int n, t[102], ar[102], gr[102], trg[102], t2[102];
int st[102], sf[102];
vector<int> v[102], tr[102];
int main() {
    f >> n;
    for (int i = 1; i <= n; ++i)
        f >> t[i];
    deque<int> d;
    for (int i = 1; i <= n; ++i) {
        f >> gr[i];
        for (int j = 1; j <= gr[i]; ++j) {
            int a;
            f >> a;
            v[a].push_back(i);
            tr[i].push_back(a);
            ++trg[a];
        }
    }
    for (int i = 1; i <= n; ++i)
        if (!gr[i])
            v[0].push_back(i), tr[i].push_back(0), ++gr[i], ++trg[0];
    d.push_back(0);
    int ans = 0;
    while (!d.empty()) {
        int nod = d[0];
        st[nod] = ar[nod] - t[nod];
        d.pop_front();
        for (int i = 0; i < v[nod].size(); ++i) {
            int vecin = v[nod][i];
            ar[vecin] = max(ar[vecin], ar[nod] + t[vecin]);
            ans = max(ans, ar[vecin]);
            --gr[vecin];
            if (gr[vecin] == 0)
                d.push_back(vecin);
        }
    }
    g << ans << '\n';
    for (int i = 0; i <= n; ++i)
        if (!trg[i]) {
            sf[i] = ans - t[i];
            d.push_back(i), t2[i] = ans;
        } else
            sf[i] = -1;
    while (!d.empty()) {
        int nod = d[0];
        d.pop_front();
        for (int i = 0; i < tr[nod].size(); ++i) {
            int vecin = tr[nod][i];
            if (sf[vecin] == -1)
                sf[vecin] = sf[nod] - t[vecin];
            else
                sf[vecin] = min(sf[vecin], sf[nod] - t[vecin]);
            --trg[vecin];
            if (trg[vecin] == 0)
                d.push_back(vecin);
        }
    }
    for (int i = 1; i <= n; ++i)
        g << st[i] << " " << sf[i] << '\n';
    return 0;
}
```
