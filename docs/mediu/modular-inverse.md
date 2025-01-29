---
tags:
    - matematica
    - combinatorica
---

**Autor**: Andrei Iuoraș

!!! example "Cunoștințe necesare"
    - [Subprograme](https://edu.roalgo.ro/cppintro/functions/)
    - [Aritmetică modulară. Ridicare la putere în timp logaritmic](https://edu.roalgo.ro/mediu/pow-log/)

## Problema

În cadrul multor probleme de informatică se cere calcularea unei valori și
afișarea acesteia modulo unei constante precizate în enunț. Se poate observa
faptul că operațiile de adunare, scădere și înmulțire se pot efectua fără
probleme cu respect la un anumit modul, însă operația de împărțire trebuie
tratată diferit. Mai exact, dacă $A$, $B$ si $M$ sunt numere întregi, $M \ne 0$,
$B \ne 0$, egalitatea $\frac{A}{B} \mod{M} = \frac{A \mod{M}}{B \mod{M}}
\mod{M}$ nu este întotdeauna adevărată.

Se recomandă citirea informațiilor din articolul despre [matematică de
bază](https://edu.roalgo.ro/cppintro/basic-math/) înainte de a citi noțiunile de
aici.

## Ce este inversul modular?

În matematică, inversul unui număr real $x$ este acel număr $x^{-1}$ care
satisface $x \cdot x^{-1} = 1$. Împărțirea unui număr la $x$ este echivalentă cu
înmulțirea acestuia cu $x^{-1} = \frac{1}{x}$. Tot așa, și în aritmetica
modulară definim **inversul modular** al unui număr $x$ (cu respect la modulul
$M$) acel număr notat $x^{-1}$ care satisface relația $x \cdot x^{-1} \equiv{1}
\pmod{M}$. Se poate demonstra faptul că un număr întreg are un invers modular
modulo $M$ dacă și numai dacă el și $M$ sunt prime între ele.

Atunci, pentru a efectua operația de împărțire cu respect la modul dintre $A$ și
$B$ trebuie să îl înmulțim pe $A$ cu inversul modular al lui $B$, deoarece
$(\frac{A}{B}) \mod{M} = (A \cdot B^{-1}) \mod{M}$.

## Cum calculăm inversul modular al unui număr?

### Calcularea folosind mica teoremă a lui Fermat

!!! note "Mica teoremă a lui Fermat"

    Dacă $p$ este un număr prim și $a$ este un număr întreg prim cu $p$, atunci
    $a^{p-1} \equiv 1 \pmod{p}$.

Congruența se mai poate scrie ca:

$$ a \cdot a^{p - 2} \equiv 1 \pmod{p} $$

Se poate observa ușor că de fapt inversul modular al lui $a$ este $a^{p - 2}$,
care poate fi calculat rapid folosind exponențierea logaritmică.

### Algoritmul extins al lui Euclid

Luăm în considerare următoarea identitate:

!!! note "Identitatea lui Bézout"

    Fie numerele întregi $A$, $B$ și $d = cmmdc(A, B)$. Atunci, există cel puțin
    o pereche de numere întregi $x$ și $y$ astfel încat $Ax + By = d$.

Daca $A$ și $M$ sunt prime între ele, atunci există $x_1$ și $y_1$ astfel încât
$Ax_1 + My_1 = 1$. De aici reiese faptul că $Ax_1 \equiv 1 \pmod{M}$, adică
$x_1$ este inversul modular al lui $A$.

Fie $c$ câtul împărțirii lui $A$ la $M$ și $r$ restul. Algoritmul lui Euclid ne
spune că $cmmdc(A, M) = cmmdc(M, r) \implies cmmdc(M, r) = 1$. Astfel, există
$x_2$ și $y_2$ care satisfac $Mx_2 + ry_2 = 1$.

Dar

$$ \begin{align*} r = A - M \cdot c &\implies Mx_2 + (A - M \cdot c)y_2 = 1\\
&\iff Mx_2 + Ay_2 - M \cdot c \cdot y_2 = 1\\ &\iff Ay_2 + M(x_2 - c \cdot y_2)
= 1 \end{align*} $$

Se observa că $x_1 = y_2$ și $y_1 = x_2 - c \cdot y_2$, iar $c = \lfloor
\frac{A}{M} \rfloor$. Astfel, putem folosi recursiv algoritmul lui Euclid,
adăugându-i parametrii $x_1$ și $y_1$:

```cpp
void euclidExtins(const int a, const int b, int& x1, int& y1);
```

În cazul în care parametrul $b$ din funcție este egal cu $0$, atunci $a$ va fi
egal cu $1$ și astfel vom seta $x_1 = 1$, iar $y_1$ poate lua orice valoare, de
exemplu tot $1$.

!!! warning "Atenție"

    Valoarea lui $x_1$ poate fi și negativă. Dacă este necesară o valoare
    pozitivă atunci facem operația $x_1 = x_1 + M$.

Mai jos se poate observa o implementare în C++ a algoritmului lui Euclid,
respectiv a funcției de calculare a inversului modular al lui $A$ pentru modulul
$M$:

```cpp
void euclidExtins(const int a, const int b, int& x1, int& y1) {
    if (b == 0) {
        x1 = 1;
        y1 = 1;
        return;
    }

    int x2, y2;

    euclidExtins(b, a % b, x2, y2);

    x1 = y2;
    y1 = (x2 - a / b * y2) % M;
}

int inversModular(const int A) {
    int x1, y1;

    euclidExtins(A, M, x1, y1);

    /* daca vrem x1 pozitiv
    if(x1 < 0)
        x1 += M;
    */

    return x1;
}
```

## Probleme cu invers modular

- [Invers Modular](https://www.infoarena.ro/problema/inversmodular)
- [Lot 2021 Juniori Prosum](https://kilonova.ro/problems/1697)
- [Codeforces Beautiful Numbers](http://codeforces.com/problemset/problem/300/C)
- [Toate aplicatiile prezentate la combinatorica](./intro-combinatorics.md)
- [Codeforces Sum of the kth
  powers](https://codeforces.com/contest/622/problem/F)

## Lectură suplimentară

- [Algoritmul lui Euclid extins. Invers modular -
  Pbinfo](https://www.pbinfo.ro/articole/18942/algoritmul-lui-euclid-extins-invers-modular)
- [Modular arithmetic - USACO Guide](https://usaco.guide/gold/modular?lang=cpp)
- [Modular multiplicative
  inverse](https://cp-algorithms.com/algebra/module-inverse.html)
- [Calculate modulo inverses
  efficiently](https://codeforces.com/blog/entry/83075)
- [Modular arithmetic for Beginners -
  Codeforces](https://codeforces.com/blog/entry/72527)
- [Funcție scurtă de a calcula inversul modular -
  Codeforces](https://codeforces.com/blog/entry/23365)
- [Modular Inverse / Inverse Remainder / Modular Division – A Quick Guide -
  Codeforeces](https://codeforces.com/blog/entry/113756)
