---
id: OJI-2010-V-sir
title: Soluția problemei sir (OJI 2010, clasa a V-a)
problem_id: 795
authors: [cminca]
prerequisites:
    - basic-math
tags:
    - OJI
    - clasa V
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2010/05/sir.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2010/05/sir.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2010/05/sir.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;

int k, x, a, b;
int main() {
    ifstream cin("sir.in");
    ofstream cout("sir.out");

    cin >> k >> x >> a >> b;
    int sum = 0;

    for (int i = 1; i <= k; i++) {
        int smallest = 0;
        for (int j = 1; j <= i; j++)
            smallest = (smallest * 10 + j);
        int put = 1;
        while (put * 10 <= smallest)
            put *= 10;
        for (int j = 1; j <= i; j++) {
            sum = (sum + smallest % 10) % 10;
            int cif = smallest / put;
            smallest -= cif * put;
            smallest *= 10;
            smallest += cif;
        }
    }

    cout << sum << '\n';
    bool foundX = 0;
    int ans = 0;
    int cnt = 0;
    for (int i = 1; i <= 9; i++) {
        int smallest = 0;
        for (int j = 1; j <= i; j++)
            smallest = (smallest * 10 + j);
        int put = 1;
        while (put * 10 <= smallest)
            put *= 10;
        for (int j = 1; j <= i; j++) {
            if (foundX == 1 && ans == 0)
                ans = smallest;
            if (smallest == x)
                foundX = 1;

            sum = (sum + smallest % 10) % 10;
            int cif = smallest / put;
            if (cif == a && i < b)
                cnt++;
            smallest -= cif * put;
            smallest *= 10;
            smallest += cif;
        }
    }

    cout << ans << '\n';
    cout << cnt << '\n';
    return 0;
}
```
