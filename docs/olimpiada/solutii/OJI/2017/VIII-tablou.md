---
id: OJI-2017-VIII-tablou
title: Soluția problemei tablou (OJI 2017, clasa a VIII-a)
problem_id: 885
authors: [cminca]
prerequisites:
    - simulating-solution
    - ad-hoc
tags:
    - OJI
    - clasa VIII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2017/08/tablou.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2017/08/tablou.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2017/08/tablou.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <fstream>
#include <bitset>

using namespace std;
const int NMAX = 20002;
const int INF = 21e8;

ifstream cin("tablou.in");
ofstream cout("tablou.out");

bool l[NMAX], c[NMAX];
int main()
{
    int cer, n;
    cin >> cer >> n;
    if(cer == 1) { ///query-uri, schimbari
        int a, k;
        char ch;
        cin >> k;
        for(int i = 1; i <= k; i++) {
            cin >> ch >> a;
            if(ch == 'L')
                l[a] = (l[a] + 1) % 2;
            else
                c[a] = (c[a] + 1) % 2;
        }
        int cntl = 0, cntc = 0;
        for(int i = 1; i <= n; i++) {
            cntl += l[i];
            cntc += c[i];
        }
        cout<<n * n ///toate celulele
         - n * (cntc + cntl) ///cele afectate de schimbari
        + (2 * cntc * cntl); ///cel comune dintre ele, care au fost scazute de 2 ori
    }

    else if(cer == 2) {
        int z;
        int minn = INF;
        cin >> z; ///nr de neg = n * (cntc + cntl) - 2 * cntc * cntl

        if(z % n == 0)
            minn = z / n;

        for(int l = 0; l < n; l++) { ///alternam prin TOATE nr posibile de lin
            /// --> n * cntl + cntc * (n - cntl) = z
            ///extragi col din fm

            if(z != l * n && n != 2 * l && (z - (l * n)) % (n - 2 * l) == 0) {
                int col = (z - (l * n)) / (n - 2 * l);
                if(0 <= col && col <= n)
                    minn = min(minn, l + col);//, cout << l << " " << col << '\n';
            }
        }
        if(minn == INF)
            cout << 0;
        else
            cout << minn;
    }
    return 0;
}
```
