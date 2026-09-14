---
id: OJI-2007-VII-excel
title: Soluția problemei excel (OJI 2007, clasa a VII-a)
problem_id: 765
authors: []
# prerequisites:
#    - placeholder
tags:
    - OJI
    - clasa VII
---

Articolul va fi disponibil curând în arhivă.

Până atunci, puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2007/07/Excel.txt).

<div class="editorial-text" markdown>

```text
Programul va prelucra siruri de caractere.

Se va realiza prelucrarea pe coloane completandu-se rezultatele obtinute.
Sirul de caractere ce reprezinta o linie va fi despartit in subsiruri avand
drept separator caracterul ' '(spatiu)

Daca subsirul format nu incepe cu caracterul '=' atunci el va reprezenta scrierea unei valori numerice.
Folosind o functie din stdlib.h (atoi), sau realizand conversia caracterelor in valori numerice folosind codul ASCII
al caracterelor si folosind cifrele se obtine valoarea numerica de pe linia si coloana specificata.

Daca subsirul incepe cu caracterul '=' atunci se va realiza prelucrarea sirului pentru a se
desparti in subsiruri separate prin caracterul '+', ce vor indica linia (partea numerica) si coloana (partea literala).

Se asigura ca matricea se poate completa prin transformarea valorilor corespunzatoare pe coloane si apoi linii.
```

</div>

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;

    cout << a + b << '\n';
    return 0;
}
```
