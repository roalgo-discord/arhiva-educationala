---
id: bases
author:
- Ștefan-Iulian Alecu
prerequisites:
- basic-math
tags:
- matematica
- baze de numeratie
---

## Sisteme de numerație

!!! info "Definiție"

    Un *sistem de numerație* este alcătuit dintr-o mulțime finită de simboluri
    (denumite convențional „cifre”) și un set de reguli de reprezentare a numerelor
    cu ajutorul simbolurilor respective. Numărul de simboluri constituie *baza*
    sistemului de numerație.
    
În general, folosim sisteme de numerație *poziționale*, pentru care pozițiile
simbolurilor corespund puterilor bazei sistemului de numerație. Un exemplu de
sistem de numerație nepozițional este cel roman.

Sistemul de numerație pe care îl folosim în viața de zi cu zi este cel zecimal,
pentru că are zece simboluri: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9. În sistemul binar,
se folosesc doar două simboluri: 0 și 1. În sistemul hexazecimal avem 16
simboluri: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F, unde A reprezintă 10,
B reprezintă 11 ș.a.m.d. până la F care este 15.

Putem generaliza discuția dacă vom nota cu $b$ ($b \in \mathbb{N}$, $b > 1$)
baza de numerație (sau „baza” de acum încolo). Motivul pentru care alegem $b >
1$ este că baza 1 este trivială: este număratul cu bețișoare pe care îl facem
când suntem mici.

Fiecare cifră dintr-un număr valorează de $b$ ori mai mult decât cifra din
dreapta sa. Vom considera cifrele numerotate de la dreapta (de la cifra
unităților, aceasta considerându-se pe poziția 0). Cifrele numărului așadar
corespund pozițional puterilor bazei sistemului de numerație.

Dacă avem numărul $\overline{c_k c_{k-1} \dots c_{1} c_0}_{(b)}$ în baza $b$, atunci
în baza 10 numărul va fi scris ca: $c_k b^k + c_{k-1} b^{k-1} + \dots + c_1
b^1 + c_0 b^0$.

Să vedem niște exemple:

| Numărul dat | Baza | Formula | Valoarea în baza 10 |
| ----------: | ---- | ------: | :----------------- |
| 100101 | 2 | $1 \cdot 2^5 + 0 \cdot 2^4 + 0 \cdot 2^3 + 1 \cdot 2^2 + 0 \cdot 2^1 + 1 \cdot 2^0$ | 37 |
| 21012 | 3 | $2 \cdot 3^4 + 1 \cdot 3^3 + 0 \cdot 3^2 + 1 \cdot 3^1 + 2 \cdot 3^0$ | 194 |
| 4AF | 16 | $4 \cdot 16^2 + 10 \cdot 16^1 + 15 \cdot 16^0$ | 1199 |
| 10321 | 4 | $1 \cdot 4^4 + 0 \cdot 4^3 + 3 \cdot 4^2 + 2 \cdot 4^1 + 1 \cdot 4^0$ | 313 |
| 763 | 8 | $7 \cdot 8^2 + 6 \cdot 8^1 + 3 \cdot 8^0$ | 499 |
| 43210 | 5 | $4 \cdot 5^4 + 3 \cdot 5^3 + 2 \cdot 5^2 + 1 \cdot 5^1 + 0 \cdot 5^0$ | 2930 |

Ne putem imagina că procesul de a trece un număr din baza 10 în baza $b$ ar fi
invers. Să zicem că avem numărul 1199 în baza 10 și vrem să-l convertim în baza
16. Nu are o valoare de la 0 la 15, așa că nu este doar o singură cifră. Dacă
împărțim 1199 la 16, vedem că 1199 / 16 = 74 și 1199 % 16 = 15. Cu alte cuvinte,
1199 = 74 ⋅ 16 + 15. Din păcate, nu avem o cifră pentru 74, așa că repetăm
procesul. Putem vedea că 74 = 4 ⋅ 16 + 10. Dacă ducem asta în formula noastră,
asta înseamnă că 1199 = (4 ⋅ 16 + 10) ⋅ 16 + 15, sau $1199 = 4 \cdot 16^2 + 10
\cdot 16 + 15$, de unde putem scrie ca $4AF_{(16)}$.

Ca să ilustrez procesul mai bine:

$$
\begin{align*}
1199 &= 16 \cdot 74 + 15\\
74 &= 16 \cdot 4 + 10 \\
4 &= 16 \cdot 0 + 4
\end{align*}
$$

Algoritmul este următorul:

!!! info "Algoritmul de conversie din baza 10 în baza $b$"

    Pentru a converti un număr natural din baza 10 într-o bază $b$ ($b \in
    \mathbb{N}$, $b > 1$), vom face împărțiri succesive la $b$ până când obținem
    câtul 0. La primul pas, deîmpărțitul este numărul care se convertește, iar la
    ceilalți pași, câtul de la împărțirea precedentă devine deîmpărțit.
    Reprezentarea numărului în baza $b$ se obține considerând resturile în ordinea
    *inversă* obținerii lor.

Acest proces se poate extinde și pentru numerele cu virgulă. Luăm numărul 420.69. Știm deja cum să convertim 420. Pentru partea fracțională, este mai ușor dacă descompunem numărul astfel:

$$
\begin{align*}
420.69 &= 420 + \frac{69}{100}\\
&= 4 \cdot 10^2 + 2 \cdot 10^1 + 0 \cdot 10^0 + \frac{6 \cdot 10^1 + 9 \cdot 10^0}{10^2}\\
&= 4 \cdot 10^2 + 2 \cdot 10^1 + 0 \cdot 10^0 + 6 \cdot 10^{-1} + 9 \cdot 10^{-2}
\end{align*}
$$

Algoritmul de mai sus este la fel, doar că pentru partea fracționară trebuie să
*înmulțim*, nu să împărțim. Vrem să ajungem la câtul zero, și nu putem face asta
dacă împărțim un număr sub 1 la bază pentru că vom obține numere din ce în ce
mai mici.

Să încercăm acest lucru pentru 959.53, convertindu-l în baza 7. Pentru partea
întreagă, știm ce avem de făcut:

$$
\begin{align*}
959 &= 7 \cdot 137 + 0\\
137 &= 7 \cdot 19 + 4 \\
19 &= 7 \cdot 2 + 5\\
2 &= 7 \cdot 0 + 2
\end{align*}
$$

Adică $959_{(10)} = 2540_{(7)}$. Pentru partea fracționară, procedăm în felul
următor:

$$
\begin{align*}
0.53 \cdot 7 &= 3.71 \\&= 7 \cdot 0 + 3.71\\
3.71 \cdot 7 &= 25.97 \\&= 7 \cdot 3 + 4.97\\
4.97 \cdot 7 &= 34.79 \\&= 7 \cdot 4 + 6.79\\
6.79 \cdot 7 &= 47.53 \\&= 7 \cdot 6 + 5.53\\
5.53 \cdot 7 &= 38.71 \\&= 7 \cdot 5 + 3.71\\
\end{align*}
$$

Am ajuns la 3.71 din nou, deci cifrele se repetă. Așadar, $959.53_{(10)} =
2540.(3465)_{(7)}$ (unde parantezele reprezintă perioada).

În informatică este foarte util următorul rezultat:

!!! info "Conversia între baze puteri ale lui 2"

    Trecerea din baza doi într-o bază putere a lui 2 ($2^k$) se face astfel: se
    grupează cifrele numărului în baza 2 începând din dreapta, câte $k$, și se scrie
    în baza 10 valoarea obținută cu fiecare acest grup, acestea fiind cifrele
    numărului în baza $2^k$. Dacă un grup are mai puțin de $k$ cifre, vom completa
    în față cu cifre 0.
    
De pildă, să luăm numărul 110010010111110011 și să-l convertim în baza 16. Dacă
grupăm câte 4 ($16 = 2^4$), vom avea "(00)11 0010 0101 1111 0011" și putem
converti fiecare grup ca atare (vom avea "3 4 5 15 3", care se traduce în
$345F3_{(16)}$). Asta este motivul principal pentru care baza 16 este așa des
folosită în informatică: este o reprezentare mai compactă pentru șiruri binare.
Mai sunt folosite și baza 32 și baza 64 pentru acest scop.

## Problema 1 - [bazab](https://www.pbinfo.ro/probleme/426/bazab) (pbinfo)

Această problemă ne cere să aflăm cea mai mare cifră a reprezentării lui n în
baza b. Știm că aceasta este dată de restul la împărțirea lui $n$ cu $b$, așadar
este de ajuns să ținem minte acest rest și să-l comparăm cu restul precedent
pentru a vedea dacă este mai mare.

```cpp
--8<-- "usor/bases/bazab.cpp"
```

## Problema 2 - [baze](https://www.pbinfo.ro/probleme/945/baze) (pbinfo)

Aici trebuie să transformăm un număr din baza $b$ în baza $c$ (unde $2 \leq b, c
\leq 10$). Dacă ne imaginăm procesul, știm cum să convertim din baza $b$ în baza
10, și din baza 10 în baza $c$, deci dacă aplicăm aceste proceduri secvențial,
rezolvăm problema. Știm că baza 2 va avea cea mai lungă reprezentare, deci putem
estima numărul cifrelor ca fiind $\log_2(2^32) = 32$ (din moment ce are cel mult
10 cifre, putem presupune că poate fi stocat într-un `#!cpp unsigned int`).

```cpp
--8<-- "usor/bases/baze.cpp"
```

## Problema 3 - [CifBin](https://www.pbinfo.ro/probleme/429/cifbin) (pbinfo)

Aici situația este simplă: fie avem 0, fie avem 1, deci este ușor să numărăm
numărul de cifre 0 și numărul de cifre 1 bazat pe paritatea numărului. Dacă un
număr este impar, va avea 1 ca ultima cifră. Dacă ne aducem aminte de
reprezentarea unui număr, un număr impar va avea un $2^0$, adică un 1 pe prima
poziție, în timp ce un număr par va avea 0. Există moduri alternative prin care
s-ar putea rescrie soluția folosind [operațiile pe
biți](../mediu/bitwise-ops.md), dar asta este un subiect mai avansat.

```cpp
--8<-- "usor/bases/cifbin.cpp"
```

## Problema 4 - [transfb](https://www.pbinfo.ro/probleme/428/transfb) (pbinfo)

Aici ni se dă cifrele în baza $b$ și trebuie să transformăm acest număr în
baza 10. Această problemă este o aplicație trivială a algoritmului de conversie
discutat înainte. De notat că, din moment ce avem cifrele de la stânga la
dreapta și nu invers, trebuie să precalculăm cea mai mare putere a bazei ($b^n$)
înainte de a putea continua.

```cpp
--8<-- "usor/bases/transfb.cpp"
```

## Problema 5 - [pretios](https://www.pbinfo.ro/probleme/1479/pretios) (pbinfo)

!!! example "Cunoștințe necesare"
    - [Divizibilitate](./divisibility.md)
    - [Ciurul lui Eratostene](./sieve.md)

Această problemă este ceva mai dificilă. Trebuie să determinăm dacă lungimea
unui număr (numărul de biți) este primă. Deoarece numerele din intervalul
$[a,b]$ sunt foarte mari (până la $10^{18}$), este imposibil să verificăm
fiecare număr din acest interval. Totuși, observăm că numărul de biți pentru
orice număr din acest interval este întotdeauna între 1 și 64, deoarece
$2^{64}> 10^{18}$. 

Astfel, trebuie doar să verificăm dacă numărul de biți al unui număr este prim,
ceea ce este mult mai eficient. Așadar, este mai eficient să precalculăm
numerele prime între 1 și 64. Dacă $a$ și $b$ au un număr prim de
biți, începem să numărăm numerele prețioase, pentru că avem $p - a$, respectiv
$b - p + 1$ numere. După aceea, verificăm toate numerele de la `start` la `stop`
și dacă $i$ este prim, înseamnă că numerele din intervalul $[2^{i}, 2^{i + 1} -
1]$ au o lungime primă, deci asta va contribui la numărul de numere prețioase.
Aici este soluția:

```cpp
--8<-- "usor/bases/pretios.cpp"
```

## Probleme suplimentare

- [bazaminima pbinfo](https://www.pbinfo.ro/probleme/427/bazaminima)
- [ascunsa nerdarena](https://www.nerdarena.ro/problema/ascunsa)
- [douabaze pbinfo](https://www.pbinfo.ro/probleme/946/douabaze)
- [criptic nerdarena](https://www.nerdarena.ro/problema/criptic)
- [ONI 2014 zimeria](https://kilonova.ro/problems/1444)
- [suc1 nerdarena](https://www.nerdarena.ro/problema/suc1)
- [psychtraining infoarena](https://www.infoarena.ro/problema/psychtraining)
- [sticle infoarena](https://www.infoarena.ro/problema/sticle)
- [Lot 2010 Juniori puteri35](https://kilonova.ro/problems/1636)
- [OJI 2019 cate3cifre](https://kilonova.ro/problems/912)
- [ONI 2011 Baraj Seniori copii](https://kilonova.ro/problems/420)
- [nop infoarena](https://www.infoarena.ro/problema/nop)
- [ONI 2023 xidartros](https://kilonova.ro/problems/534)

## Lectură suplimentară

- [Articolul de baze de numerație de pe
  CPPI](https://cppi.sync.ro/materia/baze_de_numeratie.html)
- [Articolul de baze de numerație de pe
  PBInfo](https://www.pbinfo.ro/articole/5562/baze-de-numeratie)
- [Lecția 5, clasa a VI-a, 18 octombrie 2018 de pe
  Algopedia](https://www.algopedia.ro/wiki/index.php/Clasa_a_VI-a_lecția_5_-_18_oct_2018)
- [Lecția 6, clasa a VI-a, 18 octombrie 2018 de pe
  Algopedia](https://www.algopedia.ro/wiki/index.php/Clasa_a_VI-a_lecția_6_-_25_oct_2018)
