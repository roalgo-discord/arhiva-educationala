---
id: OJI-2015-VII-lasere
title: Soluția problemei lasere (OJI 2015, clasa a VII-a)
problem_id: 859
authors: [vnicu]
prerequisites:
    - matrices
    - lee
tags:
    - OJI
    - clasa VII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2015/07/lasere.txt).

<div class="editorial-text" markdown>

```text
Descrierea solutiei
Autor: prof. Nicu Vad Laurentiu, Liceul Teoretic Mihail Kogalniceanu Vaslui

 Varianta 1 -100p

Se citesc datele si se modifica tabloul conform pozitilor laserelor in ordinea in care apar.
Pentru a afla numarul de gropi se calculeaza poziile valorilor minime in cele opt directii si contorizarea acestora.
Pentru transee se foloseste un vector auxiliar cu valori de 0 si 1, 1 pentru pozitia gropii se cauta secventa maxima de valori consecutive de 1 si se contorizeaza.
```

</div>

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

ifstream fin("lasere.in");
ofstream fout("lasere.out");

const int MAXN = 200, DIR = 8, MAXDIR = 4;

int teren[MAXN + 2][MAXN + 2], groapa[MAXN + 2][MAXN + 2];
int dlin[DIR] = { 0, 1, 1, 1, 0, -1, -1, -1 };
int dcol[DIR] = { 1, 1, 0, -1, -1, -1, 0, 1 };
int givenDirToNewDir[MAXDIR + 1] = {0, 6, 0, 2, 4}; 

int esteGroapa(int lin, int col){
    int dir, newLin, newCol;

    for(dir = 0; dir < DIR; dir++){
        newLin = lin + dlin[dir];
        newCol = col + dcol[dir];

        if(teren[newLin][newCol] < teren[lin][col]){
            return 0;
        }
    }
    return 1;
}   

int main() {
    int n, m, cer, lin, col, i, dir, d, nrGrop, cnt, cntTr;

    fin >> cer >> n >> m;

    for(lin = 1; lin <= n; lin++){
        for(col = 1; col <= n; col++){
            fin >> teren[lin][col];
        }
    }

    for(lin = 0; lin <= n + 1; lin++){
        teren[0][lin] = teren[lin][0] = teren[n + 1][lin] = teren[lin][n + 1] = INT_MAX;
    }

    for(i = 0; i < m; i++){
        fin >> lin >> col >> dir;

        dir = givenDirToNewDir[dir];
        while(lin <= n && col <= n && lin >= 1 && col >= 1){
            teren[(lin = lin + dlin[dir])][(col = col + dcol[dir])]--;
        }
    }   

    nrGrop = 0;
    for(lin = 1; lin <= n; lin++){
        for(col = 1; col <= n; col++){
            if(esteGroapa(lin, col)){
                nrGrop++;
                groapa[lin][col] = 1;
            }
        }
    }

    cnt = cntTr = 0;
    for(lin = 1; lin <= n; lin++){
        for(col = 1; col <= n; col++){
            if(groapa[lin][col]){
                cnt = 0;
                do {
                    col++;
                    cnt++;
                } while(col <= n && groapa[lin][col]);
                if(cnt > 1){
                    cntTr++;
                }
            }
        }
    }

    fout << (cer == 1 ? nrGrop : cntTr) << '\n';
    return 0;
}
```
