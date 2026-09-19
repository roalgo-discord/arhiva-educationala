---
id: ONI-2026-XI-XII-eprubete
title: Soluția problemei eprubete (ONI 2026, clasele XI-XII)
problem_id: 4277
authors: []
prerequisites:
    - ad-hoc
tags:
    - ONI
    - clasa XI-XII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/ONI%20%28national%20olympiad%29/2026/11-12.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/ONI%20%28national%20olympiad%29/2026/11-12.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/ONI%20%28national%20olympiad%29/2026/11-12.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: FFTPeOJI (kilonova)

#include <bits/stdc++.h>
#include <cassert>
using namespace std;
ifstream cin_("eprubete.in");
ofstream cout_("eprubete.out");
#define cin cin_
#define cout cout_
vector<int> capacities;
vector<vector<int>> need;
vector<long long> cost_for_one_drop;
vector<long long> cost_for_filling;
long long solve_query(long long current_tube, long long capacity_of_current_tube_left, long long current_time_left) {
    long long t = capacity_of_current_tube_left;
    for (auto x : need[current_tube]) {
        t = min(1LL * capacities[x], t);
    }
    //IDEE: vreau sa vad intr-o rafala cat imi pot scade din capacitatea curenta a current_tube, t-ul este de fapt un bottleneck
    //de ce e asta te intrebi ? e destul de simplu, eu pot scoate, cel mult cat mai am de scos din eprubeta curenta, dar trebuie sa scot o valoare astfel incat
    //sa nu-mi traga dintr-o eprubeta o cantitate mai mare comparativ cu capacitatea ei
    //Observatie: eliminarea nu se face gradual, ci in "rafale" de la stanga la dreapta, o rafala va dura evident
    long long round_length = t * (cost_for_one_drop[current_tube] - 1) + t; // cat ma costa sa-mi reumplu prefixul dupa o "rafala" + costul de transfer al picaturilor
    long long how_many_full_rounds = capacity_of_current_tube_left / t;
    long long position;
    if (current_time_left < round_length * how_many_full_rounds) {
        //position, cat timp a mai ramas?
        position = current_time_left % round_length;
    }
    else {
        //aici asta reprezinta cazul cu current_time_left == round_length * how_many_full_rounds, de ce? pentru ca daca ar fi > atunci inseamna ca mi-as fi completat deja toata eprubeta si asta nu merge, caci daca da as fi ajuns la un alt prefix
        current_time_left -= round_length * how_many_full_rounds; //scad timpul care a durat sa-mi fac toate rundele
        t = capacity_of_current_tube_left % t; //mi-am facut toate rundele full, acum o sa mai ramana o mica parte pe care o pot face foarte rapid, caci nu mai am bottleneck-ul de capacitate, cum partea ramasa < minim asupra capacitatilor la toti copiii
        round_length = t * (cost_for_one_drop[current_tube] - 1) + t; //reatribui round_length dupa ce am recalculat t
        position = current_time_left;
    }
    //sa ne gandim cum se executa acest proces, va arata cam asa [0, 1, 2 ... t - 1 picuram in current_tube pana cand se goleste ceva][t, t + 1 ... t * (cost_for_one_drop[i] - 1) pentru a-mi reumple pentru inca o etapa, pana cand sunt toate full]
    //acum sa ne amintim ce reprezinta position? Dupa ce am facut toate aceste ritualuri complete si mi-au luat o perioada de timp, in ce etapa sunt? Acum picura in eprubeta curenta, da? Pai atunci stiu raspunsul evident, daca nu trebuie sa intru in
    //al doilea interval
    if (position < t) {
        return current_tube;
    }
    position -= t;
    //scad partea in care am picurat;
    for (auto x : need[current_tube]) {
        long long len = t * cost_for_one_drop[x]; // cat dureaza sa reumplu doar eprubeta asta? pai trebuie sa reumplu t picaturi si costul il am in cost_for_one_drop[x]
        //acum avem doua optiuni: imi termina procesul asta, si pot sa inspectez un alt proces sau worst_case scenario trebuie sa vad mai in detaliu cum merge procesul de refill la o eprubeta de care depind
        if (position < len) {
            return solve_query(x, t, position);
        }
        position -= len;
    }
    //acum poate nu am fost destul de clar ce inseamna position, asadar voi reitera
    //dupa ce fac toate procesele de lungime maxima imi va mai ramane un proces care nu e complet si eu in procesul asta vreau sa vad exact ce se intampla, fie am noroc si sunt in partea in care umplu eprubeta curenta sau reumplu o alta eprubeta si trebuie sa vad cum arata procesul intermediar
    return -1;

}
void init() {
    int n;
    cin >> n;
    capacities.assign(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        cin >> capacities[i];
    }
    cost_for_one_drop.assign(n + 1, 0);
    for (int i = 1; i <= 5; i++) {
        cost_for_one_drop[i] = 1 << (i - 1);
    }
    need.assign(n + 1, vector<int>{});
    for (int i = 2; i <= 5; i++) {
       for (int j = 1; j < i; j++) {
           need[i].push_back(j);
       }
    }
    for (int i = 6; i <= n; i++) {
        int u;
        for (int p = 1; p <= 4; p++) {
            cin >> u;
            need[i].push_back(u);
        }
    }
    for (int i = 6; i <= n; i++) {
        for (auto x : need[i]) {
            cost_for_one_drop[i] += cost_for_one_drop[x];
        }
        cost_for_one_drop[i]++;
    }
    cost_for_filling.assign(n + 1, 0LL);
    for (int i = 1; i <= n; i++) {
        cost_for_filling[i] = min((long long) 2'000'000'000'000'000'000, 1LL * capacities[i] * cost_for_one_drop[i] + 1LL * cost_for_filling[i - 1]);
    }
    long long q;
    cin >> q;
    for (int i = 1; i <= q; i++) {
        long long time;
        cin >> time;
        assert(time <= 1e18 + 5);
        long long sum = 0;
        for (int p = 1; p <= n; p++) {
            if (cost_for_filling[p] >= time) {
                cout << solve_query(p, capacities[p], time - cost_for_filling[p - 1] - 1) << '\n';
                break;
            }
        }
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    init();
}
```
