---
id: OJI-2011-V-numerus
title: Soluția problemei numerus (OJI 2011, clasa a V-a)
problem_id: 808
authors: [aintuneric]
prerequisites:
    - basic-math
    - divisibility
tags:
    - OJI
    - clasa V
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2011/05/numerus.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2011/05/numerus.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2011/05/numerus.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ifstream cin("numerus.in");
    ofstream cout("numerus.out");

    int k, n;
    cin >> k >> n;

    if (k % 2 == 0) {
        cout << k * 5 << " " << k * 5 << " " << k * 5 - 1 << " " << k * 5 - 2 << " " << k * 5 - 3 << " " << k * 5 - 4 << '\n';
    } else {
        cout << k * 5 - 4 << " " << k * 5 - 3 << " " << k * 5 - 2 << " " << k * 5 - 1 << " " << k * 5 << " " << k * 5 << '\n';
    }
    cout << n / 5 + (n % 5 > 0) << '\n';

    int lin = n / 5 + (n % 5 > 0);
    if (n % 5 == 0) {
        if (lin % 2 == 0)
            cout << "A B";
        else
            cout << "E F";
    } else {
        if (lin % 2 == 0) {
            char lit = 'F' - (n % 5 - 1);
            cout << lit;
        } else {
            char lit = 'A' + n % 5 - 1;
            cout << lit;
        }
    }
    return 0;
}
```
