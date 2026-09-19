---
id: OJI-2010-V-tren
title: Soluția problemei tren (OJI 2010, clasa a V-a)
problem_id: 796
authors: [sichim]
prerequisites:
    - simulating-solution
tags:
    - OJI
    - clasa V
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2010/05/tren.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2010/05/tren.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2010/05/tren.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;

struct trenuri {
    int L, h, m, s;
};
trenuri tr[1001];

int seen[87000];
int main() {
    ifstream cin("tren.in");
    ofstream cout("tren.out");

    int n;
    cin >> n;

    int cnt1 = 0, cnt2 = 0;

    for (int i = 1; i <= n; i++) {
        int L, h, m, s;
        cin >> L >> h >> m >> s;
        tr[i] = {L, h, m, s};
        if (L == 1)
            cnt1++;
        else
            cnt2++;
    }

    cout << max(cnt1, cnt2) << " ";

    int cnt = 0;

    for (int i = 1; i <= n; i++)
        if (tr[i].L == 1) {
            for (int j = tr[i].h * 60 + tr[i].m; j <= tr[i].h * 60 + tr[i].m + tr[i].s; j++)
                seen[j] = 1;
            cnt++;
        }
    for (int i = 1; i <= n; i++)
        if (tr[i].L == 2) {
            bool ok = 0;
            for (int j = tr[i].h * 60 + tr[i].m; j <= tr[i].h * 60 + tr[i].m + tr[i].s; j++)
                if (seen[j] == 0)
                    ok = 1;

            if (ok) {
                for (int j = tr[i].h * 60 + tr[i].m; j <= tr[i].h * 60 + tr[i].m + tr[i].s; j++)
                    seen[j] = 1;
                cnt++;
            }
        }

    cout << cnt << " ";

    int maxi = 0;

    int smll = 0;
    int bgg = 0;

    for (int i = 0; i <= 86420; i++) {
        if (smll == 0 && seen[i] == 1)
            smll = i;
        if (seen[i] == 1)
            bgg = i;
    }

    int strk = 0;
    for (int i = smll; i <= bgg; i++) {
        if (seen[i] == 1)
            strk = 0;
        else
            strk++;
        maxi = max(maxi, strk);
    }

    cout << maxi;
    return 0;
}
```
