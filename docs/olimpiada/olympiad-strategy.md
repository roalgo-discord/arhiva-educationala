---
tags:
    - meta
    - sfaturi
    - strategie
---

**Autor**: Ștefan-Cosmin Dăscălescu

!!! example "Cunoștințe necesare"
    - [Cum te pregătești pentru olimpiadă?](https://edu.roalgo.ro/olimpiada/olympiad-prep/)

## Introducere

Te-ai pregătit pentru olimpiadă, rezolvând problemele din anii anteriori de la
OJI, ONI și alte concursuri, ai fost activ pe serverul nostru și ți-ai făcut
prieteni noi, dar vine concursul și întrebarea care se pune este una simplă:

**Cum abordez concursul astfel încât să iau cât mai multe puncte posibile?**

Această întrebare este una complicată și depinde mult de obiectivele tale,
precum și de nivelul tău de cunoștințe, deoarece chiar dacă toată lumea vrea să
obțină punctajul maxim posibil la fiecare concurs, se poate întâmpla ca acest
lucru să fie foarte greu sau chiar imposibil de realizat, fie din cauza
dificultății problemelor, fie din cauza lipsei de experiență la acel nivel sau
din alte cauze.

Pe parcursul acestui articol, vom prezenta anumite scenarii, împreună cu
sfaturile pe care le recomandăm. Acest articol este unul subiectiv și există și
alte strategii care funcționează, dar o mare parte din sfaturi se aplică
oricărui concurent, indiferent de nivel sau experiență.

## Ce trebuie să faci înainte de concurs?

Se spune că drumul spre succes începe încă de dinaintea începerii unui concurs,
iar în zilele noastre, când concurența este una tot mai acerbă, acest lucru este
tot mai adevărat. Aici sunt câteva dintre cele mai importante lucruri care
trebuie să fie făcute pentru a putea fi la potențialul maxim înaintea olimpiadei
sau oricărui alt concurs important (aceste sfaturi pot fi folosite și pentru
alte examene importante sau chiar de-a lungul vieții).

### Odihna înainte de concurs

Un lucru comun tuturor celor care ajung să obțină cele mai bune rezultate
posibile este odihna corespunzătoare. Chiar dacă ați petrecut mult timp lucrând
probleme, învățând algoritmi și tehnici noi, aceste lucruri nu vă vor ajuta la
fel de mult dacă nu aveți un regim de odihnă (și alimentație) corespunzător.
Informația are nevoie de timp pentru a fi asimilată, iar la fel ca în cazul
atleților profesioniști, randamentul maxim vine atunci când vă odihniți cum
trebuie înainte de concurs.

Recomandarea strictă este să dormiți măcar 7h30m înainte de olimpiadă, iar dacă
programul de somn nu este compatibil cu cel specific concursurilor (de regulă,
probele încep la ora $9$ sau $10$), o perioadă de adaptare este mai mult decât
necesară. Un alt lucru important este să evitați lucratul de probleme în ziua de
dinainte de proba de concurs, pentru a fi complet relaxați și detașați de tot ce
înseamnă algoritmică atunci când intrați în sala de concurs.

Chiar dacă pe termen scurt, există și alte soluții care pot ajuta cu rezolvarea
acestei probleme, cea mai sănătoasă opțiune pe termen lung constituie odihna
naturală și un regim corespunzător.

### Interacțiunile de dinainte de concurs

În cele mai multe cazuri, este bine să fii cât mai detașat de ce înseamnă
algoritmică, probleme sau programare înainte de concurs, deoarece discuțiile
despre alte probleme au de cele mai multe ori un efect contrar celui așteptat
(nu vei învăța niciodată o idee nouă cu $30$ de minute înainte de probă, iar
memoria ți se va încărca cu o informație probabil inutilă).

Din experiența personală, cele mai potrivite interacțiuni sunt cele complet
off-topic, iar în lipsa lor, încearcă să eviți expunerea la zgomot inutil (aici
includem și navigarea prin rețelele sociale).

## Abordarea concursului și a problemelor în sine

Ai ajuns la concurs și acum vrei să obții cât mai multe puncte. Deoarece nu
toată lumea este la fel de bine pregătită, vom da sfaturi cât mai generale, dar
și punctuale în anumite situații.

### Citirea problemelor la început

Imediat ce primiți subiectele de concurs la olimpiadă, înainte să scrieți orice
linie de cod, citiți cu atenție **toate** problemele care vi s-au dat. De
preferat, petreceți câteva minute uitându-vă cu atenție peste fiecare dintre
probleme (de recomandat, cel puțin $5$ minute/problemă), iar pentru fiecare
problemă, notați-vă primele idei care vă vin, precum și alte observații pe care
le faceți.

!!! note "Observație"

    Chiar dacă problema este foarte ușoară, este bine să evitați să trageți
    concluzii pripite, deoarece se poate întâmpla să ratați anumite detalii din
    cerința problemei.

După această etapă, care ar trebui să ia $15-20$ minute, ar trebui să aveți o
idee destul de bună legată de dificultatea relativă a problemelor, precum și
tipurile de algoritmi și idei care vor fi aplicate în cele $3$ probleme. În cele
ce urmează, vom vrea să abordăm problemele, de la cea mai ușoară la cea mai
grea.

### Abordarea unei probleme

Presupunând că am ordonat problemele după dificultate, vom vrea să folosim
următorul algoritm aproximativ:

```
cât timp nu ai punctajul maxim
  găsește problema cea mai ușoară ramasă
  încearcă să îți îmbunătățești scorul cât mai mult posibil
  dacă îți va lua prea mult timp, încearcă să obții altfel punctele
```

Evident, în funcție de situație, trebuie să adaptăm anumite condiții, dar în
cele mai multe cazuri, nu vom putea obține punctajul maxim, așa că în lipsa unor
alte stimulente, scopul final este obținerea unui număr cât mai mare de puncte.
De regulă, vom vrea să le obținem rezolvând problemele ușoare și obținând cât
mai multe puncte posibil pe problemele grele.

#### Ideile

Dacă la un moment dat, nu ai idei de niciun fel, începe cu explorarea
punctajelor parțiale (subtaskurile). În multe situații, poți scrie un algoritm
mai încet, dar corect, fiind o opțiune mult mai bună decât un algoritm mai
rapid, dar incorect. Motivul principal fiind acela că un algoritm corect poate
fi ulterior optimizat, aducându-ne mai multe puncte. De asemenea, observațiile
găsite pentru algoritmul mai încet se pot dovedi a fi importante pentru soluția
completă (sau cel puțin o soluție care ne aduce multe puncte).

Presupunând că ai o idee și vrei să o implementezi, este foarte important să ai
ideea clară, deoarece greșelile de implementare pot dura în anumite situații
foarte mult să fie corectate și e mult mai bine să prevenim decât să avem erori
neforțate.

Ulterior, dacă obținem punctele pe care le țintim, felicitări, dar în caz
contrar, trebuie să facem ceva ce chiar dacă nu este ideal, apare la orice
concurs: debuggingul.

#### Debuggingul

!!! note "Observație"

    Pentru mai multe detalii, accesați acest articol
    [aici](https://edu.roalgo.ro/mediu/debugging/),

Mai întâi, e bine să verificăm erorile mici (overflow-uri, erori de scriere și
alte asemenea), iar dacă nu obținem încă punctele, trebuie să începem să ne
gândim la eventualele greșeli mai majore, precum erori de idee sau erori majore
de implementare.

Dacă ne dăm seama prin niște teste că ideea e greșită, cel mai bine este să
regândim anumiți pași ai algoritmului pentru a corecta eroarea.

Dacă eroarea este una de implementare, recomandăm crearea unui generator de
teste care să poată detecta teste pe care soluția voastră obține răspunsuri
greșite, prin compararea cu un program de tip brute-force.

### Rezolvarea situațiilor de impas

Dacă la un moment dat în concurs, observați că scorul vostru este sub
așteptările voastre, un sfat util este să luați o mică pauză (câteva minute,
puteți să vă duceți la toaletă eventual) și să vă relaxați, pentru a aborda
restul concursului fără stresul suplimentar generat de scorul mic pe care îl
aveți până acum.

Concursul poate fi unul greu pentru toată lumea, iar în cazul olimpiadei
județene, un obiectiv pe care îl puteți avea atunci este să vă asigurați mai
întâi punctele pentru pragul minim ($80$ sau $120$ de puncte, în funcție de
clasă), iar mai apoi să faceți progres începând de acolo.

Un alt gând pe care îl puteți avea este faptul că indiferent de rezultat, vor
exista și alte oportunități, iar un concurs eșuat nu este o reflecție a valorii
voastre individuale ca persoane. Olimpiada reprezintă doar un ciclu al vieții
voastre și nu doar un scop în sine.

## Alte aspecte de avut în vedere

Chiar dacă aceste sfaturi nu par atât de importante, foarte mulți concurenți
pierd timp prețios cu lucruri care la prima vedere, nu par importante. Câteva
dintre cele mai frecvente exemple includ:

- Așteptarea unui anumit verdict după o submisie: Coada de evaluare poate fi
  lungă, iar la o medie de $20$ de submisii per concurs și $1$ minut de
  așteptare, puteți pierde până la $10 \%$ din timpul de concurs alocat, ceea ce
  poate face diferența în anumite situații. De asemenea, aceste momente de pauză
  dese pot afecta concentrarea și găsirea ideilor mai dificile. Sfatul pe care
  îl recomandăm este să vă gândiți la o altă problemă sau să verificați idei
  pentru alte probleme.
- Distragerea atenției de către colegii din sală/supraveghetor etc.: inevitabil,
  la un concurs, sunteți în sală cu un număr de colegi de diferite clase,
  fiecare dintre ei având obiceiurile, stilurile lor și alte aspecte (posibil)
  diferite față de ale voastre. Concursul este unul individual și nu are niciun
  sens să vă preocupe ce fac cei din jurul vostru.
- Așteptarea răspunsului la întrebări: La fel ca în cazul cozii de evaluare,
  comisia nu va răspunde la întrebări imediat, deoarece pot fi și alți elevi
  care să aibă întrebări (posibil similare cu a voastră), caz în care pot apărea
  anunțuri generale care pot afecta problemele din concurs.
- Măsurarea timpului: Este bine să țineți o oarecare evidență a timpului rămas
  (în săli, profesorii de regulă hașurează folosind cadrane timpul scurs) pentru
  a vă păstra ritmul pe toată durata probei ($3-5$ ore).

## Ce faci după concurs?

După ce runda s-a terminat, inevitabil vei ajunge să discuți problemele cu
colegii și prietenii tăi, învățând diverse idei și aflând soluții pe care ei
le-au găsit. Din nou, fiecare concurs este unic și puteți folosi aceste
experiente pentru a învăța lecții valoroase, chiar și dacă obțineți punctajul
maxim.

## Concluzii

Chiar dacă succesul este determinat în mare măsură de munca depusă în pregătirea
continuă de-a lungul anilor, aici am prezentat detalii care pot face diferența
în anumite situații, și care în general vă ajută să obțineți cele mai bune
rezultate posibile. Aceste sfaturi nu sunt complete, dar sunt o colecție de
experiențe adunate de mine de-a lungul celor $8$ ani de competiții naționale,
precum și a peste $12$ ani de interacționat cu elevi și studenți după diverse
probe.

## Resurse suplimentare

- [Ghid complet pentru concursurile de informatica -
  infoarena](https://www.infoarena.ro/ghid-complet-pentru-concursurile-de-informatica)
- [Psihologia concursurilor de informatica -
  Algopedia](https://www.algopedia.ro/wiki/index.php/Psihologia_concursurilor_de_informatic%C4%83)
- [Contest strategy - USACO Guide](https://usaco.guide/general/contest-strategy)