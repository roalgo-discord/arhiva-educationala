---
id: OJI-2017-IX-ace
title: Soluția problemei ace (OJI 2017, clasa a IX-a)
problem_id: 876
authors: [odumitrascu]
prerequisites:
    - divisibility
    - basic-geometry
tags:
    - OJI
    - clasa IX
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2017/09/ace.txt).

<div class="editorial-text" markdown>

```text
Autor prof Octavian Dumitrascu Colegiul National Dinicu Golescu Campulung

Solutia 1
Solutia se bazeaza pe cateva observatii matematice.
Daca suntem in punctul N si M va vedea acul de coordonate x si y daca cmmdc(N-x,M-y) = 1 - in acest caz vede acul in totalitate altfel poate vedea varful acului x,y daca pe directia determinata de cele doua puncte nu  se gaseste un ac "prea inalt" pentru cele doua puncte
Pentru acest caz se verifica cu asemanarea triunghiurilor o relatie care determina posibilitatea de a fi vazut sau nu.
Pentru o abordare bruta a acestor idei nu se obtine punctaj maxim.
Punctajul maxim se obtine parcurgand matricea de la punctul N,M si mergand in dupa un sablon (l,c)
(adica (N,M) -> (N-l,M-c) ->(N-2l,M-2c)..etc) si mentinand la fiecare moment o inaltime maxima care determina posibilitatea vizualizarii sau nu.
Solutia optima are complexitate O(NxM).
```

</div>

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>
#include <iomanip>
#include <cmath>

using namespace std;
const int NMAX = 1002;
using ld = long double;
#define double ld

ifstream cin("ace.in");
ofstream cout("ace.out");

int v[NMAX][NMAX];
bool f[NMAX][NMAX]; ///vizitatele
signed main()
{
    int cer, n, m;
    cin >> cer >> n >> m;
    for(int i = 1; i <= n; i++)
        for(int j = 1; j <= m; j++)
            cin >> v[i][j];

    int cnt = 0, nr = 0;
    double maxx = -1;
    for(int i = n - 1; i >= 1; i--) { ///vest
        f[i][m] = 1, nr++;
        double ip = sqrt((n - i) * (n - i) + (v[i][m] * v[i][m]));
        if((double)v[i][m] / ip > maxx) {
            cnt++;
            maxx = (double)v[i][m] / ip;
        }
    }
    maxx = -1;
    for(int j = m - 1; j >= 1; j--) { ///nord
        f[n][j] = 1, nr++;
        double ip = sqrt((m - j) * (m - j) + (v[n][j] * v[n][j]));
        if((double)v[n][j] / ip > maxx) {
            cnt++;
            maxx = (double)v[n][j] / ip;
        }
    }
    if(cer == 1) {
        cout << cnt;
        return 0;
    }

    for(int i = n - 1; i >= 1; i--) {
        for(int j = m - 1; j >= 1; j--) {
            if(nr == n * m - 1)
                break;
            if(f[i][j] == 1)
                continue;

            maxx = v[i][j];
            cnt++;
            int difN = n - i, difM = m - j;
            int baza = 1; ///de cate ori e scaderea, deci basically de cate ori inm cateta

            for(int x = 1; i - x * difN >= 1 && j - x * difM >= 1; x++) {
                int ci = i - x * difN, cj = j - x * difM;

                ///comp tg --> v[ci][cj] / (x + 1) > maxx / baza,
                ///si le inv ca sa nu bagam double de 1000 de ori
                if(v[ci][cj] * baza > maxx * (x + 1)) { ///tg
                    if(f[ci][cj] == 0) ///ca sa nu adunam de mai multe ori
                        cnt++;
                    maxx = v[ci][cj];
                    baza = x + 1;
                }
                f[ci][cj] = 1;
            }
        }
        if(nr == n * m - 1)
            break;
    }
    cout << cnt;
    return 0;
}
```
