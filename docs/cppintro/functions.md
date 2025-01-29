---
tags:
  - C++
  - functii
  - implementare
  - recursivitate
---

**Autori**: Ștefan-Cosmin Dăscălescu, Ștefan-Iulian Alecu

!!! example "Cunoștințe necesare"
    - [Structura repetitivă](https://edu.roalgo.ro/cppintro/loops/)

## Introducere

Atunci când scrieți un program în orice limbaj de programare, există situații în
care sunteți nevoiți să executați anumite tipuri de operații de mai multe ori.
Pentru a evita scrierea acestor secvențe de un număr mare de ori, se impune
folosirea unor secvențe de cod pe care să le putem refolosi. Acestea vor fi ceea
ce numim în limbajul C++ funcții sau subprograme.

!!! info "Funcție"

    O funcție sau un subprogram reprezintă o secvență de cod care poate fi
    apelată de utilizator pentru a fi executată de mai multe ori, fără a fi
    nevoie să rescriem acel cod. Aceasta poate fi apelată fie din programul
    principal, fie dintr-o altă funcție.

În limbajul C++, avem atât funcții de sistem (deja cunoscute de biblioteci) și
funcții definite de utilizator.

## Funcții de sistem

Chiar dacă acest articol nu se va concentra pe funcțiile de sistem, cel mai
probabil ați folosit până acum aceste funcții pentru a afla valorile diverselor
funcții.

Un astfel de exemplu este funcția `#!cpp sqrt(x)`, care ne ajută să aflăm
valoarea lui $\sqrt n$, funcție ce se regăsește în biblioteca `#!cpp <cmath>`.
În mod similar, probabil ați folosit până acum funcția `#!cpp std::sort`,
funcție ce se regăsește în biblioteca `#!cpp <algorithm>`, iar exemplele pot
continua.

Deși nu trebuie să rescriem aceste funcții, acestea se bazează pe același
principiu (refolosirea unor coduri deja scrise), singura diferență fiind aceea
că codul din spatele acestor funcții face deja parte din standardul
bibliotecilor și nu trebuie reprodus.

## Avantajele folosirii funcțiilor

Deoarece putem refolosi codul scris de noi, acestea se dovedesc a fi un
instrument foarte bun în privința reducerii cantității de cod scrisă. Acest
lucru ne ajută și atunci când facem debugging, deoarece dacă avem o funcție
greșită, trebuie să schimbăm lucruri într-un singur loc în loc să trebuiască să
schimbăm în mai multe locuri.

Funcțiile pot fi scrise în mai multe moduri, dar mai întâi ne vom concentra pe
părțile componente ale unei funcții și sintaxa ei. Pe parcurs, vom folosi
diverse exemple care să ilustreze diversele moduri în care putem scrie o funcție
care face același lucru.

Pe lângă avantajele evidente pe care cunoașterea funcțiilor le oferă, acestea
reprezintă și un capitol fundamental în studiul limbajului C++ și a multor
algoritmi, fiind necesare pentru înțelegerea multor algoritmi și metode de
programare.

## Părțile componente ale unei funcții

În general, o funcție are următorul șablon:

```cpp
--8<-- "cppintro/functions/functions1.cpp"
```

O funcție este formată din două părți principale: antetul (declararea funcției)
și corpul (implementarea funcției).

1. **Antetul funcției**

    Antetul unei funcții este format din următoarele componente:

    - **Tipul de returnare (tip)**. Reprezintă tipul valorii întoarse de
      funcție. Poate fi orice tip de date cunoscut în limbajul C++, inclusiv
      containere din STL.
  
        Dacă funcția nu întoarce nicio valoare, se utilizează tipul
        `#!cpp void`, care semnifică un tip gol.
  
        !!! warning "Atenție"
  
            În cazul funcțiilor cu tipul de returnare diferit de `#!cpp void`,
            omisiunea unei valori returnate generează, de obicei, un warning la
            compilare. În unele cazuri, comportamentul programului devine
            imprevizibil (undefined behavior).

    - **Numele funcției**. Este ales de utilizator și trebuie să respecte
      regulile de numire ale identificatorilor (de exemplu, să nu înceapă cu
      cifre, să nu conțină caractere speciale, etc.).

    - **Parametrii funcției**. Sunt variabilele pe care funcția le primește la
      apel. Fiecare parametru are un tip de date și un nume.

        !!! note "Observație"

            Parametrii funcției nu sunt obligatorii. Totuși, aceștia fac funcția
            mai flexibilă și reutilizabilă în diverse contexte.

2. **Corpul funcției**.

     Corpul funcției include instrucțiunile specifice care determină
     comportamentul funcției. Acestea pot fi orice instrucțiuni C++ valide,
     respectând regulile de sintaxă și compilare.

3. **Returnarea valorii**.

    O funcție poate întoarce o valoare folosind instrucțiunea `#!cpp return`.
    Aceasta finalizează execuția funcției și trimite o valoare către codul care
    a apelat funcția (dacă funcția are un tip de returnare diferit de `#!cpp
    void`).

    - **Pentru funcții cu tip non-`#!cpp void`**:

        Instrucțiunea `#!cpp return` trebuie să fie urmată de o expresie sau o
        valoare compatibilă cu tipul declarat al funcției. Absența unei valori
        returnate va genera, de obicei, un warning la compilare și poate duce la
        un comportament imprevizibil (_undefined behavior_).

        ```cpp
        --8<-- "cppintro/functions/functions2.cpp"
        ```

        !!! warning "Atenție"

            Într-o funcție cu tip non-`#!cpp void`, _toate_ căile posibile de
            execuție trebuie să aibă o valoare returnată. Pe scurt, nu poți avea
            unele locuri de unde returnezi și altele de unde nu. Deci, așa ceva
            nu e posibil:

            ```cpp
            --8<-- "cppintro/functions/functions3.cpp"
            ```

    - **Pentru funcții de tip `#!cpp void`**:

        Funcțiile declarate cu tipul `#!cpp void` nu întorc nicio valoare, iar
        utilizarea instrucțiunii return este opțională. În acest caz, `#!cpp
        return;` poate fi folosit doar pentru a încheia executarea funcției mai
        devreme.

        ```cpp
        --8<-- "cppintro/functions/functions4.cpp"
        ```

## Utilizarea funcțiilor

În general, funcțiile trebuie scrise într-o ordine care să faciliteze accesul și
utilizarea lor. De regulă, o funcție trebuie declarată sau definită înainte de a
fi folosită în cod. În caz contrar, compilatorul nu va recunoaște funcția
respectivă și va genera o eroare.

=== "Cod corect (definirea înainte de folosire)"

    ```cpp
    --8<-- "cppintro/functions/functions5.cpp"
    ```

    În acest exemplu, funcția `#!cpp sum_div` este definită deasupra funcției
    `#!cpp main`, ceea ce face ca aceasta să poată fi utilizată fără alte
    declarații suplimentare.

=== "Cod greșit (lipsa definiției înainte de apel)"

    ```cpp
    --8<-- "cppintro/functions/functions6.cpp"
    ```

    În acest caz, funcția `#!cpp sum_div` este definită după funcția
    `#!cpp main`, dar fără o declarație prealabilă (antet). Din această cauză,
    compilatorul generează o eroare, deoarece nu poate identifica funcția
    `#!cpp sum_div`.

Dacă dorim să definim funcțiile după funcția `#!cpp main`, putem folosi o
declarație prealabilă (**prototip**) care să indice existența funcției și
semnătura acesteia.

```cpp
--8<-- "cppintro/functions/functions7.cpp"
```

## Clasificarea funcțiilor după valorile pe care le întorc

În funcție de ce valori ne întoarce funcția, acestea sunt de două feluri:

### Funcții care returnează o valoare (sau mai multe)

Acestea sunt cele mai frecvent întâlnite funcții. Ele preiau una sau mai multe
valori, le procesează și întorc rezultatul.

De exemplu, următoarea funcție primește un număr întreg ca parametru și
returnează suma divizorilor săi:

```cpp
--8<-- "cppintro/functions/functions8.cpp"
```

!!! note "Observație"

    Variabilele declarate într-o funcție sunt locale și nu influențează
    programul principal sau alte funcții (excepție făcând valorile returnate).
    Dacă o variabilă cu același nume este declarată în alt context, nu există
    interferențe.

### Funcții care nu returnează nimic (funcții `#!cpp void`)

În limbajul C++, o funcție care nu returnează nimic are întotdeauna tipul
`#!cpp void`.

Acest tip de funcții este utilizat, de exemplu, pentru a realiza operații care
nu necesită un rezultat întors, cum ar fi modificarea unor variabile globale sau
trecerea prin anumite pași recursivi.

De exemplu, putem scrie o funcție care să afle suma cifrelor unui număr, iar
rezultatul să fie ținut fie cu ajutorul unei variabile globale, fie cu ajutorul
unei variabile care va prelua rezultatul prin referință.

### Funcții care întorc valori prin parametri

Aceste funcții, de obicei de tip void, nu returnează valori direct prin
utilizarea cuvântului cheie `#!cpp return`. În schimb, ele modifică valorile
unor variabile transmise ca parametri prin referință. Acest lucru permite ca
variabilele utilizate în alte părți ale programului să fie actualizate direct,
fără a necesita o valoare returnată explicit.

Se folosește notația `#!cpp &nume` pentru a indica faptul că funcția va opera
asupra adresei de memorie a variabilei transmise, reflectând astfel orice
modificare la nivel global în program.

!!! note "Observație"

    Atunci când utilizăm parametri transmiși prin referință, este important ca
    variabilele să fie inițializate înainte de a fi trimise funcției. Altfel,
    există riscul apariției unor erori cauzate de utilizarea unor valori
    neinițializate.

Mai jos este exemplificată o funcție care calculează suma cifrelor unui număr,
actualizând direct variabila care va stoca rezultatul:

```cpp
--8<-- "cppintro/functions/functions9.cpp"
```

### Funcții care folosesc variabile auxiliare

Acest tip de funcție se bazează pe utilizarea unor variabile globale pentru
stocarea rezultatelor. Aceste funcții modifică variabile declarate în afara
funcției și pot fi utile în situații complexe, cum ar fi rezolvarea problemelor
care implică mai multe funcții interdependente. Totuși, utilizarea variabilelor
globale poate duce la dificultăți în menținerea codului, fiind recomandată doar
în cazuri bine justificate.

```cpp
--8<-- "cppintro/functions/functions10.cpp"
```

În acest caz, variabila globală `#!cpp suma` este actualizată direct în funcție,
permițând păstrarea rezultatului și accesarea sa oriunde în program.

## Funcții iterative

O funcție iterativă execută un set de instrucțiuni în mod repetitiv, folosind
structuri precum buclele, fără a apela alte instanțe ale funcției proprii.
Funcțiile prezentate până acum sunt toate exemple de funcții iterative.

Exemplul următor prezintă o implementare iterativă pentru calcularea sumei
cifrelor unui număr $n$:

```cpp
--8<-- "cppintro/functions/functions11.cpp"
```

În general, funcțiile iterative tind să fie mai rapide decât cele recursive și
sunt de preferat atunci când putem implementa un program folosind ambele metode.

## Funcții recursive

!!! example "Cunoștințe necesare"
    - [Funcții recursive](https://edu.roalgo.ro/cppintro/functions/#functii-recursive)

Spre deosebire de funcțiile iterative, cele recursive se pot auto-apela și acest
lucru poate fi foarte folositor atunci când avem nevoie să aflăm răspunsul
folosind o instanță mai simplă a funcției curente. Acest tip de funcție
utilizează stiva de execuție a programului pentru a memora starea fiecărui apel,
până la rezolvarea cazurilor de bază.

!!! note "Cazurile de bază"

    Pe lângă instrucțiunile obișnuite oricărei funcții, o funcție recursivă are
    și unul sau mai multe **cazuri de bază**, care sunt obligatorii pentru a
    evita apelarea la infinit a aceleiași funcții.

Astfel, pentru fiecare apel al unei funcții se adaugă pe stivă o zonă de memorie
în care se memorează variabilele locale și parametrii pentru apelul curent.
Această zonă a stivei va exista până la finalul apelului, după care se va
elibera. Dacă din apelul curent se face un alt apel, se adaugă pe stivă o nouă
zonă de memorie, iar conținutul zonei anterioare este inaccesibil până la
finalul acelui apel. Aceste operații se fac la fel și dacă al doilea apel este
un auto-apel al unei funcții recursive.

Aici puteți vedea cum aflăm în mod recursiv valoarea lui $n!$ folosind o funcție
recursivă.

```cpp
--8<-- "cppintro/functions/functions12.cpp"
```

Se poate observa faptul că ne folosim de definiția lui $n!$, iar pentru a afla
$n!$, avem nevoie de $(n-1)!$ și așa mai departe. Dacă vrem să calculăm valoarea
lui $5!$, aceasta se obține în felul următor (pentru brevitate, `#!cpp
factorial(n)` este $n!$):

- $5! = 4! \cdot 5$
- $4! = 3! \cdot 4$
- $3! = 2! \cdot 3$
- $2! = 1! \cdot 2$
- $1! = 1$, caz de bază

Pentru a calcula $n!$, trebuie să aflăm toate factorialele până la $1!$, iar mai
apoi folosim aceste rezultate invers pentru a primi răspunsul în valoarea
cerută.

Acest mod de a scrie funcțiile este foarte folosit în multe tipuri de aplicații,
cum ar fi metoda divide et impera, programarea dinamică, teoria grafurilor
ș.a.m.d.

## Exerciții rezolvate

Adesea, în variantele de examen pentru bacalaureat și admitere, întâlnim
exerciții care necesită evaluarea rezultatelor unor funcții, iar majoritatea
acestora sunt recursive.

Pentru a evalua aceste funcții, recomandăm citirea codului cu atenție și notarea
apelurilor de funcție în ordinea în care apar, ținând cont de locul în funcție
unde apelurile următoare au loc.

### Exercițiu bacalaureat - Care este valoarea lui $f(38)$?

```cpp
--8<-- "cppintro/functions/functions13.cpp"
```

- $f(38)$ - $38 \% 3 = 2$, deci intrăm în else și apelăm $f(12)$.
- $f(12)$ - $12 \% 3 = 0$, deci intrăm în if, **afișăm 3** și apelăm $f(4)$.
- $f(4)$ - $4 \% 3 = 1$, deci intrăm în else și apelăm $f(1)$.
- $f(1)$ - $1 \% 3 = 1$, deci intrăm în else și apelăm $f(0)$.
- $f(0)$ - deoarece $x = 0$, nu se face niciun apel suplimentar, iar funcția se
  întoarce.
- $f(1)$ - după apelul lui $f(0)$, **afișăm $1 \% 3 = 1$**.
- $f(4)$ - după apelul lui $f(1)$, **afișăm $4 \% 3 = 1$**.
- $f(12)$ - după apelul lui $f(4)$, secvența se termină.
- $f(38)$ - după apelul lui $f(12)$, **afișăm $38 \% 3 = 2$**.

Astfel, secvența finală afișată va fi 3112.

### Exercițiu admitere - Care este valoarea lui $g(2, 1)$?

```cpp
--8<-- "cppintro/functions/functions14.cpp"
```

- $g(2, 1)$: $x > 0$, $y > 0$ $\rightarrow$ se va returna $g(1, g(2, 0))$.
- $g(2, 0)$: $x > 0$, $y = 0$ $\rightarrow$ se va returna $g(1, 1)$.
- $g(1, 1)$: $x > 0$, $y > 0$ $\rightarrow$ se va returna $g(0, g(1, 0))$.
- $g(1, 0)$: $x > 0$, $y = 0$ $\rightarrow$ se va returna $g(0, 1)$.
- $g(0, 1)$: $x = 0$ $\rightarrow$ se va returna $1 + 1 = 2$, deci $g(1, 0) =
  2$, deci $g(0, g(1, 0)) = g(0, 2)$ .
- $g(0, 2)$: $x = 0$ $\rightarrow$ se va returna $2 + 1 = 3$, deci $g(1, 1) =
  g(2, 0) = 3$.
- Astfel, $g(1, g(2, 0)) = g(1, 3)$.
- $g(1, 3)$: $x > 0$, $y > 0$ $\rightarrow$ se va returna $g(0, g(1, 2))$.
- $g(1, 2)$: $x > 0$, $y > 0$ $\rightarrow$ se va returna $g(0, g(1, 1))$.
- Deja știm că $g(1, 1) = 3$, deci $g(0, 3) = g(1, 2) = 4$. Astfel, $g(0, 4) =
  g(1, 3) = 5$.

Cu alte cuvinte, valoarea lui $g(2, 1) = 5$.

!!! note "Calculul funcției"

    Se poate observa că pentru a calcula eficient și corect aceste valori,
    trebuie o grămadă de atenție și mult exercițiu în contextul examenelor de
    admitere și bacalaureat, lucru ce îl vom aborda în detaliu în capitolul
    specific acestor examene.

### Problemă rezolvată - [cifminrec de pe pbinfo](https://www.pbinfo.ro/probleme/825/cifminrec)

Pentru a rezolva această problemă, se aplică recursivitatea, iar algoritmul
folosește faptul că numărul $n$ este format din numărul $\frac{n}{10}$ (fără
ultima cifră) și ultima cifră $n~\%~10$. Acest principiu face implementarea
recursivă mult mai simplă.

```cpp
--8<-- "cppintro/functions/functions15.cpp"
```

## Alte tipuri de funcții

### Funcții cu parametru implicit

Uneori, atunci când scriem funcții, avem parametri care primesc aceeași valoare
implicită. Acesta este cazul funcțiilor cu parametru implicit. Parametrii
impliciți se mai numesc și _opționali_, pentru că nu este nevoie să-i scriem
când apelăm funcția.

În C++, pentru a specifica un parametru implicit, acesta trebuie definit după
parametrii obișnuiți (sau „obligatorii”, dacă menținem analogia). De exemplu:

```cpp
--8<-- "cppintro/functions/functions16.cpp"
```

```cpp
--8<-- "cppintro/functions/functions17.cpp"
```

Motivul este următorul: dacă am avea următoarea funcție:

```cpp
--8<-- "cppintro/functions/functions18.cpp"
```

atunci în momentul în care apelăm `#!cpp fun(10, 2)`, este ambiguu ce valoare ia
`#!cpp y`, `#!cpp x` și `#!cpp k`. În C++ nu putem scrie `#!cpp fun(y=10, x=2)`
ca în Python, și nici nu avem o metodă să omitem parametrii impliciți (adică nu
putem scrie `#!cpp fun(??, 10, 2)`).

### Problema [div3 de pe pbinfo](https://www.pbinfo.ro/probleme/996/div3)

Pentru a explica această noțiune, am folosit o funcție care preia suma cifrelor
drept parametru implicit și află recursiv suma cifrelor unui număr, folosind
parametrul implicit care trebuie menționat acum.

Se remarcă faptul că atunci când apelăm această funcție din main, menționarea
valorii parametrului $s$ nu este necesară.

```cpp
--8<-- "cppintro/functions/functions19.cpp"
```

### (Opțional) Funcțiile lambda

!!! note "Funcțiile lambda"

    Cunoașterea acestora este opțională în contextul examenelor de bacalaureat
    și admitere, dar se recomandă înțelegerea lor în contextul claselor mai mari
    la olimpiadă. Totuși, acestea nu reprezintă un element care trebuie
    obligatoriu învățat.

Versiunile mai recente ale limbajului C++ permit utilizatorilor folosirea unor
funcții pe stilul celor din limbajele funcționale. Acestea se numesc funcții
lambda.

Vezi pagina dedicată
[funcțiilor lambda](https://edu.roalgo.ro/cppintro/lambda/).

## Concluzii

Funcțiile scrise de utilizator sunt unul din cele mai importante unelte pe care
le poate folosi un programator, fiind concepute pentru a fi ușor de folosit și
reutilizabile, astfel încât ne permit simplificarea semnificativă a programelor
scrise.

## Probleme suplimentare

- [sumciff pbinfo](https://www.pbinfo.ro/probleme/897/sumciff)
- [oglindit2 pbinfo](https://www.pbinfo.ro/probleme/24/oglindit2)
- [celmaimicnr pbinfo](https://www.pbinfo.ro/probleme/26/celmaimicnr)
- [zerof pbinfo](https://www.pbinfo.ro/probleme/1826/zerof)
- [sumciff pbinfo](https://www.pbinfo.ro/probleme/897/sumciff)
- [factorialrec pbinfo](https://www.pbinfo.ro/probleme/820/factorialrec)
- [cmmdcrec pbinfo](https://www.pbinfo.ro/probleme/821/cmmdcrec)
- [Manna - Pnueli pbinfo](https://www.pbinfo.ro/probleme/828/manna-pnueli)
- [cât mai multe probleme din acest capitol pentru subprograme
  iterative](https://www.pbinfo.ro/probleme/categorii/13/subprograme)
- [cât mai multe probleme din acest capitol pentru subprograme
  recursive](https://www.pbinfo.ro/probleme/categorii/81/recursivitate)

## Resurse suplimentare

- [Subprograme - pbinfo](https://www.pbinfo.ro/articole/3656/subprograme)
- [Recursivitate - pbinfo](https://www.pbinfo.ro/articole/3873/recursivitate)
- [Subprograme - CPPI
  Sync](https://cppi.sync.ro/materia/probleme_diverse_simple.html)
- [Recursivitate - CPPI
  Sync](https://cppi.sync.ro/materia/probleme_diverse_de_fixare_a_metodei.html)
- [Recursivitate cu mai multe autoapeluri - CPPI
  Sync](https://cppi.sync.ro/materia/recursivitate_cu_mai_multe_autoapeluri.html)
- [Material subprograme - CNI Tudor
  Vianu](<http://www.lbi.ro/~carmen/vineri/Subprograme%20iterative(pdf)/Subprograme%20Cpp.pdf>)
- [Functii in C/C++ -
  Algopedia](https://www.algopedia.ro/wiki/index.php/Clasa_a_VI-a_lec%C8%9Bia_37_-_29_mai_2019#Func%C8%9Bii_%C3%AEn_limbajul_C)
- [Functions -
  w3schools](https://www.w3schools.com/cpp/cpp_functions.asp#:~:text=A%20function%20is%20a%20block,and%20use%20it%20many%20times.)
