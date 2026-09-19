---
id: OJI-2017-X-rover
title: Soluția problemei Rover (OJI 2017, clasa a X-a)
problem_id: 888
authors: [mlturpan]
prerequisites:
    - binary-search
    - deque
    - lee
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2017/10/rover.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2017/10/rover.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2017/10/rover.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h
#define fi first
#define se second
#define pb push_back
#define pf push_front

#define fisier 1

using namespace std;

typedef long long ll;

const int mod = 1000000007;
const double dancila = 3.14159265359; // PI
const double eps = 1e-9;

ifstream f("rover.in");
ofstream g("rover.out");

int n, c;
int mat[502][502];
int cost[502][502];

int ox[] = {-1, 0, 1, 0};
int oy[] = {0, 1, 0, -1};
struct cmp {
    bool operator()(pair<int, int> a, pair<int, int> b) { return cost[a.fi][a.se] > cost[b.fi][b.se]; }
};
priority_queue<pair<int, int>, vector<pair<int, int>>, cmp> q;
void solve1() {
    f >> n >> c;
    for (int i = 1; i <= n; ++i)
        for (int j = 1; j <= n; ++j) {
            f >> mat[i][j];
            cost[i][j] = (1 << 20);
        }
    cost[1][1] = 0;
    q.push({1, 1});
    while (!q.empty()) {
        pair<int, int> nod = q.top();
        q.pop();
        for (int i = 0; i <= 3; ++i) {
            int nxtX = nod.fi + ox[i];
            int nxtY = nod.se + oy[i];
            int nxtcost = cost[nod.fi][nod.se] + (mat[nxtX][nxtY] < c);
            if (nxtX == 0 || nxtY == 0 || nxtX == n + 1 || nxtY == n + 1)
                continue;
            if (nxtcost < cost[nxtX][nxtY]) {
                cost[nxtX][nxtY] = nxtcost;
                q.push({nxtX, nxtY});
            }
        }
    }
    g << cost[n][n] << '\n';
}
bool ok(int mini) {
    for (int i = 1; i <= n; ++i)
        for (int j = 1; j <= n; ++j)
            cost[i][j] = -1;
    deque<pair<int, int>> d;
    d.pb({1, 1});
    cost[1][1] = 0;
    while (!d.empty()) {
        pair<int, int> nod = d[0];
        d.pop_front();
        for (int i = 0; i <= 3; ++i) {
            int nxtX = nod.fi + ox[i];
            int nxtY = nod.se + oy[i];
            if (nxtX == 0 || nxtY == 0 || nxtX == n + 1 || nxtY == n + 1)
                continue;
            if (cost[nxtX][nxtY] != 0 && mat[nxtX][nxtY] >= mini) {
                cost[nxtX][nxtY] = 0;
                d.pb({nxtX, nxtY});
            }
        }
    }
    if (cost[n][n] == 0)
        return 1;
    return 0;
}
void solve2() {
    f >> n;
    for (int i = 1; i <= n; ++i)
        for (int j = 1; j <= n; ++j) {
            f >> mat[i][j];
            cost[i][j] = -1;
        }
    int st = 1;
    int dr = 10000;
    int ans = 1;
    while (st <= dr) {
        int mid = (st + dr) / 2;
        if (ok(mid))
            ans = mid, st = mid + 1;
        else
            dr = mid - 1;
    }
    g << ans;
}
int main() {

    int c;
    f >> c;
    if (c == 1)
        solve1();
    else
        solve2();
    return 0;
}
```
