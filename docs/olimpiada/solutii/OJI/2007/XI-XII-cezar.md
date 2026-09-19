---
id: OJI-2007-XI-XII-cezar
title: Soluția problemei cezar (OJI 2007, clasele XI-XII)
problem_id: 48
authors: [rpintea]
prerequisites:
    - tree-1
    - shortest-path
    - stl
tags:
    - OJI
    - clasa XI-XII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2007/11-12/cezar.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2007/11-12/cezar.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2007/11-12/cezar.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>
#include <bitset>
#include <vector>
#include <queue>

using namespace std;
const int NMAX = 10000;

ifstream cin("cezar.in");
ofstream cout("cezar.out");

int sizee[NMAX + 2]; ///'size-ul' frunzei, din care scoatem
int grad[NMAX + 2];
bitset <NMAX> viz;
vector <vector <int>> v;

struct prio{
    int nod, cost;
    bool operator <(const prio& rhs) const {
        return cost > rhs.cost;
    }
};
priority_queue <prio> pq;
int main() {
    int n, m, k;
    cin >> n >> k;
    v.resize(n + 1);
    for(int i = 1; i < n; i++) {
        int a, b;
        cin >> a >> b;
        v[a].push_back(b);
        v[b].push_back(a);
        grad[a]++, grad[b]++;
    }
    for(int i = 1; i <= n; i++) {
        sizee[i] = 1;
        if(grad[i] == 1)
            pq.push({i, 1});
    }
    k = n - 1 - k; ///alea de le ADUNAM
    int ans = 0;
    while(k--) {
        prio now = pq.top();
        pq.pop();
        viz[now.nod] = 1;
        ans += now.cost; ///STERGEM muchia
        for(auto nod : v[now.nod]) {
            if(!viz[nod]) {
                grad[nod]--;
                sizee[nod] += now.cost; ///ca se adauga 'tatalui' oricum
                if(grad[nod] == 1) { ///e si el frunza
                    pq.push({nod, sizee[nod]});
                }
                break; ///ca e doar una
            }
        }
    }
    cout << ans;
    return 0;
}
```
