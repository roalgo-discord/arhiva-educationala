---
id: OJI-2019-VIII-cate3cifre
title: Soluția problemei cate3cifre (OJI 2019, clasa a VIII-a)
problem_id: 912
authors: [marinel]
prerequisites:
    - frequency-arrays
    - basic-math
tags:
    - OJI
    - clasa VIII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2019/08/cate3cifre.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2019/08/cate3cifre.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2019/08/cate3cifre.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;
ifstream f("cate3cifre.in");
ofstream g("cate3cifre.out");
int c, n;
int frq[1000002];
int xa[1000002], ya[1000002];
int va[1000002], ta[1000002];
int main() {
    f >> c;
    f >> n;
    for (int i = 2; i <= 1000; ++i)
        for (int j = 1; j < i; ++j) {
            int nr = j * (i * i) + j * i + j;
            if (nr > 1000000)
                continue;
            frq[nr]++;
            if (frq[nr] == 1)
                xa[nr] = i, va[nr] = j;
            if (frq[nr] == 2)
                ya[nr] = i, ta[nr] = j;
        }
    for (int i = n; i >= 1; --i)
        if (frq[i] == 2) {
            if (c == 1)
                g << i;
            else
                g << xa[i] << " " << va[i] << '\n' << ya[i] << " " << ta[i] << '\n';
            return 0;
        }
    return 0;
}
```
