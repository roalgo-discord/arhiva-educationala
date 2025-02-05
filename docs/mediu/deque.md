---
id: deque
author:
    - Ștefan-Cosmin Dăscălescu
prerequisites:
    - queue
    - stack
    - sliding-window
tags:
    - vectori
    - structuri de date
---

Probabil că până acum, v-ati obișnuit cu folosirea stivelor și a cozilor în
diverse probleme de algoritmică, iar deși aceste structuri de date sunt foarte
puternice, fiecare dintre ele are lipsuri care fac implementarea anumitor părți
mult mai dificilă.

Acum, se pune întrebarea firească dacă putem să unim proprietățile cozilor și
ale stivelor fără să avem de făcut sacrificii majore, iar răspunsul este din
fericire un DA clar. În cele ce urmează, vom discuta despre deque, o structură
de date care îmbină proprietățile stivelor și ale cozilor, adăugând și
facilități în plus.

## Introducere și sintaxă

!!! info "Definiție"

    Un deque (double-ended queue) este o structură de date liniară, similară cu
    stiva și coada, cu proprietatea că suportă operațiile specifice stivelor și
    cozilor în timp constant. Așa cum îi zice și numele, practic este o coadă
    dublă, din care putem extrage valori din ambele capete, dar și adăuga în
    ambele capete.

!!! note "Observație"

    Complexitatea menționată mai sus este cel puțin pentru implementarea din STL
    (std::deque) una amortizată, cu alte cuvinte, $n$ operații făcute pe un
    deque vor fi $\mathcal{O}(n)$, dar asta nu garantează faptul că fiecare operație va
    lua $\mathcal{O}(1)$. Din acest motiv, vom spune că complexitatea unui deque este
    $\mathcal{O}(1)$ amortizat.

### Sintaxă

La fel ca și în cazul cozilor și stivelor, deque-ul poate fi implementat de
mână, folosind un tablou de lungime fixă, adăugând și scoțând valori într-un mod
ciclic.

```cpp
const int QMAX = 100001;
int coada[100001];

int pop() {
  ultim = (ultim - 1 + QMAX) % QMAX;
  return coada[ultim];
}
void pushFront(int e) {
  prim = (prim - 1 + QMAX) % QMAX;
  coada[prim] = e;
}
void pushBack(int e) {
  ultim = (ultim + 1 - QMAX) % QMAX;
  coada[ultim] = e;
}
```

Totuși, în cele mai multe probleme, ne vom folosi de versiunea specifică
limbajului C++, și anume std::deque. Acesta va avea funcțiile specifice cozilor
și stivelor, fără a fi nevoie să le implementăm noi.

Lista operatorilor și funcțiilor pe care le puteți folosi în deque este
următoarea:

1. *push_back(value)*: Adaugă *value* la sfârșitul deque-ului.
2. *push_front(value)*: Adaugă *value* la începutul deque-ului.
3. *pop_back()*: Scoate valoarea de la sfârșitul deque-ului.
4. *pop_front()*: Scoate valoarea de la începutul deque-ului.
5. *front()*: Spune care este valoarea de la începutul deque-ului.
6. *back()*: Spune care este valoarea de la capătul deque-ului.
7. *empty()*: Spune dacă deque-ul este goală.
8. *size()*: Returnează dimensiunea deque-ului.

Mai jos puteți găsi exemple de aplicare a funcțiilor în deque.

```cpp
deque<int> d;
d.push_back(1); // 1
d.push_back(3); // 1 3
d.push_front(2); // 2 1 3
d.push_back(4); // 2 1 3 4
d.push_front(5); // 5 2 1 3 4
d.pop_back(); // 5 2 1 3
d.pop_back(); // 5 2 1
d.pop_front(); // 2 1
cout << d.front() << '\n'; // 2
cout << d.back() << '\n'; // 1
cout << d.size() << '\n'; // 2
if (!d.empty()) {
    cout << "Are valori";
}
```

## Motivație

Motivul principal pentru care folosim deque-urile este acela de a putea performa
operații pe secvențe de lungime fixă, fiind una din tehnicile des folosite în
cazul problemelor ce folosesc tehnica sliding window (sau în română, fereastra
glisantă), subiect discutat în [acest
articol](./sliding-window.md). Acesta va fi și scopul
principal al acestui articol, acela de a prezenta cele mai des întâlnite
aplicații ale deque-ului.

De cele mai multe ori, atunci când vom lucra cu deque-ul, vom vrea să procesăm
secvențe de o lungime fixă, având operații bine stabilite și de cele mai multe
ori, preluând aspecte de implementare văzute mai devreme când ați studiat
principiile de funcționare ale stivei.

## Problema [deque](https://www.infoarena.ro/problema/deque)

În această problemă, se cere aflarea valorii minime pentru toate subsecvențele
de lungime $k$. O soluție ce merită menționată, dar care nu este optimă, este
folosirea unei structuri de tip set care reușește să obțină rezultatul dorit în
$\mathcal{O}(n \log n)$.

Pentru soluția optimă, vom proceda în mod similar cum am proceda dacă am vrea să
aflăm cea mai apropiată valoare mai mică de la stânga, singura modificare fiind
faptul că dacă valoarea minimă este prea departe de poziția curentă, o scoatem.

```cpp
#include <fstream>
#include <deque>

using namespace std;

int n, k, v[5000002];

ifstream fin("deque.in");
ofstream fout("deque.out");

int main() {
    fin >> n >> k;
    for (int i = 1; i <= n; ++i) {
        fin >> v[i];
    }
    deque<int> d;
    
    long long ans = 0;
    for (int i = 1; i <= n; ++i) {
        if (!d.empty() && i - d.front() == k) {
            d.pop_front();
        }
        while (!d.empty() && v[i] <= v[d.back()]) {
            d.pop_back();
        }
        d.push_back(i);
        if (i >= k) {
            ans += v[d.front()];
        }
    }
    
    fout << ans << '\n';
    return 0;
}
```

## Problema [Maximum Subarray Sum II](https://cses.fi/problemset/task/1644)

Pentru a rezolva această problemă, ne folosim de faptul că suma unei subsecvențe
între pozițiile $L$ și $R$ este $sp[R] - sp[L-1]$, unde $sp[i]$ este suma
parțială a valorilor până la poziția $i$. Astfel, dat fiind că trebuie să aflăm
suma maximă a unei subsecvențe între lungimile $a$ și $b$, la pasul $i$, vom
insera $sp[i-a]$, folosind deque-ul drept o stivă care ține sumele minime. La
fel ca la problema precedentă, dacă poziția $i - b - 1$ încă este în deque, o
vom scoate.

!!! note "Observație"

    Vrem să scădem din suma curentă o sumă cât mai mică pentru a avea o sumă
    maximă, deoarece $sp[i]$ este elementul fix, invariant.

```cpp
#include <bits/stdc++.h>
using namespace std;
 
long long v[200002], sp[200002]; 
int main() {
    int n, a, b;
    cin >> n >> a >> b;
    
    for (int i = 1; i <= n; i++) {
        cin >> v[i];
        sp[i] = sp[i-1] + v[i];
    }
    
    deque<int> d;    
    long long ans = -(1LL<<60);
    
    for (int i = a; i <= n; i++) {
        while (!d.empty() && sp[i - a] <= sp[d.back()]) {
            d.pop_back();
        }
        while (!d.empty() && i - d.front() > b) {
            d.pop_front();
        }
        d.push_back(i-a);
        if (sp[i] - sp[d.front()] >= ans) {
            ans = sp[i] - sp[d.front()];
        }
    }
    
    cout << ans;
```

## Problema [cetate](https://kilonova.ro/problems/917)

Pentru rezolvarea cerinței 2 a acestei probleme, putem fixa două linii și să
aplicăm o tehnică similară folosind deque, aflând suma maximă folosindu-ne de
sumele parțiale de pe coloane, mai jos fiind codul de la cerința a doua,
întreaga submisie putând fi accesată
[aici](https://kilonova.ro/submissions/375896)

```cpp
maxSum = LLONG_MIN;
for (linTop = 1; linTop <= n; linTop++) {
    linBot = linTop;
    while (linBot <= n && (linBot - linTop + 1) <= k) {
        /* precalculam suma pe coloane */
        cols[0] = 0;
        for (col = 1; col <= m; col++) {
            cols[col] = cols[col - 1];
            cols[col] += sp[linBot][col] - sp[linBot][col - 1] - sp[linTop - 1][col] + sp[linTop - 1][col - 1];
        }

        /* sliding window */
        d.clear();
        d.push_back(0);
        for (col = 1; col <= m; col++) {
            /* daca a ramas ceva in urma */
            if (d.front() == (col - k - 1)) {
                d.pop_front();
            }

            sum = cols[col] - cols[d.front()];

            bool isGreater = sum > maxSum;
            bool lexicSort = sum == maxSum && (linTop <= maxLin || d.front() + 1 <= maxCol);
            if (isGreater || lexicSort) {
                maxSum = sum;

                maxLin = linTop, maxCol = d.front() + 1;
                maxLin1 = linBot, maxCol1 = col;
            }

            /* ideea de la next greater element */
            while (!d.empty() && cols[col] < cols[d.back()]) {
                d.pop_back();
            }
            d.push_back(col);
        }
        linBot++;
    }
}

cout << maxSum << "\n";
cout << maxLin << " " << maxCol << " " << maxLin1 << " " << maxCol1 << "\n";
```

## Problema [secv - ONI 2016 Baraj Juniori](https://kilonova.ro/problems/1086/)

Pentru a rezolva prima cerință, este îndeajuns să scoatem din șir de la stânga
la dreapta toate secvențele de lungime $K$ cu sumă mai mare decât $S$.

Pentru cea de-a doua cerință, aflăm pentru fiecare secvență de lungime $K+1$
diferența dintre suma ei și $S$, iar dacă valoarea curentă este mai mică decât
diferența minimă pentru o secvență din cele (cel mult) $K+1$ care o acoperă,
atunci ea poate fi scoasă.

```cpp
#include <fstream>
#include <iostream>
#include <vector>
#include <deque>

using namespace std;

int main() {
    ifstream cin("secv.in");
    ofstream cout("secv.out");
    
    int c;
    cin >> c;
    
    int n, k, s;
    cin >> n >> k >> s;
    
    if (c == 1) {
        vector <long long> st;
        st.push_back(0);
        int sz = 0;
        int cnt = 0;
        for (int i = 1; i <= n; i++) {
            int val;
            cin >> val;
            
            st.push_back(st.back() + val);
            sz++;
            if (sz > k) {
                if (st[sz] - st[sz - k] > s) {
                    for (int j = 1; j <= k; j++) {
                        st.pop_back();
                    }
                    sz -= k;
                    cnt++;
                }
            }
        }
        
        cout << cnt << '\n';
    }
    else {
        vector <int> vals(n+1);
        vector <int> sp(n+1);
        vector <int> threshold(n+1);
        for (int i = 1; i <= n; i++) {
            cin >> vals[i];
            sp[i] = sp[i-1] + vals[i];
        }
        
        for (int i = k+1; i <= n; i++) {
            threshold[i - k] = sp[i] - sp[i - (k + 1)] - s;
        }
        
        int ans = 0;
        
        deque <int> s;
        for (int i = 1; i <= n; i++) {
            if (i <= n-k) {
                while (!s.empty() && threshold[i] > threshold[s.back()]) {
                    s.pop_back();
                }
                s.push_back(i);
            }
            if (!s.empty() && s.front() == i - (k+1)) {
                s.pop_front();
            }
            
            if (vals[i] < threshold[s.front()]) {
                ans++;
            }
        }
        
        cout << ans << '\n';
    }
    return 0;
}
```

## Concluzie

Deque este o structură de date foarte utilă pentru foarte multe probleme ce
folosesc [sliding window](./sliding-window.md), precum
și în ceea ce privește multe optimizări care pleacă de la aplicații care în mod
normal s-ar rezolva cu o stivă sau o coadă.

## Probleme suplimentare

- [infoarena vila2](https://www.infoarena.ro/problema/vila2)
- [infoarena knumere](https://www.infoarena.ro/problema/knumere)
- [RoAlgo PreOJI 2024 pofta](https://kilonova.ro/problems/2187)
- [JBOI 2022 Wall](https://www.pbinfo.ro/probleme/4198/wall1)
- [Lot Juniori 2016 pofta](https://kilonova.ro/problems/1715)
- [IIOT Discount Optimization](https://kilonova.ro/problems/994)
- [Problemele cu deque de pe kilonova](https://kilonova.ro/tags/409)
- [Problemele cu deque de pe
  infoarena](https://www.infoarena.ro/cauta-probleme?tag_id[]=94)

## Lectură suplimentară

- [Deque CPPI Sync](https://cppi.sync.ro/materia/deque.html)
- [Deque si aplicatii - Infoarena](https://www.infoarena.ro/deque-si-aplicatii)
- [Deque
  Algopedia](https://www.algopedia.ro/wiki/index.php/Clasa_a_VII-a_lec%C8%9Bia_16_-_16_ian_2020)
- [Minima/maxima over all fixed-size arrays
  (multi-dimensional)](https://codeforces.com/blog/entry/53810)
- [Minimum stack / Minimum
  queue](https://cp-algorithms.com/data_structures/stack_queue_modification.html)
