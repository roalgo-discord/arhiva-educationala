---
id: OJI-2005-VII-tabel
title: Soluția problemei tabel (OJI 2005, clasa a VII-a)
problem_id: 742
authors: [dpopa]
prerequisites:
    - simulating-solution
tags:
    - OJI
    - clasa VII
---

Daca vreti sa ne ajutati cu acest articol, ne puteti gasi pe [github](https://github.com/roalgo-discord/arhiva-educationala) sau pe [serverul nostru de discord](https://discord.gg/vdDRSmg3fC)

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>

using namespace std;

const int MAXN = 50;
const int MAXM = 50;

int mat[MAXM][MAXM];

int main() {
    ifstream fin("tabel.in");
    ofstream fout("tabel.out");

    int n, m, p, i, l, c, v, lin, col, sum, cnt, rLin, rCol;
    bool found;

    fin >> n >> m >> p;
    for (i = 0; i < p; i++) {
        fin >> l >> c >> v;
        l--, c--;

        mat[l][c] = v;
    }
    found = true;
    do {
        found = false;
        for (lin = 0; lin < n; lin++) {
            sum = cnt = rLin = rCol = 0;
            for (col = 0; col < m; col++) {
                if (mat[lin][col] == 0) {
                    cnt++;
                    rLin = lin;
                    rCol = col;
                    found = true;
                }
                sum += mat[lin][col];
            }
            if (cnt == 1) {
                if (rCol != m - 1) {
                    mat[rLin][rCol] = mat[rLin][m - 1] - (sum - mat[rLin][m - 1]);
                } else {
                    mat[rLin][rCol] = sum;
                }
            }
        }
        for (col = 0; col < m; col++) {
            sum = cnt = rLin = rCol = 0;
            for (lin = 0; lin < n; lin++) {
                if (mat[lin][col] == 0) {
                    cnt++;
                    rLin = lin;
                    rCol = col;
                    found = true;
                }
                sum += mat[lin][col];
            }
            if (cnt == 1) {
                if (rLin != n - 1) {
                    mat[rLin][rCol] = mat[n - 1][rCol] - (sum - mat[n - 1][rCol]);
                } else {
                    mat[rLin][rCol] = sum;
                }
            }
        }
    } while (found);

    for (lin = 0; lin < n; lin++) {
        for (col = 0; col < m; col++) {
            fout << mat[lin][col] << " ";
        }
        fout << "\n";
    }
    return 0;
}
```
