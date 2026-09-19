---
id: OJI-2011-XI-XII-ubuntzei
title: Soluția problemei ubuntzei (OJI 2011, clasele XI-XII)
problem_id: 40
authors: [mstroe]
prerequisites:
    - shortest-path
    - bitmask-dp
tags:
    - OJI
    - clasa XI-XII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2011/11-12/ubuntzei.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2011/11-12/ubuntzei.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2011/11-12/ubuntzei.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>
#include <vector>
#include <queue>

using namespace std;
const int NMAX = 2000;
const int KMAX = 15;
using ll = long long;
const int INF = 1e15;

ifstream cin("ubuntzei.in");
ofstream cout("ubuntzei.out");

int n, k, put = 1;
int ubu[KMAX + 2];
int val[NMAX + 2]; ///dc e ubuntzel sau nu (si val din masca)

struct muchii{
    int nod, cost;
};
vector <vector <muchii>> v;

struct prio{
    int nod;
    ll cost;
    int mask;
    bool operator <(const prio & rhs) const {
        return cost > rhs.cost;
    }
};
ll prec[KMAX + 2][NMAX + 2]; ///Dist de la prietenul i la j
void dijkstra(int start) { ///pt precalc
    for(int i = 1; i <= n; i++)
            prec[start][i] = INF;
    priority_queue <prio> pq;
    pq.push({ubu[start], 0});
    while(!pq.empty()) {
        prio now = pq.top();
        pq.pop();
        if(prec[start][now.nod] < now.cost)
            continue;
        prec[start][now.nod] = now.cost; ///sa fie
        for(auto x : v[now.nod]) {
            if(prec[start][x.nod] > now.cost + x.cost) {
                prec[start][x.nod] = now.cost + x.cost;
                pq.push({x.nod, now.cost + x.cost});
            }
        }
    }
}
ll dist[KMAX + 2][(1 << KMAX) + 2]; ///dist[i][mask] = Dmin de la 1 la i a.i. am trecut prin prietenii din masca
int solve() {
    for(int i = 1; i <= k; i++)
        for(int mask = 0; mask <= put; mask++)
            dist[i][mask] = INF;
    ll ans = INF;
    priority_queue <prio> pq;
    for(int i = 1; i <= k; i++) ///de la 1 ne ducem la TOTI oamenii
        pq.push({i, prec[i][1], val[ubu[i]]});
    while(!pq.empty()) {
        prio now = pq.top(); ///!!!now.nod = id-ul DIN UBU[]
        pq.pop();
        if(now.cost > dist[now.nod][now.mask])
            continue;
        dist[now.nod][now.mask] = now.cost;
        for(int i = 1; i <= k; i++) { ///ceilalti vecini
            if(i == now.nod)
                continue;
            int mask = (now.mask | val[ubu[i]]);
            if(dist[i][mask] > now.cost + prec[now.nod][ubu[i]]) { ///ne ducem la vec
                dist[i][mask] = now.cost + prec[now.nod][ubu[i]];
                pq.push({i, now.cost + prec[now.nod][ubu[i]], mask});
            }
        }
        ///Comparam si pt ans
        if(now.mask == put)
            ans = min(ans, now.cost + prec[now.nod][n]);
    }
    return ans;
}

int main() {
    int m;
    cin >> n >> m >> k;
    for(int i = 1; i <= k; i++) {
        cin >> ubu[i];
        val[ubu[i]] = put;
        put <<= 1;
    }
    put--; ///aia e masca max
    v.resize(n + 1);
    for(int i = 1; i <= m; i++) {
        int a, b, cost;
        cin >> a >> b >> cost;
        v[a].push_back({b, cost});
        v[b].push_back({a, cost});
    }
    if(k == 0) {
        k = 1;
        ubu[1] = 1;
        dijkstra(1);
        cout << prec[1][n];
        return 0;
    }
    for(int i = 1; i <= k; i++)
        dijkstra(i);
    cout << solve();
    return 0;
}
```
