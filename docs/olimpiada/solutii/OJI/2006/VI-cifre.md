---
id: OJI-2006-VI-cifre
title: Soluția problemei cifre (OJI 2006, clasa a VI-a)
problem_id: 752
authors: [dpopa]
prerequisites:
    - basic-math
tags:
    - OJI
    - clasa VI
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2006/06/cifre.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2006/06/cifre.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2006/06/cifre.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <fstream>
using namespace std;

int main() {
    ifstream cin("cifre.in");
    ofstream cout("cifre.out");

    int n, c;
    cin >> n >> c;

    long long ans = 0;
    long long p = 10;
    int n2 = n;
    while (n >= c) {
        ans += (n2 / p) * (p / 10); // grupele complete

        long long rest = n2 % p;

        if (rest < c * (p / 10));
        else if (rest >= (c + 1) * (p / 10))
            ans += p / 10;
        else
            ans += rest - c * (p / 10) + 1;

        n /= 10;
        p *= 10;
    }

    cout << ans;
    return 0;
}
```
