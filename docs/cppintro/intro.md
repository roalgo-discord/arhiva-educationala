---
tags:
    - C++
    - introducere
---

**Autor**: Ștefan-Cosmin Dăscălescu

!!! note "Observație"
    Dacă nu ți-ai instalat un compilator sau un editor, te invităm să accesezi mai întâi [acest articol](./index.md) pentru a putea scrie cod într-o manieră clară și fără probleme ulterior.

 În cele ce urmează, vom prezenta câteva dintre aspectele introductive ale limbajului de programare C++ (sintaxa, compilarea și primele părți ale oricărui program), precum și un prim program în acest limbaj.

## Ce este un limbaj de programare?

Limbajele de programare reprezintă un sistem de notații pe care îl folosim pentru a scrie programe folosite de calculatoare, acestea fiind mijlocul prin care oamenii pot comunica cu calculatoarele într-o manieră asemănătoare cu limbajul uman. 

Există foarte multe limbaje de programare, care pot fi împărțite în multe categorii în funcție de modul în care le utilizăm, sau modul în care ajung să comunice cu procesorul sau multe alte criterii.

Unul din cele mai populare moduri de a împărți limbajele de programare este în funcție de modul în care interacționează cu procesorul, aici putem vorbi de limbaje care au nevoie de un compilator care să comunice cu procesorul (de exemplu, C, C++, Pascal etc.), respectiv de limbaje care au nevoie de un interpretor pentru acest lucru (de exemplu, Python, Java, JavaScript etc.). 

O altă metodă de a clasifica limbajele de programare este în funcție de modul principal în care operăm cu ele, putând vorbi astfel de limbaje imperative, funcționale, logice și orientate pe obiecte. 

!!! note "Observație"
    Pe parcursul studiului informaticii, fie că veți studia doar la liceu sau veți ajunge să aveți o carieră, mai lungă sau mai scurtă în domeniu, veți avea de-a face cu foarte multe limbaje de programare, iar deși arhiva noastră se concentrează pe limbajul C++ datorită avantajelor sale în ceea ce privește algoritmica, nu există vreun limbaj de programare care să fie în totalitate inutil. 

* Un limbaj imperativ (de exemplu C++, C, Pascal) este folosit pentru a implementa algoritmi folosind o listă de comenzi, într-o ordine dată, cu alte cuvinte ele fac ceea ce le spunem să facă.
* Un limbaj funcțional (de exemplu Haskell, Lisp) se caracterizează prin aplicarea unor funcții succesive pe un set de date pentru a rezolva cerințele programului dat. 
* Un limbaj logic (de exemplu Prolog) se caracterizează prin faptul că aplicația, și nu programatorul decide ordinea în care sunt executate instrucțiunile. 
* Un limbaj orientat pe obiecte (de exemplu Java, Python, Smalltalk) are drept caracteristică principale folosirea claselor, adică structuri compuse ce conțin câmpuri și metode sau mesaje (funcții) pentru organizarea și operarea pe date.

Multe limbaje combină aceste trăsături; aceste limbaje se numesc *limbaje multiparadigmă*. De exemplu, C++, deși este derivat din limbajul imperativ C și are toate trăsăturile acestuia, adaugă un sistem de obiecte, ceea ce îl face orientat pe obiecte. Python este orientat pe obiecte (toate datele sunt obiecte), dar permite și scrierea de cod imperativ și are și facilități de programare funcțională.

## Limbajul de programare C++

Toate articolele pe care le vom avea în această arhivă vor avea la bază limbajul de programare C++, drept pentru care se impune introducerea cititorilor în acest limbaj de programare. 

!!! info "Limbajul C++"     
    Limbajul C++ a fost inventat de către Bjarne Stroustrup în 1979, ca o extindere a limbajului C. Limbajul C a fost inventat în 1969-1973 de către Dennis Ritchie pentru a realiza sistemul de operare Unix. 

!!! note "Observație"
    Astfel, aproape toate programele scrise în C pot fi compilate în C++, eventual cu foarte puține modificări.

### Primul program în C++

Pentru a explica cum funcționează limbajul C++, voi începe prin a scrie un program și vă voi ghida pe parcurs prin cele mai simple funcționalități, începând cu sintaxa și terminând cu instrucțiunile și modul de operare cu ele.

Pe scurt, acest program va prelua un număr natural $n$ de la tastatură și va implementa conjectura lui Collatz. 

!!! note "Observație"
    Scopul acestui articol este acela de a vă ajuta să fiți capabili să înțelegeți și să reproduceți programe similare folosind cunoștințele pe care le veți acumula mai jos.

!!! note "Comentarii"
    Pentru a explica diverse părți din cod, vom folosi de-a lungul arhivei comentariile, acestea fiind o instrucțiune din limbajul C++. Pentru a pune un comentariu pe un singur rând, vom folosi `//`, iar pentru a comenta mai multe rânduri, vom folosi perechea `/*` `*/`.

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    while (n > 1) {
        cout << n << " ";
        if (n % 2 == 0) {
            n = n / 2;
        }
        else {
            n = n * 3 + 1;
        }
    }
    
    cout << n << '\n';
    return 0; // instrucțiune ce se pune la finalul codurilor
} 
```

### Elemente de bază ale sintaxei C++

Așa cum se poate observa în programul de mai sus și în exemplele ulterioare, majoritatea liniilor de cod se termină cu un ; (punct și virgulă / semicolon). Excepție fac liniile în care declarăm biblioteci, funcții, structuri alternative și repetitive.

De asemenea, se poate remarca prezența acoladelor pentru a separa blocuri de cod, acestea fiind folosite pentru a face codul mai ușor de citit și în cazul structurilor alternative și repetitive, a marca instrucțiunile subordonate acestora. 

Un alt element foarte important, care deși nu e obligatoriu, este foarte util și face scrierea codurilor mult mai ușoară, reprezintă spațierea instrucțiunilor. Chiar dacă vom intra ulterior în detaliu în ceea ce privește coding style-ul, acesta este un element de bază pentru a scrie coduri cât mai de calitate, obicei care dacă îl deprindeți de la început, vă va fi mult mai ușor să îl adaptați oricărui limbaj de programare pe care îl veți folosi.

### Compilarea programului

După ce terminați de scris programul, dacă programul este corect din punct de vedere sintactic, programul va putea fi rulat, iar în caz contrar, editorul vă va specifica erorile de compilare, împreună cu locul în care acestea apar. 

Dacă programul este corect și nu are vreo eroare, se va genera un cod obiect (programul pe care îl găsiți cu extensia .o în același loc cu programul C++ pe care l-ați scris).

Pentru a rula programul, va trebui să rulați executabilul generat (programul cu extensia .exe), să introduceți eventual datele și apoi să vedeți outputul generat.

!!! note "Observație"
    Pentru a vedea modificările la răspunsurile generate, trebuie să compilați și să rulați din nou executabilul, în caz contrar datele vor fi afișate conform cu versiunea anterioară a programului. 

### Inițializarea programului

Prima linie, `#include <iostream>` reprezintă ceea ce vom numi **o bibliotecă**, aceasta fiind o colecție de funcții, clase și metode ce pot fi reutilizate fără a fi nevoie să scriem întreagă definiție de mână. Un echivalent în viața de zi reprezintă utilizarea unei cărți de rețete pentru prepararea unui fel de mâncare, astfel noi putem folosi acele metode fără a fi nevoie să le reinventăm. Toate bibliotecile vor avea sintaxa `#include <NUME>`, exemple ar fi `#include <fstream>`, `#include <cmath>`, `#include <vector>`, `#include <cstring>` etc.

!!! note "Observație"
    Printre altele, există și biblioteca `#include <bits/stdc++.h>` care include toate bibliotecile de care veți avea nevoie când rezolvați probleme în algoritmică. Totuși, recomandăm folosirea acestei biblioteci doar la olimpiadă, și chiar și acolo, există unele dezavantaje, cum ar fi timpul crescut de compilare a programului, care poate fi un factor descurajator în contextul avantajului clar de a nu fi nevoie să scrieți toate bibliotecile pe care le utilizați.

Următoarea linie, `using namespace std;` ne indică faptul că putem utiliza toate definițiile incluse în namespace-ul standard. **Un namespace** reprezintă o regiune de declarări care conferă un scop identificatorilor (numelor funcțiilor, variabilelor, tipurilor de date etc.) din acesta, fiind folosite pentru a grupa codul în grupe logice și pentru a preveni coliziunile de nume care pot apărea în special în situația în care programul nostru include multiple biblioteci. 

!!! note "Observație"
    Aproape toate programele scrise în limbajul C++ vor avea aceste două linii, eventual împreună cu alte biblioteci și namespace-uri, detalii pe care le vom lăsa ulterior pe măsură ce vă veți obișnui mai bine cu limbajul în sine. 

### Funcția main()

!!! info "Definiție"  
    `int main()` este o funcție care apare în fiecare program C++, aceasta fiind funcția principală a oricărui program scris în acest limbaj, fiind și funcția apelată mai întâi de orice compilator. 

Această funcție este cea în care vom scrie toate instrucțiunile, inclusiv așa cum veți vedea într-un articol ulterior, cele care vor fi folosite pentru a apela funcții auxiliare. 

De asemenea, aici vom avea toate instrucțiunile și structurile de care avem nevoie pentru a citi și afișa datele, prelucrarea lor, precum și multe alte facilități specifice, precum manipularea lor folosind structuri logice, alternative și repetitive.

### Concluzie

În articolele următoare, vom prezenta aceste părți componente ale fiecărui program, pe parcurs intrând și în lucruri mai specifice, în articolele ulterioare. Cu cât scrieți mai multe programe, cu atât veți fi mai obișnuiți cu aceste instrucțiuni și le veți folosi corect și eficient. 

Pe parcurs, vom insista pe formarea unui coding style, alte facilități ale limbajului C++ și alte informații utile pe măsură ce vă obișnuiți cu limbajul în sine. 

## Resurse suplimentare 

* [Sectiunile Elemente de bază ale limbajului C++ si Structuri de control de pe pbinfo](https://www.pbinfo.ro/articole/5547/informatica-clasa-a-ix-a)
* [Linkurile de pe w3schools](https://www.w3schools.com/cpp/cpp_getstarted.asp)
* [Learning to code - USACO Guide](https://usaco.guide/general/resources-learning-to-code?lang=cpp)

## Probleme suplimentare

* [Probleme usoare si medii din capitolul Operatori și expresii](https://www.pbinfo.ro/probleme/categorii/6/elemente-de-baza-ale-limbajului-operatori-si-expresii)
