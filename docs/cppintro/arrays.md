---
tags:
    - vectori
    - implementare
---

**Autor**: Ștefan-Cosmin Dăscălescu, Ștefan-Iulian Alecu

!!! example "Cunoștințe necesare"
    - [Structura repetitivă](https://edu.roalgo.ro/cppintro/loops/)

Una din primele structuri de date pe care orice programator o folosește,
indiferent de limbajul de programare folosit este tabloul (array în engleză).
Aceștia stau la baza unui număr mare de prelucrări care necesită un volum mare
de date, iar în contextul rezolvării problemelor de algoritmică, tablouri sunt o
parte fundamentală atât în sine, cât și prin faptul că toate tablourile
multidimensionale sunt de fapt, tablouri unidimensionale puși împreună.
Colocvial, aceste tablouri mai sunt numite și vectori, dar trebuie evitată
confuzia cu vectorii din STL, prezentați ulterior.

!!! note "Observație"

    În memorie, tablourile sunt stocate secvențial, indiferent de numărul de
    dimensiuni pe care îl au.

În contextul limbajului C++, putem lucra cu tablourile în două moduri distincte:
fie folosind varianta standard, luată din limbajul C, fie folosind STL (Standard
Template Library). Conceptele din STL vor fi prezentate în capitolele
ulterioare, deoarece acesta nu conține doar tablouri dinamice. În acest capitol
voi insista mai ales pe varianta standard, lucrul cu STL fiind aprofundat mai cu
seamă în capitolele utile.

## Declararea și umplerea tablourilor statice

Pentru a declara un tablou și a da valori, trebuie să analizăm structura
acestuia. În mod similar cu variabilele simple, ne trebuie un tip de date pe
care acest tablou să-l stocheze, precum și dimensiunea pe care vrem să o
atribuim acestui tablou.

De exemplu, `#!cpp int v[101];` înseamnă ca am declarat un tablou cu 101
elemente, pozițiile fiind numărate de la 0 la 100.

!!! note "Observație"

    Dacă preferați să lucrați cu tablouri indexate de la 1, aveți grijă să
    adăugați 1 la dimensiunile pe care le folosiți pentru a adapta tablourile
    la stilul vostru de lucru. De asemenea, nu puteți începe tablourile de la
    indici negativi cum se poate în alte limbaje (Pascal, de pildă) și nici să-i
    folosiți pentru a lua elemente de la final (ca în Python).

!!! note "Observație"

    De obicei, dimensiunea maximă este una statică, dar putem transforma
    tablourile statice în structuri alocate dinamic folosind funcțiile din
    limbajul C. Totuși, acesta nu este scopul articolului de față, iar ulterior
    va fi prezentat STL.

Pentru a atribui o valoare unei anumite poziții, se va proceda similar ca la o
variabilă obișnuită, de exemplu `#!cpp v[5] = 7;` înseamnă că pe poziția 5,
vom avea acum valoarea 7.

Pentru a citi un vector, vom folosi de regulă o structură repetitivă, precum for
sau while, citind valorile pe rând, la fel cum am proceda cu variabile
obișnuite.

O altă metodă de a inițializa elementele dintr-un tablou este aceea de a atribui
valori primelor poziții, idee ce va fi folosită pe parcurs la diverși algoritmi,
un exemplu notabil fiind flood fill. De exemplu,
`#!cpp int A[] = {10, 20, 30};` va crea un tablou cu 3 elemente, unde
`#!cpp A[0] = 10; A[1] = 20;` ș.a.m.d.

### Problemă exemplu - [afisare0 de pe pbinfo](https://www.pbinfo.ro/probleme/546/afisare0)

Pentru a rezolva această problemă, va trebui mai întâi să citim valorile în
tablou, iar mai apoi să parcurgem valorile pentru a afla multiplii ultimului
element.

```cpp
--8<-- "cppintro/arrays/afisare0.cpp"
```

## Inserarea, ștergerea, inversarea valorilor dintr-un tablou

De multe ori în diverse aplicații, putem avea nevoie de operația de inserare și
de operația de ștergere din tablou, ambele operații fiind foarte importante
pentru a putea lucra în mod corespunzător cu tablourile. În exemplele pe care le
voi prezenta mai jos, voi presupune că tablourile sunt indexate de la 1.

### Inserarea în tablou

Dacă avem un tablou cu $n$ valori și vrem să inserăm o valoare nouă la poziția
$k$, unde $1 \leq k \leq n+1$, vom vrea mai întâi să mutăm valorile între
pozițiile $n$ și $k$ cu o poziție la dreapta, iar mai apoi vom atribui noua
valoare pe poziția $k$.  

```cpp
--8<-- "cppintro/arrays/ins_sterg_inv.cpp:inserare"
```

1. Tabloul va avea o valoare în plus, drept pentru care trebuie să creștem în
   consecință lungimea sa.

!!! warning "Atenție"

    Mutarea valorilor trebuie făcută în ordine descrescătoare a pozițiilor
    inițiale deoarece altfel, am ajunge să avem aceeași valoare peste tot.

    ```cpp
    --8<-- "cppintro/arrays/ins_sterg_inv.cpp:inserare_warning"
    ```

    Se poate observa cu ușurință că valoarea de pe poziția $k$ va ajunge peste
    tot dacă implementăm așa, ceea ce este greșit.

### Ștergerea din tablou

Dacă avem un tablou cu $n$ valori și vrem să ștergem valoarea de la poziția $k$,
unde $1 \leq k \leq n$, vom vrea să mutăm pe rând valorile de la pozițiile
$k+1$, $k+2$, ..., $n$ cu o poziție mai în spate. Spre deosebire de cazul
inserării, vom vrea să mutăm valorile în ordine crescătoare a poziției inițiale.

```cpp
--8<-- "cppintro/arrays/ins_sterg_inv.cpp:stergere"
```

1. Tabloul va avea o valoare în minus, drept pentru care trebuie să scădem în
   consecință lungimea sa.

!!! warning "Atenție"

    Mutarea valorilor trebuie făcută în ordine crescătoare a pozițiilor inițiale
    deoarece altfel, am ajunge să avem aceeași valoare peste tot.

    ```cpp
    --8<-- "cppintro/arrays/ins_sterg_inv.cpp:stergere_warning" 
    ```

### Inversarea unui tablou

Pentru a putea inversa un tablou, trebuie să știm numărul de elemente pe care îl
are. Scopul nostru este să avem pe poziția $i$ valoarea ce se afla anterior pe
poziția $n - i + 1$, implementarea nefiind prea dificilă. Pentru a păstra scopul
educativ, am implementat interschimbarea elementelor folosind "regula celor trei
pahare".

```cpp
--8<-- "cppintro/arrays/ins_sterg_inv.cpp:inversare"
```

1. Reținem valoarea lui `#!cpp v[i]` în `x`.
2. Interschimbăm `#!cpp v[i]` cu poziția echivalentă de la capătul tabloului,
   adică `#!cpp v[n - i + 1]`.
3. Reținem valoarea lui `#!cpp v[i]` în `x`.

## Interclasarea tablourilor

Pentru a putea interclasa două tablouri (de regulă, crescătoare) $A$ și $B$,
având $n$, respectiv $m$ elemente, vom vrea mereu să introducem valoarea mai
mică în tabloul unde ținem rezultatul, $C$, acesta având lungimea $n + m$. De
asemenea, vom vrea să avem grijă ca după ce prelucrăm complet unul din cele două
tablouri, să continuăm inserările cu cel de-al doilea tablou, unul din ele ar
rămâne mereu cu valori.

!!! note "Observație"

    Folosind acest algoritm de interclasare, putem obține un tablou crescător în
    $\mathcal{O}(n + m)$, unde $n$ și $m$ sunt lungimile celor două șiruri.

!!! note "Observație"

    Folosind un algoritm similar cu cel prezentat mai jos, putem implementa
    diverse operații pe mulțimi, precum reuniunea, intersecția și diferența.

```cpp
--8<-- "cppintro/arrays/interclasare.cpp"
```

## Rotirea tablourilor

!!! note "Observație"

    Veți găsi această metodă numită și permutarea circulară a valorilor dintr-un
    șir, deoarece dacă operăm această operație de un număr suficient de ori, vom
    reveni la configurația inițială.

Pentru a putea roti un tablou (mutarea valorilor din el cu un număr $k$ de
poziții la stânga sau la dreapta), va trebui mai întâi să păstrăm în memorie
valoarea de pe primele/ultimele $k$ poziții, să mutăm secvențial celelalte
valori și în cele din urmă să mutăm valorile păstrate pe ultimele/primele $k$
poziții în șirul nou rezultat.

Deși algoritmul prezentat este unul liniar, mai târziu puteți descoperi o
structură de date ce permite rotația unui tablou cu o singură poziție la stânga
sau dreapta.

```cpp
--8<-- "cppintro/arrays/rotire.cpp:rotire"
```

=== "Rotire la stânga"

    ```cpp
    --8<-- "cppintro/arrays/rotire.cpp:rotire_stanga"
    ```

=== "Rotire la dreapta"

    ```cpp
    --8<-- "cppintro/arrays/rotire.cpp:rotire_dreapta"
    ```

## Sortarea tablourilor

În multe probleme, suntem nevoiți să ordonăm valorile din șir conform unui
algoritm. În funcție de performanța de care avem nevoie, putem avea algoritmi în
complexitate $O(n^2)$, $O(n \log n)$ și multe alte clase de complexități.

Pentru mai multe detalii, recomandăm citirea articolului pe acest subiect, pe
care îl puteți găsi [aici](https://edu.roalgo.ro/usor/sorting/).

## Concluzii

Lucrul cu tablouri unidimensionale este esențial oricărui algoritmist,
principiile menționate aici fiind aplicate în diverse moduri și în ceea ce
privește alte structuri de date, așa cum veți putea observa în problemele cu
matrici și în diferiți algoritmi care au la bază metodele folosite mai sus.

## Probleme suplimentare

- [Problemele usoare si medii din capitolul Parcurgerea
  vectorilor](https://www.pbinfo.ro/probleme/categorii/9/tablouri-unidimensionale-vectori-parcurgerea-vectorilor)
- [Problemele usoare si medii din capitolul Ștergeri și inserări de elemente în
  vectori](https://www.pbinfo.ro/probleme/categorii/157/tablouri-unidimensionale-vectori-Stergeri-si-inserari-de-elemente-in-vectori)
- [Problemele usoare si medii din capitolul Verificarea unor
  proprietăţi](https://www.pbinfo.ro/probleme/categorii/49/tablouri-unidimensionale-vectori-verificarea-unor-proprietati)
- [Problemele usoare si medii din capitolul
  Interclasare](https://www.pbinfo.ro/probleme/categorii/156/tablouri-unidimensionale-vectori-interclasare)

## Resurse suplimentare

- [Declararea și parcurgerea tablourilor
  unidimensionale](https://www.pbinfo.ro/articole/5583/declararea-si-parcurgerea-tablourilor-unidimensionale)
- [Ștergeri și inserări de
  elemente](https://www.pbinfo.ro/articole/5584/stergeri-si-inserari-de-elemente)
- [Verificarea unor
  proprietăți](https://www.pbinfo.ro/articole/5586/verificarea-unor-proprietati)
- [Interclasarea
  tablourilor](https://www.pbinfo.ro/articole/5588/interclasarea-tablourilor)
