---
id: OJI-2008-VI-pagini
title: Soluția problemei pagini (OJI 2008, clasa a VI-a)
problem_id: 775
authors: [orosu]
prerequisites:
    - frequency-arrays
tags:
    - OJI
    - clasa VI
---

Daca vreti sa ne ajutati cu acest articol, ne puteti gasi pe [github](https://github.com/roalgo-discord/arhiva-educationala) sau pe [serverul nostru de discord](https://discord.gg/vdDRSmg3fC)

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: AntonioCC (kilonova)
#include <bits/stdc++.h>
using namespace std;

int V[1000001];

int main() {
    ifstream fin("pagini.in");
    ofstream fout("pagini.out");

    int n, nr, maxPage = 0;
    fin >> n;

    for (int i = 0; i < n; i++) {
        fin >> nr;

        V[nr] = 1;
        if(nr > maxPage)
            maxPage = nr;
    }

    int nrAgrafe = 0, nrPagMax = 0, i;
    while(i <= maxPage){
        if(V[i] == 1){
            int lung = 0;
            while(i <= maxPage && V[i] == 1){
                lung++;
                i++;
            }
            if(lung >= 2){
                nrAgrafe++;
                if(lung > nrPagMax)
                    nrPagMax = lung;
            }
        }
        else
            i++;
    }

    fout << nrAgrafe << endl << nrPagMax;
    return 0;
}
```
