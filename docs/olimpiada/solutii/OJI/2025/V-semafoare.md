---
id: OJI-2025-V-semafoare
title: Soluția problemei semafoare (OJI 2025, clasa a V-a)
# problem_id: 2501
authors: [iordaiche]
prerequisites:
    - conditions-if
    - basic-math
    - simulating-solution
tags:
    - OJI
    - clasa V
draft: true
---

## Cerința 1

Pentru cazurile în care $T_1 = 0$ și $T_2 = 0$, se poate calcula, cu o formulă
simplă, după câte secunde se face verde la unul dintre cele două semafoare:

- Calculăm pentru fiecare semafor totalul secundelor care trebuie să treacă până
  când se aprinde galben după roșu, iar apoi verde după galben.
- Afișăm timpul minim astfel calculat.

**Algoritm**:

- calculăm totalul de secunde necesare fiecărui semafor
- afișăm timpul minim calculat, care este $\min(R_1 + G_1, R_2 + G_2)$.

Pentru cazurile în care $T_1 + T_2 > 0$ (cel puţin unul dintre cele două
semafoare nu pornește la momentul curent), observăm că fiecare semafor
funcţionează pe baza unui ciclu temporar ce se repetă continuu. O soluţie
posibilă constă în parcurgerea următorilor pași:

- calculăm durata ciclului pentru fiecare semafor: $c_1 = R_1 + G_1 + V_1 + G_1$
  și $c_2 = R_2 + G_2 + V_2 + G_2$

- calculăm poziția în ciclul fiecărui semafor: $T_1 = T_1 \mod c_1$ și $T_2 =
  T_2 \mod c_2$
  
- determinăm timpul până se aprinde verde la primul semafor (îl vom denota cu $tv_1$):

    $$
    tv_1 = \begin{dcases}
     R_1 + G_1 - T_1 & \text{dacă}~T_1 < R_1 + G_1\\
     0               & \text{dacă}~T_1 < R_1 + G_1 + V_1\\
     c_1 - T_1 + R_1 + G_1 & \text{în caz contrar}
    \end{dcases}
    $$

- determinăm timpul $tv_2$ până când se aprinde verde la cel de-al doilea
  semafor (similar)
- afișăm $\min(tv_1, tv_2)$

## Cerința 2

O soluţie posibilă constă în parcurgerea următorilor paşi:

- Calculăm durata totală a ciclului pentru fiecare semafor, similar cu cerinţa
  anterioară.
- Identificăm pentru fiecare semafor culoarea aprinsă la momentul curent. De
  exemplu, la momentul curent $t_1$, culoarea primului semafor se poate
  determina astfel:

    ```text
    dacă t1 < R1
        atunci culoare1 = 0 (Roșu)
    altfel
        dacă t1 < R1 + G1
            atunci culoare1 = 1 (Galben)
        altfel
            dacă t1 < R1 + G1 + V1
                atunci culoare1 = 2 (Verde)
            altfel
                culoare1 = 1 (Galben)
    ```

- Simulăm scurgerea timpului, din secundă în secundă, până când la ambele
  semafoare se va observa aceeași culoare.

## Rezolvare

Mai jos puteți găsi o soluție care ia punctajul maxim.

```cpp

```