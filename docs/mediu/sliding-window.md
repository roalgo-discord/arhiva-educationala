---
id: sliding-window
author:
    - Ștefan-Cosmin Dăscălescu
prerequisites:
    - two-pointers
    - sequences
tags:
    - secvente
    - precalculare
---

Așa cum am menționat în articolul despre [lucrul cu
secvențe](../usor/sequences.md), acestea se regăsesc în foarte
multe tipuri de probleme, iar deși acolo am discutat în special despre
problemele de bază, aici vom prezenta o tehnică care va fi utilă pentru
problemele în care trebuie să iterăm prin ferestre de lungime fixă.

!!! info "Definiție"

    Fereastra glisantă (în engleză _sliding window_) reprezintă o metodă de
    rezolvare a problemelor care implică folosirea informației acumulate pentru
    a face tranzițiile între subsecvențe de lungime $k$ cu ușurință, fără a fi
    nevoie de recalcularea răspunsului pentru toate secvențele de lungime $k$.

!!! note "Observație"

    Pe parcursul acestui articol, veți observa diferite structuri de date
    folosite pentru aplicarea conceptelor de aici. Toate acestea vor avea un
    element comun, folosirea unor precalculări pentru a facilita obținerea
    răspunsurilor.

Vom continua prin a prezenta câteva probleme de acest fel, precum și prin a face
legătura cu tehnici mai generale care folosesc principiile de aici, care se vor
aplica și în cazul unor secvențe de lungime variabilă.

### [Țeava - RoAlgo Summer FLASG](https://kilonova.ro/problems/2941/)

O soluție brută a acestei probleme constă în a calcula pe rând toate sumele
corespunzătoare intervalelor de lungime egală cu lungimea intervalului dat, dar
această soluție va rula în $\mathcal{O}(n^2)$.

Pentru a optimiza soluția brută, vom începe prin a calcula în mod brut suma
pentru intervalul $[st, dr]$, iar mai apoi ne vom folosi de faptul că numărul de
valori diferite dintre intervalele $[st, dr]$ și $[st+1, dr+1]$ este exact 2
(cu alte cuvinte, valoarea de pe poziția $st$ nu va mai fi considerată, dar
valoarea de pe poziția $dr+1$ va fi considerată).

În acest mod, soluția va fi optimizată, atingându-se complexitatea dorită, și
anume $\mathcal{O}(n)$. Mai jos puteți găsi implementarea folosind această metodă.

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    vector<int> v(n+1);
    for (int i = 1; i <= n; i++) {
        cin >> v[i];
    }
    
    int st, dr;
    cin >> st >> dr;
    
    // aflam suma initiala
    long long sm = 0;
    for (int i = st; i <= dr; i++) {
        sm += v[i];
    }
    
    // ajustam suma initiala folosind cele doua valori care ies/intra
    long long ans = 0;
    while (dr <= n) {
        ans += sm;
        sm -= v[st];
        sm += v[dr+1];
        st++, dr++;
    }
    
    cout << ans << '\n';
    return 0;
}
```

### [Inaccurate Subsequence Search - Codeforces](https://codeforces.com/contest/1955/problem/D)

Pentru a rezolva această problemă, ne vom folosi de faptul că trebuie să
calculăm numărul maxim de elemente care se potrivesc pentru toate subsecvențele
de lungime $m$.

În cazul acestei probleme, vom putea folosi o structură de date de tip map
pentru a stoca frecvențele numerelor din cele două șiruri, implementarea
folosind acest principiu pentru a ține cu ușurință răspunsul căutat,
complexitatea devenind $\mathcal{O}(n \log n)$.

```cpp
#include <iostream>
#include <map>
#include <vector>

using namespace std;
 
int main() {
 
    // linii pentru citirea rapida, necesare pentru codeforces
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int t;
    cin >> t;
    
    while (t--) {
        int n, m, k;
        cin >> n >> m >> k;
        map<int, int> mpa, mpb;
        
        vector<long long> v(n+1), v2(m+1);
        for (int i = 1; i <= n; i++) {
            cin >> v[i];
        }
        for (int i = 1; i <= m; i++) {
            cin >> v2[i];
            mpa[v2[i]]++;
        }
        int cnt = 0, total = 0;
        for (int i = 1; i <= n; i++) {
            cnt -= min(mpa[v[i]], mpb[v[i]]);
            mpb[v[i]]++;
            cnt += min(mpa[v[i]], mpb[v[i]]);
            if (i > m) {
                cnt -= min(mpa[v[i-m]], mpb[v[i-m]]);
                mpb[v[i-m]]--;
                cnt += min(mpa[v[i-m]], mpb[v[i-m]]);
            }
            if (i >= m && cnt >= k) {
                total++;
            }
        }
        cout << total << '\n';
    }
    return 0;
}
```

### [Sliding Window Median](https://cses.fi/problemset/task/1076)

La fel ca la celelalte două probleme, vom vrea să procesăm fiecare element care
intră, împreună cu fiecare element care iese fără a schimba prea mult datele
problemei.

Soluția descrisă mai jos se bazează pe faptul că ținem în două seturi valorile
mai mici decât mediana și cele mai mari decât mediana, iar atunci când ajustăm
fereastra noastră, vom echilibra dimensiunile seturilor în mod convenabil pentru
a putea accesa în continuare mediana cu ușurință, folosind funcțiile specifice
std::set.

```cpp
#include <iostream>
#include <vector>
#include <set>

using namespace std;
 
int main() {

    int n, k;
    cin >> n >> k;
    
    vector<int> v(n+1);
    multiset<int> smaller, larger;
    for (int i = 1; i <= n; i++) {
        cin >> v[i];
    }
    
    for (int i = 1; i <= n; i++) {
        smaller.insert(v[i]);
        if (i > k) {
            if (smaller.find(v[i-k]) != smaller.end()) {
                smaller.erase(smaller.lower_bound(v[i-k]));
            }
            else {
                larger.erase(larger.lower_bound(v[i-k]));
            }
        }
        if (i >= k) {
            for (int i = 1; i <= 2; i++) {
                if (!larger.empty()) {
                    int x = *larger.begin();
                    larger.erase(larger.lower_bound(x));
                    smaller.insert(x);
                }
            }
            while (smaller.size() - 1 >= larger.size() + 1) {
                int x = *smaller.rbegin();
                smaller.erase(smaller.lower_bound(x));
                larger.insert(x);
            }
            cout << *smaller.rbegin() << " ";
        }
    }
    return 0;
}
```

## Alte aplicații și concluzii

Metode de tipul sliding window se pot folosi și în cazul altor tehnici, precum
[tehnica celor doi pointeri](./two-pointers.md), multe dintre aplicațiile
întâlnite la [deque](./deque.md) și alte structuri de date mai complicate decât
scopul acestui articol, care este unul de legătură dintre aplicațiile întâlnite
la problemele cu secvențe și cele mai avansate, din capitolele următoare.

## Probleme suplimentare

- [OJI 2024 Santinele](https://kilonova.ro/problems/2502)
- [Strip Codeforces](https://codeforces.com/contest/488/problem/D)
- [Sliding Window Cost](https://cses.fi/problemset/task/1077)
- [Max Subarray Sum II](hhttps://cses.fi/problemset/task/1644)
- [slidingwindow infoarena](https://www.infoarena.ro/problema/slidingwindow)
- [Fence Codeforces](https://codeforces.com/problemset/problem/363/B)

## Lectură suplimentară

- [Sliding Window - USACO
  Guide](https://usaco.guide/gold/sliding-window?lang=cpp)
