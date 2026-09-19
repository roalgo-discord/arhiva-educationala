---
id: OJI-2013-XI-XII-subsecvente
title: Soluția problemei subsecvente (OJI 2013, clasele XI-XII)
problem_id: 36
authors: [mstroe]
prerequisites:
    - stl
    - binary-search
    - hashing
tags:
    - OJI
    - clasa XI-XII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2013/11-12/subsecvente.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2013/11-12/subsecvente.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2013/11-12/subsecvente.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;
ifstream f("subsecvente.in");
ofstream g("subsecvente.out");
int n;
long long bts, b, e, sol, mid;
struct ss {
    string a;
};
ss v[52];
unordered_map<long long, char> mp;
int main() {
    f >> n;
    int mini = 1200505;
    for (int i = 1; i <= n; ++i) {
        f >> v[i].a;
        int R = v[i].a.size();
        mini = min(mini, R);
    }
    b = 1;
    e = min(60, mini);
    sol = 0;
    while (b <= e) {
        mp.clear();
        mid = (b + e) / 2;
        for (int i = 1; i <= n; ++i) {
            bts = 0;
            for (int j = 0; j < v[i].a.size(); ++j) {
                if (j >= mid)
                    if (bts & (1LL << (mid - 1)))
                        bts ^= (1LL << (mid - 1));
                bts <<= 1;
                if (v[i].a[j] == 'b')
                    bts ^= 1;
                if (j >= mid - 1) {
                    if (i == 1)
                        mp[bts] = 1;
                    else if (mp.find(bts) != mp.end() && mp[bts] == i - 1)
                        mp[bts] = i;
                }
            }
        }
        bool gg = 0;
        unordered_map<long long, char>::iterator it;
        for (it = mp.begin(); it != mp.end(); ++it)
            if (it->second == n) {
                gg = 1;
                break;
            }
        if (gg)
            sol = mid, b = mid + 1;
        else
            e = mid - 1;
    }
    g << sol;
    return 0;
}
```
