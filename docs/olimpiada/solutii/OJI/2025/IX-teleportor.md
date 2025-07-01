---
id: OJI-2025-IX-teleportor
title: Soluția problemei Teleportor (OJI 2025, clasa a IX-a)
problem_id: 3631
authors: [bpopa]
prerequisites:
    - matrices
    - frequency-arrays
tags:
    - OJI
    - clasa IX
---

Observăm că dacă avem două camere vecine pe linie sau coloană numerotate cu $x$
și $x+ 1$, atunci nu trebuie să folosim teleportorul pentru a traversa de la
camerele numerotate cu $x$ la camerele numerotate cu $x+ 1$. Fie $P$ numărul de
valori $x$ distincte pentru care există cel puțin două camere numerotate cu $x$
și $x + 1$ vecine pe linie sau coloană. Numărul minim de teleportări necesare
vizitării tuturor camerelor este egal cu $K − P − 1$.

## Subtask 1

Pentru fiecare valoare $x$ de la 1 la $K − 1$, parcurgem matricea pentru a
depista dacă există cel puțin două celule vecine care sunt numerotate cu $x$
respectiv $x+ 1$. Complexitatea acestei soluții este $\mathcal{O} (N^2 \cdot Q
\cdot K)$.

## Subtask 2

Parcurgem matricea și pentru fiecare celulă vom vizita cei 4 vecini ai ei. Dacă
găsim pe celula curentă valoarea $x$, iar într-unul dintre vecini valoarea $x+
1$, vom marca acest lucru într-un vector de apariții pe poziția $x$. Numărul de
poziții marcate în vectorul de apariții va fi egal valoarea cu $P$. Complexitatea
acestei soluții este $\mathcal{O} (N^2 \cdot Q)$.

## Subtask 3

Observăm ca fiecare valoare apare de la 1 la $K$ exact o dată, mai puțin una
singură, care apare de două ori. Fie $b$ valoarea care apare de exact două ori
la un moment dat. Orice transformare $(i, j, c)$ poate afecta doar o celulă cu
proprietatea că $A_{i, j} = b$ înainte de transformare. Vom optimiza calculul
lui $P$ folosind această observație. La început vom parcurge matricea și vom
calcula $P$ considerând doar perechi de celule vecine numerotate cu valori $x$
și $x+ 1$ diferite de $b$, după care vom considera și contribuțiile celor două
celule care au valoarea egală cu $b$. Menținând această strategie, putem
actualiza valoarea lui $P$ în $\mathcal{O}(1)$ de la o transformare la alta,
astfel se obține o soluție de complexitate $\mathcal{O} (N^2 + Q)$.

## Subtask 4

Pe parcursul celor Q transformări vom menține un vector de frecvență $F_x$ =
câte perechi de celule vecine există pe care se află valoarea $x$ respectiv $x+
1$. Valoarea lui $P$ este dată de numărul de valori nenule din $F$ .
Actualizarea unei celule presupune scăderea (dacă este cazul) unor valori $F_x$,
apoi creșterea (dacă este cazul) unor valori $F_x$. De fiecare dată când un
$F_x$ devine 0, vom scădea $P$ cu 1, de fiecare dată când $F_x$ devine nenul vom
crește $P$ cu 1. Complexitatea acestei soluții este $\mathcal{O} (N^2 + Q)$ și
obține 100 de puncte.

## Rezolvare

Mai jos puteți găsi o soluție care ia punctajul maxim.

```cpp
#include <fstream>

using namespace std;
ifstream f("teleportor.in");
ofstream g("teleportor.out");
int n, k, i, j, c, nr, q, h, u;
int a[1002][1002], v[1000003];
int dx[4] = {-1, 0, 1, 0}, dy[4] = {0, -1, 0, 1};

int main() {
    f >> n >> k;
    for (i = 1; i <= n; i++) {
        for (j = 1; j <= n; j++) {
            f >> a[i][j];
        }
    }
    for (i = 0; i <= n + 1; i++) {
        a[0][i] = -1;
        a[n + 1][i] = -1;
        a[i][0] = -1;
        a[i][n + 1] = -1;
    }
    for (i = 1; i <= n; i++) {
        for (j = 1; j <= n; j++) {
            for (h = 0; h < 4; h++) {
                if (a[i][j] == a[i + dx[h]][j + dy[h]] + 1) {
                    v[a[i][j]]++;
                }
            }
        }
    }

    for (i = 2; i <= k; i++) {
        if (v[i]) {
            nr++;
        }
    }
    g << k - nr - 1 << "\n";

    f >> q;
    for (u = 1; u <= q; u++) {
        f >> i >> j >> c;
        for (h = 0; h < 4; h++) {
            if (a[i][j] == a[i + dx[h]][j + dy[h]] + 1) {
                v[a[i][j]]--;
                if (v[a[i][j]] == 0) {
                    nr--;
                }
            }
        }
        for (h = 0; h < 4; h++) {
            if (a[i][j] + 1 == a[i + dx[h]][j + dy[h]]) {
                v[a[i + dx[h]][j + dy[h]]]--;
                if (v[a[i + dx[h]][j + dy[h]]] == 0) {
                    nr--;
                }
            }
        }
        a[i][j] = c;
        for (h = 0; h < 4; h++) {
            if (a[i][j] == a[i + dx[h]][j + dy[h]] + 1) {
                v[a[i][j]]++;
                if (v[a[i][j]] == 1) {
                    nr++;
                }
            }
        }
        for (h = 0; h < 4; h++) {
            if (a[i][j] + 1 == a[i + dx[h]][j + dy[h]]) {
                v[a[i + dx[h]][j + dy[h]]]++;
                if (v[a[i + dx[h]][j + dy[h]]] == 1) {
                    nr++;
                }
            }
        }

        g << k - nr - 1 << "\n";
    }
    return 0;
}
```
