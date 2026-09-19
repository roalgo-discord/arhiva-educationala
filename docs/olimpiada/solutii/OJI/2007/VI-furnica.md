---
id: OJI-2007-VI-furnica
title: Soluția problemei furnica (OJI 2007, clasa a VI-a)
problem_id: 763
authors: [dapopescu]
prerequisites:
    - simulating-solution
tags:
    - OJI
    - clasa VI
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2007/06/furnica.txt).

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
// credits: AntonioCC (kilonova)
#include <bits/stdc++.h>
using namespace std;

int main()
{
    ifstream fin("furnica.in");
    ofstream fout("furnica.out");

    int M[101][101], Ap[101][101] = {0}, n, k, nr, ap = 0;

    fin >> n >> k;

    for(int i = 1; i <= n; i++)
        for(int j = 1; j <= n; j++)
            M[i][j] = (i + j) % 6;

    int i = 1, j = 1, sum = M[1][1];
    Ap[i][j]++;
    for(int t = 0; t < k; t++){
        fin >> nr;
        switch(nr){
            case 1: i--; break;
            case 2: i--; j++; break;
            case 3: j++; break;
            case 4: i++; j++; break;
            case 5: i++; break;
            case 6: i++; j--; break;
            case 7: j--; break;
            case 8: i--; j--; break;
        }

        sum = sum + M[i][j];
        M[i][j] = 0;
        Ap[i][j]++;
    }

    fout << sum << " ";

    int maxim = 0;
    for(int i = 1; i < 101; i++)
        for(int j = 1; j < 101; j++)
            if(Ap[i][j] > maxim)
                maxim = Ap[i][j];

    int cnt = 0;
    for(int i = 1; i < 101; i++)
        for(int j = 1; j < 101; j++)
            if(Ap[i][j] == maxim)
                cnt++;

    fout << cnt;

    fin.close();
    fout.close();

    return 0;
}
```
