---
id: OJI-2007-IX-paritate
title: Soluția problemei paritate (OJI 2007, clasa a IX-a)
problem_id: 758
authors: []
# prerequisites:
#    - placeholder
tags:
    - OJI
    - clasa IX
---

Articolul va fi disponibil curând în arhivă.

Până atunci, puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2007/09/paritate.txt).

<div class="editorial-text" markdown>

```text
Solutie PARITATE

Se utilizeaza un tablou de caractere care va contine:
  - caracterul corect transmis sau
  - caracterul #0 in cazul in care transmisia nu s-a efectual corect
In acelasi timp variabila Eroare va contine ultima pozitie a unui cod eronat
sau 0 daca nu sunt erori la transmiterea mesajului.

Deoarece suntem asigurati de faptul ca numarul de biti 0/1 transmisi este
multiplu de 8, nu mai fac aceasta verificare si tratez fiecare grupa de 8
biti astfel:
  - citesc primul caracter separat (este bitul de paritate)
  - il transform in cifra 0/1
  - citesc pe rand ceilalti 7 biti si formez codul ASCII corect numarand
    in acelasi timp bitii egali cu 1
  - daca bitul de paritate este corect (adica am un numar par de cifre 1)
    pun pe pozitia corespunzatoare din tablou caracterul al carui cod il am
  - in caz contrar pun pe pozitia respectiva valoarea #0 si retin in
    variabila Eroare pozitia caracterului eronat

Dupa terminarea acestui proces nu am decat sa verific variabila Eroare:
  - in cazul in care are valoarea 0 (transmisie fara eroare), afisez 'DA' in
    prima linie a fisierului de iesire, apoi parcurg vectorul caracter cu
    caracter si il scriu in fisierul de iesire, avand grija ca in cazul
    intalnirii caracterului #10 (cod de linie noua) sa trec la o noua linie
  - in cazul in care are o valoare >0 (transmisie cu erori) afisez 'NU' in
    prima linie a fisierului de iesire, apoi parcurg vectorul caracter cu
    caracter si, in cazul intalnirii valorii #0 (caracter eronat) afisez
    indicele respectiv
```

</div>

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;

    cout << a + b << '\n';
    return 0;
}
```
