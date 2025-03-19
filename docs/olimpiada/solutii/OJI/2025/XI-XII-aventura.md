---
id: OJI-2025-XI-XII-aventura
title: Soluția problemei Aventura (OJI 2025, clasele XI-XII)
problem_id: 3615
authors: [ivan]
prerequisites:
     - graphs
     - toposort
tags:
    - OJI
    - clasa XI-XII
    - grafuri
draft: true
---

Vom nota $k_1 + k_2 + \dots + k_N$ cu $\sum K$.

## Subtask 1

Se generează toate permutările șirului $1, 2, \dots, N$, iar pentru
fiecare șir se încearcă completarea nivelelor în ordinea generată.

Complexitate $O(N! \cdot \sum K)$.

## Subtask 2

O dependență circulară de dimensiune exact $2$ reprezintă, în graful
format de restricțiile jocului, un ciclu de lungime $2$. Mai precis,
dacă fixăm două nivele $i$ și $j$ din graf și există muchii în ambele
sensuri, atunci este clar că ambele nivele nu vor putea fi completate
vreodată. Acest lucru se poate verifica ușor dacă muchiile din graf
sunt reținute într-o matrice de adiacență.

Putem porni din unul dintre cele două nivele o parcurgere DFS,
deoarece orice nivel care anterior era condiționat de unul dintre
aceste nivele clar nu va fi parcurs niciodată.

În final, restul nivelelor nemarcate vor putea fi completate în joc.

Complexitate $O(N^2)$.

## Subtask 3

Pentru fiecare nivel, vom ține minte $grad[x]$ – numărul de nivele de
care este condiționat nivelul $x$. La fiecare pas, vom căuta un nivel $i$
care are $grad[i] = 0$ și vom scădea gradul fiecărui nivel
condiționat de nivelul $i$.

Complexitate $O(N^2 + \sum K)$.

## Subtask 4

Vom folosi construcția de la subtaskul precedent, însă, în loc să
căutăm manual nivelele cu gradul $0$, vom utiliza o coadă. Mai întâi,
vom adăuga în coadă toate nivelele care au gradul inițial egal cu $0$.

Apoi, vom parcurge coada, iar în momentul în care scădem gradele
vecinilor nivelului curent, dacă unul dintre vecini ajunge la gradul
$0$, îl vom adăuga în coadă.

Complexitate $O(N + \sum K)$.

# Rezolvare

```cpp

```
