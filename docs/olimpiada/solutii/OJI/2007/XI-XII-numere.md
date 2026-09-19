---
id: OJI-2007-XI-XII-numere
title: Soluția problemei numere (OJI 2007, clasele XI-XII)
problem_id: 47
authors: [ivieru]
prerequisites:
    - basic-dp
tags:
    - OJI
    - clasa XI-XII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2007/11-12/numere.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2007/11-12/numere.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2007/11-12/numere.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
#define mod 9973
using namespace std;
ifstream fin("numere.in");
ofstream fout("numere.out");
int n, m, i, cifra, j;
int dp[9001];
vector<int> v;
int main()
{
    fin >> n >> m;
    for (i = 1; i * i <= m; i++){
        if (m % i == 0){
            v.push_back(i);
            if (m / i != i)
                v.push_back(m / i);
        }
    }
    sort(v.begin(), v.end());
    for (i = 1; i <= 9; i++)
        dp[i] = 1;
    for (i = 2; i <= n; i++){
        for (j = v.size() - 1; j >= 0; j--){
            for (cifra = 9; cifra >= 2; cifra--){
                if (v[j] % cifra == 0){
                    dp[v[j]] = (dp[v[j]] + dp[v[j] / cifra]) % mod;
                }
            }
        }
    }
    fout << dp[m];
    return 0;
}
```
