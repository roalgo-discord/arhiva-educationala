---
id: OJI-2011-IX-vase
title: Soluția problemei vase (OJI 2011, clasa a IX-a)
problem_id: 805
authors: [chesca]
prerequisites:
    - ad-hoc
tags:
    - OJI
    - clasa IX
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2011/09/vase.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2011/09/vase.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2011/09/vase.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>

#define int int32_t
#define ll int64_t
#define long __int128_t

#define oo numeric_limits<int>::max() // inf
using namespace std;

signed main () {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    ifstream cin("vase.in");
    ofstream cout("vase.out");

    int n;
    cin >> n;

    ll sum = 0;
    map<char, vector<pair<int, int>>> s;
    for (int i = 0; i < n; i++) {
        int x;
        char t;

        cin >> x >> t;
        sum += x;

        s[t].push_back({x, i});
    }
    int idx;
    cin >> idx;
    idx--;

    ll x = sum / 2;
    cout << x << "\n";

    auto out = [&] (ll l, ll r) {
        bool l_s = (l < x);
        bool r_s = (r < x);

        if (l_s && !r_s) {
            cout << abs(x - l) << " S\n";
            cout << abs(x - r) << " D\n";
        } else if (l_s && r_s) {
            cout << abs(x - l) << " S\n";
            cout << abs(x - r) << " S\n";
        } else {
            cout << abs(x - r) << " D\n";
            cout << abs(x - l) << " D\n";
        }
    };

    ll l = 2 * x, r = 2 * x;
    for (int i = s['D'].size() - 1; i >= 0; i--) {
        r = l;
        l -= s['D'][i].first;

        if (s['D'][i].second == idx) {
            out(l, r);
            return 0;
        }
    }
    for (int i = 0; i < s['S'].size(); i++) {
        r = l;
        l -= s['S'][i].first;

        if (s['S'][i].second == idx) {
            out(l, r);
            return 0;
        }
    }
    return 0;
}
```
