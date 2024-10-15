
---
tags:
    - C++
    - implementare
    - structuri de date
---

**Autor**: Ștefan-Cosmin Dăscălescu, Alex Vasiluță

## Introducere

Până acum, programele pe care le-ați scris până acum, deși sunt corecte și compilează în limbajul C++, respectă în mare parte din cazuri sintaxa din C, exemple fiind tablourile, anumite funcții de sistem și în general, modul în care am lucrat cu variabilele și tipurile de date menționate anterior, cu o singură excepție - citirea și afișarea, care s-au făcut conform limbajului C++.

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

### Structura std::tuple

## Structuri de date liniare

### Structura std::queue

### Structura std::stack

### Structura std::deque

## Structuri de date arborescente

### Structura std::map

### Structura std::set

### Structura std::priority_queue

### Policy based data structures

## Concluzii

Structurile de date din STL sunt unul dintre cele mai importante tooluri pe care le puteți folosi în programare și cunoașterea lor este esențială pentru a putea fi programatori cât mai buni. De asemenea, flexibilitatea lor ușurează multe implementări în special în condiții de concurs, unde timpul este limitat. 

Totuși, trebuie să aveți în vedere faptul că este de preferat înțelegerea conținuturilor, pentru a evita folosirea lor oricând și oricum, fără a avea în vedere abordările alternative care ar putea exista la probleme, lucru care se remarcă mai ales la structurile de date arborescente, precum std::set și std::map.

## Resurse suplimentare

* [STL - Alex Vasiluta](https://vasiluta.ro/curs_stl)
* [STL - infoarena](https://www.infoarena.ro/stl)
* [Introduction to Data Structures - USACO Guide](https://usaco.guide/bronze/intro-ds?lang=cpp)
* [Introduction to Sets & Maps - USACO Guide](https://usaco.guide/bronze/intro-sets?lang=cpp)
* [STL - pbinfo](https://www.pbinfo.ro/articole/23702/standard-template-library-stl)
* [Policy Based Data Structures - Codeforces](https://codeforces.com/blog/entry/11080)