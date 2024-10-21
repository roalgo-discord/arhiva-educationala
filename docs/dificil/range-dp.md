---
tags:
    - programare dinamica
    - intervale
---

**Autor**: Ștefan-Cosmin Dăscălescu

În acest articol vom prezenta modul în care aplicăm tehnica programării dinamice atunci când vine vorba de a afla diverse răspunsuri minime sau maxime pentru șiruri cu o lungime relativ mică (de regulă, cel mult $500$), folosind drept stări anterioare subsecvențe de lungime mai mică ale șirului dat. 

Această tehnică este numită în specialitate range dp, fiind găsită în articolele românești și sub numele de metoda mixtă a programării dinamice.

## Condiții necesare

Această tehnică apare preponderent în probleme care respectă cât mai multe din condițiile menționate aici, implementarea și modul de gândire al stărilor și tranzițiilor fiind foarte similar de la o problemă la alta:

* Se pot găsi soluții greedy destul de ușor, dar fără succes
* Dacă știm răspunsurile pentru subsecvențele de lungime mai mică, putem calcula răspunsul pentru orice subsecvență $[L, R]$ de o lungime mai mare
* Putem combina subsecvențe disjuncte în mod independent
* De regulă, $n$ (dimensiunea șirului) este cel mult $500$. 

## Cum aplicăm tehnica?

Pe scurt, ceea ce vrem să facem este să avem o stare de tip $dp[i][j]$ care să ne țină răspunsul pentru intervalul $[i, j]$ și să calculăm valoarea acestei stări fixând poziția $k$ pe care o vom folosi pentru a împărți subsecvența noastră în două subsecvențe disjuncte (de regulă, $[i, k]$ și $[k+1, j]$), a căror reuniune să fie subsecvența $[i, j]$.

O altă particularitate des întâlnită va fi să iterăm subsecvențele în ordine crescătoare a lungimilor pentru a avea răspunsurile calculate în ordine. Alternativ, vom putea implementa această soluție și recursiv, făcând calculele mai ușoare, așa cum veți putea vedea în exemplele ulterioare. 

## Un prim exemplu - [Problema Rectangle Cutting](https://cses.fi/problemset/task/1744)

Această problemă ne cere să aflăm numărul minim de tăieturi pe care le putem face astfel încât să împărțim dreptunghiul inițial cu dimensiunile $a$ și $b$ în pătrate. 

Mai întâi, ne-am putea gândi la soluții de tip backtracking care sunt foarte încete sau soluții greedy care încearcă să obțină pătrate cât mai mari, dar aceste abordări eșuează pe diverse teste. 

Deoarece dimensiunile dreptunghiurilor sunt cel mult $500$, putem să ne gândim la o dinamică de două dimensiuni, unde $dp[i][j]$ va ține numărul minim de tăieturi necesare pentru a ajunge la un dreptunghi de dimensiunile $i$ și $j$. 

Un caz de bază evident este acela când $i = j$, unde $dp[i][j] = 0$. Acum, trebuie să ne gândim la tăieturile pe care le putem face, acestea pot fi fie orizontale, fie verticale, atâta timp cât păstrăm laturile drept numere întregi. 

Cu alte cuvinte, vom putea fixa punctul în care vom face tăietura și de acolo, vom folosi rezultatele calculate anterior, sau în cazul soluției recursive, le vom calcula la rândul lor până când toate valorile au fost calculate. Complexitatea acestei soluții va fi $O(n^3)$, unde $n$ este maximul dintre $a$ și $b$. 

Mai jos puteți găsi implementările iterative și recursive ale acestei probleme.

=== "Recursiv"

    ```cpp
    #include <iostream>
    #include <vector>
    using namespace std;
 
    vector<vector<int> > dp;

    int solve (int n, int m) {
        if (n == m) {
            return 0;
        }
        if (dp[n][m] != (1<<20)) {
            return dp[n][m];
        }
        for (int side = 1; side < n; side++) {
            dp[n][m] = min(dp[n][m], solve(side, m) + solve(n-side, m) + 1);
        }
        for (int side = 1; side < m; side++) {
            dp[n][m] = min(dp[n][m], solve(n, side) + solve(n, m-side) + 1);
        }
        return dp[n][m];
    }

    int main() {
    
        int n, m;
        cin >> n >> m;
    
        dp.resize(n+1, vector<int> (m+1, (1<<20)));
    
        cout << solve(n, m) << '\n';
        return 0;
    }
    ```

=== "Iterativ"

    ```cpp
    #include <iostream>
    #include <vector>
    using namespace std;
  
    int main() {
    
        int n, m;
        cin >> n >> m;
    
        vector<vector<int> > dp(n+1, vector<int> (m+1, (1<<20)));
    
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (i == j) {
                    dp[i][j] = 0;
                    continue;
                }
                for (int side = 1; side < i; side++) {
                    dp[i][j] = min(dp[i][j], dp[side][j] + dp[i-side][j] + 1);
                }
                for (int side = 1; side < j; side++) {
                    dp[i][j] = min(dp[i][j], dp[i][side] + dp[i][j-side] + 1);
                }
            }
        }
    
        cout << dp[n][m] << '\n';
        return 0;
    }
    ```

## Un exemplu mai dificil - [Greedy Pie Eaters](https://usaco.org/index.php?page=viewproblem2&cpid=972)

În această problemă, vrem să ne asigurăm că putem folosi vaci cu o greutate totală cât mai mare, știind că fiecare vacă va mânca toate prăjiturile din intervalul corespunzător. 

Vom începe prin a precalcula pentru fiecare mod posibil de a tăia un interval, cea mai bună variantă de a face asta, folosind o dinamică de tipul $bstcut[i][j][p]$, unde această stare reprezintă suma maximă pe care o putem obține din intervalul $[i, j]$ dacă tăiem intervalul în poziția $p$. 

După ce avem această dinamică calculată, vom putea rezolva această problemă folosind o altă dinamică pe două dimensiuni, unde $dp[i][j]$ reprezintă răspunsul optim pentru intervalul $[i, j]$. Această dinamică va putea fi implementată recursiv, fixând pozițiile în care asignăm o vacă sau fixând intervalele pe care le vom împărți, acestea fiind calculate independent. 

```cpp
#include <fstream>
#include <vector>

using namespace std;

ifstream cin("pieaters.in");
ofstream cout("pieaters.out");

vector<vector<int>> mx, dp;
vector<vector<vector<int>>> bstcut;

int solve (int st, int dr) {
    if(st > dr) {
        return 0;
    }
    if (dp[st][dr] != -1) {
        return dp[st][dr];
    }
    dp[st][dr] = 0;
    for (int i = st; i < dr; ++i) {
        dp[st][dr] = max(dp[st][dr], solve(st, i) + solve(i+1, dr));
    }
    for (int cut = st; cut <= dr; ++cut) {
        dp[st][dr] = max(dp[st][dr], bstcut[st][dr][cut] + solve(st, cut-1) + solve(cut+1, dr));
    }
    return dp[st][dr];
}
int main() {
    
    int n, m;
    cin >> n >> m;
    mx.resize(n+2, vector<int> (n+2));
    dp.resize(n+2, vector<int> (n+2, -1));
    bstcut.resize(n+2, vector<vector<int> > (n+2, vector<int> (n+2, 0)));
    
    for (int i = 1; i <= m; ++i) {
        int am, l, r;
        cin >> am >> l >> r;
        mx[l][r] = max(mx[l][r], am);
    }
    for (int len = 1; len <= n; ++len) {
        for (int j = 1; j + len - 1 <= n; ++j) {
            for (int x = j; x <= j + len - 1; ++x) {
                bstcut[j][j + len - 1][x] = max(bstcut[j][j + len - 2][x], mx[j][j + len - 1]);
                bstcut[j][j + len - 1][x] = max(bstcut[j][j + len - 1][x], bstcut[j + 1][j + len - 1][x]);
            }
        }
    }
        
    cout << solve(1, n) << '\n';
    return 0;
}
```

### Un alt tip de range dp - [Atcoder DP Contest Deque](https://atcoder.jp/contests/dp/tasks/dp_l)

Deși această problemă nu se încadrează complet în definiția dată mai sus, modul relativ facil pe care îl avem pentru calcularea rezultatelor stărilor o va putea încadra în această categorie. 

Din nou, o soluție greedy ușor de găsit nu este fezabilă, majoritatea greedy-urilor cunoscute având cazuri pe care soluția pică. Astfel, suntem limitați la a avea o abordare bazată pe metoda programării dinamice, unde $dp[i][j]$ reprezintă răspunsul maxim dacă începem din subsecvența $[i, j]$. La fiecare pas, avem de fixat una din cele două valori pe care o folosim, răspunsul fiind preluat din secvențele de lungime mai mică, așa cum se poate vedea în codul de mai jos. 

!!! note "Observație"
    Există totuși o soluție greedy corectă pentru această problemă, fiind una destul de dificilă, în ciuda codului scurt, detaliile fiind explicate în acest paper, pe care îl puteți găsi [aici](https://www.mimuw.edu.pl/~idziaszek/termity/termity.pdf)

```cpp
#include <iostream>
#include <vector>

using namespace std;

int main()
{
    int n;
    cin >> n;
    
    vector<int> v(n+1);
    for(int i = 1; i <= n; ++i)
        cin >> v[i];
        
    vector<vector<int>> dp(n+1, vector<int> (n+1));
    for (int i = n; i >= 1; --i) {
        for (int j = i+1; j <= n+1; ++j) {
            dp[i][j] = max(v[i] - dp[i+1][j], v[j-1] - dp[i][j-1]);
        }
    }
    cout << dp[1][n+1];
    return 0;
}
```

## Concluzii

După cum se poate vedea, Range DP este o tehnică care se dovedește a fi foarte utilă în multe contexte, iar faptul că implementările vor fi similare de la problemă la problemă va face înțelegerea și aplicarea principiului mai ușoară decât în cazul altor dinamici, unde este necesară o experiență mai mare pentru a modifica stările și modul de calcul.

## Probleme suplimentare

* [podm infoarena](https://www.infoarena.ro/problema/podm)
* [Slimes AtCoder DP](https://atcoder.jp/contests/dp/tasks/dp_n)
* [Space Jazz SAPO](https://saco-evaluator.org.za/cms/sapo2015z/tasks/jazz/description)
* [Mean Info1Cup](https://oj.uz/problem/view/info1cup19_mean)
* [bmatrix infoarena](https://www.infoarena.ro/problema/bmatrix)
* [redu infoarena](https://infoarena.ro/problema/redu)
* [ONI 2010 Triunghi](https://kilonova.ro/problems/1353)
* [Taming the Herd USACO Gold](https://usaco.org/index.php?page=viewproblem2&cpid=815)
* [ONI 2009 Baraj Seniori maxpal](https://kilonova.ro/problems/1778/)
* [ONI 2008 Baraj Seniori stiva](https://kilonova.ro/problems/1789)
* [Zuma Codeforces](https://codeforces.com/problemset/problem/607/B)
* [ONI 2023 Baraj Seniori bt](https://kilonova.ro/problems/557/)
* [Empty String CSES](https://cses.fi/problemset/task/1080)
* [Queries for Number of Palindromes Codeforces](https://codeforces.com/contest/245/problem/H)
* [3SUM USACO Gold](https://usaco.org/index.php?page=viewproblem2&cpid=994)
* [Replace on Segment Codeforces](https://codeforces.com/contest/1922/problem/F)
* [Interesting Problem (Hard Version) Codeforces](https://codeforces.com/contest/1987/problem/F2)
* [Probleme de pe kilonova cu Range DP](https://kilonova.ro/tags/278)
* [Probleme de pe pbinfo cu Range DP](https://www.pbinfo.ro/probleme/eticheta/121/programare-dinamica-metoda-mixta)

## Lectură suplimentară 

* [Articolul despre Range DP de pe USACO Guide](https://usaco.guide/gold/dp-ranges?lang=cpp)
* [Tehnici avansate de programare dinamică - Infoarena](https://www.infoarena.ro/pd)
* [Some Interval DP Problems and State Reduction - Codeforces](https://codeforces.com/blog/entry/108850)