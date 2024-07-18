---
tags:
    - programare dinamica
    - DP
---

<!-- Credits-->
**Autori**: Teodor-Ștefan Manolea, Ștefan-Cosmin Dăscălescu

<!-- Introduction -->
## Introducere

Programarea dinamică (abrv. DP) este un mod de gândire care poate fi folosit pentru rezolvarea problemelor la care trebuie să aflăm fie numărul de soluții corecte pentru un anumit set de date, fie soluția optimă (minim, maxim, etc.).

Pentru a realiza acest lucru, vom descompune problema în mai multe subprobleme, care, luate împreună, să ne obțină răspunsul dorit.

## De ce trebuie să știm programare dinamică?

Deși tipurile de probleme menționate anterior se pot rezolva și cu alte tehnici, cum ar fi backtracking, greedy, formulă matematică etc., programarea dinamică vine drept o nouă perspectivă asupra problemelor care ne permite să găsim soluții pentru o mulțime de probleme, păstrând avantajele care ne sunt oferite atât de greedy cât și de backtracking.

<!-- Types of DP -->
## Clasificare

În elaborarea unui algoritm care conține DP, putem utiliza mai multe abordări.

### Tipuri de scriere

<!-- TODO adăugare linkuri pentru complete search recursiv și iterativ -->
- Recursiv

- Iterativ

|     **Recursiv**     |       **Iterativ**      |
|:--------------------:|:-----------------------:|
|       Mai lent       |        Mai rapid        |
| Mai ușor de elaborat | Mai dificil de elaborat |
|       Memoizare      |        Tabulare         |
|      Top-Down DP     |       Bottom-Up DP      |

### Modalități de abordare

1. Top-Down DP:

    * Această formă de DP pleacă de la starea finală a problemei, ea utilizând
    stările anterioare, până la starea inițială pe care o cunoaștem, pentru
    a-și construi parametrii ei.
    * De obicei această formă de DP este scrisă utilizând recursivitatea

2. Bottom-Up DP:
    * Această formă de DP pleacă de la starea inițială a problemei, ea
    construind parametrii stărilor următoare care la rândul lor vor face asta
    până ce ajungem la construirea parametrilor stării finale.
    * De obicei această formă de DP este scrisă utilizând Complete Search-ul

### Modalități de tranziție

- Pull-DP: Informația din starea curentă se formează bazându-se pe una sau mai multe stări anterioare.
- Push-DP: Informația din starea curentă se utilizează pentru calcularea unei stării viitoare.

<!-- Problems -->
## Probleme clasice

<!-- Beginning -->
Pentru a ne dezvolta intuiția în ceea ce privește această tehnică, este necesar să înțelegem mecanismul pe care se bazează problemele clasice.

Este esențial să rezolvăm cât mai multe probleme de DP pentru a deveni fluenți în elaborarea soluților.

<!-- First Problem -->
### Problema [Frog 1](https://atcoder.jp/contests/dp/tasks/dp_a)

Această problemă ne cere să aflăm costul minim de care are nevoie o broască pentru a ajunge de pe prima piatră pe ultima, dacă se poate deplasa doar pe piatra din față sau pe piatra cu două poziții mai în față.

Deoarece restricțiile sunt foarte mari, aplicarea unei soluții care verifică toate variantele posibile folosind Backtracking este imposibilă, iar diverse abordări de tip Greedy, precum saltul spre cea mai apropiată piatră sau spre piatra cu o diferență de înălțime minimă sunt greșite.

Astfel, se impune folosirea unei soluții care folosește metoda programării dinamice, unde putem stoca $dp[i]$ care va reprezenta suma minimă a diferențelor salturilor necesare pentru a ajunge la poziția $i$, motivul pentru care vrem să facem asta este acela că este important să avem un răspuns optim stocat pentru fiecare poziție în parte. 

Pentru a calcula $dp[i]$, ne vom folosi de informațiile din enunț, și anume faptul că avem voie să sărim pe o poziție aflată la cel mult două unități de poziția curentă, astfel $dp[i]$ va fi egal cu următoarea formulă:

$$
dp[i] = min(dp[i-1] + abs(v[i] - v[i-1]), dp[i-2] + abs(v[i] - v[i-2]))
$$

Cazul de bază constă în faptul că $dp[1] = 0$ și $dp[2] = abs(v[1] - v[2])$, iar complexitatea acestei soluții este $O(n)$. 

Mai jos puteți găsi abordarea recursivă și cea iterativă a problemei.

=== "Recursiv"

    ```cpp
    #include <iostream>
    #include <vector>

    using namespace std;

    int solve(int poz, const vector<int> &v, vector<int> &dp) {
        // cazuri de baza
        if (poz == 1) {
            return 0;
        }
        if (poz == 2) {
            return abs(v[2] - v[1]);
        }
        // evitarea calculelor redundante
        if (dp[poz] != -1) {
            return dp[poz];
        }

        dp[poz] = min(solve(poz - 1, v, dp) + abs(v[poz - 1] - v[poz]),
                    solve(poz - 2, v, dp) + abs(v[poz - 2] - v[poz]));
        return dp[poz];
    }

    int main() {
        int n;
        cin >> n;

        vector<int> v(n + 1);
        vector<int> dp(n + 1, -1);

        for (int i = 1; i <= n; i++) {
            cin >> v[i];
        }

        cout << solve(n, v, dp) << '\n';
        return 0;
    }
    ```

=== "Iterativ"

    ```cpp
    #include <iostream>
    #include <vector>

    using namespace std;

    int main() {
        int n;
        cin >> n;

        vector<int> v(n + 1);
        vector<int> dp(n + 1);

        for (int i = 1; i <= n; i++) {
            cin >> v[i];
        }

        for (int i = 2; i <= n; i++) {
            if (i == 2) {
                dp[i] = abs(v[i] - v[i - 1]);
            } else {
                dp[i] = min(dp[i - 1] + abs(v[i] - v[i - 1]),
                            dp[i - 2] + abs(v[i] - v[i - 2]));
            }
        }

        cout << dp[n] << '\n';
        return 0;
    }
    ```

<!-- Second Problem -->

### Problema [Frog 2](https://atcoder.jp/contests/dp/tasks/dp_b)
La fel ca la problema precedentă, trebuie să aflăm costul minim de care are nevoie o broască pentru a ajunge de pe prima piatră pe ultima, dacă se poate deplasa cu cel mult $k$ pași la un moment dat.

Spre deosebire de problema precedentă, pentru a calcula $dp[i]$, ne vom folosi de informațiile din enunț, recurența de la Frog 1 va fi extinsă pentru a acoperi $k$ poziții. 

$$
dp[i] = min(dp[i-x] + abs(v[i] - v[i-x])), \forall x \leq k
$$

Cazul de bază constă în faptul că $dp[1] = 0$ și $dp[2] = abs(v[1] - v[2])$, iar complexitatea acestei soluții este $O(n \cdot k)$. 



=== "Recursiv"

    ```cpp
    #include <iostream>
    #include <vector>

    using namespace std;

    int solve(int poz, int diff, const vector<int> &v, vector<int> &dp) {
        if (poz == 1) {
            return 0;
        }
        if (dp[poz] != -1) {
            return dp[poz];
        }

        dp[poz] = (1 << 30);  // 2^30
        for (int i = 1; i <= diff; i++) {
            if (poz - i >= 1) {
                dp[poz] = min(dp[poz], solve(poz - i, diff, v, dp) +
                                        abs(v[poz] - v[poz - i]));
            }
        }
        return dp[poz];
    }
    int main() {
        int n, k;
        cin >> n >> k;

        vector<int> v(n + 1);
        vector<int> dp(n + 1, -1);

        for (int i = 1; i <= n; i++) {
            cin >> v[i];
        }

        cout << solve(n, k, v, dp) << '\n';
        return 0;
    }
    ```
=== "Iterativ"

    ```cpp
    #include <iostream>
    #include <vector>

    using namespace std;

    int main() {
        int n, k;
        cin >> n >> k;

        vector<int> v(n + 1);
        vector<int> dp(n + 1, 1 << 30);  // 2 ^ 30

        for (int i = 1; i <= n; i++) {
            cin >> v[i];
        }

        for (int i = 2; i <= n; i++) {
            for (int j = 1; j <= k; j++) {
                if (i - j >= 1) {
                    dp[i] = min(dp[i], dp[i - j] + abs(v[i] - v[i - j]));
                }
            }
        }

        cout << dp[n] << '\n';
        return 0;
    }
    ```

<!-- Third Problem -->
### Problema [Moneda](#)

!!! info "Cerință"

    Astăzi, la ora domnului **profesor Tetris**, ți s-a pus următoarea întrebare:
    „Dacă eu îți dau $N$ tipuri de monede, având acces la o infinitate de
    monede $C$ de acele tipuri, află modalitatea optimă de a obține suma $S$”.
    Pe momentul orei tu nu ai știut cum să răspunzi, Însă acum, mai determinat
    ca niciodată, vrei să rezolvi această problem, având în față un document
    educational de 5 stele Micheline. Rezolvă problema!

    Vom defini modalitatea optimă de a obține suma $S$ ca fiind modalitatea prin
    care utilizezi cât mai puține monede per total!

    **Restricții:**

    - $ 1 \leq N \leq 500 $

    - $ 1 \leq S \leq 100000 $

    - $ 1 \leq C_i \leq 2500 $

La început, când ați citit această problemă, probabil v-ați gândit la o
rezolvare Greedy (care mai încolo o să vedeți că este Greedy Euristic), prin
care ați fi sortat descrescător șirul de monede și ați fi încercat să utilizați
denominația cea mai mare, care este mai mică ca S, cât timp puteați. După ați fi
continuat cu următoarea denominație cea mai mare care respectă condiția aceasta
pentru suma rămasă ș.a.m.d. Ca să vă dovedesc că nu funcționează această
modalitate, încercați să rezolvați această problemă, utilizând modalitatea
anterior prezentată, având aceste date de intrare ($N$ numărul de monede, apoi
$S$ suma și apoi cele $N$ monede):

```
3
31
7 2 15
```

Acum că ați încercat să rezolvați problema într-un mod cunoscut vouă, și ați
văzut că nu îți garantează un răspuns, haideți să vă prezint o soluție corectă!

Pentru această problem, o să vă prezint soluțiile utilizând ambele modalități de
abordare și scriere a sursei și modalități de tranziție.


=== "Recursiv"
    !!! note "Explicație"
        Pentru a găsi soluția optimă, noi vom avea vectorul dp care se utilizează pentru memoizare, el având forma următoare: dp[suma de bani rămasă de acoperit] = nr de bacnote necesare pentru a ajunge la suma de bani rămasă de acoperit curentă.
        Pentru asta ne vom utiliza de o recursiune care are ca parametrii de stare suma de bani care a rămas de plătit, numărul de monede pe care l-am utilizat până acum și vectorul de denominații accesibile.
    

    ```cpp
    #include <iostream>
    #include <vector>

    using namespace std;

    const int MAXIM_SUMA_MONEDE = 100000;

    int N, S;
    vector<int> dp(MAXIM_SUMA_MONEDE + 1);

    void solve(const int suma, const int nr_monede, const vector<int>& monede) {
        if (suma == 0) {
            return;
        }

        for (const auto moneda : monede) {
            if (suma >= moneda) {
                if (dp[suma - moneda] > nr_monede + 1) {
                    dp[suma - moneda] = nr_monede + 1;
                    solve(suma - moneda, nr_monede + 1, monede);
                }
            }
        }
    }

    int main() {
        cin >> N >> S;

        vector<int> monede(N, 0);

        for (auto& moneda : monede) {
            cin >> moneda;
        }

        solve(S, 0, monede);

        cout << dp[0];
        return 0;
    }
    ```

=== "Iterativ"
    !!! note "Explicație"
        Pentru a găsi soluția optimă, noi vom trece prin fiecare sumă de bani care este mai mică decât $S$, încercând, dacă putem, să continuăm să adăugăm bacnote astfel încât să ajungem la suma de bani dorită. Pentru acest lucru vom ține un vector dp de forma următoare: dp[sumă de bani totală] = numărul de bacnote necesare pentru a ajunge la această sumă de bani.

    ```cpp
    #include <algorithm>
    #include <iostream>
    #include <vector>

    using namespace std;

    const int MAXIM_SUMA_MONEDE = 100000;

    int N, S;
    vector<int> dp(MAXIM_SUMA_MONEDE + 1);

    int main() {
        cin >> N >> S;
        vector<int> coins(N);
        for (int i = 0; i < N; i++) {
            cin >> coins[i];
        }
        for (int i : coins) {
            dp[i] = 1;
        }

        for (int i = 1; i < S; i++) {
            if (dp[i] != 0) {
                for (int coin : coins) {
                    if (i + coin <= S) {
                        if (dp[i + coin] == 0) {
                            dp[i + coin] = dp[i] + 1;
                        } else {
                            dp[i + coin] = min(dp[i + coin], dp[i] + 1);
                        }
                    }
                }
            }
        }

        cout << dp[S];
        return 0;
    }
    ```

<!-- Fourth Problem -->
### Problema [Vacation](https://atcoder.jp/contests/dp/tasks/dp_c)

Pentru această problemă, trebuie să aflăm satisfacția maximă pe care o poate obține Taro în $n$ zile, dacă nu are voie să repete o activitate de două ori la rând. 

Din nou, se poate demonstra cu ușurință că o soluție de tip Greedy nu va merge, deoarece ne putem bloca alegeri mai bune ulterior cu alegerile curente. 

Totodată, mai apare un element nou în rezolvarea acestor probleme, și anume faptul că vom avea nevoie de o nouă dimensiune pentru a păstra informații cu privire la ultima activitate efectuată de el, pentru a evita o situație în care alegem de două ori aceeași activitate. 

Astfel, vom defini $dp[i][j]$ ca fiind suma maximă a satisfacției dacă am parcurs primele $i$ zile, iar ultima activitate a fost de tipul $j$, $j$ fiind $0$, $1$ sau $2$, în funcție de activitatea aleasă. 

Pentru a calcula $dp[i][j]$, va trebui să ne raportăm la sumele din ziua precedentă, corespunzătoare celorlalte două activități deoarece nu avem voie să alegem aceeași activitate iar.

$$
dp[i][j] = max(dp[i-1][x]) + v[j], \forall x \neq j
$$

Din nou ca la celelalte probleme, puteți găsi mai jos abordarea recursivă și cea iterativă a problemei.

!!! note "Observație"
    Deoarece avem nevoie doar de valorile din ziua precedentă, nu este necesar să păstrăm în memorie toată matricea, ci doar ultimele două linii, optimizare pe care o vom prezenta în detaliu mai jos.
    
=== "Recursiv"

    ```cpp
    #include <algorithm>
    #include <iostream>
    #include <vector>

    using namespace std;

    int solve(const int poz, const vector<vector<int>> &v, vector<vector<int>> &dp,
            const int activ) {
        if (poz == 1) {
            return v[poz][activ];
        }
        if (dp[poz][activ] != -1) {
            return dp[poz][activ];
        }

        dp[poz][activ] = 0;
        for (int i = 0; i < 3; i++) {
            if (i != activ) {
                dp[poz][activ] = max(dp[poz][activ], solve(poz - 1, v, dp, i));
            }
        }

        dp[poz][activ] += v[poz][activ];
        return dp[poz][activ];
    }

    int main() {
        int n;
        cin >> n;

        vector<vector<int>> v(n + 1, vector<int>(3));
        vector<vector<int>> dp(n + 1, vector<int>(3, -1));

        for (int i = 1; i <= n; i++) {
            cin >> v[i][0] >> v[i][1] >> v[i][2];
        }

        cout << max({solve(n, v, dp, 0), solve(n, v, dp, 1), solve(n, v, dp, 2)})
            << '\n';
        return 0;
    }
    ```

=== "Iterativ"

    ```cpp
    #include <algorithm>
    #include <iostream>
    #include <vector>

    using namespace std;

    int main() {
        int n;
        cin >> n;

        vector<vector<int>> dp(n + 1, vector<int>(3));

        for (int i = 1; i <= n; i++) {
            int a, b, c;
            cin >> a >> b >> c;
            if (i == 1) {
                dp[1][0] = a;
                dp[1][1] = b;
                dp[1][2] = c;
            } else {
                dp[i][0] = max(dp[i - 1][1], dp[i - 1][2]) + a;
                dp[i][1] = max(dp[i - 1][0], dp[i - 1][2]) + b;
                dp[i][2] = max(dp[i - 1][0], dp[i - 1][1]) + c;
            }
        }

        cout << max({dp[n][0], dp[n][1], dp[n][2]}) << '\n';
        return 0;
    }
    ```



=== "Iterativ optimizat"

    !!! info "Explicație"
        Deoarece avem nevoie doar de ultimele două linii, nu vom ține toată matricea, mutând mereu valorile calculate pe prima linie pentru a păstra corectitudinea recurenței.

    ```cpp
    #include <algorithm>
    #include <iostream>
    #include <vector>

    using namespace std;

    int main() {
        int n;
        cin >> n;

        vector<vector<int>> dp(2, vector<int>(3));

        for (int i = 1; i <= n; i++) {
            int a, b, c;
            cin >> a >> b >> c;
            if (i == 1) {
                dp[0][0] = a;
                dp[0][1] = b;
                dp[0][2] = c;
            } else {
                dp[1][0] = max(dp[0][1], dp[0][2]) + a;
                dp[1][1] = max(dp[0][0], dp[0][2]) + b;
                dp[1][2] = max(dp[0][0], dp[0][1]) + c;

                swap(dp[0], dp[1]);
                fill(dp[1].begin(), dp[1].end(), 0);
            }
        }

        cout << max({dp[0][0], , dp[0][1], dp[0][2]}) << '\n';
        return 0;
    }
    ```

<!-- Fifth problem -->

### Problema [Array Description](https://cses.fi/problemset/task/1746/)

Pentru această problemă, trebuie să aflăm numărul de șiruri pe care le putem construi astfel încât să respecte condițiile din enunț cu privire la valorile deja setate și la diferența dintre ele. 

Astfel, vom defini $dp[i][j]$ ca fiind numărul de moduri de a crea un șir cu $i$ numere, dacă valoarea de pe poziția $i$ este $j$. 

Pentru a afla $dp[i][j]$, va trebui să ne raportăm la valorile de pe poziția precedentă, aflate la o distanță de cel mult $1$, cu condiția să putem pune $j$ pe poziția $i$. 

!!! note "Observatie"
    Pentru a calcula numărul de soluții modulo $x$, vom folosi operatorul $\%$ (mod). Dar deoarece aici avem nevoie doar de operații de adunare, putem pur și simplu să efectuăm operațiile de adunare și să folosim scăderi în mod convenabil, reușind astfel să optimizăm soluția.
    

```cpp
#include <iostream>
#include <vector>

using namespace std;

const int MOD = 1000000007;

int main() {
    int n, m;
    cin >> n >> m;

    vector<int> vals(n + 1);
    for (int i = 1; i <= n; i++) {
        cin >> vals[i];
    }

    vector<vector<int>> dp(n + 1, vector<int>(m + 1));

    for (int i = 1; i <= m; i++) {
        if (vals[1] == 0 || vals[1] == i) {
            dp[1][i] = 1;
        }
    }

    for (int i = 2; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (vals[i] && vals[i] != j) {
                continue;
            }
            for (int dif = -1; dif <= 1; dif++) {
                if (j + dif > 0 && j + dif <= m) {
                    dp[i][j] += dp[i - 1][j + dif];
                    if (dp[i][j] >= MOD) {
                        dp[i][j] -= MOD;
                    }
                }
            }
        }
    }

    int ans = 0;
    for (int i = 1; i <= m; i++) {
        ans += dp[n][i];
        if (ans >= MOD) {
            ans -= MOD;
        }
    }

    cout << ans << '\n';
    return 0;
}
```

<!-- Sixth problem -->

## Problema [Grid 1](https://atcoder.jp/contests/dp/tasks/dp_h)

Pentru această problemă, trebuie să aflăm numărul de moduri de a parcurge matricea din colțul stânga-sus în colțul dreapta-jos prin mișcări în jos și la dreapta, fără să parcurgem pătrate acoperite de ziduri. 

Deoarece avem de-a face cu o matrice, putem ține $dp[i][j]$ ca fiind numărul de moduri de a parcurge matricea dacă am ajuns la pătratul $(i, j)$. Deoarece putem ajunge la $(i, j)$ din pătratele de sus și stânga, acestea vor fi cele două rezultate care contribuie la răspunsul dat. 

Astfel, $dp[i][j] = dp[i-1][j] + dp[i][j-1]$.

### Soluție

```cpp
#include <iostream>
#include <vector>

using namespace std;

const int MOD = 1000000007;

int main() {
    int n, m;
    cin >> n >> m;

    vector<vector<char>> grid(n + 1, vector<char>(m + 1));
    vector<vector<int>> dp(n + 1, vector<int>(m + 1));
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            cin >> grid[i][j];
        }
    }

    dp[1][1] = 1;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (grid[i][j] != '#') {
                dp[i][j] += dp[i - 1][j] + dp[i][j - 1];
                if (dp[i][j] >= MOD) {
                    dp[i][j] -= MOD;
                }
            }
        }
    }

    cout << dp[n][m] << '\n';
    return 0;
}
```

<!-- Seventh problem -->
## Problema [Sumtri1](https://www.pbinfo.ro/probleme/386/sumtri1)

=== "Recursiv"

    ```cpp
    #include <fstream>

    using namespace std;
    ifstream fin("sumtri1.in");
    ofstream fout("sumtri1.out");

    const int MAX_N = 101;

    using matrixB = bool[MAX_N][MAX_N];
    using matrixI = int[MAX_N][MAX_N];

    matrixB change;
    matrixI triunghi, dp;

    int n;
    int ans;

    int solve(const int lin, const int col) {
        if (dp[lin][col] != 0) {
            return dp[lin][col];
        }
        if (lin > n) {
            return 0;
        }

        const int left = solve(lin + 1, col);
        const int right = solve(lin + 1, col + 1);

        if (left < right) {
            dp[lin][col] = triunghi[lin][col] + left;
            change[lin][col] = false;
        } else {
            dp[lin][col] = triunghi[lin][col] + right;
            change[lin][col] = true;
        }
        return dp[lin][col];
    }

    int main() {
        fin >> n;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                fin >> triunghi[i][j];
            }
        }

        fout << solve(1, 1) << '\n';
        

        for (int l = 1, c = 1; l <= n; l++) {
            fout << triunghi[l][c] << ' ';
            if (change[l][c]) {
                c++;
            }
        }
        return 0;
    }
    ```

=== "Iterativ"

    ```cpp
    #include <fstream>

    using namespace std;
    ifstream fin("sumtri1.in");
    ofstream fout("sumtri1.out");

    const int MAX_N = 101;

    using matrix = int[MAX_N][MAX_N];

    int n;
    matrix triunghi, dp, cale;

    int main() {
        fin >> n;

        for (int i = 1; i <= n; ++i) {
            for (int j = 1; j <= i; ++j) {
                fin >> triunghi[i][j];
                if (i == n) {
                    dp[n][j] = triunghi[n][j];
                }
            }
        }

        for (int i = n - 1; i > 0; --i) {
            for (int j = 1; j <= i; ++j) {
                dp[i][j] = triunghi[i][j];
                if (dp[i + 1][j + 1] < dp[i + 1][j]) {
                    dp[i][j] += dp[i + 1][j + 1];
                    cale[i][j] = j + 1;
                } else {
                    dp[i][j] += dp[i + 1][j];
                    cale[i][j] = j;
                }
            }
        }

        fout << dp[1][1] << '\n';

        int j = 1;
        for (int i = 1; i <= n; ++i) {
            fout << triunghi[i][j] << " ";
            j = cale[i][j];
        }

        return 0;
    }
    ```

<!-- Extra stuff -->

## Resurse suplimentare

* [DP Book](https://dp-book.com/Dynamic_Programming.pdf)
* [Programare dinamica - CPPI Sync](https://cppi.sync.ro/materia/probleme_diverse_dinamica_3.html)
* [Introduction to DP - USACO Guide](https://usaco.guide/gold/intro-dp?lang=cpp)
* [DP Tutorial and Problem List](https://codeforces.com/blog/entry/67679)

## Probleme suplimentare

* [Infoarena custi](https://infoarena.ro/problema/custi)
* [Codeforces Boredom](https://codeforces.com/problemset/problem/455/A)
* [AtCoder Weak Takahashi](https://atcoder.jp/contests/abc232/tasks/abc232_d)
* [IIOT 2023-24 PingPong](https://kilonova.ro/problems/1941)
* [AtCoder 1111gal password](https://atcoder.jp/contests/abc242/tasks/abc242_c)
* [AtCoder Flip Cards](https://atcoder.jp/contests/abc291/tasks/abc291_d)
* [IIOT Police](https://kilonova.ro/problems/967)
* [Counting Towers](https://cses.fi/problemset/task/2413)
* [AtCoder Index × A(Not Continuous ver.)](https://atcoder.jp/contests/abc267/tasks/abc267_d)
* [AtCoder Between Two Arrays](https://atcoder.jp/contests/abc222/tasks/abc222_d)
* [Lot Juniori Minusk](https://kilonova.ro/problems/1743)
* [AtCoder Count Bracket Sequences](https://atcoder.jp/contests/abc312/tasks/abc312_d)
* [AtCoder I hate Non Integer Number](https://atcoder.jp/contests/abc262/tasks/abc262_d)
* [Problemele cu DP de pe Kilonova](https://kilonova.ro/tags/275)
* [Problemele intre rating 500 si 1400 de aici](https://atcoder-tags.herokuapp.com/tag_search/Dynamic-Programming)
* [Problemele cu DP de pe infoarena](https://infoarena.ro/cauta-probleme?tag_id[]=58)
* [Ping Pong](https://kilonova.ro/problems/1941)