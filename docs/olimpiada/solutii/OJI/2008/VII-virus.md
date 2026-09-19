---
id: OJI-2008-VII-virus
title: Soluția problemei virus (OJI 2008, clasa a VII-a)
problem_id: 777
authors: [anita, mnita]
prerequisites:
    - sorting
    - greedy
tags:
    - OJI
    - clasa VII
---

Daca vreti sa ne ajutati cu acest articol, ne puteti gasi pe [github](https://github.com/roalgo-discord/arhiva-educationala) sau pe [serverul nostru de discord](https://discord.gg/vdDRSmg3fC)

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 5e3;

pair<int, int> times[MAXN];
vector<pair<int, int> > disjTimes;

ifstream fin("virus.in");
ofstream fout("virus.out");

int main() {
    int n, i, workLongest, breakLongest;

    fin >> n;
    for(i = 0; i < n; i++){
        fin >> times[i].first >> times[i].second;
    }
    sort(times, times + n);

    disjTimes.push_back(times[0]);
    for(i = 1; i < n; i++){
        if(times[i].first <= disjTimes.back().second){
            disjTimes.back().second = max(times[i].second, disjTimes.back().second);
        } else {
            disjTimes.push_back(times[i]);
        }
    }
    
    workLongest = disjTimes[0].second - disjTimes[0].first;
    breakLongest = 0;
    for(i = 1; i < disjTimes.size(); i++){
        workLongest = max(workLongest, disjTimes[i].second - disjTimes[i].first);
        breakLongest = max(breakLongest, disjTimes[i].first - disjTimes[i - 1].second);
    }
    fout << workLongest << " " << breakLongest;
    return 0;
}
```
