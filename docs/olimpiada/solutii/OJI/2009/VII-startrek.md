---
id: OJI-2009-VII-startrek
title: Soluția problemei startrek (OJI 2009, clasa a VII-a)
problem_id: 789
authors: [sgalatan]
prerequisites:
    - ad-hoc
tags:
    - OJI
    - clasa VII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2009/07/startrek.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2009/07/startrek.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2009/07/startrek.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

ifstream fin("startrek.in");
ofstream fout("startrek.out");

const int MAXN = 4e3;

int distanceToShip[MAXN], timeUntilImpact[MAXN];

int main() {
    int n, timeBetweenShots, i, speed, time, shots;

    fin >> n >> timeBetweenShots;
    for(i = 0; i < n; i++){
        fin >> distanceToShip[i];
    }
    for(i = 0; i < n; i++){
        fin >> speed;
        timeUntilImpact[i] = distanceToShip[i] / speed;
    }

    sort(timeUntilImpact, timeUntilImpact + n);
    time = shots = 0;
    for(i = 0; i < n; i++){
        if(timeUntilImpact[i] >= time){
            shots++;
            time += timeBetweenShots;
        }
    }

    fout << shots;
    return 0;   
}
```
