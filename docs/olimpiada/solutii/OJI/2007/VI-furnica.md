---
id: OJI-2007-VI-furnica
title: Soluția problemei furnica (OJI 2007, clasa a VI-a)
problem_id: 763
authors: []
# prerequisites:
#    - placeholder
tags:
    - OJI
    - clasa VI
---

Articolul va fi disponibil curând în arhivă.

Până atunci, puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2007/06/furnica.txt).

<div class="editorial-text" markdown>

```text
	Solutie - FURNICA

O modalitate de rezolvare care foloseste un singur tablou bidimensional
a cu elemtele a[i,j], i,j=1,2,...n este urmatoarea:

xc=1  {coordonatele initiale ale furnicii}
yc=1
s=0   {cantitatea totala de firimituri}

pentru i=1,...,k executa
  -daca a[xc,yc]>=0 atunci s:=s+a[xC,yC];a[xC,yC]:=-1 altfel a[xC,yC]:=a[xC,yC]-1
  -se citeste din fisierul de intrare numarul asociat mutarii, notat cu x
  -in functie de valoarea lui x se actualizeaza coordonatele xc si yc
sfarsit pentru
daca a[xc,yc]>=0 atunci s:=s+a[xC,yC];a[xC,yC]:=-1 altfel a[xC,yC]:=a[xC,yC]-1

determinam in variabila min, cea mai mica valoare din tablou {valorile negative din
tablou in modul reprezinta numarul de treceri a furnicii prin acel patratel}

nr=0
parcurgem tabloul a, componenta cu componenta si pentru a[i,j]=min avem nr=nr+1
afisam in fisierul furnica.out s si nr.


Observatie
Daca se doreste sa nu se utilizeze numere negative, atunci se mai declara un tablou
bidimensional in care se retine, de cate ori s-a trecut prin patratelul respectiv.
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
