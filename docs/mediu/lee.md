---
tags:
    - structuri de date
    - Coadă
    - Lee
    - Fill
    - Stiva
    - BFS
    - DFS
---

**Autor:** Ștefan-Cosmin Dăscălescu, Teodor Ștefan Manolea

!!! example "Cunoștințe necesare"
    - [Vectori (tablouri unidimensionale)](../cppintro/arrays.md)
    - [Matrici (tablouri bidimensionale)](../cppintro/matrices.md)
    - [Coada](./queue.md)
    - [Subprograme](../cppintro/functions.md)

## Introducere

Să presupunem că avem de-a face cu un labirint cu diverse tipuri de obstacole și
spații libere, iar obiectivul nostru este acela de a afla dacă putem ajunge de
la punctul $A$ la punctul $B$, unde punctele $A$ și $B$ sunt date în input. În
alte variații ale acestui tip de probleme, ni se poate cere și aflarea distanței
minime între două sau mai multe puncte.

!!! info "Resursă foarte utilă"

    Recomandăm softul făcut de cei de la Colegiul Național "Emil Racoviță" Iași,
    atât pentru valoarea istorică, cât și pentru claritatea explicațiilor
    grafice, soft educațional pe care îl găsiți
    [aici](http://ler.is.edu.ro/~ema/proiecte/soft/2022/algoritmul_lui_lee/index/index.html).

Pe parcurs, veți observa că indiferent de modul în care veți rezolva aceste
clase de probleme, multe dintre principiile pe care le folosiți vor rămâne
aceleași, în special atunci când vine vorba de implementarea acestor tipuri de
parcurgeri.

Cele două moduri principale de a rezolva această categorie de probleme sunt fie
folosind algoritmi de tip flood fill recursiv (numit și fill în jargonul
românesc), fie folosind algoritmi iterativi de parcurgere ai labirintului (numit
algoritmul lui Lee în literatura de specialitate românească).

În cele ce urmează, voi prezenta atât flood fill-ul recursiv, cât și algoritmul
lui Lee.

## Fundamente

Până să ajungem să discutăm implementarea algoritmilor în sine, vom prezenta
câțiva pași importanți pe care trebuie să-i facem până ajungem să implementăm
complet acești doi algoritmi, precum și cunoștințele necesare.

### Cunoștințe necesare

În ceea ce privește metodele iterative, folosite la algoritmul lui Lee,
cunoașterea cozii este obligatorie, detalii despre modul de implementare, precum
și variațiile acestei structuri de date pot fi găsite [aici](./queue.md).

În ceea ce privește metodele recursive, folosite la flood fill, cunoașterea
stivei și a recursivității este obligatorie, detalii despre modul de folosire al
stivei pot fi găsite [aici](./stack.md), iar informații despre implementarea
funcțiilor recursive se găsesc
[aici](../cppintro/functions.md).

O altă noțiune care se recomandă a fi cunoscută în prealabil este tipul de date
pair sau o alternativă a acestuia (tuple sau dacă preferați implementările în
stilul C, tipul de date struct, care permite și alte modificări după caz).

### Vectorii de direcție

În majoritatea problemelor de acest tip, personajele noastre se vor deplasa
folosind mutări succesive pe una dintre cele 4 sau 8 direcții care ne sunt
permise de problemă (de regulă, direcțiile cardinale - nord, est, sud, vest și
eventual direcțiile diagonale - nord-est, sud-est, sud-vest, nord-vest).

Pentru a stoca în memorie aceste dimensiuni cu ușurință, vom ține în memorie
toate direcțiile posibile, iar pentru a face scrierea lor ușoară, se recomandă
scrierea lor în sensul acelor de ceasornic. Acestea se pot scrie toate la
început, noi putând folosi fie arrays din C, fie vectori.

Mai jos găsiți modul de declarare a acestor vectori de direcție atunci când
putem merge doar în direcția celor 4 vecini cardinali.

```cpp
int ox[] = {-1, 0, 1, 0};
int oy[] = {0, 1, 0, -1};
```

```cpp
vector<int> ox = {-1, 0, 1, 0};
vector<int> oy = {0, 1, 0, -1};
```

Pentru a extinde acum la 8 vecini, vom insera direcțiile intermediare în
ordinea acelor de ceasornic, mai jos găsiți modul de declarare a acestor vectori
de direcție pentru toate direcțiile, începând de la N și terminând cu NV, în
sens orar.

```cpp
int ox[] = {-1, -1, 0, 1, 1, 1, 0, -1};
int oy[] = {0, 1, 1, 1, 0, -1, -1, -1};
```

```cpp
vector<int> ox = {-1, -1, 0, 1, 1, 1, 0, -1};
vector<int> oy = {0, 1, 1, 1, 0, -1, -1, -1};
```

O alternativă folosită în multe coduri constă în enumerarea vecinilor în ordine
crescătoare a schimbării care se produce pe linie, mai întâi prioritizând
vecinii nordici, apoi cei centrali și apoi cei sudici.

```cpp
int ox[] = {-1, -1, -1, 0, 0, 1, 1, 1};
int oy[] = {-1, 0, 1, -1, 1, -1, 0, 1};
```

```cpp
vector<int> ox = {-1, -1, -1, 0, 0, 1, 1, 1};
vector<int> oy = {-1, 0, 1, -1, 1, -1, 0, 1};
```

Indiferent de modul în care îi declarați, dacă sunteți la un punct $(x, y)$ și
vreți să verificați toți vecinii, tot ce trebuie să faceți este să parcurgeți
vectorii de direcție și să identificați valorile vecinilor.

```cpp
for (int i = 0; i < neighbors; i++) {
    int nxt_x = x + ox[i];
    int nxt_y = y + oy[i];
    // aici urmeaza verificarile ulterioare
}
```

### Evitarea accesării unor pătrate din afara matricii

Pentru a ne asigura că de-a lungul parcurgerilor, noi nu vom ieși din matrice,
avem două variante la fel de bune și populare.

O primă variantă constă în a adăuga ziduri imaginare pe marginile matricii,
procedeu cunoscut și sub denumirea de bordare. Vom presupune că matricea se
numește mat, iar tabloul are $n$ linii și $m$ coloane.

```cpp
for (int i = 0; i <= m+1; i++) {
    mat[0][i] = mat[n+1][i] = -1; // bordarea liniilor 0 si n+1
}
for (int i = 0; i <= n+1; i++) {
    mat[i][0] = mat[i][m+1] = -1; // bordarea coloanelor 0 si m+1
}
```

O a doua variantă constă în verificarea atentă a fiecărei stări atunci când
trecem prin ea, astfel încât să ne asigurăm că nu ieșim din matrice, lucru ce se
întâmplă când trecem prin pătrate noi în matrice.

```cpp
for (int i = 0; i < neighbors; i++) {
    int nxt_x = x + ox[i];
    int nxt_y = y + oy[i];
    if (nxt_x >= 1 && nxt_x <= n && nxt_y >= 1 && nxt_y <= m) {
        // aici vin verificarile ulterioare
    }
}
```

Pe de o parte, un avantaj al bordării este acela că nu avem nevoie de o
verificare relativ complicată pentru pătratele din matrice. Pe de altă parte,
verificarea fără bordare nu are nevoie de memorie suplimentară. Se poate observa
faptul că ambele metode au avantajele lor, nefiind una din ele superioară
celeilalte.

## Problemă introductivă - [Counting Rooms](https://cses.fi/problemset/task/1192/)

Pentru a exemplifica aceste noțiuni și a prezenta algoritmii, precum și
diferențele dintre ei, vom pleca de la o problemă simplă, și anume aflarea
numărului de camere dintr-o încăpere.

## Algoritmul fill (flood fill recursiv)

Pentru a implementa algoritmul flood fill, va trebui să plecăm pe rând din
fiecare punct nevizitat, iar la un pas al acestui algoritm, vom verifica toți
vecinii folosind vectorul de direcție creat anterior, iar atunci când dăm de un
asemenea punct, vom apela funcția fill pentru a continua vizitarea punctelor.
Trebuie avut grijă să marcăm punctele drept vizitate, pentru a evita ciclarea la
infinit.

!!! note "Observație"
    Se poate observa că acest algoritm este un caz particular al parcurgerii DFS
    de pe grafuri, ambele fiind recursive și operând în același mod.

Mai jos, puteți găsi o implementare recursivă, în stilul algoritmului flood
fill, care rezolvă problema Counting Rooms, prezentată mai sus.

```cpp
#include <iostream>
#include <fstream>
#include <vector>
#include <queue>

using namespace std;

vector<int> ox = {-1, 0, 1, 0};
vector<int> oy = {0, 1, 0, -1};

void fill (int n, int m, int X, int Y, vector<vector<char> > &grid, vector<vector<int> > &visited) {
    visited[X][Y] = 1;
    for (int i = 0; i < 4; i++) {
        int nxt_x = X + ox[i];
        int nxt_y = Y + oy[i];
        
        if (nxt_x >= 1 && nxt_x <= n && nxt_y >= 1 && nxt_y <= m && visited[nxt_x][nxt_y] == 0 && grid[nxt_x][nxt_y] == '.') {
            fill(n, m, nxt_x, nxt_y, grid, visited);
        }
    }
}
int main() {
    
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n, m;
    cin >> n >> m;
    
    vector<vector<char> > grid(n+1, vector<char> (m+1));
    vector<vector<int> > visited(n+1, vector<int> (m+1));
    
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            cin >> grid[i][j];
        }
    }
    
    int ans = 0;

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (grid[i][j] == '.' && visited[i][j] == 0) {
                
                fill(n, m, i, j, grid, visited);
                ans++;
            }
        }
    }
    
    cout << ans << '\n';
    return 0;
}
```

## Algoritmul lui Lee (flood fill iterativ)

Pentru a implementa algoritmul lui Lee, va trebui să plecăm pe rând din fiecare
punct nevizitat, iar la un pas al acestui algoritm, vom verifica toți vecinii
folosind vectorul de direcție creat anterior, iar atunci când dăm de un asemenea
punct, vom adăuga vecinul în coadă, la fiecare pas prelucrând primul punct care
încă se află în coadă. Trebuie avut grijă să marcăm punctele drept vizitate,
pentru a evita ciclarea la infinit.

!!! note "Observație"

    Se poate observa că acest algoritm este un caz particular al parcurgerii BFS
    de pe grafuri, ambele fiind iterative și operând în același mod, folosind o
    coadă.

Mai jos, puteți găsi o implementare bazată pe o coadă, în stilul algoritmului
lui Lee, care rezolvă problema Counting Rooms, prezentată mai sus.

!!! note "Observație importantă"

    Deși în majoritatea cazurilor putem folosi fie metoda fill, fie metoda
    iterativă, atunci când avem nevoie să aflăm distanța dintre două sau mai
    multe puncte, singura metodă optimă este cea iterativă, bazată pe coadă,
    deoarece în cazul fill, depindem de modul în care ajungem să apelăm vecinii
    recursiv, ceea ce reprezintă o strategie care va duce la soluții ineficiente
    din punct de vedere al timpului și memoriei. Acest argument va fi reluat și
    atunci când prezentăm DFS și BFS la grafuri.

```cpp
#include <iostream>
#include <fstream>
#include <vector>
#include <queue>

using namespace std;

int main() {
    
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n, m;
    cin >> n >> m;
    
    vector<vector<char> > grid(n+1, vector<char> (m+1));
    vector<vector<int> > visited(n+1, vector<int> (m+1));
    
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            cin >> grid[i][j];
        }
    }
    
    int ans = 0;
    vector<int> ox = {-1, 0, 1, 0};
    vector<int> oy = {0, 1, 0, -1};

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (grid[i][j] == '.' && visited[i][j] == 0) {
                
                queue <pair<int, int> > q;
                
                q.push({i, j});
                visited[i][j] = 1;
                ans++;
                
                while (!q.empty()) {
                    pair<int, int> node = q.front();
                    q.pop();
                    
                    for (int i = 0; i < 4; i++) {
                        int nxt_x = node.first + ox[i];
                        int nxt_y = node.second + oy[i];
                        
                        if (nxt_x >= 1 && nxt_x <= n && nxt_y >= 1 && nxt_y <= m && visited[nxt_x][nxt_y] == 0 && grid[nxt_x][nxt_y] == '.') {
                            visited[nxt_x][nxt_y] = 1;
                            q.push({nxt_x, nxt_y});
                        }
                    }
                }
            }
        }
    }
    
    cout << ans << '\n';
    return 0;
}
```

### Problema [Alee OJI 2007](https://kilonova.ro/problems/768)

Probabil una din cele mai cunoscute probleme românești care folosește algoritmul
lui Lee pentru rezolvarea acesteia, această problemă necesită implementarea
algoritmului prezentat anterior pentru aflarea distanței de la origine la
punctul inițial la cel final.

```cpp
#include <bits/stdc++.h>

using namespace std;

int ox[4] = {0, 1, 0, -1};
int oy[4] = {-1, 0, 1, 0};

bool isValid(int x, int y, int n, int m, vector<vector<int> > &mat) {
    return x > 0 && y > 0 && x <= n && y <= n && mat[x][y] == 0;
}

int main() {
    
    ifstream cin("alee.in");
    ofstream cout("alee.out");

    int x, y, n, m, final_x, final_y;
    cin >> n >> m;
    
    
    vector<vector<int> > mat(n+1, vector<int> (n+1));
    for (short i = 0; i < m; i++) {
        cin >> x >> y;
        mat[x][y] = -1;
    }
    
    cin >> final_x >> final_y;
    mat[final_x][final_y] = 1;
    
    queue<pair<int, int> > q;
    
    q.push({final_x, final_y});
    cin >> final_x >> final_y;
    
    while (!q.empty()) {
        pair<int, int> temp = q.front();
        q.pop();

        for (int i = 0; i < 4; i++) {
            int new_x = temp.first + ox[i];
            int new_y = temp.second + oy[i];
            if (isValid(new_x, new_y, n, m, mat)) {
                mat[new_x][new_y] = mat[temp.first][temp.second] + 1;
                q.push({new_x, new_y});
            }
        }

    }

    cout << mat[final_x][final_y] << '\n';
    return 0;
}
```

### Problema [Labirint OJI 2021](https://kilonova.ro/problems/938)

Pentru a rezolva această problemă, putem începe o parcurgere din punctele $(1,
1)$ și $(n, m)$, iar pentru a verifica dacă apar îmbunătățiri, trebuie doar să
verificăm cu atenție perechile de distanțe noi ce apar, acesta fiind motivul
pentru care avem nevoie de două parcurgeri, în loc de una.

```cpp
#include <bits/stdc++.h>  
using namespace std;  
     
int n, m, q;  
    
bool ok[1000002];  
int mx[1000002];  
    
char mat[1002][1002];  
int dist[2][1002][1002];  
     
bool viz[1002][1002];  
    
int ox[] = {-1, 0, 1, 0};  
int oy[] = {0, 1, 0, -1};  
    
bool check (int x, int y) {  
    return ((x >= 1) && (x <= n) && (y >= 1) && (y <= m) && (viz[x][y] == 0));  
}  
void lee (int drum, int x, int y) {  
    memset(viz, 0, sizeof(viz));  
    deque<pair<int, int> > d;  
    d.push_back({x, y});  
    viz[x][y] = 1;  
    for (int i = 1; i <= n; ++i) { 
        for (int j = 1; j <= m; ++j) {  
            dist[drum][i][j] = -1;  
        }
    }
    dist[drum][x][y] = 1;  
    while (!d.empty()) {  
        pair<int, int> nod = d[0];  
        d.pop_front();  
        for (int i = 0; i <= 3; ++i) {  
            int nxt_x = ox[i] + nod.first;  
            int nxt_y = oy[i] + nod.second;  
            if (check(nxt_x, nxt_y) && dist[drum][nxt_x][nxt_y] == -1) {  
                dist[drum][nxt_x][nxt_y] = dist[drum][nod.first][nod.second] + 1;  
                if (mat[nxt_x][nxt_y] == '0') {  
                    viz[nxt_x][nxt_y] = 1;  
                    d.push_back({nxt_x, nxt_y});  
                }  
            }  
        }  
    }  
}  
    
char ans[1002][1002];  

int main() {  
    ifstream cin("labirint.in");  
    ofstream cout("labirint.out");  
        
    cin >> n >> m;  
    for (int i = 1; i <= n; ++i) {  
        cin >> (mat[i] + 1);  
    }  
        
    lee(0, 1, 1);  
    lee(1, n, m);  
        
    for (int i = 1; i <= n; ++i) {
        for (int j = 1; j <= m; ++j) { 
            if (mat[i][j] == '1' && dist[0][i][j] != -1 && dist[1][i][j] != -1) {  
                if (dist[0][i][j] + dist[1][i][j] - 1 < dist[1][1][1]) {
                    ans[i][j] = '1';  
                }
                else {
                    ans[i][j] = '0';  
                }
            }  
            else {
                ans[i][j] = '0';  
            }
        }
    }
        
    for (int i = 1; i <= n; ++i) { 
        cout << (ans[i] + 1) << '\n';
    }  
    return 0;  
}  
```

## Lee cu mai multe origini

În anumite situații, suntem nevoiți să simulăm o variație a algoritmului lui Lee
în care avem de-a face cu mai multe puncte de start. În acest caz, deoarece de
cele mai multe ori este prea încet să rulăm algoritmul pentru fiecare punct de
start, putem pur și simplu să adăugăm în coadă toate originile și să rulăm
același algoritm, singura diferență fiind atunci când vrem să aflăm originea
fiecărui drum, deoarece trebuie să fim atenți să evităm situațiile în care nu
putem construi drumul cum trebuie.

### Problema [Monsters de pe CSES](https://cses.fi/problemset/task/1194)

În această problemă, trebuie să găsim un drum pentru personajul nostru astfel
încât să poată ajunge la una din marginile matricii fără să se intersecteze cu
vreun monstru.

Abordarea generală pentru aceste tipuri de probleme constă în a afla mai întâi
pentru monștri, respectiv pentru personajul nostru distanțele de la punctele lor
de origine la celelalte pătrate din matrice, iar în cazul personajului,
singurele pătrate accesibile sunt cele la care va ajunge înaintea oricărui
monstru, deoarece se știe că monștrii pot colabora pentru a opri rivalul lor.
Așa cum se va observa în implementarea de mai jos, toți monștrii sunt adăugați
în coadă la începutul traversării.

Un alt element important în această problemă constă în reconstruirea soluției,
procedeul fiind similar cu cel prezentat la problema anterioară.

Mai jos găsiți implementarea autorului pentru această problemă.

```cpp
#include <bits/stdc++.h>
using namespace std;
 
int ox[] = {0, 1, 0, -1};
int oy[] = {1, 0, -1, 0};
 
int main() {
    int n, m;
    cin >> n >> m;
    
    char grid[n+1][m+1];
    for (int i = 1; i <= n; i++) {
        cin >> (grid[i] + 1);
    }
    
    vector<vector<int> > distM(n+1, vector<int> (m+1, (1<<20))), distA(n+1, vector<int> (m+1, (1<<20)));
    
    queue<pair<int, int> > qM, qA;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (grid[i][j] == 'A') {
                distA[i][j] = 0;
                qA.push({i, j});
            }
            if (grid[i][j] == 'M') {
                distM[i][j] = 0;
                qM.push({i, j});
            }
        }
    }
    
    while(!qM.empty()) {
        pair<int, int> node = qM.front();
        qM.pop();
        
        for (int i = 0; i < 4; i++) {
            int nxtX = node.first + ox[i];
            int nxtY = node.second + oy[i];
            if (nxtX >= 1 && nxtX <= n && nxtY >= 1 && nxtY <= m && grid[nxtX][nxtY] != '#') {
                if (distM[nxtX][nxtY] > distM[node.first][node.second] + 1) {
                    distM[nxtX][nxtY] = distM[node.first][node.second] + 1;
                    qM.push({nxtX, nxtY});
                }
            }
        }
    }
    
    while(!qA.empty()) {
        pair<int, int> node = qA.front();
        qA.pop();
        
        for (int i = 0; i < 4; i++) {
            int nxtX = node.first + ox[i];
            int nxtY = node.second + oy[i];
            if (nxtX >= 1 && nxtX <= n && nxtY >= 1 && nxtY <= m && grid[nxtX][nxtY] != '#') {
                if (distA[nxtX][nxtY] > distA[node.first][node.second] + 1 && distA[node.first][node.second] + 1 < distM[nxtX][nxtY]) {
                    distA[nxtX][nxtY] = distA[node.first][node.second] + 1;
                    qA.push({nxtX, nxtY});
                }
            }
        }
    }
    
    
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (distA[i][j] != (1<<20) && (i == 1 || i == n || j == 1 || j == m)) { 
                int x = i;
                int y = j;
                string s;
                while (distA[x][y] != 0) {
                    if (distA[x-1][y] == distA[x][y] - 1) {
                        s += 'D';
                        x--;
                        continue;
                    }
                    if (distA[x][y-1] == distA[x][y] - 1) {
                        s += 'R';
                        y--;
                        continue;
                    }
                    if (distA[x+1][y] == distA[x][y] - 1) {
                        s += 'U';
                        x++;
                        continue;
                    }
                    if (distA[x][y+1] == distA[x][y] - 1) {
                        s += 'L';
                        y++;
                        continue;
                    }
                }
                cout << "YES\n";
                cout << s.size() << '\n';
                reverse(s.begin(), s.end());
                cout << s << '\n';
                return 0;
            }
        }
    }
    
    cout << "NO\n";
    return 0;
}
```

## Algoritmul 0-1 BFS

Deși acest algoritm este folosit în principal pentru problemele de drumuri
minime pe grafuri, există exemple care implică și probleme pe matrici, așa cum
se precizează în [articolul nostru despre drumuri
minime](./shortest-path.md.md#0-1-bfs).

## Lee cu structuri de date

În unele cazuri, putem avea de-a face cu probleme în care vizitarea unui pătrat
adiacent din matrice poate avea costuri diferite de 0 și 1, în acest caz se
impune folosirea unor structuri de date pentru a calcula aceste costuri minime,
implementarea devenind foarte similară cu cea pe care o veți vedea atunci când
veți învăța [algoritmul lui
Dijkstra](./shortest-path.md#algoritmul-lui-dijkstra), acesta fiind varianta sa
pe matrice.

La fel ca și la Dijkstra, cele mai populare structuri de date sunt setul și
coada de priorități, mai jos găsind implementări folosind ambele structuri de
date ce rezolvă problema [lee2 de pe
pbinfo](https://www.pbinfo.ro/probleme/3368/lee2).

### Implementare cu set

```cpp
#include <bits/stdc++.h>
using namespace std;

int ox[] = {-1, 0, 1, 0};
int oy[] = {0, 1, 0, -1};

int main() {
    
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int x, y, z, n, t;
    cin >> n >> x >> y >> z >> t;
    
    vector<vector<int> > val(n+1, vector<int> (n+2, 0)), dp(n+1, vector<int> (n+1, (1<<25)));
    
    for (int i = 1; i <= n; ++i) {
        cin >> val[1][i];
    }
    
    for (int i = 2; i <= n; ++i) {
        for (int j = 1; j <= n; ++j) {
            val[i][j] = 1 + (val[i-1][j-1] * x + val[i-1][j] * y + val[i-1][j+1] * z) % t;
        }
    }
    
    dp[1][1] = val[1][1];
    
    set<pair<int, pair<int, int> > >s;
    s.insert({dp[1][1], {1, 1}});
    
    while (!s.empty()) {
        pair<int, pair<int, int> > x = *s.begin();
        s.erase(x);
        
        pair<int, int> nod = x.second;
        
        for (int i = 0; i <= 3; ++i) {
            int new_x = ox[i] + nod.first;
            int new_y = oy[i] + nod.second;
            if (new_x == 0 || new_y == 0 || new_x == n+1 || new_y == n+1) {
                continue;
            }
            if (dp[nod.first][nod.second] + val[new_x][new_y] < dp[new_x][new_y]) {
                dp[new_x][new_y] = dp[nod.first][nod.second] + val[new_x][new_y];
                s.insert({dp[new_x][new_y], {new_x, new_y}});
            }
        }
    }
       
    cout << dp[n][n] << '\n';
    return 0;
}
```

### Implementare cu priority queue

!!! note "Observație"

    Nodurile se introduc în priority queue cu minus în față deoarece vrem să
    ținem elementele în ordine crescătoare, iar implementarea standard a
    priority queue le ține în ordine descrescătoare.

```cpp
#include <bits/stdc++.h>
using namespace std;

int ox[] = {-1, 0, 1, 0};
int oy[] = {0, 1, 0, -1};

int main() {
    
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int x, y, z, n, t;
    cin >> n >> x >> y >> z >> t;
    
    vector<vector<int> > val(n+1, vector<int> (n+2, 0)), dp(n+1, vector<int> (n+1, (1<<25)));
    
    for (int i = 1; i <= n; ++i) {
        cin >> val[1][i];
    }
    
    for (int i = 2; i <= n; ++i) {
        for (int j = 1; j <= n; ++j) {
            val[i][j] = 1 + (val[i-1][j-1] * x + val[i-1][j] * y + val[i-1][j+1] * z) % t;
        }
    }
    
    dp[1][1] = val[1][1];
    
    priority_queue<pair<int, pair<int, int> > >pq;
    pq.push({-dp[1][1], {1, 1}});
    
    while (!pq.empty()) {
        pair<int, pair<int, int> > x = pq.top();
        pq.pop();
        
        pair<int, int> nod = x.second;
        
        for (int i = 0; i <= 3; ++i) {
            int new_x = ox[i] + nod.first;
            int new_y = oy[i] + nod.second;
            if (new_x == 0 || new_y == 0 || new_x == n+1 || new_y == n+1) {
                continue;
            }
            if (dp[nod.first][nod.second] + val[new_x][new_y] < dp[new_x][new_y]) {
                dp[new_x][new_y] = dp[nod.first][nod.second] + val[new_x][new_y];
                pq.push({-dp[new_x][new_y], {new_x, new_y}});
            }
        }
    }
       
    cout << dp[n][n] << '\n';
    return 0;
}
```

## Concluzii

Algoritmii de tip flood fill sunt unii din cei mai întâlniți algoritmi din
această secțiune a structurilor de date liniare, ei regăsindu-se în foarte multe
tipuri de probleme, fiind una din cele mai populare tipuri de probleme de la
olimpiadele de informatică din România și nu numai, aceștia fiind regăsiți și în
USACO Silver și alte competiții similare.

În multe situații, datorită popularității acestei metode, problemele noi ce
folosesc această tehnică combină și alți algoritmi, precum căutarea binară,
programarea dinamică sau chiar combinatorica în anumite exemple mai dificile.

Pe lângă aplicațiile din problemele de algoritmică, aceștia se regăsesc și în
multe situații practice, în care trebuie estimat impactul unor potențiale
dezastre naturale sau chiar și în editarea imaginilor și a altor forme grafice.

## Probleme suplimentare

- [OJI 2004 rj](https://kilonova.ro/problems/734)
- [OJI 2007 alee](https://kilonova.ro/problems/768)
- [infoarena muzeu](https://infoarena.ro/problema/muzeu)
- [infoarena barbar](https://infoarena.ro/problema/barbar)
- [RoAlgo Contest #1 - Expansion](https://kilonova.ro/problems/664/)
- [USACO Silver Icy
  Perimeter](https://usaco.org/current/current/index.php?page=viewproblem2&cpid=895)
- [USACO Silver Cross Country
  Skiing](http://www.usaco.org/index.php?page=viewproblem2&cpid=380)
- [OJI 2021 labirint](https://kilonova.ro/problems/938)
- [OJI 2009 insule](https://kilonova.ro/problems/398)
- [infoarena delfin](https://www.infoarena.ro/problema/delfin)
- [infoarena vila](https://infoarena.ro/problema/vila)
- [infoarena marceland](https://www.infoarena.ro/problema/marceland)
- [Codeforces Fox and Two Dots](https://codeforces.com/contest/510/problem/B)
- [USACO Silver Where's
  Bessie](http://www.usaco.org/index.php?page=viewproblem2&cpid=740)
- [Codeforces Solve the Maze](https://codeforces.com/contest/1365/problem/D)
- [OJI 2018 castel](https://kilonova.ro/problems/900)
- [ONI 2014 traseu](https://kilonova.ro/problems/1429)
- [Codeforces Igor in the Museum](https://codeforces.com/contest/598/problem/D)
- [ONI 2012 gheizere](https://kilonova.ro/problems/1396)
- [Codeforces Olya and Energy
  Drinks](https://codeforces.com/problemset/problem/877/D)
- [USACO Silver Comfortable
  Cows](http://www.usaco.org/index.php?page=viewproblem2&cpid=1110)
- [USACO Silver Snow
  Boots](https://usaco.org/index.php?page=viewproblem2&cpid=811)
- [Lot Juniori 2021 Fete si baieti](https://kilonova.ro/problems/1700)
- [OJI 2016 miting](https://kilonova.ro/problems/875)
- [Probleme cu coada si lee de pe
  pbinfo](https://www.pbinfo.ro/?pagina=probleme-lista&disciplina=0&clasa=10&tag=85&subtag=87&dificultate=2&folosesc_consola=-1&eticheta=&start=0)
- [Problemele cu flood fill de pe kilonova](https://kilonova.ro/tags/356)

## Lectură suplimentară

- [Flood fill - USACO Guide](https://usaco.guide/silver/flood-fill?lang=cpp)
- [BFS Fill - Algoritmul lui Lee -
  Algopedia](https://www.algopedia.ro/wiki/index.php/Clasa_a_VII-a_lec%C8%9Bia_14_-_12_dec_2019#BFS_Fill_(algoritmul_lui_Lee))
- [Algoritmul lui Lee - infogenius](https://infogenius.ro/algoritmul-lui-lee/)
- [Algoritmul lui Lee - infoarena](https://infoarena.ro/algoritmul-lee)
- [Algoritmul lui Lee -
  pbinfo](https://www.pbinfo.ro/articole/18589/algoritmul-lui-lee)
- [Cozi (include si alte probleme) - CPPI
  Sync](https://cppi.sync.ro/materia/cozi.html)
- [Probleme diverse - CPPI
  Sync](https://cppi.sync.ro/materia/probleme_diverse_paralela_cu_lee.html)
- [Flood fill - wikipedia](https://en.wikipedia.org/wiki/Flood_fill)
- [Algoritmi de umplere - generalitati -
  Pbinfo](https://www.pbinfo.ro/articole/18892/algoritmi-de-umplere-generalitati)
- [Algoritmi de umplere - fill recursiv -
  Pbinfo](https://www.pbinfo.ro/articole/18893/fill-recursiv)
- [Algoritmi de umplere - fill cu coada -
  Pbinfo](https://www.pbinfo.ro/articole/18894/fill-cu-coada)
- [An Efficient (and quite common) Way to Navigate Grid Problems -
  Codeforces](https://codeforces.com/blog/entry/78827)
- [0-1 BFS - Codeforces](https://codeforces.com/blog/entry/22276)
