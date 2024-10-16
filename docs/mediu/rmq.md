---
tags:
    - structuri de date
    - RMQ
    - optimizare
    - sparse table
---

## Introducere

Sparse Table este o structură care ne ajută, în principal, să răspundem la întrebări pe un interval, fiecare răspuns fiind calculat în $O(\log n)$ (mai puțin atunci când folosim RMQ, despre care o să discutăm mai târziu în acest articol).

Sa luam ca exemplu problema [Static Range Sum Queries](https://cses.fi/problemset/task/1646) de pe CSES. Desigur ca o putem rezolva folosind [sume partiale](https://edu.roalgo.ro/usor/partial-sums/), dar haideti sa incercam sa o rezolvam cu sparse table.

Fie $spt_{i, j}$ suma intervalul $[j, j + 2^i)$. Cand avem o intrebare pe intervalul $[st, dr]$, il vom imparti in intervale de lungimi puteri de $2$. Lungimile acestor intervale vor fi egale cu bitii din reprezentarea in baza $2$ a lungimii intervalului $[st, dr]$. Aceasta metoda se cheama binary lifting.

!!! warning “Atenție“
    Este foarte important ca, în $spt{i, j}$, $2^i$ să fie lungimea intervalului și $j$ să fie primul element. Dacă implementăm altfel, timpul implementării va crește foarte mult. Unoeri, acest lucru poate duce și la TLE. Mai multe detalii puteți găsi în [acest blog](https://codeforces.com/blog/entry/75611). 

!!! note "Observatie"
    [LCA](https://edu.roalgo.ro/dificil/lowest-common-ancestor/) este calculat, de asemenea, folosind binary lifting.

Sursa de Accepted:

```cpp

```

## Range Minimum Query 

Așa cum îi spune și numele, la Range Minimu Query (RMQ), avem intrebari la care trebuie sa raspundem cu minimul pe un interval. Vom folosi un sparse table pentru a precalcula raspunsul

Ideea principală la RMQ este să precalculăm răspunsul pentru toate intervalele de lungime putere de $2$. Astfel, vom împărți intervalul $[st, dr]$ în două intervale: $[st, st + 2^{lg}), (dr - 2^{lg}, dr]$, care au lungimea $2^{lg}$, deci le putem afla răspunsurile în $O(1)$. 

!!! note “Observație“
    Noi repetăm elementele din intervalul $(st + 2^{lg}, dr - 2^{lg})$. Acest lucru nu ne afectează, deoarece $min(x, x) = x$.

!!! note "Observație"
    Vom precalcula un vector $lg2_i = $ cel mai mare $j$ astfel încât $2^j \leq i$. Acest vector ne va ajuta să calculăm $lg$ ușor.

Tabloul $spt$ se calculeaza la fel ca inainte.

Sursa de accepted (la problema [Static Range Minimum Queries](https://cses.fi/problemset/task/1647)):

```cpp
#include <iostream>
 
const int MAXN = 200'000;
const int LOGN = 18;
 
int v[MAXN], n, q;
 
int min(int a, int b) {
    return a < b ? a : b;
}
 
struct SparseTable {
    int spt[LOGN][MAXN], lg2[MAXN + 1];
 
    void init(int n) {
        int i, j;
        for (i = 2; i <= n; i++) {
            lg2[i] = 1 + lg2[i >> 1];
        }
        for (i = 0; i < n; i++) {
            spt[0][i] = v[i];
        }
        for (i = 1; i <= lg2[n]; i++) {
            for (j = 0; j + (1 << i) - 1 < n; j++) {
                spt[i][j] = min(spt[i - 1][j], spt[i - 1][j + (1 << (i - 1))]);
            }
        }
    }
 
    int query(int st, int dr) {
        int lg = lg2[dr - st + 1];
        return min(spt[lg][st], spt[lg][dr - (1 << lg) + 1]);
    }
} rmq;
 
void readArray() {
    int i;
    std::cin >> n >> q;
    for (i = 0; i < n; i++) {
        std::cin >> v[i];
    }
}
 
void answerQueries() {
    int i, st, dr;
    for (i = 0; i < q; i++) {
        std::cin >> st >> dr;
        std::cout << rmq.query(st - 1, dr - 1) << "\n";
    }
}
 
int main() {
    readArray();
    rmq.init(n);
    answerQueries();
    return 0;
}
```

!!! note “Observație“
    RMQ poate fi folosit cu orice operație $f$ care este idempotentă, adică $f(x, x) = x$ (minim, maxim, cmmdc etc). Avem nevoie de acest lucru, deoarece, cum am observat mai sus, noi repetăm anumite elemente.

## RMQ 2D

## Reverse RMQ

Putem să rezolvăm și probleme în care avem doar actualizări, fără întrebări.

### Problemă exemplu - [Codeforces Gym](https://codeforces.com/gym/102114/problem/G)

## Probleme rezolvate

### Problema [Lot 2023 Juniori excursie](https://kilonova.ro/problems/619)

### Problema [CF 2009G2](https://codeforces.com/contest/2009/problem/G2)

## Concluzii

## Probleme suplimentare

* [ONI 2021 Baraj Juniori cartita](https://kilonova.ro/problems/1096)
* [Info1Cup 2021 wonderland](https://kilonova.ro/problems/3147)
* [Probleme cu RMQ de pe kilonova](https://kilonova.ro/tags/289)
* [Problemele de RMQ din acest blog](https://codeforces.com/blog/entry/55274)
* [CF 1175E](https://codeforces.com/contest/1175/problem/E)
* [CF 191C](https://codeforces.com/problemset/problem/191/C)
* [CF 1328E](https://codeforces.com/contest/1328/problem/E)
* [CF 1702G2](https://codeforces.com/contest/1702/problem/G2)
* [CF 832D](https://codeforces.com/problemset/problem/832/D)
* [RMI 2020 Sum Zero](https://oj.uz/problem/view/RMI20_sumzero)
* [EJOI 2021 consecutive1](https://www.pbinfo.ro/probleme/3860/consecutive1)
* [PBinfo minisecvente](https://www.pbinfo.ro/probleme/2865/minisecvente)
* [PBinfo divquery](https://www.pbinfo.ro/probleme/1735/divquery)
* [Substring Restrictions - CS Academy](https://csacademy.com/contest/round-15/task/substring-restrictions/)

## Resurse suplimentare

* [RMQ - SEPI Infobits F1 (pag. 63)](https://sepi.ro/assets/upload-file/infobits-f1.pdf)
* [Sparse Table - CP algorithms](https://cp-algorithms.com/data_structures/sparse-table.html)
* [Sparse Table - Codeforces](https://codeforces.com/blog/entry/101083)
* [Binary Lifting - Codeforces](https://codeforces.com/blog/entry/100826)
* [Binary Lifting - USACO](https://usaco.guide/plat/binary-jump?lang=cpp)
* [Avansat - RMQ cu $O(N)$ memorie și $O(1)$ timp pe query](https://codeforces.com/blog/entry/78931)
