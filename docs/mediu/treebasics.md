---
tags:
    - arbori
    - grafuri
---

# Introducere

Arborii sunt un tip particular de grafuri, aceștia fiind denumirea folosită pentru a defini grafurile neorientate conexe și aciclice. Se poate remarca faptul că reprezentarea grafică a acestora seamană foarte mult cu configurația unui arbore din pădure, diferența majoră fiind faptul că rădăcina arborelui este plasată de obicei în partea de sus a desenului, în contrast cu poziția reală a unei rădăcini. Nu suntem totuși la ora de biologie, așa că vom continua cu definirea arborilor.

Dintre proprietățile pe care le au arborii, vom enumera cele mai importante dintre ele, acestea fiind utilizate în mod alternativ în enunțuri pentru a defini același lucru.

* Graf neorientat conex și aciclic.
* Graf neorientat conex cu $n$ noduri și $n-1$ muchii.
* Graf neorientat conex cu proprietatea că între oricare două noduri există un drum unic. Această proprietate ne permite folosirea DFS pentru aflarea drumurilor minime în arbore, o particularitate ce nu se întâlnește la alte tipuri de grafuri, unde BFS sau alți algoritmi mai specializați de drumuri minime sunt necesare. 

Aceste proprietăți speciale pe care arborii le au față de grafurile obișnuite fac rezolvarea multor probleme cu arbori mult mai facilă decât în mod uzual. În acest articol vom discuta tipurile de arbori, modalitățile de a fi parcurși precum și câteva probleme elementare care pun în evidență modul în care folosim arborii. 

# Terminologie de bază

Pe lângă termenii folosiți la grafuri, vom mai defini câțiva termeni care sunt frecvent utilizați în contextul arborilor. 

* Un nod cu gradul $1$ se numește frunză.
* Definim nivelul unui nod ca fiind distanța de la rădăcină la acesta.
* Pentru o muchie $(x, y)$ cu $nivel_x < nivel_y$, vom spune că $x$ este părintele lui $y$.
* Înălțimea unui subarbore reprezintă distanța maximă a unui nod față de rădăcina arborelui.
* Dacă avem două noduri $x$ și $y$ cu $nivel_x < nivel_y$ și distanța de la $x$ la $y$ este $nivel_y - nivel_x$, atunci $x$ este strămoș al lui $y$. În contrast, $y$ este un descendent al lui $x$.
* Totalitatea nodurilor care sunt descendenții unui nod $x$ formează subarborele nodului $x$.

## Tipuri de arbori

În funcție de particularitățile pe care le au arborii, putem vorbi de următoarele tipuri de arbori.

* Arbori cu rădăcină - arbori la care știm nodul de la care vom începe parcurgerile. De regulă, rădăcina se află în primul nod al arborelui. 
* Arbore stea - arbore în care toate nodurile sunt conectate cu o muchie la un singur alt nod. 
* Arbore lanț - arbore care are forma unui lanț.
* Arbore binar - arbore cu proprietatea că orice nod are cel mult doi fii. Datorită importanței lor, vom insista mai mult asupra lor pentru anumite definiții viitoare.

## Arbori binari

Un arbore binar este un arbore cu proprietatea că orice nod are cel mult doi fii. În funcție de tipul acestui arbore putem defini următoarele feluri de arbori binari. 

* Arbore binar strict - un arbore binar în care fiecare nod, cu excepția celor terminale, are exact doi descendenți.
* Arbore binar plin - un arbore binar în care fiecare nivel $k \in{0,1,2,\dots,h}$, unde $h$ este înălțimea arborelui, conține $2^k$ noduri.
* Arbore binar complet - un arbore binar în care fiecare nivel $k \in{0,1,2,\dots,h}$, unde $h$ este înălțimea arborelui, conține $2^k$ noduri, cu excepția ultimului nivel, nivelul $k$ conține eventual mai puțin de $2^h$ noduri, acestea fiind grupate de regulă în partea stângă..
* Arbore binar echilibrat - un arbore binar în care pentru fiecare nod, înălțimea subarborilor din stânga și din dreapta diferă cu cel mult $1$. 
* Arbore binar de căutare - un arbore binar în care fiecare nod are o cheie unică de identificare care respectă următoarele condiții: pentru orice subarbore, cheile nodurilor din subarborele stâng sunt mai mici decât cheia rădăcinii, iar pentru orice subarbore, cheile nodurilor din subarborele drept sunt mai mari decât cheia rădăcinii.

### Parcurgerile preordine, inordine, postordine}

În funcție de ordinea în care parcurgem nodurile într-un arbore binar, putem avea următoarele tipuri de parcurgere:

#### Parcurgerea preordine (RSD)

* Vizităm mai întâi nodul curent
* Vizităm recursiv subarborele stâng al nodului curent. 
* Vizităm recursiv subarborele drept al nodului curent. 

Parcurgerea preordine e o parcurgere ordonată topologic, deoarece un nod părinte va fi mereu vizitat înaintea copiilor săi.

#### Parcurgerea inordine (SRD)

* Vizităm recursiv subarborele stâng al nodului curent. 
* Vizităm mai întâi nodul curent
* Vizităm recursiv subarborele drept al nodului curent. 

Într-un arbore binar de căutare construit astfel încât fiecare nod e mai mare decât nodurile din subarborele stâng și mai mic decât nodurile din subarborele drept, parcurgerea înordine returnează valorile în ordine crescătoare.

#### Parcurgerea postordine (SDR)

* Vizităm recursiv subarborele stâng al nodului curent. 
* Vizităm recursiv subarborele drept al nodului curent. 
* Vizităm mai întâi nodul curent

Parcurgerea postordine poate fi utilă pentru a obține expresia postfix a unui arbore binar pentru evaluarea unei expresii.

### Aplicații ale arborilor binari

Arborii binari, datorită structurii lor foarte versatile, ajung să reprezinte o fundație solidă în vederea înțelegerii foarte multor algoritmi și structuri de date arborescente, foarte multe implementări ale structurilor de date din STL având la bază arborii binari în diverse forme. 

## Problemă exemplu - aflarea dimensiunilor subarborilor unui nod

Pentru a rezolva această problemă, va trebui să parcurgem arborele (de preferat, folosind un DFS) de la rădăcină, cu scopul de a ajunge pe rând la toate frunzele arborelui. Pentru fiecare frunză, dimensiunea subarborelui său va fi $1$, iar pentru fiecare nod care nu e frunză, va fi suma subarborilor fiilor săi. În final, vom avea un algoritm ce rulează în $O(n)$.

```cpp
vector<vector<int> > tree;
int sz[100001];
void dfs(int nod, int tata)
{
    sz[nod] = 1;
    for(int i = 0; i < (int) tree[nod].size(); i++)
    {
        int fiu = tree[nod][i];
        if(fiu != tata) 
        {
            dfs(fiu, nod);
            sz[nod] += sz[fiu];
        }
    }
}
```

## Problemă exemplu - [aflarea diametrului unui arbore](https://kilonova.ro/problems/2188/)

Definim diametrul unui graf ca fiind distanța minimă cea mai mare între două noduri din graf. Deși în mod normal, această problemă este NP-hard, în cazul unui arbore există un algoritm simplu care funcționează în $O(n)$. Pentru a putea obține această distanță, avem nevoie de două parcurgeri, ambele pot fi DFS sau BFS. 

Prima parcurgere este dintr-un nod oarecare, scopul fiind să aflăm cel mai îndepărtat nod de acesta. Apoi, vom rula a doua parcurgere din acest nod cel mai îndepărtat pentru a afla distanța maximă de la acesta la celelalte noduri din arbore. Într-un final, vom obține răspunsul căutat în $O(n)$ folosind doar două parcurgeri.

```cpp
#include <vector>
#include <iostream>
using namespace std;

int n, root = 1, a, b;
vector<vector<int> > graph;
vector<int> dist;
void dfs(int parent, int node) {
    if(dist[node] > dist[root])
        root = node;
    for(int i = 0; i < (int) graph[node].size(); i++) {
        int nxt = graph[node][i];
        if(nxt == parent)
            continue;
        dist[nxt] = dist[node] + 1;
        dfs(node, nxt);
    }
}
int main() {
    cin >> n;
    graph.resize(n+1);
    dist.resize(n+1);
    for(int i = 1; i < n; i++) {
        cin >> a >> b;
        graph[a].push_back(b);
        graph[b].push_back(a);
    }
    dfs(0, root);
    dist[root] = 0;
    dfs(0, root);
    cout << dist[root] << '\n';
    return 0;
}
```

## Alte probleme și resurse utile

* [Introduction to Tree Algorithms](https://usaco.guide/silver/intro-tree?lang=cpp)
* [Grafuri și arbori - noțiuni de bază](https://cppi.sync.ro/materia/grafuri_arbori_notiuni_teoretice_de_baza.html)
* [Subordinates](https://cses.fi/problemset/task/1674)
* [Grarb infoarena](https://www.infoarena.ro/problema/grarb)
* [Tree Diameter](https://kilonova.ro/problems/2188)
* [Mootube USACO Silver](http://www.usaco.org/index.php?page=viewproblem2&cpid=788)
* [Milk Visits USACO Silver](http://www.usaco.org/index.php?page=viewproblem2&cpid=968)
* [Sap](https://kilonova.ro/problems/1802)
