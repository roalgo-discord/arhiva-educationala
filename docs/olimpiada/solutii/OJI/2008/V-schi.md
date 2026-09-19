---
id: OJI-2008-V-schi
title: Soluția problemei schi (OJI 2008, clasa a V-a)
problem_id: 773
authors: [sjunea]
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
#include <bits/stdc++.h>
using namespace std;

int fh = 24, fm = 24, fs = 24;
int lh = 0, lm = 0, ls = 0;

int main() {
    ifstream cin("schi.in");
    ofstream cout("schi.out");

    int h, m, s;
    cin >> h >> m >> s;

    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        int mm, ss;
        cin >> mm >> ss;
        int ora = h;
        int minut = m + mm;
        int secunda = s + ss;
        if (secunda >= 60)
            minut++, secunda -= 60;
        if (minut >= 60)
            ora++, minut -= 60;
        if (fh > ora || (fh == ora && fm > minut) || (fh == ora && fm == minut && fs > secunda))
            fh = ora, fm = minut, fs = secunda;
        if (lh < ora || (lh == ora && lm < minut) || (lh == ora && lm == minut && ls < secunda))
            lh = ora, lm = minut, ls = secunda;
    }
    cout << fh << " " << fm << " " << fs << '\n';
    cout << lh << " " << lm << " " << ls << '\n';
    return 0;
}
```
