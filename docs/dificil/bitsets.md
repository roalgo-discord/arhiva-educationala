---
tags:
    - implementare
    - biti
    - optimizare
---

**Autor**: Matei Ionescu

!!! example "Cunoștințe necesare"
    - [Introducere în STL](https://edu.roalgo.ro/cppintro/stl/)
    - [Operații pe biți](https://edu.roalgo.ro/mediu/bitwise-ops/)

## Introducere

In **C++**, clasa **bitset** constituie o succesiune de biți, putând fi asociată
cu un **vector**, însă numărul de elemente este constant pe parcursul rulării
programului. În linii mari, **bitset** nu aduce o contribuție mare asupra
corectitudinii unui algoritm, sau nu reprezintă o tehnică propriu-zisă, fiind
folosit de cele mai multe ori doar pentru a face optimizări semnificative asupra
timpului sau memoriei.

### Sintaxă

- `std::bitset` se regăsește in librăriile`<bitset>` sau `<bits/stdc++.h>`.
- Linia `bitset<N> b;` declară un bitset cu exact $N$ biți, $N$ este constantă,
  i.e. se specifică explicit valoarea acesteia la declarare.
- De asemenenea putem declara un **bitset** care să conțină biții unui număr:
  `bitset<10> b(13)`.

```cpp
bitset<10> b;
int main(){
 
 b[0] = 1;
 b[3] = 1;
 b[9] = 1;

 cout << b;
}
```

```
1000001001
```

!!! note "Observații"
    - Elementele sunt indexate de la 0.
    - `cout << b;` va afișa toate elementele de la **dreapta la stanga**.
    - Este prezent `operator[]`.

### Operatori permiși

- `operator==` și `operator!=` compară conținutul cu alt `bitset`.
- `operator[]` accesează valoarea unui bit la o poziție anume.
- `operator&=` operator binar **ȘI**.
- `operator|=` operator binar **SAU**.
- `operator^=` operator binar **XOR**.
- `operator~` operator binar **NOT**.
- `operator<<=` shift pe biți la stanga.
- `operator>>=` shift pe biți la dreapta.

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

```
0000000010
0000001111
0000000000
```

!!! note "Observație"

    Dacă shiftarea, într-o oarecare direcție, presupune pentru unele elemente
    egale cu 1 să "iasă" din **bitset**, atunci valorile de 1 aferente se
    vor pierde  
    permanent.

### Funcții permise

<!-- me when dau functii de gcc ca fiind litera de lege... bravo sefule -->

- `_Find_first()` returnează prima poziție a unui bit setat (cea cu index
  minim).
- `_Find_next(int pos)` returnează următorul bit setat după poz, iar în cazul în
  care nu există va returna lungimea **bitsetului**
- `.count()` returnează numărul de biți setați.
- `.reset()` resetează toți biții la 0.
- `.flip(int pos)`: $b[pos]$ devine $b[pos]$ **xor** 1, i.e. schimbă bitul
  $pos$ din 0 în 1 și invers.
- `.to_string()` va converti **bitsetul** într-un **string**.
- `.to_ulong()` va converti **bitsetul** într-un `unsigned long`.
- `.to_ullong()` va converti **bitsetul** într-un `unsigned long long`.

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

```
3
0000001001
0
0000001101
13
```

!!! note "Observație"

    La fel cum putem declara `bitset<N> b(val)`, la fel de bine putem atribui `b
    = val`, dar în ambele cazuri se vor copia doar primii $N$ biți.

## `std::bitset` în programare competitivă

Operațiile binare funcționează la fel ca atunci când le folosim pe alte tipuri
de date cum ar fi `int`, dar datorită dimensiunilor mari pe care le poate
suporta un **bitset**, acestea vin de cele mai multe ori cu o optimizare
crucială ce constă în gruparea **biților** în grupe de câte 32 elemente,
convertirea acestora în **int**, aplicarea operației și înlocuirea numărului în
bitset. Cum pe un număr întreg o operație binară este constantă, putem deduce
deci că complexitatea pentru o astfel de operație este $O ( \frac{N}{w} )$ ,
unde $w$ de regulă seminifică constanta cu care este împărțit numărul de
elemente $N$.

!!! note "Atenție"

    Notații de tipul $O (\frac{N}{32})$ sau $O (\frac{N}{64})$ nu sunt corecte,
    pentru că de cele mai multe ori [constantele sunt
    ignorate](https://afnanmostafa.medium.com/constants-in-big-o-notation-72ce819684ae),
    de aceea se folosește variabila $w$.

### Problema [somnoros](https://kilonova.ro/problems/677?list_id=461)

Un prim exemplu este o problemă destul de clasică care ne cere să determinăm
dacă într-un graf orientat aciclic avem drum de la un nod la altul.

Considerăm următoare abordare: $dp[u][v] = 1$ dacă afirmația este adevarată.
Pentru a calcula eficient dinamica am putea sorta topologic graful. Astfel dacă
fixăm o rădăcină, i.e. un nod cu gradul interior 0 neeliminat până în prezent,
atunci putem "propaga" dp-ul în fiecare fiu al său, adică `dp[f_j][x] |=
dp[r_i][x]`, cu condiția că muchia dintre $r_i$ și $f_j$ să nu fie eliminată.
Observăm că pentru 2 noduri $u$ și $v$, `dp[u][x] |= dp[v][x]` este
echivalentul la `b1 |= b2`, unde $b1$ și $b2$ reprezintă 2 `std::bitset`-uri.
Deci dacă în loc de `vector<vector<int>> dp(n + 1, vector<int>(n + 1))` am pune
`vector<bitset<const int>> dp(n + 1)`, am putea face tranzițiile în $O (
\frac{N}{w} )$, complexitatea finală fiind $O ( \frac{N^2}{w} )$.

```cpp
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

Avem $n$ probleme, a $i$-a având $k_i$ subtask-uri, fiecare cu un număr de
puncte între 1 și 100. Problema ne cere să calculăm numărul total de
punctaje distincte care se pot forma în urma rezolvări celor $n$ probleme.

O primă observație este că problemele pot fi luate independent, ceea ce înseamnă
că nu contează ce subtask-uri are o anumită problemă, ci câte subtask-uri au un
anumit punctaj. Fie $fr[i]$ numărul de subtask-uri cu $i$ puncte, și $dp[i] = 1$
dacă există un set de subtask-uri cu suma $i$. Este destul de clar că putem
constitui următorul rucsac:

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

Ar trebui să fie destul de evident că putem folosi **bitset** pentru a optimiza
problema:

```cpp
bitset<maxsum + 1> dp;
dp[0] = 1;
for(int i = 1; i <= 100; i++){
    for(int j = 1; j <= fr[i]; j++){
        dp |= (dp << i);
    }
}
```

Cu operatorul `|=` păstrăm sumele deja calculate în **dp**, iar cu operatorul
`<<` vom face tranzițiile, cu alte cuvinte dacă shiftăm fiecare bit cu $i$
poziții, toate sumele prezente în **dp** vor crește cu $i$, sintaxă echivalentă
cu `dp[s + i] |= dp[s];`.

Complexitatea devine $O ( S \cdot maxsum \cdot \frac{1}{w} )$, care este încă
prea mare. Putem să o optimizăm "comprimând" fiecare $fr_i$ în puteri de 2.
Considerăm cel mai mic $p$ pentru care $2^p \leq fr_i$, astfel $fr_i = \sum_{j =
0}^{p-1} 2^j + fr_i - 2^p + 1$. Folosind primele $p-1$ puteri de 2 putem să
construim fiecare număr de la 1 la $2^{p}-1$, și cu ajutorul la $fr_i - 2^p +
1$, vom putea reprezenta fiecare număr de la 1 la $fr_i$, ceea ce implică
faptul că și în dp-ul nostru vor fi prezentate toate combinațiile de a lua
numărul $i$.

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

Timpul se reduce la $O ( log(S) \cdot maxsum \cdot \frac{1}{w} )$

### Problema [Copaci](https://kilonova.ro/problems/2805), Lot 2024 Baraj 2 Juniori

Ni se dă o matrice (o vom nota $M$) cu $N \cdot N$ elemente și un string $S$,
ambele conținând cifre de la 0 la 9. Problema ne cere să aflăm care e cel
mai mare prefix al șirului $S$ care poate fi reprezentat ca un drum valid în
matricea noastră. Un drum este valid dacă începe în oricare poziție din matrice
și următorul element are exact o latură comună cu cel actual, iar fiecare
element din drum este egal cu reprezentantul lui în șir. Citiți problema pentru
a înțelege mai bine.

Vom aborda o metodă similară cu prima problema, unde vom reține într-un tablou
dacă o poziție anume a fost "atinsă" până acuma sau nu.

Pentru a înțelege mai bine haideți să vizualizăm concret ce se întâmplă pe unul
dintre exemple:

<!-- TODO: sa ii repar culorile oribile ale lui ioma... mfw testez doar pe dark mode :) -->

$$
\begin{array}{ccccc} \textcolor{gray}{3} & \textcolor{blue}{6} & \textcolor{gray}{2} & \textcolor{gray}{3} & \textcolor{gray}{1} \\ \textcolor{gray}{9} & \textcolor{gray}{2} & \textcolor{gray}{9} & \textcolor{gray}{2} & \textcolor{gray}{8} \\ \textcolor{gray}{0} & \textcolor{gray}{8} & \textcolor{gray}{0} & \textcolor{gray}{4} & \textcolor{gray}{4} \\ \textcolor{gray}{5} & \textcolor{gray}{1} & \textcolor{gray}{8} & \textcolor{blue}{6} & \textcolor{gray}{8} \\ \textcolor{gray}{4} & \textcolor{gray}{3} & \textcolor{gray}{3} & \textcolor{gray}{0} & \textcolor{gray}{1} \\ \end{array}
$$

$S = \textcolor{blue}{6} \text{281864292913}$

Cu albastru sunt marcate elementele care coincid cu prefixul de lungime 1. În
momentul în care decidem să ne mutăm poziția din matrice, ar trebui luat în
considerare fiecare element adiacent cu măcar o poziție colorată deja. Pentru o
linie, acest lucru presupune "shiftarea" la stânga și la dreapta a fiecarui
element deja marcat. Mai concret, dacă $G_l$ reprezintă mulțimea de puncte
$(a_1, a_2, a_3, \dots , a_k)$, astfel încât $M_{l,a_i}$ este albastru, după un
update $G$ va fi egal cu $( (a_1 - 1), (a1 + 1), (a_2 - 1), (a_2 + 1), \dots,
(a_k-1), (a_k + 1) )$.

Pentru prima linie, procesul descris mai sus ar arăta în felul următor:

$$
\textcolor{gray}{3} \quad \textcolor{blue}{6} \quad \textcolor{gray}{2} \ \textcolor{gray}{3} \ \textcolor{gray}{1} \Rightarrow \textcolor{blue}{3} \quad \textcolor{gray}{6} \quad \textcolor{blue}{2} \quad \textcolor{gray}{3} \quad \textcolor{gray}{1}
$$

Singura problemă pe care o întâmpinăm este dată de corelarea corectă a fiecarei
poziți din drum cu cea din șirul $S$. Adică, elementul cu valoarea 3 nu ar
trebui marcat, deoarece $S_2 = 2$. Există o soluție totuși pentru problema
noastră, care constă în reținerea în alt **bitset** , în funcție de sensul în
care shiftăm, dacă există o poziție $p$ pentru care $M_{l,p} = S_i$ și
$M_{l,p-1} = S_{i-1}$ (în cazul în care vrem să shiftăm la dreapta).

De exemplu, `left[l][a][b][p] = 1` dacă pe linia $l$ există $p+1$ pentru care
$M_{l,p+1} = a$ și $M_{l,p} = b$ (facem tranziție de la $a$ la $b$), și
`right[l][a][b][p] = 1` dacă există $p-1$ pentru care $M_{l,p-1} = a$ și
$M_{l,p} = b$. Cu astea fiind spuse, definim `dp[a][b] = 1` dacă putem atinge
elementul $(a,b)$ după un număr de pași, atunci: `dp[a] = ((dp[a] << 1) &
left[a][x][y]) | ((dp[a] >> 1) & right[a][x][y])` unde $S_i = y, S_{i-1} = x$.

Pentru a tranziționa de pe o linie pe alta (mergem în sus sau în jos), procedăm
la fel doar că de data asta vom reține `up[l][a][b][p], down[l][a][b][p]`.

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

## Bitset dinamic

Prin dinamic înțelegem faptul că **bitsetul** își poate modifica numărul de
elemente pe parcursul execuției programului, sau îl putem declara direct cu cât
vrem noi (`bitset<>a(n)`?). De ce am avea nevoie oare de așa ceva? Pentru
eficiență, poate. Este destul de tedious să facem toate operațiile pe aceeși
constană $N$ știind clar că în unele cazuri nu avem nevoie de toți biții. De
pildă, există probleme care necesită folosirea unui `bitset` dinamic. Un exemplu
bun ar fi:

### Problema [PermuteTree-Hard](https://codeforces.com/contest/1856/problem/E2)

Pentru un arbore cu $n$ noduri (rădăcină este nodul 1) și o permutare $a$,
definim $f(a)$ ca fiind numărul de perechi $(u,v)$ pentru care $a_u <
a_{lca(u,v)} < a_v$. Aici, $lca(u,v)$ reprezintă cel mai jos strămoș comun al
celor două noduri. Problema ne cere să aflăm care ar fi valoarea maximă pe care
o poate lua $f(a)$, pentru oricare permutare de $n$ numere.

Ne vom folosi de un raționament tipic programării dinamice și vom calcula pentru
fiecare nod rezultatul dacă am considera arborele ca fiind subarborele nodului
respectiv, iar permutarea va conține doar nodurile din subarborele actual. Adică
daca $sz_u$ = numărul de noduri din subarborele lui $u$, $a$ va fi egal cu
$(1,2,\dots, sz_u)$. Când facem tranziție de la $u$ la părintele lui, o sa avem
, astfel, pentru fiecare fiu împarte câte o permutare care va fi indepdentă de
restul permutărilor. Cu alte cuvinte, dacă notăm cu $f_i$ al $i$-lea fiu al unui
nod $v$, atunci permutarile vor fi $a_1, a_2, \dots, a_k$. Din aceste permutări
noi vom dori să construim permutarea necesară nodului $v$ adk $a_v = (1, 2,
\dots, sz_v)$. Ca să facem asta trebuie să ținem cont de :

- Permutările deja existente (i.e. permutările fiilor);
- Ce valoare va primi nodul $v$.

Pentru a forma $a_v$ din permutările deja existente, putem efectiv incrementa un
număr de permutări cu constante diferite astfel încât $(1) \ \ a_1 \cup a_2 \cup
\dots \cup a_k = a_v / \{ x \}$, unde $x$ va fi valoarea nodului $v$. Putem
incrementa o permutare pentru că până la urmă nu contează valorile propriu-zise,
ci doar cum sunt ordonate.

Relația $(1)$ implică faptul că fiecare permutare reprezintă un interval
continuu de elemente din $a_v$. Dacă nu avem nicio permutare $a_i$ care să
conțină pe $x$, înseamnă efectiv ca fie toate elementele din $a_i$ sunt mai mici
ca $x$, fie sunt mai mari ca $x$. Uitându-ne la relația din enunț $a_{f_i} < a_v
= x < a_{f_j}$, împreună cu ce-am dedus până acum, deducem că contribuția
nodului $v$ la rezultat este $(sz_v - S - 1) \cdot S$ , cu condiția că există o
submulțime a fiilor cu $\sum_{r} sz_{f_r} = S$.

Problema se rezumă la : află pentru fiecare nod care este $S$-ul care
maximizează contribuția, adună rezultatele și afișează răspunsul.

Pentru varianta ușoară a problemei putem află dacă $S$ constituie o sumă valida
folosind dp. Similar cu a doua problemă discutată, putem optimiza dp-ul cu
ajutorul unui **bitset**, complexitatea finală fiind $O(\frac{N^2}{w})$.

### Program Cpp

```cpp
int n;
cin >> n;
vector<int> sz(n+1);
vector<vector<int>> liste(n + 1);
for(int i = 2; i <= n; i++){
    int p;
    cin >> p;
    liste[p].push_back(i);
    liste[i].push_back(p);
}
long long ans = 0;
function<void(int,int)> dfs = [&](int nod, int p){
    sz[nod] = 1;
    bitset<5001> b;
    b[0] = 1;
    for(auto i : liste[nod]){
        if(i == p) continue;
        dfs(i,nod);
        sz[nod] += sz[i];
        b |= (b << sz[i]);
    }
    long long maxim = 0;
    for(int i = 1; i <= sz[nod] - 1; i++){
        if(b[i]){
            maxim = max(maxim, 1LL * i * (sz[nod] - 1 - i));
        }
    }
    ans += maxim;
};
dfs(1,1);
cout << ans << '\n';
```

Valori pentru $n$ care depășesc $10^5$ cu greu întră în timp, iar pentru $n =
10^6$ este destul de clar că trebuie să optimizăm algoritmul.

O optimizare importantă, care nu ține de **bitset**, ci mai mult de
**programarea dinamică**, este similară (daca nu chiar identică) cu algoritmul
de **comprimare** explicat la problema **strehaia**. Dacă un element apare de
mai mult de 3 ori : $x, x, x$ , putem să lipim pe 2 dintre ei : $x, 2x$, fără
ca să stricăm corectitudinea la dp. Dacă repetăm procesul până când un element
apare de maxim 2 ori, iar împreună cu o proprietate care zice că : "Pentru un
șir $S$ cu $N$ elemente și suma elementelor $R$ $\Rightarrow$ sunt maxim
$O(\sqrt R)$ elemente distincte", rezultă ca în vectorul pe care aplicăm noi
**bitset** nu vor fi mai mult de $2 \cdot \sqrt{sz_v}$ elemente. Complexitatea
se reduce la $O(\frac{N \sqrt N}{w})$.

Dacă faceți doar atât, s-ar putea să vă luați **TLE** pe testul 5. Așadar ne
vom folosi de **bitset dinamic**, iar în loc să declarăm bitsetul mereu cu
$10^6$ elemente, îl vom declara cu $sz_v$ elemente. Foarte suprinzător dar
chestia asta întră destul de lejer în timp (sunt ironic lol) .

### Cum facem un bitset să fie dinamic?

Avem (cred) 2 metode:

- Îl scriem noi de mână;
- (Mai nou) Îl putem folosi pe acela introdus în librăria
  `<tr2/dynamic_bitset>`.

Un **bitset** dinamic scris de mână arată în felul următor:

<!-- ce naiba e cu asta ioma :sob: -->
```cpp
template <int len = 1>
void dynamic_bitset(int n) {
    if (n >= len) {
        dynamic_bitset<std::min(len*2, maxn)>(n);
        return;
    }
    
    bitset<len> dp;
    
    //do somethine with dp
}
```

Dacă nu este evident, ne folosim de template-uri pentru a ajunge la o lungime
minimă care depășeste pe $n$ în timp logaritmic.

Iar un bitset dinamic din librăria `<tr2/dynamic_bitset>` arată așa:

```cpp
#include <iostream>
#include <tr2/dynamic_bitset>
using namespace tr2
using namespace std;

int main(){

    dynamic_bitset<>dp(n);

    //do something with dp
}
```

Care este mai bun?

Pâi, ambele! Depinde foarte mult de ce vrei să faci cu el.

O diferență la `tr2::dynamic_bitset` este funcția `resize()`. În consecință,
`tr2::dynamic_bitset` este mai lent decât un **bitset** normal sau un **bitset
dinamic** cu template-uri. Însă, prima variantă de **bitset dinamic** nu-și
poate da resize, adică e mult spus **dinamic**. Dacă veți avea nevoie să
reutilizați același bitset dar cu lungime diferită, folosiți
`tr2::dynamic_bitset`, altfel varianta cu template-uri este superioară din punct
de vedere al timpului de execuție. Iar dacă nu aveți în general nevoie de
**bitset dinamic**, **folosiți bitsetul normal**.

## Cum eficientizăm memoria

Putem să copiem ce face **bitset** cel mai import (faptul că împarte numărul de
biți în grupe de câte $w$) și să rezolvăm problema pentru grupe de $w$ elemente
consecutive ca la final să dăm merge la rezultate.

### Problema [Infinity War, RMI 2015](https://kilonova.ro/problems/1837?var=ro-md)

Avem $N$ armate care sunt în război una cu alta, iar fiecare armată este
alcătuită din soldați cu diferite puteri (o armată are maxim un soldat cu o
anumită putere) numerotate de la 1 la $P$. Dacă 2 armate se luptă, vor
rămâne în viață doar soldații care nu își regăsesc puterea în armata inamică. De
exemplu, dacă reprezentăm armatele ca un șir de biți (unde bitul $i$ este setat
dacă există un soldat cu puterea $i$), atunci soldații care rămân în viață sunt
prezenți în **suma xor** a celor doua șiruri.

Avem $Q$ query-uri $(l,r)$ și trebuie să aflăm câți soldați rămân în viață dacă
se vor lupta armatele $l, l + 1, \dots, r$.

Fie $b_i$ un bitset cu soldații armatei $i$. Răspunsul este practic numărul de
biți în $b_l \oplus b_{l+1} \oplus \dots \oplus b_r$, unde $\oplus$ reprezintă
operația **XOR**. Putem face asta folosindu-ne de sumele xor pe prefixe, $sp_i =
b_i \oplus b_{i-1} \oplus \dots \oplus b_1$. Nu putem reține din păcate fiecare
bitset, nu încape $N \cdot P$ biți în 8MB.

Însă putem să luăm pe rând secvențe de câte $w$ elemente și să calculăm
rezultatul doar pentru ele, ca apoi să adunăm rezultatele pentru un query.

### Program Cpp

```cpp
const int N = 5e4 + 1, P = 1e4 + 1;

ifstream fin("infinitywar.in");
ofstream fout("infinitywar.out");
#define cin fin
#define cout fout
int n, q, p = 1, maxim;

//bitset<P> b[N];
vector<int> v[N];
int main(){
    cin.tie(0)->sync_with_stdio(0);
    cin >> n >> q;
    vector<pair<int, int>> qr(q + 1);
    vector<int> ans(q + 1);
    for(int i = 1; i <= n; i++){
        int k;
        cin >> k;
        for(int j = 1; j <= k; j++){
            int x;
            cin >> x;
            maxim = max(maxim, x);
            v[i].push_back(x);
        }
    }
    for(int i = 1; i <= q; i++){
        int l, r;
        cin >> l >> r;
        qr[i] = {l, r};
    }
    while(p <= maxim){

        vector<unsigned long long> b(n + 1);
        for(int i = 1; i <= n; i++){
            for(auto j : v[i]){
                if(p <= j && j <= p + 63){
                    b[i] = 1ULL * b[i] + (1ULL << (j - p));
                }
            }
            b[i] ^= b[i - 1];
        }
        for(int i = 1; i <= q; i++){
            unsigned long long nr = b[qr[i].second] ^ b[qr[i].first - 1];
            ans[i] += __builtin_popcountll(nr);
        }
        p++;
        p += 63;
    }
    for(int i = 1; i <= q; i++){
        cout << ans[i] << '\n';
    }
    //cout << 'a';
}
```

Complexitatea de timp rămâne tot $O(\frac{N \cdot P}{w})$ doar că acum memoria e
$O(N)$.

## Concluzii

Este de apreciat cu cât poate îmbunătății execuția unui algoritm un **bitset**.
Puteți să încercați să vă construiți voi un bitset custom, să experimentați cu
diferite valori ale lui $w$, cu diferite funcții etc.. În general nu ar trebui
să abuzați de un bitset, dar nici să-l desconsiderați. Găsiți o cale de mijloc.

## Probleme suplimentare

- [atcoder - Triangle](https://atcoder.jp/contests/abc258/tasks/abc258_g)
- [cses - Reachable Nodes](https://cses.fi/problemset/task/2138)
- [atcoder - Balancing Network
  (T=1)](https://atcoder.jp/contests/agc041/tasks/agc041_e)
- [Tzaph & Number Line](https://tlx.toki.id/contests/troc-15-div-1/problems/E)
- [Baltic OI 2019 - Nautil](https://oj.uz/problem/view/BOI19_nautilus)
- [Baltic OI 2010 - Candies](https://cses.fi/106/list/)
- [COCI 2015 - Uzastopni](https://oj.uz/problem/view/COCI15_uzastopni)
- [Platinum - Equilateral
  Triangles](http://www.usaco.org/index.php?page=viewproblem2&cpid=1021)
- [IZhO 2017 - Bootfall](https://oj.uz/problem/view/IZhO17_bootfall)
- [Baltic OI 2015 - Tug of War](https://oj.uz/problem/view/BOI15_tug)
- [codeforces - Rectangular
  Polyline](https://codeforces.com/contest/1444/problem/D)
- [Lot Seniori 2022 - erinaceida](https://kilonova.ro/problems/210)
- [Lot Seniori 2014 - Switch5](https://kilonova.ro/problems/1980)
- [Lot Seniori 2024 - Matrice Palindrom](https://kilonova.ro/problems/2798)
  (puteți 60 puncte cu bitset, eu nu știu să fac mai bine de atât)
- [holmesc](https://open.kattis.com/problems/holmes)

## Resurse suplimentare

- [How to get actual 64 bit bitsets on
  Codeforces](https://codeforces.com/blog/entry/77480)
- [Bitset - USACO Guide](https://usaco.guide/plat/bitsets)
- [Bitwise operations 2 — popcount & bitsets -
  Codeforces](https://codeforces.com/blog/entry/73558)
- [Dynamic Bitsets in GCC](https://codeforces.com/blog/entry/129454)
