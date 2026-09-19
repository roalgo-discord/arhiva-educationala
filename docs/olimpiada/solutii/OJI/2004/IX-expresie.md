---
id: OJI-2004-IX-expresie
title: Soluția problemei expresie (OJI 2004, clasa a IX-a)
problem_id: 723
authors: [dapopescu]
prerequisites:
    - divisibility
tags:
    - OJI
    - clasa IX
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20(regional%20olympiad)/2004/OJI%202004%20IX.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20(regional%20olympiad)/2004/OJI%202004%20IX.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20(regional%20olympiad)/2004/OJI%202004%20IX.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>
#include <map>

using namespace std;

ifstream cin("expresie.in");
ofstream cout("expresie.out");

map<int, int> umap;
int main() {
    int n, m, a;
    cin >> m >> n;
    while (n--) {
        int d = 2;
        cin >> a;
        while (d * d <= a) {
            int exp = 0;
            while (a % d == 0) {
                a /= d;
                exp++;
            }
            if (exp > 0)
                umap[d] += exp;
            d++;
        }
        if (a > 1)
            umap[a]++;
    }
    int ok = 0;
    for (auto var : umap) {
        if (var.second % m != 0) {
            ok = 1;
            break;
        }
    }
    if (ok == 1)
        cout << 0;
    else {
        cout << "1\n";
        for (auto var : umap)
            cout << var.first << " " << var.second / m << '\n';
    }
    return 0;
}
```
