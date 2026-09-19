---
id: OJI-2016-VII-axyz
title: Soluția problemei axyz (OJI 2016, clasa a VII-a)
problem_id: 870
authors: [cminca]
prerequisites:
    - two-pointers
tags:
    - OJI
    - clasa VII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2016/07/axyz.txt).

<div class="editorial-text" markdown>

```text
Problema  1  - axyz   100 puncte



Autor prof. Carmen Mincă
Colegiul National de Informatică “Tudor Vianu”, Bucuresti

Descrierea solutiei

Cerinta 1 (30 puncte)
O solutie se poate obtine astfel:
- Parcurgem sirul cifrelor de la pozitia N către prima, întrerupând parcurgerea la prima cifră X[k] cu proprietatea că:
X[k]>X[k+1] <= X[k+2] <=...<= X[N]
- Determinăm pozitia poz a celei mai mari cifre dintre cele situate pe pozitiile k+1,k+2,…,N si cu proprietatea X[k]>X[poz]
- Interschimbăm cifrele X[k] si X[poz].
- Sortăm descrescător în vectorul X cifrele de pe pozitiile k+1,k+2,…,N restul numărului nemodificându-se. Complexitatea este dată de algoritmul de sortare folosit, maximum O(N2) -solutia obtine un punctaj partial
- Pentru a obtine o complexitate liniara (O(N)), ne vom folosi de faptul că în vectorul X cifrele de pe pozitiile k+1,k+2,…,N sunt sortate crescător. Nu are sens să le sortăm descrescător,  deoarece le putem scrie în fisierul de iesire în ordine inversă, solutia căutată fiind X[1], X[2],..., X[K], X[N], X[N-1],..., X[K+1]

Cerinta 2 (70 puncte)
O solutie cu punctaj maxim se poate obtine astfel:
2.1.Pentru A format din 2 cifre
      -	Separăm cifrele lui A: ab, a=[A/10], b=A%10
      -	Parcurgem sirul cifrelor lui X de la pozitia N către prima numărând aparitiile cifrelor b în variabila NB (initial cu valoarea 0). Variabila Z va memora numărul perechilor cerute (initial este 0).
      -	În timpul acestei parcurgeri, se studiază fiecare cifră astfel:
         - Dacă cifra curentă este egală cu b atunci o numărăm ( NB=NB+1).
         - Altfel, dacă cifra curentă este a atunci se pot forma cu NB numere A din cifra a curentă si cele NB cifre b situate la dreapta lui a în X. Adăugăm numărul acestora la celelalte găsite până în acest moment (Z=Z+NB)

2.2.Pentru A format din 3 cifre
      -	Separăm cifrele lui A: abc, a=[A/100], b=[A/10%10], c=A%10;
      -	Parcurgem sirul cifrelor lui X de la pozitia N către prima numărând aparitiile cifrelor c în variabila NC (initial cu valoarea 0). La întîlnirea unei cifre b se pot genera NC numere de forma bc, astfel vom incrementa  variabila NBC (initial cu valoarea 0) cu valoarea NC. La întîlnirea unei cifre a se pot genera NBC numere de forma abc, astfel vom incrementa  variabila Z (initial cu valoarea 0) cu valoarea NBC. Variabila Z va memora numărul perechilor cerute.
      -	În timpul acestei parcurgeri, se studiază fiecare cifră astfel:
         - Dacă cifra curentă este egală cu c atunci o numărăm ( NC=NC+1).
         - Dacă cifra curentă este egală cu b atunci se pot forma încă NC numere de forma bc si adăugăm acest număr la variabila NBC ( NBC=NBC+NC).
         - Altfel, dacă cifra curentă este a atunci se pot forma cu NBC numere A din cifra a curentă si cele NBC numere bc situate la dreapta lui a în X. Adăugăm numărul acestora la celelalte găsite până în acest moment (Z=Z+NBC)

-	Complexitate O(N)
```

</div>

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

ifstream fin("axyz.in");
ofstream fout("axyz.out");

const int MAXN = 3e5, MAXD = 3;

int nr[MAXN], digits[MAXD], digitVal[MAXD];

int main() {
    int cer, a, n, i, pnt, p, val, pntMax, z, digit1, cnt1, digit2, cnt2, digit3, cnt3;

    fin >> cer >> a >> n;
    for(i = 0; i < n; i++){
        fin >> nr[i];
    }

    if(cer == 1){
        pnt = n - 1;
        while(pnt > 0 && nr[pnt] >= nr[pnt - 1]){
            pnt--;
        }
        p = pnt;
        val = nr[pnt - 1];
        pntMax = pnt;
        while(p < n){
            if(nr[p] < val && nr[p] > nr[pntMax]){
                pntMax = p;
            }
            p++;
        }
        swap(nr[pntMax], nr[pnt - 1]);
        sort(nr + pnt, nr + n, greater<int>());

        for(i = 0; i < n; i++){
            fout << nr[i];
        }
    } else {
        z = cnt1 = cnt2 = cnt3 = 0;
        if(a <= 99){
            digit1 = a % 10, digit2 = a / 10;

            for(i = n - 1; i >= 0; i--){
                if(nr[i] == digit1){
                    cnt1++;
                } else if(nr[i] == digit2){
                    z += cnt1;
                }
            }
        } else {
            digit1 = a % 10, digit2 = a / 10 % 10, digit3 = a / 100;

            for(i = n - 1; i >= 0; i--){
                if(nr[i] == digit1){
                    cnt1++;
                } else if(nr[i] == digit2){
                    cnt2 += cnt1;
                } else if(nr[i] == digit3){
                    z += cnt2;
                }
            }
        }
        fout << z << '\n';
    }
    return 0;
}
```
