---
id: OJI-2007-VII-ceas
title: Soluția problemei ceas (OJI 2007, clasa a VII-a)
problem_id: 764
authors: [marinel]
prerequisites:
    - simulating-solution
    - basic-math
tags:
    - OJI
    - clasa VII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2007/07/ceas.txt).

<div class="editorial-text" markdown>

```text
CEAS - solutie

Voi retine configuratia ceasului intr-un tablou bidimensional C[4][8]
cu 4 linii si 8 coloane, in care voi retine doar valori binare 0 (pentru
caractere spatiu sau 'x' citite) sau 1 (pentru caracter 'o' citit).

Timpul citit t il pastrez sub forma restului impartirii la 8640000 deoarece
sunt 8640000 secunde intr-o zi iar fiecare configuratie a ceasului se
repeta o data pe zi.

In etapa a doua calculez cele 8 cifre zecimale reprezentate pe ecran,
prin conversie din baza 2 in baza 10, apoi determin ora sub forma
h:m:s.ss, iar cu relatia

  Ora_start := h*360000+m*6000+s*100+ss

determin timpul initial exprimat in sutimi de secunda.

Timpul care trebuie reprezentat il determin printr-o simpla adunare,
avand insa grija sa raman in intervalul a 24 ore

  Ora_final := Ora_start+t;
  Ora_final := Ora_final MOD 8640000

dupa care determin noile valori pentru h, m, s si ss.

  h := Ora_final DIV 360000
  Ora_final := Ora_final MOD 360000
  m := Ora_final DIV 6000
  Ora_final := Ora_final MOD 6000
  s := Ora_final DIV 100
  ss := Ora_final MOD 100

Din acestea determin cele 8 cifre care trebuie reprezentate pe ecranul
ceasului binar, apoi le convertesc in baza 2 in acelasi tablou C, care
este in final scris in fisierul de iesire tinandu-se cont de spatiile care
trebuie reprezentate (coloanele 1, 3, 5) si de valorile 0 si 1 din
tabloul C.
```

</div>

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

const int NUMLIN = 4, NUMCOL = 8;

ifstream fin("ceas.in");
ofstream fout("ceas.out");

int ceas[NUMLIN][NUMCOL], digit[NUMCOL];

int main() {    
    int lin, col, time, hour, minutes, seconds, hundredthsOfASecond, convertedTime, newTime;
    char ch;

    for(lin = 0; lin < NUMLIN; lin++){
        for(col = 0; col < NUMCOL; col++){
            fin.get(ch);

            // Pentru ch == 'x' sau ch == ' ', matricea va avea deja valoarea setata cu 0 (initiala toata matricea este preintializata cu 0)
            if(ch == 'o'){
                ceas[lin][col] = 1;
            }
        }
        fin.get(ch); // '\n' character
    }

    fin >> time;

    time = time % (24 * 60 * 60 * 100); // A day has 24 hours = (24 * 60) minutes = (24 * 60 * 60) seconds = (24 * 60 * 60 * 100) hund of seconds; 
                                  //             1 hour = 60 mins;    1 min = 60 secs;            1 second = 100 hund of seconds
    for(col = 0; col < NUMCOL; col++){ // Converting from binary to digits (numbers)
        for(lin = 0; lin < NUMLIN; lin++){
            digit[col] = (digit[col] << 1) + ceas[lin][col];
        }
    }

    // Initial time: Hours, Minutes, Seconds, and HundrethsOfASecond
    hour = digit[0] * 10 + digit[1];
    minutes = digit[2] * 10 + digit[3];
    seconds = digit[4] * 10 + digit[5];
    hundredthsOfASecond = digit[6] * 10 + digit[7];

    // Converting that time into hundreths of a second
    convertedTime = hundredthsOfASecond + 100 * seconds + (100 * 60) * minutes + (100 * 60 * 60) * hour;
    newTime = (convertedTime + time) % (24 * 60 * 60 * 100); // Adding the given time

    // And now, transforming from hundreths of a second, to Hours, Minutes, Seconds, and HundrethsOfASecond.
    // And adding the values to the corresponding slots in the digit[] vector;
    hour = newTime / (100 * 60 * 60);
    digit[0] = hour / 10;
    digit[1] = hour % 10;
    newTime %= (100 * 60 * 60);

    minutes = newTime / (100 * 60);
    digit[2] = minutes / 10;
    digit[3] = minutes % 10;
    newTime %= (100 * 60);

    seconds = newTime / 100;
    digit[4] = seconds / 10;
    digit[5] = seconds % 10;

    hundredthsOfASecond = newTime % 100;
    digit[6] = hundredthsOfASecond / 10;
    digit[7] = hundredthsOfASecond % 10;

    // Transforming those numbers back into binary
    for(col = 0; col < NUMCOL; col++){
        for(lin = NUMLIN - 1; lin >= 0; lin--){
            ceas[lin][col] = digit[col] % 2;
            digit[col] >>= 1;
        }
    }

    for(lin = 0; lin < NUMLIN; lin++){
        for(col = 0; col < NUMCOL; col++){
            // Prima coloana are nevoie doar de 2 leduri => [0][0] = [1][0] = ' '
            // Coloanele 3 si 5 au nevoie doar de 3 leduri => [0][2] = [0][4] = ' '
            if( (lin == 0 && (col <= 4 && col % 2 == 0)) || (lin == 1 && col == 0) ){
                fout << ' ';
            } else {
                fout << (ceas[lin][col] == 0 ? 'x' : 'o');
            }
        }
        fout << '\n';
    }
    return 0;   
}
```
