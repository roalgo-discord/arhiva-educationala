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

## Problema exemplu: [stack](https://kilonova.ro/problems/2001)

Această problemă ne cere să implementăm exact operațiile descrise mai sus.

Pentru a implementa aceste operații, avem două variante posibile:

### Implementarea folosind un vector obișnuit

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

### Implementarea folosind std::stack

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

## Problema exemplu - [stack_max_min](https://kilonova.ro/problems/2107)

Problema ne dă un șir de numere și $4$ întrebări pentru câte o poziție:

1. Cel mai apropiat indice la stânga, unde elementul este mai mare decât poziția din întrebare.
2. Cel mai apropiat indice la stânga, unde elementul este mai mic decât poziția din întrebare.
3. Cel mai apropiat indice la dreapta, unde elementul este mai mare decât poziția din întrebare.
4. Cel mai apropiat indice la dreapta, unde elementul este mai mic decât poziția din întrebare.

Vom precalcula, pentru fiecare element, răspunsul la fiecare tip de întrebare. Aici vom descrie algoritmul doar pentru primul tip, deoarece celelalte se rezolvă analog.

Vom parcurge vectorul de la stânga la dreapta, iar pe o stivă vom reține indicii cu elemente mai mici sau egale cu elementul curent. Cu alte cuvinte, pentru fiecare element, scoatem de pe stivă toate elementele mai mici sau egale cu el. Dacă stiva este goală, atunci răspunsul este $-1$, altfel este indicele elementului de pe vârful stivei. Apoi, îl adăugăm pe el însuși în stivă.

!!! note "Observație importantă"
    Pe stivă vom reține indici, nu valori. Acest lucru va fi valabil pentru o mare parte din problemele de stivă pe care le rezolvați.

Vom face o simulare a acestui algoritm, folosindu-ne de exemplul din problemă, $v = [1 \ 2 \ 3 \ 6 \ 4 \ 5 \ 3 \ 2 \ 1 \ 10]$. Ca în problemă, vectorul va fi indexat de la $0$.
1. Suntem la indicele $0$, $stiva = []$. Răspunsul va fi -1.
2. Suntem la indicele $1$, $stiva = [0]$, dar îl scoatem, iar apoi $stiva = []$. Răspunsul va fi $-1$.
3. Suntem la indicele $2$, $stiva = [1]$, dar îl scoatem, iar apoi $stiva = []$. Răspunsul va fi $-1$.
4. Suntem la indicele $3$, $stiva = [2]$, dar îl scoatem, iar apoi $stiva = []$. Răspunsul va fi $-1$.
5. Suntem la indicele $4$, $stiva = [3]$. Răspunsul va fi $3$.
6. Suntem la indicele $5$, $stiva = [3 \ 4]$, dar îl scoatem pe $4$. Răspunsul va fi $3$.
7. Suntem la indicele $6$, $stiva = [3 \ 5]$. Răspunsul va fi $5$.
8. Suntem la indicele $7$, $stiva = [3 \ 5 \ 6]$. Răspunsul va fi $6$.
9. Suntem la indicele $8$, $stiva = [3 \ 5 \ 6 \ 7]$. Răspunsul va fi $7$.
10. Suntem la indicele $9$, $stiva = [3 \ 5 \ 6 \ 7 \ 8]$, dar le scoatem pe toate, iar apoi $stiva = []$. Răspunsul va fi $-1$.

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

## Problema [skyline](https://kilonova.ro/problems/2114)

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

## Concluzii

După cum se poate observa, odată ce deprindeți tehnicile folosite la problemele prezentate mai sus, soluțiile devin mult mai ușor de conceput, existând foarte multe similarități între problemele care implică folosirea stivei. 

## Probleme suplimentare

- [Advertisement - CSES](https://cses.fi/problemset/task/1142) (O versiune mai ușoară a problemei skyline)
- [Maximum Building I - CSES](https://cses.fi/problemset/task/1147) (Este aceeași problemă ca Maximum Rectangle)
- [inundație - ONI 2022 VI](https://kilonova.ro/problems/1593) (Cerințele 2 și 3 pot fi rezolvate folosind o stivă, necesită și căutare binară).
- [fuziune - ONI 2023 Baraj Juniori](https://kilonova.ro/problems/554) (Problemă asemănătoare cu unific, dar necesită lucru cu numere mari și numere prime)
- [Ehab and Prefix MEXs - Codeforces Round 649](https://codeforces.com/contest/1364/problem/C)
- [Maximum Rectangle - kilonova](https://kilonova.ro/problems/2113)
- [unific - OJI 2013 VII](https://kilonova.ro/problems/835)
- [swap - ONI 2013 Baraj Juniori](https://kilonova.ro/problems/1076)
- [șiruri - ONI 2022 VI](https://kilonova.ro/submissions/62356) (Altă problemă asemănătoare cu unific)
- [tower - Shumen 2016 Juniori](https://www.nerdarena.ro/problema/tower) (Nu vă speriați că este de la Shumen, problema este doar o aplicație la stack_max_min)
- [maxp - ONI 2013 VIII](https://kilonova.ro/problems/836) (O altă aplicație la problema stack_max_min)
- [changemin - ONI 2022 X](https://kilonova.ro/problems/1602) (O aplicație similară cu stack_max_min)
- [CF 1905C](https://codeforces.com/contest/1905/problem/C) (Problemă a cărei rezolvare se folosește de tehnica de la stack_max_min)
- [CF 1905D](https://codeforces.com/contest/1905/problem/D) (Problemă a cărei rezolvare se folosește de tehnica de la stack_max_min)
- [CF 1909C](https://codeforces.com/contest/1909/problem/C) (Problemă care are o rezolvare cu tehnica de la stack_max_min)
- [reactii - ONI 2009 X](https://kilonova.ro/problems/1325) (Problemă asemănătoare cu unific)
- [dag - ONI 2019 Baraj Seniori](https://kilonova.ro/problems/410) (Problemă care se folosește de tehnica de la stack_max_min)
- [leftmax - OJI 2020 X](https://kilonova.ro/problems/929) (Problemă care se folosește de tehinca de la stack_max_min)

## Bibliografie și lectură suplimentară

- [std::stack - cppreference](https://en.cppreference.com/w/cpp/container/stack)
- [Articolul de pe USACO Guide despre stivă](https://usaco.guide/gold/stacks?lang=cpp)
- [Un video despre stivă, pentru a vă ajuta să înțelegeți mai bine acest concept.](https://www.youtube.com/watch?v=I37kGX-nZEI)
- [Un video despre analiza amortizată, vă va ajuta să înțelegeți mai bine rezolvarea problemei *stack_max_min* și de ce are complexitatea $\mathcal{O}(N)$](https://www.youtube.com/watch?v=T7W5E-5mljc)
- [Algopedia - Stive](https://www.algopedia.ro/wiki/index.php/Clasa_a_VII-a_lec%C8%9Bia_2_-_26_sep_2019#Stive)
- [Algopedia - Analiza amortizată, mai multe detalii despre problema stack_max_min](https://www.algopedia.ro/wiki/index.php/Clasa_a_VII-a_lec%C8%9Bia_11_-_21_nov_2019#Lec%C8%9Bie_-_analiz%C4%83_amortizat%C4%83)
