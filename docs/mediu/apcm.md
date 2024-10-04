---
tags:
    - grafuri
    - greedy
---

În diverse probleme de grafuri, suntem nevoiți să alegem o mulțime de muchii care formează un graf conex, iar costul să fie cât mai mic. În cele mai multe cazuri, va fi îndeajuns să creăm un arbore parțial, iar acesta să fie de cost minim, concept ce va fi subiectul acestui articol.

## Introducere

!!! info "Definiție" 
    Arborele parțial de cost minim (APM) un graf parțial conex cu proprietatea că suma costurilor muchiilor este minimă și graful este un arbore (deci, are $n-1$ muchii). 

!!! note "Observație"
    Un graf poate avea mai mulți arbori parțiali de cost minim, dar în aproape toate problemele, precum și în practică, nu contează cu ce arbore lucrăm, atâta timp cât suma costurilor muchiilor este minimă. 

!!! example "Exemplu"
    De exemplu, dacă avem următorul graf: $n = 5$, $m = 6$ și următoarele muchii de tip $(a, b, cost)$: $(1, 2, 3), (2, 3, 5), (2, 4, 2), (3, 4, 8), (5, 1, 7), (5, 4, 4)$, arborele parțial de cost minim va avea costul $14$, alegându-se primele trei muchii și ultima. 

Pentru a afla APM-ul, există mai mulți algoritmi, dar cei mai folosiți algoritmi sunt algoritmul lui Kruskal și algoritmul lui Prim. Există și alți algoritmi mai puțin cunoscuți, precum algoritmul lui Boruvka, dar acest articol va acoperi doar primii doi algoritmi, cu resurse disponibile și pentru Boruvka. 

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

## Care este algoritmul mai bun?

Niciunul dintre algoritmi nu este mai bun mereu decât celălalt. Pe de o parte, Kruskal se dovedește a fi mult mai bun atunci când este vorba de grafuri rare, cu $M \approx N$, deoarece constanta de la sortare este mult mai bună decât cea de la seturi. Totuși, dacă graful este foarte dens, algoritmul lui Prim este superior, iar în cazul unor grafuri complete, de multe ori este mai bine să implementăm varianta sa în $O(n^2)$, similară cu cea prezentată la Dijkstra, pentru a rezolva probleme precum [cablaj](https://www.infoarena.ro/problema/cablaj).

În condiții de concurs, dacă ambii algoritmi vor intra în limita de timp, Kruskal este mult mai ușor de scris și mai practic, dar cunoașterea algoritmului lui Prim este foarte utilă, mai ales dat fiind factorul de similaritate cu Dijkstra. 

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
* [Avansat - Boruvka's Algorithm](https://codeforces.com/blog/entry/77760)
* [Avansat - Second Best Minimum Spanning Tree](https://cp-algorithms.com/graph/second_best_mst.html)
