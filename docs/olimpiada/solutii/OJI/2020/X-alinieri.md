---
id: OJI-2020-X-alinieri
title: Soluția problemei alinieri (OJI 2020, clasa a X-a)
problem_id: 927
authors: [chesca]
prerequisites:
    - basic-math
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2020/10.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2020/10.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2020/10.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

const int MAX_NUM_PLANETS = 1e5, ANGLE_YEAR = 360, NUM_ANGLES = 180;

int rotationSpeed[MAX_NUM_PLANETS + 5], alignedPlanet[NUM_ANGLES + 5], frecv[NUM_ANGLES + 5];

int main() {
    ifstream cin("alinieri.in");
    ofstream cout("alinieri.out");

    int numPlanets, minPlanets, numDays, planet, day, fullYear, angle, daysLeft, cnt, endDay;

    cin >> numPlanets >> minPlanets >> numDays;
    endDay = numDays % NUM_ANGLES;
    for (planet = 0; planet < numPlanets; planet++) {
        cin >> rotationSpeed[planet];
        frecv[rotationSpeed[planet] % NUM_ANGLES]++;
    }

    fullYear = daysLeft = cnt = 0;
    for (day = 0; day < NUM_ANGLES; day++) {
        for (angle = 0; angle < NUM_ANGLES; angle++)
            alignedPlanet[angle] = 0;

        for (angle = 0; angle < NUM_ANGLES; angle++)
            alignedPlanet[(angle * day) % NUM_ANGLES] += frecv[angle];

        cnt = 0;
        for (angle = 0; angle < NUM_ANGLES; angle++) {
            if (alignedPlanet[angle] >= minPlanets) {
                cnt++;
            }
        }

        fullYear += cnt;
        if (endDay == day)
            daysLeft = fullYear;
    }

    cout << (numDays / NUM_ANGLES) * fullYear + daysLeft - 1;
    return 0;
}
```
