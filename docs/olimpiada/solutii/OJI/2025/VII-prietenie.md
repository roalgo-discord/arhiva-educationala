---
id: OJI-2025-VII-prietenie
title: Soluția problemei prietenie (OJI 2025, clasa a VII-a)
# problem_id: 2512
authors: [marcu]
prerequisites:
    - frequency-arrays
tags:
    - OJI
    - clasa VII
draft: true
---

## Cerința 1

O observație necesară pentru rezolvarea primei cerințe este că $(a_i - b_j)^2$
se poate scrie sub forma $a_i^2 - 2a_i b_j + b_j^2$, iar o altă observație e că
fiecare număr din șirul $a$, va fi implicat în $n$ sume (cu fiecare element din
șirul $b$). Deci pentru fiecare element $a_i$, vom avea suma:

$$
\begin{align*}
(a_i - b_1)^2 + (a_i - b_2)^2 + ... + (a_i - b_n)^2
&= \sum_{j = 1}^n (a_i - b_j)^2\\
&= \sum_{j = 1}^n (a_i^2 - 2a_i b_j + b_j^2)\\
&= \sum_{j = 1}^n a_i^2 - 2a_i \sum_{j = 1}^n b_j + \sum_{j = 1}^n b_j^2\\
&= n \cdot a_i^2 - 2a_i \cdot S_1 + S_2
\end{align*}
$$

unde $S_1 = b_1 + b_2 + ... + b_n$ este constant și se va calcula separat.
Similar, $S_2 = b_1^2 + b_2^2 + ... + b_n^2$. Astfel se vor calcula pentru
fiecare termen al șirului $a$ aceste sume și se vor adăuga la suma totală.
Complexitatea finală este $\mathcal{O}(n)$.

## Cerința 2

Pentru fiecare element $a_i$ al șirului $a$, vom căuta câte elemente $b_j$ din
șirul $b$ au proprietatea că $(a_i - b_j)^2$ este fie mai mic sau egal cu $X$ ,
fie mai mare sau egal cu $Y$ . Pentru a obține acest lucru se vor calcula
frecvențele din șirul $b$ și sumele parțiale pe ele. Așadar, considerăm $f_i$
frecvența fiecărui număr din șirul $b$, iar $F_i = f_1 + f_2 + ... + f_i$ . Vom
calcula câte numere avem astfel încât $(a_i - b_j)^2 \leq X$ și $|b_j − a_i|
\leq \sqrt{X}$ , adică $a_i - \sqrt{X} \leq b_j \leq a_i + \sqrt{X}$. Pentru a
calcula numărul de numere dintre aceste 2 valori se va folosi șirul de sume
partiale $F_i$ . Acum vom calcula câte numere din șirul $b$ există astfel încât
$(a_i - b_j)^2 \geq Y$ , adică $|a_i - b_j| \geq \sqrt{Y}$, adică $b_j - a_i
\geq \sqrt{Y}$ sau $b_j - a_i \leq -\sqrt{Y}$, deci $b_j \geq a_i + \sqrt{Y}$
sau $b_j \leq a_i - \sqrt{Y}$, cu ajutorul șirului $F_i$ . Complexitatea finală
este $\mathcal{O}(n)$.

## Soluție

```cpp
```
