---
id: OJI-2008-V-numere
title: Soluția problemei numere (OJI 2008, clasa a V-a)
problem_id: 772
authors: [cminca]
prerequisites:
    - simulating-solution
tags:
    - OJI
    - clasa V
---

Daca vreti sa ne ajutati cu acest articol, ne puteti gasi pe [github](https://github.com/roalgo-discord/arhiva-educationala) sau pe [serverul nostru de discord](https://discord.gg/vdDRSmg3fC)

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;

int perioada[1001];

int main() {
    ifstream cin("nr.in");
    ofstream cout("nr.out");

    int n, k, p;
    cin >> n >> k >> p;

    int a = 1, b = 2;

    int cnt = 2;
    int cntk = (k <= 2);
    for (int i = 3; i <= n; i++) {
        int c = (a + b) % 10;
        a = b;
        b = c;
        if (c == 2 || c == 3 || c == 5 || c == 7)
            cnt += c;
        if (c == k)
            cntk++;
    }

    cout << cnt << '\n';
    cout << cntk << '\n';

    perioada[0] = 1;
    perioada[1] = 2;

    int poz = 0;

    for (int i = 2;; i++) {
        perioada[i] = (perioada[i - 1] + perioada[i - 2]) % 10;
        if (perioada[i] == 2 && perioada[i - 1] == 1) {
            poz = i - 1;
            break;
        }
    }

    p--;
    cout << perioada[p % poz];
    return 0;
}
```
