---
tags:
    - OJI
    - clasa VI
---

# Soluția problemei Unificare (OJI 2023, clasa a VI-a)

!!! example "Cunoștințe necesare"
    - [Sume parțiale](https://edu.roalgo.ro/usor/partial-sums/)
    - [Prelucrarea cifrelor](https://edu.roalgo.ro/usor/digits-manipulation/)

**Autor soluție**: Raluca Costineanu

!!! note "Link problemă"
    Această problemă poate fi accesată [aici](https://kilonova.ro/problems/512/).

Cerința 1. Pentru fiecare număr din cele $n$ citite determinăm numărul de cifre. Dacă acesta este egal cu $k$, atunci comparăm numărul cu maximul determinat până atunci, pentru a identifica cel mai mare număr.  

Cerința 2. Pentru fiecare pereche de valori aflate pe poziții alăturate în șir determinăm valoarea obținută prin unificarea celor două numere în vederea determinării maximului posibil. O variantă pentru a determina valoarea unificată pentru două numere este să considerăm toate cifrele în ordine descrescătoare și să adăugăm la numărul pe care îl formăm acele cifre care apar în scrierea fiecărui număr.  

Cerința 3. Trebuie să unificăm câte $k$ valori aflate pe poziții consecutive în șirul dat, iar valoarea obținută ar fi prea mare pentru a putea fi reținută într-o variabilă simplă de memorie. Putem utiliza un vector de numărare în care să reținem, pentru fiecare cifră, în câte dintre numerele dintr-o secvență de $k$ valori aflate pe poziții consecutive în șir, apare cifra respectivă. Pentru a compara numărul curent cu maximul pe care îl determinăm va trebui mai întâi să verificăm dacă am obținut un număr cu mai multe cifre, caz în care ar fi mai mare, sau dacă avem același număr de cifre, verificăm dacă avem o cifră mai mare cu un număr mai mare de apariții. Maximul obținut îl vom afișa, cifră cu cifră, în fișierul de ieșire.  

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <fstream>
#include <iostream>

using namespace std;

ifstream fin("unificare.in");
ofstream fout("unificare.out");

bool v1[10], v2[10], v[100005][10];
short sume[100005][10], maxc[C10];

int main() {
    short cerinta, nrc, nrcmax = 0;
    int n, k, x, copie, maxim = 0;
    long long maxnr = 0, nr;
    fin >> cerinta >> n >> k;

    if (cerinta == 1) {
        for (int i = 1; i <= n; i++) {
            fin >> x;
            nrc = 0;
            copie = x;

            do {
                nrc++;
                x /= 10;
            } while (x);

            if (nrc == k) {
                maxim = max(maxim, copie);
            }
        }

        fout << maxim;
    } else if (cerinta == 2) {
        fin >> x;

        while (x) {
            v1[x % 10] = true;
            x /= 10;
        }

        for (int i = 2; i <= n; i++) {
            fin >> x;

            for (short j = 0; j <= 9; j++) {
                v2[j] = false;
            }

            while (x) {
                v2[x % 10] = true;
                x /= 10;
            }

            nr = 0;

            for (short j = 9; j >= 0; j--) {
                if (v1[j]) {
                    nr = nr * 10 + j;
                }

                if (v2[j]) {
                    nr = nr * 10 + j;
                }
            }

            maxnr = max(maxnr, nr);

            for (short j = 0; j <= 9; j++) {
                v1[j] = v2[j];
            }
        }

        fout << maxnr;
    } else {
        for (int i = 1; i <= n; i++) {
            fin >> x;

            while (x) {
                v[i][x % 10] = true;
                x /= 10;
            }

            for (short j = 0; j <= 9; j++) {
                sume[i][j] = sume[i - 1][j] + v[i][j];
            }
        }

        for (int i = 1; i <= n - k + 1; i++) {
            short curent[10], nrc = 0;

            for (short j = 0; j <= 9; j++) {
                curent[j] = sume[i + k - 1][j] - sume[i - 1][j];
                nrc += curent[j];
            }

            if (nrc > nrcmax) {
                nrcmax = nrc;

                for (short j = 9; j >= 0; j--) {
                    maxc[j] = curent[j];
                }
            } else if (nrc == nrcmax) {
                for (short j = 9; j >= 0; j--) {
                    if (curent[j] > maxc[j]) {
                        for (short k = 9; k >= 0; k--) {
                            maxc[k] = curent[k];
                        }

                        break;
                    }

                    if (curent[j] < maxc[j]) {
                        break;
                    }
                }
            }
        }

        for (short i = 9; i >= 0; i--) {
            for (short j = 1; j <= maxc[i]; j++) {
                fout << i;
            }
        }
    }

    return 0;
}
```