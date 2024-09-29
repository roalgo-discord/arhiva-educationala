---
title: Coada
tags:
    - structuri de date
---

**Autor**: Ștefan-Cosmin Dăscălescu, Teodor Ștefan Manolea

## Introducere și definiție

Cu toții suntem obișnuiți cu noțiunea de coadă. Aproape în fiecare zi, suntem nevoiți să stăm la coadă, fie că e vorba de cozi la magazin, la o casă de bilete sau la un ghișeu. În fiecare dintre aceste situații, ne așezăm în spatele cozii, așteptăm ca rând pe rând, cei din fața noastră să iasă din coadă, iar atunci când ajungem primii in coadă, să fim serviți.

În schimb, atunci când vine vorba de informatică și mai ales algoritmică, principiile cozilor sunt foarte utile în ceea ce privește reprezentarea datelor, făcându-ne viața mult mai ușoară și deschizând poarta spre foarte multe tipuri de aplicații.

Coada este structura de date care pune la dispoziție informațiile primite în ordinea în care au fost introduse.

Ea funcționează pe principiul “primul venit, primul servit” (First In, First Out/FIFO).

## Operații cu coada

Cu o coadă se pot face următoarele operații **în timp constant**:

* adăugarea unui nou element în spatele cozii. Operația se numește **push**;
* eliminarea elementului din vârful cozii. Operația se numește **pop**;
* accesarea valorii din vârful cozii. Operația se numește **front**;

Ca o consecință a acestor operații principale, putem face și următoarele lucruri:

* inițializarea cozii – crearea unei cozi vide;
* verificarea faptului că o coadă este sau nu vidă;

## Modul de folosire și implementare al cozii

Pentru a folosi o coadă, avem nevoie de o metodă de a o implementa. Două dintre cele mai des întâlnite variante de a implementa o coadă sunt varianta statică, folosind tablouri (eventual circulare) sau folosind containerul queue din STL.

În cele ce urmează, vom prezenta aceste implementări folosind problema [coada](https://www.pbinfo.ro/probleme/876/coada) de pe pbinfo, aceasta fiind o problemă de bază care ne ajută să putem explica diferențele între diverse metode de a implementa această structură de date. 

### Coada cu tablouri

O primă metodă de a implementa o coadă, fără folosirea vreunei instrucțiuni avansate este cea care folosește tablouri, ținând pozițiile în care se află primul și ultimul element din coadă. 

Aici se poate observa faptul că folosim un tablou de dimensiune fixă, iar atunci când adăugăm și scoatem valori din coadă, ajustăm valorile lui $L$ și $R$.

```cpp
#include <iostream>
using namespace std;

int main() {
    int n, q[1000001], L = 0, R = 0;
    cin >> n;
    
    while (n--) {
        char c[6];
        cin >> c;
        
        // afisam prima valoare a cozii
        if (c[0] == 'f') {
            cout << q[L] << '\n';
        }
        else {
            // adaugam o noua valoare si crestem R
            if (c[1] == 'u') {
                int val;
                cin >> val;
                q[R++] = val;
            }
            // scoatem o valoare si crestem L
            else {
                L++;
            }
        }
    }
    return 0;
}
```

### Coada circulară 

O îmbunătățire pe care o putem face la această implementare constă în a refolosi memoria dacă știm dimensiunea maximă pe care o poate avea coada la un moment dat. Astfel, în loc să stocăm cantitatea maximă de valori care intră in coadă, stocăm doar dimensiunea maximă a datelor, iar pentru a ajusta valorile lui $L$ și $R$, le vom ajusta circular, astfel limitând memoria folosită. 

```cpp
#include <iostream>
using namespace std;

int main() {
    int n, q[1001], L = 0, R = 0, maxi = 1001;
    cin >> n;
    
    while (n--) {
        char c[6];
        cin >> c;
        
        // afisam prima valoare a cozii
        if (c[0] == 'f') {
            cout << q[L] << '\n';
        }
        else {
            // adaugam o noua valoare si crestem R
            if (c[1] == 'u') {
                int val;
                cin >> val;
                q[R] = val;
                R++;
                if (R >= maxi) {
                    R -= maxi;
                }
            }
            // scoatem o valoare si crestem L
            else {
                L++;
                if (L >= maxi) {
                    L -= maxi;
                }
            }
        }
    }
    return 0;
}
```

### Coada implementată cu std::queue

Primele două implementări, deși utile și corecte, au un mare dezavantaj, practic la fel ca la orice structură de date statică, trebuie să estimăm câte valori vom avea. Astfel, se impune introducerea unei implementări dinamice, care să elimine acest dezavantaj, iar o metodă de a implementa coada folosind STL constă în folosirea containerului std::queue, acesta fiind specializat pentru operațiile descrise mai sus, păstrând toate avantajele cozii, adăugându-se faptul că memoria de care avem nevoie este doar cea pe care o folosim la un moment dat, fără spațiu suplimentar folosit. 

Pentru implementarea std::queue, vom avea nevoie de biblioteca queue, precum și cunoașterea funcțiilor specifice, push, pop și front. 

```cpp
#include <iostream>
#include <queue>

using namespace std;

int main() {
    int n;
    cin >> n;
    
    queue<int> q;
    
    while (n--) {
        char c[6];
        cin >> c;
        
        // afisam prima valoare a cozii
        if (c[0] == 'f') {
            cout << q.front() << '\n';
        }
        else {
            // adaugam o noua valoare si crestem R
            if (c[1] == 'u') {
                int val;
                cin >> val;
                q.push(val);
            }
            // scoatem o valoare si crestem L
            else {
                q.pop();
            }
        }
    }
    return 0;
}
```

## Aplicații ale cozii

Coada se regăsește ca o aplicație pentru tot ce înseamnă păstrarea datelor într-o ordine cronologică, fie că e vorba de evenimente, stări, poziții sau alte informații similare. Datorită versatilității sale, putem să o folosim în combinație cu stiva, problemele ce constau în implementarea cozii cu [stive](./stack.md) și invers sunt foarte cunoscute și deschid ușa către idei foarte importante, așa cum se poate observa și în problemele de pe Leetcode menționate mai jos. 

Dintre cei mai importanți algoritmi ce au la bază o coadă, vom menționa parcurgerea în lățime (BFS), împreună cu varianta ei pe matrice, algoritmul lui Lee și in general, Flood Fill. Pentru mai multe detalii, puteți explora [acest articol](./lee.md).

Nu în ultimul rând, coada este o structură de date ce apare în diverse probleme de simulare a unui proces sau în anumite tipuri de probleme ce folosesc tehnici de tipul Sliding Window, deque-ul fiind o structură de date specializată pe asemenea algoritmi, așa cum este prezentată și [aici](./deque.md).


## Probleme cu coadă

* [Coada1 pbinfo](https://www.pbinfo.ro/probleme/1598/coada1)
* [Implement Queue using Stacks - Leetcode](https://leetcode.com/problems/implement-queue-using-stacks/description/)
* [Implement Stack using Queues - Leetcode](https://leetcode.com/problems/implement-stack-using-queues/description/)

## Lectură suplimentară

* [Tipul coada - algopedia](https://www.algopedia.ro/wiki/index.php/Clasa_a_VII-a_lec%C8%9Bia_14_-_12_dec_2019#Tipul_coad%C4%83)
* [Coada - pbinfo](https://www.pbinfo.ro/articole/19579/coada)
* [Queue - wikipedia](https://en.wikipedia.org/wiki/Queue_(abstract_data_type))