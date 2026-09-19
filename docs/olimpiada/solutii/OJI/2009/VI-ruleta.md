---
id: OJI-2009-VI-ruleta
title: Soluția problemei ruleta (OJI 2009, clasa a VI-a)
problem_id: 787
authors: [sichim]
prerequisites:
    - simulating-solution
tags:
    - OJI
    - clasa VI
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2009/06/ruleta.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2009/06/ruleta.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2009/06/ruleta.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: AntonioCC (kilonova)
#include <bits/stdc++.h>
using namespace std;

int main()
{
    ifstream fin("ruleta.in");
    ofstream fout("ruleta.out");

    int V[10001], n;

    fin >> n;
    
    for(int i = 0; i < n; i++)
        fin >> V[i];

    int OK, r = 0, t;
    do{
        OK = 1, t = 0;
        for(int i = 0; i < n; i++){
            int j = (i + 1) % n;
            if(V[i] != 0 && V[i] <= V[j]){
                V[j] = V[j] - V[i];
                OK = 0;
            }
            if(V[i] != 0)
                t++;
        }
        r++;
    }while(OK == 0);

    fout << r << " " << t;
    return 0;
}
```
