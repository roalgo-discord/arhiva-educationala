---
id: OJI-2014-V-martisoare
title: Soluția problemei martisoare (OJI 2014, clasa a V-a)
problem_id: 842
authors: [aintuneric]
prerequisites:
    - basic-math
    - simulating-solution
tags:
    - OJI
    - clasa V
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2014/05/martisoare.txt).

<div class="editorial-text" markdown>

```text
P1- martisoare
Solutie – complexitate O(N) - prof.Ana Intuneric

Solutia se bazeaza pe observatia ca este suficient sa determinam
primul numar modificat.

Sunt doua cazuri clare

a)primele doua numere sunt nemodificate, caz in care se calculeaza
imediat numarul maxim si se cauta primul numar modificat comparand
cifrele sale cu cifrele numarului care trebuia sa fie pe respectiva
pozitie in fisier

b)unul dintre primele doua numere sau amandoua sunt modificate. In
acest caz se citesc doar primele 4 numere si se trateaza combinatiile
posibile de numere modificate
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
