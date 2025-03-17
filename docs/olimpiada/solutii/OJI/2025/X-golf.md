---
id: OJI-2025-X-golf
title: Soluția problemei Golf (OJI 2025, clasa a X-a)
# problem_id: 2501
authors: [onut]
prerequisites:
    - lee
    - partial-sums
tags:
    - OJI
    - clasa X
draft: true
---

## Subtask 1

Pentru a determina numărul de celule din golf ce sunt umplute cu pămânțse pot
citi caracterele (de 0 sau 1) ce reprezintă elementele matricei $A$, unul câte
unul. Așadar, într-o variabilă $E$, se poate reține răspunsul pentru prima
cerință: astfel, pentru fiecare caracter de 1 întâlnit în $A$, se incrementează
valoarea lui $E$. La final, după ce toate cele $n \times m$ elemente din matrice
au fost citite, se afișează valoarea lui $E$. Complexitatea totală de timp este
de $\mathcal{O} (n \cdot m)$, iar spațiul utilizat se încadrează în
$\mathcal{O}(1)$ (nu este nevoie să stocăm niciun tablou/vector — totul se
efectuează cu ajutorul unui număr mic, constant de variabile).

## Subtask 2

De vreme ce se garantează (prin tabelul cu Restricții și precizări din enunț) că
există o singură insulă în golf, înseamnă că numărul de insule (din [Golful
Biscayne](https://en.wikipedia.org/wiki/Biscayne_Bay)) ce conțin un număr maxim
de insule (adică răspunsul la cerința de rezolvat) este chiar 1.

## Subtask 3

Pentru a determina numărul de celule ce fac parte din fiecare insulă a golfului,
se poate folosi un algoritm ce adaugă, în timpul descoperirii unei insule,
fiecare element de 1 într-o structură de date similară cu o coadă exact o
singură dată (spre exemplu, folosind un tablou auxiliar în care se marchează
vizitarea elementelor în cadrul unei iterații anterioare), cum ar fi Algoritmul
lui Lee; dacă dorim să folosim o metodă recursivă, recomandăm și Algoritmul de
tip Flood Fill. Pentru fiecare insulă $\alpha$, se poate stoca și o variabilă
$\mathrm{num}_\alpha$ (de tip `#!cpp int`) care reține numărul de celule umplute
cu pământ ce intră în alcătuirea sa. Apoi, printr-o parcurgere a acestei
structuri de date (de exemplu, `#!cpp struct`, în C/C++) ce reține informații
despre insule (structura conține, în total, cel mult $\mathcal{O}(n \times m)$
elemente, corespunzătoare insulelor), se calculează numărul elementelor
$\mathrm{num}_\alpha$ maximale. Astfel, atât complexitatea de timp, cât și cea
de spațiu, sunt de $\mathcal{O}(n \times m)$.

## Subtask 4

Pentru fiecare interogare dintre cele $Q$, se pot găsi insulele ce
_influențează_ (altfel spus, modifică) rezultatul, într-o manieră similară cu
cea pentru al treilea subtask. Astfel, să presupunem că avem de rezolvat o
interogare de tipul $(C, p)$ (unde $1 ≤ p ≤ m$). Fie $I_\alpha =
{(𝑥_{\alpha,1}, 𝑦_{\alpha,1}), (𝑥_{\alpha,2}, 𝑦_{\alpha,2}), . . . ,
(𝑥_{\alpha,k_\alpha} , 𝑦_{\alpha,k_\alpha} )}$ mulțimea ce conține **toate**
cele $k_\alpha$ celule (reprezentate prin perechi formate din linia
$x_{\alpha,i}$, respectiv coloana $y_{\alpha,i}$ — coordonatele celulelor în
matricea $A$) ce intră în alcătuirea unei insule $\alpha$; spunem că insula
$\alpha$ are dimensiunea egală cu $k_\alpha$.

Dacă $\max(y_{\alpha,1}, y_{\alpha,2}, ..., y_{\alpha,k_\alpha}) < p$,
înseamnă că insula $\alpha$ este situată la stânga coloanei $p$, așa că valoarea
lui $b$ (adică, conform enunțului, numărul de celule din toate insulele ce se
află la stânga coloanei $p$, în cadrul interogării curente) crește cu
$k_\alpha$; altfel, dacă $\min(y_{\alpha,1}, y_{\alpha,2}, ...,
y_{\alpha,k_\alpha}) > p$, înseamnă că insula $\alpha$ este situată la dreapta
coloanei $p$, așa că valoarea lui $b$ (numărul de celule din toate insulele ce
se află la dreapta coloanei $p$) crește cu $k_\alpha$. În orice alt caz, valorile
lui $a$ și $b$ nu se modifică (cu ocazia procesării insulei curente $\alpha$).

În mod similar, putem raționa pentru o interogare de tipul $(L, p)$ (unde $1 ≤ p
≤ n$) – în loc să folosim coordonatele de tip coloană $y_{\alpha,i}$, le vom
folosi pe cele de tip linie $x_{\alpha,i}$ .

Prin urmare, complexitatea totală de timp este de $\mathcal{O}(Q \cdot n \cdot
m)$, iar cea de spațiu este de $\mathcal{O}(n \cdot m)$.

## Subtask 5

De vreme ce interog ările de tip $(L, p)$ pot fi rezolvate într-un mod analog cu
cele de tip $(C, p)$ (de exemplu, prin _înlocuirea_ liniilor matricei cu
coloanele acesteia și viceversa, sau prin folosirea unei structuri de date de
forma `#!cpp std::pair<int, int>`, în C++), putem să presupunem, pentru
simplicitate, că avem de răspuns doar la interogări de tipul $(C, p)$.

Determinarea tuturor insulelor $\alpha$ (adică a coordonatelor celulelor ce
intră în alcătuirea unei insule și a dimensiunii acesteia) se poate efectua în
complexitatea (totală) de timp $\mathcal{O}(n \cdot m)$, așa cum a fost descris
anterior.

În cadrul unei insule $\alpha$, să introducem următoarele două notații:

-   $\mu_{y,\alpha} = \max(y_{\alpha,1}, y_{\alpha,2}, ..., y_{\alpha,k_\alpha})$
-   $\omega_{y,\alpha} = \min(y_{\alpha,1}, y_{\alpha,2}, ..., y_{\alpha,k_\alpha})$

Mai mult, introducem și următoarele două tablouri unidimensionale
$l[1, ..., m]$ și $r [1, ..., m]$, definite astfel (pentru fiecare $1 ≤ i ≤ m$):

$$
l[i] = \sum_{\substack{\alpha \\ \mu_{y,\alpha} = i}} k_\alpha;
\qquad r[i] = \sum_{\substack{\alpha \\ \omega_{y,\alpha} = i}} k_\alpha
$$

Cu alte cuvinte, $l[i]$ reprezintă suma dimensiunilor insulelor din golf ce au
valoarea maximală a unei coloane (a unei celule din componență) egală cu $i$.
Similar, $r[i]$ reprezintă suma dimensiunilor insulelor din golf ce au valoarea
minimală a unei coloane egală cu $i$.

Așadar, răspunsul pentru o interogare de tipul $(C, p)$ este dat de valoarea
expresiei $a \cdot b$, unde:

$$
a
= \sum_{\substack{\alpha \\ \mu_{y,\alpha} < p}} k_\alpha
= \sum_{\substack{\alpha \\ \mu_{y,\alpha} \in \{1, ..., p-1\}}} k_\alpha
= \sum_{i = 1}^{p - 1} l[i]
$$

și

$$
b
= \sum_{\substack{\alpha \\ \omega_{y,\alpha} < p}} k_\alpha
= \sum_{\substack{\alpha \\ \omega_{y,\alpha} \in \{p + 1, ..., m\}}} k_\alpha
= \sum_{i = p + 1}^{m} r[i]
$$

Atât $a$, cât și $b$, pot fi calculate printr-o parcurgere (liniară) a
tablourilor $l[1, ..., m]$ și $r[1, ..., m]$. În funcție de elementul $i$ de
analizat (dacă $i < p$ sau $i > p$), se actualizează valoarea lui $a$ sau
valoarea lui $b$.

Astfel, complexitatea de timp necesară pentru a rezolva o interogare de tipul
$(C, p)$ este de $\mathcal{O}(m)$. Similar, complexitatea de timp necesară
pentru a rezolva o interogare de tipul $(L, p)$ este de $\mathcal{O}(n)$.

Prin urmare, complexitatea totală a acestui subtask este de $\mathcal{O} (n
\cdot m + Q \cdot \max (n, m))$.

## Soluție completă pentru $T = 3$

Aplicăm o metodă de rezolvare similară cu cea pentru al cincilea subtask.

Observăm că, în cadrul unei interogări, pentru a determina, de exemplu, valoarea
lui $a$, putem utiliza o tehnică de sume parțiale, pe prefixele șirului $l
[1, ..., m]$; de asemenea, valoarea lui $b$ poate fi calculată tot cu sume
parțiale, pe sufixele șirului $r [1, ..., m]$. Procesarea sumelor parțiale se
poate efectua în complexitatea de timp (cât și de spațiu) de $\mathcal{O}(m)$
(pentru coloane) sau de $\mathcal{O}(n)$ (pentru linii). Apoi, rezolvarea
oricărei actualizări se poate efectua în $\mathcal{O}(1)$. Complexitatea de timp
totală a acestei soluții este de $\mathcal{O}(n \cdot m + Q)$. Spațiul utilizat
se încadrează în $\mathcal{O}(n \cdot m)$.

## Rezolvare

```cpp

```
