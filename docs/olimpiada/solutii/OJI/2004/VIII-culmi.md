---
id: OJI-2004-VIII-culmi
title: Soluția problemei culmi (OJI 2004, clasa a VIII-a)
problem_id: 731
authors: []
prerequisites:
    - simulating-solution
tags:
    - OJI
    - clasa VIII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2004/OJI%202004%20VIII.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2004/OJI%202004%20VIII.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2004/OJI%202004%20VIII.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

using ll = long long;
#define pb push_back

const string FILE_NAME = "popas";
const int MAX_K = 100, MAX_R = 20;

int n[MAX_K + 5], r[MAX_K + 5], d[MAX_K + 5][MAX_R + 5];

int main() {
#ifndef LOCAL
    ifstream cin(FILE_NAME + ".in");
    ofstream cout(FILE_NAME + ".out");
#endif

    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int k, i, j, last, t, u, ans, minAns, minIdx;
    bool works;

    cin >> k;
    for (i = 1; i <= k; i++) {
        cin >> n[i] >> r[i];
        for (j = 1; j <= r[i]; j++) {
            cin >> d[n[i]][j];
        }
        sort(d[n[i]] + 1, d[n[i]] + r[i] + 1);
    }
    cin >> t >> u;

    minAns = minIdx = INT_MAX;
    works = false;
    for (i = 1; i <= k; i++) {
        last = ans = 0;
        for (j = 2; j <= r[i]; j++) {
            // daca nu pot ajunge pana la asta
            if (d[n[i]][j] - last >= t + u) {
                last = d[n[i]][j - 1];
                ans++;
            }
        }
        if ((t + u) * (ans + 1) >= d[n[i]][r[i]] + 1) {
            works = true;
        }
        if (ans <= minAns) {
            minAns = ans;
            minIdx = n[i];
        }
    }

    if (!works) {
        cout << "0\n";
        return 0;
    }
    cout << minAns << " " << minIdx << "\n";
    return 0;
}
```
