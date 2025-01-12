---
tags:
    - OJI
    - clasa XI-XII
---

# Soluția problemei graf (OJI 2006, clasele XI-XII)

!!! example "Cunoștințe necesare"
    * [Introducere în STL](https://edu.roalgo.ro/cppintro/stl/)
    * [Introducere în teoria grafurilor](https://edu.roalgo.ro/usor/graphs/)

**Autor soluție**: Victor Manz

**Descriere Solutie**

I) Dacă definim distanţa între două vârfuri ale unui graf neorientat ca fiind
lungimea celui mai scurt lanţ dintre care are drept capete vârfurile, atunci putem să
observăm că un vârf oarecare Z se află pe un lanţ de lungime minima dintre X şi Y
dacă şi numai dacă d(X,Z)+d(Z,Y)=d(X,Y) , pentru cazul în care considerăm
lungimea lanţului ca fiind numărul muchiilor şi d(X,Z)+d(Z,Y)=d(X,Y)+1, pentru
cazul în care considerăm lungimea ca fiind numărul vârfurilor.
Stabilim prin câte o parcurgere în lăţime distanţele tuturor vârfurilor faţă de X
şi respectiv Y (capetele lanţului, citite din fişier). Vedem care dintre vârfurile ce
aparţin cel puţin unui lanţ de lungime minima între X şi Y au proprietatea ca sunt
singurele aflate la o anumită distanţă de X. Acestea sunt vârfurile care aparţin tuturor
lanţurilor de lungime minimă dintre X şi Y.
Algoritmul are complexitate O(n+m).

II) Facem o parcurgere in latime din X si o parcurgere in latime pornind din Y,
in urma carora determin pentru fiecare varf z distanta dintre X si z, si Y si z - notate
d(X,z) si respectiv d(Y,z) si numarul de drumuri optime dintre X si z, notat nr(X,z) si
dintre Y si z - nr(Y,z)). Un varf z are proprietatea de a apartine tuturor drumurilor
optime dintre X si Y daca si numai daca:
 d(X,z)+d(Y,z)=d(X,Y) si
nr(X,z)*nr(Y,z)=nr(X,y) ).
Aceasta solutie este insa dificil de implementat pentru grafuri cu un numar mare de
noduri – se poate ajunge la operatii cu numere mari;

III) Calculam lungimea minima a unui lant de la X la Y. Eliminam apoi
succesiv cate un nod din arbore (cu exceptia nodurilor X si Y) si re-calculam
lungimea minima a unui lant de la X la Y. Daca aceasta lungime difera fata de cea
initiala, rezulta ca toate lanturile de lungime minima trec prin nodul eliminat. Solutie
de complexitate O(n(n+m)) care rezolva corect 50% din teste.

IV) Se pot da si solutii bazate pe backtracking, de exemplu:
- se determina (printr-o parcurgere in latime a grafului) numarul de varfuri aflat
pe lantul de lungime minima dintre X si Y; fie K numarul de varfuri
„intermediare” (fara X si Y);
- generam toate lanturile de lungime minima dintre X si Y (inclusiv capetele)
(algoritm de generare a aranjamentelor de n luate cate K cu verificarile
corespunzatoare de adiacenta) si contorizam pentru fiecare varf numarul de
lanturi in care apare;
- varfurile care formeaza solutia vor avea contorul egal cu contorii varfurile X si Y
In functie de implementare si de optimizarile aduse algoritmilor de backtracking,
programele bazate pe astfel de solutii pot primi maxim 40 puncte 

!!! note "Link problemă"
    Această problemă poate fi accesată [aici](https://kilonova.ro/problems/1/). 

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <fstream>
#include <vector>
#include <bitset>
#include <queue>
#include <algorithm>
using namespace std;
ifstream cin("graf.in");
ofstream cout("graf.out");
int n,m,x,y,optim;
vector<vector<int>>g;
bitset<7501>vis;
vector<int>bf,bf1,sol;
void bfs(int k){
    queue<int>q;
    q.push(k);
    vis[k]=1;
    bf[k]=1;
    while(!q.empty()){
        k=q.front();
        q.pop();
        for(auto i : g[k])
         if(vis[i]==0){
                q.push(i);
                vis[i]=1;
                bf[i]=bf[k]+1;
          }
    }
}
void bfs1(int k){
    queue<int>q;
    q.push(k);
    vis[k]=1;
    bf1[k]=bf[k];
    while(!q.empty()){
        k=q.front();
        q.pop();
        for(auto i : g[k])
         if(vis[i]==0){
                q.push(i);
                vis[i]=1;
                bf1[i]=bf1[k]-1;
          }
    }
}


int main()
{
    cin>>n>>m>>x>>y;
    int a,b;
    g.resize(n+1);
    bf.resize(n+1);
    bf1.resize(n+1);
    for(int i=1; i<=m; ++i){
        cin>>a>>b;
        g[a].push_back(b);
        g[b].push_back(a);
    }
    bfs(x);
    vis.reset();
    bfs1(y);
    sol.push_back(x);
    sol.push_back(y);
    optim=bf[y]-1;
    while(optim>1){
        int cnt=0,poz;
        for(int i=1; i<=n; ++i)
            if(bf[i]==optim && bf1[i]==optim){
                cnt++;
                poz=i;
            }
        if(cnt==1)
            sol.push_back(poz);
        optim--;
    }
    sort(sol.begin(),sol.end());
    cout<<sol.size()<<'\n';
    for(int i=0; i<sol.size(); ++i)
        cout<<sol[i]<<' ';

return 0;
}
```
