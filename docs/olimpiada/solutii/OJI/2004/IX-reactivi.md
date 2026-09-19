---
id: OJI-2004-IX-reactivi
title: Soluția problemei reactivi (OJI 2004, clasa a IX-a)
problem_id: 724
authors: [marinel]
prerequisites:
    - greedy
tags:
    - OJI
    - clasa IX
---

Articolul va fi disponibil curând în arhivă.

Până atunci, puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2004/09/sol_reac.txt).

<div class="editorial-text" markdown>

```text
Problema cere, de fapt, determinarea numarului minim de intersectii intre
segmentele determinate de temperatura minima si maxima a unui reactiv.

Pentru a le determina procedez astfel:

   - ordonez intervalele de temperatura crescator dupa temperatura minima si
     descrescator dupa temperatura maxima
   - pun primul reactiv (deci cel cu intervalul cel mai mare) in primul frigider
   - pentru toate celelalte
         - caut un frigider in care a mai fost pus ceva si se poate pune si acesta
           (adica intersectia celor doua segmente sa fie nevida)
         - daca gasesc
              - ajustez temperatura din frigider ca sa poata cuprinde si acest recipient
         - altfel (daca nu gasesc)
              - "deschid" un frigider nou si pun aici reactivul
```

</div>

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

#define l first
#define r second

const int N = 8e3;

pair<int, int> p[N + 1];

int main() {
    ifstream cin("reactivi.in");
    ofstream cout("reactivi.out");

    int n, i;

    cin >> n;
    for (int i = 1; i <= n; i++) {
        cin >> p[i].l >> p[i].r;
    }
    sort(p + 1, p + n + 1, [](pair<int, int> a, pair<int, int> b) { return a.r < b.r; });

    int ans = 0;
    int last = -999999;
    for (int i = 1; i <= n; i++) {
        if (p[i].l > last) {
            last = p[i].r;
            ans++;
        }
    }
    cout << ans;
    return 0;
}
```
