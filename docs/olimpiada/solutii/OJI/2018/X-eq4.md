---
id: OJI-2018-X-eq4
title: Soluția problemei eq4 (OJI 2018, clasa a X-a)
problem_id: 901
authors: [ciurea]
prerequisites:
    - expression-evaluation
    - stack
    - binary-search
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2018/10/eq4.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2018/10/eq4.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2018/10/eq4.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>
#include <algorithm>
#include <vector>
#include <unordered_map>

using namespace std;
using ll = long long;

ifstream cin("eq4.in");
ofstream cout("eq4.out");

bool numar(char ch) {
    if('0' <= ch && ch <= '9')
        return true;
    return false;
}
bool litera(char ch) {
    if('a' <= ch && ch <= 'z')
        return true;
    return false;
}
int st, dr;
ll e;
ll ans = 0;
ll f[6];
vector <ll> v;

unordered_map <ll, int> umap;

int main()
{
    int cer;
    ll add = 0;
    string s;
    cin >> cer >> s >> st >> dr >> e;

    int i = 0;
    while(i < s.size()) {
        int semn = -1;
        if(s[i] == '+')
            semn = 1;
        i++;
        ll nr = 0;
        bool ok = false;
        while(i < s.size() && numar(s[i])) {
            nr = nr * 10 + (s[i] - '0');
            i++;
            ok = true;
        }
        if(ok == false)
            nr = 1;
        nr *= semn;
        if(i == s.size() || !litera(s[i]))
            add += nr;
        else {
            if(s[i] == 't')
                f[4] += nr;
            else
                f[s[i] - 'x' + 1] += nr;
            i++;
        }
    }
    if(cer == 1) {
        cout << f[1] + f[2] + f[3] + f[4] + add;
        return 0;
    }
    e -= add;
    for(int i = 1; i <= 4; i++) {
        if(f[i] != 0)
            v.push_back(f[i]);
    }
    sort(v.begin(), v.end());
    if(v.size() == 1) ///O(1)
        ans = 1;
    else if(v.size() == 2) { ///1 000
        for(i = st; i <= dr; i++) {
            ll rez = e - 1LL * i * v[0];
            if(rez % v[1] == 0) {
                int nr = rez / v[1];
                if(st <= nr && nr <= dr)
                    ans++;
            }
        }
    }
    else if(v.size() == 3) {
        for(i = st; i <= dr; i++) { ///1 000 000
            for(int j = st; j <= dr; j++) {
                ll rez = e - 1LL * (i * v[0] + j * v[1]);
                if(rez % v[2] == 0) {
                    int nr = rez / v[2];
                    if(st <= nr && nr <= dr) ///NU UITA DE INTERVAL!!!
                        ans++;
                }
            }
        }
    }
    else { ///toate 4 nr
        for(i = st; i <= dr; i++) { ///calc pt x si y
            for(int j = st; j <= dr; j++) {
                ll E = e - 1LL * (i * v[0] + j * v[1]);
                umap[E]++;
            }
        }
        for(int i = st; i <= dr; i++) { ///calc pt z si t
            for(int j = st; j <= dr; j++) {
                ll nr = i * v[2] + j * v[3];
                if(umap.find(nr) != umap.end()) ///si check dc e
                    ans += umap[nr];
            }
        }
    }
    for(i = v.size() + 1; i <= 4; i++)
        ans *= (dr - st + 1);
    cout << ans;
    return 0;
}
/*
50 000 000
*/
```
