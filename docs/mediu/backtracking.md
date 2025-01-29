---
tags:
    - brute force
    - implementare
    - recursivitate
    - cautare completa
---

**Autor**: Ștefan-Cosmin Dăscălescu

!!! example "Cunoștințe necesare"
    - [Subprograme](https://edu.roalgo.ro/cppintro/functions/)
    - [Simularea soluției](https://edu.roalgo.ro/usor/simulating-solution/)
    - [Tehnica divide et impera](https://edu.roalgo.ro/mediu/divide-et-impera/)

## Introducere

Tehnica backtracking este o tehnică folosită în problemele în care trebuie să
generăm toate soluțiile posibile și eventual să verificăm pentru fiecare dintre
ele dacă respectă una sau mai multe condiții.

Această tehnică ne va garanta mereu obținerea unei soluții optime, dar din
păcate, rezolvările care folosesc această tehnică tind să fie foarte lente,
această metodă fiind o strategie viabilă doar atunci când **datele de intrare și
restricțiile sunt foarte mici** (de regulă, $n \leq 10$ pentru permutări, $n
\leq 20$ pentru submulțimi și doar în cazuri foarte rare și cu multe optimizări,
$n$ poate fi cel mult $30-40$).

În general, vom folosi recursivitatea pentru a ne genera soluțiile, iar pentru a
le genera, vom pleca de la o soluție vidă, căreia îi vom adăuga la un anumit pas
toate variantele posibile de a continua, evident ținând cont de restricțiile
problemei. Mai jos vom prezenta niște exemple.

## Problema exemplu - [generarea permutărilor](https://www.pbinfo.ro/probleme/123/permutari)

Pentru a rezolva această problemă, vom avea o funcție recursivă care va avea
drept parametru poziția la care suntem în permutarea pe care o generăm, iar mai
apoi vom avea două cazuri distincte:

1. Suntem la finalul permutării: în acest caz, vom afișa permutarea generată.
2. Nu suntem la finalul permutării: în acest caz, vom încerca să adăugăm fiecare
   valoare de la 1 la $n$ pe următoarea poziție a permutării. Pentru a putea
   face asta, va trebui să parcurgem șirul de numere obținut până acum pentru a
   evita plasarea aceleiași valori de două ori (o permutare nu are dubluri).

!!! note "Observație"

    Procesul descris la punctul 2 poate fi optimizat prin păstrarea în memorie
    a unui alt șir, care să ne ofere informația despre existența unei anumite
    valori în permutare.

Deoarece sunt $n!$ permutări, complexitatea soluției va fi $O(n! \cdot n)$.

```cpp
#include <fstream>
using namespace std;

ifstream cin("permutari.in");
ofstream cout("permutari.out");

int n, v[11], vis[11];

void backtrack (int pos) {
    if (pos == n+1) { // afisam permutarea
        for (int i = 1; i <= n; i++) {
            cout << v[i] << " ";
        }
        cout << '\n';
    }
    else {
        for (int nxt = 1; nxt <= n; nxt++) {
            if (vis[nxt] == 0) { // verificam daca nxt a aparut deja
                vis[nxt] = 1; // il marcam vizitat
                v[pos] = nxt;
                backtrack(pos + 1); // apelam urmatorul pas
                vis[nxt] = 0; // resetam contorul pentru a putea folosi nxt in viitor
            }
        }
    }
}

int main() {
    cin >> n;
    backtrack(1);
    return 0;
}
```

## Problema exemplu - [Chessboard and Queens](https://cses.fi/problemset/task/1624)

Pentru a rezolva această problemă, trebuie să facem câteva observații pentru a
reduce numărul de stări pe care trebuie să-l vizităm. În primul rând, deoarece
reginele atacă pe linie și pe coloană, fiecare regină trebuie să fie pe o linie
distinctă și pe o coloană distinctă, iar acum singurul lucru pe care va trebui
să-l verificăm este faptul că nicio pereche de regine nu se află pe aceeași
diagonală, fie ea principală sau secundară.

Nu în ultimul rând, trebuie să evităm stările care sunt blocate de ziduri și să
numărăm variantele corecte.

!!! note "Observație"

    Soluția de mai jos folosește funcția `next_permutation`, care ia ca
    parametri începutul și sfârșitul unei secvențe de valori și generează
    următoarea permutare în ordine lexicografică a șirului curent. De remarcat
    este faptul că se poate folosi și soluția de mai sus, împreună cu
    observațiile specifice acestei probleme.

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
 
using namespace std;
 
int main() {
    vector<vector<char>> grid(8, vector<char> (8));
    vector<int> perm(8);
    
    for (int i = 0; i < 8; ++i) {
        for (int j = 0; j < 8; j++) {
            cin >> grid[i][j];
        }
        perm[i] = i;
    }
    int ans = 0;
    do {
        bool ok = 1;
        for (int i = 0; i < 8; i++)
            if (grid[i][perm[i]] == '*') {
                ok = 0;
            }
        for (int i = 0; i < 8; ++i) {
            for (int j = i+1; j < 8; ++j) {
                if (abs(i-j) == abs(perm[i] - perm[j])) {
                    ok = 0;
                }
            }
        }
        ans += ok;
    } while(next_permutation(perm.begin(), perm.begin() + 8));
    
    cout << ans << '\n';
    return 0;
}
```

## Concluzii

Cunoașterea acestei tehnici, împreună cu problemele specifice reprezintă un
punct important de plecare pentru a putea genera toate soluțiile atunci când
situația o cere. De asemenea, scrierea unei astfel de soluții poate fi utilă și
atunci când vrei să rezolvi o problemă mai dificilă, dar nu ai făcut încă
observațiile care să te ducă la un punctaj mai mare, garantându-ți niște puncte
și o soluție corectă care poate servi drept un punct de plecare pentru găsirea
altor observații.

## Probleme suplimentare

- [pbinfo aranjamente](https://www.pbinfo.ro/probleme/196/aranjamente)
- [pbinfo
  produscartezian1](https://www.pbinfo.ro/probleme/1277/produscartezian1)
- [pbinfo generarea
  submulțimilor](https://www.pbinfo.ro/probleme/198/submultimi)
- [pbinfo regine1](https://www.pbinfo.ro/probleme/1281/regine1)
- [pbinfo partitiinumar](https://www.pbinfo.ro/probleme/320/partitiinumar)
- [pbinfo paranteze](https://www.pbinfo.ro/probleme/344/paranteze)
- [Probleme cu backtracking de pe
  pbinfo](https://www.pbinfo.ro/probleme/categorii/27/backtracking)
- [USACO Bronze Cow
  Gymnastics](https://usaco.org/index.php?page=viewproblem2&cpid=963)
- [USACO Bronze Why Did The Cow Cross The Road
  II](https://usaco.org/index.php?page=viewproblem2&cpid=712)
- [OJI 2010 Immortal](https://kilonova.ro/problems/41)
- [USACO Bronze Livestock
  Lineup](http://www.usaco.org/index.php?page=viewproblem2&cpid=965)
- [USACO Bronze Back and
  Forth](http://www.usaco.org/index.php?page=viewproblem2&cpid=857)
- [Codeforces Three logos](https://codeforces.com/problemset/problem/581/D)
- [Probleme cu backtracking de pe kilonova](https://kilonova.ro/tags/378)
- [CSES Grid Paths](https://cses.fi/problemset/task/1625)

## Resurse suplimentare

- [Metoda
  backtracking](https://www.pbinfo.ro/articole/16597/metoda-backtracking)
- [Backtracking pe vectori și probleme diverse - CPPI
  Sync](https://cppi.sync.ro/materia/backtracking_pe_vectori.html)
- [Backtracking în plan - CPPI
  Sync](https://cppi.sync.ro/materia/backtracking_in_plan.html)
- [Basic Complete Search - USACO
  Guide](https://usaco.guide/bronze/intro-complete)
- [Complete Search with Recursion - USACO
  Guide](https://usaco.guide/bronze/complete-rec)
