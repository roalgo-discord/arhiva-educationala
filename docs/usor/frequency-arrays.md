---
id: frequency-arrays
authors: [stefdasca, stalecu]
prerequisites:
    - arrays
tags:
    - vectori 
    - frecventa
    - implementare
---

## Introducere

În multe probleme, suntem nevoiți să lucrăm cu foarte multe valori cuprinse
într-un interval relativ mic. Pentru a face lucrul cu ele mai ușor, se impune
numărarea lor și păstrarea datelor într-o structură de date potrivită.

Astfel, se impune folosirea unui vector de frecvență.

!!! info "Definiție"

    Așa cum sugerează și numele, un vector de frecvență este o structură de date
    de tip tablou pe care o folosim pentru a ține în memorie de câte ori apare
    fiecare element într-un șir de numere.

!!! example "Exemplu"

    De exemplu, dacă șirul nostru conține valorile $8, 1, 4, 1, 6, 3, 5, 2, 2,
    4$, vectorul de frecvență va avea următoarea formă: $0, 2, 2, 1, 1, 1, 1, 0,
    1$, cu semnificația că 0 nu apare deloc, 1 apare de două ori, 2 apare
    de două ori, iar celelalte valori, cu excepția lui 7, apar o singură dată.

Această structură de date se folosește atunci când numerele (sau în general,
datele cu care lucrăm) pot lua puține valori distincte sau se află într-un
interval mic.

!!! note "Observație"

    În general, vrem să folosim vectorii de frecvență dacă stocarea
    informațiilor legat de valorile pe care le folosim devine mult mai facilă
    din punct de vedere al memoriei sau timpului comparat cu stocarea lor în
    vectorul deja existent. În probleme, acest lucru se remarcă mai ales dacă
    valorile nu sunt foarte mari (până în $10^6$) sau dacă diferența dintre cel
    mai mare și cel mai mic element este mică.

Pe parcursul acestui articol, voi prezenta câteva probleme, pentru a explica
diferitele variații ale acestei metode precum și alte moduri în care putem
păstra acest vector în memorie.

!!! note "Vector caracteristic"

    În unele cărți și articole, dacă vectorul de frecvență este folosit doar
    pentru a verifica existența unor valori, se mai folosește denumirea de
    vector caracteristic.

## Problema [cifreord de pe pbinfo](https://www.pbinfo.ro/probleme/244/cifreord)

O soluție posibilă pentru această problemă este să sortăm valorile folosind unul
din algoritmii de sortare explicat [aici](./sorting.md).

Totuși, numărul de valori este prea mare și această abordare ar depăși limita de
timp alocată. În schimb, ne putem folosi de faptul că lucrăm doar cu cifre
zecimale și le putem afișa pe acestea corespunzător cu frecvența lor. Trebuie să
avem grijă și să afișăm o linie nouă de fiecare dată când afișăm 20 de numere,
conform cerinței din enunț.

```cpp
--8<-- "usor/frequency_arrays/cifreord.cpp"
```

## Problema [numere1 de pe pbinfo](https://www.pbinfo.ro/probleme/525/numere1)

Pentru a rezolva această problemă, cea mai importantă informație pe care o
primim din enunț este aceea că valorile care ne interesează sunt strict cele
care au trei cifre (cu alte cuvinte, cele între 100 și 999). Astfel, se
impune crearea unui vector de frecvență care să poată memora aceste valori și
după ce citim valorile din șir, se pot afla cu ușurință cele mai mari două
valori de trei cifre care nu se află în șir.

```cpp
--8<-- "usor/frequency_arrays/numere1.cpp"
```

## Problema [nrlipsa2 de pe pbinfo](https://www.pbinfo.ro/probleme/1744/nrlipsa2)

Pentru a citi acel număr necunoscut de valori, va trebui să ne bazăm pe o
structură repetitivă de tip while. Apoi, pentru a lucra cu valorile din
intervalul $[-100, 100]$, trebuie să adaptăm lucrurile la realitatea limbajului
C++, și anume la faptul că nu putem păstra indici negativi în vector.

Astfel, în loc să lucrăm cu acel interval, vom vrea să adunăm o valoare (un
offset) care să ne asigure că lucrăm cu valori non-negative (astfel, intervalul
devine $[0, 200]$). Ulterior, atunci când afișăm valoarea care nu apare, vom
scădea 100 din răspuns pentru a întoarce rezultatul la cel real.

```cpp
--8<-- "usor/frequency_arrays/nrlipsa2.cpp"
```

## Problema [mincifre de pe pbinfo](https://www.pbinfo.ro/probleme/1546/mincifre)

Pentru a rezolva această problemă, putem ține cifrele într-un vector de
frecvență și să le afișăm crescător, singura diferență fiind faptul că deoarece
nu vrem să avem numere care încep cu 0, vom afișa cea mai mică cifră nenulă la
început.

```cpp
--8<-- "usor/frequency_arrays/mincifre.cpp"

```

## Problema [numere OJI 2005](https://kilonova.ro/problems/735)

Pentru a rezolva această problemă, trebuie să citim cele $n^2$ valori și să
ținem într-un vector de frecvență valorile pe care le-am obținut.

Ulterior, problema se reduce la a afla cel mai mic și cel mai mare număr care nu
apare în șir.

!!! note "Observație"

    Deși datele de intrare sunt date drept o matrice de dimensiune $n$, nu
    trebuie să folosim vreun tablou bidimensional pentru a rezolva această
    problemă.

```cpp
--8<-- "usor/frequency_arrays/numere.cpp"
```

## Vectori de frecvență dinamici - map și set

După cum ați observat, vectorii de frecvență au cel mai important rol atunci
când vrem să păstrăm valori relativ mici. Dar ce facem atunci când valorile sunt
mari?

În acest caz, se impune folosirea unor structuri de date mai avansate, cum ar fi
`#!cpp std::map` și `#!cpp std::set`.

În privința `#!cpp std::map`, acesta poate fi folosit în acest context exact ca
vectorii de frecvență, având posibilitatea să stocăm dinamic frecvența valorilor
care apar, fără a avea nevoie de $\mathcal{O}(valmax)$ memorie. Totuși, această metodă
vine cu un cost, și anume faptul că complexitatea operațiilor este $\mathcal{O}(\log n)$,
spre deosebire de $\mathcal{O}(1)$ pentru metoda clasică.  

În privința `#!cpp std::set`, acesta poate fi folosit în acest context exact ca
vectorii caracteristici (pentru frecvențe mai mari ca 1, `#!cpp std::map` este o
metodă strict superioară), având posibilitatea să stocăm dinamic valorile care
apar, fără a avea nevoie de $\mathcal{O}(valmax)$ memorie. La fel ca la structura de date
precedentă, această metodă vine cu un cost, și anume faptul că complexitatea
operațiilor este $\mathcal{O}(\log n)$, spre deosebire de $\mathcal{O}(1)$ pentru metoda clasică.  

### Problema [map de pe pbinfo](https://www.pbinfo.ro/probleme/2217/map)

```cpp
--8<-- "usor/frequency_arrays/map.cpp"
```

## Concluzii

Vectorii de frecvență sunt o metodă foarte populară, ce folosește această
structură de date cu scopul de a ține memorat numărul de valori egale cu o
anumită valoare. Aceștia sunt folositori pentru foarte multe tipuri de probleme
și reprezintă parte esențială a altor algoritmi, precum [ciurul lui
Eratostene](./sieve.md).

De asemenea, aceștia se regăsesc frecvent în subiectele de bacalaureat și
admitere, mai ales atunci când problemele cer aflarea eficientă a unei soluții
care implică optimizări de timp și memorie.

## Probleme suplimentare

- [unice pbinfo](https://www.pbinfo.ro/probleme/267/unice)
- [pareimpare pbinfo](https://www.pbinfo.ro/probleme/276/pareimpare)
- [litere infoarena](https://www.infoarena.ro/problema/litere)
- [2lap pbinfo](https://www.pbinfo.ro/probleme/2414/2lap)
- [frecventa1 pbinfo](https://www.pbinfo.ro/probleme/301/frecventa1)
- [RoAlgo Contest 11 Costmin](https://kilonova.ro/problems/3203)
- [OJI 2004 control](https://kilonova.ro/problems/727)
- [ONI 2015 lightbot](https://kilonova.ro/problems/1458)
- [OMI Iasi 2024 cifre](https://kilonova.ro/problems/2321)
- [OJI 2023 primprim](https://kilonova.ro/problems/514/)
- [Probleme cu vectori de frecvență de pe pbinfo](https://www.pbinfo.ro/probleme/categorii/45/tablouri-unidimensionale-vectori-vectori-caracteristici-de-frecventa)
- [Probleme cu vectori de frecvență de pe kilonova](https://kilonova.ro/tags/425)

## Resurse suplimentare

- [Vectori caracteristici și de frecvență - pbinfo](https://www.pbinfo.ro/articole/5617/vectori-caracteristici-si-de-frecventa)
- [Vectori de frecvență (probleme standard) - CPPI Sync](https://cppi.sync.ro/materia/probleme_standard.html)
- [Vectori de frecvență - Algopedia](https://www.algopedia.ro/wiki/index.php/Clasa_a_V-a_lec%C8%9Bia_24_-_1_feb_2020#Vectori_de_frecven%C8%9B%C4%83_(vectori_caracteristici))
