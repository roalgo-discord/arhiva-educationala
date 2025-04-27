---
id: roadmap
authors: [stefdasca]
tags:
    - meta
    - sfaturi
    - pas cu pas
---

## Introducere

În ultimii ani, au apărut foarte multe resurse care permit învățarea
algoritmilor și structurilor de date într-un mod complet fără prea multe
probleme. Totuși, o mare problemă care încă există în prezent este lipsa unei
structuri clare care să permită înțelegerea acestor noțiuni, adaptată la
cerințele sistemului educațional din România și a diverselor niveluri, mai ales
când vine vorba de olimpiadă și de concursurile de informatică.

Chiar dacă programele școlare, fie că e vorba de programele cadru sau programele
claselor de la olimpiadă sunt un pas important făcut în special în ultimii ani,
totuși încă nu există o ordine clară în care aceste noțiuni sunt discutate, ci
doar o listă a noțiunilor care trebuie parcurse la un anumit nivel, fără a ține
cont de dificultatea relativă a acestora.

În acest articol, vom prezenta ordinea pe care o propunem pentru învățarea
acestor noțiuni, acesta fiind un roadmap pe care îl recomandăm tuturor
pasionaților de algoritmi și structuri de date, și nu numai.

Cu alte cuvinte, vom putea spune că sunteți la 10 capitole distanță de a putea
ajunge la olimpiada internațională de informatică. Totuși, aceste capitole
necesită foarte multă muncă, timp și efort pentru a fi studiate și înțelese
temeinic.

## Clarificări și precizări

În arhivă, avem secțiunile Ușor, Mediu, Dificil și Avansat care au drept scop
crearea unei împărțiri aproximative a conținuturilor pe niveluri de dificultate.
De asemenea, fiecare articol va avea la început o listă de articole pe care le
recomandăm să le citiți înainte să citiți articolul curent, pentru a înțelege
mai bine conținutul (de exemplu, pentru a citi articolul despre aflarea
[cifrelor unui număr](./digits-manipulation.md), trebuie să știți să
lucrați cu [operatori și expresii](../cppintro/basic-math.md)).

În cele ce urmează, vom prezenta o ordine în care recomandăm învățarea
noțiunilor și parcurgerea arhivei, de la cele mai ușoare până la cele mai
dificile dintre cele prezente aici și nu numai, ordinea fiind una într-o ordine
relativ crescătoare a dificultății.

## Capitolul 0 - Articole generale

Chiar dacă acesta este capitolul 0, se recomandă întoarcerea la el de fiecare
dată când concurați sau vreți să aflați mai multe despre ce vă așteaptă.

### Informații generale și programa olimpiadelor

- [Informații despre olimpiada de informatică](../olimpiada/olympiad-info.md)
- [Listă de concursuri relevante](../mediu/contest-list.md)
- [Programa pentru gimnaziu](../olimpiada/gimnaziu.md)
- [Programa pentru liceu](../olimpiada/liceu.md)

### Strategie, sfaturi utile pentru olimpiade și concursuri

- [Cum te pregătești pentru olimpiadă?](../olimpiada/olympiad-prep.md)
- [Abordarea concursurilor de pe Codeforces/AtCoder](../mediu/cf-atcoder.md)
- [Cum ajungi tot mai bun la concursuri?](../mediu/contest-improvement.md)
- [Cum abordezi proba de concurs la
  olimpiadă?](../olimpiada/olympiad-strategy.md)
- [Cum ajungi să iei rezultate tot mai bune la
  olimpiadă?](../olimpiada/olympiad-improvement.md)
- [Cum gestionezi presiunea concursurilor?](../mediu/contest-improvement.md)

## Capitolul 1 - Noțiuni elementare de limbaj, algoritmi elementari

Această secțiune își propune să vă ducă de la baze și să puteți ajunge să
rezolvați probleme ușoare, precum și să vă familiarizați cu algoritmica,
limbajul C++ și în general, tehnici de bază de rezolvare a problemelor.

!!! note "Secțiune specială"

    Aceste noțiuni de bază sunt discutate și
    [aici](./how-to-start.md#notiuni-cu-care-sa-incepi), dar vom relua
    discuția și mai jos.

### Cum înveți materia?

- [De unde începi?](./how-to-start.md)
- [Cum ajungi să stăpânești materia de la clasă?](./schoolwork.md)
- [Cum să te pregătești pentru bacalaureat și
  admitere?](./bac-admitere.md)

### Fundamentele limbajului C++

- [Instalarea primului editor/IDE](../cppintro/index.md)
- [Primul program în C++](../cppintro/intro.md)
- [Variabile și tipuri de date simple](../cppintro/data-types.md)
- [Operatori și expresii. Cunoștințe matematice de
  bază](../cppintro/basic-math.md)
- [Citirea și afișarea datelor](../cppintro/input-output.md)
- [Coding Style](../cppintro/coding-style.md)

### Structuri alternative și repetitive

- [Structura alternativă](../cppintro/conditions-if.md)
- [Structura repetitivă](../cppintro/loops.md)
- [Prelucrarea cifrelor unui număr](./digits-manipulation.md)
- [Maxime și minime](./maxime-minime.md)
- [Generarea șirurilor de numere](./generarea-sirurilor.md)

### Algoritmi elementari

- [Divizibilitatea (CMMDC, CMMMC, aflarea divizorilor)](./divisibility.md)
- [Abordarea problemelor cu secvențe](./sequences.md)

## Capitolul 2 - Tablouri, tehnici introductive

Aici trecem la niște conținuturi mai avansate, cunoașterea tablourilor și a unor
metode de bază inspirate din aritmetică și algebră devine necesară pentru a
putea trece la noțiuni mai specifice.

### Lucrul cu tablouri

- [Vectori (tablouri unidimensionale)](../cppintro/arrays.md)
- [Vectori de frecvență](./frequency-arrays.md)
- [Matrici (tablouri bidimensionale)](../cppintro/matrices.md)

### Algoritmi și tehnici introductive

- [Complexități](./complexity.md)
- [Simularea soluției](./simulating-solution.md)
- [Algoritmi de sortare](./sorting.md) - Doar algoritmii în $\mathcal{O}(n^2)$ și
  funcția std::sort
- [Ciurul lui Eratostene](./sieve.md)
- [Sume parțiale](./partial-sums.md) - Doar sumele parțiale
- [Cum repari o soluție greșită?](../mediu/debugging.md) - sfaturile inițiale

## Capitolul 3 - Sortare, căutare, tehnici mai avansate de limbaj

Dacă ați ajuns aici, înseamnă că aveți o bază relativ solidă și puteți să
învățați și alte metode care ajung să fie un fundament pentru multe concursuri
de algoritmică. Fie că este vorba de algoritmi deprinși din cei pentru sortări
și căutări sau chiar de noțiuni matematice mai avansate, aici sunt algoritmii pe
care îi veți folosi în multe situații și drept pași mai mici pentru alte metode
mai avansate.

### Tehnici de limbaj

- [Subprograme](../cppintro/functions.md)
- [Introducere în STL](../cppintro/stl.md)
- [Șiruri de caractere](../cppintro/strings.md)
- [Operații pe biți](../mediu/bitwise-ops.md)

### Algoritmi și metode de rezolvare a problemelor

- [Introducere în Metoda Greedy](./greedy.md)
- [Căutarea binară](./binary-search.md)
- [Șmenul lui Mars](./partial-sums.md#smenul-lui-mars)
- [Two Pointers](../mediu/two-pointers.md)
- [Sliding Window](../mediu/sliding-window.md)

### Noțiuni de algebră

- [Principiul lui Dirichlet (principiul cutiei)](./dirichlet.md)
- [Baze de numerație](../usor/bases.md)
- [Indicatorul lui Euler](../mediu/euler-totient.md)
- [Aritmetică modulară. Ridicare la putere în timp
  logaritmic](../mediu/pow-log.md)

## Capitolul 4 - Structuri de date liniare, fundamentele tehnicilor avansate

În această secțiune vom începe să rafinăm lucrurile folosind structuri de date
liniare, precum coada, stiva și deque-ul, dar și să introducem tehnici mai
avansate, precum teoria grafurilor și programarea dinamică. Continuăm și
parcurgerea noțiunilor matematice.

### Elemente de implementare

- [Cum repari o soluție greșită?](../mediu/debugging.md) - generarea testelor
- [Tehnica divide et impera](../mediu/divide-et-impera.md)
- [Căutare completă. Tehnica Backtracking](../mediu/backtracking.md)
- [Algoritmi de sortare](./sorting.md) - Restul algoritmilor de sortare
- [Numere mari](../mediu/bignum.md)
- [Normalizarea datelor](../mediu/data-normalization.md)

### Matematică

- [Principiul includerii și excluderii](../mediu/pinex.md)
- [Invers modular](../mediu/modular-inverse.md)

### Structuri de date

- [Coada](../mediu/queue.md)
- [Stiva](../mediu/stack.md)
- [Analiza amortizată](../mediu/amortised-analysis.md)
- [Algoritmul lui Lee. Flood Fill](../mediu/lee.md)
- [Evaluarea unei expresii](../mediu/expression-evaluation.md)
- [Deque](../mediu/deque.md)

### Abordarea anumitor tipuri de probleme mai speciale

- [Abordarea problemelor ad-hoc](../mediu/ad-hoc.md)
- [Abordarea problemelor constructive](../mediu/constructive.md)

### Introducere în tehnici mai avansate

- [Introducere în teoria grafurilor](./graphs.md)
- [Introducere în arbori. Diametrul unui arbore](../mediu/tree-1.md)
- [Introducere în programarea dinamică](./intro-dp.md)

## Capitolul 5 - Programarea dinamică (I), teoria grafurilor (I), combinatorică și geometrie

Aici intrăm încet-încet în complexitatea a două dintre cele mai importante
tehnici din algoritmică, programarea dinamică și teoria grafurilor. De asemenea,
combinatorica și geometria sunt și ele abordate, existând multe probleme care
folosesc aceste tehnici.

### Programarea dinamică

- [Problema rucsacului](../mediu/knapsack.md)
- [Subșir comun maximal](../mediu/lcs.md)
- [Subșir crescător maximal](../mediu/lis.md)
- [Dinamică pe stări exponențiale (bitmask DP)](../mediu/bitmask-dp.md)

### Teoria grafurilor

- [Sortare topologică](../mediu/toposort.md)
- [Cicluri în grafuri. Grafuri funcționale](../mediu/cycles.md)
- [Păduri de mulțimi disjuncte (DSU)](../mediu/dsu.md)
- [Arbore parțial de cost minim (Kruskal, Prim, Boruvka)](../mediu/apcm.md)
- [Algoritmi pentru drumuri minime (Dijkstra, Bellman-Ford,
  Floyd-Warshall)](../mediu/shortest-path.md)
- [Tehnica celor 2 DFS-uri (rerooting)](../mediu/rerooting.md)

### Matematică

- [Combinatorică](../mediu/intro-combinatorics.md)
- [Concepte fundamentale de geometrie](../mediu/basic-geometry.md)

### Alte noțiuni

- [Hashing](../mediu/hashing.md)
- [Meet in the Middle](../mediu/mitm.md)

## Capitolul 6 - Structuri de date, lucrul cu arbori, probleme speciale

Aici începem să lucrăm cu structurile de date care ne ajută să răspundem la
întrebări și să efectuăm actualizări într-un timp rapid. De asemenea, lucrăm în
moduri mai detaliate cu arbori și grafuri, dar și cu alte tipuri de probleme pe
care le întâlniți la concursuri.

### Structuri de date

- [Descompuneri în bucăți de radical (Square Root
  Decomposition)](../dificil/square-root-decomposition.md)
- [Arbori de intervale](../dificil/segment-trees.md)
- [Arbori indexați binar](../dificil/fenwick-tree.md)
- [Range Minimum Query (RMQ)](../dificil/rmq.md)
- [Trie](../dificil/trie.md)
- [Dinamici pe structuri de date](../dificil/data-structures-dp.md)
- [Baleiere (sweep line)](../dificil/sweep-line.md)

### Lucrul cu arbori

- [Binary lifting. Lowest common ancestor
  (LCA)](../dificil/lowest-common-ancestor.md)
- [Euler Tour](../dificil/euler-tour.md)
- [Dinamici pe arbori](../dificil/tree-dp.md)
- [Small to large](../dificil/small-to-large.md)
- [Heavy Light Decomposition](../avansat/hld.md)
- [Centroid Decomposition](../avansat/centroid-decomposition.md)

### Abordarea anumitor tipuri de probleme mai speciale

- [Abordarea problemelor interactive](../dificil/interactive.md)
- [Abordarea problemelor output-only](../dificil/output-only.md)

### Alte tehnici

- [Bitsets](../dificil/bitsets.md)
- [Căutare ternară](../dificil/ternary-search.md)
- [Algoritmi randomizati](../dificil/random-algorithms.md)
- [Funcția Möbius](../dificil/mobius.md)

## Capitolul 7 - Programare dinamică (II), Teoria grafurilor (II), Matematică

Continuăm munca de la capitolul 5 cu adaptări mai avansate ale metodelor
menționate acolo, experiența devenind tot mai importantă.

### Programarea dinamică

- [Programare dinamică pe intervale (range DP)](../dificil/range-dp.md)
- [Programare dinamică pe cifre (digit DP)](../dificil/digit-dp.md)
- [Programare dinamică pe grafuri](../dificil/graph-dp.md)
- [Programare dinamică pe permutări](../dificil/permutations-dp.md)

### Teoria grafurilor

- [Componente tare conexe](../dificil/componente-tare-conexe.md)
- [Componente biconexe](../dificil/componente-biconexe.md)
- [Cuplaj maxim pe graf bipartit](../dificil/cuplaj-maxim-pe-graf-bipartit.md)

### Algebră

- [Introducere în probabilități](../avansat/intro-probability.md)
- [Introducere în algebră liniară](../dificil/intro-linalg.md)
- [Ridicare la putere a unei matrici](../dificil/pow-mat.md)
- [Algoritmul lui Gauss](../avansat/gauss-algorithm.md)

### Geometrie

- [Baleiere (sweep line)](../dificil/sweep-line.md)
- [Înfășurătoare convexă](../dificil/convex-hull.md)

## Capitolul 8 - Matematică avansată, algoritmi pe stringuri

Aici intrăm deja în algoritmi și tehnici de o complexitate foarte ridicată,
aceștia trebuie să fie știuți de cei care vor să ajungă la cel mai înalt nivel.

### Matematică avansată

- [Coduri Gray](../avansat/gray-codes.md)
- [Codarea Huffman](../avansat/huffman.md)
- [Teoria jocurilor](../avansat/game-theory.md)

### Algoritmi pe stringuri

- [Rotație lexicografică minimă](../dificil/lmsr.md)
- [Hashing](../mediu/hashing.md)
- [Knuth-Morris-Pratt (KMP)](../dificil/kmp.md)
- [Z Function](../dificil/z-function.md)
- [Algoritmul lui Manacher](../avansat/manacher.md)
- [Suffix array/tree](../avansat/suffix-array-tree.md)

## Capitolul 9 - Structuri de date avansate, DP Optimizations, Algoritmi avansați pe grafuri, matematică

Acest capitol este unul open-ended, putând fi denumit mai informal drept restul
algoritmicii, deoarece aici, pe lângă conținuturile menționate, orice alt
conținut pe care îl considerați că trebuie abordat, îl puteți aborda.

Pe lângă aceste conținuturi menționate aici, orice altceva ce vreți să învățați
ar trebui învățat după ce vă asigurați că stăpâniți algoritmii menționați
anterior. În mod evident, există anumite excepții, dar dacă ați ajuns la acest
nivel, probabil că știți și voi cum să ajustați anumite lucruri în funcție de ce
observați în studiul vostru individual.

### Structuri de date

- [Virtual Tree](../avansat/virtual-tree.md)
- [Persistent Segment
  Tree](../avansat/persistent-segment-tree.md)
- [Li Chao Tree](../avansat/li-chao.md)
- [Aho-Corasick](../avansat/aho-corasick.md)
- [Treapuri](../avansat/treaps.md)

### Optimizări specifice programării dinamice

- [Convex Hull Trick](../avansat/convex-hull-trick.md)
- [Divide and Conquer DP](../avansat/dc-dp.md)
- [Aliens DP](../avansat/aliens-dp.md)
- [Knuth DP](../avansat/knuth-dp.md)
- [Connected Component DP](../avansat/component-dp.md)

### Algoritmică avansată pe grafuri

- [Fluxuri maxime](../avansat/fluxuri.md)
- [Dynamic connectivity](../avansat/dynamic-connectivity.md)
- [2-SAT](../avansat/2-sat.md)

### Matematică

- [Run-length encoding](../avansat/rle.md)
- [Teorema chineză a resturilor (CRT)](../avansat/crt.md)
- [Recurențe liniare](../avansat/linear-recurrences.md)
- [Funcții generatoare](../avansat/generating-functions.md)
- [FFT, NTT](../avansat/fft.md)
- [Matematică avansată](../avansat/advanced-math.md)

## Concluzii

Stăpânirea noțiunilor într-o ordine clară care să permită înțelegerea tuturor
capitolelor cu ușurință este esențială pentru orice competitor care vrea să
ajungă cât mai bun, iar odată cu această resursă, avem prima structură completă
în limba română a unui asemenea roadmap care face învățarea algoritmilor și
structurilor de date mult mai ușoară chiar și dacă nu aveți un profesor
îndrumător sau altcineva care să vă ajute să aveți o ordine logică în învățare.

Ca întotdeauna, vă stăm la dispoziție pe [serverul
nostru](https://discord.gg/roalgo) în cazul în care aveți sugestii de orice fel
și/sau considerați că anumite noțiuni merită ajustate.

## Resurse suplimentare

- [Competitive programming roadmap -
  Codeforces](https://codeforces.com/blog/entry/111099)
- [Competitive programming roadmap -
  Codechef](https://www.codechef.com/roadmap/become-5-star)
- [Structura USACO Guide](https://usaco.guide/)
