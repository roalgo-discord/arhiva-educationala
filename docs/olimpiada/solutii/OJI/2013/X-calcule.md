---
id: OJI-2013-X-calcule
title: Soluția problemei Calcule (OJI 2013, clasa a X-a)
problem_id: 838
authors: [gelumnt]
prerequisites:
    - binary-search
    - partial-sums
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2013/10/calcule.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2013/10/calcule.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2013/10/calcule.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

ifstream fin("calcule.in");
ofstream fout("calcule.out");

const int MAXN = 1e5, MAXK = 5e4, MOD = 20011;

long long num[MAXN], f[MAXK + 5] = {1};
char wasntUsed[MAXN];

int main() {
    long long n, k, i, j, numElements, ans, sum, nrSeq, elem;

    fin >> n >> k;

    sum = nrSeq = 0;
    for(i = 1; i <= n; i++){
        fin >> num[i];

        sum += num[i];
        nrSeq = (nrSeq + f[sum % k]++) % MOD;

        wasntUsed[i] = 1; // We haven't used it yet
    }

    numElements = n;
    ans = 0;
    while(numElements > 0){
        i = 1;
        while(!wasntUsed[i]) i++; // Searching for the first element we haven't used

        wasntUsed[i] = 0; // Mark it as used
        numElements--; // Mark it used

        elem = num[i];
        num[i] = 0;
        for(j = i + 1; j <= n; j++){
            if(num[j] > elem){
                elem = num[j];
                numElements--; // Remove an element
                wasntUsed[j] = num[j] = 0;
            }
        }

        ++ans;
    }

    fout << ans << '\n' << nrSeq;
    return 0;
}
```
