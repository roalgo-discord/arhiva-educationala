---
id: OJI-2009-V-divizor
title: Soluția problemei divizor (OJI 2009, clasa a V-a)
problem_id: 784
authors: [iordaiche]
prerequisites:
    - simulating-solution
    - divisibility
tags:
    - OJI
    - clasa V
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2009/05/numar.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2009/05/numar.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2009/05/numar.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ifstream cin("divizor.in");
    ofstream cout("divizor.out");

    int n;
    cin >> n;

    int put = 1;
    while (put * 10 <= n)
        put *= 10;

    int n2 = n;
    int nc = 0;
    while (n2) {
        nc++;
        n2 /= 10;
    }

    int maxdiv = 0;
    int maxi = 0;
    for (int i = 1; i <= nc; i++) {
        int divi = 0;
        for (int j = 1; j * j <= n; j++) {
            if (n % j == 0) {
                divi++;
                if (j * j != n)
                    divi++;
                if (j != 1)
                    maxi = max(maxi, n / j);
            }
        }
        if (divi > maxdiv)
            maxdiv = divi;
        int cif = n / put;
        n -= put * cif;
        n *= 10;
        n += cif;
    }

    for (int i = 1; i <= nc; i++) {
        int divi = 0;
        for (int j = 1; j * j <= n; j++) {
            if (n % j == 0) {
                divi++;
                if (j * j != n)
                    divi++;
            }
        }
        if (divi == maxdiv)
            cout << n << " ";
        int cif = n / put;
        n -= put * cif;
        n *= 10;
        n += cif;
    }

    cout << '\n';
    cout << maxi << '\n';
    return 0;
}
```
