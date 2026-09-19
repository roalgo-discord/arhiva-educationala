---
id: OJI-2021-XI-XII-bob
title: Soluția problemei Bob (OJI 2021, clasele XI-XII)
problem_id: 81
authors: [geniucos]
prerequisites:
    - basic-dp
tags:
    - OJI
    - clasa XI-XII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2021/11-12.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2021/11-12.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2021/11-12.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: IvanAndrei (kilonova)
#include <iostream>
#include <string>

using namespace std;

const long long max_size = 2e5 + 1, max_pachete = 21, mod = 1e9 + 7;

long long dpmx[max_size], dp[max_size], ult[max_pachete];

void solve1 ()
{
    long long n, k;
    cin >> n >> k;
    for (long long i = 1; i <= k; i++)
    {
        ult[i] = 0;
    }
    for (long long i = 0; i <= n; i++)
    {
        dp[i] = 0;
    }
    for (long long i = 1; i <= n; i++)
    {
        long long mn = mod;
        string s;
        cin >> s;
        s = '$' + s;
        for (long long j = 1; j <= k; j++)
        {
            if (s[j] == '1')
            {
                ult[j] = i;
            }
            mn = min(mn, ult[j]);
        }
        if (mn == 0)
        {
            continue;
        }
        if (dp[i - 1] < dp[mn - 1] + 1)
        {
            dp[i] = dp[mn - 1] + 1;
        }
        else
        {
            dp[i] = dp[i - 1];
        }
    }
    cout << dp[n] << '\n';
}

void solve2 ()
{
    long long n, k;
    cin >> n >> k;
    for (long long i = 0; i <= k; i++)
    {
        ult[i] = 0;
    }
    for (long long i = 0; i <= n; i++)
    {
        dpmx[i] = 0;
        dp[i] = 1;
    }
    /// pl eu acum am realizat ca am nevoie si de max
    long long ind = 0;
    for (long long i = 1; i <= n; i++)
    {
        long long mn = mod;
        string s;
        cin >> s;
        s = '$' + s;
        for (long long j = 1; j <= k; j++)
        {
            if (s[j] == '1')
            {
                ult[j] = i;
            }
            mn = min(mn, ult[j]);
        }
        if (mn == 0)
        {
            continue;
        }
        if (dpmx[i - 1] < dpmx[mn - 1] + 1)
        {
            dpmx[i] = dpmx[mn - 1] + 1;
            dp[i] = dp[mn - 1];
        }
        else
        {
            dpmx[i] = dpmx[i - 1];
            dp[i] = (dp[i - 1] + dp[mn - 1]) % mod;
        }
        ind = mn - 1;
    }
    cout << dp[ind] << '\n';
}

signed main ()
{
    ios_base::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    long long c, t;
    cin >> c >> t;
    while (t--)
    {
        if (c == 1)
        {
            solve1();
        }
        else
        {
            solve2();
        }
    }
    return 0;
}
```
