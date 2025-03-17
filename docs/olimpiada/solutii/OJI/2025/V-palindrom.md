---
id: OJI-2025-V-palindrom
title: Soluția problemei palindrom (OJI 2025, clasa a V-a)
# problem_id: 2501
authors: [spatarel]
prerequisites:
    - digits-manipulation
tags:
    - OJI
    - clasa V
draft: true
---

## Cerința 1

În continuare vom descrie rezolvarea pentru un singur număr. Pentru rezolvarea
problemei se aplică algoritmul de mai jos în mod repetat, de $N$ ori.

Pentru rezolvarea primei cerințe vom elimina simultan prima și ultima cifră a
numărului cât timp acestea coincid și numărul are cel puțin două cifre. La
final, dacă numărul rămas este 0 sau are o cifră, atunci putem afirma că numărul
inițial era palindrom.

## Cerința 2

Pentru rezolvarea celei de-a doua cerințe, observăm că operația de inserare a
unei cifre în numărul dat și verificarea ulterioară a proprietă ții de palindrom
este echivalentă cu operația de ștergere a unei cifre din numărul dat și
verificarea proprietă ții de palindrom a numărului astfel obținut.

În plus, observăm că în orice număr palindrom putem insera o cifră (în mijlocul
său) astfel încât numărul nou obținut să fie tot palindrom.

Deci, orice număr care respectă prima cerință o respectă și pe a doua.

Pentru a determina eficient care cifră ar trebui ștearsă, vom efectua următorul algoritm:

1. vom elimina simultan prima și ultima cifră a numărului cât timp acestea
   coincid și numărul are cel puțin două cifre;
2. dacă numărul rămas este 0 sau are o cifră, atunci putem spune că răspunsul la
   cerință este afirmativ;
3. altfel vom investiga două cazuri:
    - dacă eliminăm prima cifră;
    - dacă eliminăm ultima cifră;
4. în ambele cazuri, după eliminarea cifrei corespunzătoare, vom repeta pașii
   (1) și (2);
5. dacă la final numărul rămas are mai mult de o cifră, atunci răspunsul la
   cerință este negativ;

## Cerința 3

Pentru rezolvarea celei de-a treia cerințe, observăm că operația de inserare a
două cifre în numărul dat și verificarea ulterioară a proprietății de
palindromicitate este echivalentă cu operația de ștergere a două cifre din
numărul dat și verificarea proprietății de palindromicitate a numărului astfel
obținut. În plus, observăm că în orice număr palindrom putem insera o cifră (în
mijlocul său) astfel încât numărul nou obținut să fie tot palindrom.

Deci, orice număr care respectă a doua cerință o respectă și pe a treia. Pentru
a determina eficient care cifre ar trebui șterse, vom efectua următorul
algoritm:

- pentru ștergerea primei cifre, vom efectua pașii (1), (2) și (3);
- pentru ștergerea celei de-a doua cifre, vom efectua din nou pașii (1), (2) și
  (3);
- pentru determinarea răspunsului, vom efectua iarăși pașii (1), (2) și (5).

Observați că, efectuând de două ori pasul (3), vom ajunge să investigăm 4 scenarii:

1. la prima nepotrivire eliminăm prima cifră iar la a doua nepotrivire eliminăm
   din nou prima cifră;
2. la prima nepotrivire eliminăm prima cifră iar la a doua nepotrivire eliminăm
   a doua cifră;
3. la prima nepotrivire eliminăm a doua cifră iar la a seconda nepotrivire
   eliminăm prima cifră;
4. la prima nepotrivire eliminăm a doua cifră iar la a doua nepotrivire eliminăm
   din nou a doua cifră.

Pentru a evita cazul particular în care nu avem voie să adăugăm cifra 0 la
începutul numărului inițial, atunci când eliminăm ultima cifră trebuie să
verificăm și să ignorăm cazul în care numărul rămas pe care lucrăm este
numărul original și ultima sa cifră este 0.

Complexitatea timp: $\mathcal{O}(N \cdot X)$

## Rezolvare

Mai jos puteți găsi o soluție care ia punctajul maxim.

```cpp

```
