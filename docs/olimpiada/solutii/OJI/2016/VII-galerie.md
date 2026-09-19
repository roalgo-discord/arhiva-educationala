---
id: OJI-2016-VII-galerie
title: Soluția problemei galerie (OJI 2016, clasa a VII-a)
problem_id: 871
authors: [sichim]
prerequisites:
    - matrices
    - lee
tags:
    - OJI
    - clasa VII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2016/07/galerie.txt).

<div class="editorial-text" markdown>

```text
Problema  2 - galerie	100 puncte


Autor prof. Cristina Sichim
Colegiul Național „Ferdinand I”, Bacău
Descrierea soluției

Cerința 1     ( 30 puncte)

Problema se restrânge la fiecare pas la mulțimea cârtițelor active (cele care sapă).
Pentru fiecare moment de timp
•	se determină, pentru fiecare dintre cârtițele active, celula în care ajunge;
•	se elimină apoi din mulțimea cârtițelor active, cârtițele care se opresc, fie pentru că în celula în care au ajuns se mai află și alte cârtițe, fie pentru că au ajuns într-o altă galerie (pe marginea terenului sau într-o galerie interioară);
•	se contorizează momentele de timp în care cel puțin o cârtiță este activă.


Cerința 2    ( 70 de puncte)

Pentru fiecare cârtiță ci, se memorează lungimea li a galeriei interioare în care se află.
Dacă o cârtiță sapă singură într-o celulă, atunci, se adună o unitate la lungimea traseului săpat.
Dacă o cârtiță c1 sapă într-o galerie interioară, de lungime l1, și ajunge în galeria unei alte cârtițe c2, care se află într-o galerie interioară de lungime l2,  atunci cârtița c1 se oprește, galeriile se unesc, și lungimea galeriei l2,  în care se află cârtița c2, devine l1+l2.
Dacă într-o celulă ajung, în același moment de timp, mai multe cârtițe, c1, c2,…,ck, atunci, toate cârtițele se opresc și se formează o galerie de lungime l1+l2+..+lk.
Când toate cârtițele se opresc, se determină max{li|1≤i≤t}.
```

</div>

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 200, MAXM = 200, MAXT = 2 * (MAXN + MAXM);
const int EST = 0, SUD = 1, VEST = 2, NORD = 3, DIR = 4;

struct Cartita {
    int lin, col, dir, nrSap;
    bool sapa;
} cartite[MAXT + 1];

int teren[MAXN + 2][MAXM + 2], f[MAXT + 1];
int dlin[DIR] = {0, 1, 0, -1};
int dcol[DIR] = {1, 0, -1, 0};

ifstream fin("galerie.in");
ofstream fout("galerie.out");

int main() {
    int cer, n, m, t, i, poz, lin, col, nr, newLin, newCol, val, maxSap, maxGal;
    bool gata;

    fin >> cer >> n >> m >> t;

    for (i = 1; i <= t; i++) {
        fin >> poz;

        // Coloana, Linia si Directia pentru fiecare cartita
        if (poz <= m) {
            cartite[i].lin = 0;
            cartite[i].col = poz;
            cartite[i].dir = SUD;
        } else if (poz <= n + m) {
            cartite[i].lin = poz - m;
            cartite[i].col = m + 1;
            cartite[i].dir = VEST;
        } else if (poz <= 2 * m + n) {
            cartite[i].lin = n + 1;
            cartite[i].col = 2 * m + n + 1 - poz;
            cartite[i].dir = NORD;
        } else {
            cartite[i].lin = 2 * (m + n) + 1 - poz;
            cartite[i].col = 0;
            cartite[i].dir = EST;
        }

        cartite[i].sapa = 1;
        cartite[i].nrSap = 0;
    }

    // Bordare
    for (lin = 1; lin <= n; lin++) {
        teren[lin][0] = teren[lin][m + 1] = -1;
    }

    for (col = 1; col <= m; col++) {
        teren[0][col] = teren[n + 1][col] = -1;
    }

    // Bucla de simulare
    gata = 0;
    while (!gata) {
        gata = 1; // Presupunem ca terminam runda asta
        for(i = 1; i <= t; i++){
            if(cartite[i].sapa){
                gata = 0; // Am gasit pe cineva care sapa => continuam, nu terminam

                cartite[i].lin += dlin[cartite[i].dir];
                cartite[i].col += dcol[cartite[i].dir];
                val = teren[cartite[i].lin][cartite[i].col];

                if(val == -1){
                    cartite[i].sapa = 0; // A iesit afara => nu mai sapa
                } else if(val != 0){
                    cartite[i].sapa = 0; // A mai sapat cineva acolo sau sapa cineva acolo => nu mai sapa

                    if(cartite[i].lin == cartite[val].lin && cartite[i].col == cartite[val].col && i > val){ // Daca sapa cineva acolo
                        cartite[val].sapa = 0; // Nu mai sapa
                    }

                    // Unim
                    for(lin = 1; lin <= n; lin++){
                        for(col = 1; col <= m; col++){
                            if(teren[lin][col] == i){ // Unim cele doua galerii
                                teren[lin][col] = val;
                            }
                        }
                    }
                } else { // Daca pozitia este goala

                    teren[cartite[i].lin][cartite[i].col] = i; // Marcam ca am fost noi
                    cartite[i].nrSap++; // Crestem contorul
                }
            }
        }
    }

    if(cer == 1){
        maxSap = 0;
        for(i = 1; i <= t; i++){
            maxSap = max(maxSap, cartite[i].nrSap);
        }

        fout << maxSap;
    } else {
        for(lin = 1; lin <= n; lin++){
            for(col = 1; col <= m; col++){
                f[teren[lin][col]]++; // Numaram galeriile
            }
        }
        
        maxGal = 0;
        for(i = 1; i <= 2 * (n + m); i++){
            maxGal = max(maxGal, f[i]);
        }

        fout << maxGal;
    }
    return 0;
}
```
