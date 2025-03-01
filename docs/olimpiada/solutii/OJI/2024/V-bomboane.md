---
id: OJI-2024-V-bomboane
title: Soluția problemei Bomboane (OJI 2024, clasa a V-a)
problem_id: 2516
authors: [ariciu]
prerequisites:
    - divisibility
tags:
    - OJI
    - clasa V
---

Mai jos, notațiile $N$, $X$, $Y$ au semnificația din enunț.

Cerința 1: Valoarea cerută se obține ca rezultat al expresiei $\frac{N}{X}$.

Cerința 2: Numărul de copii și numărul de bomboane trebuie să fie divizori ai
lui $N$ și totodată produsul lor trebuie să fie egal cu $N$. Divizorii cu
această proprietate se obțin căutând un divizor $d$, iar perechea lui va fi
atunci $\frac{N}{d}$. Este suficient să găsim pe d ca fiind cel mai mic divizor
propriu al lui $N$ și soluția va fi $\frac{N}{d}$.

Cerința 3: Datele de intrare ne permit să căutăm soluție considerând pe rând
cazurile: nu lăsăm în cutie bomboane, lăsăm o singură bomboană, lăsăm două
bomboane, etc. La prima astfel de valoare pentru care putem determina o
distribuire, ne oprim. Odată fixat numărul $b$ de bomboane lăsate în cutie
(parcurgând valorile de la 0 la 100 cu o instrucțiune repetitivă), rămâne ca
toate celelalte bomboane $n = N − b$ să fie distribuite. Avem și în acest caz de
determinat o pereche de divizori ai lui $n$ al căror produs este chiar $n$.
Aceste perechi sunt deci de forma $(d, \frac{n}{d})$.

Este suficient să căutăm astfel de perechi cât timp $d \leq \frac{n}{d}$. Pentru
fiecare pereche determinată $(d, \frac{n}{d})$ analizăm dacă putem avea $d$ =
numărul de copii și $\frac{n}{d}$ numărul de bomboane și se respectă condițiile
$d \geq X$ și $\frac{n}{d} \geq Y$ sau respectiv $d =$ numărul de bomboane și
$\frac{n}{d}$ numărul de copii și se respectă condițiile $d \geq Y$ și
$\frac{n}{d} \geq X$.

Cerința 3 poate fi abordată și în modul descris în continuare. Notăm cu $x$
numărul de copii căutat, cu $y$ numărul de bomboane căutat și cu $dif$ numărul
de bomboane care vor rămâne în cutie. O soluție simplă este aceea de a parcurge
cu $x$ toate valorile $1, $2, \dots, N$ și la fiecare pas calculăm $y = N/x$,
$dif = N − x \cdot y$ și păstrăm tripletul $(dif, x, y)$ cu diferența $dif$
minimă, iar la aceeași diferență minimă $x$ să fie maxim.

Când păstrăm un triplet avem grijă să fie respectate și condițiile $x \geq X$ și
$y \geq Y$. Din ideea anterioară se obține o soluție mai rapidă analizând, pe
rând, două cazuri:

- Cazul $x \leq y$ când parcurgem valorile $x = 1, 2, \dots$, cât timp $x \leq
  \frac{N}{x}$
- Cazul $x \geq y$ când parcurgem valorile $y = 1, 2, \dots$, cât timp $y \leq
  \frac{N}{y}$.

Mai jos puteți găsi o soluție care ia punctajul maxim.

```cpp
#include <fstream>
using namespace std;

int main() {
    ifstream cin("bomboane.in");
    ofstream cout("bomboane.out");

    int c, n, x, y;
    cin >> c >> n >> x >> y;
    
    if (c == 1) {
        cout << n/x << '\n';
        return 0;
    }
    
    if (c == 2) {
        for(int i = 2; i * i <= n; i++) {
            if (n % i == 0) {
                cout << n/i << '\n';
                return 0;
            }
        }
    }
    
    if (c == 3) {
        for(int cnt = n; cnt >= n-100; cnt--) {
            for (int i = 1; i * i <= cnt; i++) {
                if (cnt % i == 0) {
                    if (cnt/i >= x && i >= y) {
                        cout << n-cnt << " " << cnt/i << " " << i << '\n';
                        return 0;
                    }
                }
            }
            for (int i = 1; i * i <= cnt; i++) {
                if (cnt % i == 0) {
                    if (i >= x && cnt/i >= y) {
                        cout << n-cnt << " " << i << " " << cnt/i << '\n';
                        return 0;
                    }
                }
            }
        }
    }
    return 0;
}
```
