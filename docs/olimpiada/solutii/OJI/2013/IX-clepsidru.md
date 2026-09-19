---
id: OJI-2013-IX-clepsidru
title: Soluția problemei clepsidru (OJI 2013, clasa a IX-a)
problem_id: 830
authors: [chesca]
prerequisites:
    - basic-math
tags:
    - OJI
    - clasa IX
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2013/09/clepsidru.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2013/09/clepsidru.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2013/09/clepsidru.pdf){ .md-button target="_blank" rel="noopener" }

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

    ifstream cin("clepsidru.in");
    ofstream cout("clepsidru.out");

    int n, b;
    cin >> n >> b;

    int k;
    cin >> k;

    vector<int> s(k), p(k);

    vector<int> c(2 * n, 0);
    vector<bool> is_zero(2 * n, true);

    c[0] = b;
    is_zero[0] = false;

    int curr_state = 1;
    for (int i = 0; i < k; i++) {
        cin >> s[i] >> p[i];

        if (p[i] != curr_state) {
            reverse(c.begin(), c.end());
            reverse(is_zero.begin(), is_zero.end());
            for (int j = 0; j < 2 * (n - 1); j += 2) {
                if (c[j + 1] != 0) {
                    c[j + 2] += c[j + 1];
                    c[j + 1] = 0;
                }
            }
            for (int j = 0; j < 2 * n; j++) {
                is_zero[j] = (c[j] == 0);
            }
        }
        curr_state = p[i];
        for (int j = 0; j < 2 * n; j += 2) {
            int move;
            if (is_zero[j]) {
                move = min(c[j] - 1, s[i]);
            } else {
                move = min(c[j], s[i]);
            }
            c[j] -= move;
            if (j == 2 * n - 2) {
                c[j + 1] += move;
            } else {
                c[j + 2] += move;
            }
        }

        for (int j = 0; j < 2 * n; j++) {
            is_zero[j] = (c[j] == 0);
        }
    }

    cout << b + (n - 1) << "\n";

    if (curr_state == 2) {
        reverse(c.begin(), c.end());
    }

    for (int j = 0; j < 2 * n; j += 2) {
        cout << c[j] << " " << c[j + 1] << "\n";
    }
    return 0;
}
```
