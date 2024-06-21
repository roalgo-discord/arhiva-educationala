Structurile de date sunt de multe ori foarte utile în multe contexte în programare, acestea dovedindu-se a fi în special foarte puternice și esențiale în lucrul problemelor date la diverse olimpiade și concursuri de informatică. Acest articol va prezenta o structură de date care nu e la prima vedere foarte complicată față de alte structuri de date mai consacrate, dar care se dovedește a fi foarte puternică în rezolvarea multor probleme de toate felurile. 

Așa cum sugerează și titlul, vom prezenta în acest articol pădurile de mulțimi disjuncte, sau union-find, denumire dată după cele două operații principale pe care această structură de date le oferă. Union-Find poate fi folosit cu mare ușurință pentru probleme de tipul acelora în care ni se cere să aflăm pe parcurs ce valori sunt legate între ele printr-o relație, presupunând că relațiile dintre valori se adaugă treptat. Pe parcurs se vor remarca diverse optimizări, precum și diferitele clase de probleme în care se poate folosi o asemenea structură de date.

Pentru ușurarea explicațiilor, vom presupune că avem o situație ipotetică în care avem $n$ prieteni și ni se dau operații în care fie două persoane devin prietene, fie trebuie să decidem dacă două persoane aparțin aceluiași grup de prieteni. 

## Definirea operațiilor și funcționalității structurii de date

### Fundamente

Pentru a reprezenta datele, vom ține într-un vector dimensiunea fiecărei mulțimi, iar într-un alt vector vom ține pentru fiecare poziție, nodul reprezentativ corespunzător grupului de prieteni din care face parte, la început fiecare nod fiind reprezentantul lui însuși.

```cpp
// vectorii rad si card sunt de dimensiunea n+1
for(int i = 1; i <= n; ++i)
		rad[i] = i, card[i] = 1;
```

### Operația Union

La acest pas, ni se dau două persoane și trebuie să stabilim relația de prietenie dintre ei. Deși această operație se face în timp constant, contează foarte mult modul în care facem relația de atribuire, aceasta putând schimba radical complexitatea algoritmului. Astfel, voi introduce prima optimizare, si anume optimizarea de unire după cardinalul mulțimii, astfel încât vom uni mereu mulțimea cu cardinal mai mic la mulțimea cu cardinal mai mare. 

Motivul pentru care această optimizare duce la o complexitate mai mică va fi dat de numărul mai mic de operații pe care funcția Find le va face la fiecare pas. De asemenea, această optimizare de a uni mulțimile mai mici la cele mai mari se regăsește în mod frecvent și în alte contexte în diverse structuri de date și nu numai. 

```cpp
void Union(int a, int b)
{
	if(card[a] < card[b]) // vom vrea sa atasam b la a
		swap(a, b);
	rad[b] = a; // radacina lui b devine a
	card[a] += card[b]; // crestem cardinalul lui a cu cardinalul lui b
}
```

### Operația Find

La această operație, vrem să găsim pentru un nod, poziția nodului reprezentativ în structura noastră de date. În mod normal, această operație poate face cel mult $O(n)$ pași, în cazul în care arborele rezultat ar fi un lanț. Totuși, putem să ne folosim de parcurgerile pe care le facem pentru a reține rezultatele pentru toate nodurile de pe parcursul acelui drum, astfel încât la o parcurgere ulterioară, numărul de pași să se reducă spre un număr constant, structura arborelui ajungând similară cu cea a unui arbore stea. 

```cpp
int Find(int x)
{
	if(rad[x] == x) // daca nodul e radacina
		return x;
	rad[x] = Find(rad[x]); // radacina nodului nostru va deveni radacina radacinii curente
	return rad[x];
}
```

### Prime concluzii

Operația union are complexitatea $O(1)$, iar operația de find are complexitatea $O(n)$. Totuși, datorită optimizărilor menționate mai sus (compresia drumurilor și unirea după dimensiunea mulțimilor), numărul total de operații făcute este $O(n \log^* n)$, unde $\log^* x$ reprezintă inversul funcției Ackermann, valoare care se poate aproxima ca fiind o constantă.  
De asemenea, nefolosirea optimizării de compresie a drumurilor ar duce la complexitatea $O(n \log n)$, rezultat foarte important în contextul altor optimizări, cum ar fi [tehnica small-to-large](https://usaco.guide/plat/merging?lang=cpp) sau în general în demonstrarea diverselor rezultate ce țin de sume armonice. 

## Problema [disjoint](https://infoarena.ro/problema/disjoint).

<!--ne trebuie ceva pe kilonova de genul asta-->

Pentru fiecare operație citită de la intrare, vom implementa funcțiile necesare pentru a obține rezultatul problemei. Unirea a două mulțimi implică mai întâi folosirea funcției Find pentru a găsi rădăcinile, iar mai apoi folosim funcția Union pentru a face unirea propriu-zisă. Folosirea ambelor optimizări pentru îmbunătățirea complexității duce la soluția optimă, ce rulează într-un timp aproximativ liniar raportat la numărul de valori citite. 

[Sursă de 100 de puncte](https://infoarena.ro/job_detail/3128312?action=view-source)

### Oare putem implementa mai eficient?

Inițial, noi am implementat această structură folosind doi vectori, anume cel în care ținem cardinalul fiecărei mulțimi, precum și cel în care ținem rădăcina fiecărei mulțimi. Totuși, se poate observa faptul că noi folosim o grămadă de informație inutilă din cauza faptului că pentru fiecare număr, practic ne interesează doar dacă e o rădăcină a unei mulțimi de valori sau nu. Astfel, vom recurge la a reprezenta pozițiile corespunzătoare rădăcinilor cu numere negative, reprezentând $-x$, unde $x$ e cardinalul mulțimii reprezentat de acea valoare, respectiv reprezentarea nodurilor adiacente cu numere pozitive, reprezentând rădăcina mulțimii din care acea valoare face parte.

[Sursă de 100 de puncte cu optimizarea de memorie](https://infoarena.ro/job_detail/3128311?action=view-source)

## Problema [bile](https://infoarena.ro/problema/bile).

### Soluție

Mai întâi, trebuie observat faptul că problema determinării conectivității dinamice este una foarte dificil de rezolvat [articol de pe wikipedia](https://en.wikipedia.org/wiki/Dynamic_connectivity), deci nu are sens să ne chinuim cu asemenea implementări care nu fac obiectul cursului nostru sau în general a programelor olimpiadelor de informatică. 

Asta ne duce cu gândul să încercăm să privim problema dintr-o perspectivă diferită, în special și datorită faptului că nu suntem forțați să răspundem la actualizări online. Din acest motiv, vom introduce o abordare care se folosește la multe soluții ce se bazează pe folosirea pădurilor de mulțimi disjuncte. 

Practic, în loc să privim problema de la început la final, vom rezolva problema inversă, în care putem adăuga bile, ceea ce ne ajută să reducem problema la o aplicație standard a pădurilor de mulțimi disjuncte, răspunsurile ajungând în cele din urmă să fie afișate în ordinea inversă în care le-am aflat. 

[Soluție de 100 de puncte](https://infoarena.ro/job_detail/2833808?action=view-source)

## Problema [Secvmax](https://www.infoarena.ro/problema/secvmax).

"Fiona are o secventa de $N$ numere naturale. Ea se întreabă din când în când pentru un anumit număr $Q$ care este cea mai lungă subsecvență care are toate numerele mai mici sau egale cu $Q$. Ajutați-o pe Fiona să își răspundă la toate întrebările."

### Soluție.

Aici putem folosi din nou prelucrarea numerelor în ordine crescătoare a numerelor din vector, iar atunci când adăugăm valorile în considerare, vom verifica fiecare vecin să vedem dacă putem uni valorile din cele două mulțimi, iar la fiecare pas răspunsul e cardinalul maxim al unei mulțimi, care e crescător pe măsură ce creștem valorile adăugate.  

[Soluție de 100 de puncte](https://www.infoarena.ro/job_detail/2273791?action=view-source)

## Problema [joingraf](https://kilonova.ro/problems/1907).

A fost ziua lui Traian de curând, iar el a primit în dar un graf cu $N$ noduri. La început, fiecare nod era într-o componentă conexă, singur. Dar apoi, câinele lui Traian a venit și i-a spus $Q$ întrebări de forma următoare:

\begin{enumerate}
\item $1 \ x \ y$: Adaugă la graful tău muchiile $(x, x + 1), (x + 1, x + 2), \dots , (y - 1, y)$
\item $2 \ x \ y$: Spune dacă nodurile $x$ și $y$ sunt în aceeași componentă conexă.
\end{enumerate}

Pentru a rezolva această problemă există mai multe abordări, plecând de la diverse moduri de a gândi problema, dar în contextul pădurilor de mulțimi disjuncte, ne vom concentra pe soluția cu DSU. 

Mai întâi, trebuie să observăm că componentele conexe sunt ca niște intervale. De exemplu, să luăm $n = 7$. Atunci, la început intervalele vor fi: $[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7]$. Dacă unim muchiile de la $3$ la $6$, intervalele vor deveni: $[1, 1], [2, 2], [3, 6], [7, 7]$.

Atunci, putem folosi o structură de tip DSU. Vom reține $par_i = $ "părintele" nodului $i$, sau mai ușor de înțeles, capătul stânga al intervalului în care este nodul $i$. Este nevoie să reținem doar capătul dreapta, deoarece capătul dreapta al secvenței curente este predecesorul capătului stânga al secvenței următoare. Vom reține și $nxt_i = $ capătul stânga al secvenței de după secvența în care este $i$.

Iar atunci când avem update cu $x, y$, mergem la fiecare secvență până la $y$ (adică când avansăm de la $p$ la următoarea, facem $p = nxt_p$) și o reunim cu secvența în care este $x$.

Iar la query, verificăm dacă intervalul în care este $x$ este egal cu cel în care este $y$. Complexitate: $O(N + Q \ log \ N)$ timp, $O(n)$ memorie.

[Soluție de 100 de puncte](https://kilonova.ro/submissions/160551)

## Concluzii

Acest articol este menit să introducă audiența în folosirea pădurilor de mulțimi disjuncte, punând accentul pe funcționalitățile de bază, fără a menționa alte aplicații importante, cum ar fi algoritmul lui Kruskal sau algoritmii folosiți pentru dynamic connectivity. De asemenea, pădurile de mulțimi disjuncte pot fi folosite pentru a scurta foarte mult implementările aplicațiilor simple la grafuri.

<!-- ref la APM cand va fi sa fie -->
<!--ref la dynamic connectivity cand va fi sa fie-->

## Probleme suplimentare

### Probleme de la olimpiade

* [Chemical table - EJOI 2018](https://cses.fi/395/list/)
* [MexC ONI 2008](https://kilonova.ro/problems/1785)
* [Probleme cu DSU de pe kilonova](https://kilonova.ro/tags/311)
* [COCI 13-ladice](https://dmoj.ca/problem/coci13c5p6)
* [USACO MooTube](http://www.usaco.org/index.php?page=viewproblem2&cpid=789)
* [USACO Wormhole Sort](http://www.usaco.org/index.php?page=viewproblem2&cpid=992)

### Probleme de pe Codeforces/AtCoder

* [Galleries - AGM 2020](https://codeforces.com/gym/102565/problem/D)
* [DSU Step 1 - Codeforces EDU](https://codeforces.com/edu/course/2/lesson/7/1/practice)
* [DSU Step 2 - Codeforces EDU](https://codeforces.com/edu/course/2/lesson/7/2/practice)
    

### Bibliografie și lectură suplimentară

Am ordonat resursele suplimentare în ordinea dificultății înțelegerii și într-o ordine logică pentru a ușura obținerea de cunoștinte despre tehnicile, abordările și problemele discutate în acest curs. 

* [Păduri de mulțimi disjuncte - CS Academy](https://csacademy.com/lesson/disjoint_data_sets/)
* [Algoritmul Union-Find - Algopedia](https://www.algopedia.ro/wiki/index.php/Clasa_a_VII-a_lec%C8%9Bia_18_-_23_ian_2020#Algoritmul_union-find)
* [Link ce trebuie accesat pentru inscrierea la cursul despre DSU facut de ITMO Academy](https://codeforces.com/edu/courses)
* [Articol USACO Guide - DSU](https://usaco.guide/gold/dsu?lang=cpp)
* [Curs despre DSU - Codeforces (este necesar un cont pentru a putea accesa acest curs, plus accesarea linkului de mai sus)](https://codeforces.com/edu/course/2/lesson/7)
* [Sack (dsu on tree) - Avansat](https://codeforces.com/blog/entry/44351)
* [Smenul de manevrare a query-urilor offline cu DSU](https://codeforces.com/blog/entry/75369)