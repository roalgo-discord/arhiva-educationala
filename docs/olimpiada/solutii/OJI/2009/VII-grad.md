---
id: OJI-2009-VII-grad
title: Soluția problemei grad (OJI 2009, clasa a VII-a)
problem_id: 788
authors: [dapopescu]
prerequisites:
    - strings
tags:
    - OJI
    - clasa VII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2009/07/grad.txt).

<div class="editorial-text" markdown>

```text
Solutie- grad (Popescu Doru Anastasiu)

Pentru a determina numarul de ordine al unei litere in alfabet se poate folosi codul ASCII sau un
sir de caractere constant cu toate literele alfabetului (cautand litera in acest sir de caractere, pozitia
este chiar numarul de ordine). Gradul unui cuvant se obtine sumand numarul de ordine al fiecarei litere.
Se formeaza un vector cu gradul fiecarui cuvant:
g=(g[1],g[2],...,g[k]).
Nu este nevoie sa se retina fiecare cuvant.
Se determina numarul de grupe nrg, eventual ordonant crescator vectorul g.
Se afiseaza k si nrg.
```

</div>

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

ifstream fin("grad.in");
ofstream fout("grad.out");

const int MAXN = 255;
const char LASTCH = 'z';

int grupe[MAXN * (LASTCH - 'a')];

int main() {
    int n, i, nrCuv, nrGrupe, grupa;
    char ch, lastCh;

    fin >> n >> std::ws;

    nrCuv = 1;
    grupa = nrGrupe = 0;

    fin.get(ch);
    lastCh = ch;
    for(i = 0; i < n; i++){
        if(lastCh == ' ' && ch != ' '){
            if(grupe[grupa] == 0){
                nrGrupe++;
                grupe[grupa] = 1;
            }

            nrCuv++;
            grupa = 0;
        } 
        if( ch != ' ' ){
            grupa += (ch - 'a' + 1);
        }

        lastCh = ch;
        fin.get(ch);
    }
    if(grupe[grupa] == 0){
        nrGrupe++;
        grupe[grupa] = 1;
    }

    fout << nrCuv << "\n" << nrGrupe;
    return 0;
}
```
