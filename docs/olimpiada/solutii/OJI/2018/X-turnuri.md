---
id: OJI-2018-X-turnuri
title: Soluția problemei Turnuri (OJI 2018, clasa a X-a)
problem_id: 902
authors: [budau]
prerequisites:
    - stack
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2018/10/turnuri.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2018/10/turnuri.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2018/10/turnuri.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>
#include <algorithm>
#include <vector>
#include <set>

using namespace std;
const int NMAX = 100002;
using ll = long long;

ifstream cin("turnuri.in");
ofstream cout("turnuri.out");

struct height {
    int val, ind;
}h[NMAX];
bool cmp(height x, height y) {
    return x.val > y.val;
}

int v[NMAX];
ll ans[NMAX];
set <int> fin;
int main()
{
    int n;
    cin >> n;
    for(int i = 1; i <= n; i++) {
        cin >> v[i];
        h[i].val = v[i];
        h[i].ind = i;
    }
    sort(h + 1, h + n + 1, cmp);
    fin.insert(0);
    fin.insert(n + 1);
    for(int i = 1; i <= n; i++) {
        auto x = fin.lower_bound(h[i].ind);
        int dr = *x;
        x--;
        int st = *x;
        x++;
        int tot = (h[i].ind - st - 1) + (dr - h[i].ind - 1) + 1;
        ans[1] += tot;
        ans[h[i].ind] -= tot;
        ans[h[i].ind + 1] += tot;
        ans[h[i].ind]++;
        ans[h[i].ind + 1]--;
		
        if(st != 0) {
            x--; x--;
            int st2 = *x;
            ans[st] -= tot;
            ans[st + 1] += tot;
            ans[st] += (tot - (h[i].ind - st - 1) + (h[i].ind - st2 - 1));
            ans[st + 1] -= (tot - (h[i].ind - st - 1) + (h[i].ind - st2 - 1));
            x++; x++;
        }
        if(dr != n + 1) {
            x++;
            int dr2 = *x;
            ans[dr] -= tot;
            ans[dr + 1] += tot;
            ans[dr] += (tot - (dr - h[i].ind - 1) + (dr2 - h[i].ind - 1));
            ans[dr + 1] -= (tot - (dr - h[i].ind - 1) + (dr2 - h[i].ind - 1));
        }
        fin.insert(h[i].ind);
    }
    for(int i = 1; i <= n; i++) {
        if(i > 1)
            ans[i] += ans[i - 1];
        cout << ans[i] << '\n';
    }
    return 0;
}
```
