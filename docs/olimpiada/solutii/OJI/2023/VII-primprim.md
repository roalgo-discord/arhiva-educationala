---
tags:
    - OJI
    - clasa VII
---

# Soluția problemei Primprim (OJI 2023, clasa a VII-a)

!!! example "Cunoștințe necesare"
    - [Ciurul lui Eratostene](https://edu.roalgo.ro/usor/sieve/)
    - [Vectori de frecvență](https://edu.roalgo.ro/usor/frequency-arrays/)

**Autor soluție**: Ștefan-Cosmin Dăscălescu

!!! note "Link problemă"
    Această problemă poate fi accesată [aici](https://kilonova.ro/problems/514/).

Pentru ambele cerințe va fi necesar să determinăm cât mai rapid pentru un număr dat distanța față de cel mai apropiat număr prim. O primă abordare ar fi ca pentru fiecare număr să verificăm mai întâi dacă este prim (în acest caz, costul ar fi $0$), iar în caz contrar ne deplasăm la stânga și la dreapta sa până când identificăm un număr prim, calculând apoi costul folosind formula dată din enunț. Totuși, o asemenea abordare ar avea complexitatea O($x * \sqrt{valmax}$), unde $x$ reprezintă distanța maximă față de un număr prim. Deoarece $x$ este cel mult $57$, o asemenea abordare nu obține punctaj maxim.

Pentru a optimiza această abordare, vom precalcula costurile pentru toate numerele de la $1$ la $10^6$. Pentru aceasta, vom utiliza ciurul lui Eratostene, pentru a genera numerele prime $\leq 10^6$, urmând ca mai apoi costul să fie calculat în O(1) pentru fiecare număr. Complexitatea precalculării este O($n \log \log n$).

Cerinţa $1$. Vom citi succesiv numerele și vom afla succesiv costul pentru fiecare număr de la intrare, reținând într-o variabilă suma costurilor. În funcție de abordarea folosită pentru calcularea costurilor, se pot obține diverse punctaje parțiale, dar punctajul maxim pe cerință se poate obține doar folosind metoda bazată pe ciurul lui Eratostene, abordare explicată mai sus.

Cerinţa $2$. Pentru această cerință vom citi succesiv operațiile și le vom executa.Pentru a obține un cost total minim trebuie să adunăm cele mai mici $p$ costuri. O abordare eficientă se bazează pe observația că pentru orice număr costul este cel mult $57$, fapt ce ne permite să utilizăm un vector de frecvență $fr$, unde $fr[i]$ = numărul de elemente din vectorul $v$ care au costul $i$. 

Pentru fiecare operație, la modificarea unei valori din vector, vom decrementa frecvența costului pentru vechea valoare și vom incrementa frecvența costului pentru noua valoare. 

Pentru a determina costul total minim pentru a obține cel puțin $p$ numere prime în vector (valoarea afișată după executarea operației), vom parcurge vectorul de frecvență de la stânga la dreapta ($i=0, \dots, 57$). La fiecare pas $i$, pentru a calcula costul total minim adunăm la o variabilă $cmin$ produsul dintre $fr[i]$ și $i$ (există $fr[i]$ numere care pot fi transformate în numere prime cu costul $i$), iar într-o variabilă $nr$ reținem câte numere prime au fost deja obținute. În momentul în care $nr+fr[i]>p$, parcurgerea se oprește și adunăm la $cmin$ doar costul obținerii celor $p-nr$ numere prime care mai sunt necesare (adică adunăm $fr[i] \cdot (p-nr)$.

În funcție de cum selectăm cele mai mici $p$ costuri și în funcție de cum calculăm costurile, se pot obține diverse punctaje parțiale. 

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <fstream> 
#include <cmath>
   
using namespace std; 

ifstream fin("primprim.in"); 
ofstream fout("primprim.out"); 
   
int vals[1000002], primes[200002], cnt, ans[1100002];
bool pr[1100002];

int fr[202];

int main() {  
    int c; 
    fin >> c; 
      
    int n, a = 1100000, i, j; 
    fin >> n; 
      
    for (i = 1; i <= n; i++) {
        fin >> vals[i]; 
    }
      
    // precalculam raspunsul optim pentru fiecare numar de la 1 la a folosind ciurul lui Eratostene 
      
    for (i = 2; i <= a; i++) { 
        if (pr[i] == 0)  { 
            primes[cnt++] = i;
            for (j = i+i; j <= a; j += i) {
                pr[j] = 1; 
            }
        } 
    } 
      
    int poz = -1; 
      
    // parcurg valorile de la 1 la a pentru a afla raspunsul optim dupa ce am aflat numerele prime 
    ans[1] = 1; 
    for (i = 2; i <= a; i++) { 
        if (pr[i] == 0) {
            poz++; 
        }
        ans[i] = abs(i - primes[poz]); 
        if (poz + 1 < cnt) {
            ans[i] = min(ans[i], abs(i - primes[poz+1])); 
        }
    } 
      
    // voi folosi vector de frecventa pentru a tine aceste diferente, care de altfel sunt destul de mici 
      
    for (i = 1; i <= n; i++) {
        fr[ans[vals[i]]]++; 
    }
      
    if (c == 1) { 
        int total = 0;           
        for (i = 1; i <= n; i++) {
            total += ans[vals[i]]; 
        }
        fout << total; 
        return 0; 
    } 
      
    int q; 
    fin >> q; 
      
    for (i = 1; i <= q; i++) { 
        int a, b, p; 
        fin >> a >> b >> p; 
          
        fr[ans[vals[a]]]--; 
        vals[a] = b; 
        fr[ans[vals[a]]]++; 
          
        int dif = 0; 
        int sol = 0; 
          
        // la fiecare pas parcurg vectorul de frecventa pana cand dau de p diferente 
          
        while (p) { 
            sol += min(p, fr[dif]) * dif; 
            p -= min(p, fr[dif]); 
            dif++; 
        } 
          
        fout << sol << '\n'; 
    }  
    return 0; 
}
```