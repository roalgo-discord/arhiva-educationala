---
id: OJI-2005-VI-sir
title: Soluția problemei sir (OJI 2005, clasa a VI-a)
problem_id: 740
authors: [dgrigoriu]
prerequisites:
    - simulating-solution
tags:
    - OJI
    - clasa VI
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2005/06/sir.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2005/06/sir.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2005/06/sir.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: elena_jalba (kilonova)
#include <algorithm>
#include <fstream>
#include <iostream>

using namespace std;

ifstream fin("sir.in");
ofstream fout("sir.out");

int v[100];
int f[100];
int z[10];

int main() {
    int i, j, n, x;
    bool ok;

    fin >> v[0];

    v[0] = v[0] * v[0] / 10 % 100;

    f[v[0]] = 1;

    for (i = 0; i < 999999; i++) {
        x = v[i] * v[i] / 10 % 100;

        if (f[x] == 0) {
            v[i + 1] = x;

            f[x] = 1;
        }

        else
            break;
    }

    n = i + 1;

    for (i = 0; i < n; i++)
        fout << v[i] << " ";

    fout << endl;

    for (i = 0; i < n; i++)
        if (v[i] < 10) {
            z[v[i]] = 1;

            v[i] *= 10;
        }

    sort(v, v + n);

    for (i = 0; i < n; i++) {
        if (v[i] % 10 == 0 && z[v[i] / 10] == 1)
            v[i] /= 10;

        fout << v[i] << " ";
    }

    return 0;
}
```
