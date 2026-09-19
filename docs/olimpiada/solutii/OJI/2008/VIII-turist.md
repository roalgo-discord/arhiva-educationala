---
id: OJI-2008-VIII-turist
title: Soluția problemei turist (OJI 2008, clasa a VIII-a)
problem_id: 779
authors: [cpopescu]
prerequisites:
    - simulating-solution
    - divisibility
tags:
    - OJI
    - clasa VIII
---

Daca vreti sa ne ajutati cu acest articol, ne puteti gasi pe [github](https://github.com/roalgo-discord/arhiva-educationala) sau pe [serverul nostru de discord](https://discord.gg/vdDRSmg3fC)

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <iostream>
#include <fstream>
#include <vector>
#include <map>
#include <algorithm>
#include <numeric>

using namespace std;

// Function to calculate the GCD of two numbers
int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}

int main() {
    ifstream infile("turist.in");
    ofstream outfile("turist.out");

    int M, N, l, c, k;
    infile >> M >> N >> l >> c >> k;

    vector<pair<int, int>> cities(k);
    for (int i = 0; i < k; ++i) {
        infile >> cities[i].first >> cities[i].second;
    }

    map<pair<int, int>, int> direction_count;

    for (const auto& city : cities) {
        int dx = city.first - l;
        int dy = city.second - c;
        if (dx == 0 && dy == 0) continue; // Skip the starting city itself
        int g = gcd(abs(dx), abs(dy));
        dx /= g;
        dy /= g;
        direction_count[{dx, dy}]++;
    }

    int max_cities = 0;
    for (const auto& entry : direction_count) {
        max_cities = max(max_cities, entry.second);
    }

    outfile << max_cities << endl; // No need to add 1 since we are counting cities only
    return 0;
}
```
