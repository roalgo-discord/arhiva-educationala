---
tags:
    - input
    - output
    - implementare
    - parsare
    - optimizare
---

!!! example "Cunoștințe necesare"
    - [Citirea și afișarea datelor](./input-output.md)
    - [Șiruri de caractere](./strings.md)


**Autor**: Ștefan-Cosmin Dăscălescu

## Introducere

Obiectivul fiecărui competitor atunci când rezolvă o problemă este să obțină
cât mai multe puncte folosind un algoritm cât mai eficient din punct de vedere
al timpului de execuție și al memoriei folosite. Deși această abordare este cea
mai bună pentru realizarea acestui obiectiv, uneori restricțiile impuse de
autorii problemelor încurajează folosirea unor metode suplimentare pentru
câștigarea unui timp prețios care poate fi folosit pentru a avea o marjă mai
largă la dispoziție.

Una dintre cele mai populare optimizări de constantă care se poate aplica mai
ales la problemele mai grele constă în citirea cât mai rapidă a datelor de
intrare (precum și afișarea cât mai rapidă a datelor de ieșire, chiar dacă
de regulă inputul este mult mai cuprinzător decât outputul).

În acest articol vom prezenta câteva situații specifice, precum și alte
sfaturi care trebuie avute în vedere.

## Optimizarea citirii și afișării standard

Atunci când citiți și afișați date de intrare și ieșire folosind metoda standard,
aproape în fiecare situație folosiți instrucțiuni de tip ```std::cin``` și ```std::cout```.
Deși acestea sunt instrucțiuni foarte bune și utile, din păcate se pot dovedi
a fi foarte încete atunci când volumul datelor este foarte mare. Astfel, se
impune găsirea unor îmbunătățiri pe care le vom prezenta mai jos.

Prima și cea mai importantă optimizare pe care o vom face este să folosim
următoarele linii pentru a desincroniza streamurile de date din C și C++,
făcând citirea datelor mult mai rapidă (factorul de optimizare este de cel
puțin 2-3 ori, în anumite cazuri fiind chiar și de 5 ori mai rapid).

```cpp
ios_base::sync_with_stdio(false);
cin.tie(NULL);
```

!!! note "Observație"
  Este de remarcat faptul că linia ```cout.tie(NULL);```, deși prezentă în
  foarte multe coduri, inclusiv soluții oficiale, nu face nimic deoarece
  streamul de afișare este deja desincronizat.

Folosind această metodă, preveniți aproape toate tipurile de erori din punct
de vedere al timpului de execuție cauzate de citirea înceată. Totuși, mai putem
face îmbunătățiri în ceea ce privește acest aspect.

## Citirea folosind buffere (fread)

Vom presupune pentru simplitate că atunci când rezolvăm probleme folosind intrarea
și ieșirea standard, folosim instrucțiuni de tip ```std::cin``` și ```std::cout```,
iar atunci când citim datele din fișiere, folosim metode de tip ```std::ifstream```
și ```std::ofstream```.

Deși aceste metode sunt destul de rapide folosind optimizările menționate anterior,
putem obține îmbunătățiri semnificative apelând la citirea unui bloc de
caractere deodată, iar mai apoi să procesăm datele pe măsură ce avem
nevoie de ele, ținând datele în bufere (zone de date mai mari). Avantajul
acestei metode este acela că accesăm streamurile de intrare și ieșire mult
mai rar, astfel evitând una dintre cele mai încete părți ale citirii și
afișării datelor, folosirea bufferelor.

Această metodă este numită colocvial și _parsarea_ datelor, acesta fiind
un nume popularizat de articolele de pe infoarena în care această metodă
a fost descrisă în urmă cu mulți ani.

!!! note "Observație"
  Parsarea este necesară mai ales atunci când avem de-a face cu un șir cu
foarte multe numere, deoarece atunci când citim un șir de caractere, deja
accesăm bufferul de puține ori.

De regulă, se recomandă folosirea unor buffere de lungime puteri ale lui 2,
fiind folosite foarte des lungimi precum 4096 sau 65536. Mai jos puteți găsi
un exemplu de aplicare al acestei metode pentru a citi și afișa un șir de
numere naturale. Adaptarea acestui parser la fișiere se poate face în multe
moduri, o metodă care merge este folosirea unei declarări în stilul C, iar mai
apoi folosirea printf pentru afișarea mai multor valori deodată.

```cpp
--8<-- "cppintro/fast-io/fread.cpp"
```

## Concluzii

Citirea rapidă a datelor este foarte importantă în multe situații pentru a evita
problemele cu limita de timp cauzată de metodele încete de a citi datele. Chiar
dacă în aproape nicio situație nu este nevoie să folosim cele mai rapide metode
de citire a datelor folosind buffere, poate fi util să știți să faceți acest
lucru pentru a câștiga câteve zecimi de secundă în cazul unor probleme cu date
foarte mari.

Totuși, pe măsură ce tot mai multe concursuri apelează la citirea și afișarea
standard, precum și citirea din funcții, această metodă va fi tot mai puțin
relevantă, dar niciodată nu va ieși din uz.

## Resurse suplimentare

- [Significance of ios_base::sync_with_stdio(false); cin.tie(NULL);](https://stackoverflow.com/questions/31162367/significance-of-ios-basesync-with-stdiofalse-cin-tienull)
- [Parsare fișier intrare -
  infoarena](https://www.infoarena.ro/parsare-fisier-intrare)
- [Parsare fișier ieșire -
  infoarena](https://www.infoarena.ro/parsare-fisier-iesire)
- [Parsarea fișierelor și citirea rapidă a datelor în C++](https://infogenius.ro/parsare-cpp/)
- [Citire/scriere rapidă - Algopedia](https://www.algopedia.ro/wiki/index.php/Clasa_a_VII-a_lec%C8%9Bia_22_-_13_feb_2020#Citire/scriere_rapid%C4%83)
- [Fast IO - USACO Guide](https://usaco.guide/general/fast-io?lang=cpp)