---
tags:
    - stiva
    - structuri de date
---
**Autor**: Traian Mihai Danciu, Ștefan-Cosmin Dăscălescu

În multe probleme în care lucrăm cu secvențe de valori, suntem nevoiți să procesăm valorile pe rând, asemenea unui teanc de obiecte. Pentru a formaliza acest proces, vom avea nevoie de o structură de date potrivită. În informatică, numim această structură de date stivă.

## Noțiuni introductive

!!! info "Ce este o stivă?"
    Stiva (în engleză, stack) este o structură de date liniară abstractă, pentru care sunt definite operațiile de adăugare a unui element și eliminare a unui element și aceste operații se realizează la un singur capăt al structurii, numit vârful stivei. În timpul operațiilor cu stiva avem acces numai la elementul din vârful stivei. 

Operațiile pe care o stivă le poate efectua în timp constant sunt:

1. **push(x)**: Adaugă valoarea $x$ pe vârful stivei.
2. **top()**: Spune care este valoarea de pe vârful stivei.
3. **pop()**: Scoate elementul din vârful stivei.
4. **empty()**: Spune dacă stiva este goală.

!!! note "Observație"
    Valorile vor fi procesate conform principiului **LIFO**, adică **last in, first out**.

## Probleme de bază

### Problema [stack](https://kilonova.ro/problems/2001)

Această problemă ne cere să implementăm exact operațiile descrise mai sus.

Pentru a implementa aceste operații, avem două variante posibile:

#### Implementarea folosind un vector obișnuit

Pentru a implementa aceste operații fără a folosi vreo structură de date dinamică, putem face asta ținând un contor cu numărul de valori care se află la acel moment în stivă, astfel operațiile de ștergere și de verificare a dimensiunii stivei se fac raportându-ne la variabila $pos$, iar adăugarea valorii se face pur și simplu crescând valoarea lui $pos$. 

```cpp
#include <iostream>
using namespace std;

int stk[100001];

int main() {
    int t;
    cin >> t;
    
    int pos = 0; 
    while(t--) {
        int tip;
        cin >> tip;
        if(tip == 1) {
            cin >> stk[pos++]; 
        } 
        else {
            if(tip == 2) {
                pos--;
            } 
            else {
                if(tip == 3) {
                    cout << stk[pos - 1] << '\n';
                } 
                else {
                    if (pos == 0) {
                        cout << "YES" << '\n';
                    }
                    else {
                        cout << "NO" << '\n';
                    }
                }
            }
        }
    }
    return 0;
}
```

#### Implementarea folosind std::stack

Stiva poate fi implementată și cu funcțiile din STL. Pentru mai multe detalii,
vedeți [implementarea](https://kilonova.ro/pastes/BkG7Wrt8wQ83) și [funcțiile descrise aici](https://en.cppreference.com/w/cpp/container/stack).

Se poate observa faptul că avem nevoie de biblioteca `#include <stack>` pentru aceste funcții. 

```cpp
#include <iostream>
#include <stack>

using namespace std;

int main() {
    int t;
    cin >> t;
    stack<int> st;

    while (t--) {
        int tip;
        cin >> tip;
        if (tip == 1) {
            int val;
            cin >> val;
            st.push(val);
        } 
        else {
            if (tip == 2) {
                st.pop();
            } 
            else {
                if (tip == 3) {
                    cout << st.top() << '\n';
                } 
                else {
                    if (st.empty()) {
                        cout << "YES" << '\n';
                    }
                    else {
                        cout << "NO" << '\n';
                    }
                }
            }
        }
    }

    return 0;
}
```

### Problema [stack_max_min](https://kilonova.ro/problems/2107)

Problema ne dă un șir de numere și $4$ întrebări pentru câte o poziție:

1. Cel mai apropiat indice la stânga, unde elementul este mai mare decât poziția din întrebare.
2. Cel mai apropiat indice la stânga, unde elementul este mai mic decât poziția din întrebare.
3. Cel mai apropiat indice la dreapta, unde elementul este mai mare decât poziția din întrebare.
4. Cel mai apropiat indice la dreapta, unde elementul este mai mic decât poziția din întrebare.

Vom precalcula, pentru fiecare element, răspunsul la fiecare tip de întrebare. Aici vom descrie algoritmul doar pentru primul tip, deoarece celelalte se rezolvă analog.

Vom parcurge vectorul de la stânga la dreapta, iar pe o stivă vom reține indicii cu elemente mai mici sau egale cu elementul curent. Cu alte cuvinte, pentru fiecare element, scoatem de pe stivă toate elementele mai mici sau egale cu el. Dacă stiva este goală, atunci răspunsul este $-1$, altfel este indicele elementului de pe vârful stivei. Apoi, îl adăugăm pe el însuși în stivă.

!!! note "Observație importantă"
    Pe stivă vom reține indici, nu valori. Acest lucru va fi valabil pentru o mare parte din problemele de stivă pe care le rezolvați.

!!! example "Exemplu"
    Vom face o simulare a acestui algoritm, folosindu-ne de exemplul din problemă, $v = [1 \ 2 \ 3 \ 6 \ 4 \ 5 \ 3 \ 2 \ 1 \ 10]$. Ca în problemă, vectorul va fi indexat de la $0$.

    * Suntem la indicele $0$, $stiva = []$. Răspunsul va fi -1.
    * Suntem la indicele $1$, $stiva = [0]$, dar îl scoatem, iar apoi $stiva = []$. Răspunsul va fi $-1$.
    * Suntem la indicele $2$, $stiva = [1]$, dar îl scoatem, iar apoi $stiva = []$. Răspunsul va fi $-1$.
    * Suntem la indicele $3$, $stiva = [2]$, dar îl scoatem, iar apoi $stiva = []$. Răspunsul va fi $-1$.
    * Suntem la indicele $4$, $stiva = [3]$. Răspunsul va fi $3$.
    * Suntem la indicele $5$, $stiva = [3 \ 4]$, dar îl scoatem pe $4$. Răspunsul va fi $3$.
    * Suntem la indicele $6$, $stiva = [3 \ 5]$. Răspunsul va fi $5$.
    * Suntem la indicele $7$, $stiva = [3 \ 5 \ 6]$. Răspunsul va fi $6$.
    * Suntem la indicele $8$, $stiva = [3 \ 5 \ 6 \ 7]$. Răspunsul va fi $7$.
    * Suntem la indicele $9$, $stiva = [3 \ 5 \ 6 \ 7 \ 8]$, dar le scoatem pe toate, iar apoi $stiva = []$. Răspunsul va fi $-1$.

Această rezolvare are complexitatea $\mathcal{O}(N)$, pentru că fiecare element va fi pus pe stivă și scos, deci se vor face cel mult două operații pentru fiecare.

Detaliii de implementare: vom reține o matrice $raspuns[tip - 1][i]$ care va reprezenta răspunsul la o întrebare de tipul $tip \ i$. De asemenea, vom folosi o santinelă, care va fi o valoare care va fi mereu mai mică (sau mai mare, în funcție de caz) decât orice valoare din vector. Pentru mai multe detalii, vezi implementarea de mai jos.

```cpp
#include <iostream>

using namespace std;

#define MAXN 200000
#define MAXTIP 4
#define INFINIT 2000000000

int v[MAXN + 2], raspuns[MAXTIP][MAXN + 1], stiva[MAXN + 1];

int main() {
    ios_base::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);

    int n, sp;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        cin >> v[i];
    }

    // santinela
    v[0] = INFINIT;
    stiva[0] = 0;
    sp = 1;

    // intrebari de tip 1
    for (int i = 1; i <= n; i++) {
        // scoatem elementele mai mici sau egale
        while (v[stiva[sp - 1]] <= v[i]) {
            sp--;
        }
        raspuns[0][i] = stiva[sp - 1];  // primul element mai mare
        stiva[sp++] = i;                // adaugam i in stiva
    }

    // santinela
    v[0] = 0;
    stiva[0] = 0;
    sp = 1;

    // intrebari de tip 2
    for (int i = 1; i <= n; i++) {
        // scoatem elementele mai mari sau egale
        while (v[stiva[sp - 1]] >= v[i]) {
            sp--;
        }
        raspuns[1][i] = stiva[sp - 1];  // primul element mai mic
        stiva[sp++] = i;
    }

    // santinela
    v[n + 1] = INFINIT;
    stiva[0] = n + 1;
    sp = 1;

    // intrebari de tip 3
    for (int i = n; i >= 1; i--) {
        // scoatem elementele mai mici sau egale
        while (v[stiva[sp - 1]] <= v[i]) {
            sp--;
        }
        raspuns[2][i] = stiva[sp - 1];  // primul element mai mare
        stiva[sp++] = i;
    }

    // santinela
    v[n + 1] = 0;
    stiva[0] = n + 1;
    sp = 1;

    // intrebari de tip 4
    for (int i = n; i >= 1; i--) {
        // scoatem elementele mai mari sau egale
        while (v[stiva[sp - 1]] >= v[i]) {
            sp--;
        }
        raspuns[3][i] = stiva[sp - 1];
        stiva[sp++] = i;
    }

    int q;
    cin >> q;
    while (q--) {
        int tip, poz;
        cin >> tip >> poz;
        cout << raspuns[tip - 1][poz + 1] - 1 << "\n";
    }

    return 0;
}
```

## Probleme rezolvate

### Problema [skyline](https://kilonova.ro/problems/2114)

Pentru a rezolva această problemă, va trebui să aflăm pentru fiecare valoare care este cea mai apropiată poziție de la stânga și de la dreapta cu o înălțime mai mică decât cea curentă. 

După ce aflăm aceste valori, tot ce trebuie să facem este să folosim sume parțiale pentru a calcula aria cerută pentru fiecare poziție. 

```cpp
#include <iostream>

using namespace std;

const int nmax = 40000;
int length[5 + nmax], height[5 + nmax], l[5 + nmax], stk[5 + nmax];
// l[i] = cel mai mare j < i pentru care height[j] < height[i]

int main() {
    int n;
    cin >> n;
    int ptr = 0;
    for (int i = 1; i <= n; i++) {
        cin >> height[i] >> length[i];
        length[i] += length[i - 1];  // fac sume partiale pe length[]
        while (ptr > 0 && height[stk[ptr - 1]] >= height[i]) {
            ptr--;
        }
        if (ptr == 0) {
            l[i] = 0;
        }
        else {
            l[i] = stk[ptr - 1];
        }
        stk[ptr++] = i;
    }
    ptr = 0;
    long long ans = 0;
    for (int i = n; i >= 1; i--) {
        while (ptr > 0 && height[stk[ptr - 1]] >= height[i]) {
            ptr--;
        }
        int r;  // r = cel mai mic j > i pentru care height[j] < height[i]
        if (ptr == 0) {
            r = n + 1;
        }
        else {
            r = stk[ptr - 1];
        }
        stk[ptr++] = i;
        ans = max(ans, 1ll * height[i] * (length[r - 1] - length[l[i]]));
    }
    cout << ans << '\n';
    return 0;
}
```

### Problema [unific - OJI 2013 VII](https://kilonova.ro/problems/835)

Mai întâi, vom defini urmatoarele două functii:

1. $canJoin(x, y) = 1$ dacă putem unifica $x$ si $y$, $0$ altfel
2. $join(x, y) =$ rezultatul unificării dintre $x$ si $y$

Sa simplificăm enunțul astfel: Găsim primul $i (1 < i <= n)$ pentru care $canJoin(a_{i - 1}, a_i) = 1$ (dacă nu există atunci terminăm procedeul). Setăm $a_{i - 1}$ la $join(a_{i - 1}, a_i)$ si scoatem $a_i$ din șir. Acum, dacă $i > 2$ și $canJoin(a_{i - 2}, a_{i - 1}) = 0$ continuăm căutarea de la $i + 1$. Altfel, setăm $a_{i - 1}$ la $join(a_{i - 3}, a_{i - 1})$ și continuăm tot așa.

Observăm că noi trebuie să scoatem elemente din șir, iar acest lucru nu este ușor într-un vector. Așa că, atunci când ajungem la $i$, vom menține într-o stivă grupurile care s-au format până la $i$. Apoi, cât timp stiva nu este goală, vom încerca să unificam vârful stivei cu $a_i$. Dacă $canJoin(top(), a_i) = 1$ atunci setăm $a_i$ la $join(top(), a_i)$ și scoatem vârful. Altfel, adaugăm $a_i$ in stiva și continuăm cu $i + 1$.

Sursa de 100 de puncte:
```cpp
#include <stdio.h>

const int MAXN = 100'000;
const int MAXCF = 10;
const int FARA_CIFRE = -1;

FILE *fin, *fout;
int n, sp, fr[MAXCF], fra[MAXCF], frb[MAXCF];
long long v[MAXN], stiva[MAXN];

void openFiles() {
    fin = fopen("unific.in", "r");
    fout = fopen("unific.out", "w");
}

void readArray() {
    int i;
    fscanf(fin, "%d", &n);
    for (i = 0; i < n; i++) {
        fscanf(fin, "%lld", &v[i]);
    }
}

void getMostFrequent() {
    int i, max;
    long long val;
    for (i = 0; i < n; i++) {
        val = v[i]; // vrem sa pastram valoarea
        while (val > 0) {
            fr[val % 10]++;
            val /= 10;
        }
    }
    max = 0;
    for (i = 1; i < MAXCF; i++) {
        if (fr[i] > fr[max]) {
            max = i;
        }
    }
    fprintf(fout, "%d\n", max);
}

void getDigitFrequencies(long long val, int fr[MAXCF]) {
    do { // tratam si cazul val = 0
        fr[val % 10]++;
        val /= 10;
    } while (val > 0);
}

int canJoin(long long a, long long b) {
    int i;
    for (i = 0; i < MAXCF; i++) {
        fra[i] = frb[i] = 0;
    }
    getDigitFrequencies(a, fra);
    getDigitFrequencies(b, frb);
    i = 0; // cautam prima cifra care apare la ambii
    while (i < MAXCF && (fra[i] == 0 || frb[i] == 0)) {
        i++;
    }
    return i < MAXCF; // daca am gasit vreuna
}

long long removeCommonDigits(long long val, int other_fr[]) {
    long long p, rez;
    int cf, has_digits;
    p = 1;
    while (p * 10 <= val) {
        p *= 10;
    }
    rez = has_digits = 0;
    while (p > 0) {
        cf = val / p % 10;
        if (other_fr[cf] == 0) { // daca nu e comuna
            rez = rez * 10 + cf; // adaugam cifra
            has_digits = 1;
        }
        p /= 10;
    }
    return has_digits ? rez : FARA_CIFRE;
}

// consideram ca am aplicat inainte canJoin(a, b)
// asta inseamna ca fra si frb sunt calculate deja
long long join(long long a, long long b) {
    long long p, rez;
    a = removeCommonDigits(a, frb); // numarul nou al lui a
    b = removeCommonDigits(b, fra); // numarul nou al lui b
    if (a != FARA_CIFRE || b != FARA_CIFRE) { // ambele dispar daca ambele n-au cifre
        if (a == FARA_CIFRE) { // nu mai conteaza ca nu are cifre
            a = 0;
        }
        p = 1;
        while (p <= b) {
            p *= 10;
        }
        if (b == 0) {
            p = 10; // si cifra asta trebuie luata in considerare
        }
        if (b == FARA_CIFRE) { // setam la 0 ca sa nu ne afecteze rezultatul
            b = 0;
        }
        a = a * p + b; // lipim numerele
    }
    return a;
}

void unifyArray() {
    int i;
    for (i = 0; i < n; i++) {
        while (sp > 0 && v[i] >= 0 && canJoin(stiva[sp - 1], v[i])) {
            v[i] = join(stiva[sp - 1], v[i]);
            sp--; // scoatem varful din stiva
        }
        if (v[i] != FARA_CIFRE) { // daca mai are cifre
            stiva[sp++] = v[i]; // adaugam elementul in stiva
        }
    }
    fprintf(fout, "%d\n", sp); // cate sunt
    for (i = 0; i < sp; i++) {
        fprintf(fout, "%lld ", stiva[i]);
    }
    fputc('\n', fout);
}

void closeFiles() {
    fclose(fin);
    fclose(fout);
}

int main() {
    openFiles();
    readArray();
    getMostFrequent();
    unifyArray();
    closeFiles();
    return 0;
}
```

### Problema [swap - ONI 2013 Baraj Juniori](https://kilonova.ro/contest/1076)

Notam cu $S$ șirul de paranteze.
Pentru punctul a), în timp ce parcurgem șirul de paranteze, vom menține o stivă care va conține indicii parantezelor deschise cărora nu le-am găsit încă o pereche. De fiecare dată când dăm peste o paranteză deschisa, îi adaugăm indicele în stivă, iar atunci când dăm peste o paranteză închisă, $top()$ va fi perechea ei. Adunăm la răspuns $i - top()$, scoatem vârful din stivă și continuăm cu $i + 1$.
Punctele b) și c) pot fi rezolvate împreuna. Deducem următoarele trei cazuri:
1. $S_i = S_{i + 1}$, unde $i$ și $i + 1$ sunt parantezele interschimbate. Atunci, răspunsul va rămâne exact la fel, deci nu este o operație swap validă
2. $S_i = )$ și $S_{i + 1} = ($. În acest caz, există un $a (a < i)$ și un $b (i + 1 < b)$ astfel încât $S_a = ($, $S_b = )$, și $(a, i)$, respectiv $(i + 1, b)$ formau perechi. Costurile lor însumate vor fi $i - a + b - i - 1 = b - a - 1$. Când interschimbăm $S_i$ cu $S_{i + 1}$ obținem perechile $(a, b)$ și $(i, i + 1)$, ale căror costuri însumate dau $b - a + 1$. Deci răspunsul a crescut cu $2$, ceea ce înseamnă că nu este o operație swap validă.
3. $S_i = ($ și $S_{i + 1} = )$. Dacă nu există nici un $a (a < i)$ astfel încât $S_a = ($ și perechea lui $a$ (pe care o notăm cu $b$) să fie mai mare ca $i + 1$, atunci operația nu ar fi validă, deoarece nu am avea pereche pentru $S_i$ dacă $S_i = )$. Mai întai, avem perechile $(a, b)$ și $(i, i + 1)$. După cum am văzut la cazul $2$, răspunsul ar fi mai mic cu $2$ dacă perechile ar fi $(a, i)$ și $(i + 1, b)$. Deci operația swap este validă.

Observăm că singurul caz în care operația swap este validă este atunci când $S_i = (, S_{i + 1} = )$ și există un $a < i$, $S_a = ($, a cărui pereche $b$ este mai mare ca $i + 1$. Acest lucru se poate simplifica astfel: Căutăm un $i$ care respectă următoarele condiții:
1. $S_i = )$
2. Înainte să scoatem perechea lui $i$, stiva trebuie să aiba cel puțin $2$ elemente
3. Vârful stivei trebuie să aibă valoarea $i - 1$.

Deci noi, trebuie să numărăm câți $i$ respectă cele trei condiții. Dacă găsim vreunul, răspunsul este $rez - 2$, unde $rez$ este răspunsul de la punctul a). Altfel, răspunsul este $-1$.

Sursa de 100 de puncte:
```cpp
#include <stdio.h>

const int MAXN = 90'000;
const char DESCHISA = '(';
const char INCHISA = ')';

int stiva[MAXN], sp;

FILE *fin, *fout;

void openFiles() {
    fin = fopen("swap.in", "r");
    fout = fopen("swap.out", "w");
}

void calcAnswer() {
    int i, n, ch, cate;
    long long rez;
    fscanf(fin, "%d ", &n);
    rez = cate = 0;
    for (i = 0; i < n; i++) {
        ch = fgetc(fin);
        if (ch == DESCHISA) {
            stiva[sp++] = i; // il adaugam in stiva
        }
        else { // INCHISA
            rez += i - stiva[sp - 1]; // distanta pana la pereche
            if (sp >= 2 && stiva[sp - 1] == i - 1) { // conditia sa fie valida operatia 
                cate++;
            }
            sp--; // scoatem perechea din stiva
        }
    }
    fprintf(fout, "%lld\n%lld\n%d\n", rez, cate > 0 ? rez - 2 : -1, cate);
}

void closeFiles() {
    fclose(fin);
    fclose(fout);
}

int main() {
    openFiles();
    calcAnswer();
    closeFiles();
    return 0;
}
```

### Problema [Ehab and Prefix MEXs - Codeforces Round 649](https://codeforces.com/contest/1364/problem/C)

Să presupunem că suntem la un indice $i$ și am reușit să construim tot prefixul $[1, i - 1]$. Dacă $a_{i - 1} = a_i$, atunci $b_i$ poate fi orice valoare mai mare ca $a_i$. Vom ține elementele care au $a_{i - 1} = a_i$ într-o stivă, deoarece ele pot lua orice valoare mai mare ca $a_i$. Când $a_{i - 1} < a_i$, vom putea folosi elementele din stivă pentru a acoperi intervalul $[a_{i - 1}, a_i)$. Dacă în stivă sunt mai puțin de $a_i - a_{i - 1} - 1$ elemente, atunci nu putem forma prefixul $[1, i]$ și atunci răspunsul va fi $-1$. Altfel, setăm $b_i$ la $a_{i - 1}$. Apoi luăm primele $a_i - a_{i - 1} - 1$ elemente, le setăm la $a_{i - 1} + 1, a_{i - 1} + 2, .., a_i - 1$ și apoi le scoatem din stivă. Restul elementelor, care au rămas în stivă după ce am trecut prin tot șirul, pot fi setate la $n + 1$ sau la orice valoare mai mare ca $n$.

Codul de Accepted:
```cpp
#include <stdio.h>

const int MAXN = 100'000;
const int CANNOT = -1;

int n, a[MAXN + 1], answer[MAXN + 1], stiva[MAXN];

void readArray() {
    int i;
    scanf("%d", &n);
    for (i = 1; i <= n; i++) {
        scanf("%d", &a[i]);
    }
}

void buildAnswer() {
    int i, sp, pot, j;
    sp = 0;
    pot = i = 1;
    while (i <= n && pot) {
        if (a[i] == a[i - 1]) {
            stiva[sp++] = i; // il adaugam in stiva
        }
        else if (a[i] - a[i - 1] > sp + 1) { // nu avem destule elemente
            pot = 0;
        }
        else {
            answer[i] = a[i - 1];
            for (j = a[i - 1] + 1; j < a[i]; j++) {
                // folosim elementul si il scoatem
                answer[stiva[--sp]] = j;
            }
        }
        i++;
    }
    while (sp > 0) {
        // setam restul elementelor la ceva care nu conteaza
        answer[stiva[--sp]] = n + 1;
    }
    if (pot == 0) {
        answer[0] = CANNOT;
    }
}

void writeAnswer() {
    int i;
    if (answer[0] == CANNOT) {
        printf("%d\n", CANNOT);
    } else {
        for (i = 1; i <= n; i++) {
            printf("%d ", answer[i]);
        } 
        fputc('\n', stdout);
    }
}

int main() {
    readArray();
    buildAnswer();
    writeAnswer();
    return 0;
}
```

## Concluzii

După cum se poate observa, odată ce deprindeți tehnicile folosite la problemele prezentate mai sus, soluțiile devin mult mai ușor de conceput, existând foarte multe similarități între problemele care implică folosirea stivei. 

## Probleme suplimentare

- [Advertisement - CSES](https://cses.fi/problemset/task/1142) (O versiune mai ușoară a problemei skyline)
- [Maximum Building I - CSES](https://cses.fi/problemset/task/1147) (O versiune putin mai grea a problemei skyline)
- [inundație - ONI 2022 VI](https://kilonova.ro/problems/1593) (Cerințele 2 și 3 pot fi rezolvate folosind o stivă, necesită și căutare binară).
- [fuziune - ONI 2023 Baraj Juniori](https://kilonova.ro/problems/554) (Problemă asemănătoare cu unific, dar necesită lucru cu numere mari și numere prime)
- [șiruri - ONI 2022 VI](https://kilonova.ro/submissions/62356) (Problemă asemănătoare cu unific)
- [tower - Shumen 2016 Juniori](https://www.nerdarena.ro/problema/tower) (Nu vă speriați că este de la Shumen, problema este doar o aplicație la stack_max_min)
- [maxp - ONI 2013 VIII](https://kilonova.ro/problems/836) (O altă aplicație la problema stack_max_min)
- [changemin - ONI 2022 X](https://kilonova.ro/problems/1602) (O aplicație similară cu stack_max_min)
- [reactii - ONI 2009 X](https://kilonova.ro/problems/1325) (Problemă asemănătoare cu unific)
- [dag - ONI 2019 Baraj Seniori](https://kilonova.ro/problems/410) (Problemă care se folosește de tehnica de la stack_max_min)
- [leftmax - OJI 2020 X](https://kilonova.ro/problems/929) (Problemă care se folosește de tehinca de la stack_max_min)
- Alte probleme cu stiva de pe [kilonova](https://kilonova.ro/tags/314)

## Bibliografie și lectură suplimentară

- [std::stack - cppreference](https://en.cppreference.com/w/cpp/container/stack)
- [Articolul de pe USACO Guide despre stivă](https://usaco.guide/gold/stacks?lang=cpp)
- [Stiva - CPPI Sync](https://cppi.sync.ro/materia/stive.html)
- [Un video despre stivă, pentru a vă ajuta să înțelegeți mai bine acest concept.](https://www.youtube.com/watch?v=I37kGX-nZEI)
- [Un video despre analiza amortizată, vă va ajuta să înțelegeți mai bine rezolvarea problemei *stack_max_min* și de ce are complexitatea $\mathcal{O}(N)$](https://www.youtube.com/watch?v=T7W5E-5mljc)
- [Stiva - pbinfo](https://www.pbinfo.ro/articole/19577/stiva)
- [Algopedia - Stive](https://www.algopedia.ro/wiki/index.php/Clasa_a_VII-a_lec%C8%9Bia_2_-_26_sep_2019#Stive)
- [Algopedia - Analiza amortizată, mai multe detalii despre problema stack_max_min](https://www.algopedia.ro/wiki/index.php/Clasa_a_VII-a_lec%C8%9Bia_11_-_21_nov_2019#Lec%C8%9Bie_-_analiz%C4%83_amortizat%C4%83)
