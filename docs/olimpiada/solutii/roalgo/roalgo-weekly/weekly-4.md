---
id: roalgo-weekly-4
title: Descrierea soluțiilor RoAlgo Weekly Contest 4
authors: [stefdasca]
prerequisites:
    - basic-math
    - arrays
    - matrices
    - strings
tags:
    - clasa
    - bacalaureat
    - clasa IX
---

Vă mulțumim că ați luat parte la concursul
[RoAlgo Weekly Contest #4](https://kilonova.ro/contests/1656/). Acest concurs nu
ar fi putut avea loc fără sprijinul vostru și fără ajutorul testerilor
concursului, care sunt prezenți în lista de editori a concursului de pe Kilonova.

Această serie de concursuri va continua în fiecare săptămână, scopul fiind acela
de a deveni un concurs similar în popularitate cu rundele de pe LeetCode și nu
numai.

## Problema [triplet](https://kilonova.ro/problems/3708)

Pentru a rezolva această problemă, vom verifica pentru fiecare test de la
intrare dacă se respectă condițiile menționate în enunț (două valori să fie
egale, iar a treia să fie diferită).

### Rezolvare

Mai jos puteți găsi o soluție care ia punctajul maxim.

```cpp
#include <iostream>
using namespace std;
 
int main() {
    int t;
    cin >> t;
    
    for (int i = 1; i <= t; i++) {
        int a, b, c;
        cin >> a >> b >> c;
        
        if (a == b && b != c) {
            cout << "Da" << '\n';
            continue;
        }
        if (a == c && b != c) {
            cout << "Da" << '\n';
            continue;
        }
        if (c == b && b != a) {
            cout << "Da" << '\n';
            continue;
        }
        cout << "Nu" << '\n';
    }
    return 0;
}
```


## Problema [icsuri](https://kilonova.ro/problems/3709)

Pentru a rezolva această problemă, trebuie să verificăm pentru fiecare
celulă din matrice dacă cele patru celule de pe diagonale adiacente cu ea
sunt și ele egale cu $1$ pentru a avea garanția că avem un X acolo.

### Rezolvare

Mai jos puteți găsi o soluție care ia punctajul maxim.

```cpp
#include <iostream>
using namespace std;

int mat[101][101];

int main() {    
    int n, m;
    cin >> n >> m;
    
    for(int i = 1; i <= n; i++) {
        for(int j = 1; j <= m; j++) {
            cin >> mat[i][j];
        }
    }
    
    int answer = 0;
    for(int i = 2; i < n; i++) {
        for(int j = 2; j < m; j++) {
            if(mat[i][j] && mat[i - 1][j - 1] && mat[i - 1][j + 1] && mat[i + 1][j - 1] && mat[i + 1][j + 1]) {
                answer++;
            }
        }
    }
    
    cout << answer << '\n';
    return 0;
}
```

## Problema [nota](https://kilonova.ro/problems/3710)

Vom itera prin fiecare notă pe care elevul o poate obține la ultimul examen și
verificăm dacă acea notă este îndeajuns pentru a trece examenul, conform
algoritmului din enunț.

### Rezolvare

Mai jos puteți găsi o soluție care ia punctajul maxim.

```cpp
#include <iostream>
using namespace std;
int main() {
    int N, X, sol = -1;
    cin >> N >> X;
    
    int v[N+1], sum = 0;
    for (int i = 1; i < N; i++) {
        cin >> v[i];
        sum = sum + v[i];
    }
    for (int i = 0; i <= 100; i++) {
        int maxi = i, mini = i;
        for (int j = 1; j < N; j++) {
            if (v[j] > maxi) {
                maxi = v[j];
            }
            if (v[j] < mini) {
                mini = v[j];
            }
        }
        if (sum + i - maxi - mini >= X) {
            sol = i;
            break;
        }
    }
    cout << sol << '\n';
    return 0;
}
```

## Problema [api](https://kilonova.ro/problems/3711)

Pentru a rezolva această problemă, vom afla mai întâi folosind un vector de
frecvență care valori respectă proprietatea din enunț, iar mai apoi, avem grijă
să afișăm DA sau NU după caz.

### Rezolvare

Mai jos puteți găsi o soluție care ia punctajul maxim.

```cpp
#include <iostream>
using namespace std;

int fr[1001];

int main() {    
    int n;
    cin >> n;
    
    for (int i = 1; i <= n; i++) {
        int x;
        cin >> x;
        fr[x]++;
    }
    
    int ok = 1;
    for (int i = 1; i <= 1000; i++) {
        if (fr[i] == 0) {
            continue;
        }
        if (fr[i] <= i && fr[i] % 2 == i % 2);
        else {
            ok = 0;
        }
    }
    
    if (ok == 1) {
        cout << "DA";
    }
    else {
        cout << "NU";
    }
    return 0;
}
```
