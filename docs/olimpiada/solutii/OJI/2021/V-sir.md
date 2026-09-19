---
id: OJI-2021-V-sir
title: Soluția problemei sir (OJI 2021, clasa a V-a)
problem_id: 931
authors: [nicoli]
prerequisites:
    - ad-hoc
tags:
    - OJI
    - clasa V
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2021/05.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2021/05.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2021/05.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
/*

Pentru a rezolva problema, avem nevoie sa stim pozitiile unde se afla valorile maxime,
precum si sumele intre doua aparitii consecutive ale maximului.

Pentru a actualiza sumele intre aparitiile maximului, trebuie sa tinem doua sume reprezentand sumele intermediare

*/
#include <bits/stdc++.h>
using namespace std;

int c, n, poz, valmax, pozlst, sm, sm2;
int main() {
    ifstream cin("sir.in");
    ofstream cout("sir.out");
    cin >> c >> n;
    for (int i = 1; i <= n; i++) {
        int nr;
        cin >> nr;
        if (nr > valmax) {
            if (c == 2)
                cout << i << " ";
            valmax = nr;
            poz = i;
            pozlst = i;
            sm = 0;
            sm2 = nr;
        } 
        else if (nr == valmax) {
            pozlst = i;
            sm2 += nr;
            sm += sm2;
            sm2 = 0;
        } 
        else
            sm2 += nr;
    }
    if (c == 1)
        cout << pozlst << " ";
    else if (c == 3) {
        if (pozlst != poz)
            cout << 1LL * (pozlst - poz + 1) * valmax - sm << " ";
        else
            cout << 0 << " ";
    }
    return 0;
}
```
