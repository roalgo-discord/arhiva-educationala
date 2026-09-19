---
id: OJI-2016-XI-XII-summax
title: Soluția problemei summax (OJI 2016, clasele XI-XII)
problem_id: 30
authors: [zoltan]
prerequisites:
    - basic-dp
    - matrices
tags:
    - OJI
    - clasa XI-XII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2016/11-12/summax.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2016/11-12/summax.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2016/11-12/summax.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>
#include <vector>

using namespace std;
const int NMAX = 2000;
const int INF = 2000000000;
using ll = long long;

ifstream cin("summax.in");
ofstream cout("summax.out");

vector <vector <int>> v, dp;
int main()
{
    int cer, n, st, dr;
    cin >> cer >> n >> st >> dr;
    v.resize(n + 2);
    dp.resize(n + 2);
    for(int i = 1; i <= n; i++) {
        v[i].resize(i + 2);
        dp[i].assign(i + 2, 0);
        for(int j = 1; j <= i; j++)
            cin >> v[i][j];
    }
    ///faci dp-ul (si sp din v)
    for(int j = 1; j <= n; j++)
        dp[n][j] = 1;
    for(int i = n - 1; i >= 1; i--) {
        for(int j = 1; j <= i; j++) {
            if(v[i + 1][j] > v[i + 1][j + 1]) {
                dp[i][j] = dp[i + 1][j];
                v[i][j] += v[i + 1][j];
            }
            else if(v[i + 1][j + 1] > v[i + 1][j]) {
                dp[i][j] = dp[i + 1][j + 1];
                v[i][j] += v[i + 1][j + 1];
            }
            else { ///adunam
                v[i][j] += v[i + 1][j];
                ll nou = (ll)dp[i + 1][j] + (ll)dp[i + 1][j + 1];
                //cout << "ayoo " << i << " " << j << " " << nou << '\n';
                if(nou > INF)
                    nou = INF + 1;
                dp[i][j] = nou;
            }
        }
    }
    if(cer == 1) {
        cout << dp[1][1];
        return 0;
    }
    for(int id = st; id <= dr; id++) {
        cout << "1 ";
        ll add = 0, pos = 1;
        for(int i = 2; i <= n; i++) {
            if(v[i][pos] > v[i][pos + 1]) { ///ne ducem in st
                cout << pos << " ";
            }
            else if(v[i][pos + 1] > v[i][pos]) { ///ne ducem in dr
                cout << pos + 1 << " ";
                pos++;
            }
            else { ///merg ambele
                ll nou = add + (ll)dp[i][pos];
                if(id <= nou) { ///suntem bine pe st
                    cout << pos << " ";
                }
                else { ///ne ducem in dr
                    cout << pos + 1 << " ";
                    add += dp[i][pos]; ///adaugam st, sa ne ramana
                    pos++;
                }
            }
        }
        cout << '\n';
    }
    return 0;
}
```
