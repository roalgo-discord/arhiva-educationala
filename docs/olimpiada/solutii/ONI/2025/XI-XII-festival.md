---
id: ONI-2025-XI-XII-festival
title: Soluția problemei Festival (ONI 2025, clasele XI-XII)
problem_id: 3720
authors: []
prerequisites:
    - segment-trees
    - intro-dp
    - data-structures-dp
tags:
    - ONI
    - clasa XI-XII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/ONI%20%28national%20olympiad%29/2025/11-12.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/ONI%20%28national%20olympiad%29/2025/11-12.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/ONI%20%28national%20olympiad%29/2025/11-12.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: FFTPeOJI (kilonova)

#include <bits/stdc++.h>
#include <cassert>
using namespace std;
//Fie u_i = t_i + x_i, r_i = t_i - x_i. In editorial este demonstrat formal ca u_i <= u_j si r_i <= r_j implica t_i <= t_j
//Ne vom folosi de optimizarea CDQ, pentru a garanta monotonia in u. Acum ca putem rezolva problema fara existenta constrangerii de tip u, mai avem doua constrangeri
//care se rezolva rapid cu o baleiere in functie de r si un query pe arbore de intervale, in functie de X, stiind ca pentru un indice j daca inainte avem doar elemente i cu
//u_j <= u_i si r_j<=r_i, dp[i] = dp maxim pe interval [x_i-D, x_i + D] + satisfactie[i]
//Construim un arbore de intervale iterativ, usually nu prea recomand arbore de intervale iterativ, dar incerc sa obtin prima submisie ca timp pe Kilonova.
int n, d;
vector<int> distinct_x;
vector<int> sat, sum, diff;
vector<int> x;
vector<long long> dp;
vector<int> ordered_by_sum;
//Observatii:
//1.Dadeam shadow din greseala la distinct_x si pica totul
struct aint {
    //point update, range query
    int nn;
    vector<long long> v;

    aint(int n) {
        this->nn = n;
        v.resize(2 * n + 1);
    }

    void max_update(int poz, long long val) {
        assert(poz < nn);
        int p = poz + nn;
        v[p] = max(val, v[p]);
        for (p >>= 1; p > 0; p >>= 1) v[p] = max(v[2 * p], v[2 * p + 1]);
    }

    void set_update(int poz, long long val) {
        assert(poz < nn);
        int p = poz + nn;
        v[p] = val;
        for (p >>= 1; p > 0; p >>= 1) v[p] = max(v[2 * p], v[2 * p + 1]);
    }

    long long query(int l, int r) {
        assert(0 <= l && l <= r && r < nn);
        r++; // functioneaza pe [l, r), incrementez pentru a-mi raspunde la query pe [l, r]
        long long ret = 0;
        for (l += nn, r += nn; l < r; l >>= 1, r >>= 1) {
            if (l & 1) ret = max(v[l++], ret);
            if (r & 1) ret = max(v[--r], ret);
        }
        return ret;
    }
} *tree;

int recursion_count = 0;

void cdq(int l, int r) {
    if (l == r) {
        return;
    }
    /*DEBUG
    cout << recursion_count <<' ' << l << ' ' << r << endl;
    recursion_count++;
    */
    int mij = (l + r) / 2;
    cdq(l, mij);
    vector<int> stanga, dreapta;
    for (int i = l; i <= mij; i++) stanga.push_back(i);
    for (int i = mij + 1; i <= r; i++) dreapta.push_back(i);

    auto cmp = [&](int i, int j) {
        return diff[i] < diff[j];
        //sortam in functie de diferenta pentru a baleia dupa aceasta
    };
    sort(stanga.begin(), stanga.end(), cmp);
    sort(dreapta.begin(), dreapta.end(), cmp);
    int indice_stanga = 0; //un pointer monoton pe care-l tot avansez
    for (int i: dreapta) {
        while (indice_stanga < stanga.size() && diff[stanga[indice_stanga]] <= diff[i]) {
            int indice_helper = stanga[indice_stanga];
            //acesta este indicele din array in sine, practic cel pe care-l folosim ca sa accesam dp si toata smecheria
            int find_index_x = lower_bound(distinct_x.begin(), distinct_x.end(), x[indice_helper]) - distinct_x.begin();
            // pozitia valorii normalizate pe ox
            tree->max_update(find_index_x, dp[indice_helper]);
            //cout << "PROPAG" << ' ' << dp[indice_helper] << '\n';
            indice_stanga++;
        }
        // Imi caut pe x-urile normalizate indicele la x+d, respectiv x - d
        auto it_find_dreapta = upper_bound(distinct_x.begin(), distinct_x.end(), x[i] + d); //acesta este un iterator
        int find_dreapta = 0; //indicele corespunzator x + d
        // daca iteratorul imi indica spre inceputul array-ului unde nu pot aplica std::prev, atunci inseamna ca nu pot considera niciun indice din array
        if (it_find_dreapta != distinct_x.begin()) find_dreapta = prev(it_find_dreapta) - distinct_x.begin();
        // daca nu, iau indicele pe care mi-l da acesta

        int find_stanga = lower_bound(distinct_x.begin(), distinct_x.end(), x[i] - d) - distinct_x.begin();
        //indicele corespunzator x - d

        //imi propag
        dp[i] = max(dp[i], tree->query(find_stanga, find_dreapta) + sat[i]);
    }
    for (int i = 0; i < indice_stanga; i++) {
        int indice_helper = stanga[i];
        int find_index_x = lower_bound(distinct_x.begin(), distinct_x.end(), x[indice_helper]) - distinct_x.begin();
        // pozitia valorii normalizate pe ox
        tree->set_update(find_index_x, 0);
        //reset
    }
    cdq(mij + 1, r);
    return;
}

void solve() {
    ifstream fin("festival.in");
    ofstream fout("festival.out");
    fin >> n >> d;
    sat.resize(n);
    sum.resize(n);
    diff.resize(n);
    x.resize(n);
    dp.resize(n, 0);
    ordered_by_sum.resize(n);
    for (int i = 0; i < n; i++) {
        int t, xx, s;
        fin >> t >> xx >> s;
        sat[i] = s; //satisfactia
        sum[i] = t + xx; //suma, u
        diff[i] = t - xx; //diferenta, r
        x[i] = xx; //ox-ul
        ordered_by_sum[i] = i;
    }
    //rearanjez valorile, crescator dupa suma.
    auto cmp = [&](int i, int j) {
        if (sum[i] != sum[j])return sum[i] < sum[j];
        else return diff[i] < diff[j];
    };

    sort(ordered_by_sum.begin(), ordered_by_sum.end(), cmp);
    //aloc dinamic
    vector<int> copy_sat = sat, copy_sum = sum, copy_diff = diff, copy_x = x;
    for (int i = 0; i < n; i++) {
        sat[i] = copy_sat[ordered_by_sum[i]];
        sum[i] = copy_sum[ordered_by_sum[i]];
        diff[i] = copy_diff[ordered_by_sum[i]];
        x[i] = copy_x[ordered_by_sum[i]];
        dp[i] = sat[i];
    }
    //eliberez memoria
    copy_sat.clear();
    copy_sum.clear();
    copy_diff.clear();
    copy_x.clear();
    //sortez x-urile si sterg duplicatele
    distinct_x = x;
    sort(distinct_x.begin(), distinct_x.end());
    distinct_x.erase(unique(distinct_x.begin(), distinct_x.end()), distinct_x.end());
    tree = new aint((int) distinct_x.size());
    cdq(0, n - 1);
    fout << *max_element(dp.begin(), dp.end()) << '\n';
}

int main() {
    solve();
    return 0;
}
```
