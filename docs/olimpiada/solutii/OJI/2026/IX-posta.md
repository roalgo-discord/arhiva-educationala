---
id: OJI-2026-IX-posta
title: Soluția problemei posta (OJI 2026, clasa a IX-a)
problem_id: 4223
authors: []
prerequisites:
    - divisibility
tags:
    - OJI
    - clasa IX
---

Articolul va fi disponibil curând în arhivă.

Până atunci, puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2026/09.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2026/09.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2026/09.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: brianabcr (kilonova)
#include <bits/stdc++.h>
using namespace std;

ifstream fin("posta.in");
ofstream fout("posta.out");

int main() {
    long long n, gcd;
    fin >> n >> gcd;
    gcd--;
    for (int i = 2; i <= n; i++) {
        long long x;
        fin >> x;
        gcd = __gcd(gcd, x - 1);
    }
    fout << gcd;
    return 0;
}
```
