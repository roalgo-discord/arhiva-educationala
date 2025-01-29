---
tags:
    - functii
    - recursivitate
    - olimpiada
---

**Autor**: Ștefan-Cosmin Dăscălescu

!!! example "Cunoștințe necesare"
    - [Subprograme](https://edu.roalgo.ro/cppintro/functions/)

## Introducere

Divide et Impera (nume inspirat din doctrina romana, poate fi tradus ca dezbină
și stăpânește) este o metodă de programare bazată pe un principiu simplu, acela
al împărțirii unei probleme date în două sau mai multe subprobleme de același
tip, care sunt independente și prin combinarea rezultatelor obținute, obținem
rezultatul problemei întregi.

Subproblemele trebuie să fie de același tip cu problema inițială, ele urmând a
fi rezolvate prin aceeași tehnică. De regulă, vom împărți problema în
subprobleme de dimensiuni aproximativ egale. În urma împărțirilor succesive în
subprobleme, se ajunge în situația că problema curentă nu mai poate fi împărțită
în subprobleme. O asemenea problemă se numește caz de bază (sau problemă
elementară) și se rezolvă într-un mod trivial, fără a mai fi nevoie de alte
împărțiri).

Divide et Impera admite de regulă o implementare recursivă – rezolvarea
problemei constă în rezolvarea unor subprobleme de același tip. Un algoritm
pseudocod care descrie metoda este:

```
funcție (X) 
   dacă X este caz de bază atunci 
      rezolvăm cazul de bază
      întoarcem răspunsul
   altfel 
      aflam valoarea (sau valorile) de mijloc
      împărțim problema X în 2^n subprobleme, unde n este numărul de valori de mijloc
      unim rezultatele obținute în cele 2^n funcții
      întoarcem răspunsul obținut
```

Această tehnică este frecvent întâlnită în foarte multe tipuri de probleme, ea
stând la baza multor algoritmi de sortare prin comparare (quicksort, mergesort)
dar are aplicații și în domeniul matematicii, fiind folosit în algoritmi mai
avansați precum înmulțirea matricilor sau aflarea celor mai apropiate puncte în
plan. Totuși, acest articol se va concentra pe aplicațiile mai simple ale divide
et impera.

## Problema exemplu - [Ordonat](https://www.pbinfo.ro/probleme/4356/ordonatdivimp)

Pentru a rezolva această problemă, trebuie să identificăm subproblemele și
diversele cazuri care pot apărea atunci când rezolvăm problema.

În primul rând, pentru ca un șir să fie ordonat, trebuie ca ambele jumătăți ale
șirului să fie ordonate, iar elementele din mijloc trebuie să aibă același
rezultat la comparare.

De exemplu, un șir strict crescător este format din două șiruri strict
crescătoare, cu proprietatea că $v[mij] < v[mij+1]$. Putem defini în mod similar
și un șir strict descrescător.

În cazul acestei probleme, cazul de bază constituie în șirul cu lungime $1$,
care este atât strict crescător, cât și strict descrescător. Puteți vedea codul
sursă mai jos.

```cpp
#include <iostream>
using namespace std;

int n, v[1001];

int divide (int L, int R) {
    if (L == R) {
        return 3; // atat strict crescator cat si strict descrescator
    }
    int mid = (L + R) / 2;
    int ansL = divide(L, mid);
    int ansR = divide(mid+1, R);
    if ((ansL%2 == 1) && (ansR%2 == 1) && v[mid] < v[mid+1]) {
        return 1; // strict crescator
    }
    if ((ansL >= 2) && (ansR >= 2) && v[mid] > v[mid+1]) {
        return 2; // strict descrescator
    }
    return 0; // neordonat
}
int main() {
    cin >> n;
    for (int i = 1; i <= n; i++) {
        cin >> v[i];
    }
    
    int ans = divide(1, n);
    if (ans == 1) {
        cout << "strict crescator" << '\n';
    }
    if (ans == 2) {
        cout << "strict descrescator" << '\n';
    }
    if (ans == 0) {
        cout << "neordonat" << '\n';
    }
    return 0;
}
```

## Problema turnurilor din Hanoi - [Tower of Hanoi - CSES](https://cses.fi/problemset/task/2165/)

!!! note "Observație"

    Această problemă este una foarte celebră, fiind studiată de foarte mulți ani
    - [Tower of Hanoi](hhttps://en.wikipedia.org/wiki/Tower_of_Hanoi)

Problema constă în mutarea unui șir de $3$ (în varianta generalizată, $n$)
discuri de dimensiuni descrescătoare din tija $A$ în tija $B$, folosindu-te de o
tijă ajutătoare, $C$. La un pas, putem muta un disc dintr-o tijă în alta, cu
condiția ca tija unde plasăm discul să aibă fie un disc mai mare în vârf, fie să
nu aibă niciun disc plasat.

Numărul minim de mutări pentru a muta $n$ discuri din tija $A$ în tija $B$ este
$2^n - 1$, iar algoritmul de mutare al discurilor se bazează pe faptul că vom
vrea să mutăm la un pas un disc maxim în tija $B$, fapt ce presupune mutarea
turnului cu înălțime $h - 1$ în discul $C$. Acest lucru se poate simula folosind
un algoritm de tipul divide et impera. Mai jos găsiți un algoritm ce rezolvă
această problemă.

```cpp
#include <iostream>
using namespace std;
 
void hanoi(int cnt, int L, int M, int R) { // mutam din L in R, folosind M
    if (cnt == 0) {
        return;
    }
    hanoi(cnt-1, L, R, M);
    cout << L << " " << M << '\n';
    hanoi(cnt-1, R, M, L);
}
int main() {
    int n;
    cin >> n;
    
    cout << (1<<n) - 1 << '\n';
    hanoi(n, 1, 3, 2);
    return 0;
}
```

## Problema [compresie - OJI 2012, clasa a X-a](https://kilonova.ro/problems/827)

Pentru a rezolva această problemă, va trebui să analizăm șirul dat de la
intrare. Mai întâi aflăm dimensiunea matricii, iar mai apoi, vom simula
împărțirile folosind divide et impera. Trebuie avut în vedere cazurile când
împărțim doar în două cadrane în loc de patru, precum și cazurile de bază când
umplem o zonă a matricii cu un anumit caracter.

Mai jos puteți găsi o soluție care rezolvă problema.

```cpp
#include <bits/stdc++.h>
using namespace std;
ifstream f("compresie.in");
ofstream g("compresie.out");
int Stars, poz, len, nr, nl, n;
char c[1000002];
char mat[1002][1002];
void Start() {
    f >> c;
    len = strlen(c);
    for (int i = 0; i < len; ++i)
        if (c[i] == '*')
            ++Stars;
        else if (c[i] >= '0' && c[i] <= '9')
            nr = nr * 10 + c[i] - '0';
        else if (nr)
            nl += nr, nr = 0;
        else
            ++nl;
    g << Stars << '\n';
}
void rec(int stl, int stc, int sfl, int sfc) {
    if (sfl == stl && stc == sfc) {
        mat[stl][stc] = c[poz], ++poz;
        return;
    }
    if (c[poz] == '*') {
        ++poz;
        if (sfl == stl) {
            rec(stl, stc, sfl, (stc + sfc) / 2);
            rec(stl, (stc + sfc) / 2 + 1, sfl, sfc);
        } else if (stc == sfc) {
            rec(stl, stc, (stl + sfl) / 2, sfc);
            rec((stl + sfl) / 2 + 1, stc, sfl, sfc);
        } else {
            rec(stl, stc, (stl + sfl) / 2, (stc + sfc) / 2);
            rec(stl, (stc + sfc) / 2 + 1, (stl + sfl) / 2, sfc);
            rec((stl + sfl) / 2 + 1, stc, sfl, (stc + sfc) / 2);
            rec((stl + sfl) / 2 + 1, (stc + sfc) / 2 + 1, sfl, sfc);
        }
    } 
    else if (c[poz] >= '0' && c[poz] <= '9') {
        int nr = 0;
        while (c[poz] >= '0' && c[poz] <= '9')
            nr = nr * 10 + c[poz] - '0', ++poz;
        for (int i = stl; i <= sfl; ++i)
            for (int j = stc; j <= sfc; ++j)
                mat[i][j] = c[poz];
        ++poz;
    }
}
int main() {
    Start();
    n = sqrt(nl);
    rec(1, 1, n, n);
    for (int i = 1; i <= n; g << '\n', ++i)
        for (int j = 1; j <= n; ++j)
            g << mat[i][j];
    return 0;
}
```

## Problema [Interesting Array](https://kilonova.ro/problems/382)

Pentru a rezolva această problemă, trebuie să plecăm de la șirul inițial și ne
bazăm pe faptul că vom avea cel mult $\sqrt n$ frecvențe distincte, fapt ce
motivează o parcurgere de tip divide et impera, unde excludem mereu valorile cu
frecvență minimă. Deși în teorie acest algoritm poate avea o complexitate de tip
$O(n \sqrt n)$, în practică algoritmul va fi foarte rapid și relativ simplu de
implementat.

```cpp
#include <bits/stdc++.h>
using namespace std;

int v[100001];
long long ans;

void query(int a, int b) {
    map<int, long long> m;
    long long maxx = 0, minn = 1e9;
    for (int i = a; i <= b; i++) {
        m[v[i]]++;
    }
    for (auto it : m) {
        maxx = max(maxx, it.second);
        minn = min(minn, it.second);
    }
    ans = max(ans, maxx * minn);
    for (int i = a; i <= b; i++) {
        int j = i - 1;
        while (j + 1 <= b && m[v[j + 1]] != minn) {
            j++;
        }
        if (j >= i) {
            query(i, j);
            i = j;
        }
    }
}

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        cin >> v[i];
    }
    query(1, n);
    cout << ans;
    return 0;
}
```

## Concluzii

Tehnica divide et impera este o tehnică foarte importantă pentru înțelegerea
principiului din spatele unor algoritmi de sortare mai dificili, care chiar dacă
nu trebuie implementați în timpul unui concurs de algoritmică datorită
existenței funcției std::sort, problemele care folosesc proprietățile acestor
algoritmi apar în anumite situații. De asemenea, unele probleme se dovedesc a fi
exerciții de implementare foarte utile, care s-au mai regăsit în problemele date
la olimpiadă la clasa a X-a.

## Probleme suplimentare

- [cât mai multe probleme din acest capitol pentru Divide et
  Impera](https://www.pbinfo.ro/probleme/categorii/94/divide-et-impera)
- [OJI 2024 aprogressive](https://kilonova.ro/problems/2504)
- [ONI 2013 romb](https://kilonova.ro/problems/1419)
- [Codeforces a-good String](https://codeforces.com/contest/1385/problem/D)
- [infoarena bitcost](https://www.infoarena.ro/problema/bitcost)
- [Codeforces Creative Snap](https://codeforces.com/contest/1111/problem/C)
- [OJI 2017 caps](https://kilonova.ro/problems/887)
- [ONI 2010 xp](https://kilonova.ro/problems/1350)
- [Codeforces Dr. Evil
  Underscores](https://codeforces.com/contest/1285/problem/D)
- [ONI 2004 invsort](https://kilonova.ro/problems/1993)
- [Codeforces The Number of
  Subpermutations](https://codeforces.com/problemset/problem/1175/F)
- [ONI 2018 proiectoare](https://kilonova.ro/problems/1543)
- [RCPC 2023 blabla](https://kilonova.ro/problems/1894)
- [probleme cu Divide et Impera de pe
  Codeforces](https://codeforces.com/problemset?tags=divide%20and%20conquer)
- [probleme cu Divide et Impera de pe Kilonova](https://kilonova.ro/tags/280)

## Resurse suplimentare

- [Divide et Impera -
  pbinfo](https://www.pbinfo.ro/articole/7651/divide-et-impera)
- [Divide et Impera - cppi
  sync](https://cppi.sync.ro/materia/probleme_de_baza_cu_divide_et_impera.html)
