---
id: OJI-2005-VIII-muzica
title: Soluția problemei muzica (OJI 2005, clasa a VIII-a)
problem_id: 743
authors: [anita, mnita]
prerequisites:
    - simulating-solution
tags:
    - OJI
    - clasa VIII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2005/08.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2005/08.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2005/08.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

using ll = long long;
#define pb push_back

const string FILE_NAME = "muzica";
const int MAX_A = 1e3;

int pos[MAX_A + 5];
bool visited[MAX_A + 5];

int main() {
#ifndef LOCAL
    ifstream cin(FILE_NAME + ".in");
    ofstream cout(FILE_NAME + ".out");
#endif

    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int a, b, i;

    cin >> a >> b;
    i = 1;
    while (!visited[a]) {
        visited[a] = true;
        pos[a] = i;
        cout << a * 10 / b;
        a = a * 10 % b;
        i++;
    }
    i--;
    cout << " " << i - pos[a] + 1;
    return 0;
}
```
