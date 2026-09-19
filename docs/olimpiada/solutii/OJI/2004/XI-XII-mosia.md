---
id: OJI-2004-XI-XII-mosia
title: Soluția problemei mosia (OJI 2004, clasele XI-XII)
problem_id: 53
authors: [rpintea]
prerequisites:
    - intro-dp
    - basic-geometry
tags:
    - OJI
    - clasa XI-XII
---

Articolul va fi disponibil curând în arhivă.

Până atunci, puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2004/OJI%202004%20XI-XII.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2004/OJI%202004%20XI-XII.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2004/OJI%202004%20XI-XII.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// prof. Marinel Serban
#include <algorithm>
#include <cmath>
#include <fstream>
#include <iomanip>
#define NMAX 1010

using namespace std;

ifstream fin("mosia.in");
ofstream fout("mosia.out");

struct par {
    double x, y, d;
};

int n;
par v[NMAX], mij;

bool crit(par a, par b);
double dist(par a, par b);
double dp(int start);

int main() {
    int i;
    fin >> n;
    for (i = 1; i <= n; i++) {
        fin >> v[i].x >> v[i].y >> v[i].d;
        mij.x += v[i].x;
        mij.y += v[i].y;
    }
    mij.x /= n;
    mij.y /= n;
    sort(v + 1, v + n + 1, crit);
    v[n + 1] = v[1];
    v[0] = v[n];
    fout << fixed << setprecision(4) << max(dp(1), dp(2)) << '\n';
    fout.close();
    return 0;
}

bool crit(par a, par b) { return atan2(a.y - mij.y, a.x - mij.x) < atan2(b.y - mij.y, b.x - mij.x); }
double dist(par a, par b) { return sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y)); }
double dp(int start) {
    int i;
    double dp[NMAX] = {0};
    for (i = start; i <= n + start - 2; i++) {
        if (i == 1)
            dp[i] = max(dp[i - 1], dist(v[i - 1], v[i + 1]) * v[i].d / 2);
        else
            dp[i] = max(dp[i - 1], dp[i - 2] + dist(v[i - 1], v[i + 1]) * v[i].d / 2);
    }
    return dp[n + start - 2];
}
```
