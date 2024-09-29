---
tags:
    - C++
    - introducere
    - variabile
    - tipuri de date
---

**Autor**: Ștefan-Cosmin Dăscălescu

Așa cum ați observat atunci când am prezentat primul program în articolul precedent, fiecare componentă are mai multe caracteristici, una dintre cele mai importante fiind variabilele, respectiv tipul de date al acestora. 

Ulterior, voi împărți în cele ce urmează tipurile de date simple în funcție de valorile care sunt păstrate. 

Totuși, unele tipuri de date mai complexe, cum ar fi [vectorii](https://edu.roalgo.ro/usor/arrays/) sau [matricile](https://edu.roalgo.ro/usor/matrices/), vor fi discutate în articolele lor corespunzătoare.

## Variabile

!!! info "Definiție"
    O variabilă reprezintă o locație de memorie unde se află o valoare de un anumit tip. Orice variabilă este caracterizată de:

* adresa variabilei (unde se află variabila stocată în memorie), nu lucrăm cu ea în timpul programelor dar uneori în cazul unor afișări greșite, o putem detecta, aceasta fiind reprezentată cu un număr în baza 16 (de exemplu, _0x6dfed4_).
* identificatorul variabilei – reprezintă un nume pentru variabilă – legătura dintre variabilă si adresa ei. Identificatorul respectă următoarele reguli:
    * conține litere mari, mici ale alfabetului englez cifre și caracterul de subliniere '_' – underline. Literele mari sunt considerate diferite de cele mici, astfel că Raspuns, raspuns și RASPUNS reprezintă identificatori diferiți.
    * primul caracter nu poate fi cifră.
    * identificatorul nu poate face parte din lista cuvintelor rezervate (de regulă, numele unor funcții, tipuri, structuri etc.)
* tipul variabilei – stabilește ce fel de valori poate să ia variabila, aceasta determinând și limitele valorilor ce pot fi luate de ea.
* domeniul de vizibilitate – reprezintă zona din program în care variabila există și poate fi utilizată. Variabilele pot fi globale sau locale.

În C/C++, variabilele trebuie declarate, precizând tipul și identificatorul. Sintaxa este:

```
Tip_de_date Lista_identificatori;
```

unde Tip_de_date reprezintă tipul de date pe care îl folosim (de exemplu, int, long long, double, bool, string etc.) și Lista_identificatori reprezintă lista variabilelor pe care le declarăm cu acest tip. 

Un exemplu în codul de mai sus este `int n, a, b;`.

## Tipuri de date ce păstrează numere întregi

Tipurile de date numerice sunt folosite pentru a stoca valori întregi. Chiar dacă acestea pot fi folosite și pentru alte date (de exemplu, tipul _char_ poate fi folosit și pentru a opera cu caractere, fiecare valoare având drept corespondent un caracter din codul ASCII, așa cum vom detalia mai ales la șirurile de caractere).

În ordinea popularității lor, tipurile de date întregi sunt următoarele:

* tipul **int** - cel mai utilizat tip de date, îl folosim pentru a stoca numere întregi intre $-2^{31}$ si $2^{31} - 1$ ($-2 \ 147 \ 483 \ 648$ si $2 \ 147 \ 483 \ 647$).
* tipul **long long** - un tip de date folosit pentru numerele întregi mai mari, având limite intre $-2^{63}$ si $2^{63} - 1$ ($-9 \ 223 \ 372 \ 036 \ 854 \ 775 \ 808$ si $9 \ 223 \ 372 \ 036 \ 854 \ 775 \ 807$) - numere de maxim $19$ cifre. 
* tipul **char** - tipul de date folosit pentru lucrul cu caractere, având limitele între $-128$ si $127$
* tipul **bool** - așa cum îi zice și numele, este folosit pentru a păstra doar valori binare ($1$ sau $0$, corespunzător stărilor de True și False)
* tipul **short** - un tip de date folosit pentru numerele întregi mai mici,  având limite intre $-2^{15}$ si $2^{15} - 1$ ($-32 \ 768$ si $32 \ 767$).

!!! note "Observație"   
    Pe lângă aceste tipuri, există și tipul de date **__int128** care ne permite să stocăm valori pe $128$ de biți (între $-2^{127}$ si $2^{127} - 1$)

### Tipurile de date unsigned 

Uneori, putem fi în situația în care să avem nevoie de numere un pic mai mari decât limitele acestor tipuri de date, fără a avea memoria să folosim tipul de date superior. Aici devin utile tipurile unsigned. 

!!! info "Tipurile unsigned" 
    Pentru toate aceste tipuri, cu excepția tipului **bool**, există și varianta _unsigned_, care ne dă posibilitatea să păstrăm numere de două ori mai mari cu aceeași memorie, prețul fiind faptul că nu mai avem cum să păstrăm valori negative.

De exemplu, tipul de date **unsigned int** poate păstra în memorie valori între $0$ și $2^{32} - 1$, intervalul fiind $[0, 4 \ 294 \ 967 \ 295]$.

De cele mai multe ori, tipurile de date pe care le folosim sunt **unsigned int**, respectiv **unsigned long long**.

### Sfaturi practice și evitarea overflow-ului

De regulă, atâta timp cât ne permite memoria, folosirea tipului **int** este mai mult decât suficientă, asigurând echilibrul perfect între un consum optim de timp și memorie pentru operații, respectiv stocarea unor valori suficient de mari pentru calculele noastre. 

!!! info "Overflow" 
    Atunci când valoarea păstrată într-un tip de date depășește valoarea maximă permisă, se întâmplă ceea ce numim overflow. Cu alte cuvinte, valoarea se întoarce la valoarea minimă permisă, ceea ce face calculele viitoare să devină eronate. 

!!! note "Underflow"   
    În mod similar, putem vorbi și de underflow, când valorile devin mai mici decât valorile minime permise, dar această situație se întâlnește mult mai rar în practică. 

Un exemplu tipic de overflow se poate întâlni atunci când adunăm sau înmulțim două valori care deși ambele se încadrează în int, suma (sau produsul lor) depășește valoarea maximă a tipului de date int. 

```cpp
cout << 594943 * 204232 << '\n'; // overflow
cout << 1LL * 594943 * 204232 << '\n'; // ok
cout << 1000000000 + 2000000000 << '\n'; // overflow
cout << 0LL + 1000000000 + 2000000000 << '\n'; // ok
```

Cele mai populare două soluții pentru evitarea overflow-ului sunt fie folosirea tipului de date long long pentru păstrarea termenilor din operații, fie folosirea operatorului 1LL, fie folosirea (long long) pentru convertirea datelor.

!!! note "Numere mai mari"   
    În unele probleme, chiar și numerele pe $64$ (sau $128$) de biți nu sunt îndeajuns de mari, așa că se impune păstrarea datelor sub formă de vectori, mai multe detalii despre asta puteți găsi în [acest articol](https://edu.roalgo.ro/mediu/bignum/), după ce vă familiarizați cu lucrul cu algoritmi mai dificili decât scopul acestui articol.

## Tipuri de date reale

Tipurile de date reale sunt folosite pentru a stoca valori reale. Acestea sunt folosite mai ales în unele calcule matematice mai complexe, precum calculele geometrice sau în privința unor ecuații. 

Tipurile de date reale sunt următoarele:

* tipul **float** - limite între aproximativ $-10^{38}$ și $10^{38}$
* tipul **double** - limite între aproximativ $-10^{208}$ și $10^{208}$, precizie crescută.
* tipul **long double** - limite mai mari decât cele de la **double**, precizie variabilă.

În general, atunci când operăm cu numerele reale, vrem să avem grijă la erorile de precizie care ar putea apărea. Cel mai bun mod de a face acest lucru, în special când lucrăm cu valori foarte mari în modul, este acela de a include o valoare reală foarte mică, $eps$, care să servească drept etalon în ceea ce privește verificarea egalității. 

!!! note "Observație"
    Atunci când scriem coduri mai simple sau avem de-a face cu un examen de tipul celui de bacalaureat, nu este nevoie să folosim această metodă pentru a verifica egalitatea dintre numere, putem verifica folosind metoda uzuală.

Astfel, pentru a verifica egalitatea dintre două numere reale mai mari, putem incorpora $eps$ astfel:

```cpp
#include <iostream>
#include <cmath>

using namespace std;

double eps = 1e-9; // 10^{-9}, o valoare reala foarte mica
int main() {
    double a, b;
    cin >> a >> b;

    if (abs(a - b) <= eps) {
        cout << "Egale" << '\n';
    }
    else {
        cout << "Inegale" << '\n';
    }
    return 0;
}
```

## Concluzii

Tipurile de date simple sunt cele cu care operăm în aproape toate programele pe care le scriem vreodată în C++ (și în alte limbaje de programare care au aceste tipuri de date), iar înțelegerea lor este fundamentală pentru a putea deveni programatori tot mai buni.

## Resurse suplimentare 

* [Data types - USACO Guide](https://usaco.guide/general/data-types?lang=cpp)
* [Tipuri de date - pbinfo](https://www.pbinfo.ro/articole/58/tipuri-de-date-c-cpp)