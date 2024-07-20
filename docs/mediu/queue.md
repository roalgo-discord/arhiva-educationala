---
title: Invers Modular
tags:
    - matematica
    - combinatorica
---

**Autor**: Iuoraș Andrei

## Problema

În cadrul multor probleme de informatică se cere calcularea unor valori și afișarea acesteia modulo unei constante precizate în enunț. Se poate observa faptul că operațiile de adunare, scădere și înmulțire se pot efectua fără probleme cu respect la un anumit modul, însă operația de împărțire trebuie tratată diferit. Mai exact, dacă $A$, $B$ si $M$ sunt numere întregi, $M \ne 0$, $B \ne 0$, egalitatea $\frac{A}{B} \mod{M} = \frac{A \mod{M}}{B \mod{M}} \mod{M}$ nu este întotdeauna adevărată.

## Ce este inversul modular?

In matematică, inversul unui număr real $x$ este acel număr $x^{-1}$ care satisface $x \cdot x^{-1} = 1$. Împărțirea unui număr la $x$ este echivalentă cu înmulțirea acestuia cu $x^{-1} = \frac{1}{x}$. Tot așa, și în aritmetica modulară definim **inversul modular** al unui număr $x$ (cu respect la modulul $M$) acel număr notat $x^{-1}$ care satisface relația $x \cdot x^{-1} \equiv{1} \pmod{M}$. Se poate demonstra faptul că un număr întreg are un invers modular modulo $M$ dacă și numai dacă el și $M$ sunt prime între ele.

Atunci, pentru a efectua operația de împărțire cu respect la modul dintre $A$ și $B$ trebuie să îl înmulțim pe $A$ cu inversul modular al lui $B$, deoarece $(\frac{A}{B}) \mod{M} = (A \cdot B^{-1}) \mod{M}$.

## Cum calculam inversul modular al unui număr?

### Algoritmul extins al lui Euclid

Luăm în considerare următoarea identitate:

!!! note "Identitatea lui Bézout"

    Fie numerele întregi $A$, $B$ și $d = cmmdc(A, B)$. Atunci, există cel puțin o pereche de numere întregi $x$ și $y$ astfel încat $Ax + By = d$.

Daca $A$ și $M$ sunt prime între ele, atunci există $x_1$ și $y_1$ astfel încât $Ax_1 + My_1 = 1$. De aici reiese faptul că $Ax_1 \equiv 1 \pmod{M}$, adică $x_1$ este inversul modular al lui $A$.

Fie $c$ câtul împărțirii lui $A$ la $M$ și $r$ restul. Algoritmul lui Euclid ne spune că $cmmdc(A, M) = cmmdc(M, r) \implies cmmdc(M, r) = 1$. Astfel, există $x_2$ și $y_2$ care satisfac $Mx_2 + ry_2 = 1$.

Dar
$$
r = A - M \cdot c \implies Mx_2 + (A - M \cdot c)y_2 = 1 \iff Mx_2 + Ay_2 - M \cdot c \cdot y_2 = 1 \iff Ay_2 + M(x_2 - c \cdot y_2) = 1
$$
Se observa că $x_1 = y_2$ și $y_1 = x_2 - c \cdot y_2$, iar $c = \lfloor \frac{A}{M} \rfloor$. Astfel, putem folosi recursiv algoritmul lui Euclid, adăugându-i parametrii $x_1$ si $y_1$:

```cpp
void euclidExtins(int a, int b, int& x1, int& y1)
```

În cazul în care parametrul $b$ din funcție este egal cu $0$, atunci $a$ va fi egal cu $1$ și astfel vom seta $x_1 = 1$, iar $y_1$ poate lua orice valoare, de exemplu tot $1$.

!!! warning "Atenție"
    Valoarea lui $x_1$ poate fi și negativă. Dacă este necesară o valoare pozitivă atunci facem operația $x_1 = x_1 + M$.

Mai jos se poate găsi o implementare în C++ a algoritmului lui Euclid, respectiv a funcției de calculare a inversului modular al lui $A$ pentru modulul $M$:

```cpp
void euclidExtins(int a, int b, int& x1, int& y1) {
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

int inversModular(int A) {
    int x1, y1;

    euclidExtins(A, M, x1, y1);

    /* daca vrem x1 pozitiv
    if(x1 < 0)
        x1 += M;
    */

    return x1;
}
```

### Calcularea folosind mica teorema a lui Fermat

!!! note "Mica teoremă a lui Fermat"

    Dacă $p$ este un număr prim și $a$ este un număr întreg prim cu $p$, atunci $a^{p-1} \equiv 1 \pmod{p}$

Congruența se mai poate scrie ca:
$$
a \cdot a^{p - 2} \equiv 1 \pmod{p}
$$
Se poate observa ușor că defapt inversul modular al lui $a$ este $a^{p - 2}$, care poate fi calculat rapid folosind exponențierea logaritmică.

## Probleme cu invers modular

* [Invers Modular](https://www.infoarena.ro/problema/inversmodular)
* [Prosum](https://kilonova.ro/problems/1697)

## Lectură suplimentară

* [Algoritmul lui Euclid extins. Invers modular - Pbinfo](https://www.pbinfo.ro/articole/18942/algoritmul-lui-euclid-extins-invers-modular)
* [Modular arithmetic - USACO Guide](https://usaco.guide/gold/modular?lang=cpp)
* [Modular multiplicative inverse](https://cp-algorithms.com/algebra/module-inverse.html)
* [Calculate modulo inverses efficiently](https://codeforces.com/blog/entry/83075)
* [Funcție scurtă de a calcula inversul modular](https://codeforces.com/blog/entry/23365)