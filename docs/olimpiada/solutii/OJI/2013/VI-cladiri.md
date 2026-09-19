---
id: OJI-2013-VI-cladiri
title: Soluția problemei cladiri (OJI 2013, clasa a VI-a)
problem_id: 833
authors: [iordaiche]
prerequisites:
    - simulating-solution
tags:
    - OJI
    - clasa VI
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2013/06/cladiri.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2013/06/cladiri.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2013/06/cladiri.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: AntonioCC (kilonova)
#include <bits/stdc++.h>
using namespace std;

int V[10], C[10], NR1[6], NR2[6];

int main()
{
    ifstream fin("cladiri.in");
    ofstream fout("cladiri.out");

    int N, nr;

    fin >> N;

    int nrCladiriIdentice = 0, nrCuburiNecesare = 0;
    for(int i = 0; i < N; i++){
        fin >> nr;

        for(int j = 0; j < 10; j++)
            C[j] = 0;

        int aux = nr, inv = 0, nrCif = 0;
        while(aux != 0){
            NR1[nrCif++] = aux % 10;
            C[aux % 10] = 1;
            inv = inv * 10 + aux % 10;
            aux = aux / 10;
        }

        for(int j = 0; j < 10; j++)
            if(C[j] == 1)
                V[j]++;

        if(nr == inv)
            nrCladiriIdentice++;

        for(int j = 0; j < nrCif; j++)
            NR2[j] = NR1[nrCif - j - 1];
        int j = 0;
        while(j < nrCif / 2){
            if(NR1[j] != NR2[j])
                nrCuburiNecesare = nrCuburiNecesare + abs(NR1[j] - NR2[j]);
            j++;
        }
    }

    for(int i = 9; i >= 0; i--)
        if(V[i] != 0){
            fout << i << " " << V[i] << endl;
            break;
        }

    fout << nrCladiriIdentice << '\n' << nrCuburiNecesare;
    return 0;
}
```
