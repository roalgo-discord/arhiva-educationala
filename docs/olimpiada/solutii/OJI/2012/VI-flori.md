---
id: OJI-2012-VI-flori
title: Soluția problemei flori (OJI 2012, clasa a VI-a)
problem_id: 822
authors: [sgalatan]
prerequisites:
    - simulating-solution
tags:
    - OJI
    - clasa VI
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2012/06/flori.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2012/06/flori.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2012/06/flori.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: AntonioCC (kilonova)
#include <bits/stdc++.h>
using namespace std;

int V[100];

int main() {
    ifstream fin("flori.in");
    ofstream fout("flori.out");

    int n, H;

    fin >> n >> H;

    for (int i = 0; i < n; i++)
        fin >> V[i];

    int aux = n, S = 0;
    for (int i = 0; i < n; i++) {
        S = S + V[i] + aux;
        aux--;
    }

    fout << S << '\n';

    int nrZile = 0;
    do {
        sort(V, V + n);
        if (V[n - 1] >= H)
            break;
        for (int i = 0; i <= nrZile; i++)
            V[i]++;
        nrZile++;
    } while (true);

    fout << nrZile - 1;
    return 0;
}
```
