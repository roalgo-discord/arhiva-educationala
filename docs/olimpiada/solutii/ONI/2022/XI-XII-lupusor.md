---
id: ONI-2022-XI-XII-lupusor
title: Soluția problemei lupusor (ONI 2022, clasele XI-XII)
problem_id: 137
authors: []
prerequisites:
    - segment-trees-part2
tags:
    - ONI
    - clasa XI-XII
---
Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/ONI%20%28national%20olympiad%29/2022/11-12.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/ONI%20%28national%20olympiad%29/2022/11-12.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/ONI%20%28national%20olympiad%29/2022/11-12.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: FFTPeOJI (kilonova)

/*

// fiecare carte {a, b} aceasta poate fi reprezentata ca un interval [a, b], un joc castigator este acel subset de intervale a căror intersecție este NENULA
//Pentru task 1 rezolvam astfel:
// Pentru fiecare posibila submulțime de intervale cu intersecția nenula, dorim s-o alegeam pe aceea cu un număr maximal de intervale.
// O observație care simplifica considerabil problema este următoarea: orice reuniune de intervale maximala va avea lungime cel putin 1, așadar pentru orice mulțime de intervale valida
// [st, dr], este suficient sa găsim un interval [x, x] inclus sau egal [st, dr] si sa vedem numărul maxim de intervale deschise la punctul x
// Pe scurt, este suficient sa răspundem la query-uri, aflând maximul pe intervalul [1, n], adică testam fiecare x posibil si vedem cate intervale pot fi cu reuniunea [st, dr] care menține
// relația cu x
//Pentru task 2 rezolvam astfel:
//Cel mai simplu mod de a permite update-uri este acela de a calcula INDIVIDUAL contribuția fiecărui interval. Sa consideram ca se introduce cartea {a, b}. Vrem sa aflam cate
//intervale sunt "active" la poziția a (a apartine intervalului determinat de acestea), aceasta este contribuția initiala a intervalului. Totuși intervalul mai are si alte contribuții, adică pentru celelalte intervale, vom mai înmulți cu 2 contribuția
// initiala a intervalelor celorlalte, pentru ca se formeaza 2 optiuni: pot ori tine una dintre configuratiile anterioare, sau pot sa-mi adaug si intervalul meu
// conventia de contributie initiala a fost urmatoarea si anume: cand imi adaug intervalul, imi consider toate intervalele in care acesta are cel mai din dreapta capat din stanga. Asta este doar o conditie arbitrara pe care am stabilit-o, orice alta conditie
//consistenta va merge la fel de bine.
*/

#include <bits/stdc++.h>
#include <cassert>
using namespace std;
constexpr int mod = 1e9 + 7;
ifstream fin("lupusor.in");
ofstream fout("lupusor.out");

#define cin fin
#define cout fout
const int NMAX = 1e5;
const int MMAX = 1e5;
const int RANGEMAX = 2 * (NMAX + MMAX);
int power(int base, int exp) {
    base %= mod;
    long long ans = base;
    long long ret = 1;
    while (exp) {
        if (exp & 1) ret = (1LL * ret * ans) % mod;
        ans = (ans * ans) % mod;
        exp >>= 1;
    }
    return (int) ret % mod;
}
int pow2[500005], inv2[500005];
void init() {
    pow2[0] = 1;
    for (int i = 1; i < 500005; i++) {
        pow2[i] = (1LL * pow2[i - 1] * 2) % mod;
    }
    inv2[500004] = power(pow2[500004], mod - 2);
    for (int i = 500003; i >= 0; i--) {
        inv2[i] = (1LL * inv2[i + 1] * 2) % mod;
    }
}
struct aint {
    struct ndx {
        //--------------TASK 2 -----------------------------------------
        int lazy_for_multiplication; // cu cat am de înmulțit suma pe interval
        int sum_of_powers_of_2; // suma contributiilor lui 2 pe acel interval
        //--------------TASK 1 -----------------------------------------
        //aint normal lazy, relevant in principiu atat pe task-ul 1, cat si pe task-ul 2
        long long normal_sum;
        int lazy;
        int maxx;
        ndx() {
            normal_sum = 0;
            lazy = 0;
            sum_of_powers_of_2 = 0;
            lazy_for_multiplication = 0;
            maxx = 0;
        }
        ndx operator+(const ndx& x) const {
            //la combinare, ne asiguram ca lazy-ul este push-uit
            assert(x.lazy_for_multiplication == 0 and lazy_for_multiplication == 0 and lazy == 0 and x.lazy == 0);
            ndx y;
            y.sum_of_powers_of_2 = (sum_of_powers_of_2 + x.sum_of_powers_of_2) % mod;
            y.normal_sum = normal_sum + x.normal_sum;
            y.maxx = max(x.maxx, maxx);
            return y;
        }
    };
    int n;
    vector<ndx> tree;
    aint(int n) {
        this->n = n;
        this->tree.resize(4 * n  + 5);
    }
    void push(int node, int l, int r) {
        if (tree[node].lazy_for_multiplication > 0) {
            tree[node].sum_of_powers_of_2 = (1LL * tree[node].sum_of_powers_of_2 * pow2[tree[node].lazy_for_multiplication]) % mod;
        }
        else if (tree[node].lazy_for_multiplication < 0) {
            tree[node].sum_of_powers_of_2 = (1LL * tree[node].sum_of_powers_of_2 * inv2[-tree[node].lazy_for_multiplication]) % mod;
        }

        tree[node].normal_sum += 1LL * (r - l + 1) * tree[node].lazy;
        tree[node].maxx += tree[node].lazy;
        if (l != r) {
            tree[2 * node].lazy_for_multiplication += tree[node].lazy_for_multiplication;
            tree[2 * node + 1].lazy_for_multiplication += tree[node].lazy_for_multiplication;
            tree[2 * node].lazy += tree[node].lazy;
            tree[2 * node + 1].lazy += tree[node].lazy;
        }
        tree[node].lazy_for_multiplication = 0;
        tree[node].lazy = 0;
    }
    // acesta este update-ul individual unde imi creste cu numarul de multimi unde fortez alegerea cartii mele
    //asa cum am mentionat mai sus, cel mai facil mod de a evita overcounting-ul este, fara doar si poate, de a calcula pentru fiecare individual la cate intervale care-l contin neaparat contribuie
    //asa imi calculez cu cat imi contribuie capatul stanga
    void update_single_pos(int node, int l, int r, int pos, int val) {
        push(node, l, r);
        if (l==r) {
            tree[node].sum_of_powers_of_2 = (1LL * tree[node].sum_of_powers_of_2 + val + mod) % mod;
            return;
        }
        int mid = (l + r) / 2;
        if (mid >= pos) update_single_pos(2 * node, l, mid, pos, val);
        else update_single_pos(2 * node + 1, mid + 1, r, pos, val);
        push(2 * node, l, mid);
        push(2 * node + 1, mid + 1, r);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }
    // + 1 pentru inserare, -1 pentru stergere
    void update_interval(int node, int l, int r, int ql, int qr, int val) {
        if (l > qr || r < ql) return;
        if (ql <= l && r <= qr) {
            tree[node].lazy+= val;
            tree[node].lazy_for_multiplication+=val;
            push(node, l, r);
            return;
        }
        push(node, l, r);
        int mid = (l + r) / 2;
        update_interval(2 * node, l, mid, ql, qr, val);
        update_interval(2 * node + 1, mid + 1, r, ql, qr, val);
        push(2 * node, l, mid);
        push(2 * node + 1, mid + 1, r);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }
    ndx query(int node, int l, int r, int ql, int qr) {
        push(node, l, r);
        if (r < ql || l > qr) return ndx();
        if (ql <= l && r <= qr) return tree[node];
        int mid = (l + r) / 2;
        push(2 * node, l, mid);
        push(2 * node + 1, mid + 1, r);
        return query(2 * node, l, mid, ql, qr) + query(2 * node + 1, mid + 1, r, ql, qr);
    }
    void add_card(int st, int dr) {
        if (st > dr) return;
        assert(1 <= st && st <= dr && dr <= n);
        int number_of_active_intervals = query(1, 1, n, st, st).normal_sum;
        update_interval(1, 1, n, st, dr, 1);
        update_single_pos(1, 1, n, st, pow2[number_of_active_intervals]);
    }
    void remove_card(int st, int dr) {
        if (st > dr) return;
        assert(1 <= st && st <= n && dr <= n);
        int number_of_active_intervals = query(1, 1, n, st, st).normal_sum;
        // se numara singur
        update_single_pos(1, 1, n, st, -pow2[number_of_active_intervals - 1]);
        update_interval(1, 1, n, st, dr, -1);
    }
    int task_1_query() {
        return query(1, 1, n, 1, n).maxx;
    }
    int task_2_query() {
        return query(1, 1, n, 1, n).sum_of_powers_of_2 % mod;
    }

};
aint *tree;
void solve() {
    init();
    int c;
    cin >> c;
    int n, m;
    cin >> n;
    vector<pair<int, int>> intervals(n + 1, {0, 0});
    int currently_good = 0;
    for (int i = 1; i <= n; i++) {
        cin >> intervals[i].first;
    }
    for (int i = 1; i <= n; i++) {
        cin >> intervals[i].second;
        if (intervals[i].first <= intervals[i].second) {
            currently_good++;
        }
    }
    tree = new aint(RANGEMAX);
    for (int i = 1; i <= n; i++) {
        tree->add_card(intervals[i].first, intervals[i].second);
    }
    cin >> m;
    if (c == 1) {
        int q = tree->task_1_query();
        if (q==0) cout << -1 << '\n';
        else cout << n - q << '\n';
       // cout << currently_good << '\n';
        for (int i = 1; i <= m; i++) {
            int id;
            cin >> id;
            int a, b;
            cin >> a >> b;
            tree->remove_card(intervals[id].first, intervals[id].second);
            if (intervals[id].first <= intervals[id].second) {
                currently_good--;
            }
            intervals[id].first = a;
            intervals[id].second = b;
            if (intervals[id].first <= intervals[id].second) {
                currently_good++;
            }
            tree->add_card(intervals[id].first, intervals[id].second);
            int q = tree->task_1_query();
            if (q==0) cout << -1 << '\n';
            else cout << n - q << '\n';
        }
    }
    else {
        cout << tree->task_2_query() << '\n';
        for (int i = 1; i <= m; i++) {
            int id;
            cin >> id;
            int a, b;
            cin >> a >> b;
            tree->remove_card(intervals[id].first, intervals[id].second);
            intervals[id].first = a;
            intervals[id].second = b;
            tree->add_card(intervals[id].first, intervals[id].second);
            cout << tree->task_2_query() << '\n';
        }
    }
}
int main() {
    solve();
}
```
