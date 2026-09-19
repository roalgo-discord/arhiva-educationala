---
id: OJI-2011-V-magic
title: Soluția problemei magic (OJI 2011, clasa a V-a)
problem_id: 807
authors: [sgalatan]
prerequisites:
    - simulating-solution
tags:
    - OJI
    - clasa V
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2011/05/magic.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2011/05/magic.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2011/05/magic.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;

bool frq[12];

int main() {
    ifstream cin("magic.in");
    ofstream cout("magic.out");

    int n;
    cin >> n;

    for (int i = 1; i <= n; i++) {
        char c;
        cin >> c;
        if (c >= '0' && c <= '9')
            frq[c - '0'] = 1;
        else {
            if (c >= 'a')
                c -= 32;
            cout << c;
        }
    }
    cout << '\n';

    if (frq[0])
        for (int i = 1; i <= 9; i++)
            if (frq[i]) {
                cout << i;
                frq[i] = 0;
                break;
            }

    for (int i = 0; i <= 9; i++)
        if (frq[i])
            cout << i;
    return 0;
}
```
