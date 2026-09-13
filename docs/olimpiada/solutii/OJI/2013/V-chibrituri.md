---
id: OJI-2013-V-chibrituri
title: Soluția problemei chibrituri (OJI 2013, clasa a V-a)
problem_id: 832
authors:
    - traian
prerequisites:
    - arrays
tags:
    - OJI
    - clasa V
---

## Soluție

Chiar dacă vectorii nu sunt în programa pentru OJI clasa a 5-a, dacă nu îi utilizăm, am putea ajunge la surse foarte lungi și la pierdere de timp.

Așa că, vom ține doi vectori pentru fiecare cifră, reprezentând numărul de chibrituri necesare verticale și orizontale pentru a scrie acea cifră.

După aceea, vom trece prin fiecare oră posibilă, (cu ora de la $0$ la $23$ și cu minutul de la $0$ la $59$) și vom însuma numerele de chibrituri verticale și orizontale pentru a scrie toate cifrele. Dacă numerele de chibrituri sunt cele dorite, atunci trebuie să luăm în considerare acea oră.

Pentru a compara două ore, vom transforma în minute.

## Cod sursă

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <fstream>

using namespace std;

ifstream fin("chibrituri.in");
ofstream fout("chibrituri.out");

int vert[10] = {4, 2, 2, 2, 3, 2, 3, 2, 4, 3};
int oriz[10] = {2, 0, 3, 3, 1, 3, 3, 1, 3, 3};

int main() {
    int v, o;
    fin >> v >> o;

    int maxim = -1, minim = 24 * 60, cnt = 0;
    for (int h = 0; h < 24; h++) {
        for (int m = 0; m < 60; m++) {
            int cv = vert[h / 10] + vert[h % 10] + vert[m / 10] + vert[m % 10];
            int co = oriz[h / 10] + oriz[h % 10] + oriz[m / 10] + oriz[m % 10];
            if (cv == v && co == o) {
                cnt++;
                int minute = h * 60 + m;
                if (minute > maxim) {
                    maxim = minute;
                }
                if (minute < minim) {
                    minim = minute;
                }
            }
        }
    }

    fout << cnt << "\n";
    fout << minim / 60 / 10 << minim / 60 % 10 << ":" << minim % 60 / 10
         << minim % 60 % 10 << "\n";
    fout << maxim / 60 / 10 << maxim / 60 % 10 << ":" << maxim % 60 / 10
         << maxim % 60 % 10 << "\n";
    return 0;
}
```
