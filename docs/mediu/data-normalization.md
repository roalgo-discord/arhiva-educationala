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

## Concluzii 

Deși normalizarea nu este altceva decât o tehnică auxiliară, aceasta se va dovedi a fi una foarte importantă în cazul multor probleme algoritmice, acest pas fiind un pas intermediar foarte important atunci când avem nevoie să prelucrăm datele folosind structuri de date, evitând astfel folosirea unor variante dinamice, care ocupă mult mai multă memorie și consumă mult mai mult timp. 

## Probleme suplimentare

* [map pbinfo](https://www.pbinfo.ro/probleme/2217/map)
* [Probleme cu normalizare de pe pbinfo](https://www.pbinfo.ro/?pagina=probleme-lista&disciplina=0&clasa=-1&dificultate=0&folosesc_consola=-1&eticheta=349%2C)
* [Rectangular Pasture USACO Silver](http://www.usaco.org/index.php?page=viewproblem2&cpid=1063)
* [nextseq infoarena](https://www.infoarena.ro/problema/nextseq)
* [Static Range Queries Codeforces](https://codeforces.com/gym/102951/problem/D)

## Lectură suplimentară 

* [Coordinate Compression - USACO Guide](https://usaco.guide/silver/sorting-custom?lang=cpp#coordinate-compression)
* [Normalize an array](https://codeforces.com/blog/entry/4861)