---
id: OJI-2008-X-piata
title: Soluția problemei Piața (OJI 2008, clasa a X-a)
problem_id: 781
authors: [dapopescu]
prerequisites:
    - ad-hoc
    - partial-sums
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2008/10/piata.txt).

<div class="editorial-text" markdown>

```text
Solutie - piata			prof. Doru Popescu Anastasiu

Se observa ca un element de pe linia i, coloana j este egal cu:

su(j-i+1), daca j>=i
su(n+j-i+1), daca j<i

unde:
su(k) este suma cifrelor lui k.


Daca nu ne dam seama de acest lucru va trebui sa utilizam un vector cu elementele de pe prima linie,
dupa care folosind elementele lui putem accesa fiecare componenta din tablou.

Nu trebuie sa construim tabloul pentru a calcula suma dorita.
O linie (incepand cu a doua) din tabloul ce se defineste in enunt
se poate construi in functie de precedenta.

Pentru a calcula suma ceruta, trebuie sa calculam suma de pe prima linie a
subtabloului (cu coltul stanga sus (iT,jT) si coltul din dreapta jos (iM,jM)), dupa
care suma de pe linia i (i>iT) din subtablou este egala cu
suma de pe linia i-1 din talou, din care scadem ultimul element al acestei linii
(de pe coloana jM, pentru ca nu mai face parte din linia i) si adunam elementul
de pe coloana jT, linia i (care este singur element de pe linia i ce nu se regaseste si
pe linia i-1 din subtablou)



{suma de pe linia iT}
s:=0;
for j:=jT to jM do
 if j>=iT then s:=s+su(j-iT+1)
          else s:=s+su(n+j-iT+1);
{sumele de pe liniile iT+1, iT+2, ..., iM}
s1:=s;{suma de pe linia anterioara}
for i:=iT+1 to iM do
 begin
  {elementul de pe linia i, coloana jM}
  if jM>=i-1 then e1:=su(jM-(i-1)+1) else e1:= su(n+jM-(i-1)+1);
  {elementul de pe linia i, coloana jT}
  if jT>=i then e2:=su(jT-i+1) else e2:= su(n+jT-i+1);
  s:=s+s1-e1+e2;
  s1:=s1-e1+e2;
 end;

se scrie in fisier s
```

</div>

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>

using namespace std;
const int NMAX = 40002;

ifstream cin("piata.in");
ofstream cout("piata.out");

int v[2 * NMAX], sp[2 * NMAX];
int sumcif(int x) {
    int sum = 0;
    while(x > 0) {
        sum += x % 10;
        x /= 10;
    }
    return sum;
}
int main()
{
    int n, i1, j1, i2, j2;
    cin >> n >> i1 >> j1 >> i2 >> j2;
    for(int i = 1; i <= n; i++) {
        int a = sumcif(i);
        v[i] = a;
        v[i + n] = a;
    }
    for(int i = 1; i <= 2 * n; i++)
        sp[i] = sp[i - 1] + v[i];

    int posj = n + 1 - i1 + j1, dif = j2 - j1 + 1, ans = 0;
    for(int i = i1; i <= i2; i++) {
        ans += (sp[posj + dif - 1] - sp[posj - 1]);
        posj--;
    }
    cout << ans;
    return 0;
}
```
