\ChapterWithAuthor{Ciurul lui Eratostene și alte aplicații}{Ștefan Dăscălescu}

\section{Cunoștinte necesare}

Înaintea citirii acestui articol, se recomandă citirea articolului despre divizibilitate. De asemenea, pentru unele aplicații mai avansate, cunoașterea elementară a STL este necesară.

\section{Ce este ciurul lui Eratostene?}

% to-do - add link 

Ciurul lui Eratostene este o metodă eficientă de afla toate numerele prime între $1$ și $n$, folosindu-ne de proprietățile corespunzătoare numerelor naturale, precum și de relațiile dintre divizori și multipli. Pe lângă aplicația sa principală, se va dovedi a fi un algoritm foarte util pentru foarte multe tipuri de precalculări care sunt centrate în jurul aflării divizorilor sau a altor valori ce se calculează în funcție de divizorii numerelor de la $1$ la $n$.

Pentru a afla numerele prime de la $1$ la $n$, vom avea un algoritm simplu, care va lua la rând numerele de la $2$ la $n$ și pentru fiecare număr nemarcat de la $2$ la $n$, se vor marca toți multiplii acestuia. Astfel, numerele nemarcate sunt numerele prime, acestea nefiind marcate anterior de momentul accesării lor, iar numerele marcate sunt numerele compuse. Se remarcă faptul că $1$, nefiind număr prim, nu este luat în considerare.

Să exemplificăm algoritmul pentru numerele de la $2$ la $30$. Voi descrie doar pașii ce exemplifică ce se întâmplă când avem de-a face cu numere prime.

\begin{itemize}
    \item La pasul $i = 2$, $2$ este marcat drept număr prim, iar acesta va marca numerele pare de la $4$ la $30$ drept compuse $(4, 6, 8, 10, 12, 14, 16, 18, 20$, \\ $22, 24, 26, 28, 30)$.
    \item La pasul $i = 3$, $3$ este marcat drept număr prim, iar acesta va marca numerele multiplu de $3$ de la $6$ la $30$ drept compuse $(6, 9, 12, 15, 18, 21, 24, 27, 30)$.
    \item La pasul $i = 5$, $5$ este marcat drept număr prim, iar acesta va marca numerele multiplu de $5$ de la $10$ la $30$ drept compuse $(10, 15, 20, 25, 30)$.
    \item La pasul $i = 7$, $7$ este marcat drept număr prim, iar acesta va marca numerele multiplu de $7$ de la $14$ la $30$ drept compuse $(14, 21, 28)$.
    \item La pasul $i = 11$, $11$ este marcat drept număr prim, iar acesta va marca numerele multiplu de $11$ de la $22$ la $30$ drept compuse $(22)$.
    \item La pasul $i = 13$, $13$ este marcat drept număr prim, iar acesta va marca numerele multiplu de $13$ de la $26$ la $30$ drept compuse $(26)$.
    \item La pașii $i = 17$, $i = 23$, $i = 29$, $17$, $23$ și $29$ sunt marcați drept numere prime, dar multiplii lor mai mari ca ei sunt mai mari ca $30$, nemaifiind marcați drept numere compuse, chiar dacă sunt, deoarece nu fac parte din scopul rulării algoritmului nostru pentru numerele până la $30$.
\end{itemize}

\begin{figure}[ht!]
\centering
\includegraphics[width=1.0\linewidth]{images/sieve/sieve.png}
\caption{\label{fig:frog}Un exemplu de vizualizare pentru numerele de la $1$ la $16$}
\end{figure}

Algoritmul se dovedește a fi o optimizare față de metoda standard de aflare pentru toate numerele de la $1$ la $n$ a primalității, complexitatea devenind $O(n \log \log n)$ pentru aflarea primalității pentru toate numerele, respectiv $O(n \log n)$ pentru majoritatea celorlalte tipuri de prelucrări. De asemenea, și implementarea se dovedește a fi una foarte scurtă, ciurul putând fi scris în câteva rânduri. 

\begin{minted}{cpp}
int prim[100001];
for(int i = 2; i <= n; i++)
    if(prim[i] == 0)
        for(int j = i + i; j <= n; j += i)
            prim[j] = 1;
\end{minted} 

\begin{observation}
E de remarcat că numerele prime vor fi cele nemarcate, iar numerele compuse vor fi cele marcate cu $1$.
\end{observation}

\subsection{Optimizări ale implementării}

Deși algoritmul în sine este deja foarte rapid, în practică concurenții tind să aplice diverse optimizări de constantă inspirate din optimizările ce se pot aplica algoritmului de aflare a divizorilor unui număr $n$. Printre altele, putem vorbi de începerea celui de-al doilea for de la $i^2$ (primul număr compus care nu a fost marcat anterior va fi mereu $i^2$) sau de procesarea lui $2$, urmată de procesarea numerelor impare din $2$ în $2$.

\begin{minted}{cpp}
int prim[100001];
for(int i = 4; i <= n; i += 2)
    prim[i] = 1;
for(int i = 3; i <= n; i += 2)
    if(prim[i] == 0)
        for(int j = i * i; j <= n; j += i * 2)
            prim[j] = 1;
\end{minted} 

\begin{observation}
Trebuie avut grijă la cel de-al doilea for deoarece expresia \cppinline{int j = i * i;} poate cauza overflow dacă implementarea nu este una corespunzătoare. De aceea, concurenții pot folosi o optimizare similară și pentru primul for.
\end{observation}

\begin{minted}{cpp}
int prim[100001];
for(int i = 4; i <= n; i += 2)
    prim[i] = 1;
for(int i = 3; i * i <= n; i += 2)
    if(prim[i] == 0)
        for(int j = i * i; j <= n; j += i * 2)
            prim[j] = 1;

// afisarea numerelor prime de la 1 la n
for(int i = 2; i <= n; i++)
    if(prim[i] == 0) 
        cout << i << " ";
\end{minted} 

Chiar dacă aceste implementări nu îmbunătățesc semnificativ performanța ciurului lui Eratostene, ele pot fi utile în contextul optimizărilor ce ar putea fi folosite la rezolvarea problemelor. 

\section{Alte aplicații ale ciurului lui Eratostene}

După cum am menționat la începutul articolului, ciurul lui Eratostene este un algoritm foarte versatil, putând fi folosit pentru aflarea multor proprietăți ale numerelor, precum divizorii (primi sau toți) ai unui număr, pentru calcule de tipul celor folosite la pinex (link către articol mobius) și așa mai departe. Câteva din implementările acestor operații vor fi prezentate mai jos, în cadrul problemei educaționale descrisă în cele ce urmează. 

\section{Problema \href{https://kilonova.ro/problems/2108}{Ciurul lui Eratostene} de pe Kilonova}

Se dau $q$ operații de forma $type \ value$. În funcție de tipul operației, va trebui să faceți următoarele lucruri:

\begin{itemize}
\item \texttt{1 value}: Să se afișeze '\texttt{Prime}' sau '\texttt{Composite}' dacă numărul este prim, respectiv compus.
\item \texttt{2 value}: Să se afișeze divizorii primi ai lui $value$, în ordine crescătoare. Dacă $value = 1$, se va afișa o linie \textbf{goală}.
\item \texttt{3 value}: Să se afișeze divizorii lui $value$, în ordine crescătoare.
\end{itemize}

Pentru a rezolva problema (și în general pentru a rezolva problemele care implică folosirea ciurului lui Eratostene), ne vom precalcula toate răspunsurile folosind variații ale ciurului lui Eratostene, una pentru numerele prime și cealaltă pentru divizori în general. Pentru a ține în memorie toți divizorii, vom folosi varianta din STL a vectorilor, deoarece face accesarea datelor mai ușoară.

\cpp{codes/divizibilitate/sieve.cpp}

\section{Problema \href{https://kilonova.ro/problems/890}{Cufăr - OJI 2018} de pe Kilonova}

Vrăjitoarea cea bună are un cufăr în care este închisă piatra magică de către piticii lăzii cu ajutorul unui cifru digital. Piticii i-au dat vrăjitoarei o cutie în care sunt $n$ cartonașe. Pe fiecare cartonaș este scris un număr natural pe care vrăjitoarea îl va folosi să deschidă lada. Valorile scrise pe cartonașe sunt distincte între ele.

Pentru a afla cifrul trebuie să procedeze astfel: extrage fiecare cartonaș din cutie și apoi determină valoarea magică asociată numărului natural scris pe cartonaș. Pentru fiecare cartonaș valoarea magică este dată de al $k$-lea divizor prim al numărului înscris pe acesta. Vrăjitoarea trebuie să adune valorile magice obținute pentru cele $n$ cartonașe și apoi să introducă în ordine cifrele valorii obținute, pentru a descuia lada.

Pentru a rezolva problema vom afla folosind un ciur toți divizorii primi ai numerelor mai mici sau egale cu $10^6$, aceștia fiind folosiți pentru a calcula răspunsul la query-uri. Aflarea răspunsului final devine ușoară ulterior efectuării acestui pas.

\href{https://kilonova.ro/submissions/160634}{Soluția de $100$ de puncte}

\section{Problema \href{https://kilonova.ro/problems/514}{primprim - OJI 2023} de pe Kilonova}

Pentru un număr natural a definim costul ca fiind valoarea absolută (modulul) diferenței dintre a și numărul prim cel mai apropiat de a. Asupra unui șir de $n$ numere naturale, situate pe poziții numerotate de la $1$ la $n$, se aplică, în ordine, o succesiune de $q$ operații. O operație constă dintr-o înlocuire și o afișare și este descrisă sub forma $i \ x \ p$, cu semnificația: mai întâi înlocuim cu $x$ elementul din șir de pe poziția $i$; apoi afișăm suma minimă totală a costurilor unor elemente convenabil selectate de pe $p$ poziții distincte din șir.

Cunoscând $n$ și cele $n$ elemente ale șirului, scrieți un program care să determine:

\begin{itemize}
\item: suma costurilor tuturor elementelor din șirul dat;
\item: rezultatele afișate în urma aplicării fiecăreia dintre cele $q$ operații, date în forma precizată.
\end{itemize}

Pentru a rezolva problema, vom precalcula pentru fiecare valoare răspunsul optim pentru fiecare număr de la $1$ la $a$ folosind ciurul lui Eratostene. Apoi, parcurgem valorile de la $1$ la $a$ pentru a afla răspunsul optim după ce am aflat numerele prime din șir. 

Pentru a rezolva query-urile, voi folosi un vector de frecventa pentru a tine aceste diferențe, care de altfel sunt destul de mici. Apoi, pentru fiecare query, voi parcurge vectorul de frecvență pentru a afla suma celor mai mici $p$ diferențe.

\href{https://kilonova.ro/submissions/18796}{Soluția de $100$ de puncte}

\section{Probleme și lectură suplimentară}

\begin{itemize}
\item \href{https://kilonova.ro/tags/328}{Probleme cu ciurul lui Eratostene de pe kilonova}
\item \href{https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes}{Wikipedia - Ciurul lui Eratostene}
\item \href{https://cp-algorithms.com/algebra/sieve-of-eratosthenes.html}{Articol de pe CP Algorithms}

\end{itemize}


