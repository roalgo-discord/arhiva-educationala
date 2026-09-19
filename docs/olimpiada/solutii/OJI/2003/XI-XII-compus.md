---
id: OJI-2003-XI-XII-compus
title: Soluția problemei compus (OJI 2003, clasele XI-XII)
problem_id: 55
authors: [cerchez]
prerequisites:
    - ad-hoc
tags:
    - OJI
    - clasa XI-XII
---

Până atunci, puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2003/11-12/solutie%20compus.txt).

<div class="editorial-text" markdown>

```text
Solutia optima si explicatiile pentru problema compus au fost realizate
de Irina Dumitrascu (studenta, Automatica, Politehnica Bucuresti)

Idei de baza:

Fiecare legatura consuma 2 capete de legaturi posibile -> grupul de atomi de c va avea totdeauna un nr par de legaturi de oferit.
I consuma 2 capete ->  nu pot sa am numar impar de H.

Numarul de legaturi ale atomilor de carbon: 4c
Numarul minim de legaturi intre atomii de carbon: 2c - 2

-> Avem:
maxim 2c + 2 capete de legaturi disponibile pentru o si h
minim = 4 capete (trebuie sa punem obligatoriu un I si 2 H)

Ideea 1
-------
c intre cMin = (m - 3) / 8 si cMax = (m - 4) / 5

Ideea 2
-------
M = 5*c + 3*i + h = 5 * c + 3 * i' + 3 + h' + 2
(am scos separat un I si 2 H care trebuie sa existe oricum in orice compus)
acum i' >= 0, h' >=0

M = 5 * c + 3 * i' + h' + 5

Presupunem c cunoscut. Atunci
3 * i' + h' = M - 5 * c - 5 = N (notatie)

dar din condi'iile impuse de legaturile oferite de grupul conex de C,
    4 <= 2 * i + h <= 2 * c + 2
    4 <= 2 * i' + 2 + h' + 2 <= 2 * c + 2
    0 <= 2 * i' + h' <= 2 * c - 2

dar 3 * o' + h' = N, deci
    0 <= N - i' <= 2 * c - 2

Deci putem stabili limitele pentru i din inegalitatile
    N - 2 * c + 2 <= i' <= N
    Notam oMin = max (0, N - 2 * c + 2)
	  oMax = min (N, c)

Algoritmul devine
c intre cMin si cMax
daca n > 0
	i intre oMin si oMax
		verific daca h = M - 5c - 3i este par si pozitiv

Ideea 3 (compus.pas)
--------------------
h = N - 3*i trebuie sa fie par;
  deci N are aceeasi partitate cu 3 * i -> N are aceeasi paritate cu i; pot sa stabilesc paritatea la inceput si apoi sa cresc din 2 in 2; asa nu trebuie sa mai verific paritatea lui h
	    if ((N mod 2) <> (i mod 2)) then inc(i);
            h := N - i * 3;

            while ((h >= 0) and (i <= oMax)) do
            begin
                inc(sol);
                i := i + 2;
                h := h - 6;
            end;

Ideea 4 (compus1.pas)
---------------------
In momentul asta pot sa observ ca while-ul e de fapt degeaba, si se reduce la
            if ((N mod 2) <> (i mod 2)) then inc(o);
            h := N - o * 3;

            if ((h >= 0) and (i <= oMax)) then begin
               sol := sol + min ( h div 6 + 1, (oMax - i + 2) div 2);
            end
Am ajuns in O(N)!!
```

</div>

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;
ifstream f("compus.in");
ofstream g("compus.out");
int n;
long long ans;
int main() {
    f >> n;
    for (int i = n / 8; i <= (n - 5) / 5; ++i) {
        int m = n - (i + 1) * 5;
        if (m > 0) {
            int l = max(m - (i - 1) * 2, 0);
            l += (l % 2 != m % 2);
            if (m >= l * 3)
                ans += (m - l * 3) / 6 + 1;
        } else
            ans += (m == 0);
    }
    g << ans << '\n';
    return 0;
}
```
