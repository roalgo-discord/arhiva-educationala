---
id: OJI-2019-X-pif
title: Soluția problemei pif (OJI 2019, clasa a X-a)
problem_id: 914
authors: [mdragan]
prerequisites:
    - ad-hoc
    - partial-sums
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2019/10/pif.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2019/10/pif.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2019/10/pif.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>

using namespace std;
const int MOD = 1234567;
const int NMAX = 1e6;
using ll = long long;

ifstream cin("pif.in");
ofstream cout("pif.out");

ll v[NMAX + 2], t[NMAX + 2]; /// nr de oameni care vor fi 'nascuti' la timpul i
ll spv[NMAX + 2], spt[NMAX + 2];
int main() {
    int n, k, nrv, nrt;
    cin >> n >> k >> nrv >> nrt;
    /// nrt < nrv
    if (nrv < nrt) {
        swap(nrv, nrt);
        v[0] = 1;
        spv[0] = 1;
    } else {
        t[0] = 1;
        spt[0] = 1;
    }

    int half = (k + 1) / 2, rest = k - half; /// half=mai multe, rest=mai putine
    ll ans = k;                              /// nr de oameni ne-activati

    /// init, ans = 1 (ca un singur om), dar el adauga k si il scadem si singur
    /// si pt ca for-ul de oameni incepe de la 1, il init deja cu k

    for (int i = 1; i <= n; i++) {
        /// tinerii au prioritate ca dau fapte bune mai repede

        /// t[i - nrt], t[i - 2 * nrt], ... t[i - (half * nrt)] --> half ca prio
        /// v[i - nrv], t[i - 2 * nrv], ... t[i - (half * nrv)] --> tot au prio

        /// si adunam, si scadem, ca e suma partiala

        t[i] += ((i - nrt >= 0) ? spt[i - nrt] : 0);                           /// spt[i - nrt]
        t[i] -= ((i - (half + 1) * nrt >= 0) ? spt[i - (half + 1) * nrt] : 0); /// spt[i - (half + 1) * nrt]
        t[i] += ((i - nrv >= 0) ? spv[i - nrv] : 0);                           /// spv[i - nrv]
        t[i] -= ((i - (half + 1) * nrv >= 0) ? spv[i - (half + 1) * nrv] : 0); /// spv[i - (half + 1) * nrv]

        t[i] %= MOD;
        if (t[i] < 0)
            t[i] += MOD;

        /// t[i - (half + 1) * nrt], t[i - (half + 2) * nrt], ... t[i - k * nrt]
        /// v[i - (half + 1) * nrv], v[i - (half + 2) * nrv], ... v[i - k * nrv]
        v[i] += ((i - (half + 1) * nrt >= 0) ? spt[i - (half + 1) * nrt] : 0); /// spt[i - (half + 1) * nrt
        v[i] -= ((i - (k + 1) * nrt >= 0) ? spt[i - (k + 1) * nrt] : 0);       /// spt[i - (k + 1) * nrt]
        v[i] += ((i - (half + 1) * nrv >= 0) ? spv[i - (half + 1) * nrv] : 0); /// spv[i - (half + 1) * nrv
        v[i] -= ((i - (k + 1) * nrv >= 0) ? spv[i - (k + 1) * nrv] : 0);       /// spv[i - (k + 1) * nrv]

        v[i] %= MOD;
        if (v[i] < 0)
            v[i] += MOD;

        spt[i] = t[i]; /// updatam sp ca suma TUTUROR nr care au ac mod la nrt / nrv
        spt[i] += ((i - nrt >= 0) ? spt[i - nrt] : 0);
        spt[i] %= MOD;

        spv[i] = v[i];
        spv[i] += ((i - nrv >= 0) ? spv[i - nrv] : 0);
        spv[i] %= MOD;

        ans = (ans + (v[i] + t[i]) * (k - 1)) % MOD; /// fiec adauga k la solutie si se dezactiveaza pe sine
    }
    cout << ans;
    return 0;
}
```
