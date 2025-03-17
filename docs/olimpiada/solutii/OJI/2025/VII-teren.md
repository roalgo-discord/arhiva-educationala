---
id: OJI-2025-VII-teren
title: Soluția problemei teren (OJI 2025, clasa a VII-a)
# problem_id: 2513
authors: [dpopa]
prerequisites:
    - matrices
    - partial-sums
tags:
    - OJI
    - clasa VII
draft: true
---

## Cerința 1

Se citesc coordonatele de început ale însămânțării $L_1$, $C_1$ și coordonatele
de sfârșit $L_2$, $C_2$. Dacă $L_1 = L_2$ la numărul de semințe aruncate se
adună $1 + |C_1-C_2|$, altfel se adună $1 + |L_1-L_2|$.

## Precalculări pentru cerința 2 și 3

Atât pentru cerința 2 cât și pentru cerința 3 se folosesc 5 matrici: matricea
$o$ pentru parcurgerile orizontale, $v$ pentru cele verticale, $dp$ pentru cele
paralele cu diagonala principală, $ds$ pentru parcurgerile paralele cu diagonala
secundară. Pentru fiecare zbor/parcurgere se aplică [difference
array](../../../../usor/partial-sums.md/#smenul-lui-mars). Deoarece parcurgerea
este liniară difference array se aplică exact ca la vectori: Pentru parcurgerile
orizontale (unde $L_1 = L_2$):

```cpp
o[L1][min(C1, C2)]++;
o[L1][max(C1, C2) + 1]--;
```

Pentru parcurgerile verticale (unde $C_1 = C_2$):

```cpp
v[min(L1, L2)][C1]++;
v[max(L1, L2) + 1][C1]--;
```

Pentru parcurgerile paralele cu diagonala secundară (unde $L_1 + C_1 = L_2 +
C_2$): se interschimbă capetele a.î. $L_1 < L_2$ și apoi:

```cpp
ds[L1][C1]++;
ds[L2 + 1][C2 - 1]--;
```

Pentru parcurgerile paralele cu diagonala principală: se interschimbă capetele
a.î. $L_1 < L_2$ și apoi:

```cpp
dp[L1][C1]++;
dp[L2 + 1][C2 + 1]--;
```

Se parcurg matricele și se fac adunările corespunzătoare:

```cpp
o[i][j] += o[i][j - 1];
v[i][j] += v[i - 1][j];
dp[i][j] += dp[i - 1][j - 1];
ds[i][j] += ds[i - 1][j + 1];
```

Într-o matrice rezultat se marchează acele celule care sunt nenule în cel puțin
una din matricele anterioare.

## Cerința 2

Pentru obținerea rezultatului se numără câte valori nenule sunt în matricea rezultat.

## Cerința 3

Pentru a obține rezultatul se numără pentru fiecare celulă nenulă câți vecini au
valoarea 0.

## Soluție

```cpp

```
