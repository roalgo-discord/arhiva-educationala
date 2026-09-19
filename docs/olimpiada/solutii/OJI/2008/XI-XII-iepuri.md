---
id: OJI-2008-XI-XII-iepuri
title: Soluția problemei iepuri (OJI 2008, clasele XI-XII)
problem_id: 45
authors: [ipopa]
prerequisites:
    - tree-dp
tags:
    - OJI
    - clasa XI-XII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2008/11-12/iepuri.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2008/11-12/iepuri.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2008/11-12/iepuri.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>
#include <vector>

using namespace std;
const int NMAX = 100;
const int MOD = 30011;
using ll = long long;

ifstream cin("iepuri.in");
ofstream cout("iepuri.out");

int k, root;
vector <vector <int>> v;
int grad[NMAX + 2];
ll dp[NMAX + 2][NMAX + 2]; ///dp[i][j] - pt omul i, nr de moduri a.i. el mananca fix j morcovi
ll sp[NMAX + 2][NMAX + 2]; ///dp[i][j] - pt omul i, nr de moduri a.i. el mananca max j morcovi
int tata[NMAX + 2];

void dfs(int start) {
    bool ok = 0;
    for(int i = 1; i <= k; i++)
        dp[start][i] = 1;
    for(auto nod : v[start]) {
        if(nod == tata[start])
            continue;
        ok = 1;
        tata[nod] = start;
        dfs(nod);
        for(int i = 1; i <= k; i++)
            dp[start][i] = (dp[start][i] * sp[nod][i + 1]) % MOD;
    }
    if(!ok) { ///frunza
        for(int i = 1; i <= k; i++)
            sp[start][i] = k - i + 1;
        return;
    }
    sp[start][k] = dp[start][k];
   for(int i = k - 1; i >= 1; i--)
        sp[start][i] = (sp[start][i + 1] + dp[start][i]) % MOD;
}

int main() {
    int n;
    cin >> n >> k;
    v.resize(n + 1);
    for(int i = 1; i < n; i++) {
        int a, b;
        cin >> a >> b;
        v[a].push_back(b);
        grad[b]++;
    }
    for(int i = 1; i <= n; i++) {
        if(!grad[i]) {
            root = i;
            break;
        }
    }
    dfs(root);
    cout << sp[root][1];
    return 0;
}
```
