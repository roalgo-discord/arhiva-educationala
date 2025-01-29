---
tags:
    - C++
    - implementare
    - optimizare
    - siruri de caractere
toc_depth: 3
---

**Autori**: Ștefan-Cosmin Dăscălescu, Denisa-Maria Ursu, Ștefan-Iulian Alecu

!!! example "Cunoștințe necesare"
    - [Variabile și tipuri de date simple](https://edu.roalgo.ro/cppintro/data-types/)
    - [Vectori (tablouri unidimensionale)](https://edu.roalgo.ro/cppintro/arrays/)
    - [Matrici (tablouri bidimensionale)](https://edu.roalgo.ro/cppintro/matrices/)

## Introducere

Un șir de caractere este un tablou care stochează caractere. În limbajul C++,
putem stoca aceste șiruri în două moduri: fie folosind un tablou static, similar
limbajului C, fie folosind tipul de date `#!cpp std::string`. În acest articol,
vom analiza ambele opțiuni, incluzând avantajele și dezavantajele lor.

## Tipul `#!cpp char` și tabelul ASCII

Așa cum ați văzut când am discutat despre [tipurile de
date](https://edu.roalgo.ro/cppintro/data-types/), limbajul C++ dispune de tipul
de date `#!cpp char`, utilizat pentru a stoca caractere. Deși valorile stocate
într-un `#!cpp char` sunt în intervalul [-128, 127] (pentru reprezentări cu
semn), cele mai utilizate caractere sunt cele afișabile, care aparțin
intervalului [32, 127].

!!! note "Codificarea caracterelor"

    Standardul care atribuie valori caracterelor se numește ASCII (American
    Standard Code for Information Interchange). Caracterele din intervalul
    [0, 31] nu sunt afișabile, fiind utilizate pentru instrucțiuni de sistem.

Printre cele mai importante coduri ASCII sunt:

- **32** (spațiu)
- **48-57**: cifrele 0-9
- **65-90**: literele mari ale alfabetului englez (A-Z)
- **97-122**: literele mici ale alfabetului englez (a-z)

### Transformări între litere și cifre

Putem simplifica lucrul cu caractere folosind valorile ASCII, fără a gestiona
direct codurile. De exemplu:

- **Cifre**: Scădeți '0' din caracter.
- **Litere**: Adăugați sau scădeți 32 pentru a transforma între litere mari și
  mici.

```cpp
#include <iostream>
using namespace std;

int main() {
    char c = '5';
    cout << (int)c << '\n';          // 53 - ASCII pentru '5'
    cout << (int)(c - '0') << '\n';  // 5  - convertește caracterul '5' în număr

    c = 'P';
    cout << (int)c << '\n';          // 80 - ASCII pentru 'P'
    cout << (int)(c - 'A') << '\n';  // 15 - indexul 'P' în alfabet

    c += 32;                         // 'P' -> 'p'
    cout << (int)c << '\n';          // 112 - ASCII pentru 'p'
    cout << (int)(c - 'a') << '\n';  // 15  - indexul 'p' în alfabetul mic

    c = 'g';
    cout << (int)c << '\n';          // 103 - ASCII pentru 'g'
    cout << (int)(c - 'a') << '\n';  // 6   - indexul 'g' în alfabetul mic

    c -= 32;                         // 'g' -> 'G'
    cout << (int)c << '\n';          // 71  - ASCII pentru 'G'
    cout << (int)(c - 'A') << '\n';  // 6   - indexul 'G' în alfabetul mare

    c = 35;             // caracterul '#'
    cout << c << '\n';  // #

    c = 99;             // caracterul 'c'
    cout << c << '\n';  // c

    return 0;
}
```

Lista completă a codurilor pentru caractere se găsește
[aici](https://www.sciencebuddies.org/science-fair-projects/references/ascii-table).
Pentru conveniență, o voi reproduce aici:

<!-- markdownlint-disable MD038 -->

| Dec | Caracter | Dec | Caracter | Dec | Caracter | Dec | Caracter |
| --- | -------- | --- | -------- | --- | -------- | --- | -------- |
| 0   | NUL      | 32  | ` `      | 64  | @        | 96  | `        |
| 1   | SOH      | 33  | !        | 65  | A        | 97  | a        |
| 2   | STX      | 34  | "        | 66  | B        | 98  | b        |
| 3   | ETX      | 35  | #        | 67  | C        | 99  | c        |
| 4   | EOT      | 36  | $        | 68  | D        | 100 | d        |
| 5   | ENQ      | 37  | %        | 69  | E        | 101 | e        |
| 6   | ACK      | 38  | &        | 70  | F        | 102 | f        |
| 7   | BEL      | 39  | '        | 71  | G        | 103 | g        |
| 8   | BS       | 40  | (        | 72  | H        | 104 | h        |
| 9   | TAB      | 41  | )        | 73  | I        | 105 | i        |
| 10  | LF       | 42  | *        | 74  | J        | 106 | j        |
| 11  | VT       | 43  | +        | 75  | K        | 107 | k        |
| 12  | FF       | 44  | ,        | 76  | L        | 108 | l        |
| 13  | CR       | 45  | -        | 77  | M        | 109 | m        |
| 14  | SO       | 46  | .        | 78  | N        | 110 | n        |
| 15  | SI       | 47  | /        | 79  | O        | 111 | o        |
| 16  | DLE      | 48  | 0        | 80  | P        | 112 | p        |
| 17  | DC1      | 49  | 1        | 81  | Q        | 113 | q        |
| 18  | DC2      | 50  | 2        | 82  | R        | 114 | r        |
| 19  | DC3      | 51  | 3        | 83  | S        | 115 | s        |
| 20  | DC4      | 52  | 4        | 84  | T        | 116 | t        |
| 21  | NAK      | 53  | 5        | 85  | U        | 117 | u        |
| 22  | SYN      | 54  | 6        | 86  | V        | 118 | v        |
| 23  | ETB      | 55  | 7        | 87  | W        | 119 | w        |
| 24  | CAN      | 56  | 8        | 88  | X        | 120 | x        |
| 25  | EM       | 57  | 9        | 89  | Y        | 121 | y        |
| 26  | SUB      | 58  | :        | 90  | Z        | 122 | z        |
| 27  | ESC      | 59  | ;        | 91  | [        | 123 | {        |
| 28  | FS       | 60  | <        | 92  | \        | 124 | &#124;   |
| 29  | GS       | 61  | =        | 93  | ]        | 125 | }        |
| 30  | RS       | 62  | >        | 94  | ^        | 126 | ~        |
| 31  | US       | 63  | ?        | 95  | _        | 127 | DEL      |

## Funcții pe tipul `#!cpp char`

Biblioteca standard `#!cpp <cctype>` din C++ oferă un set de funcții predefinite
utile pentru verificarea proprietăților caracterelor individuale. Aceste funcții
simplifică validarea și manipularea stringurilor, fiind ideale pentru lucrul cu
date de tip text.

<!-- markdownlint-disable-file MD024 -->
### Funcția `#!cpp isdigit`

```cpp
int isdigit(int ch);
```

Verifică dacă un caracter anume este una din cele zece cifre zecimale:
(0123456789).

#### Parametri

- `#!cpp ch` - caracterul de clasificat

#### Valoare returnată

O valoare diferită de zero în cazul în care caracterul este un caracter numeric,
zero în caz contrar.

#### Exemplu

```c++
cout << isdigit('5') << '\n'; // 1
cout << isdigit('z') << '\n'; // 0
cout << isdigit('Q') << '\n'; // 0
cout << isdigit('.') << '\n'; // 0
```

### Funcția `#!cpp isalpha`

```cpp
int alpha(int ch);
```

Verifică dacă un caracter anume este alfabetic. Următoarele caractere sunt
considerate alfabetice:

- literele mari ABCDEFGHIJKLMNOPQRSTUVWXYZ
- literele mici abcdefghijklmnopqrstuvwxyz

#### Parametri

- `#!cpp ch` - caracterul de clasificat

#### Valoare returnată

O valoare diferită de zero în cazul în care caracterul este alfabetic, zero în
caz contrar.

#### Exemplu

```cpp
cout << isalpha('3') << '\n'; // 0
cout << isalpha('A') << '\n'; // 1
cout << isalpha('a') << '\n'; // 1
cout << isalpha('?') << '\n'; // 0
```

### Funcția `#!cpp isalnum`

```cpp
int isalnum(int ch);
```

Verifică dacă un caracter anume este alfanumeric. Următoarele caractere sunt
considerate alfanumerice:

- literele mari ABCDEFGHIJKLMNOPQRSTUVWXYZ
- literele mici abcdefghijklmnopqrstuvwxyz
- cifrele 0123456789

!!! note "Observație"
    `#!cpp isalnum(ch)` este echivalent cu `#!cpp isdigit(ch) && isalpha(ch)`.

#### Parametri

- `#!cpp ch` - caracterul de clasificat

#### Valoare returnată

O valoare diferită de zero în cazul în care caracterul este alfanumeric, zero în
caz contrar.

#### Exemplu

```cpp
cout << isalpha('3') << '\n'; // 0
cout << isalpha('A') << '\n'; // 1
cout << isalpha('a') << '\n'; // 1
cout << isalpha('?') << '\n'; // 0
```

### Funcțiile `#!cpp islower` și `#!cpp isupper`

```cpp
int islower(int ch);
int isupper(int ch);
```

Verifică dacă un caracter anume este clasificat ca fiind unul mic, respectiv
mare. Implicit, C consideră literele mari ca fiind ABCDEFGHIJKLMNOPQRSTUVWXYZ,
iar cele mici ca abcdefghijklmnopqrstuvwxyz.

#### Parametri

- `#!cpp ch` - caracterul de clasificat

#### Valoare returnată

O valoare diferită de zero în cazul în care caracterul este mic, respectiv mare,
zero în caz contrar.

#### Exemplu

```cpp
cout << isupper('3') << '\n'; // 0
cout << isupper('A') << '\n'; // 1
cout << islower('a') << '\n'; // 1
cout << islower('?') << '\n'; // 0
```

### Funcțiile `#!cpp tolower` și `#!cpp toupper`

```cpp
int toupper(int ch);
int tolower(int ch);
```

Convertește un caracter dat într-o literă mare, respectiv mică, respectiv mare.
C consideră literele mari ca fiind ABCDEFGHIJKLMNOPQRSTUVWXYZ, iar cele mici ca
abcdefghijklmnopqrstuvwxyz.

#### Parametri

- `#!cpp ch` - caracterul de convertit

#### Valoare returnată

Caracterul convertit sau `ch` dacă nu se poate efectua conversia.

#### Exemplu

```cpp
cout << (char)toupper('a') << '\n'; // A
cout << (char)toupper('A') << '\n'; // A
cout << (char)toupper('3') << '\n'; // 3
cout << (char)toupper('@') << '\n'; // @

cout << (char)tolower('a') << '\n'; // a
cout << (char)tolower('A') << '\n'; // a
cout << (char)tolower('3') << '\n'; // 3
cout << (char)tolower('@') << '\n'; // @
```

## Șiruri de caractere și biblioteca `#!cpp <cstring>`

Biblioteca `#!cpp <cstring>` oferă o suită de funcții utile pentru lucrul cu
șiruri de caractere în stilul C. Aceasta poate fi utilizată pentru manipularea
șirurilor de caractere (vectori de tip `#!cpp char`) prin funcții standardizate.

### Inițializarea șirurilor de caractere

Un șir de caractere poate fi inițializat în diferite moduri. Exemplele de mai
jos ilustrează câteva tehnici comune:

```cpp
#include <iostream>
using namespace std;

int main() {
    // Automat adaugă '\0' (caracterul nul).
    // Din acest motiv, lungimea lui `c` este dată de lungimea
    // șirului de caractere + 1, pentru '\0'.
    char nume[7] = "roalgo";
    cout << nume << '\n';

    // Creăm un vector de caractere manual. C++ poate determina
    // automat mărimea vectorului, deci nu este nevoie să îl
    // scriem.
    char caractere[] = {'r', 'o', 'a', 'l', 'g', 'o', '\0'};
    cout << caractere << '\n';

    // Putem atribui și un șir de caractere direct, ca la primul
    // exemplu.
    char adevar[] = "roalgo este cel mai bun server de informatica";
    cout << adevar << '\n';

    // Afișează 't'
    cout << adevar[9] << '\n';

    // Afișează 'roalgo'.
    for (int i = 0; i < 6; i++) {
        cout << adevar[i];
    }
    cout << '\n';
    return 0;
}
```

### Citirea șirurilor de caractere

În C++, există mai multe moduri de a citi șiruri de caractere, în funcție de ce
anume dorim să citim (un cuvânt, o linie completă sau un număr specificat de
caractere). Alegerea metodei de citire poate afecta rezultatul, în funcție de
modul în care sunt delimitate datele (spațiu, newline etc.).

Un șir de caractere poate fi citit în diverse moduri, fie la fel ca la vectori
(caracter cu caracter), fie putem citi toate valorile deodată, iar în funcție de
modul cum facem citirea, vom putea citi fie până la întâlnirea primului spațiu,
fie până la sfârșitul liniei.

De asemenea, se va putea observa faptul că putem citi o întreagă linie folosind
funcția getline și fixând numărul de caractere pe care vrem să-l citim.

Să presupunem că șirul de caractere este `roalgo este cel mai bun server de
informatica`. În funcție de cum citim acest șir, vom avea rezultate diferite.

Funcția `#!cpp cin.getline` are ca parametri șirul în care se va stoca
rezultatul citirii și numărul maxim de caractere permis, citind șirul până la
întâlnirea caracterului de newline, un exemplu ar fi `#!cpp cin.getline(s, x)`,
unde s este șirul dat și x este lungimea lui.

Citirea fără o funcție specifică se poate face cu cin, dar se va citi până la
primul spațiu.

Există și funcția `#!cpp cin.get()`, care poate fi folosit fie pentru un singur
caracter, fie pentru a citi $x$ caractere, dar de obicei vom avea nevoie să
citim o linie completă, deci funcția `#!cpp cin.getline()` devine mai utilă.

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    char s[100];
    cin >> s;

    cout << s << '\n';

    // Sare peste următorul caracter, de obicei spațiu sau newline.
    cin.get();

    // Citește cel mult 100 de caractere, până la newline,
    // dar sare și de acesta.
    cin.getline(s, 100);

    cout << s << '\n';
    return 0;
}
```

### Funcția strlen

Funcția strlen ia drept parametru un șir de caractere și returnează lungimea
acestuia.

```cpp
char message[] = "roalgo este cel mai bun server de informatica";
cout << strlen(message) << '\n'; // 45
```

### Funcția strcpy și strncpy

Funcția `strcpy` copiază un șir de caractere în alt șir, numit destinație.
Asemănător, funcția `strncpy` copiază doar primele n caractere dintr-un șir.
Aceste funcții nu adaugă caracterul `\0` la finalul șirului.

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

Funcția `strcat` concatenează un șir 'destinatie' cu o copie a unui șir 'sursa'.
Concatenarea a două șiruri înseamnă alipirea acestora. Funcția `strncat`
funcționează asemănător, numai că alipește doar primele n caractere ale șirului
sursă. Iată un exemplu:

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

Funcțiile `strchr` și `strrchr` returnează un pointer la prima apariție,
respectiv ultima apariție a unui caracter într-un șir. Mai exact se va afișa
șirul de începând cu prima, respectiv ultima apariție a caracterului.

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

Funcția `strcmp` este folosită pentru a compara două șiruri de caractere.
Aceasta poate returna 3 valori:

- `0` - dacă șirurile sunt exact la fel;
- `-1` sau o valoare mai mică decât 0 - dacă primul șir este înaintea celuilalt,
  alfabetic vorbind;
- `1` sau o valoare mai mare decât 0 - dacă primul șir este după celălalt,
  alfabetic vorbind.

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

Această funcție primește două șiruri de caractere, s1 și s2, ca argumente și
găsește prima apariție a șirului s2 în șirul s1.

```cpp
char str1[] = "abcdefghijklmnop";
char str2[] = "fgh";
cout << strstr(str1, str2); // se va afișa "fghijklmnop"
```

### Funcția strtok

Funcția `strtok` împarte `str[]` conform delimitatorilor dați și returnează
următorul token. Trebuie apelată într-o structură repetitivă pentru a obține
toate token-urile.

```cpp
char str[] = "wow-ce-multe-cuvinte-in-acest-sir";
char* token = strtok(str, " - ");
while (token != NULL) {
    cout << token << " "; // se va afișa "wow ce multe cuvinte in acest sir"
    token = strtok(NULL, " - ");
}
```

## Tipul de date std::string

Această structură de date este echivalentul std::vector pentru șirurile de
caractere, remarcându-se prin faptul că spre deosebire de șirurile de caractere
din C, funcția de aflare a lungimii este $O(1)$, în loc de $O(n)$. Tipul string
este unul din tipurile prezente în [STL](https://edu.roalgo.ro/cppintro/stl/),
foarte multe funcții fiind similare cu cele pe care le putem folosi cu vectori.

Pentru a putea folosi această structură de date, va trebui să includem
biblioteca `<string>`. Se remarcă faptul că există diferențe semnificative față
de cum folosim șirurile de caractere din C.

În ceea ce privește citirea, funcția getline va avea o sintaxă un pic diferită,
fiind scrisă astfel:

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

În mod particular, vom putea concatena două șiruri de caractere cu ușurință,
folosind operatorul `+`. Totuși, trebuie să fim atenți cum folosim acest
operator, pentru a evita efectuarea prea înceată a operațiilor.

```cpp
string s = "roalgo";
string t = "top";
s += t; // roalgotop
s = s + t; // roalgotoptop
```

Deși în cazul numerelor naturale, aceste operații sunt echivalente, în cazul
stringurilor, `+=` și `+` sunt complet diferite. Prima dintre ele concatenează
șirul primit la șirul existent, cea de-a doua copiază cele două șiruri, le
unește și apoi atribuie rezultatul șirului. Această diferență devine mai
dramatică în situații precum cea de mai jos.

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

Putem folosi și funcții specifice care caută prima sau ultima apariție a unui
anumit caracter în șir, precum find sau find_last_of, care au complexitate
liniară. Tipul returnat este size_t, dar acesta poate fi folosit și ca int.

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

Caracterele și șirurile de caractere sunt foarte folosite în multe aplicații,
fiind des întâlnite în probleme de toate dificultățile, în special la examenele
de bacalaureat și admitere, dar și în multe dintre problemele ce se dau la
olimpiada de informatică, în clasa a X-a și clasa a VIII-a.

Cunoașterea funcțiilor specifice este esențială deoarece foarte multe întrebări
grilă la admitere implică elemente mai dificile din sintaxa lor și orice detaliu
minor poate face diferența.

## Probleme suplimentare

- [Prelucrări elementare pe șiruri de caractere -
  pbinfo](https://www.pbinfo.ro/probleme/categorii/11/Siruri-de-caractere-prelucrari-elementare-pe-siruri-de-caractere)
- [Funcții predefinite cu șiruri de caractere -
  pbinfo](https://www.pbinfo.ro/probleme/categorii/23/Siruri-de-caractere-functii-predefinite-cu-siruri-de-caractere)
- [Probleme diverse -
  pbinfo](https://www.pbinfo.ro/probleme/categorii/84/Siruri-de-caractere-probleme-diverse)
- [Probleme cu stringuri de pe kilonova](https://kilonova.ro/tags/303)

## Resurse suplimentare

- [Clasificarea caracterelor -
  geeksforgeeks](https://www.geeksforgeeks.org/character-classification-c-cctype/)
- [Operații specifice datelor de tip char - CPPI
  Sync](https://cppi.sync.ro/materia/operatii_specifice_datelor_de_tip_char.html)
- [Șiruri de caractere, citire, parcurgeri - CPPI
  Sync](https://cppi.sync.ro/materia/siruri_de_caractere_citire_parcurgeri.html)
- [Șiruri de caractere C++ -
  pbinfo](https://www.pbinfo.ro/articole/19/siruri-de-caractere-in-cpp)
- [Stringuri -
  Infogym](https://events.info.uaic.ro/infogim/2017/lectii/78/783_stringuri.pdf)
- [Siruri de caractere în C++ - infoscience
  3x](http://infoscience.3x.ro/c++/siruridecaractere.htm)
