---
id: OJI-2024-VI-perechi
title: Soluția problemei Perechi (OJI 2024, clasa a VI-a)
problem_id: 2515
authors: [boca]
prerequisites:
    - digits-manipulation
    - frequency-arrays
tags:
    - OJI
    - clasa VI
---

Cerința 1: Pentru 27 de puncte, se citesc numerele din fișierul de intrare
într-un vector, se parcurg elementele vectorului, iar pentru fiecare element
aflat pe poziția $i$, cu $1 \leq i \leq n - 1$, se verifică toate elementele
aflate pe pozițiile $j$, cu $i + 1 \leq j \leq n$, numărându-se toate elementele
care sunt egale cu oglinditul lui $a_i$ și formează o pereche oglindită cu
$a_i$. Complexitatea algoritmului este: $\mathcal{O}(n^2)$.

Pentru 50 de puncte, se construiește un vector de frecvență pe baza numerelor
citite. Se parcurge vectorul de frecvență și, pentru fiecare valoare $x$ care
există în acesta, se calculează oglinditul lui $x$ în variabila $y$. Dacă $y$
există în vectorul de frecvență, este strict mai mare decât $x$ și formează o
pereche oglindită cu $x$, atunci se va aduna la numărul de perechi produsul
dintre frecvența lui $x$ și frecvența lui $y$. Din moment ce $n$ poate fi
$100\,000$, rezultatul poate depăși valoarea maximă reprezentabilă pe tipul de
date `int`. Complexitatea algoritmului este: $\mathcal{O}(n + \text{max})$, unde
$\text{max}$ este numărul maxim din șir.

Cerința 2: Pentru 27 de puncte, se citesc numerele din fișierul de intrare
într-un vector. Se parcurg elementele vectorului, iar fiecare element aflat pe
poziția $i$, cu $1 \leq i \leq n - 1$, se compune cu toate elementele aflate pe
pozițiile $j$, cu $i + 1 \leq j \leq n$, verificându-se dacă cele două valori
rezultate din compunere sunt numere palindrom. Pe parcurs, se reține valoarea
maximă obținută. Complexitatea algoritmului este: $\mathcal{O}(n^2)$.

Pentru 50 de puncte, se construiește un vector de frecvență pe baza numerelor
citite. Se parcurge vectorul de frecvență și, pentru fiecare valoare $x$ care
există în acesta, se calculează oglinditul lui $x$ în variabila $y$.

-   Dacă $y$ există în vectorul de frecvență și este diferit de $x$, atunci se
    compun cele două numere, rezultând două numere palindrom.
-   Din numărul $y$ se elimină pe rând câte o cifră. Se verifică dacă numărul
    rezultat există în vectorul de frecvență și, în caz afirmativ, se alipește la
    începutul numărului $x$ inițial.
-   Din numărul $x$ se elimină pe rând câte o cifră. Se verifică dacă numărul
    rezultat există în vectorul de frecvență și, în caz afirmativ, se alipește la
    începutul numărului $y$ inițial.

Pe parcurs, dintre toate numerele palindrom obținute în acest proces, se reține
maximul. Complexitatea algoritmului este: $\mathcal{O}(n + \text{max})$, unde
$\text{max}$ este numărul maxim din șir.

Mai jos puteți găsi o soluție care ia punctajul maxim.

```cpp
#include <iostream>
#include <fstream>
using namespace std;

int c, n, rev[10002], v[100002], fr[10002], cif[12];

int og(int x) {
    int ans = 0;
    while (x > 0) {
        ans = ans * 10 + x%10;
        x /= 10;
    }
    return ans;
}

int merge (int a, int b) {
    int p10 = 10;
    while (p10 <= b) {
        p10 *= 10;
    }
    return a * p10 + b;
}

int main() {
    ifstream cin("perechi.in");
    ofstream cout("perechi.out");

    cin >> c;
    cin >> n;

    for (int i = 1; i <= n; i++) {
        cin >> v[i], fr[v[i]]++;
    }

    for (int i = 1; i <= 10000; i++) {
        rev[i] = og(i);
    }

    if (c == 1) {
        long long ans = 0;
        for (int i = 1; i <= 10000; i++) {
            if (rev[i] > i) {
                ans = ans + 1LL * fr[i] * fr[rev[i]];
            }
        }
        cout << ans << '\n';
    }
    if (c == 2) {
        int ans = 0;
        for (int st = 1; st <= 9999; st++) // numarul din stanga
            for (int mid = -1; mid <= 9; mid++) { // eventual, cifra din mijloc
                int val = st;
                if (mid != -1) {
                    val = val * 10 + mid;
                }
                int cop = st;
                int cnt = 0;
                while (cop) { // numarul din dreapta
                    cif[cnt++] = cop%10;
                    cop /= 10;
                }
                for (int i = 0; i < cnt; i++) {
                    val = val * 10 + cif[i];
                }
                int tog = 0;
                int tval = val;
                int p10 = 1;
                while (val) { // trecem prin cifre sa vedem daca cele doua jumatati exista
                    tog = tog + p10 * (val%10);
                    val /= 10;
                    p10 *= 10;
                    if (tog <= 10000 && val <= 10000 && fr[tog] && fr[val] && merge(val, tog) == tval) {
                        if(tog == val && fr[tog] < 2);
                        else
                            ans = max(ans, tval);
                    }
                }
            }
        cout << ans << '\n';
    }
    return 0;
}
```
