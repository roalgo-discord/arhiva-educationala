---
tags:
    - vectori
    - sortare
    - cautare
    - optimizare
---

**Autor**: Andrei-Cristian Ivan, Ștefan-Cosmin Dăscălescu

!!! example "Cunoștințe necesare"
    * [Vectori (tablouri unidimensionale)](https://edu.roalgo.ro/cppintro/arrays/)
    * [Algoritmi de sortare - Doar algoritmii în $O(n^2)$ și funcția std::sort](https://edu.roalgo.ro/usor/sorting/)

Să presupunem că avem un șir de $N$ numere și memorie astfel încât să putem
reține _doar_ șirul (plus evident alte variabile, dar nu foarte multe). Noi
primim mai multe întrebări, de forma: Există valoarea $X$ în șir?

În mod evident, o soluție foarte trivială este să parcurgem manual șirul pentru
fiecare întrebare, și să vedem dacă elementul cerut apare sau nu în șir, astfel
obținând complexitate totală de $O(N \cdot Q)$. Singura noastră problemă este că
noi o să avem $N$ și $Q$ undeva în jur de $10^6$, ceea ce va face ca această
abordare să pice clar în timp, deci va trebui găsită o soluție mult mai
eficientă. Aici intervine algoritmul de _căutare binară_.

## Prezentarea algoritmului

!!! note "Notă"
    De acum încolo, se va presupune că șirul nostru este sortat crescător.
    Căutarea binară pe un șir nesortat va da mereu răspunsuri eronate.

În algoritmul de căutare binară se va pleca de la analiza șirului pe întreaga sa
lungime, și se va fixa punctul de mijloc din sir. Dacă valoarea poziției din
mijloc este mai mică decât valoarea căutată, atunci sigur valoarea căutată se
poate (că nu știm sigur dacă există!) afla în a doua jumătate, altfel, se poate
afla în prima jumătate. Mai departe, nu va mai fi necesar sa analizăm tot șirul,
ci doar jumătatea relevantă (cea în care considerăm noi că există o șansă să
găsim valoarea noastră), și algoritmul se va repeta până când lungimea devine
$1$ și putem determina răspunsul. Dat fiind faptul că noi la fiecare pas
împărțim la $2$ lungimea șirului, acest lucru ne va da complexitate logaritmică
la determinarea răspunsului, deci vom avea complexitate $O(Q \log N)$ (dacă
șirul nostru nu este sortat din input, se mai adaugă și un $O(N \log N)$ la
complexitate), cu memorie $O(N)$.

Pentru o înțelegere mai clară a algoritmului, să presupunem următorul exemplu:
se dă un șir sortat crescător unde apar toate numerele de la $1$ la $100$, și se
cere să determinăm dacă există în șir valoarea $72$.

![](../images/cautari/cb-light.svg#only-light){ width="70%" }
![](../images/cautari/cb-dark.svg#only-dark){ width="70%" }

O întrebare la care trebuie totuși dat răspuns este: De ce împărțim în două
jumătăți și de ce nu în $3$ treimi? Da, $\log_3 N < \log_2 N$, dar numărul de
verificări efectuate va fi mai mare la împărțirea în $3$ treimi, deci în
continuare este mai eficient să împărțim în două jumătăți. În mod inductiv se va
demonstra pentru orice împărțire posibilă.

## O implementare banală

Cea mai des întâlnită implementare a căutării binare este următoarea:

```cpp
int cb_naiv(int n) {
    int l = 1;
    int r = n;
    int ans = -1;

    while (l <= r) {
        int mij = (l + r) / 2;
        if (conditie) {
            ans = mij;
            l = mij + 1;
        } else {
            r = mij - 1;
        }
    }

    return ans;
}
```

Implementarea de mai sus este una corectă, dar se pot întâlni următoarele bug-uri:

* Schimbarea în $l = mij$ și $r = mij$ va face ca programul nostru să ruleze
  într-o buclă infinită (deoarece ambele valori vor atinge la un moment dat
  valoarea $mij$, și deci va fi respectată mereu condiția $l \leq r$)

* În timp ce-l calculăm pe $mij$, ne putem lua overflow (dacă prin absurd
  ajungem să căutam fix pe la valorile maxime pe care le poate reține tipul
  nostru de date, este inevitabil un overflow generat de $l + r$). De aceea,
  următoarea variantă prezentată se va axa fix pe rezolvarea acestui bug.

## O implementare corectă

```cpp
int cb_corect(int n) {
    int l = 1;
    int r = n;
    int ans = -1;

    while (l <= r) {
        int mij = l + (r - l) / 2;

        if (conditie) {
            ans = mij;
            l = mij + 1;
        } else {
            r = mij - 1;
        }
    }
        
    return ans;
}
```

Această căutare binară se bazează pe principiul menționat mai sus: noi
înjumătățim de fiecare dată lungimea șirului pe care încercăm să căutăm ceea ce
ne interesează. Formula de mai sus pentru calcularea mijlocului este echivalentă
cu cea din prima căutare, dar mai mult, nu are cum să ne dea overflow.

De fiecare dată când mijlocul nostru verifică _condiție_, noi facem un „salt”
de la o poziție $l$ la alta. La finalul căutării, indicele $l$ final va fi
defapt o sumă a salturilor, iar ca pe orice număr întreg, noi acest număr îl
putem descompune într-o altă bază numerică. Hai să vedem cum putem rafina
această idee cu o altă implementare mai jos.

## Căutarea binară a lui Mihai Pătrașcu

```cpp
void cb3_patrascu(int n) {
    int l = 0;

    for (int bit = 30; bit >= 0; --bit) {
        int putere = (1 << bit);
        if ((l | putere) <= n && conditie) {
            l |= putere;
        }
    }
}
```

Baza în care noi vom descompune suma va fi baza $2$, pentru a menține în
continuare complexitatea $\log_2 N$. Inițial, vom pleca cu un exponent $e$, unde
$2^e$ va reprezenta lungimea secvenței pe care o analizăm (atenție să nu ieșim
din vector!). Chiar dacă noi vom analiza inițial o lungime care este putere de
$2$, care foarte probabil să fie diferită de $N$, se poate demonstra foarte ușor
că noi (dacă o să fie necesar), vom putea căuta valori și în acea secvență
neacoperită inițial. Lăsăm această demonstrație ca temă pentru cititor.

Căutarea de mai sus poartă și numele de Căutarea binară a lui [Mihai
Pătrașcu](http://people.csail.mit.edu/mip/), sau căutarea pe biți.

În mare parte, aceste căutări binare ne vor da aceeași complexitate peste tot,
în schimb, când vrem să implementăm algoritmul de Lowest Common Ancestor (LCA)
cu Binary Lifting, căutarea binară pe biți reduce algoritmul de la $O(\log^2{H})$
la $O(\log{H})$, unde $H$ reprezintă adâncimea maximă a arborelui.

## Căutarea binară pe răspuns

Să presupunem că avem de-a face cu o problemă în care trebuie să aflăm punctul în care o funcție monotonă atinge un anumit punct. Chiar dacă aici nu mai avem de-a face cu un vector, putem folosi aceleași principii ale căutării binare și să aflăm în mod precis punctul în care funcția noastră $f$ depășește o valoare dată, $n$. 

Codul nostru nu va fi modificat într-un mod semnificativ, singurul lucru ce se va modifica va fi adăugarea funcției menționate anterior. Totuși, trebuie remarcat că spre deosebire de căutările binare pe șiruri de lungime fixă, aici capetele pentru $l$ și $r$ trebuie determinate în funcție de cerința problemei. 

```cpp
int f(int x) {
    // codul functiei
}

int cb_raspuns() {
    int l = 1;
    int r = 1000000000;
    int ans = -1;

    while (l <= r) {
        int mij = l + (r - l) / 2;

        if (f(mij) >= x) {
            ans = mij;
            r = mij - 1;
        } else {
            l = mij + 1;
        }
    }
        
    return ans;
}
```

### Problema [Factory Machines](https://cses.fi/problemset/task/1620) de pe CSES

Pentru această problemă, se poate observa rapid faptul că este foarte greu, dacă nu imposibil să reducem această problemă la una sau mai multe ecuații care dacă rezolvate, ne-ar da răspunsul exact. Deoarece numărul de produse pe care mașinile îl produc crește pe măsură ce crește timpul alocat, ne putem gândi la o căutare binară pe răspuns. 

Astfel, la un pas al căutării binare putem evalua dacă $f(x) \geq t$, unde $f(x)$ este numărul de produse pe care fabrica le poate produce în $x$ unități de timp. După ce avem grijă la evaluarea funcției pentru a evita overflow-ul, soluția nu este complicată.

```cpp
#include <iostream>
#include <vector>

using namespace std; 
 
int n, k;
vector<int> v;
 
// aici calculam f(x)
 
long long f(long long x) {
    long long cnt = 0;
    
    for (int i = 0; i < n; i++) {
        cnt += x / v[i];
        if(cnt >= k) { // pentru a evita overflow-ul
            return cnt;
        }
    }
    return cnt;
}
 
int main() {
    cin >> n >> k;
    v.resize(n);
    
    for (int i = 0; i < n; i++) {
        cin >> v[i];
    }
    
    long long L = 0;
    long long R = 1e18;
    long long ans = R;
    
    while (L <= R) {
        long long mid = (L + R) / 2;
        
        if (f(mid) >= k) {
            ans = mid;
            R = mid - 1;
        }
        else {
            L = mid + 1;
        }
    }
    
    cout << ans;
    return 0;
}
```

## Căutarea binară pe numere reale

Pentru a căuta binar pe numere reale, trebuie să avem grijă la un detaliu foarte important. Deoarece avem nevoie de o precizie de câteva zecimale (de regulă, un număr mai mare, cel puțin $6$), trebuie să evităm situațiile în care rămânem blocați într-un loop infinit, pericol în care ne-am putea afla folosind abordarea existentă. 

Astfel, soluția care se impune este folosirea unui for pentru a fixa numărul de iterații (de regulă, nu mai mare de $100$, în cele mai multe cazuri $50$ de iterații ale funcției sunt îndeajuns).

```cpp
int f(int x) {
    // codul functiei
}

double cb_double() {
    double l = 0;
    double r = 1e9;
    double ans = r;

    for (int i = 1; i <= 100; i++) {
        if (f(mij)) {
            ans = mij;
            r = mij;
        }
        else {
            l = mij;
        }
    }   
    return ans;
}
```

### Problema [Equation](https://codeforces.com/edu/course/2/lesson/6/2/practice/contest/283932/problem/E) de pe Codeforces Edu

!!! note "Observație"
    Pentru a accesa această problemă, trebuie să vă înregistrați în prealabil la aceste cursuri, intrând în secțiunea ITMO Academy - Pilot Course, pe care o găsiți [aici](https://codeforces.com/edu/courses)

Deși această problemă poate fi rezolvată și folosind ecuații matematice, căutarea binară a răspunsului devine o soluție elegantă care evită complicații fără rost. Fixând un număr de $100$ de iterații, se ajunge la răspuns foarte simplu și eficient.

```cpp
#include <iostream>
#include <iomanip> // pentru afisarea cu precizie fixa
#include <cmath>

using namespace std;

const double eps = 1e-6; // pentru compararea raspunsului
 
int main() {
    
    double val;
    cin >> val;
    
    double L = 0;
    double R = 200000;
    double ans;
    
    for (int iter = 1; iter <= 100; iter++) {
        double mid = (L + R) * 0.5000;
        double expr = mid * mid + sqrt(mid);
        if (expr - val >= eps) {
            ans = mid;
            R = mid;
        }
        else {
            L = mid;
        }
    }
    
    cout << fixed << setprecision(10) << ans << '\n';
    return 0;
}
```

## Funcții de sistem pentru căutarea binară

Deși multe structuri de date din STL au căutarea binară drept o parte esențială a funcționalității lor, ne vom concentra strict pe cele care operează pe un vector ordonat crescător, toate aceste funcții plecând de la această presupunere. 

Funcțiile de sistem care se bazează pe căutarea binară sunt următoarele:

* **`std::binary_search`**: Verifică dacă o valoare dată se află în intervalul menționat. 
* **`std::lower_bound`**: Găsește prima poziție unde valoarea dată poate fi inserată fără a strica ordinea elementelor deja existente. 
* **`std::upper_bound`**: Găsește prima poziție cu proprietatea că elementele de la acea poziție încolo sunt strict mai mari decât valoarea dată. 
* **`std::equal_range`**: Găsesște intervalul de poziții care au valori egale cu valoarea dată (echivalentul aplicării lower_bound și upper_bound).

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

using namespace std;

int main() {
    vector<int> vec = {1, 3, 5, 7, 9};
    if (binary_search(vec.begin(), vec.end(), 5)) {
        cout << "5 a fost gasit" << '\n';
    } else {
        cout << "5 nu a fost gasit" << '\n';
    }

    // aceste functii afla pozitiile din vector corespunzatoare acestor operatii
    auto it = (std::lower_bound(vec.begin(), vec.end(), 5) - vec.begin());
    cout << it << " ";
    
    it = (std::upper_bound(vec.begin(), vec.end(), 5) - vec.begin());
    cout << it << " ";
    return 0;
}
```

## Concluzii

Căutarea binară este unul dintre cele mai fundamentale metode ale
algoritmicii, fiind absolut necesar pentru a optimiza probleme unde ni se cere
să determinăm existența unei valori într-un șir, sau determinarea unui număr
maxim/minim care să respecte o condiție impusă de problemă etc.

Acest algoritm este unul din cele mai populari algoritmi dat atât la olimpiade, cât și la rundele de Codeforces, regăsindu-se frecvent drept subproblemă în multe probleme foarte celebre, precum și fiind la baza multor implementări ale unor algoritmi mai complicați.

## Probleme suplimentare


* [Problema cautbin - Infoarena](https://www.infoarena.ro/problema/cautbin)
* [bete2 infoarena](https://www.infoarena.ro/problema/bete2)
* [cb2 pbinfo](https://www.pbinfo.ro/probleme/2443/cb2)
* [Problemele din pasul 1 de la EDU](https://codeforces.com/edu/course/2/lesson/6/1/practice)
* [nrtri infoarena](https://www.infoarena.ro/problema/nrtri)
* [USACO Bronze Social Distancing I](https://usaco.org/index.php?page=viewproblem2&cpid=1035)
* [OJI 2016 pic](https://kilonova.ro/problems/865)
* [ONI 2016 dif2](https://kilonova.ro/problems/1475)
* [USACO Silver Convention](https://usaco.org/index.php?page=viewproblem2&cpid=858)
* [OJI 2019 mostenire](https://kilonova.ro/problems/905)
* [ONI 2017 orase](https://kilonova.ro/problems/1501)
* [ONI 2017 orase](https://kilonova.ro/problems/1501)
* [zone infoarena](https://www.infoarena.ro/problema/zone)
* [Problemele din pasul 2 de la EDU](https://codeforces.com/edu/course/2/lesson/6/2/practice)
* [cb3 pbinfo](https://www.pbinfo.ro/probleme/2789/cb3)
* [Baraj Juniori 2021 intergalactic](https://kilonova.ro/problems/1098)
* [ONI 2018 plaja](https://kilonova.ro/problems/1522/)
* [USACO Silver Loan Repayment](https://usaco.org/index.php?page=viewproblem2&cpid=991)
* [Problemele cu cautare binara de pe kilonova](https://kilonova.ro/tags/315)
* [Problemele cu cautare binara de pe codeforces](https://codeforces.com/problemset?tags=binary+search)
* [Problemele cu cautare binara de pe infoarena](https://www.infoarena.ro/cauta-probleme?tag_id[]=49)


## Resurse suplimentare

* [Binary Search - USACO Guide](https://usaco.guide/silver/binary-search?lang=cpp)
* [Cursurile Edu de pe Codeforces, este necesară înregistrarea anterioară](https://codeforces.com/edu/course/2/lesson/6)
* [Cautare binara - CPPI Sync](https://cppi.sync.ro/materia/cautare_binara.html)
* [Cautare binara - pbinfo](https://www.pbinfo.ro/articole/3633/cautarea-binara)