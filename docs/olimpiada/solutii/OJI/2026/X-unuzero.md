---
id: OJI-2026-X-unuzero
title: Soluția problemei unuzero (OJI 2026, clasa a X-a)
problem_id: 4226
authors: [bunget]
prerequisites:
    - dsu
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2026/10.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2026/10.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2026/10.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: constantinluca (kilonova)
#include <algorithm>
#include <fstream>
#include <iostream>

using namespace std;

ifstream fin("unuzero.in");
ofstream fout("unuzero.out");

typedef long long ll;

struct Point {
    ll r, c;
};

Point P[100005];
Point A[200005];

int parent[200005];

ll M, N, K;
int Q;

bool cmp(Point a, Point b) {
    if (a.r != b.r)
        return a.r < b.r;
    return a.c < b.c;
}

int find_set(int x) {
    if (parent[x] == x)
        return x;
    return parent[x] = find_set(parent[x]);
}

bool unite(int a, int b) {
    a = find_set(a);
    b = find_set(b);

    if (a == b)
        return false;

    parent[b] = a;
    return true;
}

int find_point(int n, ll r, ll c) {
    int st = 0, dr = n - 1;

    while (st <= dr) {
        int mid = (st + dr) >> 1;

        if (A[mid].r == r && A[mid].c == c)
            return mid;

        if (A[mid].r < r || (A[mid].r == r && A[mid].c < c))
            st = mid + 1;
        else
            dr = mid - 1;
    }

    return -1;
}

ll solve(int copies) {
    int total = Q * copies;

    for (int k = 0; k < copies; k++) {
        for (int i = 0; i < Q; i++) {
            A[k * Q + i].r = P[i].r + 1LL * k * M;
            A[k * Q + i].c = P[i].c;
        }
    }

    sort(A, A + total, cmp);

    for (int i = 0; i < total; i++)
        parent[i] = i;

    ll comp = total;

    for (int i = 0; i < total; i++) {

        int j;

        j = find_point(total, A[i].r - 1, A[i].c);
        if (j != -1)
            comp -= unite(i, j);

        j = find_point(total, A[i].r, A[i].c - 1);
        if (j != -1)
            comp -= unite(i, j);
    }

    return comp;
}

int main() {

    fin >> M >> N >> K >> Q;

    for (int i = 0; i < Q; i++) {
        ll pos;
        fin >> pos;

        P[i].r = (pos - 1) / N;
        P[i].c = (pos - 1) % N;
    }

    ll g1 = solve(1);

    if (K == 1) {
        fout << g1;
        return 0;
    }

    ll g2 = solve(2);

    fout << g1 + (K - 1) * (g2 - g1);

    return 0;
}
```
