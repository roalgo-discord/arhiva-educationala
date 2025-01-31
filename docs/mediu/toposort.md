---
tags:
    - grafuri
    - grafuri orientate
    - parcurgere
    - sortare
    - recursivitate
---

**Autor**: Radu Mocănașu

!!! example "Cunoștințe necesare"
    - [Introducere în teoria grafurilor](../usor/graphs.md)

## Teorie

!!! info "Definitie"

    Într-un graf orientat și aciclic, definim sortarea topologică ca fiind o
    ordine a nodurilor (nu neapărat unică), astfel încât, dacă notăm cu $P$
    lista pozițiilor nodurilor, iar $A$ și $B$ sunt două noduri, cu muchie de la
    $A$ la $B$, $$P_A < P_B $$

### Spre exemplu

```mermaid
graph LR
A((1)) --> B((2))
B --> C((3))
A --> D((4))
A --> E((5))
E --> C
```

În acest graf, o sortare topologică validă ar fi: `1, 2, 5, 3, 4` , deoarece 1
se află înaintea lui 2, 5 înaintea lui 3, etc. Un alt exemplu ar fi `1, 4,
5, 2, 3` . O ordine incorectă ar fi însă `1, 4, 2, 3, 5` , deoarece 5 se află
după 3, deși există muchie de la 5 la 3.

### Un alt exemplu

```mermaid
graph LR
A((1)) --> B((2))
B --> D((3))
C((4)) --> A
D --> C
```

Acest graf conține un ciclu (de fapt chiar este unul), mai exact $1, 2, 3, 4$ .
Astfel, putem alege 2 noduri, $A$ și $B$, astfel încât ele aparțin aceluiași
ciclu (se poate ajunge de la $A$ la $B$ și viceversa). Dar asta implică faptul
că în sortarea topologică, $A$ se află în fața lui $B$, dar și că $B$ se află
înaintea lui $A$, ceea ce duce la o contradicție. Așadar, într-un graf ce
conține un ciclu, nu există nicio sortare topologică.

## Algoritmul

Întâi, vom presupune că graful este aciclic.

Numim vecin al unui nod $U$, un nod $V$, astfel încât există muchie de la $U$ la
$V$. Însă, știm că pentru orice două noduri $U$ și $V$, pentru care există
muchie de la $U$ la $V$, $U$ se află înaintea lui $V$ în ordinea topologică.

Așadar, în sortarea topologică, orice nod se află înaintea vecinilor săi.

În același timp, într-o parcurgere `DFS`, vom intra în vecinii unui nod după ce
intrăm în acesta. Putem defini timpul de ieșire al unui nod ca fiind momentul la
care ne întoarcem din recursivitate înapoi la el (pentru simplitate, timpii pot
fi numerotați de la 1 la $n$, unde $n$ este numărul de noduri). Astfel, timpul
de ieșire al unui nod va fi tot timpul mai mare decât cel al vecinilor săi, deci
pentru a afla ordinea topologică, trebuie doar să sortăm nodurile descrescător
după timpii de ieșire.

Pentru a face acest lucru mai simplu, putem doar să adăugăm nodurile într-o
listă goală, pe care o vom inversa la sfârșit. Să ne uităm la următoarea
secvență de cod:

```c++
#include <algorithm>
#include <iostream>
#include <vector>

// Valoare maxima arbitrara pentru numarul maxim de noduri
const int NMAX = 10002;

// Listele de adiacenta
std::vector<std::vector<int>> lista_adj(NMAX);

// Lista nodurilor sortate dupa timpii de iesire
std::vector<int> ord;

// Daca un nod a mai fost vizitat pana acum sau nu
std::vector<bool> viz(NMAX);

void dfs(int nod) {

    viz[nod] = 1;
    // Parcurgem lista vecinilor
    for (auto vecin : lista_adj[nod]) {
        // Ne intereseaza doar cei care nu au mai fost vizitati
        if (!viz[vecin]) {
            dfs(vecin);
        }
    }

    // La intoarcerea din recursivitate adaugam nodul in lista
    ord.push_back(nod);
}

int main() {
    int n, m, u, v;
    
    // Citire
    std::cin >> n >> m;
    
    while (m--) {
        std::cin >> u >> v;
        lista_adj[u].push_back(v);
    }

    // Incepem parcurgerea dfs
    dfs(1);

    // Inversam lista nodurilor sortate dupa timpii de iesire
    std::reverse(ord.begin(), ord.end());

    // Afisare
    for (auto nod : ord) {
        std::cout << nod << " ";
    }
    return 0;
}
```

Acest cod este însă greșit și nu va da rezultatul corect pentru anumite cazuri.
Să luăm următorul exemplu:

```mermaid
graph LR
A((1)) --> B((2))
C((3)) --> A
C --> B
```

Începând dintr-un nod arbitrar (în acest caz, 1), noi vom vizita doar nodurile
în care putem ajunge din el. Însă, în exemplul dat, asta înseamnă că vom ignora
nodul 3, care în sortare s-ar afla înaintea lui 1.

Pentru a rezolva asta, putem parcurge lista tuturor nodurilor și să verificăm
pentru fiecare dacă este vizitat sau nu. Pentru orice nod nevizitat, știm că nu
se poate ajunge la el din niciun nod vizitat, deci este corect să spunem că
orice nod nevizitat se poate afla înaintea nodurilor deja vizitate.

Așadar, pentru orice nod nevizitat, putem începe o parcurgere `DFS` din el și
putem adăuga în continuare nodurile în lista finală, în funcție de timpul lor de
ieșire.

```c++
#include <algorithm>
#include <iostream>
#include <vector>

// Valoare maxima arbitrara pentru numarul maxim de noduri
const int NMAX = 10002;

// Listele de adiacenta
std::vector<std::vector<int>> lista_adj(NMAX);

// Lista nodurilor sortate dupa timpii de iesire
std::vector<int> ord;

// Daca un nod a mai fost vizitat pana acum sau nu
std::vector<bool> viz(NMAX);

void dfs(int nod) {

    viz[nod] = 1;
    // Parcurgem lista vecinilor
    for (auto vecin : lista_adj[nod]) {
        // Ne intereseaza doar cei care nu au mai fost vizitati
        if (!viz[vecin]) {
            dfs(vecin);
        }
    }

    // La intoarcerea din recursivitate adaugam nodul in lista
    ord.push_back(nod);
}

int main() {
    int n, m, u, v;

    // Citire
    std::cin >> n >> m;

    while (m--) {
        std::cin >> u >> v;
        lista_adj[u].push_back(v);
    }

    // Iteram prin lista nodurilor
    for (int i = 1; i <= n; i++) {
        // Daca este nevizitat, incepem parcurgerea DFS din el
        if (!viz[i]) {
            dfs(i);
        }
    }

    // Inversam lista nodurilor sortate dupa timpii de iesire
    std::reverse(ord.begin(), ord.end());

    // Afisare
    for (auto nod : ord) {
        std::cout << nod << " ";
    }
    return 0;
}
```

Acest cod este corect și va returna o sortare topologică validă (nu neapărat
unică).

### Complexitatea algoritmului

Datorită faptului că folosim o singură parcurgere `DFS`, algoritmul va avea
complexitate liniară $O(n + m)$, unde $n$ este numărul de noduri, iar $m$
numărul de muchii. Memoria va fi tot $O(n + m)$.

## Exemplu de Problema: [CSES - Course Schedule](https://cses.fi/problemset/task/1679)

### Cerință

Se dau $n$ cursuri, numerotate de la 1 la $n$ și $m$ condiții ce trebuie
îndeplinite, de forma a doi indici, $i$ și $j$, cu proprietatea ca acel curs cu
numărul $i$ trebuie terminat înaintea cursului cu numărul $j$.

$$1 \leqslant i < j \leqslant n$$

Se cere să se afișeze o ordine în care să fie făcute aceste cursuri, astfel
încât toate condițiile să fie îndeplinite. Dacă nu există nicio soluție, se va
afișa "IMPOSSIBLE".

### Soluție

Nu este greu să ne dăm seama că acele 'condiții' pot fi reprezentate ca niște
muchii orientate într-un graf, iar ordinea validă a realizării task-urilor va fi
cea din sortarea topologică a grafului rezultat. În cazul în care graful conține
cicluri, algoritmul tot va returna o anumită ordine a nodurilor. Astfel, putem
parcurge din nou fiecare condiție și să verificăm dacă fiecare condiție e
îndeplinită, iar dacă nu e, înseamnă că nu avem soluție. Putem verifica acest
lucru ușor ținând minte într-un vector pozițiile nodurilor din sortarea
topologică și să le comparăm, cum este evidențiat și în acest cod:

```c++
#include <algorithm>
#include <iostream>
#include <vector>

// Algoritmul descris mai sus, doar ca am schimbat un pic denumirile
std::vector<std::vector<int>> G(100005);

// Vector cu toate muchiile
std::vector<std::pair<int, int>> edges;

std::vector<int> ord;

std::vector<bool> viz(100005);

// Pozitia fiecarui nod in ordinea topologica
std::vector<int> poz(100005);

void dfs(int nod) {
    viz[nod] = 1;
    for (auto x : G[nod]) {
        if (!viz[x]) {
            dfs(x);
        }
    }
    ord.push_back(nod);
}

int main() {
    int n, m, u, v;

    std::cin >> n >> m;
    while (m--) {
        std::cin >> u >> v;
        G[u].push_back(v);
        // Adaugam muchia in lista de muchii
        edges.push_back({u, v});
    }

    for (int i = 1; i <= n; i++) {
        if (!viz[i]) {
            dfs(i);
        }
    }

    std::reverse(ord.begin(), ord.end());

    for (int i = 0; i < ord.size(); i++) {
        poz[ord[i]] = i + 1;
    }

    // Parcurgem din nou toate muchiile si verificam
    for (auto e : edges) {
        if (poz[e.first] > poz[e.second]) {
            // Am gasit o muchie pentru care nu este respectata ordinea topologica
            std::cout << "IMPOSSIBLE";
            return 0;
        }
    }

    // Daca ordinea respecta toate conditiile, o afisam
    for (auto x : ord) {
        std::cout << x << " ";
    }
    return 0;
}
```

## Probleme suplimentare

- [Infoarena - Sortare Topologica](https://www.infoarena.ro/problema/sortaret)
- [CSES Course Schedule](https://cses.fi/problemset/task/1679)
- [Infoarena Path](https://www.infoarena.ro/problema/path)
- [RoAlgo Contest #4 Leximin](https://kilonova.ro/problems/1016)
- [Codeforces Fox and Names](https://codeforces.com/problemset/problem/510/C)
- [Infoarena easygraph](https://www.infoarena.ro/problema/easygraph)
- [IATI Shumen 2024 xy](https://kilonova.ro/problems/2627)
- [RoAlgo Contest #2 somnoros](https://kilonova.ro/problems/677)
- [Infoarena alpin](https://infoarena.ro/problema/alpin)
- [Codeforces Gym Permutation
  Counting](https://codeforces.com/gym/103741/problem/H)

## Resurse suplimentare

- [Topological Sorting -
  cp-algorithms](https://cp-algorithms.com/graph/topological-sort.html)
- [Topological Sorting - USACO Guide](https://usaco.guide/gold/toposort)
