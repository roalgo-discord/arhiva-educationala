---
id: OJI-2022-IX-pergament
title: Soluția problemei pergament (OJI 2022, clasa a IX-a)
problem_id: 643
authors: [cismaru]
prerequisites:
    - ad-hoc
    - sorting
tags:
    - OJI
    - clasa IX
---

Articolul va fi disponibil curând în arhivă.

Până atunci, editorialul poate fi accesat în repo-ul nostru de GitHub, linkul fiind [acesta](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20(regional%20olympiad)/2022/09.pdf).

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <iostream>
#include <fstream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    
    ifstream cin("pergament.in");
    ofstream cout("pergament.out");
    
    int N, K, Q, A, B, C, D, x, y, rez = 0;
    cin >> N >> K >> Q >> A >> B >> C >> D >> x >> y;
    
    vector<int> sum(51, 0);
    vector<pair<int, pair<int, int> > > q;
    
    for (int i = 1; i <= Q; i++) {
        int coloana, rand, distanta;
        cin >> coloana >> rand >> distanta;
        q.push_back({rand, {coloana, 1}});
        q.push_back({rand + distanta, {coloana, -1}});
    }
    sort(q.begin(), q.end());
    
    int n = q.size() - 1;
    int ind = 0;
    
    for (int i = 1; i <= N; i++) {
        while (ind <= n && q[ind].first <= i) {
            for (int lungime = q[ind].second.first; lungime <= K; lungime++) {
                sum[lungime] += q[ind].second.second;
            }
            ind++;
        }
        rez += sum[x + y - 1] - sum[x - 1];
        x = 1 + (x * A + B) % K;
        y = 1 + (y * C + D) % (K - x + 1);
    }
    
    cout << rez << '\n';
    return 0;
}
```
