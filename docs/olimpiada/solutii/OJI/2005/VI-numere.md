---
id: OJI-2005-VI-numere
title: Soluția problemei numere (OJI 2005, clasa a VI-a)
problem_id: 739
authors: [timplaru]
prerequisites:
    - basic-math
tags:
    - OJI
    - clasa VI
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2005/06/numere.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2005/06/numere.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2005/06/numere.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: Cosminane (kilonova)
#include <bits/stdc++.h>
using namespace std;

ifstream fin("numere.in");
ofstream fout("numere.out");

int main() {
    int a, b, p2, s;
    fin >> a >> b;
    p2 = 1;
    while (p2 * 2 <= a) {
        p2 = p2 * 2;
    }
    while (p2 > 0 && a / p2 == b % 2) {
        a = a % p2;
        p2 = p2 / 2;
        b = b / 2;
    }
    s = a + b;
    fout << s;
    return 0;
}
```
