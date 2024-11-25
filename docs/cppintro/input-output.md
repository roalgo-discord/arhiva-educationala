---
tags:
    - C++
    - introducere
    - citire
    - afisare
---

**Autor**: Ștefan-Cosmin Dăscălescu

!!! example "Cunoștințe necesare"
    * [Primul program în C++](https://edu.roalgo.ro/cppintro/intro/)

În cele ce urmează, vom prezenta metodele prin care putem citi și afișa datele în limbajul C++.

!!! info "Tipurile de citire"
    Datele pot fi citite și afișate fie prin intrarea și ieșirea standard (numite colocvial "de la tastatură", respectiv "pe ecran"), fie folosind fișiere auxiliare, preluând datele dintr-un fișier și afișându-le în alt fișier. 

!!! note "Observație"
    Aceste metode pot fi folosite și într-o manieră hibrid, fiind foarte multe exemple de probleme în care se dau datele într-un fișier de intrare și se afișează pe ecran.

## Intrarea și ieșirea standard 

Pentru a folosi intrarea și ieșirea standard (a citi "de la tastatură", respectiv a afișa "pe ecran"), vom avea nevoie de biblioteca `#include <iostream>`.

Citirea datelor se face folosind instrucțiunea **cin**, iar afișarea datelor se face folosind instrucțiunea **cout**, câteva exemple fiind regăsite mai jos. 

!!! note "Observație"
    Aceasta nu este singura metodă de a citi și afișa datele, putem citi și afișa datele și folosind metodele specifice limbajului C (instrucțiunile scanf și printf). Totuși, metodele native limbajului C++ sunt cele mai intuitive și mai simplu de utilizat.

Atunci când folosiți intrarea și ieșirea standard, după ce compilați programul și nu apare nicio eroare, va trebui să rulați executabilul generat și să introduceți datele de intrare conform descrierii problemei și a programului scris de voi anterior. În cazul în care ați procedat cum trebuie, veți obține un răspuns conform cu ceea ce ați scris. În caz contrar, va trebui să verificați ce ați scris și eventual, să modificați programul. 

```cpp
#include <iostream>
using namespace std;

int main () {
    // mai intai, declaram variabilele folosite
    int n, a, b;
    
    // citim o singura valoare
    cin >> n; 

    // citim doua valori separate prin spatiu 
    cin >> a >> b; 

    /* alternativ, putem sa citim toate cele 3 variabile pe acelasi rand
    cin >> n >> a >> b;
    */

    // afisam o singura valoare
    cout << n; 

    // afisam doua valori separate prin spatiu, urmate de o linie noua 
    cout << a << " " << b << '\n'; 

    // afisam din nou n, urmat de o linie noua
    cout << n << endl;

    return 0;
}
```

Dacă $n = 9$, $a = 11$ și $b = 14$, programul va afișa următoarele date:

```
911 14
9

```

!!! note "endl vs '\n'"
    Probabil că ați observat că pentru a afișa o linie nouă, am folosit pe de o parte `'\n'` și pe de altă parte, `endl`. Deși aceste instrucțiuni par identice în rol, nu pot fi mai diferite. Se remarcă faptul că instrucțiunea `endl`, pe lângă rolul de a marca trecerea la o linie nouă, curăță bufferul (un loc în care sunt stocate datele temporar) de datele deja afișate, ceea ce face această instrucțiune mult mai înceată decât `'\n'`, lucru ce se poate dovedi important atunci când lucrăm cu un volum de date foarte mare. 

## Citirea și afișarea folosind fișiere

Pentru a citi și afișa din fișiere, vom avea nevoie de biblioteca `#include <fstream>`.

Mai întâi, trebuie să specificăm programului de unde să preia datele și de unde să le afișeze. 

```cpp
ifstream fin("date.in");
ofstream fout("date.out");
```

!!! note "Numele fișierelor"
    Deși aici am folosit fin și fout pentru a putea menționa aceste streamuri de date, putem folosi orice nume vrem atâta timp cât nu avem și alte variabile numite astfel. În mod particular, putem numi acestea chiar și cin, respectiv cout atâta timp cât nu avem inclusă biblioteca iostream.

Programul de mai sus va fi identic, singura diferență fiind adăugarea facilităților care ne permit să citim datele din fișiere. 

```cpp
#include <fstream>
using namespace std;

ifstream fin("date.in");
ofstream fout("date.out");

int main () {
    // mai intai, declaram variabilele folosite
    int n, a, b;
    
    // citim o singura valoare
    fin >> n; 

    // citim doua valori separate prin spatiu 
    fin >> a >> b; 

    /* alternativ, putem sa citim toate cele 3 variabile pe acelasi rand
    fin >> n >> a >> b;
    */

    // afisam o singura valoare
    fout << n; 

    // afisam doua valori separate prin spatiu, urmate de o linie noua 
    fout << a << " " << b << '\n'; 

    // afisam din nou n, urmat de o linie noua
    fout << n << endl;

    return 0;
}
```

!!! note "Citirea unui număr necunoscut de valori"
    În mod particular, dacă avem de citit un număr necunoscut de valori, trebuie să folosim structura repetitivă while, așa cum veți observa în [articolul nostru](https://edu.roalgo.ro/cppintro/loops/#structura-while) pe această temă. 

## Afișarea specializată

În unele probleme, suntem nevoiți să afișăm datele respectând un oarecare format (de exemplu, să se afișeze cu exact $x$ zecimale). Pentru a opera acest lucru, este necesară cunoașterea bibliotecii  `#include <iomanip>`.

Această bibliotecă poate fi folosită și pentru a prelucra datele într-o manieră mai prietenoasă cu cititorii, folosind funcțiile de lungime, aliniere sau umplere:

* lungimea – setw(int n), numărul de caractere folosit pentru afișarea datelor;
* alinierea – left, right, internal;
* caracterul de umplere – setfill(char f), caracterele care să fie folosite pentru a umple un element afișat;
* baza de numerație (dec, oct, hex) în care sunt scrise valorile de tip întreg. În cele mai multe cazuri, nu vom avea nevoie să afișăm altfel decât în formatul zecimal.

Ne vom concentra în cele ce urmează pe funcția setprecision, fiind de departe cea mai relevantă funcție dintre cele pe care le folosim în algoritmică. 

Sintaxa ei este `setprecision(int n)`, unde $n$ este numărul de cifre folosite pentru afișarea valorilor reale; în funcție de context, poate reprezenta numărul total de cifre sau numărul de cifre de după punctul zecimal.

De exemplu, dacă vrem să afișăm primele $7$ zecimale ale lui $\pi$, putem face asta folosind următoarele instrucțiuni:

```cpp
#include <iostream>
#include <cmath>
using namespace std;

int main() {
    
    double x = atan(1) * 4; // pi in functie de arctg
    cout << setprecision(7) << x << '\n'; // 3.141593
    cout << setprecision(7) << 10*x << '\n'; // 31.41593
    cout << fixed << setprecision(7) << x << '\n'; // 3.1415927
    cout << setprecision(7) << x*10 << '\n'; // 31.4159265
    return 0;
} 
```

Se poate remarca că înainte de a folosi notația fixed, se afișau exact $7$ zecimale, inclusiv cele de dinainte de virgulă. Odată cu folosirea acestui operator, se afișează exact $7$ zecimale după virgulă, rotunjite eventual la cea mai apropiată zecimală.

## Concluzii

Odată cu învățarea tipurilor de date, sunteți pregătiți să le folosiți în instrucțiuni și structuri alternative și repetitive, așa cum puteți vedea în articolele ulterioare.

## Resurse suplimentare 

* [Intrări/Ieșiri în C++](https://www.pbinfo.ro/articole/60/intrari-iesiri-in-cpp)
* [Operații de intrare/ieșire cu fișiere în C++](https://www.pbinfo.ro/articole/19047/operatii-de-intrare-iesire-cu-fisiere-in-cpp)
* [Citiri și scrieri cu format în C++](https://www.pbinfo.ro/articole/16018/citiri-si-scrieri-cu-format-in-cpp)
* [Learning to code - USACO Guide](https://usaco.guide/general/resources-learning-to-code?lang=cpp)
