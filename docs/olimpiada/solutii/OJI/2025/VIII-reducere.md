---
id: OJI-2025-VIII-reducere
title: Soluția problemei reducere (OJI 2025, clasa a VIII-a)
# problem_id: 2511
authors: [cerchez]
prerequisites:
    - divisibility
tags:
    - OJI
    - clasa VIII
draft: true
---

## Cerința 1

Pentru a determina valoarea de reducere, trebuie să determinăm cel mai mare
divizor comun al valorilor din secvență. Pentru a determina cmmdc pentru două
valori utilizăm algoritmul lui Euclid. Pentru a determina cmmdc pentru o
secvență de $n$ valori utilizăm asociativitatea operației cmmdc, deci determinăm
la fiecare pas cmmdc dintre cmmdc-ul curent și următoarea valoare din secvență:

$$
(a_1, a_2, ..., a_n) = (a_1, (a_2, ..., (a_{n - 1}, a_{n})))
$$

unde $(a, b)$ reprezintă cmmdc-ul lui $a$ și $b$.

## Cerința 2

Descompunem în factori primi fiecare valoare din secvență şi determinăm pe
parcurs descom punerea în factori primi a celui mai mic multiplu comun al
acestor valori (toți factorii primi care apar în descompunerile valorilor din
secvență la puterea cea mai mare). Factorii primi comuni la puterea cea mai mică
constituie cmmdc (deci îi păstrăm în valoarea de reducere). Numărul minim de
operații care trebuie să fie aplicate pentru a obține valoarea de reducere este
egal cu suma exponenților factorilor primi din descompunerea în factori primi a
cmmmc/cmmdc.

Pentru subtask-ul 2, restricțiile permit utilizarea unui vector $nr$ de $10^6$
elemente, unde $nr_i$ este puterea factorului prim $i$ în descompunerea factori
primi a cmmmc/cmmdc. Pentru a obține punctele pe acest subtask nu este necesar
să optimizăm descompunerea în factori primi utilizând pregenerarea numerelor
prime cu ciurul lui Eratostene, dar, pentru subtask-ul 3, este necesar să
descompunem în factori primi căutând divizorii, doar printre numerele prime până
la radicalul numărului.

Pentru subtask-ul 3 restricțiile nu permit declararea vectorului $nr$. Ca urmare
vom reține o descompunere în factori primi ca o listă de factori primi şi
puterile acestora, listă în care factorii primi apar în ordine crescătoare.

Pentru fiecare număr din secvență:

-   descompunem numărul în factori primi;
-   printr-un algoritm similar cu algoritmul de interclasare, actualizăm
    descompunerea în factori primi a cmmmc (în cmmmc trebuie să apară toți
    factorii primi la puterea cea mai mare).

La final simplificăm cmmmc cu cmmdc, parcurgând descompunerile în factori primi
ale acestora şi, pentru factorii primi comuni, scăzând din puterea factorului
prim din cmmmc puterea factorului prim respectiv din cmmdc.

Suma puterilor factorilor primi ai cmmmc după simplificarea cu cmmdc va fi
numărul minim de operații de reducere necesare.

## Rezolvare

```cpp

```
