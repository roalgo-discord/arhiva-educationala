---
id: ONI-2025-VII-alvn
title: Soluția problemei Alvn (ONI 2025, clasa a VII-a)
problem_id: 3742
authors: [marcu]
prerequisites:
    - partial-sums
tags:
    - ONI
    - clasa VII
    - smenul lui Mars
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/ONI%20%28national%20olympiad%29/2025/07.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/ONI%20%28national%20olympiad%29/2025/07.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/ONI%20%28national%20olympiad%29/2025/07.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: iustinola16 (kilonova)
///p (cerinta) == 1:
///Grupul lui ALVN va dori sa consume stejarul (parcela) care produce cele mai multe ghinde,
///deoarece acestia nu sunt limitati de un alt grup, avand libertatea de a alege orice stejar
///Asadar, voi calcula pentru fiecare stejar, cate ghinde produce.
///Voi face acest lucru calculand sumele partiale ale valorilor din matrice, pe linii, respectiv coloane.
///Astfel, cu ajutorul acestor sume partiale, pot calcula acum, pentru fiecare stejar, cate ghinde are pe fiecare strat, inmultind cu xk.
///Valorile acestea le vom aduna pentru a obtine valoarea finala pentru un stejar, dupa care aleg maximul dintre acestea.
///Voi fi atent la cum incadrez sumele partiale, pentru a nu avea parcele luate de mai multe ori, ceea ce mi-ar putea schimba raspunsul.
///De asemenea voi fi atent ca sumele partiale sa nu iasa din matrice cand le accesez
///Complexitate: O(N * M) - sume partiale, O(N * M * K) - calcul pentru fiecare parcela => O(N * M * K) - TOTAL
///
///p == 2:
///Acum am 2 grupuri de veverite si doresc sa maximizez numarul total de ghinde luate
///Voi selecta 2 parcele a caror suma maxima este cea mai mare si care nu se suprapun
///Cum fac asta?
///Voi folosi aceleasi precalculari ca la cerinta 1, dar pe maxime partiale
///Voi face 4 vectori, care calculeaza maximul:
///de la linia 1 la linia i;
///de la linia n la linia i;
///de la coloana 1 la coloana j;
///de la coloana n la coloana j.
///Complexitate: O(N * M) - maxime partiale, O(N * M) - verificare pentru fiecare celula
/// => O(N * M * K) - TOTAL (trebuie sa realizez precalcularile si de la prima cerinta)
#include <iostream>
#include <fstream>
#include <algorithm>
using namespace std;
ifstream fin("alvn.in");
ofstream fout("alvn.out");

const int NMAX = 705, KMAX = 205;

int p, N, M, K;
int mat[NMAX][NMAX], x[KMAX];
long long sp_linii[NMAX][NMAX], sp_coloane[NMAX][NMAX];
long long ghinde[NMAX][NMAX], maxim_st[NMAX], maxim_dr[NMAX], maxim_sus[NMAX], maxim_jos[NMAX];

///functie de calcul - imi cer scuze pentru functiile de minim si maxim
long long calculare(int i, int j, int k) {
    if (k == 0) return 1LL * mat[i][j] * x[k + 1];

    long long termen_sus = 0, termen_jos = 0, termen_stanga = 0, termen_dreapta = 0;

    ///partea de sus
    if (i - k > 0) termen_sus = sp_linii[i - k][min(j + k, M)] - sp_linii[i - k][max(j - k - 1, 0)];

    ///partea de jos
    if (i + k <= N) termen_jos = sp_linii[i + k][min(j + k, M)] - sp_linii[i + k][max(j - k - 1, 0)];

    ///partea din stanga - am grija sa nu mai adaug colturile (care sunt si punctele de intersectie a sumelor partiale) inca o data
    if (j - k > 0) termen_stanga = sp_coloane[min(i + k - 1, N)][j - k] - sp_coloane[max(i - k, 0)][j - k];

    ///parte din dreapta - la fel ca pentru partea din stanga, am grija la colturi
    if (j + k <= M) termen_dreapta = sp_coloane[min(i + k - 1, N)][j + k] - sp_coloane[max(i - k, 0)][j + k];

    return 1LL * x[k + 1] * (termen_sus + termen_jos + termen_stanga + termen_dreapta) ;
}

int main()
{
    fin >> p >> N >> M;

    for (int i = 1; i <= N; i++) {
        for (int j = 1; j <= M; j++) {
            fin >> mat[i][j];
        }
    }

    fin >> K;

    for (int i = 1; i <= K; i++) {
        fin >> x[i];
    }

    ///precalculari sume partiale
    for (int i = 1; i <= N; i++) {
        for (int j = 1; j <= M; j++) {
            sp_linii[i][j] = sp_linii[i][j - 1] + 1LL * mat[i][j];

            sp_coloane[i][j] = sp_coloane[i - 1][j] + 1LL * mat[i][j];
        }
    }

    ///calcul pentru fiecare stejar
    long long ans1 = 0;
    for (int i = 1; i <= N; i++) {
        for (int j = 1; j <= M; j++) {
            long long total = 0;

            for (int k = 1; k <= K; k++) {
                ///am facut o functie care sa imi calculeze suma pentru fiecare strat
                total += calculare(i, j, k - 1);
            }

            ghinde[i][j] = total;
            ans1 = max(ans1, total);
        }
    }

    if (p == 1) fout << ans1;
    else {
        ///maxime partiale de sus si din stanga
        for (int i = 1; i <= N; i++) {
            for (int j = 1; j <= M; j++) {
                maxim_sus[i] = max({maxim_sus[i], maxim_sus[i - 1], ghinde[i][j]});
                maxim_st[j] = max({maxim_st[j], maxim_st[j - 1], ghinde[i][j]});
            }
        }

        ///maxime partiale de jos si din dreapta
        for (int i = N; i >= 1; i--) {
            for (int j = M; j >= 1; j--) {
                maxim_jos[i] = max({maxim_jos[i], maxim_jos[i + 1], ghinde[i][j]});
                maxim_dr[j] = max({maxim_dr[j], maxim_dr[j + 1], ghinde[i][j]});
            }
        }

        ///aflare raspuns
        long long ans2 = 0;
        for (int i = 1; i <= N; i++) {
            for (int j = 1; j <= M; j++) {
                ///valoarea mea curenta
                long long termen1 = ghinde[i][j];

                ///calculare maxim pe care il pot lua
                long long termen2 = -1;

                ///verific ca macar o parcela pe care o pot lua sa nu fie afara din matrice
                if (i - 2 * (K - 1) - 1 > 0) termen2 = max(termen2, maxim_sus[i - 2 * (K - 1) - 1]);
                if (i + 2 * (K - 1)  + 1 <= N) termen2 = max(termen2, maxim_jos[i + 2 * (K - 1)  + 1]);
                if (j - 2 * (K - 1) - 1 > 0) termen2 = max(termen2, maxim_st[j - 2 * (K - 1) - 1]);
                if (j + 2 * (K - 1) + 1 <= M) termen2 = max(termen2, maxim_dr[j + 2 * (K - 1) + 1]);

                if (termen2 != -1) ans2 = max(ans2, termen1 + termen2);
            }
        }

        fout << ans2;
    }
    return 0;
}
```
