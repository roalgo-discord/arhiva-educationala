---
tags:
    - structuri de date
    - Coadă
    - Lee
    - Fill
    - Stiva
    - BFS
    - DFS
---

**Autor:** Ștefan-Cosmin Dăscălescu, Teodor Ștefan Manolea

## Introducere

Să presupunem că avem de-a face cu un labirint cu diverse tipuri de obstacole și spații libere, iar obiectivul nostru este acela de a afla dacă putem ajunge de la punctul $A$ la punctul $B$, unde punctele $A$ și $B$ sunt date în input. În alte variații ale acestui tip de probleme, ni se poate cere și aflarea distanței minime între două sau mai multe puncte. 

!!! info "Resursă foarte utilă"
    Recomandăm softul făcut de cei de la Liceul Emil Racoviță Iași, atât pentru valoarea istorică, cât și pentru claritatea explicațiilor grafice, soft educațional pe care îl găsiți [aici](http://ler.is.edu.ro/~ema/proiecte/soft/2022/algoritmul_lui_lee/index/index.html).

Pe parcurs, veți observa că indiferent de modul în care veți rezolva aceste clase de probleme, multe dintre principiile pe care le folosiți vor rămâne aceleași, în special atunci când vine vorba de implementarea acestor tipuri de parcurgeri. 

Cele două moduri principale de a rezolva această categorie de probleme sunt fie folosind algoritmi de tip flood fill recursiv (numit și fill în jargonul românesc), fie folosind algoritmi iterativi de parcurgere ai labirintului (numit algoritmul lui Lee în literatura de specialitate românească).

În cele ce urmează, voi prezenta atât flood fill-ul recursiv, cât și algoritmul lui Lee.

## Fundamente

Până să ajungem să discutăm implementarea algoritmilor în sine, vom prezenta câțiva pași importanți pe care trebuie să-i facem până ajungem să implementăm complet acești doi algoritmi, precum și cunoștințele necesare.

### Cunoștințe necesare 

În ceea ce privește metodele iterative, folosite la algoritmul lui Lee, cunoașterea cozii este obligatorie, detalii despre modul de implementare, precum și variațiile acestei structuri de date pot fi găsite [aici](https://roalgo-discord.github.io/arhiva-educationala/mediu/queue/).

În ceea ce privește metodele recursive, folosite la flood fill, cunoașterea stivei și a recursivității este obligatorie, detalii despre modul de folosire al stivei pot fi găsite [aici](https://roalgo-discord.github.io/arhiva-educationala/mediu/stack/), iar informații despre implementarea funcțiilor recursive se găsesc [aici](https://roalgo-discord.github.io/arhiva-educationala/usor/functions/).

O altă noțiune care se recomandă a fi cunoscută în prealabil este tipul de date pair sau o alternativă a acestuia (tuple sau dacă preferați implementările în stilul C, tipul de date struct, care permite și alte modificări după caz).

### Vectorii de direcție

În majoritatea problemelor de acest tip, personajele noastre se vor deplasa folosind mutări succesive pe una dintre cele $4$ sau $8$ direcții care ne sunt permise de problemă (de regulă, direcțiile cardinale - nord, est, sud, vest și eventual direcțiile diagonale - nord-est, sud-est, sud-vest, nord-vest).

Pentru a stoca în memorie aceste dimensiuni cu ușurință, vom ține în memorie toate direcțiile posibile, iar pentru a face scrierea lor ușoară, se recomandă scrierea lor în sensul acelor de ceasornic. Acestea se pot scrie toate la început, noi putând folosi fie arrays din C, fie vectori. 

Mai jos găsiți modul de declarare a acestor vectori de direcție atunci când putem merge doar în direcția celor $4$ vecini cardinali.

```cpp
int ox[] = {-1, 0, 1, 0};
int oy[] = {0, 1, 0, -1};
```

```cpp
vector<int> ox = {-1, 0, 1, 0};
vector<int> oy = {0, 1, 0, -1};
```

Pentru a extinde acum la $8$ vecini, vom insera direcțiile intermediare în ordinea acelor de ceasornic, mai jos găsiți modul de declarare a acestor vectori de direcție pentru toate direcțiile, începând de la N și terminând cu NV, în sens orar. 

```cpp
int ox[] = {-1, -1, 0, 1, 1, 1, 0, -1};
int oy[] = {0, 1, 1, 1, 0, -1, -1, -1};
```

```cpp
vector<int> ox = {-1, -1, 0, 1, 1, 1, 0, -1};
vector<int> oy = {0, 1, 1, 1, 0, -1, -1, -1};
```

O alternativă folosită în multe coduri constă în enumerarea vecinilor în ordine crescătoare a schimbării care se produce pe linie, mai întâi prioritizând vecinii nordici, apoi cei centrali și apoi cei sudici.

```cpp
int ox[] = {-1, -1, -1, 0, 0, 1, 1, 1};
int oy[] = {-1, 0, 1, -1, 1, -1, 0, 1};
```

```cpp
vector<int> ox = {-1, -1, -1, 0, 0, 1, 1, 1};
vector<int> oy = {-1, 0, 1, -1, 1, -1, 0, 1};
```

Indiferent de modul în care îi declarați, dacă sunteți la un punct $(x, y)$ și vreți să verificați toți vecinii, tot ce trebuie să faceți este să parcurgeți vectorii de direcție și să identificați valorile vecinilor. 

```cpp
for (int i = 0; i < neighbors; i++) {
    int nxt_x = x + ox[i];
    int nxt_y = y + oy[i];
    // aici urmeaza verificarile ulterioare
}
```

## Algoritmul fill (flood fill recursiv)

### Implementare

## Algoritmul lui Lee

### Implementare

## Problemă introductivă

### Problemă exemplu

### Problemă exemplu 2

## Lee cu mai multe origini

### Problemă exemplu 3

## Algoritmul 0-1 BFS

Deși acest algoritm este folosit în principal pentru problemele de drumuri minime pe grafuri, există exemple care implică și probleme pe matrici, așa cum se precizează în [articolul nostru despre drumuri minime](https://roalgo-discord.github.io/arhiva-educationala/mediu/shortest-path/?h=bfs#0-1-bfs).

## Lee cu structuri de date 

### Lee cu seturi

### Lee cu coadă de priorităti

## Concluzii

## Probleme suplimentare

* [OJI 2004 rj](https://kilonova.ro/problems/734)
* [OJI 2007 alee](https://kilonova.ro/problems/768)
* [RoAlgo Contest #1 - Expansion](https://kilonova.ro/problems/664/)
* [USACO Silver Icy Perimeter](https://usaco.org/current/current/index.php?page=viewproblem2&cpid=895)
* [USACO Silver Cross Country Skiing](http://www.usaco.org/index.php?page=viewproblem2&cpid=380)
* [OJI 2021 labirint](https://kilonova.ro/problems/938)
* [OJI 2009 insule](https://kilonova.ro/problems/398)
* [USACO Silver Where's Bessie](http://www.usaco.org/index.php?page=viewproblem2&cpid=740)
* [OJI 2018 castel](https://kilonova.ro/problems/900)
* [ONI 2014 traseu](https://kilonova.ro/problems/1429)
* [ONI 2012 gheizere](https://kilonova.ro/problems/1396)
* [Codeforces Olya and Energy Drinks](https://codeforces.com/problemset/problem/877/D)
* [USACO Silver Comfortable Cows](http://www.usaco.org/index.php?page=viewproblem2&cpid=1110)
* [USACO Silver Snow Boots](https://usaco.org/index.php?page=viewproblem2&cpid=811)
* [Lot Juniori 2021 Fete si baieti](https://kilonova.ro/problems/1700)
* [OJI 2016 miting](https://kilonova.ro/problems/875)
* [Problemele cu flood fill de pe kilonova](https://kilonova.ro/tags/356)

## Lectură suplimentară

* [Flood fill - USACO Guide](https://usaco.guide/silver/flood-fill?lang=cpp)
* [BFS Fill - Algoritmul lui Lee - Algopedia](https://www.algopedia.ro/wiki/index.php/Clasa_a_VII-a_lec%C8%9Bia_14_-_12_dec_2019#BFS_Fill_(algoritmul_lui_Lee))
* [Algoritmul lui Lee - infogenius](https://infogenius.ro/algoritmul-lui-lee/)
* [Algoritmul lui Lee - infoarena](https://infoarena.ro/algoritmul-lee)
* [Algoritmul lui Lee - pbinfo](https://www.pbinfo.ro/articole/18589/algoritmul-lui-lee)
* [Cozi - CPPI Sync](https://cppi.sync.ro/materia/cozi.html)
* [Flood fill - wikipedia](https://en.wikipedia.org/wiki/Flood_fill)
* [Algoritmi de umplere - generalitati - Pbinfo](https://www.pbinfo.ro/articole/18892/algoritmi-de-umplere-generalitati)
* [Algoritmi de umplere - fill recursiv - Pbinfo](https://www.pbinfo.ro/articole/18893/fill-recursiv)
* [Algoritmi de umplere - fill cu coada - Pbinfo](https://www.pbinfo.ro/articole/18894/fill-cu-coada)
* [An Efficient (and quite common) Way to Navigate Grid Problems - Codeforces](https://codeforces.com/blog/entry/78827)
* [0-1 BFS - Codeforces](https://codeforces.com/blog/entry/22276)