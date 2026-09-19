---
id: OJI-2007-VI-cod
title: Soluția problemei cod (OJI 2007, clasa a VI-a)
problem_id: 762
authors: [asimulescu]
prerequisites:
    - frequency-arrays
tags:
    - OJI
    - clasa VI
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2007/06/cod.txt).

<div class="editorial-text" markdown>

```text
	Solutie - COD

Se utilizeaza un vector v=(v[0],v[1],v[2], ...,v[99]), unde
v[i]=frecventa de aparitie a lui i in fisierul cod.in,
i=0,1,...99.
In fiserul de iesire cod.out se scriu acele numere i=0,1,...99
cu proprietatea ca v[i] mod 2=1.
```

</div>

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: AntonioCC (kilonova)
#include <bits/stdc++.h>
using namespace std;

int main()
{
    ifstream fin("cod.in");
    ofstream fout("cod.out");

    int V[100] = {0}, Aux[100], n, nr, k = 0;

    fin >> n;

    for(int i = 0; i < n; i++){
        fin >> nr;
        V[nr]++;
    }

    for(int i = 0; i < 100; i++)
        while(V[i] > 1)
            V[i] = V[i] - 2;

    for(int i = 0; i < 100; i++)
        if(V[i] != 0)
            Aux[k++] = i;

    sort(Aux, Aux + k);

    for(int i = 0; i < k; i++)
        fout << Aux[i];

    fin.close();
    fout.close();

    return 0;
}
```
