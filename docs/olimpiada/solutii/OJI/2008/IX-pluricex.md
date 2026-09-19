---
id: OJI-2008-IX-pluricex
title: Soluția problemei pluricex (OJI 2008, clasa a IX-a)
problem_id: 771
authors: [cerchez]
prerequisites:
    - backtracking
tags:
    - OJI
    - clasa IX
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2008/09/pluricex.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2008/09/pluricex.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2008/09/pluricex.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

#define all(x) (x).begin(), (x).end()
#define pb push_back

const int N = 22, D = 10;

vector<int> good_at[N + 1];
vector<int> team;
vector<vector<int>> teams;
bool ok[D + 1];
int n, k, d;

void rec (int mem_idx, int last_used) {
    if (mem_idx == k + 1) {
        for (int i = 1; i <= d; i++) {
            ok[i] = false;
        }
        for (auto mem : team) {
            for (auto x : good_at[mem]) {
                ok[x] = true;
            }
        }
        bool good_team = true;
        for (int i = 1; i <= d; i++) {
            if (!ok[i]) {
                good_team = false;
                break;
            }
        }
        if (good_team) {
            teams.push_back(team);
        }
        return;
    }

    for (int i = last_used + 1; i <= n; i++) {
        team.push_back(i);
        rec(mem_idx + 1, i);
        team.pop_back();
    }
}

int main () {
    ifstream cin("pluricex.in");
    ofstream cout("pluricex.out");

    int x, nr;

    cin >> n >> k >> d;
    for (int i = 1; i <= n; i++) {
        cin >> nr;
        for (int j = 1; j <= nr; j++) {
            cin >> x;
            good_at[i].push_back(x);
        }
    }

    rec(1, 0);

    for (auto team : teams) {
        for (auto mem : team) {
            cout << mem << " ";
        }
        cout << "\n";
    }
    return 0;
}
```
