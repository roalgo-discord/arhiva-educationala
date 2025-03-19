---
id: OJI-2025-XI-XII-experimente
title: Soluția problemei Experimente (OJI 2025, clasele XI-XII)
problem_id: 3517
authors: []
prerequisites:
     - stl
     - stl-sorting-searching
tags:
    - OJI
    - clasa XI-XII
    - structuri de date
    - stl
draft: true
---

Observație inițială: Problema poate fi reformulată astfel: dându-se un
șir circular și update-uri sub forma unor intervale continue, să se
calculeze după fiecare update cardinalul intersecției tuturor
intervalelor de până atunci.

## Subtask 1

Restricțiile pentru acest subtask implică faptul că putem considera
șirul ca fiind necircular. În acest caz intersectia unor intervale va
fi tot timpul un singur interval continuu.

Este de ajuns să reținem cel mai mare capăt de start și cel mai mic
capăt de final al intevalelor de update pentru a afla răspunsul.

## Subtaskurile 2, 3, 4, 5

Pentru celelalte subtaskuri, intersecția update-urilor va fi reprezentată
de o mulțime $M$ formată din mai multe intervale, nu doar unul singur
(inițial considerăm $M$ formată dintr-un singur interval $[1, N]$).

În momentul în care avem un update nou $U$, pentru fiecare interval $I$
din $M$ există $3$ scenarii posibile:

1. $I$ este inclus complet in $U$, trebuie păstrat în $M$;
2. $I$ nu se intersecsează cu $U$, trebuie scos din M;
3. $I$ și $U$ se intersectează fără ca $I$ să fie complet inclus în
$U$, $I$ trebuie înlocuit.

Pentru scenariul 3, facem următoarele observații:

* există maxim $2$ intervale $I$ care se pot afla în această situație;
* I trebuie înlocuit fie cu un alt interval, fie cu alte două intervale.

în funcție de structura de date aleasă, se pot rezolva diferite
subtaskuri. Soluția oficială folosește un set pentru o complexitate
de $O(M \log M)$.

# Rezolvare

```cpp

```
