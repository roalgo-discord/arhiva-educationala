---
tags:
    - matematica
    - aritmetica
---

**Autor**: Ștefan-Cosmin Dăscălescu

## Introducere

Un mit care este răspândit de foarte mulți oameni în diverse medii este acela că matematica nu are vreo relevanță în programare sau algoritmică, ceea ce nu poate fi mai fals. Deși nu este necesar să fii olimpic la matematică pentru a fi foarte bun la algoritmică sau mai ales pentru a fi un bun programator, cunoștințele adecvate de matematică sunt foarte importante deoarece foarte mulți algoritmi și foarte multe ramuri ale informaticii se bazează pe un fundament matematic solid, care să permită aprofundarea unor capitole specifice. 

!!! note "Observație"
    Totuși, dacă ești deja foarte bun la matematică sau chiar olimpic, asta va face învățarea multor capitole mai ușoară, deoarece foarte multe noțiuni se corelează cu cele de la matematică. În esență, programarea se reduce în multe situații la limbaj matematic transpus în cod citibil de mașinile de calcul.

De exemplu, de-a lungul studiului algoritmicii, pe lângă cunoștințele matematice de bază care vor fi subiectul acestui articol, veți avea de-a face cu capitole specifice combinatoricii, divizibilității, teoriei numerelor, geometriei, algebrei liniare și multe alte subiecte care introduc cititorii în algoritmi mai avansați. 

Chiar și în aplicații mai simple, modelarea unor probleme de matematică folosind programe a devenit foarte importantă în ultimele decenii, învățarea făcându-se în prezent aproape exclusiv cu ajutorul soluțiilor digitale.

În cele ce urmează, vom discuta fundamentele operațiilor matematice de bază, sintaxa lor în limbajul C++ precum și câteva lucruri esențiale pe care trebuie să le aveți în vedere atunci când vreți să simplificați lucrurile în ceea ce privește aplicarea lor în diverse contexte. 

## Operații aritmetice pe numere întregi

În primul rând, orice problemă pe care o rezolvați implică într-un mod sau altul operațiile aritmetice de bază (adunarea, scăderea, înmulțirea, împărțirea).

Ordinea efectuării operațiilor este aceeași ca la matematică, operațiile de înmulțire și împărțire sunt efectuate înaintea celor de adunare și scădere. 

Pentru a evita confuzia în ceea ce privește folosirea diverselor operații matematice, se recomandă folosirea parantezelor pentru a simplifica calculele. 

În ceea ce privește operația de împărțire pe numere întregi, rezultatul afișat va fi mereu numărul fără virgulă. 

```cpp
cout << 8 + 2 << '\n'; // 10
cout << 4 * 3 << '\n'; // 12
cout << 12 - 5 << '\n'; // 7
cout << 16 / 4 << '\n'; // 4
cout << 15 / 4 << '\n'; // 3
cout << -9 / 3 << '\n'; // -3
cout << -8 / 3 << '\n'; // -2
```

!!! note "Observație"
    Trebuie avut grijă la faptul că dacă rezultatul operației depășește valoarea maximă sau minimă a tipului de date în care acesta este păstrat, vom avea overflow-uri, care trebuie evitate cu orice preț.

### Soluții pentru evitarea overflow-ului

Cele mai populare două soluții sunt fie folosirea tipului de date long long pentru păstrarea termenilor din operații, fie folosirea operatorului 1LL, fie folosirea (long long) pentru convertirea datelor.

```cpp
cout << 594943 * 204232 << '\n'; // overflow
cout << 1LL * 594943 * 204232 << '\n'; // ok
cout << (long long) 594943 * 204232 << '\n'; // ok
cout << 594943 * (long long) 204232 << '\n'; // ok
```

### Operații aritmetice pe numere reale

În ceea ce privește numerele reale, dacă apare un număr real în expresia aritmetică, rezultatul final va deveni și el un număr real. Totuși, dacă expresia este memorată într-un tip de date întreg, atunci rezultatul va rămâne întreg.

```cpp
cout << 2.5 + 7 << '\n'; // 9.5
cout << 3 * 2.5 << '\n'; // 7.5
cout << 2.5 / 2 << '\n'; // 1.25
cout << 2 / 2.5 << '\n'; // 0.8
cout << 6.3/20+24 << '\n'; // 24.315
int x = 6.3/20+24; 
cout << x << '\n'; // 24
```

### Ridicarea la putere

Pentru a afla rezultatul expresiei $a^b$, avem două moduri principale de a calcula acest lucru. 

În primul rând, putem folosi instrucțiunea `pow` din biblioteca `#include <cmath>`, sintaxa fiind `pow(baza, exponent)`, dar problema este aceea că deși aceasta este o soluție viabilă pentru numere reale, uneori putem ajunge în situația în care dacă calculăm un rezultat foarte mare (de exemplu, $9^14$), în funcție de precizia operației de ridicare la putere, să avem rezultate de forma $x.999999999$ care rotunjite în jos, să ne dea $x-1$. 

O metodă mai simplă constă în a ridica la putere folosind o structură repetitivă care calculează $a^b$ în $b$ pași, așa cum se poate vedea mai jos. 

```cpp
int ans = 0;
for (int i = 1; i <= b; i++) {
    ans = ans * a;
}
cout << ans << '\n';
```

Pentru cei mai avansați, această operație se poate face [și în timp logaritmic](https://roalgo-discord.github.io/arhiva-educationala/mediu/pow-log/#ridicarea-la-putere-in-timp-logaritmic), cunoașterea acestei tehnici nefiind necesară decât celor care vor să meargă la olimpiadă. 

## Tehnici matematice simple

De multe ori, mai ales în problemele mai simple de algoritmică, cunoașterea unor formule și principii matematice simple este esențială. 

### Formule pentru sume remarcabile

Așa cum știți probabil de la matematică, avem diverse formule pentru unele sume de numere naturale. Cele mai multe dintre ele se pot demonstra fie prin calcul direct, fie prin inducție matematică. 

* $1 + 2 + 3 + \dots + n = \frac{n \cdot (n+1)}{2}$ (suma lui Gauss)
* $1^2 + 2^2 + 3^2 + \dots + n^2 = \frac{n \cdot (n+1) \cdot (2 \cdot n+1)}{6}$ (suma pătratelor perfecte)
* $1^3 + 2^3 + 3^3 + \dots + n^3 = (\frac{n \cdot (n+1)}{2})^2$ (suma cuburilor perfecte)
* $1 + 3 + 5 + \dots + (2n - 1) = n^2$
* $(a + b)^2 = a^2 + 2ab + b^2$
* $(a - b)^2 = a^2 - 2ab + b^2$
* $a^2 - b^2 = (a-b)(a+b)$

### Rezolvarea unor tipuri de ecuații

Pentru ecuația de gradul $1$ și $2$, avem tehnici binecunoscute pentru aflarea soluțiilor, după cum urmează.

* Pentru o ecuație de forma $ax + b = 0$, soluția ecuației este $\frac{-b}{a}$.
* Pentru o ecuație de forma $ax^2 + bx + c = 0$, avem $0$, $1$ sau $2$ soluții reale, care pot fi aflate prin formulele $\frac{-b + \sqrt(\Delta)}{2a}$ și $\frac{-b - \sqrt(\Delta)}{2a}$, unde $\Delta = b^2 - 4ac$. Dacă $\Delta < 0$, nu există soluții reale. 

### Rearanjarea unor sume și produse

În unele situații, suntem nevoiți să rearanjăm diverși termeni ai unor egalități pentru a simplifica calculele. De obicei, când vrem să facem asta, scopul este acela de a aduce termenii ce se pot păstra în același mod împreună.

Dacă vrem să aflăm câte perechi de forma $(i, j)$ există cu proprietatea că $x_i + x_j = y_i + y_j$, este mai simplu să aflăm câte perechi există cu proprietatea că $x_i - y_i = y_j - x_j = -(x_j - y_j)$, lucru ce se poate afla mult mai ușor folosind vectori de frecvență.  

### Lucrul cu intervale 

Dacă avem două intervale de numere naturale $[x_1, y_1]$ și $[x_2, y_2]$ putem discuta despre următoarele două intervale:

* Pentru intervalele de mai sus, intersecția lor este $[max(x_1, x_2), min(y_1, y_2)$]$, cu condiția că $max(x_1, x_2) \leq min(y_1, y_2)$. 
* Pentru intervalele de mai sus, reuniunea lor este $[min(x_1, x_2), max(y_1, y_2)$]$, cu condiția că intersecția lor este nevidă. Dacă intersecția este vidă, reuniunea intervalelor este dată de cele două intervale luate separat. 

## Divizibilitatea numerelor naturale

Deși acest capitol este abordat în detaliu [aici](https://roalgo-discord.github.io/arhiva-educationala/usor/divisibility/), aici vom sublinia doar aspectele de bază.

Operatorul pe care îl folosim pentru a verifica dacă două numere se împart unul la altul este $\%$ și acesta ne află restul împărțirii deîmpărțitului la împărțitor. 

În mod particular, dacă $a \% b = 0$, atunci $a$ se împarte exact la $b$.

## Concluzii

Deși matematica prezentată aici nu ar trebui să pună probleme unui elev de liceu care citește acest articol (sau chiar și unui elev mai bun de gimnaziu), este foarte important de avut în vedere tehnicile de rezolvare a problemelor, precum și formulele aflate de la matematică. 

Chiar dacă aplicarea lor este un pic diferită precum cea de la mate, pe măsură ce vă obișnuiți cu aceste principii, lucrurile vor deveni mai simple. 

## Resurse suplimentare 

* [Problemele usoare si medii din capitolul Sume, produse, numarari](https://www.pbinfo.ro/probleme/categorii/20/algoritmi-elementari-sume-produse-numarari)
* [Problemele usoare si medii din capitolul Maxime si minime](https://www.pbinfo.ro/probleme/categorii/4/algoritmi-elementari-maxime-si-minime)
* [Probleme usoare de matematica de pe Codeforces](https://codeforces.com/problemset?tags=math,-1200)
