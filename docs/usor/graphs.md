**Autori**: Ștefan-Cosmin Dăscălescu, Ștefan-Iulian Alecu

În cele ce urmează vom prezenta o structură de date cu foarte multe aplicații
atât în algoritmică, cât și în viața de zi cu zi, acestea fiind grafurile.
Problema aflării existenței unor conexiuni sau aflării distanței minime între
două noduri reprezintă un punct de plecare pentru majoritatea algoritmilor pe
grafuri, teoria folosită în algoritmică fiind una vastă și plină de abordări ce
se dovedesc a fi esențiale în foarte multe situații, atât competiționale, cât și
în aplicații practice.

## Noțiuni introductive

### Terminologie

Un graf este o structură care corespunde unui grup de obiecte, în
care unele perechi de obiecte sunt într-un anumit sens „legate” reciproc.
Obiectele corespund unor abstracții matematice numite într-un graf
noduri/vârfuri (numite și puncte) și fiecare legătură dintre perechile de
obiecte asociate se numește muchie (numită și arc sau linie, prin care este și
reprezentată).

<!-- De obicei, un graf este reprezentat în formă schematică ca un
set/grup de puncte pentru noduri, iar acestea sunt unite două câte două de
drepte sau curbe pentru muchii.
 -->

O definiție mai riguroasă ce se va dovedi utilă este prezentată aici:

!!! info "Noțiunea de graf"

    Un graf $G = (V, E)$ este o structură matematică compusă din două mulțimi:

    - $V$ (mulțimea vârfurilor sau nodurilor), care reprezintă obiectele;

    - $E \subseteq V \times V$ (mulțimea muchiilor sau arcelor), care
      reprezintă legăturile între perechi de vârfuri.

Fiecare element $ v \in V$ este numit vârf (sau nod), iar fiecare element $
e = (u, v) \in E$ este numit muchie (sau arc). În mod obișnuit, grafurile sunt
reprezentate grafic printr-un set de puncte (corespunzătoare vârfurilor)
conectate prin linii sau curbe (corespunzătoare muchiilor).

Voi continua prin a defini termeni ce se dovedesc a fi esențiali pentru
înțelegerea grafurilor.

!!! info "Graf orientat și neorientat"

    Un **graf neorientat** $G = (V, E)$ este un graf în care perechile de
    vârfuri $(u, v) \in E$ sunt neordonate. Aceasta înseamnă că, dacă $(u, v)
    \in E$ este o muchie de la $u$ la $v$, atunci și $(v, u) \in E$.

    Prin comparație, un **graf orientat** este un graf în care perechile de
    vârfuri $(u, v) \in E$ sunt ordonate. Aceasta înseamnă că, dacă $(u, v)
    \in E$, atunci $(v, u) \not\in E$.

!!! info "Noduri adiacente"

    Două noduri $u$ și $v$ sunt **adiacente** în graful $G = (V, E)$ dacă
    există o muchie $ (u, v) \in E $. Adică, există o legătură directă între $u$ și $v$.

    Formal:
    $$
    u \text{ și } v \text{ sunt adiacente} \iff (u, v) \in E \text{ sau } (v, u) \in E \text{ (în cazul grafurilor neorientate)}
    $$

!!! info "Incidență"

    Folosim noțiunea de **incidență** pentru a descrie relația dintre noduri și muchii.
    O muchie $(u, v) \in E$ este incidentă cu nodurile $u$ și $v$.

!!! info "Gradul unui nod"

    Definim **gradul** unui nod \(v\) dintr-un graf \(G = (V, E)\) ca fiind numărul de muchii incidente cu \(v\).

    Într-un graf neorientat, gradul nodului \(v\), notat \(\deg(v)\), este numărul de muchii care au \(v\) ca una dintre extremități.

    $$\deg(v) = |\{(u, v) \in E \text{ sau } (v, u) \in E \mid u \in V\}|$$

    Într-un graf orientat, se pot defini două tipuri de grad:
    - **Gradul intern** (numărul de muchii care intră în nodul \(v\)), notat \(\deg^-(v)\):
       $$
       \deg^-(v) = |\{(u, v) \in E \mid u \in V\}|
       $$
    - **Gradul extern** (numărul de muchii care ies din nodul \(v\)), notat \(\deg^+(v)\):
       $$
       \deg^+(v) = |\{(v, u) \in E \mid u \in V\}|
       $$

!!! note "Observație"

    Într-un graf neorientat $G = (V, E)$:

    $$
    \sum_{v \in V} \deg(v) = 2k,\,k \in \mathbb{N}
    $$

    Explicația este dată de faptul că pentru fiecare muchie adăugată, gradul a
    două noduri crește cu $1$.

!!! info "Lanț"

    Numim **lanț** o secvență de noduri $(v_1, v_2, ..., v_k)$ cu proprietatea că
    $(v_i, v_{i + 1}) \in E$ oricare ar fi $1 \leq i \leq k$. Un lanț este
    **elementar** dacă $v_i \neq v_j$ oricare ar fi $1 \leq i < j \leq k$. Un
    lanț este **simplu** dacă $(v_i, v_{i + 1}) \neq (v_j, v_{j+1})$ oricare ar
    fi $1 \leq i < j \leq k$.

    Altfel spus, un lanț elementar este un lanț cu nodurile distincte, iar un lanț simplu este un lanț cu muchii distincte.

!!! info "Ciclu"

    O secvență de muchii $(v_1, v_2, ..., v_k, v_1)$ formează un **ciclu** dacă $(v_i, v_{i + 1}) \in E$ pentru orice $1 \leq i < k$ și $(v_k, v_1) \in E$.
    Un ciclu este **simplu** dacă $v_i \neq v_j$ pentru orice $1 \leq i < j < k$.

    Altfel spus, un **ciclu** reprezintă o secvență de muchii ce nu se repetă,
    pleacă de la un nod $v_1$ și parcurgând în ordine acele muchii, se ajunge tot la
    nodul $v_1$. Un ciclu simplu este un ciclu în care nu se repetă noduri.

!!! info "Lungimea unui lanț"

    **Lungimea unui lanț** $(v_1, v_2, ..., v_k)$ este $k-1$ (numărul de muchii).
    Uneori, aceasta se definește ca fiind numărul de noduri, așadar lungimea
    acestui lanț este $k$.

!!! info "Graf parțial și subgraf"

    Definim **graf parțial** al unui graf dat ca fiind ceea ce rămâne
    din graful dat păstrând toate nodurile și eliminând eventual unele muchii, fără
    a adăuga muchii noi.

    Formal spus, un graf parțial $G' = (V, E')$ a grafului $G = (V, E)$ este un graf unde $E' \subseteq E$.

    Definim **subgraf** al unui graf dat ca fiind ceea ce rămâne din
    graful dat eliminând unele noduri și doar muchiile incidente lor, deci nu și
    alte muchii și fără să adăugăm alte muchii.

    Formal spus, un subgraf $G' = (V', E')$ al unui graf $G = (V, E)$ este un graf
    unde $V' \subseteq V$ și $E' \subseteq \{(u, v) \in E \mid u, v \in V'\}$.

!!! note "Observație"
Numărul de subgrafuri ale unui graf $G = (V, E)$ este $2^{|V|}$,
iar numărul de grafuri parțiale este $2^{|E|}$,
unde $|V| = n$ este numărul de noduri, iar $|E| = m$ este numărul de muchii al grafului.

### Câteva tipuri speciale de grafuri

Se remarcă faptul că în funcție de tipul grafului, mai putem defini următoarele
tipuri de grafuri, care se vor folosi în diferite aplicații. De notat ca pentru
unele din aceste tipuri, vom avea probleme unde vom explica în detaliu noțiunile
și aplicațiile unde folosim aceste concepte.

!!! info "Graf complet $K_n$"

    Definim un **graf complet** $K_n = (V, E)$ cu $|V| = n$ ca fiind un graf unde
    $(v_i, v_j) \in E\ \forall 1 \leq i < j \leq n$. Altfel spus, fiecare nod
    este conectat cu toate celelalte noduri.

    Numărul de muchii ale unui graf complet $K_n$ este
    $|E| = \frac{n(n-1)}{2}$.

!!! info "Graf bipartit"

    Definim un **graf bipartit** $G = (A, B, E)$ ca fiind un graf care poate fi
    împărțit în două submulțimi $V = A \cup B$ cu $A \cap B = \emptyset$,
    astfel încât, dacă $a \in A$, atunci acesta se poate conecta doar cu $b \in B$
    și viceversa.

!!! note "Observație"

    Are loc următoarea relație pentru un graf bipartit $G = (A, B, E)$:
    $$
    \sum_{a \in a} \deg(a) = \sum_{b \in B} \deg(b) = |E|
    $$

!!! note "Observație"

    Un graf este bipartit dacă și numai dacă acesta nu conține un ciclu de
    lungime impară.

!!! info "Graf planar"

    Definim un **graf planar** ca fiind un graf care are proprietatea
    că poate fi reprezentat grafic fără ca două muchii să se intersecteze.

!!! info "Graf regulat"

    Un **graf regulat** $G = (V, E)$ este un graf în care $\deg(v) = k\ \forall v \in V$.
    Adică, fiecare nod din graf are același număr de muchii incidente.

    Un graf regulat cu nodurile de gradul $k$ se numește graf $k$-regulat.

!!! note "Observație"

    Condiția necesară și suficientă pentru ca un graf $k$-regulat de ordin $n$
    să existe este ca $n \geq k + 1$ și că $nk$ este par.

    Numărul de muchii este maxim într-un graf complet $K_n$, acesta fiind
    $\frac{n(n - 1)}{2}$ cu fiecare nod de gradul $n - 1$. Așadar, $k = n - 1$,
    sau $n = k + 1$ este $n$ minim pentru un $k$ anume. De asemenea, după relația
    de mai sus, avem $\frac{nk}{2}$ muchii, deci $nk$ trebuie să fie par.

## Lucrul cu grafuri. Moduri de reprezentare în memorie

Un concept foarte important în teoria grafurilor reprezintă modul în care
parcurgem aceste structuri de date și cum putem verifica proprietățile de care
avem nevoie, de la o problemă la alta.

Să considerăm graful neorientat din figura următoare:

<figure markdown="span">
![](../images/grafuri/graf-light.svg#only-light){ width = "50%" }
![](../images/grafuri/graf-dark.svg#only-dark){ width = "50%" }
</figure>

Acest graf are $13$ noduri și $12$ muchii, acestea fiind $(1, 4)$, $(1, 3)$,
$(4, 9)$, $(9, 3)$, $(4, 2)$, $(4, 6)$, $(2, 6)$, $(2, 5)$, $(8, 12)$, $(8,
11)$, $(8, 10)$, $(8, 7)$.

Pentru a reprezenta un graf în memorie, există trei moduri principale de a o
face, cu distincția că în practică se va folosi doar reprezentarea prin liste de
vecini.

**Definiție:** Definim **matricea de adiacență a unui graf** ca fiind o matrice
binară pentru care $a_{ij} = 1$ dacă și numai dacă avem muchie de la nodul $i$
la nodul $j$ și $a_{ij} = 0$ în caz contrar.

**Observație:** Pentru un graf neorientat, matricea este mereu simetrică, adică
$a_{ij} = a_{ji}\ \forall i, j$.

Pentru graful nostru de mai sus, aceasta este matricea de adiacență la care ajungem.

<figure markdown="span">
![](../images/grafuri/matrice-light.svg#only-light){width="300"}
![](../images/grafuri/matrice-dark.svg#only-dark){width="300"}
</figure>

!!! info "Listă de vecini"

    Definim o **listă de vecini** ca fiind o listă (de regulă,
    alocată dinamic) pe care o folosim pentru a ține în memorie pentru fiecare nod
    doar nodurile adiacente cu acesta, această metodă fiind cea mai eficientă din
    punct de vedere practic pentru a parcurge grafurile.

!!! example "Exemplu"

    Pentru graful de mai sus, aceasta este lista de vecini:

    | Nod | Vecini           |
    | --- | ---------------- |
    | 1   | $\{3,4\}$        |
    | 2   | $\{4,5,6\}$      |
    | 3   | $\{1,9\}$        |
    | 4   | $\{1,2,9\}$      |
    | 5   | $\{2\}$          |
    | 6   | $\{2, 4\}$       |
    | 7   | $\{8\}$          |
    | 8   | $\{7,10,11,12\}$ |
    | 9   | $\{3,4\}$        |
    | 10  | $\{8\}$          |
    | 11  | $\{8\}$          |
    | 12  | $\{8\}$          |
    | 13  | $\emptyset$      |

!!! info "Listă de muchii"

    Definim o **listă de muchii** ca fiind o listă pe care o folosim
    pentru a ține toate muchiile în memorie. Deși nu este o variantă prea practică
    de a efectua parcurgerile, această metodă poate fi utilă pentru anumiți
    algoritmi ce se bazează în principal pe prelucrarea muchiilor, un astfel de
    exemplu fiind arborele parțial de cost minim.

!!! example "Exemplu"

    În cazul nostru, lista de muchii este: $\{1, 4\}$,$\{1, 3\}$,
    $\{4,9\}$,$\{9,3\}$,$\{4,2\}$,$\{4,6\}$,$\{2,6\}$,$\{2,5\}$,$\{8,12\}$,$\{8,11\}$,$\{8,10\}$,$\{8,7\}$.

## Conexitate. Parcurgerea DFS

Problema aflării conexității unui graf este una din problemele fundamentale ale
teoriei grafurilor, fiind adesea folosită drept un exemplu esențial în
explicarea și înțelegerea grafurilor.

!!! info "Graf conex"

    Un **graf conex** este un graf neorientat în care există o cale între oricare două noduri.
    Cu alte cuvinte, oricare două noduri din graf sunt conectate direct sau indirect printr-o serie de muchii.

!!! info "Componenta conexă"

    O **componentă conexă** a unui graf este un subgraf conex maximal, adică un subgraf
    în care oricare două noduri sunt conectate printr-o serie de muchii, iar acest
    subgraf nu poate fi extins adăugând vreun alt nod sau vreo altă muchie fără a
    pierde proprietatea de conexitate.

Pentru a rezolva problema aflării conexității unui graf, va trebui să parcurgem
graful folosind unul din algoritmii consacrați pentru această problemă. În cazul
de față, vom continua prin a explica parcurgerea în adâncime a grafului (DFS sau
depth-first search), una din parcurgerile optime pentru această problemă.

!!! info "Parcurgerea în adâncime (DFS)"

    Parcurgerea în adâncime (DFS) este un algoritm de explorare a grafului care
    începe de la un nod ales și vizitează cât mai mult posibil din vecinii acestuia
    înainte de a se întoarce înapoi. Aceasta se realizează printr-o strategie de
    backtracking recursivă sau prin utilizarea unei stive (stack).

    DFS începe de la un nod și vizitează toate nodurile pe care le poate atinge în
    adâncime înainte de a reveni la nodurile anterioare și verifică dacă un nod a
    fost deja vizitat pentru a evita bucle infinite.

!!! note "Observație"

    Complexitatea parcurgerii în adâncime (DFS) este $O(\lvert V
    \rvert + \lvert E \lvert)$, unde $\lvert V \rvert$ reprezintă numărul de noduri
    sau vârfuri și $\lvert E \rvert$ reprezintă numărul de muchii.

!!! note "Observație"

    În probleme se notează convențional $\lvert V \rvert$ cu $N$ de la
    noduri, respectiv $\lvert E \rvert$ cu $M$ de la muchii. _n.red._

!!! note "Observație"

    Se remarcă faptul că un nod va fi vizitat la un moment dat doar
    o singură dată, deci dacă avem muchiile $(1, 2)$, $(1, 3)$ și $(2, 3)$, iar
    DFS-ul pleacă din $1$, $2$ va fi accesat din $1$, iar $3$ va fi accesat din $2$.

!!! note "Observație"
    Se poate remarca faptul că ordinea în care vizităm nodurile în
    graf depinde de ordinea în care sunt adăugate muchiile în graf, acest lucru
    înseamnă că nu putem folosi DFS pentru anumite probleme, de exemplu cele la care
    trebuie aflată distanța minimă în graf.

Ca o recapitulare (sau de fapt comparație) între BFS și DFS, să comparăm fiecare
abordare împreună cu o funcție:

=== "DFS"
    
    ```cpp
    vector<vector<int>> graph;

    void dfs(int node, vector<bool>& visited) {
        visited[node] = true;

        // Ca exemplu
        cout << node << ' '; 

        for (int neighbor : graph[node]) {
            if (!visited[neighbor]) {
                dfs(neighbor, visited);
            }
        }
    }
    ```

=== "BFS"

    ```cpp
    vector<vector<int>> graph;
    vector<int> dist; 
    queue<int> q; 

    void bfs(int startNode) {
        q.push(startNode);
        dist[startNode] = 0;

        while (!q.empty()) {
            int node = q.front();
            q.pop();

            for (auto neighbor : graph[node]) {
                if (dist[neighbor] == -1) { 
                    dist[neighbor] = dist[node] + 1; 
                    q.push(neighbor); 
                }
            }
        }
    }
    ```

## Problema [Connected components](https://kilonova.ro/problems/2036) de pe kilonova

Se dă un graf neorientat $G$ cu $N$ noduri și $M$ muchii. Să se afle câte
componente conexe are graful dat.

Pentru a afla numărul de componente conexe ale unui graf, putem folosi
parcurgerea DFS pentru a afla toate nodurile din care apelăm DFS din funcția
`main`, acesta fiind și răspunsul la problema noastră.

```cpp
#include <iostream>
#include <vector>

using namespace std;

vector<vector<int>> adj;
vector<bool> visited;

void dfs(int node) {
    visited[node] = true;

    for (int next : adj[node]) {
        if (!visited[next]) {
            dfs(next);
        }
    }
}

int main() {
    int n, m;
    cin >> n >> m;

    adj.resize(n + 1);
    visited.resize(n + 1, false);

    for (int i = 0; i < m; ++i) {
        int a, b;
        cin >> a >> b;

        adj[a].push_back(b);
        adj[b].push_back(a);
    }

    int cc = 0;
    for (int i = 1; i <= n; ++i) {
        if (!visited[i]) {
            ++cc;
            dfs(i);
        }
    }

    cout << cc << '\n';
    return 0;
}
```

## Drumuri minime. Parcurgerea BFS

Dacă în cazul parcurgerii DFS putem să o aplicăm fără mari probleme pentru o
varietate destul de largă de probleme cu grafuri, totuși nu este suficientă
pentru problemele ce țin de distanțe. Un exemplu fundamental este acela al
aflării drumului minim între două sau mai multe noduri într-un graf dat.

!!! info "Drum minim"

    Un **drum minim** este lungimea minimă a unui lanț
    care leagă două noduri din graf.

Motivul pentru care nu putem afla drumul minim între două noduri folosind DFS
este acela că ordinea în care nodurile sunt parcurse în DFS depinde de ordinea
în care sunt date muchiile de la intrare, parcurgerea recursivă făcând aflarea
distanțelor minime imposibilă. Astfel, vom introduce un alt mod de a parcurge
graful nostru.

!!! info "Parcurgerea în lățime (BFS)" 

    Parcurgerea în lățime** (BFS, engl. breadth-first
    search) a unui graf ca fiind o parcurgere iterativă ce pleacă de la unul sau mai
    multe noduri, iar la fiecare pas, dacă ne aflăm la un nod $x$, vom vizita
    vecinii nevizitați ai nodului $x$, adăugându-i într-o coadă, nodurile fiind
    parcurse în ordinea în care au fost adăugate în coadă.

!!! note "Observație"

    Complexitatea parcurgerii în lățime (BFS) este $O(\lvert V
    \rvert + \lvert E \lvert)$, unde $\lvert V \rvert$ reprezintă numărul de noduri
    sau vârfuri și $\lvert E \rvert$ reprezintă numărul de muchii.

!!! note "Observație"

    Se poate remarca faptul că ordinea în care vizităm nodurile în
    graf va fi aceeași cu ordinea crescătoare a distanței minime față de nodul sau
    nodurile inițiale, datorită faptului că ele vor fi inserate în coadă în ordinea
    în care acestea au fost adăugate.

## Problema [Simple Shortest Path](https://kilonova.ro/problems/2037) de pe kilonova

Se dă un graf neorientat $G$ cu $N$ noduri și $M$ muchii, precum și un nod $S$.
Să se afle lungimea drumului minim dintre $S$ și fiecare nod din graf, inclusiv
$S$.

Pentru a rezolva această problemă, vom pleca cu un BFS din nodul $S$ și vom afla
pe parcurs, distanțele minime față de toate celelalte noduri.

```cpp
#include <iostream>
#include <queue>
#include <vector>

using namespace std;

int main() {
    int n, m, s;
    cin >> n >> m >> s;

    vector<vector<int>> graf(n);
    vector<int> ans(n, -1);
    queue<int> q;

    for (int i = 0; i < m; i++) {
        int a, b;
        cin >> a >> b;
        graf[a].push_back(b);
        graf[b].push_back(a);
    }

    ans[s] = 0;
    q.push(s);

    while (!q.empty()) {
        int nod = q.front();
        q.pop();

        for (auto x : graf[nod]) {
            if (ans[x] == -1) {
                ans[x] = ans[nod] + 1;
                q.push(x);
            }
        }
    }

    for (const auto& x : ans) {
        cout << x << " ";
    }

    cout << '\n';

    return 0;
}
```

## Problema [grarb](https://www.infoarena.ro/problema/grarb) de pe infoarena

Se dă un graf $G$ neorientat cu $N$ noduri numerotate de la $1$ la $N$ și $M$
muchii. Determinați numărul minim de muchii care trebuie eliminate și numărul
minim de muchii care trebuie adăugate în graful $G$ astfel încât acesta sa
devina arbore.

Această problemă se împarte în două subprobleme relativ ușor de identificat -
aflarea componentelor conexe ale grafului (dacă avem $nr$ componente conexe, va
fi nevoie de $nr - 1$ muchii pentru a transforma graful într-unul conex), precum
și aflarea numărului de muchii care trebuie scoase pentru a transforma graful în
arbore (la final, trebuie să ne rămână $N-1$ muchii). Astfel, vom avea nevoie de
$nr - 1$ muchii noi și va trebui să scoatem $M + nr - 1 - (N - 1)$ = $M + nr -
N$ muchii pentru a avea un arbore.

```cpp
#include <fstream>
#include <vector>

using namespace std;


vector<vector<int>> adj;
vector<bool> visited;

void dfs(int nod) {
    visited[nod] = true;
    for (int next : adj[nod]) {
        if (!visited[next]) dfs(next);
    }
}

int main() {
    ifstream fin("grarb.in");
    ofstream fout("grarb.out");

    int n, m, nr = 0;

    fin >> n >> m;

    adj.resize(n);
    visited.resize(n, false);

    for (int i = 1; i <= m; i++) {
        int a, b;
        fin >> a >> b;
        adj[a].push_back(b);
        adj[b].push_back(a);
    }

    for (int i = 0; i < n; i++)
        if (!visited[i]) {
            dfs(i);
            nr++;
        }

    // Numărul de muchii ce trebuiesc șterse
    fout << m + nr - 1 - (n - 1) << '\n';
    // Numărul de componente conectate
    fout << nr - 1 << '\n';
    return 0;
}
```

## Problema [Graf (OJI 2006)](https://kilonova.ro/problems/49) de pe kilonova

Se dă un graf neorientat conex cu $N$ noduri și două noduri $X$ și $Y$, să se
afle nodurile ce aparțin tuturor lanțurilor optime între $X$ și $Y$.

Pentru a rezolva această problemă, va trebui mai întâi să aflăm folosind o
parcurgere de tip BFS distanțele minime de la $X$ și $Y$ spre toate celelalte
noduri. Apoi, pentru fiecare distanță $d$ de la $0$ la $\operatorname{dist}(X,
Y)$, vrem să aflăm câte noduri se află pe unul din drumurile optime de la $X$ la
$Y$ la o distanță $d$ față de $X$. În cele din urmă, vrem să afișăm nodurile
situate la distanțele care apar o singură dată în mulțimea nodurilor ce fac
parte din cel puțin un drum optim de la $X$ la $Y$.

Codul sursă se poate viziona mai jos.

```cpp
#include <fstream>
#include <queue>
#include <vector>
using namespace std;

constexpr int MAXN = 7500;

vector<vector<int>> graph(MAXN + 1);
vector<int> ans;

void bfs(int startNode, vector<int>& dist) {
    queue<int> q;
    q.push(startNode);
    dist[startNode] = 0;

    while (!q.empty()) {
        int node = q.front();
        q.pop();

        for (auto neighbor : graph[node]) {
            if (dist[neighbor] == -1) {
                dist[neighbor] = dist[node] + 1;
                q.push(neighbor);
            }
        }
    }
}

vector<int> distX, distY, solFreq;

int main() {
    distX.reserve(MAXN + 1);
    distY.reserve(MAXN + 1);
    solFreq.reserve(MAXN + 1);

    ifstream fin("graf.in");
    ofstream fout("graf.out");

    int n, m, x, y;
    fin >> n >> m >> x >> y;

    while (m--) {
        int a, b;
        fin >> a >> b;
        graph[a].push_back(b);
        graph[b].push_back(a);
    }

    distX.resize(n + 1, -1);
    distY.resize(n + 1, -1);
    solFreq.resize(n + 1, 0);

    bfs(x, distX);
    bfs(y, distY);

    int totalDist = distX[y];

    // Lungimea totală a drumului va fi egală cu distX[y].
    for (int i = 1; i <= n; i++) {
        if (distX[i] == -1 || distY[i] == -1) {
            continue;
        }

        if (distX[i] + distY[i] == totalDist + 1) {
            solFreq[distX[i]]++;
        }
    }

    for (int i = 1; i <= n; i++) {
        if (distX[i] == -1 || distY[i] == -1) {
            continue;
        }

        if (distX[i] + distY[i] == totalDist + 1 && solFreq[distX[i]] == 1) {
            ans.push_back(i);
        }
    }

    fout << ans.size() << '\n';
    for (const auto& node : ans) {
        fout << node << ' ';
    }

    return 0;
}
```
## Probleme suplimentare

- [Kilonova unire](https://kilonova.ro/problems/1611)
- [CSES Message Route](https://cses.fi/problemset/task/1667)
- [CSES Building Teams](https://cses.fi/problemset/task/1668)
- [CSES Round Trip](https://cses.fi/problemset/task/1669)
- [USACO Bronze Milk Factory](https://usaco.org/index.php?page=viewproblem2&cpid=940)
- [USACO Bronze The Great Revegetation](https://usaco.org/index.php?page=viewproblem2&cpid=916)
- [USACO Silver Closing the Farm](https://usaco.org/index.php?page=viewproblem2&cpid=644)
- [Probleme cu grafuri de pe kilonova](https://kilonova.ro/tags/300)
- [Probleme cu grafuri de pe codeforces, ordonate după dificultate](https://codeforces.com/problemset?order=BY_RATING_ASC&tags=combine-tags-by-or%2Cgraphs%2Cdfs+and+similar)

## Lectură suplimentară

- [Grafuri - noțiuni teoretice de bază](https://cppi.sync.ro/materia/grafuri_arbori_notiuni_teoretice_de_baza.html)
- [Articol introductiv de pe USACO Guide](https://usaco.guide/bronze/intro-graphs?lang=cpp)
- [Articol despre parcurgeri de pe USACO Guide](https://usaco.guide/silver/graph-traversal?lang=cpp)
