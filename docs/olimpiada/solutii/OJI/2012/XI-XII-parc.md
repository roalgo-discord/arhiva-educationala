---
id: OJI-2012-XI-XII-parc
title: Soluția problemei Parc (OJI 2012, clasele XI-XII)
problem_id: 38
authors: [zoltan]
prerequisites:
    - basic-geometry
    - ad-hoc
tags:
    - OJI
    - clasa XI-XII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2012/11-12/parc.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2012/11-12/parc.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2012/11-12/parc.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 2e3;

vector<int> tranx, trany;

ifstream fin("parc.in");

inline int compute_axe(int a, int b, int flip, int dim, vector<int> &trans) {
    int n;
    fin >> n;
    vector<pair<int, int>> seg;
    for (int i = 0; i < n; ++i) {
        int x, y;
        fin >> x >> y;
        if (flip) {
            x = dim - x;
            y = dim - y;
        }
        if (x > y)
            swap(x, y);
        if (a <= x && y <= b)
            seg.push_back({x, y});
    }
    sort(seg.begin(), seg.end());
    trans.resize(seg.size());
    int sum = 0;
    for (int i = 0; i < (int)seg.size(); ++i) {
        trans[i] = seg[i].first - sum;
        sum += seg[i].second - seg[i].first;
    }
    return sum;
}

int main() {
    int dx, dy, xA, yA, xB, yB;
    fin >> dx >> dy >> xA >> yA >> xB >> yB;
    if (xB < xA) {
        swap(xB, xA);
        swap(yB, yA);
    }
    int flip = (yA > yB);
    if (flip) {
        yA = dy - yA;
        yB = dy - yB;
    }
    dx = compute_axe(xA, xB, 0, dx, tranx);
    dy = compute_axe(yA, yB, flip, dy, trany);
    xB -= dx;
    yB -= dy;
    fin.close();
    int num = 1;
    for (auto i1 : tranx)
        for (auto i2 : trany)
            if (xA * i2 + i1 * yB + xB * yA - yA * i1 - i2 * xB - yB * xA == 0)
                num <<= 1;
    ofstream fout("parc.out");
    fout << setprecision(10) << dx + dy + sqrt((xB - xA) * (xB - xA) + (yB - yA) * (yB - yA)) << '\n' << num << '\n';
    fout.close();
    return 0;
}
```
