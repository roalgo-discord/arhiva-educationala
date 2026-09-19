---
id: OJI-2011-VII-grupe
title: Soluția problemei grupe (OJI 2011, clasa a VII-a)
problem_id: 811
authors: [timplaru]
prerequisites:
    - divisibility
    - maxime-minime
tags:
    - OJI
    - clasa VII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2011/07/grupe.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2011/07/grupe.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2011/07/grupe.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

ifstream fin("grupe.in");
ofstream fout("grupe.out");

const int MAXDIV = 1000;

int grupa[MAXDIV], maxElement[MAXDIV];

int main() {
    int m, n, i, nr, copNr, d, nrDiv, maxNrDiv, p, nrElement1, nrElement2, pnt1, pnt2;

    fin >> m >> n;

    maxNrDiv = 0;
    for(i = 0; i < m * n; i++){
        fin >> nr;
        copNr = nr;

        d = 2; 
        nrDiv = 1;
        while(d * d <= nr){
            p = 0;
            while(nr % d == 0){
                nr /= d;
                p++;
            }

            nrDiv *= (p + 1);
            d++;
        }
        if(nr > 1){
            nrDiv *= 2;
        }

        grupa[nrDiv]++;
        maxNrDiv = max(maxNrDiv, nrDiv);
        maxElement[nrDiv] = max(maxElement[nrDiv], copNr);
    }

    nrElement1 = grupa[2];
    pnt1 = 2;

    nrElement2 = 0;
    pnt2 = 0;
    for(i = 3; i <= maxNrDiv; i++){
        if(grupa[i] >= nrElement1){
            nrElement2 = nrElement1;
            pnt2 = pnt1;

            nrElement1 = grupa[i];
            pnt1 = i;
        } else if(grupa[i] >= nrElement2){
            nrElement2 = grupa[i];
            pnt2 = i;
        }
    }

    fout << pnt1 << ' ' << grupa[pnt1] << ' ' << maxElement[pnt1] << '\n';

    if(nrElement2 == 0){
        fout << "0 0 0\n";
    } else {
        fout << pnt2 << ' ' << grupa[pnt2] << ' ' << maxElement[pnt2] << '\n';
    }
    return 0;
}
```
