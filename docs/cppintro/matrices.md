---
tags:
    - matrici
    - implementare
---
**Autor**: Ștefan-Cosmin Dăscălescu

## Introducere

După ce v-ați obișnuit cu [tablourile unidimensionale](https://edu.roalgo.ro/cppintro/arrays/), a venit timpul să generalizăm lucrurile și pentru tablourile bidimensionale (colocvial numite, matrici) și cele cu mai multe dimensiuni.

Cel mai simplu mod de a defini o matrice este acela că reprezintă un vector de vectori, acesta fiind și modul în care matricea este stocată în memorie (liniile sunt situate consecutiv în memorie).

De-a lungul acestui articol, vom discuta diferite moduri de a parcurge matricile, precum și elemente care apar des în exerciții probleme și cum să le identificați cu ușurință în diverse contexte. Ulterior, vom discuta și tehnici mai avansate, care pot fi utile atunci când aveți de lucrat în contexte mai dificile, precum și tablourile multidimensionale.

## Declararea, parcurgerea și umplerea matricilor statice

Pentru a declara matricile, putem folosi ambele variante (fie cea inspirată din limbajul C, fie cea bazată pe metodele din STL). În acest articol ne vom concentra pe varianta statică, păstrând metodele din STL pentru articolul corespunzător.

Pentru a citi și parcurge valorile din matrice, vom folosi de regulă o structură repetitivă, precum for sau while, citind valorile pe rând, la fel cum am proceda cu variabile obișnuite. Spre deosebire de vectori, vom avea nevoie (de regulă) de structuri repetitive imbricate. 

În mod similar cu declararea vectorilor, ne trebuie un tip de date pe
care acest tablou să-l stocheze, precum și dimensiunea pe care vrem să o
atribuim acestui tablou.

De exemplu, `#!cpp int v[101][101];` înseamnă ca am declarat un tablou bidimensional cu $101$ linii, fiecare tablou având $101$ elemente, pozițiile fiind numărate de la $0$ la $100$ (cu alte cuvinte, am declarat $101$ tablouri).

!!! note "Împărțirea tablourilor" 
    Colocvial, vom împărți aceste tablouri în linii și coloane, astfel, vom spune despre elementul de pe poziția $(2, 6)$ că se află pe linia $2$ și coloana $6$. De asemenea, liniile vor fi numerotate de sus în jos, iar coloanele de la stânga la dreapta, ceea ce este în contrast cu sistemul de coordonate xOy folosit în geometria analitică.

!!! note "Observație" 
    La fel ca la vectori, dacă vreți să lucrați cu valorile indexate de la $1$, va trebui să adăugați $1$ la dimensiunile pe care le declarați. 

Pentru a atribui o valoare unei anumite poziții, se va proceda similar ca la o variabilă obișnuită, de exemplu `#!cpp v[1][5] = 7;` înseamnă că pe linia $1$ și coloana $5$, vom avea acum valoarea $7$.

### Problemă exemplu - [sumapare2 de pe pbinfo](https://www.pbinfo.ro/probleme/767/sumapare2) 

Aici puteți observa cum citim valorile din matrice și apoi parcurgem matricea pentru a aduna valorile pare care apar în ea. 

```cpp
#include <iostream>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    
    int mat[n][m];
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cin >> mat[i][j];
        }
    }
    
    int sumpar = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (mat[i][j] % 2 == 0) {
                sumpar += mat[i][j];
            }
        }
    }
    
    cout << sumpar << '\n';
    return 0;
}
```

### Genererări de matrice

## Matricile pătratice

### Împărțirea matricilor pătratice. Diagonale, zone și regiuni

## Alte parcurgeri și modificări în matrice

### Parcurgerea în spirală

### Transpunerea elementelor în matrice

### Bordarea unei matrici

### Căutarea unor elemente în matrici

## Tablouri multidimensionale

## Concluzii

## Probleme suplimentare

## Resurse suplimentare

* [Tablouri bidimensionale - pbinfo](https://www.pbinfo.ro/articole/5620/tablouri-bidimensionale)
* [Tablouri bidimensionale (matrice) - CPPI Sync](https://cppi.sync.ro/materia/tablouri_bidimensionale_matrice.html)
* [Tablouri pătratice - pbinfo](https://www.pbinfo.ro/articole/5626/tablouri-patratice)