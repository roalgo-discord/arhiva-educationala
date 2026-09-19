---
id: OJI-2022-IX-oneout
title: Soluția problemei oneout (OJI 2022, clasa a IX-a)
problem_id: 642
authors: [chesca]
prerequisites:
    - divisibility
    - sieve
    - partial-sums
tags:
    - OJI
    - clasa IX
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2022/09.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2022/09.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2022/09.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <iostream>
#include <fstream>
#include <vector>
using namespace std;

int main() {
    ifstream cin("oneout.in");
    ofstream cout("oneout.out");

    int c, n;
    cin >> c;
    cin >> n;
    
    vector <int> v(n+1); 
    
    for (int i = 1; i <= n; i++) {
        cin >> v[i];
    }
    
    vector <int> squarefree(1000001, 1);
    
    for (int i = 2; i <= 1000; i++) {
        for (int j = i*i; j <= 1000000; j += i*i) {
            squarefree[j] = 0;
        }
    }
    
    int ans = 0;
    
    if (c == 1) {
        for (int i = 1; i <= n; i++) {
            ans += squarefree[v[i]];
        }
        cout << ans << '\n';
    }
    else {
        vector <int> streakL(n+1), streakR(n+1);
        for (int i = 1; i <= n; i++) {
            if (squarefree[v[i]]) {
                streakL[i] = streakL[i-1] + 1;
            }
        }
        for (int i = n; i >= 1; i--) {
            if (squarefree[v[i]]) {
                if (i != n) {
                    streakR[i] = streakR[i+1] + 1;
                }
                else {
                    streakR[i] = 1;
                }
            }
        }
        ans = -1;
        int cnt = 0;
        for (int i = 2; i < n; i++) {
            if (squarefree[v[i]] == 0 && streakL[i-1] && streakR[i+1]) {
                if (streakL[i-1] + streakR[i+1] > ans) {
                    ans = streakL[i-1] + streakR[i+1];
                    cnt = 1;
                }
                else {
                    if (streakL[i-1] + streakR[i+1] == ans) {
                        cnt++;
                    }
                }
            }
        }
        
        if (ans == -1) {
            cout << -1 << '\n';
        }
        else {
            cout << ans << " " << cnt << '\n';
            for (int i = 2; i < n; i++) {
                if (squarefree[v[i]] == 0 && streakL[i-1] && streakR[i+1]) {
                    if (streakL[i-1] + streakR[i+1] == ans) {
                        cout << i - streakL[i-1] << " " << i + streakR[i+1] << '\n';
                    }
                }
            }
        }
    }
    return 0;
}
```
