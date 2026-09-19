---
id: OJI-2009-VI-factori
title: Soluția problemei factori (OJI 2009, clasa a VI-a)
problem_id: 786
authors: [marinel]
prerequisites:
    - basic-math
tags:
    - OJI
    - clasa VI
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2009/06/factori.txt).

<div class="editorial-text" markdown>

```text
factori - solutie

1. In primul rand voi genera, utilizand CIURUL LUI ERATOSTENE, tabela numerelor prime<60000.

Procedure TabelPrime;                    {ciurul lui Eratostene}
Var i,j: LongInt;
    Radical: Real;
Begin
  For i := 1 To MAX Do Prime[i] := TRUE; {marcam toate ca fiind prime}
  Radical := Sqrt(MAX);                  {mergem pana la radical din MAX}
  i := 1;                                {plec de la inceputul vectorului}
  While i <= Radical Do                  {cat timp nu am terminat}
    Begin
      Repeat Inc(i) Until Prime[i];      {caut primul numar prim}
      j := i * i;                        {primul numar care nu mai este prim este patratul lui}
      While j <= MAX Do                  {apoi plecand de la el}
        Begin
          Prime[j] := FALSE;             {il marchez ca fiind neprim (este multiplu de i)}
          j := j + i                     {si merg din i in i si marchez}
        End;
    End;  {while i <= radical}
End;  {Tabel Prime}

2. Pentru fiecare numar<>0 citit voi calcula numarul de aparitii a numerelor prime in factorial
Begin
  i := 2;                                {plec de la 2}
  While NOT (Prime[i]) Do Inc(i);        {determin primul numar prim}
  Write(Fout, Descompune(N, i));         {determin de cate ori apare acesta in factorial}
  For i := i+1 To N Do                   {determin pe rand celelalte numere prime<=N}
    If Prime[i] Then Write(Fout, ' ', Descompune(N,i)); {afisez un spatiu apoi numarul de }
  Writeln(Fout);                                        {aparitii a acestuia in factorial}
End;

3. Pentru fiecare numar prim, calculul numarului de aparitii a acestuia in factorial se poate face,
eficient, astfel:

Function Descompune(N, d: LongInt): LongInt;
Var s: LongInt;
Begin
  s := 0;               {initializez contorul cu 0}
  While N>=d Do         {cat timp d mai poate sa apara}
    Begin
      s := s + N DIV d; {d apare de N DIV d ori, le numar}
      N := N DIV d      {elimin aceste aparitii}
    End;
  Descompune := s
End;

Desigur, determinarea numarului de aparitii a unui factor prim se poate face si elementar:

Function Descompune1(N, d: LongInt): LongInt;
Var s, i, NN: LongInt;
Begin
  s := 0;
  For i := d To N Do
    Begin
      NN := i;
      While NN MOD d=0 Do
        Begin
          Inc(s);
          NN := NN DIV d
        End;
    End;
  Descompune1 := s;
End;

dar in acest caz timpul de executie devine mare.
Daca determinarea factorilor primi se face cu un algoritm mai putin eficient, timpul creste de asemenea.
Multitudinea de abordari de implementare permite obtinerea de punctaje din toata plaja de valori.
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
    ifstream fin("factori.in");
    ofstream fout("factori.out");

    int n;

    fin >> n;

    while(n != 0){
        int V[60000] = {0}, d, dMax = 0;

        for(int i = 2; i <= n; i++){
            int aux = i, d = 2;
            while(aux > 1){
                int p = 0;
                while(aux % d == 0){
                    p++;
                    aux = aux / d;
                }
                V[d] = V[d] + p;
                d++;
                if(d > dMax)
                    dMax = d;
                if(aux > 1 && d * d > aux)
                    d = aux;
            }
        }

        for(int i = 0; i < dMax; i++)
            if(V[i] != 0)
                fout << V[i] << " ";
        fout << endl;

        fin >> n;
    }
    return 0;
}
```
