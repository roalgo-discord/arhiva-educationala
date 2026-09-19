---
id: OJI-2013-VI-galbeni
title: Soluția problemei galbeni (OJI 2013, clasa a VI-a)
problem_id: 402
authors: [nicoli]
prerequisites:
    - placeholder
tags:
    - OJI
    - clasa VI
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2013/06/galbeni.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2013/06/galbeni.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2013/06/galbeni.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: AntonioCC (kilonova)
#include <bits/stdc++.h>
using namespace std;

int seq[1100], pos[1100];

int main()
{
    ifstream fin("galbeni.in");
    ofstream fout("galbeni.out");

    int S, K;
    long long N;

    fin >> S >> K >> N;

    int nrCifre;
    if(K == 1)
        nrCifre = 10;
    else if(K == 2)
        nrCifre = 100;
    else
        nrCifre = 1000;

    for(int i = 0; i < nrCifre; i++)
        pos[i] = 0;

    int cycleStart = -1, cycleLen = -1, len = 1;

    seq[1] = S;
    pos[S] = 1;

    for(int i = 2; true; i++){
        long long prod = S;
        int aux = S;

        while(aux > 0){
            int c = aux % 10;
            if(c != 0)
                prod = prod * c;
            aux = aux / 10;
        }

        prod = prod * 8;
        prod = prod / 9;
        prod = prod % nrCifre;

        int limit = nrCifre / 10;
        while(prod < limit)
            prod = prod * 10 + 9;

        S = (int)prod;

        if(pos[S] != 0){
            cycleStart = pos[S];
            cycleLen = i - cycleStart;
            break;
        }

        len++;
        seq[len] = S;
        pos[S] = i;
    }

    int result;
    if(N <= len)
        result = seq[N];
    else{
        long long posFinal = cycleStart + (N - cycleStart) % cycleLen - 1;
        result = seq[posFinal + 1];
    }

    fout << result;

    return 0;
}
```
