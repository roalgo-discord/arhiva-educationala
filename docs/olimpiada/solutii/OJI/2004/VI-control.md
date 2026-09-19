---
id: OJI-2004-VI-control
title: Soluția problemei control (OJI 2004, clasa a VI-a)
problem_id: 727
authors: []
prerequisites:
    - simulating-solution
    - frequency-arrays
tags:
    - OJI
    - clasa VI
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2004/OJI%202004%20VI.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2004/OJI%202004%20VI.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2004/OJI%202004%20VI.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: trraian (kilonova)
#include <bits/stdc++.h>

using namespace std;

vector<vector<int>> auxiliary;

void clear(vector<int> &v) {
    auxiliary.push_back({});
    swap(v, auxiliary.back());
}

bool prime(const int &number) {
    if (number <= 1)
        return false;
    if (number == 2)
        return true;
    if (number % 2 == 0)
        return false;
    for (int divisor = 3; divisor * divisor <= number; divisor += 2)
        if (number % divisor == 0)
            return false;
    return true;
}

int main() {
    freopen("control.in", "r", stdin);
    freopen("control.out", "w", stdout);

    ios_base ::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n;
    map<int, int> mp;
    cin >> n;
    while (n--) {
        int x;
        cin >> x;
        mp[x]++;
    }
    vector<int> group;
    int cnt[2] = {};
    for (auto it : mp) {
        group.push_back(it.second);
        if (group.size() == 3) {
            int remainder = group[0] % 2;
            bool ok = true;
            for (auto It : group)
                if (remainder != It % 2) {
                    ok = false;
                    break;
                }
            cnt[ok]++;
            clear(group);
        }
    }
    int number = cnt[1] * 10 + cnt[0];
    cout << number << '\n' << prime(number);
    return 0;
}
```
