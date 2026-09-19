---
id: OJI-2009-VIII-235
title: Soluția problemei 235 (OJI 2009, clasa a VIII-a)
problem_id: 790
authors: [nicoli]
prerequisites:
    - frequency-arrays
    - basic-math
tags:
    - OJI
    - clasa VIII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2009/08/235.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2009/08/235.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2009/08/235.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

ifstream fin("235.in");
ofstream fout("235.out");

int f[6];
vector<int> v;

int main() {
    int n, i, num, p;
    float put;

    fin >> n;
    for (i = 0; i < n; i++) {
        fin >> num;

        put = log(num) / log(3);
        if (put - floor(put) == 0) { // Check if it's a power of 3
            v.push_back(3);
        }
        
        put = log(num) / log(5);
        if (put - floor(put) == 0) { // Check if it's a power of 5
            v.push_back(5);
        }
    }

    fout << v.size() << '\n';

    int nrSecv = 0;
    for(p = 2; p < v.size(); p <<= 1){ // Considering all the lengths
        for(i = 0; i < v.size(); i++){ // Going through the vector
            f[v[i]]++; // Updating our frequence (this could be with a 3 or a 5)

            if(f[3] + f[5] == p){ // If the 2 values form our length = p
                if(f[3] == f[5]){ // If the 2 values are equal
                    nrSecv++; // It's a sequence !!
                }

                f[v[i - p + 1]]--; // Remove the first element so we can move forward
            }
        }

        f[3] = f[5] = 0; // Reset our frequence
    }

    fout << nrSecv;
    return 0;
}
```
