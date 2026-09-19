---
id: OJI-2004-XI-XII-lanterna
title: Soluția problemei lanterna (OJI 2004, clasele XI-XII)
problem_id: 54
authors: [miandreica]
prerequisites:
    - shortest-path
    - intro-dp
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
// credits: Susan (kilonova)
#include <climits>
#include <fstream>
#include <queue>
#include <tuple>
#include <vector>

using namespace std;

struct baza {
    vector<tuple<int, int, int>> vec;
    bool bun{};
};

int check(int k, int n, vector<baza> &G) {
    vector dp(n + 1, vector(k + 1, INT_MAX));
    dp[1][0] = 0;

    queue<pair<int, int>> Q;
    Q.emplace(1, 0);

    while (!Q.empty()) {
        auto [i, consum] = Q.front();
        Q.pop();
        for (auto &[b, t, w] : G[i].vec) {
            if (consum + w > k)
                continue;
            int nou = (G[b].bun ? 0 : consum + w);
            if (dp[b][nou] > dp[i][consum] + t) {
                dp[b][nou] = dp[i][consum] + t;
                Q.emplace(b, nou);
            }
        }
    }

    int minim = INT_MAX;
    for (auto &it : dp[n])
        minim = min(it, minim);
    return minim;
}

int main() {
    ifstream f("lanterna.in");
    ofstream g("lanterna.out");

    int n, k;
    f >> n >> k;

    vector<baza> G(n + 1);

    for (int i = 1; i <= n; ++i)
        f >> G[i].bun;

    int m;
    f >> m;

    while (m--) {
        int a, b, t, w;
        f >> a >> b >> t >> w;
        G[a].vec.emplace_back(b, t, w);
        G[b].vec.emplace_back(a, t, w);
    }

    int timp = check(k, n, G);
    int st = 0, dr = k;

    while (st <= dr) {
        int mij = (st + dr) >> 1;

        if (check(mij, n, G) <= timp) {
            dr = mij - 1;
        } else {
            st = mij + 1;
        }
    }

    g << timp << ' ' << st << '\n';
}
```
