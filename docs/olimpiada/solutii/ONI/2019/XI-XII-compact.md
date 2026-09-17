---
id: ONI-2019-XI-XII-compact
title: Soluția problemei compact (ONI 2019, clasele XI-XII)
problem_id: 12
authors: []
prerequisites:
    - segment-trees
    - dsu
tags:
    - ONI
    - clasa XI-XII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/ONI%20%28national%20olympiad%29/2019/11-12/compact.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/ONI%20%28national%20olympiad%29/2019/11-12/compact.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/ONI%20%28national%20olympiad%29/2019/11-12/compact.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp

// credits: FFTPeOJI (kilonova)

#include <bits/stdc++.h>
using namespace std;
ifstream fin("compact.in");
ofstream fout("compact.out");
#define cin fin
#define cout fout
// arbore de intervale, implementare generica
struct aint {
    struct Node {
        int minn, maxx;
        Node operator+(const Node &x) const {
            Node y;
            y.minn = min(x.minn, minn);
            y.maxx = max(x.maxx, maxx);
            return y;
        }
        // operator overloading, echivalent cu o functie de combine, dar mult mai elegant
        Node() {
            minn = 1e9;
            maxx = -1e9;
        }
        Node(int val) {

            minn = val;
            maxx = val;
        }
    };
    vector<Node> tree;
    int n;
    void build(int node, int l, int r, const vector<int> &a) {
        if (l == r) {
            tree[node] = a[l];
            return;
        }
        int mid = (l + r) / 2;
        build(node * 2, l, mid, a);
        build(node * 2 + 1, mid + 1, r, a);
        tree[node] = tree[node * 2] + tree[node * 2 + 1];
    }
    Node query(int node, int l, int r, int ql, int qr) {
        if (r < ql || qr < l) {
            return Node();
        }
        if (ql <= l && r <= qr) {
            return tree[node];
        }
        int mid = (l + r) / 2;
        return query(node * 2, l, mid, ql, qr) + query(node * 2 + 1, mid + 1, r, ql, qr);
    }
    aint(const vector<int> &a) {
        n = a.size() - 1; // vectorul e 1 indexat, deci
        tree.clear();
        tree.resize(4 * n + 5);
        build(1, 1, n, a);
    }
    int max_query(int ql, int qr) { return query(1, 1, n, ql, qr).maxx; }
    int min_query(int ql, int qr) { return query(1, 1, n, ql, qr).minn; }
};
void solve() {
    int n, m;
    cin >> n >> m;
    vector<int> v(n + 1, 0), fv(m + 1, 0);
    for (int i = 1; i <= n; i++) {
        cin >> v[i];
        fv[v[i]]++;
    }
    for (int i = 1; i <= m; i++) {
        fv[i] += fv[i - 1];
    }
    auto fv_query = [&](int l, int r) { return fv[r] - ((l > 0) ? fv[l - 1] : 0); };
    // ok, hai sa analizam ce trebuie sa aiba o subsecventa ca sa fie valida, da? Am urmatoarele restrictii:
    // pentru o valoare, am nevoie ca in aceasi subsecventa sa fie toate elementele cu aceeasi valoare,
    // asadar subsecventa mea [st, dr] trebuie sa aiba indicii st <= minim peste toate cele mai din stanga aparitii pentru fiecare indicie, dr >= maxim peste toate cele mai din dreapta aparitii, dar si ca toate elemente din subsecventa apartin intervalului [a_min, a_max]. Hai sa ne setam pentru valoarea de pe indicele 1 prima constrangere de tip aparitii valoare egala. Hai sa dam un query pe acest interval si sa determinam maximul si minimul pe interval, acum trb sa-mi extind din nou in functie
    // de constrangerile de valoare egala pe tot intervalul de valori cuprins in segment si ideea e ca tot fac asta pana cand mi se formeaza un segment valid. Acum la momentul cand capatul curent st, dr al segmentului meu st <= constrangeri aparitii stanga valoare si dr >= aparitii dreapta valoare ma pot opri si sa-mi formez un nou segment

    // construim trei arbori de intervale de tip min-max, in primul rand imi trebuie unul pe vectorul last[valoare] -> cea mai din stanga aparitie a valorii
    // inca unul pe vectorul first[val] si workflow-ul e asa
    vector<int> last(m + 1, 0), first(m + 1, 0);
    for (int i = 1; i <= n; i++) {
        last[v[i]] = i;
    }
    for (int i = n; i >= 1; i--) {
        first[v[i]] = i;
    }
    aint over_values(v), over_first(first), over_last(last);
    vector<int> for_right_which_is_left(n + 1, 0); // pentru capatul dreapta fixat care este capatul stanga in care recursez la reconstructie
    for (int i = 1; i <= n;) {
        int first_appearance = first[v[i]], last_appearance = last[v[i]];     // prima, respectiv ultima aparitie a valorii de la indicele i. Vor reprezenta primul tip de constrangere, cea de tipul aparitii valori egale
        int minim = over_values.min_query(first_appearance, last_appearance); // imi calculez pe prima constrangere minimul pe interval
        int maxim = over_values.max_query(first_appearance, last_appearance); // imi calculez pe prima constrangere maximul pe interval
        // pe aceste valori evident se vor mai genera niste noi constrangeri de tip cea mai din stanga si dreapta aparitie astea vor fi, practic, de unde tot construim pana cand, in sfarsit, ajungem la un interval echilibrat
        int left = over_first.min_query(minim, maxim);
        int right = over_last.max_query(minim, maxim);
        // partea frumoasa este ca aceste doua linii rezolva toata problema, in trei moduri diferite:
        // toate elementele din intervalul [minim, maxim] apartin intervalului? De ce? Exista trei cazuri, fie o valoare si toate aparitiile sale apar in interval caz in care nu va afecta left si right, fie o valoare apartine, dar nu si toate aparitiile sale apartin subsecventei, caz in care se vor propaga in left si right, ultimul caz este cel in care valoarea nu apartine deloc intervalului, dar treaba este ca oricum dam query pe tot segmentul, deci acele valori oricum vor contribui la
        // extinderea capetelor si nu vor scapa.
        while (left < first_appearance || right > last_appearance) {
            // cat timp nu am conditia pentru a-mi echilibra intervalul
            first_appearance = left;
            last_appearance = right;
            //// constrangerile stanga dreapta devin constrangeri de tip aparitie aceeasi valoare
            minim = over_values.min_query(first_appearance, last_appearance);
            maxim = over_values.max_query(first_appearance, last_appearance);
            left = over_first.min_query(minim, maxim);
            right = over_last.max_query(minim, maxim);
        }
        for_right_which_is_left[right] = left - 1;
        i = right + 1;
        // mi - am setat capatul drept, acum trec la urmatorul stang, spre a forma segmente DISJUNCTE
    }
    // ideea aici, e ca mereu pentru fiecare valoare imi si construieste solutia minim lexicografica, caci aparent solutia cu numar maxim de intervale este unica, nu sunt totusi sigur de ce este asa
    stack<int> q;
    for (int i = n; i != 0; i = for_right_which_is_left[i]) {
        q.emplace(i);
    }
    cout << q.size() << '\n';
    while (!q.empty()) {
        cout << q.top() << ' ';
        q.pop();
    }
}
int main() { 
    solve(); 
}
```
