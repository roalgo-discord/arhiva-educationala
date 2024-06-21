Una din primele structuri de date pe care orice programator o folosește, indiferent de limbajul de programare folosit este tabloul (array în engleză). Aceștia stau la baza unui număr mare de prelucrări care necesită un volum mare de date, iar în contextul rezolvării problemelor de algoritmică, tablouri sunt o parte fundamentală atât în sine, cât și prin faptul că toate tablourile multidimensionale sunt de fapt, tablouri unidimensionale puși împreună. Colocvial, aceste tablouri mai sunt numite și vectori, dar trebuie evitată confuzia cu vectorii din STL, prezentați ulterior.

Observatie: În memorie, tablourile sunt stocate secvențial, indiferent de numărul de dimensiuni pe care îl au.

În contextul limbajului C++, putem lucra cu tablourile în două moduri distincte: fie folosind varianta standard, luată din limbajul C, fie folosind STL (Standard Template Library). Conceptele din STL vor fi prezentate în capitolele ulterioare, deoarece acesta nu conține doar tablouri dinamice. În acest capitol voi insista mai ales pe varianta standard, lucrul cu STL fiind aprofundat mai cu seamă în capitolele utile. 

# Declararea și umplerea tablourilor statice

Pentru a declara un tablou și a da valori, trebuie să analizăm structura acestuia. În mod similar cu variabilele simple, ne trebuie un tip de date pe care acest tablou să-l stocheze, precum și dimensiunea pe care vrem să o atribuim acestui tablou. 

De exemplu, int v[101]; înseamnă ca am declarat un tablou cu $101$ elemente, pozițiile fiind numărate de la $0$ la $100$.

Observatie: Dacă preferați să lucrați cu tablouri indexate de la $1$, aveți grijă să adăugați $1$ la dimensiunile pe care le folosiți pentru a adapta tablourile la stilul vostru de lucru. De asemenea, nu puteți începe tablourile de la indici negativi cum se poate în alte limbaje (Pascal, de pildă) și nici să-i folosiți pentru a lua elemente de la final (ca în Python).

Observatie: De obicei, dimensiunea maximă este una statică, dar putem transforma tablourile statice în structuri alocate dinamic folosind funcțiile din limbajul C. Totuși, acesta nu este scopul articolului de față, iar ulterior în carte va fi prezentat STL. 

Pentru a atribui o valoare unei anumite poziții, se va proceda similar ca la o variabilă obișnuită, de exemplu v[5] = 7; înseamnă că pe poziția $5$, vom avea acum valoarea $7$.

Pentru a citi un vector, vom folosi de regulă o structură repetitivă, precum for sau while, citind valorile pe rând, la fel cum am proceda cu variabile obișnuite.

O altă metodă de a inițializa elementele dintr-un tablou este aceea de a atribui valori primelor poziții, idee ce va fi folosită pe parcurs la diverși algoritmi, un exemplu notabil fiind flood fill. De exemplu, int A[] = {10, 20, 30}; va crea un tablou cu $3$ elemente, unde A[0] = 10; A[1] = 20; ș.a.m.d.

# Inserarea, ștergerea, inversarea valorilor dintr-un tablou

De multe ori în diverse aplicații, putem avea nevoie de operația de inserare și de operația de ștergere din tablou, ambele operații fiind foarte importante pentru a putea lucra în mod corespunzător cu tablourile. În exemplele pe care le voi prezenta mai jos, voi presupune că tablourile sunt indexate de la $1$.

## Inserarea în tablou

Dacă avem un tablou cu $n$ valori și vrem să inserăm o valoare nouă la poziția $k$, unde $1 \leq k \leq n+1$, vom vrea mai întâi să mutăm valorile între pozițiile $n$ și $k$ cu o poziție la dreapta, iar mai apoi vom atribui noua valoare pe poziția $k$.  

```cpp
for(int i = n; i >= k; i--) 
    v[i+1] = v[i];
v[k] = x;
n++; // tabloul are o valoare în plus
```

Observatie: Mutarea valorilor trebuie făcută în ordine descrescătoare a pozițiilor inițiale deoarece altfel, am ajunge să avem aceeași valoare peste tot.

```cpp
for(int i = k; i <= n; i++) 
    v[i+1] = v[i];
v[k] = x;
n++; // tabloul are o valoare în plus
```

Se poate observa cu ușurință că valoarea de pe poziția $k$ va ajunge peste tot dacă implementăm așa, ceea ce este greșit.

# Ștergerea din tablou

Dacă avem un tablou cu $n$ valori și vrem să ștergem valoarea de la poziția $k$, unde $1 \leq k \leq n$, vom vrea să mutăm pe rând valorile de la pozițiile $k+1$, $k+2$, $\dots$, $n$ cu o poziție mai în spate. Spre deosebire de cazul inserării, vom vrea să mutăm valorile în ordine crescătoare a poziției inițiale. 

```cpp
for(int i = k; i < n; i++) 
    v[i] = v[i+1];
n--; // tabloul are o valoare în minus
```

Observatie: Mutarea valorilor trebuie făcută în ordine crescătoare a pozițiilor inițiale deoarece altfel, am ajunge să avem aceeași valoare peste tot.

```cpp
for(int i = n; i > k; i--) 
    v[i-1] = v[i];
n--; // tabloul are o valoare în plus
```

## Inversarea unui tablou

Pentru a putea inversa un tablou, trebuie să știm numărul de elemente pe care îl are. Scopul nostru este să avem pe poziția $i$ valoarea ce se afla anterior pe poziția $n - i + 1$, implementarea nefiind prea dificilă. Pentru a păstra scopul educativ, am implementat interschimbarea elementelor folosind "regula celor trei pahare".

```cpp
for(int i = 1; i <= n/2; i++)
{
    int x = v[i]; // ținem copia unei valori
    v[i] = v[n - i + 1]; // schimbăm poziția respectivă
    v[n - i + 1] = x; // folosim copia pentru noua poziție
}
```

# Interclasarea tablourilor

Pentru a putea interclasa două tablouri (de regulă, crescătoare) $A$ și $B$, având $n$, respectiv $m$ elemente, vom vrea mereu să introducem valoarea mai mică în tabloul unde ținem rezultatul, $C$, acesta având lungimea $n + m$. De asemenea, vom vrea să avem grijă ca după ce prelucrăm complet unul din cele două tablouri, să continuăm inserările cu cel de-al doilea tablou, unul din ele ar rămâne mereu cu valori. 

Observație: Folosind acest algoritm de interclasare, putem obține un tablou crescător în \bigO{n + m}, unde $n$ și $m$ sunt lungimile celor două șiruri. 

Observație: Folosind un algoritm similar cu cel prezentat mai jos, putem implementa diverse operații pe mulțimi, precum reuniunea, intersecția și diferența.

```cpp
int i = 1; 
int j = 1;
int poz = 0;
while(i <= n && j <= m)
{
    poz++;
    if(A[i] <= B[j])
        C[poz] = A[i], i++;
    else
        C[poz] = B[j], j++;
}
while(i <= n)
    poz++, C[poz] = A[i], i++;
while(j <= m)   
    poz++, C[poz] = B[j], j++;
```

# Rotirea tablourilor

Pentru a putea roti un tablou la stânga sau la dreapta, va trebui să mutăm toate elementele cu o poziție la stânga/dreapta, iar pentru a putea face asta, va trebui mai întâi să păstrăm în memorie valoarea de pe prima/ultima poziție, să mutăm secvențial celelalte valori și în cele din urmă să mutăm valoarea păstrată pe ultima/prima poziție în șirul nou rezultat. În mod similar, putem implementa rotirea cu $k$ poziții, folosind $O(k)$ memorie suplimentară. 

Deși algoritmul prezentat este unul liniar, mai târziu puteți descoperi un algoritm ce rulează în timp constant pentru o rotație la stânga sau la dreapta.