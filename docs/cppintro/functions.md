---
tags:
    - C++
    - functii
    - implementare
    - recursivitate
---

**Autor**: Ștefan-Cosmin Dăscălescu

## Introducere

Atunci când scrieți un program în orice limbaj de programare, există situații în care sunteți nevoiți să executați anumite tipuri de operații de mai multe ori. Pentru a evita scrierea acestor secvențe de un număr mare de ori, se impune folosirea unor secvențe de cod pe care să le putem refolosi. Acestea vor fi ceea ce numim în limbajul C++ funcții sau subprograme.

!!! info "Funcție" 
    O funcție sau un subprogram reprezintă o secvență de cod care poate fi apelată de utilizator pentru a fi executată de mai multe ori, fără a fi nevoie să rescriem acel cod. Aceasta poate fi apelată fie din programul principal, fie dintr-o altă funcție. 

În limbajul C++, avem atât funcții de sistem (deja cunoscute de biblioteci) și funcții definite de utilizator. 

## Funcții de sistem 

Chiar dacă acest articol nu se va concentra pe funcțiile de sistem, cel mai probabil ați folosit până acum aceste funcții pentru a afla valorile diverselor funcții. 

Un astfel de exemplu este funcția $sqrt(x)$, care ne ajută să aflăm valoarea lui $\sqrt n$, funcție ce se regăsește în biblioteca `#include <cmath>`. În mod similar, probabil ați folosit până acum funcția `std::sort`, funcție ce se regăsește în biblioteca `#include <algorithm>`, iar exemplele pot continua. 

Deși nu trebuie să rescriem aceste funcții, acestea se bazează pe același principiu (refolosirea unor coduri deja scrise), singura diferență fiind aceea că codul din spatele acestor funcții face deja parte din standardul bibliotecilor și nu trebuie reprodus. 

## Avantajele folosirii funcțiilor 

Deoarece putem refolosi codul scris de noi, acestea se dovedesc a fi un instrument foarte bun în privința reducerii cantității de cod scrisă. Acest lucru ne ajută și atunci când facem debugging, deoarece dacă avem o funcție greșită, trebuie să schimbăm lucruri într-un singur loc în loc să trebuiască să schimbăm în mai multe locuri. 

Funcțiile pot fi scrise în mai multe moduri, dar mai întâi ne vom concentra pe părțile componente ale unei funcții și sintaxa ei. Pe parcurs, vom folosi diverse exemple care să ilustreze diversele moduri în care putem scrie o funcție care face același lucru. 

Pe lângă avantajele evidente pe care cunoașterea funcțiilor le oferă, acestea reprezintă și un capitol fundamental în studiul limbajului C++ și a multor algoritmi, fiind necesare pentru înțelegerea multor algoritmi și metode de programare. 

## Părțile componente ale unei funcții

În general, o funcție are următorul șablon:

```
tip nume (tip_1 nume_1, tip_2 nume_2, ..., tip_k nume_k) {
    // instructiuni
}
```

Mai întâi, avem antetul funcției, format din următoarele componente:

* tip reprezintă tipul de date al valorii întoarse de funcție (poate fi oricare tip de date cunoscut, inclusiv containere din STL), iar numele funcției este unul dat de utilizator, regulile privind numirea funcției sunt aceleași cu cele de la numirea variabilelor. 

!!! note "Observație"
    În mod particular, limbajul C++ conține și tipul void, care este în esență un tip gol (funcția nu returnează nimic). 

* `tip_1 nume_1`, `tip_2 nume_2` $\dots$ `tip_k nume_k` sunt parametrii pe care funcția îi primește de unde a fost apelată. 

!!! note "Observație"
    Parametrii nu sunt obligatorii pentru funcții, dar prezența lor face de regulă lucrurile mai ușoare pentru utilizator. 

Apoi, avem instrucțiunile specifice funcției, care pot fi scrise în același mod în care ați scris oricare alt program C++ până acum, atâta timp cât respectă regulile de sintaxă și compilare ale limbajului. 

În cele din urmă, dacă funcția trebuie să returneze o valoare, trebuie să o facă (dacă funcția are un tip non-void și nu se returnează nicio valoare, de regulă primiți warning la compilare și în cele mai multe cazuri, comportamentul programului rămâne la mâna compilatorului - _undefined behavior_).

!!! note "Observație"
    În momentul în care scriem o instrucțiune de tip _return_, funcția se va opri și în cazul funcțiilor non-void, va returna valoarea dată. Acest lucru este echivalent cu instrucțiunea _return 0_ din programul principal. 

## Utilizarea funcțiilor 

În general, pentru a putea folosi o funcție, trebuie scrisă deasupra blocului de cod unde va fi folosită. De exemplu, primul cod de mai jos este corect, iar cel de-al doilea este greșit. 

Cod corect

```cpp
#include <iostream>
using namespace std;

long long sum_div (int x) {
    long long ans = 0;
    for (int i = 1; i * i <= x; i++) {
        if (x % i == 0) {
            ans += i;
            if (i * i != x) {
                ans += x/i;
            }
        }
    }
    return ans;
}

int main() {
    int n;
    cin >> n;
    
    cout << sum_div(n) << '\n';
    return 0;
}
```

Cod greșit 

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    cout << sum_div(n) << '\n';
    return 0;
}

long long sum_div (int x) {
    long long ans = 0;
    for (int i = 1; i * i <= x; i++) {
        if (x % i == 0) {
            ans += i;
            if (i * i != x) {
                ans += x/i;
            }
        }
    }
    return ans;
}
```

Totuși, limbajul C++ permite și scrierea funcțiilor sub programul principal, cu condiția ca antetele să fie scrise deasupra funcției main. Codul de mai jos poate fi modificat astfel:

```cpp
#include <iostream>
using namespace std;

long long sum_div (int x);

int main() {
    int n;
    cin >> n;
    
    cout << sum_div(n) << '\n';
    return 0;
}

long long sum_div (int x) {
    long long ans = 0;
    for (int i = 1; i * i <= x; i++) {
        if (x % i == 0) {
            ans += i;
            if (i * i != x) {
                ans += x/i;
            }
        }
    }
    return ans;
}
```

## Clasificarea funcțiilor după valorile pe care le întorc

În funcție de ce valori ne întoarce funcția, acestea sunt de două feluri:

### Funcții care returnează o valoare (sau mai multe)

Cele mai multe funcții scrise sunt de acest tip, ele practic preiau valori și cu ajutorul codului scris în ele, returnează una sau mai multe valori. 

De exemplu, aici avem o funcție care primește un număr ca parametru și întoarce suma divizorilor numărului dat. 

!!! note "Observație"
    Variabilele declarate în funcții sunt locale, iar prezența lor acolo nu influențează în niciun fel ce se întâmplă în programul principal (excepția fiind valorile întoarse, care vor fi folosite ulterior acolo). De asemenea, declararea unei variabile cu același nume nu va avea niciun impact în programul principal sau în alte funcții.

```cpp
int sum_div (int x) {
    int ans = 0;
    for (int i = 1; i * i <= x; i++) {
        if (x % i == 0) {
            ans += i;
            if (i * i != x) {
                ans += x/i;
            }
        }
    }
    return ans;
}
```

### Funcții care nu returnează nimic

În limbajul C++, o funcție care nu returnează nimic are întotdeauna tipul void. Acestea sunt frecvent utilizate atunci când avem nevoie să efectuăm anumite operații în mod recursiv (vom explica ulterior acest concept) dar și atunci când vrem să modificăm anumite variabile pe care le utilizăm ulterior în program. 

De exemplu, putem scrie o funcție care să afle suma cifrelor unui număr, iar rezultatul să fie ținut fie cu ajutorul unei variabile globale, fie cu ajutorul unei variabile care va prelua rezultatul prin referință. 

### Funcții care întorc valori prin parametri

Aceste funcții sunt de regulă de tipul void, iar singura diferență față de celelalte tipuri de funcții este acela că în loc să returneze valorile direct, se folosesc de variabile auxiliare care de regulă sunt declarate altundeva, iar modificarea lor duce la modificări în adresa de memorie în care au fost declarate (cu alte cuvinte, dacă modificăm ceva la ele, se va modifica și în funcția/programul în care au fost declarate).

Notația prin referință este `&nume`, unde & este folosit pentru a sugera faptul că adresa de memorie în care modificăm este aceeași cu cea din programul principal.

!!! note "Observație"
    În cazul folosirii parametrilor, inițializarea variabilelor este obligatorie, pentru a preveni erori ce apar din cauza neinițializării acestor valori.

Mai jos găsiți implementarea funcției pentru suma cifrelor unui număr folosind această metodă. 

```cpp
void sum_cif (int n, int &s) {
    s = 0; 
    while (n > 0) {
        s = s + n % 10;
        n = n / 10;
    }
}
```

### Funcții care folosesc variabile auxiliare

Aceste funcții, așa cum le zice și numele, se folosesc de variabile declarate de regulă global pentru a ține răspunsul. Deși nu sunt foarte des folosite, pot fi utile în cazul în care avem nevoie să păstrăm valoarea unor răspunsuri care sunt generate ca rezultat al unirii mai multor funcții (un exemplu ar fi anumite implementări ale unor structuri de date mai avansate).

Mai jos găsiți implementarea funcției pentru suma cifrelor unui număr folosind această metodă. 

```cpp
int s = 0;
void sum_cif (int n) {
    while (n > 0) {
        s = s + n % 10;
        n = n / 10;
    }
}
```

## Funcții iterative

O funcție iterativă este o funcție care execută codul pe care îl are asignat, fără a fi nevoie să apeleze alte instanțe ale aceleiași funcții (nu se va apela pe ea însăși). Funcțiile scrise până acum în acest articol sunt toate iterative. 

Aici puteți vedea o funcție în care aflăm suma cifrelor a unui număr $n$ folosind o funcție iterativă. 

```cpp
int sumcif (int n) {
    int ans = 0;
    while (n > 0) {
        ans += n%10;
        n = n / 10;
    }
    return ans;
}
```

În general, funcțiile iterative tind să fie mai rapide decât cele recursive și sunt de preferat atunci când putem implementa un program folosind ambele metode.

## Funcții recursive

Spre deosebire de funcțiile iterative, cele recursive se pot auto-apela și acest lucru poate fi foarte folositor atunci când avem nevoie să aflăm răspunsul folosind o instanță mai simplă a funcției curente. 

O funcție recursivă are la bază folosirea memoriei din stack, apelurile succesive ale funcției sunt memorate acolo pentru a fi executate în ordinea inversă în care sunt efectuate.

!!! note "Cazurile de bază"
    Pe lângă instrucțiunile obișnuite oricărei funcții, o funcție recursivă are și unul sau mai multe cazuri de bază, care sunt obligatorii pentru a evita apelarea la infinit a aceleiași funcții. 

Astfel, pentru fiecare apel al unei funcții se adaugă pe stivă o zonă de memorie în care se memorează variabilele locale și parametrii pentru apelul curent. Această zonă a stivei va exista până la finalul apelului, după care se va elibera. Dacă din apelul curent se face un alt apel, se adaugă pe stivă o nouă zonă de memorie, iar conținutul zonei anterioare este inaccesibil până la finalul acelui apel. Aceste operații se fac la fel și dacă al doilea apel este un autoapel al unei funcții recursive.

Aici puteți vedea cum aflăm în mod recursiv valoarea lui $n!$ folosind o funcție recursivă. 

```cpp
int factorial (int n) {
    if (n <= 1) {
        return n;
    }
    return factorial(n-1) * n;
}
```

Se poate observa faptul că ne folosim de definiția lui $n!$, iar pentru a afla $n!$, avem nevoie de $(n-1)!$ și așa mai departe. Dacă vrem să calculăm valoarea lui $5!$, aceasta se obține în felul următor:

* $factorial(5)$: răspunsul devine $factorial(4) \cdot 5$
* $factorial(4)$: răspunsul devine $factorial(3) \cdot 4$
* $factorial(3)$: răspunsul devine $factorial(2) \cdot 3$
* $factorial(2)$: răspunsul devine $factorial(1) \cdot 2$
* $factorial(1)$: caz de bază, răspunsul devine $1$

Pentru a calcula $n!$, trebuie să aflăm toate factorialele până la $1!$, iar mai apoi folosim aceste rezultate invers pentru a primi răspunsul în valoarea cerută. 

Acest mod de a scrie funcțiile este foarte folosit în multe tipuri de aplicații, cum ar fi metoda divide et impera, programarea dinamică, teoria grafurilor ș.a.m.d. 

## Exerciții rezolvate

De multe ori, mai ales în variantele de bacalaureat și cele de admitere, se regăsesc exerciții în care evaluăm rezultatele pe care le obțin anumite funcții, iar în mare parte din cazuri, aceste funcții sunt recursive. 

Pentru a evalua aceste funcții, recomandăm citirea codului cu atenție și notarea apelurilor de funcție în ordinea în care apar, ținând cont de locul în funcție unde apelurile următoare au loc. 

### Exercițiu bacalaureat - Care este valoarea lui $f(38)$?

```cpp
void f (int x) {
    if (x) {
        if (x % 3 == 0) {
            cout << 3;
            f(x/3);
        }
        else {
            f(x/3);
            cout << x%3;
        }
    }
}
```

* $f(38)$ - $38 \% 3 = 2$, deci intrăm în else și apelăm $f(12)$.
* $f(12)$ - $12 \% 3 = 0$, deci intrăm în if, **afișăm $3$** și apelăm $f(4)$.
* $f(4)$ - $4 \% 3 = 1$, deci intrăm în else și apelăm $f(1)$.
* $f(1)$ - $1 \% 3 = 1$, deci intrăm în else și apelăm $f(0)$.
* $f(0)$ - $x$ este $0$, deci nu se mai intră nicăieri în funcție și ne întoarcem la apelurile anterioare.
* $f(1)$ - după apelul lui $f(0)$, **afișăm $1 \% 3 = 1$**.
* $f(4)$ - după apelul lui $f(1)$, **afișăm $4 \% 3 = 1$**.
* $f(12)$ - după apelul lui $f(4)$, se termină acea secvență.
* $f(38)$ - după apelul lui $f(12)$, **afișăm $38 \% 3 = 2$**.

Astfel, am afișat $3112$.

### Exercițiu admitere - Care este valoarea lui $g(2, 1)$?

```cpp
int g(int x, int y) {
    if (x > 0) {
        if (y == 0) {
            return g(x - 1, 1);
        }
        if (y > 0) {
            return g(x - 1, g(x, y - 1));
        }
    }
    return y + 1;
}
```

* $g(2, 1)$ - $x > 0$, $y > 0$ $\rightarrow$ se va returna $g(1, g(2, 0))$.
* $g(2, 0)$ - $x > 0$, $y = 0$ $\rightarrow$ se va returna $g(1, 1)$.
* $g(1, 1)$ - $x > 0$, $y > 0$ $\rightarrow$ se va returna $g(0, g(1, 0))$.
* $g(1, 0)$ - $x > 0$, $y = 0$ $\rightarrow$ se va returna $g(0, 1)$.
* $g(0, 1)$ - $x = 0$ $\rightarrow$ se va returna $1 + 1 = 2$, deci $g(1, 0) = 2$, deci $g(0, g(1, 0)) = g(0, 2)$ .
* $g(0, 2)$ - $x = 0$ $\rightarrow$ se va returna $2 + 1 = 3$, deci $g(1, 1) = g(2, 0) = 3$.
* Astfel, $g(1, g(2, 0)) = g(1, 3)$.
* $g(1, 3)$ - $x > 0$, $y > 0$ $\rightarrow$ se va returna $g(0, g(1, 2))$.
* $g(1, 2)$ - $x > 0$, $y > 0$ $\rightarrow$ se va returna $g(0, g(1, 1))$.
* Deja știm că $g(1, 1) = 3$, deci $g(0, 3) = g(1, 2) = 4$. Astfel, $g(0, 4) = g(1, 3) = 5$.

Cu alte cuvinte, valoarea lui $g(2, 1) = 5$.

!!! note "Calculul funcției"
    Se poate observa că pentru a calcula eficient și corect aceste valori, trebuie o grămadă de atenție și mult exercițiu în contextul examenelor de admitere și bacalaureat, lucru ce îl vom aborda în detaliu în capitolul specific acestor examene.

### Problemă rezolvată - [cifminrec de pe pbinfo](https://www.pbinfo.ro/probleme/825/cifminrec)

Pentru a rezolva această problemă, vom folosi principiul recursivității, bazându-ne pe faptul că $n$ este format din numărul format din cifrele lui cu excepția ultimei cifre ($n/10$) și ultima cifră $(n \% 10)$, lucru ce face implementarea recursivă a unei asemenea probleme mult mai ușoară. 

```cpp
int cifmin (int x) {
    if (x < 10) {
        return x;
    }
    int mini = cifmin(x/10);
    if (mini < x%10) {
        return mini;
    }
    return x%10;
}
```

## Alte tipuri de funcții 

### Funcții cu parametru implicit

Uneori, atunci când scriem funcții, avem anumite variabile care vor fi mereu inițializate cu aceeași valoare, ceea ce impune un tratament diferit în cadrul funcțiilor pe care le scriem. Astfel, se impune folosirea unor parametri impliciți, care să poată fi inițializate cu o anumită valoare în lipsa unei alte apelări. 

Aceste funcții se numesc funcții cu parametru implicit. 

Pentru a scrie o funcție cu parametri impliciți, trebuie să menționăm mai întâi parametrii obișnuiți, iar mai apoi, cei impliciți.

De exemplu, prima declarare este incorectă, dar cea de-a doua este corectă.

```cpp
int medie (int a = 0, int b) {
    // instructiuni    
}
```

```cpp
int medie (int b, int a = 0) {
    // instructiuni    
}
```


### Problema [div3 de pe pbinfo](https://www.pbinfo.ro/probleme/996/div3)

Pentru a explica această noțiune, am folosit o funcție care preia suma cifrelor drept parametru implicit și află recursiv suma cifrelor unui număr, folosind parametrul implicit care trebuie menționat acum.

Se remarcă faptul că atunci când apelăm această funcție din main, menționarea valorii parametrului $s$ nu este necesară. 

```cpp
#include <fstream>
using namespace std;

int suma_cifre (int n, int s = 0) {
    if (n < 10) {
        return s + n;
    }
    else {
        return suma_cifre (n/10, s+n%10);
    }
}

int main() {
    ifstream fin("div3.in");
    ofstream fout("div3.out");
    
    int n;
    fin >> n;
    
    for (int i = 1; i <= n; i++) {
        int x;
        fin >> x;
        
        if (suma_cifre(x) % 3 == 0) {
            fout << x << " ";
        }
    }
    return 0;
}
```

### (Opțional) Lambda functions  

!!! note "Funcțiile lambda"
    Cunoașterea acestora este opțională în contextul examenelor de bacalaureat și admitere, dar se recomandă înțelegerea lor în contextul claselor mai mari la olimpiadă. Totuși, acestea nu reprezintă un element care trebuie obligatoriu învățat.

Versiunile mai recente ale limbajului C++ permit utilizatorilor folosirea unor funcții pe stilul celor din limbajele funcționale. Acestea se numesc funcții lambda.

Vezi pagina dedicată [funcțiilor lambda](https://edu.roalgo.ro/cppintro/lambda/).

## Concluzii

Funcțiile programate de utilizator sunt unul din cele mai importante unelte pe care le poate folosi un utilizator, fiind concepute pentru a fi ușor de folosit și reutilizabile, astfel încât ne permit simplificarea semnificativă a programelor scrise. 

## Probleme suplimentare

* [sumciff pbinfo](https://www.pbinfo.ro/probleme/897/sumciff)
* [oglindit2 pbinfo](https://www.pbinfo.ro/probleme/24/oglindit2)
* [celmaimicnr pbinfo](https://www.pbinfo.ro/probleme/26/celmaimicnr)
* [zerof pbinfo](https://www.pbinfo.ro/probleme/1826/zerof)
* [sumciff pbinfo](https://www.pbinfo.ro/probleme/897/sumciff)
* [factorialrec pbinfo](https://www.pbinfo.ro/probleme/820/factorialrec)
* [cmmdcrec pbinfo](https://www.pbinfo.ro/probleme/821/cmmdcrec)
* [Manna - Pnueli pbinfo](https://www.pbinfo.ro/probleme/828/manna-pnueli)
* [cât mai multe probleme din acest capitol pentru subprograme iterative](https://www.pbinfo.ro/probleme/categorii/13/subprograme)
* [cât mai multe probleme din acest capitol pentru subprograme recursive](https://www.pbinfo.ro/probleme/categorii/81/recursivitate)

## Resurse suplimentare

* [Subprograme - pbinfo](https://www.pbinfo.ro/articole/3656/subprograme)
* [Recursivitate - pbinfo](https://www.pbinfo.ro/articole/3873/recursivitate)
* [Subprograme - CPPI Sync](https://cppi.sync.ro/materia/probleme_diverse_simple.html)
* [Recursivitate - CPPI Sync](https://cppi.sync.ro/materia/probleme_diverse_de_fixare_a_metodei.html)
* [Recursivitate cu mai multe autoapeluri - CPPI Sync](https://cppi.sync.ro/materia/recursivitate_cu_mai_multe_autoapeluri.html)
* [Material subprograme - CNI Tudor Vianu](http://www.lbi.ro/~carmen/vineri/Subprograme%20iterative(pdf)/Subprograme%20Cpp.pdf)
* [Functii in C/C++ - Algopedia](https://www.algopedia.ro/wiki/index.php/Clasa_a_VI-a_lec%C8%9Bia_37_-_29_mai_2019#Func%C8%9Bii_%C3%AEn_limbajul_C)
* [Functions - w3schools](https://www.w3schools.com/cpp/cpp_functions.asp#:~:text=A%20function%20is%20a%20block,and%20use%20it%20many%20times.)
