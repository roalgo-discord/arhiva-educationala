---
id: OJI-2018-VII-tbile
title: Soluția problemei tbile (OJI 2018, clasa a VII-a)
problem_id: 897
authors: [ungureanu]
prerequisites:
    - ad-hoc
    - basic-math
tags:
    - OJI
    - clasa VII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2018/07/tbile.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2018/07/tbile.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2018/07/tbile.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: LotJuniori (kilonova)
#include <fstream>
#include <iostream>

using namespace std;

ifstream fin("tbile.in");
ofstream fout("tbile.out");

int yellow[200000], currentNr;
int c, n, m, v;

long long sumC2 = 0;
int main() {
    fin >> c >> n >> m;
    if (c == 2) {
        fin >> v;
    }

    int currentLvlRed = 1, currentLvlYellow = 1;

    if (currentLvlRed == v) {
        sumC2 += 1;
        sumC2 += 2;
    }
    currentLvlRed++;
    if (currentLvlRed == m + 1)
        currentLvlRed = 1;
    if (currentLvlRed == v) {
        sumC2 += 3;
        sumC2 += 4;
    }
    currentLvlRed++;
    if (currentLvlRed == m + 1)
        currentLvlRed = 1;
    currentLvlYellow = currentLvlRed;

    yellow[0] = 7;
    int yellowIndex = 0;
    currentNr = 5;
    int yellowLastElemIndex = 0;
    while (yellow[yellowLastElemIndex] <= n) {
        if (currentNr == yellow[yellowIndex]) {
            currentNr++;
            yellowIndex++;
        }

        if (currentLvlYellow == v) {
            sumC2 += yellow[yellowLastElemIndex];
        }
        currentLvlYellow++;
        if (currentLvlYellow == m + 1)
            currentLvlYellow = 1;

        yellow[yellowLastElemIndex + 1] = yellow[yellowLastElemIndex] + currentNr;
        yellowLastElemIndex++;
        currentNr++;
    }

    if (currentLvlRed < v)
        currentNr = 5 + v - currentLvlRed;
    else if (currentLvlRed == v) {
        currentNr = 5;
    } else {
        currentNr = 5 + m - currentLvlRed + v;
    }

    yellowIndex = 0;
    while (yellow[yellowIndex] <= currentNr) {
        currentNr++;
        yellowIndex++;
    }
    sumC2 += currentNr;

    while (currentNr <= n) {
        currentNr += m;
        while (yellow[yellowIndex] <= currentNr) {
            currentNr++;
            yellowIndex++;
        }
        if (currentNr > n)
            break;

        sumC2 += currentNr;
    }

    if (c == 1) {
        int adder = 0;
        int redBallsCount = n - yellowLastElemIndex - 2;
        if (redBallsCount % m) {
            adder++;
        }
        fout << redBallsCount / m + adder << " " << redBallsCount;
    } else {
        fout << sumC2;
    }

    return 0;
}
```
