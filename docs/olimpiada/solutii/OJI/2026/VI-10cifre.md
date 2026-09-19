---
id: OJI-2026-VI-10cifre
title: Soluția problemei 10cifre (OJI 2026, clasa a VI-a)
problem_id: 4217
authors: [marinel]
prerequisites:
    - frequency-arrays
tags:
    - OJI
    - clasa VI
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2026/06.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2026/06.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2026/06.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
/*
Marinel Serban februarie 2026
-----------------------------
*/
#include <fstream>
using namespace std;

ifstream fin("10cifre.in");
ofstream fout("10cifre.out");

int cifre[10], i, cerinta;
int an, luna, zile, zi, ora, minut, ziua, c, nr4, ok;
unsigned long long N, CN, cdata, cate, numar;

int main() {
    unsigned long long data = 0;
    fin >> cerinta;
    fin >> N;
    CN = N;
    if (cerinta == 1) { // cerinta 1verific numarul 
        while (N) {
            cifre[N % 10]++; // numar fiecare cifra in vectorul de aparitii
            N /= 10;
        }
        ok = 1; // peesupun ca e bun
        for (i = 0; i <= 9; ++i)
            if (cifre[i] == 0)
                ok = 0; // daca in vector apare minim un zero...
        if (ok) {
            nr4 = CN / 1000 % 10000; // iau cele 4 cifre de la mjloc
            if (nr4 < 1000)          // daca prima cifra este 0
                fout << "0" << nr4;  // o scriu separat
            else
                fout << nr4;
        } 
        else
            fout << CN / 100000000 * 100 + CN % 100; // formez numarul
        fout << '\n';
        return 0;
    } 
    else {
        an = N;
        for (luna = 1; luna <= 12; luna++) { // parcurg toate lunile
            if (luna == 1 || luna == 3 || luna == 5 || luna == 7 || luna == 8 || luna == 10 || luna == 12)
                zile = 31; // luni cu 31 zile
            else           // februarie
                if (luna == 2) {
                    if ((an % 400 == 0) || (an % 4 == 0 && an % 100 != 0))
                        zile = 29; // bisect
                    else
                        zile = 28;
                } else
                    zile = 30;             // luni cu 39 zile
            for (zi = 1; zi <= zile; zi++) // parcurg zilele
            {
                for (ora = 0; ora < 24; ora++)           // parcurg orele
                    for (minut = 0; minut < 60; minut++) // parcurg minutele
                    {
                        data = 0; // formez numarul sub forma ZZLLAAHHMM
                        data = data * 100 + zi;
                        data = data * 100 + luna;
                        data = data * 100 + an % 100;
                        data = data * 100 + ora;
                        data = data * 100 + minut;
                        // pun vectorul de cifre pe 0
                        for (i = 0; i < 10; ++i)
                            cifre[i] = 0;
                        cdata = data;
                        // numar cifrele
                        for (i = 1; i <= 10; i++) {
                            c = cdata % 10;
                            cifre[c]++;
                            cdata /= 10;
                        }
                        // verific vectorul cifre - sa aiba NUMAI 1
                        for (i = 0; i < 10; i++)
                            if (cifre[i] != 1) // are 0 sau sau mai mult de 1
                                break;
                        if (i == 10) // sunt toate egale cu 1
                            cate++;  // pentru cerinta2
                    }
            }
        }
        fout << cate << '\n';
    }
    return 0;
}
```
