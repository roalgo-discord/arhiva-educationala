---
tags:
    - hashing
    - siruri de caractere
    - matematica
---

**Autor**: Ștefan-Cosmin Dăscălescu

!!! example "Cunoștințe necesare"
    - [Șiruri de caractere](../cppintro/strings.md)
    - [Aritmetică modulară. Ridicare la putere în timp logaritmic](./pow-log.md)
    - [Invers modular](./modular-inverse.md)
    - [Operații pe biți](./bitwise-ops.md)

În informatică și în algoritmică, de multe ori avem de-a face cu stocarea unei
cantități semnificative de informație fără să putem să o stocăm în intregime,
sau în alte cazuri va trebui să alterăm informația sau s-o organizăm diferit
pentru a putea ajunge la răspunsurile căutate cât mai rapid și eficient. În
acest articol voi prezenta câteva tipuri de probleme pentru care putem folosi
tehnici care vor fi categorizate drept tehnici specifice hashingului, aici voi
enumera string hashing, hash tables și alte tehnici similare, precum xor hashing
sau unele fundamente din spatele structurilor de tipul hash map. Pentru a putea
parcurge acest capitol, e bine să vă familiarizați cu lucrul cu șiruri de
caractere și cu aritmetica modulară.

## String hashing

Se dă următoarea problemă ce trebuie rezolvată: Dându-se două șiruri de
caractere, să se afle de câte ori apare cel de-al doilea șir în primul. Această
problemă are diverse soluții, începând de la soluțiile de tip brute-force care
verifică naiv toate aparițiile unui șir în celălalt, și terminând cu soluțiile
care folosesc algoritmi de potrivire a șirurilor, precum KMP sau Z-function,
care vor fi abordați in alte capitole.

În acest capitol voi prezenta o altă abordare foarte utilă pentru acest tip de
probleme, și anume string hashingul. Pe scurt, vom vrea să codificăm fiecare șir
de caractere cu un număr natural care să poată fi stocat relativ ușor, și care
să ne garanteze o probabilitate cât mai mare de succes. De ce probabilitate? Dat
fiind că avem un număr finit de numere pe care le vom putea folosi și un număr
mult mai mare de șiruri de caractere care se pot crea, va exista o șansă foarte
mică de a obține un rezultat diferit de cel adevărat (cu alte cuvinte, să
considerăm două șiruri de caractere diferite ca fiind identice). Dar așa cum
veți vedea mai târziu, vom putea micșora șansa de a avea o asemenea coliziune.

### Cum aplicăm un hash pe un șir de caractere

În cazul majorității problemelor, vom avea de-a face cu șiruri de caractere ce
conțin litere mici sau mari ale alfabetului englez (în total, 26 de litere) și
care au o lungime de un ordin cel mult $10^6$. Din nou, dacă apar și alte
caractere, va trebui să ajustăm parametrii dupa o regulă bine precizată.

Să presupunem pentru un moment că putem stoca numere arbitrar de mari în timp
constant, putând să efectuăm operații pe ele. Dat fiind că sunt 26 de litere,
ne putem gândi la folosirea bazei 26 pentru a stoca un număr corespunzător
unui șir de caractere, fiecare poziție având o valoare egală cu $26^{n - i - 1}
\cdot ind_i$, unde $n$ este lungimea șirului de caractere, $i$ este poziția
caracterului curent iar $ind_i$ este poziția din alfabet (cu indexare de la 0)
a caracterului de pe poziția $i$. De exemplu, dacă $s_i = d$, $ind_i = 3$ (_d_
este cea de-a patra literă din alfabet).

De exemplu, dacă șirul de caractere este _algo_, numărul pe care l-am stoca ar
fi egal cu

$$ 26^3 \cdot 0 + 26^2 \cdot 11 + 26^1 \cdot 6 + 26^0 \cdot 14 = 7606 $$

Din păcate, nu avem parte de numere infinit de mari, așa că trebuie să ne
limităm opțiunile. Astfel, va trebui să facem ajustări în ceea ce privește baza
folosită, dar și ca o noutate, vom stoca numerele modulo $m$, care va fi de
regulă un număr **prim** mare, valori potrivite sunt de regulă $10^9 + 7$, $998
\ 244 \ 353$ sau $10^9 + 9$. În mod similar, vom vrea să folosim o bază $b$ care
va fi și ea un număr prim, mai mare decât numărul de caractere distincte pe care
îl putem avea (dat fiind că avem 26 de litere, alegeri bune pentru bază ar fi
29 sau 31).

!!! info "Observație"

    Numerele prime sunt recomandate pentru crearea hashurilor deoarece neavând
    divizori comuni cu alte numere, riscul de a ajunge la valori egale cu 0
    este mult mai scăzut, ceea ce reduce semnificativ riscul unor coliziuni.

Un alt aspect important ce trebuie prezentat constă în prezentarea modului în
care calculăm hashul unei subsecvențe a unui șir de caractere de la poziția $L$
la poziția $R$, lungimea acestuia fiind $R - L + 1$. Dacă știm hashul pentru
intervalul $[1, R]$ și hashul pentru intervalul $[1, L-1]$, să le notăm $x_R$ și
$x_L$, hashul subsecvenței $[L, R]$ va fi $y - x \cdot base^{R - L + 1}$.

!!! info "Observație"

    Deoarece în majoritatea cazurilor avem de păstrat valoarea modulo $X$, va
    trebui să fim atenți în ceea ce privește calculul hashului și evitarea
    valorilor negative ale operației modulo. Acum, tot ce ne mai rămâne de făcut
    e să explicăm cum să calculăm aceste hashuri și să putem ajusta parametrii
    în funcție de problemele care trebuie rezolvate.

### Implementarea și folosirea hashurilor

Pentru a putea folosi hashurile, va trebui să precalculăm mai întâi puterile
bazei, până la $n$, unde $n$ e lungimea șirului de caractere. De asemenea, va
trebui sa precalculăm hashurile pentru toate prefixele șirului $s$ folosind
formula de mai sus, practic la fiecare pas vom înmulți răspunsul anterior cu
baza și adunăm valoarea literei noastre, ținând cont de valoarea modulo-ului.
Mai jos puteți găsi chiar soluția problemei [strmatch de pe
infoarena](https://infoarena.ro/problema/strmatch), unde ni se cere să aflăm de
câte ori apare primul șir în cel de-al doilea.

```cpp
#include <fstream>
#include <string>
#include <vector>

using namespace std;

constexpr int base = 127;
constexpr int mod = 1000000007;
constexpr int N = 2000000;

int n, m;
long long textHash[N + 1], power[N + 1];

int main() {
    ifstream fin("strmatch.in");
    ofstream fout("strmatch.out");

    string pattern, text;
    fin >> pattern >> text;

    int textLen = text.size();
    int patternLen = pattern.size();

    power[0] = 1;
    for (int i = 1; i <= N; i++) {
        power[i] = (power[i - 1] * base) % mod;
    }

    long long patternHash = 0;
    for (int i = 0; i < patternLen; i++) {
        patternHash *= base;
        patternHash += pattern[i] - '0';
        patternHash %= mod;
    }

    for (int i = 0; i < textLen; i++) {
        textHash[i + 1] = textHash[i];

        textHash[i + 1] *= base;
        textHash[i + 1] += text[i] - '0';
        textHash[i + 1] %= mod;
    }

    int matchCount = 0;

    vector<int> matchPositions;
    for (int i = patternLen; i <= textLen; i++) {
        const auto endHash = textHash[i];
        const auto startHash = textHash[i - patternLen];
        const auto newStartHash = (startHash * power[patternLen]) % mod;

        const auto currHash = (endHash - newStartHash + mod) % mod;

        if (currHash == patternHash) {
            matchCount++;
            if (matchCount <= 1000) {
                matchPositions.push_back(i - patternLen);
            }
        }
    }

    fout << matchCount << '\n';

    for (const auto pos : matchPositions) {
        fout << pos << " ";
    }
    return 0;
}
```

### Double și multiple hashing

În unele probleme, precum [String Matching de pe
CSES](https://cses.fi/problemset/task/1753), folosirea unui singur hash nu
garantează răspunsul corect, datorită calității testelor. Astfel, se impune
folosirea mai multor hashuri concomitent. Cu alte cuvinte, vom proceda la fel ca
la un singur hash, doar că pentru a testa egalitatea a două șiruri de caractere
de aceeași lungime, va trebui să ne asigurăm că șirurile returnează același hash
pentru toate perechile de tipul $(bază, modulo)$ alese, perechi care trebuie să
respecte proprietățile descrise mai sus.

Un exemplu de implementare pe această idee se poate găsi
[aici](https://github.com/stefdasca/CompetitiveProgramming/blob/master/Algorithms/hashing.cpp),
două hashuri fiind suficiente aici.

În practică, cu cât adăugăm mai multe hashuri, cu atât probabilitatea ca noi să
nu mai avem coliziuni scade exponențial, de cele mai multe ori două hashuri
fiind suficiente, dacă sunt alese în mod potrivit.

## Hash tables și unordered map

În anumite situații, suntem nevoiți să grupăm valorile în funcție de anumite
criterii, ajungând astfel să avem nevoie de o structură de date care să poată
grupa elementele cu aceeași valoare pentru a putea procesa operații de inserare,
ștergere și modificare în timp rezonabil. Aici intervin tabelele hash, unde vom
păstra valorile grupate în funcție de un criteriu ales de noi anterior (de
exemplu, putem să le grupăm în funcție de restul împărțirii la un număr prim
mare, dar spre deosebire de string hashing, nu foarte mare deoarece va trebui să
păstrăm aceste liste separat).

Totuși, în prezent o metodă mult mai populară și mai simplu de folosit pentru a
stoca informații legate de valori, păstrând și eficiența procesării acestora
constă în folosirea structurii de date unordered map, care funcționează într-o
manieră similară cu a tabelelor hash. Practic, fiecare valoare inserată într-un
unordered map este stocată într-o tabelă hash în funcție de valoarea unui hash
intern calculat de structura de date în sine. Această structură de date ne
garantează o complexitate foarte bună pe un caz obișnuit, operațiile fiind în
medie $O(1)$, dar trebuie avut grijă la cazul cel mai prost, unde complexitatea
unei operații poate atinge și $O(n)$, mai jos găsiți un exemplu de implementare.

```cpp
#include <fstream>
#include <iostream>
#include <unordered_map>

using namespace std;

constexpr enum Action { INSERT = 1, DELETE = 2, QUERY = 3 };

int main() {
    ifstream fin("hashuri.in");
    ofstream fout("hashuri.out");

    unordered_map<int, bool> fr;
    int n;
    fin >> n;

    while (n--) {
        int p, x;
        fin >> p >> x;

        switch (p) {
            case Action::INSERT:
                fr[x] = true;
                break;
            case Action::DELETE:
                fr.erase(x);
                break;
            case Action::QUERY:
                fout << (fr.count(x) > 0) << "\n";
                break;
            default:
                break;
        }
    }

    return 0;
}
```

!!! info "Observație"

    Deși `unordered_map` este o structură de date destul de eficientă și foarte
    utilă în concursuri, se recomandă evitarea ei la rundele de Codeforces, unde
    datorită perioadei de open hacking de 12 ore de la rundele Div. 3, Div. 4 și
    educationale, soluțiile care folosesc `unordered_map` sunt vulnerabile
    hackurilor ce se folosesc de tehnicile descrise [în acest
    blog](https://codeforces.com/blog/entry/62393). O alternativă constă în
    folosirea unui hash custom, sau și mai simplu, folosirea map-ului chiar dacă
    pierdem un factor de $O(\log n)$. Totuși, la olimpiade nu se generează de
    regulă teste anti-unordered map.

## Xor Hashing

O altă tehnică ce merită menționată, dat fiind faptul că a apărut relativ
recent, este cea a xor hashurilor. Pe scurt, modul cum funcționează este că
pentru fiecare valoare care apare în șir (de regulă, o permutare de la 1 la
$n$ sau în general un interval de valori mici), vom vrea să o înlocuim cu o
valoare aleasă aleator într-un înterval foarte mare (de regulă, numerele întregi
pe 32 de biți).

Această tehnică ne ajută să putem afla cu ușurință dacă un set de numere într-un
anumit interval apare într-o subsecvență sau într-un șir de numere (de regulă,
problemele se reduc la a afla dacă valorile dintr-un interval de numere formează
o permutare a mulțimii $\{1, 2, \dots, n\}$.

### Exemplu: [mixperm lot juniori 2017](https://kilonova.ro/problems/1690)

Pentru această problemă, se poate observa că este un exemplu clasic al folosirii
tehnicii xor hashing (soluția oficială folosește o combinație de proprietăți
matematice) deoarece putem genera un număr aleator pentru fiecare valoare de la
1 la $n$ iar mai apoi când verificăm fiecare secvență brut, folosim valorile
xor-urilor parțiale pentru a determina cu o probabilitate de aproximativ $100
\%$ dacă obținem o permutare a mulțimii $\{1, 2, \dots, n\}$. O sursă
demonstrativă se poate găsi mai jos, [submisia putând fi accesată
aici](https://kilonova.ro/submissions/212471) sau mai jos.

```cpp
#include <chrono>
#include <fstream>
#include <iostream>
#include <random>

using namespace std;

mt19937 rng(chrono::steady_clock::now().time_since_epoch().count());
const int randgen(int left = 1, int right = 1000000000) {
    return uniform_int_distribution<int>(left, right)(rng);
}

constexpr int N = 10000;

int hsh[N + 5], a[N + 5], b[N + 5];

int prefa[N + 5], prefb[N + 5];
int suffa[N + 5], suffb[N + 5];

int main() {
    ifstream fin("mixperm.in");
    ofstream fout("mixperm.out");

    int n;
    fin >> n;

    int xr = 0;

    for (int i = 1; i <= n; i++) {
        hsh[i] = randgen();
        xr ^= hsh[i];
    }

    for (int i = 1; i <= n; i++) {
        fin >> a[i];
    }

    for (int i = 1; i <= n; i++) {
        fin >> b[i];
    }

    for (int i = 1; i <= n; i++) {
        prefa[i] = prefa[i - 1] ^ hsh[a[i]];
        prefb[i] = prefb[i - 1] ^ hsh[b[i]];

        const int j = n - i + 1;
        suffa[j] = suffa[j + 1] ^ hsh[a[j]];
        suffb[j] = suffb[j + 1] ^ hsh[b[j]];
    }

    int ans = 0;
    for (int i = 1; i <= n; i++) {
        for (int j = i; j <= n; j++) {
            const int secva = prefa[j] ^ prefa[i - 1];
            const int secvb = prefb[j] ^ prefb[i - 1];

            const int suffa_xor = suffa[j + 1];
            const int suffb_xor = suffb[j + 1];

            if ((prefa[i - 1] ^ secvb ^ suffa_xor) == xr ||
                (prefb[i - 1] ^ secva ^ suffb_xor) == xr) {
                ans++;
            }
        }
    }

    fout << ans << '\n';
    return 0;
}
```

## Probleme suplimentare

### Probleme de la olimpiade

- [subsecvente OJI 2013](https://kilonova.ro/problems/36)
- [Carry Bit IIOT 2023-24](https://kilonova.ro/problems/2165)
- [sp Lot juniori 2021](https://kilonova.ro/problems/1702)
- [gimigpt Lot Juniori 2024](https://kilonova.ro/problems/2836/)
- [mixperm Lot juniori 2017](https://kilonova.ro/problems/1690)
- [Palindrome String](https://kilonova.ro/problems/1903)
- [sap RoAlgo Contest 6 - XOR Hashing](https://kilonova.ro/problems/1802)
- [toska Stelele Informaticii - XOR Hashing](https://kilonova.ro/problems/2098/)
- [Bovine Genomics
  USACO](http://www.usaco.org/index.php?page=viewproblem2&cpid=741)
- [RMI 2017 Hangman
  2](https://csacademy.com/contest/rmi-2017-day-1/task/hangman2/)
- [Probleme cu hashing de pe kilonova](https://kilonova.ro/tags/322)
- [Probleme cu hashing de pe
  infoarena](https://www.infoarena.ro/cauta-probleme?tag_id[]=432)

### Probleme de pe alte siteuri

- [Finding Periods](https://cses.fi/problemset/task/1733/)
- [Sum of Four Values](https://cses.fi/problemset/task/1642)
- [Fullmetal Alchemist II](https://codeforces.com/gym/104048/problem/K)
- [Mysterious Crime](https://codeforces.com/contest/1043/problem/D)
- [The Number of Subpermutations](https://codeforces.com/contest/1175/problem/F)
- [Alte probleme cu hashing de pe
  Codeforces](https://codeforces.com/problemset?tags=hashing)

### Bibliografie și lectură suplimentară

Am ordonat resursele suplimentare în ordinea dificultății înțelegerii și într-o
ordine logică pentru a ușura obținerea de cunoștinte despre tehnicile,
abordările și problemele discutate în acest curs.

- [Cartea SEPI F1 - Capitolul 12 (pagina 171) - Căutări în șiruri de caractere.
  Algoritmul Rabin-Karp - Articol
  Recomandat](https://sepi.ro/assets/upload-file/infobits-f1.pdf)
- [Articol USACO Guide - String
  Hashing](https://usaco.guide/gold/string-hashing?lang=cpp)
- [Articol USACO Guide - Hash maps](https://usaco.guide/gold/hashmaps?lang=cpp)
- [XOR Hashing TUTORIAL](https://codeforces.com/blog/entry/85900)
- [On the mathematics behind rolling hashes and anti-hash
  tests](https://codeforces.com/blog/entry/60442)
- [Articolul de pe cppi.sync](https://cppi.sync.ro/materia/hashuri.html)
- [Hash tables](https://www.infoarena.ro/tabele-hash-scurta-prezentare)
- [Hash tables - prezentare
  detaliata](https://www.infoarena.ro/tabele-hash-prezentare-detaliata)
