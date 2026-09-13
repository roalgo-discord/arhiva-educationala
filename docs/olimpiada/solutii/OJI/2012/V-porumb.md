---
id: OJI-2012-V-porumb
title: Soluția problemei porumb (OJI 2012, clasa a V-a)
problem_id: 820
authors:
    - traian
# prerequisites:
#    - placeholder
tags:
    - OJI
    - clasa V
---

## Cerința 1

Primul agri culege porumbii cu indici impari. Sunt $\lceil \frac{n}{2} \rceil = \lfloor \frac{n + 1}{2} \rfloor$ proumbi cu indici impari.

## Cerința 2

Mai întâi, facem observația că al $i$-lea agri culege porumbii cu indici divizibili cu $2 ^ {i - 1}$ dar care nu sunt divizibili cu $2 ^ i$.

Primul porumb cules de al $i$-lea agri are indicele $2 ^ {i - 1}$. Așa că, pur și simplu vom afla exponentul celei mai mari puteri de doi care este mai mică sau egală cu $n$.

## Cerința 3

Trebuie doar să aflăm exponentul celei mai mari puteri de doi care îl divide pe $x$.

## Cerința 4

Observăm că ultimul agri mereu va culege un singur porumb. Dacă aflăm al câtelea agri este ultimul, trebuie doar să afișăm primul porumb cules de acesta.

După cum am discutat și la cerința 2, trebuie doar să afișăm cea mai mare putere de doi mai mică sau egală cu $n$.

## Cod sursă

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <fstream>

using namespace std;

ifstream fin("porumb.in");
ofstream fout("porumb.out");

int main() {
    int n, x, copie, agri = 0;
    fin >> n >> x;
    fout << (n + 1) / 2 << '\n';
    copie = n;

    while (copie > 0) {
        copie /= 2;
        agri++;
    }

    fout << agri << '\n';

    while (x % 2 == 0) {
        copie++;
        x /= 2;
    }

    fout << copie + 1 << '\n';
    copie = 1;

    while (copie * 2 <= n) {
        copie *= 2;
    }

    fout << copie;
    return 0;
}
```
