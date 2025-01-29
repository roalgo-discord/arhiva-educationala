---
tags:
    - programare dinamica
    - siruri de caractere
---

**Autor**: Ștefan-Cosmin Dăscălescu

!!! example "Cunoștințe necesare"
    - [Introducere în programarea dinamică](https://edu.roalgo.ro/usor/intro-dp/)
    - [Șiruri de caractere](https://edu.roalgo.ro/cppintro/strings/)

Problema subșirului comun maximal este o altă problemă foarte importantă care
are aplicații în domenii diverse precum genetică, bioinformatică și procesarea
limbajelor naturale, iar algoritmul pe care îl vom prezenta va putea fi folosit
cu mici modificări în foarte multe dinamici bazate pe matrici. Distanțe precum
Distanța Levenshtein vor fi prezentate și ele aici, datorită similarității cu
problema subșirului comun maximal.

## Subșirul comun maximal

!!! info "Definiție"

    Definim subșirul comun maximal a două șiruri de caractere $a$ și $b$ ca
    fiind un subșir $s$ care are proprietatea că pentru fiecare dintre șirurile
    de caractere $a$ și $b$, $s$ este un subșir al acelui șir de caractere. De
    exemplu, subșirul comun maximal al șirurilor `bcdaacd` si `acdbac` este
    `cdac`.

!!! note "Observație"

    Pot exista mai multe subșiruri comune maximale, de obicei ne interesează
    lungimea subșirului comun maximal. Dacă vrem să reconstituim subșirul comun
    maximal, așa cum procedăm și la alte tipuri de dinamici, ne putem ține o
    altă stare în care păstrăm originea răspunsului optim.

Pentru a calcula subșirul comun maximal, vom avea o dinamică pe două dimensiuni,
folosind o abordare care va construi răspunsul din aproape în aproape, poziție
cu poziție.

Astfel, vom avea $dp[i][j]$ drept lungimea maximă a unui subșir comun care poate
fi format din primele $i$ caractere ale lui $a$ și primele $j$ caractere ale
șirului $b$.

Pentru a calcula această recurență, avem două cazuri principale:

- Fie adăugăm un caracter din unul din cele două șiruri, preluând răspunsurile
  din $(i-1, j)$ și $(i, j-1)$
- Fie adăugăm câte un caracter din ambele șiruri, preluând răspunsul din $(i-1,
  j-1)$ și adăugând 1 dacă caracterele sunt egale.

Cu alte cuvinte,

$$dp[i][j] = max(dp[i-1][j], dp[i][j-1], dp[i-1][j-1] + x)$$

unde $x = 1$ dacă $a_i = b_j$ și $x = 0$ în caz contrar.

Această abordare va avea complexitatea $O(|a| \cdot |b|)$, unde $|a|$ și $|b|$
sunt lungimile celor două șiruri de caractere. Aici puteți găsi o implementare,
care rezolvă problema [similara de pe
atcoder](https://atcoder.jp/contests/dp/tasks/dp_f)

```cpp
#include <iostream>
#include <cstring>
using namespace std;

int n, m, dp[3025][3025], fw[3025][3025];

char c[3025], c2[3025];

void solve (int n, int m) {
    if (n == 0 || m == 0) {
        return;
    }
    if (fw[n][m] == 1) {
        solve(n-1, m);
    }
    if (fw[n][m] == 2) {
        solve(n, m-1);
    }
    if (fw[n][m] == 3) {
        solve(n-1, m-1);
        cout << c[n-1];
    }
}
int main() {
 
    cin >> c;
    cin >> c2;
    n = strlen(c);
    m = strlen(c2);

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            dp[i][j] = max(dp[i-1][j], max(dp[i][j-1], dp[i-1][j-1] + (c[i-1] == c2[j-1])));
            if (dp[i-1][j] == dp[i][j]) {
                fw[i][j] = 1;
            }
            else {
                if (dp[i][j-1] == dp[i][j]) {
                    fw[i][j] = 2;
                }
                else {
                    fw[i][j] = 3;
                }
            }
        }
    }
    
    solve(n, m);
    return 0;
}
```

## Distanța Levenshtein

În mod similar cu subșirul comun maximal, putem defini și distanța Levenshtein
ca fiind distanța de editare între două șiruri, dacă putem adăuga, șterge sau
modifica caractere. Recurența va fi foarte similară cu cea de la problema
precedentă, singura diferență este aceea că operațiile se schimbă din
perspectiva valorii adăugate. Aici este soluția la problema [Edit Distance de pe
CSES](https://cses.fi/problemset/task/1639/)

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;
 
const int mod = 1000000007;
 
int main() {
    string a, b;
    cin >> a >> b;
    
    int n = a.size();
    int m = b.size();
    
    vector<vector<int> > dp(n+1, vector<int> (m+1, (1<<20)));
    dp[0][0] = 0;
    
    for (int i = 0; i <= n; i++) {
        for (int j = 0; j <= m; j++) {
            if (i != 0) {
                dp[i][j] = min(dp[i][j], dp[i-1][j] + 1);
            }
            if (j != 0) {
                dp[i][j] = min(dp[i][j], dp[i][j-1] + 1);
            }
            if (i != 0 && j != 0) {
                dp[i][j] = min(dp[i][j], dp[i-1][j-1] + (a[i-1] != b[j-1]));
            }
        }
    }
    
    cout << dp[n][m] << '\n';
    return 0;
}
```

## Opțional - Algoritmul Hunt-Szymanski

Un algoritm interesant care merită știut pentru aflarea lungimii celui mai lung
subșir comun este algoritmul Hunt-Szymanski, un algoritm care se bazează pe
ideea că dacă două șiruri de caractere nu au un subșir comun lung, foarte multe
dintre comparațiile necesare sunt irelevante.

Principiul din spatele algoritmului este acela că ne interesează doar perechile
de poziții $(i, j)$ cu proprietatea că $a[i]$ și $b[j]$ sunt egale, iar pentru a
folosi acest lucru în avantajul nostru, vom precalcula pentru unul din șirurile
de caractere pozițiile în care apare fiecare literă, iar mai apoi, pentru
fiecare poziție $i$ din șirul $a$, vom itera pozițiile în care apare litera
curentă în ordine descrescătoare, scopul nostru fiind acela de a ține un vector
dp cu proprietatea că $dp[i]$ este cea mai mică poziție din șirul $b$ astfel
încât am putut ajunge să avem un subșir comun maximal de lungime $i$.

Complexitatea algoritmului va fi $O((n + m) \log n)$, unde $m$ este numărul de
perechi de caractere egale. Deși cel mai prost caz este $O(n^2 \log n)$, în
practică, algoritmul va fi mult mai eficient. Aici puteți găsi o implementare a
acestui algoritm, inspirata din [acest
cod](https://github.com/sgtlaugh/algovault/blob/master/code_library/hunt_szymanski.cpp).

Practic, se poate spune că acest algoritm este similar cu algoritmul pentru
aflarea celui mai lung subșir crescător pe perechi de poziții.

```cpp
int lcs(const std::string &A, const std::string &B) {
    std::vector<std::vector<int>> adj(256);
    int n = A.size(), m = B.size();
    
    for (int i = 0; i < m; ++i) {
        adj[B[i]].push_back(i);
    }

    std::vector<int> ar;
    ar.push_back(-1);

    for (int i = 0; i < n; ++i) {
        for (int j = adj[A[i]].size() - 1; j >= 0; --j) {
            int x = adj[A[i]][j];
            if (x > ar.back()) {
                ar.push_back(x);
            } else {
                *std::lower_bound(ar.begin(), ar.end(), x) = x;
            }
        }
    }
    return ar.size() - 1;
}
```

## Probleme suplimentare

- [cmlsc infoarena](https://www.infoarena.ro/problema/cmlsc)
- [EJOI 2020 Exam](https://oj.uz/problem/view/eJOI20_exam)
- [Palindromic Doubles](https://codeforces.com/contest/1488/problem/E)

## Lectură suplimentară

- [Probleme clasice de programare dinamica - CPPI
  Sync](https://cppi.sync.ro/materia/probleme_clasice_0.html)
- [Programare dinamica -
  Algopedia](https://www.algopedia.ro/wiki/index.php/Clasa_a_IX-a_lec%C8%9Bia_24_-_09_mai_2020#Sub%C8%99ir_comun_maximal_(Cel_mai_lung_sub%C8%99ir_comun))
- [Longest Common Subsequence - USACO
  Guide](https://usaco.guide/gold/paths-grids#solution---longest-common-subsequence)
- [Hunt-Szymanski Algorithm Explained (LCS but optimized for special cases) -
  Codeforces](https://codeforces.com/blog/entry/91581)
- [Paper despre
  Hunt-Szymanski](https://imada.sdu.dk/u/rolf/Edu/DM823/E16/HuntSzymanski.pdf)
