---
tags:
    - OJI
    - clasa IX
---

# Soluția problemei Macarie (OJI 2024, clasa a IX-a)

!!! example "Cunoștințe necesare"
    * [Ciurul lui Eratostene](https://edu.roalgo.ro/usor/sieve/)
    * [Căutarea binară](https://edu.roalgo.ro/usor/binary-search/)

**Autor soluție**: Daniela Lica

!!! note "Link problemă"
    Această problemă poate fi accesată [aici](https://kilonova.ro/problems/2501/).

Subtask 1: Complexitatea $O(Valmax \cdot N)$, unde $Valmax$ este valoarea maximă din șirul $A$. Pentru fiecare valoare $x$, în ordine de la $1$ la $Valmax$, se parcurge șirul $A$ și se crează lista $D$, introducând $x$ de fiecare dată când acesta divide un element al șirului. Răspunsul la fiecare din cele $Q$ întrebări este realizat în $O(1)$.

Subtask $2$: Complexitatea $O(Valmax + N + Q)$. Întrucât valorile din fișier sunt numere prime, lista $D$ conține $N$ valori egale cu $1$, și valorile șirului $A$, în ordine crescătoare. Cum acestea sunt mai mici decât $1000000$ se pot reține într-un vector de frecvență. Pe baza acestuia se poate construi șirul $D$ și răspunde în $O(1)$ la cele $Q$ întrebări.

Subtask $3$: Complexitatea $O(N \cdot \sqrt{Valmax} + PozMax)$. Pentru fiecare număr din șirul $A$, vom determina în $O(\sqrt{Valmax})$ divizorii acestuia, marcându-i într-un vector de frecvență. Pe baza acestuia se va construi șirul $D$ și răspunde în $O(1)$ la cele $Q$ întrebări.

Subtask $4$: Complexitatea $O(Valmax \cdot \log{Valmax} + Q)$. Se garantează că pozițiile din șirul $D$ pentru care trebuie să identificăm divizorii sunt mai mici decât $2000000$. Vom construi un vector $NrMultipli$ în care se va reține, pentru fiecare valoare $x$ de la $1$ la $ValMax$, câte numere din șirul $A$ se divid cu $x$. Construcția se face în complexitate $Valmax \cdot \log{Valmax}$, similar cu Ciurul lui Eratostene. Pe baza acestui vector se va construi șirul $D$ și răspunde în $O(1)$ la cele $Q$ întrebări.

Subtask $5$: Complexitatea $O(ValMax \cdot \log{Valmax} + Q \cdot \log{Valmax})$ Neavând restricții suplimentare, vom contrui vectorul $NrMultipli$ la fel ca la subtaskul $4$. Șirul $D$ îl vom construi memorând $(divizor, frecventa)$. Folosind sumele parțiale, putem reține în $D[x].frecventa$ ultima poziție pe care apare $x$ în lista divizorilor. Cum șirul acestor poziții este crescător, pentru a răspunde la cele $Q$ întrebări, vom folosi căutarea binară.

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;

int n, m, fr[1000001], sp[1000001];

void sieve() {
    for (int i = 1; i <= 1000000; i++) {
        for (int j = i; j <= 1000000; j += i)
            sp[i] += fr[j];
        sp[i] += sp[i - 1];
    }
}

int main() {
    ifstream cin("macarie.in");
    ofstream cout("macarie.out");

    cin >> n >> m;
    for (int i = 1; i <= n; i++) {
        int x;
        cin >> x;
        fr[x]++;
    }

    sieve();

    for (int i = 1; i <= m; i++) {
        int x;
        cin >> x;

        int st = 1;
        int dr = 1000000;
        int ans = 0;
        while (st <= dr) {
            int mid = (st + dr) / 2;
            if (sp[mid] >= x)
                ans = mid, dr = mid - 1;
            else
                st = mid + 1;
        }

        cout << ans << " ";
    }
    return 0;
}
```