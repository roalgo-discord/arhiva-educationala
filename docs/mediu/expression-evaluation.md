---
tags:
    - stiva
    - expresii
    - implementare
    - recursivitate
---

**Autor**: Ștefan-Cosmin Dăscălescu

## Introducere

În unele probleme de algoritmică, sunteți nevoiți să evaluați valorile unor expresii aritmetice sau în general, valorile unor expresii conform unor sisteme matematice sau logice bine definite. Aceste probleme sunt colocvial numite probleme la care avem nevoie de noțiunile specifice evaluării unor expresii aritmetice (parsing în engleză).

!!! note "Observație"
    A nu se confunda denumirea de parsing cu cea de la parsarea datelor de intrare, chiar dacă ambele se ocupă de procesarea unor șiruri de caractere, parsarea datelor este o metodă folosită pentru îmbunătățirea vitezei de citire a datelor, mai multe detalii puteți găsi [aici](https://edu.roalgo.ro/cppintro/fast-io/).

Toate aceste probleme conțin următoarele particularități:

* Se definește un sistem de calcul sau un set de operații folosind o aritmetică sau o gramatică nu foarte complicată.
* La fel ca la operațiile aritmetice cu care sunteți obișnuiți, există o ordine a efectuării operațiilor și eventual niște operatori care fixează prioritățile (parantezele).
* Implementarea precisă și clară este un element esențial și în multe cazuri, suficient pentru obținerea punctajului maxim.
* Uneori, această parte devine intermediară în contextul unei cerințe mai particulare a problemei.

Această tehnică se întâlnește în contextul olimpiadei de informatică mai ales la nivelul clasei a zecea, fiind un subiect destul de frecvent întâlnit împreună cu celelalte aplicații ale structurilor de date liniare (stiva, coada, algoritmul lui Lee).

Pe parcurs, vom explica o implementare simplă și clară pentru aceste tipuri de probleme, împreună cu exemple explicate.

## Problema exemplu - [evaluare infoarena](https://www.infoarena.ro/problema/evaluare)

Pentru a rezolva această problemă, trebuie să aplicăm unul din algoritmii consacrați și să îl adaptăm pentru operațiile aritmetice date. Cele două metode principale de implementare a expresiilor aritmetice reprezintă forma poloneză și recursivitatea indirectă. Chiar dacă ambele au avantajele și dezavantajele lor, articolul va insista mai ales pe recursivitatea indirectă, deoarece este mai ușor de folosit și mai populară în contextul olimpiadei de informatică. 

### Forma poloneză 

Mai întâi, considerăm doar o problemă simplificată: presupunem că toți operatorii sunt binari, și toți sunt asociativi la stânga. Parantezele sunt permise.

Vom configura două stive: una pentru numere și una pentru operatori și paranteze. Inițial, ambele stive sunt goale. Pentru a doua stivă, vom menține condiția ca toate operațiile să fie ordonate în ordinea strict descrescătoare a priorității. Dacă există paranteze pe stivă, atunci fiecare bloc de operatori (corespunzător unei perechi de paranteze) este ordonat, dar întreaga stivă nu trebuie neapărat să fie ordonată.

Vom itera prin caracterele expresiei de la stânga la dreapta. Dacă caracterul curent este o cifră, atunci plasăm valoarea acestui număr pe stivă. Dacă caracterul curent este o paranteză de deschidere, atunci o plasăm pe stivă. Dacă caracterul curent este o paranteză de închidere, atunci executăm toți operatorii de pe stivă până ajungem la paranteza de deschidere (cu alte cuvinte, executăm toate operațiile din interiorul parantezelor). În final, dacă caracterul curent este un operator, atunci, cât timp vârful stivei conține un operator cu aceeași prioritate sau cu o prioritate mai mare, executăm această operație și plasăm noua operație pe stivă.

După ce am procesat întreaga expresie, este posibil ca unii operatori să mai fie pe stivă, așa că îi executăm.

O asemenea sursă se găsește [aici](https://www.infoarena.ro/job_detail/3242463?action=view-source).

### Recursivitatea indirectă

În ceea ce privește recursivitatea indirectă, algoritmul funcționează în felul următor:

Se împarte expresia în blocuri separate de operatorii cu prioritate cea mai mică, iar apoi pentru acele blocuri, se separă succesiv în blocuri separate de operatori cu prioritate tot mai mare, până când fie reducem termenii la valori simple, fie ajungem la paranteze, care fac procesul să se întoarcă la funcțiile inițiale. 

Deoarece nu este necesar să păstrăm în memorie toate aceste blocuri, putem pur și simplu să parcurgem șirul de caractere în timp liniar, deoarece aceste funcții se vor apela una pe cealaltă, de aici vine și numele de recursivitate indirectă. 

Pentru implementare, se poate observa faptul că funcțiile evaluare și termen sunt foarte similare între ele, iar funcția factor fie calculează o valoare simplă, fie întoarce procesul la început. Mai jos se poate observa implementarea în C++ pentru problema de pe infoarena.

```cpp
#include <fstream>
using namespace std;

ifstream cin("evaluare.in");
ofstream cout("evaluare.out");

int factor(), termen();
string EVAL;
int poz = 0;

int evaluare() {
    int R = termen();
    while (EVAL[poz] == '-' || EVAL[poz] == '+') {
        if (EVAL[poz] == '-') {
            poz++;
            R -= termen();
        }
        else {
            if (EVAL[poz] == '+') {
                poz++;
                R += termen();
            }
        }
    }
    return R;
}
int termen() {
    int F = factor();
    while (EVAL[poz] == '*' || EVAL[poz] == '/') {
        if (EVAL[poz] == '*') {
            poz++;
            F *= factor();
        }
        else {
            if (EVAL[poz] == '/') {
                poz++;
                F /= factor();
            }
        }
    }
    return F;
}
int factor() {
    long long r = 0;
    if (EVAL[poz] == '(') {
        poz++;
        r = evaluare();
        poz++;
    }
    else {
        while (EVAL[poz] >= '0' && EVAL[poz] <= '9') {
            r = r * 10 + (EVAL[poz] - '0');
            poz++;
        }
    }
    return r;
}
int main() {
    cin >> EVAL;
    EVAL += '$';
    cout << evaluare() << '\n';
    return 0;
}
```

## Problema [ONI 2018 multimi](https://kilonova.ro/problems/1539) 

Pentru rezolvarea acestei probleme, vom folosi o implementare similară cu cea de mai sus, ținând cont de prioritățile descrise în enunț. Pentru optimizarea implementării, vom folosi structurile de date din STL.

!!! note "Observație"
    Se poate observa faptul că chiar și după ce adaptăm implementarea la operațiile din problemă, structura de bază a codului rămâne aceeași.

```cpp
#include <fstream>
#include <vector>

using namespace std;

ifstream f("multimi.in");
ofstream g("multimi.out");

int n, pos;
vector<int> v[25];
int lit[30];
string s;
string s2;
char L;
int a, b, p;
vector<int> intersect(vector<int> a, vector<int> b) {
    vector<int> sol;
    int i = 0, j = 0;
    for (; i < a.size() && j < b.size();) {
        if (a[i] == b[j]) {
            sol.push_back(a[i]);
            ++i;
            ++j;
        }
        else { 
            if (a[i] < b[j]) {
                ++i;
            }
            else {
                ++j;
            }
        }
    }
    return sol;
}
vector<int> reunion(vector<int> a, vector<int> b) {
    vector<int> sol;
    int i = 0, j = 0;
    for (; i < a.size() && j < b.size(); ) {
        if (a[i] == b[j]) {
            sol.push_back(a[i]);
            ++i;
            ++j;
        }
        else {
            if (a[i] < b[j]) {
                sol.push_back(a[i]);
                ++i;
            }
            else {
                sol.push_back(b[j]);
                ++j;
            }
        }
    }
    while (i < a.size()) {
        sol.push_back(a[i]);
        ++i;
    }
    while (j < b.size()) { 
        sol.push_back(b[j]);
        ++j;
    }
    return sol;
}
vector<int> termen();
vector<int> factor();
vector<int> eval() {
    vector<int> sol;
    sol = factor();
    while (s2[pos] == '+') {
        ++pos;
        sol = reunion(sol, factor());
    }
    return sol;
}
vector<int> factor() {
    vector<int> sol;
    sol = termen();
    while (s2[pos] == '*') {
        ++pos;
        sol = intersect(sol, termen());
    }
    return sol;
}
vector<int> termen() {
    vector<int> sol;
    if (s2[pos] == '(') {
        ++pos;
        sol = eval();
        ++pos;
    } 
    else {
        int posi = lit[s2[pos] - 'A'];
        for (int j = 0; j < v[posi].size(); ++j) {
            sol.push_back(v[posi][j]);
        }
        ++pos;
    }
    return sol;
}
int main() {
    f >> n;
    for (int i = 1; i <= n; ++i) {
        f >> s;
        a = b = p = 0;
        L = s[0];
        lit[L - 'A'] = i;
        pos = 2;
        while (s[pos] != '-') {
            a = a * 10 + s[pos] - '0';
            ++pos;
        }
        ++pos;
        while (s[pos] != '/') {
            b = b * 10 + s[pos] - '0';
            ++pos;
        }
        ++pos;
        while (s[pos] >= '0' && s[pos] <= '9') {
            p = p * 10 + s[pos] - '0';
            ++pos;
        }
        for (int j = a; j <= b; j += p) {
            v[i].push_back(j);
        }
    }
    pos = 0;
    f >> s2;
    vector<int> R = eval();
    g << R.size() << '\n';
    for (int i = 0; i < R.size(); ++i) {
        g << R[i] << " ";
    }
    return 0;
}
```

## Concluzii

Evaluarea de expresii aritmetice este un tip de cerință ce apare în diverse forme în algoritmică, atât în concursurile de informatică românești și internaționale, dar și în diverse aplicații practice, forma poloneză apărând în multe alte contexte. 

De asemenea, recursivitatea indirectă reprezintă o metodă elegantă de rezolvare a multor probleme de algoritmică, nu doar pentru această tehnică. Cunoașterea temeinică a acestei tehnici garantează obținerea unui punctaj mare la concursurile de informatică în clasa a 10-a în cazul în care se dă o asemenea problemă, fie la OJI, fie la ONI. 

## Probleme suplimentare

* [evaluare infoarena](https://www.infoarena.ro/problema/evaluare)
* [emm infoarena](https://infoarena.ro/problema/emm)
* [bool infoarena](https://www.infoarena.ro/problema/bool)
* [OJI 2007 dir](https://kilonova.ro/problems/769)
* [ONI 2006 Logic](https://kilonova.ro/problems/1256)
* [OJI 2018 eq4](https://kilonova.ro/problems/901)
* [ONI 2018 Baraj Juniori gcl](https://kilonova.ro/problems/1091)
* [OJI 2020 arh](https://kilonova.ro/problems/928)
* [ONI 2014 Baraj Juniori opmult](https://kilonova.ro/problems/1080)
* [Urmasii lui Moisil 2023 Indiciu](https://kilonova.ro/problems/528)
* [Probleme cu evaluarea de expresii de pe Kilonova](https://kilonova.ro/tags/332)
* [Probleme cu evaluarea de expresii de pe Infoarena](https://infoarena.ro/cauta-probleme?tag_id[]=91)
* [Probleme cu evaluarea de expresii de pe Codeforces](https://codeforces.com/problemset?order=BY_RATING_ASC&tags=expression+parsing)
* [Listă de probleme cu evaluare de expresii](https://earthshakira.github.io/a2oj-clientside/server/Category36.html)

## Resurse suplimentare

* [Expression parsing - cp-algorithms](https://cp-algorithms.com/string/expression_parsing.html)
* [Recursivitatea indirecta - CPPI Sync](https://cppi.sync.ro/materia/recursivitate_0.html)
* [Polish notation - wikipedia](https://en.wikipedia.org/wiki/Polish_notation)
