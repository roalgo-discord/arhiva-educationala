---
id: OJI-2026-XI-XII-rotatii
title: Soluția problemei rotatii (OJI 2026, clasele XI-XII)
problem_id: 4231
authors: []
prerequisites:
    - basic-geometry
tags:
    - OJI
    - clasa XI-XII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2026/11-12.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2026/11-12.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2026/11-12.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: Buzdi (kilonova)
#include <bits/stdc++.h>
#define ll long long

using namespace std;

ifstream fin("rotatii.in");
ofstream fout("rotatii.out");

const int NMAX = 1e5;
const int INF = 1e9;

int cer, n, a, b;
char tr[NMAX + 1];
int rot[NMAX + 1];

void translatie(int &x, int &y, char dir) {
    if (dir == 'N') {
        y++;
    } else if (dir == 'S') {
        y--;
    } else if (dir == 'E') {
        x++;
    } else if (dir == 'V') {
        x--;
    }
}

void rotatie(int &x, int &y, int r) {
    int next_x = -1, next_y = -1;
    if (r == 0) {
        next_x = x;
        next_y = y;
    } else if (r == 90) {
        next_x = y;
        next_y = -x;
    } else if (r == 180) {
        next_x = -x;
        next_y = -y;
    } else if (r == 270) {
        next_x = -y;
        next_y = x;
    }
    x = next_x;
    y = next_y;
}

void inv_translatie(int &x, int &y, char dir) {
    if (dir == 'N') {
        translatie(x, y, 'S');
    } else if (dir == 'S') {
        translatie(x, y, 'N');
    } else if (dir == 'E') {
        translatie(x, y, 'V');
    } else if (dir == 'V') {
        translatie(x, y, 'E');
    }
}

void inv_rotatie(int &x, int &y, int r) {
    int next_x = -1, next_y = -1;
    if (r == 0) {
        next_x = x;
        next_y = y;
    } else if (r == 90) {
        next_x = -y;
        next_y = x;
    } else if (r == 180) {
        next_x = -x;
        next_y = -y;
    } else if (r == 270) {
        next_x = y;
        next_y = -x;
    }
    x = next_x;
    y = next_y;
}

void solve1() {
    fin >> n;
    for (int i = 1; i <= n; i++) {
        fin >> tr[i];
    }
    for (int i = 1; i <= n; i++) {
        fin >> rot[i];
    }

    int x = 0, y = 0;
    for (int i = 1; i <= n; i++) {
        translatie(x, y, tr[i]);
        rotatie(x, y, rot[i]);
    }
    fout << x << ' ' << y << '\n';
}

void solve2() {
    int t;
    fin >> t;
    while (t--) {
        fin >> n;
        for (int i = 1; i <= n; i++) {
            fin >> tr[i];
        }
        fin >> a >> b;

        int dist = abs(a) + abs(b);
        fout << (dist <= n && n % 2 == dist % 2 ? "DA" : "NU") << '\n';
    }
}

void solve3() {
    fin >> n;
    for (int i = 1; i <= n; i++) {
        fin >> tr[i];
    }
    fin >> a >> b;

    int x = a, y = b;
    for (int i = n; i >= 1; i--) {
        int min_dist = INF, xbest = -1, ybest = -1, rbest = -1;
        for (int r = 0; r <= 270; r += 90) {
            int xc = x, yc = y;
            inv_rotatie(xc, yc, r);
            inv_translatie(xc, yc, tr[i]);
            if (abs(xc) + abs(yc) < min_dist) {
                min_dist = abs(xc) + abs(yc);
                xbest = xc;
                ybest = yc;
                rbest = r;
            }
        }

        assert(min_dist != INF);
        x = xbest;
        y = ybest;
        rot[i] = rbest;
    }

    for (int i = 1; i <= n; i++) {
        fout << rot[i] << ' ';
    }
}

int main() {
    fin >> cer;
    if (cer == 1) {
        solve1();
    } else if (cer == 2) {
        solve2();
    } else {
        solve3();
    }
    return 0;
}
```
