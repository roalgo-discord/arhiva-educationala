**Autori**: Ștefan-Cosmin Dăscălescu, Ștefan-Iulian Alecu

De-a lungul parcursului vostru în domeniul algoritmicii, precum și de multe ori
în diferite olimpiade și concursuri de informatică, va trebui să rezolvați multe
probleme care se bazează pe un fundament matematic, studiul teoriei din spatele
divizibilității numerelor naturale precum și a algoritmilor de aflare a
numerelor prime, numărului de divizori, lucrului eficient cu numerele prime
devenind toate foarte importante pentru asimilarea în cel mai bun mod posibil a
acestui capitol. Totuși, acest document reprezintă doar un punct de plecare în
ceea ce privește aplicațiile teoriei numerelor în algoritmică, alte concepte
fiind discutate în documentele ulterioare. Aceste noțiuni se vor găsi foarte des
în problemele de informatică pentru clasele de gimnaziu și clasa a IX-a.

## Noțiuni introductive

!!! info "Definiție" 
    Un număr $x$ este numit **divizor** al altui număr $y$, dacă $y$ se poate scrie ca produsul dintre $x$ și un alt număr întreg $t$.

    !!! note "Observație"
        Orice număr $n$ se împarte la $1$ și la el însuși.

!!! info "Definiție" 
    Definim un **divizor comun** al unei perechi de numere $(a, b)$ ca fiind un număr $c$ care este un divizor atât al lui $a$, cât și al lui $b$.

!!! info "CMMDC și CMMMC" 

    Definim **cel mai mare divizor comun (cmmdc)** al unei perechi de numere $(a, b)$ ca fiind cel mai mare număr care este un divizor atât al lui $a$, cât și al lui $b$. Vom nota $x = (a, b)$. Definim **cel mai mic multiplu comun (cmmmc)** al unei perechi de numere $[a, b]$ ca fiind cel mai mic număr care este un multiplu atât al lui $a$, cât și al lui $b$. Vom nota $x = [a, b]$.

    !!! note "Observație"
        $a \cdot b = (a, b) \cdot [a, b]$. Drept concluzie, $(a, b) = \frac{a \cdot b}{[a, b]}$. 

Pentru aflarea celui mai mare divizor comun a două numere, există doi algoritmi principali. Primul dintre ei se bazează
pe scăderi repetate, la fiecare pas scăzându-se din numărul mai mare, numărul mai mic până când cele două valori devin
egale. Deși pentru multe perechi de numere acest algoritm este destul de eficient, atunci când diferența dintre numere
este foarte mare, algoritmul va rula în timp cvasi-liniar (de exemplu, pentru numerele $3$ și $10^9$, un calculator are
nevoie de câteva secunde să afle cmmdc-ul folosind acest algoritm).

De aceea vom folosi algoritmul lui Euclid prin împărțiri repetate pentru a ajunge la răspuns. Acest algoritm pleacă de
la ideea că o slăbiciune majoră a algoritmului prin scăderi este dată de situația când raportul dintre numărul mai mare
și cel mai mic este foarte mare, când practic efectuăm aceeași operație de foarte multe ori. De aceea, în loc de
scăderi, la fiecare pas vom afla restul împărțirii numărului mai mare la cel mai mic, înlocuind posibilele operații de
scădere cu o singură împărțire, algoritmul devenind mult mai eficient. 

!!! example "Exemplu"
    De exemplu, să analizăm numerele $40$ și $18$.

    * $a = 40, b = 18$. $a \% b = 4$, noile valori fiind $a = 18, b = 4$;
    * $a = 18, b = 4$. $a \% b = 2$, noile valori fiind $a = 4, b = 2$;
    * $a = 4, b = 2$. $a \% b = 0$, noile valori fiind $a = 2, b = 0$;
    * $a = 2, b = 0$. Deoarece $b = 0$, continuarea algoritmului ne-ar duce la împărțiri la $0$, operație ce nu este validă.

Mai jos puteți găsi implementarea în C++ a cmmdc-ului și a cmmmc-ului, program ce află cmmdc și cmmmc pentru $t$ perechi de numere. Complexitatea algoritmului este $O(\log n)$ pentru fiecare test.

```cpp
#include <iostream>
using namespace std;

constexpr auto cmmdc(int a, int b) {
    while (b > 0) {
        int c = a % b;
        a = b;
        b = c;
    }
    return a;
}

constexpr auto cmmmc(int a, int b) { 
    return 1LL * a / cmmdc(a, b) * b; 
}

int main() {
    int t;
    cin >> t;

    while (t--) {
        int a, b;
        cin >> a >> b;

        auto gcd = cmmdc(a, b);
        auto lcm = cmmmc(a, b);
        cout << gcd << " " << lcm << '\n';
    }
    return 0;
}
```

!!! note "Notă"
    C++17 oferă `#!cpp std::gcd()` și `#!cpp std::lcm()` în `#!cpp <numeric>`, deci nu este nevoie să reimplementați algoritmul dacă aveți acces la un asemenea compilator. 

## Lucrul cu divizorii unui număr

!!! info "Numere prime și compuse"
    Un număr $n \geq 2$ este **număr prim** dacă și numai dacă are doar $2$ divizori: $1$ și $n$, în caz contrar fiind **număr compus**.
    
    !!! note "Observații"
        1. $0$ și $1$ nu sunt nici numere prime, nici numere compuse.
        2. $2$ este singurul număr prim par, celelalte numere prime fiind impare.


Descompunerea în factori primi se bazează pe Teorema fundamentală a aritmeticii, dată mai jos:

!!! info "Teorema fundamentală a aritmeticii"
    Orice număr natural $n > 1$ se poate scrie în mod unic sub forma 
    $$
    n = \prod_{i = 1}^k p_i^{e_i}
    $$ unde $p_1 < p_2 < \dots < p_k$ sunt numere prime, iar $e_i \in \mathbb{N}^\ast~\forall 1 \leq i \leq k$.

!!! note "Observație"
    Se poate observa că numărul maxim de numere prime la care se împarte un număr $n$ este foarte mic. De exemplu, pentru $n \leq 10^{9}$, sunt cel mult $9$ numere prime în reprezentarea ca produs de factori primi.

Pentru a afla divizorii unui număr natural $n$, cel mai simplu (dar și ineficient) algoritm constă în a verifica pe rând fiecare număr $1$ la $n$ și să verificăm dacă $n$ se împarte exact la acel număr. Pentru a optimiza acest algoritm, va trebui să folosim o altă observație importantă.

!!! note "Observație"
    Dacă $n$ se împarte exact la $x$, se va împărți exact și la $\frac{n}{x}$. Așadar, $x^2 \leq n$ sau $x \leq \sqrt{n}$. Asta ne duce la ideea să verificăm doar divizorii până la $\sqrt{n}$, observație ce se va dovedi fundamentală în calculele și algoritmii pe care îî vom scrie pentru toate aceste probleme.

Astfel, vom putea afla orice informație legată de divizorii unui număr în $O(\sqrt{n})$, fie că e vorba de numărul de divizori, divizorii primi, descompunerea în factori primi și așa mai departe.

Totuși, putem verifica cu ușurință pentru un număr $n$ dacă $d$ este divizor al acestuia, folosind o simplă condiție aritmetică

```cpp
if (n % d == 0) {
    cout << d << " este divizor al lui " << n << '\n';
}
```

## Problema [divizibilitate](https://kilonova.ro/problems/1981) de pe Kilonova

!!! info "Cerință"
    Se dă un număr $t$ și $t$ numere naturale. Să se afle pentru fiecare dintre ele
    răspunsul la una din următoarele întrebări:

    * $1 \ n$: Să se afle dacă $n$ este prim sau nu. În caz afirmativ se va afișa
    `YES`, altfel se va afișa `NO`.

    * $2 \ n$: Să se afle câți divizori are $n$ — de exemplu, dacă $n = 12$, se va
    afișa $6$ ($1$, $2$, $3$, $4$, $6$, $12$ sunt divizorii lui $12$).

    * $3 \ n$: Să se afle numărul divizorilor primi ai lui $n$ — de exemplu, dacă
    $n = 21$, se va afișa $2$.

    * $4 \ n$: Să se afișeze descompunerea în factori primi pe care o are un număr,
    fiecare factor fiind scris pe o linie, în ordine **crescătoare** a numerelor
    prime — de exemplu, dacă $n = 60$, se vor afișa pe $3$ linii separate:

    ```
    2 2
    3 1
    5 1
    ```

Fiecare tip de întrebare a fost implementat folosind o funcție separată pentru a
arăta diferențele ce pot apărea de la un tip de întrebare la alta.

```cpp
#include <iostream>
using namespace std;

constexpr bool isPrime(int n) {
    // n == 0 || n == 1
    if (n <= 1) {
        return false;
    }

    // n == 2 || n == 3
    if (n <= 3) {
        return true;
    }

    if (n % 2 == 0 || n % 3 == 0) {
        return false;
    }

    // Iterăm prin toți divizorii primi, care-s de forma 6k ± 1
    for (int d = 5; d * d <= n; d += 6) {
        if (n % d == 0 || n % (d + 2) == 0) {
            return false;
        }
    }

    return true;
}

constexpr int countDivisors(int n) {
    int count = 0;

    for (int div = 1; div * div <= n; ++div) {
        if (n % div == 0) {
            // Dacă div = n/div, atunci înseamnă că avem un singur 
            // divizor distinct.
            count += (div == n / div) ? 1 : 2;
        }
    }
    return count;
}

constexpr int countPrimeDivisors(int n) {
    int count = 0;

    for (int div = 2; div * div <= n; ++div) {
        if (n % div == 0) {
            count++;

            // Eliminăm toți multiplii de i, deoarece am contorizat 
            // deja divizorul.
            while (n % div == 0) {
                n /= div;
            }
        }
    }

    if (n > 1) {
        count++;
    }

    return count;
}

void printPrimeDivisors(int n) {
    for (int div = 2; div * div <= n; ++div) {
        if (n % div == 0) {
            int cnt = 0;

            // Dacă am găsit un divizor, calculăm exponentul său.
            while (n % div == 0) {
                cnt++;
                n /= div;
            }

            cout << div << " " << cnt << '\n';
        }
    }
    
    if (n > 1) {
        cout << n << " 1\n";
    }
}

void solveQuery(int type, int n) {
    switch (type) {
        case 1:
            cout << (isPrime(n) ? "YES" : "NO") << '\n';
            break;
        case 2:
            cout << countDivisors(n) << '\n';
            break;
        case 3:
            cout << countPrimeDivisors(n) << '\n';
            break;
        case 4:
            printPrimeDivisors(n);
            break;
        default:
            break;
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int type, number;
        cin >> type >> number;

        solveQuery(type, number);
    }

    return 0;
}
```

## Probleme și lectură suplimentară

Aici mai trebuie probleme 

* [Probleme cu divizibilitate de pe kilonova](https://kilonova.ro/tags/359)
* [Number theory  —  Storing information about multiples/divisors](https://codeforces.com/blog/entry/91707)
* [Articol de pe USACO Guide](https://usaco.guide/gold/divisibility?lang=cpp)
* [Counting Divisors of a Number in $N^\frac{1}{3}$](https://codeforces.com/blog/entry/22317)

