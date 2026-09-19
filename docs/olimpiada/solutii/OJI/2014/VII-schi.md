---
id: OJI-2014-VII-schi
title: Soluția problemei schi (OJI 2014, clasa a VII-a)
problem_id: 847
authors: [nicoli]
prerequisites:
    - binary-search
tags:
    - OJI
    - clasa VII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2014/07/schi.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2014/07/schi.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2014/07/schi.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: iustinola16 (kilonova)
#include <iostream>
#include <fstream>
#include <map>

using namespace std;
ifstream fin("schi.in");
ofstream fout("schi.out");

const int NMAX = 1e5 + 5;

int ans[NMAX];
int main()
{
    int n;
    fin >> n;

    int maxim = -1;
    for (int i = 1; i <= n; i++) {
        int x;
        fin >> x;

        if (x > maxim) {
            maxim = x;
        }

        ans[i] = maxim;
    }

    int q;
    fin >> q;

    while (q--) {
        int x;
        fin >> x;

        int l = 1, r = n, ans1 = 0;

        while (l <= r) {
            int mid = (l + r) / 2;

            if (ans[mid] == x) {
                ans1 = mid;
                r = mid - 1;
            }
            else if (ans[mid] < x) l = mid + 1;
            else r = mid - 1;
        }

        int ans2 = -1;
        l = 1, r = n;

        while (l <= r) {
            int mid = (l + r) / 2;

            if (ans[mid] == x) {
                ans2 = mid;
                l = mid + 1;
            }
            else if (ans[mid] < x) l = mid + 1;
            else r = mid - 1;
        }

        cout << ans1 << ' ' << ans2;

        fout << ans2 - ans1 + 1 << ' ';
    }
    return 0;
}
```
