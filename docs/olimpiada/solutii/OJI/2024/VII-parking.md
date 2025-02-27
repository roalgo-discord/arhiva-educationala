---
id: OJI-2024-VII-parking
title: Soluția problemei Parking (OJI 2024, clasa a VII-a)
authors: [ungureanu]
prerequisites:
    - simulating-solution
    - queue
    - stl
tags:
    - OJI
    - clasa VII
---

!!! note "Link problemă"
    Această problemă poate fi accesată [aici](https://kilonova.ro/problems/2512/).

Vom reprezenta o mașină ca o structură (struct) cu 4 câmpuri: linia și coloana
pe care se află mașina, orientarea mașinii (0 pentru orizontal, 1 pentru
vertical) și numărul seriei în care mașina a ieșit, respectiv 0 dacă mașina este
încă în parcare. Vom reține mașinile într-un vector $vm$, astfel vom putea
identifica în continuare fiecare mașină prin poziția sa în vector (un număr
între 1 și $q$). O ieșire din parcare o vom identifica prin poziția sa (linia și
coloana pe care se află). Vom reține ieșirile într-un vector $vi$. Pentru a
identifica mașinile care pot ieși din parcare putem parcurge vectorul de mașini
și pentru fiecare mașină verificăm dacă poate ieși din parcare în seria curentă
(ajunge la o ieșire deplasându-se în una dintre cele două direcții de mișcare
posibile) și dacă da, o reținem în seria curentă. O astfel de abordare obține un
punctaj substanțial, dar pe testele mari va obține depășire de timp, datorită
numărului mare de mașini, complexitatea fiind $\mathcal{O}(q \cdot nr_{serii})$.

O abordare mai eficientă ar fi să parcurgem ieșirile și să verificăm, pentru
fiecare ieșire, dacă există o mașină care poate ieși în seria curentă utilizând
ieșirea respectivă. Apar 4 cazuri:

1. dacă ieșirea se află pe coloana 0, această ieșire poate fi utilizată doar de
   prima mașină de pe linia pe care se află ieșirea (dacă aceasta este
   poziționată orizontal);
2. dacă ieșirea se află pe coloana $m + 1$, această ieșire poate fi utilizată
   doar de ultima mașină de pe linia pe care se află ieșirea (dacă aceasta este
   poziționată orizontal);
3. dacă ieșirea se află pe linia 0, această ieșire poate fi utilizată doar de
   prima mașină de pe coloana pe care se află ieșirea (dacă aceasta este
   poziționată vertical);
4. dacă ieșirea se află pe linia $n +1$, această ieșire poate fi utilizată doar
   de ultima mașină de pe coloana pe care se află ieșirea (dacă aceasta este
   poziționată vertical).

Când analizăm cazurile $(1)$ și $(2)$, respectiv $(3)$ și $(4)$ trebuie să avem
grijă la situația în care există o singură mașină pe linie, respectiv pe
coloană, situație în care această mașină este atât prima, cât și ultima (deci
trebuie să evităm să scoatem din parcare aceeași mașină de două ori și să
contorizăm eronat mașinile care ies din parcare).

Pentru a trata simplu și eficient cele 4 cazuri vom construi două matrici
auxiliare $ml$ și $mc$, având $n$ linii și $m$ coloane, respectiv $m$ linii și
$n$ coloane. Pe linia $i (1 \leq i \leq n)$ în matricea $ml$ se află lista
mașinilor de pe linia $i$ a parcării, sortate crescător după coloană. Pe linia
$j (1 \leq j \leq m)$ a matricii $mc$ se află lista mașinilor de pe coloana $j$
a parcării, sortate crescător după linie. Ca urmare pentru ieșirile de pe
coloana 0 verificăm doar prima mașină de pe linia corespunzătoare din $ml$,
pentru ieșirile de pe coloana $m + 1$ doar ultima mașină de pe linia
corespunzătoare din $ml$. Similar, pentru ieșirile de pe linia 0 verificăm doar
prima mașină de pe coloana corespunzătoare din $mc$, iar pentru ieșirile de pe
linia $n + 1$, doar ultima mașină de pe coloana corespunzătoare din $mc$.

Pentru cerința 1 efectuăm ieșirea mașinilor din prima serie. Pentru cerința 2
vom efectua ieșirea mașinilor în serii succesive, până când în seria curentă nu
mai iese nicio mașină din parcare. Pentru ieșirea mașinilor dintr-o serie vom
proceda în două etape:

1. Parcurgem ieșirile și identificăm mașinile care pot ieși în seria curentă,
   reținând aceste mașini într-un vector și memorând în structura care
   reprezintă mașina numărul seriei curente.
2. Parcurgem vectorul care conține mașinile care pot ieși în seria curentă și
   eliminăm aceste mașini din matricile $ml$ și $mc$.

Este obligatorie ieșirea mașinilor dintr-o serie în două etape, în alt mod nu
putem simula simultaneitatea ieșirii mașinilor din parcare. Dacă vom elimina
mașinile succesiv pe măsură ce identificăm că pot ieși, este posibil să iasă din
parcare în seria curentă mașini care nu ar fi trebuit să iasă (de exemplu mașina
$a$ poate ieși din parcare în seria curentă; mașina $a$ blochează mașina $b$;
dacă eliminăm imediat mașina $a$, atunci când ajungem la mașina $b$ aceasta nu
va mai fi blocată și va ieși și ea în aceeași serie cu $a$, ceea ce este evident
incorect).

Complexitatea algoritmului: pentru fiecare serie, în etapa 1 se parcurg toate
ieșirile pentru a identifica mașinile $(O(K))$, iar în etapa 2 trebuie să
eliminăm mașinile care ies în seria curentă din $ml$ și $mc$ (din una dintre
matrici se poate elimina în $\mathcal{O}(1)$, dar pentru cealaltă matrice este
necesară o căutare secvențială a mașinii urmată de eliminarea acesteia, deci
complexitatea va fi $\mathcal{O}(lg)$, unde cu $lg$ notăm numărul de mașini
existente pe linia/coloana respectivă (deci putem spune că, în cazul cel mai
defavorabil, eliminarea unei mașini din $ml$, respectiv $mc$ se realizează în
timp liniar în funcție de $n$, respectiv de $m$).

Există algoritmi mai eficienți de rezolvare a acestei probleme, dar necesită
cunoștințe care depășesc programa clasei a VII-a.

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;

int c, n, m, k, q;
int mat[1002][1002];
set<int> wallsL[1002], wallsC[1002];

void insert(int L, int C) {
    wallsL[L].insert(C);
    wallsC[C].insert(L);
}
int main() {
    ifstream cin("parking.in");
    ofstream cout("parking.out");
    
    cin >> c >> n >> m >> k >> q;
    for (int i = 1; i <= k; i++) {
        int L, C;
        cin >> L >> C;
        mat[L][C] = -1;
    }
    for (int i = 0; i <= m+1; i++) {
        if (mat[0][i] != -1) {
            insert(0, i);
        }
        if (mat[n+1][i] != -1) {
            insert(n+1, i);
        }
    }
    for (int i = 0; i <= n+1; i++) {
        if(mat[i][0] != -1) {
            insert(i, 0);
        }
        if(mat[i][m+1] != -1) {
            insert(i, m+1);
        }
    }
    for (int i = 1; i <= q; i++) {
        int x, y, p;
        cin >> x >> y >> p;
        mat[x][y] = p+1;
        insert(x, y);
    }
    
    int cnt = 0;
    int tot = 0;
    for (int stp = 1; stp <= 10000; stp++) {
        deque<pair<int, int> > d;
        for (int i = 1; i <= n; i++) {
            int of = -1;
            for (int xx = 1; xx <= 2; xx++) {
                if (wallsL[i].empty()) {
                    continue;
                }
                set<int>::iterator x;
                if (xx == 1) {
                    x = wallsL[i].begin();
                }
                else {
                    x = wallsL[i].end(), x--;
                }
                int poz = *x;
                if (poz != 0 && poz != m+1 && mat[i][poz] == 1) {
                    tot = stp;
                    if (of != poz) {
                        d.push_back({i, poz});
                        of = poz;
                    }
                }
            }
        }
        for (int i = 1; i <= m; i++) {
            int of = -1;
            for (int xx = 1; xx <= 2; xx++) {
                if (wallsC[i].empty()) {
                    continue;
                }
                set<int>::iterator x;
                if (xx == 1) {
                    x = wallsC[i].begin();
                }
                else {
                    x = wallsC[i].end(), x--;
                }
                int poz = *x;
                if (poz != 0 && poz != n+1 && mat[poz][i] == 2) {
                    tot = stp;
                    if (of != poz) {
                        d.push_back({poz, i});
                        of = poz;
                    }
                }
            }
        }
        if (tot != stp) {
            break;
        }
        for (auto x : d) {
            cnt++;
            wallsL[x.first].erase(x.second);
            wallsC[x.second].erase(x.first);
        }    
        if (c == 1) {
            break;
        }
    }
    cout << cnt << " ";
    if (c == 2) {
        cout << tot << '\n';
    }
    return 0;
}
```
