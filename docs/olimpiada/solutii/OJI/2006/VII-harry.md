---
id: OJI-2006-VII-harry
title: Soluția problemei harry (OJI 2006, clasa a VII-a)
problem_id: 753
authors: [anita, mnita]
prerequisites:
    - simulating-solution
    - strings
tags:
    - OJI
    - clasa VII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2006/07/harry.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2006/07/harry.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2006/07/harry.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

ifstream fin("harry.in");
ofstream fout("harry.out");

int main() {
    int i, j;
    string s, ans;

    fin >> s;

    ans = s;
    for (i = 0; i < s.length(); i++) {
        for (j = i; j < s.length(); j++) {
            if (strcmp(ans.c_str(), s.substr(i, j).c_str()) < 0)
                ans = s.substr(i, j);
        }
    }
    fout << ans;
    return 0;
}
```
