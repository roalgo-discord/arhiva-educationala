---
tags:
    - programare dinamica
    - permutari
    - DP
---

**Autor**: Ștefan-Cosmin Dăscălescu

## Introducere

În acest articol, vom discuta o serie de probleme care implică aplicarea diverselor recurențe specifice programării dinamice pentru problemele care au la bază permutări. În cele mai multe cazuri, problemele sunt de tipul celor de numărare, în care vrem să aflăm fie câte permutări îndeplinesc un anumit criteriu, fie care este a $k$-a permutare care îndeplinește un criteriu dat. Deși articolul se va concentra pe aplicațiile din algoritmică, aceste tipuri de soluții pot fi utile și pentru anumite tipuri de probleme care se dau la competițiile de matematică. 

Chiar dacă aceste probleme nu sunt dintre cele mai des întâlnite la competiții, modul de gândire a acestor rezolvări poate deveni folositor și în ceea ce privește alte tipuri de aplicații, precum cele de la [range dp](https://edu.roalgo.ro/dificil/range-dp/).

Ca o remarcă, ne vom concentra mai ales pe probleme care nu pot fi rezolvate folosind formule combinatoriale, dar vom prezenta câteva exemple care au mai multe abordări, pentru a ușura înțelegerea acestei metode. De asemenea, deși există și alte tipuri de probleme care se reduc la formalizarea permutărilor folosind recurențe specifice programării dinamice, le vom discuta în articolele specifice lor, precum aflarea numărului de [cicluri hamiltoniene](https://edu.roalgo.ro/mediu/bitmask-dp/#problema-hamiltonian-flights), iar în general, cunoașterea dinamicii pe stări exponențiale este necesară pentru înțelegerea acestei tehnice.

În general, pentru a rezolva aceste tipuri de probleme, ne vom concentra pe câteva tehnici care se regăsesc în mare parte dintre aceste probleme. Dintre cele mai frecvente variații, întâlnim următoarele în mod frecvent în acest tip de probleme:

* Adăugarea pe rând a valorilor $1, 2, 3, \dots, n$ în permutare pe diverse poziții.
* Adăugarea pe rând a valorilor $n, n-1, n-2, \dots, 1$ în permutare pe diverse poziții.
* Construirea secvențială a permutării folosindu-ne de ordinea relativă. 
* Aflarea numărului de soluții greșite și scăderea lor din cele corecte.

În cele ce urmează, vom prezenta diverse exemple de probleme și modul de a aplica aceste principii. Uneori, vom avea nevoie de calcularea altor recurențe, iar cunoașterea formulelor de la [combinatorică](https://edu.roalgo.ro/mediu/intro-combinatorics/) este obligatorie.

## Problema 1 - [perm - infoarena](https://infoarena.ro/problema/perm)

Pentru a rezolva această problemă, vom încerca să construim permutarea pas cu pas, crescându-i lungimea cu $1$. După cum știm, prima poziție va fi mereu o valoare maximă, lucru ce va fi esențial în soluția pe care o vom prezenta în cele ce urmează. 

Astfel, dacă avem o permutare de lungime $i$ cu $j$ maxime, vrem să putem construi o permutare de lungime $i+1$ într-un mod care să ne ușureze calculul maximelor. Mai întâi, inserarea lui $i+1$ în permutare ar face lucrurile anevoioase, deoarece în funcție de poziția în care este inserat, numărul de maxime ar putea lua orice valoare de la $1$ la $j+1$, lucru ce face această abordare nepractică. 

Totuși, ne putem gândi și altfel în ceea ce privește generarea unei permutări de lungime $i+1$. În loc să inserăm $i+1$ undeva în permutare, vrem să plecăm de la inserarea lui $1$, lucru ce îl putem face cu ușurință dacă ne gândim la permutarea pe care o avem, presupunând toate valorile mai mari cu $1$. De exemplu, dacă permutarea curentă este $[2, 1, 5, 3, 4]$, noul șir ar fi $[3, 2, 6, 4, 5]$. Astfel, numărul de maxime, precum și poziția lor rămân identice, iar acum, tot ce trebuie să facem este să poziționăm $1$ în permutare. 

Deoarece $1$ este cea mai mică valoare, decizia este una foarte simplă, numărul de maxime crește cu $1$ doar dacă inserăm această valoare la începutul permutării, în caz contrar acest număr rămâne același. Astfel, putem să calculăm numărul de permutări de lungime $n$ cu $k$ maxime folosind următoarea recurență:

$$dp[i][j] = (i-1) \cdot dp[i-1][j] + dp[i-1][j-1]$$

, unde $dp[0][0] = 1$.

Deoarece problema necesită numere mari, cunoașterea acestora este necesară. Mai jos puteți găsi implementarea completă a soluției problemei date.

!!! note "Soluție detaliată" 
    O demonstrație detaliată a acestei abordări, precum și legătura cu [numerele Stirling](https://edu.roalgo.ro/mediu/intro-combinatorics/#numerele-stirling) se poate găsi [aici](https://math.stackexchange.com/questions/1978388/counting-permutations-with-k-maximums)


```cpp
#include <fstream>
#include <cstring>
using namespace std;
ifstream f("perm.in");
ofstream g("perm.out");
int k, n;
int base = 1000 * 1000;
int dp[202][202][202];
int add (int A[], int B[]) {
    for (int i = 1; i <= A[0]; ++i) {
        B[i] += A[i];
    }
    B[0] = max(A[0], B[0]);
    for (int i = 1; i <= B[0]; ++i) {
        if(B[i] >= base) {
            B[i+1]++;
            B[i] %= base;
            if (i == B[0]) {
                ++B[0];
            }
        }
    }
}
int C[202];
void mul (int A[], int B[]) {
    long long R[202];
    memset(R, 0, sizeof(R));
    R[0] = A[0] + B[0] - 1;
    for (int i = 1; i <= A[0]; ++i) {
        for (int j = 1; j <= B[0]; ++j) {
            R[i+j-1] += 1LL * A[i] * B[j];
            if(R[i+j-1] >= base) {
                R[0] = max(R[0], 1LL * (i + j));
                R[i+j] += R[i+j-1]/base;
                R[i+j-1] %= base;
            }
        }
    }
    for (int i = 1; i <= R[0]; ++i) {
        if (R[i] >= base) {
            R[i+1] += R[i]/base;
            R[i] %= base;
            if(i == R[0]) {
                ++R[0]; 
            }
        }
    }
    for (int i = 0; i <= R[0]; ++i) {
        B[i] = R[i];
    }
}
int main() {
    f >> n >> k;
    dp[0][0][0] = dp[0][0][1] = 1;
    for (int i = 1; i <= n; ++i) {
        for(int j = 1; j <= i; ++j) {
            add(dp[i-1][j], dp[i][j]);
            C[0] = 1;
            C[1] = i-1;
            mul(C, dp[i][j]);
            add(dp[i-1][j-1], dp[i][j]);
        }
    }
    for (int i = dp[n][k][0]; i >= 1; --i) {
        if (i == dp[n][k][0]) {
            g << dp[n][k][i];
        }
        else {
            int val = base / 10;
            while (val > 1 && val > dp[n][k][i]) {
                g << "0", val /= 10;
            }
            g << dp[n][k][i];
        }
    }
    return 0;
}
```

## Problema 2 - [Permutation - AtCoder DP](https://atcoder.jp/contests/dp/tasks/dp_t)

Pentru a rezolva această problemă, vrem să găsim o metodă de a plasa valorile în permutare și de a păstra informații suficiente pentru a putea grupa celelalte valori. 

Plasarea primei valori este ușoară, putem presupune fiecare valoare de la $1$ la $n$ ca fiind adăugată în permutare. Totuși, încă nu am răspuns la întrebarea anterioară legat de păstrarea unor informații suficiente pentru numărarea corectă a soluțiilor. 

Un prim pas ar fi să ne gândim la păstrarea numărului de valori mai mari, respectiv mai mici decât valoarea de la poziția curentă, astfel încât am putea avea o dinamică de tipul `#!cpp dp[i][sm][bg];` cu semnificația că am completat primele $i$ valori, iar valoarea de pe poziția $i$ este mai mare decât $sm$ valori și mai mică decât $bg$ valori. 

Pentru a trece de la această stare la următoarele, vom avea două cazuri în funcție de semnul de la poziția curentă. 

* Dacă semnul este $<$, atunci vom pute actualiza toate valorile de forma $dp[i][x][bg + sm - x - 1]$, cu $x < sm$ (fiecare valoare nou adăugată este mai mică decât valoarea curentă în ordinea relativă, deci poate fi mai mare decât un număr mai mic de valori). 
* Pe de altă parte, dacă semnul este $>$, atunci vom pute actualiza toate valorile de forma $dp[i][sm + bg - x - 1][x]$, cu $x < bg$ (fiecare valoare nou adăugată este mai mare decât valoarea curentă în ordinea relativă, deci poate fi mai mică decât un număr mai mare de valori). 

Din păcate, complexitatea acestei abordări este $O(n^4)$, putând fi redusă la $O(n^3)$ folosind sume parțiale. 

Totuși, există o proprietate foarte importantă pe care nu am folosit-o încă, și anume faptul că suma valorilor $bg$ și $sm$ va fi mereu egală cu $n - i$. Astfel, putem să reducem numărul de dimensiuni și să ne concentrăm doar pe păstrarea valorilor $sm$ în dinamica noastră, acest detaliu făcând optimizarea soluției mult mai ușoară, complexitatea finală devenind $O(n^2)$ după aplicarea sumelor parțiale.

Pentru mai multe detalii de implementare, puteți citi soluția de mai jos.

```cpp
#include <iostream>
#include <vector>

using namespace std;
 
const int mod = 1000000007;

int main() {
    
    int n;
    cin >> n;
    
    string s;
    cin >> s;
    
    s = ' ' + s;
    
    // dp[i][j] = cate permutari de lungime i exista astfel incat j valori sunt mai mici decat valoarea de pe pozitia i
    
    vector<vector<long long>> dp(n+1, vector<long long>(n+1));
    for (int i = 1; i <= n; i++) {
        dp[1][i-1] = 1;
    }
    
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (s[i] == '<') {
                // din dp[i][j] putem aduna in dp[i+1][0], dp[i+1][1], ..., dp[i+1][j-1]
                dp[i+1][0] += dp[i][j];
                dp[i+1][j] -= dp[i][j];
            }
            else {
                // din dp[i][j] putem aduna in dp[i+1][j], dp[i+1][j+1], ..., dp[i+1][n-i-1]
                dp[i+1][j] += dp[i][j];
                dp[i+1][n-i] -= dp[i][j];
            }
        }
        
        for (int j = 0; j < n; j++) {
            if (j > 0) {
                dp[i+1][j] += dp[i+1][j-1];
            }
            dp[i+1][j] = dp[i+1][j]%mod;
            if (dp[i+1][j] < mod) {
                dp[i+1][j] += mod;
            }
        }
    }
    
    cout << dp[n][0]%mod << '\n';
    return 0;
}
```

## Problema 3 - [kswap Lot juniori 2015](https://kilonova.ro/problems/1640)

Pentru a rezolva această problemă, vom folosi din nou metoda programării dinamice. 

Vom defini $dp[i][j]$ ca fiind numărul de permutări ale primelor $i$ valori care au $j$ inversiuni. Deoarece vom adăuga valorile de la $1$ la $n$, pentru fiecare valoare nou adăugată, vom avea un număr de inversiuni corespunzător cu poziția pe care o adăugăm (dacă adăugăm pe poziția $1$, avem $i$ inversiuni în plus, apoi pentru poziția $2$, $i-1$ etc.) 

Cu alte cuvinte, $dp[i][j] = \sum_{j - i + 1}^j dp[i-1][x]$, recurență ce se poate calcula în $O(n^3)$ folosind sume parțiale, calculul complexității fiind dat de numărul de elemente din permutare $(n)$ și de numărul maxim de inversiuni ale unei permutări $(\frac{n \cdot (n-1)}{2})$.

Deoarece limita de memorie este strânsă, trebuie să păstrăm ultimele două linii ale recurenței.

```cpp
#include <fstream>
using namespace std;

ifstream fin("kswap.in");
ofstream fout("kswap.out");

int n, k;

int dp[2][12002], sp[2][12002];

const int mod = 30103;

int main() { 
    fin >> n >> k;
    
    int mx = n * (n-1) / 2;
    
    dp[0][0] = 1;
    
    for (int i = 0; i <= mx; i++) {
        sp[0][i] = dp[0][i];
        if (i > 0) {
            sp[0][i] += sp[0][i-1];
        }
    }
    
    for (int i = 2; i <= n; i++) {
        int maxi = i * (i-1) / 2;
        for (int j = 0; j <= maxi; j++) {
            dp[1][j] = sp[0][j];
            
            if (j >= i) {
                dp[1][j] -= sp[0][j - i];
            }
            
            if (dp[1][j] < 0) {
                dp[1][j] += mod;
            }
        }
        
        for (int i = 0; i <= mx; i++) {
            sp[0][i] = dp[1][i];
            if (i > 0) {
                sp[0][i] += sp[0][i-1];
            }
            
            if (sp[0][i] >= mod) {
                sp[0][i] -= mod;
            }
                
            dp[0][i] = dp[1][i];
            dp[1][i] = 0;
        }
    }
    
    fout << dp[0][k] << '\n';
    
    return 0;
}
```

## Problema 4 - [kcons Lot 2010](https://kilonova.ro/problems/2257)

Pentru a rezolva această problemă, putem începe prin a analiza cazul special când $K=1$. Putem veni cu următoarea soluție folosind programare dinamică:

$dp[i][j]$ = Numărul de permutări de $i$ elemente dacă există exact $j$ perechi de elemente adiacente de forma $x, x+1$.

Soluția poate fi găsită în $dp[N][0]$, iar cazul de bază este $dp[1][0] = 1$.

Cât despre relația de recurență, să presupunem că avem o stare $(i,j)$ și vrem să inserăm elementul $i+1$. Distinguem trei cazuri:

1. Inserăm elementul $i+1$ imediat după elementul $i$. Trebuie să actualizăm $dp[i+1][j+1]$.
2. Inserăm elementul $i+1$ între una dintre cele $j$ perechi de elemente consecutive. Trebuie să actualizăm $dp[i+1][j-1]$.
3. Inserăm elementul $i+1$ în alt loc, trebuie să actualizăm $dp[i+1][j]$.

Această soluție are o complexitate de $O(N^2)$.

Când $K>1$, putem veni cu o altă strategie de programare dinamică pentru a reduce problema la cazul în care $K=1$.

Să presupunem că avem o permutare și o împărțim în subșiruri maximale care conțin elemente consecutive în ordine crescătoare. De exemplu, pentru permutarea $7\ 8\ 4\ 5\ 6\ 10\ 1\ 2\ 9\ 3$, împărțirea constă în 6 subșiruri: $| 7\ 8 | 4\ 5\ 6 | 10 | 1\ 2 | 9 | 3 |$. Trucul aici este să numărăm împreună toate permutările care împart același număr de subșiruri împărțite.

Calculăm $partitions[i][j]$ = Numărul de moduri de a împărți primii $i$ numere naturale în $j$ subșiruri, astfel încât niciunul dintre ele să nu aibă lungimea mai mare decât $K$. Recurența directă este $partitions[i][j] = \sum(partitions[i-x][j-1], 1 \leq x \leq K)$, dar aceasta poate fi redusă la $O(1)$ ușor prin calcularea sumelor parțiale. Acum putem număra toate permutările valide care constau în $x$ subșiruri împărțite prin calcularea $partitions[N][x] * dp[x][0]$.

```cpp
#include <fstream>
#define mod 30013
using namespace std;
ifstream f("kcons.in");
ofstream g("kcons.out");
int n, k, dp1[2002][2002], dp2[2002][2002], sp[2002];
int main() {
    f >> n >> k;
    dp1[1][0] = 1;
    for (int i = 2; i <= n; ++i) {
        for (int j = 0; j <= i; ++j) {
            dp1[i][j] = dp1[i-1][j] * (i - j - 1) + (j > 0) * dp1[i-1][j-1] + dp1[i-1][j+1] * (j+1);
            dp1[i][j] %= mod;
        }
    }
    dp2[1][1] = 1;
    dp2[0][0] = 1;
    sp[0] = 1;
    sp[1] = 1;
    for (int i = 2; i <= n; ++i) {
        if (i > k) {
            for (int j = 0; j <= i; ++j) {
                sp[j] = sp[j] - dp2[i - k - 1][j];
                if(sp[j] < 0)
                    sp[j] += mod;
            }
        }
        for (int j = i; j >= 1; --j) {
            dp2[i][j] = sp[j-1];
            sp[j] += dp2[i][j];
            if (sp[j] >= mod) {
                sp[j] -= mod;
            }
        }
    }
    int ans = 0;
    for (int i = 0; i <= n; ++i) {
        ans += dp2[n][i] * dp1[i][0];
        ans %= mod;
    }
    g << ans << '\n';
    return 0;
}
```

## Concluzii

Aceste tipuri de probleme combină două capitole, programarea dinamică și combinatorica, iar modul de abordare a acestor recurențe poate fi destul de dificil fără experiență anterioară. Chiar dacă aceste probleme nu apar la fel de des precum alte probleme de programare dinamică, se dovedesc a fi provocări interesante și de multe ori, dificile, ducând și la alte idei interesante, așa cum vom discuta în articolul despre subtehnica [connected component DP](https://edu.roalgo.ro/avansat/component-dp/), care are la bază problemele din această categorie. 

## Probleme suplimentare

* [infoarena perm3](https://infoarena.ro/problema/perm3)
* [ONI 2008 pviz](https://kilonova.ro/problems/164)
* [ONI 2010 kmax](https://kilonova.ro/problems/180/)
* [Codeforces Greg and Caves](https://codeforces.com/contest/295/problem/D)
* [Codeforces Positions in Permutations](https://codeforces.com/problemset/problem/285/E)
* [Lot 2002 doipatru](https://infoarena.ro/problema/doipatru)
* [infoarena perm4](https://infoarena.ro/problema/perm4)

## Resurse suplimentare

* [[Tutorial] Non-trivial DP Tricks and Techniques - Codeforces](https://codeforces.com/blog/entry/47764)