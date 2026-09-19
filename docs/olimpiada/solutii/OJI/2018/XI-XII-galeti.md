---
id: OJI-2018-XI-XII-galeti
title: Soluția problemei galeti (OJI 2018, clasele XI-XII)
problem_id: 23
authors: [panaete]
prerequisites:
    - ad-hoc
    - constructive
tags:
    - OJI
    - clasa XI-XII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2018/11-12/galeti.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2018/11-12/galeti.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2018/11-12/galeti.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>
#include <queue>

using namespace std;
const int NMAX = 100000;
using ll = long long;

ifstream cin("galeti.in");
ofstream cout("galeti.out");

ll gauss[NMAX + 2];
void init() {
    for (int i = 1; i <= NMAX; i++)
        gauss[i] = gauss[i - 1] + i;
}
vector<pair<int, int>> ans;
int v[NMAX + 2];
int cate[NMAX + 2]; /// cate intra in el
queue<int> q;
int main() {
    init();
    int n;
    ll sum;
    cin >> n >> sum;
    int ult = 1;
    for (int i = 2; i <= n; i++) {     /// cel pe care il procesam acum
        if (gauss[n - i] + 1 >= sum) { /// ne descurcam si dc nu o folosim pe asta
            sum--;
            ans.push_back({i, ult});
        } else {
            sum -= (n - i + 1);      /// le varsam pe toate in ea
            ans.push_back({i, ult}); /// ca le mutam in unde era nevoie de ele
            ult = i;
        }
    }
    for (auto x : ans) {
        v[x.first] = x.second;
        cate[x.second]++;
    }
    for (int i = 1; i <= n; i++) {
        if (!cate[i])
            q.push(i);
    }
    while (!q.empty()) {
        int now = q.front();
        q.pop();
        if (v[now] == 0)
            break;
        cout << now << " " << v[now] << '\n';
        cate[v[now]]--;
        if (!cate[v[now]])
            q.push(v[now]);
    }
    return 0;
}
```
