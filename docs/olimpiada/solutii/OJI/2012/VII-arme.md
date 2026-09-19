---
id: OJI-2012-VII-arme
title: Soluția problemei arme (OJI 2012, clasa a VII-a)
problem_id: 823
authors: [cerchez]
prerequisites:
    - ad-hoc
    - greedy
    - sorting
tags:
    - OJI
    - clasa VII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2012/07/arme.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2012/07/arme.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2012/07/arme.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 1000, MAXM = 1000;

int b[MAXN], p[MAXM];

ifstream fin("arme.in");
ofstream fout("arme.out");

int main() {
    int n, m, i, cnt, sum;

    fin >> n >> m;
    for(i = 0; i < n; i++){
        fin >> b[i];
    }
    for(i = 0; i < m; i++){
        fin >> p[i];
    }

    cnt = sum = 0;
    while(cnt < n){
        auto maxB = max_element(b, b + n), maxP = max_element(p, p + m);
        if(*maxB > *maxP){
            sum += *maxB;
            *maxB = 0;
        } else {
            sum += *maxP;
            *maxP = 0;
        }
        ++cnt;
    }
    fout << sum << '\n';
    return 0;
}
```
