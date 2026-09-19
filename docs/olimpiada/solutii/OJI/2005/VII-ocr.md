---
id: OJI-2005-VII-ocr
title: Soluția problemei ocr (OJI 2005, clasa a VII-a)
problem_id: 741
authors: [marinel]
prerequisites:
    - simulating-solution
tags:
    - OJI
    - clasa VII
---

Daca vreti sa ne ajutati cu acest articol, ne puteti gasi pe [github](https://github.com/roalgo-discord/arhiva-educationala) sau pe [serverul nostru de discord](https://discord.gg/vdDRSmg3fC)

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <fstream>

using namespace std;

float mat[51][51];

int main() {
    ifstream cin("ocr.in");
    ofstream cout("ocr.out");

    pair<float, float> max;
    max.first = 251;
    max.second = 251;
    int n, m, ci, cj;
    float sum = 0;
    cin >> n >> m;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cin >> mat[i][j];
            sum += mat[i][j];
        }
    }
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            float lin = 0, col = 0, sumup = 0, sumst = 0, sumjos, sumdr;
            for (int l = 0; l < n; l++) {
                col += mat[l][j];
            }
            for (int l = 0; l < m; l++) {
                lin += mat[i][l];
            }
            for (int l = 0; l < i; l++) {
                for (int k = 0; k < m; k++) {
                    sumup += mat[l][k];
                }
            }
            for (int l = 0; l < j; l++) {
                for (int k = 0; k < n; k++) {
                    sumst += mat[k][l];
                }
            }
            sumjos = sum - sumup - lin;
            sumdr = sum - sumst - col;

            if (abs(sumst - sumdr) <= max.second) {
                if (abs(sumst - sumdr) < max.second || cj < j)
                    cj = j;
                max.second = abs(sumst - sumdr);
            }

            if (abs(sumup - sumjos) <= max.first) {
                if (abs(sumup - sumjos) < max.first || ci < i)
                    ci = i;
                max.first = abs(sumup - sumjos);
            }
        }
    }
    cout << ci + 1 << " " << cj + 1;

    return 0;
}
```
