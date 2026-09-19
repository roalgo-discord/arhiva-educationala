---
id: OJI-2005-V-ucif
title: Soluția problemei ucif (OJI 2005, clasa a V-a)
problem_id: 738
authors: [dapopescu]
prerequisites:
    - simulating-solution
    - basic-math
tags:
    - OJI
    - clasa V
---

Daca vreti sa ne ajutati cu acest articol, ne puteti gasi pe [github](https://github.com/roalgo-discord/arhiva-educationala) sau pe [serverul nostru de discord](https://discord.gg/vdDRSmg3fC)

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <fstream>
#include <iostream>

using namespace std;

ifstream fin("ucif.in");
ofstream fout("ucif.out");

int main() {
    int n, i, ucif, ucifc, exp;
    fin >> n;
    ucif = 1;

    for (i = 2; i <= n; i++) {
        exp = i - 1;
        ucifc = i;
        ucifc %= 10;
        while (exp) {
            ucifc *= i;
            ucifc %= 10;
            exp--;
        }
        ucif += ucifc;
        ucif %= 10;
    }

    fout << ucif;
    return 0;
}
```
