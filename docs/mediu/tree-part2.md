---
tags:
    - arbori
    - grafuri
    - structuri de date
---

## Introducere

Pentru a putea folosi acest articol la adevărata lui valoare, se recomandă citirea articolului (aici trebuie pus href la treebasics) pentru a vă familiariza cu noțiunile discutate aici. De asemenea, pentru anumite concepte, vor fi necesare cunoștințe suplimentare în ceea ce privește structurile de date, programarea dinamică și lucrul cu STL.

## Liniarizarea arborelui

Prima noțiune care este necesară pentru înțelegerea unei mari părți din cunoștințele de aici este dată de liniarizarea arborelui. Acest procedeu este esențial pentru a putea transpune informația din arbore pentru integrarea structurilor de date împreună cu informațiile deja existente în arbore. Cel mai frecvent algoritm de liniarizare constă în folosirea unei parcurgeri DFS pentru a trece prin nodurile din arbore în ordinea în care apar, notând pentru fiecare din ele poziția la care am intrat în subarborele acelui nod, precum și poziția la care am ieșit din subarborele acelui nod. De aici, putem aplica orice structură de date preferată pentru a aplica query-urile pe un anumit subarbore. 

```cpp
vector<vector<int> > v;
int n, pos, L[200002], R[200002];
void dfs (int parent, int node) {
	pos++;
	L[node] = pos;
	
	for(auto nxt : v[node])
		if(nxt != parent)
			dfs(node, nxt);
			
	R[node] = pos;
}
```

## Binary Lifting

De multe ori, avem nevoie să găsim într-un arbore (sau într-o construcție pe care o putem modela ca un arbore) cu $n$ noduri cel de-al $k$-lea strămoș pentru un nod dat. După cum știți din articolul anterior, un strămoș este un nod la care putem ajunge dacă urcăm de-a lungul arbore, din nod în nod până la rădăcină. O primă metodă de a afla acest strămoș este de a merge fie folosind un vector de părinți calculat anterior, fie folosind o parcurgere, mergând prin toți cei $k$ strămoși. Totuși, complexitatea acestui algoritm este $O(k)$, fiind mult prea încet în cazul în care avem de calculat aceste răspunsuri pentru mai multe asemenea noduri. 

În acest caz, se pune problema parcurgerii celor $k$ mutări într-o manieră care să ne permită aflarea acestui răspuns într-un timp cât mai rapid, aici punându-se problema cum putem scrie un anumit număr într-o sumă de cât mai puține numere pentru a putea răspunde la aceste întrebări, fără să folosim prea multă memorie. Așa cum sugerează și numele articolului, vom folosi reprezentarea binară a numerelor pentru a putea calcula aceste răspunsuri. Cu alte cuvinte, pentru fiecare nod știm deja primul lui strămoș, ceea ce ne dă ideea de a afla strămoșii pentru pozițiile corespunzătoare puterilor lui $2$ mai mici sau egale cu $n$. 

Astfel, vom integra în parcurgerea DFS obișnuită construcția acestei matrici, unde anc[i][j] va reprezenta cel de-al $2^i$-lea strămoș al nodului $j$. Pentru a afla anc[i][j], dacă $i = 0$, atunci anc[i][j] va fi părintele nodului $j$, altfel, va fi anc[i-1][anc[i-1][nod]], practic va fi cel de-al $2^{i-1}$-lea strămoș al celui de-al $2^{i-1}$ lea strămoș al nodului curent, astfel folosind proprietatea că o putere a lui $2$ e dublul puterii precedente a lui $2$, construind acest șir din aproape în aproape. 

Pentru a afla apoi un strămoș situat la poziția $x$ față de un nod $y$, tot ce va trebui să facem va fi să parcurgem invers, începând de la nodul curent, folosindu-ne de reprezentarea binară a nodului dat. 

```cpp
// anc[i][j] = nodul situat la distanta 2^i de nodul j
int n, q, anc[20][200002], lvl[200002];
vector<int> v[200002];
 
void dfs (int tata, int nod) {
    // primul stramos este parintele nodului curent
	anc[0][nod] = tata; 
    // al 2^i-lea stramos al nodului curent e al 2^(i-1) 
    // lea stramos al 2^(i-1) lea stramos al nodului curent
	for (int i = 1; i <= 18; ++i)
		anc[i][nod] = anc[i-1][anc[i-1][nod]]; 
	for (int i = 0; i < v[nod].size(); ++i) {
		int vecin = v[nod][i];
		if (vecin == tata)
			continue;
		lvl[vecin] = lvl[nod] + 1; // avem nevoie de nivelul nodului pe arbore pentru cazul cu -1
		dfs(nod, vecin);
	}
}

// cel de-al k-lea stramos al lui nod

int solve (int nod, int stp) {
    // parcurgem nivelele pentru a afla stramosul dorit
	for (int i = 18; i >= 0; --i) 
		if (stp >= (1<<i))
			nod = anc[i][nod], stp -= (1<<i);
	return nod;
}
```

## Lowest Common Ancestor

De foarte multe ori, se pune problema aflării celui mai mic strămoș comun între două sau mai multe noduri, într-un timp cât mai eficient. Deși la fel ca la subproblema precedentă, putem găsi răspunsul folosind o metodă brută, folosirea binary lifting se va dovedi instrumentală pentru aflarea LCA-ului în $O(\log n)$. Cu alte cuvinte, mai întâi vom vrea să aducem nodurile la același nivel, iar mai apoi, urcăm în arbore până când ajungem fix înainte de nodul care ne va da răspunsul. Cazul când un nod este strămoșul altuia se tratează anterior. Codul de mai jos se bazează pe precalculările menționate mai sus.

```cpp
int solve (int a, int b) {
	if (lvl[a] < lvl[b])
		swap(a, b);
	for (int i = 18; i >= 0; --i)
		if (lvl[a] - (1<<i) >= lvl[b])
			a = anc[i][a];
	if (a == b)
		return a;
	for (int i = 18; i >= 0; --i) 
		if (dp[i][a] != dp[i][b])
			a = anc[i][a], b = anc[i][b];
	return anc[0][a];
}
```

# Small-to-large

TO-DO

# Centroid Decomposition

# Heavy Light Decomposition

# Alte probleme și resurse utile


* [Euler Tour Technique](https://usaco.guide/gold/tree-euler)
* [Binary Lifting + LCA](https://usaco.guide/plat/binary-jump?lang=cpp)
* [Centroid Decomposition](https://usaco.guide/plat/centroid?lang=cpp)
* [Small-to-large](https://usaco.guide/plat/merging?lang=cpp)
* [Heavy Light Decomposition](https://usaco.guide/plat/hld?lang=cpp)
* [LCA, predat la CPPI Craiova](https://iordachebogdan.github.io/cppi/lca_nivel_avansat.html)
* [Milk Visits USACO Silver](http://www.usaco.org/index.php?page=viewproblem2&cpid=968)
* [Sap](https://kilonova.ro/problems/1802)
* [Tutorial - Binary lifting](https://codeforces.com/blog/entry/100826)
* [Tutorial video Errichto (Binary lifting)](https://www.youtube.com/watch?v=oib-XsjFa-M)
