---
id: OJI-2024-VIII-robotron
title: Soluția problemei Robotron (OJI 2024, clasa a VIII-a)
problem_id: 2511
authors: [coman]
prerequisites:
    - simulating-solution
    - stl
tags:
    - OJI
    - clasa VIII
---

Cerința 1: Pentru determinarea valorilor $M$ și $H$, vom folosi un vector de
frecvență. Pentru fiecare ecuson, determinăm echipa din care face parte, luând
ultimele două cifre din acesta. $M$ va fi egal cu numărul de poziții din
vectorul de frecvența pentru care valoarea este diferită de 0, iar $H$ va fi
poziția din vector pentru care frecvența are valoarea maximă.

Cerința 2: Pentru fiecare echipă, precalculăm sume parțiale. Pentru o anumită
echipa $i$, avem $s[j]$ – suma elementelor aflate pe pozițiile $1, 2, \dots, j$.
În această problema, $s[j]$ reprezintă poziția pe care se va afla pionul după ce
va mută al $j$-lea jucător. La calcularea sumelor, trebuie să ținem cont de
faptul că ordinea jucătorilor se permuta circular. Jucătorul care inițial este
al $j$-lea în echipa, va fi în runda $k$ pe poziția $(j + (k − 1) \ mod \ cnt) \
mod \ cnt$, unde $cnt$ este numărul total de membrii din echipa. Pentru fiecare
echipă, simulăm parcurgerea. Având sumele parțiale calculate, putem determina de
câte ori mută toată echipa până când jocul ar fi câștigat de echipa respectivă.
Pentru ultima secvență de mutări, vom caută secvențial care este jucătorul care
va aduce victoria echipei sale. Dintre toate aceste simulări, reținem care este
echipa care va face cele mai puține mutări, și jucătorul care aduce victoria
echipei sale în acest caz. În cazul în care există mai multe echipe care au
număr egal de mutări minime pentru a trece de căsuța de start, se va selecta
prima dintre ele, deoarece echipele mută în ordinea codului planetei lor.

Menționăm că există implementări în care simulăm fiecare mutare. Pentru toate
echipele, determinăm jucătorul care mută pionul. Vom menține pentru fiecare
echipă poziția pionului pe tablă, și aceasta se va actualiza după fiecare
mutare. Repetăm această simulare, până când un jucător trece de căsuța de start,
moment în care se termină jocul. Acest algoritm ar trebui să obțină, în funcție
de implementare, aproximativ 60 de puncte.

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ifstream cin("robotron.in");
    ofstream cout("robotron.out");

    int c, n, l, k;
    cin >> c >> n >> l >> k;

    vector<vector<pair<int, int>>> v(100);
    for (int i = 0; i < n; i++) {
        int e, p;
        cin >> e >> p;
        v[e % 100].push_back({e / 100, p});
    }

    if (c == 1) {
        int mx = 0;
        int cnt = 0;
        for (int i = 0; i <= 99; i++) {
            if (v[i].size() > 0) {
                cnt++;
                if (v[i].size() > v[mx].size()) {
                    mx = i;
                }
            }
        }
        cout << cnt << " " << mx << '\n';
        return 0;
    }
    if (c == 2) {
        k--;
        int winner = -1;
        int rounds = (1 << 30);
        int code = -1;
        for (int i = 0; i <= 99; i++) {
            if (!v[i].size()) {
                continue;
            }
            vector<pair<int, int>> pv;
            for (int j = k % v[i].size(); j < v[i].size(); j++) {
                pv.push_back(v[i][j]);
            }
            for (int j = 0; j < k % v[i].size(); j++) {
                pv.push_back(v[i][j]);
            }
            long long sum = 0;
            for (auto x : pv) {
                sum += x.second;
            }
            int temp_rounds = pv.size() * (l / sum);
            int rem = l % sum;
            int whoo = 0;
            if (rem != 0) {
                for (auto x : pv) {
                    rem -= x.second;
                    temp_rounds++;
                    whoo = x.first;
                    if (rem <= 0) {
                        break;
                    }
                }
            } else {
                whoo = pv.back().first;
            }
            if (temp_rounds < rounds) {
                rounds = temp_rounds;
                winner = i;
                code = whoo;
            }
        }
        cout << winner << " " << code << '\n';
    }
    return 0;
}
```
