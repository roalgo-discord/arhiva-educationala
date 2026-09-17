---
id: OJI-2026-IX-cibernetica
title: Soluția problemei cibernetica (OJI 2026, clasa a IX-a)
problem_id: 4224
authors: []
prerequisites:
    - frequency-arrays
tags:
    - OJI
    - clasa IX
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2026/09.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2026/09.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2026/09.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: maiereanmircea (kilonova)
#include <assert.h>
#include <fstream>

using namespace std;

ifstream fin("cibernetica.in");
ofstream fout("cibernetica.out");

const int NMAX = 1e6 + 1;
int fr[NMAX], a[NMAX];

int main() {
    int c, n, k;
    fin >> c >> n >> k;

    for (int i = 1; i <= n; ++i) {
        fin >> a[i];
    }

    unsigned long long cnt = 0;

    int j = 1;
    // periculoase
    if (c == 1) {
        for (int i = 1; i <= n; ++i) {
            // cat timp o secventa apare de cel k - 2 ori, avansez cu j
            // cand dau de o pozitie j, al carui element are freceventa k - 1, ma opresc
            // asa, dupa actualizarea frecventei, va aparea de k ori
            while (j <= n && fr[a[j]] + 1 < k) {
                ++fr[a[j]];
                ++j;
            }
            // nu mai are rost sa continui daca ies inafara vectorului
            if (j > n)
                break;
            // toate subsecventele care incep pe pozitia i, si au pozitia de final dupa j (inclusiv j), sunt valide
            // avem in total n - j + 1 secvente
            cnt += n - j + 1;
            // a[i] nu mai este de folos, scad din frecventa lui
            --fr[a[i]];
        }
    }

    // sanatoase
    else {
        int cntDistinct = 0;
        for (int i = 1; i <= n; ++i) {
            // cat timp am maxim k - 1 elemente distincte
            while (j <= n && cntDistinct < k) {
                ++fr[a[j]];
                // frecventa 1 indica descoperirea unui element nou, incrementez contorul numerelor distincte
                if (fr[a[j]] == 1)
                    ++cntDistinct;
                ++j;
            }
            if (cntDistinct >= k)
                // toate subsecventele care incep pe pozitia i, si au pozitia de final dupa j - 1 (inclusiv j - 1), sunt valide
                // avem in total n - (j - 1) + 1 = n - j + 2 secvente bune
                cnt += n - j + 2;
            // a[i] nu mai este de folos, scad frecventa lui, si actualizez cntDistinct corespunzator
            --fr[a[i]];
            if (fr[a[i]] == 0)
                --cntDistinct;
        }
    }
    fout << cnt << '\n';
    return 0;
}
```
