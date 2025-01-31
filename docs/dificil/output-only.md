---
tags:
    - output only
---

**Autor**: Ștefan-Cosmin Dăscălescu

!!! example "Cunoștințe necesare"
    - [Algoritmi randomizați](./random-algorithms.md)
    - [Abordarea problemelor interactive](./interactive.md)

## Introducere

La olimpiadele de informatică, deși apar mult mai rar față de problemele
de tip _batch_ sau chiar și problemele interactive, problemele output-only
și communication se regăsesc în anumite olimpiade de informatică,
împreună cu aplicațiile lor specifice.

La fel ca la problemele interactive, avem de-a face cu un stil specific, în
care trebuie să folosim informația dată în enunț pentru a găsi optimizări,
de regulă bazate pe abordări de tip brute-force, euristici, uneori chiar și
abordări randomizate, care să ne ducă la răspunsuri cât mai bune sau optime.

De asemenea, aceste probleme testează la maxim creativitatea concurenților,
regăsindu-se la concursurile de cel mai înalt nivel, precum IOI, CEOI, JOI.

## Probleme output-only

Deși acest tip de probleme nu apare prea des la concursuri,
totuși în ultimii ani au început să apară tot mai des aceste
tipuri de probleme, cel mai notabil exemplu fiind IOI 2017 Nowruz.

Aceste tipuri de probleme, fiind complet diferite față de celelalte,
necesită o abordare specială. Câteva din cele mai utile sfaturi
pentru aceste tipuri de probleme sunt următoarele:

- Aceste probleme nu au în general soluții optime și rapide.
- Trebuie găsit un echilibru între acuratețe și viteza programului.
- Studiați formula de scor și datele de intrare cu atenție,
iar pentru cazurile mici, rezolvarea de mână poate fi foarte utilă.
- Obținerea scorurilor parțiale este foarte ușoară și importantă.
- Abordări precum greedy, brute force și algoritmi
probabilistici/aproximativi sunt foarte populare pentru aceste probleme.
- E foarte important ca în timp ce lăsați programul să ruleze timp de
acele câteva minute bune, să vă gândiți la celelalte probleme pentru
a nu pierde timp de implementare și de gândire aiurea.

## Probleme communication (two-step)

Pentru aceste probleme, trebuie scrise două programe care de multe ori
se bazează pe codificarea/decodificarea unor date de intrare care să
permită celor două programe să interacționeze între ele respectând
limite stricte în ceea ce privește cantitatea de informație transmisă,
deci se impune transmiterea cât mai eficientă pentru al doilea program
a informațiilor pe care primul program le primește și le calculează.

Deși nu există foarte multe probleme de acest gen, ce se poate remarca
la ele este faptul că de multe ori, e bine să începem cu restricții mai
relaxate și să ajungem încet-încet la soluție. Totuși, problemele de acest
gen tind să fie mai dificile și mai degrabă ceva ce se regăsesc mai des
la seniori decât la juniori. Dintre cele mai bune moduri de a aborda
problema voi enumera următoarele.

- Folosirea ideilor de la alte probleme rezolvate poate ajuta.
- De multe ori, dacă problema nu e chiar ușoară, obținerea unui punctaj
parțial și revenirea la problemă după obținerea punctajelor mai bune
la celelalte probleme poate fi o strategie rezonabilă.
- Reprezentările binare, folosirea diverselor operații matematice
sau gruparea valorilor în diverse moduri de a le cripta sunt
foarte utile la acest tip de probleme.

[Aici puteți găsi exemple de probleme explicate](https://usaco.guide/adv/interactive?lang=cpp#communication-problems).

## Concluzii

Problemele de tip output only și communication desăvârșesc lista de probleme
ce pot apărea în concursurile de informatică, acestea fiind cele mai rare
tipuri de probleme întâlnite la concursurile de programare și nu numai.

## Probleme suplimentare

- [JOI 2017 Broken Device](https://oj.uz/problem/view/JOI17_broken_device)
- [Lot 2022 Seniori Registers](https://kilonova.ro/problems/233)
- [IOI 2017 Nowruz](https://oj.uz/problem/view/IOI17_nowruz)
- [Balkan 2011 cmp](https://oj.uz/problem/view/balkan11_cmp)
- [IATI 2020 PF](https://kilonova.ro/problems/660)
- [CEOI 2014 Question](https://oj.uz/problem/view/CEOI14_question_grader)
- [IOI 2019 Data Transfer](https://oj.uz/problem/view/IOI19_transfer)
- [IOI 2012 Last Supper](https://oj.uz/problem/view/IOI12_supper)
- [Lot 2019 Seniori Bribe](https://kilonova.ro/problems/1928)
- [Probleme output only de pe kilonova](https://kilonova.ro/tags/365)

## Resurse suplimentare

- [Two Way Tasks](https://mamnoonsiam.github.io/files/notes/communication-tasks/inprogress-0.pdf)
- [Personal view to output-only problem in IOI](https://codeforces.com/blog/entry/53626)
- [Interactive and Communication Problems - USACO Guide](https://usaco.guide/adv/interactive)
- [Interactive, output only & Communication Task - HKOI](https://assets.hkoi.org/training2017/nbt.pdf)