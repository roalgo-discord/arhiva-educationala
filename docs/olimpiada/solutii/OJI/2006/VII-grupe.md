---
id: OJI-2006-VII-grupe
title: Soluția problemei grupe (OJI 2006, clasa a VII-a)
problem_id: 754
authors: [asimulescu]
prerequisites:
    - simulating-solution
tags:
    - OJI
    - clasa VII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2006/07/grupe.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2006/07/grupe.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2006/07/grupe.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 200, MAXK = 200;

int f[MAXN + 1], nrCop[MAXK];

ifstream fin("grupe.in");
ofstream fout("grupe.out");

int main() {
    int n, k, i, nrFete, nrBaieti, j, pnt, ok;
    string s;

    fin >> n >> k >> s;
    for (i = 1; i <= n; i++) {
        f[i] = 0;
    }
    ok = 1;
    for (i = 1; i <= k; i++) {
        fin >> nrCop[i];
        nrFete = nrBaieti = 0;
        for (j = 1; j <= nrCop[i]; j++) {
            fin >> pnt;

            f[pnt]++;
            if (f[pnt] > 1) // Fiecare copil sa apara intr-o singura grupa
                ok = 0;

            if (s[--pnt] == 'f')
                nrFete++;
            else
                nrBaieti++;
        }
        fout << nrBaieti << " " << nrFete << '\n';
        if (abs(nrBaieti - nrFete) > 1) // numarul de fete si de baieti din fiecare grupa trebuie sa difere cu cel mult 1
            ok = 0;
    }

    for (i = 1; i <= k; i++) {
        for (j = i + 1; j <= k; j++) {
            if (abs(nrCop[i] - nrCop[j]) > 1) { // numarul de elevi din oricare doua grupe trebuie sa difere cel mult cu 1
                fout << "NU\n";
                return 0;
            }
        }
    }

    fout << (ok == 1 ? "DA\n" : "NU\n");
    return 0;
}
```
