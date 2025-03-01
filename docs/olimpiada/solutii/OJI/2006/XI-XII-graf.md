---
id: OJI-2006-XI-XII-graf
title: Soluția problemei graf (OJI 2006, clasele XI-XII)
problem_id: 49
authors: [manz]
prerequisites:
   - stl
   - graphs
tags:
    - OJI
    - clasa XI-XII
---


Dacă definim distanța între două vârfuri ale unui graf neorientat ca fiind
lungimea celui mai scurt lanț dintre care are drept capete vârfurile, atunci
putem să observăm că un vârf oarecare $Z$ se află pe un lanț de lungime minimă
dintre $X$ și $Y$ dacă și numai dacă $d(X,Z) + d(Z,Y) = d(X,Y)$, pentru cazul în
care considerăm lungimea lanțului ca fiind numărul muchiilor, și $d(X,Z) +
d(Z,Y) = d(X,Y) + 1$, pentru cazul în care considerăm lungimea ca fiind numărul
vârfurilor.

Stabilim, prin câte o parcurgere în lățime, distanțele tuturor vârfurilor față
de $X$ și respectiv $Y$ (capetele lanțului, citite din fișier). Vedem care
dintre vârfurile ce aparțin cel puțin unui lanț de lungime minimă între $X$ și
$Y$ au proprietatea că sunt singurele aflate la o anumită distanță de $X$.
Acestea sunt vârfurile care aparțin tuturor lanțurilor de lungime minimă dintre
$X$ și $Y$. Algoritmul are complexitate $\mathcal{O}(n + m)$.
    
Facem o parcurgere în lățime din $X$ și o parcurgere în lățime pornind din $Y$,
în urma cărora determinăm, pentru fiecare vârf $z$, distanțele $d(X,z)$ și
respectiv $d(Y,z)$, precum și numărul de drumuri optime dintre $X$ și $z$,
notate $nr(X,z)$ și $nr(Y,z)$.

Un vârf $z$ are proprietatea de a aparține tuturor drumurilor optime dintre $X$
și $Y$ dacă și numai dacă $d(X,z) + d(Y,z) = d(X,Y)$, iar $nr(X,z) \cdot nr(Y,z)
= nr(X,Y)$.

În final, numărăm câte noduri sunt singurele noduri de pe lanțurile optime
aflate la distanța $d$, unde $d$ este o valoare între 0 și $d(X, Y)$.

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <fstream>
#include <queue>
#include <vector>
using namespace std;

constexpr int MAXN = 7500;

vector<vector<int>> graph(MAXN + 1);
vector<int> ans;

void bfs(int startNode, vector<int>& dist) {
    queue<int> q;
    q.push(startNode);
    dist[startNode] = 0;

    while (!q.empty()) {
        int node = q.front();
        q.pop();

        for (auto neighbor : graph[node]) {
            if (dist[neighbor] == -1) {
                dist[neighbor] = dist[node] + 1;
                q.push(neighbor);
            }
        }
    }
}

vector<int> distX, distY, solFreq;

int main() {
    distX.reserve(MAXN + 1);
    distY.reserve(MAXN + 1);
    solFreq.reserve(MAXN + 1);

    ifstream fin("graf.in");
    ofstream fout("graf.out");

    int n, m, x, y;
    fin >> n >> m >> x >> y;

    while (m--) {
        int a, b;
        fin >> a >> b;
        graph[a].push_back(b);
        graph[b].push_back(a);
    }

    distX.resize(n + 1, -1);
    distY.resize(n + 1, -1);
    solFreq.resize(n + 1, 0);

    bfs(x, distX);
    bfs(y, distY);

    int totalDist = distX[y];
    // Lungimea totală a drumului va fi egală cu distX[y].
    for (int i = 1; i <= n; i++) {
        if (distX[i] == -1 || distY[i] == -1) {
            continue;
        }

        if (distX[i] + distY[i] == totalDist) {
            solFreq[distX[i]]++;
        }
    }

    for (int i = 1; i <= n; i++) {
        if (distX[i] == -1 || distY[i] == -1) {
            continue;
        }

        if (distX[i] + distY[i] == totalDist && solFreq[distX[i]] == 1) {
            ans.push_back(i);
        }
    }

    fout << ans.size() << '\n';
    for (const auto& node : ans) {
        fout << node << ' ';
    }

    return 0;
}
```
