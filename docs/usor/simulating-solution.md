---
tags:
    - C++
    - implementare
    - optimizare
    - simulare
---

## Introducere

Unele probleme nu ne cer doar rezultatul final, ci și unele rezultate pe care le obținem pe parcurs. O simulare necesită $3$ lucruri:
1. O stare care poate fi descrisă în mod unic, prin niște variabile
2. O măsură de timp, un tact (care, de obicei, este definit de problemă)
3. O buclă cu o condiție de oprire

O simulare arată astfel:
```cpp
gata = 1;
while (!gata) {
    <folosim starea ca sa facem ceva>
    <avansam la urmatorul pas, trece un tact>
    if (<conditie de oprire>) {
        gata = 1;
    }
}
```

!!! note "Observație"
    Multe probleme de clasa a V-a și de clasa a VI-a (matrice) necesita simularea soluției.

## Problema exemplu - [simulare](https://kilonova.ro/problems/3237)

În această problemă, cum cere și titlul, trebuie doar să simulăm procesul descris. De fiecare dată când citim o direcție, avansăm în acel mod, creștem suma cu valoarea de la poziția obținută și o afișăm.

Sursa de 100 de puncte:
```cpp
#include <iostream>

const int MAXN = 1'000;
const char T_NORD = 'N';
const char T_EST = 'E';
const char T_SUD = 'S';
const char T_VEST = 'V';

int mat[MAXN][MAXN], q, x, y;

void fastReadWrite() {
    std::ios_base::sync_with_stdio(0);
    std::cin.tie(0);
    std::cout.tie(0);
}

void readMatrix() {
    int i, j, n, m;
    std::cin >> n >> m >> q >> x >> y;
    x--; // noi indexam de la 0
    y--;
    for (i = 0; i < n; i++) {
        for (j = 0; j < m; j++) {
            std::cin >> mat[i][j];
        }
    }
}

void simulateRoad() {
    int i, dir;
    long long sum;
    while (!isalpha(dir = std::cin.get())); // gasim prima litera (prima directie)
    sum = 0;
    for (i = 0; i < q; i++) {
        if (dir == T_NORD) {
            x--;
        }
        else if (dir == T_EST) {
            y++;
        }
        else if (dir == T_SUD) {
            x++;
        }
        else { // T_VEST
            y--;
        }

        sum += mat[x][y];
        std::cout << sum << " ";

        dir = std::cin.get();
    }
    std::cout << "\n";
}

int main() {
    fastReadWrite();
    readMatrix();
    simulateRoad();
    return 0;
}
```

## Optimizarea unei simulări

La unele probleme, chiar dacă nu ne este cerut rezultatul pe parcursul simulării, nu se poate găsi o altă soluție decât simularea. Majoritatea problemelor de acest fel, în care simularea nu intră în timp, este necesară optimizarea simulării.

### Optimizarea prin găsirea unei perioade

Uneori, stările unei simulări se repetă periodic. La anumite probleme, o optimizare cerută este alfarea acelei perioade și folosirea ei pentru aflarea tuturor elementelor

#### Problemă exemplu: [galbeni - OJI 2013 VI](https://kilonova.ro/problems/402)

Fie $getNext(n) =$ numărul care urmează după $n$.

Cum toate numerele sunt de la $1$ la $999$, rezultă, din [principiul cutiei](https://ro.wikipedia.org/wiki/Principiul_lui_Dirichlet), că, după maxim $1000$ de numere, vom găsi două egale. Secvența dintre ele se va repeta la nesfârșit.

Notăm cu $start$ poziția de la care începe ciclul și cu $len$ lungimea ciclului. Al $n$-lea număr poate fi aflat în funcție de $start$ și $len$.

Sursa de 100 de puncte:
```cpp
#include <fstream>

std::ifstream fin("galbeni.in");
std::ofstream fout("galbeni.out");

const int MAXNR = 1'000;

int n, start_cycle, cycle_length, p10, poz[MAXNR], v[MAXNR];

int getNext(int s) {
    int i, p, new_s, cifra;
    
    p = 1;
    new_s = s;
    while (s > 0) {
        cifra = s % 10;
        if (cifra > 0) {
            new_s *= cifra;
        }
        s /= 10;
    }
    
    new_s = ((new_s * 8) / 9) % (p10 * 10);
    while (new_s < p10) { // cat timp are mai putin de k cifre
        new_s = new_s * 10 + 9;
    }
    
    return new_s;
}

void findCycle() {
    int s, k, cnt, i;
    fin >> s >> k >> n;
    
    p10 = 1; // p10 va reprezenta cel mai mic numar de k cifre
    for (k--; k > 0; k--) {
        p10 *= 10;
    }
    
    poz[s] = cnt = 1;
    v[1] = s;
    while (poz[s = getNext(s)] == 0) { // cautam prima care se repeta
        poz[s] = ++cnt;
        v[cnt] = s;
    }
    
    start_cycle = poz[s];
    cycle_length = cnt - poz[s] + 1;
}

void calcAnswer() {
    if (n < start_cycle) {
        fout << v[n] << "\n";
    } else {
        n -= start_cycle;
        fout << v[start_cycle + n % cycle_length] << "\n";
    }
}

int main() {
    findCycle();
    calcAnswer();
    return 0;
}
```

### Optimizarea prin găsirea unei formule care generează stările următoare

Anumite probleme se generează într-un mod care poate fi stabilit de o formulă.

#### Problemă exemplu: [asort - Baraj 2016 Juniori](https://kilonova.ro/problems/1084)

Soluția problemei se poate deduce studiind transformarea șirului până când acesta devine “A sortat”.

De exemplu, pentru $N=8$, aplicând de $N$ ori regula $A$ se obțin șirurile:
![](../images/simulation/asort-imagine.png)

Observăm că prin aplicarea de un număr impar de ori a regulii, șirul rezultat are pe pozițiile impare numerele pare. Numere pare au apariție periodică în șirurile rezultate în ordinea $2, 4, 6, 8, 2, 4, 6, ...$ Analog, numerele impare apar pe poziții impare în ordinea $1, 3, 5, 7, 1, 3, 5, ...$ Dacă se aplică regula de un număr par de ori, pe pozițiile pare apar numerele pare.

Studiind exemplul, observăm că:
1. Dacă numărul de aplicări ale regulii date $R$ este impar, atunci dacă poziția $K$ este impară atunci numărul căutat este egal cu $(R+K)%N$ sau $N$ dacă acest rest este $0$. Dacă poziția $K$ este pară, atunci numarul căutat este egal cu $(N+K-R)%N$ sau $N$ dacă acest rest este $0$.
2. Dacă numărul de aplicări ale regulii $A$ date $R$ este par, atunci dacă poziția $K$ este impară atunci numărul căutat este egal cu $(N+K-R)%N$ sau $N$ dacă acest rest este $0$. Dacă poziția $K$ este pară, atunci numărul căutat este egal cu $(K+R)%N$ sau $N$ dacă acest rest este $0$.
3. Dacă numărul $T$ este par atunci poziția acestui număr în șirul “$A$ sortat” este $poz=(N+T-R)%N$. Altfel, $poz=(T+R)%N$. În ambele situații, dacă $poz=0$ atunci $poz=N$. Cunoscând poziția lui $T$ în șirul “$A$ sortat”, determinăm numerele situate pe poziția $poz-1$ (sau $N$) pentru predecesor, respectiv $poz+1$ (sau $1$) pentru succesor folosindu-ne de rezultatele de la $1$) și $2$) 

Detaliu de implementare: vom folosi faptul că $(x % n) == 0 ? n : x % n$ este echivalent cu $(x - 1) % n + 1$, pentru $x > 0$. Demonstrație:
1. $x % n = 0$, atunci $(x - 1) % n + 1 = n - 1 + 1 = n$.
2. $x % n > 0$, atunci $(x - 1) % n + 1 = x % n - 1 + 1 = x % n$

Sursa de 100 de puncte:
```cpp
#include <fstream>

std::ifstream fin("asort.in");
std::ofstream fout("asort.out");

int r, n;

int pozToNumber(int poz) {
    if (((poz % 2 == 0) ^ (r % 2 == 0)) == 0) { // ambele sau niciuna
        return (r + poz - 1) % n + 1;
    }
    else {
        return (n + poz - r - 1) % n + 1;
    }
}

int numberToPoz(int nr) {
    if (nr % 2 == 0) {
        return (n + nr - r - 1) % n + 1;
    }
    else {
        return (nr + r - 1) % n + 1;
    }
}

void calcAnswer() {
    int cer, t, k, poz, val, pred, succ;
    fin >> cer >> n >> r >> k >> t;
    r %= n; // la n operatii se revine la sirul initial 
    
    if (cer == 1) {
        fout << pozToNumber(k) << "\n";
    }
    else {
        poz = numberToPoz(t);
        pred = pozToNumber(poz == 1 ? n : poz - 1); // predecesorul
        succ = pozToNumber(poz == n ? 1 : poz + 1); // succesorul
        fout << pred << " " << succ << "\n";
    }
}

int main() {
    calcAnswer();
    return 0;
}
```

## Probleme rezolvate

### Problema [robinson - ONI 2005 VI](https://kilonova.ro/problems/1221)

Mai intai, vom construi matricea in modul descris. Dupa aceea, va trebuie sa simulam drumul din problema. Pentru a afla usor urmatoarea pozitie, vom folosi [vectori de directie](https://edu.roalgo.ro/mediu/lee/#vectorii-de-directie). După ce aflăm directța în care mergem, vom marca poziția ca vizitată (adică setăm valoarea din matrice la $VISITED$, o constantă care va fi egală cu $-1$ sau cu orice valoare care nu poate apărea in matrice).

De asemenea, pentru a determina ușor dacă am ieșit sau nu din matrice, vom [borda matricea](https://edu.roalgo.ro/mediu/lee/#evitarea-accesarii-unor-patrate-din-afara-matricii) cu valoarea $VISITED$.

Sursa de 100 de puncte:
```cpp
#include <fstream>

std::ifstream fin("robinson.in");
std::ofstream fout("robinson.out");

const int MAXM = 100;
const int VISITED = -1;
const int N_DIR = 4; // cate directii sunt

int n, m, l, c, mat[MAXM + 2][MAXM + 2];
int dx[N_DIR] = {-1, 0, 1, 0}, dy[N_DIR] = {0, 1, 0, -1}; // vectori de directie

void calcMatrix() {
    int i, j;
    fin >> m >> n >> l >> c;
    for (i = 1; i <= m; i++) {
        mat[1][i] = mat[i][1] = n + i - 1;
    }
    for (i = 2; i <= m; i++) {
        for (j = 2; j <= m; j++) {
            // pastram ultimele trei cifre
            mat[i][j] = (mat[i - 1][j] + mat[i][j - 1]) % 1000;
        }
    }
    fout << mat[m][m] << "\n";
}

void borderMatrix() {
    int i;
    for (i = 0; i <= m + 1; i++) {
        mat[0][i] = mat[m + 1][i] = mat[i][0] = mat[i][m + 1] = VISITED;
    }
}

void simulateProcess() {
    int gata = 0, dir;
    while (!gata) {
        fout << l << " " << c << "\n";
        dir = mat[l][c] % N_DIR;
        mat[l][c] = VISITED;
        
        l += dx[dir]; // avansam catre urmatoarea pozitie
        c += dy[dir];
        if (mat[l][c] == VISITED) { // conditia de oprire
            gata = 1;
        }
    }
}

int main() {
    calcMatrix();
    borderMatrix(); // bordarea matricei
    simulateProcess();
    return 0;
}
```

### Problema [furnica - OJI 2007 VI](https://kilonova.ro/problems/763)

În această problemă este destul de direct ce trebuie să facem. Vom simula procesul descris, ținând o matrice $fr_{i, j}$ care va reprezenta de câte ori am trecut printr-o anumită poziție $(i, j)$. De asemenea, și în această problemă vom folosi vectori de direcție pentru a afla ușor următoarea poziție.

```cpp
#include <fstream>

std::ifstream fin("furnica.in");
std::ofstream fout("furnica.out");

const int MAXN = 100;
const int N_DIR = 8;

int fr[MAXN][MAXN], n;

// vectori de directie
int dlin[N_DIR] = {-1, -1, 0, 1, 1, 1, 0, -1};
int dcol[N_DIR] = {0, 1, 1, 1, 0, -1, -1, -1};

void visitPositions() {
    int k, l, c, dir;
    fin >> n >> k;
    
    l = c = 0;
    fr[0][0] = 1;
    for (; k > 0; k--) {
        fin >> dir;
        l += dlin[dir - 1];
        c += dcol[dir - 1];
        fr[l][c]++;
    }
}

void calcAnswer() {
    int sum, i, j, maxim, cnt;
    sum = maxim = cnt = 0;
    for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
            if (fr[i][j] > 0) {
                sum += (i + j + 2) % 6;
                if (fr[i][j] > maxim) {
                    maxim = fr[i][j];
                    cnt = 1;
                }
                else if (fr[i][j] == maxim) {
                    cnt++;
                }
            }
        }
    }
    fout << sum << " " << cnt << "\n";
}


int main() {
    visitPositions();
    calcAnswer();
    return 0;
}
```

## Concluzii

În problemele de simulare, de obicei, este destul de ușor să îți dai seama ce trebuie să faci, dar implementarea, uneori, nu este așa de ușoară precum pare. Pentru ca implementările a acestor probleme să vi se pară mai ușoare, recomandăm să rezolvați cât mai multe probleme de implementare/simulare, eventual și unele la care este de scris mai mult.

Problemele de optimizare sunt, în mare parte, din categoriile prezentate. Dar, la unele probleme, sunt necesare alte observații care duc la o optimizare mai puțin obișnuită. De aceea, trebuie să fim mereu foarte atenți la detalii și să facem toate observațiile necesare.

## Probleme suplimentare

* [joc - ONI 2011 VI](https://kilonova.ro/problems/1363)
* [furnica - OJI 2007 VI](https://kilonova.ro/problems/763)
* [oua - ONI 2007 VI](https://kilonova.ro/problems/1268)
* [circular - OJI 2022 X](https://kilonova.ro/problems/284)
* [gcl - Baraj 2018 Juniori](https://kilonova.ro/problems/1091) (O problemă la care este mult de scris, dar care vă ajută să vă organizați codul mai bine și vă îmbunătățește abilitățile de implementare)
* [medalion - ONI 2012 VI](https://kilonova.ro/problems/1387) (Trebuie să simulați cum se construiește o spirală)
* [tinta - ONI 2014 VI](https://kilonova.ro/problems/1435)
* [robinhood - ONI 2024 V](https://kilonova.ro/problems/2637)
* [numere - OJI 2008 V](https://kilonova.ro/problems/772) (necesită cunoștința perioadei [Pisano](https://en.wikipedia.org/wiki/Pisano_period))
* [cartofi - OJI 2021 VIII](https://kilonova.ro/problems/936)
* [seif - Lot 2022 Juniori](https://kilonova.ro/problems/1818)
* [loopover - Lot 2022 Juniori](https://kilonova.ro/problems/1823)
* [Probleme de forță brută de pe kilonova](https://kilonova.ro/tags/323)
* [Probleme de periodicitate de pe kilonova](https://kilonova.ro/tags/502)
* [Alte probleme de implementare de pe kilonova](https://kilonova.ro/tags/290)

## Resurse suplimentare

* [Simulation - USACO Guide](https://usaco.guide/bronze/simulation)
* [Verificarea unor proprietati - pbinfo](https://www.pbinfo.ro/articole/5586/verificarea-unor-proprietati)
* [Simulare - algopedia](https://www.algopedia.ro/wiki/index.php/Clasa_a_VI-a_lec%C8%9Bia_14_-_20_dec_2018#Simulare)
* [Simulare, partea 2 - algopedia](https://www.algopedia.ro/wiki/index.php/Clasa_a_VI-a_lec%C8%9Bia_15_-_17_ian_2019)
