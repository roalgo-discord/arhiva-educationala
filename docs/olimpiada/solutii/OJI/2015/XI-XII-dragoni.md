---
id: OJI-2015-XI-XII-dragoni
title: Soluția problemei dragoni (OJI 2015, clasele XI-XII)
problem_id: 32
authors: [vgavrila]
prerequisites:
    - shortest-path
tags:
    - OJI
    - clasa XI-XII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2015/11-12/dragoni.txt).

<div class="editorial-text" markdown>

```text
Problema Dragoni - Autor: Vlad-Alexandru Gavrila, Universitatea Cambridge

Solutie oficiala - Vlad-Alexandru Gavrila

Pentru a rezolva doar cerinta a), se vor pastra in graf doar acele muchii care pot fi parcurse de dragonul aflat pe insula 1 (care au lungimea mai mica decat distanta maxima Dmax[1]). Apoi se va face o parcurgere BFS sau DFS din nodul 1 pe acest graf pentru a se determina multimea M de noduri care pot fi vizitate pornind din nodul 1 folosind doar dragonul 1. Raspunsul va fi reprezentat de valoarea Dmax[x] maxima pentru care x apartine M.

Pentru a rezolva cerinta b), vom construi un nou graf in care putem reprezenta corect miscarile pe care le poate face Hiccup. Astfel, un nod va fi reprezentat de o pereche (i, j) (1<=i, j<=N), cu urmatoarea semnificatie: Hiccup se afla in nodul i avand la el un dragon de tipul j. Apoi vom trasa muchiile in acest nou graf corespunzator cu miscarile pe care le poate face Hiccup:

1. Zbor:

Pentru fiecare muchie din graful initial A[i], B[i], D[i], si fiecare j intre 1 si N, avem muchie bidirectionala in graful nou intre nodurile (A[i], j), (B[i], j) de lungime D[i] doar daca D[i]<=Dmax[j]. Aceasta muchie corespunde unui zbor intre nodurile A[i] si B[i] cu dragonul j.

2. Schimbarea dragonului:

Pentru fiecare nod i din graful original si fiecare j intre 1 si N, avem muchie unidirectionala intre nodurile (i, j) si (i, i) de cost 0 in graful nou. Aceasta muchie corespunde schimbarii unui dragon arbitrar j cu un dragon din specia aflata in nodul i.

Pe acest graf nou construit se va aplica algoritmul lui Dijkstra pornind din nodul (1, 1). Solutia va fi distanta minima in care putem accesa unul din nodurile (N, 1), (N, 2) ... (N, n), deoarece nu ne intereseaza cu ce dragon ajungem in nodul N.

De mentionat este ca graful nu trebuie retinut efectiv in memorie, deoarece aceasta abordare nu se incadreaza in limitele problemei. Observam ca pentru orice i intre 1 si M si orice j intre 1 si N, avem (A[i], j) -> (B[i], j) in graful nou doar daca D[i] <= Dmax[j] - aceasta verificare putand fi facuta in cadrul algoritmului lui Dijkstra cand incercam sa vedem daca o muchie poate imbunatati vreo distanta. Muchiile de tip (i, j) -> (i, i) pot fi, din nou, generate pe parcurs, fara a trebui sa fie retinute.

Complexitate timp: O(M*N log N) timp, O(N+M) memorie.



Solutie alternativa (pentru cerinta 2) - Adrian Panaete

Se considera multimea tuturor perechilor insula-dragon. Pentru fiecare pereche se calculeaza distanta minima parcursa pentru a ajunge pe insula respectiva cu dragonul respectiv. Initial avem doar dragonul 1 pe insula 1 cu distanta 0. In continuare vom alege mereu perechea de distanta minima disponibila. Aceasta va corespunde unei insule si unui dragon.

Se alege cel mai bun intre dragonul respectiv si dragonul corespunzator insulei si se va incerca imbunatatirea distantelor la vecinii insulei care sunt situati la distanta mai mica decat Dmax pentru dragonul respectiv. Pentru mentinerea sortata a perechilor se poate folosi o structura de tip set sau heap. Pentru a evita utilizarea unei astfel de structuri poate fi folosit principiul din algoritmul Bellman-Ford. Mai precis se mentine o coada cu toate perechile in care a avut loc o imbunatatire a distantei si se proceseaza elementele din coada. Pentru eficientizare o pereche poate fi marcata la intrarea in coada si demarcata la parasirea ecesteia.

Daca insula de destinatie este chiar insula N, in loc sa introducem perechea in coada se update-aza solutia.
```

</div>

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>
#include <bitset>
#include <vector>
#include <queue>

using namespace std;
const int NMAX = 800;
const int INF = 21e8;

ifstream cin("dragoni.in");
ofstream cout("dragoni.out");

struct muchii{
    int nod, cost;
};
vector <vector <muchii>> v;
int d[NMAX + 2];

int bfs(int start) { ///Cer1
    bitset <NMAX + 2> viz = 0;
    queue <int> q;
    int maxx = d[start];
    q.push(start);
    viz[start] = 1;

    while(!q.empty()) {
        int now = q.front();
        q.pop();
        for(const muchii& x : v[now]) {
            if(!viz[x.nod] && x.cost <= d[start]) {
                maxx = max(maxx, d[x.nod]);
                viz[x.nod] = 1;
                q.push(x.nod);
            }
        }
    }
    return maxx;
}
int n;
int dist[NMAX + 2][NMAX + 2]; ///dist[i][j] - Dmin de a ajunge de la 1 la i, avand dragonul j

struct prio{
    int i, j, cost;
    bool operator <(const prio & rhs) const {
        return cost > rhs.cost;
    }
};

void dijkstra() {
    for(int i = 1; i <= n; i++)
        for(int j = 1; j <= n; j++)
            dist[i][j] = INF;
    priority_queue <prio> pq;
    pq.push({1, 1, 0});
    while(!pq.empty()) {
        prio now = pq.top();
        pq.pop();
        if(dist[now.i][now.j] < now.cost)
            continue;
        dist[now.i][now.j] = now.cost;
        dist[now.i][now.i] = min(dist[now.i][now.i], dist[now.i][now.j]);
        int dragon = now.j; ///Imi aleg dragonul mai mare
        if(d[now.j] < d[now.i])
            dragon = now.i;
        for(const muchii& x : v[now.i]) {
            if(x.cost <= d[dragon] && dist[x.nod][dragon] > now.cost + x.cost) {
                dist[x.nod][dragon] = now.cost + x.cost;
                pq.push({x.nod, dragon, now.cost + x.cost});
            }
        }
    }
}

int main() {
    int cer, m;
    cin >> cer >> n >> m;
    v.resize(n + 1);
    for(int i = 1; i <= n; i++)
        cin >> d[i];
    for(int i = 1; i <= m; i++) {
        int a, b, cost;
        cin >> a >> b >> cost;
        v[a].push_back({b, cost});
        v[b].push_back({a, cost});
    }
    if(cer == 1) {
        cout << bfs(1);
        return 0;
    }
    dijkstra();
    int minn = INF;
    for(int i = 1; i <= n; i++)
        minn = min(minn, dist[n][i]);
    cout << minn;
    return 0;
}
```
