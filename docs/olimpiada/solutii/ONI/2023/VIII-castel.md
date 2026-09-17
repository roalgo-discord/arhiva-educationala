---
id: ONI-2023-VIII-castel
title: Soluția problemei castel (ONI 2023, clasa a VIII-a)
problem_id: 541
authors: []
# prerequisites:
#    - placeholder
tags:
    - ONI
    - clasa VIII
---

Articolul va fi disponibil curând în arhivă.

Până atunci, puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/ONI%20%28national%20olympiad%29/2023/08.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/ONI%20%28national%20olympiad%29/2023/08.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/ONI%20%28national%20olympiad%29/2023/08.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: munteanuvlad98 (kilonova)
#include <bits/stdc++.h>

using namespace std;

struct dreptunghi {
    int a, b, c, d;
} prefixe[200005], sufixe[200005], v[200005];

dreptunghi join(dreptunghi a, dreptunghi b) {
    dreptunghi res;
    res.a = max(a.a, b.a);
    res.b = max(a.b, b.b);
    res.c = min(a.c, b.c);
    res.d = min(a.d, b.d);
    return res;
}

pair<bool, pair<int, int>> getPoint(dreptunghi a) {
    if (a.a > a.c)
        return {false, {0, 0}};
    if (a.b > a.d)
        return {false, {0, 0}};

    return {true, {a.a, a.b}};
}

long long getDistance(pair<int, int> A) { return 1LL * A.first * A.first + 1LL * A.second * A.second; }

int main() {
    freopen("castel.in", "r", stdin);
    freopen("castel.out", "w", stdout);
    int n;
    cin >> n;
    n += 1;
    for (int i = 1; i <= n; ++i) {
        cin >> v[i].a >> v[i].d >> v[i].c >> v[i].b;
    }
    prefixe[1] = v[1];
    for (int i = 2; i <= n; ++i) {
        prefixe[i] = join(prefixe[i - 1], v[i]);
    }

    sufixe[n] = v[n];
    for (int i = n - 1; i >= 1; --i) {
        sufixe[i] = join(sufixe[i + 1], v[i]);
    }

    bool found = false;
    pair<int, int> answer = {1000000, 1000000};

    for (int i = 1; i <= n; ++i) {
        pair<bool, pair<int, int>> result;
        if (i == 1) {
            result = getPoint(sufixe[i + 1]);
        } 
        else if (i == n) {
            result = getPoint(prefixe[i - 1]);
        } 
        else {
            result = getPoint(join(prefixe[i - 1], sufixe[i + 1]));
        }
        if (result.first) {
            found = true;
            if (getDistance(result.second) < getDistance(answer)) {
                answer = result.second;
            } 
            else if (getDistance(result.second) == getDistance(answer)) {
                answer = min(answer, result.second);
            }
        }
    }

    if (!found) {
        cout << "NU";
        return 0;
    }
    cout << answer.first << ' ' << answer.second;
    return 0;
}
```
