---
id: OJI-2023-V-castel
title: Soluția problemei castel (OJI 2023, clasa a V-a)
problem_id: 510
authors: [iordaiche]
prerequisites:
   - digits-manipulation
tags:
    - OJI
    - clasa V
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
#include <fstream>
using namespace std;

int main() {
    ifstream cin("castel.in");
    ofstream cout("castel.out");

    int c, n;
    cin >> c >> n;

    if (c == 1) {
        int cnt = 0;
        for (int i = 1; i <= n; i++) {
            int x;
            cin >> x;
            if (x <= 9) {
                cnt++;
            }
        }
        cout << cnt << '\n';
    }
    if (c == 2) {
        int sum = 0;
        int x = 1;
        while (sum + x <= n) {
            sum += x;
            x++;
        }
        cout << x - 1 << " ";
        for (int i = 1; i <= n; i++) {
            int x;
            cin >> x;
            if (i == sum) {
                cout << x << " ";
            }
        }
    }
    if (c == 3) {
        int sum = 0;
        int x = 1;
        while (sum + x <= n) {
            sum += x;
            x++;
        }
        cout << sum - x + 1 << " ";
        long long total = 0;
        long long sum2 = 0;
        long long x2 = x - 1;

        for (int i = 1; i < sum; i++) {
            int x;
            cin >> x;
            if (i == sum2 + 1 || i == sum2 + x2) {
                total += x;
                if (i == sum2 + x2) {
                    sum2 += x2;
                    x2--;
                }
            } else {
                total += 2 * x;
            }
        }
        cout << total << " ";
    }
    return 0;
}
```
