---
id: OJI-2002-XI-XII-urgenta
title: Soluția problemei urgenta (OJI 2002, clasele XI-XII)
problem_id: 57
authors: []
prerequisites:
    - dsu
    - graphs
tags:
    - OJI
    - clasa XI-XII
---

Daca vreti sa ne ajutati cu acest articol, ne puteti gasi pe [github](https://github.com/roalgo-discord/arhiva-educationala) sau pe [serverul nostru de discord](https://discord.gg/vdDRSmg3fC)

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: adimiclaus15 (kilonova)
#include <bits/stdc++.h>
using namespace std;

//pornim de la un graf fara nicio muchie (un graf cu n componente conexe) si adaugam una cate una
//in ordine crescatoare dupa cost pana cand obtinem k componente conexe
//muchiile care nu au fost adaugate sunt cele sterse si corespund solutiei problemei

ifstream f("urgenta.in");
ofstream g("urgenta.out");

struct muchie {
    int x, y, cost;
};

muchie a[32385];
int h[256], p[256];

bool cmp(muchie m1, muchie m2) {
    return m1.cost < m2.cost;
}

void Union(int x, int y) {
    if(h[x] > h[y]) {
        p[y] = x;
    } 
    else {
        if(h[x] < h[y]) {
            p[x] = y;
        } 
        else {
            p[y] = x;
            h[x]++;
        }
    }
}

int Find(int x) {
    int r = x;
    while(r != p[r]) {
        r = p[r];
    }
    int y = x;
    while(y != r) {
        int t = p[y];
        p[y] = r;
        y = t;
    }
    return r;
}


int main() {
    int n, m, k;
    f >> n >> m >> k;
    for(int i = 1; i <= m; i++) {
        f >> a[i].x >> a[i].y >> a[i].cost;
    }
    sort(a + 1, a + m + 1, cmp);
    for(int i = 1; i <= n; i++) {
        h[i] = 1;
        p[i] = i;
    }
    //initial avem n componente
    int nrc = n;
    vector<muchie> sol;
    int sum = 0;
    for(int i = 1; i <= m; i++) {
        int p = Find(a[i].x);
        int q = Find(a[i].y);
        //daca se leaga 2 componente diferite
        if(p != q) {
            //daca avem mai mult de k componente atunci trebuie sa punem muchia in graf
            
            if(nrc > k) {
                nrc--;
                Union(p, q);
            } 
            else {
                //altfel o adaugam la solutie
                sum += a[i].cost;
                sol.push_back(a[i]);
            }
        } 
        else {
            //daca muchia leaga 2 noduri din aceeasi componenta atunci
            //nu are rost sa o pastram in graf (o vom sterge)
            sum += a[i].cost;
            sol.push_back(a[i]);
        }
    }
    g << sum << '\n';
    g << sol.size() << '\n';
    for(auto it : sol) {
        g << it.x << ' ' << it.y << '\n';
    }
    return 0;
}
```
