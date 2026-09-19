---
id: OJI-2021-XI-XII-dreptunghi
title: Soluția problemei dreptunghi (OJI 2021, clasele XI-XII)
problem_id: 60
authors: [zoltan]
prerequisites:
    - intro-combinatorics
    - tree-1
tags:
    - OJI
    - clasa XI-XII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2021/11-12.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2021/11-12.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2021/11-12.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: redstonegamer22 (kilonova)
#include <bits/stdc++.h>

using namespace std;

#define int long long

struct Taietura {
	char tip; // fie 'V' de la vertical sau 'H' de la orizontal
	          // tipul mai poate fi si '*' daca suntem intr-o frunza fara fii
	vector<int> coord; // coordonata de taiere
	vector<Taietura*> fii; // indicii subarborilor

	Taietura() {
		tip = 'N'; // de la Null
		coord = {}; // vectorul gol
		fii = {}; // vectorul gol
	}

	string to_string() {
		stringstream ss;
		output_to_string(ss);
		return ss.str();
	}

	void output_to_string(stringstream& ss) {
		ss << "{";
		ss << tip;
		if(tip != '*') {
			ss << ",";
			ss << coord.size() << ":(";
			for(auto coord : coord) {
				ss << coord;
				ss << ",";
			}
			ss << ")";
		}
		for(auto fiu : fii) {
			fiu->output_to_string(ss);
			ss << ",";
		}
		ss << "}";
	}
};

Taietura* construiesteTaietura(stringstream& codificare) {
	// un stringstream este un mod de a deschide un string asa cum am deschide un fisier
	// din care vrem sa citim

	Taietura* t = new Taietura();

	char tip; codificare >> tip;

	if(tip == '*') {
		t->tip = '*';
		return t;
	}

	t->tip = tip;

	int coord; codificare >> coord;
	
	t->coord.push_back(coord);

	t->fii.push_back(construiesteTaietura(codificare));
	t->fii.push_back(construiesteTaietura(codificare));

	return t;
}

int numar_frunze(Taietura* t) {
	if(t->tip == '*') {
		return 1;
	}

	int ret = 0;
	for(auto fiu : t->fii) {
		ret += numar_frunze(fiu);
	}

	return ret;
}

pair<int, int> coord_maxime(Taietura *t, int x_current, int y_current) {
	#ifdef LOCAL
		cerr << "t: " << t->tip << endl;
		if(t->tip != '*') {
			cerr << "coord: ";
			for(auto coord : t->coord) {
				cerr << coord << " ";
			}
			cerr << endl;
		}
		cerr << "x_current: " << x_current << " y_current: " << y_current << endl;
		cerr << endl;
	#endif // LOCAL

	if(t->tip == '*') {
		return {x_current, y_current};
	}

	int x_max = x_current;
	int y_max = y_current;

	// fii[0], coord[0], fii[1]
	// fii[0] se rezolva recursiv cu acelasi punct de start ca t
	// apoi coord[0] se adauga la x_current sau y_current in functie de tip
	// apoi se rezolva recursiv fii[1] cu noul punct de start

	for(int i = 0; i < t->fii.size(); i++) {
		auto ret = coord_maxime(t->fii[i], x_current, y_current);
		if( i < t->coord.size() ) {
			if(t->tip == 'H') {
				x_current += t->coord[i];
			} else {
				y_current += t->coord[i];
			}
		}

		x_max = max(x_max, ret.first);
		y_max = max(y_max, ret.second);
	}

	return {x_max, y_max};
}

// Observatie! Daca eu am o taietura de tip 'H' care are fiul stang tot de tip 'H'
// Pot sa combin cele doua noduri! Adica sa fac un singur nod de tip 'H' cu 2 coordonate

// H2H1***
// {H2, {H1, *, *}, *}
// {H(1, 1), *, *, *}
// {H1, *, {H1, *, *}}

vector<int> add_scalar(vector<int> v, int scalar) {
	for(auto &e : v) e += scalar;
	return v;
}

template < typename T >
vector<T> append_vector(vector<T> v1, vector<T> v2) {
	for(auto e : v2) v1.push_back(e);
	return v1;
}

int vector_sum(vector<int> v) {
	int ret = 0;
	for(auto e : v) ret += e;
	return ret;
}

Taietura* simplificare(Taietura* t) {
	if(t->tip == '*') {
		return t;
	}

	// Si mai important, mai intai ar fi frumos sa simplific stanga si dreapta
	assert(t->fii.size() == 2);
	assert(t->coord.size() == 1);
	t->fii[0] = simplificare(t->fii[0]);
	t->fii[1] = simplificare(t->fii[1]);

	// Regula 1! Daca am un nod de tip 'X' care are fiul stang tot de tip 'X'
	// Pot sa le unesc coordonatele

	{
		if(t->tip == t->fii[0]->tip) {
			int suma_coord = vector_sum(t->fii[0]->coord);
			int new_coord = t->coord[0] - suma_coord;

			t->coord[0] = new_coord;
			t->coord = append_vector(t->fii[0]->coord, t->coord);
			t->fii = append_vector(t->fii[0]->fii, {t->fii[1]});
		}
	}

	// Regula 2! Daca am un nod de tip 'X' care are fiul drept tot de tip 'X'
	// Pot sa le unesc coordonatele si fii

	{
		Taietura* fiu_dreapta = t->fii.back();
		if(t->tip == fiu_dreapta->tip) {
			t->coord = append_vector(t->coord, fiu_dreapta->coord);
			t->fii.pop_back(); // scot fiul dreapta curent si il inlocuiesc cu fii lui
			t->fii = append_vector(t->fii, fiu_dreapta->fii);
		}
	}

	return t;
}

void minim_lexicografic(Taietura* t, stringstream& codificare_out) {
	// Presupunem ca t a fost deja simplificat

	if(t->tip == '*') {
		codificare_out << "*";
		return;
	}

	for(int i = 0; i < t->fii.size(); i++) {
		if(i < t->coord.size()) {
			codificare_out << t->tip << t->coord[i];
		}
		minim_lexicografic(t->fii[i], codificare_out);
	}

	return;
}

const int mod = 1e9 + 7;

int invmod(int b) {
	// return x^(mod-2) % mod folosind exponentiere rapida
	int e = mod-2;
	int ret = 1;

	while(e) {
		if(e%2) {
			ret = (1LL * ret * b) % mod;
		}
		b = (1LL * b * b) % mod;
	
		e /= 2;
	}

	return ret;
}
int combinari(int n, int k) {
	// return n! / k!(n-k)! % mod
	int ret = 1;
	for(int i = n; i > n-k; i--) {
		ret = (1LL * ret * i) % mod;
	}
	for(int i = 2; i <= k; i++) {
		ret = (1LL * ret * invmod(i)) % mod;
	}
	return ret;
} 
int catalan(int n) {
	// return C(2n, n) / (n+1) % mod
	int ret = combinari(2*n, n);
	ret = (1LL * ret * invmod(n+1)) % mod;
	return ret;
}

int numar_codificari_echivalente(Taietura* t) {
	if(t->tip == '*') {
		return 1;
	}

	int ret = 1;

	for(int i = 0; i < t->fii.size(); i++) {
		ret = (1LL * ret * numar_codificari_echivalente(t->fii[i])) % mod;
	}

	// Daca avem n taieturi de acelasi tip in vectorul coord
	// (n == coord.size())
	// Atunci numarul de moduri = catalan(n)

	int n = t->coord.size();
	ret = (1LL * ret * catalan(n)) % mod;

	return ret;
}

int32_t main() {
	int p; cin >> p;
	assert(p == 1 || p == 2 || p == 3 || p == 4);

	string codificare_str;
	cin >> codificare_str;

	stringstream codificare(codificare_str);

	Taietura* t = construiesteTaietura(codificare);
	t = simplificare(t);
	#ifdef LOCAL
		cerr << t->to_string() << endl;
	#endif // LOCAL

	if(p == 1) {
		cout << numar_frunze(t) << endl;
	}
	if(p == 2) {
		auto ret = coord_maxime(t, 0, 0);
		cout << ret.first + 1 << " " << ret.second + 1 << endl;
	}
	if(p == 3) {
		cout << numar_codificari_echivalente(t) << endl;
	}
	if(p == 4) {
		stringstream codificare_out;
		minim_lexicografic(t, codificare_out);
		cout << codificare_out.str() << endl;
	}
}
```
