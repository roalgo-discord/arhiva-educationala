---
id: OJI-2018-VII-puzzle
title: Soluția problemei puzzle (OJI 2018, clasa a VII-a)
problem_id: 896
authors: [nicoli]
prerequisites:
    - ad-hoc
tags:
    - OJI
    - clasa VII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2018/07/puzzle.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2018/07/puzzle.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2018/07/puzzle.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

const string FILE_NAME = "puzzle";

int main() {
#ifndef LOCAL
    ifstream cin(FILE_NAME + ".in");
    ofstream cout(FILE_NAME + ".out");
#endif // LOCAL

    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, i, minCif, cif, newCif, maxCif;
    long long ans;
    string num, minNum, maxNum;

    cin >> n;

    map<string, int> freq;

    ans = 0;
    for (i = 0; i < n; i++) {
        cin >> num;

        /* parcurg numarul si din fiecare cifra scad cifra minima, deoarece vreau sa il transforma la cea mai mica forma */
        /* ex: 432 -> 210 */
        /* ex: 543 -> 210 */

        /* apoi fac acelasi lucru doar ca pentru cifra maxima, pentru a calcula complementul numarului trecut */
        /* ex: 432 -> 012 */
        /* ex: 543 -> 012 */

        /* calculez cea mai mica cifra si cea mai mare cifra */
        minCif = 10;
        maxCif = 0;
        for (char ch : num) {
            cif = (ch - '0'); /* obtin cifra din caracter */

            minCif = min(minCif, cif); /* calculez cea mai mica cifra */
            maxCif = max(maxCif, cif); /* calculez cea mai mare cifra */
        }

        /* calculez noile numere */
        minNum = maxNum = "";
        for (char ch : num) {
            cif = (ch - '0'); /* obtin cifra din caracter */

            newCif = cif - minCif; /* scad cifra minima */
            minNum.push_back('0' + newCif); /* adaug la noul numar cifra ( pe care o transform in caracter ) */

            newCif = maxCif - cif; /* scad din cifra maxima */
            maxNum.push_back('0' + newCif); /* adaug la noul numar cifra ( pe care o transform in caracter ) */
        }

        /* adun la raspunsul frecventa complementului - cu cate alte numere pot combina numarul curent */
        ans += freq[maxNum];

        /* apoi cresc frecventa numarul curent */
        freq[minNum]++;
    }

    cout << ans;
    return 0;
}
```
