---
tags:
    - grafuri
    - greedy
---
**Autori**: Ștefan-Cosmin Dăscălescu, Traian Mihai Danciu

În diverse probleme de grafuri, suntem nevoiți să alegem o mulțime de muchii care formează un graf conex, iar costul să fie cât mai mic. În cele mai multe cazuri, va fi îndeajuns să creăm un arbore parțial, iar acesta să fie de cost minim, concept ce va fi subiectul acestui articol.

## Introducere

!!! info "Definiție" 
    Arborele parțial de cost minim (APM) un graf parțial conex cu proprietatea că suma costurilor muchiilor este minimă și graful este un arbore (deci, are $n-1$ muchii). 

!!! note "Observație"
    Un graf poate avea mai mulți arbori parțiali de cost minim, dar în aproape toate problemele, precum și în practică, nu contează cu ce arbore lucrăm, atâta timp cât suma costurilor muchiilor este minimă. 

!!! example "Exemplu"
    De exemplu, dacă avem următorul graf: $n = 5$, $m = 6$ și următoarele muchii de tip $(a, b, cost)$: $(1, 2, 3), (2, 3, 5), (2, 4, 2), (3, 4, 8), (5, 1, 7), (5, 4, 4)$, arborele parțial de cost minim va avea costul $14$, alegându-se primele trei muchii și ultima. 

Pentru a afla APM-ul, există mai mulți algoritmi, dar cei mai folosiți algoritmi sunt algoritmul lui Kruskal și algoritmul lui Prim. Există și alți algoritmi mai puțin cunoscuți, precum algoritmul lui Boruvka. Acest articol va acoperi cei trei algoritmi menționați.

În probleme, de cele mai multe ori vom putea aplica algoritmul ales fără prea multe modificări, dar găsirea unui graf pe care să aplicăm APM se va dovedi a fi o alegere mai dificilă. 

## Algoritmul lui Kruskal

!!! info "Definiție" 
    Algoritmul lui Kruskal este un algoritm de tip greedy care va prelucra muchiile în ordine crescătoare a costurilor acestora, iar pentru fiecare dintre muchii, va verifica dacă adăugarea ei în graful parțial va genera un ciclu sau nu. Pentru verificarea rapidă a ciclurilor în graf, vom folosi o structură de tip [Union-Find](./dsu.md), iar sortarea se poate face cu ușurință păstrând muchiile într-o structură potrivită. 

!!! note "Observație"
    Dacă sunt mai multe muchii cu cost egal, nu are importanță care este aleasă, rezultatul fiind identic. 

Un lucru care se poate remarca este faptul că acest algoritm este centrat în jurul muchiilor, operațiile făcute cu acestea fiind esențiale pentru algoritmul nostru (sortarea lor, urmată de verificarea individuală). Deoarece sortarea muchiilor este de departe cea mai costisitoare parte a algoritmului, complexitatea finală a algoritmului va fi $O(m \log m)$.

Aici puteți găsi o implementare în limbajul C++ a algoritmului lui Kruskal.

```cpp
#include <iostream>
#include <algorithm>
#include <vector>
 
using namespace std;
 
/* Procesarea muchiilor */
struct edges {
    int a, b, c;
};
edges v[200001];
 
bool cmp (edges a, edges b) {
    return a.c < b.c;
}

/* Clasa pentru paduri de multimi disjuncte */
class dsu{
    private:
        int n;
        vector<int> parent, card; 
    public:
        void init (int sz) {
            n = sz;
            parent.resize(n+1);
            card.resize(n+1);
            for (int i = 1; i <= n; i++) {
                parent[i] = i;
                card[i] = 1;
            }
        }
        int Find (int x) {
            if (parent[x] == x) {
                return x;
            }
            return parent[x] = Find(parent[x]);
        }
        void Union (int a, int b) {
            a = Find(a); b = Find(b);
            if (a == b) {
                return;
            }
            if (card[b] > card[a]) {
                swap(a, b);
            }
            parent[b] = a;
            card[a] += card[b];
        }
};
 
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n, m;
    cin >> n >> m;
    
    for (int i = 0; i < m; i++) {
        cin >> v[i].a >> v[i].b >> v[i].c;
    }
    sort(v, v + m, cmp);
    
    dsu links; links.init(n);
    
    long long cost = 0;
    int mch = 0;
    for (int i = 0; i < m; i++) {
        if (links.Find(v[i].a) != links.Find(v[i].b)) {
            cost += v[i].c;
            mch++;
            links.Union(v[i].a, v[i].b);
        }
    }
    
    if (mch == n-1) {
        cout << cost << '\n';
    }
    else {
        cout << "IMPOSSIBLE\n";
    }
    return 0;
}
```

## Algoritmul lui Prim

!!! info "Definiție" 
    Algoritmul lui Prim este un algoritm de tip greedy care va prelucra nodurile în ordine crescătoare a costurilor de a fi conectate, plecând de la un nod oarecare, iar pentru fiecare dintre noduri, va verifica dacă adăugarea muchiilor vecine cu acel nod în graful parțial va rezulta în micșorarea unor costuri sau nu. Pentru verificarea rapidă a îmbunătățirilor pe care le obținem în privința costurilor, vom folosi o implementare similară cu cea de la [algoritmul lui Dijkstra](./shortest-path.md#algoritmul-lui-dijkstra). 

!!! note "Observație"
    Dacă sunt mai multe noduri cu cost egal, nu are importanță care este aleas, rezultatul fiind identic. 

Un lucru care se poate remarca este faptul că acest algoritm este centrat în jurul nodurilor, operațiile făcute cu acestea fiind esențiale pentru algoritmul nostru (procesarea lor, urmată de verificarea muchiilor adiacente fiecărui nod). Deoarece algoritmul este similar în stil cu algoritmul lui Dijkstra, complexitatea finală va fi aceeași cu cea de la Dijkstra, $O((n+m) \log n)$

Aici puteți găsi o implementare în limbajul C++ a algoritmului lui Prim.

```cpp
#include <iostream>
#include <vector>
#include <set>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    
    vector<vector<pair<int, int> > > graph(n+1); 
    for (int i = 1; i <= m; i++) {
        int a, b, c;
        cin >> a >> b >> c;
        graph[a].push_back({b, c});
        graph[b].push_back({a, c});
    }
    
    /* Implementare similara cu cea de la Dijkstra */
    vector<int> cost(n+1, (1<<30));
    cost[1] = 0;
    set<pair<int, int> > s;
    s.insert({0, 1});
    
    long long MST = 0;
    int added = 0;
    while(!s.empty()) {
        pair<int, int> smallest = *s.begin();
        s.erase(smallest);
        
        MST += smallest.first;
        cost[smallest.second] = 0;
        added++;
        for (int i = 0; i < (int) graph[smallest.second].size(); i++) {
            int nxt = graph[smallest.second][i].first;
            int val = graph[smallest.second][i].second;
            
            if (val < cost[nxt]) {
                if (s.find({cost[nxt], nxt}) != s.end()) {
                    s.erase({cost[nxt], nxt});
                }
                cost[nxt] = val;
                s.insert({cost[nxt], nxt});
            }
        }
    }
    
    if (added == n) {
        cout << MST << '\n';
    }
    else {
        cout << "IMPOSSIBLE" << '\n';
    }  
    return 0;
}
```

## Algoritmul lui Boruvka

!!! info "Definiție" 
    Acest algoritm începe cu fiecare nod fiind într-o comopnentă conexă doar cu el însuși. Apoi, va face iterații prin graf, până când nu este arbore (adică cât timp mai sunt cel puțin două componente conexe). El va găsi pentru fiecare componentă conexă (sau pentru fiecare nod, depinzând de problemă) cea mai bună muchie nefolosită (de obicei, cea cu costul minim) care o (îl) unește de altă componentă conexă. După ce aceste muchii sunt găsite, ele sunt folosite. Vom folosi și la acest algoritm structura Union-Find pentru a afla dacă muchiile duc la componente conexe diferite și pentru a uni două componente conexe.

!!! note "Observație"
    La fiecare iterare prin graf, numărul de componente conexe se înjumătățește. La început sunt $n - 1$ componente conexe, deci se vor face $O(\log n)$ iterații. Astfel, complexitatea algoritmului este $O(m \log n)$, unde $m$ este numărul de muchii, iar $n$ este numărul de noduri.

!!! note "Observație"
    Uneori, nu este posibil să construim un APM, dar trebuie să raportăm că nu se poate. Vom face acest lucru printr-o metodă similară cu cea de la [Bubble Sort](https://edu.roalgo.ro/usor/sorting/#bubble-sort): vom menține o variabilă care să ne spună dacă am reușit să unim vreo pereche de componente conexe. Dacă până acum nu am obținut un arbore și nu mai avem cum să folosim vreo muchie, atunci putem să declarăm că nu se poate obține un APM.

Aici puteți găsi o implementare în C++ a algoritmului lui Boruvka:
```cpp
#include <fstream>

std::ifstream fin("apm.in");
std::ofstream fout("apm.out");

const int MAXN = 200'000;
const int MAXM = 400'000;

int n, m, minedge[MAXN];
long long rez;
char viz[MAXM];

struct Edge {
    int u, v, cost;
} edges[MAXM];

struct DSU {
    int sef[MAXN], cate_comp;
    
    void init(int n) {
        int i;
        cate_comp = n;
        for (i = 0; i < n; i++) {
            sef[i] = i;
        }
    }
    
    int find(int i) {
        if (i == sef[i]) {
            return i;
        }
        return sef[i] = find(sef[i]);
    }
    
    void join(int i, int j) {
        if ((i = find(i)) != (j = find(j))) {
            cate_comp--;
            sef[j] = i;
        }
    }
} dsu;

void readGraph() {
    int i;
    fin >> n >> m;
    for (i = 0; i < m; i++) {
        fin >> edges[i].u >> edges[i].v >> edges[i].cost;
        edges[i].u--;
        edges[i].v--;
    }
}

void resetComps() {
    int i;
    for (i = 0; i < n; i++) {
        minedge[i] = -1;
    }
}

// este muchia a mai buna ca muchia b?
int better(int a, int b) {
    if (b == -1) {
        return 1;
    }
    return edges[a].cost < edges[b].cost;
}

void processEdges() {
    int i, u, v;
    for (i = 0; i < m; i++) {
        if (viz[i] == 0) { // daca n-am folosit muchia deja
            u = dsu.find(edges[i].u);
            v = dsu.find(edges[i].v);
            if (u != v) { // sa nu fie in aceeasi componenta
                if (better(i, minedge[u])) { // cautam cea mai buna muchie pentru fiecare componenta
                    minedge[u] = i;
                }
                if (better(i, minedge[v])) {
                    minedge[v] = i;
                }
            }
        }
    }
}

void processComps() {
    int i, u, v;
    for (i = 0; i < n; i++) { // trecem prin fiecare componenta
        if (minedge[i] != -1 // daca am gasit o muchie pentru componenta in care i e parinte
                             // daca i nu e parintele unei componente atunci nu o sa fie gasita nicio muchie
            && viz[minedge[i]] == 0) { // sa nu o fi folosit pentru componenta cu care ne unim deja
            dsu.join(edges[minedge[i]].u, edges[minedge[i]].v); // unim componentele
            rez += edges[minedge[i]].cost; // adunam costul
            viz[minedge[i]] = 1; // am folosit muchia
        }
    }
}

void findMST() {
    int i, u, v;
    
    dsu.init(n);
    rez = 0;
    while (dsu.cate_comp > 1) { // cat timp nu e arbore
        resetComps(); // resetam componentele
        processEdges(); // trecem prin fiecare muchie
        processComps(); // unim fiecare componenta cu muchia ei cea mai buna
    }
    
    fout << rez << "\n" << n - 1 << "\n"; // un arbore are n - 1 muchii
    for (i = 0; i < m; i++) {
        if (viz[i]) { // daca am folosit muchia o afisam
            fout << edges[i].u + 1 << " " << edges[i].v + 1 << "\n";
        }
    }
}

int main() {
    readGraph();
    findMST();
    return 0;
}
```

## Care este algoritmul mai bun?

Algoritmul lui Boruvka poate fi folosit și atunci când avem prea multe muchii ca să le putem procesa pe toate, dar putem afla pentru fiecare nod cea mai bună muchie folositoare. Un exemplu de astfel de problemă este problema [CF 888G](https://codeforces.com/problemset/problem/888/G).

Când vorbim despre algoritmii lui Kruskal, respectiv al lui Prim, niciunul dintre ei nu este mai bun mereu decât celălalt. Pe de o parte, Kruskal se dovedește a fi mult mai bun atunci când este vorba de grafuri rare, cu $M \approx N$, deoarece constanta de la sortare este mult mai bună decât cea de la seturi. Totuși, dacă graful este foarte dens, algoritmul lui Prim este superior, iar în cazul unor grafuri complete, de multe ori este mai bine să implementăm varianta sa în $O(n^2)$, similară cu cea prezentată la Dijkstra, pentru a rezolva probleme precum [cablaj](https://www.infoarena.ro/problema/cablaj).

În condiții de concurs, dacă toți algoritmii vor intra în limita de timp, Kruskal este mult mai ușor de scris și mai practic, dar cunoașterea algoritmului lui Prim este foarte utilă, mai ales dat fiind factorul de similaritate cu Dijkstra. De asemenea, algoritmul lui Boruvka este și el foarte important. 

# Probleme suplimentare

* [Road Reparation](https://cses.fi/problemset/task/1675/)
* [USACO Gold Fenced In](http://www.usaco.org/index.php?page=viewproblem2&cpid=623)
* [USACO Gold Moo Network](https://usaco.org/index.php?page=viewproblem2&cpid=1211)
* [infoarena cablaj](https://www.infoarena.ro/problema/cablaj)
* [OJI 2017 Ninjago](https://kilonova.ro/problems/27)
* [Codeforces Microcycle](https://codeforces.com/contest/1927/problem/F)
* [infoarena desen](https://www.infoarena.ro/problema/desen)
* [ONI 2018 Poligon](https://kilonova.ro/problems/150)
* [ONI 2019 Oracol](https://kilonova.ro/problems/10)
* [Codeforces Opening Portals](https://codeforces.com/problemset/problem/196/E)
* [Codeforces XOR-MST](https://codeforces.com/problemset/problem/888/G)
* [USACO Gold Moo Network](https://usaco.org/index.php?page=viewproblem2&cpid=1211)
* [Problemele cu APM de pe kilonova](https://kilonova.ro/tags/312)
* [Probleme educaționale cu APM](https://codeforces.com/gym/100238)
* [Minimum spanning tree for each edge](https://codeforces.com/problemset/problem/609/E)


## Lectură suplimentară 

* [Minimum Spanning Tree - USACO Guide](https://usaco.guide/gold/mst?lang=cpp)
* [Minimum spanning tree - Prim's algorithm](https://cp-algorithms.com/graph/mst_prim.html)
* [Minimum spanning tree - Kruskal with Disjoint Set Union](https://cp-algorithms.com/graph/mst_kruskal_with_dsu.html)
* [Arbore partial de cost minim - CPPI Sync](https://cppi.sync.ro/materia/arborele_partial_de_cost_minim.html)
* [Minimum Spanning Tree Problems](https://codeforces.com/blog/entry/6429)
* [Boruvka's Algorithm](https://codeforces.com/blog/entry/77760)
* [Avansat - Second Best Minimum Spanning Tree](https://cp-algorithms.com/graph/second_best_mst.html)
