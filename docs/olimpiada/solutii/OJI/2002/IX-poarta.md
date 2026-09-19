---
id: OJI-2002-IX-poarta
title: Soluția problemei poarta (OJI 2002, clasa a IX-a)
problem_id: 699
authors: [rvisinescu]
prerequisites:
    - graphs
tags:
    - OJI
    - clasa IX
---

Daca vreti sa ne ajutati cu acest articol, ne puteti gasi pe [github](https://github.com/roalgo-discord/arhiva-educationala) sau pe [serverul nostru de discord](https://discord.gg/vdDRSmg3fC)

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

const int N = 250, P = 5e3;

int s[N + 1][N + 1];
bool vis[P + 1];
pair<int, int> from[P + 1], to[P + 1];

int main() {
    ifstream cin("poarta.in");
    ofstream cout("poarta.out");

    int p, ans, sz, occ;

    cin >> p;
    for (int i = 1; i <= p; i++) {
        cin >> from[i].first >> from[i].second;
        cin >> to[i].first >> to[i].second;

        s[from[i].first][from[i].second] = i;
    }

    ans = 0;
    bool on;

    do {
        on = false;
        for (int i = 1; i <= p; i++) {
            if (from[i] == to[i]) {
                continue;
            }

            if (s[to[i].first][to[i].second] == 0) {
                ans++;
                on = true;
                s[from[i].first][from[i].second] = 0;
                s[to[i].first][to[i].second] = i;
            }
        }
    } while (on);

    for (int i = 1; i <= p; i++) {
        if (s[to[i].first][to[i].second] == i) {
            continue;
        }

        sz = 0;
        occ = i;
        while (!vis[occ]) {
            sz++;
            vis[occ] = true;
            occ = s[to[occ].first][to[occ].second];
        }
        ans += sz + (sz != 0);
    }

    cout << ans;
    return 0;
}
```
