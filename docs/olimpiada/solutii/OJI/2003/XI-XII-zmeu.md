---
id: OJI-2003-XI-XII-zmeu
title: Soluția problemei zmeu (OJI 2003, clasele XI-XII)
problem_id: 56
authors: [lica]
prerequisites:
    - shortest-path
    - stl
tags:
    - OJI
    - clasa XI-XII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2003/11-12/solutie%20zmeu.txt).

<div class="editorial-text" markdown>

```text
Problema propusa de prof. Dana Lica (Ploiesti)

Se lucreaza pe un graf orientat in care nodurile reprezinta povesti
si din care s-au eliminat niste arce (date in zmeu.in, i->1,  p->i si 1->p)

Rezolvarea are la baza un algoritm de tip Lee cu memorarea in fiecare nod
a tuturor timpilor minimi cu care se ajunge in nodul respectiv cu 1,2,...,c
capete netaiate.

Pentru testele mari sunt necesare tehnici de alocare si optimizari legate de
parcurgerea in latime a grafului.
```

</div>

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: adimiclaus15 (kilonova)
#include <bits/stdc++.h>
using namespace std;

const int NMAX = 500;
const int PMAX = 200;
vector<int> L[NMAX + 1];
int dist[PMAX + 1][NMAX + 1], vis[PMAX + 1][NMAX + 1];
int d[PMAX + 1], c[PMAX + 1];
int v[PMAX + 1][PMAX + 1];
priority_queue<pair<int, pair<int, int>>> s;
//(distanta de la 1 la nod, nod = (nod, capete))

int main() {
    ifstream cin("zmeu.in");
    ofstream cout("zmeu.out");
    int n, p, k;
    cin >> n >> p >> k;
    for (int i = 1; i <= p; i++) {
        cin >> d[i] >> c[i];
    }
    for (int i = 1; i <= k; i++) {
        int x, y;
        cin >> x >> y;
        v[x][y] = 1;
    }
    v[1][p] = 1;
    for (int i = 1; i <= p; i++) {
        for (int j = 1; j <= p; j++) {
            if (v[i][j] == 0 && i != j) {
                L[i].push_back(j);
            }
        }
    }
    for (int i = 1; i <= p; i++) {
        for (int j = 1; j <= n; j++) {
            dist[i][j] = 1e9;
        }
    }
    dist[1][n - c[1]] = d[1];
    s.push({-dist[1][n - c[1]], {1, n - c[1]}});
    while (!s.empty()) {
        auto it = s.top();
        s.pop();

        int nod = it.second.first;
        int capete = it.second.second;
        if (vis[nod][capete]) {
            continue;
        }
        vis[nod][capete] = 1;
        for (auto next : L[nod]) {
            int vecin = next;
            int cost = d[next];
            if (capete > c[next] && dist[vecin][capete - c[vecin]] > dist[nod][capete] + cost) {
                dist[vecin][capete - c[vecin]] = dist[nod][capete] + cost;
                s.push({-dist[vecin][capete - c[next]], {vecin, capete - c[vecin]}});
            }
        }
    }
    int mn = 1e9;
    for (int i = 1; i <= n; i++) {
        mn = min(mn, dist[p][i]);
    }
    cout << mn;
}
```
