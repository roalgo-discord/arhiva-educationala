---
id: OJI-2004-VII-nutesuparafrate
title: Soluția problemei NU te supăra, FRATE! (OJI 2004, clasa a VII-a)
problem_id: 730
authors: []
prerequisites:
    - simulating-solution
tags:
    - OJI
    - clasa VII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2004/OJI%202004%20VII.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2004/OJI%202004%20VII.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2004/OJI%202004%20VII.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

ifstream fin("joc.in");
ofstream fout("joc.out");

const int NUMPLAYERS = 2, MAXN = 100;

int playerPosition[NUMPLAYERS], playerPoints[NUMPLAYERS], val[MAXN + 1];

int main() {
    int n, i, nrAruncari, ok, player, roll;

    fin >> n;
    for (i = 1; i <= n; i++) {
        fin >> val[i];
    }

    fin >> nrAruncari;
    i = 0;
    ok = 1;
    playerPosition[0] = playerPosition[1] = 1; // Starting position
    player = 0;                                // Player 0 player
    while (i < nrAruncari && ok) {
        fin >> roll;

        // Executam mutarea
        playerPosition[player] = (playerPosition[player] + roll - 1) % n + 1;

        // Daca jucatorul ajunge intr-o casuta cu valoarea 0, sau intr-o casuta in care se afla celalalt pion (cu exceptia casutei 1)
        // pierde toate punctele, si o ia de la 0
        if ((val[playerPosition[player]] == 0) || (playerPosition[player] == playerPosition[1 - player] && playerPosition[player] != 1)) {
            playerPoints[player] = 0;
            playerPosition[player] = 1;
        } else { // Daca nu primeste un bonus de 1 sau 10 puncte;
            playerPoints[player] += val[playerPosition[player]];
        }

        if (playerPosition[player] == 1 && playerPoints[player] != 0) {
            ok = 0;
        }

        player = 1 - player;
        i++;
    }

    if (!ok) {
        // Castigatorul este cel care se afla pe casuta 1
        fout << (playerPosition[0] == 1 ? 1 : 2) << '\n';
    } else { // Daca nu
        // Castigatorul este cel care are mai multe puncte
        if (playerPoints[0] > playerPoints[1]) { // Jucatorul 1 are mai multe puncte
            fout << 1 << '\n';
        } else if (playerPoints[0] < playerPoints[1]) { // Jucatorul 2 are mai multe puncte
            fout << 2 << '\n';
        } else { // Daca este egalitate, castiga cel care are pozitia mai mare
            fout << (playerPosition[0] > playerPosition[1] ? 1 : 2) << '\n';
        }
    }
    fout << playerPosition[0] << " " << playerPoints[0] << '\n' << playerPosition[1] << " " << playerPoints[1] << '\n';
    return 0;
}
```
