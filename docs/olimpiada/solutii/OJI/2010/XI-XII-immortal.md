---
id: OJI-2010-XI-XII-immortal
title: Soluția problemei immortal (OJI 2010, clasele XI-XII)
problem_id: 41
authors: [marinel]
prerequisites:
    - backtracking
tags:
    - OJI
    - clasa XI-XII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2010/11-12/immortal.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2010/11-12/immortal.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2010/11-12/immortal.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

const int NEMURITOR = 1;
const int DIR = 4, MAX_N = 20, MAX_M = 20;

int dlin[DIR] = {0, 1, 0, -1};
int dcol[DIR] = {1, 0, -1, 0};
int zona[MAX_N + 5][MAX_M + 5];

pair<int, int> startPos[MAX_N * MAX_M + 5], endPos[MAX_N * MAX_M + 5];

ifstream fin("immortal.in");
ofstream fout("immortal.out");

void backtracking (int nod, int I, int n, int m) {
    int lin, col, dir, jumpLin, jumpCol, fightLin, fightCol, i;

    if (nod == I - 1) {
        // afisare
        for (i = 0; i < I - 1; i++) {
            fout << startPos[i].first << " " << startPos[i].second << " ";
            fout << endPos[i].first << " " << endPos[i].second << "\n";
        }
        // return;
        exit(0); // have to terminate program
    } else {
        for (lin = 1; lin <= n; lin++) {
            for (col = 1; col <= m; col++) {
                if (zona[lin][col] == NEMURITOR) {
                    for (dir = 0; dir < DIR; dir++) {
                        jumpLin = lin + 2 * dlin[dir];
                        jumpCol = col + 2 * dcol[dir];

                        fightLin = lin + dlin[dir];
                        fightCol = col + dcol[dir];

                        if (1 <= jumpLin && jumpLin <= n && 1 <= jumpCol && jumpCol <= m && zona[fightLin][fightCol] == NEMURITOR && zona[jumpLin][jumpCol] != NEMURITOR) {
                            startPos[nod] = {lin, col};
                            zona[lin][col] = zona[fightLin][fightCol] = 0; 

                            endPos[nod] = {jumpLin, jumpCol};
                            zona[jumpLin][jumpCol] = NEMURITOR;

                            backtracking(nod + 1, I, n, m);

                            // revert changes
                            zona[lin][col] = zona[fightLin][fightCol] = NEMURITOR;
                            zona[jumpLin][jumpCol] = 0;
                        }
                    }
                }
            }
        }
    }
}

int main() {
    int n, m, I, i, x, y;

    fin >> n >> m >> I;

    for (i = 0; i < I; i++) {
        fin >> x >> y;
        zona[x][y] = NEMURITOR;
    }

    backtracking(0, I, n, m);
    return 0;   
}
```
