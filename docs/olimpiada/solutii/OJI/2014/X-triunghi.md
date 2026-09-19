---
id: OJI-2014-X-triunghi
title: Soluția problemei Triunghi (OJI 2014, clasa a X-a)
problem_id: 851
authors: [zoltan]
prerequisites:
    - ad-hoc
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2014/10/triunghi.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2014/10/triunghi.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2014/10/triunghi.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

using ll = long long;
#define pb push_back
#define int ll

const string FILE_NAME = "triunghi";
const int MAX_N = 46, MAX_K = 46, MAX_LEN = 2e9;

int v[MAX_N + 5], sol[MAX_K + 5];

signed main () {
#ifndef LOCAL
    ifstream cin(FILE_NAME + ".in");
    ofstream cout(FILE_NAME + ".out");
#endif

    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int cer, n, k, i, vIdx, lenLeft, solIdx;

    cin >> cer >> n >> k;
    for (i = 1; i <= n; i++) {
        cin >> v[i];
    }
    sort(v + 1, v + n + 1);

    if (cer == 1) {
        /* numere fibonacci de la v[1] */
        sol[1] = sol[2] = v[1];
        cout << sol[1] << " " << sol[2] << " ";

        for (i = 3; i <= k; i++) {
            sol[i] = sol[i - 2] + sol[i - 1];
            cout << sol[i] << " ";
        }
    } else {
        for (i = 1; i <= n; i++) {
            cout << v[i] << " ";
        }

        /* vIdx -> la ce element in v[] suntem */
        if (v[1] == v[2]) { /* daca pot porni cu fib. din v */
            sol[1] = sol[2] = v[1];
            vIdx = 3;
        } else { /* altfel, pornesc cu un fib. normal */
            sol[1] = sol[2] = 1;
            if (v[1] == 1) {
                vIdx = 2;
            } else {
                vIdx = 1;
            }
        }

        /* facem fib. */
        i = 3;
        while (sol[i - 2] + sol[i - 1] <= MAX_LEN) {
            if (vIdx <= n) {                                 /* trebuie sa imi bag si valorile din v :( */
                if (sol[i - 2] + 2 * sol[i - 1] > v[vIdx]) { /* daca nu formeaza triunghi */
                    sol[i] = v[vIdx];
                    vIdx++;
                    i++;
                    continue;
                }
            }
            sol[i] = sol[i - 2] + sol[i - 1];
            i++;
        }

        /* afisez */

        lenLeft = k - n;
        vIdx = solIdx = 1;
        while (lenLeft) {
            /* sarim un element */
            if (v[vIdx] == sol[solIdx++]) {
                vIdx++;
                continue;
            }
            cout << sol[solIdx - 1] << " ";
            lenLeft--;
        }
    }
    return 0;
}
```
