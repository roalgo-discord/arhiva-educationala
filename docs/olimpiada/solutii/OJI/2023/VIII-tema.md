---
tags:
    - OJI
    - clasa VIII
---

# Soluția problemei Tema (OJI 2023, clasa a VIII-a)

!!! example "Cunoștințe necesare"
    - [Ciurul lui Eratostene](../../../../usor/sieve.md)
    - [Sume parțiale](../../../../usor/partial-sums.md)
    - [Two Pointers](../../../../mediu/two-pointers.md)

**Autor soluție**: Daniela Lica

!!! note "Link problemă"
    Această problemă poate fi accesată [aici](https://kilonova.ro/problems/516/).

Pentru cerința 1, soluție în complexitate $\mathcal{O}(\text{ValMax} \times \log(\text{ValMax}) + N)$ obține punctaj maxim, adică 50 de puncte. Folosind Ciurul lui Eratostene, în complexitate $\mathcal{O}(\text{ValMax} \times \log(\text{ValMax}))$, se vor determina toate numerele prime $\leq \text{ValMax}$, și pentru fiecare număr compus, reținem cel mai mic și cel mai mare factor prim al său.

Algoritmul de ciur generează toate numerele prime. În momentul găsirii unui număr prim
$p$, marcăm toți multiplii lui de la $2 \times p$ până la cel mult ValMax ca fiind neprimi. Pentru fiecare multiplu (notat cu $x$), $p$ devine cel mai mare factor prim al lui $x$ (iar dacă $x$ avea deja un factor prim, $p$ îl suprascrie). Acest lucru este natural, deoarece $p$ este cel mai mare număr prim întâlnit până la acest moment. În plus, dacă la momentul curent $x$ era considerat prim, atunci $p$ devine și cel mai mic factor prim al acestuia.

Determinarea secvenței de lungime maximă, pentru care costul acesteia este mai mic sau
egală cu $K$, se realizează în complexitate $\mathcal{O}(N)$, folosind doi indici. Pentru fiecare indice curent $i$, considerat capăt drept al secvenței curente, determinăm indicele de început (din stânga) al secvenței pentru care produsul nu depășește $K$. Dacă produsul este mai mare, se renunță la $A[\text{st}]$, incrementând $\text{st}$, și actualizând valoarea produsului. Se va reține lungimea maximă a secvenței ce respectă cerința.

Odată determinat $\text{st}$ pentru poziția $i$, dorim să calculăm valoarea $\text{st}'$ pentru poziția $i + 1$. Încorporăm $A[i +1]$ în costul curent. Cât timp costul depășește, este clar că pentru niciun $i$ viitor $A[\text{st}]$ nu va mai fi parte din soluție (deoarece, cu cât vom deplasa $i$ spre dreapta, cu atât mai mult vom depăși și costul $K$). Deci, eliminăm $A[\text{st}]$, și încercăm pe rând valorile $\text{st} + 1$, $\text{st} + 2$, \dots până cănd revenim sub costul $K$. Prima valoare acceptabilă este capătul stâng $\text{st}'$ corespunzător lui $i + 1$.

Pentru o soluție care determină în $\mathcal{O}(N^3)$ secvența, a, se obțin aproximativ 20 de puncte.
Pentru o soluție care determină în $\mathcal{O}(N^2)$ secvența, a, se obțin aproximativ 35 de puncte.

Pentru cerința 2, soluția în complexitate $\mathcal{O}(N)$ obține punctaj maxim, adică 50 de puncte.

Considerând, ciurul obținut după transformarea elementelor compuse, vom determina, pentru fiecare poziție $i$ din șir, cât de mult ne putem extinde spre stânga, și spre dreapta cu o secvență care conține cel mai mic factor prim al lui $A[i]$ (notat $fpmin[A[i]]$), respectiv cel mai mare factor prim al lui $A[i]$ (notat $fpmax[A[i]]$), astfel:

- $\text{st}[0][i]$ - cel mai mic indice din stânga unde regăsim $fpmin[A[i]]$ ca factor în toate elementele dintre acel indice și $i$;
- $\text{st}[1][i]$ - cel mai mic indice din stânga unde regăsim $fpmax[A[i]]$ ca factor în toate elementele dintre acel indice și $i$;
- $\text{dr}[0][i]$ - cel mai mare indice din dreapta unde regăsim $fpmin[A[i]]$ ca factor în toate elementele de la $i$ până la acea poziție;
- $\text{dr}[1][i]$ - cel mai mare indice din dreapta unde regăsim $fpmax[A[i]]$ ca factor în toate elementele de la $i$ până la acea poziție.

Pentru fiecare element $A[i]$, lungimea maximă a secvenței care îl conține, și care are cel mai mare divizor comun diferit de 1 este: $\max((\text{dr}[0][i] - \text{st}[0][i] + 1), (\text{dr}[1][i] - \text{st}[1][i] + 1))$.

Pentru o soluție care determină în $\mathcal{O}(N^3)$ secvența, se obțin aproximativ 20 de puncte.
Pentru o soluție care determină în $\mathcal{O}(N^2)$ secvența, se obțin aproximativ 35 de puncte.

O altă abordare în $\mathcal{O}(N)$ folosește aceeași tehnica a celor doi indici de la cerința 1. Pentru un capăt drept $i$, presupunem că am calculat capătul stâng $\text{st}$ care produce cea mai lungă secvență cu c.m.m.d.c. diferit de 1. Cum actualizăm secvența pentru $i + 1$? Putem menține un vector de frecvență al tuturor factorilor primi din secvența curentă. Când adăugăm sau eliminăm un element în/din secvență, incrementăm sau decrementăm frecvențele celor doi factori (dacă factorii unui element sunt egali, modificăm frecvențele doar cu 1, nu cu 2). Atunci o secvență cu c.m.m.d.c. diferit de 1 are proprietatea că frecvența cel putîn a unui factor de la capătul secvenței este egală cu lungimea secvenței. Când avansăm de la $i$ la $i + 1$, verificăm dacă secvența, $[\text{st}, i + 1]$ mai are aceeași proprietate. Cât timp nu o are, eliminăm capătul stânga al secvenței.

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;

ifstream fin("tema.in");
ofstream fout("tema.out");

int pr[1000005], gpd[1000005], spd[1000005];
int spr[100005], scm[100005];
int v[100005];
int fr[1000005];

void Ciur() {
    pr[0] = 2;
    pr[1] = 2;
    for (int i = 2; i <= 1000000; ++i)
        pr[i] = 1;
    for (int i = 2; i <= 1000000; ++i) {
        if (pr[i] == 0)
            continue;
        for (int j = 2 * i; j <= 1000000; j += i) {
            if (pr[j] == 1)
                spd[j] = i;
            pr[j] = 0;
            gpd[j] = i;
        }
    }
}

int main() {
    Ciur();
    long long C, n, k;
    fin >> C >> n >> k;
    for (int i = 1; i <= n; ++i) {
        fin >> v[i];
        spr[i] = spr[i - 1];
        scm[i] = scm[i - 1];
        if (pr[v[i]] == 1)
            spr[i] += v[i];
        else if (pr[v[i]] == 0)
            scm[i] += v[i];
    }
    if (C == 1) {
        int ans = 0, st = 1;
        for (int i = 1; i <= n; ++i) {
            while (st <= i && 1LL * (spr[i] - spr[st - 1]) * (scm[i] - scm[st - 1]) > k) {
                st++;
            }
            ans = max(ans, i - st + 1);
        }
        fout << ans;
    } else {
        int st = 1, dr = 1, loc = 1;
        for (int i = 1; i <= n; ++i) {
            int G = gpd[v[i]], S = spd[v[i]];
            if (pr[v[i]] == 1) {
                G = v[i];
                S = v[i];
            }
            if (v[i] == 1) {
                G = 1;
                S = 1;
            }
            fr[G]++;
            if (G != S)
                fr[S]++;
            while (loc <= i && (i - loc + 1 > fr[G] && i - loc + 1 > fr[S])) {
                int G1 = gpd[v[loc]], S1 = spd[v[loc]];
                if (pr[v[loc]] == 1) {
                    G1 = v[i];
                    S1 = v[i];
                }
                if (v[loc] == 1) {
                    G1 = 1;
                    S1 = 1;
                }
                fr[G1]--;
                if (G1 != S1)
                    fr[S1]--;
                loc++;
            }
            if (dr - st + 1 <= i - loc + 1) {
                st = loc;
                dr = i;
            }
        }
        fout << st << ' ' << dr;
    }
    return 0;
}
```