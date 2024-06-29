---
tags:
    - sortare
    - cautari
    - matematica
---

**Autor**: Ștefan-Cosmin Dăscălescu

## Introducere

Un algoritm de căutare ternară este o tehnică în informatică pentru a găsi
minimul sau maximul unei funcții unimodale (care are un singur punct/interval cu
valoare maximă/minimă). 

Spre deosebire de alte căutări similare precum căutarea binară, căutarea ternară
este utilă pentru a afla dacă valoarea extremă nu se găsește în prima sau ultima
treime a spațiului de căutare, algoritmul repetându-se pentru celelalte două
treimi ale intervalului căutat. 

Căutarea ternară este un exemplu de algoritm de tipul divide et impera, alături
de căutarea binară și alți algoritmi similari. 

## Funcția în sine

Pentru a putea aplica căutarea ternară, trebuie ca funcția să fie
(des)crescătoare (de regulă, strict) până la un punct $x$ unde găsim cea mai
mică poziție care ne dă valoarea maximă/minimă a funcției, urmând că funcția să
fie mai apoi constantă până la un punct $y$, iar apoi funcția va avea monotonia
opusă față de cea până la punctul $x$.

Cu alte cuvinte, funcția crește până la punctul $x$, apoi e constantă în
intervalul $[x, y]$, iar apoi scade de la punctul $y$. Similar, putem spune și
pentru cazul opus al unei funcții unimodale.

## Algoritmul standard

Să presupunem că avem o funcție $f$ care este definită pe intervalul $[a, b]$.
Asemănător căutării binare, vom începe prin a căuta acel punct extrem pe întreg
intervalul. La fiecare pas, vom lua punctele $m_1$ și $m_2$, care vor fi situate
la $\frac{1}{3}$ respectiv $\frac{2}{3}$ de capătul din stânga al intervalului,
iar în funcție de valorile $f(m_1)$ și $f(m_2)$, avem următoarele cazuri,
acestea fiind similare și pentru o funcție mai întâi descrescătoare.

* Dacă $f(m_1) < f(m_2)$, maximul nu poate fi în intervalul $[a, m_1]$ deoarece
  $f(m_2)$ este mai mare decât $f(m_1)$.
* Dacă $f(m_1) > f(m_2)$, maximul nu poate fi în intervalul $[m_2, b]$ deoarece
  $f(m_1)$ este mai mare decât $f(m_2)$.
* Dacă $f(m_1) = f(m_2)$, maximul nu poate fi decât în intervalul $[m_1, m_2]$
  deoarece $f(m_1)$ și $f(m_2)$ sunt de părți opuse ale punctului sau punctelor
  maxime.

După ce am redus căutarea la o lungime suficient de mică pentru a preveni erori
de precizie, putem trata intervalul rămas folosind brute force pentru a ajunge
la răspunsul dorit. Alternativ, putem apela algoritmul de un număr finit de ori,
similar cu modul în care am rula căutarea binară pe numere reale. 

Complexitatea algoritmului este $O(\log n)$ unde $n$ este dimensiunea
intervalului de căutare. Se poate remarca faptul că spre deosebire de căutarea
binară, constanta este una mai mare deoarece în medie reducem intervalul de
căutare cu $\frac{1}{3}$ la un pas.

```cpp
// f(i) este o funcție oarecare
long long ternara(int epsilon) {
    int st = 0;
    int dr = 1000000000;

    long long ans = -(1LL << 60);

    while (st <= dr) {
        int mid1 = st + (dr - st) / 3;
        int mid2 = dr - (dr - st) / 3;

        if (dr - st + 1 <= epsilon) {
            for (int i = st; i <= dr; ++i) {
                ans = max(ans, f(i));
            }
            break;
        }

        long long xa = f(mid1);
        long long xb = f(mid2);

        ans = max(ans, max(xa, xb));

        if (xa == xb) {
            st = mid1;
            dr = mid2;
        } else if (xa < xb) {
            st = mid1;
        } else {
            dr = mid2;
        }
    }
    return ans;
}
```

## Golden Section Search

Pe lângă căutarea ternară, putem folosi pentru a optimiza procesul de căutare și căutarea Golden Section, care spre deosebire de căutarea ternară, împarte intervalul astfel încât cele două valori de mijloc să fie puse la distanta $r = \frac{3 - \sqrt{5}}{2}$, distantă care este egală cu $\frac{1}{\phi}$, unde $\phi$ este numărul de aur, egal cu aproximativ $1.618$.

```cpp
#include <cmath>
#include <iostream>

using namespace std;

constexpr double gr = 1.618033988749895;

constexpr double gss(double (*f)(double), double a, double b,
                     const double eps = 1e-5) {
    double c = b - (b - a) / gr;
    double d = a + (b - a) / gr;

    while (abs(b - a) > eps) {
        // Pentru maxim, se inversează semnul
        if (f(c) < f(d)) {
            b = d;
        } else {
            a = c;
        }

        // Recalculam c si d pentru a evita pierderea preciziei
        // lucru ce poate duce la raspunsuri gresite sau loop infinit
        c = b - (b - a) / gr;
        d = a + (b - a) / gr;
    }

    return (b + a) / 2;
}

int main() {
    auto f = [](double x) { return (x - 1) * (x - 2); };

    const double result = gss(f, 1, 5);

    std::cout << "Minim la x = " << result << std::endl;
    return 0;
}
```

## Problema exemplu - [Devu and his Brother](https://codeforces.com/contest/439/problem/D)

În această problemă avem doi vectori $a$ și $b$ și putem crește/scădea o valoare
dintr-unul din cei doi vectori cu costul $1$. Vrem să aflăm costul minim pentru
ca minimul din vectorul $a$ să fie cel puțin egal cu maximul din vectorul $b$. 

Se poate observa că e clar că vrem să creștem valorile din $a$ și să scădem
valorile din $b$. De asemenea, se poate observa că pe măsură ce vrem să aducem
răspunsul la o oarecare "mediană", costul va fi tot mai mic. Aceste lucruri ne
duc spre o abordare bazată pe o căutare ternară a răspunsului.

Astfel, vom căuta ternar răspunsul în intervalul $[1, 10^9]$ răspunsul aplicând
algoritmul descris mai sus, implementarea fiind cea de mai sus.

## Probleme suplimentare
 
* [CF 439D](https://codeforces.com/contest/439/problem/D)
* [copii3 infoarena](https://infoarena.ro/problema/copii3)
* [CEOI 2017 - Sure Bet](https://csacademy.com/contest/ceoi-2017-day-1/task/sure-bet/)
* [CF 1355 E](https://codeforces.com/problemset/problem/1355/E)
* [CF 1848 D](https://codeforces.com/contest/1848/problem/D)
* [CCO 18-Gradient Descent](https://dmoj.ca/problem/cco18p4)


## Bibliografie și lectură suplimentară

* [Ternary Search - CP Algorithms](https://cp-algorithms.com/num_methods/ternary_search.html)
* [Ternary Search on Integers  - Codeforces](https://codeforces.com/blog/entry/43440)
* [Tutorial On Tof (Ternary Search) - Codeforces](https://codeforces.com/blog/entry/60702)
* [Solutia de la copii3 - infoarena](https://infoarena.ro/solutii/copii3)
* [Ternary Search - Wikipedia](https://en.wikipedia.org/wiki/Ternary_search)
* [Numerical Methods with Programming - Golden Section Search](https://drlvk.github.io/nm/section-golden-section.html)
* [Golden Section Search - Wikipedia](https://en.wikipedia.org/wiki/Golden-section_search)
