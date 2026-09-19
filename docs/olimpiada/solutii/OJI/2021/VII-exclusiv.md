---
id: OJI-2021-VII-exclusiv
title: Soluția problemei exclusiv (OJI 2021, clasa a VII-a)
problem_id: 935
authors: [nmot]
prerequisites:
    - simulating-solution
    - dsu
tags:
    - OJI
    - clasa VII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2021/07.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2021/07.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2021/07.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

int main() {
    ifstream cin("exclusiv.in");
    ofstream cout("exclusiv.out");
    
    int n, m;
    
    cin >> n >> m;
    
    vector<int> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    
    vector<int> b(m);
    for (int i = 0; i < m; i++) {
        cin >> b[i];
        
        int ans = 0, cnt = 0;
        for (int j = 0; j < n; j++) {
            if (a[j] == b[i]) {
                a[j] = -1;
            }
            
            if (a[j] != -1) {
                ans = max(ans, ++cnt);
            } else {
                cnt = 0;
            }
        }
        
        cout << ans << "\n";
    }
    return 0;
}
```
