---
id: OJI-2019-IX-abx
title: Soluția problemei abx (OJI 2019, clasa a IX-a)
problem_id: 903
authors: [nmot]
prerequisites:
    - binary-search
    - basic-math
    - divisibility
tags:
    - OJI
    - clasa IX
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2019/09/abx.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2019/09/abx.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2019/09/abx.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>

using namespace std;
ifstream in("abx.in");
ofstream out("abx.out");

int CB(long long value, const vector<long long> &v) {
    int nr = -1, step;
    for (step = 1 << 20; step; step >>= 1) {
        if (nr + step < v.size() && v[nr + step] <= value) {
            nr += step;
        }
    }
    return nr;
}

int main() {
    int n;
    long long m;
    vector<long long> pows;

    in >> n >> m;
    pows.push_back(1);
    for (long long b = 2; b * b * b <= m; b++) {
        long long pow = b * b;
        while (m / b >= pow) {
            pow *= b;
            pows.push_back(pow);
        }
    }

    sort(pows.begin(), pows.end());

    for (int i = 1; i <= n; i++) {
        long long x;
        in >> x;

        int pos = CB(x, pows);
        long long pow = pows[pos];

        if (pos + 1 < pows.size() && pows[pos + 1] - x < x - pow) {
            pow = pows[pos + 1];
        }

        long long powb2 = sqrt(x);
        powb2 *= powb2;

        if (x - powb2 < abs(x - pow)) {
            pow = powb2;
        } else if (x - powb2 == abs(x - pow) && powb2 < pow) {
            pow = powb2;
        }

        powb2 = sqrt(x) + 1;
        powb2 *= powb2;

        if (powb2 <= m && powb2 - x < abs(x - pow)) {
            pow = powb2;
        } else if (powb2 <= m && powb2 - x == abs(x - pow) && powb2 < pow) {
            pow = powb2;
        }

        out << pow << '\n';
    }
}
```
