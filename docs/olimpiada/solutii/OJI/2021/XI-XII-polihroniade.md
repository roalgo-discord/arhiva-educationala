---
id: OJI-2021-XI-XII-polihroniade
title: Soluția problemei Polihroniade (OJI 2021, clasele XI-XII)
problem_id: 80
authors: [acconstantinescu]
prerequisites:
    - ad-hoc
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
#include <vector>

using namespace std;

const int max_size = 1e3 + 1;

string s[max_size];
int l[max_size], c[max_size];

void solve1 ()
{
    int n, nr1 = 0;
    cin >> n;
    for (int i = 1; i <= n; i++)
    {
        s[i].clear();
        s[i].push_back('$');
        for (int j = 1; j <= n; j++)
        {
            char ch;
            cin >> ch;
            s[i].push_back(ch);
            if (ch == '1')
            {
                nr1++;
            }
        }
    }
    for (int i = 1; i <= n; i++)
    {
        l[i] = (s[1][i] - '0');
        c[i] = (s[i][1] - '0');
    }
    int ln = 0, cl = 0;
    for (int i = 1; i <= n; i++)
    {
        bool ok = true;
        for (int j = 1; j <= n; j++)
        {
            if ((s[i][j] - '0') == l[j])
            {
                ok = false;
                break;
            }
        }
        if (ok)
        {
            ln++;
        }
        ok = true;
        for (int j = 1; j <= n; j++)
        {
            if ((s[j][i] - '0') == c[j])
            {
                ok = false;
                break;
            }
        }
        if (ok)
        {
            cl++;
        }
    }
    if (nr1 == n * n / 2 && ln == n / 2 && cl == n / 2)
    {
        cout << 1;
    }
    else
    {
       cout << 0;
    }
    cout << '\n';
}

void solve2 ()
{
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++)
    {
        s[i].clear();
        s[i].push_back('$');
        for (int j = 1; j <= n; j++)
        {
            char ch;
            cin >> ch;
            s[i].push_back(ch);
        }
    }
    for (int i = 1; i <= n; i++)
    {
        l[i] = (s[1][i] - '0');
        c[i] = (s[i][1] - '0');
    }
    int lnpar = 0, lnimp = 0, clpar = 0, climp = 0;
    for (int i = 1; i <= n; i++)
    {
        if (l[i] == 1)
        {
            if (i % 2 == 0)
            {
                lnpar++;
            }
            else
            {
                lnimp++;
            }
        }
        if (c[i] == 1)
        {
            if (i % 2 == 0)
            {
                clpar++;
            }
            else
            {
                climp++;
            }
        }
    }
    cout << min(lnpar, lnimp) + min(clpar, climp) << '\n';
}

void solve3 ()
{
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++)
    {
        s[i].clear();
        s[i].push_back('$');
        for (int j = 1; j <= n; j++)
        {
            char ch;
            cin >> ch;
            s[i].push_back(ch);
        }
    }
    for (int i = 1; i <= n; i++)
    {
        l[i] = (s[1][i] - '0');
        c[i] = (s[i][1] - '0');
    }
    int lnpar = 0, lnimp = 0, clpar = 0, climp = 0;
    for (int i = 1; i <= n; i++)
    {
        if (l[i] == 1)
        {
            if (i % 2 == 0)
            {
                lnpar++;
            }
            else
            {
                lnimp++;
            }
        }
        if (c[i] == 1)
        {
            if (i % 2 == 0)
            {
                clpar++;
            }
            else
            {
                climp++;
            }
        }
    }
    int ans = min(lnpar, lnimp) + min(clpar, climp);
    cout << ans << '\n';
    if (ans == 0)
    {
        return;
    }
    vector <int> v1, v2;
    if (lnpar <= lnimp)
    {
        for (int i = 1; i <= n; i++)
        {
            if (l[i] == 1 && i % 2 == 0)
            {
                v1.push_back(i);
            }
            if (l[i] == 0 && i % 2 == 1)
            {
                v2.push_back(i);
            }
        }
    }
    else
    {
        for (int i = 1; i <= n; i++)
        {
            if (l[i] == 1 && i % 2 == 1)
            {
                v1.push_back(i);
            }
            if (l[i] == 0 && i % 2 == 0)
            {
                v2.push_back(i);
            }
        }
    }
    for (int i = 0; i < v1.size(); i++)
    {
        cout << "C" << " " << v1[i] << " " << v2[i] << '\n';
    }
    v1.clear();
    v2.clear();
    if (clpar <= climp)
    {
        for (int i = 1; i <= n; i++)
        {
            if (c[i] == 1 && i % 2 == 0)
            {
                v1.push_back(i);
            }
            if (c[i] == 0 && i % 2 == 1)
            {
                v2.push_back(i);
            }
        }
    }
    else
    {
        for (int i = 1; i <= n; i++)
        {
            if (c[i] == 1 && i % 2 == 1)
            {
                v1.push_back(i);
            }
            if (c[i] == 0 && i % 2 == 0)
            {
                v2.push_back(i);
            }
        }
    }
    for (int i = 0; i < v1.size(); i++)
    {
        cout << "L" << " " << v1[i] << " " << v2[i] << '\n';
    }
}

int main ()
{
    int cer, t;
    cin >> cer >> t;
    while (t--)
    {
        if (cer == 1)
        {
            solve1();
        }
        if (cer == 2)
        {
            solve2();
        }
        if (cer == 3)
        {
            solve3();
        }
    }
    return 0;
}
```
