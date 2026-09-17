---
id: OJI-2003-V-exponent
title: Soluția problemei exponent (OJI 2003, clasa a V-a)
problem_id: 713
authors: []
prerequisites:
    - basic-math
    - divisibility
tags:
    - OJI
    - clasa V
---

Daca vreti sa ne ajutati cu acest articol, ne puteti gasi pe [github](https://github.com/roalgo-discord/arhiva-educationala) sau pe [serverul nostru de discord](https://discord.gg/vdDRSmg3fC)

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <fstream>
using namespace std;

ifstream fin("exponent.in");
ofstream fout("exponent.out");
int n, k, exp, i, j;
long long nr;
int main() {
    fin >> n >> k;
    nr = 1;
    for(i = k; i <= n; i += k) {
		j = i;
		while(j % k == 0) {
			exp++;
			j = j / k;
		}
    }

    fout << exp;
    return 0;
}
```
