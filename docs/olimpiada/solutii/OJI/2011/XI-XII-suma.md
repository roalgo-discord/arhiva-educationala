---
id: OJI-2011-XI-XII-suma
title: Soluția problemei suma (OJI 2011, clasele XI-XII)
problem_id: 39
authors: [cminca]
prerequisites:
    - intro-dp
tags:
    - OJI
    - clasa XI-XII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2011/11-12/suma.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2011/11-12/suma.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2011/11-12/suma.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>
#include <vector>
#include <stack>

using namespace std;
const int NMAX = 63365;
const int MMAX = 57;
const int INF = NMAX * 100 + 2;

ifstream cin("suma.in");
ofstream cout("suma.out");

int niv[MMAX + 2], care[NMAX + 2];
int cost[NMAX + 2];
int dp[NMAX + 2], ult[NMAX + 2];
vector <int> vec;
int v[MMAX + 2], ans[MMAX + 2];

void recons(int i) {
    stack <int> s;
    s.push(i);
    while(ult[i]) {
        i = ult[i];
        s.push(i);
    }
    int pos = 1;
    while(!s.empty()) {
        v[pos++] = s.top();
        s.pop();
    }
}

int main() {
    ///build
    for(int i = 1; i <= MMAX; i++) {
        niv[i] = niv[i - 1] + i * i;
        for(int j = niv[i - 1] + 1; j <= niv[i]; j++)
            care[j] = i;
    }
    vec.resize(4);
    int n;
    cin >> n;
    for(int i = 1; i <= n; i++)
        cin >> cost[i];
    int m = care[n];
    for(int i = 1; i <= n; i++)
        dp[i] = INF;
    dp[1] = cost[1];
    for(int i = 1; i <= niv[m - 1]; i++) {
        int lev = care[i];
        int nr = i - niv[lev - 1]; ///al catelea de pe niv
        int lin = (nr - 1) / lev + 1;
        int col = (nr - 1) % lev + 1;

        int start = (lin - 1) * (lev + 1) + col + niv[lev];
        vec[0] = start, vec[1] = start + 1;
        vec[2] = start + (lev + 1), vec[3] = start + (lev + 1) + 1;
        for(auto x : vec) {
            if(dp[i] + cost[x] < dp[x] || (dp[i] + cost[x] == dp[x] && i < ult[x])) {
                dp[x] = dp[i] + cost[x];
                ult[x] = i;
            }
        }
    }
    int minn = INF;
    for(int i = niv[m - 1] + 1; i <= niv[m]; i++)
        minn = min(minn, dp[i]);

    cout << m << " " << minn << '\n';

    bool start = 0;
    for(int i = niv[m - 1] + 1; i <= niv[m]; i++) {
        if(dp[i] == minn) {
            recons(i);
            if(!start) {
                for(int j = 1; j <= m; j++)
                    ans[j] = v[j];
                start = 1;
            }
            else { ///comparam
                bool ok = 0;
                for(int j = 1; j <= m; j++) {
                    if(ans[j] < v[j])
                        break;
                    if(ans[j] > v[j]) {
                        ok = 1;
                        break;
                    }
                }
                if(ok) {
                    for(int j = 1; j <= m; j++)
                        ans[j] = v[j];
                }
            }
        }
    }
    for(int i = 1; i <= m; i++)
        cout << ans[i] << " ";
    return 0;
}
```
