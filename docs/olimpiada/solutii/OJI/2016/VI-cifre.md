---
id: OJI-2016-VI-cifre
title: Soluția problemei cifre (OJI 2016, clasa a VI-a)
problem_id: 868
authors: [sgroza]
prerequisites:
    - digits-manipulation
tags:
    - OJI
    - clasa VI
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2016/06/cifre.txt).

<div class="editorial-text" markdown>

```text
Descriere solutie  – cifre

Se determină cifrele comune pentru cele 2 numere ce formează o pereche, utilizând doi vectori de aparitii.
Pentru fiecare cifră comună se determină minimul dintre a si b, unde a este numărul de aparitii a cifrei în primul număr iar b este numărul de aparitii a cifrei în cel de-al doilea număr.
Dacă există cifre comune se formează valoarea maximă luând toate cifrele comune în ordinea descrescătoare a valorii lor.
Dacă valoarea obtinută este strict pozitiva, se numără ca solutie, actualizandu-se daca este cazul si valoarea maxima pe  care o poate forma Andrei.
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
    ifstream fin("cifre.in");
    ofstream fout("cifre.out");

    int P, N;

    fin >> P >> N;

    if(P == 1){
        int A[10], B[10], nr1, nr2, nrCutiute = 0;

        for(int i = 0; i < N; i++){
            fin >> nr1 >> nr2;

            for(int j = 0; j < 10; j++)
                A[j] = B[j] = 0;

            while(nr1 != 0){
                A[nr1 % 10]++;
                nr1 = nr1 / 10;
            }

            while(nr2 != 0){
                B[nr2 % 10]++;
                nr2 = nr2 / 10;
            }

            int k = 0, esteZero = 0;
            for(int j = 0; j < 10; j++)
                if(A[j] != 0 && B[j] != 0){
                    k++;
                    if(j == 0)
                        esteZero = 1;
                }

            if(k >= 2 || (k == 1 && esteZero == 0))
                nrCutiute++;
        }

        fout << nrCutiute;
    }
    else{
        int A[10], B[10], nr1, nr2, nrCutiute = 0;
        long long nrMax = 0;

        for(int i = 0; i < N; i++){
            fin >> nr1 >> nr2;

            for(int j = 0; j < 10; j++)
                A[j] = B[j] = 0;

            while(nr1 != 0){
                A[nr1 % 10]++;
                nr1 = nr1 / 10;
            }

            while(nr2 != 0){
                B[nr2 % 10]++;
                nr2 = nr2 / 10;
            }

            long long nr = 0;
            for(int j = 9; j >= 0; j--){
                int minim = min(A[j], B[j]);
                while(minim != 0){
                    nr = nr * 10 + j;
                    minim--;
                }
            }

            if(nr > nrMax)
                nrMax = nr;
        }

        fout << nrMax;
    }

    fin.close();
    fout.close();

    return 0;
}
```
