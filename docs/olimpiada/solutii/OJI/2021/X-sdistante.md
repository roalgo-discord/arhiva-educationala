---
id: OJI-2021-X-sdistante
title: Soluția problemei SDistanțe (OJI 2021, clasa a X-a)
problem_id: 939
authors: [bodo]
prerequisites:
    - strings
    - frequency-arrays
    - ad-hoc
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2021/10.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2021/10.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2021/10.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <algorithm>
#include <fstream>
#include <iostream>
#include <queue>
#include <utility>
#include <vector>

std::ifstream fin("sdistante.in");
std::ofstream fout("sdistante.out");

const int MOD = 1000000007;

int x;
std::string str;
int freq[52] = {0};
int map[128];

int main() {
    for (int i = 0; i < 26; i++) {
        map[i + 'a'] = i;
        map[i + 'A'] = i + 26;
    }

    fin >> str;
    x = str.size();

    int ret = 0;
    for (int i = 0; i < x; i++) {
        // add to "base hamming distance"
        ret += 1LL * (i + 1) * ((1LL * (x - i) * (x - i - 1) / 2) % MOD) % MOD;
        if (ret >= MOD) {
            ret -= MOD;
        }

        // subtract the ones that are equal
        ret -= 1LL * freq[map[str[i]]] * (x - i) % MOD;
        if (ret < 0) {
            ret += MOD;
        }
        freq[map[str[i]]] += i + 1;
        if (freq[map[str[i]]] >= MOD) {
            freq[map[str[i]]] -= MOD;
        }
    }

    fout << ret << "\n";
}
```
