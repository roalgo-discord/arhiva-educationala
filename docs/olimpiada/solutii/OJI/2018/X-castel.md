---
id: OJI-2018-X-castel
title: Soluția problemei Castel (OJI 2018, clasa a X-a)
problem_id: 900
authors: [burta]
prerequisites:
    - lee
    - bitwise-ops
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2018/10/castel.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2018/10/castel.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2018/10/castel.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100, DIR = 4;

int dlin[DIR] = {0, 1, 0, -1};
int dcol[DIR] = {-1, 0, 1, 0};
int bitConst[DIR] = {1, 2, 4, 8};
int mat[MAXN + 5][MAXN + 5], wasVisited[MAXN + 5][MAXN + 5];

int c, n, lin, col, nrRooms, aria, maxAria, maxLin, maxCol, coltStLin, coltStCol, coltDrLin, coltDrCol;
queue< pair<int, int> > q;

void lee(int lin, int col) {
    int dir, newLin, newCol;

    wasVisited[lin][col] = 1;
    ++aria;

    maxLin = max(maxLin, lin);
    maxCol = max(maxCol, col);

    for(dir = 0; dir < DIR; dir++){
        newLin = lin + dlin[dir];
        newCol = col + dcol[dir];

        if(!wasVisited[newLin][newCol] && !(mat[lin][col] & bitConst[dir])) {
            lee(newLin, newCol);
        }
    }
}

int main() {
    ifstream cin("castel.in");
    ofstream cout("castel.out");

    cin >> c >> n;
    for(lin = 0; lin < n; lin++){
        for(col = 0; col < n; col++){
            cin >> mat[lin][col];
        }
    }

    nrRooms = 0;
    maxAria = INT_MIN;
    for(lin = 0; lin < n; lin++){
        for(col = 0; col < n; col++){
            if( (!wasVisited[lin][col]) && (mat[lin][col] == 9 || mat[lin][col] == 11 || mat[lin][col] == 13 || mat[lin][col] == 15) ) {
                nrRooms++;

                aria = 0;
                maxLin = maxCol = INT_MIN;
                lee(lin, col);

                if(aria > maxAria){
                    maxAria = aria;

                    coltStLin = lin;
                    coltStCol = col;

                    coltDrLin = maxLin;
                    coltDrCol = maxCol;
                }
            }
        }
    }

    if(c == 1){
        cout << nrRooms;
    } else if(c == 2){
        cout << maxAria;
    } else {
        cout << ++coltStLin << ' ' << ++coltStCol << ' ' << ++coltDrLin << ' ' << ++coltDrCol << '\n';
    }
    return 0;
}
```
