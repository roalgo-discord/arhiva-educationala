---
tags:
    - secvente
    - sortare
    - ad-hoc
---

**Autor**: Ștefan-Cosmin Dăscălescu

În algoritmică, dar și în alte domenii, suntem nevoiți de multe ori să lucrăm cu secvențe de valori și se impune folosirea unor abordări specifice pentru a rezolva aceste probleme. Fie că este vorba de probleme ce apar în examenele naționale sau la concursurile de informatică, algoritmii ce prelucrează secvențe de valori se dovedesc a fi foarte importanți și cunoașterea lor, precum și a tehnicilor de rezolvare a acestor probleme devine esențială. 

## Noțiuni introductive

!!! info "Definiție" 
    O secvență reprezintă un șir de valori, de regulă dispuse consecutiv într-un șir mai mare sau poate reprezenta chiar un șir de sine stătător. 

    

!!! example "Exemplu"
    În vectorul $30$, $32$, $19$, $8$, $11$, $6$, putem spune următoarele lucruri:

    * $19, 8, 11$ este o secvență care începe de la poziția $3$ și se termină la poziția $5$ a șirului inițial
    * $30, 19, 11$ nu este o secvență a șirului de mai sus (în schimb, este un subșir, noțiune pe care o vom discuta în articolele ulterioare)

!!! note "Observație"
    În diverse contexte, secvențe precum $19, 8, 11$ sunt numite și subsecvențe, deoarece sunt obținute prin eliminarea de valori de la începutul și sfârșitul secvenței de mai sus. 

Pentru a prelucra aceste secvențe și subsecvențe, o primă soluție constă în păstrarea valorilor în memorie folosind vectori, iar mai apoi, în funcție de ce cere problema, să parcurgem toate variantele de a crea subsecvențe în șirul dat, sau eventual să verificăm diverse proprietăți, parcurgând valorile una câte una. 

!!! note "Observație"
    Numărul de subsecvențe ale unui șir cu lungimea $n$ este $\frac{n \cdot (n+1)}{2}$. 

Pentru a demonstra acest fapt, putem fixa poziția de început a unei subsecvențe (să zicem, $i$), iar pentru această poziție inițială, avem $(n - i + 1)$ variante pentru poziția finală - toate pozițiile $j$ astfel încât $i \leq j \leq n$. Astfel, avem $n + (n-1) + \dots + 1 = \frac{n \cdot (n+1)}{2}$.

În cele ce urmează, vom arăta diverse tehnici de rezolvare a unor probleme introductive care cuprind secvențe, iar mai apoi, vom prezenta și unul din algoritmii pentru subsecvența de sumă maximă.

## Probleme în care trebuie să aflăm o secvență de lungime maximă

O problemă care apare frecvent este următoarea:

Fie $X$ un vector cu elemente de un anumit tip. Să se determine cea mai lungă secvență din vector în care toate elementele au o anumită proprietate (sunt pare, impare, prime, nule, ordonate crescător, egale etc.).

Problema are mai multe soluții, cu complexități diverse. În toate soluțiile vom determina $lenmax, stmax$ și $drmax$, $lenmax$ fiind lungimea maximă a secvenței găsite, $stmax$ fiind capătul din stânga al șirului găsit, $drmax$ fiind capătul din dreapta al șirului găsit. Inițial, putem inițializa $lenmax$ cu $0$, $stmax$ și $drmax$ cu $-1$ pentru a marca faptul că nu am găsit încă nicio secvență cu condițiile cerute. 

Pentru exemplele de mai jos, vom afla lungimea celei mai lungi secvențe în care toate valorile sunt pare. Dacă există mai multe asemenea secvențe, o vom afla pe cea mai din stânga.

### Soluție în $O(n^3)$

Cea mai simplă soluție la acest tip de probleme este aceea în care fixăm capetele secvenței pe care o verificăm, iar pentru fiecare secvență, verificăm fiecare valoare și asta ne va ajuta să decidem dacă proprietatea este respectată. 

```cpp
int lenmax = 0, stmax = -1, drmax = -1;
for (int i = 1; i <= n; i++) {
    for (int j = i; j <= n; j++) {
        int ok = 1; // daca secventa este buna
        for (int poz = i; poz <= j; poz++) {
            if (v[poz] % 2 != 0) {
                ok = 0; // avem numar impar, deci secventa nu este buna
            }
        }
        if (ok == 1 && j - i + 1 > lenmax) {
            lenmax = j - i + 1;
            stmax = i;
            drmax = j;
        }
    }
}
cout << lenmax << " " << stmax " " << drmax << '\n'; 
```

Chiar dacă această soluție este tot $O(n^3)$, în multe cazuri se va dovedi mai rapidă în practică, deoarece iterând în ordine descrescătoare după lungime, dacă găsim o secvență cu proprietatea dorită, atunci ne putem opri. 

```cpp
int lenmax = 0, stmax = -1, drmax = -1;
for (int len = n; len >= 1; len--) {
    for (int i = 1; i + len - 1 <= n; i++) {
        int j = i + len - 1;
        int ok = 1; // daca secventa este buna
        for (int poz = i; poz <= j; poz++) {
            if (v[poz] % 2 != 0) {
                ok = 0; // avem numar impar, deci secventa nu este buna
            }
        }
        if (ok == 1 && j - i + 1 > lenmax) {
            lenmax = j - i + 1;
            stmax = i;
            drmax = j;
            // aceste linii de mai jos opresc toate structurile repetitive, break oprind doar cea mai apropiata structura repetitiva
            i = n;
            len = 0;
        }
    }
}
cout << lenmax << " " << stmax " " << drmax << '\n'; 
```

### Soluție în $O(n^2)$

O îmbunătățire pe care o putem face la algoritmul precedent este aceea că dacă am verificat deja secvența $[i, j]$, pentru a trece la secvența $[i, j+1]$ trebuie doar să verificăm poziția $j-1$, fără a mai fi necesară verificarea din nou a tuturor pozițiilor în intervalul $[i, j]$. Deoarece acum va fi nevoie de doar două foruri pentru a verifica toate secvențele, complexitatea va deveni $O(n^2)$.

```cpp
int lenmax = 0, stmax = -1, drmax = -1;
for (int i = 1; i <= n; i++) {
    int ok = 1; // daca secventa este buna
    for (int j = i; j <= n; j++) {
        if (v[j] % 2 != 0) {
            ok = 0; // avem numar impar, deci secventa nu este buna
        }
        if (ok == 1 && j - i + 1 > lenmax) {
            lenmax = j - i + 1;
            stmax = i;
            drmax = j;
        }
    }
}
cout << lenmax << " " << stmax " " << drmax << '\n'; 
```

### Soluție în $O(n)$

Totuși, putem rezolva această problemă și mai eficient, deoarece dat fiind faptul că valorile pe care le avem vor avea mereu aceleași proprietăți, putem extinde secvența curentă atâta timp cât valorile respectă proprietatea cerută (în acest caz, paritatea), actualizând răspunsul maxim la fiecare pas. 

```cpp
int lenmax = 0, stmax = -1, drmax = -1;
int len = 0;
for (int i = 1; i <= n; i++) {
    if (v[i] % 2 == 0) {
        len++;
    }
    else {
        len = 0;
    }
    if (len > lenmax) {
        lenmax = len;
        drmax = i;
        stmax = i - len + 1;
    }
}
cout << lenmax << " " << stmax " " << drmax << '\n'; 
```

### Soluție în $O(n)$ fără vectori

În cazul unor probleme, în special cele care se dau la examenul de bacalaureat, se cere găsirea unor soluții eficiente atât din punct de vedere al timpului de execuție, cât și al memoriei folosite. Deoarece am redus soluția la una liniară, în care verificăm o singură dată fiecare valoare, nu mai are niciun sens să ținem în memorie un vector în care să stocăm valorile, acestea putând fi citite la fiecare pas.

```cpp
int lenmax = 0, stmax = -1, drmax = -1;
int len = 0;
for (int i = 1; i <= n; i++) {
    int x;
    cin >> x;
    if (x % 2 == 0) {
        len++;
    }
    else {
        len = 0;
    }
    if (len > lenmax) {
        lenmax = len;
        drmax = i;
        stmax = i - len + 1;
    }
}
cout << lenmax << " " << stmax " " << drmax << '\n'; 
```

## Subsecvența de sumă maximă 

În unele probleme, trebuie să aflăm subsecvența de sumă maximă a unui șir. Pentru a face acest lucru, vom putea modifica algoritmul prezentat mai sus, ținând cont de o observație foarte importantă, și anume faptul că dacă avem de-a face cu o sumă negativă la un moment dat, o putem ignora și reseta calculele, pentru a maximiza răspunsul. Acest algoritm este numit și algoritmul lui Kadane. 

```cpp
int summax = 0, stmax = -1, drmax = -1;
int sum = 0, st = 0;
for (int i = 1; i <= n; i++) {
    int x;
    cin >> x;
    if (sum < 0) {
        sum = x;
        st = i;
    }
    else {
        sum += x;
    }
    if (sum > summax) {
        summax = sum;
        drmax = i;
        stmax = st;
    }
}
cout << summax << " " << stmax " " << drmax << '\n'; 
```

### Subsecvența de sumă maximă pe matrice

Acest algoritm poate fi extins și pe matrice, observația de bază fiind aceea că putem fixa linia de început și linia de final, iar mai apoi folosind [sume parțiale](https://edu.roalgo.ro/usor/partial-sums/), să aplicăm algoritmul de mai sus.

Mai jos puteți găsi soluția de la problema [Submatrix SumMax](https://www.pbinfo.ro/probleme/3410/submatrixsummax) de pe pbinfo.

```cpp
#include <iostream>
using namespace std;
int n, a[302][302], sp[302][302];
int sum (int xa, int ya, int xb, int yb) {
    return sp[xb][yb] - sp[xa-1][yb] - sp[xb][ya-1] + sp[xa-1][ya-1];
}
int main() {
    cin >> n;
    for (int i = 1; i <= n; ++i) {
        for (int j = 1; j <= n; ++j) {
            cin >> a[i][j];
            sp[i][j] = sp[i-1][j] + sp[i][j-1] - sp[i-1][j-1] + a[i][j];
        }
    }
    int ans = -1001;
    for (int i = 1; i <= n; ++i) {
        for(int j = i; j <= n; ++j) {
            int ssm = 0;
            for (int poz = 1; poz <= n; ++poz) {
                int sumCol = sum(i, poz, j, poz);
                ssm = max(ssm + sumCol, sumCol);
                if(ssm > ans) {
                    ans = ssm;
                }
            }
        }
    }
    cout << ans;
    return 0;
}
```

## Concluzii

După cum se poate observa, secvențele și prelucrarea lor sunt o parte fundamentală și necesară pentru abordarea unei plaje foarte largi de probleme, așa cum veți putea vedea în capitolele următoare, în special când vine vorba de diverse cazuri particulare, algoritmi și metode de programare, aici putem enumera [metoda celor doi pointeri](./two-pointers.md), [sliding window](./sliding-window.md) sau chiar și problemele în care folosim metodele specifice structurilor de date. Implementările precise și clare vor fi esențiale pentru rezolvarea acestor probleme în timp rapid și simplu. 

## Probleme suplimentare
 
* [Pbinfo - Verificarea unor proprietăți](https://www.pbinfo.ro/probleme/categorii/49/tablouri-unidimensionale-vectori-verificarea-unor-proprietati)
* [Pbinfo - Probleme cu secvențe](https://www.pbinfo.ro/probleme/categorii/21/tablouri-unidimensionale-vectori-probleme-cu-secvente)
* [kilonova progres](https://kilonova.ro/problems/2200)
* [sss OJI 2022](https://kilonova.ro/problems/942/)
* [Trafalet OJI 2024](https://kilonova.ro/problems/2503/)
* [Microbist OJI 2024](https://kilonova.ro/problems/2517/)
* [Subsecvență de sumă maximă](https://infoarena.ro/problema/ssm) 
* [infoarena joctv](https://infoarena.ro/problema/joctv)


## Lectură suplimentară 

* [Secvențe în vectori](https://www.pbinfo.ro/articole/5613/secvente-in-vectori)
* [Verificarea unor proprietăți](https://www.pbinfo.ro/articole/5586/verificarea-unor-proprietati)
* [Secvențe - CPPI Sync](https://cppi.sync.ro/materia/lectii/secvente.pdf)
* [Secvențe - Algopedia](https://www.algopedia.ro/wiki/index.php/Clasa_a_V-a_lec%C8%9Bia_12_-_26_oct_2017)
* [Secvențe partea II- Algopedia](https://www.algopedia.ro/wiki/index.php/Clasa_a_V-a_lec%C8%9Bia_13_-_2_nov_2017)
* [Secvența de sumă maximă](https://www.pbinfo.ro/articole/20499/secventa-de-suma-maxima)
* [Subsecventa de suma maxima - Sebastian Popa](https://vasiluta.ro/sebi/ssm)
