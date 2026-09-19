---
id: OJI-2021-VI-seism
title: Soluția problemei seism (OJI 2021, clasa a VI-a)
problem_id: 933
authors: [iordaiche]
prerequisites:
    - simulating-solution
tags:
    - OJI
    - clasa VI
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2021/06.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2021/06.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2021/06.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <fstream>
#include <vector>

using namespace std;
ifstream cin("seism.in");
ofstream cout("seism.out");
int v[100000];
int main() {
    int cer, n, i, stare, max1, cnt, cntd;
    cin >> cer >> n;
    /// citire
    for (i = 0; i < n; i++)
        cin >> v[i];

    stare = max1 = cnt = 0;
    if (cer == 1) {
        for (i = 1; i < n - 1; i++) {
            if (stare == 0) {
                if (v[i] == 0 && v[i - 1] == 0 && v[i + 1] == 1)
                    stare = 1;
            } else {
                if (v[i] == 1) {
                    cnt++;
                } else {
                    if (i + 1 < n && v[i + 1] == 0) {
                        if (cnt > max1)
                            max1 = cnt;
                    }
                    cnt = stare = 0;
                }
            }
        }
        cout << max1;
    } else if (cer == 2) {
        cntd = 0;
        for (i = 1; i < n - 1; i++) {
            if (stare == 0) {
                if (v[i] == 0 && v[i - 1] == 0 && v[i + 1] == 1)
                    stare = 1;
            } else {
                if (v[i] == 1) {
                    cnt++;
                } else {
                    if (v[i + 1] == 0)
                        cntd++;
                    cnt = stare = 0;
                }
            }
        }
        cout << cntd;
    } else {
        vector<pair<int, int>> zeroes;

        int st = 0;
        int len = 0;
        for (int i = 0; i < n; i++) {
            if (v[i] == 0) {
                len++;
                if (len == 1)
                    st = i;
            } else {
                if (len) {
                    zeroes.push_back({st, len});
                    len = 0;
                }
            }
        }
        if (len) {
            zeroes.push_back({st, len});
        }

        // o grupare transformata in 1

        int ans = 0;

        for (int i = 0; i < zeroes.size(); i++)
            ans = max(ans, zeroes[i].second - 4);

        // doua grupari transformate in 1

        for (int i = 0; i + 1 < zeroes.size(); i++) {
            int st1 = zeroes[i].first + zeroes[i].second;
            int st2 = zeroes[i + 1].first;

            if (zeroes[i].second >= 2 && zeroes[i + 1].second >= 2) {
                ans = max(ans, st2 - st1 + max(zeroes[i].second, zeroes[i + 1].second) - 2);
            }
        }

        // trei grupari transformate in 1

        for (int i = 0; i + 2 < zeroes.size(); i++) {
            int st1 = zeroes[i].first + zeroes[i].second;
            int sf2 = zeroes[i + 2].first - 1;

            if (zeroes[i].second >= 2 && zeroes[i + 2].second >= 2) {
                ans = max(ans, (sf2 - st1 + 1));
            }
        }
        cout << ans << '\n';
    }
    return 0;
}
```
