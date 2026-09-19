---
id: OJI-2012-IX-roata
title: Soluția problemei roata (OJI 2012, clasa a IX-a)
problem_id: 818
authors: [chesca]
prerequisites:
    - ad-hoc
tags:
    - OJI
    - clasa IX
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2012/09/roata.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2012/09/roata.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2012/09/roata.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>

#define int int32_t
#define ll int64_t
#define long __int128_t

#define oo numeric_limits<int>::max() // inf
using namespace std;

signed main () {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    ifstream cin("roata.in");
    ofstream cout("roata.out");

    int n, p;
    cin >> n >> p;

    ll tc = 0;
    vector<int> c(p);
    for (int i = 0; i < p; i++) {
        cin >> c[i];
        tc += c[i];
    }

    cout << tc << "\n";

    vector<ll> end_times(p);
    vector<int> cabin(p);
    set<pair<ll, int>> et;
    int get_on = 1, cab = 1;
    for (int i = 0; i < min(n, p); i++) {
        end_times[i] = get_on + (ll)n * c[i];
        cabin[i] = cab;
        get_on++;
        cab++;

        et.insert({end_times[i], cabin[i]});
    }

    for (int i = n; i < p; i++) {
        auto [t, cb] = *et.begin();
        end_times[i] = t + (ll)n * c[i];
        cabin[i] = cb;
        et.erase(et.begin());
        et.insert({end_times[i], cb});
    }

    vector<pair<ll, int>> v(p);
    for (int i = 0; i < p; i++) {
        v[i] = {end_times[i], i};
    }
    sort(v.begin(), v.end());
    for (auto [_, i] : v) {
        cout << i + 1 << " ";
    }
    cout << "\n";
    cout << cabin[v.back().second] << "\n";
    return 0;
}
Copy
Download
```
