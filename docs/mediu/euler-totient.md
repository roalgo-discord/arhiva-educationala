---
tags:
    - matematica
    - divizori
    - precalculari
---

**Autor**: Ștefan-Cosmin Dăscălescu

## Introducere

!!! info "Definiție"
    Indicatorul lui Euler este un rezultat matematic care este folosit pentru a număra câte valori prime cu $n$ sunt în intervalul $[1, n]$. Acesta este notat cu $\varphi (n)$.

!!! example "Exemplu"
    De exemplu, $\varphi (12) = 4$, deoarece $1$, $5$, $7$ și $11$ sunt prime cu $12$. 

Această funcție se va dovedi utilă în multe probleme de algoritmică, fie că e vorba de aflarea unor răspunsuri referitoare la divizorii comuni ai unor numere sau ca pas intermediar în algoritmi și metode mai complicate, precum [Funcția Möbius](https://roalgo-discord.github.io/arhiva-educationala/mediu/mobius/) sau pentru cei mai avansați, teorema chinezească a resturilor.

## Calcularea funcției și proprietățile acesteia

Pentru a calcula $\varphi (n)$, putem fie să verificăm pentru fiecare număr de la $1$ la $n$ dacă $(i, n) = 1$, unde cu $(a, b)$ am notat [cel mai mare divizor comun](https://roalgo-discord.github.io/arhiva-educationala/usor/divisibility/#notiuni-introductive) al numerelor $a$ și $b$, fie să găsim o formulă care se bazează pe o observație mai avansată. 

Cu alte cuvinte, dacă știm factorii primi care apar în reprezentarea lui $n$, îi notăm $p_1$, $p_2$, $\dots$, $p_k$, formula va deveni următoarea:

$$
n \cdot \prod_{1}^{k} \frac{p_i - 1}{p_i}
$$

De exemplu, pentru $n = 30$, $\varphi (n) = \frac{2 - 1}{2} \cdot \frac{3 - 1}{3} \cdot \frac{5 - 1}{5} = 8$

Această formulă poate fi calculată în $O(\sqrt n)$ folosind un algoritm similar cu cel pentru aflarea divizorilor primi ai unui număr, codul de mai jos rezolvând problema [Phi](https://www.pbinfo.ro/probleme/2642/phi) de pe pbinfo. 

!!! note "Observație"
    Trebuie avut grijă să împărțim mai întâi răspunsul la $i$ și apoi să înmulțim cu $(i-1)$, pentru a evita un overflow care nu este necesar, dat fiind că $\varphi \ (n) \leq n$.

```cpp
int Phi(int n) {
    int ans = n;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            ans = ans / i;
            ans = ans * (i-1);
            while (n % i == 0) {
                n /= i;
            }
        }
    }
    if (n > 1) {
        ans = ans / n;
        ans = ans * (n-1);
    }
    return ans;
}
```

## Calcularea funcției pentru toate valorile de la $1$ la $n$

Pentru a calcula $\varphi (i)$ pentru toate valorile de la $1$ la $n$, tot ce trebuie să facem este să folosim o precalculare similară cu cea descrisă la [ciurul lui Eratostene](https://roalgo-discord.github.io/arhiva-educationala/usor/sieve/).

Mai întâi, vom inițializa răspunsul pentru fiecare poziție ca fiind $i$, iar pentru fiecare număr prim în intervalul $[2, n]$ (numerele prime se pot afla ușor, verificând dacă valoarea calculată este încă egală cu $i$), vom trece prin toți multiplii și vom împărți la $i$ și înmulți cu $i-1$. 

Codul de mai jos rezolvă problema [eratostene3 de pe pbinfo](https://www.pbinfo.ro/probleme/3314/eratostene3), în care trebuie să aflăm pentru fiecare valoare de la intrare câte numere sunt prime cu ea.

```cpp
#include <fstream>
#include <vector>
using namespace std;
 
const int n = 1000000;
int main() {
    ifstream cin("eratostene3.in");
    ofstream cout("eratostene3.out");
    
    vector<int> totient(n+1);
    for (int i = 1; i <= n; i++) {
        totient[i] = i;
    }
    
    for (int i = 2; i <= n; i++) {
        // daca numarul inca este prim, trecem prin multipli
        if (totient[i] == i) { 
            for (int j = i; j <= n; j += i) {
                totient[j] /= i;
                totient[j] *= (i-1);
            }
        }
    }
    
    int q;
    cin >> q;
    
    while (q--) {
        int n;
        cin >> n;
        
        cout << totient[n] << " ";
    }
    return 0;
}
```

## Aflarea valorilor funcției folosind proprietatea sumei divizorilor 
 
Gauss a descoperit o proprietate care va fi foarte utilă în contextul calculelor noastre viitoare și în special la funcția Mobius. 

$$ 
\sum_{d|n} \varphi \ (d) = n
$$ 

Această sumă este calculată pentru toți divizorii lui $n$.

De exemplu, divizorii lui $10$ sunt $1$, $2$, $5$ și $10$. Suma valorilor lui $\varphi (i)$ este $1$ + $1$ + $4$ + $4$ = $10$.

Folosind această proprietate putem calcula toate valorilor indicatorului lui Euler în $O(n \log n)$ ca la ciurul lui Eratostene, dar implementarea este una mai simplă.

```cpp
void phi_1_to_n(int n) {
    vector<int> phi(n + 1);
    phi[0] = 0;
    phi[1] = 1;
    for (int i = 2; i <= n; i++) {
        phi[i] = i - 1;
    }
    for (int i = 2; i <= n; i++) {
        for (int j = 2 * i; j <= n; j += i) {
              phi[j] -= phi[i];
        }
    }
}
```

## Concluzii

Indicatorul lui Euler este o funcție care se dovedește a fi foarte importantă în foarte multe probleme de algoritmică, dar și mai târziu, odată ce funcția Möbius și teorema chinezească a resturilor apar în problemele mai avansate date la concursurile de programare competitivă. Aplicațiile acesteia în algebră și în teoria numerelor pot reprezenta un bun loc de plecare pentru cei pasionați și nu numai. 

## Probleme suplimentare

* [fractii infoarena](https://www.infoarena.ro/problema/fractii)
* [LCMSUM Spoj](https://www.spoj.com/problems/LCMSUM/)
* [Permeuler pbinfo](https://www.pbinfo.ro/probleme/3295/permeuler)
* [Common Divisors Codeforces](https://codeforces.com/problemset/problem/1203/C)
* [problemele de pe CPPI Sync](https://cppi.sync.ro/materia/indicatorul_lui_euler.html)
* [problemele de pe pbinfo](https://www.pbinfo.ro/probleme/eticheta/57/indicatorul-lui-euler)
* [Problemele din această listă de pe Vjudge](https://vjudge.net/contest/561512)

## Lectură suplimentară

* [phi function - cp-algorithms](https://cp-algorithms.com/algebra/phi-function.html)
* [Indicatorul lui Euler - pbinfo](https://www.pbinfo.ro/articole/18882/indicatorul-lui-euler)
* [Euler's phi function, its properties, and how to compute it - Codeforces](https://codeforces.com/blog/entry/106851)
* [Euler's totient function - wikipedia](https://en.wikipedia.org/wiki/Euler%27s_totient_function)
* [Funcția Möbius](https://roalgo-discord.github.io/arhiva-educationala/mediu/mobius/)
