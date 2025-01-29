---
tags:
    - C++
    - introducere
    - citire
    - afisare
---

**Autor**: Ștefan-Cosmin Dăscălescu, Ștefan-Iulian Alecu

!!! example "Cunoștințe necesare"
    - [Primul program în C++](https://edu.roalgo.ro/cppintro/intro/)

În acest articol, vom explora metodele de citire și afișare a datelor în
limbajul C++.

## Tipurile de citire și afișare

Datele pot fi preluate și afișate fie prin intrarea și ieșirea standard
(folosind terminalul – „de la tastatură” și „pe ecran”), fie din fișiere
externe, unde citirea se face dintr-un fișier și afișarea într-un alt fișier.

Aceste metode pot fi utilizate împreună într-un mod hibrid, fiind foarte
frecvent utilizate în diverse probleme de programare în care se citesc date
dintr-un fișier și se afișează pe ecran.

## Intrarea și ieșirea standard

Pentru a folosi intrarea și ieșirea standard (a citi "de la tastatură",
respectiv a afișa "pe ecran"), vom avea nevoie de biblioteca `#!cpp <iostream>`.

Citirea datelor se face folosind `#!cpp std::cin` și operatorul `#!cpp >>`, iar
afișarea datelor se face folosind `#!cpp std::cout` și operatorul `#!cpp <<`,
câteva exemple fiind regăsite mai jos.

!!! note "Observație"

    Deși există și metode de citire și afișare din C (cum ar fi funcțiile
    `#!c scanf` și `#!c printf`), utilizarea metodelor din C++ este mult mai
    intuitivă și simplă.

După ce compilați programul și nu apar erori, va trebui să rulați executabilul
și să introduceți datele de intrare conform descrierii problemei. Dacă totul
este corect, veți obține rezultatul așteptat.

```cpp
#include <iostream>
using namespace std;

int main() {
    // Declaram variabilele
    int n, a, b;

    // Citim o singură valoare
    cin >> n;

    // Citim două valori separate prin spațiu
    cin >> a >> b;

    /* Alternativ, putem să citim toate cele 3 variabile pe același rând:
    cin >> n >> a >> b;
    */

    // Afișăm o singură valoare
    cout << n;

    // Afișăm două valori separate prin spațiu, urmate de o linie nouă
    cout << a << " " << b << '\n';

    // Afișăm din nou n, urmat de o linie nouă
    cout << n << endl;

    return 0;
}
```

Dacă $n = 9$, $a = 11$ și $b = 14$, programul va afișa următoarele date:

```text
911 14
9
```

!!! note "`#!cpp endl` vs `#!cpp '\n'`"

    Ați observat probabil că pentru a introduce o linie nouă, am folosit atât
    `#!cpp '\n'` cât și `#!cpp endl`. Deși par a fi echivalente, există
    diferențe semnificative. Instrucțiunea `#!cpp endl` nu doar că introduce o
    linie nouă, dar și curăță buffer-ul (unde sunt stocate temporar datele
    afișate), ceea ce o face mai lentă decât `#!cpp '\n'`. Acest lucru devine
    important atunci când lucrăm cu un volum mare de date.

## Citirea și afișarea folosind fișiere

Pentru a citi și afișa din fișiere, vom avea nevoie de biblioteca `#!cpp
<fstream>`.

Mai întâi, trebuie să specificăm programului de unde să preia datele și de unde
să le afișeze. Tipul `#!cpp ifstream` declară un flux de citire din fișier,
`#!cpp ofstream` declară unul de scriere în fișier.

```cpp
ifstream fin("date.in");
ofstream fout("date.out");
```

!!! note "Numele fișierelor"

    Deși aici am folosit `#!cpp fin` și `#!cpp fout` pentru a putea menționa
    aceste fluxuri (stream-uri) de date, putem folosi orice nume vrem atâta timp
    cât nu avem și alte variabile numite astfel. În mod particular, putem numi
    acestea chiar și `#!cpp cin`, respectiv `#!cpp cout` atâta timp cât nu avem
    inclusă biblioteca `#!cpp <iostream>`.

Programul de mai sus va fi identic, singura diferență fiind adăugarea
facilităților care ne permit să citim datele din fișiere.

```cpp
#include <fstream>
using namespace std;

ifstream fin("date.in");
ofstream fout("date.out");

#include <iostream>
using namespace std;

int main() {
    // Declaram variabilele
    int n, a, b;

    // Citim o singură valoare
    fin >> n;

    // Citim două valori separate prin spațiu
    fin >> a >> b;

    /* Alternativ, putem să citim toate cele 3 variabile pe același rând:
    fin >> n >> a >> b;
    */

    // Afișăm o singură valoare
    fout << n;

    // Afișăm două valori separate prin spațiu, urmate de o linie nouă
    fout << a << " " << b << '\n';

    // Afișăm din nou n, urmat de o linie nouă
    fout << n << endl;

    return 0;
}
```

!!! note "Citirea unui număr necunoscut de valori"

    Dacă avem de citit un număr necunoscut de valori, trebuie să folosim
    structura repetitivă `#!cpp while`, așa cum veți observa în [articolul
    nostru](https://edu.roalgo.ro/cppintro/loops/#structura-while) pe această
    temă.

## Afișarea specializată

În unele probleme, suntem nevoiți să afișăm datele respectând un oarecare format
(de exemplu, să se afișeze cu exact $x$ zecimale). Pentru a opera acest lucru,
este necesară cunoașterea bibliotecii `#!cpp <iomanip>`.

Această bibliotecă poate fi folosită și pentru a prelucra datele într-o manieră
mai prietenoasă cu cititorii, folosind funcțiile de lungime, aliniere sau
umplere:

- lungimea: `#!cpp setw(int n)`, numărul de caractere folosit pentru afișarea
  datelor;
- alinierea: `#!cpp left`, `#!cpp right`, `#!cpp internal`;
- caracterul de umplere: `#!cpp setfill(char f)`, caracterele care să fie
  folosite pentru a umple un element afișat;
- baza de numerație (`#!cpp dec`, `#!cpp oct`, `#!cpp hex`) în care sunt scrise
  valorile de tip întreg. În cele mai multe cazuri, nu vom avea nevoie să afișăm
  altfel decât în formatul zecimal.

Ne vom concentra în cele ce urmează pe funcția `setprecision`, fiind de departe
cea mai relevantă funcție dintre cele pe care le folosim în algoritmică.

Sintaxa ei este `#!cpp setprecision(int n)`, unde $n$ este numărul de cifre
folosite pentru afișarea valorilor reale; în funcție de context, poate
reprezenta numărul total de cifre sau numărul de cifre de după punctul zecimal.

De exemplu, dacă vrem să afișăm primele 7 zecimale ale lui $\pi$, putem face
asta folosind următoarele instrucțiuni:

```cpp
#include <cmath>
#include <iomanip>
#include <iostream>
using namespace std;

int main() {
    double pi = atan(1) * 4;  // pi in functie de arctg
                              // arctg(1) = π/4

    cout << setprecision(7) << pi << '\n';           // 3.141593
    cout << setprecision(7) << 10 * pi << '\n';      // 31.41593
    cout << fixed << setprecision(7) << pi << '\n';  // 3.1415927
    cout << setprecision(7) << pi * 10 << '\n';      // 31.4159265
    return 0;
}
```

!!! note "Observație"

    Fără manipulatorul `#!cpp fixed`, `#!cpp setprecision` controlează numărul
    total de cifre. După aplicarea lui `#!cpp fixed`, controlează doar numărul
    de zecimale afişate.

## Concluzii

Aceste concepte vă permit să citiți și să afișați eficient date în aplicațiile
voastre. Citirea din fișiere și formatarea precisă a valorilor sunt esențiale în
multe aplicații algoritmice.

## Resurse suplimentare

- [Intrări/Ieșiri în
  C++](https://www.pbinfo.ro/articole/60/intrari-iesiri-in-cpp)
- [Operații de intrare/ieșire cu fișiere în
  C++](https://www.pbinfo.ro/articole/19047/operatii-de-intrare-iesire-cu-fisiere-in-cpp)
- [Citiri și scrieri cu format în
  C++](https://www.pbinfo.ro/articole/16018/citiri-si-scrieri-cu-format-in-cpp)
- [Learning to code - USACO
  Guide](https://usaco.guide/general/resources-learning-to-code?lang=cpp)
