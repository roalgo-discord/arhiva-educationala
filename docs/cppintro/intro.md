---
tags:
    - C++
    - introducere
---

**Autor**: Ștefan-Cosmin Dăscălescu

!!! note "Observație"
    Dacă nu ți-ai instalat un compilator sau un editor, te invităm să accesezi mai întâi [acest articol](https://roalgo-discord.github.io/arhiva-educationala/cppintro/) pentru a putea scrie cod într-o manieră clară și fără probleme ulterior.

 În cele ce urmează, vom prezenta câteva dintre aspectele introductive ale limbajului de programare C++. 

## Ce este un limbaj de programare?

Limbajele de programare reprezintă un sistem de notații pe care îl folosim pentru a scrie programe folosite de calculatoare, acestea fiind mijlocul prin care oamenii pot comunica cu calculatoarele într-o manieră asemănătoare cu limbajul uman. 

Există foarte multe limbaje de programare, care pot fi împărțite în multe categorii în funcție de modul în care le utilizăm, sau modul în care ajung să comunice cu procesorul sau multe alte criterii.

Unul din cele mai populare moduri de a împărți limbajele de programare este în funcție de modul în care interacționează cu procesorul, aici putem vorbi de limbaje care au nevoie de un compilator care să comunice cu procesorul (de exemplu, C, C++, Pascal etc.), respectiv de limbaje care au nevoie de un interpretor pentru acest lucru (de exemplu, Python, Java, JavaScript etc.). 

O altă metodă de a clasifica limbajele de programare este în funcție de modul principal în care operăm cu ele, putând vorbi astfel de limbaje imperative, funcționale, logice și orientate pe obiecte. 

!!! note "Observație"
    Pe parcursul studiului informaticii, fie că veți studia doar la liceu sau veți ajunge să aveți o carieră, mai lungă sau mai scurtă în domeniu, veți avea de-a face cu foarte multe limbaje de programare, iar deși arhiva noastră se concentrează pe limbajul C++ datorită avantajelor sale în ceea ce privește algoritmica, nu există vreun limbaj de programare care să fie în totalitate inutil. 

* Un limbaj imperativ (de exemplu, C++) este folosit pentru a implementa algoritmi într-o ordine dată, cu alte cuvinte ele fac ceea ce le spunem să facă.
* Un limbaj funcțional (de exemplu, Haskell) se caracterizează prin aplicarea unor funcții succesive pentru a rezolva cerințele programului dat. 
* Un limbaj logic (de exemplu, Prolog) se caracterizează prin faptul că aplicația, și nu programatorul decide ordinea în care sunt executate instrucțiunile. 
* Un limbaj orientat pe obiecte (de exemplu, Java) are drept caracteristici principale folosirea claselor pentru abstractizarea, încapsularea, polimorfismul și moștenirea datelor, aceste facilități fiind incorporate și în majoritatea limbajelor imperative și funcționale. 

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

Dacă programul este corect și nu are vreo eroare, se va genera un cod obiect (programul pe care îl găsiți cu extensia .o în același loc cu programul C++ pe care l-ați scris)

Pentru a rula programul, va trebui să rulați executabilul generat (programul cu extensia .exe), să introduceți eventual datele și apoi să vedeți outputul generat.

!!! note "Observație"
    Pentru a vedea modificările la răspunsurile generate, trebuie să compilați și să rulați din nou executabilul, în caz contrar datele vor fi afișate conform cu versiunea anterioară a programului. 

### Inițializarea programului

Prima linie, `#include <iostream>` reprezintă ceea ce vom numi **o bibliotecă**, aceasta fiind o colecție de funcții, clase și metode ce pot fi reutilizate fără a fi nevoie să scriem întreagă definiție de mână. Un echivalent în viața de zi reprezintă utilizarea unei cărți de rețete pentru prepararea unui fel de mâncare, astfel noi putem folosi acele metode fără a fi nevoie să le reinventăm. Toate bibliotecile vor avea sintaxa `#include <NUME>`, exemple ar fi `#include <fstream>`, `#include <cmath>`, `#include <vector>`, `#include <cstring>` etc.

Următoarea linie, `using namespace std;` ne indică faptul că putem utiliza toate definițiile incluse în namespace-ul standard. **Un namespace** reprezintă o regiune de declarări care conferă un scop identificatorilor (numelor funcțiilor, variabilelor, tipurilor de date etc.) din acesta, fiind folosite pentru a grupa codul în grupe logice și pentru a preveni coliziunile de nume care pot apărea în special în situația în care programul nostru include multiple biblioteci. 

!!! note "Observație"
    Aproape toate programele scrise în limbajul C++ vor avea aceste două linii, eventual împreună cu alte biblioteci și namespace-uri, detalii pe care le vom lăsa ulterior pe măsură ce vă veți obișnui mai bine cu limbajul în sine. 

### Funcția main()

!!! info "Definiție"  
    `int main()` este o funcție care apare în fiecare program C++, aceasta fiind funcția principală a oricărui program scris în acest limbaj, fiind și funcția apelată mai întâi de orice compilator. 

Această funcție este cea în care vom scrie toate instrucțiunile, inclusiv așa cum veți vedea într-un articol ulterior, cele care vor fi folosite pentru a apela funcții auxiliare. 

De asemenea, aici vom avea toate instrucțiunile și structurile de care avem nevoie pentru a citi și afișa datele, prelucrarea lor, precum și multe alte facilități specifice, precum manipularea lor folosind structuri logice, alternative și repetitive.

În cele ce urmează, vom prezenta aceste părți componente ale fiecărui program, pe parcurs intrând și în lucruri mai specifice, în articolele ulterioare. 

### Citirea și afișarea datelor

Datele pot fi citite și afișate fie prin intrarea și ieșirea standard (numite colocvial "de la tastatură", respectiv "pe ecran"), fie folosind fișiere auxiliare, preluând datele dintr-un fișier și afișându-le în alt fișier. 

Aceste metode pot fi folosite și într-o manieră hibrid, fiind foarte multe exemple de probleme în care se dau datele într-un fișier de intrare și se afișează pe ecran.

#### Intrarea și ieșirea standard 

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

#### Citirea și afișarea folosind fișiere

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

### Variabile

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

### Structura alternativă

!!! info "Definiție" 
    O structură alternativă este o structură pe care o folosim pentru a coordona programul să ia decizii diferite în funcție de rezultatul unei expresii logice. 

În limbajul C++, structura alternativă este reprezentată de blocul if..else, astfel încât putem să direcționăm programul în funcție de rezultatele expresiilor logice menționate. 

Pe lângă if..else, există și instrucțiunea switch-case, care funcționează într-o manieră similară, trecând prin fiecare caz pe rând fără a mai fi nevoie de if-uri și else-uri

#### Operatori logici

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

#### Exemplu 

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

### Structura repetitivă

!!! info "Definiție" 
    O structură repetitivă este o structură pe care o folosim pentru a coordona programul să ia aceleași decizii de mai multe ori, atâta timp cât o anumită condiție este îndeplinită. Acest lucru se poate întâmpla de un număr fixat de ori sau de un număr variat de ori. 

Cele trei structuri repetitive din C++ sunt while, do..while și for. Deși acestea au în mare parte același rol, funcționează într-un mod diferit și trebuie știute pentru a putea folosi cea mai potrivită variantă în funcție de ce ne cere problema. Deși majoritatea programelor pot fi scrise folosind toate cele trei structuri repetitive, sunt situații în care nu este practic să folosim anumite structuri, deci ne vom concentra pe a arăta cele mai potrivite exemple în funcție de situație.

#### Structura while

!!! info "Definiție" 
    Structura repetitivă while este o **structură repetitivă cu test inițial și număr necunoscut de pași** pe care o folosim pentru a coordona programul să ia aceleași decizii atâta timp cât o anumită condiție este îndeplinită și nu știm numărul de pași pe care vrem să-l facem.

Sintaxa while-ului este de regulă, următoarea:

```cpp
while (conditie) {
    // instructiuni
}
```

#### Structura do..while

!!! info "Definiție" 
    Structura repetitivă do-while este o **structură repetitivă cu test final și număr necunoscut de pași** pe care o folosim pentru a coordona programul să ia aceleași decizii atâta timp cât o anumită condiție este îndeplinită și nu știm numărul de pași pe care vrem să-l facem, **dar vrem să rulăm instrucțiunile măcar o dată**.

Sintaxa do..while-ului este de regulă, următoarea:

```cpp
do {
    // instructiuni
}while (conditie);
```

#### Structura for

!!! info "Definiție" 
    Structura repetitivă for este o **structură repetitivă cu test inițial și număr cunoscut de pași** pe care o folosim pentru a coordona programul să ia aceleași decizii când știm numărul de pași pe care vrem să-l facem. Deși **for se poate scrie și folosind rigorile while-ului**, având număr necunoscut de pași, se preferă folosirea for-ului când știm câți pași vrem să facem, respectiv a while-ului în caz contrar.

```cpp
for (instructiune_initiala; conditie; actualizare) {
    // instructiuni
}
```

Un astfel de exemplu ar fi 

```cpp
int s = 0;
for (int i = 1; i <= n; i++) {
    s = s + i;
}
```

#### Exemplu 

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

## Concluzii

Chiar dacă acest articol conține foarte multă informație, recomandăm familiarizarea cu conceptele menționate mai sus în ordinea de mai sus, rezolvând aplicații simple care să cuprindă aceste concepte. De asemenea, cu cât scrieți mai multe programe, cu atât veți fi mai obișnuiți cu aceste instrucțiuni și le veți folosi corect și eficient. 

În articolele ulterioare, vom insista pe formarea unui coding style, alte facilități ale limbajului C++ și alte informații utile pe măsură ce vă obișnuiți cu limbajul în sine. 

## Resurse suplimentare 

* [Sectiunile Elemente de bază ale limbajului C++ si Structuri de control de pe pbinfo](https://www.pbinfo.ro/articole/5547/informatica-clasa-a-ix-a)
* [Linkurile de pe w3schools](https://www.w3schools.com/cpp/cpp_getstarted.asp)

## Probleme suplimentare

* [Probleme usoare si medii din capitolul Operatori și expresii](https://www.pbinfo.ro/probleme/categorii/6/elemente-de-baza-ale-limbajului-operatori-si-expresii)
* [Probleme usoare si medii din capitolul Structura de decizie](https://www.pbinfo.ro/probleme/categorii/12/elemente-de-baza-ale-limbajului-structura-de-decizie)
* [Probleme usoare si medii din capitolul Structuri repetitive](https://www.pbinfo.ro/probleme/categorii/7/elemente-de-baza-ale-limbajului-structuri-repetitive)