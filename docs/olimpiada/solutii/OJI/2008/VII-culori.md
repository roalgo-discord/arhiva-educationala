---
id: OJI-2008-VII-culori
title: Soluția problemei culori (OJI 2008, clasa a VII-a)
problem_id: 776
authors: [cminca]
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

ifstream fin("culori.in");
ofstream fout("culori.out");

const int MAXVAL = 1e3, MAXN = 50, MAXM = 50, DIR = 8; 

vector< vector< vector< char > > > mat(MAXVAL, vector< vector< char > >(MAXN, vector< char >(MAXM)));

int dlin[DIR] = {-1, -1, -1, 0, 0, 1, 1, 1};
int dcol[DIR] = {-1,  0,  1, 1,-1, 1, 0,-1};

// mat[a][b][c] = The value of coords (b, c) in configuration A

int main() {
    int n, m, t, lin, col, i, dir, newLin, newCol, countA, countR;

    fin >> n >> m >> t;

    for(lin = 0; lin < n; lin++){
        for(col = 0; col < m; col++){
            fin >> mat[0][lin][col];
        }
    }

    i = 1;
    while( (i == 1) || (i <= t && mat[i - 2] != mat[i - 1]) ){ // If it's the first time we just go, else we check if the last 2 configurations
                                                               // were the same (it means that we finished)
        for(lin = 0; lin < n; lin++){
            for(col = 0; col < m; col++){
                countA = countR = 0;
                for(dir = 0; dir < DIR; dir++){
                    newLin = lin + dlin[dir];
                    newCol = col + dcol[dir];

                    if(0 <= newLin && newLin < n && 0 <= newCol && newCol < m){ // If we're still inside the matrix
                        if(mat[i - 1][newLin][newCol] == 'a'){
                            countA++;
                        } else {
                            countR++;
                        }
                    }
                }

                //In cazul in care numarul pestilor vecini rosii este egal cu numarul pestilor vecini albastri, pestele studiat isi va pastra culoarea.
                mat[i][lin][col] = (countA == countR ? mat[i - 1][lin][col] : (countA > countR ? 'a' : 'r'));
            }
        }
        ++i;
    }
    for(lin = 0; lin < n; lin++){
        for(col = 0; col < m; col++){
            fout << mat[i - 1][lin][col];
        }
        fout<< '\n';
    }
    return 0;
}
```
