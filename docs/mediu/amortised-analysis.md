---
id: amortised-analysis
author:
    - Ștefan-Cosmin Dăscălescu
prerequisites:
    - bitwise-ops
    - stack
tags:
    - optimizare
    - coada
    - stiva
---

## Ce este analiza amortizată?

În algoritmică, se întâmplă de foarte multe ori să găsim algoritmi pentru
diverse aplicații care deși la prima vedere par foarte înceți, după ce îi
analizăm în detaliu, constatăm faptul că în practică se comportă foarte bine și
în multe cazuri, putem chiar demonstra complexitatea rapidă pe care aceștia o
au.

Această metodă de a analiza complexitatea unui algoritm pentru care timpul de
execuție nu este evident se numește analiză amortizată și este foarte utilă în
majoritatea algoritmilor mai complecși.

!!! note "Cum funcționează analiza amortizată?"

    În analiza amortizată, facem media timpului necesar pentru a executa o secvență
    de operații, împărțind acest timp la numărul operațiilor executate. Prin analiza
    amortizată putem să arătăm că costul mediu al unei operații este mic, atunci
    când împărțim la numărul de operații, cu toate că o singură operație din
    secvență ar putea fi "scumpă". Acest cost mediu per operație se mai numește și
    costul amortizat.

## Exemple

### Incrementarea unui contor binar

Dacă vrem să păstrăm un contor binar de lungime $n$, pentru a aduna un 1 la o
valoare, se poate întâmpla să schimbăm valoarea tuturor biților din șirul pe
care îl aveam (cel mult $n$), deci s-ar putea spune că complexitatea unei
asemenea operații este $\mathcal{O}(n)$.

Totuși, dacă analizăm mai în detaliu ce se întâmplă, observăm că deși biții de
pe pozițiile mai nesemnificative își schimbă valoarea des, biții mai
semnificativi își schimbă poziția mult mai rar. Cu alte cuvinte, un bit de pe
poziția $i$ își schimbă valoarea odată la $2^i$ incrementări, iar operația de
transport apare odată la $2^{i+1}$ incrementări.

Astfel, dacă avem un număr de incrementări fix (să presupunem că acesta este
$x$), numărul de schimbări care se face este $\frac{x}{2^0} + \frac{x}{2^1} +
\dots + \frac{x}{2^n}$, unde $n$ este lungimea maximă a acestui număr. Cu alte
cuvinte, această sumă este de fapt aproximativ egală cu $2 \cdot x$, iar
complexitatea reală a acestei incrementări este $\mathcal{O}(1)$.

### Ciurul lui Eratostene

Deși am vorbit în detaliu de acest algoritm și în [articolul său
specific](../usor/sieve.md), nu am discutat foarte mult
complexitatea sa.

```cpp
int prim[100001];
for (int i = 2; i <= n; i++) {
    if (prim[i] == 0) {
        for (int j = i + i; j <= n; j += i) {
            prim[j] = 1;
        }
    }
}
```

La prima vedere, ne-am putea gândi că complexitatea acestui algoritm ar fi
$\mathcal{O}(n^2)$, deoarece avem două foruri și cel de-al doilea for merge de asemenea de
la $i$ la $n$.

Totuși, pasul din cel de-al doilea for este de $i$, deci trebuie să analizăm
câți pași facem de fapt pentru un $n$ fixat.

- $\frac{n}{2} + \frac{n}{3} + \frac{n}{5} + \dots$, sumă care converge la $\mathcal{O}(n
  \log \log n)$, datorită proprietăților sumelor armonice. Se poate observa și
  când programul este rulat că viteza lui de execuție este foarte bună în
  practică.

### Operațiile specifice stivei

Așa cum s-a observat în articolul nostru despre
[stivă](../usor/sieve.md), la un moment dat, putem scoate un
număr mare de valori, în special dacă valoarea pe care o adăugăm este cea mai
mare sau cea mai mică de până acum.

Totuși, deoarece pentru fiecare valoare putem să adăugăm și să o scoatem cel
mult o singură dată, numărul total de operații va fi $2 \cdot n$, iar
complexitatea algoritmului devine $\mathcal{O}(n)$.

### Hash table

În unele probleme de algoritmică, suntem forțați să păstrăm valorile conform
unei codificări de tip hash, pentru a reduce complexitatea totală. Deși în
teorie, se poate întâmpla ca toate valorile să fie egale și complexitatea să
devină liniară, în practică, valorile vor fi distribuite relativ normal și
complexitatea pentru operații precum găsirea valorilor devine constantă.

### Păduri de mulțimi disjuncte

Deși intrăm mai mult în detalii [aici](./dsu.md), se
poate demonstra cu ușurință faptul că complexitatea totală a operațiilor, dacă
aplicăm optimizările descrise acolo devine $\mathcal{O}(n \log^{*} n)$, chiar dacă
operațiile individuale sunt de ordin liniar.

## Concluzii

Analiza amortizată este o metodă folosită pentru foarte multe tipuri de
algoritmi pentru a demonstra complexitatea acestora, atunci când lucrurile nu
sunt evidente. De asemenea, această metodă se aplică și pentru anumite părți din
probleme care deși în teorie par încete, complexitatea lor practică este una mai
rapidă.

## Probleme suplimentare

- [Probleme care implica analiza amortizata -
  nerdarena](https://www.nerdarena.ro/cauta-probleme?tag_ids=11)

## Resurse suplimentare

- [Un video despre analiza amortizată, vă va ajuta să înțelegeți mai bine
  rezolvarea problemei *stack_max_min* și de ce are complexitatea
  $\mathcal{O}(N)$](https://www.youtube.com/watch?v=T7W5E-5mljc)
- [Analiza amortizata -
  Algopedia](https://www.algopedia.ro/wiki/index.php/Clasa_VII/VIII_lec%C8%9Bia_9_-_18_nov_2014#Analiz%C4%83_amortizat%C4%83)
- [Amortized analysis -
  Wikipedia](https://en.wikipedia.org/wiki/Amortized_analysis)
- [Analiza amortizata - Utilizarea unei
  stive](https://revista.infobits.ro/2021/08/31/analiza-amortizata-utilizarea-unei-stive/)
- [Amortized analysis -
  CLRS](https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2012/83b82d45beb3776da72b7f3e1b3f42df_MIT6_046JS12_lec11.pdf)
- [Amortized Complexity and Rollbacks -
  Codeforces](https://codeforces.com/blog/entry/58528)
- [Amortized analysis - Carnegie Mellon
  University](https://www.cs.cmu.edu/afs/cs/academic/class/15451-s07/www/lecture_notes/lect0206.pdf)
