---
id: OJI-2009-IX-placare
title: Soluția problemei placare (OJI 2009, clasa a IX-a)
problem_id: 783
authors: [rvisinescu]
prerequisites:
    - strings
    - simulating-solution
tags:
    - OJI
    - clasa IX
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2009/09/placare.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2009/09/placare.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2009/09/placare.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

const int N = 300, M = 300;

int a[N + 1][M + 1];

int main () {
    ifstream cin("placare.in");
    ofstream cout("placare.out");

    int n, m;

    cin >> n >> m;

    // clear till the end of this line
    string line;
    getline(cin, line);

    for (int i = 1; i <= n; i++) {
        string line;
        getline(cin, line);

        istringstream is(line);
        int val, j = 1;
        while (is >> val) {
            if (val == 0) {
                break;
            }

            while (j <= m && a[i][j]) {
                j++;
            }
            if (val == 1) {
                a[i][j] = 1;
            } else if (val < 0) {
                for (int k = 0; k <= abs(val) - 1; k++) {
                    a[i + k][j] = abs(val);
                }
            } else {
                for (int k = 0; k <= val - 1; k++) {
                    a[i][j + k] = val;
                }
            }
        }
    }

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            cout << a[i][j] << " ";
        }
        cout << "\n";
    }
    return 0;
}
```
