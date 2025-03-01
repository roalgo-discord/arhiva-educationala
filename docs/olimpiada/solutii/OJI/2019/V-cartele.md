---
id: OJI-2019-V-cartele
title: Soluția problemei cartele (OJI 2019, clasa a V-a)
problem_id: 907
authors:
    - traian
tags:
    - OJI
    - clasa V
    - timp
---

## Cerința 1

Cât timp parcurgem evenimentele, menținem doi contori pentru numărul de băieți,
respectiv numărul de fete din școală la momentul respectiv, și îi actualizăm
corespunzător evenimentului citit.

## Cerința 2

Menținem aceiași doi contori de la cerința 1.

Observația importantă este că, dacă la un moment dat numărul de fete este egal
cu numărul de băieți, după următorul eveniment aceste două numere nu vor mai fi
egale. Așa că vom menține și încă două variabile, care să ne spună dacă la
evenimentul precedent numărul de băieți este egal cu numărul de fete, respectiv
timpul (în secunde) al ultimului eveniment de acest fel.

## Cerința 3

Menținem aceiași doi contori ca la cerința 1 și încă două variabile care ne vor
spune dacă la ultimul eveniment am avut un număr impar de băieți și pentru cât
timp a fost acest număr de băieți impar. Când numărul de băieți devine par,
timpul se resetează la 0 și variabila cealaltă va fi setată la fals.

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <fstream>

using namespace std;

ifstream fin("cartele.in");
ofstream fout("cartele.out");

int main() {
    int cerinta, n;
    fin >> cerinta >> n;

    if (cerinta == 1) {
        int baieti = 0, fete = 0;
        for (int i = 0; i < n; i++) {
            char g, c;
            int h, m, s;
            fin >> g >> c >> h >> m >> s;

            if (g == 'b') {
                if (c == 'i') {
                    baieti++;
                } else {
                    baieti--;
                }
            } else {
                if (c == 'i') {
                    fete++;
                } else {
                    fete--;
                }
            }
        }

        fout << baieti << ' ' << fete;
    } else if (cerinta == 2) {
        int baieti = 0, fete = 0, bine = false, ps, maxim = 0;
        for (int i = 0; i < n; i++) {
            char g, c;
            int h, m, s;
            fin >> g >> c >> h >> m >> s;

            if (g == 'b') {
                if (c == 'i') {
                    baieti++;
                } else {
                    baieti--;
                }
            } else {
                if (c == 'i') {
                    fete++;
                } else {
                    fete--;
                }
            }

            if (bine) {
                bine = false;
                maxim += s + 60 * m + 60 * 60 * h - ps;
            }

            if (baieti == fete && baieti != 0) {
                bine = true;
                ps = s + 60 * m + 60 * 60 * h;
            }
        }

        fout << maxim;
    } else {
        int baieti = 0, fete = 0, bine = false, ps, maxim = 0, aux = 0, cs;
        for (int i = 0; i < n; i++) {
            char g, c;
            int h, m, s;
            fin >> g >> c >> h >> m >> s;

            if (g == 'b') {
                if (c == 'i') {
                    baieti++;
                } else {
                    baieti--;
                }
            } else {
                if (c == 'i') {
                    fete++;
                } else {
                    fete--;
                }
            }

            if (bine && baieti % 2 == 0) {
                cs = s + 60 * m + 60 * 60 * h;
                maxim = max(maxim, cs - ps + aux);
            }

            if (baieti % 2) {
                if (bine) {
                    aux += cs - ps;
                } else {
                    aux = 0;
                }

                bine = true;
                ps = s + 60 * m + 60 * 60 * h;
            } else {
                bine = false;
            }
        }

        fout << maxim;
    }

    return 0;
}
```
