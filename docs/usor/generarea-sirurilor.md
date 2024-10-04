---
tags:
    - vectori
    - siruri
    - fibonacci
---

## Introducere

De multe ori în problemele de informatică, apar șiruri de numere naturale care trebuie fie știute, cum va fi cazul unor șiruri consacrate precum șirul lui Fibonacci sau alte șiruri matematice precum cel al pătratelor sau cuburilor perfecte.

Deși la acest nivel, cele mai frecvent întâlnite aplicații sunt cele în care trebuie generate șirurile sau descoperite diverse reguli, aceste tehnici sunt foarte importante și trebuie însușite deoarece reprezintă un punct de plecare în vederea multor tehnici ce apar ulterior, în special când veți ajunge să învățați algoritmi mai avansați care duc cunoștințele de aici la un alt nivel. 

## Șiruri recurente

În general, când vom vorbi de șiruri de numere, ne vom concentra mai ales pe cele ai căror termeni se leagă unii de alții prin intermediul unor formule sau relații de recurență. Aceste șiruri se numesc recurente.

!!! info "Ce este un șir de numere recurente?" 
    Un șir recurent este un șir de numere naturale ai căror termeni sunt legați prin intermediul unei relații de recurență, sau în alte cuvinte, fiecare termen are o valoare care depinde de valoarea unuia sau mai multor termeni anteriori. 

!!! example "Exemplu"
    Un exemplu foarte simplu reprezintă șirul numerelor naturale pare, pentru care este binecunoscut faptul că fiecare valoare este cu $2$ mai mare decât valoarea anterioară ($0, 2, 4, 6, 8, \dots$).

În general, ne va interesa să putem genera aceste șiruri și să găsim regulile de generare pentru diverse șiruri de numere naturale. Vom continua prin a prezenta unele șiruri foarte întâlnite în probleme.

### Progresii aritmetice 

!!! info "Progresie aritmetică" 
    O progresie aritmetică este un șir de numere astfel încât diferența dintre termenii consecutivi este constantă. De exemplu șirul $5, 7, 9, 11, 13, 15, \dots$ este o progresie aritmetică cu o diferență comună de $2$.

În general, putem defini o progresie aritmetică folosind primul termen și diferența între termeni consecutivi. 

Astfel, dacă primul termen este $x$ și rația este $r$, termenii progresiei aritmetice sunt $x, x + r, x + 2 \cdot r, \dots$

În general, pentru a afla suma primilor $n$ termeni ai unei progresii aritmetice, putem folosi formula următoare:

$$S = n \cdot x + \frac{(n-1) \cdot n}{2} \cdot r$$

Fiecare dintre cei $n$ termeni conține $x$, iar apoi următorii termeni au și $r, 2 \cdot r, \dots, (n-1) \cdot r$.

#### Problemă exemplu - [progresie3 - pbinfo](https://www.pbinfo.ro/probleme/2812/progresie3) 

Pentru a afla în mod eficient dacă toate valorile aparțin aceleiași progresii aritmetice, trebuie să ținem un [vector de frecvență](https://edu.roalgo.ro/usor/frequency-arrays/) în care memorăm aceste valori, iar mai apoi să verificăm dacă diferențele între oricare două valori distincte consecutive sunt egale. 

```cpp
#include <fstream>
using namespace std;

ifstream fin("progresie3.in");
ofstream fout("progresie3.out");

int main() {
    int v[1001] = {0};
    int x;
    while (fin >> x) {
        v[x] = 1;
    }
    
    int ans = -1;
    int prv = -1;
    
    bool rau = 0;
    for (int i = 0; i <= 1000; i++) {
        if (v[i] == 1) {
            if (prv == -1) {
                prv = i;
            }
            else {
                if (ans == -1) {
                    ans = i - prv;
                }
                else {
                    if (i - prv != ans) {
                        rau = 1;
                    }
                }
                prv = i;
            }
        }
    }
    
    if (rau == 1) {
        fout << "NU" << '\n';
    }
    else {
        fout << ans << '\n';
    }
    return 0;
}
```

### Progresii geometrice

!!! info "Progresie geometrică" 
    O progresie geometrică este un șir de numere astfel încât raportul dintre termenii consecutivi este constant. De exemplu șirul $2, 4, 8, 16, 32, 64, \dots$ este o progresie geometrică cu raportul $2$.

În general, putem defini o progresie geometrică folosind primul termen și raportul între termeni consecutivi. 

Astfel, dacă primul termen este $x$ și raportul este $r$, termenii progresiei aritmetice sunt $x, x \cdot r, x \cdot r^2, \dots$

În general, pentru a afla suma primilor $n$ termeni ai unei progresii geometrice, putem folosi formula următoare:

$$S = x \cdot \frac{r^n - 1}{r - 1}$$

În mod particular, dacă $r = 1$, suma primilor $n$ termeni este $n \cdot x$, deoarece toți termenii sunt constanți.

Această formulă se poate obține ușor dând factor comun pe $x$ și demonstrând suma prin inducție.

### Șirul factorialelor numerelor naturale

!!! info "Factorialul unui număr natural" 
    În matematică, factorialul unui număr întreg pozitiv $n$, notat cu $n!$, este egal cu produsul numerelor naturale pozitive mai mici sau egale cu $n$. Este o funcție numerică discretă și o operație unară (cu un singur operand).

Cu alte cuvinte, $n! = 1 \cdot 2 \cdot 3 \cdot \ldots \cdot n$

Factorialul unui număr oarecare $n$ indică numărul de permutări (numărul de posibilități de rearanjare) ale unei mulțimi finite având $n$ elemente.

Primele câteva valori ale lui $n!$ sunt următoarele:

* $0! = 1$
* $1! = 1$
* $2! = 2$
* $3! = 6$
* $4! = 24$
* $5! = 120$
* $6! = 720$

!!! note "Observație"
    Prin convenție, $0! = 1$.

!!! note "Observație"
    Factorialul poate fi definit și în funcție de valorile anterioare, unde $n! = (n-1)! \cdot n$, iar $0! = 1$. 

Se poate remarca faptul că valorile factorialelor cresc foarte repede:

* $10! = 3 \ 628 \ 800$
* $13! = 6 \ 227 \ 020 \ 800$ (deja depășește valoarea maximă pe care o putem stoca într-o variabilă de tip int)
* $21! = 51 \ 090 \ 942 \ 171 \ 709 \ 440 \ 000$ (deja depășește valoarea maximă pe care o putem stoca într-o variabilă de tip long long)

De asemenea, valorile factorialelor, începând de la $5!$ se termină toate cu $0$. 

În mod particular, putem afla numărul de zerouri de la sfârșitul lui $n!$ ținând cont de faptul că pentru a obține un zero, trebuie să avem un factor de $2$ și unul de $5$ ($2 \cdot 5 = 10$), iar factorii de $5$ apar mult mai rar decât cei de $2$.

În general, pe lângă aplicațiile ce implică noțiuni mai simple, factorialele se vor dovedi a fi esențiale în ceea ce privește combinatorica, unde apar în multe formule, începând de la noțiunile legate de [permutări](https://edu.roalgo.ro/mediu/intro-combinatorics/#permutari).

#### Problemă exemplu - [Trailing Zeroes](https://cses.fi/problemset/task/1618)

Această problemă ne cere fix cerința de mai sus, aflarea numărului de $0$ de la sfârșitul factorialului pentru un număr $n$ dat. Deoarece știm că avem un număr suficient de factori de $2$ în acest produs, trebuie să analizăm de câte ori apare $5$ în reprezentarea în factori primi a factorialului. 

În primul rând, fiecare număr divizibil cu $5$ adaugă un zero la acest produs. Dar acest lucru nu este suficient deoarece numerele multiplu de $25 = 5^2$ adaugă încă un zero, la fel și cele multiplu de $125 = 5^3$ ș.a.m.d. 

Astfel, numărul de zerouri de la finalul scrierii lui $n!$ este dat de formula 

$$\lfloor \frac{n}{5} \rfloor + \lfloor \frac{n}{5^2} \rfloor + \dots + \lfloor \frac{n}{5^k} \rfloor$$

unde $\lfloor x \rfloor$ reprezintă partea întreagă a lui $x$, iar $5^k$ este cea mai mare putere a lui $5$ mai mică sau egală cu $n$. 

!!! note "Formula lui Legendre"
    În mod similar, putem defini pentru un număr prim oarecare $p$ acest rezultat sub forma următoare: $$\lfloor \frac{n}{p} \rfloor + \lfloor \frac{n}{p^2} \rfloor + \dots + \lfloor \frac{n}{p^k} \rfloor$$
    Acest rezultat este cunoscut sub numele de formula lui Legendre.

```cpp
#include <iostream>
using namespace std;
 
int main() {
    
    long long n;
    cin >> n;
    
    long long ans = 0;
    long long p5 = 5;
    
    while (n >= p5) {
        ans += n/p5;
        p5 *= 5;
    }
    
    cout << ans << '\n';
    return 0;
}
```

### Șirul lui Fibonacci

!!! info "Șirul lui Fibonacci" 
    Șirul $0, 1, 1, 2, 3, 5, 8, \dots$, unde fiecare termen se poate afla ca fiind suma a doi termeni precedenți se numește șirul lui Fibonacci, denumite după matematicianul italian cu același nume.

Așa cum s-a menționat și în definiție, vom nota $F_n$ ca fiind cel de-al $n$-lea număr Fibonacci, iar aceste numere pot fi definite astfel:

* $F_0 = 0$
* $F_1 = 1$
* $F_n = F_{n-1} + F_{n-2}$

Aceste numere au numeroase proprietăți remarcabile, care au fost studiate de matematicieni și diverși alți oameni de știință, una dintre ele reprezintă faptul că pe măsură ce scriem numere fibonacci mai mari, raportul dintre două valori consecutive Fibonacci se apropie de [numărul de aur](https://en.wikipedia.org/wiki/Golden_ratio).

Datorită acestui fapt, numerele Fibonacci cresc destul de repede, deja cel de-al $100$-lea număr Fibonacci se apropie de limita maximă a long long, [aici](https://r-knott.surrey.ac.uk/Fibonacci/fibtable.html) putând fi găsită o asemenea listă.

În informatică ne vom concentra mai ales pe găsirea acestor termeni și generalizarea unor proprietăți pe care le au numerele Fibonacci. 

Pentru a afla cel de-al $n$-lea număr Fibonacci, putem folosi un algoritm destul de simplu, care se bazează pe un for sau un while.

```cpp
int a = 0;
int b = 1;
for (int i = 2; i <= n; i++) {
    int c = a + b;
    a = b;
    b = c;
}
cout << b << '\n';
```

!!! note "Algoritm mai rapid"
    Există un algoritm mai rapid, care rulează în $O(\log n)$ care se bazează pe cunoștințe mai avansate de algebră liniară și lucru cu matrici. Pentru mai multe detalii, puteți citi [aici](https://edu.roalgo.ro/dificil/pow-mat/).

#### Problema exemplu - [fibosum pbinfo](https://www.pbinfo.ro/probleme/257/fibosum)

Pentru a rezolva această problemă, trebuie să aflăm toate valorile Fibonacci mai mici sau egale cu $n$, iar mai apoi să construim suma folosind termeni în ordine descrescătoare. 

```cpp
#include <iostream>
using namespace std;
int n, nr, v[150];

int main() {

    cin >> n;
    v[1] = 1;
    v[2] = 2;
    int z = 2;
    while (v[z] <= n) {
        ++z;
        v[z] = v[z-1] + v[z-2];
    }
    while (n > 0) {
        while (n >= v[z]) {
            cout << v[z] << " ";
            n -= v[z];
        }
        --z;
    }
    return 0;
}
```

## Concluzii

Șirurile de numere naturale sunt foarte importante deoarece apar în multe probleme algoritmice și leagă cunoștințele obținute la matematică cu aplicarea lor algoritmică.

Fie că e vorba de șiruri precum cel al lui Fibonacci sau diferitele șiruri matematice discutate, cunoașterea acestor noțiuni va deveni foarte importantă pentru orice programator începător și nu numai.

## Probleme suplimentare

* [Probleme în care se generează șiruri de pe pbinfo](https://www.pbinfo.ro/probleme/categorii/56/algoritmi-elementari-generarea-unor-siruri?start=0)
* [OJI 2006 factori](https://kilonova.ro/problems/786)
* [ONI 2019 fibofrac](https://kilonova.ro/problems/1548)
* [Lot Juniori 2010 fibo](https://kilonova.ro/problems/1637)


## Resurse suplimentare

* [Generarea sirurilor recurente - CPPI Sync](https://cppi.sync.ro/materia/generarea_sirurilor_recurente.html)
* [Factorial - wikipedia](https://en.wikipedia.org/wiki/Factorial)
* [Sirul lui Fibonacci - pbinfo](https://www.pbinfo.ro/articole/5537/sirul-lui-fibonacci)
* [Sirul lui Fibonacci - wikipedia](https://en.wikipedia.org/wiki/Fibonacci_sequence)
* [Progresie aritmetica - wikipedia](https://en.wikipedia.org/wiki/Arithmetic_progression)
* [Progresie geometrica - wikipedia](https://en.wikipedia.org/wiki/Geometric_progression)
* [Factorial - pbinfo](https://www.pbinfo.ro/articole/10944/factorial)