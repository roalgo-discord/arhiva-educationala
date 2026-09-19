---
id: OJI-2020-X-leftmax
title: Soluția problemei leftmax (OJI 2020, clasa a X-a)
problem_id: 929
authors: [tamionv]
prerequisites:
    - stack
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2020/10.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2020/10.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2020/10.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>
#include <stack>

using namespace std;
const int NMAX = 100002;
const int MOD = 1000000007;
using ll = long long;

ifstream cin("leftmax.in");
ofstream cout("leftmax.out");

int v[NMAX];
int st[NMAX], dr[NMAX];
stack <int> s; ///pt NGE
ll gauss(ll x) {
    return x * (x + 1) / 2;
}
int main()
{
    int n;
    cin >> n;
    for(int i = 1; i <= n; i++) {
        cin >> v[i];
    }
    s.push(1); ///al catelea nr e > in st
    for(int i = 2; i <= n; i++) {
        while(!s.empty() && v[s.top()] < v[i])
            s.pop();
        if(!s.empty())
            st[i] = s.top();
        s.push(i);
    }
    while(!s.empty())
        s.pop();
    s.push(n); ///si acum in dr
    for(int i = n - 1; i >= 1; i--) {
        while(!s.empty() && v[s.top()] < v[i])
            s.pop();
        if(!s.empty())
            dr[i] = s.top();
        s.push(i);
    }
    for(int i = 1; i <= n; i++) {
        if(dr[i] == 0)
            dr[i] = n + 1;
    }

    ll ans = n % MOD;
    for(int i = 1;  i <= n; i++) {
        ll l = i - st[i] - 1, r = dr[i] - i - 1;
        if(r <= 0)
            continue;
        if(l <= r)
            ans = (ans + gauss(r) + r - gauss(r - l)) % MOD;
        else if(l > r)
            ans = (ans + gauss(r) + r) % MOD;
    }
    cout << ans % MOD;
    return 0;
}
```
