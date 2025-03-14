---
id: OJI-2016-V-palindrom
title: Soluția problemei palindrom (OJI 2016, clasa a V-a)
problem_id: 867
authors:
    - traian
prerequisites:
   - digits-manipulation
tags:
    - OJI
    - clasa V
    - cifre
---


## Cerința 1

Calculăm oglinditul fiecărui număr și verificăm numărul și oglinditul lui sunt
egale. De notat este faptul că oglinditul poate fi peste limita tipului `int`,
așa că va trebui să folosim `long long`.

## Cerința 2

Calculăm oglinditul fiecărui număr și vedem câte cifre sunt diferite între număr
și oglindit. Dacă numărul este aproape palindrom, ar trebui să fie exact două
diferențe.

Cifra din mijloc nu ar putea să fie diferită, așa că vor exista exact două
poziții cu cifre diferite. De exemplu, pentru numărul $12 \ 341$, oglinditul
este $14 \ 321$, iar diferențele sunt la a doua și la a patra cifră.

## Cerința 3

Fiecare număr palindrom poate fi descris ca o concatenare a unui număr, a unei
cifre și a răsturnatului acelui număr (cu eventuale 0-uri adăugate la început).
De exemplu, numărul $12 \ 321$ este concatenarea lui $12$ cu $3$ și cu $21$,
răsturnatul lui $12$, iar numărul $1 \ 221$ este concatenarea lui $12$ cu $21$
(din nou, răsturnatul lui $12$).

Pentru fiecare număr, vom nota cu $d$ numărul de cifre ale lui. Fie $d = 2 \cdot
k + r$, cu $r < 2$. Să calculăm numărul format din primele $k+r$ cifre și să îl
notăm cu $j$. Atunci numărul format din primele $k+r$ cifre al palindromului
asociat va fi egal cu $j$ sau cu $j+1$. Astfel, putem să testăm doar două
numere. Pentru mai multe detalii despre vedeți implementarea.

Un caz particular pe care această soluție greșește este un număr de forma $X =
999 \dots 9$. Putem verifica în special acest caz, răspunsul fiind $X + 2$.

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <fstream>

using namespace std;

ifstream fin("palindrom.in");
ofstream fout("palindrom.out");

int main() {
    int c, n;
    fin >> c >> n;
    if (c == 1) {
        int cnt = 0;
        for (int i = 1; i <= n; i++) {
            int val;
            fin >> val;
            long long ogl = 0;
            int copie = val;
            while (copie > 0) {
                ogl = ogl * 10 + copie % 10;
                copie /= 10;
            }
            if (val == ogl) {
                cnt++;
            }
        }
        fout << cnt;
    } else if (c == 2) {
        int cnt = 0;
        for (int i = 1; i <= n; i++) {
            int val;
            fin >> val;
            long long ogl = 0;
            int copie = val;
            while (copie > 0) {
                ogl = ogl * 10 + copie % 10;
                copie /= 10;
            }
            int nrdif = 0;
            while (val > 0) {
                if (val % 10 != ogl % 10) {
                    nrdif++;
                }
                val /= 10;
                ogl /= 10;
            }
            if (nrdif == 2) {
                cnt++;
            }
        }
        fout << cnt;
    } else {
        for (int i = 1; i <= n; i++) {
            int val;
            fin >> val;
            int copie = val, nrcifre = 0, doar_noua = 1;
            long long p10 = 1;
            while (copie > 0) {
                if (copie % 10 != 9) {
                    doar_noua = 0;
                }
                nrcifre++;
                copie /= 10;
                p10 *= 10;
            }
            if (doar_noua) {
                fout << val + 2 << " ";
            } else {
                int primele = 0;  // primele k+r cifre
                for (int j = 0; j < nrcifre / 2 + nrcifre % 2; j++) {
                    p10 /= 10;
                    primele = primele * 10 + (val / p10 % 10);
                }
                // completez primele cu rasturnatul sau, iar daca nrcifre % 2 =
                // 1 ultima cifra nu o mai rastorn
                long long answer = primele;
                copie = primele;
                if (nrcifre % 2 == 1) {
                    copie /= 10;
                }
                p10 = 1;
                while (p10 <= copie) {
                    p10 *= 10;
                }
                long long ogl = 0;
                while (copie > 0) {
                    ogl = ogl * 10 + copie % 10;
                    copie /= 10;
                }
                answer = answer * p10 + ogl;
                if (answer <= val) {
                    primele++;  // incerc acum cu primele + 1
                    answer = primele;
                    if (nrcifre % 2 == 1) {
                        primele /= 10;
                    }
                    p10 = 1;
                    while (p10 <= primele) {
                        p10 *= 10;
                    }
                    ogl = 0;
                    while (primele > 0) {
                        ogl = ogl * 10 + primele % 10;
                        primele /= 10;
                    }
                    answer = answer * p10 + ogl;
                }
                fout << answer << " ";
            }
        }
    }
    return 0;
}
```
