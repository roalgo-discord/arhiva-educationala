---
tags:
    - C++
    - implementare
    - structuri de date
---

**Autori**: Ștefan-Cosmin Dăscălescu, Alex Vasiluță

## Introducere

Până acum, programele pe care le-ați scris, deși sunt corecte și compilează în limbajul C++, respectă în mare parte din cazuri sintaxa din C, exemple fiind tablourile, anumite funcții de sistem și în general, modul în care am lucrat cu variabilele și tipurile de date menționate anterior, cu o singură excepție - citirea și afișarea, care s-au făcut conform limbajului C++.

Cu alte cuvinte, putem spune că programele scrise sunt programe de C care au cin și cout. Astfel, pentru a putea folosi limbajul C++ la adevărata sa valoare, se impune folosirea structurilor de date și celorlalte facilități ale acestui limbaj. O mare parte dintre ele sunt înglobate în ceea ce vom numi STL (Standard Template Library) și ne vor ajuta să lucrăm cu foarte multe tipuri de valori într-un mod dinamic, astfel evitând marea majoritate a neajunsurilor lucrului cu structuri din C, chiar și adaptate la limbajul C++.

În acest articol, ne vom concentra pe cele mai folosite facilități, împreună cu modul în care le putem folosi în probleme.

## Structuri de date de tip tablou

În această secțiune, ne vom concentra pe structurile de date care pot fi reprezentate în sintaxa din C sub formă de tablouri. Fie că e vorba de vectori, cozi, stive sau tipuri de date mai complexe, toate acestea vor fi menționate în cele ce urmează.

Deși acest articol poate fi parcurs fără cunoștințe anterioare, se recomandă parcurgerea [articolului anterior despre arrays](https://edu.roalgo.ro/cppintro/arrays/).

### Structura std::vector

Aceasta este cea mai simplă structură de date din STL, fiind un tablou cu lungime dinamică, care este indexat de la $0$. Pentru a putea folosi această structură de date, va trebui să includem biblioteca ``#include <vector>``.

Sintaxa unui vector va fi de tipul ``vector<tip> nume;``, unde tip poate fi orice tip de date cunoscut, inclusiv cele pe care le veți studia în acest articol. Cel mai frecvent, veți folosi un vector drept un înlocuitor pentru tablourile de tip _array_ cu care sunteți obișnuiți din codurile scrise anterior. 

Mai jos, puteți vedea diverse exemple de folosire a acestei structuri de date în limbajul C++.

#### Declarările vectorilor

În ceea ce privește declarările, avem o flexibilitate unică pentru limbajul C++, putând declara și atribui vectorul în foarte moduri, așa cum vom prezenta mai jos. În mod particular, putem să asignăm și chiar să comparăm vectori, folosind operatorii = și ==. 

În general, **complexitatea operațiilor descrise aici este liniară** raportat la numărul de valori cu care se lucrează.

!!! note "Observație"
    Pentru a compara doi vectori, va trebui să aibă aceeași dimensiune și tip de date, iar dacă acest lucru este adevărat, trebuie să aibă toate valorile egale pe aceeași poziție. În mod similar, atribuirea se va face curățând eventual pozițiile în plus existente și adăugând poziții noi dacă e nevoie.

```cpp
vector<int> v; // declararea vectorului
vector<int> vals = {1, 4, 0, 1, 3, 5}; // initializam un vector cu 6 valori
vector<int> v2(12); // initializam un vector cu 12 valori, toate 0
vector<int> copie = v2;
if (v2 == copie) {
    cout << "Egal\n";
}
else {
    cout << "Inegal\n";
}
```

Pentru a declara tablouri bidimensionale, sau chiar tablouri multidimensionale, putem folosi aceeași logică, deoarece acestea sunt vectori de vectori. Aceste tipuri de structuri vor fi folosite și ulterior, în ceea ce privește implementările unor modele matematice sau a unor structuri de date mai complexe despre care veți învăța după ce prindeți mai multă experiență.

```cpp
vector<vector<int>> grid(3, vector<int> (2)); // declararea matricii cu 3 linii si 2 coloane
vector<vector<vector<int>>> cube; // declararea cubului
vector<vector<int>> grid2(n); // declaram n linii
for (int i = 0; i < n; i++) {
    grid2.resize(i+1); // matrice triunghiulara
}
```

#### Inserări, ștergeri și alte ajustări 

Pe lângă declarări, atribuiri și comparări, putem și să ajustăm vectorii, folosind foarte multe tipuri de operații care adaugă și scot valori sau chiar fac inserări în diverse poziții, fără a mai fi nevoie de implementarea manuală a operațiilor. Totuși, se remarcă faptul că operațiile de insert și erase vor fi liniare, exact cum sunt și pe tablourile statice.

!!! note "Iteratori"
    Valori precum v.begin(), v.end() se numesc iteratori, aceștia vor fi prezentați ulterior. Aceștia reprezintă adresa de memorie de la început și de sfârșit din vector.

```cpp
// aceste operatii sunt liniare
grid.resize(5, vector<int>(8)); // gridul va avea 5 linii si 8 coloane 
v2.resize(7, -3); // redimensionam vectorul sa aiba 7 valori, toate -3
v.resize(5); // redimensionam vectorul sa aiba 5 elemente

// aceste operatii se fac in O(1)
v.push_back(x); // adaugarea elementului x la final 
v.pop_back(); // eliminarea elementului de la final

// aceste operatii sunt liniare 
v.insert(v.begin() + 2, 6); // inseram 6 la pozitia 2
v.insert(v.begin() + 3, 5, 9); // inseram 9 de 5 ori incepand de la pozitia 3
v.erase(v.begin() + 4); // stergem valoarea de la pozitia 4
v.erase(v.begin() + 2, v.begin() + 5); // stergem valorile de la pozitia 2 la pozitia 4
```

#### Afișări în vector

Pentru a afișa diverse valori din vector, vom putea proceda la fel ca în cazul tablourilor din C. Se remarcă folosirea funcției size pentru a afla dimensiunea vectorului, această funcție fiind de tip unsigned, lucru ce necesită prelucrarea cu atenție a acestor valori. 

În mod particular, se remarcă folosirea tipului de date **auto**, care este folosit pentru a evita o declarare specifică a unei variabile, fiind folosit în acest caz pentru a parcurge valorile din vectorul vals. 

!!! warning "Tipuri unsigned"
    Dacă vrem să avem un loop care va rula de (v.size() - 3) ori, vom avea de-a face cu un loop infinit în cazul în care v.size() < 3, deoarece rezultatul expresiei va fi si el unsigned, rezultatul dând underflow. Pentru a evita asta, putem fie să rescriem expresiile pentru a conține adunări, fie prin a folosi indicatorul (int) pentru a schimba tipul de date la int, care este un tip de date signed. 

```cpp
// afisari si prelucrari
cout << vals[3] << '\n'; // accesam vals[3], al patrulea element
cout << v2.size() << '\n'; // dimensiunea vectorului (se va afisa 7)
vals[1] = -9;

for (int i = 0; i < (int) vals.size(); i++) { // afisam vectorul vals
    cout << vals[i] << " ";
}

for (auto nr : vals) { // afisam vectorul vals folosind auto
    cout << nr << " ";
}
```

### Structura std::array

Această structură de date este folosită mai rar, dar poate fi utilă în cazul în care vrem să lucrăm cu un array care are avantajele array-urilor din C, dar fără majoritatea dezavantajelor acestora. 

Sintaxa unui array va fi de tipul ``array<tip, dimensiune> nume;``. De regulă, nu există diferențe semnificative de performanță între std::vector și std::array, deci în aproape toate cazurile, putem folosi std::vector fără probleme, funcțiile pe care std::array le are sunt incluse în funcțiile vectorului. 

```cpp
array<int,  25> arr; // array cu 25 de elemente de tip int
arr[4] = 3;
cout << arr[5] << '\n';
```

### Structura std::string

Această structură de date este echivalentul std::vector pentru șirurile de caractere, remarcându-se prin faptul că spre deosebire de șirurile de caractere din C, funcția de aflare a lungimii este $O(1)$, în loc de $O(n)$.

Se recomandă citirea în prealabil a [articolului anterior despre șiruri de caractere](https://edu.roalgo.ro/cppintro/strings/).

De asemenea, toate proprietățile vectorului se aplică și pentru std::string. Pentru a putea folosi această structură de date, va trebui să includem biblioteca ``#include <string>``. Se remarcă faptul că există anumite diferențe față de cum folosim șirurile de caractere din C.

Sintaxa unui string va fi de tipul ``string nume;``

```cpp
string s = "abacaba";
s[0] = 'c';
cout << s.size() << '\n'; // 7
s[6] = 0; // caracterul nul
cout << s << " " << s.size() << '\n'; // abacab 7 (nu se schimba sizeul)
```

În mod particular, pe lângă funcțiile vectorului, vom putea concatena două șiruri de caractere cu ușurință, folosind operatorul +. Totuși, trebuie să fim atenți cum folosim acest operator, pentru a evita efectuarea prea înceată a operațiilor. 

```cpp
string s = "roalgo";
string t = "top";
s += t; // roalgotop
s = s + t; // roalgotoptop
```

Deși în cazul numerelor naturale, aceste operații sunt echivalente, în cazul stringurilor, += și + sunt complet diferite. Prima dintre ele concatenează șirul primit la șirul existent, cea de-a doua copiază cele două șiruri, le unește și apoi atribuie rezultatul șirului. Această diferență devine mai dramatică în situații precum cea de mai jos.

```cpp
string s;
for (int i = 1; i <= 1000000; i++) { // O(n)
    s += 'a';
}
string t;
for (int i = 1; i <= 1000000; i++) { // O(n^2)
    t = t + 'a';
}
```

### Structura std::pair

Această structură de date vă permite să folosiți o combinație de tipuri de date mai complexe, în mod similar cu tipul de date struct pe care l-ați învățat anterior. Un mare avantaj pe care std::pair (și ulterior, std::tuple) îl au este acela că permit instrucțiunilor de sortare să compare două instanțe ale acestui tip de date fără a mai fi nevoie să scriem o funcție suplimentară de comparare a valorilor. 

Sintaxa este ``pair<tip1, tip2> nume;``, unde tip1 și tip2 sunt tipuri de date, care pot fi de toate felurile, inclusiv alte perechi. Pentru a putea accesa tip1, respectiv tip2, va trebui să folosim comenzile nume.first și nume.second. Inițializarea unui pair se poate face similar cu cea a unui vector.

În cazul elementelor de tip pair compuse, în mod similar cu struct, notațiile vor fi la fel compuse.

De exemplu, dacă avem ``pair<pair<int, int>, pair<int, int>> p = {{2, 4}, {1, 3}};``, cele patru elemente vor putea fi declarate și accesate după cum urmează:

```cpp
pair<int, int> pr = make_pair(5, 8);
cout << pr.first << '\n';
cout << pr.second << '\n';
pair<pair<int, int>, pair<int, int>> p = {{2, 4}, {1, 3}};
cout << p.first.first << '\n'; // 2
cout << p.first.second << '\n'; // 4
cout << p.second.first << '\n'; // 1
cout << p.second.second << '\n'; // 3
```

### Structura std::tuple

Această structură de date reprezintă o generalizare a structurii std::pair vă permite să folosiți o combinație de tipuri de date mai complexe, într-o manieră mult mai ușoară decât ați face-o dacă ați folosi pair sau vector, profitând de avantajul că putem ține tipuri de date diferite în fiecare dintre poziții. Pentru a folosi tuple, va trebui să includeți ``#include <tuple>``.

Chiar dacă putem ține valori multiple folosind pairuri imbricate, tuplurile vor face acest lucru mult mai ușor. 

* ``tuple<tip1, tip2, ..., tipN> t``: Creăm un tuplu cu $N$ valori, a i-a valoare având $tip_i$.
* ``make_tuple(a, b, c, ..., d)``: Returnează un tuplu cu valorile scrise în paranteză
* ``tie(a, b, c, ..., d) = t``: Asignăm la $a, b, c, \dots, d$ valorile din tuplul $t$ în ordinea dată. 
* ``get<i>(t)``: Returnează cea de-a i-a valoare din tuplul $t$. Putem folosi această sintaxă și pentru a schimba valoarea din $t$.
    
Această operație merge doar dacă $i$ este o constantă, nu putem schimba valorile dacă $i$ nu este o constantă. 
```cpp
tuple<int,  int,  int> t{3,  4,  5};
int i =  1;
cout << get<i>(t) << '\n';  // eroare
```

Mai jos puteți găsi un exemplu de folosire a acestor instrucțiuni.

```cpp
int a = 3, b = 4, c = 5;
tuple<int, int, int> t = tie(a, b, c);
cout << get<0>(t) << " " << get<1>(t) << " " << get<2>(t) << '\n'; // 3 4 5
get<0>(t)  =  7;
cout << get<0>(t) << " " << get<1>(t) << " " << get<2>(t) << '\n'; // 7 4 5
tuple<string, string, int> tp2 = make_tuple("Hello", "world", 100);

string s1, s2;
int x;
tie(s1, s2, x)  = tp2;
cout << s1 << " " << s2 << " " << x << '\n'; // Hello world 100
}
```

## Iteratori

Iteratorii sunt structuri care pot fi utilizate să identifice și traverseze elementele unui container STL. Ei sunt implementați numai la structurile cu acces aleatoriu (toate mai puțin  `queue`,  `stack`  și  `priority_queue`).

### Glosar iteratori

-  range reprezintă un interval de elemente de tip  `[start, end)`.
-  iterator de început: iterator care marchează începutul unui range.
-  iterator past-the-end: iterator care marchează finalul unui range. Deși uneori poate fi accesat, în cele mai multe cazuri accesarea lui duce la erori (de exemplu, rezultatul pentru  `.end()`).

### Cum obțin un iterator?

-   `.begin()`  - iterator la primul element din structură;
-   `.end()`  - iterator past-the-end pentru structură;
-   `.rbegin()`  - iterator invers la ultimul element din structură;
-   `.rend()`  - iterator invers past-the-beginning pentru structură.

### Ce pot face cu un iterator?

*  Să parcurgi structura
    -   Fiecare iterator permite să îl incrementezi (`++it`) să se ducă mai departe.
    -   Putem folosi și  `it++`, dar de obicei este mai lent.
*  Să îl pui drept parametru la o funcție
    -   Multe funcții din  `<algorithm>`  care merg pe range-uri cer un iterator de început și un iterator "past-the-end".
        -   De exemplu, funcția  `sort()`  cere doi iteratori: unul care marchează începutul și elementul de după sfârșit (cum ar fi  `begin()`  și  `end()`).
    -   Structurile  `std::vector`  și  `std::deque`  oferă și funcțiile  `.erase()`  și  `.insert()`
        -   Funcția  `.insert()`  adaugă un element înaintea elementului iteratorului.
        -   Funcția  `.erase()`  poate primi un singur argument, elementul care să fie șters, sau două argumente, range-ul pe care să îl șteargă.
*  Foarte multe funcții returnează iteratori, exemple fiind funcțiile `lower_bound()` și `upper_bound()` din diverse structuri de date precum `std::set`, `std::map`. 

## Structuri de date liniare

!!! note "Observație"
    Toate aceste structuri de date au în spatele implementării lor din STL o structură de tip deque.

### Structura std::queue

În general, folosim această structură de date pentru a simula funcționalitățile unei cozi. Pentru a folosi std::queue, avem nevoie de biblioteca ``#include  <queue>``.

Deși pentru mai multe detalii, puteți accesa [articolul nostru despre cozi](https://edu.roalgo.ro/mediu/queue/), mai jos puteți găsi un exemplu de folosire a acestor instrucțiuni.

```cpp
queue<int> q;
q.push(2);
q.push(4);
while (!q.empty()) {
    int val = q.front(); // accesam varful cozii
    q.pop();
    cout << val << " "; // afisam 2 4
}
cout << '\n';
```

### Structura std::stack

În general, folosim această structură de date pentru a simula funcționalitățile unei stive. Pentru a folosi std::stack, avem nevoie de biblioteca ``#include  <stack>``.

Deși pentru mai multe detalii, puteți accesa [articolul nostru despre stive](https://edu.roalgo.ro/mediu/stack/), mai jos puteți găsi un exemplu de folosire a acestor instrucțiuni.

```cpp
stack<int> s;
s.push(5);
s.push(8);
while (!s.empty()) {
    int val = s.top(); // accesam varful stivei
    s.pop();
    cout << val << " "; // afisam 8 5
}
cout << '\n';
```

### Structura std::deque

În general, folosim această structură de date pentru a simula funcționalitățile unui deque. Pentru a folosi std::deque, avem nevoie de biblioteca ``#include  <deque>``.

Deși pentru mai multe detalii, puteți accesa [articolul nostru despre deques](https://edu.roalgo.ro/mediu/deque/), mai jos puteți găsi un exemplu de folosire a acestor instrucțiuni.

!!! note "Accesarea pozițiilor oarecare"    
    Spre deosebire de stack și queue, deque permite accesarea pozițiilor oarecare, la fel ca la vector. În multe contexte, putem spune că deque este un vector mai complex, cu toate că un dezavantaj ar fi viteza un pic mai redusă a instrucțiunilor la deque spre deosebire de vector.

```cpp
deque<int> d;
d.push_front(4);
d.push_front(5);
d.push_back(7);
d.push_back(8);
d.push_front(3);

// deque-ul contine 3 5 4 7 8
int x = d[3]; // putem accesa valori din pozitii oarecare, ca la vector

while (!d.empty()) {
    int val = d.front(); // accesam prima valoare
    cout << val << " ";
    d.pop_front(); // stergem prima valoare
    if (d.size() > 0) {
        val = d.back(); // accesam ultima valoare
        d.pop_back(); // stergem ultima valoare
        cout << val << " ";
    }
}
cout << '\n';
// afisam 3 8 5 7 4
```

## Structuri de date arborescente

Structurile de date arborescente ne permit să putem lucra cu valori ordonate în mod dinamic, având o performanță foarte bună, complexitatea operațiilor fiind în cele mai multe cazuri logaritimică, deoarece se bazează pe diverși arbori binari care permit sortări dintre cele mai rapide. 

### Structura std::map

Un map este o structură de date arborescentă care ne permite să păstrăm pentru fiecare cheie o valoare specifică, fiind foarte similar ca principiu cu funcțiile de la matematică. Pentru a putea folosi std::map, va trebui să includem biblioteca ``#include <map>``. Sintaxa acestuia va fi ``map <tip1, tip2> nume``, iar tipurile de date vor putea fi cele cunoscute, inclusiv vectori și stringuri.  Cheile vor fi ordonate crescător, datorită implementării bazate pe red-black trees.

Dintre cele mai importante funcții, vom enumera următoarele:

* Atribuirea: ``mp[x] = y;`` face valoarea cheii $x$ să devină $y$. În mod particular, dacă încercăm să lucrăm cu o cheie $x_1$ neinițializată, ea va fi inițializată cu $0$, așa cum se va putea vedea în codul de mai jos.
* Găsirea unui element: ``mp.find(x) != mp.end()`` verifică dacă $x$ există în map, fără a crea un element nou în map.
* Ștergerea: ``mp.erase(x)`` șterge instanța cheii $x$ din map. Dacă $x$ nu se află în map, nu se întâmplă nimic.
* Curățarea: ``mp.clear()`` șterge toate cheile din map. 
* Lower_bound: ``mp.lower_bound(x)`` returnează un iterator care ține cea mai mică valoare mai mare sau egală cu valoarea $x$ sau ``mp.end()`` dacă nu avem o asemenea valoare.
* Upper_bound: ``mp.upper_bound(x)`` returnează un iterator care ține cea mai mică valoare strict mai mare decât valoarea $x$ sau ``mp.end()`` dacă nu avem o asemenea valoare.
* Afișarea valorilor se poate face în două moduri, fie cu iteratori specifici, fie cu tipul auto.

Cea mai simplă utilizare a unui map va fi drept un vector de frecvență dinamic, deoarece vom putea stoca valori oricât de mari într-o complexitate logaritmică per operație. Mai jos găsiți exemple de utilizare a map-ului.

```cpp
map <int, int> mp; 

mp[2] = 5; 
mp[4] = 6;

cout << mp[2] << '\n'; // 2
cout << mp[3] << '\n'; // 0

/*
2 5
3 0
4 6
*/
for (map<int, int> ::iterator it = mp.begin(); it != mp.end(); it++) {
    cout << it -> first << " " << it -> second << '\n';
}
mp.erase(3);
  
mp.clear();

mp[3] = 4;
mp[3] = 5;
mp[6] = 1;

for (auto it : mp) {
    cout << it.first << " " << it.second << '\n';
}
if (mp.find(10) != mp.end()) {
    cout << "Cheia 10 este in map\n";
}
else {
    cout << "Cheia 10 nu este in map\n"; 
}
```

### Structura std::set

Un set este o structură de date arborescentă care ne permite să păstrăm o listă de valori care apare, ordonată crescător, fiind foarte similar ca principiu cu mulțimile de la matematică. Pentru a putea folosi std::set, va trebui să includem biblioteca ``#include <set>``. Sintaxa acestuia va fi ``set <tip> nume``, iar tipurile de date vor putea fi cele cunoscute, inclusiv vectori și stringuri.  

Dintre cele mai importante funcții, vom enumera următoarele:

* Inserarea: ``s.insert(x)`` adaugă $x$ în setul $s$. În mod particular, dacă încercăm să inserăm o valoare care deja este în set, nu se va întâmpla nimic.
* Găsirea unui element: La fel ca la map, ``s.find(x) != s.end()`` verifică dacă $x$ există în set, fără a crea un element nou în set.
* Ștergerea: ``s.erase(x)`` șterge $x$ din set. Dacă $x$ nu se află în set, nu se întâmplă nimic.
* Curățarea: ``s.clear()`` șterge toate cheile din set. 
* Lower_bound: ``s.lower_bound(x)`` returnează un iterator care ține cea mai mică valoare mai mare sau egală cu valoarea $x$ sau ``s.end()`` dacă nu avem o asemenea valoare.
* Upper_bound: ``s.upper_bound(x)`` returnează un iterator care ține cea mai mică valoare strict mai mare decât valoarea $x$ sau ``s.end()`` dacă nu avem o asemenea valoare.
* Afișarea valorilor se poate face în două moduri, fie cu iteratori specifici, fie cu tipul auto.

Cea mai simplă utilizare a unui set va fi drept o mulțime dinamică, deoarece vom putea stoca valori oricât de mari într-o complexitate logaritmică per operație. Mai jos găsiți exemple de utilizare a setului. Totuși, nu vom putea păstra informații mai avansate, precum poziția relativă, acestea fiind discutate ulterior în articol, când vorbim despre policy based data structures.

```cpp
set<int> s;
s.insert(1);  // [1]
s.insert(14); // [1, 14]
s.insert(9);  // [1, 9, 14]
s.insert(2);  // [1, 2, 9, 14]
cout << *s.upper_bound(7) << '\n';  // 9
cout << *s.upper_bound(9) << '\n';  // 14
cout << *s.lower_bound(5) << '\n';  // 9
cout << *s.lower_bound(9) << '\n';  // 9
cout << *s.begin() << '\n';  // 1
cout << *s.rbegin() << '\n';  // 14
auto it = s.end();
cout << *(--it) << '\n';  // 14
s.erase(s.upper_bound(6));  // [1, 2, 14]
// iterator
for (set<int> ::iterator it = s.begin(); it != s.end(); it++) { 
    cout << *it << '\n'; // 1, 2, 14
}
// iterator invers
for (set<int> ::reverse_iterator it2 = s.rbegin(); it2 != s.rend(); it2++) {
    cout << *it2 << '\n'; // 14, 2, 1
}
```

### std::unordered_map și std::unordered_set

Atât std::set cât și std::map au versiuni unordered ale acestora, care acționează în mod similar cu structuri de tip hashmap, codificând valorile sub diverse forme pentru a evita coliziuni de diverse moduri. Totuși, aici nu vom discuta teoria din spatele hashurilor, ci doar containerele în sine [articolul nostru despre hashing](https://edu.roalgo.ro/mediu/hashing/#hash-tables-si-unordered-map). Deși funcțiile pe care cele două structuri de date le au sunt identice cu cele ale echivalentelor lor sortate, uneori pot deveni foarte utile în concursuri.

std::unordered_map este versiunea nesortată a map-ului, fiind inclus în biblioteca ``#include <unordered_map>``. Sintaxa acestuia va fi ``unordered_map <tip1, tip2> nume``.

std::unordered_set este versiunea nesortată a set-ului, fiind inclus în biblioteca ``#include <unordered_set>``. Sintaxa acestuia va fi ``unordered_set <tip> nume``.

Complexitatea operațiilor descrise la map, respectiv set pentru cele două structuri este în medie $O(1)$ amortizat, dar în cel mai rău caz, complexitatea finală este $O(n)$ per operație, unde $n$ este dimensiunea structurii de date în cauză. Totuși, așa cum este explicat și în articolul despre hashing, această problemă poate fi rezolvată folosind un hash custom, dar constanta devine în multe cazuri suficient de slabă încât să nu mai fie optimă folosirea structurilor de tip unordered.

### std::multimap și std::multiset

De asemenea, std::set și std::map au și versiuni care ne permit să ținem mai multe instanțe ale aceleiași valori, std::multiset fiind de departe cel mai utilizat în practică. Acestea au aceleași funcții specifice cu cele întâlnite la set și map, dar trebuie să fim atenți la un aspect foarte important, sintaxa fiind la fel (``multiset <tip> nume``).

!!! warning "Erase și multiseturile"
    Dacă folosim erase în același mod cum am explicat la set, toate valorile egale cu $x$ se șterg, deci trebuie să folosim ``ms.erase(ms.find(val))``. 

* ``ms.erase(x)`` - șterge toate aparițiile lui $x$ din multiset.
* ``ms.erase(ms.find(x)) `` - șterge o singură apariție a lui $x$ din multiset.

La fel ca la set și map, complexitatea operațiilor este logaritimică, cu o singură excepție, aceasta fiind funcția count, care numără valorile egale cu x. Totuși, complexitatea lui count este liniară, fapt pentru care nu se recomandă folosirea acestei funcții.

### Structura std::priority_queue

O coadă de priorități este o coadă pe care o folosim pentru a păstra datele într-o ordine dată (by default, descrescătoare). Implementarea ei este bazată pe o structură de date de tip heap, permițând operații de push, pop și top, în mod similar cu cele de la coadă, cu diferența că valorile sunt ținute ordonat. Complexitatea operațiilor este $O(\log n)$. Chiar dacă această structură de date este un pic mai rapidă decât set și map, un mare dezavantaj este dat de faptul că doar elementul din vârf poate fi accesat, în mod similar cu funcționalitatea heap-ului. 

În general, vom vrea să folosim o coadă de priorități atunci când vrem să aflăm mai rapid cel mai mare sau cel mai mic element, constanta fiind bună, fapt ce face această structură de date principala metodă de a implementa diverși algoritmi de tip greedy mai complicați, cel mai cunoscut fiind [algoritmul lui Dijkstra](https://edu.roalgo.ro/mediu/shortest-path/#algoritmul-lui-dijkstra) pe grafuri cu costuri.

Pentru a folosi această structură de date, biblioteca ``#include  <queue>``  este necesară. Sintaxa unei cozi de priorități este ``priority_queue<tip> nume``. Mai jos găsiți un exemplu de implementare a acestei structuri de date.

```cpp
priority_queue<int> pq; 
pq.push(5); // adaugam valori
pq.push(9);
pq.push(1);

while (!pq.empty()) {
    int val = pq.top(); // varful cozii
    pq.pop(); // scoatem varful cozii
    
    cout << val << " "; // se vor afisa 9, 5, 1 
}
```

!!! note "Accesarea valorilor în ordine crescătoare"
    Pentru a accesa valorile în ordine crescătoare, avem două opțiuni: Fie le adăugăm cu semn schimbat, fără a schimba sintaxa structurii de date, fie adăugăm un comparator custom. Mai jos aveți sintaxa cu comparator custom. 

```cpp
struct cmp {
    bool operator()(int a, int b) {
        return a > b;
    }
};
priority_queue<int, vector<int>, cmp>q;
```

### Policy based data structures

Structurile de date menționate anterior, deși puternice, nu ne permit să răspundem la întrebări de tipul:

* Care este a $k$-a valoare în ordine crescătoare prezentă în set/map?
* Câte valori sunt mai mici decât $x$ în set/map?

Deși aceste întrebări pot fi rezolvate folosind structuri de date complexe, precum arborii de intervale dinamici sau eventual folosind normalizări dificil de implementat, există o opțiune inbuilt destul de ușor de folosit și destul de rapidă, complexitatea operațiilor fiind $O(\log n)$, la fel ca la set și map. 

!!! note "Atenție la constante" 
    Totuși, se remarcă faptul că constanta este una foarte mare, fiind mult mai înceată decât alte metode care ar fi mai greu de implementat.

Această structură de date ne va permite să folosim facilitățile setului, împreună cu două funcții noi:

* `find_by_order(k)` - Al $k$-lea cel mai mare element, începând de la $0$. 
* `order_of_key(x)` - Numărul de valori strict mai mici decât $x$.

Pentru a putea folosi această structură de date, trebuie să declarăm următoarele biblioteci, namespace-uri și typedefs:

```cpp 
#include <ext/pb_ds/assoc_container.hpp>
#include <ext/pb_ds/tree_policy.hpp>

using namespace __gnu_pbds;
 
typedef tree<int,null_type,less<int>,rb_tree_tag,tree_order_statistics_node_update> order_set;
```

!!! note "Alte tipuri de date"  
    Pentru a folosi policy based data structures și cu alte tipuri de date, trebuie înlocuite cele două inturi cu tipul de date potrivit. De exemplu, ``typedef tree<pair<int, int>,null_type,less<pair<int,int>>,rb_tree_tag,tree_order_statistics_node_update> order_set``; ne permite să ținem pairuri și să operăm în mod similar, fiind foarte util atunci când vrem să lucrăm cu duplicate și eventual să stocăm valori mai complexe.

Mai jos găsiți un exemplu de folosire a acestei structuri de date, așa cum a fost folosită în problema [AIB de pe pbinfo](https://www.pbinfo.ro/probleme/2725/aib).

```cpp 
#include <iostream>
#include <ext/pb_ds/assoc_container.hpp>
#include <ext/pb_ds/tree_policy.hpp>
 
using namespace std;
using namespace __gnu_pbds;
 
typedef tree<int,null_type,less<int>,rb_tree_tag,tree_order_statistics_node_update> order_set;
 
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n;
    cin >> n;
    
    order_set X;
    
    for (int i = 1; i <= n; i++) {
        int x;
        cin >> x;
        
        cout << X.order_of_key(x) << " ";
        X.insert(x);
        // X.find_by_order(x) ar afla al x-lea cel mai mare element
    }
    return 0;
}
```

Pe lângă o mare parte din problemele cu structuri de date, această structură de date poate fi aplicată și pentru a rezolva problema [Greetings de pe Codeforces](https://codeforces.com/contest/1915/problem/F).

## Concluzii

Structurile de date din STL sunt unul dintre cele mai importante tooluri pe care le puteți folosi în programare și cunoașterea lor este esențială pentru a putea fi programatori cât mai buni. De asemenea, flexibilitatea lor ușurează multe implementări în special în condiții de concurs, unde timpul este limitat. 

Totuși, trebuie să aveți în vedere faptul că este de preferat înțelegerea conținuturilor, pentru a evita folosirea lor oricând și oricum, fără a avea în vedere abordările alternative care ar putea exista la probleme, lucru care se remarcă mai ales la structurile de date arborescente, precum std::set și std::map.

## Resurse suplimentare

* [STL - Alex Vasiluta](https://vasiluta.ro/curs_stl)
* [STL - infoarena](https://www.infoarena.ro/stl)
* [Introduction to Data Structures - USACO Guide](https://usaco.guide/bronze/intro-ds?lang=cpp)
* [Introduction to Sets & Maps - USACO Guide](https://usaco.guide/bronze/intro-sets?lang=cpp)
* [More Operations on Sorted Sets - USACO Guide](https://usaco.guide/silver/intro-sorted-sets)
* [STL - pbinfo](https://www.pbinfo.ro/articole/23702/standard-template-library-stl)
* [Policy Based Data Structures - Codeforces](https://codeforces.com/blog/entry/11080)