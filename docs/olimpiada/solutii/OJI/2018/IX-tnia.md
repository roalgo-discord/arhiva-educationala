---
id: OJI-2018-IX-tnia
title: Soluția problemei tnia (OJI 2018, clasa a IX-a)
problem_id: 892
authors: [eudanip]
prerequisites:
    - binary-search
    - partial-sums
tags:
    - OJI
    - clasa IX
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2018/09/tnia.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2018/09/tnia.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2018/09/tnia.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
/*
    Matricea o vom inversa pentru usurarea rezolvarii si a explicarii ulterioare

    Cum se spune ca numarul de 1 intr-o linie e in ordine crescatoare, vom grupa liniile in 3 grupe
    Liniile care nu au macar B de 1, liniile care au intre B si D 1, liniile care au D sau mai multi de 1

    Folosind sume partiale si cautare binara, vom ajunge la rezultatul dorit

*/

#include <bits/stdc++.h>
using namespace std;
ifstream f("tnia.in");
ofstream g("tnia.out");
int n, m;
int Coverage[100002];
long long sp[100002];
int q;
int a, b, c, d;
int cb(int b, int e, int val) {
    if (Coverage[b] >= val)
        return b;
    while (b <= e) {
        int mid = (b + e) / 2;
        if (Coverage[mid] >= val && Coverage[mid - 1] < val)
            return mid;
        if (Coverage[mid] >= val)
            e = mid - 1;
        else
            b = mid + 1;
    }
}
long long ans(long long xa, long long ya, long long xb, long long yb) {
    int ls, lsf;
    long long ans = 0;
    if (Coverage[xb] < ya)
        return 0;
    else
        ls = cb(xa, xb, ya);
    if (Coverage[xb] < yb)
        lsf = xb;
    else {
        lsf = cb(xa, xb, yb) - 1;
        ans += 1LL * (xb - lsf) * (yb - ya + 1);
    }
    ans = ans + sp[lsf] - sp[ls - 1];
    ans -= 1LL * (lsf - ls + 1) * (ya - 1);
    return ans;
}
int main() {
    f >> n >> m;
    for (int i = 1; i <= n; ++i) {
        f >> Coverage[i];
        sp[i] = Coverage[i] + sp[i - 1];
    }
    f >> q;
    for (int i = 1; i <= q; ++i) {
        f >> a >> b >> c >> d;
        g << ans(a, b, c, d) << '\n';
    }
    return 0;
}
```
