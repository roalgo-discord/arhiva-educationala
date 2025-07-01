---
id: OJI-2025-X-anagrame
title: Soluția problemei Anagrame (OJI 2025, clasa a X-a)
problem_id: 3634
authors: [lica]
prerequisites:
    - binary-search
    - frequency-arrays
    - intro-combinatorics
    - modular-inverse
tags:
    - OJI
    - clasa X
---

## Subtask 1

Complexitatea $\mathcal{O}(M)$. Structura testelor de intrare face ca șirul
suport să conțină aceeași literă ca șirul $A$, iar lungimea acestuia să fie
minimul lungimilor intervalelor ce intervin în operațiile de generare,
$\min(y_q - x_q)$.

## Subtask 2

Complexitatea $\mathcal{O}(N \times \Sigma \times M)$. Pentru fiecare literă
$L$, situată în secvența interogată, determinăm $\operatorname{Range}[L]$, în
complexitate liniară $\mathcal{O}(N)$, reținându-se prima și ultima apariție a
ei în cadrul secvent, ei.

## Subtask 3

Complexitatea $\mathcal{O}(N \times \Sigma + M)$. Întrucât nu se fac update-uri,
se poate precalcula, pentru fiecare poziție din șir, pentru fiecare literă a
alfabetului, $St[poz][lit]$ reprezentând cea mai apropiată poziție la stânga,
respectiv $Dr[poz][lit]$ reprezentând cea mai apropiată poziție la dreapta unde
se regăsește aceasta. Complexitatea $\mathcal{O}(N \times \Sigma)$. În urma
precalculării răspunsul la o interogare se face în timp constant
$\mathcal{O}(1)$.

## Subtask 4

Complexitatea $\mathcal{O}(M \times \Sigma \times \log N)$. Pentru fiecare
literă se memorează, într-un set, pozițiile unde aceasta apare în șir. Prima și
ultima poziție din cadrul intervalului interogat, pentru fiecare literă, se
determină în $\mathcal{O}(\log N)$ folosind căutarea binară. Șirul suport minim
lexicografic poate fi determinat printr-o comparare pe vectori de frecvență.

## Subtask 6

Complexitatea $\mathcal{O}(M \times (\Sigma + (y − x)!))$. Lungimea secvenței
interogate permite numărarea anagramelor șirului suport folosind
`next_permutation` pentru generarea anagramelor distincte în ordine
lexicografică.

## Subtask 7

Dacă șirul suport con ține $l = c_a + c_b$ litere în total (adică,
$c_a$ litere de a și $c_b$ litere de b), înseamnă că numărul de anagrame
ale acestuia este egal cu $\frac{l!}{a! \times b!}$.

## Subtask 8 (Generalizarea a subtask-ului 7)

Complexitatea $\mathcal{O}(N \times \Sigma + M \times \log N \times \Sigma)$.
Numărul anagramelor distincte este egal cu numărul permutărilor cu repetiții.
Presupunem că șirul suport are Nr caractere și conține litera $l_1$ de $n_1$
ori, litera $l_2$ de $n_2$ ori, ..., litera $l_k$ de $n_k$ ori, astfel încât
$n_1 + n_2 + ... + n_k = Nr$. Numărul de permutărilor cu repetiții este egal cu
$Nr!/(n_1! \times n_2! . . . \times n_k!)$. Notăm cu $K = (n_1! \cdot n_2!...
\cdot n_k!)$ și cu $Mod = 1999999973$, atunci deoarece $Mod$ este număr prim,
$(Nr!/K) \equiv (𝑁 𝑟! \times K Mod - 2) \mod Mod$. Se pot precalcula
factorialele numerelor mai mici sau egale cu $Nr$ iar exponențierea se
implementează în complexitate logaritmică.

## Rezolvare

Mai jos puteți găsi o soluție care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
#define MOD 1999999973
/// O(sigma * M * logN)
using namespace std;

const int Nmax = 100005;
int N, M, C, Ans;
int SirMin[30];
char A[Nmax];
unsigned long long Fact[30 * Nmax];
set<int> S[30];
ifstream f("anagrame.in");
ofstream g("anagrame.out");

void precl()  /// precalculam factorialele numerelor mai mici ca Nmax
{
    Fact[0] = 1;
    for (int i = 1; i < 26 * Nmax; i++) {
        Fact[i] = (1LL * i * Fact[i - 1]) % MOD;
    }
}

int elg(int a, int b)  /// exponentierea logaritmica
{
    int rez = 1;
    while (b > 1) {
        if (b % 2 == 1) {
            rez = (1LL * rez * a) % MOD;
        }
        a = (1LL * a * a) % MOD;
        b = b / 2;
    }
    return (1LL * a * rez) % MOD;
}

void actualizez_min(int A[], int B[]) {
    int lg_A = 0, lg_B = 0;
    for (int i = 0; i <= 25; i++) {
        lg_A += A[i];
        lg_B += B[i];
    }
    bool ok = false;
    for (int i = 0; i <= 25 && !ok; i++) {
        lg_A -= A[i];
        lg_B -= B[i];

        if (A[i] > B[i]) {
            if (lg_B > 0) {
                ok = true;
            } else {
                break;
            }
        }
        if (A[i] < B[i]) {
            if (lg_A > 0) {
                break;
            } else {
                ok = true;
            }
        }
    }
    if (ok) {
        for (int i = 0; i <= 25; i++) {
            B[i] = A[i];
        }
    }
}

void Generare(int x, int y, int &Rez) {
    int Range[30], P = 1, Nr = 0;
    for (int i = 0; i <= 25; i++) {
        Range[i] = 0;
        auto it1 = S[i].lower_bound(x);
        if (it1 == S[i].end()) {
            continue;
        }
        auto it2 = S[i].upper_bound(y);

        if (it2 == S[i].begin()) {
            continue;
        }
        it2--;
        Range[i] = *it2 - *it1;

        if (Range[i] < 0) {
            Range[i] = 0;
        }

        P = (1LL * P * Fact[Range[i]]) % MOD;
        Nr += Range[i];
    }
    Rez = (1LL * Fact[Nr] * elg(P, MOD - 2)) % MOD;

    if (C == 1) {
        actualizez_min(Range, SirMin);
    }
}

void load() {
    f >> C >> N >> M;
    assert(C == 1 || C == 2);
    assert(N <= 100000);
    assert(M <= 100000);

    for (int i = 1; i <= N; i++)  /// initializam seturile care mentin pentru
                                  /// fiecare litera pozitiile din sir
    {
        f >> A[i];
        assert(islower(A[i]));
        S[A[i] - 'a'].insert(i);
    }
    for (int i = 0; i <= 25; i++) {
        SirMin[i] = 0;
    }
    SirMin[25] = N * 30;
    A[N + 1] = '\n';
    for (int i = 1; i <= M; i++) {
        int x = 0, y, poz;
        char s[Nmax];
        f >> s;
        if (isdigit(s[0]))  /// operatie generare
        {
            for (int j = 0; s[j]; j++) {
                x = x * 10 + (int)s[j] - '0';
            }
            f >> y;
            assert(x <= y);
            assert(y <= N);
            Generare(x, y, Ans);
            if (C == 2) {
                g << Ans << '\n';
            }
        } else 
        {
            assert(islower(s[0]));
            f >> poz;
            S[A[poz] - 'a'].erase(poz);
            S[s[0] - 'a'].insert(poz);
            A[poz] = s[0];
        }
    }

    if (C == 1) {
        for (int i = 0; i <= 25; i++) {
            for (int j = 1; j <= SirMin[i]; j++) {
                g << (char)(i + 'a');
            }
        }
        g << '\n';
    }
}

int main() {
    precl();
    load();
    return 0;
}
```
