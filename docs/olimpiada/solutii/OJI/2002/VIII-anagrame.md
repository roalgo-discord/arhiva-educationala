---
tags:
    - OJI
    - clasa VIII
authors:
    - stefdasca
---

# Soluția problemei Anagrame (OJI 2002, clasa a VIII-a)

!!! example "Cunoștințe necesare"
    - [Șiruri de caractere](../../../../cppintro/strings.md)
    - [(Opțional): Introducere în STL](../../../../cppintro/stl.md)

!!! note "Link problemă"
    Această problemă poate fi accesată [aici](https://kilonova.ro/problems/708/).

Această problemă reprezintă un exercițiu de generare a tuturor permutărilor unui
șir de caractere care poate avea litere care se repetă. Cea mai simplă metodă
constă în aplicarea funcției next_permutation, urmată de afișarea caracterelor
în sine.

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ifstream cin("anagrame.in");
    ofstream cout("anagrame.out");

    string s;
    cin >> s;

    sort(s.begin(), s.end());

    do {
        cout << s << '\n';
    } while (next_permutation(s.begin(), s.end()));
    return 0;
}
```