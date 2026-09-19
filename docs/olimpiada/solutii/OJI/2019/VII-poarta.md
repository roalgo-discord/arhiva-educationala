---
id: OJI-2019-VII-poarta
title: Soluția problemei poarta (OJI 2019, clasa a VII-a)
problem_id: 910
authors: [frbalasa]
prerequisites:
    - simulating-solution
    - partial-sums
    - basic-math
tags:
    - OJI
    - clasa VII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2019/07/poarta.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2019/07/poarta.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2019/07/poarta.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;
ifstream f("poarta.in");
ofstream g("poarta.out");
int c, n;
int bn[10002], cc;
char p[1002];
int nrmare[1002], st[10002];
int bn2[20], cc2;
int main() {
    f >> c;
    f >> n;
    f >> (p + 1);
    nrmare[0] = strlen(p + 1);
    for (int j = 1; j <= nrmare[0]; ++j)
        nrmare[nrmare[0] - j + 1] = (p[j] - '0');
    while (nrmare[0]) {
        ++cc;
        if (nrmare[1] % 2 == 1)
            bn[cc] = 1;
        int tr = 0;
        for (int j = nrmare[0]; j >= 1; --j) {
            nrmare[j] += 10 * tr;
            tr = nrmare[j] % 2;
            nrmare[j] /= 2;
        }
        while (nrmare[nrmare[0]] == 0 && nrmare[0])
            --nrmare[0];
    }
    reverse(bn + 1, bn + cc + 1);
    for (int j = cc; j >= 1; --j)
        st[j] = st[j + 1] + bn[j];
    int ans1 = (1 << 30);
    int ans2 = (1 << 30);
    for (int j = 1; j <= n; ++j) {
        int a = j;
        cc2 = 0;
        while (a) {
            bn2[++cc2] = a % 2;
            a /= 2;
        }
        reverse(bn2 + 1, bn2 + cc2 + 1);
        int nr = 0;
        for (int j = 1; j <= cc2; ++j)
            nr = nr * 2 + bn[j];
        if (nr >= j) {
            ans1 = min(ans1, nr - j + 1 + cc - cc2 + st[cc2 + 1]);
            ans2 = min(ans2, nr - j + (cc - cc2) * 2 + st[cc2 + 1]);
        } else {
            ++cc2;
            nr = nr * 2 + bn[cc2];
            ans1 = min(ans1, nr - j + 1 + cc - cc2 + st[cc2 + 1]);
            ans2 = min(ans2, nr - j + (cc - cc2) * 2 + st[cc2 + 1]);
        }
        if (cc2 == cc) {
            bool eq = 1;
            for (int j = 1; j <= cc2; ++j)
                if (bn[j] != bn2[j])
                    eq = 0;
            if (eq)
                break;
        }
    }
    if (c == 1)
        g << ans1;
    else
        g << ans2;
    return 0;
}
```
