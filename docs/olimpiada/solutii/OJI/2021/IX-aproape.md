---
id: OJI-2021-IX-aproape
title: Soluția problemei aproape (OJI 2021, clasa a IX-a)
problem_id: 355
authors: [apetrescu]
prerequisites:
    - simulating-solution
    - basic-math
tags:
    - OJI
    - clasa IX
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2021/09.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2021/09.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2021/09.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {

    ifstream cin("aproape.in");
    ofstream cout("aproape.out");

    int c, n;
    cin >> c;
    cin >> n;

    if (c == 1) {
        int ans = 0;
        do {
            ans++;
            n /= 10;
        } while (n > 0);
        cout << ans << '\n';
    }
    if (c == 2) {
        if (n < 10) {
            if (n == 0 || n == 9)
                cout << 1;
            else
                cout << 2;
            return 0;
        }
        int ans = 0;
        do {
            // + 1
            if (n % 10 < 9)
                ans++;
            // - 1
            if (n % 10 > 1 && n % 10 <= 9)
                ans++;
            else if (n % 10 == 1 && n >= 10)
                ans++;
            n /= 10;
        } while (n > 0);
        cout << ans << '\n';
    }
    if (c == 3) {
        if (n < 10) {
            if (n <= 1 || n >= 8) {
                cout << 2 << '\n';
                return 0;
            } else {
                cout << 3 << '\n';
                return 0;
            }
        }
        set<long long> s;
        s.insert(n);
        for (int i = 1; i <= 2; i++) {
            set<long long> s2;
            for (auto x : s) {
                long long xx = x;
                vector<int> cif;
                do {
                    cif.push_back(xx % 10);
                    xx /= 10;
                } while (xx > 0);
                long long p10 = 1;
                long long x2 = x;
                for (int poz = 0; poz < (int)cif.size(); poz++) {
                    x2 = x;
                    if (cif[poz] > 0) {
                        if ((poz + 1 < cif.size()) || (poz + 1 == cif.size() && cif[poz] != 1)) {
                            x2 -= p10;
                            s2.insert(x2);
                        }
                    }
                    x2 = x;
                    if (cif[poz] < 9) {
                        x2 += p10;
                        s2.insert(x2);
                    }
                    p10 *= 10;
                }
            }
            s = s2;
        }
        cout << s.size() << '\n';
    }
    return 0;
}
```
