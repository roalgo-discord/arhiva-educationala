---
id: OJI-2003-V-pinochio
title: Soluția problemei pinochio (OJI 2003, clasa a V-a)
problem_id: 714
authors: []
prerequisites:
    - basic-math
tags:
    - OJI
    - clasa V
---

Daca vreti sa ne ajutati cu acest articol, ne puteti gasi pe [github](https://github.com/roalgo-discord/arhiva-educationala) sau pe [serverul nostru de discord](https://discord.gg/vdDRSmg3fC)

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: roland (kilonova)
#include <fstream>
using namespace std;

ifstream fin("pinochio.in");
ofstream fout("pinochio.out");

int main() {
  int n, p, k;
  fin>>n>>p>>k;
  fout<<n + k*p - ((k+1)/7)*(p+1) - (k/7)*(p+1);
  return 0;
}
```
