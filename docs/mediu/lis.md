---
id: lis
authors: [stefdasca]
prerequisites:
    - intro-dp
    - binary-search
    - segment-trees
tags:
    - programare dinamica
    - structuri de date
    - optimizari
    - subsiruri
---

În cele ce urmează, vom prezenta problema aflării celui mai lung subșir
crescător dintr-un șir, prezentând o serie de algoritmi care rezolvă această
problemă, începând de la cei mai înceți și terminând cu variantele optime,
precum și diversele modificări pe care le putem face.

## Introducere

Se consideră un subșir crescător al vectorului $v$ un subșir $p_1, p_2, \dots,
p_k$ cu proprietățile că $1 \leq p_1 < p_2 < \dots < p_k \leq n$, iar $v[p_1] <
v[p_2] < \dots < v[p_k]$.

Un subșir crescător maximal al unui șir este un subșir crescător al lui $v$ cu
proprietatea că lungimea acestuia este maximă.

De exemplu, dacă $v = \{7, 3, 5, 3, 6, 2, 9, 8 \}$, unul dintre subșirurile
crescătoare de lungime maximă al acestui șir este $\{ 3, 5, 6, 9 \}$, lungimea
acestuia fiind 4.

## Cum aflăm subșirul crescător maximal?

O primă soluție constă în folosirea unei metode de tip Backtracking pentru a
testa toate subșirurile, dar aceasta este mult prea înceată, nu are sens să o
discutăm aici. Totuși, există câteva soluții care sunt bazate pe algoritmi de
tip Greedy și bazate pe metoda programării dinamice care ne duc la răspuns, în
diverse complexități de timp. În cele ce urmează, le vom prezenta, una câte una.

## Dinamica în O(n^2)

O soluție foarte cunoscută a acestei probleme constă în folosirea unei dinamici,
în care $dp[i]$ va ține lungimea subșirului crescător maximal care conține
poziția $i$. Tranzițiile vor fi foarte simple, fiecare poziție este comparată cu
fiecare, complexitatea soluției ajungând la $\mathcal{O}(n^2).

$$ dp[i] = \max_{\substack{j < i\\v[j] < v[i]}} \left(dp[j] + 1\right) $$

Evident, dacă nu există o poziție $j < i$ care respectă condiția de mai sus,
$dp[i] = 1$.

Implementarea acestei soluții nu este foarte complicată, mai jos găsiți soluția
propusă de noi pentru problema [SCLM](https://www.pbinfo.ro/probleme/396/sclm)
de pe pbinfo.

```cpp
#include <fstream>
#include <vector>
using namespace std;

int main() {
    ifstream cin("sclm.in");
    ofstream cout("sclm.out");

    int n;
    cin >> n;

    vector<int> v(n + 1), dp(n + 1), fw(n + 1);
    for (int i = 1; i <= n; i++) {
        cin >> v[i];
    }

    int maxi = 0;
    int pos = 0;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j < i; j++) {
            if (v[j] < v[i] && dp[j] > dp[i]) {
                dp[i] = dp[j];
                fw[i] = j;
            }
        }
        dp[i]++;
        if (dp[i] > maxi) {
            maxi = dp[i];
            pos = i;
        }
    }

    // vom reconstitui raspunsul din aproape in aproape
    cout << maxi << '\n';
    vector<int> ans;
    while (pos) {
        ans.push_back(pos);
        pos = fw[pos];
    }
    for (int i = maxi - 1; i >= 0; i--) {
        cout << ans[i] << " ";
    }
    return 0;
}
```

## Soluție în $\mathcal{O}(n \log n)$ cu căutare binară

Pentru a rezolva această problemă în timp optim, trebuie să observăm că foarte
mulți candidați pe care îi ținem la soluția anterioară nu își au rostul, fiind
îndeajuns să știm doar candidatul cu cea mai mică valoare pentru fiecare valoare
distinctă pe care o poate lua $dp[i]$.

Deoarece pe măsură ce creștem valorile lui $dp[i]$, candidații pe care îi
păstrăm au valori tot mai mari, putem îmbunătăți această soluție păstrând doar
candidații și căutând binar valoarea minimă din șirul candidaților care
depășește valoarea curentă. Mai jos găsiți soluția problemei [Increasing
Subsequence](https://cses.fi/problemset/task/1145/) de pe CSES.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;

    vector<int> v(n + 1), dp(n + 1);
    for (int i = 1; i <= n; i++) {
        cin >> v[i];
    }

    vector<int> candidates;
    int maxi = 0;
    for (int i = 1; i <= n; i++) {
        if (i == 1 || v[i] > v[candidates.back()]) {
            candidates.push_back(i);
            dp[i] = candidates.size();
        } else {
            int L = 0;
            int R = (int)candidates.size() - 1;
            int ans = -1;
            while (L <= R) {
                int mid = (L + R) / 2;
                if (v[candidates[mid]] >= v[i]) {
                    ans = mid;
                    R = mid - 1;
                } else {
                    L = mid + 1;
                }
            }
            // ans ne da si pozitia in cazul in care avem nevoie de
            // reconstruirea solutiei
            dp[i] = ans + 1;
            candidates[ans] = i;
        }
        maxi = max(maxi, dp[i]);
    }

    cout << maxi << '\n';
    return 0;
}
```

## Soluție în $\mathcal{O}(n \log n)$ cu structuri de date

Pentru soluțiile în $\mathcal{O}(n \log n)$ care folosesc structuri de date, mai întâi vom
vrea să avem o copie a vectorului inițial, pe care să o sortăm. Recomandăm mai
întâi familiarizarea cu arborii de intervale sau arborii indexați binar pentru a
continua, precum și normalizarea dacă nu ați mai folosit această tehnică
anterior.

Acest lucru ne garantează normalizarea vectorului, lucru pe care îl vom folosi
pentru a putea avea queryuri de tip maxim pe un interval pe parcursul
implementării voastre.

După ce am făcut acest pas, tot ce trebuie să facem este să căutăm binar pentru
fiecare valoare din șir, în ordinea în care apar, care ar fi poziția în vectorul
sortat, facem query-urile de maxim pe interval și actualizăm poziția găsită
anterior în timpul căutării binare. Mai jos găsiți cele două variante folosind
cele două structuri de date, soluțiile fiind pentru aceeași problemă de pe CSES.

### Soluție cu arbori de intervale

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

void add(int node, int L, int R, int poz, int val, vector<int> &segtree) {
    if (L == R) {
        segtree[node] = max(segtree[node], val);
        return;
    }

    int mid = (L + R) / 2;
    if (poz <= mid) {
        add(node * 2, L, mid, poz, val, segtree);
    } else {
        add(node * 2 + 1, mid + 1, R, poz, val, segtree);
    }
    segtree[node] = max(segtree[node * 2], segtree[node * 2 + 1]);
}

int query(int node, int L, int R, int qL, int qR, vector<int> &segtree) {
    if (qL <= L && R <= qR) {
        return segtree[node];
    }

    if (qR < L || qL > R) {
        return 0;
    }

    int mid = (L + R) / 2;
    return max(query(node * 2, L, mid, qL, qR, segtree),
               query(node * 2 + 1, mid + 1, R, qL, qR, segtree));
}

int main() {
    int n;
    cin >> n;

    vector<int> v(n + 1), sorted(n + 1), segtree(4 * n + 1);
    for (int i = 1; i <= n; i++) {
        cin >> v[i];
        sorted[i] = v[i];
    }
    sort(sorted.begin() + 1, sorted.begin() + n + 1);

    int maxi = 0;
    for (int i = 1; i <= n; i++) {
        int L = 1;
        int R = n;
        int ans = 0;
        while (L <= R) {
            int mid = (L + R) / 2;
            if (sorted[mid] < v[i]) {
                ans = mid;
                L = mid + 1;
            } else {
                R = mid - 1;
            }
        }

        int query_ans = query(1, 1, n, 1, ans, segtree) + 1;
        maxi = max(maxi, query_ans);
        add(1, 1, n, ans + 1, query_ans, segtree);
    }

    cout << maxi << '\n';
    return 0;
}
```

### Soluție cu arbori indexați binar

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

void add(int node, int n, int val, vector<int> &fen) {
    for (; node <= n; node += (node & (-node))) {
        fen[node] = max(fen[node], val);
    }
}

int compute(int node, vector<int> &fen) {
    int ans = 0;
    for (; node; node -= (node & (-node))) {
        ans = max(ans, fen[node]);
    }
    return ans;
}

int main() {
    int n;
    cin >> n;

    vector<int> v(n + 1), sorted(n + 1), fen(n + 1);
    for (int i = 1; i <= n; i++) {
        cin >> v[i];
        sorted[i] = v[i];
    }
    sort(sorted.begin() + 1, sorted.begin() + n + 1);

    int maxi = 0;
    for (int i = 1; i <= n; i++) {
        int L = 1;
        int R = n;
        int ans = 0;
        while (L <= R) {
            int mid = (L + R) / 2;
            if (sorted[mid] < v[i]) {
                ans = mid;
                L = mid + 1;
            } else {
                R = mid - 1;
            }
        }

        int query_ans = compute(ans, fen) + 1;
        maxi = max(maxi, query_ans);
        add(ans + 1, n, query_ans, fen);
    }

    cout << maxi << '\n';
    return 0;
}
```

## Concluzii și alte moduri în care putem folosi această abordare

Probleme similare cu cea descrisă mai sus sunt unele precum numărul de subșiruri
crescătoare maximale, lungimea unui subșir crescător maximal în care putem avea
elemente egale sau pentru doritorii unei provocări mai avansate, numărul minim
de subșiruri descrescătoare necesare pentru a acoperi o secvență dată.

Deși toate aceste soluții au utilitatea lor, pe parcurs, veți observa că
soluțiile ce implică structuri de date au o mai mare plajă în ceea ce privește
modificările care pot fi făcute și timpul de implementare al acestora.

## Probleme suplimentare

- [CopyCopyCopyCopyCopy
  Codeforces](https://codeforces.com/problemset/problem/1325/B)
- [scmax infoarena](https://infoarena.ro/problema/scmax)
- [subsiruri infoarena](https://infoarena.ro/problema/subsiruri)
- [LIS On Permutations -
  Codeforces](https://codeforces.com/gym/102951/problem/C)
- [IIOT 2018 UpDown](https://kilonova.ro/problems/2896/)
- [Codeforces Tourist](https://codeforces.com/contest/76/problem/F)
- [interclasare infoarena](https://infoarena.ro/problema/interclasare)
- [USACO Gold Cowjog](http://www.usaco.org/index.php?page=viewproblem2&cpid=496)
- [Pokemoni - Lot 2024 Juniori](https://kilonova.ro/problems/2808?list_id=1104)

## Lectură suplimentară

- [Articolul de pe
  wikipedia](https://en.wikipedia.org/wiki/Longest_increasing_subsequence)
- [Articolul de pe
  pbinfo](https://www.pbinfo.ro/articole/20677/subsir-crescator-de-lungime-maxima)
- [Articolul de pe
  cp-algorithms](https://cp-algorithms.com/sequences/longest_increasing_subsequence.html)
- [Articolul de pe USACO Guide](https://usaco.guide/gold/lis?lang=cpp)
