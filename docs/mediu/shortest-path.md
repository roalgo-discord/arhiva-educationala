---
tags:
    - grafuri
    - drumuri minime
---

**Autor**: Ștefan-Cosmin Dăscălescu

Aflarea drumului minim între două sau mai multe locații este una dintre cele mai importante probleme pe care oamenii au fost nevoiți să le rezolve de-a lungul istoriei, începând din timpurile preistorice în care comunicarea era limitată și până în zilele noastre, când avem foarte multe facilități la dispoziție. În funcție de criteriul ales, ne putem gândi la distanța minimă, timpul minim de parcurgere al unui traseu sau alte criterii, precum dificultatea de parcurgere a drumului ales etc. 

!!! example "Exemplu"
    De exemplu, să presupunem că vrei să parcurgi drumul Piatra Neamț - Brașov. Acest traseu poate fi parcurs în două moduri principale, fiecare cu avantajele și dezavantajele lui. 

    * Piatra Neamț - Miercurea Ciuc - Brașov: 238km, timp de parcurgere: 4h, traseu dificil
    * Piatra Neamț - Bacău - Brașov: 239km, timp de parcurgere: 4h20m, traseu ceva mai ușor

    Chiar dacă cele două drumuri au o distanță identică, diferența este dată de timpul de parcurgere și de dificultatea traseului în sine. Deși primul traseu necesită mai puțin timp pentru parcurgerea lui, cel de-al doilea traseu este semnificativ mai ușor din punct de vedere al dificultății din punct de vedere rutier (după părerea autorului), fapt ce îi dă un cost mai mic, fiind preferat primului, în ciuda timpului și distanței mai mari. 

În cele ce urmează, vom discuta despre algoritmii ce ne ajută să aflăm drumuri minime, modelând aceste probleme folosind grafurile orientate și neorientate, prezentând avantajele și dezavantajele fiecărui algoritm. 

## Introducere

De regulă, atunci când vorbim de drumuri minime, vorbim de muchii care au asociate costuri. Pentru a înțelege mai ușor noțiunea de cost pentru o muchie, ne vom raporta la exemplul folosit anterior.

!!! info "Definiție" 
    Un drum minim între două noduri $a$ și $b$ este un lanț simplu cu capetele în $a$ și $b$ cu proprietatea că costul total al muchiilor de pe lanț este minim. 

!!! note "Observație"
    Dacă nu se specifică un asemenea cost, presupunem că costul fiecărei muchii este egal cu $1$.

Pentru a păstra în memorie costul unei muchii, vom ține o variabilă în plus, astfel vom fi nevoiți să lucrăm cu structuri sau cu tipuri precum pair, după preferințe. 

Fie că e vorba de aflarea drumului minim între două noduri, toate nodurile sau dacă vrem pur și simplu să verificăm anumite proprietăți, algoritmii pe care îi vom prezenta se vor dovedi a fi soluții utile, fiecare dintre ei având avantajele și dezavantajele lor.  

## Algoritmul lui Dijkstra

De departe cel mai cunoscut algoritm pentru aflarea drumului minim între două noduri, algoritmul lui Dijsktra este folosit atunci când avem de-a face cu costuri pozitive, condiția minimă necesară este aceea să nu avem cicluri negative. 

!!! note "Observație"
    Algoritmul este numit după [un informatician olandez](https://en.wikipedia.org/wiki/Edsger_W._Dijkstra), iar o pronunție corectă a numelui lui este ```daikstra``` (pentru fanii fotbalului, gândiți-vă la Virgil Van Dijk), nu ```diștra```, ```jikstra``` sau alte variante total greșite, care sunt folosite foarte des.

!!! info "Definiție" 
    Un ciclu negativ este un ciclu cu proprietatea că suma costurilor muchiilor de pe ciclu este negativă. 

Modul de funcționare al algoritmului este unul foarte simplu: 

* Pentru fiecare nod, vom ține un cost total până la el, la început acesta va fi inițializat pentru toate nodurile cu valori mari, cu excepția nodului (sau nodurilor) start, care vor avea costul inițial $0$.
* Cât timp nu am vizitat toate nodurile, alegem nodul cu costul total dintre cele nealese. Dacă există mai multe asemenea noduri, oricare poate fi ales. 
* Pentru nodul ales, vom vizita toate nodurile nevizitate, vecine cu el și verificăm pentru fiecare dintre ele dacă costul total pentru acel nod devine mai mic.

### Implementare suboptimă 

Acest algoritm, în forma sa neoptimizată are complexitatea $O(n^2)$ și are drept unic scop obișnuirea cu conceptul algoritmului, singura situație în care poate fi folosit drept o soluție reală este atunci când avem un graf complet, în care numărul de muchii se apropie de $n^2$, mai jos putând fi citită o implementare care aplică pașii de mai sus pe un graf neorientat.

```cpp
#include <iostream>
using namespace std;
int main () {
    int n, m;
    cin >> n >> m;

    int adj[n+1][n+1]; // pentru acest exemplu, vom folosi matricea de adiacenta
    int cost[n+1]; // costul minim de la nodul start la x;
    int viz[n+1]; // daca nodul a fost procesat deja
    for (int i = 1; i <= n; i++) {
        cost[i] = 1000000000;
        viz[i] = 0;
        for (int j = 1; j <= n; j++) {
            adj[i][j] = 1000000000;
        }
    }

    for (int i = 1; i <= m; i++) {
        int a, b, c;
        cin >> a >> b >> c;
        adj[a][b] = adj[b][a] = c;
    }

    int s;
    cin >> s;
    cost[s] = 0;
    for (int i = 1; i <= n; i++) {
        int mini = 1000000000;
        int nod = 0;
        // aflam nodul cu cost minim dintre cele nevizitate
        for (int j = 1; j <= n; j++) { 
            if (viz[j] == 0 && cost[j] < mini) {
                mini = cost[j];
                nod = j;
            }
        }
        
        // aflam noile distante
        viz[nod] = 1;
        for (int j = 1; j <= n; j++) {
            if (viz[j] == 0 && cost[nod] + adj[nod][j] < cost[j]) {
                cost[j] = cost[nod] + adj[nod][j];
            }
        }
    }

    // afisam costurile finale
    for (int i = 1; i <= n; i++) {
        cout << cost[i] << " ";
    }
    return 0;
```

### Implementare optimă

Pentru a putea implementa algoritmul în complexitatea sa optimă, $O((n+m) \log n)$, va trebui să facem câteva observații critice. 

În primul rând, nu are niciun sens să tot verificăm dacă nodurile deja vizitate sunt cele cu cost minim. 

În al doilea rând, fiind vorba de regulă de grafuri cu un număr de muchii apropiat de numărul de noduri, putem ține vecinii folosind liste. 

Nu în ultimul rând, cea mai importantă optimizare constă în găsirea nodului cu cost minim la fiecare pas, acest lucru se poate realiza folosind o structură de date arborescentă, de tip set sau heap (priority queue). Complexitatea acestui pas este redus la $O(\log n)$, ceea ce ne dă îmbunătățirea de care avem nevoie. 

După aplicarea acestor optimizări, algoritmul nostru va arăta foarte similar cu o parcurgere de tip BFS, ideile fiind aceleași, cu excepția folosirii unei cozi de priorități sau a unui set, mai jos fiind prezente ambele variante. 

```cpp
#include <bits/stdc++.h>
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
    
    vector<long long> cost(n+1, (1LL<<60));
    vector<int> vis(n+1);
    cost[1] = 0;
    // priority queue tine perechile in ordine descrescatoare, de aceea se impune folosirea semnului - pentru a ne folosi de aceasta proprietate fara a folosi alti comparatori
    priority_queue<pair<long long, int> > s;
    s.push({0, 1});
    
    while(!s.empty()) {
        pair<long long, int> smallest = s.top();
        s.pop();
        
        // daca am trecut deja prin acel nod, nu mai are sens sa parcurgem iar vecinii lui
        if (vis[smallest.second] == 1) {
            continue;
        }
        vis[smallest.second] = 1;
        
        for (int i = 0; i < (int) graph[smallest.second].size(); i++) {
            int nxt = graph[smallest.second][i].first;
            int val = graph[smallest.second][i].second;
            
            if (-smallest.first + val < cost[nxt]) {
                cost[nxt] = -smallest.first + val;
                s.push({-cost[nxt], nxt});
            }
        }
    }
    
    for (int i = 1; i <= n; i++) {
        cout << cost[i] << " ";
    }  
    return 0;
```

```cpp
#include <bits/stdc++.h>
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
    
    vector<long long> cost(n+1, (1LL<<60));
    cost[1] = 0;
    set<pair<long long, int> > s;
    s.insert({0, 1});
    
    while(!s.empty()) {
        pair<long long, int> smallest = *s.begin();
        s.erase(smallest);
        
        for (int i = 0; i < (int) graph[smallest.second].size(); i++) {
            int nxt = graph[smallest.second][i].first;
            int val = graph[smallest.second][i].second;
            
            if (smallest.first + val < cost[nxt]) {
                if (s.find({cost[nxt], nxt}) != s.end()) {
                    s.erase({cost[nxt], nxt});
                }
                cost[nxt] = smallest.first + val;
                s.insert({cost[nxt], nxt});
            }
        }
    }
    
    for (int i = 1; i <= n; i++) {
        cout << cost[i] << " ";
    }  
    return 0;
```

Folosind aceste implementări, putem afla drumurile minime între două noduri foarte rapid, în cazul majorității problemelor de acest fel. Totuși, așa cum veți vedea în cazul celorlalți doi algoritmi, Dijkstra nu acoperă toate variantele de grafuri cu costuri.

## Algoritmul Bellman-Ford

## Algoritmul Floyd-Warshall (Roy-Floyd)

## Care este algoritmul mai bun?

Niciunul dintre algoritmi nu este mai bun mereu decât celălalt. Pe de o parte, Kruskal se dovedește a fi mult mai bun atunci când este vorba de grafuri rare, cu $M \approx N$, deoarece constanta de la sortare este mult mai bună decât cea de la seturi. Totuși, dacă graful este foarte dens, algoritmul lui Prim este superior, iar în cazul unor grafuri complete, de multe ori este mai bine să implementăm varianta sa în $O(n^2)$, similară cu cea prezentată la Dijkstra, pentru a rezolva probleme precum [cablaj](https://www.infoarena.ro/problema/cablaj).

În condiții de concurs, dacă ambii algoritmi vor intra în limita de timp, Kruskal este mult mai ușor de scris și mai practic, dar cunoașterea algoritmului lui Prim este foarte utilă, mai ales dat fiind factorul de similaritate cu Dijkstra. 

# Probleme suplimentare

* [Shortest Routes I](https://cses.fi/problemset/task/1671/)


## Lectură suplimentară 

* [Shortest Paths with Non-Negative Edge Weights](https://usaco.guide/gold/shortest-paths?lang=cpp)
* [Shortest Paths with Negative Edge Weights](https://usaco.guide/adv/sp-neg?lang=cpp)
