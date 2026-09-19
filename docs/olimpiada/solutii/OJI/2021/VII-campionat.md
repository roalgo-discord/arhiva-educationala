---
id: OJI-2021-VII-campionat
title: Soluția problemei campionat (OJI 2021, clasa a VII-a)
problem_id: 934
authors: [nicoli]
prerequisites:
    - simulating-solution
tags:
    - OJI
    - clasa VII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2021/07.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2021/07.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2021/07.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <fstream>
#define int long long

using namespace std;

ifstream cin("campionat.in");
ofstream cout("campionat.out");

int pct[1003];

bool meciuri[1003][1003];
int mecjuc[1003];

signed main() {
    int t, n, d, e1, e2;
    cin >> t;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        cin >> pct[i];
    }
    cin >> d;
    for (int i = 1; i <= d; i++) {
        cin >> e1 >> e2;
        if (meciuri[e2][e1] == 0) {
            meciuri[e1][e2] = meciuri[e2][e1] = true;
            mecjuc[e1]++;
            mecjuc[e2]++;
        }
    }
    if (t == 2) {
        bool ye = false;
        for (int i = 1; i <= n; i++) {
            int scormax = mecjuc[i] * 3 + pct[i], scor = 0;
            bool ok = true;
            for (int j = 1; j <= n; j++) {
                if (j != i) {
                    scor = mecjuc[j] * 3 + pct[j];
                    if (meciuri[i][j] == true) {
                        scor -= 3;
                    }
                }
                if (scor >= scormax)
                    ok = false;
            }
            if (ok == true) {
                cout << i << " ";
                ye = true;
            }
        }
        if (ye == false) {
            cout << "0";
        }
    }
    if (t == 1) {
        int mx = -1;
        for (int i = 1; i <= n; i++) {
            mx = max(mx, mecjuc[i] + pct[i]);
        }
        for (int i = 1; i <= n; i++) {
            if (mecjuc[i] + pct[i] == mx)
                cout << i << " ";
        }
    }

    return 0;
}
```
