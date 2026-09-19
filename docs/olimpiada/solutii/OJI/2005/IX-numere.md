---
id: OJI-2005-IX-numere
title: Soluția problemei numere (OJI 2005, clasa a IX-a)
problem_id: 735
authors: [dapopescu]
prerequisites:
    - ad-hoc
tags:
    - OJI
    - clasa IX
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2005/09/numere.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2005/09/numere.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2005/09/numere.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <fstream>
#include <vector>
using namespace std;

ifstream fin("numere.in");
ofstream fout("numere.out");

int main() {
    int n;
    fin >> n;

    vector<int> fr(n * n + 1);
    for (int i = 1; i <= n * n; i++) {
        int x;
        fin >> x;
        fr[x] = 1;
    }

    int fi = 0, lst = 0;
    for (int i = 1; i <= n * n; i++) {
        if (fr[i] == 0) {
            if (fi == 0) {
                fi = i;
            }
            lst = i;
        }
    }
    fout << fi << " " << lst;
    return 0;
}
```
