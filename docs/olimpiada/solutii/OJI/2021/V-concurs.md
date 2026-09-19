---
id: OJI-2021-V-concurs
title: Soluția problemei concurs (OJI 2021, clasa a V-a)
problem_id: 930
authors: [vgrecea]
prerequisites:
    - simulating-solution
tags:
    - OJI
    - clasa V
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2021/05.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2021/05.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2021/05.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
/*

Pentru a rezolva problema, va trebui sa procesam cifrele fiecarui numar conform algoritmului din enunt,
tratand 10 cu atentie. Pentru cerinta a doua, trebuie sa tinem trei variabile si le vom folosi pentru a
rezolva problema

*/
#include <bits/stdc++.h>
using namespace std;

int scor1, scor2, scor3, maxi, cnt, c, n;
int main() {
    ifstream cin("concurs.in");
    ofstream cout("concurs.out");
    cin >> c >> n;
    for (int i = 1; i <= n; i++) {
        long long t, nr;
        cin >> t >> nr;
        int val = 0;
        while (nr) {
            if (nr % 10 == 0)
                val += nr % 100, nr /= 100;
            else
                val += nr % 10, nr /= 10;
        }
        if (val > maxi)
            maxi = val, cnt = 1;
        else if (val == maxi)
            cnt++;
        if (t == 1)
            scor1 += val;
        if (t == 2)
            scor2 += val;
        if (t == 3)
            scor3 += val;
    }
    if (c == 1)
        cout << maxi << " " << cnt << '\n';
    else {
        int max_score = max(scor1, max(scor2, scor3));
        if (max_score == 0) {
            cout << "FARA CAMPION";
            return 0;
        }
        if (scor1 == max_score)
            cout << "1 ";
        if (scor2 == max_score)
            cout << "2 ";
        if (scor3 == max_score)
            cout << "3 ";
        cout << max_score << '\n';
    }
    return 0;
}
```
