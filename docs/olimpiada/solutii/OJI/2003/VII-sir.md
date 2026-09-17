---
id: OJI-2003-VII-sir
title: Soluția problemei sir (OJI 2003, clasa a VII-a)
problem_id: 717
authors: []
prerequisites:
    - simulating-solution
    - strings
tags:
    - OJI
    - clasa VII
---

Daca vreti sa ne ajutati cu acest articol, ne puteti gasi pe [github](https://github.com/roalgo-discord/arhiva-educationala) sau pe [serverul nostru de discord](https://discord.gg/vdDRSmg3fC)

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <iostream>
#include <fstream>
#include <vector>
#include <string>

std::string generateSequence(int n) {
    std::vector<std::string> sequence = {"a", "b"};

    for (int i = 2; i < n; ++i) {
        sequence.push_back(sequence[i - 1] + sequence[i - 2]);
    }

    return sequence[n - 1];
}

int main() {
    std::ifstream fin("sir.in");
    std::ofstream fout("sir.out");

    int n;
    fin >> n;

    std::string result = generateSequence(n);
    fout << result;

    return 0;
}
```
