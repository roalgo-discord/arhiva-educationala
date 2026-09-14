---
id: OJI-2010-V-sir
title: Soluția problemei sir (OJI 2010, clasa a V-a)
problem_id: 795
authors: [cminca]
prerequisites:
    - basic-math
tags:
    - OJI
    - clasa V
---

Articolul va fi disponibil curând în arhivă.

Până atunci, puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2010/05/sir.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2010/05/sir.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2010/05/sir.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <fstream>

using namespace std;
ifstream fin("sir.in");
ofstream fout("sir.out");
long long k, x, a, b, k2, i, sm, x2, pow = 1, cnt;
int main() {
    fin >> k >> x >> a >> b;
    k2 = k;
    for (i = 1; i <= k; i++) {
        sm = sm + k2 * i;
        k2--;
    }
    fout << sm % 10 << '\n';
    x2 = x;
    while (x2 > 0) {
        x2 = x2 / 10;
        cnt++;
        pow = pow * 10;
    }
    pow = pow / 10;
    if (x / pow == cnt) {
        for (i = 1; i <= cnt + 1; i++) {
            fout << i;
        }
        fout << endl;
    } else {
        fout << (x % pow) * 10 + (x / pow) << '\n';
    }
    fout << max(1LL * 0, b - a);
    return 0;
}
```
