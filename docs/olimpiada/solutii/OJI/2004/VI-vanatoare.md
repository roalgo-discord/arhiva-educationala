---
id: OJI-2004-VI-vanatoare
title: Soluția problemei vanatoare (OJI 2004, clasa a VI-a)
problem_id: 728
authors: [rpintea]
prerequisites:
    - basic-math
tags:
    - OJI
    - clasa VI
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2004/OJI%202004%20VI.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2004/OJI%202004%20VI.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2004/OJI%202004%20VI.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: trraian (kilonova)
#include <fstream>

using namespace std;

ifstream cin("vanatoare.in");
ofstream cout("vanatoare.out");

int main() {
    int sa, sn, p = 0, c = 1, u, r = 1, a, n;
    bool st = true;
    cin >> sa >> sn;

    if (sa == 0) {
        cout << 0 << '\n' << 0 << '\n' << sn;
        return 0;
    }

    if (sa == 1) {
        cout << 1 << '\n' << 0 << '\n' << sn;
        return 0;
    }

    while (st) {
        u = p + c;
        a = u / 2 + u % 2;
        n = u / 2;

        if (sa < a) {
            cout << r - 1 << '\n' << sa << '\n' << sn;
            st = false;
        } else if (sn < n) {
            cout << r - 1 << '\n' << sa << '\n' << sn;
            st = false;
        } else {
            sa -= a;
            sn -= n;
            r++;
        }

        p = c;
        c = u;
    }

    return 0;
}
```
