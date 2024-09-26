---
tags:
    - programare dinamica
    - cifre
---

**Autor**: Ștefan-Cosmin Dăscălescu

În acest articol vom prezenta modul în care aplicăm tehnica programării dinamice atunci când vine vorba de a număra câte numere au o anumită proprietate într-un interval, sau care este al $k$-lea număr cu o proprietate anume, această tehnică fiind găsită și sub numele de dinamică pe cifre sau digit dp. 

Deși în cazul unora dintre problemele pe care le vom prezenta există soluții folosind diverse formule matematice sau combinatoriale, ne vom concentra pe modul general de implementare a acestor probleme, mod care va fi similar în cazul majorității acestor probleme.

În cele ce urmează, vom prezenta câteva probleme care se rezolvă cu această tehnică, menționând aspecte de implementare și tehnici pentru rezolvarea problemelor. Spre deosebire de alte variații ale programării dinamice, problemele ce implică digit dp vor avea aproape mereu același mod de a fi abordate. 

## [Counting Numbers - CSES](https://cses.fi/problemset/task/2220)

Pentru a afla câte numere din intervalul $[a, b]$ respectă proprietatea că oricare două cifre adiacente sunt diferite, vom introduce mai întâi o proprietate foarte importantă:

!!! note "Observație"
    În majoritatea problemelor cu digit dp, pentru a afla răspunsul în intervalul $[a, b]$, vom scădea din răspunsul pentru intervalul $[1, b]$, răspunsul pentru intervalul $[1, a-1]$, într-o manieră similară cu cea de la sumele parțiale.

În cazul acestei probleme, vom defini $dp[i][j]$ drept numărul de numere cu $i$ cifre care au ultima cifră $j$. În mod evident, din $dp[i][j]$ vom avea tranzițiile spre $dp[i+1][x]$, cu proprietatea că $j \neq x$.

Pentru a implementa această soluție, avem două variante principale pentru a o implementa:

### Prima variantă - Calcularea separat pentru numerele cu mai puține cifre și numerele cu același număr de cifre

Așa cum este sugerat și în titlu, vom afla cifrele numărului, iar mai apoi vom avea de făcut doi pași: 

* Mai întâi, vom inițializa stările pentru prima cifră și vom extinde calculele pentru numerele cu cel mult $x-1$ cifre, unde $x$ este numărul de cifre al numărului dat.
* Apoi, vom fixa cifra care va reprezenta departajarea dintre numere și vom calcula pentru fiecare interval generat separat. De exemplu, dacă $n = 90124$, aceste intervale ar fi $[10000, 89999]$, $[90000, 90099]$, $[90100, 90119]$, $[90120, 90123]$, $[90124, 90124]$. Cu alte cuvinte, fiecare cifră nenulă va crea un nou interval, iar la final, vom calcula răspunsul și pentru numărul dat. 

Aici puteți găsi implementarea, care acoperă ambele părți ale algoritmului descris. 

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
 
using namespace std;
 
long long solve (long long n) {
    if(n <= 9) {
        return n+1;
    }
    
    vector<int> d; // cifrele lui n
    long long n2 = n;
    while(n2) {
        d.push_back(n2%10);
        n2 /= 10;
    }   
    reverse(d.begin(), d.end());
    
    long long ans = 1;
    
    vector<vector<long long> > dp(20, vector<long long> (10));
 
    // lucram cu numerele cu mai putine cifre ca n
    
    for (int i = 1; i <= 9; ++i) {
        dp[1][i] = 1;
    }
    
    for (int pos = 2; pos < (int) d.size(); ++pos) {
        for (int digit = 0; digit <= 9; ++digit) {
            for (int nxt = 0; nxt <= 9; ++nxt) {
                if (digit == nxt) {
                    continue;
                }
                dp[pos][nxt] += dp[pos-1][digit];
            }
        }
    }
    
    for (int pos = 1; pos < (int) d.size(); ++pos) {
        for (int digit = 0; digit <= 9; ++digit) {
            ans += dp[pos][digit];
        }
    }
    
    for (int i = 0; i < 20; i++) {
        for (int j = 0; j < 10; j++) {
            dp[i][j] = 0;
        }
    }
    
    // fixam prefixul pentru numerele cu acelasi numar de cifre ca n
        
    bool ok = 1; 
    
    for (int prf = 0; prf < (int) d.size(); ++prf) {
        // daca proprietatea nu mai este respectata, oprim algoritmul
        if (prf >= 2 && d[prf-1] == d[prf-2]) {
            ok = 0;
            break;
        }
        
        if(prf == 0) {
            for (int dg = 1; dg < d[prf]; ++dg) {
                dp[prf+1][dg] = 1;
            }
        }
        else {
            for (int dg = 0; dg < d[prf]; ++dg) {
                if (dg != d[prf-1]) {
                    dp[prf+1][dg] = 1;
                }
            }
        }
        
        for (int pos = 2; pos <= (int) d.size(); ++pos) {
            for (int digit = 0; digit < 10; ++digit) {
                for (int nxt = 0; nxt < 10; ++nxt) {
                    if (digit == nxt) {
                        continue;
                    }
                    dp[pos][nxt] += dp[pos-1][digit];
                }
            }
        }
        
        for (int digit = 0; digit <= 9; ++digit) {
            ans += dp[d.size()][digit];
        }
        
        for (int i = 0; i < 20; i++) {
            for (int j = 0; j < 10; j++) {
                dp[i][j] = 0;
            }
        }
    }
    
    // verificam proprietatea pentru n
    if (d[(int) d.size() - 2] == d[(int) d.size() - 1]) {
        ok = 0;
    }
    
    return ans + ok;
}
 
int main() {
    
    long long a, b;
    cin >> a >> b;
    
    cout << solve(b) - solve(a-1) << '\n'; // [a, b] = [0, b] - [0, a-1]
    
    return 0;
}
```

### A doua variantă - Folosirea unei dimensiuni în plus pentru a simplifica calculele

Vom introduce o a treia dimensiune, care va ține pentru prefixul de până acum informații cu privire la diferența față de numărul de până acum (mai mare, egal sau mai mic). Se poate observa că implementarea va fi mult mai simplă, așa cum veți putea vedea mai jos.

Acum, dinamica noastră va fi de forma $dp[i][j][x]$, unde $x$ va fi egal cu $0$, $1$ sau $2$ în funcție de prefixul de până acum și prefixul lui $n$. La final, vom aduna stările corespunzătoare numerelor cu mai puține cifre și cele cu același număr de cifre, dar cu prefix mai mic sau egal. 

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
 
using namespace std;
 
// comparam cifrele pentru a vedea starea pe care o actualizam
int cmp(int a, int b) {
    if (a < b) {
        return 0;
    }
    if (a > b) {
        return 1;
    }
    return 2;
}
    
long long solve (long long n) {
    if(n <= 9) {
        return n+1;
    }
    
    vector<int> d; // cifrele lui n
    long long n2 = n;
    while(n2) {
        d.push_back(n2%10);
        n2 /= 10;
    }   
    reverse(d.begin(), d.end());
    
    long long ans = 1;
    
    vector<vector<vector<long long> > > dp(20, vector<vector<long long> >(10, vector<long long> (3)));
    
    for (int i = 1; i < 10; i++) {
        dp[1][i][cmp(i, d[0])] = 1;
    }
    
    for (int i = 1; i < (int) d.size(); i++) {
        for (int curr = 0; curr < 10; curr++) {
            for (int state = 0; state < 3; state++) {
                for (int nxt = 0; nxt < 10; nxt++) {
                    if (curr == nxt) {
                        continue;
                    }
                    if (state == 2) {
                        dp[i+1][nxt][cmp(nxt, d[i])] += dp[i][curr][state];
                    }
                    else {
                        dp[i+1][nxt][state] += dp[i][curr][state];
                    }
                }
            }
        }
    }
    
    for (int i = 1; i <= (int) d.size(); i++) {
        for (int curr = 0; curr < 10; curr++) {
            for (int state = 0; state < 3; state++) {
                if (i < (int) d.size() || state != 1) {
                    ans = ans + dp[i][curr][state];
                }
            }
        }
    }
    
    return ans;
}
 
int main() {
    
    long long a, b;
    cin >> a >> b;
    
    cout << solve(b) - solve(a-1) << '\n'; // [a, b] = [0, b] - [0, a-1]
    
    return 0;
}
```

## Probleme de tipul al $k$-lea număr cu o proprietate dată

Pentru a rezolva acest tip de probleme, de cele mai multe ori vom căuta binar răspunsul, calculând la fiecare pas numărul de asemenea numere din intervalul $[1, x]$ cu proprietatea din enunț. Un astfel de exemplu îl putem regăsi în problema [Bug Lot Juniori 2024](https://kilonova.ro/problems/2800), problemă care după unele simplificări ajunge la o căutare binară pe stilul celei menționate, [aici](https://kilonova.ro/pastes/jj5QOb1vZnBU) puteți găsi o sursă pe această idee.  

## Probleme suplimentare

* [CSES Counting Numbers](https://cses.fi/problemset/task/2220/)
* [Bug Lot Juniori 2024](https://kilonova.ro/problems/2800)
* [AtCoder Digit Sum](https://atcoder.jp/contests/dp/tasks/dp_s)
* [Perfect Number](https://codeforces.com/contest/919/problem/B)
* [USACO Silver Odometer](https://usaco.org/index.php?page=viewproblem2&cpid=435)
* [SPOJ Digit Sum](https://www.spoj.com/problems/PR003004/)
* [Codeforces Segment Sum](https://codeforces.com/contest/1073/problem/E)
* [Infoarena simpla](https://www.infoarena.ro/problema/simpla)
* [Infoarena peluzanord](https://www.infoarena.ro/problema/peluzanord)
* [ONI 2012 Baraj Juniori cifreco](https://kilonova.ro/problems/1072/)
* [Codeforces Magic Numbers](https://codeforces.com/contest/628/problem/D)
* [Probleme cu digit dp de pe kilonova](https://kilonova.ro/tags/310)

## Lectură suplimentară 

* [Introduction to Digit Dynamic Programming - Youtube](https://www.youtube.com/watch?v=heUFId6Qd1A)
* [Digit DP - USACO Guide](https://usaco.guide/gold/digit-dp?lang=cpp)
* [Digit DP - Codeforces (+ probleme)](https://codeforces.com/blog/entry/53960)
