---
id: OJI-2006-VIII-elfi
title: Soluția problemei elfi (OJI 2006, clasa a VIII-a)
problem_id: 755
authors: [rpintea]
prerequisites:
    - simulating-solution
    - frequency-arrays
tags:
    - OJI
    - clasa VIII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2006/08/elfi.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2006/08/elfi.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2006/08/elfi.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

using ll = long long;
#define pb push_back

const string FILE_NAME = "elfi";
const int MAX_TIME = 60 * 60 * 4;

int freq[MAX_TIME + 5];

int main() {
#ifndef LOCAL
    ifstream cin(FILE_NAME + ".in");
    ofstream cout(FILE_NAME + ".out");
#endif

    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, i, a, b, time, j, ans;

    cin >> n;

    ans = 0;
    for (i = 1; i <= n; i++) {
        cin >> a >> b;
        time = 2 * a + b + 1;
        for (j = time; j <= MAX_TIME; j += time) {
            freq[j]++;
            ans = max(ans, freq[j]);
        }
    }

    cout << ans << "\n";
    return 0;
}
```
