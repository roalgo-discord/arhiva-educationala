---
id: OJI-2019-X-traseu
title: Soluția problemei traseu (OJI 2019, clasa a X-a)
problem_id: 915
authors: [pitrada]
prerequisites:
    - two-pointers
    - ad-hoc
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2019/10/traseu.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2019/10/traseu.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2019/10/traseu.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>

using namespace std;
const int NMAX = 502;
const int INF = 21e8;

ifstream cin("traseu.in");
ofstream cout("traseu.out");

struct pozitii {
    int x, y;
}v[NMAX * NMAX]; ///poz nr i din mat orig
int lin[NMAX]; ///pt lin resp, nr cu col MIN (ca noi vrem Dist max)
int main()
{
    int n, m, a;
    cin >> n >> m;
    for(int i = 1; i <= n; i++) {
        for(int j = 1; j <= m; j++) {
            cin >> a;
            v[a].x = i, v[a].y = j;
        }
    }
    int ans = 0;
    for(int i = 1; i <= n * m; i++) { ///AVEM coltul mai mare, cautam coltul mai mic
        for(int k = 1; k <= v[i].x; k++) {
            if(lin[k] == 0 || lin[k] > v[i].y) ///n-am mai avut pe lin / colmin >
                continue;
            ans = max(ans, v[i].x - k + v[i].y - lin[k]); ///altfel, e bine
        }
        if(lin[v[i].x] == 0) ///si update
            lin[v[i].x] = v[i].y;
        else
            lin[v[i].x] = min(lin[v[i].x], v[i].y);
    }
    if(ans == 0)
        ans--;
    cout << ans + 1; ///+1 ca adunam si casuta resp, ca noi am facut dist manhattan in rest
    return 0;
}
```
