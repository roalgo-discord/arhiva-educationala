---
id: OJI-2015-IX-defrag
title: Soluția problemei defrag (OJI 2015, clasa a IX-a)
problem_id: 853
authors: [chesca]
prerequisites:
    - partial-sums
tags:
    - OJI
    - clasa IX
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2015/09/defrag.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2015/09/defrag.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2015/09/defrag.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>

using namespace std;
const int PMAX = 102;
const int SMAX = 362;

ifstream cin("defrag.in");
ofstream cout("defrag.out");

int f[PMAX], v[PMAX][2 * SMAX], sp[PMAX][2 * SMAX];
int main()
{
    int cer, p, s, n, a, b;
    cin >> cer >> p >> s >> n;
    if(cer == 1) {
        int cnt = p;
        for(int i = 1; i <= n; i++) {
            cin >> a >> b;
            if(f[a] == 0)
                cnt--;
            f[a] = 1;
        }
        cout << cnt;
        return 0;
    }

    for(int i = 1; i <= n; i++) {
            cin >> a >> b;
            v[a][b] = 1;
            v[a][b + s] = 1;
            f[a]++;
    }
    for(int i = 1; i <= p; i++) {
        for(int j = 1; j <= 2 * s; j++) {
            sp[i][j] = sp[i][j - 1] + v[i][j]; ///ca doar pe linii
        }
    }
    for(int i = 1; i <= p; i++) {
        int minn = s;
        for(int j = 1; j <= s; j++) { ///pos din care incepem
            int nr = f[i] - (sp[i][j + f[i] - 1] - sp[i][j - 1]);
            minn = min(minn, nr);
        }
        cout << minn << " ";
    }
    return 0;
}
```
