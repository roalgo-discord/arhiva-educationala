---
id: OJI-2006-X-sudest
title: Soluția problemei sudest (OJI 2006, clasa a X-a)
problem_id: 757
authors: [aburta]
prerequisites:
    - lee
    - queue
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2006/10/sudest.TXT).

<div class="editorial-text" markdown>

```text
Reprezentarea informatiilor
N		  - numarul de linii
K		  - numarul de comenzi
A[Nmax][Nmax];	  - memoreaza cantitatea de produs
C[Nmax][Nmax];	  - C[i][j]=cantitatea maxima de cartofi culeasa pe un traseu ce porneste din (1,1) si se termina in (i,j), respectand conditiile problemei

P[Nmax][Nmax]	  - P[i][j]= pasul la care am ajuns in pozitia i,j culegand o cantitate maxima de cartofi
Move[2*Nmax];     - memoreaza cele K comenzi


Parcurg sirul celor k mutari. La fiecare mutare marchez pozitiile in care pot ajunge la mutarea respectiva.
Mai exact, parcurg toate pozitiile in care am putut ajunge la pasul precedent (cele marcate in matricea P corespunzator cu numarul pasului precedent) si pentru fiecare pozitie verific daca la pasul curent pot sa execut mutarea la sud.
In caz afirmativ, verific daca in acest caz obtin o cantitate de cartofi mai mare decat cea obtinuta pana la la momentul curent (daca da, retin noua cantitate, si marchez in matricea P pozitia in care am ajuns cu indicele mutarii curente).
In mod similar procedez pentru o mutare spre est.
```

</div>

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>
#include <queue>
#include <stack>

using namespace std;
const int NMAX = 102;

ifstream cin("sudest.in");
ofstream cout("sudest.out");

int v[NMAX][NMAX], nr[2 * NMAX - 2];
int dist[NMAX][NMAX];
int n, k;

bool inbound(int i, int j) {
    if (i < 1 || j < 1 || i > n || j > n)
        return false;
    return true;
}
struct pozitii { /// coord si a cat-a pozitie am bifat in nr[]
    int i, j, pos;
};
void bfs() {              /// literally analizezi toate cazurile,
    dist[1][1] = v[1][1]; /// doar sa nu iasa din matrice
    queue<pozitii> q;
    q.push({1, 1, 0});
    while (!q.empty()) {
        pozitii now = q.front();
        q.pop();
        if (now.pos >= k)
            continue;
        int lin = now.i, col = now.j; /// ver dist, in ambele directii (dr si jos)

        lin += nr[now.pos + 1]; /// JOS
        if (inbound(lin, col) && dist[now.i][now.j] + v[lin][col] > dist[lin][col]) {
            dist[lin][col] = dist[now.i][now.j] + v[lin][col];
            q.push({lin, col, now.pos + 1});
        }
        lin = now.i; /// DR
        col += nr[now.pos + 1];
        if (inbound(lin, col) && dist[now.i][now.j] + v[lin][col] > dist[lin][col]) {
            dist[lin][col] = dist[now.i][now.j] + v[lin][col];
            q.push({lin, col, now.pos + 1});
        }
    }
}
stack<pair<int, int>> ans;
void build() { /// inversezi tot ce e salvat, ca sa ajungem inapoi la orig
    ans.push({n, n});
    for (int i = k; i >= 1; i--) {
        pair<int, int> now = ans.top();
        int lin = now.first, col = now.second; /// dc avem un dist[n][n] min, atunci mai e si unul minim MINUS ult pas

        lin -= nr[i];
        if (inbound(lin, col) && dist[lin][col] + v[now.first][now.second] == dist[now.first][now.second])
            ans.push({lin, col});
        else /// dc nu, sigur e celalat
            ans.push({now.first, now.second - nr[i]});
    }
}
int main() {
    cin >> n;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            cin >> v[i][j];
        }
    }
    cin >> k;
    for (int i = 1; i <= k; i++)
        cin >> nr[i];
    bfs();
    cout << dist[n][n] << '\n';
    build(); /// dam rebuild
    while (!ans.empty()) {
        cout << ans.top().first << " " << ans.top().second << '\n';
        ans.pop();
    }
    return 0;
}
```
