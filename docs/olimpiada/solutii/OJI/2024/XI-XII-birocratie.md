---
id: OJI-2024-XI-XII-birocratie
title: Soluția problemei Birocratie (OJI 2024, clasele XI-XII)
problem_id: 2507
authors: [zoltan]
prerequisites:
    - intro-dp
tags:
    - OJI
    - clasa XI-XII
---

Subtask 1 (12 puncte): În cazul în care $B$ are toate elementele pozitive,
câștigul maxim se obține prin însumararea tuturor elementelor.

Subtask 2 (12 puncte): În cazul în care $B$ are toate elementele egale și
negative, trebuie să minimizăm pierderea, ceea ce reușim folosind doar deplăsări
orizontale și verticale, renunțând complet la deplasările oblice, trecând astfel
prin $2 \cdot N − 1$ birouri. Adică, ținând cont, că toate elementele sunt
egale, răspunsul la această cerință este $(2 \cdot N − 1) \cdot B[1][1]$

Subtask 3 (15 puncte): În cazul în care pe fiecare diagonală paralelă cu
diagonala secundară elementele din $B$ sunt egale, vom proceda astfel: Fiecare
diagonală cu elemente egale pozitive se ia în întregime, iar pentru fiecare
diagonală cu elemente negative se ia un singur element, astfel obținem suma
maximă posibilă.

Subtask 4 (13 puncte): În cazul în care elementele de pe chenarul lui $B$ sunt
negative, iar celelalte elemente sunt pozitive, se va calcula suma tuturor
elementelor pozitive din matrice (matricea fără chenar) la care se adaugă primul
și ultimul element: $B[1][1]$, $B[N][N]$, respectiv în cazul diagonalelor de
lungime 2, se va alege elementul cu valoarea mai mică.

Subtask 5 (13 puncte): În cazul în care toate elementele din $B$ sunt egale în
valoare absolută, elementele de pe chenar sunt pozitive, iar celelalte elemente
sunt negative, vom trece peste cât mai multe elemente pozitive și vom evita
toate elementele negative. Astfel se obține formula $(2 \cdot N + 1) \cdot
B[1][1]$

Subtask 6 (16 puncte): Problema se rezolvă cu programare dinamică în
complexitate $\mathcal{O}(N^3)$. Pentru fiecare element, valoarea maximă poate
fi obținută doar de pe linia anterioară, adăugând elementul curent, de pe
coloana anterioară adăugând elementul curent, sau de pe diagonala secundară,
adăugând toate elementele, care formează secvența până la elementul curent, ceea
ce necesită o complexitate liniară relativ la lungimea diagonalei, deci în
ansamblu, $N^2$ elemente vor necesita $\mathcal{O}(N^3)$ timp.

Subtask 7 (19 puncte): Problema se rezolvă cu programare dinamică în
complexitate $\mathcal{O}(N^2)$. Pentru fiecare element, valoarea maximă poate
fi obținută doar de pe linia anterioară, adăugând elementul curent, de pe
coloana anterioară adăugând elementul curent, sau de pe diagonala secundară,
adăugând toate elementele care formează secvența până la elementul curent.
Calculul elementelor de pe diagonale, prin parcurgerea ordonată și completă atât
de la stânga la dreapta, cât și de la dreapta la stânga, va permite ca cele $K$
elemente ale unei diagonale să le putem rezolva cumulativ în timp
$\mathcal{O}(K)$, adică pentru fiecare element vom avea un cost de timp
$\mathcal{O}(1)$, deci, în ansamblu problema va avea o complexitate de
$\mathcal{O}(N^2)$.

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ifstream cin("birocratie.in");
    ofstream cout("birocratie.out");

    int n;
    cin >> n;

    vector<vector<int>> v(n + 1, vector<int>(n + 1)),
        dp(n + 1, vector<int>(n + 1, -(1 << 30))),
        dp2(n + 1, vector<int>(n + 1, -(1 << 30)));
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            cin >> v[i][j];
        }
    }

    dp[1][1] = v[1][1];
    for (int sum = 2; sum <= n + n; sum++) {
        if (sum != 2) {
            int maxi = -(1 << 30);
            for (int lin = 1; lin <= n; lin++) {
                int col = sum - lin;
                if (lin >= 1 && col >= 1 && lin <= n && col <= n) {
                    maxi = max(maxi + v[lin][col], dp[lin][col]);
                    dp2[lin][col] = maxi;
                }
            }
            maxi = -(1 << 30);
            for (int lin = n; lin >= 1; lin--) {
                int col = sum - lin;
                if (lin >= 1 && col >= 1 && lin <= n && col <= n) {
                    maxi = max(maxi + v[lin][col], dp[lin][col]);
                    dp2[lin][col] = max(dp2[lin][col], maxi);
                }
            }

            for (int lin = 1; lin <= n; lin++) {
                int col = sum - lin;
                if (lin >= 1 && col >= 1 && lin <= n && col <= n) {
                    dp[lin][col] = dp2[lin][col];
                }
            }
        }
        for (int lin = 1; lin <= n; lin++) {
            int col = sum - lin;
            if (lin >= 1 && col >= 1 && lin <= n && col <= n) {
                if (lin < n) {
                    dp[lin + 1][col] =
                        max(dp[lin + 1][col], dp[lin][col] + v[lin + 1][col]);
                }
                if (col < n) {
                    dp[lin][col + 1] =
                        max(dp[lin][col + 1], dp[lin][col] + v[lin][col + 1]);
                }
            }
        }
    }
    cout << dp[n][n] << '\n';
    return 0;
}
```
