---
tags:
    - OJI
    - clasa V
    - formule
---

# Soluția problemei patrate (OJI 2018, clasa a V-a)

**Autor soluție**: Traian Mihai Danciu

!!! note "Link problemă"
    Această problemă poate fi accesată [aici](https://kilonova.ro/problems/893/). 

## Cerința 1

Primul element din pătratul $M$ este $(2 \cdot M - 1) ^ 2$, iar ultimul este. $(2 \cdot M + 1) ^ 2 - 1$. Sunt $(2 \cdot M + 1) ^ 2 - 1 - (2 \cdot M - 1) + 1 = (2 \cdot M + 1) ^ 2 - (2 \cdot M - 1) ^ 2$ elemente.

## Cerința 2

Căutăm primul număr $T$ pentru care $(2 \cdot T - 1) ^ 2 \leq N \leq (2 \cdot T + 1) ^ 2 - 1$.

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <fstream>
	
using namespace std;
	
ifstream fin("patrate.in");
ofstream fout("patrate.out");
	
int main()
{
    int c, n, i;
    bool st = true;
    fin>>c>>n;

    if (c == 1) {
        fout<<(1+2*n)*(1+2*n)-(1+2*(n-1))*(1+2*(n-1));
    }
    else {
    	i = 0;
    	while (!((2*i-1)*(2*i-1) <= n && n <= (2*i+1)*(2*i+1)-1)) {
    		i++;
    	}
	
        fout<<i;
    }
	
    return 0;
	
}
```