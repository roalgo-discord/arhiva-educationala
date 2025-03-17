---
id: OJI-2025-X-anagrame
title: Soluția problemei Anagrame (OJI 2025, clasa a X-a)
# problem_id: 2501
authors: [lica]
prerequisites:
    - binary-search
    - frequency-arrays
    - intro-combinatorics
    - modular-inverse
tags:
    - OJI
    - clasa X
draft: true
---

## Subtask 1

Complexitatea $\mathcal{O}(M)$. Structura testelor de intrare face ca șirul
suport să conțină aceeași literă ca șirul $A$, iar lungimea acestuia să fie
minimul lungimilor intervalelor ce intervin în operațiile de generare,
$\min(y_q - x_q)$.

## Subtask 2

Complexitatea $\mathcal{O}(N \times \Sigma \times M)$. Pentru fiecare literă
$L$, situată în secvența interogată, determinăm $\operatorname{Range}[L]$, în
complexitate liniară $\mathcal{O}(N)$, reținându-se prima și ultima apariție a
ei în cadrul secvent, ei.

## Subtask 3

Complexitatea $\mathcal{O}(N \times \Sigma + M)$. Întrucât nu se fac update-uri,
se poate precalcula, pentru fiecare poziție din șir, pentru fiecare literă a
alfabetului, $St[poz][lit]$ reprezentând cea mai apropiată poziție la stânga,
respectiv $Dr[poz][lit]$ reprezentând cea mai apropiată poziție la dreapta unde
se regăsește aceasta. Complexitatea $\mathcal{O}(N \times \Sigma)$. În urma
precalculării răspunsul la o interogare se face în timp constant
$\mathcal{O}(1)$.

## Subtask 4

Complexitatea $\mathcal{O}(M \times \Sigma \times \log N)$. Pentru fiecare
literă se memorează, într-un set, pozițiile unde aceasta apare în șir. Prima și
ultima poziție din cadrul intervalului interogat, pentru fiecare literă, se
determină în $\mathcal{O}(\log N)$ folosind căutarea binară. Șirul suport minim
lexicografic poate fi determinat printr-o comparare pe vectori de frecvență.

## Subtask 6

Complexitatea $\mathcal{O}(M \times (\Sigma + (y − x)!))$. Lungimea secvenței
interogate permite numărarea anagramelor șirului suport folosind
`next_permutation` pentru generarea anagramelor distincte în ordine
lexicografică.

## Subtask 7

Dacă șirul suport con ține $l = c_a + c_b$ litere în total (adică,
$c_a$ litere de a și $c_b$ litere de b), înseamnă că numărul de anagrame
ale acestuia este egal cu $\frac{l!}{a! \times b!}$.

## Subtask 8 (Generalizarea a subtask-ului 7)

Complexitatea $\mathcal{O}(N \times \Sigma + M \times \log N \times \Sigma)$.
Numărul anagramelor distincte este egal cu numărul permutărilor cu repetiții.
Presupunem că șirul suport are Nr caractere și conține litera $l_1$ de $n_1$
ori, litera $l_2$ de $n_2$ ori, ..., litera $l_k$ de $n_k$ ori, astfel încât
$n_1 + n_2 + ... + n_k = Nr$. Numărul de permutărilor cu repetiții este egal cu
$Nr!/(n_1! \times n_2! . . . \times n_k!)$. Notăm cu $K = (n_1! \cdot n_2!...
\cdot n_k!)$ și cu $Mod = 1999999973$, atunci deoarece $Mod$ este număr prim,
$(Nr!/K) \equiv (𝑁 𝑟! \times K Mod - 2) \mod Mod$. Se pot precalcula
factorialele numerelor mai mici sau egale cu $Nr$ iar exponențierea se
implementează în complexitate logaritmică.

## Rezolvare

```cpp

```
