---
tags:
    - meta
    - sfaturi
    - debugging
---

## Introducere

Atunci când scrieți programe pentru a rezolva diverse probleme de algoritmică, veți avea de-a face în mod inevitabil cu buguri (erori/greșeli) care vă fac soluția să fie greșită. În acest articol, vom prezenta cele mai importante lucruri pe care să le aveți în vedere atunci când scrieți soluții, precum și metode pe care să le folosiți când soluțiile sunt greșite. 

## Cele mai evidente erori de implementare

În cele mai multe cazuri, erorile apar din cauza unor greșeli ce pot fi evitate. Dintre cele mai frecvente motive pentru care apar bugurile, vom enumera următoarele:


### Overflowuri

!!! info "Definiție"
    Situația în care o variabilă care poate avea o valoare mai mare decât limitele tipului de date care îi este asignat se numește overflow. 

Un astfel de exemplu este atunci când o valoare poate fi egală cu $n^2$ iar $n \leq 10^5$. Deoarece operațiile efectuate cu două variabile cu același tip de date ne returnează o variabilă cu același tip de date, produsele sau ridicările la putere sunt vulnerabile la overflow-uri, precum și sumele ce implică mulți termeni mai mari. 

```cpp
int n = 100000;
cout << n * (n + 1) / 2 << '\n'; // overflow
cout << 1LL * n * (n + 1) / 2 << '\n'; // ok
```

### Condiții scrise prost

În cazul unor structuri alternative, folosirea proastă a unor operatori logici și de egalitate poate duce la schimbarea totală a rezultatelor. 

De exemplu, aici plasarea egalității din if-uri trebuie să fie corectă, altfel instrucțiunile defin total diferite. În mod similar, putem avea aceeași eroare când folosim operatori precum &&, ||, dacă folosim &, | etc.

```cpp
if (x == 3) { // se verifica daca x = 3
    // cod
}
if (x = 3) { // x devine 3, dupa se verifica daca este nenul

}
```

### Erori off by one

### Ieșirea din tablouri

De obicei, dacă avem o poziție care este accesată dar nu există în șir, atunci programul se va opri din rulat și veți avea un verdict de tipul runtime error (programul iese cu un verdict diferit de $0$). Dintre cele mai frecvente situații în care apar erori, putem menționa accesările pozițiilor negative sau pozițiilor prea mari. Mai jos găsiți exemple în care avem de-a face cu asemenea erori.


```cpp
for (int i = n; i >= 1; i++) { // i creste si vom iesi din vector
    cout << v[i] << " ";
}
```

```cpp
#include <iostream>
#include <vector>

using namespace std;

int main() {
    vector<int> arr = {1, 2, 3, 4, 5};
    int maxIndex = 100;

    for (int i = 0; i < maxIndex; ++i) {
        arr[i] = arr[i] * 2;
        cout << arr[i] << '\n';
    }

    return 0;
}
```

### Undefined behavior

!!! note "Undefined behavior"
    Atunci când accesăm memorie care nu există, dar programul nu se oprește din rulat, avem de-a face cu o situație ce se numește undefined behavior. 


```cpp
#include <iostream>
using namespace std;

int main() {

    int arr[8] = {1, 2, 3, 4, 5};

    cout << arr[5] << '\n';
    cout << arr[-1] << '\n'; // undefined behavior, vom avea erori la rulare

    return 0;
}
```

## Cum eviți erorile?

## Lucruri pe care să le verifici mereu?

## Moduri de a rula algoritmul

## Stress testing

```cpp
#include <bits/stdc++.h>
using namespace std;

mt19937_64 rnd; // 64-bit 
long long val (bool positive) {
    long long ans = rnd();
    if (positive) {
        return abs(ans);
    }
    else {
        return ans;
    }
}

/*
    Aici adaugam variabilele pe care le vom folosi, trebuie sa fim atenti pentru ca uneori avem nevoie de copii pentru valorile noastre
    
*/

// Aici generam datele de intrare, de regula se recomanda un input mic pentru rezultate optime
void gentest() {
    
}

// Aici adaugam o solutie corecta, foarte inceata, care va fi folosita pentru a evalua solutia eficienta
int bruteforce() {
    
}

// Aici adaugam solutia eficienta, care desi este rapida, este incorecta si vrem s-o reparam
int efficient() {
    
}

//  Daca raspunsurile sunt diferite, vom afisa inputul aici
void printinput() {
    
}

int main()
{   
    // alegem seedul aleator pentru a avea rezultate diferite mereu
    int seed = std::random_device{}();
    rnd.seed(seed);
    
    int t = 0;
    while (t <= 10000) {
        gentest();
        int brute = bruteforce();
        int eff = efficient();
        if (brute != eff) {
            cout << "Brute: " << brute << '\n';
            cout << "Efficient: " << eff << '\n';
            printinput();
            return 0;
        }
    }
    return 0;
}
```

## Concluzii

Debugging-ul este una dintre cele mai importante tehnici pentru orice programator, iar indiferent de metoda folosită, repararea soluțiilor greșite este un pas esențial pentru a progresa indiferent că e vorba de a fi un competior mai bun sau a putea opera mai eficient în ceea ce privește proiecte mai complexe.

## Resurse suplimentare

* [Compilation and Debugging Tutorial - Codeforces](https://codeforces.com/blog/entry/79024)
* [How to Debug - USACO Guide](https://usaco.guide/general/debugging-checklist?lang=cpp)
* [Basic Debugging - USACO Guide](https://usaco.guide/general/basic-debugging?lang=cpp)