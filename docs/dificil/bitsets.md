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

#### Program C++
```cpp
bitset<10> b;
int main(){
	
	b[0] = 1;
	b[3] = 1;
	b[9] = 1;

	cout << b;
}

```

#### Output
```1000001001```

*Obsevăm că*:
* Elementele sunt indexate de la $0$.
* ```cout << b;``` va afisa toate elementale de la **dreapta la stanga**. 
* Este prezent operatorul **[]**.


###Operatori permisi

* ```operator==``` si ```operator!=``` compara continutul cu alt ```bitset```. 
* ```operator[]``` acceseaza valoarea unui bit la o pozitie anume.
* Operatori logici: 
	1. ```operator&=``` 
	2. ```operator&=```
	3. ```operator&=```
	4. ```operator&=```
## Problema exemplu

## Concluzii

## Probleme suplimentare

## Resurse suplimentare

* [Bitset - USACO Guide](https://usaco.guide/plat/bitsets)
* [Bitwise operations 2 — popcount & bitsets - Codeforces](https://codeforces.com/blog/entry/73558)
