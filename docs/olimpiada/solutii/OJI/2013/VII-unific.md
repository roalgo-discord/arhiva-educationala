---
id: OJI-2013-VII-unific
title: Soluția problemei unific (OJI 2013, clasa a VII-a)
problem_id: 835
authors: [nodea]
prerequisites:
    - frequency-arrays
    - greedy
tags:
    - OJI
    - clasa VII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2013/07/unific.txt).

<div class="editorial-text" markdown>

```text
Solutie unific		- prof. Eugen Nodea
			Colegiul National "Tudor Vladimirescu", Tg-Jiu


Solutia propusa analizeaza secvential numerele inca din citirea din fisier.

a)
Pentru realizarea primei cerinta se construieste vectorul caracteristic al
cifrelor care apar in scrierea celor N numere naturale din sir.

b)
Trebuie avut in vedere ca prin unificarea lui A[i] cu A[i+1], numarul nou obtinut in A[i]
poate genera la randul lui posibile unificari cu numerele anterior determinate A[i-1],A[i-2],...

    Citeste a[1]
    i = 1,
    Cat timp Not Eof() Executa
        Citeste xa - valoarea curenta
        Daca comun(a[i], xa)
            Atunci
                a[i] = unifica (a[i],xa);

		//verificam posibile unificari
                Cat timp (comun(a[i],a[i-1]) && i>1) Executa
                    a[i-1] = unific(a[i-1],a[i])
                    i--;
                Sf. cat timp
            Altfel
                a[++i] = xa
        Sf. daca
    Sf. cat timp

Un caz aparte il reprezinta numerele care contin cifra 0.

O solutie brute-force care elimina prin deplasare elementele (A[i])i=1,N
obtine cel mult 50p.
```

</div>

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;
 
using ll = long long;
#define pb push_back
 
const string FILE_NAME = "unific";
const int MAX_N = 1e5, NUM_CIF = 10;
 
int freq[NUM_CIF], f1[NUM_CIF], f2[NUM_CIF];
int cif[50];
ll num[MAX_N + 5];
 
void computeFreq (int frecv[], ll nr) {
	do {
		frecv[nr % 10]++;
		nr /= 10;
	} while (nr > 0);
}
 
void computeNotAppear (ll nr, int &pnt, ll &ans) {
	int c, i;
	
	do {
		c = nr % 10;
		if (f1[c] == 0 || f2[c] == 0) {
			cif[pnt++] = c;
		}
		nr /= 10;
	} while (nr > 0);
    
    do {
        pnt--;
    } while (pnt > 0 && cif[pnt] == 0);
	
	for (i = pnt; i >= 0; i--) {
		ans = ans * 10 + cif[i];
	}
}
 
bool canUnific (ll a, ll b) {
	int i;
	
	/* resetez frecventa */
	for (i = 0; i < NUM_CIF; i++) {
		f1[i] = f2[i] = 0;
	}
	
	/* calculez frecventele */
	computeFreq(f1, a);
	computeFreq(f2, b);
	
	for (i = 0; i < NUM_CIF; i++) {
		if (f1[i] > 0 && f2[i] > 0) {
			return true;
		}
	}
	
	return false;
}
 
pair<int, ll> unific (ll a, ll b) {
	int idx, pnt;
	ll ans;
	
	ans = 0;
	computeNotAppear(a, (idx = 0), ans);
	computeNotAppear(b, (pnt = 0), ans);
	return {idx + pnt + 2, ans};
}
 
int main() {
    #ifndef LOCAL
        ifstream cin(FILE_NAME + ".in");
        ofstream cout(FILE_NAME + ".out");
    #endif
 
    ios_base::sync_with_stdio(false);
    cin.tie(0);
	
	int n, i, pnt, max_frecv, max_cif;
	pair<int, ll> val;
	
	cin >> n >> num[0];
	
	/* calculez frecventa */
	computeFreq(freq, num[0]);
	
	pnt = 1;
	for (i = 1; i < n; i++) {
		cin >> num[pnt];
		
		/* calculez frecventa */
		computeFreq(freq, num[pnt]);
		
		/* unificare */
		while (pnt > 0 && canUnific(num[pnt], num[pnt - 1])) {
			val = unific(num[pnt - 1], num[pnt]);
			
			/* numarul de cifre */
			pnt--;
			if (val.first > 0) {
				num[pnt] = val.second;
			} else {
				pnt--;
			}
		} 
		pnt++;
	}
	
	max_frecv = max_cif = -1;
	for (i = 0; i < NUM_CIF; i++) {
		if (freq[i] > max_frecv) {
			max_frecv = freq[i];
			max_cif = i;
		}
	}
	
	cout << max_cif << '\n';
	
	cout << pnt << '\n';
	if (pnt > 0) {
		for (i = 0; i < pnt; i++) {
			cout << num[i] << ' ';
		}
	}
    return 0;
}
```
