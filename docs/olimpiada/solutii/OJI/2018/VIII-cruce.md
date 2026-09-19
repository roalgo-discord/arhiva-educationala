---
id: OJI-2018-VIII-cruce
title: Soluția problemei cruce (OJI 2018, clasa a VIII-a)
problem_id: 898
authors: [nmot]
prerequisites:
    - partial-sums
tags:
    - OJI
    - clasa VIII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2018/08/cruce.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2018/08/cruce.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2018/08/cruce.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

using ll = long long;
#define int ll
#define pb push_back

const string FILE_NAME = "cruce";
const int MAX_N = 500;

int mat[MAX_N + 5][MAX_N + 5], sp[MAX_N + 5][MAX_N + 5];

int getSum (int lLin, int lCol, int rLin, int rCol) {
    return sp[rLin][rCol] - sp[rLin][lCol - 1] - sp[lLin - 1][rCol] + sp[lLin - 1][lCol - 1];
}

signed main () {
#ifndef LOCAL
    ifstream cin(FILE_NAME + ".in");
    ofstream cout(FILE_NAME + ".out");
#endif

    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, k, lin, col, sum, maxSum, maxLin, maxCol;

    cin >> n >> k;
    for (lin = 1; lin <= n; lin++) {
        for (col = 1; col <= n; col++) {
            cin >> mat[lin][col];
            sp[lin][col] = mat[lin][col] + sp[lin - 1][col] + sp[lin][col - 1] - sp[lin - 1][col - 1];
        }
    }

    maxSum = LLONG_MIN;
    for (lin = 1; lin <= n - k + 1; lin++) {
        for (col = 1; col <= n - k + 1; col++) {
            sum = getSum(lin, 1, lin + k - 1, n) + getSum(1, col, n, col + k - 1) - getSum(lin, col, lin + k - 1, col + k - 1);
            if (sum > maxSum) {
                maxSum = sum;
                maxLin = lin;
                maxCol = col;
            }
        }
    }

    cout << maxSum << " " << maxLin << " " << maxCol << "\n";
    return 0;
}
```
