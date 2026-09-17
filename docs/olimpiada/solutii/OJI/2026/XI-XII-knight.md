---
id: OJI-2026-XI-XII-knight
title: Soluția problemei knight (OJI 2026, clasele XI-XII)
problem_id: 4229
authors: []
prerequisites:
    - lowest-common-ancestor
    - partial-sums
    - intro-combinatorics
tags:
    - OJI
    - clasa XI-XII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2026/11-12.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2026/11-12.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2026/11-12.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: Susan
#include <fstream>
#include <vector>

using namespace std;
using ll = long long;
constexpr ll MOD = 1e9 + 7;

ll pw(ll b, ll e) {
    ll r = 1;

    while (e) {
        if (e & 1)
            r = b * r % MOD;
        b = b * b % MOD;
        e >>= 1;
    }

    return r;
}

int main() {
    ifstream f("knight.in");
    ofstream g("knight.out");

    int cer, n;
    f >> cer >> n;

    vector<int> per(n + 1);
    vector<vector<int>> adj(n + 1);

    for (int i = 2; i <= n; ++i) {
        f >> per[i];
        adj[per[i]].push_back(i);
    }

    if (cer == 1) {
        int ans = 0;

        for (auto &it : adj) {
            if (it.size() == 1) {
                ++ans;
            }
        }

        g << ans << '\n';
    } else {
        vector<int> tin(n + 1), tout(n + 1), fii(n + 1), d(n + 1);
        vector<ll> prod(n + 1);
        int timp = 0;
        auto dfs = [&](auto &&self, int u) -> void {
            tin[u] = ++timp;
            d[u] = d[per[u]] + 1;
            fii[u] = fii[per[u]] + (adj[u].size() == 1);

            if (adj[u].size() >= 2) {
                prod[u] = prod[per[u]] * (adj[u].size() - 1) % MOD;
            } else {
                prod[u] = prod[per[u]];
            }

            for (auto &v : adj[u]) {
                self(self, v);
            }

            tout[u] = ++timp;
        };

        prod[0] = 1;
        dfs(dfs, 1);

        int q;
        f >> q;

        while (q--) {
            int a, b;
            f >> a >> b;

            bool ok = true;
            if (d[b] >= d[a]) {
                ok = false;
            }

            if (!(tin[per[b]] < tin[per[a]] && tout[per[a]] < tout[per[b]])) {
                ok = false;
            }

            if (tin[b] < tin[a] && tout[a] < tout[b]) {
                ok = false;
            }

            if (fii[per[b]] != fii[per[per[a]]]) {
                ok = false;
            }

            if (cer == 2 || !ok) {
                g << ok << '\n';
            } else {
                g << prod[per[per[a]]] * pw(prod[per[b]], MOD - 2) % MOD << '\n';
            }
        }
    }
}
```
