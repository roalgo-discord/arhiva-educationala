---
id: OJI-2025-VI-mandatar
title: Soluția problemei mandatar (OJI 2025, clasa a VI-a)
# problem_id: 2515
authors: [nodea]
prerequisites:
    - sieve
    - arrays
tags:
    - OJI
    - clasa VI
draft: true
---

## Cerința 1 - 50p

Se rețin numerele citite din fișierul de intrare în șirul $A$ - tablou
unidimensional (vector). Pentru determinarea celui mai mare număr prim din șirul
$A$ se folosește un algoritm de verificare a primalității unui număr. În funcție
de implementarea aleasă pentru verificarea primalității se pot obține punctaje
gradual, între 20-50p ($\mathcal{O}(n)$, $\mathcal{O}(\sqrt{n})$, ciurul lui
Eratostene).

## Cerința 2 - 30p

Pe baza șirului $A$, construim șirul $B$ folosind un algoritm de descompunere în
factori primi, unde fiecare element al șirului $B_i$ este cel mai mic număr
natural care are aceia și factori primi cu $A_i$, cu $1 \leq i \leq n$.

Algoritmul de descompunere în factori primi va determina, pentru fiecare element
al șirului $A$, atât elementele șirului $B$ cât și numărul de factori primi al
fiecărui element $B_i$ . Se va reține cel mai mare număr al șirului $B$ care are
un număr maxim de factori primi.

În funcție de implementarea aleasă pentru descompunerea în factori primi se pot
obține punctaje gradual, între 10-30p ($\mathcal{O}(n)$,
$\mathcal{O}(\sqrt{n})$, ciurul lui Eratostene sau optimizari ale
factorizării).

!!! note "Observație"

    Printr-un algoritm de descompunere în factori primi se poate rezolva atât
    Cerința 1 cât și Cerința 2.

## Cerința 3 - 20p

Pentru determinarea lungimii maxime a unei secvențe mandatorii din șirul $B$ se
poate folosi o structură for ce parcurge numerele mandatare. Acestea pot fi: 2,
3, 5, 6 sau 7.

```cpp
for (int x = 2; x <= 7; x++) {
    if (x == 4) continue;
    
    int k = 0;
    bool ok = false;

    for (int i = 1; i <= n; i++) {
        if (B[i] % x == 0) {
            k++;
            
            if (B[i] == x) {
                ok = true;
            }

            if (ok && k > lgmax) {
                lgmax = k;
            }
        } else {
            k = 0;
            ok = false;
        }
    }
}
```

## Soluție

```cpp

```