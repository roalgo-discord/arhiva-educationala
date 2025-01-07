---
tags:
    - OJI
    - clasa VI
---

# Soluția problemei Cuburi (OJI 2002, clasa a VI-a)

!!! example "Cunoștințe necesare"
    * [Vectori de frecvență](https://edu.roalgo.ro/usor/frequency-arrays/)
    * [Sume parțiale](https://edu.roalgo.ro/usor/partial-sums/)

**Autor**: Ștefan-Cosmin Dăscălescu

!!! note "Link problemă"
    Această problemă poate fi accesată [aici](https://kilonova.ro/problems/704/).

Pentru primele două cerințe, vom afla frecvența maximă a unei valori din șir, precum și care sunt valorile care au acea frecvență maximă. 

Pentru cea de-a treia cerință, putem precalcula doi vectori, $st$ și $dr$, cu semnificația că $st[i]$ reprezintă numărul maxim de poziții consecutive cu valoare egală care conțin poziția $i$ de la stânga, iar $dr[i]$ este definit în mod similar, dar pentru o secvență care începe la poziția $i$ și se extinde la dreapta.

Pentru fiecare poziție $i$, acum ce putem face este să verificăm dacă pozițiile $i-1$ și $i+1$ au valori egale pentru a verifica dacă putem pune laolaltă șirurile de cuburi, iar maximul dintre lungimile verificate va fi răspunsul final al problemei. 

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <fstream>
#include <iostream>

using namespace std;
ifstream fin("cuburi.in");
ofstream fout("cuburi.out");

int f[11];
int v[200002], st[200002], dr[200002], mst[200002], mdr[200002];

int main() {
    int n, x;
    fin >> n;
    int fmax = 0;
    int nrculori = 0;

    for (int i = 1; i <= n; i++) {
        fin >> x;
        v[i] = x;
        if (f[x] == 0)  // daca culoarea x e intalnita prima data
            nrculori++; // cresc numarul de culori
        f[x]++;
        if (f[x] > fmax)
            fmax = f[x];
    }
    fout << nrculori << '\n';
    for (int i = 1; i <= 10; i++) {
        if (f[i] == fmax)
            fout << i << " ";
    }
    fout << '\n';
    /// cer 3
    for (int i = 1; i <= n; i++) {
        if (v[i] == v[i - 1])
            st[i] = st[i - 1] + 1;
        else
            st[i] = 1;
        mst[i] = max(mst[i - 1], st[i]);
    }

    for (int i = n; i >= 1; i--) {
        if (v[i] == v[i + 1])
            dr[i] = dr[i + 1] + 1;
        else
            dr[i] = 1;
        mdr[i] = max(mdr[i + 1], dr[i]);
    }
    // lung maxima
    int p[NMAX], j = 0; // in p retinem pozitiile de unde pot scoate cuburi pt a obtine lmax
    int lmax = -1, l;
    for (int i = 1; i <= n; i++) {
        if (v[i - 1] == v[i + 1])      // daca prin taiere alipesc doua siruri cu aceleasi elemente
            l = st[i - 1] + dr[i + 1]; // lungimea rezultata e nr de elem egale de la stanga, resp de la dr
        else
            l = 0;
        l = max(l, max(mst[i - 1], mdr[i + 1]));
        if (l > lmax) { // daca am obtinut o lungime mai mare , memorez poz elem de taiat, prima in vect p
            lmax = l;
            j = 0;
            p[j++] = i;
        } 
        else {
            if (l == lmax) { // daca am obtinut aceeasi lungime , adaugam la lungimea existenta
                p[j++] = i;
            }
        }
    }

    for (int i = 0; i < j; i++)
        fout << p[i] << " ";
    return 0;
}
```