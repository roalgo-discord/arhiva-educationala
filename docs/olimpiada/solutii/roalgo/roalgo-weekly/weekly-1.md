---
id: roalgo-weekly-1
title: Descrierea soluțiilor RoAlgo Weekly Contest 1
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
[RoAlgo Weekly Contest #1](https://kilonova.ro/contests/1481/). Acest concurs nu
ar fi putut avea loc fără sprijinul vostru și fără ajutorul testerilor
concursului, care sunt prezenți în lista de editori a concursului de pe Kilonova.

Această serie de concursuri va continua în fiecare săptămână, scopul fiind acela
de a deveni un concurs similar în popularitate cu rundele de pe LeetCode și nu
numai.

## Problema [inmultire](https://kilonova.ro/problems/3643)

Pentru a rezolva această problemă, trebuie să verificăm pentru fiecare număr
dacă este cuprins între $1$ și $9$.

### Rezolvare

Mai jos puteți găsi o soluție care ia punctajul maxim.

```cpp
#include <iostream>
using namespace std;
 
int main(){
    int A, B;
    cin >> A >> B;
    if(A >= 1 && A <= 9 && B >= 1 && B <= 9)
        cout << A * B;
    else
        cout << -1;
    return 0;
}
```

## Problema [roboti](https://kilonova.ro/problems/3644)

Mai întâi, vom afla valoarea maximă din șir, precum și indicii pe care aceasta
se află, lucru ce poate fi făcut în multe moduri.

Apoi, ce rămâne de făcut este să verificăm printre pozițiile cu vulnerabilități
dacă vreouna dintre ele apare în șir sau nu.

### Rezolvare

Mai jos puteți găsi o soluție care ia punctajul maxim.

```cpp
#include <iostream>

using namespace std;

const int NMAX = 101;

int n, k, v[101]; /// v este sirul care contine robotii cu abilitatea maxima
int ap[101]; /// v[0] = lungimea sirului v ap[i] = 1 <=> robotul are abilitate maxima

int main() {
    cin >> n >> k;
    for(int i = 1, maxi = 0, x; i <= n; ++i) {
        cin >> x;
        if(x > maxi) {
            v[0] = 1, v[1] = i;
            maxi = x;
        }
        else if(x == maxi) {
            v[++v[0]] = i;
        }
    }
    for(int i = 1; i <= v[0]; ++i) {
        ap[v[i]] = 1;
    }
    for(int i = 1, x; i <= k; ++i) {
        cin >> x;
        if (ap[x]) {
            cout << "Da";
            return 0;
        }
    }
    cout << "Nu";
    return 0;
}
```

## Problema [simetrie](https://kilonova.ro/problems/3645)

Pentru a rezolva această problemă, este îndeajuns să generăm matricea conform
regulii din enunț, cu liniile impare de sus în jos, iar cu liniile pare de jos în sus.

### Rezolvare

Mai jos puteți găsi o soluție care ia punctajul maxim.

```cpp
#include <iostream>
using namespace std;
int v[105], a[105][105];
int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        cin >> v[i];
    }
    for (int i = 1; i <= n; i += 2) {
        for (int j = 1; j <= n; j++) {
            a[i][j] = v[j];
        }
    }
    for (int i = 2; i <= n; i += 2) {
        for (int j = 1; j <= n; j++) {
            a[i][j] = v[n - j + 1];
        }
    }
    for (int j = 1; j <= n; j++) {
        for (int i = 1; i <= n; i++) {
            cout << a[i][j] << ' ';
        }
        cout << '\n';
    }
    return 0;
}
```

## Problema [alternant](https://kilonova.ro/problems/3646)

Pentru a rezolva această problemă, trebuie să avem grijă să parcurgem cifrele
numărului astfel încât să putem ține mereu fie cifra anterioară, fie cifra
următoare, iar mai apoi să verificăm dacă paritatea rămâne diferită.

Vom păstra și o variabilă de tip OK, care să ne spună dacă condiția s-a păstrat
pe tot parcursul numărului.

### Rezolvare

Mai jos puteți găsi o soluție care ia punctajul maxim.

```cpp
#include <iostream>
using namespace std;

int main()
{
    long long n, OK = 1;
    cin >> n;

    while(n > 9){
        if(n % 2 == n / 10 % 2) {
            OK = 0;
        }  
        n = n / 10;
    }

    if(OK == 1)
        cout << "da";
    else
        cout << "nu";

    return 0;
}
```
