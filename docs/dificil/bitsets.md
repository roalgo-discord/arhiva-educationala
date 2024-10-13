---
tags:
    - implementare
    - biti
    - optimizare
---



## Introducere
In **C++**, clasa **bitset** constituie o succesiune de biți, putând fi asociata cu un **vector**, însă numarul de elemente este constant pe parcursul rularii programului. În linii mari, **bitset** nu aduce o contributie mare asupra corectitudinii unui algoritm, fiind folosit de cele mai multe ori doar pentru a face optimizari semnificative asuprea timpului sau memoriei. 

### Sintaxa 
* ```std::bitset``` se regăseste in libraria ```<bitset>``` sau ```<bits/stdc.++h>```.
* linia ```bitset<N> b;``` declara un bitset cu exact $N$ biti, $N$ este constanta, i.e. se specifică explicit valoarea acesteia la declarare.

**Program C++**
```cpp
bitset<10> b;
int main(){
	
	b[0] = 1;
	b[3] = 1;
	b[9] = 1;

	cout << b;
}

```

**Output**
```1000001001```

**Obsevăm că**:
* Elementele sunt indexate de la $0$.
* ```cout << b;``` va afisa toate elementale de la **dreapta la stanga**. 
* Este prezent ```operator[]```.

### Operatori permisi

* ```operator==``` si ```operator!=``` compara continutul cu alt ```bitset```. 
* ```operator[]``` acceseaza valoarea unui bit la o pozitie anume.
* ```operator&=``` operator binar **SI**.
* ```operator|=``` operator binar **SAU**.
* ```operator^=``` operator binar **XOR**.
* ```operator~``` operator binar **NOT**.
* ```operator<<=``` shift pe biti la stanga.
* ```operator>>=``` shift pe biti la dreapta.

**Program C++**
```cpp
bitset<10> b;
int main(){
	
	b[0] = 1;
	b <<= 1;
    	cout << b << '\n';


	b ^= 13;
	cout << b << '\n';
		
	b >>= 100;
	cout << b;
}

```

**Output**
```
0000000010
0000001111
0000000000
```
!!! note Observatie Daca shiftarea, intr-o oricare directie, presupune pentru unele elemente egale cu $1$ sa "iasa" din **bitset**, atunci valoare de $1$ se va pierde permanent.

## ```std::bitset``` in programare competitiva

Operatoriile binari functioneaza la fel ca atunci cand le folosim pe alte tipuri de date cum ar fi ```int```, dar datorita dimensiunilor mari pe care le poate suporta un **bitset**, aceasta vin de cele mai multe ori cu o optimizare cruciala ce consta in gruparea **bitilor** in grupe de cate $32$ elemente, convertirea acestora in **numere intregi**, aplicarea operatiei si inlocuirea numarului in bitset. Cum pe un numar intreg o operatie binara este constanta, putem deduce deci ca complexitatea pentru o astfel de operatie este $O \( \frac{N}{w} \)$.


## Concluzii

## Probleme suplimentare

## Resurse suplimentare

* [Bitset - USACO Guide](https://usaco.guide/plat/bitsets)
* [Bitwise operations 2 — popcount & bitsets - Codeforces](https://codeforces.com/blog/entry/73558)
