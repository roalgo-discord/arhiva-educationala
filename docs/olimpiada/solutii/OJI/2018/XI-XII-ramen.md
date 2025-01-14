---
tags:
    - OJI
    - clasa XI-XII
---

# Soluția problemei ramen (OJI 2018, clasele XI-XII)

!!! example "Cunoștințe necesare"
    - [Introducere în metoda Greedy](https://edu.roalgo.ro/usor/greedy/)
    - [Algoritmi de sortare](https://edu.roalgo.ro/usor/sorting/)
    - [Introducere în STL](https://edu.roalgo.ro/cppintro/stl/)

**Autor soluție**: Ștefan-Cosmin Dăscălescu

!!! note "Link problemă"
    Această problemă poate fi accesată [aici](https://kilonova.ro/problems/24/). 

Pentru a rezolva această problemă, plecăm de la următoarea presupunere, care se poate demonstra foarte ușor: Dacă o porție de mâncare ajunge la persoana aflată la poziția $x$, iar această persoană are o comandă deja, respectiva persoană va lua porția, chiar dacă nu este porția pe care a comandat-o.

Pe baza acestui fapt, putem să sortăm comenzile în ordine crescătoare a poziției persoanei care face acea comandă și la fiecare pas, persoana respectivă va obține prima comandă care trece în dreptul ei, după ce a făcut comanda, indiferent de timpul necesar pentru pregătirea ei. 

Pentru a putea simula acest proces, vom folosi o structură de tip set, care ne permite inserarea și ștergerea valorilor în timp logaritmic. Mai jos găsiți o soluție care obține punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;
ifstream in("ramen.in");
ofstream out("ramen.out");
int n, d;
set<int> s;
int ans[100002];
struct aa {
    int care, timp, pi;
};
aa v[100002];
bool cmp(aa a, aa b) {
    if (a.care == b.care)
        return a.timp < b.timp;
    return a.care < b.care;
}
int main() {
    in >> n >> d;
    for (int i = 1; i <= n; ++i) {
        in >> v[i].timp >> v[i].care;
        v[i].pi = i;
        s.insert(v[i].timp + d);
    }
    sort(v + 1, v + n + 1, cmp);
    for (int i = 1; i <= n; ++i) {
        auto it = s.lower_bound(v[i].timp - v[i].care);
        ans[v[i].pi] = *it + v[i].care;
        s.erase(it);
    }
    for (int i = 1; i <= n; ++i)
        out << ans[i] << '\n';
    return 0;
}
```