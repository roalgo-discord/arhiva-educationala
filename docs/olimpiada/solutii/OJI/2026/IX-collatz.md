---
id: OJI-2026-IX-collatz
title: Soluția problemei collatz (OJI 2026, clasa a IX-a)
problem_id: 4225
authors: []
prerequisites:
    - placeholder
tags:
    - OJI
    - clasa IX
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2026/09.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2026/09.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2026/09.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ValiAntonie (kilonova)
#include <bits/stdc++.h>
using namespace std;

ifstream fin("collatz.in");
ofstream fout("collatz.out");

long long n, a, b;

long long calc(long long a, long long b) {
    long long nrpar = (b - a + (a % 2 == 0) + (b % 2 == 0)) / 2;
    long long nrimpar = (b - a + (a % 2 != 0) + (b % 2 != 0) - (a == 1)) / 2;
    if (a == 1 && b == 1)
        return 0;
    else if (a == b) {
        if (a % 2 == 0)
            return 1 + calc(a / 2, b / 2);
        else
            return 3 + calc((a + 1) / 2, (b + 1) / 2);
    } else {
        if (b % 2 == 0)
            return 2 * calc(max(a / 2, 1LL), max((b + 1) / 2, 1LL)) + 1 * nrpar + 3 * nrimpar;
        else
            return 2 * calc(max(a / 2, 1LL), max(b / 2, 1LL)) + 1 * nrpar + 3 * (nrimpar - 1) + calc(b, b);
    }
}

int main() {
    fin >> n;
    for (int i = 1; i <= n; i++) {
        fin >> a >> b;
        fout << calc(1, b) - calc(1, a - 1) << "\n";
    }
    return 0;
}
```
