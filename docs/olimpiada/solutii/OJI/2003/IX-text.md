---
id: OJI-2003-IX-text
title: Soluția problemei text (OJI 2003, clasa a IX-a)
problem_id: 711
authors: [cerchez]
prerequisites:
    - strings
tags:
    - OJI
    - clasa IX
---

Daca vreti sa ne ajutati cu acest articol, ne puteti gasi pe [github](https://github.com/roalgo-discord/arhiva-educationala) sau pe [serverul nostru de discord](https://discord.gg/vdDRSmg3fC)

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: bogdan14789 (kilonova)
#include <fstream>
#include <cstring>
#include <vector>
using namespace std;

ifstream fin("text.in");
ofstream fout("text.out");

const int MAX = 1002;

unsigned int l;
char s[MAX + 1];
char* instr;

void sol() {
    int liber, rest, crt = 0;
    vector<string> sol;
    instr = strtok(s, " ");
    while(instr != NULL) {
        if(crt + sol.size() + strlen(instr) <= l) {
            sol.push_back(instr);
            crt += strlen(instr);
        }
        else {
            liber = l - crt;
            if(sol.size() != 1) {
                rest = liber % (sol.size() - 1);
                liber /= sol.size() - 1;
            }
            else
                liber = rest = 0;
            fout << sol[0];
            for(unsigned int i = 1; i < sol.size(); i++)
                fout << string(liber + (rest-- > 0), ' ') << sol[i];
            sol.clear();
            crt = strlen(instr);
            sol.push_back(instr);
            fout << '\n';
        }
        instr = strtok(NULL, " ");
    }
    if(!sol.empty()) {
        fout << sol[0];
        for(unsigned int i = 1; i < sol.size(); i++)
            fout << ' ' << sol[i];
    }
    fout << '\n';
}

int main() {
    fin >> l;
    fin.get();
    while(fin.getline(s, MAX))
        sol();
    return 0;
}
```
