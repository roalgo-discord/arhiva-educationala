---
id: intro-combinatorics
authors: [stefdasca, stalecu]
prerequisites:
    - pow-log
    - modular-inverse
    - pinex
tags:
    - matematica
    - combinatorica
    - teoria numerelor
    - permutari
    - aranjamente
    - combinari
---

Combinatorica este una din ramurile principale ale matematicii, precum și una
din cele patru ramuri din care se dau problemele de la olimpiada internațională
de matematică (IMO) celelalte fiind algebra, teoria numerelor și geometria. În
algoritmică și în programarea competitivă, combinatorica se regăsește în
probleme de nivel mediu și ridicat, aplicațiile diverselor formule matematice,
precum și tehnicile de rezolvare ale problemelor de combinatorică fiind un pas
important spre desăvârșirea abilităților de rezolvare a problemelor algoritmice,
deoarece spre deosebire de alte capitole, combinatorica este mai greu de
antrenat, iar experiența căpătată prin rezolvarea problemelor se va dovedi a fi
una crucială.

În acest capitol vom prezenta cele mai importante formule specifice
combinatoricii, o serie de identități și relații care sunt folosite în foarte
multe probleme de algoritmică, precum și diverse tehnici care au scopul să vă
ajute pentru a putea înțelege formulele necesare, precum și să vă ajute pentru a
putea rezolva problemele de acest fel într-un mod cât mai ușor și intuitiv. În
cadrul olimpiadelor și concursurilor de informatică din România, combinatorica
se regăsește drept parte esențială în două competiții - lotul de juniori și
olimpiada clasei a zecea. Ulterior, poate să se regăsească și ca subprobleme la
probele ulterioare de seniori, într-o măsură mai mică.

Pentru a putea parcurge acest capitol, recomandăm citirea în prealabil a
articolelor despre [aritmetica modulară](./pow-log.md),
[divizibilitate](../usor/divisibility.md) și în general să aveți o înțelegere a
conceptelor matematice din capitolele anterioare. Va fi foarte importantă și
înțelegerea conceptului de invers modular, deoarece deși în cele mai multe
probleme vom avea de-a face cu modulo numere prime, uneori va trebui să știm să
implementăm și algoritmul de aflare al [inversul modular](./modular-inverse.md).

## Noțiuni teoretice fundamentale

Pe lângă capitolele menționate anterior, vrem să începem prin a explica anumite
fundamente, care ne vor ajuta mult pe parcurs.

### Regula sumei și a produsului

Presupunem pentru următoarele două reguli că avem două mulțimi $A$ și $B$
disjuncte (adică $A\cap B =\emptyset$), având cardinalul $|A| = n$ și $|B| = m$.

!!! info "Regula sumei"

    Numărul de moduri de a alege o valoare din $A$ sau $B$ este $n+m$.

!!! info "Regula produsului"

    Numărul de moduri de a alege o pereche de valori, una din $A$ și una din $B$
    este $n\cdot m$.

!!! example "Exemplu"

    Câte numere de forma $\overline{aba}$ cu $a \neq 0$ i $a \neq b$ există?

    Valorile posibile pentru $a$ sunt ${1, 2, 3, \dots, 9}$, iar valorile
    posibile ale lui $b$ sunt ${0, 1, 2, 3, \dots, 9}$.

    Avem 9 variante de a alege o valoare pentru $a$, iar pentru $b$ avem tot
    9 variante (10, din care excludem cea egala cu $a$), astfel numărul
    total de variante este $9 \cdot 9 = 81$.

Aceste relații vor fi foarte importante mai ales când avem de-a face cu formule
independente care contribuie la răspunsul final.

### Permutări

!!! info "Permutare"

    O permutare a unei mulțimi reprezintă o aranjare a elementelor dintr-o
    mulțime $M$ finită într-o ordine diferită. Dacă cardinalul mulțimii $|M| =
    n$, numărul de permutări ale unei mulțimi de $n$ valori este $n!$.

    De exemplu, pentru $n = 3$, cele 6 permutări ale mulțimii $\{1, 2, 3\}$
    sunt următoarele: $\{1, 2, 3\}$, $\{1, 3, 2\}$, $\{2, 1, 3\}$, $\{2, 3,
    1\}$, $\{3, 1, 2\}$, $\{3, 2, 1\}$

În probleme, există diverse cazuri particulare ale permutărilor care devin
foarte utile în rezolvarea unor probleme de combinatorică.

!!! info "Deranjamente"

    Un deranjament este o permutare fără puncte fixe, adică $\forall i$,
    $p_i\neq i$.

    Numărul de deranjamente cu $n$ elemente este egal cu $D_n = (n-1)\cdot
    (D_{n-1} + D_{n-2})$, unde $D_0 = 1$ și $D_1 = 0$. Acest concept a fost util
    printre altele la rezolvarea problemei
    [Poseidon](https://kilonova.ro/problems/2506), dată la OJI 2024, clasa a
    X-a.

!!! info "Permutări cu repetiții"

    Definim o permutare cu repetiții ca fiind o secvență de $n$ numere, care are
    proprietatea că fiecare valoare este în intervalul $[1, n]$ și valorile se
    pot repeta. Numărul de permutări cu repetiție cu aceste proprietăți care au
    $n$ elemente este

    $$ \frac{n!}{F_1!\cdot F_2!\cdot\dots\cdot F_n!} = n!\prod_{k =
    1}^{n}\frac{1}{F_k!} $$
    
    unde $F_i$ reprezintă frecvența la care apare $i$ în permutare. Acest
    concept se regăsește într-un număr de probleme date în special la loturile
    de juniori.

Mai jos puteți găsi o secvență de cod pe care o putem folosi pentru a genera
toate permutările unui șir. Funcția `#!cpp std::next_permutation` nu va genera
permutări cu repetiție dacă acestea apar de mai multe ori.

```cpp
vector<int> v(10);

int i = 1;

for (auto& x : v) {
    x = i++;
}

do {
    afiseaza(v);
} while (next_permutation(v.begin(), v.end()));
```

### Submulțimi

O submulțime a unui număr constă în alegerea unui număr de elemente dintr-o
mulțime $M$. Numărul de submulțimi ale lui $M$ este egal cu $2^{|M|}$, deoarece
pentru fiecare element al mulțimii, putem alege dacă să îl includem în
submulțimea pe care vrem să o creăm sau nu.

Dacă mulțimea $M$ este egală cu $\{0, 1, 1\}$, cele 8 submulțimi ale ei sunt
următoarele: $\emptyset$, $\{0\}$, $\{0, 1\}$, $\{0, 1, 2\}$, $\{0, 2\}$,
$\{1\}$, $\{1, 2\}$, $\{2\}$.

Pentru a putea itera prin toate submulțimile unei mulțimi date, ne putem folosi
de faptul că fiind $2^n$ asemenea submulțimi, putem identifica fiecare
submulțime folosind una din reprezentările binare ale numerelor de la 0 la
$2^n - 1$, tehnică numită colocvial bitmasks sau măști pe biți. Pentru a vedea
dacă trebuie să folosim unul din numere sau nu, trebuie doar verificat pentru o
submulțime dată dacă bitul corespunzător acelei poziții este setat sau nu în
masca pe care o verificăm. Pentru mai multe detalii, puteți vedea codul de mai
jos.

```cpp
const int totalSubsets = 1 << n; // 2^n

for (int mask = 0; mask < totalSubsets; ++mask) {
    vector<int> subset;

    for (int idx = 0; idx < n; ++idx) {
        if (mask & (1 << idx)) { // (1)
            subset.push_back(idx);
        }
    }
        
    process(subset);
}
```

1. Dacă bitul din mască la poziția $idx$ este setat, înseamnă că elementul de la
   indice este prezent și deci adăugăm indicele în submulțime.

### Aranjamente

Un aranjament de $n$ elemente luate câte $k$ reprezintă o submulțime ordonată a
lui $A$ de $k$ elemente. De exemplu, aranjamente de 4 luate câte 3 ale
mulțimii $\{1, 2, 3, 4\}$ sunt următoarele: $\{1, 2, 3\}$, $\{1, 2, 4\}$, $\{1,
3, 4\}$, $\{2, 1, 3\}$, $\{2, 1, 4\}$, $\{2, 3, 4\}$, $\{3, 1, 2\}$, $\{3, 1,
4\}$, $\{3, 2, 4\}$, $\{4, 1, 2\}$, $\{4, 1, 3\}$, $\{4, 2, 3\}$

Similar permutărilor, aranjamentele pot fi considerate funcții injective
definite pe mulțimea $\{1, 2, 3,\dots, k\}$ cu valori în $\{1, 2, 3,\dots, n\}$

Numărul aranjamentelor de $n$ luate câte $k (k\leq n)$ se notează cu $A_n^k$ și
este egal cu $\frac{n!}{(n-k)!}$

O altă formulă care poate fi utilă în special în cazul precalculărilor este
$A_n^k = (n - k + 1)\cdot A_n^{k-1}$

### Combinări

O combinare de $n$ elemente luate câte $k$ reprezintă o submulțime neordonată a
lui $A$ de $k$ elemente. De exemplu, combinările de 4 luate câte 3 ale
mulțimii $\{1, 2, 3, 4\}$ sunt următoarele: $\{1, 2, 3\}$, $\{1, 2, 4\}$, $\{1,
3, 4\}$, $\{2, 3, 4\}$

Se poate observa că spre deosebire de aranjamente, dacă două mulțimi au aceleași
elemente dar într-o ordine diferită, se numără o singură dată.

Formula pentru combinări de $n$ luate câte $k$, care se notează cu $C_n^k$
(alternativ, veți mai putea găsi notații precum ${}_{n}C_{k}$, $C(n, k)$ sau
$\binom{n}{k}$ este $$ C_n^k = \frac{n!}{k!\cdot (n-k)!} $$ unde $C_0^0 = C_n^n
= 1$.

Există numeroase moduri și proprietăți de a lega valoarea lui $C_n^k$ de alte
valori combinatoriale, cele mai importante fiind următoarele:

- $C_{n}^{k} =C_{n-1}^{k} +C_{n-1}^{k-1}$, deoarece:

$$ \begin{align*} C_n^k &= \frac{n!}{k! (n-k)!}\\ &= \frac{n(n - 1)!}{k!
(n-k)!}\\ &= \frac{k(n - 1)!}{k! (n - k)!} + \frac{(n-k)(n - 1)!}{k! (n - k)!}\\
&= \frac{(n - 1)!}{(k - 1)! (n - k)!} + \frac{(n - 1)!}{k! (n - k - 1)!}\\ &=
C_{n-1}^{k-1} +C_{n-1}^{k} \end{align*} $$

- Dacă simplificăm fracțiile din formula de mai sus, putem scrie $C_n^k$ ca
  fiind
  $$C_n^k = \prod_{i=1}^{k}\frac{n-i+1}{i} =\frac{(n-k+1)\cdot (n-(k - 1)
  + 1)\cdots(n-1)\cdot n}{1\cdot 2\cdot 3\cdots\cdot k}$$
- $C_{n}^{k} = C_{n}^{n-k}$, fapt ce se poate observa din aplicarea formulei
  specifice.
- $\sum_{i=0}^{n} C_n^i = 2^n$

De multe ori, pentru a calcula combinările, vom folosi [triunghiul lui
Pascal](https://en.wikipedia.org/wiki/Pascal%27s_triangle) drept precalculare,
fapt ce îl putem realiza cu ajutorul formulei de mai sus care leagă $C_{n}^{k}$
de $C_{n-1}^{k}$ și $C_{n-1}^{k-1}$.

```cpp
const int N = 1000;

int C[N + 1][N + 1];

C[0][0] = 1;

for (int n = 1; n <= N; n++) {
    C[n][0] = 1;

    for (int k = 1; k <= n; k++) {
        if (n == k) {
            C[n][k] = 1;
        } else {
            C[n][k] = C[n-1][k] + C[n-1][k-1];
        }
    }
}
```

Există o metodă mai eficientă de a calcula $C_n^k$ în timp $\mathcal{O}(k)$ și spațiu
$\mathcal{O}(1)$:

```cpp
const long long C(int n, int k) {
    long long res = 1;

    // C(n, k) = C(n, n-k)
    if (k > n - k) {
        k = n - k;
    }

    for (int i = 0; i < k; ++i) {
        res *= (n - i);
        res /= (i + 1);
    }

    return res;
}
```

În alte situații, va trebui să precalculăm factorialele și inversele modulare
pentru a putea calcula combinările, așa cum vom arăta mai jos. Dacă nu sunteți
familiari cu ridicarea la putere în timp logaritmic, vă rugăm să citiți
articolul pe această temă.

```cpp
# include <iostream>
using namespace std;

const int MOD = 998244353;
const int N = 100000;

long long fact[N + 1], inv[N + 1];

long long modpow(long long base, long long exponent) {
    long long result = 1;
    while (exponent) {
        if (exponent & 1) {
            result = (result * base) % MOD;
        }
        base = (base * base) % MOD;
        exponent >>= 1;
    }
    return result;
}

long long C(int n, int k) {
    if (k > n || k < 0) {
        return 0;
    }

    // C(n, k) = n! * (k!)^-1 * (n - k)!^-1
    long long result = fact[n];
    result *= inv[k];
    result %= MOD;
    result *= inv[n - k];
    result %= MOD;
    return result;
}

void precalc() {
    fact[0] = 1;
    inv[0] = 1;

    for (int i = 1; i <= N; i++) {
        fact[i] = (fact[i - 1] * i) % MOD;
    }

    inv[N] = modpow(fact[N], MOD - 2); // (1)
    for (int i = N - 1; i >= 0; --i) {
        inv[i] = (inv[i + 1] * (i + 1)) % MOD;
    }
}

int main() {
    precalc();

    int n, k;
    cin >> n >> k;
    cout << C(n, k);
    return 0;
}
```

1.  Calculăm inversul modular $x^{-1} \mod p$ ($p$ este `MOD` în cod). În cazul
    în care $p$ este prim, conform micii teoreme a lui Fermat, $x^{-1} = x^{p -
    2}$.

### Partiții

Numim partiție a unui număr $n$ o secvență de numere naturale nenule $P$ cu
proprietatea că $\sum_{i = 1}^k P_i = n$, unde $k$ este numărul de numere din
partiție. Partițiile unui număr pot fi ordonate sau neordonate, în funcție de
proprietatea pe care dorim să o aplicăm într-o problemă.

Pentru a afla numărul de partiții ordonate ale unui număr $n$, putem să ne
gândim la numărul de moduri de a împărți $n$ stele folosind diferite bare
(anticipăm într-o oarecare măsură discuția pe care o vom avea la Stars and
Bars), iar dat fiind că avem $n-1$ poziții unde putem face o împărțire, iar
pentru fiecare poziție avem posibilitatea de a pune o limită sau nu, cu alte
cuvinte avem $2^{n-1}$ partiții ordonate ale unui număr $n$.

În privința partițiilor neordonate, deoarece trebuie să păstrăm proprietatea că
numerele din partiție sunt crescătoare, trebuie să avem grijă la calculul
numărului de partiții de acest tip, iar o primă soluție la această problemă
constă în folosirea unei recurențe de tipul $p(i, j)$ = numărul de partiții
neordonate ale lui $i$, unde lungimea acesteia este $j$. Pentru a putea calcula
această recurență, avem o formulă relativ simplă.

- $p(i, j) = p(i-1, j-1) + p(i-j, j)$, dacă $i\geq 1$ și $j\geq 1$ (cu alte
  cuvinte, fie adăugăm un 1 la începutul partiției, fie incrementăm toate
  elementele din partiție).
- $p(i, 0) = 0$, pentru $i\geq 1$
- $p(0, 0) = 1$.

<!-- se bagă cineva să scrie despre numerele pentagonale? -- totuși cred ca e peste nivelul intended al articolului, dar mă gândesc că le putem impărți după -->

Complexitatea acestei recurențe este $n^2$, optimizarea ei fiind imposibilă
folosind această abordare. Din fericire, există o metodă și mai rapidă, care
folosește [numere pentagonale](https://codeforces.com/blog/entry/104312),
abordare ce ne duce la o soluție în $\mathcal{O}(n\sqrt n)$, pentru mai multe detalii
puteți accesa [acest articol](https://infogenius.ro/partitii-numar-natural/) sau
rezolva problema [crescător2](https://infoarena.ro/problema/crescator2).

## Trucuri pentru rezolvarea problemelor de combinatorică

### Stars and Bars

Tehnica stars and bars este o tehnică folosită pentru a determina diverse sume
combinatoriale care se reduc la aflarea numărului de soluții ale ecuației $x_1 +
x_2 + ... + x_k = n$, unde $x_i$ este fie număr natural pozitiv, fie număr
întreg non-negativ, regăsindu-se două cazuri.

Numărul de moduri de a împărți $n$ obiecte în $k$ grupe, fiecare grupă având cel
puțin un element este egal cu $C_{n-1}^{k-1}$, deoarece avem $n-1$ locuri unde
putem pune barierele și trebuie să punem $k-1$ bariere pentru a obține $k$
grupe.

Numărul de moduri de a împărți $n$ obiecte în $k$ grupe, dacă fiecare grupă
poate fi și goală cu $C_{n+k-1}^{k-1}$, deoarece avem $n+k-1$ locuri unde putem
pune barierele și trebuie să punem $k-1$ bariere pentru a obține $k$ grupe.

Această tehnică se găsește în diferite aplicații, de obicei atunci când vrem să
grupăm diferite valori sau diferite șiruri, în problemele de numărare.

### Hockey Stick Identity

Pentru două numere $n$ și $r$, $\sum_{i=r}^{n} C_i^r = C_{n+1}^{r+1}$. Pentru a
demonstra această relație, se pot folosi argumente inductive, algebrice sau
metode ce se folosesc de funcții generatoare. Pentru mai multe detalii, puteți
citi [acest blog](https://codeforces.com/blog/entry/104172).

### Numerele Catalan

În combinatorică, numerele Catalan sunt o serie de numere care apar în diverse
probleme, devenind foarte cunoscute și folosite în aplicații ce se găsesc de
multe ori la olimpiadele de informatică pentru juniori.

Șirul numerelor Catalan este $1, 1, 2, 5, 14, 42, \dots$ și formula pentru
aflarea celui de-al $i$-lea număr Catalan este:

$$ C_n = \frac{1}{n+1}\cdot C_{2n}^{n} =\frac{(2n)!}{(n+1)! n!} = \prod_{k =
2}^{n} \frac{n + k}{k} $$

Computațional vorbind, se folosește deseori forma recursivă, cu $C_0 = 1$ și $$
C_n = \sum_{i = 1}^n C_{i - 1}C_{n - i} = \frac{2(2n - 1)}{n + 1} C_{n - 1} $$

Printre altele, numerele Catalan apar în aplicații precum:

- Numărul de arbori binari cu $n$ noduri.
- Numărul de parantezări corecte de lungime $2n$.
- Numărul de drumuri de la $(0, 0)$ la $(n, n)$ care merg în sus și la dreapta
  fără să treacă de partea cealaltă a diagonalei principale.
- Și multe altele, pe care le puteți găsi
  [aici](https://en.wikipedia.org/wiki/Catalan_number)

Așa se calculează numărul Catalan:

=== "Calcul cu C(n, k)"

    ```cpp
    const unsigned long long C(int n, int k) {
        unsigned long long res = 1;

        // C(n, k) = C(n, n-k)
        if (k > n - k) {
            k = n - k;
        }

        for (int i = 0; i < k; ++i) {
            res *= (n - i);
            res /= (i + 1);
        }

        return res;
    }

    const unsigned long long catalan(int n) {
        return C(2 * n, n) / (n + 1);
    }
    ```

=== "Calcul cu DP"

    ```cpp
    unsigned long long catalan(unsigned int n)
    {
        unsigned long long C[n + 1];

        C[0] = C[1] = 1;

        for (int i = 2; i <= n; i++) {
            C[i] = 0;
            for (int j = 0; j < i; j++)
                C[i] += C[j] * C[i - j - 1];
        }

        return C[n];
    }
    ```

=== "Calcul direct"

    ```cpp
    const unsigned long long catalan(int n) {
        unsigned long long res = 1;

        for (int i = 1; i <= n; ++i) {
            res *= 2 * (2 * i - 1);
            res /= (i + 1);
        }

        return res;
    }
    ```

### Numerele Stirling

La fel ca și numerele Catalan, numerele Stirling și Bell apar în anumite
aplicații ale problemelor de combinatorică. Numerele Stirling de primă speță
sunt folositoare în special când vine vorba de numărarea ciclurilor în
permutări, iar numerele Stirling de cea de-a doua speță, precum și numerele Bell
se regăsesc în probleme legate de numărarea unor partiții.

**Numerele lui Stirling de speța I** numără câte permutări de ordin $n$ cu $k$
cicluri există, și se notează cu $s(n, k)$. De exemplu, permutarea $1, 4, 2, 3,
6, 5$ are 2 cicluri (1, $2, 4, 3$ și $5, 6$). Cazurile particulare sunt
$s(0, 0) = 1, s(n, 0) = 0$ și $s(0, k) = 0$, iar formula recurentă este $s(n, k)
= s(n-1, k-1) + (n-1)\cdot s(n-1, k)$, recurență ce se poate explica recurgând
la cazurile pe care le întâmpinăm atunci când adăugăm o nouă valoare la
permutare, deoarece fie putem forma un ciclu nou, fie îl introducem într-un
ciclu deja existent.

**Numerele lui Stirling de speța II** reprezintă numărul de partiții ale unei
mulțimi cu $n$ elemente în $k$ submulțimi, și se notează cu $S(n, k)$. Cazurile
particulare sunt $S(0, 0) = 1, S(n, 0) = 0$ și $S(0, k) = 0$, iar formula
recurentă este $S(n, k) = s(n-1, k-1) + k\cdot s(n-1, k)$, recurență ce se poate
explica recurgând la cazurile pe care le întâmpinăm atunci când adăugăm o nouă
valoare la partițiile existente, deoarece fie putem forma o nouă partiție, fie o
introducem într-o partiție deja existentă.

=== "Stirling de speța I"

    ```cpp
    const int MAX = 100;

    unsigned long long S[MAX + 1][MAX + 1];

    void stirling(const int N) {
        S[0][0] = 0;

        for (int i = 1; i <= N; ++i) {
            for (int j = 1; j <= i; ++j) {
                S[i][j] = S[i - 1][j - 1] + (i - 1) * S[i - 1][j];
            }
        }
    }
    ```

=== "Stirling de speța II"

    ```cpp
    const int MAX = 100;

    unsigned long long S[MAX + 1][MAX + 1];

    void stirling(const int N) {
        S[0][0] = 0;

        for (int i = 1; i <= N; ++i) {
            for (int j = 1; j <= i; ++j) {
                S[i][j] = S[i - 1][j - 1] + j * S[i - 1][j];
            }
        }
    }
    ```

**Numerele Bell** se referă la numărul de modalități prin care putem partiționa
o mulțime cu $n$ elemente, și se notează cu $B_n$, fiind o generalizare a
numerelor Stirling de speța II, numărând toate partițiile posibile pentru o
mulțime. $B_n$ poate fi calculat ușor plecând de la numerele Stirling de speța a
doua, $B_n = S(n, 0) + S(n, 1) +\dots + S(n, n)$ sau folosind direct numerele
Bell anterioare, $B_n =\sum_{i=0}^{n-1} C_{n-1}^i\cdot B_i$.

## Cum putem rezolva probleme de combinatorică?

De obicei, când vine vorba de rezolvarea problemelor de combinatorică, este
foarte important mai întâi de toate să vă asigurați că știți formulele și
conceptele esențiale, dar și să le înțelegeți foarte clar deoarece în cazul
acestor probleme, memorarea formulelor fără a le înțelege cum trebuie va cauza
mai multe probleme decât necunoașterea lor.

Presupunând că aveți un bagaj de cunoștințe suficient pentru nivelul de
dificultate al problemei pe care îl abordați, mai întâi de toate vreți să știți
foarte clar ce date trebuie numărate și să găsiți observații, care chiar dacă la
început nu par a fi semnificative, pot fi utile pentru obținerea răspunsului
final.

O altă tehnică foarte importantă constă în a găsi subprobleme independente ale
problemei date, care pot fi folosite pentru a simplifica procesul de găsire a
răspunsului final, de multe ori acest lucru fiind esențial în rezolvarea
problemelor mai dificile.

Nu în ultimul rând, experiența și identificarea diferitelor tipuri de formule ce
apar de la problemă la problemă poate fi foarte folositor, iar deși acest lucru
nu este neapărat specific strict combinatoricii, se poate observa faptul că în
cazul acestei tehnici, generarea tuturor soluțiilor folosind metode precum
backtracking sau brute force se poate dovedi de ajutor pentru identificarea unor
posibile relații de recurență sau a unor formule care să ne ducă la răspuns.

Trebuie să aveți grijă și la faptul că în unele cazuri, probleme ce pot părea a
fi de combinatorică să nu fie de fapt dinamici care se pot aborda mult mai ușor
folosind modul de gândire specific programării dinamice, iar chiar dacă în unele
cazuri există similarități între cele două, acest lucru nu este adevărat mereu.

## Concluzii

Combinatorica apare drept subiect de bază în multe probleme, iar cunoașterea
temeinică a tehnicilor de rezolvare a acestor probleme este esențială. Din cauza
dificultății cu care această tehnică este învățată, se recomandă rezolvarea unui
număr cât mai mare de probleme, pentru a fi expus la diverse tehnici, formule și
rezultate importante atât în matematică, cât și în informatică.  

## Probleme suplimentare

### Probleme de la olimpiade

- [Combination](https://kilonova.ro/problems/1982)
- [pascal infoarena](https://www.infoarena.ro/problema/pascal)
- [Stirling infoarena](https://infoarena.ro/problema/stirling)
- [IIOT Dream](https://kilonova.ro/problems/300)
- [Polyglot Kilonova](https://kilonova.ro/problems/2936)
- [Problemele de combinatorică de pe Kilonova, în special cele de la loturile de
  juniori](https://kilonova.ro/tags/294)
- [RoAlgo Contest 4 - Ursul](https://kilonova.ro/problems/1604)
- [RoAlgo Contest 2 - munte](https://kilonova.ro/problems/695)
- [RCPC 2023 KsumT](https://kilonova.ro/problems/1898)
- [ONI 2014 Spion](https://kilonova.ro/problems/1443)
- [ONI 2015 Nmult](https://kilonova.ro/problems/1468)
- [ONI 2015 Baraj Provocare](https://kilonova.ro/problems/287/)
- [ONI 2013 Xnumere](https://kilonova.ro/problems/220)
- [IIOT 2024 Mermaid](https://kilonova.ro/problems/2433/)
- [USACO Gold Help
  Yourself](https://usaco.org/index.php?page=viewproblem2&cpid=1018)
- [Problemele de pe cppi.sync](https://cppi.sync.ro/materia/combinatorica.html)

### Alte probleme

- [CSES Bracket Sequences I](https://cses.fi/problemset/task/2064)
- [CSES Bracket Sequences II](https://cses.fi/problemset/task/2187)
- [CSES Distributing Apples](https://cses.fi/problemset/task/1716)
- [Codeforces Arena](https://codeforces.com/problemset/problem/1606/E)
- [Codeforces Close Tuples (hard version)](https://codeforces.com/contest/1462/problem/E2)
- [Codeforces Almost Identity
  Permutations](https://codeforces.com/problemset/problem/888/D)
- [Codeforces Card Game](https://codeforces.com/contest/2025/problem/E)
- [Codeforces Med and Mex](https://codeforces.com/gym/104520/problem/K)
- [Codeforces Different Subsets For All
  Tuples](https://codeforces.com/contest/660/problem/E)
- [Probleme de combinatorică de pe
  Codeforces](https://codeforces.com/problemset?tags=combinatorics)

## Bibliografie și lectură suplimentară

- [Concurs educațional făcut de
  MathDash](https://mathdash.com/contest/complementary-counting-educational)
- [Curs de combinatorică făcut de Bogdan
  Iordache](https://iordachebogdan.github.io/cppi/combinatorica_nivel_mediu.html)
- [Curs de combinatorică avansat făcut de Alex
  Luchianov](https://sepi.ro/assets/upload-file/articole/Alexandru%20Luchianov%20-%20Trucuri%20de%20combinatorica1.pdf)
- [Combinatorics - USACO Guide (articol +
  probleme)](https://usaco.guide/gold/combo?lang=cpp)
- [Elemente de combinatorică](https://infogenius.ro/combinatorica/)
- [Binomial Coefficients -
  Eolymp](https://basecamp.eolymp.com/en/posts/em5e34cc0d35p7omf3taia3fu4?fbclid=IwZXh0bgNhZW0CMTEAAR3K5oGUJpJiGSo1CG2r9McoQ3HQtmbdLJmPRbFDXzhyhcewZce2R6ETsxw_aem_ZmFrZWR1bW15MTZieXRlcw)
- [Ghid despre permutari -
  nor-blog](https://nor-blog.codeberg.page/posts/2023-01-09-permutations-for-beginners/)
- [Elemente de combinatorică, curs predat la lotul de juniori din
  2018](https://www.scribd.com/document/634592386/Elemente-de-combinatorica-2018)
- [Derangement - wikipedia](https://en.wikipedia.org/wiki/Derangement)
- [A tutorial of reflection principle in combinatorics](https://codeforces.com/blog/entry/135139)
- [Problem Solving Guide to Modular Combinatorics and Exponentiation -
  Codeforces](https://codeforces.com/blog/entry/78873)
- [Binomial coefficient -
  wikipedia](https://en.wikipedia.org/wiki/Binomial_coefficient)
- [Triunghiul lui Pascal -
  wikipedia](https://en.wikipedia.org/wiki/Pascal%27s_triangle)
- [Stars and Bars](https://cp-algorithms.com/combinatorics/stars_and_bars.html)
- [Numărul de partiții ale unui număr
  natural](https://infogenius.ro/partitii-numar-natural/)
- [Numere Catalan](https://cp-algorithms.com/combinatorics/catalan-numbers.html)
- [Catalan Numbers and Catalan
  Convolution](https://codeforces.com/blog/entry/87585)
- [Catalan Numbers and Generating Uniform Balanced Bracket
  Sequences](https://codeforces.com/blog/entry/103245)
- [Numerele Stirling și numerele
  Bell](https://infogenius.ro/numerele-stirling-bell/)
- [Numerele Stirling de ambele
  spețe](https://en.wikipedia.org/wiki/Stirling_number)
- [Partition of a set](https://en.wikipedia.org/wiki/Partition_of_a_set)
- [Opțional, restul articolelor de la secțiunea
  combinatorics](https://codeforces.com/catalog)
