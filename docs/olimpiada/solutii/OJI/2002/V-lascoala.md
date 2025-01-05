---
tags:
    - OJI
    - clasa V
---

# Soluția problemei La școală (OJI 2002, clasa a V-a)

!!! example "Cunoștințe necesare"
    * [Operatori și expresii. Cunoștințe matematice de bază](https://edu.roalgo.ro/cppintro/basic-math/)

**Autor**: Ștefan-Cosmin Dăscălescu

!!! note "Link problemă"
    Această problemă poate fi accesată [aici](https://kilonova.ro/problems/702/).

Această problemă poate fi rezolvată aflând cel mai mare pătrat perfect mai mic decât $n$, lucru ce se poate afla verificând toate pătratele perfecte și alegând valoarea maximă.

Ulterior, aflăm diferența dintre $n$ și $k^2$, iar mai apoi afișăm liniile cu elevi în ordine descrescătoare a valorilor, câte $k$ pe rând. 

Mai jos puteți găsi o soluție care ia punctajul maxim.

```cpp
#include <fstream>
using namespace std;

ifstream cin("lascoala.in");
ofstream cout("lascoala.out");

int main() {
    
    int n;
    cin >> n;
    
    int k = 1;
    while ((k+1) * (k+1) < n) {
        k++;
    }
    cout << n - k*k << '\n';
    for (int i = k*k; i > 0; i -= k) {
        for (int j = i; j > i - k; j--) {
            cout << j << " ";
        }
        cout << '\n';
    }
    
    return 0;
}
```