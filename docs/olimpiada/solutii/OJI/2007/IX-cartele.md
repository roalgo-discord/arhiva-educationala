---
id: OJI-2007-IX-cartele
title: Soluția problemei cartele (OJI 2007, clasa a IX-a)
problem_id: 759
authors: [galatan]
prerequisites:
    - simulating-solution
tags:
    - OJI
    - clasa IX
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2007/09/cartele.txt).

<div class="editorial-text" markdown>

```text
Pentru fiecare cartela, se compara element cu element, matricea
care reprezinta sablonul, cu urmatoarele tablouri:

 1. Cartela
 2. Cartela rotita cu 90 grade
 3. Cartela rotita cu 180 grade
 4. Cartela rotita cu 270 grade

Daca nu s-a gasit o coincidenta, se intoarce cartela, printr-o operatie
de oglindire fata de linia i = n / 2, (sau fata de coloana j = n / 2),
dupa care se compara sablonul cu urmatoarele tablouri:

 5. Cartela oglindita
 6. Cartela oglindita rotita cu 90 grade
 7. Cartela oglindita rotita cu 180 grade
 8. Cartela oglindita rotita cu 270 grade

Rotirile se pot face in sens trigonometric sau orar.
Daca s-a gasit o coincidenta la oricare dintre pasii de mai sus,
se opreste cautarea, se afiseaza 1 si se trece la prelucrarea
urmatoarei cartele.

Daca nici dupa pasul 8 nu s-a gasit o potrivire exacta, se afiseaza 0
si se trece la prelucrarea urmatoarei cartele.
```

</div>

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

const int N = 50;

int m[N + 1][N + 1], a[N + 1][N + 1], b[N + 1][N + 1];

int main () {
    ifstream cin("cartele.in");
    ofstream cout("cartele.out");

    int n, c;
    bool ok;

    cin >> n >> c;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            cin >> m[i][j];
        }
    }

    auto good = [&n]() {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (m[i][j] != a[i][j]) {
                    return false;
                }
            }
        }

        return true;
    };

    auto rot = [&n]() {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                b[j][i] = a[n - i + 1][j];
            }
        }
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                a[i][j] = b[i][j];
            }
        }
    };

    auto flip = [&n]() {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= (int)(n / 2); j++) {
                swap(a[i][j], a[i][n - j + 1]);
            }
        }
    };

    for (int k = 1; k <= c; k++) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                cin >> a[i][j];
            }
        }

        ok = false;
        for (int i = 1; i <= 4; i++) {
            if (good()) {
                ok = true;
                break;
            }
            rot();
        }
        flip();
        for (int i = 1; i <= 4; i++) {
            if (good()) {
                ok = true;
                break;
            }
            rot();
        }

        cout << ok << "\n";
    }
    return 0;
}
```
