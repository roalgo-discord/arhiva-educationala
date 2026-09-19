---
id: OJI-2011-VI-grad
title: Soluția problemei grad (OJI 2011, clasa a VI-a)
problem_id: 810
authors: [dapopescu]
prerequisites:
    - sorting
tags:
    - OJI
    - clasa VI
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2011/06/grad.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2011/06/grad.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2011/06/grad.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: AntonioCC (kilonova)
#include <bits/stdc++.h>
using namespace std;

int V[10000], V2[10000], V3[10000];

int main()
{
    ifstream fin("grad.in");
    ofstream fout("grad.out");

    int n, k;

    fin >> n >> k;

    for(int i = 0; i < n; i++){
        fin >> V[i];
        V2[i] = V[i];
    }

    sort(V2, V2 + n);

    int grad = 0;
    for(int i = 0; i < n; i++)
        if(V[i] == V2[i])
            grad++;

    fout << grad << endl;

    int gradMaxim = 0, p;
    for(int i = 0; i < n - k + 1; i++){
        int z = 0, gradIntern = 0;
        if(n - i - 1 >= k){
            int aux = k, j = i + 1;
            while(aux){
                V2[z] = V3[z] = V[j];
                z++; j++; aux--;
            }
            sort(V3, V3 + z);
            for(int t = 0; t < z; t++)
                if(V2[t] == V3[t])
                    gradIntern++;
            if(gradIntern > gradMaxim){
                gradMaxim = gradIntern;
                p = i + 2;
            }
        }
    }

    fout << p << " " << gradMaxim;
    return 0;
}
```
