---
tags:
    - structuri de date
    - arbori
    - optimizare
---

**Heavy-light decomposition** este o tehnică ce ne ajută să efectuăm query-uri și update-uri într-un timp eficient pe un **arbore**.

## Introducere

Să zicem că avem un arbore $G$ cu $N$ noduri și implicit $N-1$ muchii, iar rădăcina acestuia să fie $1$.

Ideea din spatele algoritmului este de a **sparge arborele în mai multe lanțuri** pentru a atinge rădăcina din orice nod din arbore în timp **logaritmic**. 

Evident, dacă efectuăm această descompunere pe arborele nostru, ne va permite să reducem anumite interogări sau update-uri unice de forma: "calculează ceva pe lanțul care leagă nodul a pe nodul b" în mai multe interogări sau update-uri de forma: "calculează ceva pe segmentul $[l,r]$ din lanțul $K$". 

## Construcția lanțurilor

Pentru început, vom presupune că pentru fiecare nod din $G$ se va efectua același pattern.

Pentru un nod fixat $x$, vom afla pentru fiecare fiu al său dimensiunea subarborelui în care fiul este rădăcină. După ce aflăm dimensiunea fiecărui subarbore, ne gândim astfel: "oare în ce lanț să îl pun pe nodul $x$ astfel încât să beneficiez de timpul logaritmic?".

Știm că funcția logaritmică crește foarte lent, astfel ne este convenabil să construim lanțuri de lungimi cât mai mari, pentru a avea cât mai puține operații de făcut pentru interogări și update-uri. Așadar, pentru fiecare nod $x$, vom alege să continuăm crearea lanțului cu fiul care are cele mai multe noduri în subarbore.
Pentru ceilalți fii al nodului $x$, ei vor fi nodul de start pentru lanțul care o fost format până la aceștia.

Următoarea imagine ilustrează descompunerea unui arbore.

~[paths.png]


## Problema exemplu

## Concluzii

## Probleme suplimentare

## Resurse suplimentare