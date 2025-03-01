---
id: bitmask-dp
authors: [stefdasca]
prerequisites:
    - intro-dp
    - bitwise-ops
tags:
    - programare dinamica
    - operatii pe biti
    - submultimi
---

Atunci când vorbim de tipuri de probleme pentru care apelăm la soluții bazate pe
metoda programării dinamice, dinamicile pe măști pe biți (_bitmask dp_) se
disting prin faptul că reușesc să formalizeze aceste calcule pentru dimensiuni
mici ale valorilor, eliminând necesitatea de a calcula toate cele $N!$ permutări
ale șirului dat, prin stări care să țină doar posibilele rezultate optime.

Chiar dacă această subtehnică este folosită doar pentru dimensiuni ale datelor
foarte mici (de regulă, valoarea maximă a lui $N$ într-o problemă de acest gen
este 20), bitmask dp se dovedește a fi o unealtă foarte utilă în multe
instanțe, chiar și atunci când trebuie să găsim soluții încete pentru a face
pași spre a optimiza diverse abordări.

!!! note "Observație"

    În jargonul algoritmic românesc, această tehnică este numită dinamică pe
    stări exponențiale, denotând numărul exponențial de stări (de regulă, $2^N$
    stări)

## Introducere și aplicare

În primul rând, pentru a putea folosi această tehnică, trebuie să ne reamintim
câteva concepte învățate de la operațiile pe biți, cele mai importante fiind
submulțimile și măștile pe biți. Pentru mai multe detalii, puteți citi
[aici](./intro-combinatorics.md#submultimi).

Acum că acest concept vă este cunoscut, pentru a formaliza o stare într-o
problemă de acest gen, trebuie să găsim o mulțime de valori cu un cardinal
suficient de mic, care are proprietatea că submulțimile sale pot constitui stări
într-o relație de recurență de acest fel.

!!! note "Observație"

    Nu este obligatoriu ca starea pe care o folosim să fie legată strict de
    șirul de numere dat. De foarte multe ori, vom aplica această tehnică atunci
    când avem o particularitate care poate fi transpusă în submulțimi (un
    exemplu ar fi atunci când avem puține valori distincte sau un set de litere
    al alfabetului).

În cele mai multe cazuri, vorbim de dinamici de tipul $dp[msk]$ sau
$dp[msk][i]$, unde ambele reprezintă răspunsul optim pentru submulțimea
reprezentată cu masca $msk$ și eventual $i$ fiind ultima valoare aleasă.
Evident, dacă problema o impune, putem folosi și alte dimensiuni pentru a
reprezenta datele într-o manieră mai clară și fără potențiale erori.

Vom continua prin a prezenta probleme clasice care se rezolvă cu această
tehnică.

## Problema [teamwork](https://www.pbinfo.ro/probleme/1230/teamwork)

Se poate remarca faptul că sunt cel mult 18 participanți, iar fiecare trebuie
să fie folosit o dată. Generarea tuturor permutărilor ar fi mult prea înceată,
așa că va trebui să păstrăm informații legate de varianta optimă de a folosi
toate submulțimile de copii.

Definim $dp[msk]$ ca fiind suma maximă a scorurilor dacă am folosit submulțimea
cu masca $msk$. Pentru a face tranziția de la $msk$ la o altă stare, va trebui
să parcurgem lista de participanți, verificând cu ajutorul operațiilor pe biți
dacă au mai fost luați sau nu.

Soluția va avea complexitate $\mathcal{O}(2^n \cdot n)$, fiind suficient de bună pentru
problema dată.

!!! note "Observație"

    De-a lungul soluțiilor prezentate, se va observa preferința pentru indexarea
    de la 0 a pozițiilor, motivul fiind unul ce ține de eficiența de timp și
    memorie (dacă am fi indexat de la 1, am fi avut nevoie de două ori mai
    multe măști, deoarece măștile care conțineau poziția 0 deveneau inutile).

```cpp
#include <fstream>
#include <vector>
using namespace std;

int main() {
    ifstream cin("teamwork.in");
    ofstream cout("teamwork.out");

    int n;
    cin >> n;

    vector<vector<int>> a(n, vector<int>(n));
    vector<int> dp(1 << n);

    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < n; ++j) {
            cin >> a[i][j];
        }
    }
    for (int msk = 0; msk < (1 << n) - 1; ++msk) {
        // cati biti are i
        int nb = __builtin_popcount(msk);
        for (int j = 0; j < n; ++j) {
            if (!(msk & (1 << j))) {
                dp[msk ^ (1 << j)] =
                    max(dp[msk ^ (1 << j)], dp[msk] + a[nb][j]);
            }
        }
    }
    cout << dp[(1 << n) - 1] << '\n';
    return 0;
}
```

## Problema [Elevator Rides](https://cses.fi/problemset/task/1653)

Pentru a rezolva această problemă, vom recurge la o altă dinamică similară cu
cea anterioară, singura diferență fiind faptul că trebuie să o gândim și din
perspectiva problemei rucsacului. Este clar că vrem să avem ceva de tipul
$dp[msk]$ care să ne țină numărul minim de folosiri ale liftului pentru
submulțimea de oameni cu masca $msk$, dar trebuie să găsim o metodă pentru a
departaja mulțimile cu același număr de excursii cu liftul.

O metodă simplă este aceea de a ține o altă informație în dinamica noastră, și
anume gradul de umplere al liftului la excursia curentă, astfel vom ține în
dinamica noastră o pereche, care va avea atât numărul minim de călătorii, cât și
gradul de umplere al călătoriei curente. La fiecare pas, fie vom reuși să
adăugăm călătorul curent în excursia curentă, fie vom începe un alt drum cu
liftul.

Complexitatea va fi la fel ca la problema precedentă, $\mathcal{O}(2^n \cdot n)$, fiind
suficient de bună pentru cerințele problemei.

```cpp
#include <iostream>
#include <vector>

using namespace std;

int main() {
    int n, w;
    cin >> n >> w;

    vector<int> v(n);
    for (int i = 0; i < n; ++i) {
        cin >> v[i];
    }

    vector<pair<int, int>> dp(1 << n);
    dp[0].first = 1;

    for (int msk = 1; msk < (1 << n); ++msk) {
        dp[msk].first = n + 1;
    }

    for (int msk = 0; msk < (1 << n); ++msk) {
        for (int j = 0; j < n; ++j) {
            if (msk & (1 << j)) {
                continue;
            }
            if (dp[msk].second + v[j] <= w) {
                dp[msk + (1 << j)] = min(
                    dp[msk + (1 << j)], {dp[msk].first, dp[msk].second + v[j]});
            } else {
                dp[msk + (1 << j)] =
                    min(dp[msk + (1 << j)], {dp[msk].first + 1, v[j]});
            }
        }
    }

    cout << dp[(1 << n) - 1].first;
    return 0;
}
```

## Problema [Hamiltonian Flights](https://cses.fi/problemset/task/1690)

Această problemă este una din variațiile problemei comis-voiajorului sau cum se
numește în engleză, [Traveling salesman
problem](https://en.wikipedia.org/wiki/Travelling_salesman_problem).

Pentru a afla numărul de drumuri de la 0 la $n-1$ care trec prin toate
nodurile, vom ține o dinamică de tip $dp[msk][i]$ în care vom ține numărul de
drumuri care pleacă de la 0, sunt la nodul $i$ și au trecut prin submulțimea
de noduri $msk$. Se poate observa că graful dat poate avea muchii multiple,
acesta fiind motivul pentru care ținem muchiile într-o listă de vecini și nu
într-o matrice de adiacență.

Deoarece limita de timp este una strânsă, sunt necesare câteva optimizări
prezentate în cod pentru a evita parcurgerea stărilor inutile.

```cpp
#include <cassert>
#include <iostream>
#include <vector>

using namespace std;

const int mod = 1000000007;

int main() {
    int n, m;
    cin >> n >> m;

    vector<vector<int>> graph(n);

    for (int i = 0; i < m; ++i) {
        int a, b;
        cin >> a >> b;
        --a, --b;
        graph[a].push_back(b);
    }

    vector<vector<int>> dp((1 << n), vector<int>(n));
    dp[1][0] = 1;

    for (int msk = 0; msk < (1 << n); msk++) {
        // daca masca nu contine 1, nu are sens sa continuam
        if (!(msk & 1)) {
            continue;
        }
        // daca masca contine n, nu e valida (procesam n la final)
        if (msk & (1 << (n - 1))) {
            continue;
        }
        for (int node = 0; node < n; node++) {
            // nodul trebuie sa fi fost procesat deja
            if (!(msk & (1 << node))) {
                continue;
            }
            for (int nxt : graph[node]) {
                // nu vom procesa un nod deja vizitat
                if (msk & (1 << nxt)) {
                    continue;
                }
                dp[msk ^ (1 << nxt)][nxt] += dp[msk][node];
                if (dp[msk ^ (1 << nxt)][nxt] >= mod) {
                    dp[msk ^ (1 << nxt)][nxt] -= mod;
                }
            }
        }
    }

    cout << dp[(1 << n) - 1][n - 1] << '\n';
    return 0;
}
```

## Concluzii

Dinamica pe stări exponențiale este o tehnică foarte utilă când trebuie să
formalizăm relații pe un număr mic de elemente. Aplicațiile acesteia pe grafuri
sau pe alte tipuri de mulțimi vor fi foarte utile atât în concursuri, cât și în
alte situații practice, iar tehnici precum [SOS
DP](https://usaco.guide/adv/dp-sos?lang=cpp) și [Broken Profile
DP](https://usaco.guide/adv/dp-more?lang=cpp#dp-on-broken-profile) vor aduce
conceptul la un nivel și mai avansat.

## Probleme suplimentare

- [infoarena morcovi](https://infoarena.ro/problema/morcovi)
- [infoarena poly](https://infoarena.ro/problema/poly)
- [infoarena coins](https://www.infoarena.ro/problema/coins)
- [infoarena zebughil](https://www.infoarena.ro/problema/zebughil)
- [RCPCamp 2023 Anton Would Approve this
  problem](https://kilonova.ro/problems/1885)
- [OJI 2011 Ubuntzei](https://kilonova.ro/problems/40)
- [OJI 2020 RecycleBin](hhttps://kilonova.ro/problems/19/)
- [Lot Juniori 2014 ssce](https://kilonova.ro/problems/1756)
- [Lot Juniori 2024 nooverlap](https://kilonova.ro/problems/2802/)
- [Lot Juniori 2016 ksiruri](https://kilonova.ro/problems/1716)
- [Lot Juniori 2024 numbers](https://kilonova.ro/problems/2839?list_id=1115)
- [OJI 2005 scara](https://kilonova.ro/problems/746)
- [AtCoder Matching](https://atcoder.jp/contests/dp/tasks/dp_o?lang=en)
- [Codeforces Square Subsets](https://codeforces.com/contest/895/problem/C)
- [Nastya and Scoreboard](https://codeforces.com/contest/1340/problem/B)
- [USACO Gold Uddered but not
  Heard](http://www.usaco.org/index.php?page=viewproblem2&cpid=1089)
- [Codeforces Team Building](https://codeforces.com/contest/1316/problem/E)
- [Codeforces Minimax Problem](https://codeforces.com/contest/1288/problem/D)
- [COCI 2016 Burza](https://oj.uz/problem/view/COCI16_burza)
- [permutare - InfoTeams #2](https://kilonova.ro/problems/3247)

## Lectură suplimentară

- [Bitmask DP - USACO Guide](https://usaco.guide/gold/dp-bitmasks?lang=cpp)
- [A primer on bitmask DP - Neo Wang](https://nwatx.me/post/dpbitmasks)
- [Curs lot juniori 2023 - Dinamică pe stări
  exponențiale](https://sepi.ro/assets/upload-file/articole/dinamica%20pe%20stari%20exponentiale.pdf)
- [Dinamică pe stări exponențiale - CPPI
  Sync](https://cppi.sync.ro/materia/dinamica_pe_stari_exponentiale_0.html)
- [DP Book, pagina 37](https://dp-book.com/Dynamic_Programming.pdf)
- [(Avansat) Broken Profile DP - USACO
  Guide](https://usaco.guide/adv/dp-more?lang=cpp#dp-on-broken-profile)
- [(Avansat) SOS DP - USACO Guide](https://usaco.guide/adv/dp-sos?lang=cpp)
- [(Avansat) SOS Dynamic Programming -
  Codeforces](https://codeforces.com/blog/entry/45223)
