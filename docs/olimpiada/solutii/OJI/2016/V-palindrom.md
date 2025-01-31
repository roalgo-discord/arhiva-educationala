---
tags:
    - OJI
    - clasa V
    - cifre
---

# Soluția problemei palindrom (OJI 2016, clasa a V-a)

!!! example "Cunoștințe necesare"
    - [Prelucrarea cifrelor](../../../../../usor/digits-manipulation)

**Autor soluție**: Traian Mihai Danciu

!!! note "Link problemă"
    Această problemă poate fi accesată [aici](https://kilonova.ro/problems/867/). 

## Cerința 1

Calculăm oglinditul fiecărui număr și verificăm dacă cele două sunt egale.

## Cerința 2

Calculăm oglinditul fiecărui număr și vedem câte cifre sunt diferite. Dacă numărul este aproape palindrom, ar trebui să fie exact două diferențe.

## Cerința 3

Fiecare număr palindrom poate fi descris ca o concatenare a unui număr, a unei cifre și a răsturnatului acelui număr (cu eventuale 0-uri adăugate la început).

Pentru fiecare număr, vom nota cu $d$ numărul de cifre ale lui. Fie $d = 2 cdot k + r, r 2$. Să calculăm numărul format din primele $k$ cifre. Atunci numărul format din primele $k$ cifre al palindromului asociat 

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <iostream>
using namespace std;
 
int main() {
    int a, b;
    cin >> a >> b;

    cout << a+b << '\n';
    return 0;
}
```