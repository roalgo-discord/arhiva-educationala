---
id: bignum
author:
    - Susan
    - Ștefan-Cosmin Dăscălescu
prerequisites:
    - basic-math
    - arrays
tags:
    - vectori
    - matematica
    - numere mari
    - implementare
---

Fie $\overline{a_{n-1} a_{n-2} \ldots a_1 a_0}$ un număr în baza 10, format
din $n$ cifre. Aici, $a_i$ pentru $0 \leq i < n$ sunt cifrele numărului, cu
fiecare $a_i$ satisfăcând $0 \leq a_i \leq 9$, și $a_{n-1} \neq 0$. Valoarea
numărului este dată de:

$$ \overline{a_{n-1} a_{n-2} \cdots a_1 a_0} = \sum_{k=0}^{n-1} a_k \cdot 10^k
$$

Această sumă poate fi descompusă în:

$$ \overline{a_{n-1} a_{n-2} \cdots a_1 a_0} = a_{n-1} \cdot 10^{n-1} + a_{n-2}
\cdot 10^{n-2} + \ldots + a_1 \cdot 10^1 + a_0 \cdot 10^0 $$

Similar, fie $(\overline{a_{n-1} a_{n-2} \ldots a_1 a_0})_b$ un număr în baza
$b$, format din $n$ cifre, unde $a_i$ îndeplinește aceleași condiții ca mai sus.
Valoarea numărului este dată de:

$$ \overline{a_{n-1} a_{n-2} \ldots a_1 a_0}_b = \sum_{k=0}^{n-1} a_k \cdot b^k
$$

Această sumă poate fi descompusă în:

$$ \overline{a_{n-1} a_{n-2} \ldots a_1 a_0}_b = a_{n-1} \cdot b^{n-1} + a_{n-2}
\cdot b^{n-2} + \ldots + a_1 \cdot b^1 + a_0 \cdot b^0 $$

Numerele mari sunt esențiale pentru calcule ce depășesc limita de $2^{63} - 1$.
Acestea se bazează pe reprezentarea cifrică a numerelor. De exemplu, să
reprezentăm numărul 82534 folosind definiția numerelor în baza 10:

$$ \begin{align*} 82534 &= 80000 + 2000 + 500 + 30 + 4\\ &= 8 \cdot 10000 + 2
\cdot 1000 + 5 \cdot 100 + 3 \cdot 10 + 4 \cdot 1\\ &= 8 \cdot 10^{4} + 2 \cdot
10^3 + 5 \cdot 10^2 + 3 \cdot 10^1 + 4 \cdot 10^0 \\ \end{align*} $$

## Reprezentarea numerelor în memorie

Reprezentarea pe cifre a numerelor ne duce cu gândul la reprezentarea numărului
folosind un vector. Astfel, o abordare comună pentru manipularea numerelor mari
în algoritmică este reprezentarea acestora prin intermediul unui vector de
cifre. Considerăm un număr mare, pe care îl descompunem în cifrele sale
componente și le stocăm într-un vector.

!!! example "Exemplu"

    De exemplu, numărul 82534 poate fi stocat într-un vector $v$ astfel:

    $$
    \begin{array}{r|cccccccc}
    i & 0 & 1 & 2 & 3 & 4\\
    \hline
    v[i] & 4 & 3 & 5 & 2 & 8 \\
    \end{array}
    $$

### Reprezentarea inversă

Fie un număr natural $N$ cu cifrele $\overline{a_{n-1} a_{n-2} \ldots a_1 a_0} $
în baza 10. Reprezentarea inversă a lui $N$ într-un vector $v$ de dimensiune $n$
este definită astfel:

$$ v[i] = a_{n-i},\,\forall\ 0 \leq i < n $$

unde $n$ este numărul de cifre ale numărului natural $N$, iar $v[0]$ reprezintă
cifra unităților, $v[1]$ cifra zecilor ș.a.m.d.

!!! note "Observație"

    Numerotarea cifrelor de la coadă, ca în exemplul anterior, este opțională,
    dar este indicată pentru simplificare, deoarece este mult mai simplu să
    efectuăm operațiile dacă păstrăm numărul în memorie în ordine inversă față
    de cum l-am scrie în mod obișnuit. Practic, adăugarea unor valori la
    pozițiile mai nesemnificative este o operație mult mai des întâlnită decât
    adăugarea la începutul numărului, iar când e nevoie, putem crește lungimea
    numărului plasând noua cifră pe poziția $n$, $v[n]$ ținând această valoare.

### Citirea și afișarea unui număr mare

Pentru citirea unui număr mare, vom citi lungimea numărului (numărul de cifre)
și apoi cifrele sale, începând de la cea mai puțin semnificativă cifră (cifra
unităților). Pentru afișare, procedăm invers, începând de la cea mai
semnificativă cifră.

```cpp
# include <iostream>
using namespace std;

// Lungimea maximă a numărului
const int NMAX = 1000;

// Vectorul care va stoca cifrele numărului
int cifre[NMAX];

// Lungimea numărului
int n;

int main() {
    cin >> n;

    // Citim cifrele de la coadă spre cap
    for (int i = n - 1; i >= 0; i--) {
        cin >> cifre[i];
    }

    // Afișăm numărul
    for (int i = n - 1; i >= 0; i--) {
        cout << cifre[i];
    }

    return 0;
}
```

### Optimizarea prin stocarea lungimii **v[0]**

O îmbunătățire semnificativă a acestei metode este reprezentată de utilizarea
primei poziții a vectorului, $v[0]$, pentru a stoca lungimea numărului. Aceasta
face mai ușoară manipularea lungimii și permite modificări mai ușoare ale
numărului, cum ar fi adăugarea sau eliminarea cifrelor.

### Reprezentarea inversă

Fie un număr natural $N$ cu cifrele $\overline{a_{n-1} a_{n-2} \ldots a_1 a_0} $
în baza 10. Reprezentarea inversă a lui $N$ într-un vector $v$ de dimensiune $n
$ este definită astfel:

$$
\begin{gather*}
v[0] = n\\
v[i + 1] = a_{n-i},\,\forall\ 0 \leq i < n
\end{gather*}
$$

unde $v[0]$ reprezintă cifra unităților, $v[1]$ cifra zecilor ș.a.m.d., și $n$
este numărul de cifre ale numărului natural $N$.

!!! example "Exemplu"

    De exemplu, numărul 82534 va fi stocat astfel:

    $$
    \begin{array}{r|ccccccccc}
    i & \boldsymbol{0} & 1 & 2 & 3 & 4 & 5\\
    \hline
    v[i] & \boldsymbol{5} & 4 & 3 & 5 & 2 & 8 \\
    \end{array}
    $$

Aici, $v[0]=5$ indică numărul de cifre din $N$, iar cifrele sunt stocate în
ordine inversă începând de la $v[1]$.

### Procesarea eficientă a numerelor mari în C++

Un aspect comun este citirea numerelor mari atunci când acestea sunt prezentate
ca un șir continuu de cifre, fără separatoare precum spațiile. O tehnică
eficientă pentru a aborda această problemă implică utilizarea string-urilor.
Această metodă are avantajul de a permite citirea numerelor indiferent de
lungimea lor, fără a necesita specificarea acesteia în prealabil.

#### Pasul 1: Citirea numărului ca string

Primul pas este citirea întregului număr ca un string. Aceasta este o abordare
flexibilă care nu este constrânsă de lungimea numărului. De exemplu, pentru a
citi un număr mare:

```cpp
string numarMare;
cin >> numarMare;
```

#### Pasul 2: Conversia stringului în vector de cifre

După citirea numărului, următorul pas este conversia fiecărui caracter al
stringului într-o cifră numerică individuală și stocarea acesteia într-un
vector. Această conversie este realizată prin scăderea valorii ASCII a
caracterului `'0'` din fiecare caracter al stringului. De asemenea, lungimea
numărului este salvată în prima poziție a vectorului pentru a facilita accesul
și manipularea ulterioară a cifrelor.

Iată cum arată implementarea:

```cpp
# include <iostream>
using namespace std;

// Lungimea maximă a numărului
const int NMAX = 1000;

// Vectorul care va stoca cifrele numărului
int cifre[NMAX];

// Lungimea numărului
int n;

int main() {
    string numarMare;
    cin >> numarMare;

    // Stocăm lungimea numarului în cifre[0].
    cifre[0] = numarMare.size();

    // Citim numărul de la coadă la cap, convertind
    // fiecare caracter în valoarea sa numerică.
    for (int i = 0; i < cifre[0]; ++i) {
        cifre[cifre[0] - i] = numarMare[i] - '0';
    }

    // Afișarea numărului
    for (int i = cifre[0]; i >= 1; i--) {
        cout << cifre[i];
    }
    cout << endl;

    return 0;
}
```

Această abordare simplifică semnificativ citirea numerelor mari

### Utilizarea `vector<int>` din STL pentru stocare

Când am făcut citirea cu string-uri, am folosit `numarMare.size()` pentru a afla
lungimea string-ului. Putem folosi aceeași metodă pentru a afla și lungimea
numărului fara să o stocăm in $v[0]$, dar pentru a putea realiza asta, trebuie
să folosim `vector<int>`, astfel nemaifiind nevoie să stocăm dimensiunea în
$v[0]$.

#### Crearea vectorului si inserarea/ștergerea cifrelor la inceput

```cpp
# include <iostream>
# include <vector>

using namespace std;

void afisareNumar(const vector<int>& cifre) {
    // Pornim de la cifre.size() - 1, deoarece vectorul e indexat de la zero.
    for (int i = cifre.size() - 1; i >= 0; --i) {
        cout << cifre[i];
    }
    cout << "\n";
}

void inserareCifra(vector<int>& cifre, int cifra) {
    // Inserarea unei cifre noi are loc în față, deoarece folosim reprezentarea
    // inversă.
    cifre.push_back(cifra);
}

void stergereCifra(vector<int>& cifre) {
    // Analog, prima cifră se șterge din spate.
    cifre.pop_back();
}

int main() {
    // Putem inițializa astfel vectorul cu un număr predefinit, 12 în acest
    // exemplu.
    vector<int> cifre = {2, 1};

    cout << "Numarul de cifre: " << cifre.size() << "\n";
    afisareNumar(cifre);

    // Inserarea unei cifre noi în față.
    inserareCifra(cifre, 9);

    cout << "Numarul de cifre: " << cifre.size() << "\n";
    afisareNumar(cifre);

    // Ștergem ultima cifră.
    stergereCifra(cifre);

    cout << "Numarul de cifre: " << cifre.size() << "\n";
    afisareNumar(cifre);
}
```

Observăm că astfel dimensiunea vectorului poate varia, un lucru care ne poate
ajuta extrem de mult atunci când nu știm cat de lung va fi numărul final.

## Implementarea diverselor operații pe numerele mari

Pentru implementarea operațiilor pe numere mari, avem de-a face cu câteva cazuri
ce vor fi prezentate în ordinea frecvenței lor în practică, urmând ca la final
să fie puse toate împreună într-o implementare completă a unei clase de numere
mari. Această metodă ce se recomandă în special celor cu mai multă experiență.
În subcapitolele ce urmează, vom presupune că ambii termeni ai operațiilor sunt
numere mari, cu excepția împărțirii și a înmulții, unde vom trata ca operanzi
atât numere mari, cât și numere mici (adică numere care nu sunt mari).

### Adunarea numerelor mari

Adunarea a două numere mari se va realiza în mod similar cu modul în care ați
fost obișnuiți să adunați numere la școală în clasele mici, cifră cu cifră și
ținând cont de transportul cifrelor adiționale.

```cpp
// Adunarea fiecărei cifre din b la cifra corespunzătoare din a
for (int i = 1; i <= b[0]; i++) {
    a[i] += b[i];
}

// `a` trebuie să aibă numărul potrivit de cifre pentru a putea încăpea adunarea,
// așadar alegem maximul dintre lungimile celor două numere.
a[0] = max(a[0], b[0]);

// Gestionarea transportului
for (int i = 1; i <= a[0]; i++) {
    // Avem un transport!
    if (a[i] >= 10) {
        // Dacă e ultima cifră, doar creștem numărul de cifre.
        if (i == a[0]) {
            a[0]++;
        }

        // Adaugă transportul la cifra următoare, și reține doar ultima cifră.
        a[i + 1]++;
        a[i] -= 10;
    }
}
```

### Scăderea numerelor mari

Scăderea a două numere mari se va realiza în mod similar cu modul în care ați
fost obișnuiți să scădeți numere la școală în clasele mici, cifră cu cifră și
ținând cont de împrumutul cifrelor necesare pentru efectuarea operațiilor.

```cpp
// Scăderea fiecărei cifre din b din cifra corespunzătoare din a
for (int i = 1; i <= b[0]; i++) {
    a[i] -= b[i];
}

// Gestionarea împrumutului
for (int i = a[0]; i >= 1; i--) {
    // Dacă cifra este negativă, „ne împrumutăm”
    // Adăugăm 10 la cifra curentă și scădem 1 de la cifra următoare pentru a
    // face împrumutul.
    if (a[i] < 0) {
        a[i] += 10;
        a[i + 1]--;
    }
}

// Elimină zerourile nesemnificative din fața numărului
while (a[a[0]] == 0) {
    a[0]--;
}
```

### Compararea a două numere mari

Pentru a compara două numere mari, avem două cazuri simple de tratat, urmând ca
restul implementării să fie similar cu modul în care am compara două șiruri de
caractere.

Dacă cele două numere au un număr diferit de cifre, putem trage concluzia în mod
evident, iar în caz contrar, vom lua cifră cu cifră, de la cea mai semnificativă
la cea mai puțin semnificativă.

```cpp
// -1 dacă a < b
// 0 dacă a == b
// 1 dacă a > b
int comparaCifre(const vector<int>& a, const vector<int>& b) {
    // a are mai multe cifre
    if (a[0] > b[0]) {
        return 1;
    }

    // b are mai multe cifre
    if (a[0] < b[0]) {
        return -1;
    }

    // Au același număr de cifre, deci comparăm cifră cu cifră.
    for (int i = a[0]; i >= 1; i--) {
        if (a[i] == b[i]) {
            continue;
        }

        return (a[i] > b[i]) ? 1 : -1;
    }

    return 0;
}
```

### Înmulțirea unui număr mare cu un număr mic

Acest subcaz al înmulțirii poate fi implementat mult mai ușor, implementarea
preluând multe elemente din cele ale adunării a două numere mari. Vom presupune
că vom înmulți numărul mare cu $x$.

```cpp
long long val = 0;

for (int i = 1; i <= a[0]; i++) {
    // Includem produsul dintre cifra curentă și x
    val += 1LL * a[i] * x;
    // Stocăm ultima cifră a acestei sume...
    a[i] = val % 10;
    // ...și o scoatem din sumă.
    val /= 10;
}

// Gestionarea transportului rămas după înmulțire.
// Pentru fiecare cifră din val, lărgim numărul și stocăm ultima cifră din val
// ca prima cifră din număr.
for (; val; val /= 10) {
    a[0]++;
    a[a[0]] = val % 10;
}
```

### Înmulțirea a două numere mari

Înmulțirea a două numere mari va necesita lucrul cu toate cifrele numărului,
complexitatea algoritmului devenind $\mathcal{O}(n_A \cdot n_B)$, unde $n_A$ reprezintă
numărul de cifre al lui $A$, iar $n_B$, numărul de cifre al lui $B$. Din nou,
implementarea va fi asemănătoare cu cea învățată în clasele mici la școală.

```cpp
// Numărul nostru este cel puțin la fel de mare ca suma cifrelor lor + 1.
vector<long long> ans(a[0] + b[0] + 1);

// Facem produsul fiecărei cifre din a cu fiecare cifră din b
for (int i = 1; i <= a[0]; i++) {
    for (int j = 1; j <= b[0]; j++) {
        ans[i + j - 1] += 1LL * b[j] * a[i];
    }
}

// Ajustarea dimensiunii vectorului a pentru a ține cont de posibilele
// transporturi
a[0] += b[0] - 1;

for (int i = 1; i <= a[0]; i++) {

    // Avem un transport
    if (ans[i] >= 10) {

        // Dacă este ultima cifră...
        if (i == a[0]) {
            // ...creștem dimensiunea și o adăugăm.
            a[0]++;
            ans.push_back(ans[i] / 10);
        } else {
            // Adaugă transportul la cifra următoare.
            ans[i + 1] += ans[i] / 10;
        }

        // Păstrează cifra curentă.
        ans[i] %= 10;
    }
}

// Copierea cifrelor din ans înapoi în a
for (int i = 1; i < (int)ans.size(); i++) {
    a[i] = ans[i];
}
```

### Împărțirea unui număr mare la un număr mic

La fel ca la înmulțire, vom lucra cifră cu cifră și vom avea grijă să luăm
transportul cifră cu cifră. Vom presupune că vom împărți numărul mare la $x$.

```cpp
long long val = 0;

for (int i = a[0]; i >= 1; i--) {
    // Actualizează val pentru a include cifra curentă
    val = val * baza + a[i];

    // Stochează câtul împărțirii lui val la x în poziția curentă
    a[i] = val / x;

    // Stochează restul împărțirii în val
    val %= x;
}

// Elimină, zerourile nesemnificative din fața numărului
while (a[a[0]] == 0) {
    a[0]--;
}
```

### Afișarea unui număr mare

Atunci când lucrăm cu o bază mai mare ca 10, afișarea numărului poate deveni
un pic mai complicată, fiind nevoie de atenție suplimentară pentru a face
lucrurile să funcționeze. Aici am pus o implementare mai generalizată, unde $b$
este baza pe care o folosim (implicit e 10, dar poate fi ajustată).

```cpp
bool ok = false;

// Parcurgem de la cea mai semnificativă cifră către cea mai puțin semnificativă
// cifră
for (int i = a[0]; i >= 1; i--) {
    if (ok) {
        // Valoarea curentă să fie cel puțin 1
        long long val = max(1LL, a[i]);

        // Adăugăm zerouri la început pentru a păstra formatul corect.
        while (val * 10 < b) {
            cout << 0;
            val *= 10;
        }
    }

    // Dacă cifra curentă nu este zero, am început să afișăm
    // adică am scăpat de zerourile inițiale.
    if (a[i]) {
        ok = true;
    }

    cout << a[i];
}
```

## Optimizări ce se pot face la implementare

Prima și cea mai evidentă optimizare constă în lucrul cu o bază mai mare ca
10, de regulă putere a lui 10. Se recomandă folosirea unei baze între $10^6$
și $10^8$, pentru a evita overflow-urile ce ar putea apărea de la stocarea
individuală a fiecărei poziții drept un număr de 10 sau mai multe cifre.

Această optimizare poate fi utilă mai ales în situația în care foarte multe
calcule sunt necesare sau limita de timp este strânsă. Un astfel de exemplu
reprezintă problemele de programare dinamică în care trebuie afișat numărul
complet de soluții (totuși, în prezent, o mare parte din acele probleme cer
răspunsul modulo un număr prim).

De asemenea, așa cum veți observa mai târziu, există diverse metode de a
optimiza operațiile de înmulțire, folosind diverși algoritmi precum algoritmul
lui Karatsuba sau FFT, dar aceștia nu fac obiectul discuției noastre din acest
articol.

## Probleme suplimentare

- [pbinfo sumaXXL](https://www.pbinfo.ro/probleme/2393/sumaxxl)
- [pbinfo produsXL](https://www.pbinfo.ro/probleme/2409/produsxl)
- [infoarena perm3](https://www.infoarena.ro/problema/perm3)
- [ONI 2016 cod](https://kilonova.ro/problems/1481/)
- [ONI 2023 Baraj Juniori Fuziune](https://kilonova.ro/problems/554) - cerinta 2
- [Lot Juniori 2015 Pastile](https://kilonova.ro/problems/1663)
- [infoarena coprime](https://www.infoarena.ro/problema/coprime)
- [OJI 2010 numar](https://kilonova.ro/problems/794)
- [Probleme cu numere mari de pe Kilonova](https://kilonova.ro/tags/379)

## Resurse suplimentare

- [Clasă de numere mari](https://github.com/stefdasca/CompetitiveProgramming/blob/master/Algorithms/bigints.cpp)
- [Lucrul cu numere mari - infoarena](https://infoarena.ro/lucrul-cu-nr-mari)
- [Numere mari - CPPI Sync](https://cppi.sync.ro/materia/operatii_cu_numere_mari.html)
