---
tags:
    - OJI
    - clasa VIII
---

# Soluția problemei Sir (OJI 2002, clasa a VIII-a)

!!! example "Cunoștințe necesare"
    - [Șiruri de caractere](https://edu.roalgo.ro/cppintro/strings/)
    - [(Opțional): Introducere în STL](https://edu.roalgo.ro/cppintro/stl/)

**Autor**: Ștefan-Cosmin Dăscălescu

!!! note "Link problemă"
    Această problemă poate fi accesată [aici](https://kilonova.ro/problems/707/).

Dacă observăm cum se schimbă șirul de caractere, se poate vedea că dacă avem șirul după $i$ zile, șirul după $i+1$ zile va conține grupe care sunt formate din două valori: dimensiunea unei grupe de cifre consecutive, respectiv cifra în sine. 

De exemplu, după ziua $4$, șirul este $1211$. Avem o grupă de lungime $1$ cu $1$, lungime $1$ cu $2$ și lungime $2$ cu $1$. De aceea, următorul șir va fi $111221$.

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;

ifstream in("sir.in");
ofstream out("sir.out");

int main() {
    int n;
    in >> n;
    string s = "1";
    while (--n) {
        int f = 1;
        char v = s[0];
        string newS = "";
        for (int i = 1; i < (int)s.size(); i++) {
            if (s[i] == s[i - 1])
                f++;
            else {
                newS += to_string(f);
                newS += v;
                f = 1;
                v = s[i];
            }
        }
        if (f)
            newS += to_string(f), newS += v;
        s = newS;
    }
    out << s;
    return 0;
}
```