---
id: OJI-2017-VII-joc
title: Soluția problemei joc (OJI 2017, clasa a VII-a)
problem_id: 884
authors: [costineanu]
prerequisites:
    - simulating-solution
tags:
    - OJI
    - clasa VII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2017/07/joc.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2017/07/joc.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2017/07/joc.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
#include <fstream>
#include <iostream>
#define MAXN 100
using namespace std;
// dp nu vine de la dynamic programming , ci de la diagonala principala
// input-ul poate fi destul de mare deci o citire cu caractere ar fi ideala
int lin[2][MAXN + 1];
int col[2][MAXN + 1];
int dp[2];
int dp1[2];
int dp2[2];
int ds[2];
int ds1[2];
int ds2[2];
int w[2];
int main() {
    ifstream cin("joc.in");
    ofstream cout("joc.out");
    int i, n, p, j, nr, l, c, winner, maxi, marcari, k, juc;
    cin >> p >> n >> k;
    /*
        ca sa-mi fie mai usor am considerat matricea din exemplu si matricea asta:
        01 02 03 04 05
        06 07 08 09 10
        11 12 13 14 15
        16 17 18 19 20
        21 22 23 24 25
    */
    maxi = w[0] = w[1] = 0;
    for (i = 0; i < k; i++) {
        // 0 = teodora , 1 = stefan
        juc = i % 2; // incep cu primul
        marcari = 0;
        winner = 2;
        // resetare
        for (j = 1; j <= n; j++)
            lin[0][j] = lin[1][j] = col[0][j] = col[1][j] = 0;
        for (j = 0; j < 2; j++)
            dp[j] = dp1[j] = dp2[j] = ds[j] = ds1[j] = ds2[j] = 0;
        for (j = 0; j < n * n; j++) {
            cin >> nr;
            if (nr % n == 0) {
                lin[juc][nr / n]++;
                col[juc][n]++;
                l = nr / n;
                c = n;
            } else {
                lin[juc][nr / n + 1]++;
                col[juc][nr % n]++;
                l = nr / n + 1;
                c = nr % n;
            }
            if (l == c) // diagonala principala
                dp[juc]++;
            if (l - 1 == c) // diagonala pararela din stanga ei
                dp1[juc]++;
            if (l + 1 == c) // diagonala pararela din dreapta ei
                dp2[juc]++;
            if (n - l + 1 == c) // diagonala secundara
                ds[juc]++;
            if (n - l == c) // diagonala pararela din stanga ei
                ds1[juc]++;
            if (n - l + 2 == c) // diagonala pararela din dreapta ei
                ds2[juc]++;
            if (winner == 2) { // daca inca nu e vreun castigator
                marcari++;
                if (lin[juc][l] == n || col[juc][c] == n || dp[juc] == n || ds[juc] == n)
                    winner = juc;
                if (dp1[juc] == n - 1 || dp2[juc] == n - 1 || ds1[juc] == n - 1 || ds2[juc] == n - 1)
                    winner = juc;
                if (winner < 2) {
                    w[winner]++;
                    maxi = max(maxi, marcari);
                }
            }
            juc = 1 - juc; // schimb jucatorul
        }
    }
    if (p == 1)
        cout << w[0] << " " << w[1] << '\n';
    else
        cout << maxi << '\n';
    return 0;
}
```
