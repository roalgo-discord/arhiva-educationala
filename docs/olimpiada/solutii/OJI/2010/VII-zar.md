---
id: OJI-2010-VII-zar
title: Soluția problemei zar (OJI 2010, clasa a VII-a)
problem_id: 800
authors: [iordaiche]
prerequisites:
    - simulating-solution
tags:
    - OJI
    - clasa VII
---

Articolul va fi disponibil curând în arhivă.

Până atunci, editorialul poate fi accesat în repo-ul nostru de GitHub, linkul fiind [acesta](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20(regional%20olympiad)/2010/07/zar.pdf).

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;

ifstream fin("zar.in");
ofstream fout("zar.out");

const int DIR = 4;

int dlin[DIR] = {0, 1, 0, -1};
int dcol[DIR] = {1, 0, -1, 0};

int main() {
    int n, k, dir, i, cnt;
    int x, cx, y, cy, z, cz;

    fin >> n >> k >> z >> y >> x;

    cnt = 0;
    while(cnt < k){
        for (dir = 0; dir < DIR && cnt < k; dir++) {
            for (i = 1; i < n && cnt < k; i++) {
                if (dir == 0) {
                    // X devine Y
                    // Y devine 7 - X (X original)
                    // Z ramane Z

                    cx = x;
                    x = y;
                    y = 7 - cx;
                } else if (dir == 1) {
                    // X ramane X
                    // Z devine Y
                    // Y devine 7 - Z (Z original)

                    cz = z;
                    z = y;
                    y = 7 - cz;
                } else if (dir == 2) {
                    // Y devine X
                    // X devine 7 - Y (Y original)
                    // Z ramane Z

                    cy = y;
                    y = x;
                    x = 7 - cy;
                } else {
                    // X ramane X
                    // Y devine Z
                    // Z devine 7 - Y (Y original)

                    cy = y;
                    y = z;
                    z = 7 - cy;
                }

                cnt++;
            }
        }
    }
    fout << z << " " << y << " " << x;
    return 0;
}
```
