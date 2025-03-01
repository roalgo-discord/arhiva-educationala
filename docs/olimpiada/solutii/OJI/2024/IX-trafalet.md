---
id: OJI-2024-IX-trafalet
title: Soluția problemei Trafalet (OJI 2024, clasa a IX-a)
problem_id: 2503
authors: [ariciu]
prerequisites:
    - partial-sums
    - sequences
tags:
    - OJI
    - clasa IX
---

Subtask 1: Considerăm fiecare submatrice a matricei inițiale. Punctajul acesteia
este reprezentat de diferența în modul dintre suma celulelor albe și suma
celulelor negre. Aceste două sume le putem calcula prin parcurgerea submatricei.
Rezultatul final este maximul dintre toate punctajele considerate. Complexitate:
$\mathcal{O}(N^2 \cdot M^2)$ pentru fixarea submatricei, $\mathcal{O}(N \cdot
M)$ pentru calcularea sumelor. În total, $\mathcal{O}(N^3 \cdot M^3)$.

Subtask 2: Soluția este aceeași ca la subtaskul precedent, doar că vom optimiza
aflarea celor două sume. Astfel, vom precalcula sume parțiale 2D și vom obține
punctajul fiecărei submatrice cu ajutorul acestora. Complexitate:
$\mathcal{O}(N^2 \cdot M^2)$ pentru fixarea submatricei, $\mathcal{O}(1)$ pentru
calcularea sumelor. În total, $\mathcal{O}(N^2 \cdot M^2)$.

Subtask 3: Pentru început, vom înmulți toate celulele uneia dintre culori cu
$-1$. Acum, în loc să calculăm diferența între cele două sume, avem doar de
calculat suma în modul. Pentru a rezolva asta, vom fixa două linii, reprezentând
latura superioară, respectiv inferioară a submatricei. Am rămas cu un vector,
unde elementul de pe poziția $i$ reprezintă suma elementelor de pe coloana $i$,
cuprinse între cele două linii fixate anterior.

Problema s-a redus la a calcula secvența de sumă maximă în modul. Aceasta este
data de diferența dintre suma parțială maximă și cea minimă. Fie pozițiile
acestora Pmax și Pmin. Dacă $P_{max} > P_{min}$, atunci răspunsul îl reprezintă
suma intervalului dat de acestea. Dacă $P_{min} > P_{max}$, atunci intervalul
dintre cele două este cel de sumă minimă, care, după aplicarea modulului, se
transformă în suma maximă. Complexitate: $\mathcal{O}(N^2 \cdot M)$.

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;

int n, m, mat[502][502];
long long sp[502][502];

int main() {
    ifstream cin("trafalet.in");
    ofstream cout("trafalet.out");

    cin >> n >> m;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            cin >> mat[i][j];
            if ((i + j) & 1) {
                sp[i][j] = sp[i - 1][j] + mat[i][j];
            } else {
                sp[i][j] = sp[i - 1][j] - mat[i][j];
            }
        }
    }

    long long ans = -(1LL << 60);
    for (int i = 1; i <= n; i++) {
        for (int j = i; j <= n; j++) {
            long long sm = 0, minsp = 0, maxsp = 0;
            for (int q = 1; q <= m; q++) {
                sm += sp[j][q] - sp[i - 1][q];
                ans = max(ans, abs(sm - minsp));
                ans = max(ans, abs(sm - maxsp));
                minsp = min(minsp, sm);
                maxsp = max(maxsp, sm);
            }
        }
    }

    cout << ans << '\n';
    return 0;
}
```
