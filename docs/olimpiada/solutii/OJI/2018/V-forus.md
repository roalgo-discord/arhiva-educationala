---
tags:
    - OJI
    - clasa V
authors:
    - traian
---

# Soluția problemei forus (OJI 2018, clasa a V-a)

!!! example "Cunoștințe necesare"
    - [Prelucrarea cifrelor](../../../../usor/digits-manipulation.md)
    - [Divizibilitate](../../../../usor/divisibility.md)


!!! note "Link problemă"
    Această problemă poate fi accesată [aici](https://kilonova.ro/problems/399/). 

## Cerința 1

Trebuie de fapt să aflăm câte numere nu conțin cifra 0.

## Cerința 2

Observăm că atunci când facem o tăietură, noi vom lua un prefix și un sufix al numărului și le vom alipi (mai întâi sufixul și apoi prefixul). Putem să luăm cifrele numărului de la final la început, să începem cu prefixul egal cu numărul, iar, pe măsură ce avansăm, să mai tăiem câte o cifră din prefix și să o adăugăm în sufix.

Numărul de divizori va fi calculat la fel cum este prezentat în articolul de divizibilitate menționat mai sus, iar alipirea se va face înmulțind sufixul cu 10 la puterea numărului de cifre din prefix (pe care îl vom calcula la fel cum facem cu prefixul).

Pentru mai multe detalii vedeți implementarea.

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <fstream>

using namespace std;

ifstream fin("forus.in");
ofstream fout("forus.out");

int main() {
    int c, n;
    fin >> c >> n;
    if (c == 1) {
        int cnt = 0;
        for (int i = 1; i <= n; i++) {
            int val;
            fin >> val;
            int are_zero = 0;
            while (val > 0) {
                if (val % 10 == 0) {
                    are_zero = 1;
                }
                val /= 10;
            }
            if (are_zero == 0) {
                cnt++;
            }
        }
        fout << cnt;
    } else {
        for (int i = 1; i <= n; i++) {
            int val;
            fin >> val;
            int p10prefix = 1;
            while (p10prefix <= val) {
                p10prefix *= 10;
            }
            int rasp = val, raspdiv = 0;
            for (int d = 1; d * d <= val; d++) {
                if (val % d == 0) {
                    raspdiv++;
                    if (val / d != d) {
                        raspdiv++;
                    }
                }
            }
            int p10sufix = 1, sufix = 0;
            while (val >= 10) {
                sufix += p10sufix * (val % 10);
                p10prefix /= 10;
                if (val % 10 > 0) {
                    int nrnou = sufix * p10prefix + val / 10, nrdiv = 0;
                    for (int d = 1; d * d <= nrnou; d++) {
                        if (nrnou % d == 0) {
                            nrdiv++;
                            if (nrnou / d != d) {
                                nrdiv++;
                            }
                        }
                    }
                    if (nrdiv < raspdiv) {
                        raspdiv = nrdiv;
                        rasp = nrnou;
                    } else if (nrdiv == raspdiv && nrnou < rasp) {
                        rasp = nrnou;
                    }
                }
                val /= 10;
                p10sufix *= 10;
            }
            fout << rasp << " ";
        }
    }
    return 0;
}
```