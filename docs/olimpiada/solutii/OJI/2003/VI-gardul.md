---
id: OJI-2003-VI-gardul
title: Soluția problemei gardul (OJI 2003, clasa a VI-a)
problem_id: 716
authors: [dgrigoriu]
prerequisites:
    - divisibility
tags:
    - OJI
    - clasa VI
---

Daca vreti sa ne ajutati cu acest articol, ne puteti gasi pe [github](https://github.com/roalgo-discord/arhiva-educationala) sau pe [serverul nostru de discord](https://discord.gg/vdDRSmg3fC)

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: Cosminane (kilonova)
#include <fstream>
using namespace std;

ifstream fin("gardul.in");
ofstream fout("gardul.out");

int main() {
    int n, p, q, nevopsite, rosu, albastru, violet, i;
    nevopsite = 0;
    rosu = 0;
    albastru = 0;
    violet = 0;
    fin >> n >> p >> q;
    for(i = 1; i <= n; i++) {
        if(i % p == 0 && i % q != 0) {
            rosu++; 
        }
        else if(i % p != 0 && i % q == 0) {
            albastru++;
        }
        else if(i % p == 0 && i % q == 0) {
            violet++;
        }
        else{
            nevopsite++;
        }
    }
    fout << nevopsite << '\n' << rosu << '\n' << albastru << '\n' << violet;
    return 0;
}
```
