---
tags:
    - C++
    - implementare
    - grafuri
    - cicluri
---

## Introducere

În general, când vine vorba de lucrul cu cicluri în problemele cu grafuri, lucrurile pot fi mai dificile, iar din acest motiv vrem să formalizăm procesul de aflare a unor cicluri în grafuri, fie că e vorba de grafuri orientate sau neorientate, iar mai apoi vom discuta și despre un tip special de grafuri, grafurile funcționale. 

Vom începe prin a relua definiția discutată la articolul anterior [despre grafuri](https://edu.roalgo.ro/usor/graphs/).

!!! info "Ciclu"
    O secvență de muchii $(v_1, v_2, ..., v_k, v_1)$ formează un **ciclu** dacă $(v_i, v_{i + 1}) \in E$ pentru orice $1 \leq i < k$ și $(v_k, v_1) \in E$.
    Un ciclu este **simplu** dacă $v_i \neq v_j$ pentru orice $1 \leq i < j < k$.

    Altfel spus, un **ciclu** reprezintă o secvență de muchii ce nu se repetă,
    pleacă de la un nod $v_1$ și parcurgând în ordine acele muchii, se ajunge tot la
    nodul $v_1$. Un ciclu simplu este un ciclu în care nu se repetă noduri.

În cele ce urmează, vom prezenta câteva tehnici care pleacă de la cunoașterea ciclurilor în grafuri, precum și modurile în care acestea pot fi implementate. Modul de implementare a acestor algoritmi va fi exclusiv folosind structuri și metode din [STL](https://edu.roalgo.ro/cppintro/stl/), scopul acestor aplicații fiind în special aplicațiile care apar la olimpiadele și concursurile de informatică. 

## Cicluri euleriene

!!! info "Ciclu eulerian"
    Un lanț eulerian este un lanț care conține toate muchiile exact o singură dată (dar nodurile se pot vizita iar). Un ciclu eulerian este un lanț eulerian care începe și se termină în același nod. 

!!! note "Gradele nodurilor"
    Mai întâi, o condiție necesară și suficientă este aceea că toate nodurile trebuie să poată fi vizitate, iar gradele nodurilor să fie pare.

Acest lucru poate fi arătat ușor, presupunând că putem avea un ciclu eulerian care să conțină un nod cu grad impar. Dacă începem ciclul nostru acolo, nu îl vom putea termina acolo, deoarece după ce folosim o muchie să părăsim nodul, vom avea un număr par de muchii adiacente nodului curent. Jumătate dintre ele ar trebui să fie folosite pentru a intra acolo, cealaltă jumătate pentru a ieși, deci am fi nevoiți să ieșim de acolo cu ultima muchie, contradicție. Dacă nu începem acolo, vom fi la un moment dat blocați, deci avem iar contradicție. 

!!! info "Lanț eulerian când avem noduri cu grad impar"
    Totuși, putem construi un lanț eulerian dacă avem noduri cu grad impar, atâta timp cât avem exact două noduri cu grad impar și începem și terminăm în nodurile cu grad impar. 

Pentru a afla dacă graful dat admite un ciclu eulerian, vom putea folosi algoritmul lui Fleury. 

Algoritmul lui Fleury este unul recursiv, acesta bazându-se pe faptul că pentru un nod oarecare, atâta timp cât mai avem muchii adiacente cu el care nu au fost folosite, vom apela recursiv funcția pentru nodul adiacent muchiei curente. Dacă la un moment dat avem o muchie nefolosită, o marcăm drept vizitată și mergem mai departe. Se remarcă faptul că nodurile sunt adăugate la răspuns în ordinea inversă în care apelăm funcțiile.

În general, dacă identificăm faptul că o problemă necesită cicluri euleriene, odată ce avem implementarea de bază completă, o mare parte din problemă este completă, algoritmul fiind relativ ușor de învățat. 

Mai jos se poate observa o implementare C++ pentru problema [ciclueuler de pe infoarena](https://www.infoarena.ro/problema/ciclueuler).

```cpp
#include <fstream>
#include <vector>

using namespace std;

vector<vector<pair<int, int>>> graph;
vector<int> grad, visN, visM, sol;

void dfs (int node) {
    visN[node] = 1;
    for(auto next : graph[node]) {
        if(!visN[next.first]) {
            dfs(next.first);
        }
    }
}

void euler (int node) {
    while (graph[node].size() > 0) {
        int next = graph[node].back().first;
        int next_edge = graph[node].back().second;
        graph[node].pop_back();
        if (!visM[next_edge]) {
            visM[next_edge] = 1;
            euler(next);
        }
    }
    sol.push_back(node);
}



int main() {
    ifstream cin("ciclueuler.in");
    ofstream cout("ciclueuler.out");
    
    int n, m;
    cin >> n >> m;
    
    graph.resize(n+1);
    grad.resize(n+1);
    visN.resize(n+1);
    visM.resize(m+1);
    
    for (int i = 1; i <= m; i++) {
        int a, b;
        cin >> a >> b;
        grad[a]++;
        grad[b]++;
        graph[a].push_back({b, i});
        graph[b].push_back({a, i});
    }
    dfs(1);
    
    // daca exista un nod nevizitat sau gradul lui e impar, nu avem ciclu eulerian
    int ok = 1;
    for (int i = 1; i <= n; i++) {
        if (visN[i] == 0 || grad[i] % 2 == 1) {
            ok = 0;
        }
    }
    if(ok == 0) {
        cout << -1 << '\n';
    } else {
        euler(1);
        sol.pop_back();
        for(auto node : sol) {
            cout << node << " ";
        }
    }
    return 0;
}
```

!!! note "Observație"
    Algoritmul lui Fleury se poate implementa și iterativ, folosind un principiu similar cu cel descris mai sus, implementarea putând fi făcută cu o stivă sau un deque. 

```cpp
deque<int> dq;
dq.push_back(1);
while (!dq.empty()) {
    x = dq.back();
    while (!v[x].empty() && vizitat[v[x].back().first]) {
        v[x].pop_back();
    }
    if (v[x].empty()) {
        dq.pop_back();
        ans.push_back(x);
    } else {
        vizitat[v[x].back().first] = true;
        dq.push_back(v[x].back().second);
        v[x].pop_back();
    }
}
```

### Problemă exemplu - [Domino](https://www.infoarena.ro/problema/domino)

Această problemă se reduce la aflarea unui lanț eulerian în graful descris în enunț. 

Graful din enunț are doar $10$ noduri și vom folosi proprietățile descrise mai devreme în articol, unde am menționat faptul că este obligatoriu să începem dintr-un nod cu grad impar pentru a avea lanț eulerian. Dacă toate nodurile au grad par, nu contează de unde începem.

Dacă avem mai mult de $2$ noduri cu grad impar, atunci nu avem soluție. În mod similar, și dacă nu putem parcurge toate muchiile.

!!! note "Observație"
    Se poate observa faptul că algoritmul dat este foarte similar cu cel descris pentru ciclul eulerian. 

```cpp
#include <fstream>
#include <vector>
#include <algorithm>

using namespace std;
    
vector<vector<pair<int, int>>> graph;
vector<int> grad, visM;

vector<pair<int, int> > sol;
void euler (int node) {
    while (graph[node].size() > 0) {
        int next = graph[node].back().first;
        int next_edge = graph[node].back().second;
        int sgn = 0;
        if (next_edge < 0) {
            next_edge *= -1;
            sgn = 1;
        }
        graph[node].pop_back();
        if (!visM[next_edge]) {
            visM[next_edge] = 1;
            euler(next);
            sol.push_back({next_edge, sgn});
        }
    }
}



int main() {
    ifstream cin("domino.in");
    ofstream cout("domino.out");
    
    int n;
    cin >> n;
    
    graph.resize(10);
    grad.resize(10);
    visM.resize(n+1);
    
    for (int i = 1; i <= n; i++) {
        int a, b;
        cin >> a >> b;
        grad[a]++;
        grad[b]++;
        graph[a].push_back({b, i});
        graph[b].push_back({a, -i});
    }
    
    int impar = 0;
    int ok = -1;
    for (int i = 0; i <= 9; i++) {
        if (grad[i] > 0) {
            if (grad[i] % 2 == 1) {
                ok = i;
                impar++;
            }
            else {
                if (ok == -1) {
                    ok = i;
                }
            }
        }
    }
    if (impar != 0 && impar != 2) {
        cout << 0 << '\n';
    } 
    else {
        euler(ok);
        if ((int) sol.size() != n) {
            cout << 0 << '\n';
        }
        else {
            cout << 1 << '\n';
            reverse(sol.begin(), sol.end());
            for (auto x : sol) {
                cout << x.first << " " << x.second << '\n';
            }
        }
    }
    return 0;
}
```

## Cicluri hamiltoniene

!!! info "Ciclu hamiltonian"
    Un lanț hamiltonian este un lanț care conține toate nodurile exact o singură dată. În mod similar, un ciclu hamiltonian este un ciclu care conține toate nodurile exact o singură dată. 

În general, pentru a afla un ciclu hamiltonian, putem folosi metode de tip brute-force, precum backtracking. 

Aici puteți găsi implementarea în C++ pentru problema [Hamilton de pe pbinfo](https://www.pbinfo.ro/probleme/548/hamilton).

Se poate observa că pentru a optimiza implementarea, am folosit o mască pe biți pentru a ține nodurile deja vizitate, dar algoritmul va rămâne unul exponențial din punct de vedere al timpului și memoriei utilizate.

```cpp
#include <fstream>
#include <vector>

using namespace std;

int n;
vector<vector<int>> graph;
vector<int> sol, cd;

int ord[11];

void bkt (int node, int msk) {
    ord[++ord[0]] = node;
    if (!sol.empty()) {
        return;
    }
    for (auto x : graph[node]) {
        if (msk == (1<<n) - 1 && x == 1) {
            for (int i = 1; i <= ord[0]; i++) {
                sol.push_back(ord[i]);
            }
            sol.push_back(1);
            return;
        }
        if (msk & (1<<(x-1))) {
            continue;
        }
        bkt(x, msk ^ (1<<(x-1)));
    }
    --ord[0];
}
int main() {
    ifstream cin("hamilton.in");
    ofstream cout("hamilton.out");
    
    cin >> n;
    graph.resize(n+1);
    
    int a, b;
    while (cin >> a >> b) {
        graph[a].push_back(b);
        graph[b].push_back(a);
    }
    
    bkt(1, 1);
    
    if (sol.empty()) {
        cout << 0 << '\n';
    }
    else {
        cout << 1 << '\n';
        for (auto x : sol) {
            cout << x << " ";
        }
    }
    return 0;
}
```

Ulterior, în alte probleme precum cele în care avem nevoie de dinamici pe măști, vom discuta aplicații avansate ale acestor cicluri, așa cum sunt prezentate [în acest articol](https://edu.roalgo.ro/mediu/bitmask-dp/#problema-hamiltonian-flights).

## Grafuri funcționale

!!! info "Grafuri funcționale"    
    Un graf funcțional este un graf orientat cu $n$ noduri și $n$ muchii, cu proprietatea că fiecare nod are o singură muchie care pleacă din el. 

Cu alte cuvinte, aceste grafuri sunt o reuniune de cicluri, împreună cu niște lanțuri atașate de ele. 

Aceste grafuri, datorită formei lor speciale, au multe proprietăți interesante și fac prelucrarea lor mai ușoară. De multe ori, vom vrea să filtrăm nodurile care nu fac parte din cicluri, iar mai apoi, să lucrăm cu fiecare ciclu în mod independent. Vom folosi câteva exemple pentru a prezenta acest concept în diverse probleme de la competiții de informatică.

!!! warning "Ciclurile permutarilor"  
    Până când vă uitați peste problemele de mai jos, recomandăm [citirea acestei secțiuni](https://nor-blog.codeberg.page/posts/2023-01-09-permutations-for-beginners/#the-cycle-decomposition-perspective) a articolului despre permutări, unde se vorbește de ciclurile unei permutări și aplicațiile care implică grafuri funcționale

### Problemă exemplu - [Mouse Hunt - Codeforces](https://codeforces.com/contest/1027/problem/D)

Pentru a rezolva această problemă, vrem să filtrăm nodurile care nu aparțin ciclurilor, iar algoritmul pe care îl vom prezenta mai jos va fi unul standard, care va fi aplicat în multe asemenea probleme. 

Practic, vom vrea să plecăm de la fiecare nod nevizitat și să parcurgem graful până când dăm de un nod deja vizitat. Apoi, vom vrea să reconstruim ciclul care pleacă de la nodul vizitat, dacă acest pas este prima oară când am vizitat nodul în cauză. 

```cpp
#include <iostream>
#include <vector>
 
using namespace std;
 
int main() {
    
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n;
    cin >> n;
    
    vector<int> costs(n+1), graph(n+1);
    for (int i = 1; i <= n; i++) {
        cin >> costs[i];
    }
    for (int i = 1; i <= n; i++) {
        cin >> graph[i];
    }
    
    int ans = 0;
    
    vector<int> visited(n+1), processed(n+1);
    for (int i = 1; i <= n; i++) {
        if (!visited[i]) {
            int node = i;
            // parcurgem graful
            while (!visited[node]) {
                visited[node] = 1;
                node = graph[node];
            }
            
            if (!processed[node]) {
                int mini = 1000000000;
                // aflam ciclul 
                while (!processed[node]) {
                    mini = min(mini, costs[node]);
                    processed[node] = i;
                    node = graph[node];
                }
                if (processed[node] == i) {
                    ans += mini;
                }
            }
        }
    }
    
    cout << ans << '\n';
    return 0;
}
```

### Problemă suplimentară - [Milk Exchange - USACO Bronze](https://usaco.org/index.php?page=viewproblem2&cpid=1396)

Pentru a rezolva această problemă, va trebui să reducem șirul dat la un graf funcțional, graf pentru care știm că unele noduri vor fi noduri de unde doar se va da lapte, iar alte noduri sunt noduri care doar vor primi lapte. Nodurile din prima categorie vor da treptat laptele celor din cea de-a doua categorie. 

Astfel, vom afla ciclurile începând din fiecare nod care va da lapte, iar pe parcurs, vom însuma cantitățile de lapte și vom verifica dacă avem nevoie de mai mult de $m$ secunde pentru a finaliza procesul. 

Cu alte cuvinte, vom rezolva problema independent pentru fiecare ciclu din graf. 

```cpp

#include <iostream>
#include <vector>
using namespace std;

int n, v[200002], cnt[200002], vis[200002], nxt[200002];
long long m;
string s;

long long sum = 0;
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    cin >> n >> m;
    cin >> s;
    s = ' ' + s; // 1-index string
    
    for (int i = 1; i <= n; i++) {
        cin >> v[i];
        sum += v[i];
    }
    
    for (int i = 1; i <= n; i++) {
        if (s[i] == 'L') {
            if (i == 1) {
                cnt[n]++, nxt[i] = n;
            }
            else {
                cnt[i-1]++, nxt[i] = i-1;
            }
        }
        else {
            if (i == n) {
                cnt[1]++, nxt[i] = 1;
            }
            else {
                cnt[i+1]++, nxt[i] = i+1;
            }
        }
    }
    
    for (int i = 1; i <= n; i++) {
        if (vis[i] == 0 && cnt[i] == 0) {
            vector<int> cycle;
            int pos = i;
            while (vis[pos] == 0) {
                vis[pos] = 1;
                cycle.push_back(pos);
                pos = nxt[pos];
            }
            long long noncyclesum = 0;
            for (int j = 0; j < (int) cycle.size() && cycle[j] != pos; j++) {
                noncyclesum += v[cycle[j]];
            }    
            sum -= min(m, noncyclesum);
        }
    }
    
    cout << sum << '\n';
    return 0;
} 
```

### Problema [Cyclic Operations - Codeforces](https://codeforces.com/contest/1867/problem/D)

Pentru a rezolva această problemă, putem observa mai întâi faptul că cazul $k = 1$ este ușor de tratat, deoarece graful din șir trebuie să aibă doar bucle. În caz contrar, trebuie să verificăm dacă toate ciclurile din componentele conexe create de graful dat au lungime $k$. 

Acest lucru poate fi ușor demonstrat folosind periodicitatea operației date în enunț. Pentru mai multe detalii, recomandăm citirea soluției oficiale.

```cpp
#include <bits/stdc++.h>
using namespace std;
 
int n, k;
vector<vector<int> > graph;
vector<int> visited;
vector<int> prv;
 
bool ok;
 
vector<int> vals;
void dfs (int nod) {
    if(ok == 0) {
        return;
    }
        
    vals.push_back(nod);
    prv[nod] = vals.size();
    
    for (int i = 0; i < graph[nod].size(); i++) {
        int poz = graph[nod][i];
        if (prv[poz] != 0) {
            if ((vals.size() + 1 - prv[poz]) != k) {
                ok = 0;
                break;
            }
        }
        else {
            if (!visited[nod]) {
                dfs(poz);
            }
        }
    }
    visited[nod] = 1;
    prv[nod] = 0;
    vals.pop_back();
}
 
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int t;
    cin >> t;
    
    for (; t; t--) {
        cin >> n >> k;
        vector<int> v(n+1);
        
        graph.resize(n+1);
        visited.resize(n+1);
        prv.resize(n+1);
        vals.clear();
        
        for (int i = 1; i <= n; i++) {
            cin >> v[i], visited[i] = 0;
            graph[i].push_back(v[i]);
        }
        
        ok = 1;
        
        if (k == 1) {
            for (int i = 1; i <= n; i++) {
                if (v[i] != i) {
                    ok = 0;
                }
            }
        }
        else {
            for (int i = 1; i <= n; i++) {
                if (!visited[i]) {
                    dfs(i);
                }
        }
        
        cout << (ok == 1 ? "YES" : "NO") << '\n';
        
        graph.clear();
        visited.clear();
        prv.clear();
    }
    return 0;
}
```

## Concluzii

Lucrul cu cicluri este important în ceea ce privește teoria grafurilor, iar observarea diverselor proprietăți pe care ciclurile le au poate fi importantă în contextul a multor probleme de teoria grafurilor, dar și ulterior, atunci când veți învăța unii algoritmi mai dificili, precum aceia pentru [componentele tare conexe](https://edu.roalgo.ro/dificil/componente-tare-conexe/) sau [componentele biconexe](https://edu.roalgo.ro/dificil/componente-biconexe/).

## Probleme suplimentare

* [CSES Mail Delivery](https://cses.fi/problemset/task/1691)
* [pbinfo drum hamiltonian](https://www.pbinfo.ro/probleme/579/drum-hamiltonian)
* [Codeforces Badge](https://codeforces.com/contest/1020/problem/B)
* [CSES Teleporters Path](https://cses.fi/problemset/task/1693)
* [OJI 2014 cartite](https://kilonova.ro/problems/33)
* [USACO Bronze Swapity Swap](https://usaco.org/index.php?page=viewproblem2&cpid=1013)
* [USACO Silver Bovine Shuffle](https://usaco.org/index.php?page=viewproblem2&cpid=764)
* [CSES Planets Cycles](https://cses.fi/problemset/task/1751)
* [Codeforces Lucky Permutation](https://codeforces.com/contest/1768/problem/D)
* [infoarena domino](https://www.infoarena.ro/problema/domino)
* [infoarena johnie](https://www.infoarena.ro/problema/johnie)
* [USACO Silver Redistributing Gifts](https://usaco.org/index.php?page=viewproblem2&cpid=1206)
* [Codeforces Yet Another Sorting Problem](https://codeforces.com/contest/1591/problem/D)
* [Codeforces Jewel of Data Structure Problems](https://codeforces.com/gym/104197/problem/J)
* [Codeforces Shifting String](https://codeforces.com/contest/1690/problem/F)
* [USACO Silver Visits](https://usaco.org/index.php?page=viewproblem2&cpid=1230)
* [USACO Silver Swapity Swapity Swap](https://usaco.org/index.php?page=viewproblem2&cpid=1014)
* [Codeforces Square Root of Permutation](https://codeforces.com/contest/612/problem/E)
* [Codeforces Inversion Counting](https://codeforces.com/contest/911/problem/D)
* [CEOI 2005 depot](https://cses.fi/191/list/) - se intră în cont și se dă upsolving pentru a accesa problema
* [Lot Seniori 2014 Evacuare](https://kilonova.ro/problems/1978)
* [Lot Seniori 2016 politic](https://kilonova.ro/problems/1924)
* [infoarena zaharel](https://infoarena.ro/problema/zaharel)
* [ONI 2024 sim](https://kilonova.ro/problems/2642)
* [Lot Seniori 2011 amici](https://kilonova.ro/problems/2234)
* [IOI 2011 Tropical Garden](https://oj.uz/problem/view/IOI11_garden)

## Resurse suplimentare

* [Eulerian path - cp-algorithms](https://cp-algorithms.com/graph/euler_path.html)
* [Euler paths and circuits - Discrete Mathematics: An Open Introduction](https://discrete.openmathbooks.org/dmoi2/sec_paths.html)
* [Cicluri euleriene - wikipedia](https://en.wikipedia.org/wiki/Eulerian_path)
* [Cicluri hamiltoniene - wikipedia](https://en.wikipedia.org/wiki/Hamiltonian_path)
* [Problema gasirii drumului hamiltonian - wikipedia](https://en.wikipedia.org/wiki/Hamiltonian_path_problem)
* [Cicluri ale permutarilor - Algopedia](https://www.algopedia.ro/wiki/index.php/Clasa_a_VII-a_lec%C8%9Bia_13_-_5_dec_2019#Cicluri_ale_permut%C4%83rilor)
* [Grafuri funcționale - USACO Guide](https://usaco.guide/silver/func-graphs?lang=cpp)