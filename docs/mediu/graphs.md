
% \title{Divizibilitate}
% \author{Ștefan Dăscălescu}
% \date{}

\ChapterWithAuthor{Introducere în grafuri}{Ștefan Dăscălescu}

În cele ce urmează voi prezenta o structură de date cu foarte multe aplicații atât în algoritmică, cât și în viața de zi cu zi, acestea fiind grafurile. Problema aflării existenței unor conexiuni sau aflării distanței minime între două noduri reprezintă un punct de plecare pentru majoritatea algoritmilor pe grafuri, teoria folosită în algoritmică fiind una vastă și plină de abordări ce se dovedesc a fi esențiale în foarte multe situații, atât competiționale, cât și în aplicații practice. 

\section{Noțiuni introductive}

\begin{definition}
Un graf este o structură care corespunde unui grup de obiecte, în care unele perechi de obiecte sunt într-un anumit sens „legate” reciproc. Obiectele corespund unor abstracții matematice numite într-un graf noduri/vârfuri (numite și puncte) și fiecare legătură dintre perechile de obiecte asociate se numește muchie (numită și arc sau linie, prin care este și reprezentată). De obicei, un graf este reprezentat în formă schematică ca un set/grup de puncte pentru noduri, iar acestea sunt unite două câte două de drepte sau curbe pentru muchii. 
\end{definition}

\subsection{Terminologie}

Voi continua prin a defini termeni ce se dovedesc a fi esențiali pentru înțelegerea grafurilor.

\begin{definition}
    Definim un \textbf{graf neorientat} ca fiind un graf pentru care dacă avem o muchie $(A, B)$, o putem folosi pentru a ajunge atât de la $A$ la $B$, cât și de la $B$ la $A$.
\end{definition}

\begin{definition}
    Definim un \textbf{graf orientat} ca fiind un graf pentru care dacă avem o muchie $(A, B)$, o putem folosi \textbf{doar} pentru a ajunge atât de la $A$ la $B$, nu și de la $B$ la $A$.
\end{definition}

\begin{definition}
    Două noduri sunt \textbf{adiacente} atunci când există cel puțin o muchie care să le lege direct.
\end{definition}

\begin{definition}
    Folosim noțiunea de \textbf{incidență} când spunem că un nod este extremitate a unei muchii. 
\end{definition}

\begin{definition}
    Definim \textbf{gradul} unui nod ca fiind numărul de muchii incidente cu acel nod. 
\end{definition}

\begin{observation}
    Suma gradelor nodurilor într-un graf neorientat este mereu un număr par. Explicația este dată de faptul că pentru fiecare muchie adăugată, gradul a două noduri crește cu $1$.
\end{observation}

\begin{definition}
    Numim \textbf{lanț} o secvență de noduri ce au proprietatea că oricare două vecine reprezintă capetele unei
muchii a grafului. Se disting noțiunile de \textbf{lanț elementar} (lanț cu nodurile distincte) și \textbf{lanț simplu} (lanț cu muchiile distincte).
\end{definition}

\begin{definition}
    Un \textbf{ciclu} reprezintă o secvență de muchii ce nu se repetă, pleacă de la un nod $A$ și parcurgând în ordine acele muchii, se ajunge tot la nodul $A$. Din nou, se distinge noțiunea de \textbf{ciclu simplu} ca fiind un ciclu în care nu se repetă noduri.
\end{definition}

\begin{definition}
    Definim \textbf{lungimea unui lanț} ca fiind numărul de muchii folosite pentru a ajunge de la un capăt al lanțului la celălalt. Uneori, lungimea se definește ca numărul de noduri prin care trecem, numărându-se un nod de câte ori s-a trecut prin el. 
\end{definition}

\begin{observation}
    În orice caz, lungimea exprimată prin numărul de noduri este cu $1$ mai mare decât lungimea exprimată prin numărul de muchii.
\end{observation}

\begin{definition}
    Definim \textbf{graf parțial} al unui graf dat ca fiind ceea ce rămâne din graful dat păstrând toate nodurile și eliminând eventual unele muchii, fără a adăuga muchii noi.
\end{definition}

\begin{definition}
    Definim \textbf{subgraf} al unui graf dat ca fiind ceea ce rămâne din graful dat eliminând unele noduri și doar muchiile incidente lor, deci nu și alte muchii și fără să adăugăm alte muchii.
\end{definition}

\begin{observation}
    Numărul de subgrafuri ale unui graf este $2^n$, iar numărul de grafuri parțiale este $2^m$, unde $n$ este numărul de noduri, iar $m$ este numărul de muchii al grafului. 
\end{observation}

\subsection{Câteva tipuri speciale de grafuri}

Se remarcă faptul că în funcție de tipul grafului, mai putem defini următoarele tipuri de grafuri, care se vor folosi în diferite aplicații. De notat ca pentru unele din aceste tipuri, vom avea probleme unde vom explica în detaliu noțiunile și aplicațiile unde folosim aceste concepte. 

\begin{definition}
    Definim un \textbf{graf complet} ca fiind un graf care are toate muchiile posibile, existând o legătură directă de la $(A, B)\ \forall{1 \leq A < B \leq n}$. Numărul de muchii ale unui graf complet cu $n$ noduri este $\frac{n(n-1)}{2}$. 
\end{definition}

\begin{definition}
    Definim un \textbf{graf bipartit} ca fiind un graf care poate fi împărțit în două submulțimi disjuncte, $A$ și $B$, astfel încât nu există nicio muchie între două elemente din aceeași submulțime. 
\end{definition}

\begin{definition}
    Definim un \textbf{graf planar} ca fiind un graf care are proprietatea că poate fi reprezentat grafic fără ca două muchii să se intersecteze. 
\end{definition}

\begin{definition}
    Definim un \textbf{graf regulat} ca fiind un graf care are proprietatea că toate nodurile au același grad. 
\end{definition}

\section{Lucrul cu grafuri. Moduri de reprezentare în memorie}

Un concept foarte important în teoria grafurilor reprezintă modul în care parcurgem aceste structuri de date și cum putem verifica proprietățile de care avem nevoie, de la o problemă la alta. 

Să considerăm graful neorientat din figura \ref{fig:graph}. Acest graf are $13$ noduri și $12$ muchii, acestea fiind $(1, 4)$, $(1, 3)$, $(4, 9)$, $(9, 3)$, $(4, 2)$, $(4, 6)$, $(2, 6)$, $(2, 5)$, $(8, 12)$, $(8, 11)$, $(8, 10)$, $(8, 7)$.

\begin{figure}
\centering
\begin{tikzpicture}[auto, thick, node distance=2.5cm, every node/.style={circle, draw, minimum size=0.8cm, ultra thick}]
    \node (4) {4};
    \node (8) [left of=4, node distance=3cm] {8};
    \node (1) [above of=4] {1};
    \node (9) [right of=1] {9};
    \node (3) [right of=4] {3};
    
    \node (2) at ($(4) + (-120:2.5cm)$) {2};
    \node (6) at ($(4) + (-60:2.5cm)$) {6};
    
    \node (5) at ($(2) + (-60:2.5cm)$) {5};
    \node (13) at ($(2) + (-120:2.5cm)$) {13};

    \node (7) at ($(8) + (-120:2.5cm)$) {7};
    \node (10) at ($(8) + (-155:2.5cm)$) {10};
    \node (11) at ($(8) + (155:2.5cm)$) {11};
    \node (12) at ($(8) + (120:2.5cm)$) {12};

    % Define edges
    \path (1) edge (4);
    \path (1) edge (3);
    \path (4) edge (9);
    \path (9) edge (3);
    \path (4) edge (2);
    \path (4) edge (6);
    \path (2) edge (6);
    \path (2) edge (5);
    \path (8) edge (12);
    \path (8) edge (11);
    \path (8) edge (10);
    \path (8) edge (7);
\end{tikzpicture}
\caption{\label{fig:graph} Un graf neorientat cu 13 noduri și 12 muchii.}
\end{figure}

Pentru a reprezenta un graf în memorie, există trei moduri principale de a o face, cu distincția că în practică se va folosi doar reprezentarea prin liste de vecini.

\begin{definition}
    Definim \textbf{matricea de adiacență a unui graf} ca fiind o matrice binară pentru care $a_{ij} = 1$ dacă și numai dacă avem muchie de la nodul $i$ la nodul $j$ și $a_{ij} = 0$ în caz contrar. 
\end{definition}
\begin{observation}
    Pentru un graf neorientat, matricea este mereu simetrică, adică $a_{ij} = a_{ji}\ \forall i, j$.
\end{observation}

Pentru graful nostru de la fig.~\ref{fig:graph}, aceasta este matricea de adiacență la care ajungem.

\begin{equation*}
    \small
    \begin{pmatrix}
    {\color{gray}0} & {\color{gray}0} & \textbf{1} & \textbf{1} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0}\\
    {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & \textbf{1} & \textbf{1} & \textbf{1} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0}\\
    \textbf{1} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & \textbf{1} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0}\\
    \textbf{1} & \textbf{1} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & \textbf{1} & {\color{gray}0} & {\color{gray}0} & \textbf{1} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0}\\
    {\color{gray}0} & \textbf{1} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0}\\
    {\color{gray}0} & \textbf{1} & {\color{gray}0} & \textbf{1} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0}\\
    {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & \textbf{1} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0}\\
    {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & \textbf{1} & {\color{gray}0} & {\color{gray}0} & \textbf{1} & \textbf{1} & \textbf{1} & {\color{gray}0}\\
    {\color{gray}0} & {\color{gray}0} & \textbf{1} & \textbf{1} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0}\\
    {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & \textbf{1} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0}\\
    {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & \textbf{1} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0}\\
    {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & \textbf{1} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0}\\
    {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0} & {\color{gray}0}
    \end{pmatrix}
\end{equation*}

\begin{definition}
    Definim o \textbf{lista de vecini} ca fiind o listă (de regulă, alocată dinamic) pe care o folosim pentru a ține în memorie pentru fiecare nod doar nodurile adiacente cu acesta, această metodă fiind cea mai eficientă din punct de vedere practic pentru a parcurge grafurile.
\end{definition}

\begin{table}[ht]
  \centering
  \begin{tabular}{cl}
    \toprule
    \textbf{Noduri} & \textbf{Vecini} \\
    \midrule
    1 & $\{3,4\}$ \\
    2 & $\{4,5,6\}$ \\
    3 & $\{1,9\}$ \\
    4 & $\{1,2, , 9\}$ \\
    5 & $\{2\}$ \\
    6 & $\{2, 4\}$ \\
    7 & $\{8\}$ \\
    8 & $\{7,10,11,12\}$ \\
    9 & $\{3,4\}$ \\
    10 & $\{8\}$ \\
    11 & $\{8\}$\\
    12 & $\{8\}$ \\
    13 & $\emptyset$ \\
    \bottomrule
  \end{tabular}
  \caption{\label{tab:lista_vecini}Lista de vecini pentru graful neorientat din figura~\ref{fig:graph}}
  
\end{table}

\begin{definition}
    Definim o \textbf{lista de muchii} ca fiind o listă pe care o folosim pentru a ține toate muchiile în memorie. Deși nu este o variantă prea practică de a efectua parcurgerile, această metodă poate fi utilă pentru anumiți algoritmi ce se bazează în principal pe prelucrarea muchiilor, un astfel de exemplu fiind arborele parțial de cost minim. 
\end{definition}

\begin{observation}
    În cazul nostru, lista de muchii este: 
    \begin{gather*}
    \{\{1, 4\}, \{1, 3\}, \{4,9\}, \{9,3\}, \{4,2\}, \{4,6\},\\
    \{2,6\}, \{2,5\}, \{8,12\}, \{8,11\}, \{8,10\}, \{8,7\}\}
\end{gather*}
\end{observation}

% \begin{FlushLeft}
% 1 4\\
% 1 3\\
% 4 9\\
% 9 3\\
% 4 2\\
% 4 6\\
% 2 6\\
% 2 5\\
% 8 12\\
% 8 11\\
% 8 10\\
% 8 7\\
% \end{FlushLeft}

\section{Conexitate. Parcurgerea DFS}

Problema aflării conexității unui graf este una din problemele fundamentale ale teoriei grafurilor, fiind adesea folosită drept un exemplu esențial în explicarea și înțelegerea grafurilor. 

\begin{definition}
    Definim un \textbf{graf conex} ca fiind un graf neorientat care are proprietatea că pentru oricare două noduri $A$ și $B$ din graf, putem ajunge de la $A$ la $B$ folosind una sau mai multe muchii.
\end{definition}

\begin{definition}
    Definim o \textbf{componentă conexă} ca fiind un subgraf \textbf{conex} al unui graf dat.
\end{definition}

Pentru a rezolva problema aflării conexității unui graf, va trebui să parcurgem graful folosind unul din algoritmii consacrați pentru această problemă. În cazul de față, vom continua prin a explica parcurgerea în adâncime a grafului (DFS sau depth-first search), una din parcurgerile optime pentru această problemă. 

\begin{definition}
    Definim \textbf{parcurgerea în adâncime} (DFS, engl. \enquote{depth-first search}) a unui graf ca fiind o parcurgere recursivă ce pleacă de la un nod anume, iar la fiecare pas, dacă ne aflăm la un nod $x$, vom vizita vecinii nevizitați ai nodului $x$, apelând DFS pentru fiecare din ei. 
\end{definition}

\begin{observation}
    Complexitatea parcurgerii în adâncime (DFS) este $O(\lvert V \rvert + \lvert E \lvert)$, unde $\lvert V \rvert$ reprezintă numărul de noduri sau vârfuri și $\lvert E \rvert$ reprezintă numărul de muchii.\footnote{În probleme se notează convențional $\lvert V \rvert$ cu $N$ de la noduri, respectiv $\lvert E \rvert$ cu $M$ de la muchii. \textit{n.red.}}.
\end{observation}

\begin{observation}
    Se remarcă faptul că un nod va fi vizitat la un moment dat doar o singură dată, deci dacă avem muchiile $(1, 2)$, $(1, 3)$ și $(2, 3)$, iar DFS-ul pleacă din $1$, $2$ va fi accesat din $1$, iar $3$ va fi accesat din $2$.
\end{observation}

\begin{observation}
    Se poate remarca faptul că ordinea în care vizităm nodurile în graf depinde de ordinea în care sunt adăugate muchiile în graf, acest lucru înseamnă că nu putem folosi DFS pentru anumite probleme, de exemplu cele la care trebuie aflată distanța minimă în graf.
\end{observation}

\section{Problema \href{https://kilonova.ro/problems/2036}{Connected components} de pe kilonova}

Se dă un graf neorientat $G$ cu $N$ noduri și $M$ muchii. Să se afle câte componente conexe are graful dat.

Pentru a afla numărul de componente conexe ale unui graf, putem folosi parcurgerea DFS pentru a afla toate nodurile din care apelăm DFS din funcția \textit{main}, acesta fiind și răspunsul la problema noastră. 

\cpp{codes/grafuri/connected-components.cpp}

\section{Drumuri minime. Parcurgerea BFS}

Dacă în cazul parcurgerii DFS putem să o aplicăm fără mari probleme pentru o varietate destul de largă de probleme cu grafuri, totuși nu este suficientă pentru problemele ce țin de distanțe. Un exemplu fundamental este acela al aflării drumului minim între două sau mai multe noduri într-un graf dat.

\begin{definition}
    Definim un \textbf{drum minim} ca fiind lungimea minimă a unui lanț care leagă două noduri din graf.
\end{definition}

Motivul pentru care nu putem afla drumul minim între două noduri folosind DFS este acela că ordinea în care nodurile sunt parcurse în DFS depinde de ordinea în care sunt date muchiile de la intrare, parcurgerea recursivă făcând aflarea distanțelor minime imposibilă. Astfel, vom introduce un alt mod de a parcurge graful nostru.

\begin{definition}
    Definim \textbf{parcurgerea în lățime} (BFS, engl. \enquote{breadth-first search}) a unui graf ca fiind o parcurgere iterativă ce pleacă de la unul sau mai multe noduri, iar la fiecare pas, dacă ne aflăm la un nod $x$, vom vizita vecinii nevizitați ai nodului $x$, adăugându-i într-o coadă, nodurile fiind parcurse în ordinea în care au fost adăugate în coadă. 
\end{definition}
\begin{observation}
    Complexitatea parcurgerii în lățime (DFS) este $O(\lvert V \rvert + \lvert E \lvert)$, unde $\lvert V \rvert$ reprezintă numărul de noduri sau vârfuri și $\lvert E \rvert$ reprezintă numărul de muchii.
\end{observation}

\begin{observation}
    Se poate remarca faptul că ordinea în care vizităm nodurile în graf va fi aceeași cu ordinea crescătoare a distanței minime față de nodul sau nodurile inițiale, datorită faptului că ele vor fi inserate în coadă în ordinea în care acestea au fost adăugate. 
\end{observation}

\section{Problema \href{https://kilonova.ro/problems/2037}{Simple Shortest Path} de pe kilonova}

Se dă un graf neorientat $G$ cu $N$ noduri și $M$ muchii, precum și un nod $S$. Să se afle lungimea drumului minim dintre $S$ și fiecare nod din graf, inclusiv $S$.

Pentru a rezolva această problemă, vom pleca cu un BFS din nodul $S$ și vom afla pe parcurs, distanțele minime față de toate celelalte noduri. 

\cpp{codes/grafuri/simple-shortest-path.cpp}

\section{Problema \href{https://www.infoarena.ro/problema/grarb}{grarb} de pe infoarena}

Se dă un graf $G$ neorientat cu $N$ noduri numerotate de la $1$ la $N$ și $M$ muchii. Determinați numărul minim de muchii care trebuie eliminate și numărul minim de muchii care trebuie adăugate în graful $G$ astfel încât acesta sa devina arbore.

Această problemă se împarte în două subprobleme relativ ușor de identificat - aflarea componentelor conexe ale grafului (dacă avem $nr$ componente conexe, va fi nevoie de $nr - 1$ muchii pentru a transforma graful într-unul conex), precum și aflarea numărului de muchii care trebuie scoase pentru a transforma graful în arbore (la final, trebuie să ne rămână $N-1$ muchii). Astfel, vom avea nevoie de $nr - 1$ muchii noi și va trebui să scoatem $M + nr - 1 - (N - 1)$ muchii pentru a avea un arbore. 

\cpp{codes/grafuri/grarb.cpp}

\section{Problema \href{https://kilonova.ro/problems/49}{graf} de pe kilonova}

Se dă un graf neorientat conex cu $N$ noduri și două noduri $X$ și $Y$, să se afle nodurile ce aparțin tuturor lanțurilor optime între $X$ și $Y$.

Pentru a rezolva această problemă, va trebui mai întâi să aflăm folosind o parcurgere de tip BFS distanțele minime de la $X$ și $Y$ spre toate celelalte noduri. Apoi, pentru fiecare distanță $d$ de la $0$ la $\operatorname{dist}(X, Y)$, vrem să aflăm câte noduri se află pe unul din drumurile optime de la $X$ la $Y$ la o distanță $d$ față de $X$. În cele din urmă, vrem să afișăm nodurile situate la distanțele care apar o singură dată în mulțimea nodurilor ce fac parte din cel puțin un drum optim de la $X$ la $Y$.

Codul sursă se poate viziona mai jos. 

\cpp{codes/grafuri/grafOJI.cpp}

\section{Probleme și lectură suplimentară}

\begin{itemize}
\item \href{https://kilonova.ro/tags/300}{Probleme cu grafuri de pe kilonova}
\item \href{https://cppi.sync.ro/materia/grafuri_arbori_notiuni_teoretice_de_baza.html}{Grafuri - noțiuni teoretice de bază}
\item \href{https://usaco.guide/bronze/intro-graphs?lang=cpp}{Articol introductiv de pe USACO Guide}
\item \href{https://usaco.guide/silver/graph-traversal?lang=cpp}{Articol despre parcurgeri de pe USACO Guide}
\item \href{https://codeforces.com/problemset?order=BY_RATING_ASC&tags=combine-tags-by-or%2Cgraphs%2Cdfs+and+similar}{Probleme cu grafuri de pe codeforces, ordonate după dificultate}

\end{itemize}
