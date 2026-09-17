---
id: OJI-2003-VIII-templu
title: Soluția problemei templu (OJI 2003, clasa a VIII-a)
problem_id: 719
authors: []
prerequisites:
    - simulating-solution
tags:
    - OJI
    - clasa VIII
---

Daca vreti sa ne ajutati cu acest articol, ne puteti gasi pe [github](https://github.com/roalgo-discord/arhiva-educationala) sau pe [serverul nostru de discord](https://discord.gg/vdDRSmg3fC)

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: munteanuvlad98 (kilonova)
#include <bits/stdc++.h>
using namespace std;

int matrix[20][20];

int uniteNumbers(int a, int b) {
    // returneze ab

    int result = 0;
    int currentPower = 1;
    while (b > 0) {
        result = result + currentPower * (b % 10); // adaug cifra lui b la result
        b /= 10;                                   // elimin ultima cifra din b
        currentPower *= 10;
    }
    while (a > 0) {
        result = result + currentPower * (a % 10); // adaug cifra lui b la result
        a /= 10;                                   // elimin ultima cifra din b
        currentPower *= 10;
    }
    return result;
}

bool cmp(int A, int B) {
    return uniteNumbers(A, B) < uniteNumbers(B, A); // daca asta se intampla, inseamna ca A < B
}

string toString(int A) {
    // A = 153 -> 15 -> 1 -> 0
    // result = "" -> "3" -> "35" -> "351" -> "135"
    string result = "";
    while (A > 0) {
        result += (char)(A % 10 + '0');
        A /= 10;
    }
    reverse(result.begin(), result.end());
    return result;
}

int main() {
    freopen("templu.in", "r", stdin);
    freopen("templu.out", "w", stdout);
    int N, L;
    cin >> N >> L;

    for (int l = 1; l <= (L + 1) / 2; ++l) {
        for (int i = l; i <= L - l + 1; ++i) {
            for (int j = l; j <= L - l + 1; ++j) {
                matrix[i][j] = N + l - 1;
            }
        }
    }

    int totalSum = 0;
    vector<int> v;
    for (int i = 1; i <= L; ++i) {
        int sum = 0;
        for (int j = 1; j <= L; ++j) {
            sum += matrix[i][j];
        }
        totalSum += sum;
        v.push_back(sum);
    }

    v.push_back(totalSum);

    sort(v.begin(), v.end(), cmp);

    string total;

    for (auto x : v) {
        total += toString(x);
    }
    cout << total;
    cout << endl;

    int maxValue = -1;

    for (int i = 0; i + 1 < total.size(); ++i) {
        int curentValue = (total[i] - '0') * 10 + (total[i + 1] - '0'); // construiesc numar de 2 cifre din sirul dat scazand codul ASCII al lui 0
        maxValue = max(maxValue, curentValue);
    }
    cout << maxValue;

    return 0;
}
```
