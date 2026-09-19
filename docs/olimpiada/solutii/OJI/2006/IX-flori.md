---
id: OJI-2006-IX-flori
title: Soluția problemei flori (OJI 2006, clasa a IX-a)
problem_id: 747
authors: [bohm]
prerequisites:
    - simulating-solution
    - dsu
tags:
    - OJI
    - clasa IX
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2006/09/flori.txt).

<div class="editorial-text" markdown>

```text
flori - solutie

1. solutia 1 (program FLORI.CPP)
============
 - citesc n-numarul de fetite si k-numarul de flori dintr-un buchet
 - construiesc matricea a definita astfel : pe linia i sunt  tipurile distincte de flori ale fetitei cu
   numarul de ordine i
 -a[i][0]=numarul de elemente de pe linia i ; acesta va deveni 0 daca linia a fost reunita in alte linie
 - vectorul viz are n elemente si pe parcursul prelucrarii , fetitele care ajung in aceeasi grupa vor avea aceeasi valoare
   in vectorul viz : ex daca fetita 3 ajunge in grupa in care e fetita 1  =>  viz[3]=viz[1] ;
 - intial viz[i]=i insemnand ca fiecare fata e in grupa doar ea cu ea;
 - apelul irelj(i,j) verifica daca i e in relatie cu j : cauta pe linia i si j un tip de floare comun fetitelor i si j
 - functia reuneste face reuniunea multimilor de pe linia i si j in linia i; daca s-a facut o astfel de reuniune,
   scad i (i--) astfel se rezolva situatia in care de ex. i rel j, not ( i rel k) ,j rel k ;executand i-- k va ajunge
   tot in grupa cu i  ; altfel k  ar ajunge in alta grupa
 - afisarea grupelor presupune selectarea din vectorul viz a pozitiilor care au aceeasi valoare : toate pozitiile i care
   au viz[i]=1 (de ex) sunt in prima grupa;pun pe 0 pozitiile afisate pt a nu le mai relua o data.

2. solutia 2 (program FLORI.PAS)
============
 se foloseste notiunea de multime si proprietatile acestora:
 - vectorul F este un vector de multimi
 - F[i] este multimea tipurilor de flori pe care le-a cules fetita i; acest vector se construieste in timpul citirii
 - pentru constituirea grupelor de fetite se procedeaza astfel
    o vectorul G este un vector de multimi; in G[i] se retin toate numerele de ordine ale fetitelor care au flori comune
      cu fetita i, sau care au flori comune cu alte fetite care au flori comune cu fetita i
    o se trece pe la fiecare fetita i
    o daca aceasta are flori, ea este prima care face parte din grup, apoi
    o sunt verificate toate fetitele care urmeaza (j=i+1,n)
    o daca fetita j (j>i) are cel putin o floare comuna cu fetita i (intersectie de multimi), ea este pusa in grupa
      fetitei i, florile ei se pun in cosul fetitei i (reuniune de multimi), si cosul ei se goleste (initializare cu
      multimea vida); totodata se retine faptul ca s-au reunit doua multimi pentru a se repeta operatiile tot pentru
      fetita i, pana in momentul in care nu mai exista alta fetita cu cel putin o floare comuna cu fetitele deja puse
      in grupa fetitei i
 - in final se afiseaza grupele; datorita proprietatilor implementarii multimilor in PASCAl, ele sunt retinute in ordinea
   crescatoare a valorilor, deci nu mai este nevoie de sortare ci doar de parcurgerea valorilor posibile in ordine
   crescatoare si de testarea apartenentei elementului respectiv la multime (in caz afirmativ se afiseaza valoarea respectiva)
```

</div>

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.
```cpp
// credits: ema_nicole (kilonova)
#include <fstream>
#include <set>

using namespace std;

ifstream cin("flori.in");
ofstream cout("flori.out");

struct salvam /// unde salvam ap fiecarei fete
{
    set<int> s;
} v[152];
set<int> ap;    /// ce fete mai au nevoie sa intre in grupe
set<int> flori; /// ce flori sunt in grupa resp
set<int> fete;  /// ce fete sunt in grupa resp

int ok = 0, ver = 0, n;
void init(int nr) {
    ap.erase(nr);
    fete.insert(nr);
    for (auto var : v[nr].s)
        flori.insert(var);
}
void program() {
    for (int i = 1; i <= n; i++) {
        if (fete.find(i) == fete.end()) /// adica nu se afla inca in grupa
        {
            for (auto var : v[i].s) {
                if (flori.find(var) != flori.end()) {
                    ok = 2;
                    break;
                }
            }
            if (ok == 2) {
                for (auto var : v[i].s)
                    flori.insert(var);
                ap.erase(i);
                fete.insert(i);
                ver = 1;
                ok = 0;
            }
        }
    }
}
int main() {
    int m, a;
    cin >> n >> m;
    for (int i = 1; i <= n; i++) {
        ap.insert(i);
        for (int j = 1; j <= m; j++) {
            cin >> a;
            v[i].s.insert(a);
        }
    }
    /*for(int i = 1; i <= n; i++)
    {
        for(auto var : v[i].s)
            cout << var << " ";
        cout << '\n';
    }*/
    /// de fiecare data cand mai adaugam
    /// un elem intr-o grupa, mai parcurgem
    /// inca o data

    init(1);
    program();
    if (ap.size() == 0) {
        for (auto var : fete)
            cout << var << " ";
    }
    while (ap.size() != 0) {
        if (ver == 1) {
            ver = 0;
            program();
            if (ap.size() == 0) {
                for (auto var : fete)
                    cout << var << " ";
            }
        } else {
            int x;
            for (auto var : fete)
                cout << var << " ";
            cout << '\n';
            fete.clear();
            flori.clear();
            for (auto var : ap) {
                x = var;
                break;
            }
            init(x);
            program();

            if (ap.size() == 0) {
                for (auto var : fete)
                    cout << var << " ";
            }
        }
    }
    return 0;
}

```
