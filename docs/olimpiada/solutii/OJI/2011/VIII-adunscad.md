---
id: OJI-2011-VIII-adunscad
title: Soluția problemei adunscad (OJI 2011, clasa a VIII-a)
problem_id: 813
authors: [marinel]
prerequisites:
    - backtracking
tags:
    - OJI
    - clasa VIII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2011/08/adunscad.txt).

<div class="editorial-text" markdown>

```text
adunscad - solutie Marinel Serban
(sursa ADUNSCAD.C)

Se genereaza toate posibilitatile de a pune semnele '+' si '-' inaintea fiecarei cifre.
Acest lucru presupune un algoritm de tip succesor, pentru a genera toate combinatiile
de 0 si 1 - cea mai simpla implementare realizata prin adunarea in baza 2.

Avand in vedere faptul ca jumatate dintre combinatii sunt "negatele" celorlalte,

n=4              n=3
0000 1111        000  111
0001 1110        001  110
0010 1101        010  101
0011 1100        011  100
0100 1011
0101 1010
0110 1001
0111 1000

se pot genera doar jumatate dintre combinatii, verificarea facandu-se insa pentru
ambele situatii.

Solutii alternative:
1. backtracking
    a) iterativ - dana_ad.cpp
    b) recursiv - addsubbk.c, adunsc_a.cpp, adrian3.cpp, adrian4.cpp
2. operatii pe biti - adunscad.pas, danaad2.pas, adsc_nodea.cpp
3. programare dinamica - adrian1.cpp, vi_adunscad.cpp
3. divide&impera - adrian2.cpp
4. arbori binari - nicuas.cpp
```

</div>

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <algorithm>
#include <fstream>
#include <string>
using namespace std;
int v[200];
int target;
string rez;
void check(string ss, int sumy) {
    if (sumy == target)
        rez = ss;
}
void sum(int ind, int n, string op, int suma) {
    if (rez != "")
        return;
    if (ind > n) {
        check(op, suma);
        return;
    }
    string nr = to_string(v[ind]);
    sum(ind + 1, n, op + "+" + nr, suma + v[ind]);
    sum(ind + 1, n, op + "-" + nr, suma - v[ind]);
}
int main() {
    ifstream cin("adunscad.in");
    ofstream cout("adunscad.out");
    int n;
    cin >> target >> n;
    for (int i = 1; i <= n; i++)
        cin >> v[i];
    string r = to_string(v[1]);
    sum(2, n, r, v[1]);
    sum(2, n, "-" + r, -v[1]);
    if (rez == "") {
        cout << "0\n";
        return 0;
    }
    cout << rez;

    return 0;
}
```
