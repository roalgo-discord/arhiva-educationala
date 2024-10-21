---
tags:
    - matematica
    - perioada
    - optimizare
---

## Introducere

După cum știți, foarte multe principii întâlnite în matematică ajung să fie aplicate și în informatică sub diverse forme. Unul dintre aceste principii, frecvent întâlnit în problemele de matematică de gimnaziu și nu numai este principiul lui Dirichlet, de asemenea cunoscut sub numele de principiul cutiei sau sub denumirea sa din engleză, pigeonhole principle.

!!! info "Definiție"
    Dacă avem $n+1$ obiecte și $n$ cutii, indiferent cum vom aranja obiectele în cutii, vom avea cu siguranță o cutie care va avea cel puțin două obiecte. 

Există foarte multe moduri de a demonstra acest lucru, dar un mod foarte simplu de a face acest lucru este acela de a pleca de la un caz simplu ($2$ obiecte și $1$ cutie), caz care este evident, adevărat. Apoi, fiecare obiect adăugat va fi în cutia lui, deci vom avea cu siguranță o cutie cu cel puțin două obiecte. 

În informatică, de cele mai multe ori, acest principiu este aplicat atunci când avem de ales două obiecte cu aceeași valoare dintr-o mulțime care are mai multe obiecte decât valori posibile. 

În cele ce urmează, vom prezenta diverse exemple de probleme care pot fi rezolvate folosind acest principiu.

## Problema exemplu - [Binary Number](https://kilonova.ro/problems/3271/)

Pentru a rezolva această problemă, trebuie să găsim o observație care să ne ajute să aflăm cu ușurință un număr valid. Deoarece există $2^n$ numere valide, nu putem să le încercăm pe toate. Totuși, ne putem gândi la o formă particulară a numerelor care să ne ajute să aflăm răspunsul mai ușor. 

Dacă ne gândim la numerele de forma $1111\dots1$ cu $1, 2, 3, \dots, n$ cifre, avem $n$ asemenea numere. De aici, avem două cazuri. Fie unul din aceste numere este multiplu de $n$ și putem adăuga zerouri la finalul numărului, fie găsim două numere care să aibă același rest (lucru ce este adevărat deoarece avem $n-1$ resturi posibile). Datorită acestui fapt, putem găsi mereu o soluție la această problemă.

Pentru a afla aceste resturi, putem construi un vector de resturi parțiale și dacă avem un multiplu de $n$, afișăm acea valoare împreună cu valorile de $0$, iar dacă găsim două resturi parțiale egale, vom afișa diferența între cele două numere, iar mai apoi îndeajuns de mult zerouri până ce avem $n$ cifre.

Mai jos găsiți implementarea soluției în limbajul C++.

```cpp
#include <iostream>
using namespace std;

int sp[1000001], prv[1000001];

int main() {
    int n;
    cin >> n;
    
    for (int i = 1; i <= n; i++) {
        sp[i] = (sp[i-1] * 10 + 1) % n;
        if (sp[i] == 0) {
            for (int j = 1; j <= i; j++) {
                cout << 1;
            }
            for (int j = i+1; j <= n; j++) {
                cout << 0;
            }
            return 0;
        }
        else {
            if (prv[sp[i]] != 0) {
                int tot = i - prv[sp[i]];
                for (int x = prv[sp[i]]+1; x <= i; x++) {
                    cout << 1;
                }
                for (int x = 1; x <= n - tot; x++) {
                    cout << 0;
                }
                cout << '\n';
                return 0;
            }
        }
        prv[sp[i]] = i;
    }
    return 0;
}
```

## Problema 2 - [Subsecv pbinfo](https://www.pbinfo.ro/probleme/1262/subsecv)

În mod similar cu problema anterioară, vom putea păstra resturile sumelor valorilor din toate prefixele când împărțim la $n$, iar atunci când avem un prefix care se repetă, vom afișa cea mai de la stânga subsecvență.

```cpp
#include <fstream>
using namespace std;
    
int n, v, remainders[10002], minL = 10001, minR = 10001;
int main() {
    
    ifstream cin("subsecv.in");
    ofstream cout("subsecv.out");
    
    cin >> n;
    remainders[0] = 0;
    for (int i = 1; i < n; i++) {
        remainders[i] = -1;
    }
    int sm = 0;
    for (int i = 1; i <= n; i++) {
        cin >> v;
        sm = (sm + v) % n;
        if (remainders[sm] != -1 && remainders[sm] + 1 < minL) {
            minL = remainders[sm] + 1;
            minR = i;
        }
        if (remainders[sm] == -1) {
            remainders[sm] = i;
        }
    }
    cout << minL << " " << minR << '\n';
    return 0;
}
```

## Concluzii

Acest principiu este unul foarte important, iar cunoștințele de la matematică devin foarte utile în contextul problemelor de algoritmică, în special unele din cele tradițional încadrate în categoria problemelor ad-hoc. 

Recomandăm de asemenea urmărirea materialor din resursele suplimentare, chiar dacă unele dintre acestea sunt mai degrabă orientate spre olimpiada de matematică, deoarece fac unele aplicații mai dificile mai ușor de rezolvat. 

## Probleme suplimentare

* [Kuroni and Impossible Calculation - Codeforces](https://codeforces.com/contest/1305/problem/C)
* [Porumbei - pbinfo](https://www.pbinfo.ro/probleme/2059/porumbei)
* [Prinzessin der Verurteilung - Codeforces](https://codeforces.com/contest/1536/problem/B)
* [Razboi2 - infoarena](https://www.infoarena.ro/problema/razboi2)
* [Lot Juniori 2013 Numere](https://kilonova.ro/problems/1723)
* [ONI 2023 Struguri](https://kilonova.ro/problems/543/)
* [OMI Iasi 2013 moretime](https://www.pbinfo.ro/probleme/2105/moretime)
* [ONI 2016 Leduri](https://kilonova.ro/problems/1476)
* [Going Home - Codeforces](https://codeforces.com/contest/1501/problem/C)
* [Koxia and Number Theory - Codeforces](https://codeforces.com/contest/1770/problem/C)
* [Funny Game - Codeforces](https://codeforces.com/contest/1994/problem/D)

## Resurse suplimentare

* [Principiul lui Dirichlet - pbinfo](https://www.pbinfo.ro/articole/5796/principiul-lui-dirichlet)
* [Pigeonhole principle - Wikipedia](https://en.wikipedia.org/wiki/Pigeonhole_principle)
* [Principiul lui Dirichlet (cutiei) - Infobits Academy](https://www.infobits.ro/docs/principiul_lui_dirichlet.pdf)
* [Principiul cutiei - Gabriel Popa](https://pregatirematematicaolimpiadejuniori.wordpress.com/wp-content/uploads/2016/07/g-popa-principiul-cutiei.pdf)
* [Principiul Dirichlet - Math.MD](https://www.math.md/school/competitiva/dirichlet/dirich.html)
* [Pigeonhole principle - Art of Problem Solving](https://artofproblemsolving.com/wiki/index.php/Pigeonhole_Principle)
* [Principiul lui Dirichlet - CPPI Sync](https://cppi.sync.ro/materia/principiul_lui_dirichlet.html)