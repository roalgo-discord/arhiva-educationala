---
id: ONI-2016-X-elmer
title: Soluția problemei Elmer (ONI 2016, clasa a X-a)
problem_id: 1491
authors: []
# prerequisites:
#    - placeholder
tags:
    - ONI
    - clasa X
---
Articolul va fi disponibil curând în arhivă.

Până atunci, puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/ONI%20%28national%20olympiad%29/2016/10/elmer.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/ONI%20%28national%20olympiad%29/2016/10/elmer.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/ONI%20%28national%20olympiad%29/2016/10/elmer.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: munteanuvlad98 (kilonova)
#include <bits/stdc++.h>

using namespace std;

pair <int, int> walls[100005];
pair <int, int> ducks[100005];

long long INF = 2e18;

vector <pair <long long, long long>> getWrongIntervalsPerDuck(pair <int, int> duck, int m) {
    vector <pair <long long, long long>> allIntervals, answer;

    for (int i = 1; i <= m; ++i) {
        if (duck.first == walls[i].first) {
            allIntervals.push_back({duck.first, duck.first});
        } else if (duck.first < walls[i].first) {
            if (duck.second <= walls[i].second) {
                allIntervals.push_back({walls[i].first, INF});
            } else {
                int delta = walls[i].first - duck.first;
                long long L = 1LL * walls[i].second * delta / (duck.second - walls[i].second);

                if (1LL * walls[i].second * delta % (duck.second - walls[i].second) == 0) {
                    L -= 1;
                }
                allIntervals.push_back({walls[i].first, walls[i].first + L});
            }
        } else {
            if (duck.second <= walls[i].second) {
                allIntervals.push_back({0, walls[i].first});
            } else {
                int delta = - walls[i].first + duck.first;
                long long L = 1LL * walls[i].second * delta / (duck.second - walls[i].second);

                if (1LL * walls[i].second * delta % (duck.second - walls[i].second) == 0) {
                    L -= 1;
                }
                allIntervals.push_back({walls[i].first - L, walls[i].first});
            }
        }
    }

    sort(allIntervals.begin(), allIntervals.end());
    for (auto interval : allIntervals) {
        if (answer.empty() or answer.back().second + 1 < interval.first) {
            answer.push_back(interval);
        } else {
            answer.back().second = max(answer.back().second, interval.second);
        }
    }

    return answer;
}

int32_t main() {
    ifstream fin("elmer.in");
    ofstream fout("elmer.out");
    int n;
    fin >> n;
    for (int i = 1; i <= n; ++i) {
        fin >> ducks[i].first >> ducks[i].second;
    }
    int m;
    fin >> m;
    for (int i = 1; i <= m; ++i) {
        fin >> walls[i].first >> walls[i].second;
    }

    vector <pair <long long, long long>> marsPoints;

    marsPoints.push_back({1, 0});
    marsPoints.push_back({INF - 10, 0});


    for (int i = 1; i <= n; ++i) {
        auto duckIntervals = getWrongIntervalsPerDuck(ducks[i], m);

        for (auto interval : duckIntervals) {
            marsPoints.push_back({interval.first, -1});
            marsPoints.push_back({interval.second, 1});
        }
    }

    sort(marsPoints.begin(), marsPoints.end());

    int currentAnswer = n;
    int best = 0;

    for (auto x : marsPoints) {
        currentAnswer += x.second;

        if (1 <= x.first and x.first + 1 <= INF) {
            best = max(best, currentAnswer);
        }
    }

    fout << best;
}
```
