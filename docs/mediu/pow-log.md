---
tags:
    - algebra
    - optimizari
    - modulo
---

**Autor**: Ștefan-Cosmin Dăscălescu

## Introducere

De multe ori, sunten nevoiți să calculăm diverse valori modulo $x$ sau să calculăm puteri foarte mari într-o manieră care să ne permită să obținem răspunsurile cât mai rapid. 

Pentru a calcula aceste puteri, vom vrea să optimizăm metoda clasică de a înmulți rezultatul cu baza de fiecare dată până când ajungem la răspunsul optim, așa că se impune folosirea unor observații matematice care ne ajută să calculăm expresii de acest gen mult mai rapid. 

## Fundamente ale calcului modular

Înainte să prezentăm subiectul articolului, trebuie să prezentăm niște fundamente care ne vor ajuta să înțelegem mai bine conceptul de aici. Vom presupune că $a$ și $b$ sunt numere naturale, cuprinse între $0$ și $mod - 1$.

### Adunarea modulară 

!!! note "Observație"
    * $(a + b)\ \% \ mod = (a \ \% \ mod + b \ \% \ mod) \ \% \ mod$. Practic, dacă adunăm două numere și facem modulo, e același lucru cu a face modulo separat, iar mai apoi, să facem modulo la final. 

De multe ori, când adunăm două numere care sunt deja mai mici decât $mod$, este de preferat să evităm operația $\%$ de la final, pentru a optimiza calculul aritmetic, deoarece operatorul $\%$ este foarte încet. Mai jos puteți găsi un exemplu. 

```cpp
int sum = a+b;
if (sum >= mod) { // mult mai rapid decat %
    sum -= mod;
}
```

### Scăderea modulară 

!!! note "Observație"
    * $(a - b)\ \% \ mod = (a\ \% \ mod - b \ \% \ mod + mod) \ \% \ mod$. Practic, dacă scădem două numere și facem modulo, e același lucru cu a face modulo separat, iar mai apoi, să facem modulo la final. 
    
Spre deosebire de adunare, trebuie să adăugăm un $mod$ în cazul în care rezultatul devine negativ, deoarece spre deosebire de proprietățile matematice, operatorul $\%$ poate returna valori negative în limbajul C++. Adăugarea acestui mod ne va ajuta să avem rezultate non-negative. Implementarea va fi una asemănătoare cu cea de la adunare.

```cpp
int sum = a-b;
if (sum < 0) { // mult mai rapid decat %
    sum += mod;
}
```

### Înmulțirea modulară 

!!! note "Observație"
    * $(a \cdot b)\ \% \ mod = ((a \ \% \ mod) \cdot (b \ \% \ mod)) \ \% \ mod$. Practic, dacă înmulțim două numere și facem modulo, e același lucru cu a face modulo separat, iar mai apoi, să facem modulo la final. 
    
Deși nu putem optimiza calculul modulului, trebuie să fim atenți la posibilitatea ca rezultatul să nu devină mai mare decât valoarea maximă a tipurilor de date folosite în probleme (de regulă, tipul int). Folosirea valorii `1LL` (scrierea lui $1$ folosind tipul de date `long long`) rezolvă această problemă.

```cpp
long long sum = (1LL * a * b) % mod;
```

### Împărțirea (inversul) modular 

Împărțirea este cea mai grea operație de manevrat în cazul operațiilor modulare, recomandăm citirea articolului despre [invers modular](./modular-inverse.md) pentru mai multe detalii.

## Ridicarea la putere în timp logaritmic

Pentru a calcula expresia $a^n$, o primă variantă este aceea de a lucra folosind brute-force, complexitatea fiind $O(n)$.

```cpp
long long prod = 1;
for (int i = 1; i <= n; i++) {
    prod = (prod * a);
}
```

Totuși, nu am folosit încă o proprietate esențială pentru a optimiza calculul de mai sus.

!!! note "Observație"
    $a^b = \left(a^{\frac{n}{2}}\right)^2$ cu alte cuvinte, dacă $n$ este par, putem să aflăm $a^\frac{n}{2}$ și apoi să-l ridicăm la pătrat. 

Această proprietate ne va ajuta să deducem următorul mod de a calcula $a^n$ recursiv. 

$a^b$ este egal cu una din următoarele două expresii:

* $a^{n-1} \cdot a$, dacă $n$ este impar.
* $({a^\frac{n}{2}}) \cdot ({a^\frac{n}{2}})$, dacă $n$ este par.

Pentru $n = 0$, răspunsul este evident $1$. 

Astfel, prin împărțirile treptate la $2$ ale exponentului, reducem complexitatea la $O(\log n)$, unde $n$ este exponentul.

Acest algoritm se poate implementa atât recursiv, cât și iterativ, acestea fiind funcțiile folosite pentru problema [Exponentiation de pe CSES](https://cses.fi/problemset/task/1095/)

=== "Recursiv"

    ```cpp
    long long pw(long long a, long long n) {
        if (n == 0) {
            return 1;
        }
        if (n % 2 == 1) {
            return (a * pw(a, n-1)) % mod;
        }
        // n par
        long long x = pw(a, n/2);
        return (x*x) % mod;
    }
    ```

=== "Iterativ"

    ```cpp
    long long pw(long long a, long long n) {
        long long ans = 1;
        while (n > 0) {
            if (n % 2 == 1) { // alternativ, n&1
                ans = (ans * a) % mod;
            }
            a = (a * a) % mod;
            n = n / 2; // alternativ, n >>= 1
        }
        return ans;
    }
    ```

## Concluzii

Aritmetica modulară este esențială pentru înțelegerea calculelor de acest fel, care apar la foarte multe tipuri de probleme, precum cele la programarea dinamică, combinatorică sau matematică mai avansată. Ridicarea la putere în timp logaritmic este o rutină folosită și ulterior, în ceea ce privește algebra liniară și operații combinatoriale.

## Probleme suplimentare 

* [CSES Exponentiation II](https://cses.fi/problemset/task/1712)
* [Tema infogym](https://events.info.uaic.ro/infogim/2015/lectii/6/614.pdf)
* [modulo infoarena](https://www.infoarena.ro/problema/modulo)
* [puteri2 pbinfo](https://www.pbinfo.ro/probleme/843/puteri2)
* [Santa's bot Codeforces](https://codeforces.com/contest/1279/problem/D)

## Lectură suplimentară

* [Modular Arithmetic for Beginners Codeforces](https://codeforces.com/blog/entry/72527)
* [Modular arithmetic USACO Guide](https://usaco.guide/gold/modular?lang=cpp)
* [Modular arithmetic Wikipedia](https://en.wikipedia.org/wiki/Modular_arithmetic)
* [Ridicarea la putere in timp logaritmic - Sebastian Popa](https://vasiluta.ro/sebi/lgput)
