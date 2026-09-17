---
id: OJI-2026-VI-zudt
title: Soluția problemei zudt (OJI 2026, clasa a VI-a)
problem_id: 4218
authors: []
prerequisites:
    - partial-sums
    - binary-search
tags:
    - OJI
    - clasa VI
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2026/06.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2026/06.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2026/06.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// Dan Pracsiu
#include <bits/stdc++.h>
using namespace std;

ifstream fin("zudt.in");
ofstream fout("zudt.out");
int a[200001], n, C;
int sp[200001];

int main() {
    int i, j, k, x, st, dr, mij;
    fin >> C >> n;
    for (int i = 1; i <= n; i++) {
        fin >> a[i];
        sp[i] = sp[i - 1] + a[i];
    }
    if (C == 1) {
        for (i = 1; i < n && 2 * sp[i] != sp[n]; i++) ;
        if (i < n)
            fout << i << "\n";
        else
            fout << "0\n";
    } else if (C == 2) {
        for (i = 2; i < n && sp[i - 1] != sp[n] - sp[i]; i++)
            ;
        if (i < n)
            fout << i << "\n";
        else
            fout << "0\n";
    } else if (C == 3) {
        k = 0;
        for (i = 2; i <= n - 3 && k == 0; i++) {
            x = sp[i - 1];
            /// caut binar in a[i+1..n-1] o pozitie j
            /// a.i. x = sp[j-1]-sp[i] = sp[n]-sp[j]
            st = i + 1;
            dr = n - 1;
            j = 0;
            while (st <= dr && j == 0) {
                mij = (st + dr) / 2;
                if (x == sp[mij - 1] - sp[i]) {
                    if (x == sp[n] - sp[mij])
                        j = mij;
                    else
                        st = dr + 1;
                } else if (x > sp[mij - 1] - sp[i])
                    st = mij + 1;
                else
                    dr = mij - 1;
            }
            if (j != 0) {
                fout << i << " " << j << "\n";
                k = 1;
            }
        }
        if (k == 0)
            fout << "0\n";
    }
    return 0;
}
```
