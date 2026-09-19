---
id: OJI-2017-XI-XII-permutare
title: Soluția problemei permutare (OJI 2017, clasele XI-XII)
problem_id: 28
authors: [zoltan]
prerequisites:
    - ad-hoc
    - intro-combinatorics
tags:
    - OJI
    - clasa XI-XII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2017/11-12/permutare.txt).

<div class="editorial-text" markdown>

```text
Problema permutare
autor prof. Szabo Zoltan, Liceul Tehnologic "Petru Maior" Reghin

Pentru simplitate "permutarea dubla de trei ori în crestere" o vom numi "permutare".
Prin definitia permutarii observam ca pentru fiecare element din a doua secventa, exista un element corespunzator din prima secventa cu valoare mai mica.
Astfel daca pentru fiecare permutare construim un sir de caractere in care pe pozitiile indicate de elementele primei secvente punem caracterul '(' iar pentru pozitiile indicate de elementele celei de a doua secvente punem caracterul ')', obtinem o parantezare formata din n perechi de paranteze.

Ordinea lexicografica a tuturor parantezarilor coincide cu cea a permutarilor.

Problema se poate rezolva cu programare dinamica bazata pe formula de recurenta
     P(i,j)=P(i-1,j)+P(i,j-1)

Reconstruirea solutiei porneste de la linia n catre linia 1 in matricea triunghiulara P.

Complexitatea unei cautari este O(n^2).
```

</div>

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;
ifstream f("permutare.in");
ofstream g("permutare.out");
int hmq;
long long dp[2002][1002], sp[1002][2002];
struct tq {
    int tip, n, poz, pi;
    vector<int> v;
};
tq v[2002];
struct sol {
    int pi;
    int sol;
    vector<int> v;
};
sol v2[2002];
bool gut[2002];
bool cmp(tq a, tq b) { return a.n < b.n; }
bool cmp2(sol a, sol b) { return a.pi < b.pi; }
void pd(int nr) {
    for (int i = 1; i < nr; ++i)
        for (int j = 1; j < 505; ++j)
            dp[i][j] = 0;
    for (int i = 1; i <= 2 * nr - 1; ++i)
        dp[i][1] = 1, sp[1][i] = 1 + sp[1][i - 1];
    int st = 1;
    for (int i = 2; i <= nr; ++i) {
        int jmax = 0;
        for (int j = st; (2 * nr - 1) - 2 * (i - 2) >= j; ++j) {
            ++jmax;
            dp[j][i] = sp[i - 1][(2 * nr - 1) - 2 * (i - 2)] - sp[i - 1][j];
            if (dp[j][i] > 2e9)
                dp[j][i] = 1e9 + 1;
            sp[i][j] = sp[i][j - 1] + dp[j][i];
        }
        while (dp[st][i] > 1e9)
            ++st;
    }
}
int main() {
    while (f >> v[++hmq].tip) {
        f >> v[hmq].n;
        v[hmq].pi = hmq;
        if (v[hmq].tip == 1)
            f >> v[hmq].poz;
        else
            for (int i = 1; i <= 2 * v[hmq].n; ++i) {
                int nr;
                f >> nr;
                if (i <= v[hmq].n)
                    v[hmq].v.push_back(nr);
            }
    }
    --hmq;
    sort(v + 1, v + hmq + 1, cmp);
    for (int i = 1; i <= hmq; ++i) {
        if (v[i].n != v[i - 1].n)
            pd(v[i].n);
        v2[i].pi = v[i].pi;
        if (v[i].tip == 1) {
            int poz1 = 1;
            int len = v[i].n;
            memset(gut, 0, sizeof(gut));
            while (len) {
                while (dp[poz1][len] && dp[poz1][len] < v[i].poz)
                    v[i].poz -= dp[poz1][len], ++poz1;
                v2[i].v.push_back(poz1);
                gut[poz1] = 1;
                --len;
                ++poz1;
            }
            for (int j = 1; j <= 2 * v[i].n; ++j)
                if (!gut[j])
                    v2[i].v.push_back(j);
        } else {
            int poz = 1;
            v2[i].sol = 1;
            for (int j = 0; j < v[i].n; ++j) {
                while (v[i].v[j] > poz)
                    v2[i].sol += dp[poz][v[i].n - j], ++poz;
                ++poz;
            }
        }
    }
    sort(v2 + 1, v2 + hmq + 1, cmp2);
    for (int i = 1; i <= hmq; ++i) {
        if (v2[i].v.size())
            for (int j = 0; j < v2[i].v.size(); ++j)
                g << v2[i].v[j] << " ";
        else
            g << v2[i].sol;
        g << '\n';
    }
    return 0;
}
```
