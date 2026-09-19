---
id: OJI-2014-VI-imprimanta
title: Soluția problemei imprimanta (OJI 2014, clasa a VI-a)
problem_id: 844
authors: [iordaiche]
prerequisites:
    - basic-math
tags:
    - OJI
    - clasa VI
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2014/06/imprimanta.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2014/06/imprimanta.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2014/06/imprimanta.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: AntonioCC (kilonova)
#include <bits/stdc++.h>
using namespace std;

int Cif[10] = {12, 5, 11, 11, 9, 11, 12, 7, 13, 12}, V[10] = {0};

int main()
{
    ifstream fin("imprimanta.in");
    ofstream fout("imprimanta.out");

    long long N, K;

    fin >> N >> K;

    while(N != 0){
        V[N % 10]++;
        N = N / 10;
    }

    int minim = 14, cifMinima = 10;
    for(int i = 0; i < 10; i++)
        if(V[i] != 0 && Cif[i] <= minim){
            minim = Cif[i];
            cifMinima = i;
        }

    fout << cifMinima << '\n';

    long long nr;
    if(K % 5 == 0){
        nr = K / 5;
        for(int i = 0; i < nr; i++)
            fout << 1;
    }
    else if(K % 5 == 1){
        if(K == 16)
            fout << 74;
        else{
            fout << 777;
            nr = K / 5 - 4;
            for(int i = 0; i < nr; i++)
                fout << 1;
        }
    }
    else if(K % 5 == 2){
        fout << 7;
        nr = K / 5 - 1;
        for(int i = 0; i < nr; i++)
            fout << 1;
    }
    else if(K % 5 == 3){
        fout << 8;
        nr = K / 5 - 2;
        for(int i = 0; i < nr; i++)
            fout << 1;
    }
    else{
        fout << 77;
        nr = K / 5 - 2;
        for(int i = 0; i < nr; i++)
            fout << 1;
    }
    return 0;
}
```
