---
id: OJI-2020-V-cartonase
author:
    - Ștefan-Cosmin Dăscălescu
prerequisites:
    - loops
tags:
    - OJI
    - clasa V
---

# Soluția problemei cartonase (OJI 2020, clasa a V-a)

!!! note "Link problemă"
    Această problemă poate fi accesată [aici](https://kilonova.ro/problems/919/).

Se citesc numerele de pe cartonașe, reținând la un moment dat numerele de pe
două cartonașe alăturate (citite consecutiv), anume cartonașul precedent și cel
curent.

Pentru a rezolva cerința 1, folosim un contor pentru a verifica câte dintre
perechile de cartonașe se potrivesc (mai precis, dacă capătul dreapta precedent
este egal cu capătul stânga curent).

Pentru cerințele 2 și 3, vom proceda similar, singura diferență fiind faptul că
vom păstra numărul de perechi consecutive valide, precum și lungimea maximă
a unei asemenea secvențe.

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
--8<-- "olimpiada/V/2020-cartonase.cpp"
```