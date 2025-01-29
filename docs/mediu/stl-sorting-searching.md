---
tags:
    - meta
    - greedy
    - structuri de date
---

**Autor**: Ștefan-Cosmin Dăscălescu

!!! example "Cunoștințe necesare"
    - [Introducere în metoda Greedy](https://edu.roalgo.ro/usor/greedy/)
    - [Algoritmi de sortare](https://edu.roalgo.ro/usor/sorting/)
    - [Introducere în STL](https://edu.roalgo.ro/cppintro/stl/)

## Introducere

De multe ori, avem de-a face cu probleme unde găsim o soluție care folosește o
metodă de tip brute-force care funcționează destul de încet dar nu o putem
optimiza folosind structurile de date obișnuite. Pentru aceste tipuri de
probleme, de multe ori putem apela la structurile de date din STL, fie că este
vorba de a afla rapid frecvența unei valori mai mari, fie că vrem să ștergem o
anumită valoare rapid sau să avem alte tipuri de precalculări.

În acest articol, vom prezenta câteva exemple de probleme care nu sunt dificile
și prezintă aplicații ale acestor structuri de date, aplicații de o dificultate
ușoară sau medie, utile pentru oricine vrea să se obișnuiască cu funcțiile
acestor biblioteci ce compun STL.

## Problema [Subarray Sums II - CSES](https://cses.fi/problemset/task/1661)

Pentru a rezolva această problemă, putem pleca de la una din soluțiile care are
complexitatea $O(n^2)$. Această soluție calculează sumele parțiale ale șirului
și fixează capetele din stânga și dreapta, folosindu-se de sumele parțiale
calculate anterior pentru a număra secvențele cu suma $s$.

O îmbunătățire pe care o putem face constă în faptul că dacă fixăm una din
sumele din expresia anterioară (să zicem că fixăm $sum[r]$), trebuie să aflăm
câte poziții $l$ există astfel încât $sum[r] - sum[l] = s$.

Acest lucru se poate face stocând cu ajutorul unui map frecvența fiecărei sume
(inițializăm la început suma $0$ cu frecvența $1$, corespunzătoare unui șir
gol), iar pentru fiecare $i$, vom actualiza datele din map și vom aduna la
răspuns frecvența sumei căutate. Astfel, complexitatea algoritmului va deveni
$O(n \log n)$.

```cpp
#include <iostream>
#include <map>
using namespace std;
 
int main() {
    
    map<long long, int> mp;
    long long n, s;
    cin >> n >> s;
    mp[0] = 1;
    long long ans = 0, sum = 0;
    for (int i = 0; i < n; i++) {
        int nr;
        cin >> nr;
        
        sum += nr;
        ans += mp[sum - s];
        mp[sum]++;
    }
    cout << ans;
    return 0;
}
```

## Problema [Eugene and an array - Codeforces](https://codeforces.com/contest/1333/problem/C)

!!! note "Soluție video"

    Această problemă are soluția video descrisă
    [aici](https://www.youtube.com/watch?v=XR_ZQvr9zyU)

Pentru a rezolva această problemă, trebuie să găsim o proprietate a sumelor
parțiale care să ne ajute să prevenim numărarea unor subsecvențe care au
subsecvențe cu suma $0$.

O idee pe care am putea-o folosi este aceea de a afla pentru poziția curentă,
cel mai mare capăt stâng astfel încât suma elementelor dintre acele două poziții
să fie egală cu $0$. Următorul pas ar fi să observăm faptul că capătul maxim din
stânga pentru care există o poziție $j > i$ astfel încât suma de la poziția
$i+1$ la $j$ să fie $0$ este limita superioară de la care putem adăuga
subsecvențele la răspuns.

De aici, ne mai rămâne un singur pas, și anume folosirea unei structuri de tip
std::map pentru a ține evidența celor mai recente poziții unde se găsește o
anumită sumă parțială.

```cpp
#include <iostream>
#include <map>
using namespace std;

int n, a[200002];
map<long long, int> mp;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    mp[0] = -1;
    cin >> n;
    long long sm = 0;
    long long ans = 0;
    int mx = 0;
    for (int i = 1; i <= n; ++i) {
        cin >> a[i];
        sm += a[i];
        if (mp.find(sm) != mp.end()) {
            if (sm == 0 && mp[0] == -1)
                mx = max(mx, 1);
            else
                mx = max(mx, mp[sm] + 1);
        }
        mp[sm] = i;
        ans = ans + i - mx;
    }
    cout << ans;
    return 0;
}
```

## Problema [ramen - OJI 2018](https://kilonova.ro/problems/24)

Pentru a rezolva această problemă, plecăm de la următoarea presupunere, care se
poate demonstra foarte ușor: Dacă o porție de mâncare ajunge la persoana aflată
la poziția $x$, iar această persoană are o comandă deja, respectiva persoană va
lua porția, chiar dacă nu este porția pe care a comandat-o.

Pe baza acestui fapt, putem să sortăm comenzile în ordine crescătoare a poziției
persoanei care face acea comandă și la fiecare pas, persoana respectivă va
obține prima comandă care trece în dreptul ei, după ce a făcut comanda,
indiferent de timpul necesar pentru pregătirea ei.

Pentru a putea simula acest proces, vom folosi o structură de tip set, care ne
permite inserarea și ștergerea valorilor în timp logaritmic. Mai jos găsiți o
soluție care obține punctajul maxim.

```cpp
#include <iostream>
#include <set>
#include <algorithm>
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

## Concluzii

Aceste tipuri de probleme se dovedesc a fi foarte ușor de abordat odată ce avem
la dispoziție facilitățile potrivite, deoarece simplificările găsite sunt acum
mult mai ușor de implementat. Totuși, trebuie avut în vedere că aceste structuri
de date nu sunt mereu cea mai optimă variantă și este bine să ne gândim la
abordări care să se muleze și pe restricțiile problemelor în sine.

## Probleme suplimentare

- [CPPI 2024 Highlight](https://kilonova.ro/problems/3268)
- [CSES Apartments](https://cses.fi/problemset/task/1084/)
- [OJI 2023 parcare](https://kilonova.ro/problems/500)
- [USACO Silver Convention II](https://usaco.org/index.php?page=viewproblem2&cpid=859)
- [Codeforces William and Robot](https://codeforces.com/gym/104002/problem/E)
- [OJI 2024 parking](https://kilonova.ro/problems/24)
- [USACO Gold Snow Boots](http://www.usaco.org/index.php?page=viewproblem2&cpid=813)

## Resurse suplimentare

- [More Operations on Sorted Sets - USACO Guide](https://usaco.guide/silver/intro-sorted-sets?lang=cpp)
- [Sets with custom comparators - USACO Guide](https://usaco.guide/silver/custom-cpp-stl)