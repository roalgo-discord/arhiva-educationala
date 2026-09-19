---
id: OJI-2007-VII-excel
title: Soluția problemei excel (OJI 2007, clasa a VII-a)
problem_id: 765
authors: []
prerequisites:
    - simulating-solution
    - strings
tags:
    - OJI
    - clasa VII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2007/07/Excel.txt).

<div class="editorial-text" markdown>

```text
Programul va prelucra siruri de caractere.

Se va realiza prelucrarea pe coloane completandu-se rezultatele obtinute.
Sirul de caractere ce reprezinta o linie va fi despartit in subsiruri avand
drept separator caracterul ' '(spatiu)

Daca subsirul format nu incepe cu caracterul '=' atunci el va reprezenta scrierea unei valori numerice.
Folosind o functie din stdlib.h (atoi), sau realizand conversia caracterelor in valori numerice folosind codul ASCII
al caracterelor si folosind cifrele se obtine valoarea numerica de pe linia si coloana specificata.

Daca subsirul incepe cu caracterul '=' atunci se va realiza prelucrarea sirului pentru a se
desparti in subsiruri separate prin caracterul '+', ce vor indica linia (partea numerica) si coloana (partea literala).

Se asigura ca matricea se poate completa prin transformarea valorilor corespunzatoare pe coloane si apoi linii.
```

</div>

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

using ll = long long;
#define pb push_back

const string FILE_NAME = "excel";
const int MAX_N = 50, MAX_M = 26;

string tabel[MAX_N + 5][MAX_M + 5];

int main() {
#ifndef LOCAL
    ifstream cin(FILE_NAME + ".in");
        ofstream cout(FILE_NAME + ".out");
#endif

    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int m, n, lin, col, i, ans;
    string expr, pos;

    cin >> m >> n;
    for (lin = 1; lin <= n; lin++) {
        for (col = 1; col <= m; col++) {
            cin >> tabel[lin][col];
        }
    }

    for (col = 1; col <= m; col++) {
        for (lin = 1; lin <= n; lin++) {
            if (tabel[lin][col][0] == '=') {
                /* este o formula */

                expr = tabel[lin][col];
                pos = "";
                ans = 0;
                expr.push_back('+'); /* to also count the last pos */
                for (i = 1; i < expr.size(); i++) {
                    if (expr[i] != '+') {
                        pos.pb(expr[i]);
                    } else {
                        ans += stoi(tabel[stoi(pos.substr(1))][pos[0] - 'A' + 1]);
                        pos = "";
                    }
                }

                tabel[lin][col] = to_string(ans);
            }
        }
    }

    for (lin = 1; lin <= n; lin++) {
        for (col = 1; col <= m; col++) {
            cout << tabel[lin][col] << ' ';
        }
        cout << '\n';
    }
    return 0;
}
```
