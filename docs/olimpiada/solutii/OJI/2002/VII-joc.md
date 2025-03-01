---
id: OJI-2002-VII-joc
title: Soluția problemei joc (OJI 2002, clasa a VII-a)
problem_id: 706
authors: [stefdasca]
prerequisites:
   - simulating-solution
tags:
    - OJI
    - clasa VII
---


Tot ce trebuie să facem în această problemă este să simulăm mutările făcute de
către cei doi jucători. Vom verifica pe rând momentele când suma depășește suma
precedentă și vom aduna aceste sume la răspuns.

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ifstream cin("joc.in");
    ofstream cout("joc.out");

    int n;
    cin >> n;

    long long sm = 0;
    long long ans = -1;
    for (int i = 1; i <= n; i++) {
        long long x;
        cin >> x;
        if (x > sm + 1) {
            if (ans == -1)
                ans = sm;
        } 
        else
            sm += x;
    }

    if (ans == -1)
        ans = sm;

    cout << sm;
    return 0;
}
```
