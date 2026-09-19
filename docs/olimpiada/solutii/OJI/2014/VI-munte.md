---
id: OJI-2014-VI-munte
title: Soluția problemei munte (OJI 2014, clasa a VI-a)
problem_id: 845
authors: [timplaru]
prerequisites:
    - simulating-solution
tags:
    - OJI
    - clasa VI
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2014/06/munte.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2014/06/munte.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2014/06/munte.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: AntonioCC (kilonova)
#include <bits/stdc++.h>
using namespace std;

long long V[101];

int main() {
    ifstream fin("munte.in");
    ofstream fout("munte.out");

    int n;

    fin >> n;

    for (int i = 1; i <= n; i++)
        fin >> V[i];

    int OK = 1, nr = 0, verif = 1;
    while (OK == 1) {
        OK = 0;
        for (int i = 1; i <= n - 2; i++)
            if (V[i] < V[i + 1] && V[i + 1] > V[i + 2]) {
                nr++;
                OK = 1;
                for (int j = i + 1; j <= n - 1; j++)
                    V[j] = V[j + 1];
                n--;
            }
        if (verif == 1) {
            fout << nr << '\n';
            verif = 0;
        }
    }

    fout << nr << '\n' << n;
    return 0;
}
```
