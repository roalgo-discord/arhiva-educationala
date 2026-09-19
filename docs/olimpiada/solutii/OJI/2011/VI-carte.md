---
id: OJI-2011-VI-carte
title: Soluția problemei carte (OJI 2011, clasa a VI-a)
problem_id: 809
authors: [sichim]
prerequisites:
    - maxime-minime
tags:
    - OJI
    - clasa VI
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2011/06/carte.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2011/06/carte.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2011/06/carte.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: AntonioCC (kilonova)
#include <bits/stdc++.h>
using namespace std;

int C[10000];

int main()
{
    ifstream fin("carte.in");
    ofstream fout("carte.out");

    int n;

    fin >> n;

    for(int i = 0; i < n; i++)
        fin >> C[i];

    int nrZile = 1, paginaCautata = 0, cartiCitite, maxCartiCitite = 0, zimaxCartiCitite = 0;
    while(paginaCautata != n){
        cartiCitite = 0;
        for(int i = 0; i < n && paginaCautata < n; i++)
            if(C[i] == paginaCautata + 1){
                paginaCautata++;
                cartiCitite++;
            }
        if(cartiCitite > maxCartiCitite){
            maxCartiCitite = cartiCitite;
            zimaxCartiCitite = nrZile;
        }
        nrZile++;
    }

    fout << nrZile - 1 << " " << zimaxCartiCitite << " " << maxCartiCitite;
    return 0;
}
```
