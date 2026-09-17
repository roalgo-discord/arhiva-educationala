---
id: ONI-2016-XI-XII-xor
title: Soluția problemei xor (ONI 2016, clasele XI-XII)
problem_id: 187
authors: []
# prerequisites:
#    - placeholder
tags:
    - ONI
    - clasa XI-XII
---
Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/ONI%20%28national%20olympiad%29/2016/11-12/xor.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/ONI%20%28national%20olympiad%29/2016/11-12/xor.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/ONI%20%28national%20olympiad%29/2016/11-12/xor.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
/*
 * Balinga Alex Mihai
 * Arhiva Educationala RoAlgo
 * Multumiri lui Stefan Dascalescu!
 */
//Pentru rezolvarea de 60P facem astfel:
//fie dp[i][j][val] -> de cate ori contribuie val la celula {i, j}
//o prima observatie este ca, folosindu-ne de operatia XOR, contributia la rezultat a valorii este egala cu aceasta daca numarul de aparitii este impar, altfel
//este nula.
//recurenta este dp[i][j][val] = dp[i-1][j][val] + dp[i][j-1][val], partea interesanta este ca stim ca numarul de drumuri mergand fie la dreapta sau in jos
// de la celula {a, b} la celula {x, y} este egala cu combinari de {(x-a-1) + (y-a - 1)} luate cate (y-a-1), deci pentru a calcula dp[i][j][val] este echivalent cu a afla numarul
// de drumuri de la {0, val} la {i, j} % 2
// Putem simplifica considerabil problema folosindu-ne de Teorema lui Krummer: Comb(n, r) % 2 == 1 <==> r & (n-r) == 0
// Adica pentru o un query(i, j) dat putem raspunde in O(j) (numarul de valori ce vor contribui la raspuns), cu j shift-uri pe biti
// PUNCTAJ: 60/100
// Pentru rezolvarea de 100P facem astfel:
// Este evident ca pentru 2e5 query-uri vom fi constransi sa raspundem in timp de O(log m) sau O(1) la un query, asadar este necesar sa ne gandim cum putem reduce numarul de pasi.
// O tehnica frecvent intalnita in astfel de probleme, este incercarea reducerii iterarii prin fiecare valoare individuala la iterarea prin fiecare strat de biti.
// Sa incercam sa rezolvam, initial problema doar pentru stratul 0 de biti. Ideea este ca, daca construim matricea pentru stratul 0 de biti, se formeaza triunghiul lui Sierpinski
// Daca incercam pe stratul 1 se formeaza tot aceeasi structura, doar ca shiftata la dreapta cu doua pozitii.
// Se observa un pattern si anume: pe stratul q, matricea formata este Triunghiul lui Sierpinski shiftat cu 2^q straturi.
// In acest triunghi, valoarea de pe linia i, coloana j este S[i][j] = numarul de drumuri de la celula {0,0} la {i, j} mod 2
// Pentru stratul q de biti, raspunsul este nr de drumuri de la {0, 0} la {i, j - 2^p}
// Rezolvam cu Teorema lui Krummer.
// Raspunsul este deci comb(i + j, j - 2^q), - q inseamna ca deshiftam, intorcandu-ne la clasicul Sierpinski.

#include <fstream>
using namespace std;

long long answer_query(long long i, long long j) {

    long long res = 0;
    for (long long p = 1; p <= j; p <<=1) {
        if (((j - p) & (i + p)) == 0) res |= p;
    }
    return res;
}
void solve() {
    ifstream cin("xor.in");
    ofstream cout("xor.out");
    long long q, i1, j1, a, b, m;
    cin >> q >> i1 >> j1 >> a >> b >> m;
    cout << answer_query(i1, j1) << '\n';
    for (int i = 1; i < q; i++) {
        i1 = (a * i1 + b) % m;
        j1 = (a * j1 + b) % m;
        cout << answer_query(i1, j1) << '\n';
    }
}
int main() {
    solve();
}
```
