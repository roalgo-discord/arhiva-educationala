---
id: OJI-2003-VI-visul
title: Soluția problemei visul (OJI 2003, clasa a VI-a)
problem_id: 715
authors: []
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
long long f[11] = {-1, 0, 23, 311, 4113, 53113, 611317, 7113173, 83113717, 971131737, 0}; // sunt doar 10 inputuri posibile
int main(){
    int n;
    ifstream fin("visul.in");
    ofstream fout("visul.out");
    fin >> n;
    if(f[n] == 0){
        fout << "Nu exista";
    }
    else{
        fout << f[n];
    }
    return 0;
}
```
