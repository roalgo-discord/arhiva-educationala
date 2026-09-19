---
id: OJI-2017-VII-cursuri
title: Soluția problemei cursuri (OJI 2017, clasa a VII-a)
problem_id: 883
authors: [lica]
prerequisites:
    - binary-search
    - greedy
tags:
    - OJI
    - clasa VII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2017/07/cursuri.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2017/07/cursuri.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2017/07/cursuri.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

const int MAX_N = 1000, MAX_K = 1000;

int endTime[MAX_K + 5];
pair<int, int> interval[MAX_N + 5];

int main() {
    ifstream cin("cursuri.in");
    ofstream cout("cursuri.out");

    int cer, n, k, i, ans, sala;

    cin >> cer >> n >> k;
    if (cer == 1) {
        for (i = 1; i <= n; i++) {
            cin >> interval[i].first >> interval[i].second;
        }
        sort(interval + 1, interval + n + 1, [](pair<int, int> a, pair<int, int> b) {
            return (a.second < b.second);
        });

        ans = 0;
        endTime[1] = interval[1].second;
        for (i = 2; i <= n; i++) {
            int minTime = INT_MAX, minIdx;
            for (sala = 1; sala <= k; sala++) {
                int tempTime = interval[i].first - endTime[sala];
                if (endTime[sala] <= interval[i].first && tempTime < minTime) {
                    minTime = tempTime;
                    minIdx = sala;
                }
            }

            if (minTime < INT_MAX) {
                endTime[minIdx] = interval[i].second;
                ans++;
            }
        }

        cout << ans + 1;
    } else {
        for (i = 1; i <= n; i++) {
            cin >> interval[i].first >> interval[i].second;
        }
        sort(interval + 1, interval + n + 1);

        ans = INT_MIN;
        for (i = 1; i <= n; i++) {
            ans = max(ans, interval[i].second - interval[i].first);
        }

        for (i = k + 1; i <= n; i++) {
            ans = min(ans, interval[i].first - interval[i - k].first);
        }

        cout << ans;
    }


    return 0;   
}
```
