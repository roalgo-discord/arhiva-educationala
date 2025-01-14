---
tags:
    - structuri de date
    - RMQ
    - optimizare
    - sparse table
    - binary lifting
---

**Autor**: Traian Mihai Danciu

!!! example "Cunoștințe necesare"
    - [Matrici (tablouri bidimensionale)](https://edu.roalgo.ro/cppintro/matrices/)
    - [Sume parțiale](https://edu.roalgo.ro/usor/partial-sums/)

## Introducere

**Sparse Table** este o structură de date care ne ajută, în principal, să
răspundem la întrebări pe un interval, fiecare răspuns fiind calculat în $O(\log
n)$ (mai puțin atunci când folosim RMQ, despre care o să discutăm mai târziu în
acest articol).

## Sparse Table. Binary Lifting

Să luăm ca exemplu problema [Static Range Sum
Queries](https://cses.fi/problemset/task/1646) de pe CSES. Desigur că o putem
rezolva folosind [sume parțiale](https://edu.roalgo.ro/usor/partial-sums/), dar
haideți să încercăm o metodă nouă.

Fie $spt_{i, j}$ suma numerelor din intervalul $[j, j + 2^i)$. Când avem o
întrebare pe intervalul $[st, dr]$, îl vom împărți în intervale de lungimi
puteri de $2$. Lungimile acestor intervale vor fi egale cu biții din
reprezentarea în baza $2$ a lui $dr - st + 1$. Această metodă se cheamă **binary
lifting**.

!!! warning "Atenție"

    Este foarte important ca, în $spt_{i, j}$, $2^i$ să fie lungimea intervalului și
    $j$ să fie primul element. Dacă implementăm altfel, timpul implementării va
    crește foarte mult. Unoeri, acest lucru poate duce și la TLE. Mai multe detalii
    puteți găsi în [acest blog](https://codeforces.com/blog/entry/75611). 

!!! note "Observație"

    [LCA](https://edu.roalgo.ro/dificil/lowest-common-ancestor/) este calculat, de
    asemenea, folosind binary lifting. Căutarea binară în
    [AIB](https://edu.roalgo.ro/dificil/fenwick-tree/) folosește, de asemenea,
    binary lifting.

Sursa de 100:

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

Așa cum îi spune și numele, la **Range Minimum Query (RMQ)**, avem întrebări la
care trebuie să răspundem cu minimul pe un interval. Vom folosi un sparse table.

Ideea principală la RMQ este să împărțim intervalul $[st, dr]$ în două
intervale: $[st, st + 2^{lg}), (dr - 2^{lg}, dr]$ (unde $lg$ reprezintă cel mai
mare număr astfel încât $2^{lg} \leq dr - st + 1$). Aceste intervale au lungimea
$2^{lg}$, deci le putem afla răspunsurile în $O(1)$ (deoarece le avem deja
precalculate).

!!! note "Observație"

    Noi repetăm elementele din intervalul $(st + 2^{lg}, dr - 2^{lg})$. Acest lucru
    nu ne afectează, deoarece $min(x, x) = x$.

!!! note "Observație"

    Vom precalcula un vector $lg2_i = $ cel mai mare $j$ astfel încât $2^j \leq i$.
    Acest vector ne va ajuta să calculăm $lg$ ușor.

Tabloul $spt$ se calculează la fel ca înainte.

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

!!! note "Observație"

    RMQ poate fi folosit cu orice operație $f$ care este
    [idempotentă](https://en.wikipedia.org/wiki/Idempotence), adică $f(x, x) = x$
    (minim, maxim, cmmdc etc). Avem nevoie de acest lucru, deoarece, cum am observat
    mai sus, noi repetăm anumite elemente.

## RMQ 2D

Putem face RMQ și pe matrice. Să luam ca exemplu problema [CF
713D](https://codeforces.com/contest/713/problem/D).

Să calculăm, mai întâi $maxp_{i, j} = $ latura celui mai mare dreptunghi care
are doar valori de $1$ și are colțul dreapta-jos în $(i, j)$. Această metodă se
cheamă [programare dinamică](https://edu.roalgo.ro/usor/intro-dp/).

$$
maxp_{i, j} = \begin{cases} 0 &\text{dacă } i = 0 \text{ sau } j = 0 \\ 0 &\text{dacă } i, j > 0 \text{ și } a_{i, j} = 0 \\ min(maxp_{i-1, j}, maxp_{i, j-1}, maxp_{i-1, j-1}) + 1 &\text{dacă } i, j > 0 \text{ și } a_{i, j} = 1 \end{cases}
$$

Acum, să vedem cum se calculează $spt$. Fie $spt_{i, j, l, c} = $ maximul
elementelor din submatricea cu colțul stânga-sus la $(i, j)$ și cu colțul
dreapta-jos la $(l+2^i-1, c+2^j-1)$ din $maxp$.

$$
spt_{i, j, l, c} = \begin{cases} maxp_{l, c} &\text{dacă } i = 0, j = 0 \\ max(spt_{i-1, j, l, c}, spt_{i-1, j, l, c + 2^{i-1}}) &\text{dacă } i = 0, j > 0 \\ max(spt_{i, j-1, l, c}, spt_{i, j-1, l + 2^{i-1}, c}) &\text{dacă } i > 0, j = 0 \\ max(spt_{i-1, j-1, l, c}, spt_{i-1, j-1, l + 2^{i-1}, c}, spt_{i-1, j-1, l, c + 2^{j-1}}, spt_{i-1, j-1, l + 2^{i-1}, c + 2^{j-1}}) &\text{dacă } i, j > 0 \end{cases}
$$

Să vedem cum se calculează răspunsul pentru o întrebare pe un dreptunghi cu
colțul stânga-sus în $(l_1, c_1)$ și coltul dreapta-jos în $(l_2, c_2)$. Fie
$lgl = $ cel mai mare număr astfel încât $2^{lgl} \leq l_2-l_1+1$ și $lgc = $
cel mai mare număr astfel încât $2^lgc \leq c_2-c_1+1$.

$$query(l_1, c_1, l_2, c_2) = max(spt_{lgl, lgc, l_1, c_1}, spt_{lgl, lgc, l_2 - 2^{lgl} + 1, c_1}, spt_{lgl, lgc, l_1, c_2 - 2^{lgc} + 1}, spt_{lgl, lgc, l_2 - 2^{lgl} + 1, c_2 - 2^{lgc} + 1})$$

Mai departe, observăm că noi nu avem cum sa aflăm direct răspunsul, deoarece
unele rezultate pot ieși din dreptunhiul în care suntem întrebați. Așa că, vom
[căuta binar](https://edu.roalgo.ro/usor/binary-search/) răspunsul.

Cum verificăm dacă avem vreun pătrat de latură cel puțin $k$? Vom verifica dacă:

$$query(l_2-k+1, c_2-k+1, l_2, c-2) \geq k$$

Adică vom verifica dacă există vreun colț dreapta-jos care formează un pătrat de
latură cel puțin $k$.

Sursa de Accepted:

```cpp
#include <iostream>

const int MAXN = 1'000;
const int LOGN = 11;

int mat[MAXN + 1][MAXN + 1], maxp[MAXN + 1][MAXN + 1], n, m;

int min(int a, int b) {
    return a < b ? a : b;
}

int min(int a, int b, int c) {
    return min(min(a, b), c);
}

int max(int a, int b) {
    return a > b ? a : b;
}

int max(int a, int b, int c, int d) {
    return max(max(a, b), max(c, d));
}

struct SparseTable2D {
    int spt[LOGN][LOGN][MAXN + 1][MAXN + 1], lg2[MAXN + 1];

    void init() {
        int i, j, l, c;
        for (i = 2; i <= MAXN; i++) {
            lg2[i] = 1 + lg2[i >> 1];
        }
        for (l = 1; l <= n; l++) {
            for (c = 1; c <= m; c++) {
                spt[0][0][l][c] = maxp[l][c];
            }
        }
        for (i = 1; i <= lg2[n]; i++) {
            for (l = 1; l <= n; l++) {
                for (c = 1; c <= m; c++) {
                    spt[i][0][l][c] = max(spt[i - 1][0][l][c], spt[i - 1][0][l + (1 << (i - 1))][c]);
                }
            }
        }
        for (j = 1; j <= lg2[m]; j++) {
            for (l = 1; l <= n; l++) {
                for (c = 1; c <= m; c++) {
                    spt[0][j][l][c] = max(spt[0][j - 1][l][c], spt[0][j - 1][l][c + (1 << (j - 1))]);
                }
            }
        }
        for (i = 1; i <= lg2[n]; i++) {
            for (j = 1; j <= lg2[m]; j++) {
                for (l = 1; l + (1 << i) - 1 <= n; l++) {
                    for (c = 1; c + (1 << j) - 1 <= m; c++) {
                        spt[i][j][l][c] = max(spt[i - 1][j - 1][l][c], spt[i - 1][j - 1][l][c + (1 << (j - 1))],
                                spt[i - 1][j - 1][l + (1 << (i - 1))][c], spt[i - 1][j - 1][l + (1 << (i - 1))][c + (1 << (j - 1))]);
                    }
                }
            }
        }
    }

    int query(int l1, int c1, int l2, int c2) {
        int lgl = lg2[l2 - l1 + 1], lgc = lg2[c2 - c1 + 1];
        return max(spt[lgl][lgc][l1][c1], spt[lgl][lgc][l1][c2 - (1 << lgc) + 1], spt[lgl][lgc][l2 - (1 << lgl) + 1][c1],
                   spt[lgl][lgc][l2 - (1 << lgl) + 1][c2 - (1 << lgc) + 1]);
    }
} rmq2d;

void fastReadWrite() {
    std::ios_base::sync_with_stdio(0);
    std::cin.tie(0);
}

void readMatrix() {
    int l, c;
    std::cin >> n >> m;
    for (l = 1; l <= n; l++) {
        for (c = 1; c <= m; c++) {
            std::cin >> mat[l][c];
        }
    }
}

void computeMaxp() {
    int l, c;
    for (l = 1; l <= n; l++) {
        for (c = 1; c <= m; c++) {
            if (mat[l][c] == 0) {
                maxp[l][c] = 0;
            }
            else {
                maxp[l][c] = 1 + min(maxp[l - 1][c], maxp[l][c - 1], maxp[l - 1][c - 1]);
            }
        }
    }
}

void answerQueries() {
    int l1, c1, l2, c2, q, st, dr, mij;
    std::cin >> q;
    while (q--) {
        std::cin >> l1 >> c1 >> l2 >> c2;
        st = 0; // intervalul este [) (inchis-deschis)
        dr = min(l2 - l1 + 1, c2 - c1 + 1) + 1; // patratul maxim care este inclus
        while (dr - st > 1) {
            mij = (st + dr) / 2;
            if (rmq2d.query(l1 + mij - 1, c1 + mij - 1, l2, c2) >= mij) {
                st = mij;
            }
            else {
                dr = mij;
            }
        }
        std::cout << st << "\n";
    }
}

int main() {
    fastReadWrite();
    readMatrix();
    computeMaxp();
    rmq2d.init();
    answerQueries();
    return 0;
}
```

## Reverse RMQ

Putem să rezolvăm și probleme în care avem doar actualizări, fără întrebări,
adica o problemă în care avem actualizări de forma $a_i = max(a_i, x)$, pentru
$l \leq i \leq r$. O putem rezolva asemănător, folosind aceleași intervale ca la
RMQ normal și modificând astfel:

$$spt_{lg, st} = max(spt_{lg, st}, x) \\ spt_{lg, dr - 2^{lg} + 1} = max(spt_{lg, dr - 2^{lg} + 1}, x)$$

Apoi, valoarea $a_i$ finală va fi maximul dintre toate valorile din orice
interval care este actualizat în $spt$ și include $i$. Calculăm această valoare
folosind un proces similar cu propagarea lazy de la [arbori de
intervale](https://edu.roalgo.ro/dificil/segment-trees/). Rezultatul din
$spt_{i, j}$ va fi propagat doar în $spt_{i - 1, j}$ și $spt_{i - 1, j +
2^{i-1}}$, deoarece acestea sunt singurele intervale necesare pentru a ne
asigura că rezultatul ajunge la toate pozițiile din șir. Pentru mai multe
detalii vedeți implementarea.

Sursa de accepted (la problema [Glad You Came de pe
codeforces](https://codeforces.com/gym/102114/problem/G))

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

## RMQ sau Arbori de intervale?

Arborii de intervale (AINT) pot face tot ce poate face RMQ, dar haideți să
comparăm aceste două structuri de date.

### Comparație în funcție de timp

RMQ este precalculat, la început, în $O(n \log n)$, iar AINT în $O(n)$. Însă,
RMQ are complexitate $O(1)$ per query, În timp ce AINT are $O(\log n)$ per
query.

### Comparație în funcție de memorie

RMQ folosește $O(n \log n)$ memorie, iar AINT folosește $O(n)$ memorie.

### Alte precizări

AINT poate rezolva și alte probleme pe care RMQ nu le poate rezolva. La astfel
de probleme, putem folosi un Sparse Table normal, rezultând aceeași complexitate
ca la AINT la query-uri. Acest lucru înseamnă că AINT este mai folositor în
acest caz, chiar dacă este mai greu de implementat.

În același timp, AINT poate trata și actualizări împreună cu interogări, iar RMQ
nu le poate trata. În această situație, RMQ nu intră în calcul atunci când dorim
să găsim cea mai bună structură de date pentru a rezolva o anumită problemă.

### Concluzie

AINT este, de obicei, mai folositor ca RMQ, mai puțin atunci când numărul de
query-uri este cu mult mai mare decât numărul de elemente sau atunci când dorim
să nu scriem prea multe linii de cod.

## Probleme rezolvate

### Problema [Lot 2023 Juniori excursie](https://kilonova.ro/problems/619)

Observăm că indicatoarele trebuie să fie de forma RRR...RLLL..L. Să fixam
poziția $i$ până la care vom avea R-uri. Costul va fi egal cu numărul de L-uri
de la $st$ la $i$ adunat cu numărul de R-uri de la $i + 1$ la $dr$. Aceste
lucruri pot fi calculate ușor folosind sume parțiale.

Fie $prefL_i = $ câte L-uri sunt de la $1$ la $i$ și $suffR_i = $ câte R-uri
sunt de la $i$ la $n$. Atunci răspunsul va fi $min(prefL_i - prefL_{st-1} +
suffR_{i+1} - suffR_{dr+1})$ astfel încât $st - 1 \leq i \leq dr$. Acest lucru
este echivalent cu a afla minimul expresiei $prefL_i + suffR_{i+1}$ cu $i$ in
intervalul $[st - 1, dr]$. Vom folosi RMQ pentru a afla acest minim.

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

#### Versiunea ușoară, [G1](https://codeforces.com/contest/2009/problem/G2)

Să rezolvăm mai întâi versiunea ușoară. Noi trebuie să avem $b_i = b_{i+1} - 1 =
b_{i+2} - 2 = .. = b_{i+k-1} - (k-1)$. Să scădem $i$ din această relație: $b_i -
i = b_{i+1} - (i+1) = b_{i+2} - (i+2) = .. = b_{i+k-1} - (i+k-1)$. Acest lucru
este echivalent cu: $a_i = a_{i+1} = a_{i+2} = .. = a_{i+k-1}$, unde $a_i = b_i
- i$.

Să precalculam $rez_i = $ frecvența elementului majoritar din intervalul $[i, i
+ k)$ ($k - rez_l$ va fi răspunsul nostru la un query). $rez$ poate fi calculat
folosind [sliding window](https://edu.roalgo.ro/mediu/sliding-window/). Vom
menține un [map](https://edu.roalgo.ro/cppintro/stl/#structura-stdmap) care se
cheamă $fr$ cu frecvența elementelor și înca un [vector de
frecvență](https://edu.roalgo.ro/usor/frequency-arrays/) care se cheamă $frfr$
care menține frecvența fiecărei valori din $fr$.

Când adaugăm o valoare, scădem $1$ din $frfr_{fr_{val}}$, creștem $fr_{val}$ cu
$1$ și adunăm $1$ la noul $frfr_{fr_{val}}$. Dacă $fr_{val}$ este mai mare ca
rezulatul curent, atunci setăm rezultatul curent la $fr_{val}$.

Atunci când scoatem o valoare, scădem $1$ din $frfr_{fr_{val}}$. Dacă $fr_{val}$
era egal cu rezultatul și $frfr_{fr_{val}}$ a devenit $0$, atunci rezultatul
scade cu $1$, deoarece $frfr_{fr_{val} - 1}$ a crescut cu $1$. Restul rămâne la
fel ca la adăugare.

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

Noi trebuie, de fapt, să avem o subsecvență (contiguă) de exact $k$ elemente.
Observăm că $f(a_l, a_{l+1}, .., a_r) = k - max(rez_l, rez_{l+1}, ..,
rez_{r-k+1})$ (încercăm fiecare subsecvență de $k$ elemente). Așa că, răspunsul
nostru este $\sum _{i=l} ^r \ k - max(rez_l, rez_{l+1}, \dots, rez_{i-k+1})$.

Vom găsi, pentru fiecare $i$, la câte sume contribuie $rez_i$. Cu alte cuvinte,
vom afla pentru câți $j > i$ avem $max(rez_l, rez_{l+1}, \dots, rez_j) = rez_i$.
De asemenea, pentru a nu număra de mai multe ori anumite sume, vom presupune că
nu există $l \leq p < i$ astfel încât $rez_p = rez_i$. Fie $nxt_{0, i} = $ cel
mai mic $j > i$ astfel încât $rez_j >= rez_i$, lucru pe care îl vom afla cu
[stivă](https://edu.roalgo.ro/mediu/stack/#problema-stack_max_min). Fie $sum_{0,
i} = rez_i \cdot (i - nxt_{0, i})$.

Acum, să presupunem că avem un arbore, în care $nxt_{0, i}$ reprezintă părintele
lui $i$ și $sum_{0, i}$ reprezintă costul muchiei de la $i$ la părintele lui
$i$. Noi vom pleca de la $l$ și vom tot merge în tatăl nodului, până când
indicele tatălui este mai mare decât $r$. Pentru a afla al câtelea tată este cu
ușurinta, vom precalcula $nxt_{i, j} = $ al $2^i$-lea tată al lui $j$ și
$sum_{i, j} = $ suma costurilor muchiilor lanțului de la $j$ la cel de-al
$2^i$-lea tată al lui $j$.

$$nxt_{i, j} = nxt_{i-1, nxt_{i-1, j}} \\ sum_{i, j} = sum_{i-1, j} + sum_{i-1,
nxt_{i-1, j}}$$

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
    
    Această soluție este foarte asemănătoare cu soluția la problema
    [strămoși](https://infoarena.ro/problema/stramosi), discutată în articolul de
    [LCA](https://edu.roalgo.ro/dificil/lowest-common-ancestor/#binary-lifting)

## Concluzii

Sparse Table este una dintre structurile de date care răspunde la întrebări pe
un interval într-un șir static. Chiar dacă arborii de intervale pot face aproape
tot ce poate face și Sparse Table, de obicei cu o complexitate chiar mai bună,
Sparse Table este mai ușor de implementat. De asemenea, am văzut că RMQ poate
avea multe avantaje, dar și dezavantaje față de AINT.

## Probleme suplimentare

- [ONI 2021 Baraj Juniori cartita](https://kilonova.ro/problems/1096)
- [Info1Cup 2021 wonderland](https://kilonova.ro/problems/3147)
- [CF 1175E](https://codeforces.com/contest/1175/problem/E)
- [CF 191C](https://codeforces.com/problemset/problem/191/C)
- [CF 1328E](https://codeforces.com/contest/1328/problem/E)
- [CF 1702G2](https://codeforces.com/contest/1702/problem/G2)
- [CF 832D](https://codeforces.com/problemset/problem/832/D)
- [RMI 2020 Sum Zero](https://oj.uz/problem/view/RMI20_sumzero)
- [EJOI 2021 consecutive1](https://www.pbinfo.ro/probleme/3860/consecutive1)
- [PBinfo minisecvente](https://www.pbinfo.ro/probleme/2865/minisecvente)
- [PBinfo divquery](https://www.pbinfo.ro/probleme/1735/divquery)
- [infoarena euclid](https://infoarena.ro/problema/euclid)
- [infoarena plantatie](https://infoarena.ro/problema/plantatie)
- [CodeChef Maximum of GCDs](https://www.codechef.com/problems/KSIZEGCD)
- [Substring Restrictions - CS
  Academy](https://csacademy.com/contest/round-15/task/substring-restrictions/)
- [Problemele cu Sparse Table de la articolul de pe CP
  algorithms](https://cp-algorithms.com/data_structures/sparse-table.html#practice-problems)
- [Probleme cu RMQ de pe kilonova](https://kilonova.ro/tags/289)
- [Probleme cu Binary Lifting de pe kilonova](https://kilonova.ro/tags/708)
- [Problemele de RMQ din acest blog](https://codeforces.com/blog/entry/55274)
- [Problemele din acest blog](https://codeforces.com/blog/entry/70418)

## Resurse suplimentare

- [RMQ - SEPI Infobits F1 (pag.
  63)](https://sepi.ro/assets/upload-file/infobits-f1.pdf)
- [Sparse Table - CP
  algorithms](https://cp-algorithms.com/data_structures/sparse-table.html)
- Recomandat - [Sparse Table -
  Codeforces](https://codeforces.com/blog/entry/101083)
- Recomandat - [Binary Lifting -
  Codeforces](https://codeforces.com/blog/entry/100826)
- [Binary Lifting - USACO](https://usaco.guide/plat/binary-jump?lang=cpp)
- [Avansat - RMQ cu $O(N)$ timp de construcție și $O(1)$ timp pe
  query](https://codeforces.com/blog/entry/78931)
