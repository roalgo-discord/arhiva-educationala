---
tags:
    - OJI
    - clasa V
    - cifre
---

# Soluția problemei colier (OJI 2016, clasa a V-a)

!!! example "Cunoștințe necesare"
    - [Prelucrarea cifrelor](../../../../../usor/digits-manipulation.html)

**Autor soluție**: Traian Mihai Danciu

!!! note "Link problemă"
    Această problemă poate fi accesată [aici](https://kilonova.ro/problems/866/). 

# Cerința 1

Vom găsi pentru fiecare număr cifra maximă, a câta cifră este și la fel pentru cifra minimă. Dacă cifra minimă este înainte de cifra maximă, numărul este de tip 1.

Pentru a ne ușura implementarea, vom numerota pozițiile de la ultima cifră la prima, deci numărul va fi de tip 1 dacă poziția cifrei minime este mai mare decât poziția cifrei maxime.

# Cerința 2

Din fiecare pereche de numere adiacente (unul lângă celălalt) de același tip, noi trebuie să păstrăm doar unul. Chiar dacă avem trei la rând de același tip, din primele două va rămâne doar unul, iar din aceste două va rămâne doar unul. Aveam două perechi de numere adiacente de același tip și am eliminat două numere.

Deci noi trebuie să calculăm câte perechi de numere adiacente au același tip, fie acest număr $P$. Răspunsul va fi $N - P$ (pentru că ștergem exact $P$ numere, unul din fiecare astfel de pereche, cum am zis și mai sus). De notat este faptul că numerele $1$ și $N$ sunt adiacente și trebuie să le luăm și pe ele în considerare.

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <fstream>

using namespace std;

ifstream fin("colier.in");
ofstream fout("colier.out");

int tip(int n) {
    int maxcif = 0, pozmax = 0, mincif = 10, pozmin = 0, poz = 0;
    while (n > 0) {
        poz++;
        if (n % 10 > maxcif) {
            maxcif = n % 10;
            pozmax = poz;
        }
        if (n % 10 < mincif) {
            mincif = n % 10;
            pozmin = poz;
        }
        n /= 10;
    }
    if (pozmin > pozmax) {
        return 1;
    } else {
        return 2;
    }
}

int main() {
    int c, n;
    fin >> c >> n;
    if (c == 1) {
        int cnt = 0;
        for (int i = 1; i <= n; i++) {
            int val;
            fin >> val;
            int maxcif = 0, pozmax = 0, mincif = 10, pozmin = 0, poz = 0;
            while (val > 0) {
                poz++;
                if (val % 10 > maxcif) {
                    maxcif = val % 10;
                    pozmax = poz;
                }
                if (val % 10 < mincif) {
                    mincif = val % 10;
                    pozmin = poz;
                }
                val /= 10;
            }
            if (pozmin > pozmax) {
                cnt++;
            }
        }
        fout << cnt;
    } else {
        int prim = 0, ultim = 0, prec = 0, rasp = 0;
        for (int i = 1; i <= n; i++) {
            int val;
            fin >> val;
            int maxcif = 0, pozmax = 0, mincif = 10, pozmin = 0, poz = 0,
                copie = val;
            while (copie > 0) {
                poz++;
                if (copie % 10 > maxcif) {
                    maxcif = copie % 10;
                    pozmax = poz;
                }
                if (copie % 10 < mincif) {
                    mincif = copie % 10;
                    pozmin = poz;
                }
                copie /= 10;
            }
            int valtip;
            if (pozmin > pozmax) {
                valtip = 1;
            } else {
                valtip = 2;
            }
            if (i == 1) {
                prim = valtip;
            } else {
                if (valtip == prec) {
                    rasp++;
                }
            }
            if (i == n) {
                ultim = valtip;
            }
            prec = valtip;
        }
        if (prim == ultim) {
            rasp++;
        }
        fout << n - rasp;
    }
    return 0;
}
```