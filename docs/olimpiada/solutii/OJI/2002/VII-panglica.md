---
id: OJI-2002-VII-panglica
title: Soluția problemei panglica (OJI 2002, clasa a VII-a)
problem_id: 705
authors: [stefdasca]
prerequisites:
   - sequences
tags:
    - OJI
    - clasa VII
---


Pentru a afla lungimea maximă a unei benzi pe care o putem obține, vom avea
nevoie să știm pentru fiecare culoare prima și ultima pozitie a acesteia în
șirul dat. Apoi, vom afla culoarea care are cea mai mare diferență între aceste
poziții, precum și pozițiile ei de început și final, folosind precalcularea
anterioară.

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;

ifstream fin("panglica.in");
ofstream fout("panglica.out");

int v[10005];
int ppoz[202], upoz[202];
int lpf[202];

int main() {
    int n, c;
    fin >> n >> c;
    for (int i = 1; i <= n; ++i) {
        fin >> v[i];
        if (ppoz[v[i]] == 0) {
            ppoz[v[i]] = i;
        }
        upoz[v[i]] = i;
    }
    int lmax = 0;
    for (int i = 1; i <= c; ++i) {
        lpf[i] = upoz[i] - ppoz[i] + 1;
        if (lpf[i] > lmax) {
            lmax = lpf[i];
        }
    }
    int cf = 0;
    int rs = 0, rf = 0;
    for (int i = 1; i <= n; ++i) {
        if (lpf[v[i]] == lmax) {
            cf = v[i];
            rs = ppoz[v[i]] - 1;
            rf = n - upoz[v[i]];
            break;
        }
    }
    fout << lmax << '\n' << cf << '\n' << rs << '\n' << rf << '\n';
    return 0;
}
```
