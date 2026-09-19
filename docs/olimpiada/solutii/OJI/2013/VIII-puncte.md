---
id: OJI-2013-VIII-puncte
title: Soluția problemei puncte (OJI 2013, clasa a VIII-a)
problem_id: 837
authors: [aintuneric]
prerequisites:
    - ad-hoc
    - stl
    - simulating-solution
tags:
    - OJI
    - clasa VIII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2013/08/puncte.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2013/08/puncte.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2013/08/puncte.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <algorithm>
#include <fstream>
#include <map>

using namespace std;

ifstream cin("puncte.in");
ofstream cout("puncte.out");

map<int, int> umap1;
map<int, int> umap2;
pair<int, int> v[250001];
int f[250001];

bool cmp(pair<int, int> a, pair<int, int> b) {
    if (a.first != b.first)
        return a.first < b.first;
    return a.second < b.second;
}

int main() {
    int n, maxx = 0, poz = 1, cnt1 = 0, cnt2 = 0, zero = 0;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        cin >> v[i].first >> v[i].second;
        umap1[v[i].first]++, umap2[v[i].second]++;

        if (v[i].first == v[i].second && v[i].first == 0)
            zero = 1;
        else if (v[i].first + v[i].second == 0)
            cnt1++;
        else if (v[i].first == v[i].second)
            cnt2++;
    }

    /// cer 1

    for (auto var : umap1) {
        if (var.second > maxx)
            maxx = var.second;
    }

    for (auto var : umap2) {
        if (var.second > maxx)
            maxx = var.second;
    }
    cout << maxx << '\n';

    if (cnt1 == cnt2 && cnt1 == 0)
        cout << "0\n";
    else if (cnt1 + zero > 1 && cnt2 + zero > 1)
        cout << (cnt1 * cnt2) + 2 << '\n';
    else
        cout << (cnt1 * cnt2) + 1 << '\n';

    /// cer 3
    sort(v + 1, v + n + 1, cmp);
    int cnts = 0, i = 1;
    while (cnts < n - 1) {
        f[i] = 1, cnts++;
        int x = 0;
        while (x < 3) {
            if (i == n)
                i = 1;
            else
                i++;

            if (f[i] == 0)
                x++;
        }
    }
    for (int i = 1; i <= n; i++) {
        if (f[i] == 0)
            cout << v[i].first;
    }

    return 0;
}

/// axa e in sus, adica primul nr
```
