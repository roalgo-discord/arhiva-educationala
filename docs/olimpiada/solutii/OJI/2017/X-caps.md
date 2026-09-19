---
id: OJI-2017-X-caps
title: Soluția problemei Caps (OJI 2017, clasa a X-a)
problem_id: 887
authors: [gelumnt]
prerequisites:
    - divide-et-impera
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2017/10/caps.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2017/10/caps.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2017/10/caps.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>
#include <algorithm>
#include <bitset>
#include <map>

using namespace std;
using ll = long long;
using ull = unsigned long long;
const int NMAX = 100002;

ifstream cin("caps.in");
ofstream cout("caps.out");

ll put[32], ap[32]; ///put adica nr de ch, ap adica cate SIRURI
int init(int n) {
    put[0] = 1; ap[0] = 1;
    put[1] = 4; ap[1] = 4; ///inm ap cu 2 pt siruri impreuna
    for(int i = 2; i <= 30; i++) {
        put[i] = put[i - 1] * 4;
        ap[i] = ap[i - 1] * 4;
        ull nr = put[i] * n;
        if(nr > 1e18)
            return i;
    }
}
string s;
int n, m;
map <char, char> caps;
void calcinv() { ///ca sa avem deja precalc cand dam switch de la o lit mica/mare
    int difcaps = 'a' - 'A';
    for(int i = 0; i < s.size(); i++) {
        if(caps.find(s[i]) != caps.end())
            continue;
        if('a' <= s[i] && s[i] <= 'z') {
            caps[s[i]] = (char)(s[i] - difcaps);
            caps[char(s[i] - difcaps)] = s[i];
        }
        else {
            caps[s[i]] = (char)(s[i] + difcaps);
            caps[(char)(s[i] + difcaps)] = s[i];
        }
    }
}

int sp[NMAX][54];
void numara() { ///numara nr de ap pt FIEC caracter la fiec poz din s
    for(int i = 0; i < s.size(); i++) {
        if(i > 0) {
            for(int j = 1; j <= 52; j++)
                sp[i][j] = sp[i - 1][j];
        }
        if('A' <= s[i] && s[i] <= 'Z')
            sp[i][s[i] - 'A' + 1]++;
        else
            sp[i][s[i] - 'a' + 27]++;
    }
}

int main()
{
    cin >> n >> m >> s;
    calcinv();
    numara();
    int maxx = init(n);
    ll q;
    for(int i = 1; i <= m; i++) {
        cin >> q;
        ll rest = q % n; ///a cat-a lit din nr (0 --> ult)
        ll nrap = ((q - 1) / n) + 1; ///deci noi suntem in nrap + 1
        ll ans = 0;
        char lit = s[(rest + n - 1) % n]; ///mommentan nu ne intereseaza dc e A/a, luam orig

        int nrlit, nrcaps;
        if('A' <= lit && lit <= 'Z') {
            nrlit = lit - 'A' + 1;
            nrcaps = nrlit + 26;
        }
        else {
            nrlit = lit - 'a' + 27;
            nrcaps = nrlit - 26;
        }
        int pos = 0;
        int inv = 0; ///de cate ori e invers
        for(int j = 30; j >= 1; j--) {
            if(ap[j] < nrap) {
                pos = j;
                break;
            }
        }
        pos++;
        while(pos > 0) {
            if(pos == 1) {
                ll a = sp[s.size() - 1][nrlit]; ///cele LA FEL
                ll b = sp[s.size() - 1][nrcaps]; ///dif
                if(nrap == 1)
                    ;
                else if(nrap == 2) {
                    ans += b;
                    inv = (inv + 1) % 2;
                    nrap--;
                }
                else if(nrap == 3) {
                    ans += (a + b);
                    inv = (inv  + 1) % 2;
                    nrap = 1;
                }
                else if(nrap == 4) {
                    ans += (a + 2 * b);
                    nrap = 1;
                }
                pos--;
                continue;
            }
            ll a = (ap[pos - 1] / 2) * sp[s.size() - 1][nrlit]; ///cele LA FEL
            ll b = (ap[pos - 1] / 2) * sp[s.size() - 1][nrcaps]; ///dif
            if(nrap <= ap[pos - 1]) { ///e ult din urm
                ;
            }
            else if(nrap <= 2 * ap[pos - 1]) { ///dif
                ans += (a + b);
                inv = (inv + 1) % 2;
                nrap -= ap[pos - 1];
            }
            else if(nrap <= 3 * ap[pos - 1]) { ///dif, la fel
                ans += 2 * (a + b);
                inv = (inv + 1) % 2;
                nrap -= (2 * ap[pos - 1]);
            }
            else if(nrap <= 4 * ap[pos - 1]) {///la fel, dif, dif
                ans += 3 * (a + b);
                nrap -= (3 * ap[pos - 1]);
            }
            pos--;
        }
        ans += sp[(rest + n - 1) % n][nrlit];
        if(inv)
            cout << caps[lit] << " ";
        else
            cout << lit << " ";
        cout << ans << '\n';
    }
    return 0;
}
```
