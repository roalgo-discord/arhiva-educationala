---
id: OJI-2008-VIII-numar
title: Soluția problemei numar (OJI 2008, clasa a VIII-a)
problem_id: 778
authors: [anita, mnita]
prerequisites:
    - simulating-solution
    - sorting
    - basic-math
    - stl
tags:
    - OJI
    - clasa VIII
---

Daca vreti sa ne ajutati cu acest articol, ne puteti gasi pe [github](https://github.com/roalgo-discord/arhiva-educationala) sau pe [serverul nostru de discord](https://discord.gg/vdDRSmg3fC)

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>

using namespace std;

int main()
{
	ifstream cin("numar.in");
	ofstream cout("numar.out");
	
	int n, m;
	cin >> n >> m;
	
	vector<int> primes(n);
	set<long long> s;
	
	for(int i = 0; i < n; i++)
	{
		cin >> primes[i];
		s.insert(primes[i]);
	}
	
	while(m)
	{
		m--;
		long long val = *s.begin();
		s.erase(val);
		if(m == 0)
		{
			cout << val;
			return 0;
		}
		
		for(int i = 0; i < n; i++)
			s.insert(val * primes[i]);
	}
	
	return 0;
}
```
