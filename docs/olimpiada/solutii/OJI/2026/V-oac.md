---
id: OJI-2026-V-oac
title: Soluția problemei oac (OJI 2026, clasa a V-a)
problem_id: 4216
authors: []
prerequisites:
    - divisibility
tags:
    - OJI
    - clasa V
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2026/05.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2026/05.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2026/05.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <algorithm>
#include <fstream>

using namespace std;

long long gcd(long long a, long long b) {
    while (b > 0) {
        long long r = a % b;
        a = b;
        b = r;
    }
    return a;
}

long long lcm(long long a, long long b) { return a / gcd(a, b) * b; }

int main() {
    ifstream fin("oac.in");
    ofstream fout("oac.out");

    int C;
    long long K1, K2, K3, T;

    fin >> C;
    fin >> K1 >> K2 >> K3 >> T;

    if (C == 1) {
        long long a = T / K1;
        long long b = T / K2;
        long long c = T / K3;
        fout << max({a, b, c});
    } 
    else if (C == 2) {
        long long l1 = lcm(K1, K2);
        long long l2 = lcm(K1, K3);
        long long l3 = lcm(K2, K3);
        fout << min({l1, l2, l3});
    } 
    else if (C == 3) {
        long long l12 = lcm(K1, K2);
        long long l13 = lcm(K1, K3);
        long long l23 = lcm(K2, K3);

        long long l123 = lcm(l12, K3);

        long long count = T / l12 + T / l13 + T / l23 - 3 * (T / l123);

        fout << count;
    }

    return 0;
}
```
