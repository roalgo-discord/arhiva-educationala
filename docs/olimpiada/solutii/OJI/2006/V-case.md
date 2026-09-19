---
id: OJI-2006-V-case
title: Soluția problemei case (OJI 2006, clasa a V-a)
problem_id: 749
authors: [cristurean]
prerequisites:
    - simulating-solution
tags:
    - OJI
    - clasa V
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2006/05/case.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2006/05/case.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2006/05/case.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;

int vals[4], b, f, c;

int main() {
    ifstream cin("case.in");
    ofstream cout("case.out");

    int n;
    cin >> n;

    for (int i = 1; i <= n; i++) {
        int x;
        cin >> x;

        c += x % 10;
        x /= 10;
        f += x % 10;
        x /= 10;
        b += x % 10;
        x /= 10;
        vals[x]++;
    }
    cout << vals[1] << '\n' << vals[2] << '\n' << vals[3] << '\n';
    cout << b << '\n' << f << '\n' << c << '\n';
    return 0;
}
```
