---
id: OJI-2003-VII-paranteze
title: Soluția problemei paranteze (OJI 2003, clasa a VII-a)
problem_id: 718
authors: []
prerequisites:
    - simulating-solution
    - stack
tags:
    - OJI
    - clasa VII
---

Daca vreti sa ne ajutati cu acest articol, ne puteti gasi pe [github](https://github.com/roalgo-discord/arhiva-educationala) sau pe [serverul nostru de discord](https://discord.gg/vdDRSmg3fC)

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <fstream>
#include <stack>
#include <vector>

using namespace std;

int main() {
    ifstream in("paranteze.in");
    ofstream out("paranteze.out");

    int n;
    in >> n;

    for (int i = 0; i < n; i++) {
        int l;
        in >> l;

        vector<int> paranteze(l);
        for (int j = 0; j < l; j++) {
            in >> paranteze[j];
        }

        bool corect = true;
        stack<int> deschise;
        for (int j = 0; j < l; j++) {
            int tip = paranteze[j];
            if (tip % 2 == 0) {
                deschise.push(tip);
            } 
            else {
                if (deschise.empty()) {
                    corect = false;
                    break;
                }
                int top = deschise.top();
                deschise.pop();
                if (top != tip - 1) {
                    corect = false;
                    break;
                }
            }
        }

        if (!deschise.empty()) {
            corect = false;
        }

        out << (corect ? "Da" : "Nu") << endl;
    }

    return 0;
}
```
