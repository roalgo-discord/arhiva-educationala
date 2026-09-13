---
id: OJI-2023-X-fotbal
title: Soluția problemei fotbal (OJI 2023, clasa a X-a)
problem_id: 505
authors: [vmbogdan]
prerequisites:
    - placeholder
tags:
    - OJI
    - clasa X
---

Problema ne cere numărul de moduri în care putem alege $K$ intervale, a
căror intersecție nu este mulțimea vidă și printre care se regăsește cel
puțin un interval colorat în negru ($f_i = 1$) și cel puțin un interval
colorat în alb ($f_i = 0$), dintr-o mulțime de $N$ intervale date.

## Subtask 1

În acest subtask, este suficient să verificăm fiecare pereche de intervale.
Intervalele trebuie să aibă culori diferite și intersecția nevidă.
Complexitatea unei astfel de soluții brute-force este $O(N^2)$.

## Subtask 2

Vom avea o abordare asemănătoare cu cea de la subtask-ul anterior.
Observația cheie este că trebuie să fixăm un interval cu $f_i = 0$, iar mai
apoi putem trece prin restul de $N$ intervale și să verificăm condițiile de
mai sus. O astfel de soluție are complexitate $O(N \cdot cnt_0)$, unde
$cnt_0$ este numărul de intervale cu $f_i = 0$.

## Subtask 3

Pentru ca intersecția a $K$ intervale să fie nevidă, trebuie să se respecte
următoarea proprietate: $max(left_i) \leq min(right_i)$ cu $i$ de la $1$ la
$K$, unde $left_i$ reprezintă capătul din stânga al intervalului $i$
(dintre cele $K$ alese), iar $right_i$ capătul din dreapta al intervalului
$i$ (dintre cele $K$ alese). Prin urmare, vom sorta crescător intervalele
în funcție de capătul din stânga. Vom parcurge intervalele în noua ordine
și vom menține două variabile, $cnt_0$ și $cnt_1$, reprezentând numărul de
intervale active de culoare albă, respectiv numărul de intervale active de
culoare neagră. Când vrem să trecem de la intervalul $i - 1$ la intervalul
$i$, trebuie să actualizăm $cnt_0$ și $cnt_1$, eliminând toate intervalele
pentru care $right_i < left_i$. Pentru a nu număra intervale de mai multe
ori, vom calcula pentru fiecare interval $i$, numărul de moduri în care
putem alege $K$ intervale care să respecte condițiile de mai sus, fixând
cel mai din dreapta dintre intervale că fiind intervalul cu numărul $i$. Cu
variabilele $cnt_0$ și $cnt_1$ actualizate, singura condiție de care trebuie
să ținem cont este condiția că trebuie să avem cel puțin un interval din
fiecare culoare. Pentru a ține cont de această condiție, vom calcula mai
întâi numărul de moduri prin care putem alege restul de $K - 1$ intervale,
iar mai apoi vom scădea numărul de moduri în care putem alege $K - 1$
intervale de aceeași culoare cu intervalul $i$. Acest număr este dat de formula:

$$
\binom{cnt0 + cnt1}{K - 1} - \binom{cnt_i}{K - 1}
$$

unde $cnt_i$ este numărul de intervale de aceeași culoare cu intervalul
$i$. Pentru a calcula combinările $\binom{N}{K}$, ne vom folosi de
triunghiul lui Pascal și de formula recurentă:

$$
\binom{N}{K} = \binom{N - 1}{K - 1} + \binom{N - 1}{K}
$$

Complexitatea unei astfel de soluții este $O(N^2)$.

## Soluția completă

Este soluția anterioară, pentru calcul combinărilor se va folosi inversul
modular și algoritmul lui Euclid extins. Această soluție are complexitate
$O(N \cdot \log N)$.

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;

    cout << a + b << '\n';
    return 0;
}
```
