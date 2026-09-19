---
id: OJI-2007-VIII-dreptc
title: Soluția problemei dreptc (OJI 2007, clasa a VIII-a)
problem_id: 767
authors: [lica]
prerequisites:
    - simulating-solution
tags:
    - OJI
    - clasa VIII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2007/08/dreptc.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2007/08/dreptc.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2007/08/dreptc.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

using ll = long long;
#define pb push_back

const string FILE_NAME = "dreptc";
const int MAX_COORD = 1e3;
const int MAX_NORM = 2 * MAX_COORD;
const int MAX_N = 1e3;

int x[MAX_N + 5], y[MAX_N + 5];
int mat[MAX_NORM + 5][MAX_NORM + 5];

int main () {
#ifndef LOCAL
  ifstream cin(FILE_NAME + ".in");
  ofstream cout(FILE_NAME + ".out");
#endif

  ios_base::sync_with_stdio(false);
  cin.tie(nullptr);

  int n, numc, i, c, col, lin, ans;

  cin >> n >> numc;
  for (i = 1; i <= n; i++) {
    cin >> x[i] >> y[i] >> c;
    x[i] += MAX_COORD;
    y[i] += MAX_COORD;
    mat[x[i]][y[i]] = c;
  }

  ans = 0;
  for (i = 1; i <= n; i++) {
    // coltul stanga-sus -> (x[i], y[i])
    for (col = y[i] + 1; col <= MAX_NORM; col++) {
      if (mat[x[i]][y[i]] != mat[x[i]][col]) {
        continue;
      }
      // coltul dreapta-sus -> (x[i], col)
      for (lin = x[i] + 1; lin <= MAX_NORM; lin++) {
        if (mat[x[i]][y[i]] != mat[lin][col]) {
          continue;
        }
        // coltul drepta-jos -> (lin, col);
        // coltul stanga-jos -> (lin, y[i]);
        if (mat[x[i]][y[i]] != mat[lin][y[i]]) {
          continue;
        }

        ans++;
      }
    }
  }

  cout << ans << "\n";
  return 0;
}
```
