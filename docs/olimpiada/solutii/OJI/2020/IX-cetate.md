---
id: OJI-2020-IX-cetate
title: Soluția problemei cetate (OJI 2020, clasa a IX-a)
problem_id: 917
authors: [iordachebi]
prerequisites:
    - partial-sums
    - sequences
tags:
    - OJI
    - clasa IX
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2020/09.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2020/09.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2020/09.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
#pragma GCC optimize("O3")
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

int c;
int n, m, k;
int mat[402][402];
ll sum[402][402];
ll maxsum = -(1LL << 60);
ll xa, ya, xb, yb;
int stk[402], st, dr;
int main() {
#ifdef fisier
    ifstream cin("cetate.in");
    ofstream cout("cetate.out");
#endif

    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    cin >> c;
    cin >> n >> m >> k;
    for (int i = 1; i <= n; ++i)
        for (int j = 1; j <= m; ++j) {
            cin >> mat[i][j];
            sum[i][j] = mat[i][j] + sum[i - 1][j] + sum[i][j - 1] - sum[i - 1][j - 1];
        }
    if (c == 1) {
        for (int i = k; i <= n; ++i)
            for (int j = k; j <= m; ++j) {
                ll val = sum[i][j] - sum[i - k][j] - sum[i][j - k] + sum[i - k][j - k];
                if (val > maxsum) {
                    maxsum = val;
                    xa = i - k + 1;
                    ya = j - k + 1;
                    xb = i;
                    yb = j;
                }
            }
    } else {
        for (int i = 1; i <= n; ++i)
            for (int j = i; j <= min(i + k - 1, n); ++j) {
                deque<int> d;
                d.pb(0);
                stk[1] = 0;
                st = dr = 1;
                for (int xx = 1; xx <= m; ++xx) {
                    if (xx - stk[st] > k)
                        ++st;
                    ll val = sum[j][xx] - sum[i - 1][xx] - sum[j][stk[st]] + sum[i - 1][stk[st]];
                    if (val > maxsum) {
                        maxsum = val;
                        xa = i;
                        ya = stk[st] + 1;
                        xb = j;
                        yb = xx;
                    } else {
                        if (val == maxsum) {
                            if ((i < xa) || (i == xa && stk[st] + 1 < ya) || (i == xa && stk[st] + 1 == ya && j < xb) || (i == xa && stk[st] + 1 == ya && j == xb && xx < yb)) {
                                xa = i;
                                ya = stk[st] + 1;
                                xb = j;
                                yb = xx;
                            }
                        }
                    }
                    while (st <= dr && sum[i - 1][xx] - sum[j][xx] > sum[i - 1][stk[dr]] - sum[j][stk[dr]])
                        --dr;
                    stk[++dr] = xx;
                }
            }
    }
    cout << maxsum << '\n';
    cout << xa << " " << ya << " " << xb << " " << yb << '\n';
    return 0;
}

```
