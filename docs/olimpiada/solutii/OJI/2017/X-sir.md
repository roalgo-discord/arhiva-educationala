---
id: OJI-2017-X-sir
title: Soluția problemei Șir (OJI 2017, clasa a X-a)
problem_id: 889
authors: [rpintea]
prerequisites:
    - combinatorics
    - intro-dp
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2017/10/sir.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2017/10/sir.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2017/10/sir.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>

using namespace std;
const int MOD = 20173333;
const int NMAX = 100000;
using ll = long long;

ifstream cin("sir.in");
ofstream cout("sir.out");

ll fact[2 * NMAX + 2];
void init() {
    fact[0] = 1;
    fact[1] = 1;
    for(int i = 2; i <= 2 * NMAX; i++) {
        fact[i] = (1LL * fact[i - 1] * i) % MOD;
    }
}

ll logexp(ll a, ll n) {
    ll p = 1;
    for(ll k = 1; k <= n; k <<= 1) {
        if((n & k))
            p *= a;
        a *= a;
        p %= MOD;
        a %= MOD;
    }
    return p;
}

ll comb(int n, int k) { ///stars and bars
    int x = n + k - 1, y = k - 1;
    n = x, k = y;
    ll a = fact[n];
    ll b = (fact[k] * fact[n - k]) % MOD;
    return (1LL * a * logexp(b, MOD - 2)) % MOD;
}

int sum[NMAX + 2], dp[NMAX + 2]; ///dp[i] - nr de pos cu i caract si limita r
int main()
{
    init();
    int cer;
    cin >> cer;
    if(cer == 1) {
        int cate, ult;
        cin >> cate >> ult;
        int x = cate - ult;
        cout << comb(x, ult);
    }
    else {
        int cate, maxr;
        cin >> cate >> maxr;
        sum[1] = 1;
        dp[1] = 1;
        for(int i = 2; i <= cate; i++) {
            if(i <= maxr) ///facem normalul
                dp[i] = dp[i - 1] * 2; ///se dubleaza ca fiec are 2 opt de fin
            else ///din tot adunat pana acm, cateva sunt mai de mult --> ult cf se poate sa
                dp[i] = (sum[i - 1] - sum[i - maxr - 1]); ///se fi tot dublat cam mult, si -

            dp[i] %= MOD;
            if(dp[i] < 0)
                dp[i] += MOD;
            sum[i] = sum[i - 1] + dp[i];
            sum[i] %= MOD;
        }
        cout << dp[cate];
    }
    return 0;
}
```
