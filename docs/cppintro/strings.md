---
tags:
    - C++
    - implementare
    - optimizare
    - siruri de caractere
---

**Autor**: Ștefan-Cosmin Dăscălescu, Denisa-Maria Ursu

## Introducere

Un șir de caractere este un tablou care stochează caractere. În limbajul C++, putem stoca aceste șiruri în două moduri, fie folosind un tablou static, la fel ca în limbajul C, fie folosind tipul de date string. În acest articol, vom detalia ambele opțiuni, împreună cu avantajele și dezavantajele lor. 

## Tipul char și tabelul ASCII

Așa cum ați văzut când am prezentat [tipurile de date](https://edu.roalgo.ro/cppintro/data-types/), limbajul C++ are și tipul de date char, care este folosit pentru a stoca caractere. Chiar dacă valorile care sunt acoperite de tipul char sunt în intervalul $[-128, 127]$, în general, caracterele care apar în probleme sunt acoperite de valori pozitive, mai precis intervalul $[32, 127]$. 

!!! note "Codificarea caracterelor"
    Standardul care a asignat valori caracterelor se numește ASCII (American Standard Code for Information Interchange). Caracterele în intervalul $[0, 31]$ nu sunt afișabile, fiind instrucțiuni de sistem.

Printre cele mai importante coduri sunt $32$ (spațiu), codurile din intervalul  $[48, 57]$ (cifrele de la $0$ la $9$), codurile din intervalul $[65, 90]$ (literele mari ale alfabetului englez) și codurile din intervalul $[97, 122]$ (literele mici ale alfabetului englez).

### Transformări între litere și cifre

Pentru a putea lucra cu caracterele fără a fi nevoiți să ținem cont de codul lor ASCII (cifrele să fie notate cu valori de la $0$ la $9$, iar literele cu valori de la $0$ la $25$), tot ce trebuie să facem este să scădem caracterul corespunzător celei mai mici cifre/litere, mai jos găsiți exemple în C++.

!!! note "Transformarea caracterelor" 
    Pentru a converti o literă mare în literă mică, valoarea caracterului trebuie crescută cu $32$, iar pentru operația de a converti litera mică în mare, valoarea trebuie scăzută cu $32$. 

```cpp
#include <iostream>
using namespace std;

int main() {
    
    char c = '5';
    cout << (int) c << '\n'; // 53
    cout << (int) (c - '0') << '\n'; // 5
    
    c = 'P';
    cout << (int) c << '\n'; // 80
    cout << (int) (c - 'A') << '\n'; // 15
    
    c += 32; // transformarea din litera mare in mica
    cout << (int) c << '\n'; // 112
    cout << (int) (c - 'a') << '\n'; // 15
    
    c = 'g';
    cout << (int) c << '\n'; // 103
    cout << (int) (c - 'a') << '\n'; // 6
    
    c -= 32; // transformarea din litera mica in mare
    cout << (int) c << '\n'; // 71
    cout << (int) (c - 'A') << '\n'; // 6

    c = 35;
    cout << c << '\n'; // #

    c = 99;
    cout << c << '\n'; // c
    return 0;
}
```

Lista completă a codurilor pentru caractere se găsește [aici](https://www.sciencebuddies.org/science-fair-projects/references/ascii-table).

## Șiruri de caractere și biblioteca cstring

Prima și cea mai simplă variantă de a avea acces la lucrul cu șiruri de caractere constă în folosirea metodelor care există și în limbajul C, metode care sunt incluse în bibiloteca ``#include <cstring>``.

Un șir de caractere poate fi inițializat în diverse moduri, așa cum se poate vedea în exemplele menționate mai jos. Se poate observa că afișarea se face foarte ușor, la fel ca la orice variabilă, spre deosebire de arrays de tipuri întregi sau reale.

```cpp
#include <iostream>
using namespace std;

int main() {
    
    char c[6] = "roalgo";
    cout << c << '\n';
    
    char c2[] = {'r', 'o', 'a', 'l', 'g', 'o', '\0'}; // acel '\0' e obligatoriu
    cout << c2 << '\n';
    
    char message[] = "roalgo este cel mai bun server de informatica";
    cout << message << '\n';
    
    cout << message[9] << '\n'; // t
    return 0;
}
```

În cele ce urmează, vom prezenta cele mai utilizate funcții pe care le puteți folosi pentru a lucra cu șiruri de caractere mai ușor. Toate aceste funcții vor necesita includerii bibliotecii cstring, menționată anterior.

### Citirea șirurilor de caractere

Un șir de caractere poate fi citit în diverse moduri, fie la fel ca la vectori (caracter cu caracter), fie putem citi toate valorile deodată, iar în funcție de modul cum facem citirea, vom putea citi fie până la întâlnirea primului spațiu, fie până la sfârșitul liniei. 

De asemenea, se va putea observa faptul că putem citi o întreagă linie folosind funcția getline și fixând numărul de caractere pe care vrem să-l citim. 

Să presupunem că șirul de caractere este `roalgo este cel mai bun server de informatica`. În funcție de cum citim acest șir, vom avea rezultate diferite.

Funcția cin.getline are ca parametri șirul în care se va stoca rezultatul citirii și numărul maxim de caractere permis, citind șirul până la întâlnirea caracterului de newline, un exemplu ar fi ``cin.getline(s, x)``, unde s este șirul dat și x este lungimea lui.

Citirea fără o funcție specifică se poate face cu cin, dar se va citi până la primul spațiu. 

Există și funcția ``cin.get()``, care poate fi folosit fie pentru un singur caracter, fie pentru a citi $x$ caractere, dar de obicei vom avea nevoie să citim o linie completă, deci funcția ``cin.getline()`` devine mai utilă.

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    char s[100];
    cin >> s; 
    cout << s << '\n'; // roalgo
    
    cin.get(); // sare peste urmatorul caracter, de obicei spatiu sau newline
    
    cin.getline(s, 100); // citeste cel mult 100 de caractere, pana la newline, sare si peste newline
    cout << s << '\n'; // roalgo este cel mai bun server de informatica
    return 0;
}
```

### Funcția strlen

Funcția strlen ia drept parametru un șir de caractere și returnează lungimea acestuia. 

```cpp
char message[] = "roalgo este cel mai bun server de informatica";
cout << strlen(message) << '\n'; // 45
```

### Funcția strcpy și strncpy
Funcția `strcpy` copiază un șir de caractere în alt șir, numit destinație. Asemănător, funcția `strncpy` copiază doar primele n caractere dintr-un șir. Aceste funcții nu adaugă caracterul `\0` la finalul șirului.

=== "strcpy"

    ```cpp
    char sursa[11] = "hello";
    char destinatie[11] = "world";
    cout << sursa << " " << destinatie << '\n'; //se va afisa "hello world"
    strcpy(destinatie, sursa);
    cout << sursa << " " << destinatie << '\n'; //se va afisa "hello hello"
    ```

=== "strncpy"

    ```cpp
    char sursa[11] = "caine";
    char destinatie[11] = "paine";
    cout << sursa << " " << destinatie << '\n'; //se va afisa "caine paine"
    strncpy(destinatie, sursa, 1);
    cout << sursa << " " << destinatie << '\n'; //se va afisa "caine caine"
    ```

### Funcțiile strcat și strncat
Funcția `strcat` concatenează un șir 'destinatie' cu o copie a unui șir 'sursa'. Concatenarea a două șiruri înseamnă alipirea acestora. Funcția `strncat` funcționează asemănător, numai că alipește doar primele n caractere ale șirului sursă. Iată un exemplu:

=== "strcat"

    ```cpp
    char sursa[11] = "hello ";
    char destinatie[11] = "world";
    cout << sursa << " " << destinatie <<'\n'; //se va afisa "hello world"
    strcat(destinatie, sursa);
    cout << destinatie; //se va afisa "worldhello"
    ```

=== "strncat"

    ```cpp
    char sursa[20] = "informatica";
    char destinatie[20] = "mate";
    cout << sursa << " " << destinatie <<'\n'; //se va afisa "informatica mate"
    strncat(destinatie, sursa, 4);
    cout << destinatie; //se va afisa "mateinfo"
    ```

### Funcția strchr și strrchr
Funcțiile `strchr` și `strrchr` returnează un pointer la prima apariție, respectiv ultima apariție a unui caracter într-un șir. Mai exact se va afișa șirul de începând cu prima, respectiv ultima apariție a caracterului.

=== "strchr"

    ```cpp
    char string[] = "serverul roalgo este plin de persoane pasionate de algoritmica";
    char *myPtr = strchr(string, 'p');
    if (myPtr != NULL) {
        cout << myPtr; // se va afisa "plin de persoane pasionate de algoritmica"
    }
    ```

=== "strrchr"

    ```cpp
    char string[] = "serverul roalgo este plin de persoane pasionate de algoritmica";
    char *myPtr = strrchr(string, 'p');
    if (myPtr != NULL) {
        cout << myPtr; // se va afisa "pasionate de algoritmica"
    }
    ```

### Funcția strcmp

Funcția `strcmp` este folosită pentru a compara două șiruri de caractere. Aceasta poate returna 3 valori:

* `0` - dacă șirurile sunt exact la fel;
* `-1` sau o valoare mai mică decât 0 - dacă primul șir este înaintea celuilalt, alfabetic vorbind;
* `1` sau o valoare mai mare decât 0 - dacă primul șir este după celălalt, alfabetic vorbind.

```cpp
char str1[] = "abc";
char str2[] = "abc";
cout << strcmp(str1, str2) << '\n'; // se va afișa 0 deoarece șirurile sunt la fel

char str3[] = "def";
char str4[] = "ghi";
cout << strcmp(str3, str4) << '\n'; // se va afișa -1 deoarece primul șir este înaintea celui de al doilea
cout << strcmp(str4, str3) << '\n'; // se va afișa 1 deoarece primul șir este după cel de al doilea
```

### Funcția strstr

Această funcție primește două șiruri de caractere, s1 și s2, ca argumente și găsește prima apariție a șirului s2 în șirul s1.

```cpp
char str1[] = "abcdefghijklmnop";
char str2[] = "fgh";
cout << strstr(str1, str2); // se va afișa "fghijklmnop"
```

### Funcția strtok

Funcția `strtok` împarte `str[]` conform delimitatorilor dați și returnează următorul token. Trebuie apelată într-o structură repetitivă pentru a obține toate token-urile.

```cpp
char str[] = "wow-ce-multe-cuvinte-in-acest-sir";
char* token = strtok(str, " - ");
while (token != NULL) {
    cout << token << " "; // se va afișa "wow ce multe cuvinte in acest sir"
    token = strtok(NULL, " - ");
}
```

## Tipul de date std::string

Această structură de date este echivalentul std::vector pentru șirurile de caractere, remarcându-se prin faptul că spre deosebire de șirurile de caractere din C, funcția de aflare a lungimii este $O(1)$, în loc de $O(n)$. Tipul string este unul din tipurile prezente în [STL](https://edu.roalgo.ro/cppintro/stl/), foarte multe funcții fiind similare cu cele pe care le putem folosi cu vectori.

Pentru a putea folosi această structură de date, va trebui să includem biblioteca ``#include <string>``. Se remarcă faptul că există diferențe semnificative față de cum folosim șirurile de caractere din C.

În ceea ce privește citirea, funcția getline va avea o sintaxă un pic diferită, fiind scrisă astfel:

```cpp
string s;
getline (cin, s);
cout << s << '\n';
```

Sintaxa unui string va fi de tipul ``string nume;``

```cpp
string s = "abacaba";
s[0] = 'c';
cout << s.size() << '\n'; // 7
s[6] = 0; // caracterul nul
cout << s << " " << s.size() << '\n'; // abacab 7 (nu se schimba sizeul)
```

În mod particular, vom putea concatena două șiruri de caractere cu ușurință, folosind operatorul +. Totuși, trebuie să fim atenți cum folosim acest operator, pentru a evita efectuarea prea înceată a operațiilor. 

```cpp
string s = "roalgo";
string t = "top";
s += t; // roalgotop
s = s + t; // roalgotoptop
```

Deși în cazul numerelor naturale, aceste operații sunt echivalente, în cazul stringurilor, += și + sunt complet diferite. Prima dintre ele concatenează șirul primit la șirul existent, cea de-a doua copiază cele două șiruri, le unește și apoi atribuie rezultatul șirului. Această diferență devine mai dramatică în situații precum cea de mai jos.

```cpp
string s;
for (int i = 1; i <= 1000000; i++) { // O(n)
    s += 'a';
}
string t;
for (int i = 1; i <= 1000000; i++) { // O(n^2)
    t = t + 'a';
}
```

Putem folosi și funcții specifice care caută prima sau ultima apariție a unui anumit caracter în șir, precum find sau find_last_of, care au complexitate liniară. Tipul returnat este size_t, dar acesta poate fi folosit și ca int.

```cpp
#include <iostream>
#include <string>
using namespace std;

int main()
{

    string str = "roalgo este cel mai bun server din romania";
    size_t first = str.find('e'); // 7
    size_t last = str.find_last_of('e'); // 28
    
    if (first != string::npos) {
        cout << first << '\n';
    }
    if (last != string::npos) {
        cout << last << '\n';
    }
    return 0;
}
```

## Concluzii

Caracterele și șirurile de caractere sunt foarte folosite în multe aplicații, fiind des întâlnite în probleme de toate dificultățile, în special la examenele de bacalaureat și admitere, dar și în multe dintre problemele ce se dau la olimpiada de informatică, în clasa a X-a și clasa a VIII-a. 

Cunoașterea funcțiilor specifice este esențială deoarece foarte multe întrebări grilă la admitere implică elemente mai dificile din sintaxa lor și orice detaliu minor poate face diferența. 

## Probleme suplimentare

* [Prelucrări elementare pe șiruri de caractere - pbinfo](https://www.pbinfo.ro/probleme/categorii/11/Siruri-de-caractere-prelucrari-elementare-pe-siruri-de-caractere)
* [Funcții predefinite cu șiruri de caractere - pbinfo](https://www.pbinfo.ro/probleme/categorii/23/Siruri-de-caractere-functii-predefinite-cu-siruri-de-caractere)
* [Probleme diverse - pbinfo](https://www.pbinfo.ro/probleme/categorii/84/Siruri-de-caractere-probleme-diverse)
* [Probleme cu stringuri de pe kilonova](https://kilonova.ro/tags/303)

## Resurse suplimentare

* [Operații specifice datelor de tip char - CPPI Sync](https://cppi.sync.ro/materia/operatii_specifice_datelor_de_tip_char.html)
* [Șiruri de caractere, citire, parcurgeri - CPPI Sync](https://cppi.sync.ro/materia/siruri_de_caractere_citire_parcurgeri.html)
* [Șiruri de caractere C++ - pbinfo](https://www.pbinfo.ro/articole/19/siruri-de-caractere-in-cpp)
* [Stringuri - Infogym](https://events.info.uaic.ro/infogim/2017/lectii/78/783_stringuri.pdf)
* [Siruri de caractere în C++ - infoscience 3x](http://infoscience.3x.ro/c++/siruridecaractere.htm)