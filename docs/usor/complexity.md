---
id: complexity
authors: [stefdasca]
prerequisites:
    - loops
tags:
    - notiuni de baza
    - memorie
    - timp
---

## Introducere

Atunci când elaborăm un algoritm, vrem să știm cât de rapid va fi, pentru a
putea decide dacă are sens să trecem la implementarea lui propriu-zisă. Un mod
de a măsura calitatea unui algoritm este dat de complexitatea pe care îl are. În
cele ce urmează vom discuta acest concept și modul în care îl putem aplica în
probleme.

Complexitatea unui algoritm reprezintă o măsură a eficienței acestuia în funcție
de dimensiunea intrării. O bună înțelegere a complexității este esențială pentru
a putea alege cel mai potrivit algoritm pentru o problemă dată.

Imaginați-vă că trebuie să căutați un cuvânt într-un dicționar. Dacă îl căutați
pagină cu pagină, procesul este lent. Dacă folosiți metoda căutării binare
(deschizând cartea pe la mijloc și eliminând jumătate din pagini la fiecare
pas), veți ajunge mult mai repede la rezultat.

## Complexitatea de timp

Pentru a calcula complexitatea de timp a unui algoritm, trebuie să avem în
vedere că în practică, procesoarele moderne pot procesa aproximativ $3 \cdot
10^8$ operații simple pe secundă, acest număr depinzând în funcție de contextul
unde trebuie rezolvată problema (anumite site-uri sunt mai rapide decât altele
și anumite evaluatoare de la concursurile oficiale sunt mai rapide decât
altele).

!!! note "Observație"

    În concursuri, folosirea valorii de $10^8$ operații pe secundă este o
    estimare precisă, care este folosită de regulă și de propunătorii de
    probleme atunci când se decid limitele de timp.

Prin operație „simplă” înțelegem concret o operație care durează un timp
constant, indiferent de mărimea intrării. Exemple de operații simple includ
operațiile aritmetice simple, incrementările, operațiile pe biți etc., iar
exemple care nu sunt simple includ aflarea radicalului, aflarea restului
împărțirii etc.

În general, constantele mici pot fi ignorate în calculul complexitatilor. De
exemplu, $\mathcal{O}(N)$ este echivalent cu $\mathcal{O}(c \cdot N)$ pentru un
$c > 0$. Mai jos puteți găsi exemple de cod, împreună cu complexitățile lor.

Acest cod are complexitatea $\mathcal{O}(1)$, operațiile fiind constante.

```cpp
int a = 5;
int b = 7;
int c = 4;
int d = a + b + c + 153;
```

Aceste coduri au complexitatea $\mathcal{O}(n)$, numărul de operații fiind cel
făcut în structura repetitivă.

```cpp
for (int i = 1; i <= n; i++) {
    // Cod în timp constant
}
```

```cpp
int i = 0;

while (i < n) {
    // Cod în timp constant
    i++;
}
```

În ciuda constantelor care apar, codurile au din nou complexitatea
$\mathcal{O}(n)$. Aceste coduri au complexitatea $\mathcal{O}(n)$, numărul de
operații fiind cel făcut în structura repetitivă.

```cpp
for (int i = 1; i <= 5 * n + 17; i++) {
    // Cod în timp constant
}
```

```cpp
for (int i = 1; i <= n + 758458; i++) {
    // Cod în timp constant
}
```

Dacă avem de-a face cu mai multe structuri repetitive imbricate, complexitatea
se va înmulți, complexitatea codului de mai jos este $\mathcal{O}(n \cdot m)$.

```cpp
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= m; j++) {
        // Cod în timp constant
    }
}
```

Dacă avem de-a face cu diverse repetitive imbricate în diferite blocuri de cod,
complexitatea va deveni egală cu cea mai costisitoare structură de acest gen,
complexitatea se va înmulți, complexitatea codului de mai jos este
$\mathcal{O}(n \cdot m)$, în ciuda bucății care are complexitate
$\mathcal{O}(n)$.

```cpp
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= n; j++) {
        // Cod în timp constant
    }
}

for (int i = 1; i <= m; i++) {
    // Cod în timp constant
}
```

!!! warning "Atenție"

    O greșeală care se face deseori este să presupunem că o complexitate
    $\mathcal{O}(f(n))$ se menține pentru **valori mici**. Când calculăm
    complexitățile, ignorăm constantele pentru că vrem să analizăm algoritmul
    când $n$ devine din ce în ce mai mare. Ne interesează deci rata în care
    crește timpul de execuție, dar asta nu ne zice nimic legat de timpul
    concret. Pentru valori mici, nu avem voie să ignorăm constantele și alți
    termeni, deoarece constantele contează enorm. Din acest punct de vedere,
    putem vedea $\mathcal{O}$ ca fiind cazul **cel mai rău** al unui algoritm.
    Notația nu ne zice nimic de cum rulează algoritmul în medie sau în cel mai
    bun caz.
    
    De pildă, dacă avem un algoritm $\mathcal{O}(n)$ pentru care fiecare
    operație durează 50ms (am putea reprezenta asta ca $\mathcal{O}(50n)$),
    acesta va fi mai încet decât un algoritm $\mathcal{O}(5n^2)$, unde fiecare
    operație durează 5ms pentru $n < 10$. Fiecare operație are un cost și există
    foarte mulți factori care pot influența cum rulează un algoritm (performanța
    procesorului, memoria disponibilă, cum accesează programul memoria, ce
    operații au loc etc.). Un algoritm $\mathcal{O}(2n)$ va fi de 2 ori mai
    rapid decât unul $\mathcal{O}(4n)$, deși ele cresc în același fel. Deci nu
    vă bazați pe complexități dacă vreți să comparați concret doi algoritmi sau
    două structuri de date; faceți teste.

### Exemple de complexități de timp

Aici prezentăm câteva exemple de complexități, care vor fi utile pe parcurs. Nu
este nevoie să știți algoritmii de aici încă, ei vor fi prezentați și învățați
de-a lungul parcursului vostru în lumea algoritmicii.

- Formule matematice care calculează un răspuns: $\mathcal{O}(1)$
- Căutarea binară: $\mathcal{O}(\log n)$
- Folosirea unor structuri de date precum set, map: $\mathcal{O}(\log n)$ per operație
- Aflarea divizorilor unui număr: $\mathcal{O}(\sqrt{n})$
- Citirea sau parcurgerea a $n$ valori: $\mathcal{O}(n)$
- Sortarea unui vector cu $n$ valori: de obicei $\mathcal{O}(n \log n)$
- Parcurgerea tuturor submulțimilor de lungime 2: $\mathcal{O}(n^2)$.
- Parcurgerea tuturor submulțimilor: $\mathcal{O}(2^n)$
- Parcurgerea tuturor permutărilor: $\mathcal{O}(n!)$

## Complexitatea de memorie

În cazul complexității de memorie, trebuie să avem în vedere și tipul de date
folosit.

Dintre cele mai frecvente tipuri de date, putem enumera următoarele:

- tipul `#!cpp int`: 4 octeți, limite între $-2^{31}$ si $2^{31} - 1$ ($-2 \ 147
  \ 483 \ 648$ si $2 \ 147 \ 483 \ 647$).
- tipul `#!cpp short`: 2 octeți, limite între $-2^{15}$ si $2^{15} - 1$ ($-32 \
  768$ si $32 \ 767$).
- tipul `#!cpp char`: 1 octet, limite între $-128$ si 127.
- tipul `#!cpp bool`: 1 octet, accepta doar 0 sau 1.
- tipul `#!cpp long long`: 8 octeți, limite între $-2^{63}$ si $2^{63} - 1$ ($-9
  \ 223 \ 372 \ 036 \ 854 \ 775 \ 808$ si $9 \ 223 \ 372 \ 036 \ 854 \ 775 \
  807$) &mdash; numere de maxim 19 cifre.

În privința tipurilor reale, putem enumera următoarele:

- tipul `#!cpp float`: 4 octeți, limite între aproximativ $-10^{38}$ și $10^{38}$.
- tipul `#!cpp double`: 8 octeți, limite între aproximativ $-10^{208}$ și
  $10^{208}$.
- tipul `#!cpp long double`: în funcție de standardul de compilare, cel puțin 8
  octeți, limite mai mari decât cele de la `#!cpp double`.

De exemplu, dacă avem un vector de $10^6$ elemente de tipul `#!cpp int` și altul
de $10^5$ elemente de tipul `#!cpp long long`, vom folosi $4 \cdot 10^6 + 8
\cdot 10^5 = 4.8 \cdot 10^6$ octeți = 4.8 MB.

Este foarte important în cazul complexităților de memorie să aveți în vedere
faptul că în general la concursuri, se ia în considerare memoria așa cum e
declarată la început, și nu ce folosești pe parcurs. Astfel, este foarte
important pe cât posibil să nu declarați mai multă memorie decât folosiți și să
aveți grijă la câtă memorie alocați, pentru a evita și situația în care alocați
mai puțin decât trebuie.

Pe scurt, e important să citiți cu atenție restricțiile din enunțurile
problemelor.

## Complexități acceptabile pentru diverse restricții

Acestea sunt aproximări pentru diverse clase de complexități, trebuie să aveți
în vedere limita de timp și sfaturile date anterior, împreună cu
particularitățile problemei.

| $n$                   | Complexități posibile              |
| --------------------- | ---------------------------------- |
| $n \leq 10$           | $\mathcal{O}(n!)$, $\mathcal{O}(n^7)$, $\mathcal{O}(n^6)$        |
| $n \leq 20$           | $\mathcal{O}(2^n \cdot n)$, $\mathcal{O}(n^5)$         |
| $n \leq 100$          | $\mathcal{O}(n^4)$                           |
| $n \leq 500$          | $\mathcal{O}(n^3)$                           |
| $n \leq 10 \ 000$     | $\mathcal{O}(n^2)$                           |
| $n \leq 10^5$         | $\mathcal{O}(n \sqrt n)$                     |
| $n \leq 5 \cdot 10^5$ | $\mathcal{O}(n \log n)$                      |
| $n \leq 10^7$         | $\mathcal{O}(n)$                             |
| $n \leq 10^{18}$      | $\mathcal{O}(\log^2 n)$, $\mathcal{O}(\log n)$, $\mathcal{O}(1)$ |

## Concluzii

Complexitățile reprezintă o parte fundamentală din rezolvarea fiecărei probleme
și înțelegerea principiilor din spatele modului în care se calculează este
necesară pentru oricine dorește să aprofundeze studiul algoritmicii. Aceste
informații prezentate aici vor fi esențiale pentru rezolvarea tuturor
problemelor de algoritmică.

## Lectură suplimentară

- [Complexitati - USACO Guide](https://usaco.guide/bronze/time-comp?lang=cpp)
- [Time complexity - Wikipedia](https://en.wikipedia.org/wiki/Time_complexity)
- [A Time Complexity Guide - Codeforces](https://codeforces.com/blog/entry/104888)
- [How to determine the solution of a problem by looking at its constraints? - Codeforces](https://codeforces.com/blog/entry/21344)
