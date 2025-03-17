---
id: OJI-2025-VIII-joc
title: Soluția problemei joc (OJI 2025, clasa a VIII-a)
# problem_id: 2510
authors: [dumitruilie]
prerequisites:
    - frequency-arrays
    - simulating-solution
tags:
    - OJI
    - clasa VIII
draft: true
---

## Cerința 1

### Soluție în $O(N^3)$

Vom fixa cele două valori $st$ ($1 ≤ st ≤ n$) și $v$ ($0 ≤ v < st$) reprezentând
începutul secvenței şi vizibilitatea. Pentru fiecare secvență determinată de
$st$ şi $v$ vom aplica unul dintre algoritmii liniari de calculare a elementului
majoritar (resursă:
[Infoarena - Problema majorității votului](https://www.infoarena.ro/problema-majoritatii-votului)).
Astfel putem verifica, pentru fiecare secvență dacă este riscantă.

### Soluție în $O(N^2)$

Vom folosi un vector de frecvență, în care vom contoriza numărul de apariții
pentru fiecare decor. Să considerăm că am determinat vectorul de frecvență
pentru secvența $[i,j]$ care începe la poziția $i$ şi se termină la poziția $j$
($1 ≤ i ≤ j < n$). Când vom trece la secvența $[i,j + 1]$ vom adăuga un singur
element, deci putem actualiza ușor vectorul de frecvență. Elementul majoritar se
poate recalcula în momentul în care adăugăm un element în vectorul de frecvență
(fie rămâne valoarea precedentă, fie devine noua valoare adăugată). După ce
toate secvențele cu capăt stâng $i$ au fost analizate, resetăm vectorul de
frecvență pentru a-l refolosi pentru subsecvențele cu capătul stâng $i + 1$.

## Cerința 2

### Soluție în $O(N^2)$

Vom simula efectiv jocul. Pentru a afla dacă o subsecvență este sau nu riscantă
vom folosi un algoritm liniar de aflare a elementului majoritar (similar
soluției de la cerința 1). Acestă soluție are complexitatea $\mathcal{O}(N^2)$
în cazul cel mai defavorabil.

### Soluție în $O(N)$

Pentru a optimiza determinarea elementului majoritar din soluția precedentă, vom
folosi un vector de frecvență, similar soluției 2 de la cerința 1. Să presupunem
că ajungem pe subsecvența $[s - v, s]$ și știm dacă aceasta conține sau nu
element majoritar, care este acesta și numărul său de apariții. Avem două
cazuri:

-   Secvența este riscantă. În acest caz știm că există element majoritar (fie
    acesta $E$). Jucătorul va micșora vizibilitatea, astfel excluzând elementul de
    pe poziția $s - v$. Datorită faptului că elementul $E$ avea $1 + (v + 1) / 2$
    apariții în subsecvența $[s - v, s]$, acesta rămâne elementul cu număr maxim
    de apariții și în subsecvența $[s - v + 1, s]$, deci ar fi posibil ca acesta
    să rămână element majoritar sau să nu mai existe element majoritar.
-   Secvența nu este riscantă. În acest caz știm că nu există element majoritar.
    Când adăugăm un element în subsecvență avem două cazuri posibile. Fie acesta
    are acum numărul necesar de apariții, caz în care actualizăm $E$, fie acesta
    nu are suficiente apariții, caz în care nu avem element majoritar.

Complexitatea acestei soluții este $\mathcal{O}(N)$ timp și $\mathcal{O}(N)$
memorie. Există și alte soluții, atât pentru punctaj integral, cât şi pentru
punctaje parțiale.

## Rezolvare

```cpp

```
