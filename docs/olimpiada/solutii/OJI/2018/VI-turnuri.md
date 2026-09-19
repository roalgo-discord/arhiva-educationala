---
id: OJI-2018-VI-turnuri
title: Soluția problemei turnuri (OJI 2018, clasa a VI-a)
problem_id: 895
authors: [iordaiche]
prerequisites:
    - ad-hoc
tags:
    - OJI
    - clasa VI
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2018/06/turnuri.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2018/06/turnuri.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2018/06/turnuri.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: slabani (kilonova)
#include <fstream>
using namespace std;
ifstream cin("turnuri.in");
ofstream cout("turnuri.out");
int v[500000];
int main() {
    long long n, i, c, turn, n1, n2, turnmax, maxi, sum;
    char ch, nr;
    cin >> c >> n;
    cin >> n1;
    cin.get();
    cin.get(nr);
    v[n1 - 1] = nr;
    turn = 1;
    maxi = sum = n1;
    for (i = 1; i < n; i++) {
        cin >> n2;
        cin.get();
        cin.get(ch);
        v[n2 - 1] = ch;
        if (ch == nr or n2 > n1) {
            sum = 0;
            turn++;
        }
        sum = sum + n2;
        if (sum > maxi)
            maxi = sum;
        nr = ch;
        n1 = n2;
    }
    if (c == 1)
        cout << turn << " " << maxi;
    else {
        nr = turnmax = 0;
        for (i = 0; i < 500000; i++) {
            if (v[i] != nr and v[i] != 0) {
                turnmax++;
                nr = v[i];
            }
        }
        cout << turnmax;
    }
    return 0;
}

```
