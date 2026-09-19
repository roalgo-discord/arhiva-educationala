---
id: OJI-2005-V-multimi
title: Soluția problemei multimi (OJI 2005, clasa a V-a)
problem_id: 737
authors: [dvladoiu]
prerequisites:
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

int main() {
    ifstream cin("multimi.in");
    ofstream cout("multimi.out");

    int n;
    cin >> n;

    int mini = -1000001;
    int maxi = 1000001;

    for (int i = 1; i <= n; i++) {
        int a, b;
        cin >> a >> b;
        mini = max(a, mini);
        maxi = min(maxi, b);
    }

    for (int i = mini; i <= maxi; i++)
        cout << i << " ";
    if (mini > maxi)
        cout << "multimea vida";
    return 0;
}
```
