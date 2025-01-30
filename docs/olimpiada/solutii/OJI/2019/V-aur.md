---
tags:
    - OJI
    - clasa V
    - cifre
    - citire caractere
---

# Soluția problemei aur (OJI 2019, clasa a V-a)

!!! example "Cunoștințe necesare"
    - [Prelucrarea cifrelor](../../../../../usor/digits-manipulation)

**Autor soluție**: Traian Mihai Danciu

!!! note "Link problemă"
    Această problemă poate fi accesată [aici](https://kilonova.ro/problems/906/). 

## Cerința 1

Putem citi toate numerele și să calculăm pentru fiecare câte cifre are (notăm acest număr cu $ncf$). Acum trebuie să aflăm suma $ncf$-urilor.

Mai ușor, putem citi caracter cu caracter cifrele și să numărăm câte sunt. Vom folosi pentru celelalte cerințe această metodă, deoarece este mai ușoară decât să citim numerele și să le prelucrăm cifrele.

## Cerința 2

Citim caracter cu caracter cifrele, până când ajungem la a $K$-a, pe care o afișăm.

## Cerința 3

Citim mai întâi primele $P$ cifre și formăm primul număr (fie acesta $nr$). Pentru a forma următorul număr ar trebui să ștergem prima cifră din $nr$ și să adăugăm încă o cifră $cf$ la final. Acest lucru este echivalent cu a adăuga cifra $cf$ la finalul lui $nr$ și a păstra ultimele $P$ cifre ($nr = (nr \cdot 10 + cf) \ \% \ 10^p$, unde $10^p$ este calculat la începutul programului).

Pentru a ne fi și mai ușor să implementăm acest cod, observăm că nici măcar nu trebuie să aflăm numărul format din primele $P$ cifre, putem să începem cu $0$ și să adăugăm câte o cifră, deoarece aceste numere nu vor afecta răspunsul (un număr format din $P-1$ cifre este mereu mai mic decât un număr format din $P$ cifre).

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <fstream>

using namespace std;

ifstream fin("aur.in");
ofstream fout("aur.out");

int main()
{
    long long nr = 0, maxim = 0, put = 1, cnt = 0, cerinta, n, k;
    char c;
    fin>>cerinta>>n;
    
    if (cerinta == 1) {
        while (fin>>c) {
            cnt++;
        }
        
        fout<<cnt;
    }
    else if (cerinta == 2) {
        fin>>k;
        
        while (fin>>c) {
            cnt++;
            
            if (cnt == k) {
                fout<<c;
            }
        }
    }
    else {
        fin>>k;
        
        while (k > 0) {
            put *= 10;
            k--;
        }
        
        while (fin>>c) {
            nr = nr*10+c-'0';
            nr = nr%put;
            
            if (nr > maxim) {
                maxim = nr;
            }
        }
        
        fout<<maxim;
    }
    
    return 0;
}
```