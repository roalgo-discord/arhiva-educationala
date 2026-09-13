---
id: debugging
tags:
    - meta
    - sfaturi
    - debugging
---

## Introducere

Atunci când scrieți programe pentru a rezolva diverse probleme de algoritmică,
veți avea de-a face în mod inevitabil cu bug-uri (erori/greșeli) care vă fac
soluția să fie greșită. În acest articol, vom prezenta cele mai importante
lucruri pe care să le aveți în vedere atunci când scrieți soluții, precum și
metode pe care să le folosiți când soluțiile sunt greșite.

## Cele mai frecvente erori de implementare

În cele mai multe cazuri, erorile apar din cauza unor greșeli ce pot fi evitate.
Dintre cele mai frecvente motive pentru care apar bug-urile, vom enumera
următoarele:

### Variabile neinițializate

Uneori, poți avea nevoie de variabile locale, fie că e vorba într-o funcție sau
chiar în funcția main. Inițializare acestor variabile este obligatorie, iar
nerespectarea acestei reguli poate duce la erori ce de multe ori nu sunt
depistate de mediul vostru de lucru. De exemplu, $s$ ar trebui să fie egal cu
385 la final, dar deoarece această variabilă nu este inițializată, răspunsul
va fi diferit.

!!! note "Observație"

    În funcție de setările mediului vostru, outputul poate fi 385. Totuși,
    acesta este un undefined behavior, așa cum vom vorbi și mai târziu în acest
    articol.

```cpp
int n = 10;
int s;
for (int i = 1; i <= n; i++) {
    s += i * i;
}

cout << s << '\n';
```

### Overflow-uri

!!! info "Definiție"

    Situația în care o variabilă care poate avea o valoare mai mare decât
    limitele tipului de date care îi este asignat se numește overflow.

Un astfel de exemplu este atunci când o valoare poate fi egală cu $n^2$ iar $n
\leq 10^5$. Deoarece operațiile efectuate cu două variabile cu același tip de
date ne returnează o variabilă cu același tip de date, produsele sau ridicările
la putere sunt vulnerabile la overflow-uri, precum și sumele ce implică mulți
termeni mai mari.

```cpp
int n = 100000;
cout << n * (n + 1) / 2 << '\n';        // overflow
cout << 1LL * n * (n + 1) / 2 << '\n';  // ok
```

### Condiții scrise prost

În cazul unor structuri alternative, folosirea proastă a unor operatori logici
și de egalitate poate duce la schimbarea totală a rezultatelor.

De exemplu, aici plasarea egalității din if-uri trebuie să fie corectă, altfel
instrucțiunile devin total diferite. În mod similar, putem avea aceeași eroare
când folosim operatori precum `&&`, `||`, dacă folosim `&`, `|` etc.

```cpp
if (x == 3) {  // se verifica daca x = 3
    // cod
}
if (x = 3) {  // x devine 3, dupa se verifica daca este nenul
}
```

### Erori off by one

În multe calcule, se poate întâmpla să aveți valori greșite sau semne puse prost
(de exemplu, $>=$ în loc de $>$) iar aceste lucruri să cauzeze programul să se
ruleze într-un mod complet diferit.

O altă eroare care intră în aceeași categorie constă în folosirea greșită a
variabilelor atunci când se apelează la structuri repetitive imbricate. Un
exemplu foarte des întâlnit de bug care apare aici este folosirea variabilelor
$i$ și $j$ la foruri, incrementările fiind scrise eronat, un exemplu de cod
eronat este dat mai jos.

Acest cod va rula la infinit, practic fiind un caz de loop care va rula fără
oprire.

```cpp
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= n; i++) {}
}
```

O altă eroare off by one reprezintă împărțirea la zero, operație neacceptată în
matematică și în informatică.

### Ieșirea din tablouri

De obicei, dacă avem o poziție care este accesată dar nu există în șir, atunci
programul se va opri din rulat și veți avea un verdict de tipul runtime error
(programul iese cu un verdict diferit de 0). Dintre cele mai frecvente
situații în care apar erori, putem menționa accesările pozițiilor negative sau
pozițiilor prea mari. Mai jos găsiți exemple în care avem de-a face cu asemenea
erori.

```cpp
for (int i = n; i >= 1; i++) {  // i creste si vom iesi din vector
    cout << v[i] << " ";
}
```

```cpp
#include <iostream>
#include <vector>

using namespace std;

int main() {
    vector<int> arr = {1, 2, 3, 4, 5};
    int maxIndex = 100;

    for (int i = 0; i < maxIndex; ++i) {
        arr[i] = arr[i] * 2;
        cout << arr[i] << '\n';
    }

    return 0;
}
```

### Undefined behavior

!!! note "Undefined behavior"

    Atunci când accesăm memorie care nu există, dar programul nu se oprește din
    rulat, avem de-a face cu o situație ce se numește undefined behavior.

```cpp
#include <iostream>
using namespace std;

int main() {
    int arr[8] = {1, 2, 3, 4, 5};

    cout << arr[5] << '\n';
    cout << arr[-1] << '\n';  // undefined behavior, vom avea erori la rulare

    return 0;
}
```

## Cum eviți erorile de implementare?

În general, pentru a evita aceste erori de implementare, se recomandă urmarea
unui stil de cod prietenos cu cititorul și cel mai important, un stil citibil.
Acest lucru este important atât pentru rezolvarea problemei curente, dar și
pentru cazurile când veți avea nevoie să citiți codul ulterior.

Nu în ultimul rând, aceste coduri pot fi citite de alți utilizatori, iar
codurile scrise frumos sunt mult mai ușor de urmărit, astfel puteți ajuta și
alți oameni să înțeleagă anumite tehnici mai bine.

Alte lucruri importante pe care le puteți face sunt verificarea cu atenție a
restricțiilor din enunț, care vă pot induce în eroare uneori când vine vorba de
anumite detalii de implementare.

## Cele mai frecvent întâlnite erori la idee

În mod evident, dacă ideea de la care pleacă soluția voastră este complet
greșită, trebuie să vă gândiți iar și să analizați cu mai multă atenție ce aveți
de făcut și cum puteți rezolva problema dată. Totuși, punctajul de 100 poate
fi mai aproape de voi decât ați crede, chiar și după un verdict de 0.

Câteva dintre cele mai dese erori care se fac și pot fi reparate repede sunt
următoarele:

- Cazurile particulare (corner cases): În multe probleme, cazuri precum $N = 1$,
  valori cu proprietăți specifice sau anumite tipuri de inputuri pot pune
  probleme dacă acele cazuri nu sunt tratate cum trebuie.
- Enunț citit greșit: Da, de foarte multe ori se poate întâmpla să citiți
  enunțul greșit și să rezolvați o problemă complet diferită.
- Extinderea unor idei poate fi calea spre succes: Dacă aveți o idee
  promițătoare dar sunteți blocați la un pas al rezolvării, particularizarea
  ideii pentru anumite tipuri de date poate fi foarte utilă.
- Algoritm/metodă neoptimă: În acest caz, optimizările sunt necesare sau în
  unele cazuri, chiar schimbarea completă a algoritmului folosit pentru
  rezolvarea problemei.
- Resetarea greșită a datelor: În special în cazul problemelor cu multitest
  (rezolvarea mai multor seturi de date într-o rulare a programului), resetarea
  greșită a datelor poate duce la erori în ceea ce privește calcularea
  răspunsului

## Moduri de a rula algoritmul

Atunci când vi se întâmplă să aveți un algoritm ce returnează răspunsuri
greșite, vreți să vă puteți da seama ce părți din algoritm fac lucrurile greșit.
În general, deoarece datele cu care lucrați pot fi foarte mari, vrem să ne
concentrăm pe evaluarea unor teste mici, care să poată fi citibile cu ușurință
și eventual comparate fie cu rezultatele obținute pe hârtie, fie cu rezultatele
obținute de un algoritm brute-force.

### Folosirea liniilor de afișare a datelor

Cea mai simplă și una dintre cele mai eficiente tehnici de reparare a unui cod
este folosirea unor rânduri în care afișăm date în consolă, pentru a evalua
evoluția unor variabile. De obicei, vrem să facem asta cu răspunsurile afișate
sau cu unele rezultate intermediare ce duc la răspunsul căutat. Acest lucru se
poate face în multe moduri, dar cel mai simplu mod este acela de a folosi
instrucțiuni de tip cout.

Exemplul de mai jos este pur didactic, neavând vreo însemnătate în mod
particular.

```cpp
#include <iostream>
using namespace std;

int x = 10;

int main() {
    cout << "x = " << x << '\n';  // 10
    x = 5000;
    cout << "x = " << x << '\n';  // 5000
}
```

### Folosirea debuggerului

Multe editoare de cod (printre care și Code::Blocks) oferă acces la un debugger,
acesta fiind un instrument care poate fi folosit pentru a urmări evoluția unor
variabile de-a lungul codului fără a fi nevoie de afișarea lor în diverse
poziții din cod. Acest instrument poate avea multe avantaje, dar în cazul unui
mediu de concurs încet (de exemplu, calculatoarele de la școli), poate fi
anevoios și greu de utilizat.

### Stress testing

O metodă foarte importantă și utilă în special atunci când bug-urile sunt greu
de găsit constă în crearea unui program (sau mai multe) care să poată genera
teste de evaluare care să folosească la evaluarea sursei scrise de tine. Aceste
teste, odată create, pot fi rulate pentru a depista erori. În general, vrei să
ai un program corect, dar încet și un program rapid, dar greșit, care va fi
corectat (sau demonstrat că este eronat indiferent de situație). Unele metode
implică și folosirea unui program separat pentru generarea datelor de intrare.

În ceea ce privește generatorul de teste, vrem să putem genera foarte multe
teste mici (valori ale lui $n$ suficient de mici care să poată permite unei
soluții brute să se miște repede), cu scopul de a detecta un test de evaluare
pentru care cele două programe să dea un răspuns diferit.

### Stress testing cu un singur program

Una dintre cele mai ușoare metode (și cea mai practică în condițiile unor
concursuri fizice) este aceea cu un singur program. Modul de funcționare constă
în adăugarea programelor menționate anterior drept funcții într-un program, iar
mai apoi, folosim un generator suficient de puternic și teste bine create pentru
a detecta eventualele bug-uri.

Un exemplu de cod poate fi găsit mai jos.

```cpp
#include <bits/stdc++.h>
using namespace std;

mt19937_64 rnd;  // 64-bit
long long val(bool positive) {
    long long ans = rnd();
    if (positive) {
        return abs(ans);
    } else {
        return ans;
    }
}

/*
    Aici adaugam variabilele pe care le vom folosi, trebuie sa fim atenti pentru
   ca uneori avem nevoie de copii pentru valorile noastre

*/

// Aici generam datele de intrare, de regula se recomanda un input mic pentru
// rezultate optime
void gentest() {}

// Aici adaugam o solutie corecta, foarte inceata, care va fi folosita pentru a
// evalua solutia eficienta
int bruteforce() {}

// Aici adaugam solutia eficienta, care desi este rapida, este incorecta si vrem
// s-o reparam
int efficient() {}

//  Daca raspunsurile sunt diferite, vom afisa inputul aici
void printinput() {}

int main() {
    // alegem seedul aleator pentru a avea rezultate diferite mereu
    int seed = std::random_device{}();
    rnd.seed(seed);

    int t = 0;
    while (t <= 10000) {
        gentest();
        int brute = bruteforce();
        int eff = efficient();
        if (brute != eff) {
            cout << "Brute: " << brute << '\n';
            cout << "Efficient: " << eff << '\n';
            printinput();
            return 0;
        }
    }
    return 0;
}
```

### Stress testing cu 3 programe

Procesul va fi similar, diferența fiind aceea că pentru a avea programe mai mici
ca dimensiune, se vor folosi comenzi de terminal pentru rularea programelor în
mod concomitent, până când se vor obține răspunsuri diferit între programe.

## Concluzii

Debugging-ul este una dintre cele mai importante tehnici pentru orice
programator, iar indiferent de metoda folosită, repararea soluțiilor greșite
este un pas esențial pentru a progresa indiferent că e vorba de a fi un
competior mai bun sau a putea opera mai eficient în ceea ce privește proiecte
mai complexe.

## Resurse suplimentare

- [O abordare eficientă a problemelor de informatică -
  Nerdvana](https://nerdvana.ro/sfaturi-pentru-olimpiada-o-abordarea-eficienta-a-problemelor-de-informatica/)
- [Compilation and Debugging Tutorial -
  Codeforces](https://codeforces.com/blog/entry/79024)
- [How to Debug - USACO
  Guide](https://usaco.guide/general/debugging-checklist?lang=cpp)
- [Basic Debugging - USACO
  Guide](https://usaco.guide/general/basic-debugging?lang=cpp)
- [How to test your solution? -
  Errichto](https://www.youtube.com/watch?v=JXTVOyQpSGM)
