---
id: OJI-2016-VI-litere
title: Soluția problemei litere (OJI 2016, clasa a VI-a)
problem_id: 869
authors: [cardas]
prerequisites:
    - ad-hoc
tags:
    - OJI
    - clasa VI
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2016/06/litere.txt).

<div class="editorial-text" markdown>

```text
Citim cele n litere intr-un vector de caractere v.(indexat de la 1 la n)

Observam literele se vor aseza intr- o figura cu x nivele, n<=x*x, x cel mai mic numar natural cu aceasta proprietate.

1) Determinam x, numarul de niveluri din figura, programul va afisa valoarea x*x-n=nr de caractere *.

2) Pentru fiecare nivel i din figura, v[(i-1)*(i-1)+1] reprezinta prima litera de pe nivel.

3) Completam vectorul v cu caractere * pana la pozitia x*x.

   Daca numerotam triunghiurile din figura initiala observam ca obtinem pentru 3 niveluri numerele

    1          Dupa rotire, triunghiul de numere va fi  5
  2 3 4						      7 6 2
5 6 7 8 9					    9 8 4 3 1

   Dupa rotire, varful noii figuri poate fi calculat direct, (x-1)*(x-1)+1, unde x reprezinta nr. de niveluri;
   Construim un vector ord cu noile numere de ordine ale triughiurilor.
   Pentru fiecare nivel i=2,x calculam numerele de ordine ale celor 2*i-1 triunghiuri.
   Se vor afisa caracterele v[ord[j]] diferite de caracterul *.

Autor: prof. Cardas Cerasela Daniela, Colegiul National A.T.Laurian Botosani
```

</div>

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: AntonioCC (kilonova)
#include <bits/stdc++.h>
using namespace std;

char sir[10001];

int main()
{
    ifstream fin("litere.in");
    ofstream fout("litere.out");

    int P, N;

    fin >> P >> N;

    for(int i = 0; i < N; i++)
        fin >> sir[i];

    if(P == 1){
        int nr = 1, sum = 0;

        while(sum < N){
            sum = sum + nr;
            nr = nr + 2;
        }

        fout << sum - N;
    }
    else if(P == 2){
        int nr = 1, sum = 0;

        while(sum < N){
            fout << sir[sum] << " ";
            sum = sum + nr;
            nr = nr + 2;
        }
    }
    else{
        int nr = 1, sum = 0;

        while(sum < N){
            sum = sum + nr;
            nr = nr + 2;
        }
        nr = nr - 2;
        int lin = (nr + 1) / 2;

        while(N < sum)
            sir[N++] = '*';

        char a[505][505], b[505][505];

        for(int i = 0; i < 505; i++)
            for(int j = 0; j < 505; j++)
                a[i][j] = b[i][j] = '-';

        int k = 0;
        int st = lin, dr = lin;

        for(int i = 1; i <= lin; i++){
            for(int j = st; j <= dr; j++)
                a[i][j] = sir[k++];
            st--; dr++;
        }

        int li = 1, cj = lin;

        for(int col = st + 1; col <= dr - 1; col = col + 2){
            int x = lin, y = col;
            int ii = li, jj = cj;
            int toggle = 0;

            while(x > 0 && y <= dr - 1 && a[x][y] != '-'){
                b[ii][jj] = a[x][y];

                if(!toggle){
                    y++; ii++;
                    toggle = 1;
                }
                else{
                    x--; jj++;
                    toggle = 0;
                }
            }
            li++; cj--;
        }

        for(int i = 1; i <= lin; i++){
            for(int j = 1; j <= 2 * lin; j++)
                if(b[i][j] != '-' && b[i][j] != '*')
                    fout << b[i][j] << " ";
            fout << '\n'';
        }
    }

    return 0;
}
```
