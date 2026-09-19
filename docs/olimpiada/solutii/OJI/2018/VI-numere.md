---
id: OJI-2018-VI-numere
title: Soluția problemei numere (OJI 2018, clasa a VI-a)
problem_id: 894
authors: [arisanu]
prerequisites:
    - simulating-solution
    - basic-math
tags:
    - OJI
    - clasa VI
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2018/06/numere.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2018/06/numere.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2018/06/numere.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: trraian (kilonova)
#include <fstream>

using namespace std;

ifstream fin("numere.in");
ofstream fout("numere.out");

int main() {
    long long i, x, y, z, n, copie, r = 0, cerinta;
    fin >> cerinta >> n;

    if (cerinta == 1) {
        fout << (n - 1) * 10;
    } else if (cerinta == 2) {
        x = n / 10;
        y = n / 100;
        z = n / 1000;

        if (x % 10 == 0) { /// numerele divizibile cu 10 sunt sterse
            fout << 0;
        } else if (x <= 9) { /// sau alea de 1 cifra sunt palindroame
            fout << 1;
        } else {
            copie = x;

            while (x > 0) {
                r = r * 10 + x % 10;
                x /= 10;
            }

            if (copie == r) { /// daca e palindrom apare o singura data
                fout << 1;
            } else { /// altfel apare de 2 ori (ex: 13, 31 si mai incolo 31, 13)
                fout << 2;
            }
        }

        fout << ' ';

        if (y % 10 == 0) {
            fout << 0;
        } else if (y <= 9) {
            fout << 1;
        } else {
            copie = y;
            r = 0;

            while (y > 0) {
                r = r * 10 + y % 10;
                y /= 10;
            }

            if (copie == r) {
                fout << 1;
            } else {
                fout << 2;
            }
        }

        fout << ' ';

        if (z % 10 == 0) {
            fout << 0;
        } else if (z <= 9) {
            fout << 1;
        } else {
            copie = z;
            r = 0;

            while (z > 0) {
                r = r * 10 + z % 10;
                z /= 10;
            }

            if (copie == r) {
                fout << 1;
            } else {
                fout << 2;
            }
        }
    } else {
        if (n == 1) { /// tratam cateva cazuri separat
            fout << 9;
        } else if (n == 2) {
            fout << 153;
        } else if (n == 3) {
            fout << 1530;
        } else if (n == 4) {
            fout << 16110;
        } else {         /// numere cam mari pt long long
            fout << 161; /// afisam cf cu cf nr

            for (i = 1; i <= (n - 1) / 2 - 2; i++) {
                fout << 9;
            }

            if (n % 2 == 0) {
                fout << 9;
            }

            fout << 1;

            for (i = 1; i <= (n - 1) / 2; i++) {
                fout << 0;
            }
        }
    }

    return 0;
}
```
