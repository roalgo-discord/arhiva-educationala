---
id: OJI-2013-X-zona
title: Soluția problemei Zona (OJI 2013, clasa a X-a)
problem_id: 839
authors: [rvisinescu]
prerequisites:
    - lee
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2013/10/zona.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2013/10/zona.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2013/10/zona.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>

using namespace std;
const int NMAX = 53;
const int LMAX = 2503;

ifstream cin("zona.in");
ofstream cout("zona.out");

int dl[] = {0, -1, 0, 1, 0}; ///n e s v
int dc[] = {0, 0, 1, 0, -1}; ///1 2 3 4

int v[NMAX][NMAX];
bool f[NMAX][NMAX];
void change(int &a, int &b, int dir) {
    a += dl[dir];
    b += dc[dir];
}
int rest[LMAX];
int main()
{
    int n, l, x, y, dir;
    cin >> x >> y >> n >> l;
    int a = x, b = y; ///coltul dr jos = (x, y)
    int cnt = 0, arie = 0;
    f[a][b] = 1;
    for(int z = 0; z < l; z++) {
        cin >> dir;
        cnt++;
        change(a, b, dir);

        if(f[a][b] == 0) { ///cer1
            v[a][b] = cnt;
            f[a][b] = 1;
        }
        else
            cout << cnt - v[a][b] << '\n';

        arie += (b - y) * a; ///cer2, shoelace
        rest[cnt] = arie;

        x = a, y = b;
    }
    cout << abs(arie - rest[v[a][b]]);
    return 0;
}
```
