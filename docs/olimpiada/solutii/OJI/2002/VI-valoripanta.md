---
id: OJI-2002-VI-valoripanta
title: Soluția problemei valori-panta (OJI 2002, clasa a VI-a)
problem_id: 703
authors: [stefdasca]
prerequisites:
   - maxime-minime
   - digits-manipulation
tags:
    - OJI
    - clasa VI
---

Pentru fiecare număr, putem afla parcurgând cifrele lui dacă toate sunt așezate
în ordine crescătoare sau descrescătoare, iar mai apoi după ce facem această
parcurgere, tot ce trebuie să facem este să aflăm valoarea maximă și minimă care
sunt valori-pantă.

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <fstream>
#include <iostream>

using namespace std;

ifstream fin("valori-panta.in");
ofstream fout("valori-panta.out");

int v[200001];

int main() {
    int n, cnt = 0, mx = -1;
    long long mn = 100000000;
    fin >> n;
    for (int i = 1; i <= n; i++) {
        fin >> v[i];
        int a = 0, b = 0, aux = v[i], t = aux % 10;
        aux /= 10;
        while (aux > 0) {
            int cif = aux % 10;
            if (cif > t) {
                a = 1;
            } else {
                if (cif < t) {
                    b = 1;
                }
            }
            aux /= 10;
            t = cif;
        }
        if (a == 0 || b == 0) {
            cnt++;
            if (v[i] > mx) {
                mx = v[i];
            }
            if (v[i] < mn) {
                mn = v[i];
            }
        }
    }

    if (cnt != 0) {
        fout << cnt << "\n" << mx << " ";

        for (int i = 1; i <= n; i++) {
            if (v[i] == mx) {
                fout << i << " ";
            }
        }
        fout << "\n" << mn << " ";
        for (int i = 1; i <= n; i++) {
            if (v[i] == mn) {
                fout << i << " ";
            }
        }
    }

    else {
        fout << "0\n";
        fout << "NU EXISTA";
    }

    return 0;
}
```
