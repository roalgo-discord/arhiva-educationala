---
tags:
    - grafuri
    - arbori
    - programare dinamica
---
**Autor**: Ștefan-Cosmin Dăscălescu

În ceea ce privește rezolvarea problemelor cu arbori, in anumite situatii se poate observa faptul că avem nevoie de o calculare inițială a răspunsului presupunând rădăcina într-un nod oarecare (de regulă, nodul $1$), urmată de folosirea acestor răspunsuri pentru generalizarea rezultatelor pentru toate rădăcinile posibile. Vom numi tehnica pe care o folosim pentru aceste probleme **rerooting**, sau așa cum este cunoscută în jargonul românesc, tehnica celor două DFS-uri.

În cele ce urmează, vom prezenta câteva exemple de probleme care se pot rezolva folosind această tehnică, împreună cu abordările posibile. Se va putea observa faptul că în cele mai multe situații, implementarea va fi una foarte similară, singurele modificări fiind făcute la modul în care vom defini dinamicile și alte date pe care le folosim.

## Problema [Tree Distances](https://cses.fi/problemset/task/1132) de pe CSES

!!! note "Observație"
    Această problemă are o soluție video explicată chiar de autor, pe care o puteți accesa [aici](https://www.youtube.com/watch?v=DZA4mYWpPno)

Pentru a rezolva problema, vom putea folosi o abordare de tip rerooting, după cum urmează:

Mai întâi, vom precalcula folosind un DFS dintr-un nod oarecare distanța față de cea mai îndepărtată frunză pentru fiecare nod, acest lucru se poate face foarte ușor dacă ținem într-un vector distanțele maxime, $maxdist[i]$ fiind distanța maximă de la nodul $i$ la o frunză din subarborele nodului $i$. 

Calculul acestei valori se poate face destul de simplu, deoarece pentru fiecare nod $i$, vom ști deja valoarea lui $maxdist$ pentru toți fiii acestuia, tot ce ne rămâne de făcut este să adunăm $1$ la aceste valori. Evident, pentru o frunză, $maxdist[i] = 0$.

!!! note "Observație"
    Se poate observa faptul că în codul de mai jos am ales drept rădăcină nodul $1$, aceasta fiind o convenție utilizată în cele mai multe probleme cu arbori, chiar și atunci când nu ni se precizează în mod specific rădăcina arborelui.

După ce am aflat valorile din vectorul $maxdist$, acum va trebui să folosim aceste răspunsuri pentru a afla pentru fiecare nod distanța față de cel mai îndepărtat nod care nu se află în subarborele nodului curent (la primul DFS am aflat această distanță față de nodurile care se aflau în subarborele nodului curent).

Pentru a face asta, vom avea nevoie să ținem ca un parametru suplimentar în cea de-a doua parcurgere DFS distanța maximă de la nodul curent la un nod care nu se află în subarborele său, inițial această distanță fiind $0$ pentru nodul $1$. Vom nota această distanță $distUp$.

Calcularea acestor distanțe pentru celelalte noduri se va face din aproape în aproape, ținând cont de următoarele observații:

* Pentru un nod, doar cele mai îndepărtați doi subarbori sunt relevanți, deoarece în cazul celorlalți subarbori, putem oricând să folosim ca etalon unul din primii doi subarbori.
* Pe măsură ce ne apropiem de frunze, distanța pe care o avem deja anterior calculată va crește, singurul mod în care poate crește mai mult este dacă pentru un fiu $x$, avem un alt fiu $y$ cu proprietatea că $maxdist[y] + 1 > distUp$, motivul fiind acela că atunci când am coborî spre frunze, frunza din subarborele lui $y$ ar fi mai îndepărtată. 
* Dacă vrem să ajungem la fiul care ne-a dat $maxdist[nod]$, va trebui să folosim a doua distanță pentru a calcula noua valoare a lui $distUp$, pentru a evita situația în care numărăm aceleași muchii de mai multe ori. 

Aceste observații sunt puse laolaltă în codul de mai jos, se poate observa faptul că deși conceptul pare unul mai complicat, tot ce trebuie să facem este să observăm cu atenție ce se întâmplă atunci când ajungem de la un nod la altul. 

```cpp
#include <iostream>
#include <vector>

using namespace std;
 
int n;
vector<vector<int> > tree;
vector<int> maxdist, ans;
 
void dfs (int parent, int node) {
    for (int i = 0; i < (int) tree[node].size(); i++) {
        int nxt = tree[node][i];
        if (nxt == parent) {
            continue;
        }
        dfs(node, nxt);
        maxdist[node] = max(maxdist[node], maxdist[nxt] + 1);
    }
}
 
void dfs2 (int parent, int node, int distUp) {   
    ans[node] = max(maxdist[node], distUp);
    int max1 = 0, max2 = 0; 
    // cele mai mari doua distante fata de subarborii nodului curent
    for (int i = 0; i < (int) tree[node].size(); i++) {
        int nxt = tree[node][i];
        if (nxt == parent) {
            continue;
        }
        // verificam daca distanta e mai mare decat a uneia din primele doua
        if (maxdist[nxt] + 1 > max1) {
            max2 = max1;
            max1 = maxdist[nxt] + 1;
        }
        else {
            if (maxdist[nxt] + 1 > max2) {
                max2 = maxdist[nxt] + 1;
            }
        }
    }
    
    for (int i = 0; i < (int) tree[node].size(); i++) {
        int nxt = tree[node][i];
        if (nxt == parent) {
            continue;
        } 
        // daca nodul curent este cel care ne-a dat distanta maxima
        if(maxdist[nxt] + 1 == max1) {
            dfs2(node, nxt, max(distUp, max2) + 1);
        }
        else {
            dfs2(node, nxt, max(distUp, max1) + 1);
        }
    }
}
 
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    cin >> n;
    tree.resize(n+1);
    maxdist.resize(n+1);
    ans.resize(n+1);
    
    for (int i = 1; i < n; i++) {
        int a, b;
        cin >> a >> b;
        tree[a].push_back(b);
        tree[b].push_back(a);
    }
    
    dfs(0, 1);
    dfs2(0, 1, 0);
    
    for (int i = 1; i <= n; i++) {
        cout << ans[i] << " ";
    }
    return 0;
}
```

## Problema [Subtree](https://atcoder.jp/contests/dp/tasks/dp_v) de pe AtCoder

Să considerăm o problemă mai simplă:

Presupunând că nodul $1$ este colorat negru, în câte moduri putem colora arborele?

Mai întâi, fixăm rădăcina arborelui în nodul $1$. Fie $dp[i]$ numărul de moduri în care putem colora subarborele nodului $i$ astfel încât fie nodul $i$ este colorat negru, fie niciun nod nu este colorat negru. Observați că, dacă $i$ este o frunză, atunci $dp[i]=2$ (alegem să colorăm nodul $i$ negru sau nu).

Pentru fiecare copil $c$ al lui $i$, există $dp[c]$ moduri de a colora subarborele său dacă $i$ este colorat negru. Acest lucru înseamnă că avem recurența

$$
dp[i]=1+\prod_{c \in \text{Copiii lui } i} dp[c]
$$

unde produsul corespunde colorării nodului $i$ în negru, iar $1$ corespunde colorării nodului $i$ în alb.

Răspunsul la problema mai simplă este astfel $dp[1]-1$. Calculul tuturor valorilor $dp[i]$ se poate face în $\mathcal{O}(N)$.

## Rezolvarea pentru toate rădăcinile

Mai întâi, fixăm rădăcina arborele arbitrar și facem un DFS pentru a calcula toate valorile $dp[i]$.

Fie $dp2[i]$ numărul de moduri în care putem colora arborele dacă eliminăm subarborele nodului $i$ astfel încât fie părintele lui $i$ este negru, fie niciun nod nu este colorat negru. Observați că $dp2[1]=1$.

Numărul de moduri în care putem colora arborele dacă știm că nodul $i$ este negru este pur și simplu $(dp[i]-1)\cdot dp2[i]$. Cum putem însă calcula eficient $dp2[i]$?

Recurența de bază pentru a calcula $dp2[i]$ este

$$
dp2[i] = 1+dp2[\text{Părintele lui } i] \cdot \prod_{s \in \text{Frații lui } i} dp[s]
$$

unde produsul corespunde colorării părintelui lui $i$ în negru, iar $1$ corespunde colorării părintelui lui $i$ în alb.

Totuși, deoarece $M$ nu este garantat a fi prim, nu putem pur și simplu să găsim produsul copiilor unui nod și să împărțim acel produs la $dp[i]$ pentru fiecare copil (deoarece nu putem găsi inversul modular ușor).

Cu toate acestea, observați că dacă nodul $i$ este al $k$-lea copil al părintelui său, putem folosi produse prefix și sufix pentru a calcula

$$
\prod_{s \in \text{Frații lui } i}dp[s]
$$

fără a folosi împărțirea. (Adică găsim produsul lui $dp[s]$ pentru frații de la primul la al $(k - 1)$-lea copil al părintelui lui $i$, produsul lui $dp[s]$ pentru frații de la al $(k + 1)$-lea la ultimul copil al părintelui lui $i$, și apoi le înmulțim între ele.)

Calculul tuturor valorilor $dp2[i]$ necesită $\mathcal{O}(N)$ folosind un DFS, astfel încât complexitatea totală a acestui algoritm este $\mathcal{O}(N)$.

```cpp
#include <bits/stdc++.h>
using namespace std;

int n, mod;
struct Node {
    vector<int> adj;
    vector<int> l, r;
    int down, up;
} nodes[100001];

void dfs1(int nod, int tt) {
    nodes[nod].down = 1;
    for (auto &c : nodes[nod].adj) {
        if (c != tt) {
            dfs1(c, nod);
            nodes[nod].down = (1LL * nodes[nod].down * (nodes[c].down + 1)) % mod;
        }
    }

    // scoatem parintele
    vector<int>::iterator it = find(nodes[nod].adj.begin(), nodes[nod].adj.end(), tt);
    if (it != nodes[nod].adj.end()) {
        nodes[nod].adj.erase(it);
    }
}

void dfs2(int nod, int tt) {
    int sz = nodes[nod].adj.size();
    if (sz == 0) {
        return;
    }
    nodes[nod].l.assign(sz, 0);
    nodes[nod].r.assign(sz, 0);

    nodes[nod].l[0] = nodes[nod].up;
    for (int i = 1; i < sz; i++) {
        nodes[nod].l[i] = (1LL * nodes[nod].l[i - 1] * (nodes[nodes[nod].adj[i - 1]].down + 1)) % mod;
    }

    nodes[nod].r[sz - 1] = 1;
    for (int i = sz - 2; i >= 0; i--) {
        nodes[nod].r[i] = (1LL * nodes[nod].r[i + 1] * (nodes[nodes[nod].adj[i + 1]].down + 1)) % mod;
    }

    for (int i = 0; i < sz; i++) {
        int next = nodes[nod].adj[i];
        nodes[next].up = ((1LL * nodes[nod].l[i] * nodes[nod].r[i]) + 1) % mod;
        dfs2(next, nod);
    }
}
int main() {
    
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    cin >> n >> mod;
    for (int i = 1; i < n; i++) {
        int x, y;
        cin >> x >> y;
        x--;
        y--;
        nodes[x].adj.push_back(y);
        nodes[y].adj.push_back(x);
    }
    dfs1(0, 0);
    nodes[0].up = 1;
    dfs2(0, 0);
    for (int i = 0; i < n; i++) {
        cout << (1LL * nodes[i].down * nodes[i].up) % mod << '\n';
    }
    return 0;
}
```

## Concluzii 

Tehnica rerooting este o tehnică folositoare în anumite tipuri de probleme cu arbori, de multe ori o precalculare relativ simplă poate reprezenta un pas important spre rezolvarea unor probleme foarte complicate de acest fel. Deși nu este o tehnică la fel de des întâlnită precum alte variații ale dinamicii pe arbore, apare suficient de des încât să se justifice discuția ei separată. 

## Probleme suplimentare 

* [infoarena razboiul lumilor](https://www.infoarena.ro/problema/razboi)
* [Codeforces Jovial Jaunt](https://codeforces.com/gym/105012/problem/J)
* [ONI 2003 asmin](https://kilonova.ro/problems/119)
* [Codeforces Tree with Maximum Cost](https://codeforces.com/contest/1092/problem/F)
* [infoarena treesearch](https://www.infoarena.ro/problema/treesearch)
* [USACO Gold Directory Traversal](http://www.usaco.org/index.php?page=viewproblem2&cpid=814)
* [Codeforces Two Paths](https://codeforces.com/contest/1000/problem/G)
* [ONI 2015 arbvalmax](https://kilonova.ro/problems/203/)
* [AtCoder Expensive Expense](https://atcoder.jp/contests/abc222/tasks/abc222_f)
* [BOI 2017 City Attractions](https://www.acmicpc.net/problem/14875)
* [Codeforces Road Improvement](https://codeforces.com/contest/543/problem/D)
* [APIO 2010 Patrol](https://dmoj.ca/problem/apio10p2)

## Lectură suplimentară 

* [Rerooting DP - USACO Guide](https://usaco.guide/gold/all-roots?lang=cpp)
* [The Ultimate Reroot Template - Codeforces](https://codeforces.com/blog/entry/124286)
* [Rerooting Technique - YouKn0wWho Academy](https://youkn0wwho.academy/topic-list/rerooting_technique)
* [Online Query Based Rerooting Technique](https://codeforces.com/blog/entry/76150)
* [Rerooting DP - Codeforces/Youtube](https://codeforces.com/blog/entry/96651)
