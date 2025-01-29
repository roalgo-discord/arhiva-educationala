---
tags:
    - C++
    - introducere
    - if
    - structura alternativa
---

**Autori**: Ștefan-Cosmin Dăscălescu, Ștefan-Iulian Alecu

!!! example "Cunoștințe necesare"
    - [Variabile și tipuri de date simple](https://edu.roalgo.ro/cppintro/data-types/)
    - [Operatori și expresii. Cunoștințe matematice de bază](https://edu.roalgo.ro/cppintro/basic-math/)

## Introducere și instrucțiunile if..else, respectiv switch-case

De multe ori, se impune luarea unor decizii diferite în funcție de situație.
Vrem să obținem același lucru și în programare, iar limbajul C++ are diverse
opțiuni pentru realizarea acestui lucru.

!!! info "Definiție"

    O structură alternativă este o structură pe care o folosim pentru a coordona
    programul să ia decizii diferite în funcție de rezultatul unei expresii
    logice.

În limbajul C++, structura alternativă este reprezentată de blocul if..else,
astfel încât putem să direcționăm programul în funcție de rezultatele
expresiilor logice menționate.

Pe lângă `if..else`, există și instrucțiunea switch-case, care funcționează
într-o manieră similară, trecând prin fiecare caz pe rând fără a mai fi nevoie
de if-uri și else-uri.

Mai jos, găsiți un exemplu pentru aplicarea acestei instrucțiuni.

```cpp
if (n == 5) {
    // Instrucțiune
} else {
    // Altă instrucțiune
}
```

Blocul `else` este opțional.

Dacă condiția nu este deja o valoare logică, cum este cea returnată de
operatorii de comparație, va fi considerată adevărată dacă aceasta este nenulă.

Acoladele nu sunt obligatorii, dar dacă nu le folosim putem scrie o singură
instrucțiune. Ne putem folosi de acest lucru pentru a scrie compact lanțuri de
condiții:

```cpp
if (x) {
    // Dacă x este adevărat
    // ...
} else if (y) {
    // Dacă x este fals, dar y este adevărat
    // ...
} else {
    // Dacă și x, și y sunt false
    // ...
}
```

## Operatori de comparație

Pentru a compara două valori sau expresii, putem folosi operatorii obișnuiți de
comparație de la matematică, cu mici ajustări.

Astfel, operatorii de comparație sunt următorii:

- `==` - verifică prima expresie are o valoare mai egală cu cea de-a doua
  expresie.
- `<=` - verifică dacă prima expresie are o valoare mai mică sau egală decât cea
  de-a doua expresie.
- `>=` - verifică dacă prima expresie are o valoare mai mare sau egală decât cea
  de-a doua expresie.
- `>` - verifică dacă prima expresie are o valoare strict mai mare decât cea
  de-a doua expresie.
- `<` - verifică dacă prima expresie are o valoare strict mai mică decât cea
  de-a doua expresie.
- `!=` - verifică dacă cele două expresii au o valoare diferită.

!!! note "Observație"

    Pentru a verifica egalitatea, este nevoie de două semne `=`; o instrucțiune
    de tipul `#!cpp if (n = 5)` atribuie mai întâi valoarea $5$ lui $n$, iar mai
    apoi verifică dacă $n$ este diferit de $0$.

## Operatori logici

De cele mai multe ori, veți vedea că expresiile logice apar grupate folosind
operatorii logici. Operatorii logici sunt de trei feluri, după cum urmează:

- **Negația** - notată cu `#!cpp !` sau `#!cpp not`, inversează valoarea de
  adevăr a unei expresii.

    | `#!cpp x` | `#!cpp not x` |
    | :-------: | :-----------: |
    |     0     |       1       |
    |     1     |       0       |

    ```cpp
    int a = 5;
    int b = 8;

    // 1. a < 5 == 5 < 5 == false
    // 2. not false == true
    //
    // => not (a < 5) == true

    cout << not (a < 5); // 1

    // 1. (a == b) == (5 == 8) == false 
    // 2. !false == true
    //
    // => !(a == b) == true

    cout << !(a == b); // 1

    // 1. în !a, a este transformat în true sau false
    //    (0 este false, în rest este true)
    // 2. !a == !5 == !true == false
    // 3. false este convertit la 0, iar true la 1
    // 4. 0 < 1 == true
    // 5. not true == false
    //
    // => not (!a > 1) == false

    cout << not (!a < 1); // 0
    ```

- **Conjuncția** - notată cu `#!cpp &&` sau `#!cpp and`, reprezintă „și” logic.
  Pentru ca o expresie compusă să fie adevărată, **toți membrii ei trebuie să
  fie adevărați.**

    | `#!cpp x` | `#!cpp y` | `#!cpp x and y` |
    | :-------: | :-------: | :-------------: |
    |     0     |     0     |        0        |
    |     0     |     1     |        0        |
    |     1     |     0     |        0        |
    |     1     |     1     |        1        |

    ```cpp
    int a = 1;
    int b = 3;

    // 1. a < 1 == 1 < 1 == false
    // 2. b > 3 == 3 > 3 == false
    // 3. false && false == false
    //
    // => (a < 1) && (b > 3) == false

    cout << (a < 1) && (b > 3); // 0

    // 1. b < 5 == 3 < 5   == true
    // 2. a > -4 == 1 > -4 == true
    //
    // 3. not (b < 5)      == false
    // 4. not (a > -4)     == false
    //
    // 5. false && false   == false
    //
    // => not (b < 5) and not (a > -4) == false

    cout << not (b < 5) and not (a > -4); // 0

    // 1. b >= 3 == 3 >= 3   == true
    // 2. a > 4  == 1 > 4    == false
    //
    // 3. !(a > 4) == !false == true
    //
    // 4. true && true       == true
    //
    // => (b >= 3) && !(a > 4) == true

    cout << (b >= 3) && !(a > 4); // 1
    ```

- **Disjuncția** - notată cu `#!cpp ||` sau `#!cpp or`, reprezintă „sau” logic.
  Pentru ca o expresie compusă să fie adevărată, este suficient ca **cel puțin
  un membru să fie adevărat**.

    | `#!cpp x` | `#!cpp y` | `#!cpp x or y` |
    | :-------: | :-------: | :------------: |
    |     0     |     0     |       0        |
    |     0     |     1     |       1        |
    |     1     |     0     |       1        |
    |     1     |     1     |       1        |

    ```cpp
    int x = 0;
    int y = 5;

    // 1. x != 0 == 0 != 0  == false
    // 2. y == 0 == 5 == 0  == false
    //
    // 3. false or false    == false
    //
    // => (x != 0) or (y == 0) == false

    cout << (x != 0) or (y == 0);  // 0

    // 1. x + y > 10 == 0 + 5 > 10 == false
    // 2. x - y < 0 == 0 - 5 < 0   == true
    //
    // 3. not (x - y < 0)          == !true == false
    //
    // 4. false or false           == false
    //
    // => (x + y > 10) or !(x - y < 0) == false

    cout << (x + y > 10) or not (x - y < 0);  // 0

    // 1. x == 1 == 0 == 1      == false
    // 2. y == 10 == 5 == 10    == false
    //
    // 3. false || false        == false
    //
    // => (x == 1) || (y == 10) == false

    cout << (x == 1) || (y == 10);  // 0

    // 1. x < 0 == 0 < 0        == false
    // 2. y > 10 == 5 > 10      == false
    //
    // 3. !(x < 0) == !false    == true
    // 4. !(y > 10) == !false   == true
    //
    // 5. true || true          == true
    //
    // => !(x < 0) || !(y > 10) == true

    cout << !(x < 0) || !(y > 10);  // 1
    ```

## Exemplu

Mai jos puteți găsi un asemenea exemplu, în care rezolvăm problema
[cumparaturi1](https://www.pbinfo.ro/probleme/3211/cumparaturi1) de pe pbinfo
folosind diverse if-uri și else-uri. O soluție alternativă folosește
switch-case.

=== "if-else"

    ```cpp
    #include <iostream>
    using namespace std;

    int main() {
        int s, c, n;
        cin >> s >> c >> n;

        if (s % n == 0 && s % c == 0) {
            // Dacă ambele condiții sunt îndeplinite
            cout << "CN" << '\n';
        } else {
            if (s % n == 0) {
                // Dacă prima condiție este îndeplinită
                cout << "N" << '\n';
            } else {
                if (s % c == 0) {
                    // Dacă a doua condiție este îndeplinită
                    cout << "C" << '\n';
                } else {
                    // Dacă nicio condiție nu este îndeplinită
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

        // Combinăm condiția într-o singură valoare
        int condition = (s % n == 0) * 1 + (s % c == 0) * 2;

        /*-----------------------------------*\
        | s % n == 0 | s % c == 0 | condition |
        |------------|------------|-----------|
        | 0          | 0          | 0         |
        | 1          | 0          | 1         |
        | 0          | 1          | 2         |
        | 1          | 1          | 3         |
        \*-----------------------------------*/

        switch (condition) {
        case 3:
            // Dacă ambele condiții sunt îndeplinite
            // (s % n == 0 && s % c == 0)
            cout << "CN" << '\n';
            break;
        case 1:
            // Dacă prima condiție este îndeplinită
            // (s % n == 0)
            cout << "N" << '\n';
            break;
        case 2:
            // Dacă a doua condiție este îndeplinită
            // (s % c == 0)
            cout << "C" << '\n';
            break;
        default:
            // Dacă nicio condiție este îndeplinită
            cout << "nimic" << '\n';
            break;
        }

        return 0;
    }
    ```

## Prioritatea operatorilor

Este important să ținem cont de ordinea de evaluare a operatorilor logici atunci
când folosim combinații de `&&`, `||`, `!`. În general, operatorii logici
urmează următoarea ordine de prioritate:

- `!` (negația) - are prioritate mai mare
- `&&` (conjuncția) - are prioritate mai mică decât `!`, dar mai mare decât `||`
- `||` (disjuncția) - are prioritatea cea mai mică

De exemplu:

```cpp
int x = 1;
int y = 0;
int z = 2;

cout << !(x && y) || z; // 1
```

1. `#!cpp x && y` este evaluat mai întâi: `#!cpp 1 && 0 == false`.
2. `#!cpp !false == true`, deci `#!cpp !(x && y) == true`.
3. `#!cpp true || z` se evaluează, iar `#!cpp true || 2` dă `#!cpp true`.
   Rezultatul va fi 1.

```cpp
cout << A || B && C;       // A || (B && C)
cout << A && B || C && D;  // (A && B) || (C && D)
cout << A && B && C || D;  // ((A && B) && C) || D
cout << !A && B || C;      // ((!A) && B) || C
```

Ca să fie prioritățile mai ușor de ținut minte, putem face analogie cu algebra
normală:

- **Negația** (`!`) este la fel ca negația numerelor.
- **Conjuncția** (`&&`) este la fel ca înmulțirea.
- **Disjuncția** (`||`) este la fel ca adunarea (cu excepția că `#!cpp 1 + 1 ==
  1`).

!!! note "Observație"

    Dacă luăm `#!cpp true` ca 1 și `#!cpp false` ca 0, atunci putem defini toate
    operațiile pur algebric astfel:

    - `#!cpp !x == 1 - x`
    - `#!cpp x || y == x + y - x * y == x + y * (1 - x) == max(x, y)`
    - `#!cpp x && y == x * y == min(x, y)`

Cu această analogie putem merge mai departe la a descoperi niște proprietăți
importante.

## Proprietățile operatorilor logici

O proprietate imediat utilă pe care o putem vedea este că disjuncția și
conjuncția sunt asociative:

- `#!cpp x && (y && z) == (x && y) && z == x && y && z`
- `#!cpp x || (y || z) == (x || y) || z == x || y || z`

Asta este util pentru că ne permite să nu mai scriem paranteze dacă avem un șir
de conjuncții și disjuncții. În plus, ele sunt comutative (adică nu contează
ordinea):

- `#!cpp x && y == y && x`
- `#!cpp x || y == y || x`
  
Momentan, ele se comportă la fel ca adunarea și înmulțirea. La fel ca acestea,
are loc și distributivitatea:

- `#!cpp x && (y || z) == (x && y) || (x && z)`.
- `#!cpp x || (y && z) == (x || y) && (x || z)`.

Ne putem aduce aminte de ea dacă luăm expresia echivalentă $x \cdot (y + z) = x
\cdot y + x \cdot z$. Dacă o privim în sens invers, ne permite să „dăm în
factori” expresii logice. Aceeași relație are loc și dacă inversăm conjuncția cu
disjuncția, chiar dacă nu merge în algebra normală ($x + yz \neq (x + y)(x +
z)$). Următoarele exemple sunt echivalente:

```cpp
if ((a && b) || (a && c)) {
    // ...
}

if (a && b) {
    if (a && c) {
        
    }
}

if (a) {
    if (b || c) {
        // ...
    }
}

if (a && (b || c)) {
    // ...
}
```

```cpp
if ((a || b) && (a || c)) {
    // ...
}

if (a || b) {
    if (a || c) {
        // ...
    }
}

if (a || (b && c)) {
    // ...
}
```

În plus, avem și identități:

- `#!cpp x || false == x`
- `#!cpp x && true == x`

Asta o putem lua ca pe $x + 0 = x$ și $x \cdot 1 = x$. Asta ne permite să
simplificăm expresiile logice dacă știm de dinainte că o parte este redundantă.
De exemplu, `#!cpp x && (1 == 1)` este echivalentă cu `#!cpp x` oricare ar fi x.

De la matematică, știm și că $x \cdot 0 = 0$, care este adevărat și aici:

- `#!cpp x && false == false`.

C++ folosește **scurtcircuitarea** pentru a evalua expresiile logice în mod
eficient. Din moment ce știm că `#!cpp x && false == false` (și că
`#!cpp false && x == false`), dacă avem `#!cpp x && y` și `x` este evaluat la
fals, atunci nu mai este nevoie să evaluăm și `y`. Aici este un exemplu:

```#cpp
int b = 0;
if (b != 0 && a / b != 0) {
    // ...
}
```

Dacă `b` este 0, atunci toată expresia devine falsă fără a evalua `a / b != 0`,
unde ar putea avea loc o împărțire la zero dacă nu ar fi scurtcircuitată
condiția.

!!! note "Observație"

    Din moment ce tot ce nu este zero se transformă în `#!cpp true` și 0 se
    transformă în `#!cpp false`, putem înlocui `#!cpp x != 0` cu `#!cpp x`, ceva
    comun în C++. Analog, `#!cpp x == 0` poate fi scris ca `#!cpp !x`.

Scurtcircuitarea se aplică și pentru disjuncție (`||`). Dacă prima parte a
`x || y` este adevărată, atunci toată expresia este adevărată.

Mai avem următoarele relații, care arată idempotența celor două operații:

- `#!cpp x && x == x`
- `#!cpp x || x == x`

Acest lucru este evident, deoarece
`#!cpp false || false == false && false == false` și
`#!cpp true || true == true && true == true`. Ce înseamnă concret este că dacă
avem două expresii identice prin `||` sau `&&`, putem păstra doar una din ele,
deci nu mai facem calcule redundante.

Următoarele relații se numesc legea absorbției:

- `#!cpp x || (x && y) == x`
- `#!cpp x && (x || y) == x`

Pe scurt, dacă `x` e adevărat, e irelevant că și `x && y` e adevărat. De
asemenea, dacă pe noi ne interesează proprietatea `x`, nu contează ca `x || y` e
adevărat, pentru că noi vrem doar `x`. De pildă, dacă noi vrem să căutăm toate
numerele pare, nu ne interesează ca unele din ele sunt și multipli de 10. Dacă
avem `#!cpp (x <= 10) && (x <= 10 || x % 2 == 0)`, atunci ori avem numere mai
mici decât 10, ori numere pari mai mici decât 10, dar acestea tot sunt mai mici
decât 10, deci doar prima condiție contează. Analog, pentru
`#!cpp (x > 5) || (x > 5 && x < 10)`, știm că `#!cpp x > 5` este fie adevărat în
ambele expresii, fie în niciuna din ele.

Și negația are niște proprietăți utile. În primul rând, avem:

- `#!cpp !(!x) == x`

Logic vorbind, are sens: dacă un lucru e adevărat, înseamnă că opusul său este
fals. E ușor de văzut: `#!cpp !(!false) == !true == false` și
`#!cpp !(!true) == !false == true`.

Negația poate fi definită exclusiv prin următoarele două legi importante:

- `#!cpp x && !x == false`
- `#!cpp x || !x == true`
  
Ce ne spune prima regulă e că este imposibil să satisfaci și să nu satisfaci o
proprietate în același timp. „A fi și a nu fi” este imposibil. În schimb,
întrebarea lui Shakespeare „a fi sau a nu fi” este întotdeauna adevărată.

În final, avem **legile lui DeMorgan**, foarte folositoare:

- `#!cpp !(x || y) == !x && !y`
- `#!cpp !(x && y) == !x || !y`

Prima lege zice că singurul mod prin care `x || y` poate fi fals este dacă `x`
și `y` sunt false. Dacă nu îmi place ciocolata sau vanilia, este clar că este
același lucru cu a zice că nu îmi place ciocolata și nu îmi place vanilia. Dacă
am două condiții și nu ambele se îndeplinesc, înseamnă că una dintre condiții nu
se îndeplinește. Pentru un exemplu mai matematic la a doua lege, dacă $x \not\in
[2, 3]$ ($x$ nu este între 2 și 3), atunci este adevărat fie că $x < 2$, fie că
$x > 3$. Dacă am rescrie-o în termeni de C++, ar fi:
`#!cpp !(x >= 2 && x <= 3) == !(x >= 2) || !(x <= 3) == (x < 2) || (x > 3)`.

Cea mai simplă metodă să ții minte legile de mai sus este:

- schimbă `&&` în `||` și viceversa
- neagă fiecare termen
- neagă toată expresia

Altfel spus:

- `#!cpp !(!x || !y) == x && y`
- `#!cpp !(!x && !y) == x || y`

Următoarele două exemple sunt echivalente, iar această rescriere poate fi utilă
în anumite circumstanțe pentru a face codul mai curat (de obicei când a doua
ramură este scurtă sau dacă negația este altfel întortochiată):

```cpp
if (!A && !B) {
    fa_ceva();
} else {
    fa_altceva();
}

if (A || B) {
    fa_altceva();
} else {
    fa_ceva();
}
```

Există și niște echivalențe cu negația care sunt utile în manipularea
expresiilor relaționale:

- `#!cpp !(x == y) == (x != y)`
- `#!cpp !(x != y) == (x == y)`
- `#!cpp !(x < y) == (x >= y)`
- `#!cpp !(x <= y) == (x > y)`
- `#!cpp !(x > y) == (x <= y)`
- `#!cpp !(x >= y) == (x < y)`

Combinat cu legile lui DeMorgan și celelalte legi de mai sus, putem simplifica
cu succes orice condiție, obținând ceva mai scurt de scris și mai eficient.

## Concluzii

Odată cu învățarea structurii alternative, putem acum să incorporăm structuri
repetitive, așa cum puteți vedea în articolele ulterioare. De asemenea, putem să
le și simplificăm.

## Resurse suplimentare

- [Articolul despre structuri alternative de pe
  pbinfo](https://www.pbinfo.ro/articole/70/structuri-alternative)
- [Learning to code - USACO
  Guide](https://usaco.guide/general/resources-learning-to-code?lang=cpp)

## Probleme suplimentare

- [Probleme usoare si medii din capitolul Structura de
  decizie](https://www.pbinfo.ro/probleme/categorii/12/elemente-de-baza-ale-limbajului-structura-de-decizie)
