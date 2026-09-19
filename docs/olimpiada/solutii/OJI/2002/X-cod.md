---
id: OJI-2002-X-cod
title: Soluția problemei Cod (OJI 2002, clasa a X-a)
problem_id: 710
authors: [cerchez]
prerequisites:
    - strings
    - intro-dp
tags:
    - OJI
    - clasa X
---

Daca vreti sa ne ajutati cu acest articol, ne puteti gasi pe [github](https://github.com/roalgo-discord/arhiva-educationala) sau pe [serverul nostru de discord](https://discord.gg/vdDRSmg3fC)

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: FFTPeOJI (kilonova)
#include <bits/stdc++.h>
using namespace std;
string x, y;
vector <string> dp;
string mai_bun(string &a, string &b) {
    if (a.length() > b.length()) {
        return a;
    }
    else if (a.length() < b.length()) {
        return b;
    }
    else {
        return max(a,b);
    }
}
int main() {
    freopen("cod.in", "r", stdin);
    freopen("cod.out", "w", stdout);
    cin >> x >> y;
    if (x.length() < y.length()) {
        swap(x,y);
    }
    dp.resize(x.length(), "");
    for (int i = 0; i < y.length(); i++) {
        int j = 0;
        string maxim = "";
        while (j < x.length()) {
            string aux = dp[j];
            if (x[j] == y[i]) {
                string newstring = maxim + y[i];
                dp[j] = mai_bun(newstring, dp[j]);
            }
            maxim = mai_bun(maxim, aux);
            j++;
        }
    }
    string ans = "";
    for (auto i : dp) {
        ans = mai_bun(ans, i);
    }
    cout << ans << endl;
}
```
