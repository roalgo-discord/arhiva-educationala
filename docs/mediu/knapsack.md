---
tags:
    - optimizare
    - programare dinamica
---
**Autor**: Ștefan-Cosmin Dăscălescu

!!! example "Cunoștințe necesare"
    - [Introducere în programarea dinamică](https://edu.roalgo.ro/usor/intro-dp/)

## Introducere

Se dă următoarea problemă pe care trebuie să o rezolvăm: Ai un set de obiecte
pentru care știm greutatea și valoarea lor și vrei să alegi unele obiecte din
el, pe care să le pui într-un rucsac și să încerci să le vinzi turiștilor care
vizitează orașul în care locuiești. Ideal, ai vrea să poți aduce toate
obiectele, dar din păcate, rucsacul are o capacitate limitată, așa că va trebui
să alegi ce obiecte vei păstra și ce obiecte nu.

Această problemă se numește problema rucsacului și este una dintre cele mai
studiate probleme de optimizare din informatică, având multiple soluții în
funcție de condițiile impuse, restricțiile cu privire la numărul de obiecte
alese și multe alte variații, pe care le vom discuta în cele ce urmează.

## Modul de abordare

În cazul majorității problemelor de tipul celei menționate anterior, vom folosi
o abordare ce folosește metoda programării dinamice, așa că recomandăm citirea
articolului în care facem introducerea acestei metode pentru a putea înțelege
mai bine conținuturile explicate aici.

O excepție notabilă constă în problema **rucsacului fracționar**, în care avem
voie să rupem obiectele în beneficiul nostru, fiind evident în cazul acestei
variante faptul că abordarea optimă constă în sortarea obiectelor în ordine
descrescătoare a raportului $\frac{valoare}{greutate}$ și alegerea obiectelor cu
cel mai bun raport, până când umplem rucsacul.

## Variații ale problemei rucsacului

În cele ce urmează, vom prezenta diverse variații în care apare problema
rucsacului, împreună cu strategiile de abordare și implementări care pot fi
folosite și în alte probleme de acest fel.

### Rucsacul clasic (0-1 Knapsack)

Pentru această problemă, vom presupune că avem voie să alegem fiecare dintre
cele $N$ obiecte cel mult o dată, obiecte pentru care știm valoarea și greutatea
lor, $V_i$ și $W_i$ și știm greutatea maximă admisă a rucsacului, $G$.

O primă soluție care pare ușor de găsit este cea pe care am descris-o mai sus,
pe modelul rucsacului fracționar, însă aceasta nu merge, deoarece putem găsi
foarte ușor un contra-exemplu. Un asemenea test ar fi $N = 3$, $G = 4$, $V_1 =
9$, $W_1 = 3$, $V_2 = 5$, $W_2 = 2$, $V_3 = 5$, $W_3 = 2$. Un algoritm greedy ar
lua primul obiect deoarece raportul dintre valoare și greutate este maxim, dar
soluția optimă constă în luarea ultimelor două obiecte, care chiar dacă au
rapoarte mai mici, adunate ne vor duce la un răspuns mai bun.

În acest caz, va trebui să gândim altfel problema. Deoarece o soluție de tip
greedy va avea mereu un contra-exemplu pe cazul general, vom putea folosi o
dinamică, în care vom ține cont de greutatea folosită și de numărul de obiecte
procesat.

Astfel, vom defini $dp[i][j]$ ca fiind valoarea maximă a unor obiecte alese din
primele $i$ cu suma greutăților egală cu $j$. Răspunsul final va fi valoarea
maximă a unei valori de tipul $dp[i][j]$.

#### Cum calculăm $dp[i][j]$?

Pentru a calcula $dp[i][j]$, trebuie să ne gândim la cazurile de la care plecăm
pentru a ajunge la această stare (vom presupune că $W_i \leq j$). Cu alte
cuvinte, ce facem cu obiectul $i$. Pe de o parte, îl luăm și va trebui să
considerăm cazul specific acestui lucru, iar pe de altă parte, nu îl luăm și va
trebui să ne raportăm la starea anterioară cu aceeași sumă a greutății. Relația
de recurență va dovedi acest lucru, accentuând caracterul binar al problemei
rucsacului (de aici vine și denumirea de $0-1$ knapsack folosită în
specialitate).

$$dp[i][j] = max(dp[i-1][j], dp[i-1][j-W_i] + V_i)$$

După cum puteți vedea, fiecare stare depinde de exact două stări anterioare, în
funcție de decizia pe care o luăm cu privire la cel de-al i-lea obiect. Mai jos
puteți găsi soluția la problema [Knapsack
I](https://atcoder.jp/contests/dp/tasks/dp_d) de pe AtCoder.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, w;
    cin >> n >> w;
    
    vector<vector<long long> > dp(n+1, vector<long long> (w+1, 0));
    
    for (int i = 1; i <= n; i++) {
        int wi, vi;
        cin >> wi >> vi;
        for (int j = 0; j <= w; j++) {
            dp[i][j] = dp[i-1][j];
            if (wi <= j && dp[i-1][j-wi] + vi > dp[i][j]) {
                dp[i][j] = dp[i-1][j-wi] + vi;
            }
        }
    }
    
    long long ans = 0;
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j <= w; j++) {
            ans = max(ans, dp[i][j]);
        }
    }
    cout << ans << '\n';
    return 0;
}
```

#### Putem îmbunătăți soluția?

Se poate observa că fiecare poziție din dinamica noastră depinde doar de
rezultatele liniei anterioare, deci putem să reducem memoria necesară la $2
\cdot w$, cum se poate vedea mai jos.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, w;
    cin >> n >> w;
    
    vector<vector<long long> > dp(2, vector<long long> (w+1, 0));
    
    bool x = 1;
    for (int i = 1; i <= n; i++) {
        int wi, vi;
        cin >> wi >> vi;
        for (int j = 0; j <= w; j++) {
            dp[x][j] = dp[x^1][j];
            if (wi <= j && dp[x^1][j-wi] + vi > dp[x][j]) {
                dp[x][j] = dp[x^1][j-wi] + vi;
            }
        }
        x ^= 1;
    }
    
    long long ans = 0;
    for (int i = 0; i <= 1; i++) {
        for (int j = 0; j <= w; j++) {
            ans = max(ans, dp[i][j]);
        }
    }
    cout << ans << '\n';
    return 0;
}
```

Ba chiar putem face o altă îmbunătățire din punct de vedere al memoriei,
bazându-ne pe faptul că putem calcula stările pas cu pas, de la dreapta la
stânga, fără a avea nevoie să ținem o a doua linie. Totuși, trebuie avut grijă
la implementare, deoarece dacă forul e făcut de la stânga la dreapta, riscăm să
repetăm obiecte, lucru care nu ne este permis în această versiune.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, w;
    cin >> n >> w;
    
    vector<long long> dp(w+1, 0);
    
    bool x = 1;
    for (int i = 1; i <= n; i++) {
        int wi, vi;
        cin >> wi >> vi;
        for (int j = w; j >= wi; j--) {
            dp[j] = max(dp[j], dp[j - wi] + vi);
        }
    }
    
    long long ans = 0;
    for (int j = 0; j <= w; j++) {
        ans = max(ans, dp[j]);
    }
    cout << ans << '\n';
    return 0;
}
```

După cum se poate observa, această implementare a fost adusă de la $O(n \cdot
w)$ memorie la $O(w)$ memorie, codul devenind de asemenea mai scurt.

### Rucsacul în care putem repeta obiecte de un număr nelimitat de ori

Această variație este una în care putem folosi un obiect de mai multe ori.
Pentru a putea implementa această variație, trebuie doar să modificăm ultimul
cod pentru a avea o parcurgere clasică de la stânga la dreapta. Din nou, vom
presupune forma datelor de intrare ca fiind aceeași.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, w;
    cin >> n >> w;
    
    vector<long long> dp(w+1, 0);
    
    bool x = 1;
    for (int i = 1; i <= n; i++) {
        int wi, vi;
        cin >> wi >> vi;
        for (int j = wi; j <= w; j++) {
            dp[j] = max(dp[j], dp[j - wi] + vi);
        }
    }
    
    long long ans = 0;
    for (int j = 0; j <= w; j++) {
        ans = max(ans, dp[j]);
    }
    cout << ans << '\n';
    return 0;
}
```

### Rucsacul în care putem repeta obiecte de un număr limitat de ori

Această variație este una ceva mai dificilă, deoarece nu mai putem folosi
implementarea de mai sus fără a folosi obiecte de prea multe ori, așa că va
trebui să recurgem la o metodă de a reduce problema la un rucsac de tipul $0-1$,
ca cel prezentat mai sus.

#### Trucul "$\log_2$"

Așa cum îi zice și numele, vom vrea să descompunem frecvențele obiectelor în
sume de puteri ale lui $2$, astfel încât să putem acoperi oricare număr de la
$1$ la frecvența numărului, cu cât mai puține obiecte. Motivul pentru care
folosim puterile lui $2$ și nu numere consecutive este acela că în cazul în care
frecvențele cresc foarte rapid, vom avea nevoie de foarte puține numere (de
exemplu, $1 + 2 + 4 + 8 = 1 + 2 + 3 + 4 + 5$).

Vom explica modul de aplicare al acestui truc folosind un exemplu, ca mai apoi
să arătăm o implementare de acest fel.

!!! example "Exemplu"

    Dacă avem un element cu frecvența $20$ și greutatea individuală $W$, mai
    întâi vom scădea puteri ale lui $2$ tot mai mari, iar mai apoi restul rămas
    va fi folosit și el.

    - $20 - 1 = 19$, putem folosi $1$, deci înmulțim puterea cu $2$. Vom crea un
      obiect cu greutate $1 \cdot W$.
    - $19 - 2 = 17$, putem folosi $2$, deci înmulțim puterea cu $2$. Vom crea un
      obiect cu greutate $2 \cdot W$.
    - $17 - 4 = 13$, putem folosi $4$, deci înmulțim puterea cu $2$. Vom crea un
      obiect cu greutate $4 \cdot W$.
    - $13 - 8 = 5$, putem folosi $8$, deci înmulțim puterea cu $2$. Vom crea un
      obiect cu greutate $8 \cdot W$.
    - $5 - 16 = -11$, nu putem folosi $16$, așa că folosim numărul rămas, $5$.
      Vom crea un obiect cu greutate $5 \cdot W$.

    Cu alte cuvinte, am împărțit un obiect cu frecvența $20$ în $5$ obiecte
    echivalente, cu frecvențele $1, 2, 4, 8$ și $5$.

Un exemplu de problemă în care se poate aplica acest truc este [strehaia de la
RoAlgo Contest 2](https://kilonova.ro/problems/684). Puteți găsi implementarea
mai jos.

```cpp
#include <iostream>
using namespace std;

int ruk[1000001], frq[102];

int main() {
    int n;
    cin >> n;
    
    ruk[0] = 1;
    
    for (int i = 1; i <= n; i++) {
        int x;
        cin >> x;
        
        for (int p = 1; p <= x; p++) {
            int q;
            cin >> q;
            frq[q]++;
        }
    }
    
    int sm = 0;
    for (int i = 1; i <= 100; i++) {
        int val = 1;
        while (frq[i]) {
            frq[i] -= val;
            int total = i * val;
            for (int poz = sm; poz >= 0; poz--) {
                if (ruk[poz]) {
                    ruk[poz + total] = 1;
                }
            }
            sm += total;
            val *= 2;
            if (val > frq[i]) {
                val = frq[i];
            }
        }
    }
    
    int cnt = 0;
    for (int i = 0; i <= 1000000; i++) {
        cnt += ruk[i];
    }
    cout << cnt << '\n';
    return 0;
}
```

### Rucsacul în care ne interesează doar dacă avem o anumită sumă sau nu

În multe probleme, nu ne interesează suma maximă sau minimă pe care o putem
obține, ci pur și simplu dacă putem crea o anumită sumă folosind obiectele alese
sau nu, acesta fiind un alt exemplu în care putem aplica o dinamică de tipul
celor prezentate anterior. Deoarece nu mai avem nevoie să ținem și o valoare
maximă, avem o mai mare flexibilitate în privința implementărilor. Printre
altele, aici putem folosi bitset pentru optimizarea actualizării stărilor, așa
cum am procedat în această soluție pentru problema [Money
Sums](https://cses.fi/problemset/task/1745/).

```cpp
#include <iostream>
#include <bitset>
using namespace std;
 
int main() {
    
    int n;
    cin >> n;
    
    bitset<100001> dp;
    
    dp[0] = 1;
    for (int i = 1; i <= n; i++) {
        int x;
        cin >> x;
        
        dp |= (dp << x); // aplicam operatiile pe biti pentru a creste eficienta bitsetului
    }
    
    int cnt = 0;
    for (int i = 1; i <= 100000; i++) {
        cnt += dp[i];
    }
    cout << cnt << '\n';
    for (int i = 1; i <= 100000; i++) {
        if (dp[i]) {
            cout << i << " ";
        }
    }
    
    return 0;
}
```

### Adăugarea și scoaterea de valori din rucsac

Dacă vrem să avem un rucsac care să poată suporta și actualizări, vom putea
folosi o variație destul de simplă care ne permite să ajungem la răspunsuri mai
ușor. Vom presupune că vom stoca câte moduri sunt să ajungem la o anumită sumă,
modulo $P$, unde $P$ este un număr prim foarte mare. Acest modulo ne va da
flexibilitatea necesară pentru a evita coliziunile și situațiile de tip false
negative, când ajungem să spunem că nu avem un răspuns când de fapt îl avem.

Vom presupune că suma maximă este $N$ și valoarea adăugată/scoasă este $W$.

```cpp
for (int i = N; i >= W; i--) { 
    dp[i] += dp[i - W];
    if (dp[i] >= P) {
        dp[i] -= P;
    }
}
```

Pentru a scoate, vom face același lucru dar invers.

```cpp
for (int i = W; i <= N; i++) {
    dp[i] -= dp[i - W];
    if (dp[i] < 0) {
        dp[i] += P;
    }
}
```

## Probleme suplimentare

- [AtCoder Knapsack I](https://atcoder.jp/contests/dp/tasks/dp_d)
- [AtCoder Knapsack II](https://atcoder.jp/contests/dp/tasks/dp_e)
- [CSES Money Sums](https://cses.fi/problemset/task/1745/)
- [CSES Coin Combinations I](https://cses.fi/problemset/task/1635)
- [CSES Coin Combinations II](https://cses.fi/problemset/task/1636)
- [ONI 2015 Procente](https://kilonova.ro/problems/1469)
- [CSES Minimizing Coins](https://cses.fi/problemset/task/1634)
- [RoAlgo Contest 2 strehaia](https://kilonova.ro/problems/684)
- [Infoarena Triunghi](https://infoarena.ro/problema/triunghi)
- [IIOT 2021 Castle](https://kilonova.ro/problems/342)
- [ONI 2015 Procente](https://kilonova.ro/problems/1469)
- [RCPC 2023 Dragons](https://kilonova.ro/problems/1902)
- [ONI 2017 Baraj Seniori Cli](https://kilonova.ro/problems/274)
- [USACO Gold Fruit
  Feast](https://usaco.org/index.php?page=viewproblem2&cpid=574)
- [Subset Sum Queries](https://atcoder.jp/contests/abc321/tasks/abc321_f)
- [Probleme cu rucsac de pe Kilonova](https://kilonova.ro/tags/298)
- [Probleme cu rucsac de pe
  Infoarena](https://infoarena.ro/cauta-probleme?tag_id[]=95)

## Lectură suplimentară

- [Problema rucsacului - Infoarena](https://infoarena.ro/problema/rucsac)
- [Problema rucsacului - CPPI
  Sync](https://cppi.sync.ro/materia/problema_rucsacului.html)
- [Knapsack DP - USACO Guide](https://usaco.guide/gold/knapsack?lang=cpp)
