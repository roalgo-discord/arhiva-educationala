---
tags:
    - sortare
    - optimizare
---

**Autor**: Ștefan-Cosmin Dăscălescu

## Fundamente și cunoștințe necesare

În foarte multe probleme de algoritmică, un pas important în rezolvarea problemelor constă în ordonarea datelor de intrare după un anumit criteriu, iar o întrebare care se pune este cum putem să ordonăm datele convenabil, cât mai rapid posibil?

Din fericire, de-a lungul timpului s-au inventat foarte mulți algoritmi de sortare pe care îi putem folosi pentru a rezolva problema pusă mai sus. Pentru a face înțelegerea lor ușoară, voi explica algoritmii în ordine crescătoare a dificultății lor de înțelegere, precum și în ordine crescătoare a performanței, menționând în cazul fiecăruia din algoritmi cunoștințele necesare pentru a-i putea înțelege și folosi cu succes.

## Algoritmi de sortare în $O(n^2)$

Voi începe prin a explica algoritmii de sortare în $O(n^2)$ deoarece aceștia sunt de o dificultate similară, singura cunoștință necesară pentru ei fiind lucrul cu tablouri unidimensionale. Performanțele celor trei algoritmi pe care îi voi menționa sunt de asemenea foarte similare, dar fiecare din acești algoritmi are punctele lui tari și slabe. Pentru fiecare secțiune am atașat un exemplu de ordonare crescătoare a valorilor folosind acest algoritm.

### Selection sort

Sortarea prin selecție sau selection sort este un algoritm elementar de sortare care verifică fiecare pereche de valori din vector și dacă cele două valori sunt așezate contrar ordinii folosite la ordonarea lor, le vom schimba între ele.

```cpp
int v[1001], n;

for (int i = 1; i < n; i++) {
    for (int j = i + 1; j <= n; j++) {
        if (v[i] > v[j]) {
            int aux = v[i];
            v[i] = v[j];
            v[j] = aux;
        }
    }
}
```

### Bubble sort

Sortarea prin metoda bulelor sau bubble sort este un algoritm elementar de sortare care iterează prin valorile din vector cât timp nu sunt ordonate și la fiecare pas al iterației, dacă găsește două valori adiacente ordonate contrar ordinii cerute, schimbă între ele valorile și resetează contorul folosit pentru a decide dacă algoritmul va trebui continuat după sfârșitul iterației curente a structurii repetitive.

!!! note "Observație"
    Numărul de interschimbări făcut de algoritmul bubble sort este egal cu numărul de inversiuni al vectorului dat, observație ce se va dovedi a fi foarte utilă pentru multe conținuturi mai avansate.

```cpp
int v[1001], n;
bool ok = true;

while (ok == true) {
    ok = false;

    for (int i = 1; i < n; i++) {
        if (v[i] > v[i + 1]) {
            int aux = v[i];
            v[i] = v[i + 1];
            v[i + 1] = aux;
            ok = false;
        }
    }
}
```

### Insertion sort

Sortarea prin inserție sau insertion sort este un algoritm elementar de sortare care pune pe rând fiecare valoare între pozițiile $2$ și $n$ pe poziția potrivită în ordinea sortată a valorilor până la acea poziție inclusiv.

```cpp
int v[1001], n;

for (int i = 2; i <= n; i++) {
    for (int j = i - 1; j >= 1; j--) {
        if (v[j] > v[j + 1]) {
            int aux = v[j];
            v[j] = v[j + 1];
            v[j + 1] = aux;
        }
    }
}
```

## Algoritmi de sortare în $O(n \log n)$

După studiul algoritmilor de mai sus, o întrebare naturală se pune: putem sorta un șir mai repede de $O(n^2)$? Răspunsul este unul afirmativ, existând foarte mulți algoritmi de sortare mai rapizi, cei mai rapizi fiind cei în $O(n \log n)$. 

Deși în practică în cadrul concursurilor, de regulă ajungem să ne folosim de funcția `std::sort`, proprietățile celorlalți algoritmi pot fi utile pentru înțelegerea anumitor concepte prezentate pe parcurs, iar pentru cititorii care se pregătesc pentru interviurile de angajare sau pentru admiterea la universitățile de top din străinatate, pot apărea întrebări care să conțină elemente ale înțelegerii algoritmilor de sortare explicați mai jos.

### Funcția std::sort

Se poate spune că de departe cea mai folosită metodă de a ordona un șir în
timpul unei competiții este prin folosirea funcției oferite de limbajul C++
pentru a sorta un șir, această funcție având la spate algoritmul IntroSort, o
combinație între QuickSort, HeapSort și Insertion Sort care preia cele mai bune
caracteristici ale celor trei algoritmi menționați. Aplicarea ei se va dovedi a
fi banală, fiind nevoie de o singură linie de cod. Se găsește în biblioteca `algorithm`.

Pentru a scrie funcția, trebuie să știm adresa de început (de regulă, poziția
$0$ sau $1$ din șir) și adresa de final, cea de final fiind incrementată cu $1$
deoarece intervalul pe care îl vom folosi pentru funcția descrisă este închis la
stânga și deschis la dreapta. După cum se va observa mai jos, vom putea adăuga
funcții de comparare pentru a folosi `#!cpp std::sort` la valoarea sa adevărată.
Mai jos am atașat două exemple de aplicare a funcției, pe vector indexat de la
$0$, respectiv $1$.

```cpp
int v[1001], n;

sort(v + 1, v + n + 1);

vector<int> vx(1002);
sort(vx.begin(), vx.begin() + 500);

vector<int> vy(2001);
sort(vx.begin() + 1, vx.end());
```

### Quick Sort

QuickSort sau Sortarea rapidă este o metodă eficientă de sortare a unui tablou, descoperită de programatorul britanic Tony Hoare. Pentru un set de $n$ valori oarecare algoritmul efectuează $O(n \log n)$ comparații, dar în cazul cel mai nefavorabil se efectuează $O(n^2)$ comparații. De regulă, acest algoritm este mai rapid decât merge sort sau heap sort atâta timp cât pivotul este ales favorabil, cazul cel mai nefavorabil va efectua mereu $O(n \log n)$ comparații.

Algoritmul este de tip divide et impera; el sortează o secvență a tabloului (inițial întreg tabloul), astfel:

- se alege un element special al listei, numit pivot;
- se ordonează elementele listei, astfel încât toate elementele din stânga pivotului să fie mai mici sau egale cu acesta, și toate elementele din dreapta pivotului să fie mai mari sau egale cu acesta;
- se continuă recursiv cu secvența din stânga pivotului și cu cea din dreapta lui.

!!! note "Observație"
    Se recomandă alegerea pivotului într-un mod aleator, deoarece alegerea pivotului într-o poziție previzibilă (la început, la mijloc sau la sfârșit duce la cazuri nefavorabile) poate duce la soluții care în cel mai rău caz să aibă o complexitate de $O(n^2)$.

```cpp
vector<int> quicksort (vector<int> v) {
    if(v.size() == 0) {
        return v;
    }
    ll pivot = 1LL * rand() * rand();
    pivot %= (v.size());
    vector<int> greater, smaller, a, b;
    int same_value = 0;
    for (int i = 0; i < v.size(); ++i) {
        if (v[i] < v[pivot]) {
            smaller.push_back(v[i]);
        }
        else {
            if (v[i] == v[pivot]) {
                ++same_value;
            }
            else {
                greater.push_back(v[i]);
            }
        }
    }
    if (same_value == v.size()) {
        return v;
    }
    a = quicksort(greater);
    b = quicksort(smaller);
    vector<int> answer;
    for (int i = 0; i < b.size(); ++i) {
        answer.push_back(b[i]);
    }
    for (int i = 0; i < same_value; ++i) {
        answer.push_back(v[pivot]);
    }
    for (int i = 0; i < a.size(); ++i) {
        answer.push_back(a[i]);
    }
    return answer;
}
```

### Merge Sort

MergeSort este o metodă eficientă de sortare a unui tablou, inventată de programatorul John von Neumann. Pentru un set de $n$ valori oarecare algoritmul efectuează $O(n \log n)$ comparații, algoritmul fiind același indiferent de modul în care sunt așezate valorile. Algoritmul funcționează în felul următor.

- Avem lista curentă, o împărțim în două jumătăți egale.
- Rulăm algoritmul pe fiecare din cele două jumătăți.
- Se interclasează cele două șiruri rezultate.

Acest algoritm folosește principiul Divide et Impera, principiu despre care puteți studia mai multe în acest articol. 

!!! note "Observație"
    Este de remarcat că acest algoritm poate fi folosit pentru a calcula numărul de inversiuni al unui șir.

```cpp
void mergesort (vector<int> &v, int L, int R) {
    if (L == R) {
        return;
    }
    
    int mid = (L + R) / 2;
    mergesort(v, L, mid);
    mergesort(v, mid+1, R);
    
    vector<int> sorted;
    int Lx = L;
    int Rx = mid + 1;
    while (Lx <= mid && Rx <= R) {
        if (v[Lx] <= v[Rx]) {
            sorted.push_back(v[Lx]);
            Lx++;
        }
        else {
            sorted.push_back(v[Rx]);
            Rx++;
        }
    }
    
    while (Lx <= mid) {
        sorted.push_back(v[Lx]);
        Lx++;
    }
    while (Rx <= R) {
        sorted.push_back(v[Rx]);
        Rx++;
    }
    for (int i = L; i <= R; i++) {
        v[i] = sorted[i - L];
    }
}
```

### Heap Sort

Heap sort este un algoritm de sortare care la fiecare pas selectează valoarea minimă folosind structura de date potrivită (un heap, un arbore de intervale, un set etc.) și de aceea poate fi descris și drept un selection sort cu structura de date potrivită. La fiecare pas se află valoarea minimă din șir și se interschimbă valorile de pe cea mai din stânga poziție nefixată cu valoarea de pe poziția minimă găsită.

Funcția heapSort este apelată din main folosind metoda heapSort, functia heapify fiind o funcție auxiliară care are drept scop plasarea valorii curente astfel încât să se păstreze structura de heap.  

```cpp
void heapify(vector<int> &v, int n, int pos)
{
    int largest = pos, l = 2 * pos + 1, r = 2 * pos + 2;
    if (l < n && v[l] > v[largest]) {
        largest = l;
    }
    if (r < n && v[r] > v[largest]) {
        largest = r;
    }
    if(largest != pos) {
        swap(v[pos], v[largest]);
        heapify(v, n, largest);
    }
}

void heapSort(vector<int> &v, int n)
{
    for (int i = n/2 - 1; i >= 0; i--) {
        heapify(v, n, i);
    }
    for (int i = n - 1; i>=0; i--) {
        swap(v[0], v[i]);
        heapify(v, i, 0);
    }
}
```

## Sortare cu comparator special

Uneori, criteriul după care sortăm un șir poate fi mai dificil de configurat de către `#!cpp std::sort`, așa că de multe ori suntem nevoiți să implementăm logica proprie de comparator. De cele mai multe ori, acesta va fi implementat drept o funcție bool, care ia ca parametru două valori ale șirului ce vrem să îl ordonăm și le verificăm folosind criteriul dorit. În secvența de mai jos, avem o structură str și vom sorta datele de intrare din structură folosind drept criteriu de comparare suma valorilor din pereche. Se poate observa faptul că funcția de comparare este apelată de, în acest caz, `#!cpp std::sort`.

```cpp
constexpr int N = 100;

struct Foo {
    int a, b;
};

Foo v[N + 1];

bool cmp(const Foo x, const Foo y) {
    return (x.a + x.b) < (y.a + y.b);
}

sort(v + 1, v + N + 1, cmp);

// Alternativ (vom elabora într-o lecție viitoare):
vector<Foo> foos(N + 1);

sort(foos.begin(), foos.end(),
     [](const Foo x, const Foo y) {
        return (x.a + x.b) < (y.a + y.b);
     });
```

## Sortarea folosind structuri din STL

Deși această metodă este mai înceată comparat cu alte metode menționate anterior, merită menționată drept o utilizare suplimentară a structurilor din STL. Structuri de date precum `std::map`, `std::set`, `std::multiset` sau `std::priority_queue` pot fi folosite cu succes pentru a simula aceste sortări în aceeași complexitate cu cea optimă, dar cu o constantă mai slabă, ceea ce nu le face practice atunci când avem nevoie să sortăm datele rapid. 

Mai jos găsiți un exemplu de implementare cu `std::multiset`.

```cpp
multiset<int> s;
for (int i = 0; i < n; i++) {
    s.insert(v[i]);
}

vector <int> sorted;
for (auto x : s) {
    sorted.push_back(x);
}
```

## Algoritmi speciali de sortare

### Counting Sort

Counting sort este un algoritm de sortare folosit atunci când avem un număr mic de elemente distincte, care pot fi ținute într-un vector de frecvență. Acest algoritm se poate folosi și dacă intervalul în care sunt așezate valorile este unul mic, complexitatea fiind în ambele cazuri $O(n + k)$, unde $n$ este numărul de valori din șir, iar $k$ este diferența dintre cea mai mare și cea mai mică valoare din șir.


!!! note "Observație"
    Este de remarcat că acest algoritm poate fi implementat și folosind `std::map`, complexitatea de timp fiind mai mare cu $\log n$ din cauza operațiilor specifice acestei structuri de date. 

```cpp
int n;
cin >> n;

vector <int> v(n);
vector <int> frq(MAXVAL);
for (int i = 0; i < n; i++) {
    cin >> v[i];
    frq[v[i]]++;
}

int pos = 0;
for (int i = 0; i < MAXVAL; i++) {
    while (frq[i]) {
        v[pos] = i;
        frq[i]--;
        pos++;
    }
}
```

### Radix Sort

Radix sort este un algoritm de sortare folosit atunci când vrem să grupăm elementele în funcție de cifrele lor, de la cea mai semnificativă la cea mai nesemnificativă, acest algoritm fiind util într-o serie de probleme ce implică[ prelucrarea cifrelor și numerelor în diferite moduri.

```cpp
void radix_sort(vector<int> v, int pwr) {
    if (pwr == 0) {
        for(int i = 0; i < v.size(); ++i)
            v2[poz++] = v[i];
        return;
    }
    vector<int> a[10];
    for (int i = 0; i < v.size(); ++i) {
        int val = v[i] % pwr;
        if (pwr != 1) {
            val /= (pwr/10);
        }
        a[val].push_back(v[i]);
    }
    for (int i = 0; i < 10; ++i) {
        if (!a[i].empty()) {
            radix_sort(a[i], pwr/10);
        }
    }
}
```

## Concluzii și probleme suplimentare

Algoritmii de sortare sunt foarte utili pentru a înțelege bazele multor algoritmi, diversele metode folosite regăsindu-se în foarte multe tipuri de probleme, dar și în anumite optimizări care pot fi găsite pentru a evita tratarea anumitor probleme într-o manieră prea generică.

Acești algoritmi ajung să fie folosiți în foarte multe tipuri de probleme, cele mai frecvente fiind aplicațiile tip greedy dar și alte probleme în care sortarea poate consta un pas spre a procesa mai ușor datele de intrare, precum căutarea binară, diverse probleme ce implică structuri de date și așa mai departe.

### Probleme de la olimpiade

- [perechi kilonova](https://kilonova.ro/problems/1946)
- [Probleme cu sortari de pe pbinfo](https://www.pbinfo.ro/probleme/categorii/3/tablouri-unidimensionale-vectori-sortarea-vectorilor)
- [sir OJI 2005](https://kilonova.ro/problems/740)
- [USACO Bronze Acowdemia I](https://usaco.org/index.php?page=viewproblem2&cpid=1131)
- [Pergament OJI 2023](https://kilonova.ro/problems/643)
- [pseudocmp OJI 2022](https://kilonova.ro/problems/945)
- [yinyang OJI 2019](https://kilonova.ro/problems/650)
- [JOI 2018 Stove](https://oj.uz/problem/view/JOI18_stove)
- [JOI 2018 Art Exhibition](https://oj.uz/problem/view/JOI18_art)
- [InfoPro insertsort](https://kilonova.ro/problems/1025)
- [probleme cu sortare de pe Kilonova](https://kilonova.ro/tags/349)
- [High Card Low Card USACO Gold](https://usaco.org/index.php?page=viewproblem2&cpid=573)

### Probleme de pe alte siteuri

- [Distinct Numbers](https://cses.fi/problemset/task/1621)
- [Movie Festival](https://cses.fi/problemset/task/1629)
- [Towers](https://cses.fi/problemset/task/1073)
- [Kayaking](https://codeforces.com/contest/863/problem/B)
- [Movie Festival II](https://cses.fi/problemset/task/1632)
- [Tasks and Deadlines](https://cses.fi/problemset/task/1630)
- [Permutator](https://codeforces.com/gym/104520/problem/H)
- [Playing in a Casino](https://codeforces.com/contest/1808/problem/B)
- [The Party and Sweets](https://codeforces.com/problemset/problem/1158/A)
- [USB vs. PS/2](https://codeforces.com/contest/762/problem/B)

## Bibliografie și lectură suplimentară

- [Introduction to Sorting - USACO Guide](https://usaco.guide/bronze/intro-sorting?lang=cpp)
- [Greedy Algorithms with Sorting](https://usaco.guide/silver/greedy-sorting?lang=cpp)
- [Sortarea prin numărare](https://cppi.sync.ro/materia/sortarea_prin_numarare.html?hl=sortare)
- [Tutorial Video RoAlgo](https://www.youtube.com/watch?v=4vAsp9xgies)
