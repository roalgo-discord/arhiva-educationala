---
id: OJI-2015-VIII-pavare
title: Soluția problemei pavare (OJI 2015, clasa a VIII-a)
problem_id: 861
authors: [dpopa]
prerequisites:
    - frequency-arrays
    - basic-math
tags:
    - OJI
    - clasa VIII
---
Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2015/08/pavare.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2015/08/pavare.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2015/08/pavare.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>
#include <cmath>

using namespace std;
const int NMAX = 31625; ///sqrt(maxN)

ifstream cin("pavare.in");
ofstream cout("pavare.out");

int f[NMAX]; ///de cate ori apare un nr in sir
int main()
{
    int cer, n, cnt = 0;
    cin >> cer >> n;
    int p = (int)sqrt(n); ///sa aflam sir max (dc sqrt? fa-ti pe foaie)
    n -= p * p; ///sa ne ramana DOAR elem ce apar o data

    for(int i = 1; i < p; i++) ///init
        f[i] += 2;
    cnt = 2 * (p - 1) + 1;
    f[p]++; ///nu stim dc p se repeta de o data/mai multe ori

    while(n > p) { ///dc ramasurile > p, repetam p-ul de max ori ca sa
        cnt++;     ///adaugam nr cat mai mari --> cat mai putine
        f[p]++;
        n -= p;
    }
    if(n > 0) { ///dc tot mai e cv, il adaugi asa cum e
        cnt++;
        f[n]++;
    }

    if(cer == 1)
        cout << cnt;
    else {
        for(int i = 1; i <= p; i++) {
            while(f[i] > 1) { ///ca sa fie min lexico, dam cout la alea mai multe in prima parte
                cout << i << " ";
                f[i]--;
            }
        }
        cout << p << " "; ///mij
        for(int i = p - 1; i >= 1; i--) ///p2
            cout << i << " ";
    }
    return 0;
}
```
