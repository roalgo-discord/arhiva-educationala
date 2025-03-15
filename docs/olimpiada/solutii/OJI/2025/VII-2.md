---
id: OJI-2024-VII-ron
title: Soluția problemei Ron (OJI 2024, clasa a VII-a)
problem_id: 2513
authors: [balasa]
prerequisites:
    - sieve
    - binary-search
tags:
    - OJI
    - clasa VII
---

Observație inițială: O creangă de lungime $lg$ așezată pe riglă cu capătul din
stânga în dreptul numărului $poz$ reprezintă, din punct de vedere matematic,
intervalul $[poz, poz + lg − 1]$.

Cerința 1: Pentru rezolvarea cerinței 1, este necesar să determinăm numărul
maxim de numere fermecate aflate în unul dintre intervalele corespunzătoare
crengilor de soc. Matematic, numărul pătratelor numerelor prime dintr-un
interval $[x, y]$ este egal cu numărul numerelor prime din intervalul
$[\sqrt x, \sqrt y]$ Vom utiliza Ciurul lui Eratostene pentru a determina
numerele prime mai mici sau egale cu $\sqrt{2 \cdot 10^9}$, apoi vom construi un
vector auxiliar $a$ în care vom memora pentru fiecare număr natural $x$, numărul
numerelor prime mai mici sau egale cu $x$. Numărul pătratelor numerelor prime
din intervalul $[x, y]$ este $a \lfloor \sqrt y \rfloor - a \lfloor \sqrt {x-1}
\rfloor$.

Vom citi succesiv descrierea fiecărei crengi de soc, vom determina numărul
numerelor fermecate acoperite de fiecare creangă și vom reține maximul.

Cerința 2: Pentru rezolvarea cerinței 2 este necesar să determinăm numărul de
intervale obținute în urma reuniunii celor $n$ intervale corespunzătoare
crengilor de soc. Vom ordona intervalele crescător după extremitatea inițială
(capătul din stânga). Vom parcurge intervalele în ordine și vom reuni toate
intervalele care pot fi reunite în unul singur (să numim rezultatul reuniunii
interval-reuniune). La fiecare pas comparăm capătul din stânga al intervalului
curent ($st_i$) cu capătul din dreapta al intervalului-reuniune curent (să-l
notăm $dr_R$). Dacă $st_i \leq 1 + dr_R$ (cele două crengi se suprapun sau se
ating) atunci intervalul curent poate fi adăugat la intervalul-reuniune curent
(adică $dr_R = dr_i$, dacă $dr_i > dr_R$). În caz contrar, intervalul-reuniune
curent nu mai poate fi extins, ca urmare creăm un nou interval-reuniune, pe care
îl inițializăm cu intervalul curent.

Problema admite numeroase abordări pentru punctaje parțiale. De exemplu, pentru
valorile mici ale lui $poz$ și $lg$ se poate utiliza un vector caracteristic în
care vor fi marcate cu 1 pozițiile ocupate de crengile de soc, problema
reducându-se astfel la determinarea numărului de secvențe formate numai din 1.

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;

int c, n;
bool pr[45002];
int cnt, poz, pp[45002];

int cb(int x) {
    int st = 1;
    int dr = cnt;
    int ans = 0;
    while (st <= dr) {
        int mid = (st + dr) / 2;
        if (pp[mid] <= x) {
            ans = mid;
            st = mid + 1;
        } else {
            dr = mid - 1;
        }
    }
    return ans;
}
int main() {
    ifstream cin("ron.in");
    ofstream cout("ron.out");

    cin >> c >> n;
    vector<pair<int, int> > v(n);

    for (int i = 0; i < n; i++) {
        cin >> v[i].first >> v[i].second;
    }
    for (int i = 2; i <= 45000; i++) {
        if (pr[i] == 0) {
            pp[++cnt] = i * i;
            for (int j = i + i; j <= 45000; j += i) {
                pr[j] = 1;
            }
        }
    }

    if (c == 1) {
        int maxi = 0;
        for (int i = 0; i < n; i++) {
            maxi = max(maxi,
                       cb(v[i].first + v[i].second - 1) - cb(v[i].first - 1));
        }
        cout << maxi << '\n';
    }
    if (c == 2) {
        sort(v.begin(), v.end());
        int cnt = 1, lpoz = -1;
        for (int i = 0; i < n; i++) {
            if (i == 0) {
                lpoz = v[i].first + v[i].second;
            } else {
                if (lpoz < v[i].first) {
                    cnt++;
                    lpoz = v[i].first + v[i].second;
                } else {
                    lpoz = max(lpoz, v[i].first + v[i].second);
                }
            }
        }
        cout << cnt << '\n';
    }
    return 0;
}
```

