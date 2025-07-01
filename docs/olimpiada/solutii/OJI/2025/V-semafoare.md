---
id: OJI-2025-V-semafoare
title: Soluția problemei semafoare (OJI 2025, clasa a V-a)
problem_id: 3636
authors: [iordaiche]
prerequisites:
    - conditions-if
    - basic-math
    - simulating-solution
tags:
    - OJI
    - clasa V
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
#include <fstream>
using namespace std;
ifstream fin("semafoare.in");
ofstream fout("semafoare.out");
int C;
int R1, G1, V1, R2, G2, V2, T1, T2;
int main() {
    fin >> C;
    fin >> R1 >> G1 >> V1 >> R2 >> G2 >> V2 >> T1 >> T2;
    if (C == 1 && T1 == 0 && T2 == 0) {
        if (R1 + G1 < R2 + G2) {
            fout << (R1 + G1) << '\n';
        } else {
            fout << (R2 + G2) << '\n';
        }
    }
    int ciclu1 = R1 + G1 + V1 + G1;
    int ciclu2 = R2 + G2 + V2 + G2;
    T1 = T1 % ciclu1;
    T2 = T2 % ciclu2;
    if (C == 1 && T1 + T2 > 0) {
        int timp_la_verde1;
        if (T1 < R1 + G1) {
            timp_la_verde1 = R1 + G1 - T1;
        } else if (T1 < R1 + G1 + V1) {
            timp_la_verde1 = 0;
        } else {
            timp_la_verde1 = ciclu1 - T1 + R1 + G1;
        }

        int timp_la_verde2;
        if (T2 < R2 + G2) {
            timp_la_verde2 = R2 + G2 - T2;
        } else if (T2 < R2 + G2 + V2) {
            timp_la_verde2 = 0;
        } else {
            timp_la_verde2 = ciclu2 - T2 + R2 + G2;
        }

        if (timp_la_verde1 < timp_la_verde2) {
            fout << timp_la_verde1 << '\n';
        } else {
            fout << timp_la_verde2 << '\n';
        }
    } else if (C == 2) {
        int culoare1, culoare2;
        int timp_minim = 0;
        bool gasit = false;
        while (!gasit) {
            // Calculăm culoarea pentru fiecare semafor la timpul curent
            int t1 = (T1 + timp_minim) % ciclu1;
            int t2 = (T2 + timp_minim) % ciclu2;
            // Determinăm culoarea semaforului 1
            if (t1 < R1) {
                culoare1 = 0;  // Rosu
            } else if (t1 < R1 + G1) {
                culoare1 = 1;  // Galben
            } else if (t1 < R1 + G1 + V1) {
                culoare1 = 2;  // Verde
            } else {
                culoare1 = 1;  // Galben
            }
            // Determinăm culoarea semaforului 2
            if (t2 < R2) {
                culoare2 = 0;  // Rosu
            } else if (t2 < R2 + G2) {
                culoare2 = 1;  // Galben
            } else if (t2 < R2 + G2 + V2) {
                culoare2 = 2;  // Verde
            } else {
                culoare2 = 1;  // Galben
            }
            // Verificăm dacă cele două semafoare au aceeași culoare
            if (culoare1 == culoare2) {
                gasit = true;
            } else {
                timp_minim++;
            }
        }
        fout << timp_minim << endl;
    }
    return 0;
}
```
