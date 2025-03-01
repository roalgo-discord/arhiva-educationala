---
id: OJI-2023-VI-ciocolata
title: Soluția problemei ciocolata (OJI 2023, clasa a VI-a)
problem_id: 511
authors: [vmbogdan]
prerequisites:
   - frequency-arrays
tags:
    - OJI
    - clasa VI
---


Pentru cerința, 1, se contorizează toate valorile citite care au o singură
cifră, ele sunt strict mai mari decât 0, și mai mici sau egale cu 9.  

Pentru cerința 2, se calculează, pentru fiecare rând $R$ al castelului, numărul
cuburilor galbene aflate pe acesta. Știm că pe ultimul rând este un singur cub
galben, pe penultimul rând sunt 2 cuburi galbene, pe antepenultimul 3 cuburi  
galbene, și, procedând în acest fel, pe primul rând al castelului (numerotat
cu 1) sunt $K$ cuburi galbene. Astfel, castelul construit, are în total
$1+2+3+4+\ldots+K$ cuburi galbene, aranjate pe cele $K$ rânduri.  

Determinăm cea mai mare valoare a lui $K$ pentru care suma $1+2+3+4+\ldots+K$ nu
depășește valoarea lui $N$. Rândul pe care se află cubul din vârful castelului
este $K$ iar numărul scris pe acesta este cel de pe poziția $p$ în șirul de
intrare, unde $p = 1 + 2 + \ldots + K$.  

Alternativ $p$ poate fi determinat și cu formula $\frac{K \cdot (K+1)}{2}$.  

Pentru cerința 3, observăm că pe fiecare rând al castelului numărul cuburilor
albastre este cu 1 mai mic decât numărul cuburilor galbene. Păstrând aceleași
notații ca la cerința anterioară, numărul cuburilor albastre din castel este
egal cu $1+2+3+\ldots+(K-1)$.  

Pentru fiecare cub albastru, calculăm numărul scris pe acesta ca fiind suma a
două valori preluate succesiv din fișierul de intrare. Acestea reprezintă
numerele scrise pe cuburile galbene situate pe același rând, în stânga și
dreapta fiecărui cub albastru.  
Calculăm suma tuturor valorilor scrise pe cuburile albastre din castel.

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ifstream cin("ciocolata.in");
    ofstream cout("ciocolata.out");

    int c, n, v[100001];
    cin >> c >> n;

    for (int i = 1; i <= n; i++)
        cin >> v[i];

    int fr[10001] = {0};

    // cerinta 1 se rezolva cu vectori de frecventa
    if (c == 1) {
        for (int i = 1; i <= n; i++)
            fr[v[i]]++;
        int maxi = 0;
        for (int i = 1; i <= 10000; i++)
            if (fr[i] > fr[maxi])
                maxi = i;
        cout << maxi << '\n';
    } else {
        int mindif = 1000000000;
        int sumIrina = 0;

        // pozitia pana unde a mancat Mihaela
        int j = n;
        int sumMihaela = 0;
        for (int i = 1; i <= n; i++) {
            sumIrina += v[i];
            while (sumMihaela + v[j] <= sumIrina && j > i) {
                sumMihaela += v[j];
                j--;
            }
            while (j < i) {
                j++;
                sumMihaela -= v[j];
            }
            if (j != n)
                mindif = min(mindif, sumIrina - sumMihaela);
        }

        cout << mindif;
    }
    return 0;
}
```
