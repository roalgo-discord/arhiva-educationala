---
id: ONI-2023-XI-XII-biom
title: Soluția problemei biom (ONI 2023, clasele XI-XII)
problem_id: 532
authors: []
prerequisites:
    - shortest-path
tags:
    - ONI
    - clasa XI-XII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/ONI%20%28national%20olympiad%29/2023/11-12.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/ONI%20%28national%20olympiad%29/2023/11-12.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/ONI%20%28national%20olympiad%29/2023/11-12.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: FFTPeOJI (kilonova)
#include <bits/stdc++.h>
#include <cassert>
using namespace std;
ifstream cin_("biom.in");
ofstream cout_("biom.out");
#define cin cin_
#define cout cout_
void solve() {
    int n; // lungimea string-ului
    int a, b, c, d; // costurile
    cin >> n >> a >> b >> c >> d;
    string s;
    //string-ul
    cin >> s;
    vector<vector<pair<int, int>>> graph(n + 1); // graful
    for (int i = 0; i < n; i++) {
        if (i + 1 < n ) graph[i].push_back({a, i + 1});
        if (i - 1 > -1) graph[i].push_back({b, i - 1});
    }
    int last_appearance[26], next_appearance[26];
    memset(last_appearance, -1, sizeof(last_appearance));
    memset(next_appearance, -1, sizeof(next_appearance));
    for (int i = 0; i < n; i++) {
        if (last_appearance[s[i] - 'a'] != -1) {
            graph[i].push_back({d, last_appearance[s[i] - 'a']});
        }
        last_appearance[s[i] - 'a'] = i;
    }
    for (int i = n - 1; i >= 0; i--) {
        if (next_appearance[s[i] - 'a'] != -1) {
            graph[i].push_back({c, next_appearance[s[i] - 'a']});
        }
        next_appearance[s[i] - 'a'] = i;
    }
    vector<queue<pair<long long, int>>> buckets(4); // tin niste cozi, ideea e foarte apropiata de cea de la 0-1 BFS, cozile cu costul o sa fie monoton descrescatoare
    // la fiecare pas iau coada cu valoarea cea mai mica de la varf, o extrag si relaxez.
    vector<long long> distante(n, 1e17);
    distante[0] = 0;
    buckets[0].push({0, 0}); //in coada imi tin minte {distanta, nod}
    while (true) {
        int best_value = -1;
        for (int i = 0; i < 4; i++) {
            if (!buckets[i].empty() and (best_value == -1 or buckets[i].front().first < buckets[best_value].front().first)) {
                //coada monotona care-mi ofera cea mai buna valoare
                best_value = i;
            }
        }
        if (best_value < 0) break;
        auto [distanta, nod] = buckets[best_value].front();
        buckets[best_value].pop();
        if (distanta != distante[nod]) continue; //safe guard spre a evita o intrare care nu mai este neaparat relevanta
        for (auto [cost, vecin] : graph[nod]) {
            if (distanta + cost < distante[vecin]) {
                distante[vecin] = distanta + cost;
                if (cost == a) {
                    buckets[0].push({distante[vecin], vecin});
                    // daca costul e a, bag in coada sa
                }
                else if (cost == b) {
                    buckets[1].push({distante[vecin], vecin});
                    //la fel si pentru b, c, d
                }
                else if (cost == c) {
                    buckets[2].push({distante[vecin], vecin});
                }
                else if (cost == d) {
                    buckets[3].push({distante[vecin], vecin});
                }
            }
        }
    }
    cout << distante[n - 1] << endl;
}
int main() {
    solve();
}
```
