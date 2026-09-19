---
id: OJI-2002-XI-XII-nunta
title: Soluția problemei nunta (OJI 2002, clasele XI-XII)
problem_id: 58
authors: [cerchez]
prerequisites:
    - range-dp
tags:
    - OJI
    - clasa XI-XII
---

Daca vreti sa ne ajutati cu acest articol, ne puteti gasi pe [github](https://github.com/roalgo-discord/arhiva-educationala) sau pe [serverul nostru de discord](https://discord.gg/vdDRSmg3fC)

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: adimiclaus15 (kilonova)

#include <bits/stdc++.h>
using namespace std;

set<int> dp[51][51];
//dp[i][j] = pietrele ramase pe intervalul [i, j]
//Alterntiv: dp[i][j][val] = 1


int main() {
    ifstream cin("nunta.in");
    ofstream cout("nunta.out");
	int n;
    cin >> n;
    for(int i = 1; i <= n; i++) {
        int x;
        cin >> x;
        dp[i][i].insert(x);
    }
    for(int len = 2; len <= n; len++) {
        for(int i = 1; i <= n - len + 1; i++) {
            int j = i + len - 1;
            for(int k = i; k < j; k++) {
                for(auto it1 : dp[i][k]) {
                    for(auto it2 : dp[k + 1][j]) {
                        dp[i][j].insert(abs(it1 - it2));
                    }
                }
            }
        }
    }
    cout << dp[1][n].size() << '\n';
    for(auto it : dp[1][n]) {
        cout << it << ' ';
    }
}
```
