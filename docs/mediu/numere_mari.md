---
tags:
    - vectori
    - matematica
    
---

Fie $\overline{a_{n-1} a_{n-2} \ldots a_1 a_0}$ un număr în baza $10$, format din $n$ cifre. Aici, $a_i$ pentru $0 \leq i < n$ sunt cifrele numărului, cu fiecare $a_i$ satisfăcând $0 \leq a_i \leq 9$, și $a_{n-1} \neq 0$. Valoarea numărului este dată de:

$$\overline{a_{n-1} a_{n-2} \ldots a_1 a_0} = \sum_{i=0}^{n-1} a_i \times 10^i$$

Această sumă poate fi descompusă în:

$$\overline{a_{n-1} a_{n-2} \ldots a_1 a_0} = a_{n-1} \times 10^{n-1} + a_{n-2} \times 10^{n-2} + \ldots + a_1 \times 10^1 + a_0 \times 10^0$$

Similar, fie $(\overline{a_{n-1} a_{n-2} \ldots a_1 a_0})_b$ un număr în baza $b$, format din $n$ cifre, unde $a_i$ pentru $0 \leq i < n$ sunt cifrele numărului, cu fiecare $a_i $ satisfăcând $0 \leq a_i < b $, și $a_{n-1} \neq 0 $. Valoarea numărului este dată de:
$$
\overline{a_{n-1} a_{n-2} \ldots a_1 a_0}_b = \sum_{i=0}^{n-1} a_i \times b^i
$$
Această sumă poate fi descompusă în:
$$
\overline{a_{n-1} a_{n-2} \ldots a_1 a_0}_b = a_{n-1} \times b^{n-1} + a_{n-2} \times b^{n-2} + \ldots + a_1 \times b^1 + a_0 \times b^0
$$

Numerele mari sunt esențiale pentru calcule ce depășesc limita de $2^{63} - 1$. Acestea se bazează pe reprezentarea cifrică a numerelor. De exemplu, să reprezentăm numărul $82534$ folosind definiția numerelor în baza $10$:
$$
82534 = 8 \times 10^{4} + 2 \times 10^3 + 5 \times 10^2 + 3 \times 10^1 + 4 \times 10^0 \Rightarrow
$$
$$
82534 = 8 \times 10000 + 2 \times 1000 + 5 \times 100 + 3 \times 10 + 4 \times 1
$$

## Reprezentarea numerelor în memorie

Reprezentarea pe cifre a numerelor ne duce cu gândul la reprezentarea numărului folosind un vector, astfel o abordare comună pentru manipularea numerelor mari în algoritmica este reprezentarea acestora prin intermediul unui vector de cifre. Considerăm un număr mare, pe care îl descompunem în cifrele sale componente și le stocăm într-un vector.

De exemplu, numărul $82534$ poate fi stocat într-un vector v astfel:
$$
\begin{array}{r|cccccccc}
\text{Index } i & 0 & 1 & 2 & 3 & 4\\
\hline
v[i] & 4 & 3 & 5 & 2 & 8 \\
\end{array}
$$

### Reprezentarea inversă 

Fie un număr natural $N $ cu cifrele $\overline{a_{n-1} a_{n-2} \ldots a_1 a_0} $ în baza 10. Reprezentarea inversă a lui $N$ într-un vector $v$ de dimensiune $n $ este definită astfel:
$$v[i] = a_{n-i} \quad \text{pentru} \quad i = 0, 1, \ldots, n-1$$
unde $v[0] $ reprezintă cifra unităților, $v[1] $ cifra zecilor, și așa mai departe, și $n$ este numărul de cifre ale numărului natural $N$

#### Observație

Numerotarea cifrelor de la coadă, ca în exemplul anterior, este opțională, dar este indicată pentru simplificare, deoarece este mult mai simplu să efectuăm operațiile dacă păstrăm numărul în memorie în ordine inversă față de cum l-am scrie în mod obișnuit. Practic, adăugarea unor valori la pozițiile mai nesemnificative este o operație mult mai des întâlnită decât adăugarea la începutul numărului, iar când e nevoie, putem crește lungimea numărului plasând noua cifră pe poziția $n$, $v[n]$ ținând această valoare.

### Citirea și afișarea unui număr mare

Pentru citirea unui număr mare, vom citi lungimea numărului (numărul de cifre) și apoi cifrele sale, începând de la cea mai puțin semnificativă cifră (cifra unităților). Pentru afișare, procedăm invers, începând de la cea mai semnificativă cifră.

```cpp
#include <iostream>
using namespace std;

const int NMAX = 1000; // Lungimea maxima a numarului

int cifre[NMAX]; // Vectorul care va stoca cifrele numarului
int n; // Lungimea numarului

int main() {
    cin >> n; // Citim lungimea numarului
    for (int i = n - 1; i >= 0; i--) {
        cin >> cifre[i]; // Citim cifrele de la coada spre cap
    }

    // Afisare
    for (int i = n - 1; i >= 0; i--) {
        cout << cifre[i];
    }
    return 0;
}
```

### Optimizarea prin stocarea lungimii **v[0]**

O îmbunătățire semnificativă a acestei metode este reprezentată de utilizarea primei poziții a vectorului, $v[0]$, pentru a stoca lungimea numărului. Aceasta facilitează manipularea lungimii și permite modificări mai ușoare ale numărului, cum ar fi adăugarea sau eliminarea cifrelor.

### Reprezentarea inversă 

Fie un număr natural $N $ cu cifrele $\overline{a_{n-1} a_{n-2} \ldots a_1 a_0} $ în baza 10. Reprezentarea inversă a lui $N$ într-un vector $v$ de dimensiune $n $ este definită astfel:
$$v[0] = n$$
$$v[i + 1] = a_{n-i} \quad \text{pentru} \quad i = 0, 1, \ldots, n-1$$
unde $v[0]$ reprezintă cifra unităților, $v[1]$ cifra zecilor, și așa mai departe, și $n$ este numărul de cifre ale numărului natural $N$

De exemplu, numărul $82534$ va fi stocat astfel:
$$
\begin{array}{r|ccccccccc}
\text{Index } i & \boldsymbol{0} & 1 & 2 & 3 & 4 & 5\\
\hline
v[i] & \boldsymbol{5} & 4 & 3 & 5 & 2 & 8 \\
\end{array}
$$

Aici, $v[0]=5$ indică numărul de cifre din $N$, iar cifrele sunt stocate în ordine inversă începând de la $v[1]$

<!--Utilizare vector<int> în schimb, dar trebuie rescris totul--> 

### Procesarea Eficientă a Numerelor Mari în C++

Un aspect comun este citirea numerelor mari atunci atunci când acestea sunt prezentate ca un șir continuu de cifre, fără separatoare precum spațiile. O tehnică eficientă pentru a aborda această problemă implică utilizarea stringurilor. Această metodă are avantajul de a permite citirea numerelor indiferent de lungimea lor, fără a necesita specificarea acesteia în prealabil.

#### Pasul 1: Citirea Numărului ca String

Primul pas este citirea întregului număr ca un string. Aceasta este o abordare flexibilă care nu este constrânsă de lungimea numărului. De exemplu, pentru a citi un număr foarte mare:

```cpp
string numarMare;
cin >> numarMare;
```

#### Pasul 2: Conversia Stringului în Vector de Cifre

După citirea numărului, următorul pas este conversia fiecărui caracter al stringului într-o cifră numerică individuală și stocarea acesteia într-un vector. Această conversie este realizată prin scăderea valorii ASCII a caracterului '$0$' din fiecare caracter al stringului. De asemenea, lungimea numărului este salvată în prima poziție a vectorului pentru a facilita accesul și manipularea ulterioară a cifrelor. 

Iată cum arată implementarea:

```cpp
#include <iostream>
#include <string>

using namespace std;

const int NMAX = 1000; // Capacitatea maxima a vectorului
int cifre[NMAX]; // Vectorul care va stoca cifrele numărului

int main() {
    string numarMare;
    cin >> numarMare;

    cifre[0] = numarMare.size(); // Stocam lungimea numarului în cifre[0]
    for (int i = 0; i < cifre[0]; ++i) {
        cifre[cifre[0] - i] = numarMare[i] - '0'; 
    }

    // Afisarea vectorului
    for (int i = cifre[0]; i>= 1; i--) {
        cout << cifre[i];
    }
    cout << endl;

    return 0;
}
```

Această abordare simplifică semnificativ citirea numerelor mari

### Utilizarea vector<int> din STL pentru stocare

Când am făcut citirea cu stringuri, am folosit numarMare.size() pentru a afla lungimea stringului. Putem folosi aceasi metoda pentru a afla si lungimea numarlui fara sa o stocam in $v[0]$ dar pentru a putea realiza asta, trebuie sa folosim vector<int>, altfel nu mai trebuie sa stocam dimensiunea in $v[0]$

#### Crearea vectorului si inserarea/ștergerea cifrelor la inceput
```cpp
#include <iostream>
#include <vector>

using namespace std;

int main(){
    vector<int> cifre = {2, 1}; 
    // putem initializa astfel vectorul cu un numar predefinit
    // 12 in accest exemplu

    // afisam numarul
    cout << "Numarul de cifre: " << cifre.size() << "\n";
    // pornim de la cifre.size() - 1 deoarece vectorul e indexat cu zero
    for(int i = cifre.size() - 1; i >= 0; --i)
        cout << cifre[i];
    cout << "\n";

    // insearea unei cifre noi in fata
    cifre.push_back(9);

    cout << "Numarul de cifre: " << cifre.size() << "\n";
    for(int i = cifre.size() - 1; i >= 0; --i)
        cout << cifre[i];
    cout << "\n";

    cifre.pop_back(); //stergem ultima cifra
    cout << "Numarul de cifre: " << cifre.size() << "\n";
    for(int i = cifre.size() - 1; i >= 0; --i)
        cout << cifre[i];   
}
```
Observam că astfel dimensiunea vectorului poate varia, un lucru care ne poate ajuta extrem de mult atunci când nu știm cat de lung va fi numărul final. 

## Implementarea diverselor operații pe numerele mari

Pentru implementarea operațiilor pe numere mari, avem de-a face cu câteva cazuri, ce vor fi prezentate în ordinea frecvenței lor în practică, urmând ca la final să fie puse toate împreună într-o implementare completă a unei clase de numere mari, metodă ce se recomandă în special celor cu mai multă experiență. În subcapitolele ce urmează, voi presupune că ambii termeni ai operațiilor sunt numere mari, cu excepția împărțirii, unde vom trata împărțirea unui număr mare la număr mic, iar la înmulțire, vom trata și înmulțirea unui număr mare cu un număr mic, și înmulțirea unui număr mare cu un alt număr mare.

### Adunarea numerelor mari

Adunarea a două numere mari se va realiza în mod similar cu modul în care ați fost obișnuiți să adunați numere la școală în clasele mici, cifră cu cifră și ținând cont de transportul cifrelor adiționale. 

```cpp
for(int i = 1; i <= b[0]; i++)
    a[i] += b[i];
a[0] = max(a[0], b[0]);
for(int i = 1; i <= a[0]; i++)
    if(a[i] >= 10)
    {
        if(i == a[0])
            a[0]++;
        a[i+1]++;
        a[i] -= 10;
    }
```
### Scăderea numerelor mari

Scăderea a două numere mari se va realiza în mod similar cu modul în care ați fost obișnuiți să scădeți numere la școală în clasele mici, cifră cu cifră și ținând cont de transportul cifrelor necesare pentru efectuarea operațiilor. 

```cpp
for(int i = 1; i <= b[0]; i++)
    a[i] -= b[i];
for(int i = a[0]; i >= 1; i--)
    if(a[i] < 0)
    {
        a[i] += 10;
        a[i+1]--;
    }
while(a[a[0]] == 0)
    a[0]--;
```

### Compararea a două numere mari

Pentru a compara două numere mari, avem două cazuri simple de tratat, urmând ca restul implementării să fie similar cu modul în care am compara două șiruri de caractere.

Dacă cele două numere au un număr diferit de cifre, putem trage concluzia în mod evident, iar în caz contrar, vom lua cifră cu cifră, de la cea mai semnificativă la cea mai puțin semnificativă. 

### Înmulțirea unui număr mare cu un număr mic

Acest subcaz al înmulțirii poate fi implementat mult mai ușor, implementarea va prelua multe elemente din cele ale adunării a două numere mari. Vom presupune că vom înmulți numărul mare cu $x$.

```cpp
long long val = 0;
for(int i = 1; i <= a[0]; i++)
{
    val += 1LL * a[i] * x;
    a[i] = val % 10;
    val /= 10;
}
while(val)
{
    a[0]++;
    a[a[0]] = val%10;
    val /= 10;
}
```

### Înmulțirea a două numere mari

Înmulțirea a două numere mari va necesita lucrul cu toate cifrele numărului, complexitatea algoritmului devenind $O(n_A \cdot n_B)$, unde $n_A$ reprezintă numărul de cifre al lui $A$, iar $n_B$, numărul de cifre al lui $B$. Din nou, implementarea va fi asemănătoare cu cea învățată în clasele mici la școală.

```cpp
vector<long long> ans(a[0] + b[0]);
for(int i = 1; i <= a[0]; i++)
    for(int j = 1; j <= b[0]; j++)
        ans[i + j - 1] += 1LL * b[j] * a[i];
a[0] += b[0] - 1;
for(int i = 1; i <= a[0]; i++)
{
    if(ans[i] >= 10)
    {
        if(i == a[0])
        {
            a[0]++;
            ans.push_back(ans[i] / 10);
        }
        else
            ans[i+1] += ans[i] / 10;
        ans[i] %= 10;
    }
}
for(int i = 1; i < (int) ans.size(); i++)
    a[i] = ans[i];
```
            
### Împărțirea unui număr mare la un număr mic

La fel ca la înmulțire, vom lucra cifră cu cifră și vom avea grijă să luăm transportul cifră cu cifră. Vom presupune că vom împărți numărul mare la $x$.

```cpp
long long val = 0;
for(int i = a[0]; i >= 1; i--)
{
    val = val * base + a[i];
    a[i] = val / x;
    val %= x;
}
while(a[a[0]] == 0)
    a[0]--;
```

### Afișarea unui număr mare

Atunci când lucrăm cu o bază mai mare ca $10$, afișarea numărului poate deveni un pic mai complicată, fiind nevoie de atenție suplimentară pentru a face lucrurile să funcționeze. Aici am pus o implementare mai generalizată, unde $base$ este baza pe care o folosim (by default, e $10$ dar poate fi ajustată).

```cpp
bool ok = 0;
for(int i = a[0]; i >= 1; i--)
{
    if(ok == 1)
    {
        long long val = max(1LL, a[i]);                    
        while(val * 10 < base)
        {
            cout << 0;
            val *= 10;
        }
    }
    if(a[i] != 0)
        ok = 1;
    cout << a[i];
}
```

## Optimizări ce se pot face la implementare

Prima și cea mai evidentă optimizare constă în lucrul cu o bază mai mare ca $10$, de regulă putere a lui $10$. Se recomandă folosirea unei baze între $10^6$ și $10^8$, pentru a evita overflow-urile ce ar putea apărea de la stocarea individuală a fiecărei poziții drept un număr de $10$ sau mai multe cifre. Această optimizare poate fi utilă mai ales în situația în care foarte multe calcule sunt necesare sau limita de timp este strânsă. Un astfel de exemplu reprezintă problemele de programare dinamică în care trebuie afișat numărul complet de soluții (totuși, în prezent, o mare parte din acele probleme cer răspunsul modulo un număr prim).

De asemenea, așa cum veți observa mai târziu, există diverse metode de a optimiza operațiile de înmulțire, folosind diverși algoritmi precum algoritmul lui Karatsuba sau FFT, dar aceștia nu fac obiectul discuției noastre din acest articol. 


## Probleme și resurse suplimentare

* [Clasă de numere mari](https://github.com/stefdasca/CompetitiveProgramming/blob/master/Algorithms/bigints.cpp)
*  [Lucrul cu numere mari](https://infoarena.ro/lucrul-cu-nr-mari)
*  [Probleme cu numere mari](https://kilonova.ro/tags/379)
*  [perm3 de pe infoarena](https://www.infoarena.ro/problema/perm3)
*  [pastile, lot juniori 2015](https://kilonova.ro/problems/1663)
*  [număr, OJI 2010 IX](https://kilonova.ro/problems/794)