---
id: OJI-2014-IX-pseudobil
title: Soluția problemei pseudobil (OJI 2014, clasa a IX-a)
problem_id: 841
authors: [galatan]
prerequisites:
    - partial-sums
tags:
    - OJI
    - clasa IX
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2014/09/pseudobil.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2014/09/pseudobil.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2014/09/pseudobil.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>

using namespace std;
const int NMAX = 1502;

ifstream cin("pseudobil.in");
ofstream cout("pseudobil.out");

int v[2 * NMAX][2 * NMAX];
int n;
void sum() {
    for(int i = 1; i <= 2 * n - 1; i++) {
        for(int j = 1; j <= 2 * n - 1; j++) {
            v[i][j] += v[i - 1][j] + v[i][j - 1] - v[i - 1][j - 1];
        }
    }
}
int solve(int is, int js, int ij, int jj) {
    return v[ij][jj] - v[is - 1][jj] - v[ij][js - 1] + v[is - 1][js - 1];
}
void print() {
    for(int i = 1; i <= 2 * n - 1; i++) {
        for(int j = 1; j <= 2 * n - 1; j++) {
            cout << v[i][j] << " ";
        }
        cout << '\n';
    }
    cout << '\n';
}
int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int cer, k, d, a, b, m;
    cin >> cer >> n >> k >> d;
    if(cer == 1) {
        d /= 2;
        cout << d * d + (d - 1) * (d - 1);
        return 0;
    }
    while(k--) {
        cin >> a >> b;
        v[a + b - 1][n - a + b]++;
    }
    sum();
    cin >> m;
    while(m--) {
        cin >> a >> b;
        int x = a + b - 1, y = n - a + b;
        cout << solve(x, y - d, x + d, y) << '\n';

    }
    return 0;
}
```
