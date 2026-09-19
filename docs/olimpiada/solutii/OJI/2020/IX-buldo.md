---
id: OJI-2020-IX-buldo
title: Soluția problemei buldo (OJI 2020, clasa a IX-a)
problem_id: 916
authors: [nicoli]
prerequisites:
    - binary-search
tags:
    - OJI
    - clasa IX
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2020/09.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2020/09.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2020/09.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <iostream>
#include <fstream>
#include <vector>
using namespace std;

int main() {
	ifstream cin("buldo.in");
	ofstream cout("buldo.out");
	
    int n;
    cin >> n;
    
    vector<int> v(n+1); 
    
    for (int i = 1; i <= n; i++) {
        cin >> v[i];
    }
    
    int L = 0;
    int R = 1000000000;
    int ans = 0;
    
    while (L <= R) {
        int mid = (L + R) / 2;
        long long quantity = 0;
        bool ok = 1;
        for (int i = 1; i <= n; i++) {
            quantity += (v[i] - mid); 
            if (quantity < 0) {
                ok = 0;
            }
        }
        if (ok == 1) {
            ans = mid, L = mid + 1;
        }
        else {
            R = mid - 1;
        }
    }
    
    cout << ans << '\n';
    return 0;
}
```
