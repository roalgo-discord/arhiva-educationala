---
tags:
    - structuri de date
    - RMQ
    - optimizare
    - sparse table
    - binary lifting
---

## Introducere

Sparse Table este o structură care ne ajută, în principal, să răspundem la întrebări pe un interval, fiecare răspuns fiind calculat în $O(\log n)$ (mai puțin atunci când folosim RMQ, despre care o să discutăm mai târziu în acest articol).

Sa luam ca exemplu problema [Static Range Sum Queries](https://cses.fi/problemset/task/1646) de pe CSES. Desigur ca o putem rezolva folosind [sume partiale](https://edu.roalgo.ro/usor/partial-sums/), dar haideti sa incercam sa o rezolvam cu sparse table.

Fie $spt_{i, j}$ suma intervalul $[j, j + 2^i)$. Cand avem o intrebare pe intervalul $[st, dr]$, il vom imparti in intervale de lungimi puteri de $2$. Lungimile acestor intervale vor fi egale cu bitii din reprezentarea in baza $2$ a lungimii intervalului $[st, dr]$. Aceasta metoda se cheama binary lifting.

!!! warning “Atenție“
    Este foarte important ca, în $spt{i, j}$, $2^i$ să fie lungimea intervalului și $j$ să fie primul element. Dacă implementăm altfel, timpul implementării va crește foarte mult. Unoeri, acest lucru poate duce și la TLE. Mai multe detalii puteți găsi în [acest blog](https://codeforces.com/blog/entry/75611). 

!!! note "Observatie"
    [LCA](https://edu.roalgo.ro/dificil/lowest-common-ancestor/) este calculat, de asemenea, folosind binary lifting. Cautarea binara in [AIB](https://edu.roalgo.ro/dificil/fenwick-tree/) foloseste, de asemenea, binary lifting.

Sursa de Accepted:

```cpp
#include <iostream>

const int MAXN = 200'000;
const int LOGN = 18;

int v[MAXN], n, q;

struct SparseTable {
    long long spt[LOGN][MAXN];
    int maxbit;
    
    void init(int n) {
        int i, j;
        for (i = 0; i < n; i++) {
            spt[0][i] = v[i];
        }
        maxbit = 31 - __builtin_clz(n); // i-ul maxim
        for (i = 1; i <= maxbit; i++) {
            for (j = 0; j + (1 << i) - 1 < n; j++) {
                spt[i][j] = spt[i - 1][j] + spt[i - 1][j + (1 << (i - 1))];
            }
        }
    }
    
    long long query(int st, int dr) {
        int len = dr - st + 1, i;
        long long sum = 0;
        for (i = maxbit; i >= 0; i--) {
            if (len & (1 << i)) { // daca are bitul i
                sum += spt[i][st];
                st += 1 << i;
            }
        }
        return sum;
    }
} table;

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
        std::cout << table.query(st - 1, dr - 1) << "\n";
    }
}

int main() {
    readArray();
    table.init(n);
    answerQueries();
    return 0;
}
```

## Range Minimum Query 

Așa cum îi spune și numele, la Range Minimum Query (RMQ), avem intrebari la care trebuie sa raspundem cu minimul pe un interval. Vom folosi un sparse table pentru a precalcula raspunsul

Ideea principală la RMQ este să precalculăm răspunsul pentru toate intervalele de lungime putere de $2$. Astfel, vom împărți intervalul $[st, dr]$ în două intervale: $[st, st + 2^{lg}), (dr - 2^{lg}, dr]$ (unde $lg$ reprezinta cel mai mare numar astfel incat $2^{lg} \leq dr - st + 1$, care au lungimea $2^{lg}$, deci le putem afla răspunsurile în $O(1)$. 

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

Putem face RMQ si pe matrice. Sa luam ca exemplu problema [CF 713D](https://codeforces.com/contest/713/problem/D).

## Reverse RMQ

Putem să rezolvăm și probleme în care avem doar actualizări, fără întrebări, adica o problema in care avem actualizari de forma $a_i = max(a_i, x)$, pentru $l \leq i \leq r$. O putem rezolva asemanator, folosind aceleasi intervale ca la RMQ normal, si modificand astfel:

$$spt_{lg, st} = max(spt_{lg, st}, x) \\ spt_{lg, dr - 2^{lg} + 1} = max(spt_{lg, dr - 2^{lg} + 1}, x)$$

Apoi, valoarea $a_i$ finala va fi minimul dintre $a_i$ si valoarea din orice interval care este actualizat in $spt$ si include $i$. Calculam aceasta valoare folosind un proces similar cu propagarea lazy de la [arbori de intervale](https://edu.roalgo.ro/dificil/segment-trees/). Rezultatul din $spt_{i, j}$ va fi propagat doar in $spt_{i - 1, j}$ si $spt_{i - 1, j + 2^{i-1}}$, deoarece astea sunt singurele intervale necesare pentru a ne asigura ca rezultatul ajunge la toate pozitiile din sir. Pentru mai multe detalii vedeti implementarea.

Sursa de accepted (la problema [Glad You Came de pe codeforces](https://codeforces.com/gym/102114/problem/G)

```cpp
#include <iostream>

const int MAXN = 100'000;
const int MAXVAL = 1 << 30;
const int MAXLOG = 17;

int n;
unsigned int x, y, z;

int max(int a, int b) {
    return a > b ? a : b;
}

struct SparseTable {
    int spt[MAXLOG][MAXN], lg2[MAXN + 1];

    void init(int n) {
        int i, j;
        for (i = 2; i <= n; i++) {
            lg2[i] = 1 + lg2[i >> 1];
        }
        for (i = 0; i <= lg2[n]; i++) {
            for (j = 0; j < n; j++) {
                spt[i][j] = 0;
            }
        }
    }

    void update(int st, int dr, int val) {
        int lg = lg2[dr - st + 1], dr_idx;
        spt[lg][st] = max(spt[lg][st], val);
        dr_idx = dr - (1 << lg) + 1;
        spt[lg][dr_idx] = max(spt[lg][dr_idx], val);
    }

    void pullResults() {
        int i, j, new_j;
        for (i = lg2[n]; i > 0; i--) {
            for (j = 0; j + (1 << i) <= n; j++) {
                spt[i - 1][j] = max(spt[i - 1][j], spt[i][j]);
                new_j = j + (1 << (i - 1));
                spt[i - 1][new_j] = max(spt[i - 1][new_j], spt[i][j]);
            }
        }
    }

    void writeAnswer() {
        int i;
        unsigned long long answer;
        pullResults();
        answer = 0;
        for (i = 0; i < n; i++) {
            answer ^= 1LL * (i + 1) * spt[0][i];
        }
        std::cout << answer << "\n";
    }
} rmq;

unsigned int nextValue() {
    unsigned int w;
    x ^= x << 11;
    x ^= x >> 4;
    x ^= x << 5;
    x ^= x >> 14;
    w = x ^ y ^ z;
    x = y;
    y = z;
    z = w;
    return z;
}

void processUpdates() {
    int q, i, st, dr, val, aux;
    std::cin >> n >> q >> x >> y >> z;
    rmq.init(n);
    for (i = 0; i < q; i++) {
        st = nextValue() % n;
        dr = nextValue() % n;
        if (st > dr) {
            aux = st;
            st = dr;
            dr = aux;
        }
        val = nextValue() % MAXVAL;
        rmq.update(st, dr, val);
    }
}

int main() {
    int t;
    std::cin >> t;
    while (t--) {
        processUpdates();
        rmq.writeAnswer();
    }
    return 0;
}
```

## RMQ sau AINT?

Arborii de intervale (AINT) pot face tot ce poate face RMQ, dar haideti sa comparam aceste doua structuri de date.

### Comparatie in functie de timp

RMQ este precalculat, la inceput, in $O(n \log n)$, iar AINT in $O(n)$. Insa, RMQ are complexitate $O(1)$ per query, in timp ce AINT are $O(\log n)$ per query.

### Comparatie in functie de memorie

RMQ foloseste $O(n \log n)$ memorie, iar AINT foloseste $O(n)$ memorie.

### Alte precizari

AINT poate rezolva si alte probleme pe care nu le poate rezolva RMQ. Aceste probleme pot fi rezolvate cu Sparse Table normal, rezultand aceeasi complexitate ca la AINT la query-uri. Acest lucru inseamna ca AINT este mai folositor in acest caz, chiar daca este mai greu de implementat.

### Concluzie

AINT este, de obicei, mai folositor ca RMQ, mai putin atunci cand numarul de query-uri este cu mult mai mare decat numarul de elemente sau atunci cand dorim sa nu scriem prea multe linii de cod.

## Probleme rezolvate

### Problema [Lot 2023 Juniori excursie](https://kilonova.ro/problems/619)

Observam ca indicatoarele trebuie sa fie de forma RRR...RLLL..L. Asa ca sa fixam pozitia $i$ pana la care vom avea R-uri. Costul va fi egal cu numarul de L-uri de la $st$ la $i$ adunat cu numarul de R-uri de la $i + 1$ la $dr$. Aceste lucruri pot fi calculate usor folosind sume partiale.

Fie $prefL_i = $ cate L-uri sunt de la $1$ la $i$ si $suffR_i = $ cate R-uri sunt de la $i$ la $n$. Atunci raspunsul va fi $min(prefL_i - prefL_{st-1} + suffR_{i+1} - suffR_{dr+1})$ astfel incat $st - 1 \leq i \leq dr$. Acest lucru este echivalent cu a afla minimul expresiei $prefL_i + suffR_{i+1}$ cu $i$ in intervalul $[st - 1, dr]$. Vom folosi RMQ pentru a afla acest minim.

Sursa de 100 de puncte:

```cpp
#include <fstream>
#include <ctype.h>

const int MAXN = 200'000;
const int LOGN = 18;

std::ifstream fin("excursie.in");
std::ofstream fout("excursie.out");

char v[MAXN + 1];
int n, prefL[MAXN + 1], suffR[MAXN + 2];

int min(int a, int b) {
    return a < b ? a : b;
}

struct SparseTable {
    int spt[LOGN][MAXN + 1], lg2[MAXN + 2];

    void init() {
        int i, j;
        for (i = 2; i <= n + 1; i++) {
            lg2[i] = 1 + lg2[i >> 1];
        }
        for (i = 0; i <= n; i++) {
            spt[0][i] = prefL[i] + suffR[i + 1];
        }
        for (i = 1; i <= lg2[n]; i++) {
            for (j = 0; j + (1 << i) - 1 <= n; j++) {
                spt[i][j] = min(spt[i - 1][j], spt[i - 1][j + (1 << (i - 1))]);
            }
        }
    }

    int query(int st, int dr) {
        int lg = lg2[dr - st + 1];
        return min(spt[lg][st], spt[lg][dr - (1 << lg) + 1]);
    }
} rmq;

void readString() {
    int i, ch;
    fin >> n;
    while (!isalpha(ch = fin.get()));
    for (i = 1; i <= n; i++) {
        v[i] = (ch == 'R');
        ch = fin.get();
    }
}

void computePartialSums() {
    int i;
    for (i = 1; i <= n; i++) {
        prefL[i] = prefL[i - 1] + (1 - v[i]);
    }
    for (i = n; i > 0; i--) {
        suffR[i] = suffR[i + 1] + v[i];
    }
}

void answerQueries() {
    int q, i, st, dr, aux;
    fin >> q;
    for (i = 0; i < q; i++) {
        fin >> st >> dr;
        if (st > dr) {
            aux = st;
            st = dr;
            dr = aux;
        }
        fout << rmq.query(st - 1, dr) - prefL[st - 1] - suffR[dr + 1] << "\n";
    }
}

int main() {
    readString();
    computePartialSums();
    rmq.init();
    answerQueries();
    return 0;
}
```

### Problema [CF 2009G2](https://codeforces.com/contest/2009/problem/G2)

#### Versiunea usoara, [G1](https://codeforces.com/contest/2009/problem/G2)

Sa rezolvam mai intai versiunea usoara. Noi trebuie sa avem $b_i = b_{i+1} - 1 = b_{i+2} - 2 = .. = b_{i+k-1} - (k-1)$. Sa scadem $i$ din aceasta relatie: $b_i - i = b_{i+1} - (i+1) = b_{i+2} - (i+2) = .. = b_{i+k-1} - (i+k-1)$. Acest lucru este echivalent cu: $a_i = a_{i+1} = a_{i+2} = .. = a_{i+k-1}$, unde $a_i = b_i - i$.

Sa precalculam $rez_i = $ frecventa elementului majoritar din intervalul $[i, i + k)$ ($k - rez_l$ va fi raspunsul nostru la un query). $rez$ poate fi calculat folosind [sliding window](https://edu.roalgo.ro/mediu/sliding-window/). Vom mentine un [map](https://edu.roalgo.ro/cppintro/stl/#structura-stdmap) care se cheama $fr$ cu frecventa elementelor si inca un vector de frecventa care se cheama $frfr$ care mentine frecventa fiecarei valori din $fr$.

Cand adaugam o valoare scadem $1$ din $frfr_{fr_{val}}$, crestem $fr_{val}$ si adunam $1$ la noul $frfr_{fr_{val}}$. Daca $fr_{val}$ este mai mare ca rezulatul curent, atunci setam rezultatul curent la $fr_{val}$.

Atunci cand scoatem o valoare, scadem $1$ din $frfr_{fr_{val}}$. Daca $fr_{val}$ era egal cu rezultatul si $frfr_{fr_{val}}$ a devenit $0$, atunci rezultatul scade cu $1$, deoarece $frfr_{fr_{val} - 1}$ a crescut cu $1$. Restul ramane ca la adaugare.

Sursa de accepted la G1:

```cpp
#include <iostream>
#include <map>

const int MAXN = 200'000;

int n, k, q, result, a[MAXN], rez[MAXN], frfr[MAXN + 1];
std::map<int, int> fr;

void fastReadWrite() {
    std::ios_base::sync_with_stdio(0);
    std::cin.tie(0);
    std::cout.tie(0);
}

void readArray() {
    int i;
    std::cin >> n >> k >> q;
    for (i = 0; i < n; i++) {
        std::cin >> a[i];
        a[i] -= i;
    }
}

void addValue(int val) {
    frfr[fr[val]]--;
    fr[val]++;
    frfr[fr[val]]++;
    if (fr[val] > result) {
        result = fr[val];
    }
}

void remValue(int val) {
    frfr[fr[val]]--;
    if (fr[val] == result && frfr[fr[val]] == 0) {
        result--;
    }
    fr[val]--;
    frfr[fr[val]]++;
}

void scanWindows() {
    int i;
    result = 0;
    fr.clear();
    for (i = 0; i < k; i++) {
        addValue(a[i]);
    }
    rez[0] = result;
    for (i = k; i < n; i++) {
        remValue(a[i - k]);
        addValue(a[i]);
        rez[i - k + 1] = result;
    }
    // stergem restul elementelor pentru ca frfr sa fie setat la 0 la final
    for (i = n; i < n + k; i++) {
        remValue(a[i - k]);
    }
}

void answerQueries() {
    int i, st, dr;
    for (i = 0; i < q; i++) {
        std::cin >> st >> dr;
        std::cout << k - rez[st - 1] << "\n";
    }
}

void solveTest() {
    readArray();
    scanWindows();
    answerQueries();
}

int main() {
    int t;
    fastReadWrite();
    std::cin >> t;
    while (t--) {
        solveTest();
    }
    return 0;
}
```

#### Versiunea grea

Noi trebuie, de fapt, sa avem o subsecventa (contigua) de exact $k$ elemente. Observam ca $f(a_l, a_{l+1}, .., a_r) = k - max(rez_l, rez_{l+1}, .., rez_{r-k+1})$ (incercam fiecare subsecventa de $k$ elemente). Asa ca raspunsul nostru este $\sum _{i=l} ^r \ k - max(rez_l, rez_{l+1}, \dots, rez_{i-k+1})$.

Vom gasi, pentru fiecare $i$, la cate sume contribuie $rez_i$. Cu alte cuvinte, vom afla pentru cati $j > i$ avem $max(rez_i, rez_{i+1}, \dots, rez_j) = rez_i$. Fie $nxt_{0, i} = $ cel mai mic $j > i$ astfel incat $rez_j > rez_i$, lucru pe care il vom afla cu [stiva](https://edu.roalgo.ro/mediu/stack/#problema-stack_max_min). Fie $sum_{0, i} = rez_i \cdot (i - nxt_{0, i})$.

Acum, sa presupunem ca avem un arbore, in care $nxt_{0, i}$ reprezinta parintele lui $i$ si $sum_{0, i}$ reprezinta costul muchiei de la $i$ la parintele lui $i$. Noi vom pleca de la $l$, si vom tot merge in tatal nodului, pana cand tatal este mai mare decat $r$. Pentru a afla al catelea tata este cu usurinta, vom precalcula $nxt_{i, j} = $ al $2^i$-lea parinte al lui $j$ si $sum_{i, j} = $ suma costurilor muchiilor lantului de la $j$ la al $2^i$-lea parinte al lui $j$.

$$nxt_{i, j} = nxt_{i-1, nxt_{i-1, j}} \\ sum_{i, j} = sum_{i-1, j} + sum_{i-1, nxt_{i-1, j}}$$

Sursa de accepted:

```cpp
#include <iostream>
#include <map>

const int MAXN = 200'000;
const int LOGN = 18;
const int INFINIT = 1'000'000'000;

int n, k, q, result, a[MAXN], rez[MAXN + 1], frfr[MAXN + 1], stiva[MAXN];
int nxt[LOGN][MAXN + 1];
long long sum[LOGN][MAXN + 1];
std::map<int, int> fr;

void fastReadWrite() {
    std::ios_base::sync_with_stdio(0);
    std::cin.tie(0);
    std::cout.tie(0);
}

void readArray() {
    int i;
    std::cin >> n >> k >> q;
    for (i = 0; i < n; i++) {
        std::cin >> a[i];
        a[i] -= i;
    }
}

void addValue(int val) {
    frfr[fr[val]]--;
    fr[val]++;
    frfr[fr[val]]++;
    if (fr[val] > result) {
        result = fr[val];
    }
}

void remValue(int val) {
    frfr[fr[val]]--;
    if (fr[val] == result && frfr[fr[val]] == 0) {
        result--;
    }
    fr[val]--;
    frfr[fr[val]]++;
}

void scanWindows() {
    int i;
    result = 0;
    fr.clear();
    for (i = 0; i < k; i++) {
        addValue(a[i]);
    }
    rez[0] = result;
    for (i = k; i < n; i++) {
        remValue(a[i - k]);
        addValue(a[i]);
        rez[i - k + 1] = result;
    }
    // stergem restul elementelor pentru ca frfr sa fie setat la 0 la final
    for (i = n; i < n + k; i++) {
        remValue(a[i - k]);
    }
}

void buildTable() {
    int sp, i, j;
    n -= k - 1;
    stiva[0] = n;
    sp = 1;
    nxt[0][n] = n;
    sum[0][n] = 0;
    rez[n] = INFINIT; // infinit
    for (i = n - 1; i >= 0; i--) {
        while (rez[i] > rez[stiva[sp - 1]]) {
            sp--;
        }
        nxt[0][i] = stiva[sp - 1];
        sum[0][i] = 1LL * rez[i] * (stiva[sp - 1] - i);
        stiva[sp++] = i;
    }
    
    for (i = 1; i < LOGN; i++) {
        for (j = 0; j <= n; j++) {
            nxt[i][j] = nxt[i - 1][nxt[i - 1][j]];
            sum[i][j] = sum[i - 1][j] + sum[i - 1][nxt[i - 1][j]];
        }
    }
}

void answerQueries() {
    int i, st, dr, j;
    long long ans = 0;
    for (i = 0; i < q; i++) {
        std::cin >> st >> dr;
        st--;
        dr -= k;
        ans = 1LL * k * (dr - st + 1);
        for (j = LOGN - 1; j >= 0; j--) {
            if (nxt[j][st] <= dr) {
                ans -= sum[j][st];
                st = nxt[j][st];
            }
        }
        ans -= 1LL * rez[st] * (dr - st + 1);
        std::cout << ans << "\n";
    }
}

void solveTest() {
    readArray();
    scanWindows();
    buildTable();
    answerQueries();
}

int main() {
    int t;
    fastReadWrite();
    std::cin >> t;
    while (t--) {
        solveTest();
    }
    return 0;
}
```

!!! note "Observatie"
    Aceasta solutie este foarte asemanatoare cu solutia la problema [stramosi](https://infoarena.ro/problema/stramosi), discutata in articolul de [LCA](https://edu.roalgo.ro/dificil/lowest-common-ancestor/#binary-lifting)

## Concluzii

Sparse Table este una dintre structurile de date care rezolva intrebari pe interval. Chiar daca arborii de intervale pot face aproape tot ce poate face si Sparse Table, de obicei cu o complexitate chiar mai buna, Sparse Table este mai usor de implementat. De asemenea, am vazut ca RMQ poate avea multe avantaje, dar si dezavantaje fata de AINT.

## Probleme suplimentare

* [ONI 2021 Baraj Juniori cartita](https://kilonova.ro/problems/1096)
* [Info1Cup 2021 wonderland](https://kilonova.ro/problems/3147)
* [CF 1175E](https://codeforces.com/contest/1175/problem/E)
* [CF 191C](https://codeforces.com/problemset/problem/191/C)
* [CF 1328E](https://codeforces.com/contest/1328/problem/E)
* [CF 1702G2](https://codeforces.com/contest/1702/problem/G2)
* [CF 832D](https://codeforces.com/problemset/problem/832/D)
* [RMI 2020 Sum Zero](https://oj.uz/problem/view/RMI20_sumzero)
* [EJOI 2021 consecutive1](https://www.pbinfo.ro/probleme/3860/consecutive1)
* [PBinfo minisecvente](https://www.pbinfo.ro/probleme/2865/minisecvente)
* [PBinfo divquery](https://www.pbinfo.ro/probleme/1735/divquery)
* [infoarena euclid](https://infoarena.ro/problema/euclid)
* [infoarena plantatie](https://infoarena.ro/problema/plantatie)
* [CodeChef Maximum of GCDs](https://www.codechef.com/problems/KSIZEGCD)
* [Substring Restrictions - CS Academy](https://csacademy.com/contest/round-15/task/substring-restrictions/)
* [Problemele cu Sparse Table de la articolul de pe CP algorithms](https://cp-algorithms.com/data_structures/sparse-table.html#practice-problems)
* [Probleme cu RMQ de pe kilonova](https://kilonova.ro/tags/289)
* [Probleme cu Binary Lifting de pe kilonova](https://kilonova.ro/tags/708)
* [Problemele de RMQ din acest blog](https://codeforces.com/blog/entry/55274)
* [Problemele din acest blog](https://codeforces.com/blog/entry/70418)

## Resurse suplimentare

* [RMQ - SEPI Infobits F1 (pag. 63)](https://sepi.ro/assets/upload-file/infobits-f1.pdf)
* [Sparse Table - CP algorithms](https://cp-algorithms.com/data_structures/sparse-table.html)
* Recomandat - [Sparse Table - Codeforces](https://codeforces.com/blog/entry/101083)
* Recomandat - [Binary Lifting - Codeforces](https://codeforces.com/blog/entry/100826)
* [Binary Lifting - USACO](https://usaco.guide/plat/binary-jump?lang=cpp)
* [Avansat - RMQ cu $O(N)$ memorie și $O(1)$ timp pe query](https://codeforces.com/blog/entry/78931)
