---
tags:
    - structuri de date
    - RMQ
    - optimizare
    - sparse table
---

## Introducere

Așa cum îi spune și numele, Range Minimum Query (RMQ) rezolvă probleme de forma: dându-se un șir de numere, să se afle minimul numerelor dintr-un anumit interval. Această structură nu poate primi actualizări ale șirului.

## Problema exemplu - [problema clasică de RMQ pe CSES](https://cses.fi/problemset/task/1647)

Ideea principală la RMQ este să precalculăm răspunsul pentru toate intervalele de lungime putere de $2$. Astfel, vom împărți intervalul $[st, dr]$ în două intervale: $[st, st + 2^lg), (dr - 2^lg, dr]$, care au lungimea $2^lg$, deci le putem afla răspunsurile în $O(1)$. 

!!! note “Observație“
    Noi repetăm elementele din intervalul $(st + 2^lg, dr - 2^lg)$. Acest lucru nu ne afectează, deoarece $min(x, x) = x$.

Fie $rmq_{i, j} = $ minimul numerelor din intervalul $[j, j + 2^i)$.

$$rmq_{i, j} = \begin{cases} v_j &\text{dacă } j = 0 \\ min(rmq_{i-1, j}, rmq_{i-1, j + 2^{i-1}}) &\text{dacă } j > 0 \end{cases}$$

!!! warning “Atenție“
    Este foarte important ca, în $rmq_{i, j}$, $2^i$ să fie lungimea intervalului și $j$ să fie primul element. Dacă implementăm altfel, timpul implementării va crește foarte mult. Unoeri, acest lucru poate duce și la TLE. Mai multe detalii puteți găsi în [acest blog](https://codeforces.com/blog/entry/75611). 

Sursa de accepted:

```cpp
#include <iostream>
 
const int MAXN = 200'000;
const int LOGN = 18;
 
int v[MAXN], n, q;
 
int min(int a, int b) {
    return a < b ? a : b;
}
 
struct SparseTable {
    int rmq[LOGN][MAXN], lg2[MAXN + 1];
 
    void init(int n) {
        int i, j;
        for (i = 2; i <= n; i++) {
            lg2[i] = 1 + lg2[i >> 1];
        }
        for (i = 0; i < n; i++) {
            rmq[0][i] = v[i];
        }
        for (i = 1; i <= lg2[n]; i++) {
            for (j = 0; j + (1 << i) - 1 < n; j++) {
                rmq[i][j] = min(rmq[i - 1][j], rmq[i - 1][j + (1 << (i - 1))]);
            }
        }
    }
 
    int query(int st, int dr) {
        int lg = lg2[dr - st + 1];
        return min(rmq[lg][st], rmq[lg][dr - (1 << lg) + 1]);
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

## Probleme rezolvate

### Problema

### Problema


## Reverse RMQ

Putem să rezolvăm și probleme în care avem doar actualizări, fără întrebări.

### Problemă exemplu - [Codeforces Gym](https://codeforces.com/gym/102114/problem/G)



## Concluzii

## Probleme suplimentare

* [Probleme cu RMQ de pe kilonova](https://kilonova.ro/tags/289)
* [Lot 2023 Juniori excursie](https://kilonova.ro/problems/619)
* [ONI 2021 Baraj Juniori cartita](https://kilonova.ro/problems/1096)
* [Info1Cup 2021 wonderland](https://kilonova.ro/problems/3147)
* [Substring Restrictions - CS Academy](https://csacademy.com/contest/round-15/task/substring-restrictions/)
* [Problemele de RMQ din acest blog](https://codeforces.com/blog/entry/55274)

## Resurse suplimentare

* [RMQ - SEPI Infobits F1 (pag. 63)](https://sepi.ro/assets/upload-file/infobits-f1.pdf)
* [Sparse Table - CP algorithms](https://cp-algorithms.com/data_structures/sparse-table.html)
* [Sparse Table - Codeforces](https://codeforces.com/blog/entry/101083)
* [Avansat - RMQ cu $O(N)$ memorie și $O(1)$ timp pe query](https://codeforces.com/blog/entry/78931)
