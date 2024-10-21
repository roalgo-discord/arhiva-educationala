---
tags:
    - matematica
    - combinatorica
    - multimi
    - implementare
---

**Autor**: Matei Ionescu

## Noțiuni introductive

În teoria numerelor, o funcție aritmetică este o funcție $f(n) : \mathbb{N} \to \mathbb{C}$. O funcție aritmetică exprimă proprietăți aritmetice pentru $n$.

Pentru $m, n$ numere prime între ele (adică $cmmdc(m, n) = 1$), avem două feluri de funcții aritmetice:

* funcții _aditive_, unde $f(mn) = f(n) + f(m)$;
* funcții _multiplicative_, unde $f(mn)$ = $f(m)f(n)$.

Pentru simplitate vom defini următoarele aspecte: 

* $[p] = 1$ dacă $p$ este o propoziție adevărată sau 0 în caz contrar.
* $\lfloor n \rfloor$ = partea întreagă a lui $n$.
    
Cât și următoarele proprietăți celebre:

* $\sum_{k = 1}^{N} \frac{1}{k} \approx \log{N}$.
* Șirul $ a_i = \lfloor \frac{N}{i} \rfloor $, cu $\leq N$, are $O(\sqrt N)$ valori distincte.

Pentru $\forall p \in \mathbb{N}$, $p$ număr prim, și $\forall k \in \mathbb{N}$, definim următoarele funcții multiplicative:

* funcția identică $I(p^k) = p^k$;
* funcția putere $P_a(p^k) = p^{ka}$, unde $a$ este constantă (nu confundăm cu funcția exponențiala $f_a(p^k) = a^{p^k}$);
* funcția unitate $U(p^k) = [p^k = 1]$;
* funcția divizorilor $\sigma (p^k)$ = numărul de divizori ai lui $p^k$; 
* indicatorul lui Euler $\varphi(p^k) $ = $p^{k} - p^{k-1}$, câte numere $x$, cu $1 \leq x \leq p^k$ și $cmmdc(x, p^k) = 1$ există 
* funcția Möbius $\mu(p^k) = [k = 0] - [k = 1]$.

!!! note "Definiție"

    Două funcții multiplicative , $f(n)$ și $g(n) $,  sunt identice dacă pentru oricare $p$ număr prim și oricare $k \geq 0$, $g(p^k) = f(p^k)$.

## Precalcularea funcțiilor multiplicative

În contextul nostru, vom lucra cel mai des cu funcții multiplicative, iar de cele mai multe ori avem nevoie să știm valorile unei funcții pentru un set mai larg de elemente. Și se dovedește că Ciurul învățat în clasa a 6-a este bun nu numai la aflarea numerelor prime.

\subsection{Ciurul lui Eratostene}

Acest algoritm este poate cel mai popular printre elevii de liceu și gimnaziu pentru a afla numerele prime într-un interval. 

```cpp
vector<int> ciur(N+1);
ciur[0] = ciur[1] = 1;
for (int i = 2; i <= N; i++) {
    if (ciur[i] == 0) { //numarul i este prim
        for (int j = 2 * i; j <= N; j += i) {
            ciur[j] = 1; //j se scrie ca i * p
        }
    }
}
```

La finalul programului, $k$ va fi număr prim doar dacă $\operatorname{ciur}(k) = 0$.

Complexitatea de timp este $O(\sum_{k=1}^N \frac{N}{k}) = O(N \log{N})$. 

### Ciur liniar

Observăm că fiecare număr compus $X$ este parcurs de către cel de-al doilea for de mai multe ori. Dacă am putea să iterăm prin fiecare număr compus exact o singură dată am ajunge la complexitatea de $O(N)$. Reținem într-un vector auxiliar numerele prime, și pentru un $i$ fixat vom parcurge numerele prime până când un număr prim  divide $i$.

```cpp

vector<int> prime;
vector<int> is_composite(N+1);

for (int i = 2; i <= n; i++) {
    if (!is_composite[i]) 
        prime.push_back(i);
    for (int j = 0; j < prime.size() && i * prime[j] <= n; j++) {
        is_composite[i * prime[j]] = 1;
        if (i % prime[j]) 
            break;
    }
}
```

!!! note "Demonstrație"

    Ca să demonstrăm faptul că ciurul de mai sus iterează prin fiecare număr compus exact odată avem nevoie de cel mai mic factor prim al acestuia, $p$. Să presupunem că $q = i \cdot p$. Pentru oricare $j > i$, $j$ este divizor a lui  $q$, presupunem ca $k = \frac{q}{j}$ este prim. Cum $i < j$, atunci $k < p$, însă $p$ este cel mai mic număr prim care divide $q$, deci nu există un astfel $k$. Deci odată luată în considerare perechea $(i, p)$,\, $i \cdot p$ va fi calculat doar o singură dată, transformând complexitatea finală în $O(N)$.

### Precalcularea indicatorului lui Euler folosind Ciurul Liniar

Pentru a calcula $\varphi(n)$ trebuie să luam în considerare $3$ cazuri:

* $n$ este prim $\Rightarrow \varphi(n) = n-1$
* $n = i \cdot p$ și $p \nmid i \Rightarrow \varphi(n) = \varphi(i) \varphi(p)$. _Prin $a \nmid b$ înțelegem : "a nu divide pe b"_.
* $n = i \cdot p$ și $p \mid i$. Acest caz este uneori greu de tratat, dar din fericire știm sigur că $\varphi(ip) = p\varphi(i)\ \forall i, p$.

```cpp

vector<int> prime;
vector<int> phi(N), compus(N);
phi[1] = 1;
for (int i = 2; i <= N; i++) {
    if (!compus[i]) {
        prime.push_back(i);
        phi[i] = i - 1;
    }
    for (int j = 0; j < prime.size() && i * prime[j] <= N; j++) {
        compus[i * prime[j]] = 1;
        if (i % prime[j]) {
            phi[i * prime[j]] = phi[i] * phi[prime[j]];
        }
        else {
            phi[i * prime[j]] = prime[j] * phi[i];
        }
    }
}
```

### Generalizare a ciurului liniar

Totuși, putem să generalizăm algoritmul prezentat mai sus pentru a funcționa pentru oricare funcție multiplicativă.
Fie $sml(n) = $ puterea celui mai mic factor din descompunerea în factori primi a lui $n$. Pentru oricare $i$ și $p$, $p$ cel mai mic număr prim care divide $i$, putem scrie $f(ip) = f(\frac{i}{p^{sml(i)}}) \cdot f(p^{sml(i) + 1})$.

```cpp
vector<int> prime, phi(N+1), compus(N+1), sml(N+1);
phi[1] = 1;
for (int i = 2; i <= N; i++) {
    if (!compus[i]) {
        prime.push_back(i);
        phi[i] = i - 1;
        sml[i] = 1;
    }
    for (int j = 0; j < prime.size() && i * prime[j] <= N; j++) {
        compus[i * prime[j]] = 1;
        if (i % prime[j]) {
            phi[i * prime[j]] = phi[i] * phi[prime[j]];
            sml[i * prime[j]] = 1;
        }
        else {
            phi[i * prime[j]] = (phi[i] / (pow(prime[j], sml[i]) - pow(prime[j], sml[i] - 1)));
            phi[i * prime[j]] *= (pow(prime[j], sml[i] + 1) - pow(prime[j], sml[i]));
            sml[i * prime[j]] = sml[i] + 1;
        }
    }
}
```

!!! note "Atenție"

    Funcția pow din cod este o funcție scrisă de mână. Nu recomandăm folosirea funcției pow din cmath, din cauza erorilor de precizie. 

Gândim similar pentru funcția Möbius: 

* $n$ prim $\Rightarrow \mu(n) = -1$
* $n = i \cdot p$, $p \nmid i \Rightarrow~\mu(n) = \mu(i) \cdot \mu(p)$
* $n = i \cdot p$, $p \mid i \Rightarrow~\mu(n) = \frac{\mu(i)}{[sml(i)=0]-[sml(i)=1]} \cdot ([sml(i)+1=0]-[sml(i)+1=1])$.

!!! note "Observație"
    În cazul în care fracția de mai sus nu este definită (numitorul este $0$), putem spune din start că $\mu(n) = 0$.
    
```cpp

vector<int> prime;
vector<int> sml(N), mobius(N), composite(N);

mobius[1] = 1;
for (int i = 2; i < N; i++) {
    if (!composite[i]) {
        prime.push_back(i);
        mobius[i] = -1;
        sml[i] = 1;
    }
    for (int j = 0; j < prime.size() && i * prime[j] < N; j++) {
        composite[i * prime[j]] = 1;
        if (i % prime[j]) {
            mobius[i * prime[j]] = mobius[i] * mobius[prime[j]];
            sml[i * prime[j]] = 1;
        }
        else {
            int cltr = (sml[i] == 0) - (sml[i] == 1);
            int pl = (sml[i] + 1 == 0) - (sml[i] + 1 == 1);
            if (cltr == 0) {
                mobius[i] = 0;
            }
            else {
                mobius[i * prime[j]] = (mobius[i] / cltr) * pl;
            }
            sml[i * prime[j]] = sml[i] + 1;
        }
    }
}
```

### Implementare mai populară

Rareori avem nevoie de ciur liniar, și dacă nu intră în timp $O(N \log{N})$ pentru precalculare, de ce ar intra $O(N)$? 

```cpp
vector<int> phi(N), mobius(N);
phi[1] = mobius[1] = 1;

for (int i = 2; i < N; i++) {
    phi[i] = i-1;
}
for (int i = 1; i < N; i++) {
    for (int j = 2 * i; j < N; j+=i) {
        mobius[j] -= mobius[i];
        if (i > 1) {
            phi[j] -= phi[i];
        }
    }
}
```

## Inversiunea lui Möbius

Ultimele din cele $3$ funcții prezentate la începutul articolului sunt mai cunoscute ca restul, însă noi ne vom folosi cel mai mult de ultimele $2$, anume indicatorul lui Euler și funcția Möbius.

Fie $g(n)$ = $\sum_{d\mid n} f(d)$. Inversiunea lui Möbius ne spune:
$$
    f(n) = \sum_{d\mid n} g(d) \cdot \mu \left(\frac{n}{d}\right)
$$
Cu toate astea, o proprietate mai importantă este $\sum_{d\mid n} \mu(d) = U(n)$. Ceea ce sugerează expresia este că pentru oricare număr natural $n$ suma va da $1$ doar dacă $n = 1$. Pare nesemnificativă proprietatea, însă este foarte utilă în rezolvarea multor probleme de informatică.

**Exercițiu $1$:** Calculează câte perechi $(a,b)$ ($1 \leq a,b \leq n$) există cu proprietatea că $gcd(a,b) = 1$.

Rezolvare: Noi trebuie să calculăm $\sum_{i=1}^{n} \sum_{j=1}^{n} [cmmdc(i, j) = 1]$. Ne putem folosi de proprietatea de mai sus și să scriem relația astfel: 
$$
    \sum_{i=1}^{n} \sum_{j=1}^{n} \sum_{d \mid cmmdc(i,j)} \mu(d)
$$
Iterăm prin toate numerele $\leq n$ în loc de divizorii lui $n$ și obținem 
$$
    \sum_{i=1}^{n} \sum_{j=1}^{n} \sum_{d = 1}^{n} \mu(d) \cdot [d\mid cmmdc(i,j)] = \sum_{i=1}^{n} \sum_{j=1}^{n} \sum_{d = 1}^{n} \mu(d) \cdot [d\mid i] \cdot [d\mid j]
$$
Rearanjăm termenii și obținem
$$
    \sum_{d=1}^{n} \mu(d) \left(\sum_{i=1}^{n} [d\mid i]\right) \left(\sum_{j=1}^{n} [d\mid j]\right)
$$
Observăm că 
$$
    \sum_{i=1}^{n} [d\mid i] = \sum_{j=1}^{n} [d\mid j] = \left\lfloor \frac{n}{d} \right\rfloor
$$ 

deci relația finală devine $\sum_{d=1}^{n} \mu(d) \cdot (\frac{n}{d})^2$, care poate fi calculată în \bigO{n}.

**Exercițiu $2$:** Calculează câte perechi $(a,b)$ exisă, astfel încât $1 \leq a,b \leq n$ și $cmmdc(a, b)$ = $P$.

Rezolvare: 

$$
    \sum_{i=1}^{n} \sum_{j=1}^{n} [cmmdc(i,j) = P] = \sum_{i=1}^{\frac{n}{P}} \sum_{j=1}^{\frac{n}{P}} [cmmdc(i,j) = 1]
$$

Observăm că e identic cu exercițiul precedent, rezultatul fiind $\sum_{d=1}^{\frac{n}{P}} \mu(d) \cdot \left(\frac{n}{dP}\right)^2$.\\


**Exercițiul $3$:** Calculează $\sum_{1 \leq i,j \leq N} lcm(i,j)$, unde $lcm(i,j) = $ cel mai mic multiplu comun al numerelor $i$ și $j$.

Rezolvare: Știm totuși că $lcm(i,j) = \dfrac{i\cdot j}{cmmdc(i,j)}$, astfel problema ne cere să calculăm suma:
$$
    \sum_{1 \leq i, j \leq N} \dfrac{i \cdot j}{cmmdc(i,j)}
$$
Pentru a ne ușura calculul, putem defini:
$$
    f(k) = \sum_{1 \leq i, j \leq N} \dfrac{i \cdot j}{cmmdc(i,j)} \cdot [cmmdc(i,j) = k]
$$
Observăm deci că dacă știm suma produselor $i \cdot j$, cu $cmmdc(i,j) = k$, fie această sumă $p(k)$, atunci rezultatul devine:
$$
    f(k) = \dfrac{p(k)}{k}
$$
Pentru a calcula $p(k)$ ne putem folosi de funcția mobius astfel:

$$
    p(k) = \sum_{1 \leq i,j \leq N} i \cdot j \cdot [cmmdc(i,j) = k]\\ 
    = \sum_{a = 1}^{\frac{N}{k}} \sum_{b = 1}^{\frac{N}{k}} a \cdot b \cdot k^2 \cdot [cmmdc(a,b) = 1]\\
    = \sum_{a = 1}^{\frac{N}{k}} \sum_{b = 1}^{\frac{N}{k}} a \cdot b \cdot k^2 \cdot \sum_{d = 1}^{\frac{N}{k}} \mu(d) \cdot [d \mid a] \cdot [d\mid b]\\
    = k^2 \cdot \sum_{d=1}^{\frac{N}{k}} \mu(d) \cdot \left(\sum_{a = 1}^{\frac{N}{k}} a \cdot [d \mid a] \right) \cdot \left(\sum_{b=1}^{\frac{N}{k}} b \cdot [d \mid b] \right)\\ 
$$

Observăm că:
$$
    \sum_{a=1}^{\frac{N}{k}} a \cdot [d \mid a] = \sum_{b=1}^{\frac{N}{k}} b \cdot [d \mid b] = \left(d \cdot (1 + 2 + \dots + \frac{N}{kd}) \right) ^ 2 = \left( d \cdot \dfrac{\frac{N}{kd} \cdot (\frac{N}{kd} + 1)}{2} \right) ^ 2
$$
Deci:
$$
    p(k) = k^2 \cdot \sum_{d = 1}^{\frac{N}{k}} \mu(d) \cdot \left( d \cdot \dfrac{\frac{N}{kd} \cdot (\frac{N}{kd} + 1)}{2} \right) ^ 2
$$
Revenim la problema noastră inițială:
$$
    f(k) = \frac{p(k)}{k} = k \cdot \sum_{d = 1}^{\frac{N}{k}} \mu(d) \cdot \left( d \cdot \dfrac{\frac{N}{kd} \cdot (\frac{N}{kd} + 1)}{2} \right) ^ 2
$$
Iar răspunsul final este $\sum_{k=1}^{N} f(k)$, care este calculabil în $O(N \log N)$.

## Probleme propuse spre rezolvare

### Problema [sumgcd](https://kilonova.ro/problems/2004) de pe Kilonova

Pentru $N$ și $M$ date la tastatură, trebuie să calculați $\sum_{V} cmmdc(V)$, unde $V$ reprezintă un $M$-tuplu. Un $M$-tuplu reprezintă o mulțime de $M$ elemente nu neapărat distincte cu valori cuprinse între 1 și $N$. Formal, noi trebuie să calculam $\sum_{i_1 = 1}^{N} \sum_{i_2 = 1}^{N} \dots \sum_{i_M = 1}^{N} cmmdc(i_1, i_2, \dots, i_M)$.

Dacă pentru un $K$ fixat aflăm câte M-tupluri există cu \cmmdc-ul egal cu $K$, atunci putem rezolva foarte ușor problema. Fie $f(K)$ numărul de tupluri $(m, n)$ pentru care $cmmdc(m, n) = K$:
$$
    f(K) = \sum_{i_1 = 1}^{N} \sum_{i_2 = 1}^{N} \dots \sum_{i_M = 1}^{N} [cmmdc(i_1, i_2, \dots, i_M) = K] \Leftrightarrow \\
    \Leftrightarrow f(k) = \sum_{i_1 = 1}^{\frac{N}{K}} \sum_{i_2 = 1}^{\frac{N}{K}} \dots \sum_{i_M = 1}^{\frac{N}{K}} [cmmdc(i_1, i_2, \dots, i_M) = 1] \Leftrightarrow\\
    \Leftrightarrow f(k) = \sum_{i_1 = 1}^{\frac{N}{K}} \sum_{i_2 = 1}^{\frac{N}{K}} \dots \sum_{i_M = 1}^{\frac{N}{K}} \sum_{d = 1}^{\frac{N}{K}} \mu(d) \cdot [d\mid i_1] \cdot \dots \cdot [d\mid i_M] \Leftrightarrow\\
    \Leftrightarrow f(k) = \sum_{d = 1}^{\frac{N}{K}} \mu(d) \cdot \left(\sum_{i_1 = 1}^{\frac{N}{K}} [d\mid i_1]\right) \cdots \left(\sum_{i_M = 1}^{\frac{N}{K}} [d\mid i_M]\right) \Leftrightarrow\\
    \Leftrightarrow f(k) = \sum_{d = 1}^{\frac{N}{K}} \mu(d) \cdot \left(\frac{N}{Kd}\right)^M.
$$

Rezultatul problemei este dat de $\sum_{i=1}^{N} f(i) \cdot i$. Complexitatea de timp pentru a calcula $f(K)$ este \bigO{\frac{N}{K}\log{M}}, astfel complexitatea finală  este 
$$
    \sum_{i=1}^{N} O(\frac{N}{i} \log{M})
    = O(\left(N + \frac{N}{2} + \frac{N}{3} + \cdots + \frac{N}{N}\right) \log{M})\\
    = O(N \left(1 + \frac{1}{2} + \frac{1}{3} + \cdots + \frac{1}{N}\right) \log{M})\\
    = O(N\log{N}\log{M}).
$$

Altă soluție este următoarea: 

Vom pune pe cele $M$ poziții doar multiplii de $K$, astfel se formează $M^{\lfloor\frac{N}{K} \rfloor}$ șiruri posibile, dintre care scădem $f(K \cdot Q), Q \geq 1$.
$$
    f(K) = M^{\left\lfloor \frac{N}{K} \right\rfloor} - \sum_{K\mid i} f(i)\\
    = M^{\left\lfloor \frac{N}{K} \right\rfloor} - \sum_{i=1}^{N} f(i) \cdot [K\mid i] \\
    = M^{\left\lfloor \frac{N}{K} \right\rfloor} - \sum_{i=1}^{\frac{N}{K}} f(K \cdot i)
$$

Complexitatea devine:
$$
    \sum_{i=1}^{N} O(\left\lfloor \frac{N}{i} \right\rfloor + \log{M}) = O(N \left(1 + \frac{1}{2} + \frac{1}{3} + \dots \frac{1}{N}\right) + N \log{M})
    = O(N \log{N} + N \log{M}) \\ 
    = O(N\left(\log{N} + \log{M}\right))
    = O(N\log{(MN)})
$$
Putem precalcula puterile lui $M$, obținem astfel $O(N \log{N})$.

Ambele iau $100$ puncte.

### Problema [cntgcd](https://kilonova.ro/problems/372)

Se dau două numere naturale $N$ și $D$. Calculați câte perechi de numere $A$ și $B$ mai mici ca $N$ există, astfel încât $cmmdc(A,B) = D$. Perechea $(A,B)$ = $(B, A)$.

Putem să luăm rezultatul de la primul exercițiu, pentru că probleme sunt echivalente. Singura restricție este faptul că perechea $(A,B)$ = $(B,A)$, dar putem efectiv să împărțim rezultatul la 2.
$$
ans = \frac{\sum_{d=1}^{\frac{N}{D}} \mu(d) \cdot \left(\frac{N}{dD}\right)^2 + 1}{2}
$$
Soluția ia undeva la $45$ puncte, datorită faptului că $D \leq N \leq 10^9$.

Fie $f(n)$ = numărul de perechi $(A,B)$, unde $cmmdc(A,B) = 1$. Noi trebuie să calculăm practic $f(\left\lfloor \frac{N}{D} \right\rfloor ) = \sum_{d = 1}^{\left\lfloor \frac{N}{D} \right\rfloor } \varphi(d)$.

Pentru $N \leq 10^6$ putem calcula suma brut. Pentru $N > 10^6$ putem elimina perechile care au cmmdc-ul 2, 3 etc.
$$
    f(n) = \frac{n^2 - n}{2} - \sum_{d=2}^{n} f\left(\lfloor \frac{n}{d} \rfloor\right)
$$

Datorită faptului că șirul $a_i = \lfloor \frac{N}{i} \rfloor$ are $O(\sqrt{N})$ elemente diferite, putem doar să calculăm câte numere $d_1$ există, astfel încât $\frac{n}{d} = \frac{n}{d_1}$ și să adunăm la rezultat $f(\lfloor \frac{n}{d} \rfloor) \cdot nr$.

!!! note "Observație"
    Fie $d$ = cel mai mic număr astfel încât $\frac{n}{d} = x$. Atunci cel mai mare număr care îndeplinește aceeași proprietate este $\left\lfloor \frac{n}{\lfloor \frac{n}{d} \rfloor} \right\rfloor$.

```cpp
long long f (long long n) {
    //cout << n << '\n';
    if (n <= 1000000) {
        return sum_phi[n]; //phi(1) + phi(2) + ... + phi(n)
    }
    if (dp[n]) {
        return dp[n];
        //am calculat deja rezultatul pt n
    }
    long long ans = 1LL * (1LL * n * (n + 1)) / 2; 
    for (int i = 2, dr; i <= n; i = dr + 1) {
        dr = (n / (n / i));
        if (dr > n) {
            break;
        }
        ans -= (dr - i + 1) * f(n / i);
    }
    dp[n] = ans;
    return ans;
}
```

Complexitatea algoritmului de mai sus este foarte interesantă, ea fiind $O(N^\frac{2}{3})$.

### Problema [tupleco](https://kilonova.ro/problems/1820)

Se dau două numere $K$ și $N$. Să se afle $T$, numărul de tupluri formate din $K$ elemente $(X_1, X_2, X_3, \dots , X_K)$ cu proprietatea că:

* $1 \leq X_1 \leq X_2 \leq \dots \leq X_K \leq N$.
* $cmmdc(X_1, X_2, \dots, X_K) = 1$.

#### Soluție de $75 \rightarrow 80$ (sau chiar $100$) de puncte:

Ne vom folosi de funcția Möbius pentru a calcula rezultatul. Dacă facem abstracție de prima proprietate, răspunsul nostru devine:
$$
    \sum_{d=1}^{N} \mu(d) \cdot \lfloor \frac{N}{d} \rfloor ^K
$$

Ce înseamnă însă $\lfloor \dfrac{N}{d} \rfloor ^ K$? Reprezintă numărul de șiruri de lungime $K$ , unde $X_i$ este multiplu de $d$. Ca să numărăm doar numărul de șiruri care sunt sortate, ne vom folosi de _Stars and Bars_, astfel numărul de șiruri $(X_1, X_2, X_3, .. ,X_K)$ cu $X_i \leq X_{i+1} \leq N$ este egal cu $N-K+1 \choose K$. 

Rezultatul nostru devine: 
$$
    \sum_{d=1}^{N} \mu(d) \cdot {\left\lfloor \frac{N}{d} \right\rfloor - K + 1 \choose K}
$$
Soluția rulează în $O(N)$ cu $O(N)$ sau $O(N \cdot \log N)$ precalcularea.

```cpp
#include <bits/stdc++.h>
using namespace std;
const int N = 1e7 + 1, mod = 3000017;
int n, k;
ifstream fin ("tupleco.in");
ofstream fout ("tupleco.out");
#define cin fin
#define cout fout
long long C (int n, int k, vector<long long> &f, vector<long long> &invf) {
    return (1ULL * f[n] * (1ULL * invf[k] * invf[n - k] % mod) % mod) % mod;
}
int main() {
    cin.tie(0)->sync_with_stdio(0);
    cin >> k >> n;
    vector<long long> f(n + k + 1), inv(n + k + 1), invf(n + k + 1);
    vector<short> mobius(n + 1);
    f[0] = f[1] = inv[0] = inv[1] = invf[0] = invf[1] = 1;
    for (int i = 2; i <= n + k; i++) {
        f[i] = (1ULL * f[i - 1] * i) % mod;
        inv[i] = (1ULL * inv[mod % i] * (mod - mod / i)) % mod;
        invf[i] = (1ULL * invf[i - 1] * inv[i]) % mod;
    }

    mobius[1] = 1;
    for (int i = 1; i <= n; i++) {
        if (mobius[i]) {
            for (int j = i + i; j <= n; j += i) {
                mobius[j] -= mobius[i];
            }
        }
    }

    long long ans = 0;
    for (int d = 1; d <= n; d++) {
        int lt = n / d;
        long long plt = C(lt + k - 1, k, f, invf);
        if (mobius[d] == -1) {
            ans = (1ULL * ans + mod - plt) % mod;
        }
        else 
            if (mobius[d] == 1) {
                ans = (1ULL * ans + plt) % mod;
            }
    }
    cout << ans;
}
```

#### _Ok, dar putem mai bine?_

Ne folosim de ideea prezentată la problema anterioară.
$$
    f(n) = {n-k+1 \choose k} - \sum_{d=2}^{n} f\left(\left\lfloor \frac{n}{d} \right\rfloor \right).
$$

!!! note "Observație"

    Deducem cu puternicele noastre simțuri că modulul ($M$)  în problema asta este mult mai mic decât $N$, astfel putem să calculăm combinările mult mai rapid:

* $n \leq M \rightarrow$ putem precalcula combinările în $O(M)$.
* $\displaystyle n > M \rightarrow {n \choose k} \
     \ \text{modulo} \ \  M = {\lfloor \frac{n}{mod} \rfloor \choose \lfloor \frac{k}{mod} \rfloor} \cdot {n \bmod M \choose k \bmod M} \ \  \text{modulo} \ \ M$

```cpp
#include <bits/stdc++.h>
using namespace std;
const int mod = 3e6 + 17, N = 1e6 + 2;
ifstream fin ("tupleco.in");
ofstream fout ("tupleco.out");
#define cin fin
#define cout fout
struct Mint {
    int val;
    Mint (int x = 0) {
        val = x % mod;
    }
    Mint (long long x) {
        val = x % mod;
    }
    Mint operator+(Mint oth) {
        return val + oth.val;
    }
    Mint operator*(Mint oth) {
        return 1LL * val * oth.val;
    }
    Mint operator-(Mint oth) {
        return val - oth.val + mod;
    }
    Mint fp (Mint a, long long n){
        Mint p = 1;
        while (n) {
            if (n & 1) {
                p = p * a;
            }
            a = a * a;
            n /= 2;
        }
        return p;
    }
    Mint operator/(Mint oth) {
        Mint invers = fp(oth, mod - 2);
        return 1LL * val * invers.val;
    }
    friend ostream &operator<<(ostream &os, const Mint &lol) {
        os << lol.val;
        return os;
    }
};
vector<Mint> f(mod), invf(mod), inv(mod);
Mint C (int n, int k) {
    if (n < 0 || k < 0 || n < k)
        return 0;
    if (n >= mod) {
        return C(n / mod, k / mod) * C(n % mod, k % mod);
    }
    return f[n] * invf[n - k] * invf[k];
}
int n, k;
unordered_map<int, Mint> mp;
Mint fr(int n) {
    if (mp[n].val) {
        return mp[n];
    }
    int dr = 2;
    Mint total = C(n + k - 1, k);
    while (dr <= n) {
        int ptr = n / (n / dr);
        int lt = n / dr;
        total = total - (fr(lt) * (ptr - dr + 1));
        dr = ptr + 1;
    }
    mp[n] = total;
    return total;
}
int main() {
    f[0] = f[1] = inv[0] = inv[1] = invf[1] = invf[0] = 1;
    for (int i = 2; i < mod; i++) {
        f[i] = f[i - 1] * i;
        inv[i] = inv[mod % i] * (mod - mod / i);
        invf[i] = invf[i - 1] * inv[i];
    }

    cin >> k >> n;
    cout << fr(n);
}
```

## Probleme suplimentare

* [ONI 2021 Baraj Seniori Pastile](https://kilonova.ro/problems/69)
* [Lot 2023 Juniori countall](https://kilonova.ro/problems/640)
* [RoAlgo Contest #8 Gya-chan and the gcd operation](https://kilonova.ro/problems/2017)
* [USACO Gold Cowpability](https://usaco.org/index.php?page=viewproblem2&cpid=862)
* [Listă de probleme cu Mobius](https://vjudge.net/contest/151569)
* [Sum of gcd of Tuples (Hard)](https://atcoder.jp/contests/abc162/tasks/abc162_e)
    

### Bibliografie și lectură suplimentară

* [Math note — Möbius inversion](https://codeforces.com/blog/entry/53925)
* [Möbius Function](https://usaco.guide/plat/PIE?lang=cpp#mobius-function)
* [Prefix Sums of Multiplicative Functions](https://usaco.guide/adv/multiplicative?lang=cpp) 
* [Möbius inversion formula](https://en.wikipedia.org/wiki/M%C3%B6bius_inversion_formula) 

