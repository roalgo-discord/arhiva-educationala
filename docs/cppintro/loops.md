---
tags:
    - C++
    - introducere
    - for
    - while
    - do-while
    - structura repetitiva
---

**Autor**: Ștefan-Cosmin Dăscălescu

!!! example "Cunoștințe necesare"
    * [Operatori și expresii. Cunoștințe matematice de bază](https://edu.roalgo.ro/cppintro/basic-math/)
    * [Structura alternativă](https://edu.roalgo.ro/cppintro/conditions-if/)

!!! info "Definiție" 
    O structură repetitivă este o structură pe care o folosim pentru a coordona programul să ia aceleași decizii de mai multe ori, atâta timp cât o anumită condiție este îndeplinită. Acest lucru se poate întâmpla de un număr fixat de ori sau de un număr variat de ori. 

Cele trei structuri repetitive din C++ sunt while, do..while și for. Deși acestea au în mare parte același rol, funcționează într-un mod diferit și trebuie știute pentru a putea folosi cea mai potrivită variantă în funcție de ce ne cere problema. Deși majoritatea programelor pot fi scrise folosind toate cele trei structuri repetitive, sunt situații în care nu este practic să folosim anumite structuri, deci ne vom concentra pe a arăta cele mai potrivite exemple în funcție de situație.

## Structura while

!!! info "Definiție" 
    Structura repetitivă while este o **structură repetitivă cu test inițial și număr necunoscut de pași** pe care o folosim pentru a coordona programul să ia aceleași decizii atâta timp cât o anumită condiție este îndeplinită și nu știm numărul de pași pe care vrem să-l facem.

Sintaxa while-ului este de regulă, următoarea:

```cpp
while (conditie) {
    // instructiuni
}
```

!!! note "Observație" 
    În mod particular, această structură repetitivă este folosită pentru a citi un număr necunoscut de date atunci când lucrăm cu fișiere text, lucru ce se poate vedea mai ales în problemele ce se dau în variantele de bacalaureat la informatică. 

```cpp
int x;
while (fin >> x) {
    // instructiuni
}
```

## Structura do..while

!!! info "Definiție" 
    Structura repetitivă do-while este o **structură repetitivă cu test final și număr necunoscut de pași** pe care o folosim pentru a coordona programul să ia aceleași decizii atâta timp cât o anumită condiție este îndeplinită și nu știm numărul de pași pe care vrem să-l facem, **dar vrem să rulăm instrucțiunile măcar o dată**.

Sintaxa do..while-ului este de regulă, următoarea:

```cpp
do {
    // instructiuni
}while (conditie);
```

## Structura for

!!! info "Definiție" 
    Structura repetitivă for este o **structură repetitivă cu test inițial și număr cunoscut de pași** pe care o folosim pentru a coordona programul să ia aceleași decizii când știm numărul de pași pe care vrem să-l facem. Deși **for se poate scrie și folosind rigorile while-ului**, având număr necunoscut de pași, se preferă folosirea for-ului când știm câți pași vrem să facem, respectiv a while-ului în caz contrar.

```cpp
for (instructiune_initiala; conditie; actualizare) {
    // instructiuni
}
```

Un astfel de exemplu ar fi cel de mai jos. Se poate remarca că putem actualiza valoarea lui $i$ așa cum vrem noi, nefiind limitați la operatorii de incrementare și decrementare. 

```cpp
int s = 0;
for (int i = 1; i <= n; i = i + 2) {
    s = s + i;
}
```

## Exemplu 

Mai jos puteți găsi un asemenea exemplu, în care rezolvăm problema [AfisareNumerePare](https://www.pbinfo.ro/probleme/330/afisarenumerepare) de pe pbinfo folosind diverse structuri repetitive.

=== "while"

    ```cpp
    #include <iostream>
    using namespace std;

    int main() {
        int n;
        cin >> n;
        
        int x = 1;
        while (x <= n) {
            cout << x * 2 << " ";
            x++;
        }
        return 0;
    }
    ```

=== "for"

    ```cpp
    #include <iostream>
    using namespace std;

    int main() {
        int n;
        cin >> n;
        
        for (int i = 1; i <= n; i++) {
            cout << i*2 << " ";
        }
        return 0;
    }
    ```

=== "do..while"

    ```cpp
    #include <iostream>
    using namespace std;

    int main() {
        int n;
        cin >> n;
        
        int x = 1;
        do{
            cout << x * 2 << " ";
            x++;
        }while (x <= n);
        return 0;
    }
    ```

## Structuri repetitive imbricate

Aceste structuri repetitive pot fi și imbricate, așa cum se poate observa în exemplul de mai jos. Cu alte cuvinte, putem să le scriem una în alta, astfel încât vom executa un număr de pași de un alt număr de pași. Putem scrie un număr nelimitat de structuri repetitive imbricate, bineînțeles în limita vitezei computaționale a programului dat. 

În codul de mai jos, veți observa soluția noastră pentru problema [piramida de pe pbinfo](https://www.pbinfo.ro/probleme/351/piramida). Se poate observa faptul că primul for va avea $n$ pași, dar în cadrul acestui for, avem un alt for care are $i$ pași. 

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= i; j++) {
            cout << j << " ";
        }
        cout << '\n';
    }
	return 0;
}
```

## Resurse suplimentare

* [Articolul despre structuri repetitive de pe pbinfo](https://www.pbinfo.ro/articole/71/structuri-repetitive)
* [Learning to code - USACO Guide](https://usaco.guide/general/resources-learning-to-code?lang=cpp)

## Probleme suplimentare

* [Probleme usoare si medii din capitolul Structuri repetitive de pe pbinfo](https://www.pbinfo.ro/probleme/categorii/7/elemente-de-baza-ale-limbajului-structuri-repetitive)