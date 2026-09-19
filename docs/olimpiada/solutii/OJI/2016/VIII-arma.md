---
id: OJI-2016-VIII-arma
title: Soluția problemei arma (OJI 2016, clasa a VIII-a)
problem_id: 872
authors: [slukacs]
prerequisites:
    - divisiblity
    - sieve
tags:
    - OJI
    - clasa VIII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2016/08/arma.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2016/08/arma.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2016/08/arma.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

using ll = long long;
#define int ll
#define pb push_back

const string FILE_NAME = "arma";
const int MAX_N = 1e4, MAX_NUM = 1e5;

int dist[MAX_N + 5];
bool ciur[MAX_NUM + 5];
vector<int> primes;
vector<pair<int, int>> divs;

int binPow (int b, int e) {
    int ans = 1;
    while (e) {
        if (e & 1) {
            ans *= b;
        }
        b *= b;
        e >>= 1;
    }
    return ans;
}

signed main () {
#ifndef LOCAL
    ifstream cin(FILE_NAME + ".in");
    ofstream cout(FILE_NAME + ".out");
#endif

    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int cer, n, i, d, idx, exp, p, ans, k;

    for (d = 2; d * d <= MAX_NUM; d++) {
        if (!ciur[d]) {
            for (i = d * d; i <= MAX_NUM; i += d) {
                ciur[i] = 1;
            }
        }
    }
    for (d = 2; d <= MAX_NUM; d++) {
        if (!ciur[d]) {
            primes.push_back(d);
        }
    }

    cin >> cer >> n;

    ans = 0;
    for (i = 0; i < n; i++) {
        cin >> dist[i];

        divs.clear();
        idx = p = 0;
        while (primes[idx] * primes[idx] <= dist[i]) {
            exp = 0;
            while (dist[i] % primes[idx] == 0) {
                exp++;
                dist[i] /= primes[idx];
            }
            if (exp) {
                p = __gcd(p, exp);
                divs.emplace_back(primes[idx], exp);
            }
            idx++;
        }
        if (dist[i] > 1) {
            p = __gcd(p, 1LL);
            divs.emplace_back(dist[i], 1);
        }

        if (cer == 2) {
            cout << p << "\n";
            continue;
        }

        k = 1;
        for (auto e : divs) {
            k *= binPow(e.first, e.second / p);
        }
        ans += k;
    }
    if (cer == 1) {
        cout << ans << "\n";
    }
    return 0;
}
```
