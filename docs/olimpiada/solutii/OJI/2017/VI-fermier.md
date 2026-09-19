---
id: OJI-2017-VI-fermier
title: Soluția problemei fermier (OJI 2017, clasa a VI-a)
problem_id: 882
authors: [timplaru]
prerequisites:
    - partial-sums
    - two-pointers
tags:
    - OJI
    - clasa VI
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2017/06/fermier.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2017/06/fermier.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2017/06/fermier.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: AntonioCC (kilonova)
#include <bits/stdc++.h>
using namespace std;

int D[102], Q[101], S[102] = {0};

int main() {
    ifstream fin("fermier.in");
    ofstream fout("fermier.out");

    int n, c;

    fin >> n >> c;

    for (int i = 1; i <= n + 1; i++) {
        fin >> D[i];
        S[i] = S[i - 1] + D[i];
    }

    for (int i = 1; i <= n; i++)
        fin >> Q[i];

    int sum = S[n + 1], incarcat = c, poz = 0, dist = 0, i = 1;
    while (i <= n + 1) {
        if (incarcat != 0) {
            dist = dist + min(S[i] - S[poz], sum - (S[i] - S[poz]));
            poz = i;
            if (incarcat < Q[i]) {
                Q[i] = Q[i] - incarcat;
                incarcat = 0;
            } else {
                incarcat = incarcat - Q[i];
                i++;
            }
        } else {
            dist = dist + min(S[poz], sum - S[poz]);
            poz = 0;
            incarcat = c;
        }
    }

    fout << dist;

    fin.close();
    fout.close();

    return 0;
}
```
