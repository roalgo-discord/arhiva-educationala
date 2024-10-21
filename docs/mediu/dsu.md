---
tags:
    - vectori 
    - arbori 
    - multimi
---

**Autor**: Ștefan-Cosmin Dăscălescu

Structurile de date sunt de multe ori foarte utile în multe contexte în
programare, acestea dovedindu-se a fi în special foarte puternice și esențiale
în lucrul problemelor date la diverse olimpiade și concursuri de informatică.
Acest articol va prezenta o structură de date care nu e la prima vedere foarte
complicată față de alte structuri de date mai consacrate, dar care se dovedește
a fi foarte puternică în rezolvarea multor probleme de toate felurile. 

Așa cum sugerează și titlul, vom prezenta în acest articol pădurile de mulțimi
disjuncte, sau union-find, denumire dată după cele două operații principale pe
care această structură de date le oferă. Union-Find poate fi folosit cu mare
ușurință pentru probleme de tipul acelora în care ni se cere să aflăm pe parcurs
ce valori sunt legate între ele printr-o relație, presupunând că relațiile
dintre valori se adaugă treptat. Pe parcurs se vor remarca diverse optimizări,
precum și diferitele clase de probleme în care se poate folosi o asemenea
structură de date.

Pentru ușurarea explicațiilor, vom presupune că avem o situație ipotetică în
care avem $n$ prieteni și ni se dau operații în care fie două persoane devin
prietene, fie trebuie să decidem dacă două persoane aparțin aceluiași grup de
prieteni.

## Definirea operațiilor și funcționalității structurii de date

### Fundamente

Pentru a reprezenta datele, vom ține într-un vector dimensiunea fiecărei
mulțimi, iar într-un alt vector vom ține pentru fiecare poziție, nodul
reprezentativ corespunzător grupului de prieteni din care face parte, la început
fiecare nod fiind reprezentantul lui însuși.

```cpp
vector<int> rad(n + 1), card(n + 1);

for(int i = 1; i <= n; ++i) {
	rad[i] = i;
	card[i] = 1;
}
```

### Operația de unire (Union)

La acest pas, ni se dau două persoane și trebuie să stabilim relația de
prietenie dintre ei. Deși această operație se face în timp constant, contează
foarte mult modul în care facem relația de atribuire, aceasta putând schimba
radical complexitatea algoritmului. Astfel, voi introduce prima optimizare, si
anume optimizarea de unire după cardinalul mulțimii, astfel încât vom uni mereu
mulțimea cu cardinal mai mic la mulțimea cu cardinal mai mare.

Motivul pentru care această optimizare duce la o complexitate mai mică va fi dat de numărul mai mic de operații pe care funcția Find le va face la fiecare pas. De asemenea, această optimizare de a uni mulțimile mai mici la cele mai mari se regăsește în mod frecvent și în alte contexte în diverse structuri de date și nu numai. 

```cpp
void Union(int a, int b) {
    if (card[a] < card[b]) { // (1)
        swap(a, b);
    }
    rad[b] = a;              // (2)
    card[a] += card[b];      // (3)
}
```

1.  Vom vrea sa atașăm nodul $b$ la nodul $a$.
2.	Rădăcina lui $b$ devine $a$.
3.	Creștem cardinalul lui $a$ cu cardinalul lui $b$.

### Operația de căutare (Find)

La această operație, vrem să găsim pentru un nod, poziția nodului reprezentativ în structura noastră de date. În mod normal, această operație poate face cel mult $O(n)$ pași, în cazul în care arborele rezultat ar fi un lanț. Totuși, putem să ne folosim de parcurgerile pe care le facem pentru a reține rezultatele pentru toate nodurile de pe parcursul acelui drum, astfel încât la o parcurgere ulterioară, numărul de pași să se reducă spre un număr constant, structura arborelui ajungând similară cu cea a unui arbore stea. 

```cpp
int Find(int x) {
    if (rad[x] == x) {  // (1)
        return x;
    }
    rad[x] = Find(rad[x]);  // (2) 
    return rad[x];
}
```

1.	Dacă nodul nostru este rădăcină, înseamnă că l-am găsit și-l returnăm în
	consecință.
2.	Rădăcina nodului nostru va deveni rădăcina rădăcinii curente.

### Prime concluzii

Operația union are complexitatea $O(1)$, iar operația de find are complexitatea $O(n)$. Totuși, datorită optimizărilor menționate mai sus (compresia drumurilor și unirea după dimensiunea mulțimilor), numărul total de operații făcute este $O(n \log^* n)$, unde $\log^* x$ reprezintă inversul funcției Ackermann, valoare care se poate aproxima ca fiind o constantă.  
De asemenea, nefolosirea optimizării de compresie a drumurilor ar duce la complexitatea $O(n \log n)$, rezultat foarte important în contextul altor optimizări, cum ar fi [tehnica small-to-large](https://usaco.guide/plat/merging?lang=cpp) sau în general în demonstrarea diverselor rezultate ce țin de sume armonice. 

## Problema [disjoint](https://infoarena.ro/problema/disjoint)

<!--ne trebuie ceva pe kilonova de genul asta-->

Pentru fiecare operație citită de la intrare, vom implementa funcțiile necesare pentru a obține rezultatul problemei. Unirea a două mulțimi implică mai întâi folosirea funcției Find pentru a găsi rădăcinile, iar mai apoi folosim funcția Union pentru a face unirea propriu-zisă. Folosirea ambelor optimizări pentru îmbunătățirea complexității duce la soluția optimă, ce rulează într-un timp aproximativ liniar raportat la numărul de valori citite. 

Soluția de 100 de puncte este următoarea:
```cpp
#include <fstream>
#include <vector>

using namespace std;

constexpr int NMAX = 100002;

int n, m;

vector<int> rad(NMAX), card(NMAX);

int Find(int x) {
    if (rad[x] == x) {
        return x;
    }
    rad[x] = Find(rad[x]);
    return rad[x];
}

void Union(int a, int b) {
    if (card[a] < card[b]) {
        swap(a, b);
    }
    rad[b] = a;
    card[a] += card[b];
}

int main() {
    ifstream fin("disjoint.in");
    ofstream fout("disjoint.out");

    fin >> n >> m;

    for (int i = 1; i <= n; ++i) {
        rad[i] = i;
        card[i] = 1;
    }

    for (int i = 1; i <= m; ++i) {
        int cod, x, y;
        fin >> cod >> x >> y;

        if (cod == 1 && Find(x) != Find(y)) {
            Union(Find(x), Find(y));
        } else {
            fout << (Find(x) == Find(y)) ? "DA\n" : "NU\n";
        }
    }

    fin.close();
    fout.close();
    return 0;
}
```

### Oare putem implementa mai eficient?

Inițial, noi am implementat această structură folosind doi vectori, anume cel în
care ținem cardinalul fiecărei mulțimi, precum și cel în care ținem rădăcina
fiecărei mulțimi. Totuși, se poate observa faptul că noi folosim o grămadă de
informație inutilă din cauza faptului că pentru fiecare număr, practic ne
interesează doar dacă e o rădăcină a unei mulțimi de valori sau nu. Astfel, vom
recurge la a reprezenta pozițiile corespunzătoare rădăcinilor cu numere
negative, reprezentând $-x$, unde $x$ e cardinalul mulțimii reprezentat de acea
valoare, respectiv reprezentarea nodurilor adiacente cu numere pozitive,
reprezentând rădăcina mulțimii din care acea valoare face parte.

Soluția de 100 de puncte cu optimizarea de memorie este următoarea:
```cpp
#include <fstream>
#include <vector>

using namespace std;

constexpr int NMAX = 100002;

int n, q;

vector<int> sz(NMAX);

int Find(int nod) {
    if (sz[nod] < 0) {
        return nod;
    }
    sz[nod] = Find(sz[nod]);
    return sz[nod];
}

void Union(int a, int b) {
    if (a == b) {
        return;
    }

    if (sz[a] > sz[b]) {
        swap(a, b);
    }

    sz[a] += sz[b];
    sz[b] = a;
}

int main() {
    ifstream fin("disjoint.in");
    ofstream fout("disjoint.out");

    fin >> n >> q;

    for (int i = 1; i <= n; ++i) {
        sz[i] = -1;
    }

    for (int i = 1; i <= q; ++i) {
        int cod, x, y;
        fin >> cod >> x >> y;

        if (cod == 1 && Find(x) != Find(y)) {
            Union(Find(x), Find(y));
        } else {
            fout << (Find(x) == Find(y)) ? "DA\n" : "NU\n";
        }
    }

    fin.close();
    fout.close();
    return 0;
}
```

## Problema [bile](https://infoarena.ro/problema/bile).

!!! info "Cerință"

	Pe o tabla patratica impartita in $N^2$ patratele ($N$ linii si $N$ coloane), se afla asezate $N^2$ bile (cate una in fiecare patratica a tablei). Lui Gigel ii plac bilele foarte mult, astfel ca el ia, pe rand, cate o bila de pe tabla, pana cand nu mai ramane pe tabla nici o bila. Gigel este, de asemenea, un baiat foarte curios. El a constatat ca bilele pot fi impartite in componente conexe, astfel:
	
	* fiecare bila face parte din exact o componenta conexa
	
	* daca 2 bile sunt invecinate pe orizontala sau verticala, atunci ele fac
	  parte din aceeasi componenta conexa (adica daca una se afla imediat
	  deasupra, dedesubtul, la dreapta sau la stanga celeilalte)

	Dimensiunea unei componente conexe este egala cu numarul de bile care fac parte din componenta conexa respectiva. Dupa fiecare bila luata, Gigel vrea sa stie care este valoarea maxima dintre dimensiunile componentelor conexe din care fac parte bilele ramase.

Mai întâi, trebuie observat faptul că problema determinării conectivității dinamice este una foarte dificil de rezolvat (vezi [acest articol de pe Wikipedia](https://en.wikipedia.org/wiki/Dynamic_connectivity)), deci nu are sens să ne chinuim cu asemenea implementări care nu fac obiectul cursului nostru sau în general a programelor olimpiadelor de informatică.

Asta ne duce cu gândul să încercăm să privim problema dintr-o perspectivă diferită, în special și datorită faptului că nu suntem forțați să răspundem la actualizări online. Din acest motiv, vom introduce o abordare care se folosește la multe soluții ce se bazează pe folosirea pădurilor de mulțimi disjuncte. 

Practic, în loc să privim problema de la început la final, vom rezolva problema inversă, în care putem adăuga bile, ceea ce ne ajută să reducem problema la o aplicație standard a pădurilor de mulțimi disjuncte, răspunsurile ajungând în cele din urmă să fie afișate în ordinea inversă în care le-am aflat. 

Soluția de 100 de puncte este următoarea:
```cpp
#include <algorithm>
#include <fstream>
#include <utility>

using namespace std;

template<typename T, size_t N>
using Array = T[N];

int n, maxim;

Array<int, 251*251> rad, card, rasp;
Array<pair<int, int>, 251*251> elim;
Array<Array<int, 251>, 251> nr;
Array<Array<bool, 251>, 251> viz;

int dx[] = {-1, 0, 1, 0};
int dy[] = {0, 1, 0, -1};

int Find(int x) {
    if (rad[x] == x) {
        return x;
    }

    return rad[x] = Find(rad[x]);
}

void Union(int a, int b) {
    if (card[a] < card[b]) {
        swap(a, b);
    }

    rad[b] = a;
    card[a] += card[b];

    maxim = max(maxim, card[a]);
}

int main() {
    ifstream fin("bile.in");

    fin >> n;

    for (int i = 1; i <= n; ++i)
        for (int j = 1; j <= n; j++) {
            int idx = (i - 1) * n + j;
            nr[i][j] = idx;
            card[idx] = 1;
            rad[idx] = idx;
        }

    for (int i = 1; i <= n * n; ++i) {
        fin >> elim[i].first >> elim[i].second;
    }

    fin.close();

    for (int i = n * n; i >= 1; i--) {
        rasp[i] = maxim;
        int x = elim[i].first;
        int y = elim[i].second;

        for (int j = 0; j < 4; j++) {
            int newX = x + dx[j];
            int newY = y + dy[j];

            if (newX >= 1 && newX <= n && newY >= 1 && newY <= n &&
                viz[newX][newY]) {
                int b1 = nr[x][y];
                int b2 = nr[newX][newY];
                if (nr[newX][newY] != 0 && Find(b1) != Find(b2)) {
                    Union(Find(b1), Find(b2));
                }
            }
        }

        maxim = max(maxim, 1);
        viz[x][y] = true;
    }

    ofstream fout("bile.out");

    for (int i = 1; i <= n * n; ++i) {
        fout << rasp[i] << '\n';
    }

    fout.close();

    return 0;
}

```

## Problema [Secvmax](https://www.infoarena.ro/problema/secvmax).

!!! info "Cerință" 
	Fiona are o secventa de $N$ numere naturale. Ea se întreabă din când în când
	pentru un anumit număr $Q$ care este cea mai lungă subsecvență care are
	toate numerele mai mici sau egale cu $Q$. Ajutați-o pe Fiona să își răspundă
	la toate întrebările.

Aici putem folosi din nou prelucrarea numerelor în ordine crescătoare a numerelor din vector, iar atunci când adăugăm valorile în considerare, vom verifica fiecare vecin să vedem dacă putem uni valorile din cele două mulțimi, iar la fiecare pas răspunsul e cardinalul maxim al unei mulțimi, care e crescător pe măsură ce creștem valorile adăugate.  

```cpp
#include <fstream>
#include <algorithm>
#include <vector>

using namespace std;

ifstream f("secvmax.in");
ofstream g("secvmax.out");

struct Pair {
    int value;
    int index;

    constexpr bool operator<(const Pair &other) const {
        if (value == other.value) {
            return index < other.index;
        }
        return value < other.value;
    }
};

vector<Pair> queries, elements;
vector<int> result, parent, sequence, length;
int maxLength = 0;

int Find(int node) {
    int root;
    for (root = parent[node]; root != parent[root]; root = parent[root]);
    int x = node;
    while (x != root) {
        swap(root, parent[x]);
    }
    return root;
}

void Union(int a, int b) {
    if (length[a] < length[b]) {
        length[b] += length[a];
        parent[a] = b;
        length[a] = 0;
    } else {
        length[a] += length[b];
        parent[b] = a;
        length[b] = 0;
    }

    maxLength = max(maxLength, length[a] + length[b]);
}

int main() {
    int n, q;
    f >> n >> q;

    elements.resize(n + 1);
    parent.resize(n + 1);
    sequence.resize(n + 1);
    length.resize(n + 1);

    queries.resize(q + 1);
    result.resize(q + 1);

    for (int i = 1; i <= n; ++i) {
        int value;
        f >> value;
        elements[i] = {value, i};
        sequence[i] = value;
        parent[i] = i;
    }

    sort(elements.begin() + 1, elements.end());

    for (int i = 1; i <= q; ++i) {
        int value;
        f >> value;
        queries[i] = {value, i};
    }

    sort(queries.begin() + 1, queries.end());

    int pos = 1;

    for (int i = 1; i <= q; ++i) {
        while (pos <= n && elements[pos].value <= queries[i].value) {
            int idx = elements[pos++].index;
            length[idx] = 1;
            maxLength = max(maxLength, 1);

            if (idx > 0 && sequence[idx - 1] <= sequence[idx]) {
                Union(Find(idx - 1), Find(idx));
            }

            if (idx < n - 1 && sequence[idx + 1] < sequence[idx]) {
                Union(Find(idx + 1), Find(idx));
            }

        }
        result[queries[i].index] = maxLength;
    }

    for (int i = 1; i <= q; ++i) {
        g << result[i] << '\n';
    }

    return 0;
}
```



## Problema [joingraf](https://kilonova.ro/problems/1907).

!!! info "Cerință"
	A fost ziua lui Traian de curând, iar el a primit în dar un graf cu $N$ noduri. La început, fiecare nod era într-o componentă conexă, singur. Dar apoi, câinele lui Traian a venit și i-a spus $Q$ întrebări de forma următoare:

	* $1 \ x \ y$: Adaugă la graful tău muchiile $(x, x + 1), (x + 1, x + 2), \dots , (y - 1, y)$
	* $2 \ x \ y$: Spune dacă nodurile $x$ și $y$ sunt în aceeași componentă conexă.

Pentru a rezolva această problemă există mai multe abordări, plecând de la diverse moduri de a gândi problema, dar în contextul pădurilor de mulțimi disjuncte, ne vom concentra pe soluția cu DSU. 

Mai întâi, trebuie să observăm că componentele conexe sunt ca niște intervale. De exemplu, să luăm $n = 7$. Atunci, la început intervalele vor fi: $[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7]$. Dacă unim muchiile de la $3$ la $6$, intervalele vor deveni: $[1, 1], [2, 2], [3, 6], [7, 7]$.

Atunci, putem folosi o structură de tip DSU. Vom reține $par_i = $ "părintele" nodului $i$, sau mai ușor de înțeles, capătul stânga al intervalului în care este nodul $i$. Este nevoie să reținem doar capătul dreapta, deoarece capătul dreapta al secvenței curente este predecesorul capătului stânga al secvenței următoare. Vom reține și $nxt_i = $ capătul stânga al secvenței de după secvența în care este $i$.

Iar atunci când avem update cu $x, y$, mergem la fiecare secvență până la $y$ (adică când avansăm de la $p$ la următoarea, facem $p = nxt_p$) și o reunim cu secvența în care este $x$.

Iar la query, verificăm dacă intervalul în care este $x$ este egal cu cel în care este $y$. Complexitate: $O(N + Q \ log \ N)$ timp, $O(n)$ memorie.

```cpp
#include <iostream>
#include <vector>

using namespace std;

constexpr int N = 1e6 + 2;
int n, q;

vector<int> tt(N), jump(N);

int root(int nd) {
    while (tt[nd] != nd) {
        return tt[nd] = root(tt[nd]);
    }
    return nd;
}
void unite(int a, int b) {
    a = root(a);
    b = root(b);

    if (a == b) {
        return;
    }

    tt[b] = tt[a];
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    cin >> n >> q;

    for (int i = 1; i <= n; i++) {
        tt[i] = jump[i] = i;
    }

    while (q--) {
        int t, x, y;
        cin >> t >> x >> y;

        if (t != 1) {
            cout << (root(x) == root(y) ? "Da\n" : "Nu\n");
            continue;
        }

        int p = x;
        while (p <= y) {
            unite(x, p);
            p = jump[p] + 1;
        }
        jump[x] = jump[y];
    }
    return 0;
}
```

## Concluzii

Acest articol este menit să introducă audiența în folosirea pădurilor de mulțimi
disjuncte, punând accentul pe funcționalitățile de bază, fără a menționa alte
aplicații importante, cum ar fi algoritmul lui Kruskal sau algoritmii folosiți
pentru dynamic connectivity. De asemenea, pădurile de mulțimi disjuncte pot fi
folosite pentru a scurta foarte mult implementările aplicațiilor simple la
grafuri.

<!-- ref la APM cand va fi sa fie -->
<!--ref la dynamic connectivity cand va fi sa fie-->

## Probleme suplimentare

### Probleme de la olimpiade

* [Chemical table - EJOI 2018](https://cses.fi/395/list/)
* [MexC ONI 2008](https://kilonova.ro/problems/1785)
* [JBOI 2023 Frequencies](https://kilonova.ro/problems/2013/)
* [IIOT 2023-24 Binary Chess](https://kilonova.ro/problems/1936)
* [Probleme cu DSU de pe kilonova](https://kilonova.ro/tags/311)
* [COCI 13-ladice](https://dmoj.ca/problem/coci13c5p6)
* [USACO MooTube](http://www.usaco.org/index.php?page=viewproblem2&cpid=789)
* [USACO Wormhole Sort](http://www.usaco.org/index.php?page=viewproblem2&cpid=992)

### Probleme de pe Codeforces/AtCoder

* [Microcycles - Codeforces](https://codeforces.com/contest/1927/problem/F)
* [Galleries - AGM 2020](https://codeforces.com/gym/102565/problem/D)
* [DSU Step 1 - Codeforces EDU](https://codeforces.com/edu/course/2/lesson/7/1/practice)
* [DSU Step 2 - Codeforces EDU](https://codeforces.com/edu/course/2/lesson/7/2/practice)
    

### Bibliografie și lectură suplimentară

Am ordonat resursele suplimentare în ordinea dificultății înțelegerii și într-o
ordine logică pentru a ușura obținerea de cunoștinte despre tehnicile,
abordările și problemele discutate în acest curs. 

* [Păduri de mulțimi disjuncte - CS Academy](https://csacademy.com/lesson/disjoint_data_sets/)
* [Algoritmul Union-Find - Algopedia](https://www.algopedia.ro/wiki/index.php/Clasa_a_VII-a_lec%C8%9Bia_18_-_23_ian_2020#Algoritmul_union-find)
* [Link ce trebuie accesat pentru inscrierea la cursul despre DSU facut de ITMO Academy](https://codeforces.com/edu/courses)
* [Articol USACO Guide - DSU](https://usaco.guide/gold/dsu?lang=cpp)
* [Curs despre DSU - Codeforces (este necesar un cont pentru a putea accesa acest curs, plus accesarea linkului de mai sus)](https://codeforces.com/edu/course/2/lesson/7)
* [Sack (dsu on tree) - Avansat](https://codeforces.com/blog/entry/44351)
* [Smenul de manevrare a query-urilor offline cu DSU](https://codeforces.com/blog/entry/75369)