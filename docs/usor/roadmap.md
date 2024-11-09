---
tags:
    - meta
    - sfaturi
    - pas cu pas
---
**Autor**: Ștefan-Cosmin Dăscălescu

## Introducere

În ultimii ani, au apărut foarte multe resurse care permit învățarea algoritmilor și structurilor de date într-un mod complet fără prea multe probleme. Totuși, o mare problemă care încă există în prezent este lipsa unei structuri clare care să permită înțelegerea acestor noțiuni, adaptată la cerințele sistemului educațional din România și a diverselor niveluri, mai ales când vine vorba de olimpiadă și de concursurile de informatică. 

Chiar dacă programele școlare, fie că e vorba de programele cadru sau programele claselor de la olimpiadă sunt un pas important făcut în special în ultimii ani, totuși încă nu există o ordine clară în care aceste noțiuni sunt discutate, ci doar o listă a noțiunilor care trebuie parcurse la un anumit nivel, fără a ține cont de dificultatea relativă a acestora. 

În acest articol, vom prezenta ordinea pe care o propunem pentru învățarea acestor noțiuni, acesta fiind un roadmap pe care îl recomandăm tuturor pasionaților de algoritmi și structuri de date, și nu numai. 

## Clarificări și precizări

În arhivă, avem secțiunile Ușor, Mediu, Dificil și Avansat care au drept scop crearea unei împărțiri aproximative a conținuturilor pe niveluri de dificultate. De asemenea, fiecare articol va avea la început o listă de articole pe care le recomandăm să le citiți înainte să citiți articolul curent, pentru a înțelege mai bine conținutul (de exemplu, pentru a citi articolul despre aflarea [cifrelor unui număr](https://edu.roalgo.ro/usor/digits-manipulation/), trebuie să știți să lucrați cu [operatori și expresii](https://edu.roalgo.ro/cppintro/basic-math/)).

În cele ce urmează, vom prezenta o ordine în care recomandăm învățarea noțiunilor și parcurgerea arhivei, de la cele mai ușoare până la cele mai dificile dintre cele prezente aici și nu numai, ordinea fiind una într-o ordine relativ crescătoare a dificultății.

## Capitolul 0 - Articole generale

Chiar dacă acesta este capitolul $0$, se recomandă întoarcerea la el de fiecare dată când concurați sau vreți să aflați mai multe despre ce vă așteaptă.

### Informații generale și programa olimpiadelor

* [Informații despre olimpiada de informatică](https://edu.roalgo.ro/olimpiada/olympiad-info/)
* [Listă de concursuri relevante](https://edu.roalgo.ro/mediu/contest-list/)
* [Programa pentru gimnaziu](https://edu.roalgo.ro/olimpiada/gimnaziu/)
* [Programa pentru liceu](https://edu.roalgo.ro/olimpiada/liceu/)

### Strategie, sfaturi utile pentru olimpiade și concursuri

* [Cum te pregătești pentru olimpiadă?](https://edu.roalgo.ro/olimpiada/olympiad-prep/)
* [Abordarea concursurilor de pe Codeforces/AtCoder](https://edu.roalgo.ro/mediu/cf-atcoder/)
* [Cum ajungi tot mai bun la concursuri?](https://edu.roalgo.ro/mediu/contest-improvement/)
* [Cum abordezi proba de concurs la olimpiadă?](https://edu.roalgo.ro/olimpiada/olympiad-strategy/)
* [Cum ajungi să iei rezultate tot mai bune la olimpiadă?](https://edu.roalgo.ro/olimpiada/olympiad-improvement/)
* [Cum gestionezi presiunea concursurilor?](https://edu.roalgo.ro/mediu/contest-improvement/)

## Capitolul 1 - Noțiuni elementare de limbaj, algoritmi elementari

!!! note "Secțiune specială"
    Aceste noțiuni de bază sunt discutate și [aici](https://edu.roalgo.ro/usor/how-to-start/#notiuni-cu-care-sa-incepi), dar vom relua discuția și mai jos.

### Cum înveți materia?

* [De unde începi?](https://edu.roalgo.ro/usor/how-to-start/)
* [Cum ajungi să stăpânești materia de la clasă?](https://edu.roalgo.ro/usor/schoolwork/)
* [Cum să te pregătești pentru bacalaureat și admitere?](https://edu.roalgo.ro/usor/bac-admitere/)

### Fundamentele limbajului C++

* [Instalarea primului editor/IDE C++](https://edu.roalgo.ro/cppintro/)
* [Primul program în C++](https://edu.roalgo.ro/cppintro/intro/)
* [Variabile și tipuri de date simple](https://edu.roalgo.ro/cppintro/data-types/)
* [Operatori și expresii. Cunoștințe matematice de bază](https://edu.roalgo.ro/cppintro/basic-math/)
* [Citirea și afișarea datelor](https://edu.roalgo.ro/cppintro/input-output/)

### Structuri alternative și repetitive

* [Structura alternativă](https://edu.roalgo.ro/cppintro/conditions-if/)
* [Structura repetitivă](https://edu.roalgo.ro/cppintro/loops/)
* [Prelucrarea cifrelor unui număr](https://edu.roalgo.ro/usor/digits-manipulation/)
* [Maxime și minime](https://edu.roalgo.ro/usor/maxime-minime)
* [Generarea șirurilor de numere](https://edu.roalgo.ro/usor/generarea-sirurilor/)

## Capitolul 2 - Tablouri, tehnici introductive

### Lucrul cu tablouri

* [Vectori (tablouri unidimensionale)](https://edu.roalgo.ro/cppintro/arrays/)
* [Vectori de frecvență](https://edu.roalgo.ro/usor/frequency-arrays/)
* [Matrici (tablouri bidimensionale)](https://edu.roalgo.ro/cppintro/matrices/)
* [Coding Style](https://edu.roalgo.ro/cppintro/coding-style/)

### Algoritmi și tehnici introductive

* [Complexități](https://edu.roalgo.ro/usor/complexity/)
* [Divizibilitatea (CMMDC, CMMMC, aflarea divizorilor)](https://edu.roalgo.ro/usor/divisibility/)
* [Abordarea problemelor cu secvențe](https://edu.roalgo.ro/usor/sequences/)
* [Simularea soluției](https://edu.roalgo.ro/usor/simulating-solution/)
* [Algoritmi de sortare](https://edu.roalgo.ro/usor/sorting/) - Doar algoritmii în $O(n^2)$ și funcția std::sort
* [Ciurul lui Eratostene](https://edu.roalgo.ro/usor/sieve/)
* [Sume parțiale](https://edu.roalgo.ro/usor/partial-sums/) - Doar sumele parțiale

## Capitolul 3 - Sortare, căutare, tehnici mai avansate de limbaj

### Tehnici de limbaj

* [Subprograme](https://edu.roalgo.ro/cppintro/functions/)
* [Introducere în STL](https://edu.roalgo.ro/cppintro/stl/)
* [Șiruri de caractere](https://edu.roalgo.ro/cppintro/strings/)
* [Operații pe biți](https://edu.roalgo.ro/mediu/bitwise-ops/)

### Algoritmi și metode de rezolvare a problemelor

* [Algoritmi de sortare](https://edu.roalgo.ro/usor/sorting/) - Restul algoritmilor de sortare
* [Introducere în Metoda Greedy](https://edu.roalgo.ro/usor/greedy/)
* [Căutarea binară](https://edu.roalgo.ro/usor/binary-search/)
* [Șmenul lui Mars](https://edu.roalgo.ro/usor/partial-sums/#smenul-lui-mars)
* [Two Pointers](https://edu.roalgo.ro/mediu/two-pointers/)
* [Sliding Window](https://edu.roalgo.ro/mediu/sliding-window/)

### Noțiuni de algebră

* [Baze de numerație](https://edu.roalgo.ro/mediu/number-bases/)
* [Indicatorul lui Euler](https://edu.roalgo.ro/mediu/euler-totient/)
* [Aritmetică modulară. Ridicare la putere în timp logaritmic](https://edu.roalgo.ro/mediu/pow-log/)

## Capitolul 4 - Structuri de date liniare, fundamentele tehnicilor avansate

### Elemente de implementare

* [Cum repari o soluție greșită?](https://edu.roalgo.ro/mediu/debugging/)
* [Căutare completă. Tehnica Backtracking](https://edu.roalgo.ro/mediu/backtracking/)
* [Tehnica divide et impera](https://edu.roalgo.ro/mediu/divide-et-impera/)
* [Numere mari](https://edu.roalgo.ro/mediu/bignum/)
* [Normalizarea datelor](https://edu.roalgo.ro/mediu/data-normalization/)

### Matematică

* [Principiul includerii și excluderii](https://edu.roalgo.ro/mediu/pinex/)
* [Invers modular](https://edu.roalgo.ro/mediu/modular-inverse/) - doar pentru modulo prim

### Structuri de date

* [Coada](https://edu.roalgo.ro/mediu/queue/)
* [Stiva](https://edu.roalgo.ro/mediu/stack/)
* [Analiza amortizată](https://edu.roalgo.ro/mediu/amortised-analysis/)
* [Algoritmul lui Lee. Flood Fill](https://edu.roalgo.ro/mediu/lee/)
* [Evaluarea unei expresii](https://edu.roalgo.ro/mediu/expression-evaluation/)
* [Deque](https://edu.roalgo.ro/mediu/deque/)

### Abordarea anumitor tipuri de probleme mai speciale

* [Abordarea problemelor ad-hoc](https://edu.roalgo.ro/mediu/ad-hoc/)
* [Abordarea problemelor constructive](https://edu.roalgo.ro/mediu/constructive/)

### Introducere în tehnici mai avansate

* [Introducere în teoria grafurilor](https://edu.roalgo.ro/usor/graphs/)
* [Introducere în arbori. Diametrul unui arbore](https://edu.roalgo.ro/mediu/tree-1/)
* [Introducere în programarea dinamică](https://edu.roalgo.ro/usor/intro-dp/)

## Capitolul 5 - Programarea dinamică (I), teoria grafurilor (I), combinatorică și geometrie

### Programarea dinamică

* [Problema rucsacului](https://edu.roalgo.ro/mediu/knapsack/)
* [Subșir comun maximal](https://edu.roalgo.ro/mediu/lcs/)
* [Subșir crescător maximal](https://edu.roalgo.ro/mediu/lis/)
* [Dinamică pe stări exponențiale (bitmask DP)](https://edu.roalgo.ro/mediu/bitmask-dp/)

### Teoria grafurilor

* [Sortare topologică](https://edu.roalgo.ro/mediu/toposort/)
* [Cicluri în grafuri. Grafuri funcționale](https://edu.roalgo.ro/mediu/cycles/)
* [Păduri de mulțimi disjuncte (DSU)](https://edu.roalgo.ro/mediu/dsu/)
* [Arbore parțial de cost minim (Kruskal, Prim, Boruvka)](https://edu.roalgo.ro/mediu/apcm/)
* [Algoritmi pentru drumuri minime (Dijkstra, Bellman-Ford, Floyd-Warshall)](https://edu.roalgo.ro/mediu/shortest-path/)
* [Tehnica celor 2 DFS-uri (rerooting)](https://edu.roalgo.ro/mediu/rerooting/)

### Matematică 

* [Combinatorică](https://edu.roalgo.ro/mediu/intro-combinatorics/)
* [Concepte fundamentale de geometrie](https://edu.roalgo.ro/mediu/basic-geometry/)

### Alte noțiuni

* [Hashing](https://edu.roalgo.ro/mediu/hashing/)
* [Meet in the Middle](https://edu.roalgo.ro/mediu/mitm/)

## Capitolul 6 - Structuri de date, lucrul cu arbori, probleme speciale

### Structuri de date

* [Descompuneri în bucăți de radical (Square Root Decomposition)](https://edu.roalgo.ro/dificil/square-root-decomposition/)
* [Arbori de intervale](https://edu.roalgo.ro/dificil/segment-trees/)
* [Arbori indexați binar](https://edu.roalgo.ro/dificil/fenwick-tree/)
* [Sparse Table. Binary Lifting. Range Minimum Query (RMQ)](https://edu.roalgo.ro/dificil/rmq/)
* [Trie](https://edu.roalgo.ro/dificil/trie/)
* [Dinamici pe structuri de date](https://edu.roalgo.ro/dificil/data-structures-dp/)
* [Baleiere (sweep line)](https://edu.roalgo.ro/dificil/sweep-line/)

### Lucrul cu arbori

* [Binary lifting. Lowest common ancestor (LCA)](https://edu.roalgo.ro/dificil/lowest-common-ancestor/)
* [Euler Tour](https://edu.roalgo.ro/dificil/euler-tour/)
* [Dinamici pe arbori](https://edu.roalgo.ro/dificil/tree-dp/)
* [Small to large](https://edu.roalgo.ro/dificil/small-to-large/)
* [Heavy Light Decomposition](https://edu.roalgo.ro/avansat/hld/)
* [Centroid Decomposition](https://edu.roalgo.ro/avansat/centroid-decomposition/)

### Abordarea anumitor tipuri de probleme mai speciale

* [Abordarea problemelor interactive](https://edu.roalgo.ro/dificil/interactive/)
* [Abordarea problemelor output-only](https://edu.roalgo.ro/dificil/output-only/)

### Alte tehnici

* [Bitsets](https://edu.roalgo.ro/dificil/bitsets/)
* [Căutare ternară](https://edu.roalgo.ro/dificil/ternary-search/)
* [Algoritmi randomizati](https://edu.roalgo.ro/dificil/random-algorithms/)
* [Funcția Möbius](https://edu.roalgo.ro/dificil/mobius/)

## Capitolul 7 - Programare dinamică (II), Teoria grafurilor (II), Matematică

### Programarea dinamică

* [Programare dinamică pe intervale (range DP)](https://edu.roalgo.ro/dificil/range-dp/)
* [Programare dinamică pe cifre (digit DP)](https://edu.roalgo.ro/dificil/digit-dp/)
* [Programare dinamică pe grafuri](https://edu.roalgo.ro/dificil/graph-dp/)
* [Programare dinamică pe permutări](https://edu.roalgo.ro/dificil/permutations-dp/)

### Teoria grafurilor

* [Componente tare conexe](https://edu.roalgo.ro/dificil/componente-tare-conexe/)
* [Componente biconexe](https://edu.roalgo.ro/dificil/componente-biconexe/)
* [Cuplaj maxim pe graf bipartit](https://edu.roalgo.ro/dificil/cuplaj-maxim-pe-graf-bipartit/)

### Algebră

* [Introducere în probabilități](https://edu.roalgo.ro/avansat/intro-probability/)
* [Introducere în algebră liniară](https://edu.roalgo.ro/dificil/intro-linalg/)
* [Ridicare la putere a unei matrici](https://edu.roalgo.ro/dificil/pow-mat/)
* [Algoritmul lui Gauss](https://edu.roalgo.ro/avansat/gauss-algorithm/)

### Geometrie

* [Baleiere (sweep line)](https://edu.roalgo.ro/dificil/sweep-line/)
* [Înfășurătoare convexă](https://edu.roalgo.ro/dificil/convex-hull/)

## Capitolul 8 - Matematică avansată, algoritmi pe stringuri

### Matematică avansată

* [Coduri Gray](https://edu.roalgo.ro/avansat/gray-codes/)
* [Codarea Huffman](https://edu.roalgo.ro/avansat/huffman/)
* [Run-length encoding](https://edu.roalgo.ro/avansat/rle/)
* [Teorema chineză a resturilor (CRT)](https://edu.roalgo.ro/avansat/crt/)
* [Teoria jocurilor](https://edu.roalgo.ro/avansat/game-theory/)

### Algoritmi pe stringuri

* [Rotație lexicografică minimă](https://edu.roalgo.ro/dificil/lmsr/)
* [Hashing](https://edu.roalgo.ro/mediu/hashing/)
* [Knuth-Morris-Pratt (KMP)](https://edu.roalgo.ro/dificil/kmp/)
* [Z Function](https://edu.roalgo.ro/dificil/z-function/)
* [Algoritmul lui Manacher](https://edu.roalgo.ro/avansat/manacher/)
* [Suffix array/tree](https://edu.roalgo.ro/avansat/suffix-array-tree/)

## Capitolul 9 - Structuri de date avansate, DP Optimizations, Algoritmi avansați pe grafuri, matematică

### Structuri de date

* [Virtual Tree](https://edu.roalgo.ro/avansat/virtual-tree/)
* [Persistent Segment Tree](https://edu.roalgo.ro/avansat/persistent-segment-tree/)
* [Li Chao Tree](https://edu.roalgo.ro/avansat/li-chao/)
* [Aho-Corasick](https://edu.roalgo.ro/avansat/aho-corasick/)
* [Treapuri](https://edu.roalgo.ro/avansat/treaps/)


### Optimizări specifice programării dinamice

* [Convex Hull Trick](https://edu.roalgo.ro/avansat/convex-hull-trick/)
* [Divide and Conquer DP](https://edu.roalgo.ro/avansat/dc-dp/)
* [Aliens DP](https://edu.roalgo.ro/avansat/aliens-dp/)
* [Knuth DP](https://edu.roalgo.ro/avansat/knuth-dp/)
* [Connected Component DP](https://edu.roalgo.ro/avansat/component-dp/)

### Algoritmică avansată pe grafuri

* [Fluxuri maxime](https://edu.roalgo.ro/avansat/fluxuri/)
* [Dynamic connectivity](https://edu.roalgo.ro/avansat/dynamic-connectivity/)
* [2-SAT](https://edu.roalgo.ro/avansat/2-sat/)

### Matematică

* [Recurențe liniare](https://edu.roalgo.ro/avansat/linear-recurrences/)
* [Funcții generatoare](https://edu.roalgo.ro/avansat/generating-functions/)
* [FFT, NTT](https://edu.roalgo.ro/avansat/fft/)
* [Matematică avansată](https://edu.roalgo.ro/avansat/advanced-math/)

## Concluzii

Stăpânirea noțiunilor într-o ordine clară care să permită înțelegerea tuturor capitolelor cu ușurință este esențială pentru orice competitor care vrea să ajungă cât mai bun, iar odată cu această resursă, avem prima structură completă în limba română a unui asemenea roadmap care face învățarea algoritmilor și structurilor de date mult mai ușoară chiar și dacă nu aveți un profesor îndrumător sau altcineva care să vă ajute să aveți o ordine logică în învățare. 

Ca întotdeauna, vă stăm la dispoziție pe [serverul nostru](https://discord.gg/roalgo) în cazul în care aveți sugestii de orice fel și/sau considerați că anumite noțiuni merită ajustate. 

## Resurse suplimentare

* [Competitive programming roadmap - Codeforces](https://codeforces.com/blog/entry/111099)
* [Competitive programming roadmap - Codechef](https://www.codechef.com/roadmap/become-5-star)
* [Structura USACO Guide](https://usaco.guide/)