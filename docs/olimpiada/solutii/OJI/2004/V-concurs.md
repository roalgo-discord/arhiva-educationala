---
id: OJI-2004-V-concurs
title: Soluția problemei concurs (OJI 2004, clasa a V-a)
problem_id: 726
authors: [valsan]
prerequisites:
    - simulating-solution
tags:
    - OJI
    - clasa V
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2004/OJI%202004%20V.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2004/OJI%202004%20V.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2004/OJI%202004%20V.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ifstream cin("concurs.in");
    ofstream cout("concurs.out");

    int nrh, s, z, u;
    cin >> nrh;

    s = nrh / 100;
    z = (nrh / 10) % 10;
    u = nrh % 10;

    int n;
    cin >> n;

    bool ok = 0;
    int nrA = 0;
    int nrB = 0;
    for (int i = 1; i <= n; i++) {
        int val;
        cin >> val;
        int s2 = val / 100;
        int z2 = (val / 10) % 10;
        int u2 = val % 10;

        if (val == nrh)
            ok = 1;
        if (s2 == s)
            nrA++;
        if (s2 == s && z2 == z)
            nrB++;
    }

    if (ok == 1)
        cout << "DA\n";
    else
        cout << "NU\n";
    cout << nrA << '\n';
    cout << nrB << '\n';
    return 0;
}
```
