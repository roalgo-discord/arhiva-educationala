---
tags:
    - vectori 
    - frecventa
    - implementare
---

## Introducere

În multe probleme, suntem nevoiți să lucrăm cu foarte multe valori cuprinse într-un interval relativ mic. Pentru a face lucrul cu ele mai ușor, se impune numărarea lor și păstrarea datelor într-o structură de date potrivită. 

Astfel, se impune folosirea unui vector de frecvență.

!!! info "Definiție" 
    Așa cum sugerează și numele, un vector de frecvență este o structură de date de tip tablou pe care o folosim pentru a ține în memorie de câte ori apare fiecare element într-un șir de numere. 

!!! example "Exemplu"
    De exemplu, dacă șirul nostru conține valorile $8, 1, 4, 1, 6, 3, 5, 2, 2, 4$, vectorul de frecvență va avea următoarea formă: $0, 2, 2, 1, 1, 1, 1, 0, 1$, cu semnificația că $0$ nu apare deloc, $1$ apare de două ori, $2$ apare de două ori, iar celelalte valori, cu excepția lui $7$, apar o singură dată. 

Această structură de date se folosește atunci când numerele (sau în general, datele cu care lucrăm) pot lua puține valori distincte sau se află într-un interval mic. 

!!! note "Observație"
    În general, vrem să folosim vectorii de frecvență dacă stocarea informațiilor legat de valorile pe care le folosim devine mult mai facilă din punct de vedere al memoriei sau timpului comparat cu stocarea lor în vectorul deja existent. În probleme, acest lucru se remarcă mai ales dacă valorile nu sunt foarte mari (până în $10^6$) sau dacă diferența dintre cel mai mare și cel mai mic element este mică. 

Pe parcursul acestui articol, voi prezenta câteva probleme, pentru a explica diferitele variații ale acestei metode precum și alte moduri în care putem păstra acest vector în memorie.

## Problema [numere1 de pe pbinfo](https://www.pbinfo.ro/probleme/525/numere1)

Pentru a rezolva această problemă, cea mai importantă informație pe care o primim din enunț este aceea că valorile care ne interesează sunt strict cele care au trei cifre (cu alte cuvinte, cele între $100$ și $999$). Astfel, se impune crearea unui vector de frecvență care să poată memora aceste valori și după ce citim valorile din șir, se pot afla cu ușurință cele mai mari două valori de trei cifre care nu se află în șir. 

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    int fr[1000] = {0}; // toate valorile sunt initializate cu 0
    for (int i = 1; i <= n; i++) {
        int x;
        cin >> x;
        
        if (x >= 100 && x <= 999) {
            fr[x]++;
        }
    }
    
    int a = 0, b = 0;
    for (int i = 999; i >= 100; i--) {
        if (fr[i] == 0) {
            if (a == 0) {
                a = i;
            }
            else {
                if (b == 0) {
                    b = i;
                }
            }
        }
    }
    
    if (a == 0 || b == 0) {
        cout << "NU EXISTA";
    }
    else {
        cout << b << " " << a << '\n';
    }
	return 0;
}
```

## Problema [nrlipsa2 de pe pbinfo](https://www.pbinfo.ro/probleme/1744/nrlipsa2) 

Pentru a citi acel număr necunoscut de valori, va trebui să ne bazăm pe o structură repetitivă de tip while. Apoi, pentru a lucra cu valorile din intervalul $[-100, 100]$, trebuie să adaptăm lucrurile la realitatea limbajului C++, și anume la faptul că nu putem păstra indici negativi în vector. 

Astfel, în loc să lucrăm cu acel interval, vom vrea să adunăm o valoare (un offset) care să ne asigure că lucrăm cu valori non-negative (astfel, intervalul devine $[0, 200]$). Ulterior, atunci când afișăm valoarea care nu apare, vom scădea $100$ din răspuns pentru a întoarce rezultatul la cel real. 

```cpp
#include <fstream>
using namespace std;

ifstream fin("nrlipsa2.in");
ofstream fout("nrlipsa2.out");

int main() {
    int v[201] = {0};
    int x;
    
    while (fin >> x) {
        if (x >= -100 && x <= 100) {
            v[x+100]++;
        }
    }
    
    int gasit = 0;
    for (int i = 0; i <= 200; i++) {
        if (v[i] == 0) {
            fout << i - 100 << '\n';
            // alternativ, puteam da return 0 aici sa iesim din program
            gasit = 1; 
            break;
        }
    }
    
    if (gasit == 0) {
	    fout << "nu exista";
    }
    
    return 0;
}
```



## Concluzii

## Probleme suplimentare

* [Probleme cu vectori de frecvență de pe pbinfo](https://www.pbinfo.ro/probleme/categorii/45/tablouri-unidimensionale-vectori-vectori-caracteristici-de-frecventa)
* [Probleme cu vectori de frecvență de pe kilonova](https://kilonova.ro/tags/425)

## Resurse suplimentare

* [Vectori caracteristici și de frecvență - pbinfo](https://www.pbinfo.ro/articole/5617/vectori-caracteristici-si-de-frecventa)
* [Vectori de frecvență (probleme standard) - CPPI Sync](https://cppi.sync.ro/materia/probleme_standard.html)
* [Vectori de frecvență - Algopedia](https://www.algopedia.ro/wiki/index.php/Clasa_a_V-a_lec%C8%9Bia_24_-_1_feb_2020#Vectori_de_frecven%C8%9B%C4%83_(vectori_caracteristici))