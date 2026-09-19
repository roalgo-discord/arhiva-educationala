---
id: OJI-2026-X-inghetata
title: Soluția problemei inghetata (OJI 2026, clasa a X-a)
problem_id: 4227
authors: [mbenchea]
prerequisites:
    - intro-combinatorics
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2026/10.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2026/10.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2026/10.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: Catalin Francu
#include <stdio.h>

const int MAX_N = 200'000;
const int MOD = 1'000'000'007;

int a[MAX_N + 1];
int begin[MAX_N + 1], end[MAX_N + 1];
int st[MAX_N], ss;
int fact[MAX_N + 1], inv_fact[MAX_N + 1];
int task, n;
FILE *fin, *fout;

void read_array() {
    fscanf(fin, "%d %d", &task, &n);
    for (int i = 1; i <= n; i++) {
        fscanf(fin, "%d", &a[i]);
    }
}

void compute_ranges() {
    for (int i = 1; i <= n; i++) {
        while (ss && (a[i] % a[st[ss - 1]] == 0)) {
            ss--;
        }
        begin[i] = ss ? (st[ss - 1] + 1) : 1;
        st[ss++] = i;
    }

    ss = 0;

    for (int i = n; i >= 1; i--) {
        while (ss && (a[i] % a[st[ss - 1]] == 0)) {
            ss--;
        }
        end[i] = ss ? (st[ss - 1] - 1) : n;
        st[ss++] = i;
    }
}

void solve_task_1() {
    int best = 1;
    for (int i = 2; i <= n; i++) {
        if (end[i] - begin[i] > end[best] - begin[best]) {
            best = i;
        }
    }
    fprintf(fout, "%d\n", best);
}

// Calculează x^{-1} % MOD ca x^{MOD-2} % MOD.
int inverse(int x) {
    long long result = 1;
    int e = MOD - 2;

    while (e) {
        if (e & 1) {
            result = result * x % MOD;
        }
        x = (long long)x * x % MOD;
        e >>= 1;
    }

    return result;
}

void compute_factorials() {
    fact[0] = 1;
    for (int i = 1; i <= n; i++) {
        fact[i] = (long long)i * fact[i - 1] % MOD;
    }

    inv_fact[n] = inverse(fact[n]);
    for (int i = n - 1; i >= 0; i--) {
        inv_fact[i] = (long long)(i + 1) * inv_fact[i + 1] % MOD;
    }
}

int comb(int n, int k) { return (long long)fact[n] * inv_fact[k] % MOD * inv_fact[n - k] % MOD; }

int solve_query(int g, int min_k, int max_k) {
    long long result = 0;
    for (int k = min_k; k <= max_k; k++) {
        // Stars and bars. Din cele g înghețate, k sînt impuse ca să bifăm fiecare
        // aromă. Restul de g - k le putem alege oricum din cele k arome.
        result += comb(g - 1, k - 1);
    }
    return result % MOD;
}

void solve_task_2() {
    compute_factorials();

    int num_queries, pos, min_k, max_k;
    fscanf(fin, "%d", &num_queries);
    while (num_queries--) {
        fscanf(fin, "%d %d %d", &pos, &min_k, &max_k);
        int range = end[pos] - begin[pos] + 1;
        int answer = solve_query(range, min_k, max_k);
        fprintf(fout, "%d\n", answer);
    }
}

int main() {
    fin = fopen("inghetata.in", "r");
    fout = fopen("inghetata.out", "w");

    read_array();
    compute_ranges();
    if (task == 1) {
        solve_task_1();
    } else {
        solve_task_2();
    }

    fclose(fin);
    fclose(fout);

    return 0;
}
```
