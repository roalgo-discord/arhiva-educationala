---
id: OJI-2017-VI-accesibil
title: Soluția problemei accesibil (OJI 2017, clasa a VI-a)
problem_id: 881
authors: [arisanu]
prerequisites:
    - ad-hoc
tags:
    - OJI
    - clasa VI
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2017/06/accesibil.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2017/06/accesibil.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2017/06/accesibil.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: AntonioCC (kilonova)
#include <bits/stdc++.h>
using namespace std;

int main() {
    ifstream fin("accesibil.in");
    ofstream fout("accesibil.out");

    int p, k, n;

    fin >> p >> k >> n;

    if (p == 1) {
        int nr, max1 = -1, max2 = -1, max3 = -1;

        for (int i = 1; i <= n; i++) {
            fin >> nr;

            int verif = 1, aux = nr;
            while (aux > 9) {
                if (aux % 10 - aux / 10 % 10 != 1)
                    verif = 0;
                aux = aux / 10;
            }

            if (verif == 1 && nr > 9) {
                if (nr > max1) {
                    max1 = nr;
                    if (max1 >= max2) {
                        max1 = max2;
                        max2 = nr;
                        if (max2 >= max3) {
                            max2 = max3;
                            max3 = nr;
                        }
                    }
                }
            }
        }

        fout << max1 << " " << max2 << " " << max3;
    } else if (p == 2) {
        int V[11] = {0};

        int nr, aux, cif, k = 0, verif;

        for (int i = 1; i <= n; i++) {
            fin >> nr;

            aux = nr;
            cif = verif = 1;
            while (aux != 0) {
                if (aux > 9 && aux % 10 - aux / 10 % 10 != 1)
                    verif = 0;
                V[cif++] = aux % 10;
                aux = aux / 10;
            }

            for (int j = 0; j < cif / 2; j++)
                swap(V[j], V[cif - j - 1]);

            if (verif == 0) {
                for (int i = 0; i < cif; i++) {
                    aux = 0;
                    for (int j = 0; j < cif - 1; j++)
                        if (j != i)
                            aux = aux * 10 + V[j];
                    if (aux > 9) {
                        verif = 1;
                        while (aux > 9) {
                            if (aux % 10 - aux / 10 % 10 != 1) {
                                verif = 0;
                                break;
                            }
                            aux = aux / 10;
                        }
                        if (verif == 1) {
                            k++;
                            break;
                        }
                    }
                }
            }
        }

        fout << k;
    } else if (p == 3) {
        for (int i = 1; i <= k; i++)
            fout << i;

        fout << " ";

        if (k != 9)
            for (int i = 9 - k + 1; i <= 9; i++)
                fout << i;
    } else {
        switch (k) {
        case 2:
            fout << "4 4";
            break;
        case 3:
            fout << "3 4";
            break;
        case 4:
            fout << "3 3";
            break;
        case 5:
            fout << "2 3";
            break;
        case 6:
            fout << "2 2";
            break;
        case 7:
            fout << "1 2";
            break;
        case 8:
            fout << "1 1";
            break;
        case 9:
            fout << "0 1";
            break;
        }
    }

    fin.close();
    fout.close();

    return 0;
}
```
