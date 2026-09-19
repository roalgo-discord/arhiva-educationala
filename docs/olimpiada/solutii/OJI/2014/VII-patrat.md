---
id: OJI-2014-VII-patrat
title: Soluția problemei patrat (OJI 2014, clasa a VII-a)
problem_id: 846
authors: [sjunea]
prerequisites:
    - matrices
tags:
    - OJI
    - clasa VII
---
Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2014/07/patrat.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2014/07/patrat.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2014/07/patrat.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

const int DIR = 8, MAXN = 200, MAXM = 200;

int dlin[DIR] = { 0, 1, 1, 1, 0, -1, -1, -1 };
int dcol[DIR] = { 1, 1, 0, -1, -1, -1, 0, 1 };

int stele[MAXN + 2][MAXM + 2];

int esteSteaStralucitoare(int lin, int col){
    int dir, newLin, newCol;

    for(dir = 0; dir < DIR; dir++){
        newLin = lin + dlin[dir];
        newCol = col + dcol[dir];

        if(stele[newLin][newCol] >= stele[lin][col]){
            return 0;
        }
    }
    return 1;
}

ifstream fin("patrat.in");
ofstream fout("patrat.out");

int main() {
    int n, m, lin, col, cnt, nrConst, length, maxLength;

    fin >> n >> m;
    for(lin = 1; lin <= n; lin++){
        for(col = 1; col <= m; col++){
            fin >> stele[lin][col];
        }
    }

    cnt = nrConst = maxLength = 0;
    for(lin = 1; lin <= n; lin++){
        for(col = 1; col <= m; col++){
            if(esteSteaStralucitoare(lin, col)){
                cnt++; // numarul stelelor stralucitoare

                length = min(n - lin, m - col);
                while(length >= 1){
                    if(esteSteaStralucitoare(lin + length, col) && esteSteaStralucitoare(lin + length, col + length) 
                       && esteSteaStralucitoare(lin, col + length)){
                        nrConst++; 
                        maxLength = max(maxLength, length);
                    }
                    --length;
                }
            }
        }
    }
    fout << cnt << '\n' << nrConst << '\n' << (maxLength == 0 ? 0 : maxLength + 1);


    return 0;
}
```
