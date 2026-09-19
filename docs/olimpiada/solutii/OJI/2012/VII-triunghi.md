---
id: OJI-2012-VII-triunghi
title: Soluția problemei triunghi (OJI 2012, clasa a VII-a)
problem_id: 824
authors: [nmot]
prerequisites:
    - ad-hoc
tags:
    - OJI
    - clasa VII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2012/07/triunghi.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2012/07/triunghi.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2012/07/triunghi.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

ifstream fin("triunghi.in");
ofstream fout("triunghi.out");

const int MAXN = 1000;

long long triunghi[MAXN + 1][MAXN + 1], knownValueLocation[MAXN + 1];

int main() {
    long long n, p, v, i, j;

    fin >> n;
    for(i = n; i >= 1; i--){
        fin >> p >> v;

        triunghi[i][p] = v;
        knownValueLocation[i] = p;
    }

    for(i = 1; i <= n; i++){
        for(j = knownValueLocation[i] + 1; j <= i; j++){ // Completam la dreapta
            triunghi[i][j] = triunghi[i - 1][j - 1] - triunghi[i][j - 1];
        }
        for(j = knownValueLocation[i] - 1; j >= 1; j--){ // Completam la stanga
            triunghi[i][j] = triunghi[i - 1][j] - triunghi[i][j + 1];
        }
    }

    for(i = 1; i <= n; i++){
        fout << triunghi[n][i] << ' ';
    }
    return 0;
}
```
