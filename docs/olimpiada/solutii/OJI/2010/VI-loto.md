---
id: OJI-2010-VI-loto
title: Soluția problemei loto (OJI 2010, clasa a VI-a)
problem_id: 797
authors: [lica]
prerequisites:
    - maxime-minime
    - frequency-arrays
    - simulating-solution
tags:
    - OJI
    - clasa VI
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2010/06/loto.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2010/06/loto.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2010/06/loto.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <algorithm>
#include <fstream>
using namespace std;
ifstream f("loto.in");
ofstream g("loto.out");
long int i, j, N, mx, mn, maxim, minim, x;
int a[10001], b[7];
int main() {
    f >> N;
    for (int i = 0; i <= 10000; i++) 
        a[i] = 0;
    for (int i = 1; i <= N; i++) {
        f >> x;
        a[x] = 1;
    }
    maxim = 0;
    minim = 10000;
    mx = 0;
    mn = 0;
    for (int i = 1; i <= 6; i++) {
        f >> b[i];
        a[b[i]] = 0;
        if (b[i] < minim) {
            minim = b[i];
            mn = i;
        }
        if (b[i] > maxim) {
            maxim = b[i];
            mx = i;
        }
    }
    int i = minim;
    int j = minim;
    do {
        if (i < 10000) i++;
        if (j > 1) j--;
    } while (!(a[i] || a[j]));
    if (a[i])
        b[mn] = i;
    else
        b[mn] = j;
    a[b[mn]] = 0;
    i = maxim;
    j = maxim;
    do {
        if (i < 10000) i++;
        if (j > 1) j--;
    } while (!(a[i] || a[j]));
    if (a[i])
        b[mx] = i;
    else
        b[mx] = j;
    sort(b + 1, b + 7);

    for (i = 1; i <= 5; i++) 
        g << b[i] << ' ';
    g << b[6] << '\n';
    return 0;
}
```
