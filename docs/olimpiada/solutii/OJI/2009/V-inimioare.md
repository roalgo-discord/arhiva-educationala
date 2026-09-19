---
id: OJI-2009-V-inimioare
title: Soluția problemei inimioare (OJI 2009, clasa a V-a)
problem_id: 785
authors: [iordaiche]
prerequisites:
    - simulating-solution
    - frequency-arrays
tags:
    - OJI
    - clasa V
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2009/05/inimioare.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2009/05/inimioare.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2009/05/inimioare.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;

int frq[102], frq2[102];
int main() {
    ifstream cin("inimioare.in");
    ofstream cout("inimioare.out");

    int n;
    cin >> n;

    for (int i = 1; i <= n; i++) {
        int a, b, c, d;
        cin >> a >> b >> c >> d;

        frq[a * 10 + b] = 1;
        frq[a * 10 + d] = 1;
        frq[b * 10 + a] = 1;
        frq[b * 10 + c] = 1;
        frq[c * 10 + b] = 1;
        frq[c * 10 + d] = 1;
        frq[d * 10 + c] = 1;
        frq[d * 10 + a] = 1;
    }

    for (int i = 1; i <= n; i++) {
        int a, b, c, d;
        cin >> a >> b >> c >> d;

        frq2[a * 10 + b] = 1;
        frq2[a * 10 + d] = 1;
        frq2[b * 10 + a] = 1;
        frq2[b * 10 + c] = 1;
        frq2[c * 10 + b] = 1;
        frq2[c * 10 + d] = 1;
        frq2[d * 10 + c] = 1;
        frq2[d * 10 + a] = 1;
    }

    int maxi = 0;

    for (int i = 0; i <= 99; i++)
        for (int j = 0; j <= 99; j++) {
            if (frq[i] && frq2[j])
                maxi = max(maxi, i * 100 + j);
            if (frq2[i] && frq[j])
                maxi = max(maxi, i * 100 + j);
        }

    cout << maxi;
    return 0;
}
```
