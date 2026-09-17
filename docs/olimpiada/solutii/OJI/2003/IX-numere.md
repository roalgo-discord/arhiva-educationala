---
id: OJI-2003-IX-numere
title: Soluția problemei numere (OJI 2003, clasa a IX-a)
problem_id: 712
authors: []
prerequisites:
    - bitwise-ops
    - backtracking
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

const int N = 10;

int a[N + 1];
vector<int> p, q;

int main () {
    ifstream cin("numere.in");
    ofstream cout("numere.out");

    for (int i = 1; i <= N; i++) {
        cin >> a[i];
    }

    int full_mask = (1 << N) - 1;
    int num_sol = 0, mx_sum = 0;
    for (int mask = 1; mask <= full_mask; mask++) {
        int opp_mask = 0, sum = 0;
        for (int bit = 0; bit < N; bit++) {
            if (mask & (1 << bit)) {
                sum += a[bit + 1];
            } else {
                opp_mask |= (1 << bit);
            }
        }

        // opp_mask = ~mask;

        // mask -> sum
        // how many sets from opp_mask have sum = sum?
        // gen submasks

        int mask2 = opp_mask;
        while (mask2 != 0) {
            int sum2 = 0;
            for (int bit = 0; bit < N; bit++) {
                if (mask2 & (1 << bit)) {
                    sum2 += a[bit + 1];
                }
            }

            if (sum == sum2) {
                num_sol++;
                if (sum > mx_sum) {
                    mx_sum = sum;

                    // cout << mask << " -> " << mask2 << "\n";

                    p.clear();
                    q.clear();
                    for (int bit = 0; bit < N; bit++) {
                        if (mask & (1 << bit)) {
                            p.push_back(a[bit + 1]);
                        }
                        if (mask2 & (1 << bit)) {
                            q.push_back(a[bit + 1]);
                        }
                    }
                }
            }

            mask2 = opp_mask &  (mask2 - 1);
        }
    }

    cout << num_sol / 2 << " " << mx_sum << "\n";
    for (auto x : p) {
        cout << x << " ";
    }
    cout << "\n";
    for (auto x : q) {
        cout << x << " ";
    }
    return 0;
}
```
