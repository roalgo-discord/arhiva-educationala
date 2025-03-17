---
id: OJI-2025-IX-summat
title: Soluția problemei Summat (OJI 2025, clasa a IX-a)
# problem_id: 2501
authors: [bunget]
prerequisites:
    - partial-sums
tags:
    - OJI
    - clasa IX
draft: true
---

Rezolvarea problemei Summat presupune folosirea unor tehnici de programare
precum: generarea unei matrice cu elemente date, sume parţiale pe vector, sume
parţiale pe matrice, observaţii referitoare la un şir de numere în care
secvenţele de elemente consecutive egale devin din ce în ce mai lungi. Pentru
obţinerea a 100 de puncte nu este necesară căutarea binară, timpul de execuţie
fiind setat pentru căutare secvenţială. Observaţia esenţială pentru a putea
obţine 100 de puncte este că secvenţele de valori egale din matrice sunt foarte
lungi şi astfel vom avea multe linii consecutive cu aceleaşi elemente. De
asemenea de menţionat şi faptul că valoarea elementelor matricei $A$ nu
depăşeşte 55, deci suma elementelor oricărei submatrice se va încadra pe 64 de
biţi.

## Subtask 1 (24p)

Se generează matricea $A$ formată cu elementele şirului 1, 2, 2, 3, 3, 3, 3, 4,
4, 4, 4, 4, 4, 4, 4, ..., apoi pentru fiecare submatrice se calculează suma
elementelor, prin parcurgerea submatricei respective. Complexitatea soluţiei
este $\mathcal{O} (Q \cdot M \cdot N)$.

## Subtask 2 (14p)

Deoarece $M = 1$ matricea $A$ are o singura linie, deci este un şir. Se
generează şirul $A$, se calculează şirul $S$ al sumelor parţiale ale lui $A$ şi,
pentru fiecare submatrice dată, suma elementelor sale este $S[c_2] - S[c_1 -
1]$. Complexitatea soluţiei este $\mathcal{O} (N + Q)$.

## Subtask 3 (19p)

Se generează matricea $A$, se calculează matricea $S$ a sumelor parţiale şi,
pentru fiecare submatrice dată, suma elementelor sale este $S[l_2][c_2] -
S[l_2][c_1 - 1] - S[l_1 - 1][c_2] + S[l_1 - 1][c_1 - 1]$. Complexitatea soluţiei
este $\mathcal{O} (M \cdot N + Q)$.

## Subtask 4 (11p)

Deoarece $M = 1$, matricea $A$ are o singură linie. Vom nota cu
$\operatorname{Sum}(k)$ suma elementelor de pe această linie pană la elementul
de indice $k$. Pentru a calcula $\operatorname{Sum}(k)$ se determină $i$ maxim
astfel încât $T = 1 + 2 + 2^2 +2^3 +...+2^i = 2^{i + 1} - 1 \leq k$, în acelasi
timp calculând suma $S = 2^0 \cdot 1 +2^1 \cdot 2+2^2 \cdot 3+2^3 \cdot
4+...+2^i \cdot (i + 1)$, şi vom obţine $\operatorname{Sum}(k) = S + (k - T)
\cdot (i + 1)$. Suma elementelor unei submatrice date va fi
$\operatorname{Sum}(c_2) - \operatorname{Sum}(c_1 - 1)$. Complexitatea soluţiei
este $\mathcal{O} (C \cdot Q)$, unde constanta $C$ este aproximativ 50 pentru
căutarea lui $i$ secvenţial, respectiv aproximativ 6 pentru căutarea lui $i$
binar.

## Subtask 5 (15p)

Pentru fiecare linie $i$ de la $l_1$ la $l_2$ se calculează
$\operatorname{Sum}(c_2 + N \cdot (i - 1)) - \operatorname{Sum}(c_1 - 1 + N
\cdot (i - 1))$ iar suma acestor numere reprezintă suma elementelor submatricei
date. Complexitatea soluţiei este $\mathcal{O} (Q \cdot 100 + C)$, unde
constanta $C$ are aceleași valori ca mai sus..

## Subtask 6 (17p)

Se determină coordonatele elementelor din matricea $A$ în care se schimbă
valoarea elementului din şirul 1, 2, 2, 3, 3, 3, 3, ... dat. Fie $(x_i, y_i)$
coordonatele acestor elemente, unde $1 ≤ i ≤ 55$ (se poate aproxima cu uşurinţă
că numărul maxim din matricea $A$ nu poate depăşi valoarea 55). Se determină $k$
minim cu $l_1 \leq x_k$ şi $p$ maxim cu $x_p \leq l_2$ (acest lucru se poate
face secvenţial sau prin căutare binară). Pentru fiecare $i$ de la $k$ la $p$ se
calculează $\operatorname{Sum}(c_2 + (x_i - 1) \cdot N) - \operatorname{Sum}
(c_1 - 1 + x_i \cdot N)$ (adică suma elementelor de pe linia $x_i$ din
submatricea dată), numar care se adaugă la suma elementelor submatricei date. De
asemenea, pe liniile cuprinse între linia $x_{i}$ şi linia $x_{i+1}$, exclusiv
acestea, se află acelaşi număr în submatricea dată şi anume $i$, deci suma
elementelor de pe aceste linii va fi $(x_{i + 1} −x_i −1) \cdot (c_2 - c_1+1)
\cdot i$, număr care se adaugă la suma elementelor submatricei date.
Complexitatea soluţiei este $\mathcal{O} (Q \cdot C)$, unde constanta $C$ are
aceleași valori ca mai sus.

## Rezolvare

```cpp

```
