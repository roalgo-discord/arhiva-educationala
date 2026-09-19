---
id: OJI-2016-XI-XII-elicoptere
title: Soluția problemei elicoptere (OJI 2016, clasele XI-XII)
problem_id: 29
authors: [dapopescu]
prerequisites:
    - dsu
    - basic-geometry
tags:
    - OJI
    - clasa XI-XII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2016/11-12/elicoptere.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2016/11-12/elicoptere.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2016/11-12/elicoptere.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: trraian (kilonova)
#include <algorithm>
#include <fstream>
#include <iomanip>

using namespace std;

ifstream fin("elicoptere.in");
ofstream fout("elicoptere.out");

const int MAXN = 100;

int k;

struct Point {
    int x, y;
};

struct Triangle {
    Point a, b, c;
} v[MAXN + 1];

struct Edge {
    int u, v;
    double w;
} edges[MAXN * MAXN];

struct DisjointSetForest {
    int sz[MAXN + 1], sef[MAXN + 1];

    void init(int n) {
        for (int i = 1; i <= n; i++) {
            sef[i] = i;
            sz[i] = 1;
        }
    }

    int find(int i) {
        if (i == sef[i]) {
            return i;
        }
        return sef[i] = find(sef[i]);
    }

    int getSize(int i) { return sz[find(i)]; }

    void join(int i, int j) {
        if ((i = find(i)) != (j = find(j))) {
            if (sz[i] < sz[j]) {
                swap(i, j);
            }
            sz[i] += sz[j];
            sef[j] = i;
        }
    }
} dsf;

bool intervalContains(int st, int dr, int val) {
    if (st > dr) {
        swap(st, dr);
    }
    return st <= val && val <= dr;
}

double distPointSegmentOX(Point x, Point a, Point b) {
    if (a.x == b.x) {
        if (a.x == x.x) {
            if (!intervalContains(a.y, b.y, x.y)) {
                return min(abs(a.y - x.y), abs(b.y - x.y));
            }
            return 0;
        }
        return k + 1;
    }
    if (!intervalContains(a.x, b.x, x.x)) {
        return k + 1;
    }
    return abs(a.y + (double)(x.x - a.x) * (b.y - a.y) / (b.x - a.x) - x.y);
}

double distPointSegment(Point x, Point a, Point b) { return min(distPointSegmentOX(x, a, b), distPointSegmentOX({x.y, x.x}, {a.y, a.x}, {b.y, b.x})); }

double distPointTriangle(Point p, Triangle t) { return min({distPointSegment(p, t.a, t.b), distPointSegment(p, t.b, t.c), distPointSegment(p, t.c, t.a)}); }

double distTriangles(Triangle x, Triangle y) {
    return min({distPointTriangle(x.a, y), distPointTriangle(x.b, y), distPointTriangle(x.c, y), distPointTriangle(y.a, x), distPointTriangle(y.b, x), distPointTriangle(y.c, x)});
}

int main() {
    int cer, n;
    fin >> cer >> n >> k;
    int cnt = 0;
    for (int i = 1; i <= n; i++) {
        fin >> v[i].a.x >> v[i].a.y >> v[i].b.x >> v[i].b.y >> v[i].c.x >> v[i].c.y;
        for (int j = 1; j < i; j++) {
            double cost = distTriangles(v[j], v[i]);
            if (cost <= k) {
                edges[++cnt] = {j, i, cost};
            }
        }
    }

    sort(edges + 1, edges + cnt + 1, [&](Edge a, Edge b) { return a.w < b.w; });
    dsf.init(n);
    int muchii = 0, cate = 0;
    double sum = 0;
    for (int i = 1; i <= cnt; i++) {
        if (dsf.find(edges[i].u) != dsf.find(edges[i].v)) {
            cate += dsf.getSize(edges[i].u) * dsf.getSize(edges[i].v);
            muchii++;
            sum += edges[i].w;
            dsf.join(edges[i].u, edges[i].v);
        }
    }

    if (cer == 1) {
        fout << muchii << "\n";
    } else if (cer == 2) {
        fout << cate << "\n";
    } else {
        fout << fixed << setprecision(6) << sum << "\n";
    }
    return 0;
}
```
