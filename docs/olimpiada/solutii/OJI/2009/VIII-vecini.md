---
id: OJI-2009-VIII-vecini
title: Soluția problemei vecini (OJI 2009, clasa a VIII-a)
problem_id: 791
authors: [dfloarea]
prerequisites:
    - simulating-solution
tags:
    - OJI
    - clasa VIII
---

Articolul va fi disponibil curând în arhivă.

Până atunci, puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2009/08/vecini.txt).

<div class="editorial-text" markdown>

```text
Solutia (program vecini.cpp)
=======
 - solutia se bazeaza pe memorarea a trei linii succesive din matrice la un moment dat;
 - pentru calculul vecinilor elementelor de pe prima linie (linia 1) si de pe ultima linie (linia m) se poate considera ca matricea contine doua linii suplimentare  (linia 0 si linia m+1) cu valori arbitrare diferite de 0 si 1;
 - cu ajutorul a doi vectori de directie pentru cei 8 vecini se calculeaza pentru linia din mijloc (linia 1) numarul maxim de vecini ai fiecarui element de pe linie si cate elemente au acest numar;
 - are loc translatarea "in sus" a liniilor in cadrul matricii:
	- linia anterioara <- linia curenta
	- linia curenta <- linia urmatoare
   si se citeste o noua linie din fisier;
 - complexiatea: O(m*n);
- valorile maxime pentru n si m sunt astfel date incat sa nu fie probleme de depasire a spatioului de memorie cand se retin simultan cele trei linii succesive ale matricei; solutia bruta care retine in intergime in memorie matricea  obtine 30 puncte.
```

</div>

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

const int MAXM = 1e3, MAXN = 1e3, DIR = 8;

char mat[MAXM + 2][MAXN + 2];

int dlin[DIR] = {0, 1, 1, 1, 0, -1, -1, -1};
int dcol[DIR] = {1, 1, 0, -1, -1, -1, 0, 1};

ifstream fin("vecini.in");
ofstream fout("vecini.out");

int main() {
    int m, n, k, i, lin, col, dir, cnt, maxCnt, maxCount;

    fin >> m >> n >> k;
    for(lin = 0; lin <= m + 1; lin++){
        mat[lin][0] = mat[lin][n + 1] = -1;
    }
    
    for(col = 0; col <= n + 1; col++){
        mat[0][col] = mat[m + 1][col] = -1;
    }

    for (i = 0; i < k; i++) {
        fin >> lin >> col;

        mat[lin][col] = 1;
    }

    maxCnt = 0;
    for (lin = 1; lin <= m; lin++){
        for(col = 1; col <= n; col++){
            cnt = 0;
            for(dir = 0; dir < DIR; dir++){
                if(mat[lin + dlin[dir]][col + dcol[dir]] == mat[lin][col]){
                    ++cnt;
                }
            }

            if(cnt > maxCnt){
                maxCnt = cnt;
                maxCount = 0;
            }
            if(cnt == maxCnt){
                ++maxCount;
            }
        }
    }

    fout << maxCnt << ' ' << maxCount;
    return 0;
}
```
