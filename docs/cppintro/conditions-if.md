---
tags:
    - C++
    - introducere
    - if
    - structura alternativa
---

**Autor**: Ștefan-Cosmin Dăscălescu

!!! example "Cunoștințe necesare"
    * [Variabile și tipuri de date simple](https://edu.roalgo.ro/cppintro/data-types/)
    * [Operatori și expresii. Cunoștințe matematice de bază](https://edu.roalgo.ro/cppintro/basic-math/)

## Introducere și instrucțiunile if..else, respectiv switch-case

De multe ori, se impune luarea unor decizii diferite în funcție de situație. Vrem să obținem același lucru și în programare, iar limbajul C++ are diverse opțiuni pentru realizarea acestui lucru.

!!! info "Definiție" 
    O structură alternativă este o structură pe care o folosim pentru a coordona programul să ia decizii diferite în funcție de rezultatul unei expresii logice. 

În limbajul C++, structura alternativă este reprezentată de blocul if..else, astfel încât putem să direcționăm programul în funcție de rezultatele expresiilor logice menționate. 

Pe lângă if..else, există și instrucțiunea switch-case, care funcționează într-o manieră similară, trecând prin fiecare caz pe rând fără a mai fi nevoie de if-uri și else-uri

Mai jos, găsiți un exemplu pentru aplicarea acestei instrucțiuni. 

```cpp
if (n == 5) {
    // instructiune
}
else {
    // alta instructiune
}
```

În mod particular, instrucțiunea `if (n)` verifică dacă $n$ are o valoare nenulă.

## Operatori de comparație

Pentru a compara două valori sau expresii, putem folosi operatorii obișnuiți de comparație de la matematică, cu mici ajustări. 

Astfel, operatorii de comparație sunt următorii:

* `==` - verifică prima expresie are o valoare mai egală cu cea de-a doua expresie. 
* `<=` - verifică dacă prima expresie are o valoare mai mică sau egală decât cea de-a doua expresie. 
* `>=` - verifică dacă prima expresie are o valoare mai mare sau egală decât cea de-a doua expresie. 
* `>` - verifică dacă prima expresie are o valoare strict mai mare decât cea de-a doua expresie. 
* `<` - - verifică dacă prima expresie are o valoare strict mai mică decât cea de-a doua expresie. 
* `!=` - verifică dacă cele două expresii au o valoare diferită.

!!! note "Observație"
    În mod particular, se observă că trebuie două semne de egalitate, o instrucțiune de tipul `if (n = 5)` atribuie mai întâi valoarea $5$ lui $n$, iar mai apoi verifică dacă $n$ este diferit de $0$.

## Operatori logici

De cele mai multe ori, veți vedea că expresiile logice apar grupate folosind operatorii logici. Operatorii logici sunt de trei feluri, după cum urmează:

* Negația - notată cu `!`, inversează valoarea de adevăr a unei expresii.

```cpp
int x = 10;
cout << !(x == 10); // 0: x == 10 este adevărat (1), 1 negat este 0
cout << !x == 10; // tot 0, dar se efectuează mai întâi !x, adică !10, cu rezultat 0, apoi 0 == 10, cu rezultat fals, adică 0
cout << !(x < 5); // 1: x < 5 este fals, adică 0, 0 negat este 1
```

* Conjuncția - notată cu `&&`, reprezintă compunerea a două sau mai multe expresii prin operatorul ȘI, cu alte cuvinte, pentru ca o expresie compusă să fie adevărată, toți membrii ei trebuie să fie adevărați, altfel, întreaga expresie este falsă.

```cpp
cout << (1 < 2 && 2 == 1 + 1); // 1; ADEVĂRAT ȘI ADEVĂRAT este ADEVĂRAT
cout << (1 < 2 && 2 != 1 + 1); // 0; ADEVĂRAT ȘI FALS este FALS
cout << (1 == 2 && 2 == 1 + 1); // 0; FALS ȘI ADEVĂRAT este FALS
cout << (1 == 2 && 2 != 1 + 1); // 0; FALS ȘI FALS este FALS
```

* Disjuncția - notată cu `||`, reprezintă compunerea a două sau mai multe expresii prin operatorul SAU, cu alte cuvinte, pentru ca o expresie compusă să fie adevărată, cel puțin unul dintre membrii ei trebuie să fie adevărați, altfel, întreaga expresie este falsă.

```cpp
cout << (1 < 2 || 2 == 1 + 1); // 1; ADEVĂRAT SAU ADEVĂRAT este ADEVĂRAT
cout << (1 < 2 || 2 != 1 + 1); // 1; ADEVĂRAT SAU FALS este ADEVĂRAT
cout << (1 == 2 || 2 == 1 + 1); // 1; FALS SAU ADEVĂRAT este ADEVĂRAT
cout << (1 == 2 || 2 != 1 + 1); // 0; FALS SAU FALS este FALS
```

## Exemplu 

Mai jos puteți găsi un asemenea exemplu, în care rezolvăm problema [cumparaturi1](https://www.pbinfo.ro/probleme/3211/cumparaturi1) de pe pbinfo folosind diverse if-uri și else-uri. O soluție alternativă folosește switch-case.

=== "if-else"

    ```cpp
    #include <iostream>
    using namespace std;

    int main() {
        int s, c, n;
        cin >> s >> c >> n;
        
        if (s % n == 0 && s % c == 0) { // daca ambele conditii sunt indeplinite
            cout << "CN" << '\n';
        }
        else {
            if (s % n == 0) { // daca prima conditie este indeplinita
                cout << "N" << '\n';
            }
            else {
                if (s % c == 0) { // daca cea de-a doua conditie este indeplinita
                    cout << "C" << '\n';
                }
                else { // daca nicio conditie nu este indeplinita
                    cout << "nimic" << '\n';
                }
            }
        }
        return 0;
    }
    ```

=== "switch-case"

    ```cpp
    #include <iostream>
    using namespace std;

    int main() {
        int s, c, n;
        cin >> s >> c >> n;
        
        // Combinam conditia intr-o singura valoare
        int condition = (s % n == 0) * 1 + (s % c == 0) * 2;

        switch (condition) {
            case 3: // daca ambele conditii sunt indeplinite (s % n == 0 && s % c == 0)
                cout << "CN" << '\n';
                break;
            case 1: // daca prima conditie este indeplinita (s % n == 0)
                cout << "N" << '\n';
                break;
            case 2: // daca cea de-a doua conditie este indeplinita (s % c == 0)
                cout << "C" << '\n';
                break;
            default: // daca nicio conditie nu este indeplinita
                cout << "nimic" << '\n';
                break;
        }

        return 0;
    }
    ```

## Concluzii

Odată cu învățarea structurii alternative, putem acum să incorporăm structuri repetitive, așa cum puteți vedea în articolele ulterioare.

## Resurse suplimentare 

* [Articolul despre structuri alternative de pe pbinfo](https://www.pbinfo.ro/articole/70/structuri-alternative)
* [Learning to code - USACO Guide](https://usaco.guide/general/resources-learning-to-code?lang=cpp)

## Probleme suplimentare

* [Probleme usoare si medii din capitolul Structura de decizie](https://www.pbinfo.ro/probleme/categorii/12/elemente-de-baza-ale-limbajului-structura-de-decizie)
