---
id: OJI-2013-VIII-maxp
title: Soluția problemei maxp (OJI 2013, clasa a VIII-a)
problem_id: 836
authors: [pracsiu]
prerequisites:
    - stack
tags:
    - OJI
    - clasa VIII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2013/08/maxp.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2013/08/maxp.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2013/08/maxp.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;
ifstream fin("maxp.in");
ofstream fout("maxp.out");
const int MAXN = 1e6;
int v[MAXN], st[MAXN], dr[MAXN];
stack<int> s;

int main() {
    int n, i;
    fin >> n;
    for(i = 1; i <= n; i++){
        fin >> v[i];
    }
    for(i = 1; i <= n; i++){
        while(!s.empty() && v[i] > v[s.top()]){
            s.pop();
        }
        st[i] = s.empty() ? 0 : s.top();
        s.push(i);
    }
    while(!s.empty()) s.pop(); // Clearing our stack
    for(i = n; i >= 1; i--){
        while(!s.empty() && v[i] > v[s.top()]){
            s.pop();
        }
        dr[i] = s.empty() ? n + 1 : s.top();
        s.push(i);
    }
    
    int ans = 0, numAns = 1;
    for(i = 1; i <= n; i++){
        int cnt;
        cnt = (i - st[i]) * (dr[i] - i);
        
        if (cnt > ans) {
            ans = cnt;
            numAns = 1;
        } else if (cnt == ans) {
            numAns++;
        }
    }
    
    fout << ans << "\n" << numAns << "\n";
    return 0;
}
```
