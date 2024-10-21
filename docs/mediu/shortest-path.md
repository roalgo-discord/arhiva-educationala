---
tags:
    - grafuri
    - drumuri minime
    - dijsktra
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

După aplicarea acestor optimivdeile fiind aceleași, cu excepția folosirii unei cozi de priorități sau a unui set, mai jos fiind prezente ambele variante. 

```cpp
#include <iostream>
#include <vector>
#include <queue>

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
}   
```

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

Algoritmul Bellman-Ford este un algoritm de aflare a drumului minim între două noduri folosit mai ales pentru detectarea ciclurilor negative. 

În mod similar cu algoritmul lui Dijkstra, vom ține pentru fiecare nod costul total până la el, dar ca o noutate, vom ține și numărul de modificări ale costului minim. Dacă numărul de modificări ale costului minim este cel puțin $n$, atunci putem spune că avem un ciclu de cost negativ, deoarece asta înseamnă că sigur am modificat costul minim de două ori din același vecin. 

Deși în practică algoritmul se comportă rezonabil, complexitatea pe cazul cel mai prost este $O(n \cdot m)$. Implementarea, una foarte similară cu cea a parcurgerii BFS, se poate găsi mai jos. 

```cpp
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int main() {
    
    ifstream cin("bellmanford.in");
    ofstream cout("bellmanford.out");
    
    
    int n, m;
    cin >> n >> m;
    
    vector<vector<pair<int, int> > > graph(n+1);
    for (int i = 1; i <= m; i++) {
        int a, b, c;
        cin >> a >> b >> c;
        
        graph[a].push_back({b, c});
    }
    
    vector<long long> costs(n+1, (1LL<<60));
    vector<int> cnt(n+1);
    
    costs[1] = 0;
    queue<int> q; 
    q.push(1);
    while(!q.empty()) {
        int node = q.front();
        q.pop();
        
        for (int i = 0; i < (int) graph[node].size(); i++) {
            int nxt = graph[node][i].first;
            int c = graph[node][i].second;
            if (costs[node] + c < costs[nxt]) {
                costs[nxt] = costs[node] + c;
                q.push(nxt);
                
                cnt[nxt]++;
                if (cnt[nxt] > n) {
                    cout << "Ciclu negativ!" << '\n';
                    return 0;
                }
            }
        }
    }
    
    for (int i = 2; i <= n; i++) {
        cout << costs[i] << " ";
    }
    return 0;
}
```
!!! note "Observație"
    Există o variație a acestui algoritm, foarte des folosită în cazul unor probleme de drum minim, numită SPFA (Shortest Path Faster Algorithm). Acest algoritm este folosit cu succes în multe probleme de informatică, ca o alternativă la algoritmul lui Dijkstra. Totuși, în cazul cel mai prost complexitatea este similară cu cea de la Bellman-Ford, $O(n \cdot m)$.

## Algoritmul Floyd-Warshall (Roy-Floyd)

Algoritmul Floyd-Warshall (Roy-Floyd) este un algoritm de aflare a drumului minim între toate perechile de noduri, fără a fi nevoie de a calcula individual distanțele dintre oricare două noduri. 

Modul în care funcționează acest algoritm este acela că pentru fiecare pereche de noduri, vom ține în memorie distanța dintre acea pereche de noduri, iar la fiecare pas, vom fixa un nod pe care îl vom folosi drept un nod intermediar, cu scopul de a micșora distanțele dintre noduri în acest fel. 

Cu alte cuvinte, vom fixa o valoare $k$ corespunzătoare nodului din mijloc, iar pentru fiecare pereche $(i, j)$, vom verifica dacă $dist(i, k) + dist(k, j) < dist(i, j)$, astfel relaxând drumul dintre cele două noduri. 

Complexitatea totală a algoritmului va fi $O(n^3)$, fiind unul dintre algoritmii folosiți pentru a evalua performanța calculatoarelor, datorită simplității sale. Mai jos găsiți implementarea în limbajul C++.

```cpp
#include <iostream>
using namespace std;
int n, a[102][102]; // costul minim de la i la j
int main() {
    cin >> n;
    for (int i = 1; i <= n; ++i) {
        for (int j = 1; j <= n; ++j) {
            cin >> a[i][j];
        }
    }
    for (int k = 1; k <= n; k++) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (a[i][k] && a[k][j] && (a[i][j] > a[i][k] + a[k][j] || !a[i][j]) && i != j) {
                    a[i][j] = a[i][k] + a[k][j];
                }
            }
        }
    }
    for (int i = 1; i <= n; ++i) {
        for (int j = 1; j <= n; ++j) {
            cout << a[i][j] << " ";
        }
        cout << '\n';
    }
    return 0;
}
```

!!! note "Observație"
    Ordinea în care avem cele trei for-uri este esențială, fiind obligatoriu să începem cu nodul pe care îl vom folosi drept cel intermediar $(k, i, j)$, celelalte variante fiind greșite deoarece ratăm diverse drumuri în acest mod. 

## Algoritmul 0-1 BFS și variațiile sale

În unele probleme de drum minim, costurile muchiilor sunt valori mici, dar nu doar egale cu $1$. Deoarece avem puține costuri, ne putem gândi la optimizări care să se folosească de acest lucru pentru a ajunge să avem algoritmi mai rapizi, fără a fi nevoie de Dijkstra sau vreun alt algoritm mai general. 

### 0-1 BFS

Un prim exemplu constă în grafurile (sau construcțiile care pot fi reprezentate ca și grafuri) în care costurile muchiilor sunt doar $0$ sau $1$. Deoarece avem costuri care nu sunt uniforme, nu vom putea folosi BFS la fel cum am proceda într-o problemă obișnuită, dar putem în schimb să profităm de faptul că sunt doar două costuri distincte. 

În loc să avem o singură coadă în care adăugăm valori de fiecare dată când drumul devine unul mai optim decât drumul minim, vom avea două cozi (sau un deque) în care vom alterna cozile în care adăugăm nodurile, după cum urmează:

* Dacă costul muchiei este $0$, vom adăuga în coada curentă (sau în vârful deque-ului, dacă folosim un deque)
* Dacă costul muchiei este $1$, vom adăuga în coada următoare (sau la coada deque-ului, dacă folosim această structură de date)

!!! note "Observație" 
    Folosind această metodă, vom ajunge să adăugăm fiecare nod în structura noastră de date de cel mult $2$ ori, complexitatea devenind liniară, spre deosebire de o abordare standard folosind BFS, în care complexitatea pe cel mai rău caz poate fi polinomială (de cele mai multe ori, pătratică raportat la numărul de noduri)

De asemenea, prin această strategie vom păstra o proprietate fundamentală a parcurgerii BFS când vine vorba de drumuri minime, și anume faptul că nodurile vor fi procesate în ordine crescătoare a costurilor față de origine. Această proprietate este una esențială și va fi păstrată indiferent de numărul de cozi pe care îl vom folosi, prin alternarea cozilor pe care le parcurgem la un moment dat, acestea fiind traversate secvențial. 

Un exemplu de problemă în care avem această abordare este problema [padure](https://www.infoarena.ro/problema/padure), în care vom implementa acest algoritm pe o matrice. Mai jos puteți găsi o implementare ce ia $100$ pe problema dată. 

```cpp
#include <fstream>
#include <deque>
#include <vector>

using namespace std;

int main() {

    vector<pair<int, int> > dir = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};

    ifstream cin("padure.in");
    ofstream cout("padure.out");

    int n, m, xa, ya, xb, yb;
    cin >> n >> m >> xa >> ya >> xb >> yb;
    --xa, --ya, --xb, --yb;

    vector<vector<int>> mat(n, vector<int>(m)), dist(n, vector<int>(m));

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cin >> mat[i][j];
        }
    }

    deque<pair<int, int>> Q;
    dist[xa][ya] = 1;
    Q.push_front({xa, ya});

    while (!Q.empty()) {
        pair<int, int> nd = Q.front();
        Q.pop_front();
        
        int x = nd.first;
        int y = nd.second;

        for (int i = 0; i < 4; i++) {
            auto nx = x + dir[0].first, ny = y + dir[0].second;

            if (nx >= 0 && ny >= 0 && nx < n && ny < m) {
                if (mat[nx][ny] != mat[x][y] && (dist[x][y] + 1 < dist[nx][ny] || !dist[nx][ny])) {
                    dist[nx][ny] = dist[x][y] + 1;
                    Q.push_back({nx, ny});
                } else if (mat[nx][ny] == mat[x][y] && (dist[x][y] < dist[nx][ny] || !dist[nx][ny])) {
                    dist[nx][ny] = dist[x][y];
                    Q.push_front({nx, ny});
                }
            }
        }
    }


    cout << dist[xb][yb] - 1 << '\n';
    return 0;
}
```

### 1-K BFS (Algoritmul lui Dial)

Această abordare poate fi extinsă și dacă avem $k$ costuri distincte, folosind o strategie similară. Deoarece nu vom mai putea folosi un deque, vom recurge la a folosi $k$ cozi, urmând ca mai apoi să simulăm algoritmul nostru de drum minim exact ca la 0-1 BFS. 

Vom începe prin a adăuga punctul inițial în coada $0$, iar pe parcurs, dacă luăm punctul din coada $x$ și costul muchiei este $y$, atunci noul nod va fi adăugat în coada $(x+y) \ \% \ k$, urmând a fi procesat împreună cu celelalte puncte. Acest lucru se poate generaliza și dacă avem $k$ costuri oarecare, putând astfel adăuga costurile în cozi în funcție de ultimul cost adăugat, exact cum procedăm la problema [Biom de la ONI 2023](https://kilonova.ro/problems/532/).

La fel ca și la algoritmul precedent, vom parcurge cozile alternativ, păstrând ordinea costurilor intactă, pentru a permite algoritmului nostru să rămână liniar raportat la numărul de noduri. 

Pentru a înțelege mai bine modul de folosire a acestei variante generalizate, voi explica soluția problemei [John and Tractor](https://codeforces.com/gym/104328/problem/C), dată la finala FIICode 2023. 

Aici vom avea trei costuri distincte, unul dintre ele putând fi ajustat de operația descrisă în enunț. Ne vom concentra pe partea în care vom rula algoritmul lui Dial, folosind $4$ cozi (costurile sunt $1, 2, 3$).

```cpp
#include <iostream>
#include <vector>
#include <queue>
 
using namespace std;
 
struct info {
    int L, C, x;
};
 
vector<int> ox = {0, 1, 0, -1};
vector<int> oy = {1, 0, -1, 0};
 
int main() {
    
    // limita de timp stransa, fast io e necesar
    
    ios_base::sync_with_stdio(false); 
    cin.tie(NULL);
    
    int n, m, k;
    cin >> n >> m >> k;
 
    int xa, ya, xb, yb;
    cin >> xa >> ya >> xb >> yb;
    
    vector<vector<int>> grid(n+1);
    
    for (int i = 1; i <= n; i++) {
        grid[i].resize(m+1);
        string s;
        cin >> s;
        
        for (int j = 0; j < m; j++) {
            if (s[j] == 's') {
                grid[i][j+1] = 1;
            }
            if (s[j] == 'p') {
                grid[i][j+1] = 2;
            }
            if (s[j] == 'a') {
                grid[i][j+1] = 3;
            }
        }
    }
    
    vector<vector<vector<int>>> dp(n+1, vector<vector<int>> (m+1, vector<int> (k+1, (1<<25)))); 
    
    queue<info> q[4];
    
    q[grid[xa][ya]].push({xa, ya, 0});
    dp[xa][ya][0] = grid[xa][ya];
    
    if (grid[xa][ya] == 2) {
        q[grid[xa][ya] - 1].push({xa, ya, 1});
        dp[xa][ya][1] = grid[xa][ya] - 1;
    }
    
    int timp = 0;
    int lastempty = 0;
    
    while (lastempty <= 10) {
        lastempty++;
        // timp%4 = timp&3, pentru puteri ale lui 2
        while (!q[(timp&3)].empty()) {
            lastempty = 0;
            info nod = q[(timp&3)].front();
            q[(timp&3)].pop();
            
            for (int dir = 0; dir <= 3; dir++) {
                int nxtL = nod.L + ox[dir];
                int nxtC = nod.C + oy[dir];
                if (nxtL >= 1 && nxtL <= n && nxtC >= 1 && nxtC <= m) {
                    int nwt = grid[nxtL][nxtC] + dp[nod.L][nod.C][nod.x];
                    if (nwt < dp[nxtL][nxtC][nod.x]) {
                        dp[nxtL][nxtC][nod.x] = nwt;
                        q[(nwt&3)].push({nxtL, nxtC, nod.x});
                    }
                    
                    if (grid[nxtL][nxtC] == 2 && nod.x < k) {
                        nwt--;
                        if (nwt < dp[nxtL][nxtC][nod.x+1]) {
                            dp[nxtL][nxtC][nod.x+1] = nwt;
                            q[(nwt&3)].push({nxtL, nxtC, nod.x+1});
                        }
                    }
                }
            }
        }
        timp++;
    }
    
    int ans = 1e9;
    for (int j = 0; j <= k; j++) {
        ans = min(ans, dp[xb][yb][j]);
    }
    cout << ans << '\n';
    return 0;
}
```

## Care este algoritmul mai bun?

Fiecare algoritm are avantajele și dezavantajele lui, cunoașterea tuturor fiind necesară. Dijkstra este opțiunea optimă în cele mai multe cazuri, dar Floyd-Warshall și Bellman-Ford au ambele beneficiile lui. 0-1 BFS / 1-K BFS au și ele avantajele lor, în special când vine vorba de grafuri cu costuri mici, nefiind nici acest algoritm unul de neglijat. 

# Probleme suplimentare

* [Simple Shortest Path](https://kilonova.ro/problems/2037/)
* [Shortest Routes I](https://cses.fi/problemset/task/1671/)
* [Shortest Routes II](https://cses.fi/problemset/task/1672/)
* [catun infoarena](https://www.infoarena.ro/problema/catun)
* [High Score](https://cses.fi/problemset/task/1673)
* [Flight Discount](https://cses.fi/problemset/task/1195)
* [OJI 2004 Lanterna](https://kilonova.ro/problems/54)
* [FIICode John and Tractor](https://codeforces.com/gym/104328/problem/C)
* [OJI 2017 Rover](https://kilonova.ro/problems/888)
* [Baltic Olympiad 2011 Switch](https://cses.fi/100/list/)
* [Lot 2018 Juniori Road](https://kilonova.ro/problems/1624/)
* [USACO Gold Fine Dining](https://usaco.org/index.php?page=viewproblem2&cpid=861)
* [ONI 2023 Biom](https://kilonova.ro/problems/532/)
* [Cycle Finding](https://cses.fi/problemset/task/1197)
* [Investigation](https://cses.fi/problemset/task/1202)
* [Probleme cu drumul minim de pe Kilonova](https://kilonova.ro/tags/296)
* [Probleme cu Dijkstra de pe Infoarena](https://infoarena.ro/cauta-probleme?tag_id[]=72)
* [Probleme cu Bellman-Ford de pe Infoarena](https://infoarena.ro/cauta-probleme?tag_id[]=342)
* [rfinv infoarena](https://www.infoarena.ro/problema/rfinv)
* [Probleme cu Floyd-Warshall de pe Infoarena](https://infoarena.ro/cauta-probleme?tag_id[]=92)


## Lectură suplimentară 

* [Shortest Paths with Non-Negative Edge Weights - USACO Guide](https://usaco.guide/gold/shortest-paths?lang=cpp)
* [Shortest Paths with Negative Edge Weights - USACO Guide](https://usaco.guide/adv/sp-neg?lang=cpp)
* [Dijkstra - CP-algorithms](https://cp-algorithms.com/graph/dijkstra.html)
* [Aflarea drumului minim - CPPI](https://cppi.sync.ro/materia/aflarea_drumului_minim__arborele_drumurilor_minime.html)
* [1-K BFS - Codeforces](https://codeforces.com/blog/entry/88408)
* [0-1 BFS - CP-algorithms](https://cp-algorithms.com/graph/01_bfs.html)
* [Roy Floyd - CPPI](https://cppi.sync.ro/materia/roy_floyd.html)
* [Dijkstra - CPPI](https://cppi.sync.ro/materia/dijkstra.html)
* [Rethink the Dijkstra algorithm -- Let's go deeper](https://codeforces.com/blog/entry/107810)
* [Bellman-Ford - CPPI](https://cppi.sync.ro/materia/Bellman-Ford.html)
