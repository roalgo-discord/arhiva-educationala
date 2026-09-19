---
id: OJI-2007-V-test
title: Soluția problemei test (OJI 2007, clasa a V-a)
problem_id: 761
authors: [timplaru]
prerequisites:
    - divisibility
tags:
    - OJI
    - clasa V
---

Daca vreti sa ne ajutati cu acest articol, ne puteti gasi pe [github](https://github.com/roalgo-discord/arhiva-educationala) sau pe [serverul nostru de discord](https://discord.gg/vdDRSmg3fC)

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;

int a, b;

bool isPrime(int x) {
    if (x < 2)
        return 0;
    for (int i = 2; i * i <= x; i++)
        if (x % i == 0)
            return 0;
    return 1;
}
int main() {
    ifstream cin("test.in");
    ofstream cout("test.out");

    cin >> a >> b;

    int put = 1;
    while (put * 10 <= b)
        put *= 10;

    int cifbig = (b / put) * put;
    int cifsmall = b % 10;

    int maxi = max(a, b);
    int maxiprim = 0;
    if (isPrime(a))
        maxiprim = max(maxiprim, a);
    if (isPrime(b))
        maxiprim = max(maxiprim, b);

    while (a) {
        int newval = b - cifbig + (a % 10) * put;
        if (isPrime(newval))
            maxiprim = max(maxiprim, newval);
        maxi = max(maxi, newval);
        newval = b - cifsmall + (a % 10);
        if (isPrime(newval))
            maxiprim = max(maxiprim, newval);
        a /= 10;
    }

    if (maxiprim == 0)
        maxiprim = maxi;
    cout << maxiprim << '\n';
    return 0;
}
```
