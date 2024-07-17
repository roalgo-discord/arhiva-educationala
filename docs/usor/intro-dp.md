---
tags:
    - programare dinamica
    - DP
---
<!-- /MD macros for title and shit -->

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

- [Recursiv](#)

- [Iterativ](#)

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

<!-- I. 1. First Problem -->
### [Frog1 Problem](https://atcoder.jp/contests/dp/tasks/dp_a)

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
        dp[poz] = min(solve(poz-1, v, dp) + abs(v[poz-1] - v[poz]), solve(poz-2, v, dp) + abs(v[poz-2] - v[poz]));
        return dp[poz];
    }

    int main() {
        int n;
        cin >> n;
        
        vector<int> v(n+1);
        vector<int> dp(n+1, -1);
        
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
        
        vector<int> v(n+1);
        vector<int> dp(n+1);
        
        for (int i = 1; i <= n; i++) {
            cin >> v[i];
        }
        for (int i = 2; i <= n; i++) {
            if (i == 2) {
                dp[i] = abs(v[i] - v[i-1]);
            }
            else {
                dp[i] = min(dp[i-1] + abs(v[i] - v[i-1]), dp[i-2] + abs(v[i] - v[i-2]));
            }
        }
        
        cout << dp[n] << '\n';
        return 0;
    }
    ```

<!-- II. 2. Second Problem -->

### [Frog 2 problem](https://atcoder.jp/contests/dp/tasks/dp_b)
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
        dp[poz] = (1<<30); // 2^30
        for (int i = 1; i <= diff; i++) {
            if (poz - i >= 1) {
                dp[poz] = min(dp[poz], solve(poz-i, diff, v, dp) + abs(v[poz] - v[poz-i]));
            }
        }
        return dp[poz];
    }
    int main() {
        int n, k;
        cin >> n >> k;
        
        vector<int> v(n+1);
        vector<int> dp(n+1, -1);
        
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
        
        vector<int> v(n+1);
        vector<int> dp(n+1);
        
        for (int i = 1; i <= n; i++) {
            cin >> v[i];
        }
        for (int i = 2; i <= n; i++) {
            dp[i] = (1<<30); // 2^30
            for (int j = 1; j <= k; j++) {
                if (i - j >= 1) {
                    dp[i] = min(dp[i], dp[i-j] + abs(v[i] - v[i-j]));
                }
            }
        }
        
        cout << dp[n] << '\n';
        return 0;
    }
    ```

<!-- III. 3. Third Problem -->
### [Coin problem](#)

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
anterior prezentată, având aceste date de intrare ($N$ numărul de monezi, apoi
$S$ suma și apoi cele $N$ monezi):

```
3
31
7 2 15
```

Acum că ați încercat să rezolvați problema într-un mod cunoscut vouă, și ați
văzut că nu îți garantează un răspuns, haideți să vă prezint o soluție corectă!

Pentru această problem, o să vă prezint soluțiile utilizând ambele modalități de
abordare, scriere a sursei și modalități de tranziție.


=== "Recursiv"

    ```cpp
    #include <iostream>
    #include <vector>

    using namespace std;

    const int MAXIM_SUMA_MONEZI = 100000;

    int N, S;
    vector<int> dp(MAXIM_SUMA_MONEZI + 1);

    void solve(const int suma, const int nr_monede, const vector<int> &monezi) {
        if (suma == 0) {
            return;
        }

        for (const auto moneda : monezi) {
            if (suma >= moneda) {
                if (dp[suma - moneda] > nr_monede + 1) {
                    dp[suma - moneda] = nr_monede + 1;
                    solve(suma - moneda, nr_monede + 1, monezi);
                }
            }
        }
    }

    int main() {
        cin >> N >> S;

        vector<int> monezi(N, 0);

        for (auto& moneda : monezi) {
            cin >> moneda;
        }

        solve(S, 0, monezi);

        cout << dp[0];
        return 0;
    }
    ```

=== "Iterativ"

    ```cpp
    #include <iostream>
    #include <vector>

    using namespace std;

    const int MAXIM_SUMA_MONEZI = 100000;

    int N, S;
    vector<int> dp(MAXIM_SUMA_MONEZI + 1);

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

<!-- IV. 4. Forth Problem -->
### [Vacation problem](https://atcoder.jp/contests/dp/tasks/dp_c)

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
    #include <iostream>
    #include <vector>

    using namespace std;

    int solve(const int poz, const vector<vector<int>> &v, vector<vector<int>> &dp, const int activ) {
        if (poz == 1) {
            return v[poz][activ];
        }
        if (dp[poz][activ] != -1) {
            return dp[poz][activ];
        }
        dp[poz][activ] = 0;
        for (int i = 0; i < 3; i++) {
            if (i != activ) {
                dp[poz][activ] = max(dp[poz][activ], solve(poz-1, v, dp, i));
            }
        }
        dp[poz][activ] += v[poz][activ];
        return dp[poz][activ];
    }

    int main() {
        int n;
        cin >> n;
        
        vector<vector<int>> v(n+1, vector<int>(3));
        vector<vector<int>> dp(n+1, vector<int>(3));
        
        for (int i = 1; i <= n; i++) {
            cin >> v[i][0] >> v[i][1] >> v[i][2];
            dp[i][0] = dp[i][1] = dp[i][2] = -1;
        }
        
        cout << max(solve(n, v, dp, 0), max(solve(n, v, dp, 1), solve(n, v, dp, 2))) << '\n';
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
        
        vector<vector<int>> dp(n+1, vector<int>(3));
        
        for (int i = 1; i <= n; i++) {
            int a, b, c;
            cin >> a >> b >> c;
            if (i == 1) {
                dp[1][0] = a;
                dp[1][1] = b;
                dp[1][2] = c;
            }
            else {
                dp[i][0] = max(dp[i-1][1], dp[i-1][2]) + a;
                dp[i][1] = max(dp[i-1][0], dp[i-1][2]) + b;
                dp[i][2] = max(dp[i-1][0], dp[i-1][1]) + c;
            }
        }
        
        cout << max(dp[n][0], max(dp[n][1], dp[n][2])) << '\n';
        return 0;
    }
    ```



=== "Iterativ optimizat"

    !!! info "Explicație"
        Deoarece avem nevoie doar de ultimele două linii, nu vom ține toată matricea, mutând mereu valorile calculate pe prima linie pentru a păstra corectitudinea recurenței.

    ```cpp
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
            }
            else {
                dp[1][0] = max(dp[0][1], dp[0][2]) + a;
                dp[1][1] = max(dp[0][0], dp[0][2]) + b;
                dp[1][2] = max(dp[0][0], dp[0][1]) + c;
                for (int j = 0; j < 3; j++) {
                    dp[0][j] = dp[1][j];
                    dp[1][j] = 0;
                }
            }
        }
        
        cout << max(dp[0][0], max(dp[0][1], dp[0][2])) << '\n';
        return 0;
    }
    ```

<!-- V. 5. Fifth problem -->

### [Array Description problem](https://cses.fi/problemset/task/1746/)

Pentru această problemă, trebuie să aflăm numărul de șiruri pe care le putem construi astfel încât să respecte condițiile din enunț cu privire la valorile deja setate și la diferența dintre ele. 

Astfel, vom defini $dp[i][j]$ ca fiind numărul de moduri de a crea un șir cu $i$ numere, dacă valoarea de pe poziția $i$ este $j$. 

Pentru a afla $dp[i][j]$, va trebui să ne raportăm la valorile de pe poziția precedentă, aflate la o distanță de cel mult $1$, cu condiția să putem pune $j$ pe poziția $i$. 

!!! note "Observatie"
    Pentru a calcula numărul de soluții modulo $x$, vom folosi operatorul $\%$ (mod). Dar deoarece aici avem nevoie doar de operații de adunare, putem pur și simplu să efectuăm operațiile de adunare și să folosim scăderi în mod convenabil, reușind astfel să optimizăm semnificativ soluția.
    

```cpp
#include <iostream>
#include <vector>

using namespace std;
 
const int MOD = 1000000007;
 
int main() {
    int n, m;
    cin >> n >> m;
    
    vector<int> vals(n+1);
    for (int i = 1; i <= n; i++) {
        cin >> vals[i];
    }
    
    vector<vector<int>> dp(n+1, vector<int> (m+1));
    
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
            for (int dif = j-1; dif <= j+1; dif++) {
                if (dif > 0 && dif <= m) {
                    dp[i][j] += dp[i-1][dif];
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