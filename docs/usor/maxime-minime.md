---
tags:
    - structura repetitiva
    - maxim
    - minim
    - vector
---

**Autor**: Ștefan-Cosmin Dăscălescu

!!! example "Cunoștințe necesare"
    * [Structura repetitivă](https://edu.roalgo.ro/cppintro/loops/)

## Introducere

În multe probleme, suntem nevoiți să aflăm valoarea maximă sau minimă dintre două sau mai multe numere, iar fie că e vorba de două, trei sau un număr oarecare de valori, algoritmul folosit, precum și tehnicile auxiliare sunt foarte importante de știut. 

Vom prezenta cazurile cele mai simple, urmate de implementări mai generalizate și în final, diverse probleme clasice care implică maxime și minime. 

!!! note "Detalii de implementare"
    În general, pentru a afla valoarea minimă în loc de cea maximă, vom vrea să schimbăm semnul ($<$ în loc de $>$). Acest lucru va fi adevărat și în cazul în care permitem egalități, care fac implementările mai ușoare.

## Maximul și minimul dintre două numere

Pentru a afla valoarea mai mare dintre două numere date, este îndeajuns să folosim un if pentru a decide care dintre valorile date este mai mare. În mod similar, procedăm și pentru valoarea minimă.

```cpp
#include <iostream>
using namespace std;

int main() {
    
    int a, b;
    cin >> a >> b;
    
    // maxim
    if (a >= b) { // a este mai mare sau egal ca b
        cout << a << '\n';
    }
    else { // b este mai mare sau egal ca a
        cout << b << '\n';
    }

    // minim
    if (a <= b) { // a este mai mic sau egal ca b
        cout << a << '\n';
    }
    else { // b este mai mic sau egal ca a
        cout << b << '\n';
    }
    return 0;
}
```

## Maximul și minimul dintre trei numere

Pentru a afla cea mai mare valoare dintre trei numere, avem două variante de a rezolva această problemă. 

O primă variantă constă în a verifica pentru fiecare dintre cele trei numere dacă este mai mare sau egal (pentru minim, mai mic sau egal) cu celelalte două numere.

Cea de-a doua variantă constă în aflarea maximului sau minimului dintre primele două numere, iar mai apoi verificarea cu cel de-al treilea număr. 

Mai jos implementăm ambele variante.

=== "Varianta 1"

    ```cpp
    #include <iostream>
    using namespace std;

    int main() {
        
        int a, b, c;
        cin >> a >> b >> c;
        
        // maxim 

        if (a >= b && a >= c) { // a este mai mare sau egal ca b si c
            cout << a << '\n';
        }
        else {
            if (b >= a && b >= c) { // b este mai mare sau egal ca a si c
                cout << b << '\n';
            }
            else { // c este mai mare sau egal ca a si b
                cout << c << '\n';
            }
        }

        // minim 
        
        if (a <= b && a <= c) { // a este mai mic sau egal ca b si c
            cout << a << '\n';
        }
        else {
            if (b <= a && b <= c) { // b este mai mic sau egal ca a si c
                cout << b << '\n';
            }
            else { // c este mai mic sau egal ca a si b
                cout << c << '\n';
            }
        }
        return 0;
    }
    ```

=== "Varianta 2"

    ```cpp
    #include <iostream>
    using namespace std;

    int main() {
        
        int a, b, c;
        cin >> a >> b >> c;
        
        int maxim = a;
        if (b >= maxim) {
            maxim = b;
        }
        if (c >= maxim) {
            maxim = c;
        }
        
        cout << maxim << '\n';

        int minim = a;
        if (b <= minim) {
            minim = b;
        }
        if (c <= minim) {
            minim = c;
        }
        
        cout << minim << '\n';
        return 0;
    }
    ```

Deși ambele variante sunt corecte, se poate observa că varianta $2$ este mai simplă și mai ușor de utilizat în practică, aceasta fiind și varianta pe care o vom folosi atunci când vrem să generalizăm aflarea maximului sau minimului unui șir de valori.

## Maximul și minimul dintre $n$ numere

Pentru a afla valoarea maximă (sau minimă) a unui șir de $n$ numere, vom putea pleca de la cazul de bază cu $2$ numere, iar pentru fiecare număr nou adăugat, vom verifica dacă valoarea nou adaugată este mai mare decât maximul de până acum (sau mai mică decât minimul, după caz).

Pentru a afla acest răspuns, putem fie să plecăm cu răspunsul egal cu prima valoare din șir, fie să inițializăm răspunsul cu o valoare care să ne asigure că indiferent ce valori avem, răspunsul va fi una din valorile din șir. 

Astfel, dacă vrem să aflăm valoarea maximă din șir, vrem să inițializăm maximul cu o valoare foarte mică ($-10^9$ sau chiar mai mică), iar în caz contrar, cu o valoare foarte mare ($10^9$ sau chiar mai mare). În general, se preferă varianta în care inițializăm răspunsul cu o valoare suficient de mare/mică pentru scopurile noastre, soluție implementată mai jos pentru maxim. 

```cpp
#include <iostream>
using namespace std;

int main() {
    
    int n;
    cin >> n;
    
    int maxim = -1000000000;
    for (int i = 1; i <= n; i++) {
        int x;
        cin >> x;
        
        if (x > maxim) {
            maxim = x;
        }
    }
    
    cout << maxim << '\n';
    return 0;
}
```

## Aflarea celor mai mari/mici două valori 

Pentru aflarea celor mai mari/mici două valori, vom putea proceda similar ca la algoritmul precedent, singura diferență fiind faptul că efortul de implementare va crește deoarece pentru fiecare valoare nou adăugată, există două cazuri:

* Fie este cea mai mare/mică valoare, iar atunci, cel de-al doilea maxim/minim devine maximul/minimul precedent, iar noua valoare este cea maximă/minimă.
* Fie nu este maxim/minim, dar este mai mare/mică decât cel de-al doilea maxim/minim, iar atunci, schimbăm valoarea celui de-al doilea maxim/minim.

Mai jos, veți găsi o implementare care află cele mai mici două valori dintr-un șir.

```cpp
#include <iostream>
using namespace std;

int main() {
    
    int n;
    cin >> n;
    
    int minim = 1000000000;
    int minim2 = 1000000000;
    for (int i = 1; i <= n; i++) {
        int x;
        cin >> x;
        
        if (x < minim) {
            minim2 = minim;
            minim = x;
        }
        else {
            if (x < minim2) {
                minim2 = x;
            }
        }
    }
    
    cout << minim << " " << minim2 << '\n';
    return 0;
}
```

## Aflarea celor mai mari/mici $k$ valori 

Pentru a extinde problema la $k$ valori, va fi necesară cunoașterea [vectorilor](https://edu.roalgo.ro/cppintro/arrays/), ceea ce face această aplicație mai dificilă. Astfel, vom proceda la fel ca la cazul precedent, dar vom ține cele mai mari/mici $k$ valori într-un vector și vom performa modificările în mod corespunzător. 

Mai jos, veți găsi o implementare care află cele mai mici $k$ valori dintr-un șir.

```cpp
#include <iostream>
using namespace std;

int main() {
    
    int n, k;
    cin >> n >> k;
    
    int mini[k+1];
    for (int i = 1; i <= k; i++) {
        mini[i] = 1000000000;
    }

    for (int i = 1; i <= n; i++) {
        int x;
        cin >> x;

        for (int j = 1; j <= k; j++) {
            if (x <= mini[j]) { // daca x este mai mic decat al j-lea minim
                for (int poz = k; poz > j; poz--) { // mutam minimele la dreapta
                    mini[poz] = mini[poz-1];
                }
                mini[j] = x; // schimbam al j-lea minim
                break;
            }
        }
    }
    
    for (int i = 1; i <= k; i++) {
        cout << mini[i] << " ";
    }
    return 0;
}
```

## Concluzii

Cunoașterea tipurilor de implementări care se folosesc de conceptul de maxim și minim este esențială pentru orice programator începător și nu numai, aceste tehnici fiind întâlnite și drept subprobleme pentru aplicații mai avansate.

## Probleme suplimentare

* [summaxmin pbinfo](https://www.pbinfo.ro/probleme/347/summaxmin)
* [maxandap pbinfo](https://www.pbinfo.ro/probleme/346/maxandap)
* [rafaelo pbinfo](https://www.pbinfo.ro/probleme/561/rafaelo)
* [existaprime pbinfo](https://www.pbinfo.ro/probleme/506/existaprime)
* [memory002 pbinfo](https://www.pbinfo.ro/probleme/1446/memory002)
* [Probleme cu maxime si minime de pe pbinfo](https://www.pbinfo.ro/probleme/categorii/4/algoritmi-elementari-maxime-si-minime)

## Resurse suplimentare

* [Maxime si minime - pbinfo](https://www.pbinfo.ro/articole/76/maxime-si-minime)
* [Maxime si minime - CPPI Sync](https://cppi.sync.ro/materia/citirea_mai_multor_numere_operarea_cu_cel_curent_i_cu_cel_anterior_maxime_minime_verificari_secvente_etc.html)