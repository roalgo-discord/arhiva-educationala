---
id: OJI-2002-IX-mouse
title: Soluția problemei mouse (OJI 2002, clasa a IX-a)
problem_id: 700
authors: []
prerequisites:
    - ad-hoc
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

const int N = 100, M = 100;

int a[N + 1][M + 1];

int main() {
    // ahh constructive problem
    ifstream cin("mouse.in");
    ofstream cout("mouse.out");

    int n, m, ts, ml, mc;

    cin >> n >> m;

    ts = 0;

    a[0][0] = 9999;
    ml = mc = 0;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            cin >> a[i][j];
            ts += a[i][j];

            if (!(i == n && j == m) && (i + j) & 1 && a[i][j] < a[ml][mc]) {
                ml = i;
                mc = j;
            }
        }
    }

    if (m & 1) {
        cout << n * m << " " << ts << "\n";
        for (int j = 1; j <= m; j++) {
            if (j & 1) {
                for (int i = 1; i <= n; i++) {
                    cout << i << " " << j << "\n";
                }
            } else {
                for (int i = n; i >= 1; i--) {
                    cout << i << " " << j << "\n";
                }
            }
        }
    } else if (n & 1) {
        cout << n * m << " " << ts << "\n";
        for (int i = 1; i <= n; i++) {
            if (i & 1) {
                for (int j = 1; j <= m; j++) {
                    cout << i << " " << j << "\n";
                }
            } else {
                for (int j = m; j >= 1; j--) {
                    cout << i << " " << j << "\n";
                }
            }
        }
    } else {
        cout << n * m - 1 << " " << ts - a[ml][mc] << "\n";

        if (ml == 1) {
            bool down = true;
            for (int j = 1; j <= m; j++) {
                if (j == mc) {
                    cout << 2 << " " << j << "\n";
                    down = false;
                    continue;
                }

                if (down) {
                    cout << 1 << " " << j << "\n";
                    cout << 2 << " " << j << "\n";
                    down = false;
                } else {
                    cout << 2 << " " << j << "\n";
                    cout << 1 << " " << j << "\n";
                    down = true;
                }
            }
            for (int i = 3; i <= n; i++) {
                if (i & 1) {
                    for (int j = m; j >= 1; j--) {
                        cout << i << " " << j << "\n";
                    }
                } else {
                    for (int j = 1; j <= m; j++) {
                        cout << i << " " << j << "\n";
                    }
                }
            }
        } else {
            for (int i = 1; i <= ml - 2; i++) {
                if (i & 1) {
                    for (int j = 1; j <= m; j++) {
                        cout << i << " " << j << "\n";
                    }
                } else {
                    for (int j = m; j >= 1; j--) {
                        cout << i << " " << j << "\n";
                    }
                }
            }

            if (ml & 1) {
                bool down = true;
                for (int j = m; j >= 1; j--) {
                    if (j == mc) {
                        cout << ml - 1 << " " << j << "\n";
                        down = true;
                        continue;
                    }

                    if (down) {
                        cout << ml - 1 << " " << j << "\n";
                        cout << ml << " " << j << "\n";
                        down = false;
                    } else {
                        cout << ml << " " << j << "\n";
                        cout << ml - 1 << " " << j << "\n";
                        down = true;
                    }
                }
            } else {
                bool down = true;
                for (int j = 1; j <= m; j++) {
                    if (j == mc) {
                        cout << ml - 1 << " " << j << "\n";
                        down = true;
                        continue;
                    }

                    if (down) {
                        cout << ml - 1 << " " << j << "\n";
                        cout << ml << " " << j << "\n";
                        down = false;
                    } else {
                        cout << ml << " " << j << "\n";
                        cout << ml - 1 << " " << j << "\n";
                        down = true;
                    }
                }
            }
            for (int i = ml + 1; i <= n; i++) {
                if (i & 1) {
                    for (int j = m; j >= 1; j--) {
                        cout << i << " " << j << "\n";
                    }
                } else {
                    for (int j = 1; j <= m; j++) {
                        cout << i << " " << j << "\n";
                    }
                }
            }
        }
    }
    return 0;
}
```
