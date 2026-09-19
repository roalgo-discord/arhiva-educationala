---
id: OJI-2004-V-cifre
title: Soluția problemei cifre (OJI 2004, clasa a V-a)
problem_id: 725
authors: [dapopescu]
prerequisites:
    - simulating-solution
tags:
    - OJI
    - clasa V
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2004/OJI%202004%20V.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2004/OJI%202004%20V.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2004/OJI%202004%20V.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <fstream>
#include <iostream>

using namespace std;

ifstream fin("cifre.in");
ofstream fout("cifre.out");

short cifrea[10];
short cifreab[10];
short nr[10];

int main() {
    int a, b, ok;

    fin >> a >> b;

    do {
        cifrea[a % 10] = 1;

        nr[a % 10]++;

        a /= 10;
    } while (a != 0);

    do {
        if (cifrea[b % 10] == 1)
            cifreab[b % 10] = 2;

        else
            cifreab[b % 10] = 1;

        nr[b % 10]++;

        b /= 10;
    } while (b != 0);

    ok = 1;

    for (int i = 0; i < 10; i++)
        if (cifreab[i] == 2) {
            fout << i << " ";

            ok = 0;
        }

    if (ok)
        fout << "-1";

    fout << endl;

    for (int i = 9; i >= 0; i--) {
        while (nr[i] > 0) {
            fout << i;

            nr[i]--;
        }
    }

    return 0;
}
```
