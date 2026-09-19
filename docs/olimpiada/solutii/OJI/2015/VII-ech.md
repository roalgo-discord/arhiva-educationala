---
id: OJI-2015-VII-ech
title: Soluția problemei ech (OJI 2015, clasa a VII-a)
problem_id: 858
authors: [cerchez]
prerequisites:
    - bignum
tags:
    - OJI
    - clasa VII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2015/07/ech.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2015/07/ech.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2015/07/ech.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

ifstream fin("ech.in");
ofstream fout("ech.out");

vector<int> n(100, 0);

void addToVector(int number, int& nSize) {
    int i;

    i = 0;
    while(number > 0){
        number += n[i];
        n[i] = number % 10;
        number /= 10;
        i++;
    }
    if(i > nSize) {
        nSize = i;
    }
}

int echilibrat(int nSize){
    int sum1, sum2, i;

    sum1 = sum2 = 0;
    for(i = 0; i < nSize; i++){
        if(i % 2 == 0){
            sum1 += n[i];
        } else {
            sum2 += n[i];
        }
    }
    return (sum1 == sum2);
}

int main() {
    int rest, i, nSize;
    char ch;

    nSize = 0;
    while(fin >> ch){ // Reading N
        n.push_back(ch - '0');
        nSize++;
    }
    reverse(n.begin(), n.end());

    rest = 0;
    for(i = nSize - 1; i >= 0; i--){
        rest = (rest * 10 + n[i]) % 11;
        cout << rest << ' ';
    }

    cout << rest << ' ';

    addToVector(rest > 0 ? 11 - rest : 11, nSize);
    while(!echilibrat(nSize)){
        addToVector(11, nSize);
    }

    for(i = nSize - 1; i >= 0; i--){
        fout << n[i];
    }
    return 0;
}
```
