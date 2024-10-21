---
tags:
    - cifre
    - matematica
    - structura repetitiva
---

**Autor**: Ștefan-Cosmin Dăscălescu

## Cunoștinte necesare

Înaintea citirii acestui articol, se recomandă familiarizarea cu [structurile repetitive](https://edu.roalgo.ro/cppintro/loops/), deoarece le vom folosi pentru ilustrarea diverselor exemple ce țin de cifrele numerelor, în special când vine vorba de aplicațiile mai avansate.

## Numerele de cel mult trei cifre

Pentru a introduce conceptul, vom pleca de la cazurile cele mai simple, și anume numerele cu cel mult trei cifre. Ele apar în multe probleme, iar deși metodele pe care le vom explica aici le putem folosi și pentru numere cu mai multe cifre, nu este practic să le folosim deoarece putem folosi structurile repetitive într-un mod mai simplu și eficient. 

Dacă vrem să aflăm cifrele unui număr cu cel mult $3$ cifre, putem să ne folosim de diverse relații matematice pentru a le afla, începând de la ultima la prima. 

!!! info "Ultima cifră" 
    Definim **ultima cifră** a unui număr natural $x$ ca fiind cea mai nesemnificativă cifră a acestuia. De exemplu, dacă $x = 491$, ultima cifră a acestui număr este $1$.

Pentru a afla această cifră, ne vom folosi de proprietatea că aceasta este egală cu restul împărțirii numărului la $10$, ceea ce ne va da rezultatul dorit. 

Pentru a afla următoarele cifre, avem mai multe variante. Fie împărțim numărul la $10$ și aflăm de fiecare dată noua cifră a unităților la fel ca la pasul precedent, fie vom folosi o formulă modificată pe care o vom prezenta aici:

!!! info "A $k$-a cifră de la coadă" 
    Pentru a afla cea de-a $k$-a cifră de la coadă a unui număr natural $x$, vom folosi formula 
    $$
    \frac{x}{10^{k-1}} \% \ 10
    $$ sau cum am scrie în limbajul C/C++, `(x/p) % 10`.

!!! note "Observație"
     În formula anterioară, $p$ este egal cu $10^{k-1}$. Deși se poate folosi formula `pow(10, k-1)` din `#include <cmath>`, nu recomandăm folosirea acestei instrucțiuni din cauza erorilor de precizie ce apar în cazul numerelor mai mari. Recomandăm calcularea expresiei $10^x$ folosind o instrucțiune repetitivă de tip for.

Mai jos puteți vedea o secvență de cod în care prezentăm ambele metode, care funcționează pentru numerele de cel mult trei cifre. 

```cpp
#include <iostream>
using namespace std;

int main () {
    int n; // numar natural cel mult egal cu 999
    cin >> n;

    // cifrele luate una dupa alta, fara impartiri 

    int ultima = n%10;
    int penultima = (n/10)%10;
    int antepenultima = (n/100)%10;

    cout << antepenultima << " " << penultima << " " << ultima << '\n';

    // cifrele luate una dupa alta, cu impartiri 

    ultima = n%10; 
    n = n / 10;
    penultima = n%10;
    n = n / 10;
    antepenultima = n%10;
    n = n / 10;

    cout << antepenultima << " " << penultima << " " << ultima << '\n';
    return 0;
}
```

## Numerele de lungime oarecare

Acum că am învățat cum să aflăm cifrele unui număr, vom generaliza modul de aflare a cifrelor unui număr în general.

Deoarece nu putem depinde la nesfârșit de metodele de mai sus din lipsa de practicabilitate ale acestora, trebuie să ne gândim la o metodă ce folosește o structură repetitivă pentru a afla cifrele unui număr $n$. 

De obicei, deoarece nu știm câte cifre va avea $n$, vom folosi instrucțiunea `while` deoarece aceasta ne dă flexibilitatea să ne oprim atunci când numărul nostru nu mai are cifre. 

!!! note "Observație"
     În multe probleme, se poate întâmpla ca $n$ să fie egal cu $0$ încă de la început. În codurile cu `while`, vom pune de regulă un `if` adițional care se ocupă de acest caz particular. O alternativă este folosirea instrucțiunii `do-while`

Un cod tipic pentru aflarea cifrelor unui număr de la ultima la prima va arăta așa:

```cpp
#include <iostream>
using namespace std;

int main () {
    int n; 
    cin >> n;

    if (n == 0) {
        // caz particular daca n = 0
    }

    while (n > 0) {
        int c = n%10;
        n = n / 10;
    }
    return 0;
}
```

De regulă, operațiile ce țin de cifrele găsite se vor efectua în while, indiferent că e vorba de găsirea unor valori auxiliare, numărarea cifrelor care respectă o anumită proprietate sau calcularea unor sume, maxime etc. 

## Problema [Suma cifrelor unui număr](https://www.pbinfo.ro/probleme/10/suma-cifrelor): 

Pentru a afla suma cifrelor unui număr, vom folosi algoritmul prezentat anterior și vom aduna la răspuns valoarea cifrei curente.

```cpp
#include <iostream>
using namespace std;

int main () {
    int n; 
    cin >> n;

    int s = 0;
    while (n > 0) {
        s = s + n % 10;
        n = n / 10;
    }
    
    cout << s;
    return 0;
}
```

## Problema [Control](https://www.pbinfo.ro/probleme/340/control)

Cifra de control este un concept ce se regăsește frecvent în problemele de algoritmică românești, mai ales la problemele din examene sau problemele mai ușoare de olimpiadă. 

!!! info "Cifra de control" 
    Cifra de control a unui număr $x$ reprezintă valoarea pe care o obținem dacă atâta timp cât $x > 9$, adunăm cifrele din care este compus $x$, iar $x$ va deveni egal cu suma rezultată. Într-un final, numărul de o cifră obținut este cifra de control a lui $x$.

!!! example "Exemplu"
    De exemplu, să analizăm numărul $1954$.

    * $x = 1954$, suma cifrelor este $1 + 9 + 5 + 4 = 19$.
    * $x = 19$, suma cifrelor este $1 + 9 = 10$.
    * $x = 10$, suma cifrelor este $1 + 0 = 1$.
    * $x = 1$, numărul are o cifră, deci cifra de control este $1$.

În mod particular, se poate observa faptul că cifra de control este fix rezultatul operației $x\%9$, cu două particularități pe care trebuie să le avem în vedere:

* Dacă $x = 0$, cifra de control a lui $x$ este $0$
* Dacă $x\%9 = 0$, cifra de control a lui $x$ este $9$.

Mai jos puteți găsi implementări folosind atât formula simplificată, cât și simularea răspunsului.

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // cat timp n > 9, aflam suma cifrelor si modificam n
    while (n > 9) {
        int n2 = n;
        n = 0;
        while (n2) {
            n += n2%10;
            n2 /= 10;
        }
    }
    
    cout << n << '\n';
    return 0;
}
```

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    if (n == 0) {
        cout << 0 << '\n';
    }
    else {
        if (n % 9 == 0) {
            cout << 9 << '\n';
        }
        else {
            cout << n%9 << '\n';
        }
    }
    
    return 0;
}
```


## Problema [Oglinditul unui număr](https://www.pbinfo.ro/probleme/69/oglindit): 

!!! info "Oglinditul unui număr" 
    Oglinditul unui număr $n$ reprezintă numărul scris de la dreapta la stânga. De exemplu, dacă $x = 491301$, oglinditul lui $x$ este $103194$. Dacă numărul conține cifre de $0$ la sfârșitul numărului, acestea vor fi ignorate în oglindit. 

!!! info "Numere palindrom"
    Dacă $x$ și oglinditul lui $x$ sunt egali, atunci putem spune că $x$ este un număr palindrom. De exemplu, $33133$ și $49594$ sunt numere palindrom. Cu alte cuvinte, un număr palindrom este un număr care se scrie la fel de la stânga la dreapta și invers.

Pentru a afla oglinditul unui număr, vom folosi algoritmul prezentat anterior, împreună cu ținerea unei variabile care să ne țină numărul inversat.

```cpp
#include <iostream>
using namespace std;

int main () {
    int n; 
    cin >> n;

    int og = 0;
    while (n > 0) {
        og = og * 10 + n % 10;
        n = n / 10;
    }
    
    cout << og;
    return 0;
}
```

## Problema [Aparitii2](https://www.pbinfo.ro/probleme/108/aparitii2): 

Pentru a afla de câte ori apare prima cifră a numărului dat, mai întâi va trebui să aflăm care este prima cifră, iar mai apoi, vom parcurge numărul din nou pentru a număra aparițiile primei cifre. 

```cpp
#include <iostream>
using namespace std;

int main () {
    int n; 
    cin >> n;

    int n2 = n;
    while (n2 >= 10) {
        n2 /= 10;
    }

    int aparitii = 1; // prima cifra, evitam tratarea separata a cazului n = 0
    while (n >= 10) {
        if (n % 10 == n2) {
            aparitii++;
        }
        n = n / 10;
    }
    
    cout << aparitii;
    return 0;
}
```

## Probleme suplimentare

* [NumarulDeCifre pbinfo](https://www.pbinfo.ro/probleme/66/numaruldecifre)
* [UltimaCifraPara pbinfo](https://www.pbinfo.ro/probleme/77/ultimacifrapara)
* [ProdusCifreImpare pbinfo](https://www.pbinfo.ro/probleme/65/produscifreimpare)
* [prod_k pbinfo](https://www.pbinfo.ro/probleme/3078/prod-k)
* [aparitii pbinfo](https://www.pbinfo.ro/probleme/107/aparitii)
* [OMI Iasi 2020 codjoc](https://www.pbinfo.ro/probleme/3384/codjoc)
* [alternant1 pbinfo](https://www.pbinfo.ro/probleme/3926/alternant1)
* [Alte probleme cu aflarea cifrelor unui număr de pe pbinfo](https://www.pbinfo.ro/?pagina=probleme-lista&tag=5&start=0)
* [OJI 2019 aur](https://kilonova.ro/problems/906)

## Resurse suplimentare

* [Parcurgerea cifrelor unui număr - CPPI Sync](https://cppi.sync.ro/materia/parcurgerea_cifrelor_unui_numar.html)
* [Prelucrarea cifrelor unui numar - Algopedia](https://www.algopedia.ro/wiki/index.php/Clasa_a_IX-a_lec%C8%9Bia_6)
* [Cifrele unui număr - pbinfo](https://www.pbinfo.ro/articole/65/cifrele-unui-numar)
