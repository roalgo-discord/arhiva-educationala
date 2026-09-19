---
id: OJI-2021-IX-cochilie
title: Soluția problemei cochilie (OJI 2021, clasa a IX-a)
problem_id: 356
authors: [zoltan]
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

struct info {
    int Ll, Lr, Cl, Cr;
};
int main() {
    ifstream cin("cochilie.in");
    ofstream cout("cochilie.out");

    int c;
    cin >> c;

    long long n, p;
    cin >> n;

    vector<info> numbers(n + 1);

    int L = 0, C = 1;
    for (int i = 1; i <= n; i++) {
        if (i % 2 == 0) {
            numbers[i] = {1, L, 1, L};
            C += L;
        } else {
            numbers[i] = {1, C, 1, C};
            L += C;
        }
    }

    if (c == 1) {
        cout << L << " " << C << '\n';
    } else {
        cin >> p;
        int L_left = 1, L_right = L;
        int C_left = 1, C_right = C;

        for (int i = n; i >= 1; i--) {
            if (i % 4 == 0) {
                numbers[i].Ll += L_left - 1;
                numbers[i].Lr += L_left - 1;
                numbers[i].Cl += C_left - 1;
                numbers[i].Cr += C_left - 1;
                C_left += (numbers[i].Cr - numbers[i].Cl + 1);
            }
            if (i % 4 == 1) {
                numbers[i].Ll += L_left - 1;
                numbers[i].Lr += L_left - 1;
                numbers[i].Cl += C_left - 1;
                numbers[i].Cr += C_left - 1;
                L_left += (numbers[i].Lr - numbers[i].Ll + 1);
            }
            if (i % 4 == 2) {
                numbers[i].Ll += L_left - 1;
                numbers[i].Lr += L_left - 1;
                numbers[i].Cl = C_right - numbers[i].Cr + 1;
                numbers[i].Cr = C_right;
                C_right -= (numbers[i].Cr - numbers[i].Cl + 1);
            }
            if (i % 4 == 3) {
                numbers[i].Ll = L_right - numbers[i].Lr + 1;
                numbers[i].Lr = L_right;
                numbers[i].Cl += C_left - 1;
                numbers[i].Cr += C_left - 1;
                L_right -= (numbers[i].Lr - numbers[i].Ll + 1);
            }
        }

        vector<pair<int, pair<int, int>>> vp;
        for (int i = 1; i <= n; i++) {
            if (numbers[i].Ll <= p && numbers[i].Lr >= p)
                vp.push_back({numbers[i].Cl, {numbers[i].Cr, i}});
        }

        sort(vp.begin(), vp.end());
        for (auto x : vp)
            for (int i = x.first; i <= x.second.first; i++)
                cout << x.second.second << " ";
    }
    return 0;
}
```
