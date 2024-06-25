**Autor**: Ștefan-Cosmin Dăscălescu

## Fundamente și cunoștințe necesare

În foarte multe probleme de algoritmică, un pas important în rezolvarea
problemelor constă în ordonarea datelor de intrare după un anumit criteriu, iar
o întrebare care se pune este cum putem să ordonăm datele convenabil, cât mai
rapid posibil?

Din fericire, de-a lungul timpului s-au inventat foarte mulți algoritmi de
sortare pe care îi putem folosi pentru a rezolva problema pusă mai sus. Pentru a
face înțelegerea lor ușoară, voi explica algoritmii în ordine crescătoare a
dificultății lor de înțelegere, precum și în ordine crescătoare a performanței,
menționând în cazul fiecăruia din algoritmi cunoștințele necesare pentru a-i
putea înțelege și folosi cu succes.

## Algoritmi de sortare în $O(n^2)$

Voi începe prin a explica algoritmii de sortare în $O(n^2)$ deoarece aceștia
sunt de o dificultate similară, singura cunoștință necesară pentru ei fiind
lucrul cu tablouri unidimensionale. Performanțele celor trei algoritmi pe care
îi voi menționa sunt de asemenea foarte similare, dar fiecare din acești
algoritmi are punctele lui tari și slabe. Pentru fiecare secțiune am atașat un
exemplu de ordonare crescătoare a valorilor folosind acest algoritm.

### Selection sort

Sortarea prin selecție sau selection sort este un algoritm elementar de sortare
care verifică fiecare pereche de valori din vector și dacă cele două valori sunt
așezate contrar ordinii folosite la ordonarea lor, le vom schimba între ele.

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

Sortarea prin metoda bulelor sau bubble sort este un algoritm elementar de
sortare care iterează prin valorile din vector cât timp nu sunt ordonate și la
fiecare pas al iterației, dacă găsește două valori adiacente ordonate contrar
ordinii cerute, schimbă între ele valorile și resetează contorul folosit pentru
a decide dacă algoritmul va trebui continuat după sfârșitul iterației curente a
structurii repetitive.

!!! note "Observație"

    Numărul de interschimbări făcut de algoritmul bubble sort
    este egal cu numărul de inversiuni al vectorului dat, observație ce se va
    dovedi a fi foarte utilă pentru multe conținuturi mai avansate.

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

Sortarea prin inserție sau insertion sort este un algoritm elementar de sortare
care pune pe rând fiecare valoare între pozițiile $2$ și $n$ pe poziția
potrivită în ordinea sortată a valorilor până la acea poziție inclusiv.

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

După studiul algoritmilor de mai sus, o întrebare naturală se pune: putem sorta
un șir mai repede de $O(n^2)$? Răspunsul este unul afirmativ, existând foarte
mulți algoritmi de sortare mai rapizi, cei mai rapizi fiind cei în $O(n \log
n)$. Deși în practică în cadrul concursurilor, de regulă ajungem să ne folosim
de funcția std::sort, proprietățile celorlalți algoritmi pot fi utile pentru
înțelegerea anumitor concepte prezentate pe parcurs.

### Funcția std::sort

Se poate spune că de departe cea mai folosită metodă de a ordona un șir în
timpul unei competiții este prin folosirea funcției oferite de limbajul C++
pentru a sorta un șir, această funcție având la spate algoritmul IntroSort, o
combinație între QuickSort, HeapSort și Insertion Sort care preia cele mai bune
caracteristici ale celor trei algoritmi menționați. Aplicarea ei se va dovedi a
fi banală, fiind nevoie de o singură linie de cod.

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

QuickSort sau Sortarea rapidă este o metodă eficientă de sortare a unui tablou,
descoperită de programatorul britanic Tony Hoare. Pentru un set de $n$ valori
oarecare algoritmul efectuează $O(n \log n)$ comparații, dar în cazul cel mai
nefavorabil se efectuează $O(n^2)$ comparații. De regulă, acest algoritm este
mai rapid decât merge sort sau heap sort, dar dacă pivotul este ales favorabil,
cazul cel mai nefavorabil va efectua mereu $O(n \log n)$ comparații.

Algoritmul este de tip divide et impera; el sortează o secvență a tabloului
(inițial întreg tabloul), astfel:

- se alege un element special al listei, numit pivot;
- se ordonează elementele listei, astfel încât toate elementele din stânga
  pivotului să fie mai mici sau egale cu acesta, și toate elementele din dreapta
  pivotului să fie mai mari sau egale cu acesta;
- se continuă recursiv cu secvența din stânga pivotului și cu cea din dreapta
  lui.

### Merge Sort

MergeSort este o metodă eficientă de sortare a unui tablou, inventată de
programatorul John von Neumann. Pentru un set de $n$ valori oarecare algoritmul
efectuează $O(n \log n)$ comparații, algoritmul fiind același indiferent de
modul în care sunt așezate valorile. Algoritmul funcționează în felul următor.

- Avem lista curentă, o împărțim în două jumătăți egale.
- Rulăm algoritmul pe fiecare din cele două jumătăți.
- Se interclasează cele două șiruri rezultate.

Este de remarcat că acest algoritm poate fi folosit pentru a calcula numărul de
inversiuni al unui șir.

### Heap Sort

Heap sort este un algoritm de sortare care la fiecare pas selectează valoarea
minimă folosind structura de date potrivită (un heap, un arbore de intervale, un
set etc.) și de aceea poate fi descris și drept un selection sort cu structura
de date potrivită. La fiecare pas se află valoarea minimă din șir și se
interschimbă valorile de pe cea mai din stânga poziție nefixată cu valoarea de
pe poziția minimă găsită.

## Sortare cu comparator special

Uneori, criteriul după care sortăm un șir poate fi mai dificil de configurat de
către `#!cpp std::sort`, așa că de multe ori suntem nevoiți să implementăm
logica proprie de comparator. De cele mai multe ori, acesta va fi implementat
drept o funcție bool, care ia ca parametru două valori ale șirului ce vrem să îl
ordonăm și le verificăm folosind criteriul dorit. În secvența de mai jos, avem o
structură str și vom sorta datele de intrare din structură folosind drept
criteriu de comparare suma valorilor din pereche. Se poate observa faptul că
funcția de comparare este apelată de, în acest caz, `#!cpp std::sort`.

```cpp
constexpr int N = 100;

struct Foo {
    int a, b;
};

Foo v[N + 1];

bool cmp(const Foo x, const Foo y) {
    return (x.a + x.b) < (y.a + y.b);
}

sort(v + 1, v + n + 1, cmp);

// Alternativ (vom elabora într-o lecție viitoare):
vector<Foo> foos(N + 1);

sort(foos.begin(), foos.end(),
     [](const Foo x, const Foo y) {
        return (x.a + x.b) < (y.a + y.b);
     });
```

## Algoritmi speciali de sortare

### Counting Sort

Counting sort este un algoritm de sortare folosit atunci când avem un număr mic
de elemente distincte, care pot fi ținute într-un vector de frecvență. Acest
algoritm se poate folosi și dacă intervalul în care sunt așezate valorile este
unul mic, complexitatea fiind în ambele cazuri $O(n + k)$, unde $n$ este numărul
de valori din șir, iar $k$ este diferența dintre cea mai mare și cea mai mică
valoare din șir.

### Radix Sort

Radix sort este un algoritm de sortare folosit atunci când vrem să grupăm
elementele în funcție de cifrele lor, de la cea mai semnificativă la cea mai
nesemnificativă, acest algoritm fiind util într-o serie de probleme ce implică
prelucrarea cifrelor și numerelor în diferite moduri.

## Concluzii și probleme suplimentare

Algoritmii de sortare sunt foarte utili pentru a înțelege bazele multor
algoritmi, diversele metode folosite regăsindu-se în foarte multe tipuri de
probleme, dar și în anumite optimizări care pot fi găsite pentru a evita
tratarea anumitor probleme într-o manieră prea generică.

Acești algoritmi ajung să fie folosiți în foarte multe tipuri de probleme, cele
mai frecvente fiind aplicațiile tip greedy dar și alte probleme în care sortarea
poate consta un pas spre a procesa mai ușor datele de intrare, precum căutarea
binară, diverse probleme ce implică structuri de date și așa mai departe.

### Probleme de la olimpiade

- [perechi kilonova](https://kilonova.ro/problems/1946)
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
