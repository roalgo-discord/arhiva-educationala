---
id: mitm
author:
    - Ștefan-Cosmin Dăscălescu
prerequisites:
    - stl
    - bitwise-ops
tags:
    - optimizari
    - precalculare
    - brute force
---

## Introducere

Meet in the middle este o tehnică de programare care este folosită atunci când
avem de-a face cu probleme pentru care soluția optimă este aceea de a împărți
spațiul de căutare în două, pentru a putea aplica forța brută independent pentru
cele două jumătăți rezultate.

Numele și principiile acestei tehnici sunt înrudite cu [atacul criptografic cu
același nume](https://en.wikipedia.org/wiki/Meet-in-the-middle_attack).

În algoritmică, acea tehnică este folosită atunci când vrem să rezolvăm probleme
folosind brute-force, dar restricțiile nu sunt suficient de mici pentru un
brute-force clasic, utilizarea cea mai des întâlnită pentru meet in the middle
este atunci când trebuie să lucrăm cu submulțimi.

!!! "Observație"

    Deoarece spațiul de căutare se împarte în două, complexitatea exponențială
    va crește mult mai greu, meet in the middle devenind util pentru probleme la
    care dimensiunea datelor de intrare este cel mult $40-45$.

Cu alte cuvinte, vom rula un algoritm brute-force pentru fiecare jumătate, iar
apoi vom uni rezultatele obținute în timp liniar, raportat la numărul de soluții
generate.

Astfel, complexitatea algoritmului va deveni acum $O(2^{\frac{n}{2}})$.

### [Problema Meet in the Middle](https://cses.fi/problemset/task/1628/)

Pentru a afla câte submulțimi au suma $k$, vom precalcula pentru prima jumătate
din șir sumele tuturor submulțimilor, stocând sumele într-un vector sau map, iar
apoi pentru fiecare sumă din cea de-a doua jumătate, vom afla câte sume sunt
egale cu complementul ei $k - sum$.

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
 
using namespace std;
 
int bs(int sum, vector<int> &sums) {
    int L = 0;
    int R = sums.size() - 1;
    int ans = 0;
    while (L <= R) {
        int mid = (L + R) / 2;
        if (sums[mid] <= sum) {
            ans = mid + 1;
            L = mid + 1;
        }
        else {
            R = mid - 1;
        }
    }
    return ans;
}
 
int main() {
 
    int n, k;
    cin >> n >> k;
    
    vector<int> v(n);
    for (int i = 0; i < n; i++) {
        cin >> v[i];
    }
    
    long long ans = 0;
    vector<int> sums;
    
    int firsthalf = n/2+n%2;
    int secondhalf = n - firsthalf;
    for (int i = 0; i < (1<<firsthalf); i++) {
        long long sum = 0;
        for (int j = 0; j < firsthalf; j++) {
            if (i & (1<<j)) {
                sum += v[j];
            }
        }
        
        if (sum <= k) {
            sums.push_back(sum);
        }
    }
    
    sort(sums.begin(), sums.end());
    
    for (int i = 0; i < (1<<secondhalf); i++) {
        long long sum = 0;
        for (int j = firsthalf; j < n; j++) {
            if (i & (1<<(j - firsthalf))) {
                sum += v[j];
            }
        }
        
        if (sum <= k) {
            ans += bs(k - sum, sums) - bs(k - sum - 1, sums);
        }
    }
    
    cout << ans << '\n';
    return 0;
}
```

### [Problema Sum of Four Values](https://cses.fi/problemset/task/1642/)

Un alt tip de probleme care se poate rezolva cu meet in the middle este acela în
care trebuie să găsim o submulțime de dimensiunea $x$ cu o anumită proprietate,
iar abordarea pentru aceste probleme constă în a crea submulțimi de dimensiunea
$\frac{x}{2}$ iar mai apoi, le vom uni într-un mod similar cu cel de la prima
problemă, așa cum facem și aici.

```cpp
#include <iostream>
#include <vector>
#include <map>

using namespace std;

int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n, x;
    cin >> n >> x;
    
    vector<int> v(n+1);
    for (int i = 1; i <= n; ++i) {
        cin >> v[i];
    }
        
    map<int, int> mp;
    for (int i = 2; i <= n; ++i) {
        for (int j = i+1; j <= n; ++j) {
            mp[v[i] + v[j]]++;
        }
    }
    
    for (int i = 2; i <= n; ++i) {
        for (int j = i+1; j <= n; ++j) {
            if (mp[v[i] + v[j]] >= 2) {
                mp[v[i] + v[j]]--;
            }
            else {
                mp.erase(v[i] + v[j]);
            }
        }
        for (int j = i-1; j >= 1; --j) {
            if (mp.find(x - v[i] - v[j]) != mp.end()) {
                int rem = x - v[i] - v[j];
                cout << j << " " << i << " ";
                for (int q = i+1; q <= n; ++q) {
                    for (int p = q+1; p <= n; ++p) {
                        if (v[p] + v[q] == rem) {
                            cout << q << " " << p << '\n';
                            return 0;
                        }
                    }
                }
            }
        }
    }
    cout << "IMPOSSIBLE";
    return 0;
}
```

## Concluzii

Tehnica meet in the middle este o tehnică utilă pentru a îmbunătăți timpul de
execuție pentru foarte multe soluții ce se bazează pe metode de tip brute-force.
Fie că e vorba de probleme cu restricții mici sau la care avem nevoie de
submulțimi mici, meet in the middle este o tehnică foarte utilă pentru diferite
tipuri de aplicații.

## Probleme suplimentare

- [Piese Lot Juniori 2017](https://kilonova.ro/problems/1691)
- [Infoarena loto](https://www.infoarena.ro/problema/loto)
- [23 - IIOT 2019-20](https://kilonova.ro/problems/1613/)
- [OJI 2018 eq4](https://kilonova.ro/problems/901)
- [Infoarena aiacubiti](https://www.infoarena.ro/problema/aiacubiti)
- [Infoarena colectie](https://infoarena.ro/problema/colectie)
- [CEOI 2019 cubeword](https://codeforces.com/contest/1192/problem/C)
- [USACO Silver Field
  Day](https://usaco.org/index.php?page=viewproblem2&cpid=1327)
- [Cupa SEPI 2023 circles](https://kilonova.ro/problems/990)
- [Probleme cu meet in the middle de pe
  Codeforces](https://codeforces.com/problemset?tags=meet-in-the-middle)
- [Probleme cu meet in the middle de pe Kilonova](https://kilonova.ro/tags/348)

## Lectură suplimentară

- [Meet in the middle - Errichto](https://codeforces.com/blog/entry/95571)
- [Meet in the middle - USACO
  Guide](https://usaco.guide/gold/meet-in-the-middle?lang=cpp)
- [Infobits F1 - SEPI (pagina
  89)](https://sepi.ro/assets/upload-file/infobits-f1.pdf)
- [Meet in the middle -
  infoarena](https://www.infoarena.ro/blog/meet-in-the-middle)
