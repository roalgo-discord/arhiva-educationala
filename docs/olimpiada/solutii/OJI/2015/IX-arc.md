---
id: OJI-2015-IX-arc
title: Soluția problemei arc (OJI 2015, clasa a IX-a)
problem_id: 852
authors: [cpopescu]
prerequisites:
    - two-pointers
    - simulating-solution
tags:
    - OJI
    - clasa IX
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2015/09/arc.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2015/09/arc.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2015/09/arc.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>
#include <vector>

using namespace std;

ifstream cin("arc.in");
ofstream cout("arc.out");

vector<pair<int, int>> v;
int main() {
    int cer, n, a, ult;
    cin >> cer >> n;
    if (cer == 1) {
        int cnt = 1;
        cin >> a;
        ult = a;
        for (int i = 2; i <= n; i++) {
            cin >> a;
            if (a != ult)
                cnt++;
            ult = a;
        }
        cout << cnt;
    } else {
        v.resize(n + 1);
        int poz = 0, ult;
        cin >> a;
        ult = a;
        v[0].first = a;
        v[0].second = 1;
        for (int i = 2; i <= n; i++) {
            cin >> a;
            if (a != ult) {
                v[++poz].first = a;
                v[poz].second = 1;
            } else
                v[poz].second++;
            ult = a;
        }

        int trei = 0;
        v.resize(poz + 1);
        for (int i = 0; i <= poz; i++) {
            if (v[i].second >= 3)
                trei++;
        }
        while (trei > 0) {
            int maxx = 0, ci;
            for (int i = 0; i <= poz; i++) {
                if (v[i].second > maxx)
                    maxx = v[i].second;
            }
            for (int i = 0; i <= poz; i++) {
                if (v[i].second == maxx) {
                    trei--;
                    ci = i;
                    break;
                }
            }
            int st = ci - 1, dr = ci + 1, cnt = 1;
            while (st >= 0 && dr <= poz && v[st].first == v[dr].first) {
                if (v[st].second + v[dr].second >= 3) {
                    if (v[st].second >= 3)
                        trei--;
                    if (v[dr].second >= 3)
                        trei--;
                    st--;
                    dr++;
                    cnt += 2;
                } else {
                    v[st].second += v[dr].second;
                    v[dr].second = 0;
                    dr++;
                    cnt++;
                    break;
                }
            }
            v.erase(v.begin() + st + 1, v.begin() + dr);
            poz -= cnt;
        }
        int sol = 0;
        for (int i = 0; i <= poz; i++)
            sol += v[i].second;
        cout << sol << '\n';

        for (int i = 0; i <= poz; i++) {
            for (int j = 0; j < v[i].second; j++)
                cout << v[i].first << '\n';
        }
    }
    return 0;
}
```
