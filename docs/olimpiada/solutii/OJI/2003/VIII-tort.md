---
id: OJI-2003-VIII-tort
title: Soluția problemei tort (OJI 2003, clasa a VIII-a)
problem_id: 720
authors: []
prerequisites:
    - divisibility
tags:
    - OJI
    - clasa VIII
---

Daca vreti sa ne ajutati cu acest articol, ne puteti gasi pe [github](https://github.com/roalgo-discord/arhiva-educationala) sau pe [serverul nostru de discord](https://discord.gg/vdDRSmg3fC)

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
	ifstream cin("tort.in");
	ofstream cout("tort.out");
	
	int n, m;
	cin >> n >> m;
	
	int val = __gcd(n, m);
	
	cout << (n * m) / (val * val) << " " << val << '\n';
	return 0;
}
```
