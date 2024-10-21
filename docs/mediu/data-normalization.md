---
tags:
    - normalizare
    - implementare
---

**Autor**: Ștefan-Cosmin Dăscălescu

În unele probleme, suntem nevoiți să prelucrăm datele de intrare, astfel încât să putem efectua operații de actualizare și interogare ale datelor mult mai ușor. O metodă foarte populară care are drept scop compresia datelor de intrare este normalizarea datelor. Cu alte cuvinte, scopul principal al acestei metode este acela de a transforma un șir cu valori arbitrare într-un șir cu valori mai mici.

De regulă, transformăm valorile într-un șir cu valori între $1$ și $n$, în care fiecare valoare va fi modificată în funcție de poziția acesteia în șirul sortat. Deși în multe cazuri, vom putea folosi și alte structuri de date, normalizarea devine în multe cazuri o metodă care ne ajută să îmbunătățim constanta de timp pentru multe soluții.

## Mod de implementare 

Cum am zis și anterior, vrem să putem prelucra un șir dat, astfel încât să aflăm cu ușurință poziția lui din șirul sortat, reducând astfel intervalul de valori la unul de lungime $n$. 

De exemplu, dacă șirul nostru este $v = \{4, 9, 41, 22, 14, 7, 44 \}$, după normalizare, vrem să obținem $v = \{1, 3, 6, 5, 4, 2, 7 \}$. 

!!! note "Observație"
    Dacă avem mai multe valori egale, nu are importanță dacă le vom atribui aceeași valoare sau valori diferite, așa cum veți putea vedea în implementarea de mai jos. 

Pentru a face asta, există două abordări principale. Prima constă în a ține un șir separat cu valorile, pe care le vom sorta, iar mai apoi la fiecare operație, dacă vrem să aflăm poziția în șirul sortat pentru o valoare dată, vom folosi o căutare binară. Cea de-a doua abordare este similară, singura diferență fiind că ținem valorile într-o structură de tip `std::set` și după ce iterăm prin set, facem corespondențele cu valorile în timp logaritmic pentru fiecare valoare întâlnită. Mai jos puteți găsi o implementare ce folosește prima metodă.

Codul de mai jos sortează șirul și află pentru fiecare valoare din șirul inițial poziția pe care s-ar afla în șirul normalizat. 

!!! note "Observație"
    Există structuri de date care fac acest lucru și fără a fi nevoie de prelucrări adiționale, precum [Policy based data structures](https://codeforces.com/blog/entry/11080), dar în multe situații, acestea se dovedesc a fi foarte încete și foarte costisitoare din punct de vedere al memoriei, normalizarea fiind o opțiune superioară în toate situațiile. Totuși, dacă limita de timp nu este strânsă, acestea pot fi o opțiune viabilă.

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    vector<int> v(n+1), sorted(n+1);
    for (int i = 1; i <= n; i++) {
        cin >> v[i];
        sorted[i] = v[i];
    }

    sort(sorted.begin() + 1, sorted.begin() + n + 1);
    
    int maxi = 0;
    for (int i = 1; i <= n; i++) {
        int L = 1;
        int R = n;
        int ans = 0;
        while (L <= R) {
            int mid = (L + R) / 2;
            if (sorted[mid] < v[i]) {
                ans = mid;
                L = mid + 1;
            }
            else {
                R = mid - 1;
            }
        }
        cout << ans << '\n';
    }
    return 0;
}
```

## Normalizare mai simplă când valorile sunt distincte

În unele probleme în care toate valorile sunt distincte, ne putem gândi și la o variantă de a implementa conversia din datele clasice în cele normalizate în timp liniar (după sortare).

Ne putem gândi pur și simplu la o traversare a șirului în timp liniar, presupunând că păstrăm valorile originale folosind perechi.

```cpp
int cnt = 0; // numarul de valori distincte
for (int i = 1; i <= n; i++) {
  if (sorted[i].first > sorted[i - 1].first) {
    cnt++;
  }
  v[sorted[i].second] = cnt;
}
```

## Problema [Restaurant Customers](https://cses.fi/problemset/task/1619) de pe cses

Pentru a rezolva această problemă, trebuie să găsim o metodă care ne ajută să procesăm intervalele în așa fel încât să nu trebuiască să avem nevoie de foarte multă memorie pentru valorile din intervale. 

O primă soluție brută constă în verificarea fiecărui punct posibil de la $1$ la $10^9$, iar pentru fiecare punct, verificăm dacă este inclus în fiecare dintre cele $n$ intervale date. Complexitatea ar fi $O(n \cdot maxval)$, ceea ce este mult prea încet pentru o soluție optimă.

!!! note "Observație"
    Singurele puncte în care se schimbă numărul de intervale acoperite de un punct sunt acelea unde începe și se termină un interval, deci numărul de puncte relevante scade la $2 \cdot n$.

Soluția menționată mai sus ar fi optimizată la $O(n^2)$, ceea ce nu este îndeajuns pentru rezolvarea problemei date. 

O altă abordare constă în folosirea unei abordări pe stilul [Șmenului lui Mars](../usor/partial-sums.md#smenul-lui-mars), iar pentru fiecare interval, putem adăuga $1$ în zona $[st, dr]$, iar complexitatea ar deveni $O(maxval)$. 

Folosind observația de mai sus, putem reduce numărul de puncte la $2 \cdot n$, iar după ce sortăm punctele relevante, soluția explicată mai sus poate fi optimizată la $O(n \log n)$, unele din abordările care merg pot fi fie folosirea șmenului lui Mars pe vectorul cu punctele normalizate, fie sortarea punctelor relevante și considerarea lor drept evenimente, mai apoi parcurgându-le în ordine crescătoare. 

O abordare care consideră punctele drept evenimente se poate citi mai jos. Deoarece toate punctele sunt distincte, nu este necesar să considerăm într-o manieră particulară intrările și ieșirile.

```cpp
#include <iostream>
#include <algorithm>
 
using namespace std;
 
int n;
 
pair<int, int> p[400002]; 
 
int main() {
    cin >> n;
    for (int i = 1; i <= n; ++i) {
        int a, b;
        cin >> a >> b;
        // 1 - intrare in restaurant, -1 - iesire din restaurant
        // transformam fiecare moment intr-o pereche
        p[i*2-1] = {a, 1};
        p[i*2] = {b, -1};
    }
    
    sort(p + 1, p + n * 2 + 1); 
     
    int counter = 0, max_counter = 0;
    for (int i = 1; i <= n*2; ++i) {
        counter += p[i].second; 
        if (counter > max_counter) {
            max_counter = counter;
        }
    }
    
    cout << max_counter << '\n';
    return 0;
}
```

## Concluzii 

Deși normalizarea nu este altceva decât o tehnică auxiliară, aceasta se va dovedi a fi una foarte importantă în cazul multor probleme algoritmice, acest pas fiind un pas intermediar foarte important atunci când avem nevoie să prelucrăm datele folosind structuri de date, evitând astfel folosirea unor variante dinamice, care ocupă mult mai multă memorie și consumă mult mai mult timp. 

## Probleme suplimentare

* [map pbinfo](https://www.pbinfo.ro/probleme/2217/map)
* [Probleme cu normalizare de pe pbinfo](https://www.pbinfo.ro/?pagina=probleme-lista&disciplina=0&clasa=-1&dificultate=0&folosesc_consola=-1&eticheta=349%2C)
* [1D Country AtCoder](https://atcoder.jp/contests/abc371/tasks/abc371_d)
* [Rectangular Pasture USACO Silver](http://www.usaco.org/index.php?page=viewproblem2&cpid=1063)
* [Years Codeforces](https://codeforces.com/contest/1424/problem/G)
* [nextseq infoarena](https://www.infoarena.ro/problema/nextseq)
* [Static Range Queries Codeforces](https://codeforces.com/gym/102951/problem/D)

## Lectură suplimentară 

* [Coordinate Compression - USACO Guide](https://usaco.guide/silver/sorting-custom?lang=cpp#coordinate-compression)
* [Normalize an array](https://codeforces.com/blog/entry/4861)