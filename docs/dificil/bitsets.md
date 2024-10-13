---
tags:
    - implementare
    - biti
    - optimizare
---



## Introducere
In **C++**, clasa **bitset** constituie o succesiune de biți, putând fi asociată cu un **vector**, însă numărul de elemente este constant pe parcursul rulării programului. În linii mari, **bitset** nu aduce o contribuție mare asupra corectitudinii unui algoritm, sau nu reprezintă o tehnică  propriu-zisă, fiind folosit de cele mai multe ori doar pentru a face optimizări semnificative asupra timpului sau memoriei. 

### Sintaxă
* ```std::bitset``` se regăsește in librăriile```<bitset>``` sau ```<bits/stdc.++h>```.
* Linia ```bitset<N> b;``` declară un bitset cu exact $N$ biți, $N$ este constantă, i.e. se specifică explicit valoarea acesteia la declarare.
* De asemenenea putem declara un **bitset** care să conțină biții unui număr: ```bitset<10> b(13)```.

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
* ```cout << b;``` va afișa toate elementale de la **dreapta la stanga**. 
* Este prezent ```operator[]```.

### Operatori permiși

* ```operator==``` și ```operator!=``` compară conținutul cu alt ```bitset```. 
* ```operator[]``` acceseazp valoarea unui bit la o poziție anume.
* ```operator&=``` operator binar **ȘI**.
* ```operator|=``` operator binar **SAU**.
* ```operator^=``` operator binar **XOR**.
* ```operator~``` operator binar **NOT**.
* ```operator<<=``` shift pe biți la stanga.
* ```operator>>=``` shift pe biți la dreapta.

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
!!! note "Observație"
	Dacă shiftarea, într-o oarecare direcție, presupune pentru unele elemente egale cu $1$ să "iasă" din **bitset**, atunci valoare de $1$ se va pierde permanent.

### Funcții permise

* ```_Find_first()``` returnează prima poziție a unui bit setat.
* ```_Find_next(int pos)``` returnează următorul bit setat după poz, iar în cazul în care nu există va returna lungimea **bitsetului**
* ```.count()``` returnează numarul de biți setați.
* ```.reset()``` resetează toți biții la $0$.
* ```.flip(int pos)``` $b[pos]$ devine $b[pos] \oplus 1$, i.e. schimbă bitul $pos$ din $0$ în $1$ și invers.
* ```.to_string()``` va converti **bitsetul** într-un **string**.
* ```.to_ulong()``` va converti **bitsetul** într-un ```unsigned long```.
* ```.to_ullong()``` va converti **bitsetul** într-un ```unsigned long long```.

**Program C++**
```cpp
bitset<10> b;
int main(){
	
	b[3] = 1;
    	cout << b._Find_next(0) << '\n';

    	b.flip(0);
    	cout << b.to_string() << '\n';
    
    	b = 13;
    	cout << b._Find_first() << '\n';
    	cout << b << '\n';

    	cout << b.to_ullong();
}

```

**Output**
```
3
0000001001
0
0000001101
13
```
!!! note "Observație"
	La fel cum putem declara ```bitset<N> b(val)```, la fel de bine putem atribui ```b = val```, dar în ambele cazuri  se vor copia doar primii $N$ biți.

## ```std::bitset``` in programare competitivă

Operațiile binare funcționează la fel ca atunci când le folosim pe alte tipuri de date cum ar fi ```int```, dar datorită dimensiunilor mari pe care le poate suporta un **bitset**, acestea vin de cele mai multe ori cu o optimizare crucială ce constă în gruparea **biților** în grupe de câte $32$ elemente, convertirea acestora în **int**, aplicarea operației și înlocuirea numărului în bitset. Cum pe un număr întreg o operație binară este constantă, putem deduce deci că complexitatea pentru o astfel de operație este  $\ \ \large{O} \biggl( \frac{N}{w} \biggr)$ .


## Concluzii

## Probleme suplimentare

## Resurse suplimentare

* [Bitset - USACO Guide](https://usaco.guide/plat/bitsets)
* [Bitwise operations 2 — popcount & bitsets - Codeforces](https://codeforces.com/blog/entry/73558)
