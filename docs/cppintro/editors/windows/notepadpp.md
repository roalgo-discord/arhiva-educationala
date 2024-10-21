---
title: "Notepad++"
hide:
  - navigation
  - toc
---

## Instalare 

Pentru a instala Notepad++:

1. Mergem pe site-ul oficial la secțiunea de Downloads:

    [Deschide pagina :material-open-in-new:](https://notepad-plus-plus.org/downloads/){.md-button .md-button--primary }

    Alegem ultima versiune (la momentul scrierii, Notepad++ 8.6.9). Aici este
    link direct către installerul de 64 de biți, pentru conveniența ta:

    [Descarcă Notepad++ 8.6.9 :material-download:](https://github.com/notepad-plus-plus/notepad-plus-plus/releases/download/v8.6.9/npp.8.6.9.Installer.x64.exe){ .md-button .md-button--primary }

2. Rulează installerul. Procesul de instalare este simplu și setările implicite
   sunt de ajuns pentru toată lumea, deci poți da Next în continuare până când
   se termină procesul.

## Configurare

Acum vremea să-l configurăm, pentru că nu ne este prea utilizabil în acest
moment.

1. Fontul implicit, Courier New... nu este prea bun. Pentru a schimba fontul,
   mergem la Setări și apoi la Configurator de stiluri. De acolo, putem modifica
   orice legat de tema curentă. Notepad++ are mai multe teme din care poți
   alege, așa că poți experimenta cu asta. Selectează tema Default
   (stylers.xml), și la stil font alege fontul Cascadia Mono sau Consolas (sau
   alt font monospațiat, dacă ai alte preferințe). Poți crește mărimea fontului
   (eu țin la 12, consider că 10 este o mărime prea mică). După ce ai făcut
   aceste lucruri, bifează Activare globală font și Activare globală mărime
   font. Fă același setări pentru tema DarkModeDefault (sau ce altă temă dorești
   să ai).
2. Acum vom vedea setările din Setări > Preferințe. Un prim lucru pe care îl
   putem face este să avem niște icoane mai moderne. Selectează din Generale
   opțiunea UI fluent umplut: mic (deși poți experimenta cu icoanele).
3. Ca să nu fim orbiți, mergi la Modul întunecat și alege fie Modul întunecat,
   fie Urmarea ferestrelor, care ajustează modul în funcție de setările globale
   din Windows. Poți să personalizezi și culoarea temei, dar "Negru" arată cel
   mai bine, după părerea mea.
4. Implicit, Notepad++ indentează folosind tab-uri. Pentru a schimba acest
   comportament, mergem la Limbaje și alegem Indentează folosind: Caracter(e)
   spațiu. Recomand indentare cu 4 spații (setarea implicită), însă alte valori
   comune includ 2, 3 și 8 (nu recomand ultima opțiune). Atâta timp cât este o
   valoare peste 1, este în regulă.
5. Acum ajustăm autocompletarea (rudimentară în Notepad++, dar există cel
   puțin). Implicit oferă sugestii pentru funcții și cuvinte. Recomand să bifezi
   tot ce se află la autoinserare (fiecare grup de paranteze și ghilimele)
   pentru că în marea majoritate a cazurilor le vei găsi în perechi și
   economisește ceva timp.

După toate aceste schimbări, editorul ar trebui să arate astfel:

<figure markdown="span">
![Fereastra de Notepad++ cu temă întunecată și un fișier C++](./notepadpp/npp-1.png){ loading=lazy }
</figure>

În acest moment, Notepad++ este doar un editor simplu și nu este potrivit
programării în C++, deci mai trebuie să facem configurări. Trebuie să instalăm
niște _module_ înainte. Pentru asta, mergem la Module > Administrare module. De
acolo, selectăm următoarele module:

- AutoSave, pentru a salva automat fișierele;
- BracketsCheck, pentru a verifica dacă am balansat acoladele sau parantezele
  (riscul ar trebui să fie minimizat de autocompletarea parantezelor, dar nu se
  știe);
- CodeAlignment, în caz că vrei să aliniezi codul după semnele de egal
  (opțional, dar drăguț de avut);
- Comment Toggler și CommentWrap pentru comentarii, face lucrul cu acestea mai
  ușor;
- ComparePlus, folosit pentru a compara două fișiere (mai puternic decât să tot
  schimbi între tab-uri pentru a vedea diferența dintre două fișiere);
- Discord Rich Presence, dacă simți nevoia să te lauzi pe Discord că ai
  Notepad++ (nu știu de ce ai face asta);
- MenuIcons, dacă vrei să ai icoane și în meniuri (opțional, dar recomandat);
- **Cel mai important modul**, NppExec, care ne permite să executăm script-uri
  fără să părăsim Notepad++. Cu asta vom compila și executa C++;
- Pentru cei care doresc, există NppOpenAI, ca să-l conectezi la ChatGPT.

După ce ai selectat acele module, apasă butonul de Instalare (dacă totuși ieși
accidental, selecția va rămâne). Notepad++ se va închide pentru a-și putea
instala modulele. Acum pentru a configura fiecare modul. Fiecare setare se află
în Module, sub numele fiecărui modul.

1. Pentru AutoSave, selectăm Notepad++ loses focus (în caz că dai ++alt+tab++)
   și At timed intervals every 10 minutes. Poți configura ultima opțiune să fie
   cât de des vrei tu. Este la alegerea ta dacă vrei să se autosalveze și când
   schimbi tab-ul (File tab changes) sau când închizi programul (Notepad++
   exists).
2. Pentru CodeAlignment, cea mai utilă scurtătură este ++ctrl+shift+equal++,
   care te lasă să aliniezi selecția după ce vrei tu (de obicei o vei folosi
   pentru egaluri sau virgule);
3. Pentru Comment Toggler, poți folosi scurtătura ++ctrl+q++ pentru a comenta
   sau decomenta selecția curentă. Poți explora ce face Comment Wrap și chiar să
   adaugi propriile tale scurtături pentru fiecare funcționalitate;
4. Cel mai complicat pas va fi la NppExec, pentru că acesta va compila
   propriu-zis codul nostru. Du-te la Module > NppExec > Execute NppExec Script
   (alternativ, ++f6++, scurtătură pe care o vei folosi mult) și scrie
   următoarea comandă (voi explica fiecare pas imediat):

    ```batch
    npp_save
    g++ -std=c++20 -O2 "$(FULL_CURRENT_PATH)" -o "$(CURRENT_DIRECTORY)\$(NAME_PART).exe"
    cmd /c start cmd /c "$(CURRENT_DIRECTORY)\$(NAME_PART).exe & pause"
    ```

    1. Prima linie salvează fișierul curent;
    2. A doua linie folosește g++, pe care l-am instalat la secțiunea cu GCC
       (MinGW). Compilează folosind standardul C++20 și optimizat pentru
       performanță. Ia fișierul curent (`calea/catre/nume.cpp`) și creează un
       executabil numit `nume.exe` în directorul curent.
    3. A treia linie pur și simplu pornește un terminal extern, ca să putem
       interacționa cu programul. Din păcate, Windows Defender scanează
       executabilul nostru, deci va îngheța timp de câteva secunde. Poți adăuga
       o excepție din Windows Defender (ca să nu faci 100 de directoare pentru
       fiecare proiect, adaugă tot într-un director și adaugă-l pe ăla ca
       excepție).

    Acum tot ce trebuie să faci este să apeși Save și dă-i numele C++. După
    aceea, poți să apeși secvența ++f6+enter++ ca să compilezi și rulezi codul.

Ai tot ce trebuie pentru a putea compila C++. Nu este o experiență la fel de
bună ca pe alte editoare, din moment ce ai autocompletare rudimentară, dar este
suficient în majoritatea cazurilor dacă știi ce faci. Legat de proiecte, nu prea
ai propriu-zis conceptul ăsta, așa că doar creezi un fișier cu extensia `.cpp`,
eventual și alte fișiere de care ai nevoie, și compilezi direct.

Asta este tot cu configurarea. Poți acum să mergi către următorul articol:

[Mergi la introducere](./../../intro.md){ .md-button .md-button--primary }
