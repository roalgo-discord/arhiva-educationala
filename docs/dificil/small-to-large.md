---
tags:
    - structuri de date
    - arbori 
    - STL
    - dsu
---

**Autor**: Radu Mocănașu

## Cunoștințe necesare:

* Arbori.
* Parcurgeri `DFS`.
* Containerele `set` și `map` din STL.
* De preferat si [`DSU`](../mediu/dsu.md)

## Introducere

Să începem cu următoarea problemă:

### [CSES - Distinct Colors](https://cses.fi/problemset/task/1139)

Pentru a rezolva această problemă, ar fi necesar să știm pentru fiecare nod câte valori diferite se află în mulțimea nodurilor din subarborele său.

!!! note "Observație" 
    Pentru un nod, ar fi destul să ținem într-o structură de tip `set` valorile nodurilor din subarborele său (pe care îl vom nota cu $s$), iar răspunsul pentru el ar fi `s[nod].size()`.

Astfel, am putea să facem o parcurgere `DFS` a arborelui, unde mulțimii fiecărui nod îi vom adăuga valoarea sa și valorile din mulțimile fiilor săi. Apoi, putem salva rezultatul într-un vector separat, pe care îl putem numi `rez`.

Să ne uităm la implementarea acestei idei.

```c++
#include <iostream>
#include <set>
#include <vector>

constexpr int NMAX = 200005;
int rez[NMAX];
std::vector<std::vector <int>> G(NMAX);
//tinem minte cate un set pentru fiecare nod
std::vector<std::set <int>> s(NMAX);

void dfs(int nod, int t) {
    for (auto x : G[nod]) {
        if (x != t) {
            dfs(x, nod);
            //parcurgem setul fiecarui fiu si adaugam elementele in setul nodului
            for (auto x2 : s[x]){
                s[nod].insert(x2);
            }
        }
    }
    //obtinem rezultatul folosind metoda .size()
    rez[nod] = s[nod].size();
}

int main() {
    int n, i, u, v, c;
    std::cin >> n;
    for (i = 1; i <= n; i++) {
        std::cin >> c;
        //valoarea nodului o putem adauga direct in setul acestuia
        s[i].insert(c);
    }
    for (i = 1; i < n; i++) {
        std::cin >> u >> v;
        G[u].push_back(v);
        G[v].push_back(u);
    }
    dfs(1, 0);
    for (i = 1; i <= n; i++) {
        std::cout << rez[i] << " ";
    }
    return 0;
}

```

Totuși, complexitatea reuniunii multimii unui nod cu cele ale fiilor sai poate lua pana la $O(n\log(n))$, iar noi avem $n$ noduri, deci ar ieși timp $O(n^2\log(n))$, ceea ce este foarte lent și nu se va încadra în restricțiile acestei probleme.

Însă, aici intervine următoarea informație:

!!! note "Observație" 
    Pe structuri cum ar fi `set` sau `map`, operația de `swap` este efectuată în timp constant. Așadar, dacă avem 2 seturi, $s_1$ și $s_2$, `std::swap(s1, s2)`, sau alternativ `s1.swap(s2)`, va lua $O(1)$.

Așadar, în cazul în care mărimea setului unui fiu este mai mare decât cea a setului nodului, le putem interschimba între ele. De aici vine și numele tehnicii, deoarece noi ducem elementele de la mic la mare.


### Demonstrație complexitate

Demonstrație scurtă

Ne putem baza pe același principiu ca la `DSU`, anume că dacă la un moment dat avem un element $x$ într-un set de mărime $s$, în cel mai rău caz, acesta va fi reunit cu un set tot de mărime $s$. Astfel, următorul set în care se va afla elementul va avea cel puțin $2s$ elemente, sau altfel spus, orice element va fi inserat în maxim $\log(n)$ seturi pe parcursul algoritmului. Așadar, vom avea complexitate $O(n\log^2(n))$, deoarece și inserările iau $O(\log(n))$.

Demonstrație lungă

Acum intervine întrebarea: cu ce ne ajută să interschimbăm cele două mulțimi? Să presupunem că avem mulțimi care permit existența a mai multor elemente egale (structura multiset din STL). Astfel, dacă avem o mulțime $M$ de mărime $s$, aceasta va fi reunită, în cel mai rău caz, cu o altă mulțime de dimensiune $s$, deci următoarea mulțime în care se vor afla elementele din $M$ va avea dimensiunea de cel puțin $2 * s$. Așadar, orice element va fi inserat în maxim $\log(n)$ seturi pe parcursul algoritmului, iar complexitatea finală va fi $O(n\log^2(n))$, deoarece inserările iau în total $O(n\log(n))$.

Pentru structurile de tip set (care nu conțin mai multe elemente egale), intervine însă o problemă. Anume, dacă reunim o astfel de mulțime de dimensiune $s$ cu alta de aceeași dimensiune, numărul de elemente al mulțimii care va rezulta nu va mai fi neapărat $2 * s$, deoarece pot fi elemente care apar în ambele mulțimi.

Totuși, putem demonstra că și în acest caz complexitatea rămâne aceeași. Dacă pentru fiecare nod, pentru mulțimea sa, am ține minte câte elemente ar fi avut dacă era un multiset. Dacă am face swap între cele două mulțimi doar în funcție de această proprietate, ar fi cel puțin la fel de rapid ca în cazul de mai sus (e la fel ca și cum am fi avut două structuri de tip multiset, minus elementele care se repetau). Această metodă, nu ține însă cont de mărimea reală a mulțimilor, deci putem avea cazuri unde mulțimea cu dimensiunea mai mare este reunită la cea de dimensiune mai mică. Așadar, pentru două structuri de tip set, putem să le interschimbăm după dimensiunea lor reală, fără ca acest lucru să afecteze complexitatea finală, care rămâne tot maxim $O(n\log^2(n))$.

Cu această schimbare, codul va arăta așa:

```c++
#include <iostream>
#include <set>
#include <vector>

constexpr int NMAX = 200005;
int rez[NMAX];
std::vector<std::vector <int>> G(NMAX);
//tinem minte cate un set pentru fiecare nod
std::vector<std::set <int>> s(NMAX);

void dfs(int nod, int t) {
    for (auto x : G[nod]) {
        if (x != t) {
            dfs(x, nod);
            //daca numarul de elemente din setul fiului este mai mare decat cel din setul nodului, le interschimbam
            if(s[x].size() > s[nod].size()){
                s[nod].swap(s[x]);
            }
            //parcurgem setul fiecarui fiu si adaugam elementele in setul nodului
            for (auto x2 : s[x]){
                s[nod].insert(x2);
            }
        }
    }
    //obtinem rezultatul folosind metoda .size()
    rez[nod] = s[nod].size();
}

int main() {
    int n, i, u, v, c;
    std::cin >> n;
    for (i = 1; i <= n; i++) {
        std::cin >> c;
        //valoarea nodului o putem adauga direct in setul acestuia
        s[i].insert(c);
    }
    for (i = 1; i < n; i++) {
        std::cin >> u >> v;
        G[u].push_back(v);
        G[v].push_back(u);
    }
    dfs(1, 0);
    for (i = 1; i <= n; i++) {
        std::cout << rez[i] << " ";
    }
    return 0;
}

```

Această soluție se încadrează în limitele problemei și va lua punctaj maxim.


## Small to large folosind `__gnu_pbds`

Această structură de date oferă aceleași funcții ca structura `set` din STL, însă mai oferă încă 2 funcții care ne pot fi de ajutor în anumite probleme:

1. `find_by_order(x)`, care returnează un iterator către a x-a cheie ca ordine, în timp $O(\log(n))$.
2. `order_of_key(x)`, care returnează numărul de elemente **strict** mai mici ca x, tot în timp $O(\log(n))$.

Pentru a putea folosi această structură, va trebui să adăugăm la programul nostru următoarele linii:
```c++
#include <ext/pb_ds/assoc_container.hpp>
#include <ext/pb_ds/tree_policy.hpp>
using namespace __gnu_pbds;
using ordered_set = tree<int, null_type, std::less_equal<int>, rb_tree_tag, tree_order_statistics_node_update>; 
```
În interiorul parantezelor ascuțite de după `tree`, primul câmp reprezintă tipul de date, în acest caz `int`, al patrulea reprezintă tipul de arbore folosit, în acest caz, `rb_tree`, care garantează complexitatea logaritmică a operațiilor de inserare și ștergere. Al treilea câmp reprezintă tipul de comparator folosit, unde `std::less_equal` permite existența a mai multor elemente egale (ca un `multiset`), iar `std::less` nu (ca un `set`).


Totuși, deși structura __gnu_pbds ne oferă multe avantaje, următoarele lucruri trebuie luate în considerare când este folosită:

1.    Chiar dacă operațiile au complexitate logaritmică, constanta este foarte mare.
2.    Dacă vrem să interschimbăm 2 astfel de structuri în timp $O(1)$, va trebui să folosim metoda .swap(), cum apare în codul de mai jos. Dacă am folosi funcția `std::swap()`, aceasta ar avea complexitate liniară.




### Problemă: [E - Penultimul Cox -  Kilonova](https://kilonova.ro/problems/575)

Această problemă se poate rezolva folosind o structură de tip `__gnu_pbds` care admite mai multe chei egale (folosește comparatorul `std::less_equal`). Este ușor să ne dăm seama că răspunsul pentru fiecare nod este chiar `s[nod].order_of_key(v[nod] + 1)`. Acel +1 se datorează faptului că ne trebuie numărul de elemente mai mici sau egale cu $v[nod]$, iar metoda `order_of_key` returnează numărul de elemente strict mai mici.

O implementare a ideii de mai sus ar fi următoarea:

```c++
#include <iostream>
#include <vector>

#include <ext/pb_ds/assoc_container.hpp>
#include <ext/pb_ds/tree_policy.hpp>
using namespace __gnu_pbds;

//avem elemente de tip int, care se repeta
using ordered_set = tree<int, null_type, std::less_equal<int>, rb_tree_tag, tree_order_statistics_node_update>; 

constexpr int NMAX = 100005;
std::vector<std::vector<int>> G(NMAX);
ordered_set s[NMAX];
int v[NMAX];
int rez[NMAX];

void dfs(int nod) {
    for (auto x : G[nod]) {
        dfs(x);
        //la fel ca la set, operatia de swap ia tot O(1)
        if (s[x].size() > s[nod].size()){
            s[x].swap(s[nod]);
        }
        for (auto x2 : s[x]){
            s[nod].insert(x2);
        }
    }
    //numarul de elemente din set mai mici sau egale cu v[nod]
    rez[nod] = s[nod].order_of_key(v[nod] + 1);
}

int main() {
    int n, i, t;
    std::ios_base::sync_with_stdio(false);
    std::cin.tie(nullptr);
    std::cin >> n;
    for (i = 2; i <= n; i++) {
        std::cin >> t;
        G[t].push_back(i);
    }
    for (i = 1; i <= n; i++) {
        std::cin >> v[i];
        s[i].insert(v[i]);
    }
    dfs(1);
    for (i = 1; i <= n; i++){
        std::cout << rez[i] << " ";
    }
    return 0;
}
```

## Probleme suplimentare 

* [Toska - Kilonova](https://kilonova.ro/problems/2098)
* [Lomsat Gerlal - Codeforces](https://codeforces.com/problemset/problem/600/E)
* [Arborel - Kilonova](https://kilonova.ro/problems/2970)
* [Magic Tree - CEOI 2019](https://codeforces.com/contest/1193/problem/B)
* [Alte probleme cu small-to-large de pe Kilonova](https://kilonova.ro/problems/2098)


## Resurse suplimentare 

* [Small-to-large - Usaco Guide](https://usaco.guide/plat/merging?lang=cpp)
* [__gnu_pbds - GeeksForGeeks](https://www.geeksforgeeks.org/ordered-set-gnu-c-pbds/)
* [C++ STL: Policy based data structures - Codeforces](https://codeforces.com/blog/entry/11080)
* [Sack (dsu on tree) - Codeforces](https://codeforces.com/blog/entry/44351)
* [[Explanation] dsu on trees (small to large) - Codeforces](https://codeforces.com/blog/entry/67696)