---
tags:
    - implementare
    - biti
    - optimizare
---

**Autor**: Matei Ionescu

## Introducere
In **C++**, clasa **bitset** constituie o succesiune de biți, putând fi asociată cu un **vector**, însă numărul de elemente este constant pe parcursul rulării programului. În linii mari, **bitset** nu aduce o contribuție mare asupra corectitudinii unui algoritm, sau nu reprezintă o tehnică  propriu-zisă, fiind folosit de cele mai multe ori doar pentru a face optimizări semnificative asupra timpului sau memoriei. 

### Sintaxă
* ```std::bitset``` se regăsește in librăriile```<bitset>``` sau ```<bits/stdc++.h>```.
* Linia ```bitset<N> b;``` declară un bitset cu exact $N$ biți, $N$ este constantă, i.e. se specifică explicit valoarea acesteia la declarare.
* De asemenenea putem declara un **bitset** care să conțină biții unui număr: ```bitset<10> b(13)```.

**Program C++**
```cpp
bitset<10> b;
int main(){
	
	b[0] = 1;
	b[3] = 1;
	b[9] = 1;

	cout << b;
}

```

**Output**

```1000001001```

**Obsevăm că**:
* Elementele sunt indexate de la $0$.
* ```cout << b;``` va afișa toate elementale de la **dreapta la stanga**. 
* Este prezent ```operator[]```.

### Operatori permiși

* ```operator==``` și ```operator!=``` compară conținutul cu alt ```bitset```. 
* ```operator[]``` acceseazp valoarea unui bit la o poziție anume.
* ```operator&=``` operator binar **ȘI**.
* ```operator|=``` operator binar **SAU**.
* ```operator^=``` operator binar **XOR**.
* ```operator~``` operator binar **NOT**.
* ```operator<<=``` shift pe biți la stanga.
* ```operator>>=``` shift pe biți la dreapta.

**Program C++**
```cpp
bitset<10> b;
int main(){
	
	b[0] = 1;
	b <<= 1;
    	cout << b << '\n';


	b ^= 13;
	cout << b << '\n';
		
	b >>= 100;
	cout << b;
}

```

**Output**
```
0000000010
0000001111
0000000000
```
!!! note "Observație"
	Dacă shiftarea, într-o oarecare direcție, presupune pentru unele elemente egale cu $1$ să "iasă" din **bitset**, atunci valorile de $1$ aferente se vor pierde permanent.

### Funcții permise

* ```_Find_first()``` returnează prima poziție a unui bit setat (cea cu index minim).
* ```_Find_next(int pos)``` returnează următorul bit setat după poz, iar în cazul în care nu există va returna lungimea **bitsetului**
* ```.count()``` returnează numarul de biți setați.
* ```.reset()``` resetează toți biții la $0$.
* ```.flip(int pos)``` $b[pos]$ devine $b[pos]$ **xor** $1$, i.e. schimbă bitul $pos$ din $0$ în $1$ și invers.
* ```.to_string()``` va converti **bitsetul** într-un **string**.
* ```.to_ulong()``` va converti **bitsetul** într-un ```unsigned long```.
* ```.to_ullong()``` va converti **bitsetul** într-un ```unsigned long long```.

**Program C++**
```cpp
bitset<10> b;
int main(){
	
	b[3] = 1;
	cout << b._Find_next(0) << '\n';
	
	b.flip(0);
	cout << b.to_string() << '\n';
	
	b = 13;
	cout << b._Find_first() << '\n';
	cout << b << '\n';
	
	cout << b.to_ullong();
}

```

**Output**
```
3
0000001001
0
0000001101
13
```
!!! note "Observație"
	La fel cum putem declara ```bitset<N> b(val)```, la fel de bine putem atribui ```b = val```, dar în ambele cazuri  se vor copia doar primii $N$ biți.

## ```std::bitset``` in programare competitivă

Operațiile binare funcționează la fel ca atunci când le folosim pe alte tipuri de date cum ar fi ```int```, dar datorită dimensiunilor mari pe care le poate suporta un **bitset**, acestea vin de cele mai multe ori cu o optimizare crucială ce constă în gruparea **biților** în grupe de câte $32$ elemente, convertirea acestora în **int**, aplicarea operației și înlocuirea numărului în bitset. Cum pe un număr întreg o operație binară este constantă, putem deduce deci că complexitatea pentru o astfel de operație este $O ( \frac{N}{w} )$ , unde $w$ de regulă seminifică constanta cu care este împărțit numărul de elemente $N$.

!!! note "Atenție"
	Notații de tipul $O ( \frac{N}{32} )$  **sau**  $O ( \frac{N}{64} )$ nu sunt corecte, pentru că de cele mai multe ori [constantele sunt ignorate](https://afnanmostafa.medium.com/constants-in-big-o-notation-72ce819684ae), de aceea se folosește variabila $w$. 

### Problema [somnoros](https://kilonova.ro/problems/677?list_id=461)
Un prim exemplu este o problemă destul de clasică care ne cere să determinăm dacă într-un graf orientat aciclic avem drum de la un nod la altul.

Considerăm următoare abordare: $dp[u][v] = 1$ dacă afirmația este adevarată.
Pentru a calcula eficient dinamica am putea sorta topologic graful. Astfel dacă fixăm o rădăcină, i.e. un nod cu gradul interior $0$ neeliminat până în prezent, atunci putem "propaga" dp-ul în fiecare fiu al său, adică $dp[f_j][x] |= dp[r_i][x]$, cu condiția că muchia dintre $r_i$ și $f_j$ să nu fie eliminată. Observăm că pentru $2$ noduri $u$ și $v$, $dp[u][x] |= dp[v][x]$ este echivalentul la $b1 |= b2$, unde $b1$ și $b2$ reprezintă $2$ ```std::bitset```-uri. Deci dacă în loc de ```vector<vector<int>> dp(n + 1, vector<int>(n + 1))``` am pune ```vector<bitset<const>> dp(n + 1)```, am putea face tranzițiile în $O ( \frac{N}{w} )$, complexitatea finală fiind $O ( \frac{N^2}{w} )$.

**Program C++**
```cpp
#include <bits/stdc++.h>
using namespace std;
const int N = 5e4 + 1;
vector<bitset<N>> v(N);
bitset<N> viz;
vector<int> liste[N], d(N);
int n, m;

void topsort() {

	queue<int> q;
	for (int i = 1; i <= n; i++) {
		if (d[i] == 0) {
			q.push(i);
		}
	}

	while (!q.empty()) {
		int nod = q.front();
		q.pop();
		for (auto i : liste[nod]) {
			v[i][nod] = 1;
			v[i] |= v[nod];
			if (--d[i] == 0) {
				q.push(i);
			}
		}
	}


}
int main() {

	cin.tie(0)->sync_with_stdio(0);
	cin >> n >> m;
	for (int i = 1; i <= m; i++) {
		int u, v;
		cin >> u >> v;
		liste[u].push_back(v);
		d[v]++;
	}

	topsort();

	int q;
	cin >> q;
	while (q--) {
		int u, a;
		cin >> u >> a;
		cout << v[a][u] << '\n';
	}
}
```


### Problema [strehaia](https://kilonova.ro/problems/684?list_id=461)

Avem $n$ probleme, a $i$-a având $k_i$ subtaskuri, fiecare cu un număr de puncte între $1$ și $100$. Problema ne cere să calculăm numărul total de punctaje distincte care se pot forma în urma rezolvări celor $n$ probleme.

O primă observație este că problemele pot fi luate independent, ceea ce înseamnă că nu contează ce subtaskuri are o anumită problemă, ci câte subtaskuri au un anumit punctaj.
Fie $fr[i]$ numărul de subtaskuri cu $i$ puncte, și $dp[i] = 1$ dacă exista un set de subtaskuri cu suma $i$. Este destul de clar că putem constitui următorul rucsac:

```cpp
vector<int> dp(maxsum + 1);
dp[0] = 1;
for(int i = 1; i <= 100; i++){
    for(int j = 1; j <= fr[i]; j++){
        for(int s = 0; s <= maxsum; s++){
            if(s + i <= maxsum){
                dp[s + i] |= dp[s];
            }
        }
    }
}
```

Complexitatea de timp este $O(S \cdot maxsum)$, unde $S = \sum_{i=1}^{n} k_i$.

Ar trebui să fie destul de evident că putem folosi **bitset** pentru a optimiza problema:

```cpp
bitset<maxsum + 1> dp;
dp[0] = 1;
for(int i = 1; i <= 100; i++){
    for(int j = 1; j <= fr[i]; j++){
        dp |= (dp << i);
    }
}
```
Cu operatorul ``` |= ``` păstrăm sumele deja calculate în **dp**, iar cu operatorul ``` << ``` vom face tranzițiile, cu alte cuvinte dacă shiftăm fiecare bit cu $i$ poziții, toate sumele prezente în **dp** vor crește cu $i$, sintaxă echivalentă cu ```  dp[s + i] |= dp[s]; ```.

Complexitatea devine $O ( S \cdot maxsum \cdot  \frac{1}{w} )$, care este încă prea mare. Putem să o optimizăm "comprimând" fiecare $fr_i$ în puteri de $2$. Considerăm cel mai mic $p$ pentru care $2^p \leq fr_i$, astfel $fr_i = \sum_{j = 0}^{p-1} 2^j  + fr_i - 2^p + 1$. Folosind primele $p-1$ puteri de $2$ putem să construim fiecare număr de la $1$ la $2^{p}-1$, și cu ajutorul la $fr_i - 2^p + 1$, vom putea reprezenta fiecare număr de la $1$ la $fr_i$, ceea ce implică faptul că și în dp-ul nostru vor fi prezentate toate combinațiile  de a lua numărul $i$.

```cpp
dp[0] = 1;
for (int i = 1; i <= 100; i++) {
	int mask = 1;
	while (fr[i]) {
		fr[i] -= mask;
		dp |= (dp << (i * mask));
		mask *= 2;
		if (mask > fr[i]) {
			mask = fr[i];
		}
	}
}
```

**Programul complet**
```cpp
#include <bits/stdc++.h>
using namespace std;

int n;
vector<int> fr(101);
bitset < (int)1e6 + 200 > dp;
int main() {
	cin.tie(0)->sync_with_stdio(0);
	cin >> n;
	for (int i = 1; i <= n; i++) {
		int w;
		cin >> w;
		for (int j = 1; j <= w; j++) {
			int val;
			cin >> val;
			fr[val]++;
		}
	}
	
	dp[0] = 1;
	for (int i = 1; i <= 100; i++) {
		int mask = 1;
		while (fr[i]) {
			fr[i] -= mask;
			dp |= (dp << (i * mask));
			mask *= 2;
			if (mask > fr[i]) {
				mask = fr[i];
			}
		}
	}
	cout << dp.count();
}
```

Timpul se reduce la $O ( log(S) \cdot maxsum \cdot  \frac{1}{w} )$

### Problema [Copaci](https://kilonova.ro/problems/2805), Lot 2024 Baraj 2 Juniori

Ni se dă o matrice (o vom nota $M$) cu $N \cdot N$  elemente și un string $S$, ambele conținând cifre de la $0$ la $9$. Problema ne cere să aflăm care e cel mai mare prefix al șirului $S$ care poate fi reprezentat ca un drum valid în matricea noastră. Un drum este valid dacă începe în oricare poziție din matrice și următorul element are exact o latură comună cu cel actual, iar fiecare element din drum este egal cu reprezentantul lui în șir. Citiți problema pentru a înțelege mai bine.

Vom aborda o metodă similară cu prima problema, unde vom reține într-un tablou dacă o poziție anume a fost "atinsă" până acuma sau nu.

Pentru a înțelege mai bine haideți să vizualizăm concret ce se întâmplă pe unul dintre exemple:

 $\textcolor{white}{3} \ \textcolor{blue}{6} \ \textcolor{white}{2 \ 3 \ 1}$  
 $\textcolor{white}{9} \ \textcolor{white}{2} \ \textcolor{white}{9 \ 2} \  \textcolor{white}{8}$  
 $\textcolor{white}{0} \ \textcolor{white}{8} \ \textcolor{white}{0} \ \textcolor{white}{4} \ \textcolor{white}{4}$  
 $\textcolor{white}{5} \ \textcolor{white}{1 \ 8} \ \textcolor{blue}{6} \ \textcolor{white}{8}$  
$\textcolor{white}{4 \ 3 \ 3 \ 0 \ 1}$

$S = \textcolor{blue}{6} \text{281864292913}$

Cu albastru sunt marcate elementele care coincid cu prefixul de lungime $1$. În momentul în care  decidem să ne mutăm poziția din matrice, ar trebui luat în considerare fiecare element adiacent cu măcar o poziție colorată deja. Pentru o linie, acest lucru presupune "shiftarea" la stânga și la dreapta a fiecarui element deja marcat. Mai concret, dacă $G_l$ reprezintă mulțimea de puncte $(a_1, a_2, a_3, \dots , a_k)$, astfel încât $M_{l,a_i}$ este albastru, după un update $G$ va fi egal cu $( (a_1 - 1), (a1 + 1), (a_2 - 1), (a_2 + 1), \dots, (a_k-1), (a_k + 1) )$.

Pentru prima linie, procesul descris mai sus ar arăta în felul următor:


$$\textcolor{white}{3} \ \textcolor{blue}{6} \ \textcolor{white}{2 \ 3 \ 1} \Rightarrow \textcolor{blue}{3} \ \textcolor{white}{6} \ \textcolor{blue}{2} \ \textcolor{white}{3 \ 1}$$

Singura problemă pe care o întâmpinăm este dată de corelarea corectă a fiecarei poziți din drum cu cea din șirul $S$. Adică, elementul cu valoarea $3$ nu ar trebui marcat, deoarece $S_2 = 2$. Există o soluție totuși pentru problema noastră, care constă în reținerea în alt **bitset** , în funcție de sensul în care shiftăm, dacă există o poziție $p$ pentru care $M_{l,p} = S_i$ și $M_{l,p-1} = S_{i-1}$ (în cazul în care vrem să shiftăm la dreapta).

De exemplu, ```left[l][a][b][p] = 1``` dacă pe linia $l$ există $p+1$ pentru care $M_{l,p+1} = a$ și $M_{l,p} = b$ (facem tranziție de la $a$ la $b$), și ```right[l][a][b][p] = 1``` dacă există $p-1$ pentru care $M_{l,p-1} = a$ și $M_{l,p} = b$. Cu astea fiind spuse, definim ```dp[a][b] = 1``` dacă putem atinge elementul $(a,b)$ după un număr de pași, atunci:

	dp[a] = ((dp[a] << 1) & left[a][x][y]) | ((dp[a] >> 1) & right[a][x][y])
 unde $S_i = y, S_{i-1} = x$.

Pentru a tranziționa de pe o linie pe alta (mergem în sus sau în jos), procedăm la fel doar că de data asta vom reține ```up[l][a][b][p], down[l][a][b][p]```.

Complexitatea este $O(|S| \cdot \frac{N^2}{w})$.

### O parte din cod (cpp)
```cpp
int ans = 0;
vector<bitset<101>> dp(n + 1),new_dp(n + 1);
for(int i = 1; i <= n; i++){
	for(int j = 1; j <= n; j++){
	    if(M[i][j] == s[1]-'0'){
		dp[i][j] = 1;
		ans=1;
	    }
	}
}

bitset<101> rest;
for(int l = 2; l< s.size(); l++){
	
	int nr1 = s[l-1]-'0',nr2 = s[l]-'0';
	for(int i = 1; i <= n; i++){
	    new_dp[i] = (new_dp[i]|((dp[i]>>1)& right[i][nr1][nr2]));
	    new_dp[i] = (new_dp[i]|((dp[i]<<1)& left[i][nr1][nr2]));
	    if(i > 1) new_dp[i-1] = (new_dp[i-1]|(dp[i]& up[i-1][nr1][nr2]));
	    if(i < n) new_dp[i + 1] = (new_dp[i + 1]|(dp[i]& down[i + 1][nr1][nr2]));
	}
	
	
	for(int i = 1; i <= n; i++){
	    if(new_dp[i]._Find_first() != 101){
		ans = l;
	    }
	
	    swap(dp[i], new_dp[i]);
	    new_dp[i] &= rest;
	}
	if(ans != l){
	    break;
	}
}

cout << ans << '\n';
```

 Aceasta reprezintă doar o soluție, se poate și mai simplu.

 
##  Bitset dinamic

Prin dinamic înțelegem faptul că **bitsetul** își poate modifica numărul de elemente pe parcursul execuției programului, sau îl putem declara direct cu cât vrem noi (```bitset<>a(n)```?). De ce am avea nevoie oare de așa ceva? Pentru eficiență, poate. Este destul de tedious să facem toate operațiile pe aceeși constană $N$ știind clar că în unele cazuri nu avem nevoie de toți biții. De pildă, există probleme pentru care necesită folosirea unui ```bitset``` dinamic. Un exemplu bun ar fi:

### Problema [PermuteTree-Hard](https://codeforces.com/contest/1856/problem/E2)

Pentru un arbore cu $n$ noduri (rădăcină este nodul $1$) și o permutare $a$, definim $f(a)$ ca fiind numărul de perechi $(u,v)$ pentru care $a_u \leq a_{lca(u,v)} \leq a_v$. Aici, $lca(u,v)$ reprezintă cel mai jos strămoș comun al celor două noduri. Problema ne cere să aflăm care ar fi valoarea maximă pe care o poate lua $f(a)$, pentru oricare permutare de $n$ numere.

O să forțăm puțin raționamentul spunând că pentru fiecare nod vom calcula rezultatul (i.e. cu cât contribuie nodul $u$ la rezultat) folosind permutarea numerelor de la $1$ la $sz_u$ ($sz_u$ este numărul de elemente din subarborele lui $u$). Ideea e că dacă vom aduna cu o constantă fiecare element din permutare, rezultatul se păstrează, pentru că până la urmă tot ce contează este modul în care elementele sunt ordonate.

Raționamentul ne permite să obervăm că, dacă ne fixăm valoarea nodului $u$ (fie ea H), putem aduna fiecare permutare în cu un număr în așa fel încât să formăm permutarea ``` 1, 2, ... , sz[u] ```, iar rezultatul pentru nodul $u$ va fi dat de numărul de elememente din permutarea nouă care sunt mai mici ca $H$ înmulțit cu numărul de elemente mai mari ca $H$. Atunci practic trebuie să găsim o mulțime de fii ai lui $u$ astfel încat numărul de noduri din mulțime $\cdot$ numărul de elemente care nu sunt în mulțime să fie maxim. 

Concret, rezultatul e maximul dintre $D \cdot (sz_u - D - 1)$ cu condiția că există o sumbulțime de fii cu $\sum_{i} sz_{fiu_i} = D$.

O observație esențială pe care o deducem de aici este faptul că rezultatul optim pentru fiecare nod nu depinde de rezultatul optim al celorlalte noduri.
## "Tips and tricks" pentru bitset

## OK, cat e concret $w$?




## Concluzii 

## Probleme suplimentare

## Resurse suplimentare

* [Bitset - USACO Guide](https://usaco.guide/plat/bitsets)
* [Bitwise operations 2 — popcount & bitsets - Codeforces](https://codeforces.com/blog/entry/73558)
