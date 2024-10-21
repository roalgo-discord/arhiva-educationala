---
tags:
    - biti
    - matematica
---

**Autori**: Ștefan-Cosmin Dăscălescu

În informatică și în programare, bitul reprezintă unitatea de bază pentru stocarea informațiilor în memorie. Orice activitate desfășurată folosind un sistem de calcul (inclusiv articolul pe care îl citiți acum) are la bază o înșiruire de biți folosiți pentru a reda informația sub o formă accesibilă pentru oameni. 

Din acest considerent, biții au ajuns să fie studiați în mod amănunțit, iar în cele ce urmează, vom prezenta sistemul binar, operațiile pe biți și diverse proprietăți, observații și tehnici pe care le putem folosi pentru a rezolva probleme de algoritmică, dar și modurile în care putem integra cunoștințele drept pași intermediari pentru rezolvarea altor probleme de algoritmică. 



## Sistemul binar

De-a lungul acestui articol, vom lucra cu numere reprezentate în formă binară (în baza $2$), deci formate din cifre de $0$ și de $1$. De exemplu, dacă vrem să scriem numărul $27$ în binar, reprezentarea acestuia va fi:

$$27_{(10)} = 00011011_{(2)} = 0 \cdot 2^7 + 0 \cdot 2^6 + 0 \cdot 2^5 + 1 \cdot 2^4 + 1 \cdot 2^3 + 0 \cdot 2^2 + 1 \cdot 2^1 + 1 \cdot 2^0$$

Deși de obicei nu lucrăm cu zerourile nesemnificative, în acest caz ele au fost prezentate pentru înțelegerea conceptului, precum și datorită faptului că așa cum ar trebui cunoscut deja, tipurile de date din limbajele C/C++ (și alte limbaje) au un număr de biți clar definit (de exemplu, `int` este un tip de date pe $32$ de biți, `char` este un tip de date pe $8$ biți ș.a.m.d.).

## Legătura dintre o bază oarecare și baza $10$

În cele ce urmează, prezentăm algoritmul de transformare a unui număr din baza $10$ în baza $k$ și invers. Remarcăm faptul că acest algoritm funcționează indiferent de baza de la care plecăm, atâta timp cât baza $10$ este parte din calculele noastre. 

!!! note "Observație"
    În general, dacă vrem să transformăm din baza $a$ în baza $b$, un algoritm foarte ușor de implementat va fi să transformăm mai întâi din baza $a$ în baza $10$, iar mai apoi să transformăm din baza $10$ în baza $b$. 

### Transformarea unui număr din baza $10$ în baza $k$.

Pentru a transforma un număr din baza $10$ în baza $k$, vom împărți repetat numărul la $k$, până când numărul va deveni $0$, iar resturile împărțirilor pe care le obținem vor crea numărul în baza $k$, în ordine inversă. 

!!! example "Exemplu"
    De exemplu, dacă vrem să convertim numărul $46$ în baza $2$, vom obține următoarele câturi și resturi.

    * $n = 46$, $\frac{46}{2} = 23$, restul $0$.
    * $n = 23$, $\frac{23}{2} = 11$, restul $1$.
    * $n = 11$, $\frac{11}{2} = 5$, restul $1$.
    * $n = 5$, $\frac{5}{2} = 2$, restul $1$.
    * $n = 2$, $\frac{2}{2} = 1$, restul $0$.
    * $n = 1$, $\frac{1}{2} = 0$, restul $1$.

    Dacă luăm resturile împărțirilor la $2$ în ordine inversă, obținem $101110$, număr care se poate verifica că ne va returna $n = 46$ daca îl convertim în baza $10$. 

Mai jos puteți găsi o scurtă implementare în limbajul C++.

```cpp
int n, k; // transformam n in baza k
cin >> n >> k;
int nrcif = 0, v[32]; // cifrele in baza k

// obtinem cifrele, una cate una
while (n > 0) {
    int c = n%k;
    nrcif++;
    v[nrcif] = c;
    n /= k;
}

// pentru a le afisa, le vom afisa invers
for (int i = nrcif; i >= 1; i--) {
    cout << v[i];
}
cout << '\n';
```

### Transformarea unui număr din baza $k$ în baza $10$.

Pentru a transforma un număr din baza $k$ în baza $10$, vom lua cifrele numărului, de la dreapta la stânga, și vom adăuga la răspunsul nostru $cif \cdot k^i$, unde $cif$ este cifra curentă, $k$ este baza de la care plecăm și $i$ este numărul pasului la care suntem. 

!!! example "Exemplu"
    De exemplu, dacă vrem să convertim numărul $10110$ în baza $10$, vom avea următoarele cifre:

    * poziția $0$: cifra este $0$, se adună $0$ la numărul în baza $10$.
    * poziția $1$: cifra este $1$, se adună $2^1$ la numărul în baza $10$.
    * poziția $2$: cifra este $1$, se adună $2^2$ la numărul în baza $10$.
    * poziția $3$: cifra este $0$, se adună $0$ la numărul în baza $10$.
    * poziția $4$: cifra este $1$, se adună $2^4$ la numărul în baza $10$.

    Adunate, aceste puteri ne vor da $22$, acesta fiind numărul in baza $10$. 


Mai jos puteți găsi o scurtă implementare în limbajul C++.

```cpp
int n, k; // transformam n in baza 10, vom presupune ca se da numarul n drept un numar zecimal dar cu cifre mai mici decat k
cin >> n >> k;
int nrcif = 0, v[32]; // cifrele in baza k

// obtinem cifrele, una cate una
while (n > 0) {
    int c = n%10;
    nrcif++;
    v[nrcif] = c;
    n /= k;
}

// pentru a le afisa, le vom afisa invers
int putere = 1;
int zecimal = 0; // numarul convertit in baza 10
for (int i = 1; i <= nrcif; i++) {
    zecimal += putere * v[i]; // adunam cifra inmultita cu puterea lui k
    putere *= k; // la fiecare pas, crestem exponentul cu 1, inmultind cu k
}
cout << zecimal << '\n';
```

## Operații pe biți 

Pe lângă operațiile specifice lucrului cu diverse baze de numerație, putem lucra cu biți folosind operațiile consacrate pe biți, care ne vor permite să folosim eficiența lucrului cu biți la maxim. Pentru a efectua aceste operații, va trebui să știm ce operatori putem folosi. O bună parte din cunoștinte se vor lega de sintaxa învățată anterior, în special cele referitoare la operatorii logici. 

În contextul algoritmic, putem vorbi de următorii operatori:

### Operatorul AND ("și" pe biți)

Acest operator ia drept parametri două numere $a$ și $b$ și calculează pentru fiecare bit rezultatul operației logice AND. Cu alte cuvinte, pentru o poziție $i$, dacă ambii biți de pe poziția $i$ din $a$ și $b$ sunt egali cu $1$, operația AND va returna $1$ pentru acea poziție. Altfel, va returna $0$. Mai jos puteți găsi un tabel de adevăr a acestei operații, notată în limbajele C/C++ cu `&`:

|&|$0$|$1$|
|-|-|--------|
|$0$|$0$|$0$|
|$1$|$0$|$1$|

!!! example "Exemplu"
    De exemplu, dacă aplicăm operația pentru $12$ și $23$, reprezentările lor binare sunt $01100$, respectiv $10111$ (am pus un zero nesemnificativ în fața lui $12$ pentru a ne asigura că numerele au același număr de biți), rezultatul operației AND este $4$, deoarece bitul de pe poziția $2$ este singurul bit egal cu $1$ în ambele numere. 

### Operatorul OR ("sau" pe biți)

Acest operator ia drept parametri două numere $a$ și $b$ și calculează pentru fiecare bit rezultatul operației logice OR. Cu alte cuvinte, pentru o poziție $i$, dacă cel puțin unul din biții de pe poziția $i$ din $a$ și $b$ sunt egali cu $1$, operația OR va returna $1$ pentru acea poziție. Altfel, va returna $0$. Mai jos puteți găsi un tabel de adevăr a acestei operații, notată în limbajele C/C++ cu `|`:

|\||$0$|$1$|
|-|-|--------|
|$0$|$0$|$1$|
|$1$|$1$|$1$|

!!! example "Exemplu"
    De exemplu, dacă aplicăm operația pentru $12$ și $19$, reprezentările lor binare sunt $01100$, respectiv $10011$ (am pus un zero nesemnificativ în fața lui $12$ pentru a ne asigura că numerele au același număr de biți), rezultatul operației OR este $27$, deoarece fiecare din cei $5$ biți apare în măcar unul din numerele date, cu excepția bitului $2$.  

### Operatorul XOR ("sau exclusiv" pe biți)

Acest operator ia drept parametri două numere $a$ și $b$ și calculează pentru fiecare bit rezultatul operației logice XOR. Cu alte cuvinte, pentru o poziție $i$, dacă exact unul din biții de pe poziția $i$ din $a$ și $b$ sunt egali cu $1$, operația XOR va returna $1$ pentru acea poziție. Altfel, va returna $0$. Mai jos puteți găsi un tabel de adevăr a acestei operații, notată în limbajele C/C++ cu `^`:

|^|$0$|$1$|
|-|-|--------|
|$0$|$0$|$1$|
|$1$|$1$|$0$|

!!! example "Exemplu"
    De exemplu, dacă aplicăm operația pentru $12$ și $22$, reprezentările lor binare sunt $01100$, respectiv $10110$ (am pus un zero nesemnificativ în fața lui $12$ pentru a ne asigura că numerele au același număr de biți), rezultatul operației XOR este $26$, deoarece bitul de pe poziția $2$ este singurul bit egal cu $1$ în ambele numere, iar ceilalți biți apar o singură dată, cu excepția bitului $0$, care nu este fixat în niciunul dintre numere. 

### Shiftarea pe biți

Un alt operator care este folosit în foarte multe contexte este shiftarea pe biți, atât la stânga, cât și la dreapta. Operatorul este folosit atunci când vrem să înmulțim sau să împărțim un număr cu o putere a lui $2$, lucru ce ne poate fi foarte folositor atunci când vrem să aflăm valoarea unui bit anume, să inițializăm o valoare minimă sau maximă, precum și în multe alte cazuri similare. 

Shiftarea la stânga, notată cu `<<` este folosită atunci când vrem să înmulțim un număr cu o putere a lui $2$. Modul de folosire al acestui operator este `a<<b`, care are semnificația că înmulțim $a$ cu $2^b$. 

!!! note "Observație"
    În mod particular, `1<<x` ne va returna în timp constant $2^x$, iar pentru puterile lui $2$ mai mari de $30$, se impune folosirea notației `1LL<<x`, pentru a ne asigura că lucrăm în spațiul numerelor din tipul de date long long. 

Shiftarea la dreapta, notată cu `>>` este folosită atunci când vrem să împărțim un număr cu o putere a lui $2$. Modul de folosire al acestui operator este `a>>b`, care are semnificația că împărțim $a$ cu $2^b$. 

## Proprietăți, aplicații și legături între operații pe biți

Atunci când vine vorba de operații pe biți, există diverse legături, proprietăți și trucuri pe care le putem folosi pentru a ajunge să rezolvăm mai ușor anumite probleme. Aici voi menționa cele mai frecvent întâlnite asemenea proprietăți, precizând pentru fiecare dintre ele utilitatea ei. 

!!! note "Observație"
    Înainte de toate, vrem să reamintim faptul că $2^i > \sum_{x=0}^{i-1} 2^x$, deci cu alte cuvinte, dacă vom avea de făcut o alegere între o putere a lui $2$ și unele puteri mai mici ale lui $2$, alegerea unei puteri mai mari ne va garanta un răspuns optim, chiar dacă am putea alege ulterior o serie de puteri ale lui $2$.

!!! note "Observație"
    Un alt aspect important, care va fi folosit în majoritatea problemelor ce țin de operații pe biți este acela că putem trata biții de pe poziții diferite în mod independent, fără a afecta corectitudinea soluției găsite. 

!!! info "Legătura dintre suma numerelor, AND și XOR"
    Pentru oricare două valori $a$ și $b$ mai mari sau egale cu $0$, $a + b = 2 \cdot (a \& b) + (a \oplus b)$.
    
    Această proprietate se poate demonstra ușor folosind independența biților și evaluând expresia pentru toate modurile în care putem asigna valori biților.

!!! info "Mici verificări cu impact major"
    * Pentru a verifica dacă $n$ este o putere a lui $2$, este îndeajuns să verificăm valoarea expresiei $n \ \& \ (n-1)$. Dacă aceasta este $0$, înseamnă că $n$ și $n-1$ nu au biți în comun, iar singurul caz în care acest lucru se poate întâmpla este dacă $n$ este putere a lui $2$ (reprezentarea binară a lui $n$ ar fi $100 \dots 0$, iar cea a lui $n-1$ ar fi $011 \dots 1$.)
    * Pentru a verifica dacă pentru o valoare $n$, bitul de pe poziția $x$ este setat, este îndeajuns să aflăm dacă rezultatul expresiei $(n \ \& \ (1<<x)) \neq 0$. Deoarece $2^x$ este o putere a lui $2$, singurul mod în care expresia ar fi nenulă este când bitul de pe poziția $x$ este setat în $n$.
    * Pentru a afla valoarea celui mai nesemnificativ bit, este îndeajuns să folosim operația $x \ \& \ (-x)$, motivul pentru care această operație funcționează este acela că în cazul lui $-x$, biții vor fi inversați, cu excepția ultimului bit, care va rămâne la fel, datorită modului în care sunt dispuse în memorie numerele negative (bitul de semn va fi mereu setat în cazul lor).

## Lucrul cu submulțimi 

Așa cum veți vedea în detaliu dacă veți citi articolul specific combinatoricii, lucrul cu submulțimi va reprezenta o aplicație importantă a lucrului cu biți, cele $2^n$ submulțimi ale unei mulțimi cu dimensiunea $n$ putând fi toate codificate folosind câte un număr în intervalul $[0, 2^n - 1]$.

Pentru mai multe detalii, puteți citi [aici](./intro-combinatorics.md#submultimi) articolul nostru care privește în detaliu submulțimile din perspectiva combinatoricii. Totuși, aplicațiile prezentate acolo se aplică în totalitate și din perspectiva articolului curent.

!!! note "Lectură suplimentară"
    Alternativ, puteți citi mai multe detalii de pe articolul de pe [cp-algorithms](https://cp-algorithms.com/algebra/all-submasks.html) despre enumerarea submulțimilor.

## Probleme suplimentare

* [morse ONI 2006](https://kilonova.ro/problems/1242)
* [intervale RoAlgo Contest #3](https://kilonova.ro/problems/692)
* [Bit Showdown RoAlgo Contest #9](https://kilonova.ro/problems/2249)
* [patratele OJI 2022](https://kilonova.ro/problems/944)
* [Matmare RoAlgo PreOJI 2024](https://kilonova.ro/problems/2418)
* [Searching for Soulmates USACO](https://usaco.org/index.php?page=viewproblem2&cpid=1182)
* [Powered Addition](https://codeforces.com/contest/1338/problem/A)
* [Data Structures Fan](https://codeforces.com/contest/1872/problem/E)
* [castel OJI 2018](https://kilonova.ro/problems/900)
* [Sheikh (Easy version)](https://codeforces.com/problemset/problem/1732/C1)
* [Three Days Ago](https://atcoder.jp/contests/abc295/tasks/abc295_d)
* [Preparing Olympiad](https://codeforces.com/problemset/problem/550/B)
* [Petr and a Combination Lock](https://codeforces.com/problemset/problem/1097/B)
* [CSES Xor Pyramid](https://www.cses.fi/problemset/task/2419)
* [Probleme cu operații pe biți de pe kilonova](https://kilonova.ro/tags/439)
* [Probleme cu operații pe biți de pe codeforces](https://codeforces.com/problemset?tags=bitmasks)


## Lectură suplimentară 

* [Articol de pe USACO Guide](https://usaco.guide/silver/intro-bitwise?lang=cpp)
* [Bitwise operations for beginners](https://codeforces.com/blog/entry/73490)
* [Bitwise operations for beginners, part 2](https://codeforces.com/blog/entry/73558)
* [Operații pe biți - Infoarena](https://infoarena.ro/operatii-pe-biti)
* [Operații pe biți - CPPI Sync](https://cppi.sync.ro/materia/operatii_cu_biti.html)
* [Operații pe biți - Dan Pracsiu](https://www.dponline.ro/articol.php?idarticol=81)
* [Bit Manipulation - cp-algorithms](https://cp-algorithms.com/algebra/bit-manipulation.html)
* [Curs lot juniori 2015](https://www.infobits.ro/docs/operatii_pe_biti_junior_2015.pdf)
* [Easy explanation about Bitwise operations [Tutorial]](https://codeforces.com/blog/entry/104705)
