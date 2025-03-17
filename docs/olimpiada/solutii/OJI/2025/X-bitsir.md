---
id: OJI-2025-X-bitsir
title: Soluția problemei Bitsir (OJI 2025, clasa a X-a)
# problem_id: 2501
authors: [dobleaga]
prerequisites:
    - bitwise-ops
tags:
    - OJI
    - clasa X
draft: true
---

## Subtask 1

Când $X = 0$, șirul $A_i$ trebuie să fie plin de 0 ($A_i = 0,\,\forall i \in {1,
2, \dots , N }$). Fiindcă $Y = 0$, iar $M_i = 0,\,\forall i \in {1, 2, \dots ,
N}$, răspunsul va fi mereu 1.

## Subtask 2

Când 𝑋 = 1, șirul $A_i$ trebuie să conțină cel puțin o valoare de 1, restul
fiind egale cu 0. Din moment ce $Y = 0$, numărul de valori de 1 trebuie să fie
par. Astfel, răspunsul va fi $C_N^2 + C_N^4 + ... = 2^{N-1} - 1$.

## Subtask 3

Observație: șirul $A_i$ nu poate avea elemente mai mari decât $X$. Pentru acest
subtask, se creează un for pentru fiecare valoare de la 0 la $X$ și se verifică
toate condițiile.

## Subtask 4

O generalizare a subtaskului 1, trebuie verificat dacă șirul plin de 0 respectă
proprietățile 2 și 3.

## Subtask 5

Pe baza observației anterioare și a mărimii șirului ($N \leq 4$), soluția pentru
acest subtask este iterarea prin toate posibilitățile și verificarea celor 3
condiții.

Complexitate: $\mathcal{O}(X^4)$ ca timp.

## Subtask 6

!!! note "Observație"

    Operația de XOR ($\oplus$) are următoarea proprietate: $a \oplus b = c
    \Rightarrow a = b \oplus c$.

Se iterează prin toate valorile posibile ale lui $A_1$ ($\{0, 1, \dots X\}$), se
află valoarea lui $A_2 = Y \oplus A_1$ și se verifică celelalte două condiții.

Complexitate: $\mathcal{O}(X)$.

## Subtask 7

În acest caz, cele 3 condiții pot fi reformulate astfel:

- Dacă $X = 1$, atunci există cel puțin o valoare de 1 în șir, altfel tot șirul
  este complet 0.
- Dacă $Y = 1$, atunci există un număr impar de 1 în șir, altfel există un număr
  par de 1.
- Dacă $M_i = 1$, atunci $A_i$ = 1, altfel $A_i$ poate fi 0 sau 1.

Dacă $X = 0$, atunci problema se reduce la Subtaskul 4. Altfel, în funcție de
valoarea lui $Y$ și câte valori de 1 există în șirul $M$, se determină paritatea
numărului de valori care pot fi alese. Mai exact, dacă se notează cu $F$ numărul
de valori de 1 din șirul $M$ și cu $R$ răspunsul, există următoarele cazuri:

- $F$ impar și $Y = 0$: $R = C_1^{N-F} + C_3^{N-F} + \dots = 2^{N - F - 1}$
- $F$ impar și $Y = 1$: $R = C_0^{N-F} + C_2^{N-F} + \dots = 2^{N - F - 1}$
- $F$ par și $Y = 0$: $R = C_0^{N-F} + C_2^{N-F} + \dots = 2^{N - F - 1}$
- $F$ par și $Y = 1$: $R = C_1^{N-F} + C_3^{N-F} + \dots = 2^{N - F - 1}$

Dacă $X = 1$, $F = 0$ și $Y = 0$, atunci la formulă se scade 1 deoarece se
înnumără și șirul plin de 0.

Complexitate: $\mathcal{O}(N)$

## Subtask 8

Din cauza naturii operațiilor pe biți, problema poate fi rezolvată bit cu bit,
fiind împărțită astfel în 30 de subprobleme de tipul subtaskului 7. Mai exact,
pentru bitul $b$, subproblema este următoarea:

- $X_b = 1$, dacă $X$ conține bitul $b$, altfel $X_b = 0$.
- $Y_b = 1$, dacă $Y$ conține bitul $b$, altfel $Y_b = 0$.
- $M_i = 1$, dacă $M_i$ conține bitul $b$, altfel $M_b = 0$.

Se rezolvă toate subproblemele, iar răspunsul final va fi produsul tuturor
răspunsurilor subproblemelor.

## Rezolvare

```cpp

```
