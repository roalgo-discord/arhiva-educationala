---
tags:
    - meta
    - practice
    - concursuri
    - rating
---

**Autor**: Ștefan-Cosmin Dăscălescu

## Introducere

O platformă foarte populară folosită de elevii și studenții din toată lumea pentru a se pregăti mai bine pentru olimpiadele și concursurile de informatică, dar și pentru desăvârșirea cunoștințelor în materie de algoritmi și structuri de date, precum și pentru a-și îmbunătăți abilitățile de rezolvare a problemelor este [Codeforces](https://codeforces.com). O altă platformă similară este [AtCoder](https://atcoder.jp), cu un format similar al concursurilor, dar ne vom concentra pe Codeforces în explicațiile ce urmează. 

Deși concursurile de pe Codeforces sunt diferite ca format față de olimpiade (de regulă, 5-7 probleme în 2-3 ore, de regulă ordonate crescător în funcție de dificultate), problemele de pe acest site sunt foarte apreciate și recomandate de sute de mii de utilizatori la nivel global, fiind cea mai mare platformă de acest fel la nivel mondial. Problemele sunt disponibile în engleză și rusă.

Această platformă este una pe care o recomandăm mai ales după ce aveți oarecare experiență cu problemele de pe Pbinfo și cele mai simple date la concursurile românești de informatică, pentru o provocare în plus și pentru a învăța lucruri noi.

## Formatul problemelor

Problemele sunt algoritmice, nivelul acestora este unul foarte variat, începând de la aplicații foarte simple, similare cu nivelul problemelor de pe siteuri precum Pbinfo și terminând cu probleme foarte dificile, uneori nerezolvate în timpul concursurilor. De regulă, problemele A de la rundele de Div. 3 și Div. 4 sunt cele mai ușoare, unele din cele mai dificile probleme fiind problemele de la rundele de Div. 1, literele E-F sunt cele mai dificile, sau echivalentul lor, problemele G, H sau I de la rundele Div. 1 + Div. 2. 

Deși sunt peste $10 \ 000$ de probleme pe Codeforces, o bună parte dintre ele se vor dovedi a nu fi foarte relevante pentru contextul fiecărui cititor al acestei arhive, din cauza dificultății prea scăzute/ridicate a acestora sau din cauza faptului că stilul problemelor nu se mai regăsește la fel de mult în problemele care se dau în prezent pe Codeforcees.

Spre deosebire de problemele cu care sunteți obișnuiți de la olimpiade sau de pe Pbinfo, verdictele care pot apărea pe Codeforces sunt diferite. Cele mai frecvent întâlnite sunt acestea: 

* Accepted: Ați rezolvat problema corect, echivalent punctajului de $100$ de puncte de la olimpiade. În timpul concursului puteți găsi verdictul Pretests passed, similar în scop cu Accepted. 
* Wrong answer on test x: Ați rezolvat corect problema pentru primele $x-1$ teste, dar la testul $x$, răspunsul este greșit. 
* Time limit exceeded on test $x$: Ați rezolvat corect problema pentru primele $x-1$ teste, dar la testul $x$, soluția depășește timpul de execuție alocat pentru problemă (de regulă, 1-2 secunde).
* Memory limit exceeded on test $x$: Ați rezolvat corect problema pentru primele $x-1$ teste, dar la testul $x$, soluția depășește memoria alocată pentru problemă (de regulă, 256 MB). 
* Idleness limit exceeded on test $x$: În cazul problemelor interactive, ați rezolvat corect problema pentru primele $x-1$ teste, dar la testul $x$, soluția nu se oprește din rulat.  

!!! note "Observație"
    În preajma anului nou, în spirit de sărbătoare, verdictul Accepted este înlocuit cu Happy New Year!


## Competițiile și sistemul de rating

### Diviziile și ratingurile de pe Codeforces

În funcție de nivelul dovedit la concursurile de pe Codeforces, nivel măsurat prin rating, concurenții pot avea următoarele culori și titluri:

| Titlu                     | Culoare | Rating    | Divizie |
|---------------------------|---------|-----------|---------|
| Newbie                    | <span style="color: gray">■</span>        | 0-1199    | 4, 3, 2 |
| Pupil                     | <span style="color: green">■</span>       | 1200-1399 | 4, 3, 2 |
| Specialist                | <span style="color: cyan">■</span>       | 1400-1599 | 3, 2    |
| Expert                    | <span style="color: blue">■</span>       | 1600-1899 | 2       |
| Candidate Master          | <span style="color: purple">■</span>       | 1900-2099 | 2, 1    |
| Master                    | <span style="color: orange">■</span>       | 2100-2299 | 1       |
| International Master      | <span style="color: darkorange">■</span>       | 2300-2399 | 1       |
| Grandmaster               | <span style="color: red">■</span>       | 2400-2599 | 1       |
| International Grandmaster | <span style="color: darkred">■</span>       | 2600-2999 | 1       |
| Legendary Grandmaster     | <span style="color: black">■</span> <span style="color: darkred">■</span>      | 3000+     | 1       |

!!! note "Observație"
    Un singur român a atins rankul de legendary grandmaster, [Costin Andrei Oncescu](https://codeforces.com/profile/geniucos), acesta participând și [de 3 ori la IOI](https://stats.ioinformatics.org/people/6003).

!!! note "Server internațional pentru cei cu rating 1900+"
    Există un server neoficial de Discord care cuprinde cea mai mare comunitate de utilizatori care sunt în Div. 1, [AC](https://discord.gg/RFfkprBt7r), accesul la discuții fiind disponibil celor cu rating peste $1900$, ei fiind creatorii botului TLE, pe care îl avem și noi.
    
Inițial, un concurent are rating $0$, dar după $6$ concursuri în care ratingul este unul provizoriu, acesta devine unul conform cu abilitățile dovedite de concurent, mai multe detalli sunt [aici](https://codeforces.com/blog/entry/77890). Sistemul prin care se acordă rating este unul de tip ELO, în care se măsoară performanța fiecărui concurent comparat cu performanța medie care era așteptată de la acesta.

În funcție de ratingul pe care un concurent îl are, acesta poate participa la următoarele tipuri de competiții în mod oficial:

* Div. 4: Cele mai ușoare competiții, participarea oficială este limitată celor cu rating sub 1400. 
* Div. 3: Competiții ușoare, care sunt mai grele decât Div. 4, participarea oficială este limitată celor cu rating sub 1600. 
* Div. 2: Competițiile standard ale Codeforces, participarea oficială este limitată celor cu rating sub 1900 (atunci când se ține în paralel o rundă de Div. 1) sau 2100 (când se ține doar runda de Div. 2, în această categorie intrând și rundele Educational). 
* Div. 1: Cele mai dificile competiții, participarea oficială este limitată celor cu rating cel puțin egal cu 1900. 
* Div. 1 + Div. 2: Runde speciale, care combină problemele de la Div. 1 și Div. 2, fiind deschise tuturor concurenților.

Pentru a ți se schimba ratingul după o competiție, va trebui să participi oficial, iar dacă performezi mai bine decât ratingul tău ar indica, acesta va crește. În caz contrar, acesta va scădea. Cu cât ratingul este mai mare, cu atât trebuie să ai rezultate mai bune pentru a le păstra, iar competițiile mai slabe pot cauza o scădere mai accentuată a ratingului.

!!! note "Atenție"
    Nu vei obține mereu un rating mai mare decât ai avut la o rundă anterioară, dar asta este ceva ce nu trebuie să te demoralizeze, deoarece e o parte normală din viața fiecărui competitor. Ce poți face în schimb este să înveți din greșeli și la competițiile viitoare, să încerci să le eviți. Mai multe detalii ulterior în articol. 

Există și alte competiții pe Codeforces, precum Kotlin Heroes, runde de ICPC și multe alte competiții neoficiale, dar ne vom rezuma la competițiile oficiale. 

### Tipurile competițiilor

Competițiile de pe Codeforces sunt de două tipuri, după cum urmează:

1. Runde în care fiecare problemă are un punctaj diferit, tot mai mare în funcție de nivelul de dificultate al problemei (Aici se încadrează rundele de Div. 1, Div. 2 și Div. 1 + Div. 2), iar în funcție de timpul necesar pentru rezolvarea problemei și numărul de submisii greșite, punctajul obținut pentru fiecare problemă scade. 
2. Runde în care fiecare problemă are același punctaj, iar în funcție de timpul necesar pentru rezolvarea problemei și numărul de submisii greșite, penalizarea obținută crește (Aici se încadrează rundele educaționale, rundele Div. 3 și rundele Div. 4).

!!! note "Observație"
    Indiferent de tipul rundei, se recomandă rezolvarea problemelor în ordine, începând de la prima problemă. Uneori, dacă apar dificultăți la rezolvarea problemei curente, se recomandă citirea următoarei probleme pentru a avea o șansă la obținerea unor puncte în plus.

De regulă, competițiile durează între $120$ și $150$ minute ($2$ ore - $2.5$ ore), rareori durând $180$ minute în cazul unor runde mai dificile și încep vara în jurul orei 17:35 sau iarna în jurul 16:35, cu mici excepții.

În cazul rundelor menționate în prima categorie, soluțiile vor fi testate doar pe o parte din testele finale ale problemei (_preteste_), iar verdictul de Accepted va fi înlocuit în timpul rundei cu verdictul Pretests passed. 

În cadrul rundelor menționate în cea de-a doua categorie, există o secțiune după concurs de $12$ ore, în care orice test care este folosit pentru a da hack la o soluție care obținuse Accepted în timpul concursului va fi folosit pentru a evalua toate celelalte soluții, la finalul acestei etape. 

Indiferent de rundă, are loc o secțiune în care toate testele pregătite de autori sunt folosite pentru a evalua soluțiile, cele care iau Accepted după această secțiune sunt cele care vor conta la scorul fiecărui concurent. 

Cu câteva zile înainte de începutul fiecărei runde, autorii vor anunța competiția, anunț care va apărea pe prima pagină a Codeforces. La finalul competiției, autorii vor publica soluțiile problemelor folosind un alt blog, care va fi adăugat la anunțul concursului.

## Stilul problemelor de pe Codeforces

Deși problemele care apar pe Codeforces cuprind noțiuni din toată programarea competitivă, inclusiv noțiuni care nu apar la olimpiadele de informatică sau în general, la concursuri, se pot observa cu precădere preferințe care trebuie avute în vedere pentru a maximiza performanțele la concursuri. 

### Problemele ad-hoc

Foarte multe probleme, mai ales cele date în prima parte a rundelor, nu necesită un algoritm sau vreo metodă de programare pentru a rezolva problema, fiind îndeajuns doar observații de bază și observarea unor relații matematice simple, majoritatea acestor probleme fiind fie probleme matematice, fie probleme care se bazează pe observații Greedy foarte simple sau construcții elementare. 

Deși aceste teme se regăsesc și ulterior în competiții, ele apar foarte mult mai ales în primele probleme din runde, spre deosebire de olimpiadele din România și alte țări, unde problemele tind să fie mai algoritmice și tehnice. 

### Implementări simple și clare

Deși acest lucru este important indiferent de problema pe care vreți să o rezolvați, se poate observa faptul că multe din soluțiile pe care autorii le au în gând pentru probleme, mai ales când vine vorba de cele care apar la începutul competițiilor sunt foarte simple, aceasta poate fi o capcană în care mulți concurenți cad, încercând să aibă soluții mai complicate decât trebuie, fie că e vorba de implementări care sunt prea lungi sau abordări mai eficiente decât trebuie. 

### Tendințele concursurilor

De-a lungul anilor, au existat diverse mode (meta-uri) în ceea ce privește tipurile de probleme care apar în competiții, ceea ce necesită o oarecare perioadă de adaptare, meta-uri care devin o necesitate pentru a introduce idei, perspective și în unele cazuri, metode noi de a rezolva problemele. 

Totuși, în ciuda acestui fapt, o mare parte din sfaturile de aici vor putea fi aplicate și peste mulți ani, chiar dacă stilul problemelor va fi diferit până atunci.

## Cum ne putem antrena pentru Codeforces

În primul rând, cel mai bun antrenament constă în concursurile care apar pe platformă, de regulă cam $6-10$ pe lună. Deși nu toate sunt potrivite pentru toți concurenții, există mereu câteva runde în fiecare lună care merită date. De regulă, recomandăm rundele de Div. 3 și Div. 4 pentru elevii sub $1400$ rating, rundele de Div. 2 pot fi date dacă ai cel puțin $1400$ rating și evident, rundele de Div. 1 odată ce sunteți eligibili pentru ele. 


!!! note "Concursuri virtuale - simulări"
    Chiar dacă nu aveți cum să ajungeți la runde sau vreți să simulați runde ce au avut loc în trecut, puteți face asta folosind feature-ul Virtual Participation ce apare dacă intrați [aici](https://codeforces.com/contests). 

!!! note "Upsolving"
    O altă recomandare pe care o avem este ca după fiecare concurs pe care îl dați, să rezolvați 1-2 probleme care nu ați reușit să le rezolvați în timpul concursului, împreună cu tot ce ține de algoritmii sau tehnicile care trebuie știute pentru rezolvarea acelor probleme. În specialitate, această parte a competițiilor de informatică se numește upsolving. 

## Botul TLE

[Botul TLE](https://codeforces.com/blog/entry/68927) este cel mai complet bot de Discord pe care îl puteți folosi pentru a vă antrena pentru Codeforces, acesta fiind disponibil gratuit pe serverul nostru, [RoAlgo](https://discord.gg/roalgo). Acesta vă dă posibilitatea să vă urmăriți progresul de pe Codeforces pe discord, să lucrați probleme apropiate de nivelul vostru și să vă recomande concursuri, probleme și multe alte facilități, precum dueluri sau alte turnee. 

În timpul concursului, în limita funcționalității serverelor de pe Codeforces, puteți vedea și în timp real care ar fi schimbarea prevăzută a ratingului la acel moment, dar nu recomandăm folosirea acestui clasament, deoarece e mult mai bine să vă concentrați pe problemele pe care le aveți de rezolvat. 

!!! note "Observație"
    În general, e bine ca în timpul concursurilor să vă concentrați strict pe ce aveți de făcut și nu pe ce rezultate au prietenii, colegii, rivalii voștri etc. Concursurile trebuie să le priviți mai întâi ca o luptă cu voi înșiși și nu cu ceilalți din jurul vostru, pentru că oricând veți găsi lucruri care trebuie îmbunătățite. 

Dintre cele mai populare comenzi ale botului, vom enumăra următoarele:

* `;handle identify [numele_vostru]` - această comandă vă permite să asociați contul vostru de Codeforces cu baza noastră de date, după ce trimiteți o sursă care dă eroare de compilare la problema care vi se asignează.

* `;gitgud` - această comandă vă permite să rezolvați o problemă cu un rating egal cu ratingul vostru, dacă o rezolvați puteți scrie `;gotgud` și primiți puncte în clasamentul lunar pe care îl avem pe server. Singura particularitate este că dacă nu vreți să rezolvați o anumită problemă, trebuie să așteptați două ore până când veți folosi comanda din nou. 

!!! note "Observație"
    Dacă vreți să rezolvați probleme mai grele sau mai ușoare, puteți scrie `;gitgud x`, unde $x$ este un multiplu de $100$ reprezentând diferența față de ratingul vostru curent. De asemenea, puteți vedea toate variantele de a folosi această comandă pe server.

* `;gimme` - această comandă vă permite să rezolvați o problemă cu un rating egal cu ratingul vostru, fără a fi constrânși de condițiile specifice comenzii gitgud. Din nou, aveți multe variante și moduri de a folosi această comandă. 

* `;duel` - Această categorie de comenzi permite dueluri între doi sau mai mulți membri de pe server care au contul asociat cu baza noastră de date, sub diferite condiții. 

* `;plot comanda` - Această categorie de comenzi permite vizionarea diverselor grafice care se ocupă de prelucrarea datelor statistice din concursuri și datele concurenților, inclusiv în ceea ce privește partea de exersare a problemelor. 

* `;help` - Această comandă arată toate modurile de a folosi botul nostru, începând de la cele descrise aici și terminând cu multe alte comenzi care arată date statistice, sugestii pentru probleme dar și grafice care arată evoluția ratingului, a performanțelor și multe altele.

## Ce trebuie evitat?

În primul rând, trișatul la aceste competiții nu este permis în nicio formă și cu niciun scop, acesta vă poate cauza conturile să fie excluse din concursuri sau de pe site, precum și pierderea reputației voastre ca concurenți și în funcție de gravitatea situației, se poate ajunge la pedepse pe server. 

Trișatul constă fie în discutarea problemelor cu alți concurenți în timpul rundei sau copierea de soluții, în mod voit sau nevoit, inclusiv dacă discutați idei, dați spoilere sau alte asemenea în timpul concursului.

!!! note "Observație"
    Totuși, dacă găsiți o problemă similară cu cea din concurs care s-a dat anterior și modificați soluția acelei probleme, nu constituie fraudă. 

### Greșeli comune în timpul rundelor

O eroare frecvent făcută în timpul concursurilor constă în folosirea unor instrucțiuni precum memset pe vectorii statici (resetează memoria de fiecare dată, iar în cazul Codeforces, unde problemele sunt de obicei multi-test, poate cauza limită de timp depășită când numărul de teste este mare).

O altă eroare frecvent exploatată de hackeri constă în folosirea unor structuri de date precum unordered_map, din cauza coliziunilor ce pot avea loc ca urmare a faptului că toate valorile ar folosi același hash. 

Este de asemenea foarte important să evitați submisiile date la grabă sau care au ca scop doar ca să testeze evitarea unor anumite verdicte, ideal este să trimiteți soluții care au o șansă să ia Accepted (pe scurt, nu are niciun sens să trimiteți un brut neoptimizat, cel mai probabil luați Time Limit Exceeded).

În general, este bine să aveți codul foarte bine organizat pentru a evita erori subtile sau de implementare. De asemenea, testele sunt mult mai puternice, deci posibilele abordări care exploatează testele slabe au șanse mult mai mici de succes pe Codeforces.

### Conturi multiple

Folosirea de conturi multiple în timpul concursurilor este strict interzisă, la fel ca și folosirea activă a mai multor conturi în același timp. 

Totuși, în unele situații, această practică este acceptată tacit de comunitate, foarte mulți utilizatori având aceste conturi multiple pentru diverse scopuri, printre care încercări de a câștiga runde sau de a obține mai multă încredere în sine, condiția fiind aceea de a folosi un singur cont în fiecare rundă. 

## Concluzii

Codeforces este o platformă foarte importantă pentru programarea competitivă, fiind practic cea mai mare comunitate de acest fel la nivel mondial. Zecile de concursuri ce au loc în fiecare an, împreună cu blogurile care sunt scrise des și care prezintă diverse tehnici, algoritmi și structuri de date prezentate și aici (veți găsi de multe ori resurse de pe Codeforces recomandate de noi) fiind esențiale pentru progresul vostru ca algoritmiști. 

Respectarea competiției este esențială și vă va ajuta să deveniți mai buni în acest mod, iar în timp, puteți folosi această platformă pentru a vă completa abilitățile de rezolvitori de probleme și de programatori. Chiar dacă nu poate suplini sau înlocui în niciun fel lucratul pentru olimpiadă, Codeforces, AtCoder și alte platforme de acest fel sunt potrivite pentru concursuri rapide, diferite ca stil care vă ajută să vă adaptați mai bine la provocările pe care le aveți. 

Mult succes la competițiile de aici!