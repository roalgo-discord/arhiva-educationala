---
id: OJI-2006-VI-piramida
title: Soluția problemei piramida (OJI 2006, clasa a VI-a)
problem_id: 751
authors: [iordaiche]
prerequisites:
    - simulating-solution
tags:
    - OJI
    - clasa VI
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2006/06/piramida.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2006/06/piramida.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2006/06/piramida.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: mariaaa (kilonova)
#include <fstream>
#include <iostream>
using namespace std;

long long a[80];
int main() {
    ifstream cin("piramida.in");
    ofstream cout("piramida.out");
    char c;
    long long k, i, j, nr;
    cin >> c;
    k = 0;
    while (c != '\n') {
        if (c >= 65 and c <= 90)
            c = c + 32;
        cout << c;
        a[k++] = (c - 'a') % 9 + 1;
        cin.get(c);
    }
    cout << "\n";
    for (i = 0; i < k; i++) {
        for (j = 0; j < i; j++) {
            cout << " ";
        }
        for (j = 0; j < k - i; j++) {
            cout << a[j] << " ";
        }
        cout << "\n";
        for (j = 0; j < k - i - 1; j++) {
            nr = a[j] + a[j + 1];
            a[j] = nr % 10 + nr / 10;
        }
    }
    return 0;
}
```
