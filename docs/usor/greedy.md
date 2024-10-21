---
tags:
    - sortare
    - greedy
---

**Autor**: Ștefan-Cosmin Dăscălescu

De multe ori atunci când trebuie să rezolvăm probleme algoritmice (și nu numai), suntem nevoiți să gândim lacom, alegând cea mai bună variantă la un moment dat. În algoritmică, această abordare este numită metoda Greedy și este una din cele mai importante metode pentru rezolvarea problemelor, fiind întâlnită atât în probleme foarte simple, cât și în unele din cele mai complicate probleme posibile. 

Chiar dacă conform manualelor de informatică din țara noastră, metoda Greedy este ceva ce se predă abia în clasele mai mari de liceu (mai exact, în clasa a XI-a), o să vedeți că probleme de acest fel apar încă de la începutul studiului algoritmicii.

Voi începe cu un exemplu de o asemenea problemă, pentru a vă familiariza cu stilul pe care îl vor avea problemele de acest fel.

!!! example "Exemplu"   
    Ștefan merge la magazin și are un buget de $L$ lei. La magazinul unde își face cumpărăturile, se găsesc $n$ produse alimentare, fiecare dintre ele având un preț cunoscut. Deoarece este foarte generos, astăzi el vrea să poată oferi câte un produs alimentar unui număr cât mai mare de persoane în limita bugetului său inițial. Care este numărul maxim de produse pe care Ștefan îl poate cumpăra?

    Pentru a rezolva această problemă, vom vrea să alegem cele mai ieftine produse (cele cu prețul cel mai mic), acest lucru se poate fie aflând la fiecare pas valoarea minimă din șir, scazând-o din buget până când nu mai putem alege obiecte, fie ordonând obiectele crescător după preț, iar mai apoi scăzând produsele cu cel mai mic preț până când nu mai este posibil. 

O primă concluzie pe care o putem trage este aceea că în cazul multor probleme ce folosesc această metodă, vom avea nevoie să ordonăm valorile după un anumit criteriu, iar la fiecare pas, vom alege optimul local (fie că e vorba de maxim, minim sau alt criteriu pe care îl decidem). 

În cele ce urmează, voi prezenta câteva probleme mai simple și cunoscute pentru a prezenta diverse abordări.

## Problema [prodmax1](https://www.pbinfo.ro/probleme/2271/prodmax1) de pe pbinfo

Pentru a avea un produs cât mai mare, este logic că vrem să avem valori cât mai mari pe care să le înmulțim. Oare este totuși suficient să ne uităm doar la cele mai mari două valori?

Deoarece înmulțirea a două valori negative duce și ea la un produs pozitiv, nu este suficient, deci trebuie să verificăm și cele mai mici două valori pentru a acoperi toate cazurile ce pot apărea. Mai jos puteți găsi soluția problemei. 

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    int n;
    cin >> n;
    
    vector<int> v(n+1);
    for (int i = 1; i <= n; i++) {
        cin >> v[i];
    }
    
    sort(v.begin() + 1, v.begin() + n + 1);
    cout << max(1LL * v[n-1] * v[n], 1LL * v[1] * v[2]) << '\n';
    return 0;
}
```

## Problema [Movie Festival - Problema spectacolelor](https://cses.fi/problemset/task/1629) de pe cses

Pentru a afla numărul maxim de filme pe care le putem urmări, trebuie să ne gândim la o strategie prin care să ordonăm filmele după un anumit criteriu, iar mai apoi să alegem filmele conform ordinii alese. 

Unele din strategiile care ar putea fi folosite pentru această problemă sunt ordonarea filmelor după momentul de start, ordonarea după lungimea lor și ordonarea după momentul de final.

Prima strategie este greșită deoarece dacă avem un film foarte lung la început, ne-ar putea acoperi mai multe filme mai scurte care încep un pic mai târziu. 

Strategia de a sorta după lungimea filmelor va da răspunsuri greșite când avem filme scurte care acoperă două filme mai lungi care nu se intersectează.

În schimb, ordonarea filmelor după timpul final al acestora este optimă deoarece vom avea mereu un număr maxim de oportunități din care alegem. 

!!! note "Observație"
    Pentru mai multe explicații și desene, puteți accesa articolul de pe [usaco.guide](https://usaco.guide/silver/greedy-sorting?lang=cpp#example---the-scheduling-problem) care prezintă această problemă.

Soluția va consta în sortarea intervalelor după timpul final, iar la fiecare pas vom alege primul film care are un timp inițial mai mare decât timpul de final precedent.

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    
    int n;
    cin >> n;
    
    vector<pair<int, int> > events(n+1);
    for (int i = 1; i <= n; ++i) {
        cin >> events[i].second >> events[i].first;
    }
        
    sort(events.begin() + 1, events.begin() + n + 1);
    
    int ans = 0;
    int lst = 0;
    for (int i = 1; i <= n; ++i) {
        if (events[i].second >= lst) {
            ++ans, lst = events[i].first;
        }
    }
 
    cout << ans;
    return 0;
}
```

## Problema [moscraciun2](https://www.pbinfo.ro/probleme/4010/moscraciun2) de pe pbinfo

Pentru a rezolva această problemă, ne folosim de faptul că costurile sunt mici, iar mai apoi parcurgem cadourile în ordine crescătoare a costurilor, luând cadourile cu costul cel mai mic, optimizând la fiecare pas această parte a răspunsului, fiind lacomi în privința alegerii cadourilor cu prețul cel mai mic.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    
    vector<int> fr(101);
    for (int i = 1; i <= m; i++) {
        int pr, cnt;
        cin >> pr >> cnt;
        fr[pr] += cnt;
    }
    
    int ans = 0;
    for (int i = 0; i <= 100; i++) {
        ans += min(n, fr[i]) * i;
        n -= min(n, fr[i]);
    }
    
    if (n > 0) {
        cout << "imposibil" << '\n';
    }
    else {
       cout << ans << '\n';
    }
    return 0;
}
```

## Concluzii preliminare

În articolul pe care tocmai l-ați citit, am prezentat câteva dintre cele mai cunoscute probleme și strategii ce folosesc metoda Greedy. Plecând de la aceste exemple care sunt mai simple, am explicat diverse strategii pentru a aborda problemele care folosesc această metodă. 

În articolele viitoare, vom explica principii mai avansate, precum [Exchange Argument](https://www.cs.cornell.edu/courses/cs482/2007su/exchange.pdf), [Simulated Annealing](https://en.wikipedia.org/wiki/Simulated_annealing), precum și diverse tehnici folosite în algoritmii euristici și randomizați ce folosesc strategii Greedy.

## Probleme suplimentare

- [USACO Bronze Watching Mooloo](http://www.usaco.org/index.php?page=viewproblem2&cpid=1301)
- [USACO Bronze Cow Tipping](http://www.usaco.org/index.php?page=viewproblem2&cpid=689)
- [pbinfo kmax](https://www.pbinfo.ro/probleme/1877/kmax)
- [pbinfo eureni](https://www.pbinfo.ro/probleme/1004/eureni)
- [Probleme cu greedy de pe pbinfo](https://www.pbinfo.ro/probleme/categorii/24/metoda-greedy-probleme-diverse-cu-metoda-greedy)
- [USACO Bronze Out of Place](http://www.usaco.org/index.php?page=viewproblem2&cpid=785)
- [Leetcode Minimum Cost to Move Chips to The Same Position](https://leetcode.com/problems/minimum-cost-to-move-chips-to-the-same-position/description/)
- [OJI 2012 Arme](https://kilonova.ro/problems/823)
- [OJI 2024 Santinele](https://kilonova.ro/problems/2502)
- [ONI 2024 Soldati](https://kilonova.ro/problems/2659)
- [CSES Tasks and Deadlines](https://cses.fi/problemset/task/1630)
- [USACO Gold High Card Low Card](http://www.usaco.org/index.php?page=viewproblem2&cpid=573)
- [RoAlgo Contest #10 Paranteze](https://kilonova.ro/problems/2961)
- [USACO Silver Berry Picking](http://www.usaco.org/index.php?page=viewproblem2&cpid=990)
- [Codeforces Ciel and Duel](https://codeforces.com/contest/321/problem/B)
- [Probleme cu greedy pe Kilonova](https://kilonova.ro/tags/299)
- [Probleme cu greedy pe Infoarena](https://infoarena.ro/cauta-probleme?tag_id[]=61)


## Lectură suplimentară 

- [Metoda greedy - pbinfo](https://www.pbinfo.ro/articole/16619/metoda-greedy)
- [Greedy Algorithms - Wikipedia](https://en.wikipedia.org/wiki/Greedy_algorithm)
- [Metoda Greedy si problema fractionara a rucsacului](https://infoarena.ro/metoda-greedy-si-problema-fractionara-a-rucsacului)
- [Introduction to Greedy Algorithms - USACO Guide](https://usaco.guide/bronze/intro-greedy?lang=cpp)
- [Greedy Algorithms with Sorting - USACO Guide](https://usaco.guide/silver/greedy-sorting?lang=cpp)
