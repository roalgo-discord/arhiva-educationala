---
id: OJI-2012-VIII-deal
title: Soluția problemei deal (OJI 2012, clasa a VIII-a)
problem_id: 825
authors: [cerchez]
prerequisites:
    - ad-hoc
    - greedy
tags:
    - OJI
    - clasa VIII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2012/08/deal.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2012/08/deal.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2012/08/deal.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>
#include <algorithm>
#include <vector>

using namespace std;
const int NMAX = 100002;
using ll = long long;

ifstream cin("deal.in");
ofstream cout("deal.out");

int v[NMAX];
vector <int> fin;
int main() {
    int n;
    cin >> n;
    for(int i = 1 ; i <= n; i++)
        cin >> v[i];
    sort(v + 1, v + n + 1);

    int st = n / 2, dr = n, pos = 1;
    while(dr > n / 2) {
        if(st > 0)
            fin.push_back(v[st]);
        fin.push_back(v[dr]);
        dr--;
        st--;
    }
    fin.push_back(0);
    ll ans = 0;
    for(int i = 1; i < n; i++) {
        if(fin[i] >= fin[i - 1] && fin[i] != fin[i + 1])
            ans += fin[i];
    }
    cout << ans;
    return 0;
}
```
