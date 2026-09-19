---
id: OJI-2007-V-telecabina
title: Soluția problemei telecabina (OJI 2007, clasa a V-a)
problem_id: 760
authors: [sgroza]
prerequisites:
    - simulating-solution
tags:
    - OJI
    - clasa V
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2007/05/telecabina.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2007/05/telecabina.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2007/05/telecabina.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;

int v[101];

int main() {
    ifstream cin("telecabina.in");
    ofstream cout("telecabina.out");

    int n;
    cin >> n;

    int p = 0;
    for (int i = 1; i <= n; i++) {
        int x;
        cin >> v[i] >> x;
        p += x;
    }

    int consum = 0;
    for (int i = 2; i <= n; i++)
        if (v[i] > v[i - 1])
            consum += 3 * (v[i] - v[i - 1]);
        else
            consum += (v[i - 1] - v[i]);

    int speciale = 0;
    for (int i = 2; i < n; i++)
        if (v[i - 1] < v[i] && v[i] > v[i + 1])
            speciale++;
        else if (v[i - 1] > v[i] && v[i] < v[i + 1])
            speciale++;

    cout << p << '\n' << consum << '\n' << speciale << '\n';
    return 0;
}
```
