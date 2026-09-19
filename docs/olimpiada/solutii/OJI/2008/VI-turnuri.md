---
id: OJI-2008-VI-turnuri
title: Soluția problemei turnuri (OJI 2008, clasa a VI-a)
problem_id: 774
authors: []
prerequisites:
    - ad-hoc
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

int main()
{
    ifstream fin("turnuri.in");
    ofstream fout("turnuri.out");

    int V[1001] = {0}, nr, m, n;

    fin >> m >> n;

    for(int i = 0; i < m; i++)
        for(int j = 0; j < n; j++){
            fin >> nr;
            if(nr == 1)
                V[j]++;
        }

    for(int i = 0; i < n; i++)
        fout << V[i] << " ";

    int maxInit = 0, maxComb = 0;
    for(int i = 0; i < n; i++)
        if(V[i] > maxInit)
            maxInit = V[i];

    for(int i = 0; i < n-1; i++)
        if(V[i] > 0 && V[i+1] > 0 && V[i] + V[i+1] <= m)
            if(V[i] + V[i+1] > maxComb) maxComb = V[i] + V[i+1];

    int vfMax;
    if(maxInit > maxComb)
        vfMax = maxInit;
    else
        vfMax = maxComb;

    fout << endl << vfMax << endl;

    int ctVfMax = 0;
    for(int i = 0; i < n; i++)
        if(V[i] == vfMax)
            ctVfMax++;

    for(int i = 0; i < n-1; i++)
        if(V[i] > 0 && V[i+1] > 0 && V[i] + V[i+1] == vfMax){
            ctVfMax++;
            i++;
        }

    fout << ctVfMax;

    return 0;
}
```
