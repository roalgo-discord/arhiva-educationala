---
tags:
    - structuri de date
    - optimizari
    - precalculari
---

**Autor**: Ștefan-Cosmin Dăscălescu

În multe probleme de algoritmică, suntem nevoiți să împărțim datele în grupe mai mici pentru a ajunge să obținem soluții optime sau cel puțin suficient de rapide pentru a obține un punctaj foarte bun, chiar maxim în anumite situații. De cele mai multe ori, vom împărți datele în bucăți cu o lungime aproximativ egală cu $\sqrt n$, de unde vine și numele pentru care această tehnică este cunoscută în jargonul internațional, **Square Root Decomposition**. 

În acest articol, vom prezenta câteva dintre cele mai cunoscute tipuri de descompuneri și grupări existente care folosesc această tehnică, fie că e vorba de gruparea elementelor din vector, gruparea query-urilor sau chiar abordări diferite în funcție de dimensiunea datelor, toate aceste tehnici au un numitor comun, și anume prezența valorii $\sqrt n$ drept un etalon de separare a datelor. 

## Împărțirea datelor în bucăți de radical

Numit în jargonul românesc și sub numele de Șmenul lui Batog, această tehnică constă în prelucrarea unui șir de valori prin împărțirea acestuia în bucăți care acoperă tot șirul, iar lungimea maximă a fiecărei bucăți este în jur de $\sqrt n$. Pentru a afla numărul de ordine al grupei unde se află o valoare, vom putea folosi formula $\frac{i}{bk}$, unde $i$ este poziția curentă, iar $bk$ este dimensiunea unei grupe (a unui bucket), de regulă aceasta fiind aproximativ $\sqrt n$. 

În cele mai multe cazuri, query-urile pe care le putem rezolva folosind această metodă sunt query-uri relativ simple, precum cele de sumă sau maxim, query-uri care se pot procesa și folosind alte structuri de date, precum [arborii de intervale](./segment-trees.md) sau [arborii indexați binar](./fenwick-tree.md). Totuși, în unele situații, se recomandă abordări de tipul square root decomposition, deoarece implementările se vor dovedi mai scurte și mai simplu de abordat, în special în cazul unor limite de timp mai puțin stricte și/sau a unor restricții mai mici.

!!! note "Observație"
    Vom presupune în cele ce urmează că indexarea valorilor se face de la $0$. 

De regulă, vom vrea să ținem memorate informații pentru fiecare grupă, iar atunci când actualizăm o valoare, operația va fi efectuată în timp constant, deoarece schimbăm informațiile dintr-o singură grupă. În ceea ce privește interogările, complexitatea acestora este $O(\sqrt n)$ deoarece dacă avem un interval de forma $[L, R]$, noi vom calcula răspunsul folosind trei pași, aceștia fiind următorii:

* Intervalul $[L, x]$, unde $x$ este capătul dreapta al grupării în care se află $L$: se poate calcula răspunsul brut, prin procesarea fiecărei valori din grupă. 
* Intervalul $[x+1, y]$, unde $y$ este capătul din dreapta al ultimei grupe care se află în întregime în intervalul din query. Pentru aceste grupe, se procesează răspunsul total corespunzător acestui interval și se consideră în contextul răspunsului final. 
* Intervalul $[y+1, R]$, unde $y+1$ este capătul stânga al grupării în care se află $R$: se poate calcula răspunsul brut, prin procesarea fiecărei valori din grupă.

!!! note "Observație"
    În mod particular, dacă $L$ și $R$ se află în aceeași grupă, vom putea afla brut răspunsul cerut, considerând pe rând fiecare valoare din interval. 

!!! example "Exemplu"
    De exemplu, dacă dimensiunea unei grupări este $5$, iar intervalul $[L, R]$ este $[7, 21]$, răspunsul se va afla în modul următor:

    * Intervalul $[7, 9]$: Fiind o grupare care nu se află în întregime în interogarea dată, vom procesa valorile într-o manieră brută. 
    * Intervalele $[10, 14]$ și $[15, 19]$: Deoarece aceste intervale se află în întregime în interogarea dată, le vom procesa folosind precalcularea făcută anterior pentru grupările întregi. 
    * Intervalul $[20, 21]$: Fiind o grupare care nu se află în întregime în interogarea dată, vom procesa valorile într-o manieră brută. 

## Când folosim aceste tehnici?

De multe ori, pentru a găsi abordarea optimă pentru asemenea probleme, trebuie să avem în vedere faptul că dacă avem restricții mai mici (de regulă, când $n \approx 10^5$), o abordare de acest tip poate fi foarte eficientă datorită flexibilității pe care o avem, precum și a faptului că putem să variem punctul limită în funcție de eficiența celor două abordări.

Cu alte cuvinte, dacă avem o abordare care rulează în $O(a \cdot x)$ și alta care rulează în $O(b \cdot \frac{n}{x})$, unde $a$ și $b$ sunt constante, punctul de cotitură între cele două abordări este acela în care cele două ecuații au valori egale, din acest motiv nefiind mereu optim să abordăm diferit începând de la $O(\sqrt n)$, deoarece uneori această schimbare trebuie produsă mai devreme sau mai târziu.

### Problema [Dynamic Range Sum Queries](https://cses.fi/problemset/task/1648/) de pe CSES

Deși această problemă se poate rezolva într-un mod mai eficient folosind arborii de intervale, actualizările și interogările reprezintă un exemplu foarte bun pentru ilustrarea acestei tehnici. Se va observa faptul că pentru fiecare bucată din vector se va ține suma acesteia, iar queryurile vor fi procesate conform descrierii de mai sus. 

```cpp
#include <iostream>
#include <vector>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n, q;
    cin >> n >> q;
    
    vector<int> v(n);
    for (int i = 0; i < n; i++) {
        cin >> v[i];
    }
    
    int sz = 450;
    
    vector<long long> bk(n/sz + 1);
    
    for (int i = 0; i < n; i++) {
        bk[i / sz] += v[i];
    }
    
    for (; q; q--) {
        int tp;
        cin >> tp;
        
        if (tp == 1) {
            int pos, val;
            cin >> pos >> val;
            
            pos--;
            bk[pos / sz] += (val - v[pos]);
            v[pos] = val;
        }
        
        else {
            int L, R;
            cin >> L >> R;
            L--; R--;
            
            long long sum = 0;
            if (L / sz == R / sz) {
                for (int i = L; i <= R; i++) {
                    sum += v[i];
                }
            }
            else {
                int pos = L;
                while (pos / sz == L / sz) {
                    sum += v[pos];
                    pos++;
                }
                while (pos / sz != R / sz) {
                    sum += bk[pos / sz];
                    pos += sz;
                }
                while (pos <= R) {
                    sum += v[pos];
                    pos++;
                }
            }
            
            cout << sum << '\n';
        }
    }
    
    return 0;
}
```



### Problema [Consecutive Max Difference](https://csacademy.com/contest/interview-archive/task/consecutive-max-difference/) de pe CS Academy

!!! note "Observație"
    Această problemă, împreună cu variații ale ei este explicată în detaliu și în acest [blog](https://codeforces.com/blog/entry/129324) de pe Codeforces.

Pentru a rezolva această problemă, trebuie să ne folosim de faptul că știm o valoare minimă a acestei diferențe, aceasta fiind raportul dintre diferența dintre maxim și minim, respectiv numărul de perechi de valori adiacente. Folosind această regulă, tot ce mai avem de făcut este să grupăm valori în functie de zona unde se află ele în șir (putem împărți valorile în $n$ grupe astfel), iar mai apoi vom calcula diferențele între cea mai mare valoare din grupa precedentă și cea mai mică valoare din grupa următoare. 

```cpp
long long maxDifference(const vector<int>& v) {
    int min_val = *min_element(v.begin(), v.end());
    int max_val = *max_element(v.begin(), v.end());
    double dif = max_val - min_val;
    int num_pairs = v.size() - 1;
    
    int aprox = dif / num_pairs;
    
    int n = v.size();
    double bucket_size = ((double)max_val - min_val) / n;
    
    vector<int> buckets[v.size()];
    for (int i = 0; i < v.size(); i++) {
        dif = v[i] - min_val;
        int bucket = (int)(((double)v[i] - min_val) / bucket_size);
        
        if (bucket == v.size()) { bucket--; }
        buckets[bucket].push_back(v[i]);
    }
    
    int prev_max = 0;
    long long ans = 0;
    for (int i = 0; i < v.size(); i++) {
        if (!buckets[i].size() == 0) {
            min_val = *min_element(buckets[i].begin(), buckets[i].end());
            max_val = *max_element(buckets[i].begin(), buckets[i].end());
            
            if (i) {
                ans = max(ans, (long long)min_val - prev_max);
            }
            prev_max = max_val;
        }
    }
    
    return ans;
}
```

## Împărțirea queryurilor în bucăți de radical - Algoritmul lui Mo

Pentru a calcula query-uri mai complicate, de multe ori ne putem gândi la a grupa query-urile pentru a face actualizările și interogările mai puțin costisitoare din punct de vedere al timpului. O metodă foarte populară de a face acest lucru constă în gruparea query-urilor în funcție de grupa în care se află poziția de start, iar în caz de egalitate, queryurile se ordonează crescător în funcție de capătul din dreapta. 

Această metodă se numește Algoritmul lui Mo și prin folosirea ei pentru a reordona queryurile, ne asigurăm că numărul de operații pe care îl facem în medie la fiecare query este de $O(\sqrt n)$, lucru ce se poate motiva prin însumarea a două elemente de complexitate:

* Dacă avem două (sau mai multe) queryuri din același bucket, capătul din stânga se va mișca cu cel mult $\sqrt n$, iar numărul total de pași pe care îi facem la dreapta este de $n$. Deoarece numărul de bucketuri este $O(\sqrt n)$, atunci contribuția la complexitate de la aceste queryuri este $O(n \sqrt n)$.

* Dacă avem două queryuri din bucketuri diferite, putem avea în cel mai rău caz $n$ pași, dar deoarece numărul de bucketuri este $O(\sqrt n)$, atunci contribuția la complexitate de la aceste queryuri este $O(n \sqrt n)$.

În total, complexitatea se reduce la $O(n \sqrt n)$, presupunând că operațiile auxiliare pe care le efectuăm se realizează în timp constant. 

!!! note "Observație"
    Pentru a optimiza mai mult această metodă, putem să sortăm invers elementele din aceeași grupă dacă avem de-a face cu grupe cu un număr par, deoarece putem astfel să alternăm direcția în care adăugăm și scoatem valori la capătul din dreapta, constanta reducându-se cu un factor de aproximativ $2$ în majoritatea cazurilor.

Pentru a explica acest algoritm, voi prezenta o problemă clasică ce folosește această metodă. 

### Problema [fsecv](https://kilonova.ro/problems/1814) de la Lot Juniori 2019

Pentru a calcula rapid câte valori au aceeași frecvență egală cu $k$, trebuie să ne asigurăm că numărul de operații de adăugare și ștergere nu este foarte mare, lucru ce îl putem realiza folosind algoritmul lui Mo. Tot ce ne rămâne de făcut este să ținem doi vectori de frecvență, unul cu frecvența fiecărui element, iar cel de-al doilea, cu frecvența frecvenței elementelor. 

Se poate observa că queryurile sunt ordonate după raportul dintre capătul din stânga și dimensiunea bucketului, iar în caz de egalitate, după capătul din dreapta. De asemenea, pe măsură ce procesăm queryurile, vom ajusta capetele stânga și dreapta în funcție de operațiile pe care trebuie să le facem, adăugând sau scoțând valori după caz, așa cum se poate observa în funcția în care procesăm efectiv queryurile. 

Mai jos puteți găsi o implementare detaliată a problemei menționate mai sus, aceasta fiind un exemplu clasic al algoritmului lui Mo. 

```cpp
#include <bits/stdc++.h>

using namespace std;
using ll = long long;

const int MAX_A = 1e5, MAX_N = 1e5;
int a[MAX_N + 5], freq[2 * MAX_A + 5], cnt[MAX_A + 5], blockSize;

struct Query {
    int l, r, k, idx;

    bool operator < (Query other) const {
        return make_pair(l / blockSize, r) < make_pair(other.l / blockSize, other.r);
    }
};

void add (int idx) {
    int val = a[idx] + MAX_A; 

    if (freq[val] > 0) {
        cnt[freq[val]]--;
    }
    cnt[++freq[val]]++;
}

void remove (int idx) {
    int val = a[idx] + MAX_A; 

    if (freq[val] > 0) {
        cnt[freq[val]]--;
    }
    cnt[--freq[val]]++;
}

int getAnswer (int idx) {
    return cnt[idx];
}

vector<int> MoSAlgorithm (vector<Query> queries) {
    vector<int> answers (queries.size());
    sort(queries.begin(), queries.end());

    int curL = 0, curR = -1, i;
    for (i = 1; i < queries.size(); i++) {
        Query q = queries[i];

        while (curL > q.l) {
            add(--curL);
        }

        while (curR < q.r) {
            add(++curR);
        }

        while (curL < q.l) {
            remove(curL++);
        }

        while (curR > q.r) {
            remove(curR--);
        }
        answers[q.idx] = getAnswer(q.k);
    }

    return answers;
}

int main() {
    
    ifstream cin("fsecv.in");
    ofstream cout("fsecv.out");

    int n, q, i;
    cin >> n >> q;

    blockSize = (int) sqrt(n);
    for (i = 1; i <= n; i++) {
        cin >> a[i];
    }

    vector<Query> queries(q + 1);
    for (i = 1; i <= q; i++) {
        cin >> queries[i].l >> queries[i].r >> queries[i].k;
        queries[i].idx = i;
    }

    vector<int> output = MoSAlgorithm(queries);
    for (i = 1; i < output.size(); i++) {
        cout << output[i] << "\n";
    }
    return 0;
}
```

## Procesarea datelor în funcție de tipul queryurilor sau a frecventelor

În alte tipuri de probleme, suntem nevoiți să rezolvăm două probleme diferite pe care să le combinăm pentru a obține o soluție cât mai bună posibil, practic luând avantajele fiecărei metode cu scopul de a obține o soluție finală optimă pentru datele de care dispunem. Aici am prezentat două asemenea exemple.

### Problema [Jumpsum](https://kilonova.ro/problems/481) de pe Kilonova

Pentru a rezolva această problemă, plecăm de la faptul că dacă am vrea să rezolvăm un query în mod brut, complexitatea ar fi $O(\frac{n}{y})$, ceea ce pentru valori mici ale lui $y$, ne-ar cauza mari probleme din punct de vedere al vitezei programului. 

Din acest motiv, o idee care se impune imediat este aceea de a precalcula răspunsurile pentru cât mai multe valori ale lui $y$, pentru a evita această problemă pe viitor. Totuși, nu putem precalcula toate răspunsurile, deoarece complexitatea ar deveni $O(n^2)$. Din acest motiv, recurgem la o soluție de compromis, care folosește avantajele ambelor metode, iar din acest motiv, vom precalcula răspunsurile pentru toate valorile mai mici de $\sqrt n$, respectiv brut pentru toate valorile mai mari de $\sqrt n$, astfel complexitatea devenind $n \sqrt n$.

```cpp
#include <iostream>
using namespace std;

long long n, q, sp[302][100002], v[302];

int main() {
    cin >> n;
    
    for (int i = 1; i <= n; i++) {
        cin >> v[i];
    }
    
    for (int pas = 1; pas <= min(300, n); pas++) {
        for (int i = 1; i <= n; i++) {
            sp[pas][i] = v[i];
            if(i > pas) {
                sp[pas][i] += sp[pas][i - pas];
            }
        }
    }
    
    cin >> q;
    for (; q; q--) {
        int x, y;
        cin >> x >> y;
        
        if (y <= min(300, n)) {
            cout << sp[y][x] << '\n';
        }
        else {
            long long ans = 0;
            while (x > 0) {
                ans += v[x];
                x -= y;
            }
            cout << ans << '\n';
        }
    }
}
```

### Problema [Bvarcolaci](https://kilonova.ro/problems/171) de la ONI 2015

Pentru a rezolva această problemă, este foarte important să împărțim valorile în funcție de frecvența în care apar. Cu alte cuvinte, dacă un element apare de $x$ ori în șir, lungimea maximă a unei secvențe în care poate fi majoritar este de cel mult $2 \cdot x - 1$, ceea ce ne motivează să avem două abordări diferite în funcție de frecvența elementelor. 

Dacă un element apare de cel puțin $\sqrt n$ ori, putem afla numărul de secvențe cu frecvență majoritară în $O(n)$ cu ajutorul unor sume parțiale, numărând o diferență între valorile care apar și cele care nu apar (reducem problema la un șir binar).

Altfel, vom putea fixa poziția primului și ultimului element egal cu valoarea curentă, iar cu ajutorul unor cazuri, vom putea ajunge să găsim răspunsul în $O(frq^2)$, unde $frq$ este frecvența valorii curente.

```cpp
#include <bits/stdc++.h>
using namespace std;
ifstream f("bvarcolaci.in");
ofstream g("bvarcolaci.out");

int n, v[250002], frq[250002], xx[500002];
vector<int> pos[250002];

long long fct (long long a, long long b, long long c) {
    if(a > b) {
        swap(a, b);
    }
    a = min(a, c);
    b = min(b, c);
    if (a + b <= c) {
        return (a+1) * (b+1);
    }
    long long sol = (a+1);
    sol = sol + 1LL * (c - b + 1) * b;
    int mx = (b-1);
    int mn = max(0LL, c - a - 1);
    sol = sol + 1LL * mx * (mx+1)/2;
    sol = sol - 1LL * mn * (mn+1)/2;
    return sol;
}
int main() {
    long long sol = 0;
    f >> n;
    int rad = (int)sqrt(n);
    for (int i = 1; i <= n; ++i) {
        f >> v[i];
        pos[v[i]].push_back(i);
    }
    for (int i = 1; i <= n; ++i) {
        if (pos[i].size() <= rad) {
            for (int j = 0; j < pos[i].size(); ++j) {
                for (int k = j; k < pos[i].size(); ++k) {
                    int st = pos[i][j];
                    int dr = pos[i][k];
                    int len = (dr - st + 1);
                    int frq = k - j + 1;
                    if (frq < len / 2 + 1) {
                        continue;
                    }
                    int disp = frq * 2 - len - 1;
                    int catest;
                    if (j != 0) {
                        catest = st - pos[i][j-1] - 1;
                    }
                    else {
                        catest = st - 1;
                    }
                    int catedr;
                    if (k + 1 == pos[i].size()) {
                        catedr = n - dr;
                    }
                    else {
                        catedr = pos[i][k + 1] - dr - 1;
                    }
                    sol += fct(catest, catedr, disp);
                }
            }
        }
        else {
            memset(xx, 0, sizeof(xx));
            int st = 249999;
            int nr = 0;
            for (int j = 1; j <= n; ++j) {
                if(v[j] == i) {
                    frq[j] = frq[j-1] + 1;
                }
                else {
                    frq[j] = frq[j-1] - 1;
                }
                ++xx[250000 + frq[j-1]];
                if (250000 + frq[j-1] <= st) {
                    ++nr;
                }
                while (frq[j] + 250000 <= st) {
                    nr -= xx[st], --st;
                }
                while (frq[j] + 250000 > st + 1) {
                    ++st, nr += xx[st];
                }
                sol += nr;
            }
        }
    }
    g << sol << '\n';
    return 0;
}
```

## Recalcularea datelor după un număr fix de queryuri

Mai există și alte probleme în care răspunsul final constă în unirea unor răspunsuri precalculate, împreună cu un număr mic de elemente schimbate care trebuie procesate separat. Deși nu avem prezentate probleme de acest fel, acest tip de abordare este foarte popular mai ales atunci când lucrăm cu unele tipuri de queryuri pe arbore, unde de multe ori este optim să recalculăm răspunsurile odată la $\sqrt n$ queryuri. 

Problema de mai jos reprezintă un exemplu mai simplu care combină și cunoștințele căpătate anterior la algoritmul lui Mo.

### Problema [Rangemode](https://www.infoarena.ro/problema/rangemode) de pe infoarena

Pentru a rezolva această problemă, vom pleca de la soluția obișnuită pe care o avem folosind algoritmul lui Mo, unde sortăm queryurile în ordine crescătoare a grupei de unde încep. Dacă am proceda conform unui Mo obișnuit, ar trebui să ținem și un set în care să păstrăm frecvențele maxime deoarece avem nevoie să aflăm elementul minim cu frecvența maximă. Totuți, o complexitate de genul $O(q \sqrt n \log n)$ este prea înceată. 

Ne putem gândi acum la ce se întâmplă cu adevărat când rulăm updateurile și queryurile într-un bucket al algoritmului lui Mo. Noi continuăm să progresăm spre capătul dreapta al vectorului, adăugând valorile în structura noastră de date. Singurele ajustări pe care trebuie să le facem sunt atunci când trebuie să ne mișcăm în bucata parțială de la începutul query-urilor, bucată care are o lungime de cel mult $\sqrt n$. Din acest motiv, ce putem face acum este să reducem abordarea la doar niște adăugări, cu alte cuvinte vom adăuga valori una câte una, ajustând cel mai bun răspuns într-o manieră foarte simplă, deoarece putem acum să ne dăm seama dacă valorile adăugate la un moment dat pot fi răspunsuri mai bune. 

Pentru a trata cele $\sqrt n$ rămase, vom ține o copie a celor mai bune răspunsuri și vom adăuga doar valorile rămase într-o manieră similară, păstrând cu atenție noile răspunsuri pentru valorile rămase. 

```cpp
#include <fstream>
#include <vector>
#include <algorithm>
using namespace std;

int n, q, v[100002], ans[100002], frq[100002];

struct queries {
    int L, R, pi;
};
queries vq[100002];

bool cmp (queries a, queries b) {
    if (a.L / 300 != b.L / 300) {
        return a.L < b.L;
    }
    return a.R < b.R;
}

void add (int pos, int &mx) {
    frq[v[pos]]++;
    if (mx == 100001 || frq[v[pos]] > frq[mx] || (frq[v[pos]] == frq[mx] && v[pos] < mx)) {
        mx = v[pos];
    }
}
int main() {
    ifstream cin("rangemode.in");
    ofstream cout("rangemode.out");
    
    cin >> n >> q;
    for (int i = 1; i <= n; i++) {
        cin >> v[i];
    }
    
    for (int i = 1; i <= q; i++) {
        cin >> vq[i].L >> vq[i].R;
        vq[i].pi = i;
    }

    sort(vq + 1, vq + q + 1, cmp);
    
    int pq = 1;
    for (int buk = 0; buk < 350; buk++) {
        int bg = min(n+1, (buk+1) * 300), mxbigger = 100001;
        while (pq <= q) {
            int poz = vq[pq].L / 300;
            if(poz != buk)
                break;
            while (bg <= vq[pq].R) {// adaugam valorile noi
                add(bg++, mxbigger);
            }
            int mx2 = mxbigger;
            // procesam bucata din stanga
            for (int Lpos = min(vq[pq].R, (buk+1) * 300 - 1); Lpos >= vq[pq].L; Lpos--) {
                add(Lpos, mx2);
            }
            ans[vq[pq].pi] = mx2;
            for (int Lpos = min(vq[pq].R, (buk+1) * 300 - 1); Lpos >= vq[pq].L; Lpos--) {
                frq[v[Lpos]]--;
            }
            pq++;
        }
        for (int i = 0; i <= 100000; i++) {
            frq[i] = 0;
        }
    }
    
    for (int i = 1; i <= q; i++) {
        cout << ans[i] << '\n';
    }
    return 0;
}
```

## Concluzii

În ceea ce privește împărțirea pe bucăți de radical, fie că e vorba de procesarea unor grupe de valori separat sau a unor query-uri sau chiar folosirea unor abordări diferite în funcție de tipul de query dat, aceste tehnici se dovedesc a fi foarte utile și frecvent întâlnite în concursurile de informatică, adaptarea în funcție de situație fiind foarte importantă, așa cum se poate observa prin alegerea punctului limită care depinde în funcție de problemă. 

Problemele și resursele pe care le veți găsi în cele ce urmează acoperă toate aceste tehnici, soluțiile optime fiind de cele mai multe ori abordări similare cu cele prezentate aici, iar după cum se poate observa, această familie de algoritmi și tehnici a apărut foarte mult mai ales în ultimii ani în aplicații tot mai atipice. 

## Probleme suplimentare

* [infoarena mayonaka](https://infoarena.ro/problema/mayonaka)
* [InfoOltenia 2020 Toorcmmdc](https://kilonova.ro/problems/374)
* [Junior Challenge 2020 Aparate](https://infoarena.ro/problema/aparate)
* [infoarena qxy](https://www.infoarena.ro/problema/qxy)
* [ONI 2022 subsir](https://kilonova.ro/problems/1600)
* [infoarena suma6](https://infoarena.ro/problema/suma6)
* [infoarena numerex](https://www.infoarena.ro/problema/numerex)
* [ONI 2015 ksecv](https://kilonova.ro/problems/204/)
* [ONI 2018 Mexitate](https://kilonova.ro/problems/1521/)
* [Lot Juniori 2019 dss](https://kilonova.ro/problems/1683/)
* [USACO Platinum Minimizing Haybales](https://usaco.org/index.php?page=viewproblem2&cpid=1188)
* [IIOT 2024 XYQueries](https://kilonova.ro/problems/2427/)
* [ONI 2022 Baraj Seniori Piezisa](https://kilonova.ro/problems/142/)
* [infoarena arbore](https://www.infoarena.ro/problema/arbore)
* [Codeforces Sum of Progression](https://codeforces.com/contest/1921/problem/F)
* [Codeforces Array Queries](https://codeforces.com/contest/797/problem/E)
* [Codeforces Sakurako's Test](https://codeforces.com/contest/2008/problem/H)
* [Codeforces Robot Queries](https://codeforces.com/contest/1902/problem/D)
* [Codeforces Space Harbour](https://codeforces.com/contest/1924/problem/B)
* [Codeforces Ann and Books](https://codeforces.com/contest/877/problem/F)
* [Codeforces XOR and Favorite Number](https://codeforces.com/contest/617/problem/E)

## Lectură suplimentară

* [cp-algorithms: Sqrt Decomposition](https://cp-algorithms.com/data_structures/sqrt_decomposition.html)
* [SEPI Infobits F1 - paginile 99-137](https://sepi.ro/assets/upload-file/infobits-f1.pdf)
* [USACO Guide Sqrt Decomposition](https://usaco.guide/plat/sqrt?lang=cpp)
* [Infoarena - The Square Root Trick](https://www.infoarena.ro/blog/square-root-trick)
* [Infoarena - Multe "smenuri" de programare in C/C++... si nu numai!](https://www.infoarena.ro/multe-smenuri-de-programare-in-cc-si-nu-numai)
* [Codeforces - Square root decomposition and applications](https://codeforces.com/blog/entry/83248)
* [Codeforces - An alternative sorting order for Mo's algorithm](https://codeforces.com/blog/entry/61203)
* [Codeforces - Mo's Algorithm on Trees](https://codeforces.com/blog/entry/43230)
