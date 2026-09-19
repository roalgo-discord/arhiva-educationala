---
id: OJI-2008-IX-concurs
title: Soluția problemei concurs (OJI 2008, clasa a IX-a)
problem_id: 770
authors: [rvisinescu]
prerequisites:
    - ad-hoc
tags:
    - OJI
    - clasa IX
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2008/09/concurs.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2008/09/concurs.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2008/09/concurs.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

using pii = pair<int, int>;
#define pb push_back
#define mp make_pair
#define all(x) (x).begin(), (x).end()

const int P = 500, ID = 50;

pii a[P + 1];
map<int, int> f;
int sz[P + 1];
vector<pii> order;
set<pii> s;
vector<int> mems[P + 1];

int main () {
    ifstream cin("concurs.in");
    ofstream cout("concurs.out");
    
    int p;
    
    cin >> p;
    for (int i = 1; i <= p; i++) { 
        cin >> a[i].first >> a[i].second;
        f[a[i].first]++;
        mems[a[i].first].pb(a[i].second);
    }
    
    // cer 1 si 2
    cout << f.size() << "\n";
    for (auto& [idx, sz] : f) {
        cout << sz << " ";
    }
    cout << "\n";
    
    // cer 3 
    for (auto& [idx, sz] : f) {
        s.insert(mp(sz, idx));
        sort(all(mems[idx]), greater<>());
    }
    
    int last_idx = -1;
    for (int i = 1; i <= p; i++) {
        auto it = prev(s.end());
        int sz, idx;
        tie(sz, idx) = *it;
        while (idx == last_idx) {
            it = prev(it);
            tie(sz, idx) = *it;
        }
        s.erase(it);
        order.pb(mp(idx, mems[idx].back()));
        mems[idx].pop_back();
        if ((sz - 1) >= 1) {
            s.insert(mp(sz - 1, idx));
        }
        last_idx = idx;
    }
    
    for (auto& [a, b] : order) {
        cout << a << " " << b << "\n";
    }
    
    return 0;
}
```
