---
id: OJI-2006-V-vraji
title: Soluția problemei vraji (OJI 2006, clasa a V-a)
problem_id: 750
authors: [iordaiche]
prerequisites:
    - divisibility
    - basic-math
tags:
    - OJI
    - clasa V
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2006/05/vraji.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2006/05/vraji.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2006/05/vraji.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;

int maxi, divi;

int cmmdc(int a, int b) {
    int c;
    while (b) {
        c = a % b;
        a = b;
        b = c;
    }
    return a;
}

int main() {
    ifstream cin("vraji.in");
    ofstream cout("vraji.out");

    int n;
    cin >> n;

    for (int i = 1; i <= n; i++) {
        int a, b;
        cin >> a >> b;
        maxi = max(maxi, a * b);
        if (i == 1)
            divi = a * b;
        else
            divi = cmmdc(divi, a * b);
    }
    cout << maxi << '\n' << divi << '\n';
    return 0;
}
```
