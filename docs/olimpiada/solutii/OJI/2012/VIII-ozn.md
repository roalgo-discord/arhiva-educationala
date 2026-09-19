---
id: OJI-2012-VIII-ozn
title: Soluția problemei ozn (OJI 2012, clasa a VIII-a)
problem_id: 826
authors: [lica]
prerequisites:
    - partial-sums
tags:
    - OJI
    - clasa VIII
    - smenul lui mars
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2012/08/ozn.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2012/08/ozn.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2012/08/ozn.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>
using namespace std;

int main() {
    ifstream cin("ozn.in");
    ofstream cout("ozn.out");
    int n, k, x1, x2, y1, y2, nr, sum = 0, a, max = 0;
    cin >> n >> k;
    int mars[2000005] = {0};

    for (int i = 1; i <= n; i++) {
        cin >> x1 >> y1 >> x2 >> y2 >> nr;
        mars[x1] += nr, mars[x2 + 1] -= nr;
        if (x2 + 1 > max)
            max = x2 + 1;
    }
    for (int i = 1; i <= max; i++)
        mars[i] += mars[i - 1];
    for (int i = 0; i < k; i++)
        cin >> a, cout << mars[a] << '\n';
    return 0;
}
```
