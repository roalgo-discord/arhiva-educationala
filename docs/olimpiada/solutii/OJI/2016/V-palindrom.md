---
tags:
    - OJI
    - clasa V
    - cifre
---

# Soluția problemei palindrom (OJI 2016, clasa a V-a)

!!! example "Cunoștințe necesare"
    - [Prelucrarea cifrelor](../../../../../usor/digits-manipulation.html)

**Autor soluție**: Traian Mihai Danciu

!!! note "Link problemă"
    Această problemă poate fi accesată [aici](https://kilonova.ro/problems/867/). 

## Cerința 1

Calculăm oglinditul fiecărui număr și verificăm dacă cele două sunt egale. De notat este faptul că oglinditul poate fi peste limita tipului int.

## Cerința 2

Calculăm oglinditul fiecărui număr și vedem câte cifre sunt diferite. Dacă numărul este aproape palindrom, ar trebui să fie exact două diferențe.

## Cerința 3

Fiecare număr palindrom poate fi descris ca o concatenare a unui număr, a unei cifre și a răsturnatului acelui număr (cu eventuale 0-uri adăugate la început).

Pentru fiecare număr, vom nota cu $d$ numărul de cifre ale lui. Fie $d = 2 \cdot k + r$, cu $r < 2$. Să calculăm numărul format din primele $k+r$ cifre și să îl notăm cu $j$. Atunci numărul format din primele $k+r$ cifre al palindromului asociat va fi egal cu $j$ sau cu $j+1$. Astfel, putem să testăm doar două numere. Pentru mai multe detalii despre vedeți implementarea.

Un caz particular pe care această soluție greșește este un număr de forma $X = 999 \dots 9$. Putem verifica în special acest caz, răspunsul fiind $X + 2$.

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <fstream>

using namespace std;

ifstream fin("palindrom.in");
ofstream fout("palindrom.out");

long long oglindit(int n) {
    long long r = 0;
    while (n > 0) {
        r = r * 10 + n % 10;
        n /= 10;
    }
    return r;
}

// completez pref cu rasturnatul sau, iar daca mij = 1 ultima cifra nu o mai rastorn
long long completeaza(int p, int mij) {
    long long answer = p;
    if (mij == 1) {
        p /= 10;
    }
    int p10 = 1;
    while (p10 <= p) {
        p10 *= 10;
    }
    return answer * p10 + oglindit(p);
}

int main() {
    int c, n;
    fin >> c >> n;
    if (c == 1) {
        int cnt = 0;
        for (int i = 1; i <= n; i++) {
            int val;
            fin >> val;
            if (val == oglindit(val)) {
                cnt++;
            }
        }
        fout << cnt;
    } else if (c == 2) {
        int cnt = 0;
        for (int i = 1; i <= n; i++) {
            int val;
            fin >> val;
            long long ogl = oglindit(val);
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
                int primele = 0; // primele k+r cifre
                for (int j = 0; j < nrcifre / 2 + nrcifre % 2; j++) {
                    p10 /= 10;
                    primele = primele * 10 + (val / p10 % 10);
                }
                long long answer = 0;
                if (completeaza(primele, nrcifre % 2) <= val) {
                    answer = completeaza(primele + 1, nrcifre % 2);
                } else {
                    answer = completeaza(primele, nrcifre % 2);
                }
                fout << answer << " ";
            }
        }
    }
    return 0;
}
```