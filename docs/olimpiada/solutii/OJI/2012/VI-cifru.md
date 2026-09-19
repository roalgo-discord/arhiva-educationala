---
id: OJI-2012-VI-cifru
title: Soluția problemei cifru (OJI 2012, clasa a VI-a)
problem_id: 821
authors: [aburta]
prerequisites:
    - maxime-minime
    - basic-math
tags:
    - OJI
    - clasa VI
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2012/06/cifru.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2012/06/cifru.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2012/06/cifru.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: AntonioCC (kilonova)
#include <bits/stdc++.h>
using namespace std;

int V[100000], V2[100000];

int main()
{
    ifstream fin("cifru.in");
    ofstream fout("cifru.out");

    int N, nr, cifMaxima = 0;

    fin >> N;

    for(int i = 0; i < N; i++){
        fin >> V[i];
        if(V[i] > cifMaxima)
            cifMaxima = V[i];
    }

    int miscMinime = 1000000, valMinima, nrCombinatii = 0;
    for(int j = 0; j < 10; j++){
        int miscari = 0;
        for(int i = 0; i < N; i++){
            int dist1 = abs(V[i] - j);
            int dist2 = 10 - dist1;
            if(dist1 < dist2)
                miscari = miscari + dist1;
            else
                miscari = miscari + dist2;
        }
        if(miscari < miscMinime){
            miscMinime = miscari;
            valMinima = j;
            nrCombinatii = 1;
        }
        else if(miscari == miscMinime)
            nrCombinatii++;
    }

    fout << cifMaxima << '\n' << miscMinime << '\n' << valMinima << '\n' << nrCombinatii;
    return 0;
}
```
