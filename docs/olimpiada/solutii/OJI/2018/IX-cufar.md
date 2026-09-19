---
id: OJI-2018-IX-cufar
title: Soluția problemei cufar (OJI 2018, clasa a IX-a)
problem_id: 890
authors: [toncea]
prerequisites:
    - sieve
    - divisibility
tags:
    - OJI
    - clasa IX
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2018/09/cufar.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2018/09/cufar.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2018/09/cufar.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>

using namespace std;
using ll = long long;
const int NMAX = 1000000;

ifstream cin("cufar.in");
ofstream cout("cufar.out");

ll v[NMAX + 2], ciur[NMAX + 2];
int main()
{
    ll cer, n, a, k;
    cin >> cer >> n;
    if(cer == 1) {
        cin >> a >> k;
        for(int i = 2; i <= NMAX; i++) {
            if(ciur[i] == 0) {
                for(int j = i; j <= NMAX; j += i) {
                    ciur[j]++;
                    if(a == j && ciur[j] == k) {
                        cout << i;
                        return 0;
                    }
                }
            }
        }
    }
    ///cer 2
    ll sum = 0;
    for(int i = 1; i <= n; i++) {
        cin >> a >> k;
        v[a] = k;
    }
    for(int i = 2; i <= NMAX; i++) {
        if(ciur[i] == 0) {
            for(int j = i; j <= NMAX; j += i) {
                ciur[j]++;
                if(ciur[j] == v[j])
                    sum += i;
            }
        }
    }
        cout << sum;

    return 0;
}
```
