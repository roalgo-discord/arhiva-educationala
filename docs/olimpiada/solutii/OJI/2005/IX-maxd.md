---
id: OJI-2005-IX-maxd
title: Soluția problemei maxd (OJI 2005, clasa a IX-a)
problem_id: 736
authors: [anita, mnita]
prerequisites:
    - sieve
    - divisibility
tags:
    - OJI
    - clasa IX
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2005/09/MaxD.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2005/09/MaxD.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2005/09/MaxD.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
#define maxn 45002
using namespace std;
ifstream f("maxd.in");
ofstream g("maxd.out");
int a, b;
bool isP[maxn];
int nrp[10002], hmp;
int nrdmax, minnr, hm;
void ciur() {
    for (int i = 2; i <= maxn; ++i)
        if (!isP[i]) {
            nrp[++hmp] = i;
            for (int j = i + i; j <= maxn; j += i)
                isP[j] = 1;
        }
}
int main() {
    ciur();
    f >> a >> b;
    for (int i = a; i <= b; ++i) {
        int nrd = 1;
        int ro = i;
        for (int j = 1; nrp[j] * nrp[j] <= ro; ++j) {
            int ex = 1;
            while (ro % nrp[j] == 0)
                ro /= nrp[j], ++ex;
            nrd *= ex;
        }
        if (ro > 1)
            nrd *= 2;
        if (nrd > nrdmax)
            nrdmax = nrd, minnr = i, hm = 1;
        else if (nrd == nrdmax)
            ++hm;
    }
    g << minnr << " " << nrdmax << " " << hm << '\n';
    return 0;
}
```
