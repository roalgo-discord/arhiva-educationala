\ChapterWithAuthor{Introducere în programarea dinamică}{Manolea Teodor Ștefan}

\section{Introducere}
% un pic mai formal aici plz 
Salvete tuturor! Dacă citiți acest document înseamnă că vă interesează să aflați informații introductive despre programarea dinamică.

Ca să începem lecția vă voi adresa următoarea întrebare: “Ce înseamnă programarea dinamică?”.

Ei bine, vom utiliza o analogie ca să ne fie mai ușor să înțelegem:

Haide să plecăm de la un sistem de referință ideal, să zicem că avem o mașină Dacia Solenza. Ei bine, când ne gândim la ea, care ne sunt primele proprietăți, pe care le are în comun cu orice altă mașină, care ne vin în cap?
Păi, o mașină are un motor, hai să zicem că mașina noastră are 200 cai putere. 
Ce mai are o mașină? O greutate, să zicem că mașina noastră are 2 tone.
Ei bine, aceste proprietăți, noi o să le numim parametri. Acum, acești parametrii, grupați împreună, formează o stare, parametrii purtând numele de “Parametrii de stare”.
Acum hai să presupunem că-i schimbăm motorul mașinii într-unul de la Ferrari, care să zicem că are 150 cai putere, această schimbare o putem numi o tranziție, așa cum o să-i și spunem de acum încolo. 

Aceste stării și tranziții stau la baza gândirii dinamice, care reprezintă defapt programarea dinamică.
Acum că avem o analogie de bază, putem să ajungem la o “formula” de bază a programării dinamice. 
Ea se va enunța astfel:
\begin{figure}
    \centering
    \includegraphics[width=0.75\linewidth]{images/introducere-dp/imagine-stari.png}
    \caption{Exemplu de tranziție}
    \label{fig:enter-label}
\end{figure}
Traducerea este următoarea:
\begin{itemize}
    \item "S1" = Starea 1 (reprezintă valorile stării inițiale)
    \item "->" = Tranziția (reprezintă funcția care va aplica niște instrucțiuni bazate pe valorile parametrilor din S1                     și va transmite rezultatul în S2) 
    \item "S2" = Starea 2 (reprezintă valorile stării finale, care rezultă din tranziție)
\end{itemize}

Din această formula putem ajunge la concluzia că, băbește spunând, programarea dinamică este “programarea pe stării”, care are la bază un mod de gândire.
La programarea dinamică i se mai spune și “DP”, fiind un termen standard vom începe să-l utilizăm și noi în documentul prezent!

\section{Clasificare}
Având acum noțiunile teoretice de bază asupra modului de gândire parcurse, aș vrea să vă definesc niște moduri de clasificare a programării dinamice, după modul de a fi scrise, după modul de abordare a lor, după modul în care tranziția transmite informația de la o stare la alta și respectiv după ramura tipurilor de probleme a cărora aparțin ele.
\subsection{Tipuri de scriere}
\begin{itemize}
    \item Recursiv (Utilizează recursivitatea standard)
    \item Iterativ (Utilizează complete search)
\end{itemize}


\begin{figure}
    \centering
    \includegraphics[width=1\linewidth]{images/introducere-dp/tabel-comparatii-recursiv-iterativ.png}
    \caption{Pentru un participant la competiții de informatică este esențial să știe cum se scrie în ambele forme!}
\end{figure}
\subsection{Modalități de abordare}
\begin{itemize}
    \item Top-Down DP:
        \begin{enumerate}
            \item Această formă de DP pleacă de la starea finală a problemei, ea utilizând stările anterioare, până la starea inițială pe care o cunoaștem, pentru a-și construi parametrii ei.
            \item De obicei această formă de DP este scrisă utilizând recursivitatea
        \end{enumerate}
    \item Bottom-Up DP:
        \begin{enumerate}
            \item Această formă de DP pleacă de la starea inițială a problemei, ea construind parametrii stărilor următoare care la rândul lor vor face asta până ce ajungem la construirea parametrilor stării finale.
            \item De obicei această formă de DP este scrisă utilizând Complete Search-ul
        \end{enumerate}
\end{itemize}
\subsection{Modalități de tranziție}
\begin{itemize}
    \item Pull-DP: Această formă de tranziție are la bază “tragerea” informației necesare pentru formarea parametrilor stării curente din starea anterioară.
    \item Push-DP: Această formă de tranziție are la bază “împingerea” informației necesare pentru formarea stării următoarea din starea curentă
\end{itemize}
\subsection{Ramuri ale DP-ului}
\begin{itemize}
    \item Counting DP (programare dinamică de numărare)
    \item Knapsack DP (programare dinamică bazată pe problema rucsacului)
    \item Bitmasking DP (programare dinamică bazată pe mascarea biților)
    \item Tree DP (programare dinamică pentru arbori)
\end{itemize}

\section{Probleme clasice}
În continuare, o să discutăm despre niște probleme clasice în cadrul dp-ului, ele făcând parte din ramurile de numărare și a problemei rucsacului.

\subsection{Problema monezii}
Astăzi, la ora domnului profesor Tetris, ți s-a pus următoarea întrebare: “Dacă eu îți dau N tipuri de monede, având acces la o infinitate de monede de acele tipuri, află modalitatea optimă de a obține suma S”. 
Pe momentul orei tu nu ai știut cum să răspunzi, Însă acum, mai determinat ca niciodată, vrei să rezolvi această problem, având în față un document educational de 5 stele Micheline. Rezolvă problema!

\paragraph{Notițe problemă:}
Vom defini modalitatea optimă de a obține suma S ca fiind modalitatea prin care utilizezi cât mai puține monede per total!

\paragraph{Limite:}
1 <= N <= 500
1 <= S <= 100000
1 <= Coins[i] <= 2500

\paragraph{Rezolvare:}
La început, când ați citit această problemă, probabil v-ați gândit la o rezolvare Greedy (care mai încolo o să vedeți că este Greedy Euristic), prin care ați fi sortat descrescător șirul de monede și ați fi încercat să utilizați denominația cea mai mare, care este mai mică ca S, cât timp puteați. După ați fi continuat cu următoarea denominație cea mai mare care respectă condiția aceasta pentru suma rămasă ș.a.m.d.
Ca să vă dovedesc că nu funcționează această modalitate, încercați să rezolvați această problemă, utilizând modalitatea anterior prezentată, având aceste date de intrare:
N = 3
S = 31
Coins[N] = {7, 2, 15}

Acum că ați încercat să rezolvați problema într-un mod cunoscut vouă, și ați văzut că nu îți garantează un răspuns, haideți să vă prezint o soluție corectă!

Pentru această problem, o să vă prezint soluțiile utilizând ambele modalități de abordare, scriere a sursei și modalități de tranziție.

//De completat explicatie

\paragraph{Cod:}
\begin{itemize}
    \item Recursiv:
    \cpp{codes/introducere-dp/recursiv_necomentat_top-down_pull-dp.cpp}
    \item Iterativ:
    \cpp{codes/introducere-dp/iterativ_necomentat_bottom-up_push-dp.cpp}
\end{itemize}

Acum ca v-am invatat cum sa faceti o simpla problema, va provoc sa faceti problemele de la lot :rotroll:(o sa scot asta)