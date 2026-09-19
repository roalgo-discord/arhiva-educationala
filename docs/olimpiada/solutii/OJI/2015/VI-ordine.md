---
id: OJI-2015-VI-ordine
title: Soluția problemei ordine (OJI 2015, clasa a VI-a)
problem_id: 857
authors: [marinel]
prerequisites:
    - ad-hoc
tags:
    - OJI
    - clasa VI
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2015/06/ordine.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2015/06/ordine.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2015/06/ordine.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: AntonioCC (kilonova)
#include <bits/stdc++.h>
using namespace std;

int V[250001];

int main()
{
    ifstream fin("ordine.in");
    ofstream fout("ordine.out");

    int n, c;

    fin >> n;

    for(int i = 0; i < n; i++)
        fin >> V[i];

    fin >> c;

    if(c == 1){
        if(n % 2 == 0)
            fout << V[n - 1];
        else
            fout << V[n / 2];
    }
    else{
        int start = 0, stop;
        
        if(n % 2 == 0)
            stop = n / 2;
        else
            stop = n / 2 + 1;

        while(start < n / 2 || stop < n)
            fout << V[start++] << " " << V[stop++] << " ";

        if(n % 2 == 1)
            fout << V[n / 2];
    }
    return 0;
}
```
