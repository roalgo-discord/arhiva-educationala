---
id: complexity
author:
    - Ștefan-Cosmin Dăscălescu
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

Înțelegem prin **complexitate** numărul de pași pe care îl face un algoritm în
funcție de dimensiunea setului de date primite. Cunoașterea acestui concept este
fundamentală pentru facilitarea rezolvării de probleme.

În practică, complexitățile sunt de două tipuri, cea de timp și cea de memorie,
ambele având metodele lor specifice de calculare a eficienței.

## Complexitatea de timp

Pentru a calcula complexitatea de timp a unui algoritm, trebuie să avem în
vedere următoarele aspecte specifice:

- În practică, procesoarele moderne pot procesa aproximativ $3 \cdot 10^8$
  operații simple pe secundă, acest număr depinde în funcție de contextul unde
  trebuie rezolvată problema (anumite site-uri sunt mai rapide decât altele și
  anumite evaluatoare de la concursurile oficiale sunt mai rapide decât altele).

  !!! note "Observație"

      În concursuri, folosirea valorii de $10^8$ operații pe secundă este o
      estimare precisă, care este folosită de regulă și de propunătorii de
      probleme atunci când se decid limitele de timp.

- Exemple de operații simple: operațiile aritmetice simple, incrementările,
  operațiile pe biți etc.
- Exemple de operații care nu sunt simple: aflarea radicalului, aflarea restului
  împărțirii etc.

În general, constantele mici pot fi ignorate în calculul complexitatilor. De
exemplu, $O(N)$ este echivalent cu $O(3 \cdot N)$ și $O(2 \cdot N)$. Mai jos
puteți găsi exemple de cod, împreună cu complexitățile lor.

Acest cod are complexitatea $O(1)$, operațiile fiind constante.

```cpp
int a = 5;
int b = 7;
int c = 4;
int d = a + b + c + 153;
```

Aceste coduri au complexitatea $O(n)$, numărul de operații fiind cel făcut în
structura repetitivă.

```cpp
for (int i = 1; i <= n; i++) {
    // cod in timp constant
}
```

```cpp
int i = 0;
while (i < n) {
    // cod in timp constant
    i++;
}
```

În ciuda constantelor care apar, codurile au din nou complexitatea $O(n)$.
Aceste coduri au complexitatea $O(n)$, numărul de operații fiind cel făcut în
structura repetitivă.

```cpp
for (int i = 1; i <= 5 * n + 17; i++) {
    // cod in timp constant
}
```

```cpp
for (int i = 1; i <= n + 758458; i++) {
    // cod in timp constant
}
```

Dacă avem de-a face cu mai multe structuri repetitive imbricate, complexitatea
se va înmulți, complexitatea codului de mai jos este $O(n \cdot m)$.

```cpp
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= m; j++) {
        // cod in timp constant
    }
}
```

Dacă avem de-a face cu diverse repetitive imbricate în diferite blocuri de cod,
complexitatea va deveni egală cu cea mai costisitoare structură de acest gen,
complexitatea se va înmulți, complexitatea codului de mai jos este $O(n \cdot
m)$, în ciuda bucății care are complexitate $O(n)$.

```cpp
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= n; j++) {
        // cod in timp constant
    }
}
for (int i = 1; i <= m; i++) {
    // cod in timp constant
}
```

### Exemple de complexități de timp

Aici prezentăm câteva exemple de complexități, care vor fi utile pe parcurs. Nu
este nevoie să știți algoritmii de aici încă, ei vor fi prezentați și învățați
de-a lungul parcursului vostru în lumea algoritmicii.

- Formule matematice care calculează un răspuns: $O(1)$
- Căutarea binară: $O(\log n)$
- Folosirea unor structuri de date precum set, map: $O(\log n)$ per operație
- Aflarea divizorilor unui număr: $O(\sqrt{n})$
- Citirea sau parcurgerea a $n$ valori: $O(n)$
- Sortarea unui vector cu $n$ valori: de obicei $O(n \log n)$
- Parcurgerea tuturor submulțimilor de lungime 2: $O(n^2)$.
- Parcurgerea tuturor submulțimilor: $O(2^n)$
- Parcurgerea tuturor permutărilor: $O(n!)$

## Complexitatea de memorie

În cazul complexității de memorie, trebuie să avem în vedere și tipul de date
folosit.

Dintre cele mai frecvente tipuri de date, putem enumera următoarele:

- tipul **int**: 4 bytes, limite între $-2^{31}$ si $2^{31} - 1$ ($-2 \ 147 \
  483 \ 648$ si $2 \ 147 \ 483 \ 647$).
- tipul **short**: 2 bytes, limite între $-2^{15}$ si $2^{15} - 1$ ($-32  \
  768$ si $32 \ 767$).
- tipul **char**: 1 byte, limite între $-128$ si 127.
- tipul **bool**: 1 byte, accepta doar 0 sau 1.
- tipul **long long**: 8 bytes, limite între $-2^{63}$ si $2^{63} - 1$ ($-9 \
  223 \ 372 \ 036 \ 854 \ 775 \ 808$ si $9 \ 223 \ 372 \ 036 \ 854 \ 775 \ 807$)
  * numere de maxim 19 cifre.

În privința tipurilor reale, putem enumera următoarele:

- tipul **float**: 4 bytes, limite între aproximativ $-10^{38}$ și $10^{38}$.
- tipul **double**: 8 bytes, limite între aproximativ $-10^{208}$ și
  $10^{208}$.
- tipul **long double**: în funcție de standardul de compilare, cel puțin 8
  bytes, limite mai mari decât cele de la **double**.

De exemplu, dacă avem un vector de $10^6$ elemente de tipul **int** și altul de
$10^5$ elemente de tipul **long long**, vom folosi $4 * 10^6 + 8 * 10^5 =
4.8*10^6$ bytes = $4.8$ MB.

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
| $n \leq 10$           | $O(n!)$, $O(n^7)$, $O(n^6)$        |
| $n \leq 20$           | $O(2^n \cdot n)$, $O(n^5)$         |
| $n \leq 100$          | $O(n^4)$                           |
| $n \leq 500$          | $O(n^3)$                           |
| $n \leq 10 \ 000$     | $O(n^2)$                           |
| $n \leq 10^5$         | $O(n \sqrt n)$                     |
| $n \leq 5 \cdot 10^5$ | $O(n \log n)$                      |
| $n \leq 10^7$         | $O(n)$                             |
| $n \leq 10^{18}$      | $O(\log^2 n)$, $O(\log n)$, $O(1)$ |

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
