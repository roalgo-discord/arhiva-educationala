---
tags:
    - OJI
    - clasa V
---

# Soluția problemei Balaur (OJI 2002, clasa a V-a)

!!! example "Cunoștințe necesare"
    - [Operatori și expresii. Cunoștințe matematice de bază](../../../../cppintro/basic-math.md)

**Autor**: Ștefan-Cosmin Dăscălescu

!!! note "Link problemă"
    Această problemă poate fi accesată [aici](https://kilonova.ro/problems/701/).

Această problemă poate fi rezolvată observând modul în care evoluează numărul de
capete al balaurului.

- după prima zi, avem 5 capete (erau 6 iar Făt-Frumos taie unul din ele).
- după cea de-a doua zi, balaurul va ajunge la 11 capete iar Făt-Frumos taie
  unul din ele, deci rămân 10.

Se poate observa că în fiecare zi, balaurul va avea 5 capete mai mult decât în
ziua precedentă, deci putem defini răspunsul ca fiind egal cu $5 \cdot n$, unde
$n$ este numărul de zile dat în datele de intrare.

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <fstream>
using namespace std;

ifstream cin("balaur.in");
ofstream cout("balaur.out");

int main() {
    int n;
    cin >> n;

    cout << 5 * n << '\n';
    return 0;
}
```
