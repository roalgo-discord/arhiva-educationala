---
id: OJI-2003-X-taxe
title: Soluția problemei Taxe (OJI 2003, clasa a X-a)
problem_id: 722
authors: []
prerequisites:
    - lee
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2003/10/rezolvare%20taxe.txt).

<div class="editorial-text" markdown>

```text
se aplica un algoritm de tip Lee care expandeaza o coada ce contine initial doar starea (1,1,S) cu toate starile in care se poate ajunge dintr-o pozitie data. Se adauga starile noi sau se actualizeaza starile in care se poate ajunge cu mai multi bani in buzunar.
```

</div>

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>

using namespace std;

ifstream in("taxe.in");
ofstream out("taxe.out");

int a[101][101];
int b[101][101];

const int dx[] = {-1, 1, 0, 0};
const int dy[] = {0, 0, -1, 1};

int main() {
    int n, S;
    in >> S >> n;

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            in >> a[i][j];
            b[i][j] = 2e9;
        }
    }

    queue<pair<int, int>> q;

    q.push({1, 1});
    b[1][1] = a[1][1];

    while (!q.empty()) {
        int x = q.front().first, y = q.front().second;
        q.pop();

        for (int k = 0; k < 4; k++) {
            int i = x + dx[k], j = y + dy[k];
            if (i > 0 && i <= n && j > 0 && j <= n && (b[i][j] == 2e9 || b[x][y] + a[i][j] < b[i][j])) {
                q.push({i, j});
                b[i][j] = b[x][y] + a[i][j];
            }
        }
    }

    b[n][n] = min(S + 1, b[n][n]);
    out << S - b[n][n];

    return 0;
}
```
