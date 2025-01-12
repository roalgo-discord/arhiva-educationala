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

!!! note "Link problemă"
    Această problemă poate fi accesată [aici](https://kilonova.ro/problems/1/). 

\documentclass{article}
\usepackage[utf8]{inputenc}

\begin{document}

\section*{Descriere Soluție}

\begin{enumerate}

    \item Dacă definim distanța între două vârfuri ale unui graf neorientat ca fiind lungimea celui mai scurt lanț dintre care are drept capete vârfurile, atunci putem să observăm că un vârf oarecare $Z$ se află pe un lanț de lungime minimă dintre $X$ și $Y$ dacă și numai dacă $d(X,Z) + d(Z,Y) = d(X,Y)$, pentru cazul în care considerăm lungimea lanțului ca fiind numărul muchiilor, și $d(X,Z) + d(Z,Y) = d(X,Y) + 1$, pentru cazul în care considerăm lungimea ca fiind numărul vârfurilor. \\
    Stabilim, prin câte o parcurgere în lățime, distanțele tuturor vârfurilor față de $X$ și respectiv $Y$ (capetele lanțului, citite din fișier). Vedem care dintre vârfurile ce aparțin cel puțin unui lanț de lungime minimă între $X$ și $Y$ au proprietatea că sunt singurele aflate la o anumită distanță de $X$. Acestea sunt vârfurile care aparțin tuturor lanțurilor de lungime minimă dintre $X$ și $Y$. \\
    Algoritmul are complexitate $O(n + m)$.
    
    \item Facem o parcurgere în lățime din $X$ și o parcurgere în lățime pornind din $Y$, în urma cărora determinăm, pentru fiecare vârf $z$, distanțele $d(X,z)$ și respectiv $d(Y,z)$, precum și numărul de drumuri optime dintre $X$ și $z$, notate $nr(X,z)$ și $nr(Y,z)$. \\
    Un vârf $z$ are proprietatea de a aparține tuturor drumurilor optime dintre $X$ și $Y$ dacă și numai dacă: 
    \begin{itemize}
        \item $d(X,z) + d(Y,z) = d(X,Y)$
        \item $nr(X,z) \cdot nr(Y,z) = nr(X,Y)$.
    \end{itemize}
    Această soluție este însă dificil de implementat pentru grafuri cu un număr mare de noduri, deoarece se poate ajunge la operații cu numere mari.

    \item Calculăm lungimea minimă a unui lanț de la $X$ la $Y$. Eliminăm apoi succesiv câte un nod din arbore (cu excepția nodurilor $X$ și $Y$) și recalculăm lungimea minimă a unui lanț de la $X$ la $Y$. Dacă această lungime diferă față de cea inițială, rezultă că toate lanțurile de lungime minimă trec prin nodul eliminat. \\
    Soluție de complexitate $O(n \cdot (n+m))$, care rezolvă corect 50\% din teste.

    \item Se pot da și soluții bazate pe backtracking, de exemplu:
    \begin{itemize}
        \item Se determină (printr-o parcurgere în lățime a grafului) numărul de vârfuri aflat pe lanțul de lungime minimă dintre $X$ și $Y$; fie $K$ numărul de vârfuri „intermediare” (fără $X$ și $Y$);
        \item Generăm toate lanțurile de lungime minimă dintre $X$ și $Y$ (inclusiv capetele), folosind un algoritm de generare a aranjamentelor de $n$ luate câte $K$, cu verificările corespunzătoare de adiacență, și contorizăm pentru fiecare vârf numărul de lanțuri în care apare;
        \item Vârfurile care formează soluția vor avea contorul egal cu contorii vârfurilor $X$ și $Y$.
    \end{itemize}
    În funcție de implementare și de optimizările aduse algoritmilor de backtracking, programele bazate pe astfel de soluții pot primi maxim 40 puncte.
\end{enumerate}

\end{document}



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

    int n,m,x,y;

    vector< vector<int> > graf; //lista de adiacenta
    bitset <7501> vis; //daca un nod e visitat sau nu
    vector <int> distX, distY; //distX = distantele de la X la fiecare nod, distY respectiv pt T;
    vector <int> sol; // vectorul solutie

    void bfsX(int k){

        queue <int> q; //vom memora ordinea visitari nodurilor intr-o coada
        q.push(k);
        vis[k] = 1;
        distX[k] = 1;

        while(!q.empty()){

            k = q.front();
            q.pop();

            for(auto i : graf[k]){
                if(vis[i] == 0){
                    q.push(i);
                    vis[i] = 1;
                    distX[i]  = distX[k] + 1;
                }
            }
        }
    }
    void bfsY(int k){

        queue <int> q;
        q.push(k);
        vis[k] = 1;
        distY[k] = distX[k];

        while(!q.empty()){

            k = q.front();
            q.pop();

            for(auto i : graf[k]){
                if(vis[i] == 0){
                    q.push(i);
                    vis[i] = 1;
                    distY[i] = distY[k]-1;
                }
            }
        }
    }


    int main()
    {
        cin >> n >> m >> x >> y;

        graf.resize( n+1 ); // intializare liste
        distX.resize( n+1, 0 ); // intializare distX cu 0
        distY.resize( n+1, 0 ); // intializare distY cu 0

        //citire
        int a, b;
        for(int i = 1 ; i <= m ; ++ i){
            cin >> a >> b;
            graf[a].push_back(b);
            graf[b].push_back(a);
        }

        //calculare distante
        bfsX(x);

        vis.reset(); //resetam vectorul vis la 0, deoarece il vom folosi si in bfsY

        bfsY(y);

        //adugam nodul de plecare si de sfarsire a drumului
        sol.push_back(x);
        sol.push_back(y);

        int minim = distX[y]-1; //distanta minima de la x la y

        while(minim>1){
            int cnt = 0, poz;

            for(int i = 1 ; i <= n ; ++i){
                if(distX[i] == minim && distY[i] == minim){
                    cnt++;
                    poz = i;
                }
            }

            if(cnt == 1){ //adaugam in vectorul solutie doar daca la distanta respectiva este un nod unic
                sol.push_back(poz);
            }

            minim --;
        }


        //afisare solutie
        sort(sol.begin(),sol.end()); //sortam vectorul solutie crescator

        cout<<sol.size()<<'\n';

        for(int i = 0 ; i < sol.size() ; ++i)
            cout<<sol[i]<<' ';

        return 0;
    }

```
