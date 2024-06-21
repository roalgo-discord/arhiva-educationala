---
tags:
    - vectori
    - sortare
    - cautari
---

## Fundamente și cunoștințe necesare

Tehnica Two pointers este o tehnică pe care o putem folosi în foarte multe tipuri de probleme în care avem de căutat subsecvențe cu diverse proprietăți, condiția principală fiind aceea că vrem să găsim o pereche de valori sau de indici ce respectă anumite reguli, fără să depășim o anumită valoare sau o anumită condiție. Această tehnică apare în foarte multe tipuri de probleme ce se dau la concursurile de informatică, de foarte multe ori reprezentând o optimizare la posibile soluții cu căutare binară sau alte structuri de date ce ar adăuga un factor de complexitate în plus la soluție.

În articol voi începe prin a explica tipurile de probleme unde putem folosi Two pointers, urmând ca apoi să prezint câteva probleme de diverse dificultăți, explicând principalele strategii de abordare a acestor tipuri de probleme și punând accentul și pe implementări clare, care au drept scop evitarea greșelilor tipice când vine vorba de implementarea
acestei metode.

Pentru a folosi această metodă, e nevoie să stăpânim lucrul cu secvențe și ideal și căutarea binară, deoarece pentru multe dintre exemplele ce vor fi menționate, există soluții și folosind acest algoritm. Nu în ultimul rând, pentru anumite probleme e posibil să fie nevoie de structuri de date adiționale, cum ar fi map sau set .

În ceea ce privește modul în care începem implementările, avem două tipuri majore de implementări, în funcție de algoritm. Merită menționat faptul că acești pointeri sunt de fapt variabile corespunzătoare indicilor din vector la care ne aflăm la momentul respectiv. 

În primul rând, vorbim de problemele în care vrem să plecăm de la prima poziție și să procesăm secvențele care respectă o anumită proprietate monotonă (crescătoare sau descrescătoare). În acest caz, vom avea ambii pointeri cu indexul de început de la 1 și vom avansa cu pointerul din dreapta atâta timp cât încă se mai respectă condiția cerută din enunț.

De asemenea, mai există probleme în care plecăm cu pointerul stâng de la prima poziție și cu pointerul drept de la ultima poziție și vrem să mergem cu acești pointeri în direcții opuse, deoarece căutăm o proprietate ce are o variație descrescătoare față de scopul problemei.

## Problema 1 - [Subarray Sums I](https://cses.fi/problemset/task/1660/)

Dat fiind un vector cu $n$ elemente numere naturale, determinați numărul de subsecvențe din vector pentru care suma elementelor este egală cu $x$.

Pentru a rezolva această problemă, trebuie să ne folosim de faptul că toate numerele din șirul dat sunt pozitive, ceea ce face rezolvarea mult mai ușoară. Astfel, vom putea afla pentru fiecare poziție de început a șirului, care este poziția cea mai din dreapta astfel încât suma valorilor din acel interval să fie mai mică sau egală cu $x$. Dacă acea sumă este egală cu $x$, vom incrementa răspunsul. Vom avea grijă la fiecare pas să incrementăm variabila $st$, având grijă să scădem valoarea curentă din sumă mai întâi.

```cpp
#include <iostream>
using namespace std;

int n, v[200002], x;
int main() {
	ios_base::sync_with_stdio(false); // randuri pentru citirea rapida 
	cin.tie(NULL);
	
	cin >> n >> x;
	for (int i = 1; i <= n; i++)
		cin >> v[i];
	int st = 1;
	int dr = 1;
	int sum = 0;
	int ans = 0;
	while (st <= n) { // cat timp nu am terminat de parcurs
		while (dr <= n && sum < x) {// cat timp suma e mai mica decat x, incrementam dr
			sum += v[dr];
			dr++;
		}
		if(sum == x)
			ans++;
		sum -= v[st];
		st++;
	}
	cout << ans;
	return 0;
}
```

## Problema 2 - [Sum of Two Values](https://cses.fi/problemset/task/1640/)

Se dă un vector cu $n$ valori pozitive și o valoare $x$. Scrieți un program care să determine două valori aflate pe poziții distincte care adunate să dea suma $x$.

Pentru a rezolva această problemă, trebuie să folosim o variantă diferită a tehnicii celor doi pointeri. Astfel, de data asta vom începe cu un pointer la poziția $1$, iar cu celălalt la poziția $n$. Pe parcurs, vom avea trei cazuri în funcție de suma $a_{p_1} + a_{p_2}$, iar dacă găsim două poziții cu suma valorilor egală cu $x$, afișăm pozițiile corespunzătoare, altfel modificăm $p_1$ sau $p_2$ după caz. Dacă nu găsim nicio pereche, afișăm IMPOSSIBLE.

```cpp
#include <iostream>
#include <algorithm> 
 
using namespace std;
 
int n, x, a[200002], b[200002];
 
int main() {
	cin >> n >> x;
	for (int i = 1; i <= n; ++i) {
		cin >> a[i];
		b[i] = a[i]; // avem nevoie de un alt vector pentru a afla pozitiile initiale 
	}
	
	sort(a+1, a+n+1); // sortam sirul
	
	int p1 = 1, p2 = n; 
	
	while (p1 < p2) {
		if (a[p1] + a[p2] == x) { // daca am gasit suma, aflam pozitiile celor 2 valori
			int valA = a[p1]; 
			int valB = a[p2];
			
			for (int i = 1; i <= n; ++i) {
				if (b[i] == valA) {
					cout << i << " ";
					valA = 0;
				}
				else {
					if (b[i] == valB) {
						cout << i << " ";
						valB = 0;
					}
				}
			}
			// iesim din program ca sa evitam afisarea mai multor solutii
			return 0;
		}
		else {
			// daca suma e mai mare decat x, scadem p2, altfel crestem p1
			if (a[p1] + a[p2] > x)
				--p2;
			else
				++p1;
		}
	}
	
	cout << "IMPOSSIBLE";
	return 0;
} 
```

## Problema 3 - [Nane](https://www.infoarena.ro/problema/nane)

Nane de pe Jiu, mare algoritmician fiind, vă provoacă să rezolvați o problemă prea ușoară pentru el. Nane vă dă $N$ numere naturale și un număr $K$. Numim subsecvență specială o subsecvență pentru care efectuând operația OR pe biți pentru elementele din subsecvență (să numim această operație sumă OR) obținem un rezultat care are, în reprezentare binară, cel mult $K$ biți de $1$. Două subsecvențe sunt diferite dacă cel puțin o poziție din una nu se regăsește în cealaltă. Scrieți un program care să determine numărul de subsecvențe speciale.

Pentru a rezolva această problemă, vom folosi metoda celor doi pointeri pentru a afla numărul de secvențe care au suma OR cu cel mult $k$ de $1$, actualizările fiind foarte similare cu cele de la celelalte probleme de acest tip. De asemenea, deoarece vorbim de suma OR, trebuie să folosim câte un vector de frecvență pentru fiecare bit pentru a evita calculele adiționale.

```cpp
#include <bits/stdc++.h>
#define ll long long
using namespace std;
 
int n, k, v[100002], fr[32];
 
ll ans;

bool ok () {
	int cnt = 0;
	for (int i = 0; i <= 30; ++i)
		if (fr[i])
			++cnt;
	if (cnt <= k)
		return 1;
	return 0;
}

void add (int poz, int val) {
	for (int i = 0; i <= 30; ++i)
		if ((v[poz] & (1<<i)))
			fr[i] += val;
}
int main() {
	ifstream cin("nane.in");
	ofstream cout("nane.out");
	
	cin >> n >> k;
	for (int i = 1; i <= n; ++i)
		cin >> v[i];
	int st = 1;
	int dr = 1;
	while (st <= n) {
		while (st <= n && (dr > n || !ok())) {
			if (ok()) {
				ans += dr - st;
				add(st, -1);
				++st;
			}
			else {
				add(st, -1);
				++st;
				ans += dr - st;
			}
		}
		while (dr <= n && ok())
			add(dr, 1), ++dr;
	}
	cout << ans << '\n';
	return 0;
}
```

## Problema 4 - [JJOOII](https://oj.uz/problem/view/JOI20_ho_t2)

Se consideră un șir format din $N$ caractere din mulțimea {J, O, I}. Se numește JOI-șir de nivel $K$ un șir format din $K$ litere J, $K$ litere O și $K$ litere I (în această ordine). De exemplu, JJOOII este un JOI-șir de nivel $2$. Bitaro dorește să transforme șirul $S$ într-un JOI-șir de nivel $K$, utilizând următoarele $3$ operații, de oricâte ori și în orice ordine:

* Operația $1$: Bitaro șterge primul caracter din $S$;
* Operația $2$: Bitaro șterge ultimul caracter din $S$;
* Operația $3$: Bitaro șterge un caracter din interiorul lui $S$ (care nu este nici primul nici ultimul).

Deoarece operațiile de tip $3$ necesită mult timp, Bitaro dorește să transforme șirul $S$ într-un JOI-șir de nivel $K$ folosind un număr minim de operații de tip $3$. Scrieți un program care, cunoscând $N$, $S$ și $K$, determină numărul minim de operații de tip $3$ necesare pentru a transforma șirul $S$ într-un JOI-șir de nivel $K$. Dacă acest lucru nu este posibil, programul va afișa valoarea $-1$.

Pentru a rezolva această problemă, va trebui mai întâi să aflăm unde sunt situate literele J, O și I în șirul nostru de caractere. Ulterior, pe măsură ce fixăm secvențele de $k$ de J, avem pointeri care duc la secvențele corespunzătoare de O și I din celelalte două șiruri, calculele ulterioare devenind destul de ușoare.

```cpp
#include <iostream>
using namespace std;
 
int vj[200001], vo[200001], vi[200001];
 
int lj, lo, li;
 
int main() {
	int n, k;
	cin >> n >> k;
	
	string s;
	cin >> s;

	for (int i = 0; i < n; i++) {
		if (s[i] == 'J')
			vj[++lj] = i;
		if (s[i] == 'O')
			vo[++lo] = i;
		if (s[i] == 'I')
			vi[++li] = i;
	}
	
	int pj = 1;
	int po = 1;
	int pi = 1;
	
	int ans = n+1;
	
	while (pj + k - 1 <= lj && po + k - 1 <= lo && pi + k - 1 <= li) {
		while (po + k - 1 <= lo && vo[po] <= vj[pj + k - 1])
			po++;
			
		if (po + k - 1 <= lo)
			while (pi + k - 1 <= li && vi[pi] <= vo[po + k - 1])
				pi++;
		
		if (pj + k - 1 <= lj && po + k - 1 <= lo && pi + k - 1 <= li) {
			int fi = vj[pj];
			int lst = vi[pi + k - 1];
			ans = min(ans, (lst - fi + 1) - 3 * k);
		}
		pj++;
		
	}
	if (ans == n+1)
		cout << -1;
	else
		cout << ans;
	return 0;
}
```

## Probleme suplimentare

### Probleme de la olimpiade


* [Probleme cu two pointers](https://kilonova.ro/tags/291)
* [Infoarena 3secv](https://infoarena.ro/problema/3secv)
* [JOI JJOOII 2](https://oj.uz/problem/view/JOI20_ho_t2)
* [NOI Singapore Global Warming](https://oj.uz/problem/view/NOI13_gw)
* [Baraj Seniori 2023 sirbun](https://kilonova.ro/problems/556)
* [Infoarena nane](https://infoarena.ro/problema/nane)
* [USACO Social Distancing](http://www.usaco.org/index.php?page=viewproblem2&cpid=1038)
* [USACO MooTube](http://www.usaco.org/index.php?page=viewproblem2&cpid=789)
* [USACO Wormhole Sort](http://www.usaco.org/index.php?page=viewproblem2&cpid=992)
* [USACO Sprinklers](http://usaco.org/index.php?page=viewproblem2&cpid=794)
* [USACO Cow Dating](http://usaco.org/index.php?page=viewproblem2&cpid=924)


### Probleme de pe Codeforces

* [Towers - Codeforces](https://codeforces.com/group/swEqtABRxe/contest/227531/problem/C)
* [Two Pointers - Codeforces](https://codeforces.com/problemset?tags=two+pointers)
* [Two Pointers Step 1 - Codeforces EDU](https://codeforces.com/edu/course/2/lesson/9/1/practice)
* [Two Pointers Step 2 - Codeforces EDU](https://codeforces.com/edu/course/2/lesson/9/2/practice)
* [Two Pointers Step 3 - Codeforces EDU](https://codeforces.com/edu/course/2/lesson/9/3/practice)
    

## Bibliografie și lectură suplimentară

* [Two Pointers - USACO Guide](https://usaco.guide/silver/two-pointers?lang=cpp)
* [Link ce trebuie accesat pentru inscrierea la cursul despre DSU facut de ITMO Academy](https://codeforces.com/edu/courses)
* [Curs despre Two Pointers - Codeforces (este necesar un cont pentru a putea accesa acest curs, plus accesarea linkului de mai sus)](https://codeforces.com/edu/course/2/lesson/9)
* [Using the Two Pointers Technique](https://algodaily.com/lessons/using-the-two-pointer-technique)
* [Edu - Two pointers](https://codeforces.com/blog/entry/87248)
* [Competitive Programmer's Handbook - Capitolul 8](https://cses.fi/book/book.pdf)