---
id: OJI-2004-VIII-ron
title: Soluția problemei ron (OJI 2004, clasa a VIII-a)
problem_id: 732
authors: [pcopacel]
prerequisites:
    - divisibility
    - basic-math
tags:
    - OJI
    - clasa VIII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2004/OJI%202004%20VIII.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2004/OJI%202004%20VIII.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2004/OJI%202004%20VIII.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: adimiclaus15
#include <bits/stdc++.h>
using namespace std;

int main() {
    ifstream cin("ron.in");
    ofstream cout("ron.out");
    int k, x1, x2;
    cin >> k >> x1 >> x2;
    int x = 0;
    k++;
    int p = 1;
    while (p < k) {
        x++;
        p = p * 3;
    }
    if (x1 == x2) {
        cout << "O";
    } else {
        if (x1 == x) {
            cout << "L";
        } else {
            if (x2 == x) {
                cout << "S";
            } else {
                cout << "O";
            }
        }
    }
}
```
