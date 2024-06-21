\ChapterWithAuthor{Nimtroducere în teoria jocurilor}{Alecu Ștefan-Iulian}
\section{Ce este un joc?}

Intuitiv, toți știm ce este un joc, doar că este greu să-l definim concret. Un
joc este, fundamental, o activitate recreațională în care ai unul sau mai mulți
jucători (acest lucru este evident). Într-un joc ai și un scop pe care jucătorii
încearcă să-l atingă, împreună cu un set de reguli care determină ce pot să facă
aceștia.

Nu este greu să găsim exemple de jocuri în jurul nostru: Uno, Jenga, șotron,
fazan, telefonul fără fir, șah etc. Totuși... nu este chiar suficient. Cum putem
forma o teorie în jurul jocurilor?

Dacă e să analizăm numele, o teorie a jocurilor implică... jucători, firește. Ca
și în cazul jocurilor normale, aceștia au un scop și niște reguli pe care
trebuie să le urmeze.

Teoria jocurilor este în esență studiul modelelor matematice legate de relațiile
strategice între agenți raționali. Dacă desfășurăm această definiție, ce spune
de fapt este că studiem jocurile între doi sau mai mulți jucători, fiecare având o
strategie (sau un scop, cum i-am zis mai înainte). Modelul matematic al jocului
definește regulile lui, iar prin acesta putem abstractiza o varietate de
situații în ceva mai ușor de analizat. Există multe domenii în care teoria
jocurilor este importantă, printre care științele sociale, economie, dar și în
informatică și logică. Totuși, a ajuns acum și termen umbrelă pentru știința
luării deciziilor la oameni și animale, precum și calculatoare (deci este strâns
legat de inteligența artificială, printre altele).

Hai să vedem un exemplu de astfel de joc și cum l-am putea transforma în ceva
matematic.

\section{Neco-Arc și Destiny}

Obosite de la duelele lor, Neco-Arc și Destiny au decis să se adune la
Ahnenerbe\footnote{Aceste personaje și locații sunt referințe la Fate/Grand
	Carnival:
	\href{https://typemoon.fandom.com/wiki/Ahnenerbe}{https://typemoon.fandom.com/wiki/Ahnenerbe}}
să bea și să stea la taclale. În timp ce Neko se plictisea și se pregătea să-și
mai ia ceva de băut, i-a venit o idee. I-a luat ceva și lui Destiny, a pus toți
galbenii pe care-i avea în punguță (i-a numărat și a văzut că-s 12,
doar ce i-a spart la bar...) și i-a zis: \enquote{Destiny, punem pe masă acești
	galbeni în 3 mormane: una cu 3 galbeni, una cu 4 galbeni și ce-a mai rămas punem
	în alt morman. Trebuie să iei cel puțin un galben, dar doar dintr-un singur
	morman. Cine ia ultimul galben face cinste.} Să vedem o ilustrație (ea nu este,
evident, la scară 1:1):

\begin{figure}[h!t!b]
	\centering
	\includegraphics[width=0.6\textwidth]{images/teoria-jocurilor/tj-neko.png}
\end{figure}

\setnimheight{0.3cm}
\begin{figure}[h!t!b]
	\begin{subfigure}[t]{.30\textwidth}
		\drawnim{3,4,5}[1.3cm]
	\end{subfigure}\hfill%
	\begin{subfigure}[t]{.30\textwidth}
		\drawnim{1,4,5}[1.3cm]
	\end{subfigure}\hfill%
	\begin{subfigure}[t]{.30\textwidth}
		\drawnim{1,4,2}[1.3cm]
	\end{subfigure}%

	\vspace*{1cm}

	\begin{subfigure}[t]{.30\textwidth}
		\drawnim{1,3,2}[1.3cm]
	\end{subfigure}\hfill%
	\begin{subfigure}[t]{.30\textwidth}
		\drawnim{1,2,2}[1.3cm]
	\end{subfigure}\hfill%
	\begin{subfigure}[t]{.30\textwidth}
		\drawnim{0,2,2}[1.3cm]
	\end{subfigure}%

	\vspace*{1cm}

	\begin{subfigure}[t]{.30\textwidth}
		\drawnim{0,1,2}[1.3cm]
	\end{subfigure}\hfill%
	\begin{subfigure}[t]{.30\textwidth}
		\drawnim{0,1,1}[1.3cm]
	\end{subfigure}\hfill%
	\begin{subfigure}[t]{.30\textwidth}
		\drawnim{0,0,1}[1.3cm]
	\end{subfigure}%
	\caption{\label{fig:neco} Un joc posibil între Neco-Arc și Destiny}
\end{figure}

În figura \ref{fig:neco} putem vedea cum ar putea decurge un astfel de joc. Prima
dată avem configurația inițială (am denotat fiecare morman cu $A$, $B$ respectiv
$C$). Neco ia doi galbeni din $A$, ceea ce lasă configurația cu un galben în
$A$. Destiny apoi ia un galben din $C$, ceea ce-l lasă cu doi galbeni. Neco-Arc
ia un galben din $B$, deci $B$ are trei galbeni. Procesul se repetă până când
Neco-Arc ia ultimul galben, iar conform regulilor a câștigat. Poți încerca și tu
același joc, îl poți simula cu orice.

Înainte de a merge mai departe, trebuie să definim jocurile pe care o să le tot
analizăm. Ramura această a teoriei jocurilor se numește \textit{teoria jocurilor
  combinatorice}, iar jocurile studiate-s, evident, jocurile combinatorice.
Ele au aceste proprietăți:
\begin{itemize}
\item Există doi jucători care alternează;
\item Există un set finit de poziții disponibile în joc;
\item Regulile specifică pozițiile valide pentru fiecare jucător;
\item Jocul în sine este finit;
  \item Jocul se termină când un jucătorul nu mai poate muta.
\end{itemize}

În acest capitol ne vom lega de \textit{jocurile imparțiale}. Un joc imparțial este
acela în care setul de mutări permisibile depinde doar de starea curentă și nu
de jucătorul curent. Jocurile \textit{partizane}, precum șah sau Go nu sunt imparțiale
în consecință.

La jocurile imparțiale avem două convenții:
\begin{itemize}
  \item \textit{Joc normal}, în care jucătorul care face ultima mutare câștigă. Motivul
    pentru care este \enquote{normal} este pentru că așa se joacă majoritatea
    jocurilor imparțiale;
  \item \textit{Joc mizer}, în care jucătorul care este forțat să facă ultima mutare pierde.
\end{itemize}

Jocul analizat mai sus este un joc normal (poate fi mizer pentru cel care face
cinste, dar asta este o discuție pe altă dată). Vom găsi mai încolo în acest
capitol o strategie generală pentru aceste jocuri, precum și motivul pentru care
insistăm pe ele.

\section{Afaceri cu cupru}

În timp ce avea drum lung spre
Dilmun\footnote{\href{https://en.wikipedia.org/wiki/Dilmun}{Dilmun} era o
	civilizație semitică din Arabia de Est, având relații comerciale foarte
	prielnice cu Mesopotamia. \textit{n.red.}} ca să cumpere niște lucruri și să se
întoarcă cu ele în Mesopotamia,
Ea-nāṣir\footnote{{\href{https://en.wikipedia.org/wiki/Complaint_tablet_to_Ea-n\%C4\%81\%E1\%B9\%A3ir}{Plângerea
				către Ea-nāṣir}} este o tabletă sumeriană în care Nanni se plânge de calitatea
	proastă a lingourilor de cupru primite de la Ea-nāṣir (sau cum am spune-o în
	zilele noastre în mod informal, și-a luat țeapă). \textit{n.red.}} s-a întâlnit
cu Nanni ca să-i ofere niște lingouri de cupru. După ce le-a inspectat sumar și
și-a trimis sclavul să-i ofere plata lui Ea-nāṣir, cel din urmă a propus să
meargă la o oază să mănânce niște curmale și să piardă puțin timpul (era
plictisitor pe vremea aia). Văzând niște bețe, și-au zis să adune cât mai multe
în caz că vine vreun prădător și apoi Ea-nāṣir i-a propus lui Nanni următorul
joc: \enquote{Avem vreo... 10 bețe. Fiecare dintre noi poate lua un băț, două
	bețe sau trei bețe din grămada asta făcută aici. Cine ia ultimele bețe câștigă,
	iar cel care pierde trebuie să-i dea zece șecheli\footnote{Șechelii nu-s doar în
		Israel, aceștia au provenit din Mesopotamia. \textit{n.aut.}} câștigătorului.}
Vrând să-și recupereze investiția după ce l-a plătit pe Ea-nāṣir și fiindcă suma
era destul de bună, Nanni a acceptat. Să vedem cum ar decurge un astfel de joc:
\begin{itemize}
	\item Începe Nanni, scoate două bețe din grămadă (au mai rămas opt bețe);
	\item Ea-nāṣir scoate trei bețe (au mai rămas cinci bețe);
	\item Nanni scoate un băț (au mai rămas patru bețe);
	\item Ea-nāṣir scoate două bețe, și au mai rămas doar două;
	\item Nanni scoate două bețe și câștigă.
\end{itemize}

În povestea reală, Ea-nāṣir l-a păcălit pe Nanni. Cum putem să-l facem pe Nanni
să câștige mereu dacă începe el (alternativ vorbind, cum îl putem face pe
Ea-nāṣir să piardă mereu)?

Ca să determinăm asta, trebuie să facem niște observații evidente. Este clar că
în acest joc poți avea de la 0 la 10 bețe rămase în grămadă. În plus, nu avem
cum să avem o remiză, deci jocul are doar două stări: ori câștigi, ori pierzi.
Mai exact zis, o \textit{stare câștigătoare} este o stare în care jucătorul va
câștiga dacă va juca optim, iar o \textit{stare pierzătoare} este, firește, o
stare în care jucătorul va pierde dacă oponentul joacă optim. În literatura de
specialitate, un joc este într-o $\mathcal{P}$-poziție (P de la
\textit{previous}) dacă starea curentă garantează câștigul persoanei care a
mutat (adică o stare câștigătoare) și într-o $\mathcal{N}$-poziție (N de la
\textit{next}) dacă starea curentă garantează câștigul persoanei care va muta
(adică o stare pierzătoare).

Ca să-l pregătim pe Nanni, trebuie să-i oferim o strategie generală. Jocul va fi
același, însă vom avea de data asta $n$ bețe. Observația că putem avea de la 0
la $n$ bețe în grămadă tot se aplică.

Putem lua primele cazuri logic. Dacă nu avem bețe în grămadă, se subînțelege că
e o $\mathcal{N}$-poziție pentru că nu are cum să ia bețe. Dacă avem un băț, două bețe
sau trei bețe, putem pur și simplu să le luăm, deci este o $\mathcal{P}$-poziție.
Pentru patru bețe, n-avem ce să facem, va fi o $\mathcal{N}$-poziție pentru că orice
vom face, dacă noi luăm $k \in \{1, 2, 3\}$ bețe, oponentul poate lua
$4 - k \in \{3, 2, 1\}$ bețe.

Există o metodă inductivă pentru a afla dacă o poziție este $\mathcal{N}$-poziție sau
$\mathcal{P}$-poziție:
\begin{enumerate}
	\item Notăm fiecare poziție terminală cu $\mathcal{P}$;
	\item Notăm fiecare poziție care poate ajunge la o $\mathcal{P}$-poziție ca
	      $\mathcal{N}$;
	\item Pentru pozițiile care se mută doar la $\mathcal{N}$-poziții, notăm $\mathcal{P}$;
	\item În cazul în care nu toate pozițiile sunt notate, revenim la pasul 2 și
	      repetăm procesul până când toate pozițiile sunt notate.
\end{enumerate}

Acest proces de mai sus merge în cazul în care câștigătorul este cel care
face ultima mutare. În cazul în care jocul este mizer, se inversează pasul 1.

\begin{figure}[h!t!b]
	\centering
	\footnotesize
	\begin{tikzpicture}
		\pgfmathsetmacro{\boxes}{25}
		\pgfmathsetmacro{\boxwidth}{\textwidth/\boxes}
		\pgfmathsetmacro{\boxheight}{0.9}
		\foreach \i in {0,...,\boxes} {
				\pgfmathtruncatemacro{\result}{mod(\i, 4)}
				\ifnum\result=0\relax
					\filldraw[pattern=north east lines,pattern color=lightgray] (\i*\boxwidth-\boxwidth/2 pt,-\boxheight/2) rectangle (\i*\boxwidth+\boxwidth/2 pt,\boxheight/2);
				\else
					\node[draw, minimum width=\boxwidth pt, minimum height=\boxheight cm] at (\i*\boxwidth pt,0) {};
				\fi

				\node at (\i*\boxwidth pt, 0) {\textbf{\i}};
			}
	\end{tikzpicture}
\end{figure}

Stările hașurate sunt $\mathcal{N}$-pozițiile și se poate remarca ușor că ele se
află la stările divizibile cu 4. Dacă $n \equiv 0 \pmod{4}$, atunci noi vom
pierde, în caz contrar noi vom câștiga. Orice multiplu de 4 se poate reduce la
cazul $n = 4$, caz deja analizat anterior. În concluzie, strategia optimă este
să alegi de fiecare dată o mutare după care numărul de bețe din grămadă este
divizibil cu 4... bineînțeles, având grijă să nu avem noi multiplu de 4. :)

\section{Grafuri de stări}

Putem să reprezentăm aceste jocuri și sub forma unui graf de stări, unde o
muchie de la starea $A$ la starea $B$ reprezintă o tranziție posibilă. O să luăm
ca exemplu un joc mai simplu.

Pe masă sunt $N$ bomboane. Ana şi Bogdan mănâncă alternativ bomboane de pe masă.
Ana se serveşte prima. Dacă găseşte $n$ bomboane pe masă, jucătorul care urmează
poate mânca fie una, fie $\lfloor \tfrac{n}{2} \rfloor$ bomboane (dacă $n > 2$). Câștigă
jucătorul care mănâncă ultima bomboană. În funcţie de $n$, stabiliţi care din
cei doi jucători are strategie de câştig.

\begin{figure}[htbp]
	\centering
	% \digraph[width=13cm]{ao}{
	% 	13 -> 12; 13 -> 6;
	% 	12 -> 11; 12 -> 6;
	% 	11 -> 10; 11 -> 5;
	% 	10 -> 9; 10 -> 5;
	% 	9 -> 8; 9 -> 4;
	% 	8 -> 7; 8 -> 4;
	% 	7 -> 6; 7 -> 3;
	% 	6 -> 5; 6 -> 3;
	% 	5 -> 4; 5 -> 2;
	% 	4 -> 3; 4 -> 2;
	% 	3 -> 2;
	% 	2 -> 1;
	% 	1 -> 0;
	% }
    \includegraphics[width=13cm]{images/teoria-jocurilor/ao.pdf}
	\caption{\label{fig:grafstare} Un graf de stări pentru jocul anterior, $N = 13$.}
\end{figure}

% Reminder sa zic ca jocul asta se cheama MARK si e creat de Avierzri S.
% Fraenkel
% DOI: https://doi.org/10.37236/2015

Graful din fig.~\ref{fig:grafstare} reprezintă toate jocurile posibile pentru
$N \leq 13$ prin drumuri care ajung la 0. Acest graf este un graf aciclic orientat,
în care vârfurile reprezintă stările jocului, iar arcurile reprezintă
tranzițiile sau mutările între acestea. Un vârf din care nu iese niciun arc este
considerat pierzător. Vom vedea în sec.~\ref{sec:grundy} cum ajungem la numerele
de mai jos. Primele câteva cazuri însă le putem deriva.

Pentru $n = 0$ este cam ambiguu, dar din moment ce Ana nu mai poate face vreo
mișcare considerăm că a câștigat Bogdan. Dacă $n = 1$ este evident că Ana ia
ultima bomboană. În cazul în care $n = 2$, Bogdan poate lua ultima bomboană și
câștigă. Pentru $n = 3$, Ana inevitabil va câștiga pentru că fiecare jucător
poate lua câte o bomboană, iar Ana este pe o tură impară.

Dacă $n = 4$, aici devine mai interesant (și putem să urmărim
fig.~\ref{fig:grafstare}). Ana are opțiunea să ia ori 2 bomboane (deci $n = 2$
și are loc reversul cazului tratat anterior), ori o bomboană ($n = 3$ și Ana va
câștiga). În mod interesant, pentru $n = 6$ Bogdan poate câștiga deoarece Ana la
început poate lua o bomboană ($n = 5$, deci Bogdan poate lua
$\lfloor \frac{5}{2} \rfloor = 2$ bomboane și ajungem la cazul $n = 3$ doar că Bogdan va fi
pe tura impară) sau
$\lfloor \frac{6}{2} \rfloor = 3$ bomboane (argument analog).

\begin{figure}[htb]
	\centering
	\footnotesize
  \pgfmathsetmacro{\boxes}{25}
	\begin{tikzpicture}
		\pgfmathsetmacro{\boxwidth}{\textwidth/\boxes*0.95}
		\pgfmathsetmacro{\boxheight}{1}
		\foreach \i in {0,...,\boxes} {
      \ifnum\ifnum\i=0 1\else\ifnum\i=2 1\else\ifnum\i=6 1 \else\ifnum\i=8 1\else\ifnum\i=10 1\else\ifnum\i=14 1\else\ifnum\i=18 1\else\ifnum\i=22 1\else\ifnum\i=24 1\else 0\fi\fi\fi\fi\fi\fi\fi\fi\fi = 1
        \filldraw[pattern=north east lines,pattern color=pink] (\i*\boxwidth-\boxwidth/2 pt,-\boxheight/2) rectangle (\i*\boxwidth+\boxwidth/2 pt,\boxheight/2);
				\else
					\node[draw, minimum width=\boxwidth pt, minimum height=\boxheight cm] at (\i*\boxwidth pt,0) {};
				\fi

				\node at (\i*\boxwidth pt, 0) {\textbf{\i}};
			}
	\end{tikzpicture}
	\caption{\label{fig:stari2k}Stările pentru acest joc ($N = \boxes$); stările hașurate sunt câștigătoare pentru Bogdan.}
\end{figure}

Pentru a analiza în continuare jocurile imparțiale, o să formalizez conceptul de
mai sus de graf de stări. Un joc constă dintr-un graf $G = (X, F)$ unde:
\begin{itemize}
\item $X$ este mulțumea tuturor stărilor posibile ale jocului;
\item $F$ este o funcție care ne dă pentru un $x \in X$ un subset al $x$-urilor
  posibile unde ne putem muta. Pe scurt, $F(x)$ zice ce mutări valide avem din
  $x$. Dacă $F(x) = \emptyset$, atunci poziția $x$ este terminală;
\item Poziția de start este $x_0 \in X$, deci primul jucător face mutarea
  începând din $x_0$;
\item Jucătorii alternează mutările, iar din poziția $x$ jucătorul alege din
  $y \in F(x)$;
\item Jucătorul confruntat cu $F(x) = \emptyset$ pierde.
\end{itemize}

Dacă luăm graful, putem remarca faptul că, pentru jocul nostru curent,
$x_0 = 13$, iar $F(13) = \{6, 12\}$, $F(12) = \{5, 11\}$ etc. De asemenea, este clar
că $F(0) = \emptyset$ deci 0 este o poziție terminală.

În secret am prezentat același joc de trei ori, acesta fiind practic fundația
acestei ramuri a teoriei jocurilor. Urmează acum să vedem acest joc, plus toată
teoria din spatele lui și cum putem rezolva o gamă variată de probleme similare.

\section{Jocul Nim}

\subsection{Definiție}

Toate aceste exemple culmină cu jocul Nim. Deci, ce este acest joc? Jocul Nim,
general vorbind, este un joc în care există $n$ mormane și fiecare dintre aceste
mormane conține un număr de bețe arbitrar. Jucătorii alternează și la fiecare
tură jucătorul curent alege un morman care încă conține bețe și poate elimina un
număr oarecare de bețe din acesta. Câștigătorul este jucătorul care elimină
ultimul băț.

Stările jocului Nim sunt de forma $\{x_{1}, x_{2}, \dots, x_{k}\}$, unde $x_{k}$
denotă numărul de bețe din mormanul $k$. Pentru exemplele pe care le-am văzut,
acestea-s jocuri Nim cu stările $\{3, 4, 5\}$, $\{10\}$, respectiv $\{13\}$. Starea
$\{0, 0, \dots, 0, 0\}$ reprezintă întotdeauna o $\mathcal{N}$-poziție pentru că nu este
posibil să scoatem vreun băț din mormane (logic, toate mormanele-s goale și nu
putem avea un număr negativ de bețe) și aceasta este starea terminală.

Să avem un pic de antrenament cu un joc Nim. Considerăm un joc în care jucătorii
alternează și pot lua $s \in \{1, 3, 4\}$ bomboane din pungă, iar jucătorul
care ia ultima bomboană pierde.

Este clar că pentru $N \in \{1, 3, 4\}$ avem o $\mathcal{N}$-poziție pentru că următorul
jucător poate să le ia pe toate. 0 este, așa cum am văzut, o $\mathcal{P}$-poziție
pentru că jucatorul care mută la 0 câștigă (alternativ spus, jucătorul ce-și
face oponentul său să nu mai aibă bomboane în pungă câștigă, firește). După
aceea, se poate observa că 2 este o $\mathcal{P}$-poziție pentru că singura mutare
legală duce la o $\mathcal{N}$-poziție. Apoi 5 și 6 trebuie să fie $\mathcal{N}$ din moment ce
pot fi mutate la 2. Dacă ne continuăm analiza, avem următoarea secvență de
poziții (cele hașurate reprezintă $\mathcal{P}$-poziții):
\begin{figure}[htb]
	\centering
	\footnotesize
	\begin{tikzpicture}
		\pgfmathsetmacro{\boxes}{24}
		\pgfmathsetmacro{\boxwidth}{\textwidth/\boxes}
		\pgfmathsetmacro{\boxheight}{1}
		\foreach \i in {0,...,\boxes} {
				\pgfmathtruncatemacro{\remainder}{mod(\i, 7)}
				\ifnum\remainder=0
					\filldraw[pattern=north east lines,pattern color=blue!20] (\i*\boxwidth-\boxwidth/2 pt,-\boxheight/2) rectangle (\i*\boxwidth+\boxwidth/2 pt,\boxheight/2);
				\else
					\ifnum\remainder=2
						\filldraw[pattern=north east lines,pattern color=blue!20] (\i*\boxwidth-\boxwidth/2 pt,-\boxheight/2) rectangle (\i*\boxwidth+\boxwidth/2 pt,\boxheight/2);
					\else
						\node[draw, minimum width=\boxwidth pt, minimum height=\boxheight cm] at (\i*\boxwidth pt,0) {};
					\fi
				\fi

				\node at (\i*\boxwidth pt, 0) {\textbf{\i}};
			}
	\end{tikzpicture}
\end{figure}

Periodicitatea nu este coincidență. Jocurile de acest tip se numesc \textit{jocuri de
	scădere}, adică jocuri în care numărul de obiecte $k$ pe care le poți dintr-un
morman aparțin unei mulțimi $S$, adică nu e un număr arbitrar de obiecte. Nim în
sensul clasic cu un singur morman poate fi considerat un joc de scădere. Aproape
orice joc de scădere este garantat să aibă o astfel de secvență periodică.

Acum pentru momentul culminant al acestei discuții: \enquote{Bun, acum știu ce
	e Nim, de ce m-ar interesa de el și cum pot să văd ce jucător va câștiga?}, și
la asta vom răspunde acum.

\subsection{Nimere}

Operația cheie în soluția jocului Nim este xor (sau exclusiv). O să numim
numerele care au ca operația de adunare xor (notat cu $\oplus$) \textit{nimere}.
Să vedem cum arată adunarea pe aceste nimere:

\xorTable{15}

În tabela \ref{fig:xortable} după o privire atentă putem remarca mai multe
proprietăți ale acestei adunări:\footnote{Pentru persoanele mai înclinate, las
	ca temă pentru acasă demonstrația că $G = (\mathbb{N}, \oplus)$ este grup
	abelian elementar sau grup boolean. \textit{n.aut.}}
\begin{itemize}
\item $A \oplus 0 = A$, adică 0 este elementul neutru;
\item $A \oplus B = B \oplus A$, adică operația este comutativă;
\item $A \oplus A = 0$, adică fiecare element este propriul său invers;
\item Avem și asociativitatea:
  $A \oplus (B \oplus C) = (A \oplus B) \oplus C$. Această proprietate este utilă îndeosebi la calcule.
\end{itemize}
Această operație este justificată din următoarele motive:
\begin{itemize}
\item Dacă luăm două jocuri și le combinăm, o să avem un joc cu mai multe
  mormane, dar acesta tot este un joc, deci putem spune că mulțimea
  \enquote{jocurilor} este închisă sub $\oplus$;
\item Jocul cu niciun morman servește ca o identitate (acesta fiind, evident, un
  joc valid în sine), iar dacă îl combini cu orice joc $G$, obții tot $G$;
\item Ordinea combinării jocurilor nu contează, așadar putem spune că operația
  este comutativă;
\item Dintr-un motiv analog operația este și asociativă;
\item Fie un joc $G$. Dacă luăm jocul $G' = G \oplus G$, al doilea jucător poate să
  replice mutarea primului jucător în mormanul opus, deci asta oferă o strategie
  câștigătoare pentru al doilea jucător indiferent de $G$. Există un singur
  element \enquote{pierzător}: 0, adică $G' = 0$, sau $G \oplus G = 0$.
  \textit{Singurul} grup care îndeplinește această proprietate (ignorând grupurile
  izomorfice cu acesta) este grupul boolean, deci $\oplus$ este singura operație
  ce satisface toate proprietățile dorite!
\end{itemize}


\subsection{Strategia}
Dacă luăm un joc oarecare Nim $\{x_1, x_2, \dots, x_k\}$, atunci definim suma Nim ca
fiind $s = \bigoplus_{i = 1}^k x_i = x_1 \oplus x_2 \oplus \cdots \oplus x_k$. De pildă, pentru jocul lui
Neco-Arc și Destiny avem $s = 3 \oplus 4 \oplus 5 = 2$. Strategia câștigătoare este să
terminăm fiecare mutare cu o sumă Nim egală cu 0. Dacă ne uităm la joc, putem
vedea că o configurație dezirabilă ar fi $\{1, 4, 5\}$ pentru că $1 \oplus 4 \oplus 5 = 0$.

Este evident faptul că starea finală are suma Nim nulă ($0 \oplus 0 \oplus \cdots \oplus 0 = 0$). În
alte $\mathcal{N}$-poziții, știm deja că orice stare va duce la o $\mathcal{P}$-poziție,
pentru că atunci când o singură valoare $x_k$ se schimbă, se schimbă și suma
Nim, deci suma Nim va fi diferită de zero după mutare. De asemenea, ne putem muta la
o $\mathcal{N}$-poziție dacă există oricare morman $k$ pentru care $x_k \oplus s < x_k$,
pentru că în acest caz putem îndepărta bețe din mormanul $k$ astfel încât să
conțină $x_k \oplus s$ bețe și ne duce la o $\mathcal{N}$-poziție.

În cazul jocului lui Neco-Arc și Destiny discutat anterior, vom nota suma Nim cu $X = 2$
(a se vedea calculul anterior cu $s$). În acest caz:
\begin{gather*}
	A \oplus X = 3 \oplus 2 = 1\\
	B \oplus X = 4 \oplus 2 = 6\\
	C \oplus X = 5 \oplus 2 = 7
\end{gather*}

Singurul morman care s-a redus este primul morman, deci mutarea câștigătoare
este să reducem mărimea acestuia la 1 prin a scoate doi galbeni.

Ca un caz particular simplu, dacă există doar două mormane rămase, strategia
este să reducem numărul obiectelor din mormanul mai mare pentru a le face egale,
pentru că odată ce-s egale, putem replica mutarea oponentului și vom garanta că
o să luăm ultimul obiect.

Dacă jocul este unul mizer, strategia
diferă doar dacă lăsăm mormane de mărime 1 (dorim să păstrăm un
număr impar de astfel de mormane, iar în cazul jocului normal dorim un număr par).

Fie $s = \bigoplus_{i = 1}^n x_i$ suma Nim a mormanelor înainte de a muta și
$t = \bigoplus_{i = 1}^n y_i$ aceeași sumă dar cu mormanele după ce s-a făcut mutarea.
Dacă am făcut mutarea în mormanul $k$, conform regulilor Nim știm că $x_k > y_k$
(pentru că am luat obiecte din $y_k$) și $x_i = y_i~\forall i \neq k$ (pentru că putem
lua doar din câte un morman). Dacă o luăm din principiile pe care le știm
împreună cu toate proprietățile:
\begin{align*}
	t & = 0 \oplus t                                                                                      \\
	  & = s \oplus s \oplus t                                                                             \\
	  & = s \oplus \left(  \bigoplus_{i = 1}^n x_i \right) \oplus \left( \bigoplus_{j = 1}^n y_j  \right) \\
	  & = s \oplus \left(  \bigoplus_{i = 1}^n x_i \oplus y_i \right)                                     \\
	  & = s \oplus 0 \oplus \cdots \oplus (x_k \oplus y_k) \oplus \cdots \oplus 0                         \\
	  & = s \oplus x_k \oplus y_k
\end{align*}

Ce ne zice formula asta este că suma Nim depinde exclusiv de mormanul ales și de
suma Nim precedentă.

Dacă $s = 0$, atunci indiferent de mutarea făcută $t \neq 0$,
pentru că dacă nu mai există mutări alternative atunci primul jucător pierde
jocul automat, altfel orice mișcare în mormanul $k$ va produce $t = x_k \oplus y_k$,
și cum $x_k \neq y_k$, $x_k \oplus y_k \neq 0$.

Cheia acestui argument e ce se întâmplă dacă $s \neq 0$. În acest caz, avem o
strategie pentru a duce la $t = 0$. Mai exact, dacă facem $y_k = s \oplus x_k$,
atunci este trivial de văzut că $t = 0$. Va exista mereu un astfel de morman,
iar argumentul este următorul. Fie $b(x, n) \in \{0, 1\}$ valoarea bitului de pe
poziția $n$ a lui $x$ de la stânga către dreapta. Alegem
$d = \min \{k \mid b(s, k) = 1\}$ poziția bitului cel mai semnificativ din număr.
Putem găsi un $k$ astfel încât $b(x_k, d) = 1$ (trebuie să existe un astfel de
$k$, pentru că altfel $b(s, d) = 0$). Dacă alegem $y = s \oplus x_k$, atunci știm că
$b(x_k, i) = b(y_k, i)~\forall i < d$. Bitul $d$ scade de la 1 la 0, deci scade
valoarea cu $2^d$ și orice altă schimbare la biții ce rezultă va fi cel mult
$2^d - 1$. Primul jucător poate să facă o mutare prin a lua $x_k - y_k$ obiecte
și deci $t = 0$.

Să luăm un exemplu concret. Se consideră starea $\{10, 12, 5\}$. Această stare
este una câștigătoare pentru că $10 \oplus 12 \oplus 5 = 3$. În binară, stările ar fi
$\{1010_2, 1100_2, 0101_2\}$, iar suma este $0011_2$. Singurul morman care are
bitul setat la 1 în același loc ca cel mai semnificativ bit din $s$ este
mormanul cu 10 bețe. Demonstrația de mai sus ne spune că mărimea noului morman
va fi $10 \oplus 3 = 9$, deci vom lua $10 - (10 \oplus 3) = 1$ băț, iar noua stare
$\{9, 12, 5\}$ va fi pierzătoare pentru că $9 \oplus 12 \oplus 5 = 0$.
\section{Teorema Sprague-Grundy}\label{sec:grundy}
Avem nu una, ci două momente culminante în acest capitol. Tot efortul ăsta se
reduce la această teoremă, care generalizează strategia folosită la Nim la toate
jocurile ce satisfac următoarele cerințe:

Pe scurt, toate jocurile de genul sunt jocuri Nim ascunse într-un palton. Ideea
este să calculăm pentru fiecare joc un număr Grundy care corespunde numărului de
bețe dintr-un morman Nim. Când știm numerele Grundy pentru fiecare stare, putem
juca jocul precum Nim.

\subsection{Numerele Grundy}
Definim funcția mex (valoarea \textbf{m}inimă \textbf{ex}clusă) ca fiind cel mai mic număr
dintr-o mulțime dată care nu aparține acelei submulțimi.
În contextul nostru, o vom defini ca
$\operatorname{mex}(S) = \min \{\mathbb{N} \setminus S\}$ cu $S \subsetneq \mathbb{N}$.
Putem vedea niște exemple:
\begin{align*}
	\operatorname{mex}(\emptyset)             & = 0 \\
	\operatorname{mex}(\{1, 2, 3\})           & = 0 \\
	\operatorname{mex}(\{0, 1, 3, 4\})        & = 2 \\
	\operatorname{mex}(\{0, 1, 4, 7, 12\})    & = 2
\end{align*}

Un număr Grundy este deci $\mathcal{G}(n) = \operatorname{mex} \{ g_1, g_2, ..., g_n \}$,
unde $g_i \in F(n)$ reprezintă mutările valide din $n$. Datorită funcției mex,
dacă nu mai există mișcari posibile atunci numărul său Grundy este 0 pentru că
$\operatorname{mex}(\emptyset) = 0$. O definiție echivalentă și mai concisă este:
\begin{equation*}
  \mathcal{G}(x) = \operatorname{mex} \{ \mathcal{G}(y) : y \in F(x) \}
\end{equation*}

Să ne aducem aminte de graful de la fig.~\ref{fig:grafstare} și să facem toate
numerele Grundy pentru a ne obișnui cu ideea:
\begin{flalign*}
	\mathcal{G}(0) = \operatorname{mex}(\emptyset) = 0                        & \\
	\mathcal{G}(1) = \operatorname{mex}(\mathcal{G}(0)) = 1                   & \\ % mex(0)
	\mathcal{G}(2) = \operatorname{mex}(\mathcal{G}(1)) = 0                   & \\ % mex(1)
	\mathcal{G}(3) = \operatorname{mex}(\mathcal{G}(2)) = 1                   & \\ % mex(0)
	\mathcal{G}(4) = \operatorname{mex}(\mathcal{G}(2), \mathcal{G}(3)) = 2   & \\ % mex(0, 1)
	\mathcal{G}(5) = \operatorname{mex}(\mathcal{G}(2), \mathcal{G}(4)) = 1   & \\ % mex(0, 2)
	\mathcal{G}(6) = \operatorname{mex}(\mathcal{G}(3), \mathcal{G}(5)) = 0   & \\ % mex(1, 1)
	\mathcal{G}(7) = \operatorname{mex}(\mathcal{G}(3), \mathcal{G}(6)) = 2   & \\ % mex(1, 0)
	\mathcal{G}(8) = \operatorname{mex}(\mathcal{G}(4), \mathcal{G}(7)) = 0   & \\ % mex(2, 2)
	\mathcal{G}(9) = \operatorname{mex}(\mathcal{G}(4), \mathcal{G}(8)) = 1   & \\ % mex(2, 0)
	\mathcal{G}(10) = \operatorname{mex}(\mathcal{G}(5), \mathcal{G}(9)) = 0  & \\ % mex(1, 1)
	\mathcal{G}(11) = \operatorname{mex}(\mathcal{G}(5), \mathcal{G}(10)) = 2 & \\ % mex(1, 0)
	\mathcal{G}(12) = \operatorname{mex}(\mathcal{G}(6), \mathcal{G}(11)) = 1 &  % mex(0, 2)
\end{flalign*}

Să comparăm stările de la fig.~\ref{fig:stari2k} cu ce avem aici. Remarcați un
model? În toate cazurile unde $\mathcal{G}(n) = 0$, Bogdan câștigă. Nu este deloc
coincidență!

\subsection{Suma a două jocuri}
Momentan am considerat în această secțiune jocuri cu un singur morman, însă nu
ne putem limita acolo. Ce facem dacă avem mai multe mormane?

Fie două jocuri imparțiale $G$ și $H$. Definim suma lor $G + H$ ca fiind jocul
unde $G$ și $H$ sunt jucate în paralel și jucătorul care va muta trebuie să
facă mutarea \textit{ori} în $G$, \textit{ori} în $H$. Un jucător pierde, cum ne-am aștepta,
în momentul în care nu mai face mișcare. Dacă vrem să fim formali:
\begin{equation*}
  G + H = \{G + h \mid h \in H\} + \{g + H \mid g \in G\}
\end{equation*}

Acest lucru este important pentru că putem merge înapoi și să descompunem
jocurile văzute până acum în jocuri cu un singur morman. De pildă, jocul lui
Neco-Arc și Destiny se reduce la $\{3, 4, 5\} = \{3\} + \{4\} + \{5\}$ (unde înțelegem
că vorbim de jocuri Nim cu această notație). Această adunare este la rândul ei
comutativă și asociativă.

\subsection{Teorema}
În final, am ajuns la a vorbi despre teoremă în sine.

Teorema Sprague-Grundy spune că orice joc imparțial sub convenția de joc normal
este echivalent cu un joc Nim cu un singur morman sau cu o generalizare infinită
a lui Nim. Putem deci să-l reprezentăm folosind un număr natural (mărimea
mormanului în jocul echivalent de Nim) sau ca un nimăr. Acest nimăr (care se va
dovedi a fi mai util în calcule) îl aflăm folosind numerele Grundy prezentate în
acest capitol.

Fie un joc Nim cu un singur morman $G = \{n\}$. O să notăm acest caz cu $*n$.
Teorema ne spune următoarele lucruri:
\begin{enumerate}
\item $\mathcal{G}(*n) = n$ (pentru un singur morman de mărime $n$, nimărul asociat cu
  acesta este chiar $n$);
\item O poziție $n$ este pierzătoare pentru următorul jucător (adică este o
  $\mathcal{P}$-poziție) dacă și numai dacă $\mathcal{G}(n) = 0$;
\item Valoarea Grundy a unui set finit de poziții este egal cu suma Nim a
  valorilor Grundy ale componentelor sale:
  \begin{equation*}
    \mathcal{G}\left( \sum_{i=1}^n G_i \right) = \bigoplus_{i=1}^n \mathcal{G}(G_i)
  \end{equation*}
\end{enumerate}

În practică, această teoremă ne oferă un algoritm concret de a determina dacă
primul jucător câștigă sau pierde pentru orice joc imparțial cu doi jucători. Un
număr surprinzător de jocuri se reduc fix la asta.

Pentru a calcula valoarea Grundy a unei stări, urmăm acești pași:
\begin{enumerate}
\item Obținem toate tranzițiile posibile din starea curentă (cu alte cuvinte,
  determinăm $F(x)$);
\item Fiecare tranziție poate duce la o sumă de jocuri independente. Pentru
  fiecare dintre aceste jocuri, calculăm valoarea Grundy și facem suma Nim
  între ele. Cazul degenerat este cel în care avem un singur joc, caz în care
  $\oplus$ nu face nimic.
\item După ce avem aceste valori Grundy pentru fiecare tranziție, aflăm valoare
  stării ca fiind mex-ul între aceste numere;
\item Dacă $\mathcal{G}(x) = 0$ atunci starea curentă este pierzătoare, altfel este câștigătoare.
\end{enumerate}

Deseori când rezolvăm probleme specifice folosind valori Grundy este benefic să studiem tabelul valorilor în căutarea unor modele. Rare sunt problemele în context de concurs sau olimpiadă în care jocul este aperiodic sau pentru care nu există o formulă (un exemplu de astfel de joc a fost chiar cel cu care am exemplificat graful de stări\footnote{Acest joc se cheamă \textsc{Mark}, descris în Frankael, Aviezri S., \enquote{Aperiodic Subtraction Games}, The Electronic Journal of Combinatorics, vol. 18, nr. 2, \url{http://dx.doi.org/10.37236/2015}.}). Dacă modificam \textsc{Mark} astfel încât să se poată lua cel puțin o bomboană și \textit{cel mult} $\lfloor
\frac{n}{2}\rfloor$ bomboane (adică nu ori o bomboană, ori $\lfloor \frac{n}{2} \rfloor$
bomboane), putem găsi o formulă ușor în termeni de mex.\footnote{Rezolvarea se poate
  găsi la \enquote{\textenglish{sprague-grundy : what if player allowed to take half of the coins?}}, URL (versiune: 2012-11-01):
  \href{https://web.archive.org/web/20231227022832/https://math.stackexchange.com/questions/226713/sprague-grundy-what-if-player-allowed-to-take-half-of-the-coins}{https://math.stackexchange.com/questions/226713}
(preluat la 2023-12-27). \textit{n.aut.}}.

Acum vom rezolva niște probleme clasice de pe CSES.
\section{Problema \href{https://cses.fi/problemset/task/1729}{Stick Game}}
Considerăm un joc unde doi jucători scot bețe dintr-un morman. Jucătorii mută alternativ și jucătorul care scoate ultimul băț câștigă (adică este un joc normal, evident Nim). Ni se oferă și un set $P = \{p_1, ..., p_k\}$ care determină mulțimea de mutări permise (adică mulțimea $X$ din definiția unui joc). În exemplu ni se oferă $P = \{1, 3, 4\}$, joc tratat deja la definiția jocului Nim. Trebuie să determinăm pentru fiecare număr de la 1 la $n$ dacă primul jucător câștigă (caz în care afișăm $W$) sau dacă pierde (afișăm $L$). De notat că în mulțimea $P$ cel puțin un număr este 1 și toate mutările sunt distincte.

Dacă avem un singur băț, atunci este o mutare câștigătoare pentru că poate lua ultimul băț. Pentru două bețe, inevitabil va fi o mutare pierzătoare pentru că orice mutare validă poate fi reflectată de către oponent. 

Problema aceasta se reduce la un DP. Verificăm dacă putem face o mutare validă (mai exact, $i \geq p_i$ ca să luăm cât de multe bețe se poate, dar ca să fie și un index valid pentru următoarea parte) și dacă mutarea respectivă duce oponentul la o mutare pierzătoare (dacă $\text{dp}[i - p_i]$ duce la $L$). Complexitatea este \bigO{nk}, iar rezolvarea este următoarea:

\begin{minted}{cpp}
#include <iostream>
#include <vector>
#include <string>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    unsigned int n, k;
    cin >> n >> k;
    vector<unsigned int> p(k);

    string dp(n + 1, 'L');

    for (auto &x: p)
        cin >> x;

    for (auto i{1U}; i <= n; ++i) {
        for (const auto j: p) {
            if (i - j >= 0 && dp[i - j] == 'L')
                dp[i] = 'W';
        }
    }

    cout << dp;
}
\end{minted}

\section{Problema \href{https://cses.fi/problemset/task/1730}{Nim Game I}}

Această problemă este clasică și este o aplicare directă a cunoștințelor de Nim pe care le-am ilustrat în acest articol. Pentru completitudine: se dă $t$ numărul de teste, apoi avem $t$ teste, unde $n$ conține numărul de mormane și $x_k$ ($1 \leq k \leq n$) descrie numărul de bețe din mormanul $k$. Trebuie să afișăm \enquote{first} dacă primul jucător câștigă (unde condiția de câștig este care jucător ia ultimul băț) sau \enquote{second} în caz contrar.

Aici, al doilea jucător câștigă dacă $\bigoplus_{k = 1}^n x_k = 0$, în caz contrar câștigă primul jucător. Aici este rezolvarea:
\begin{minted}{cpp}
#include <iostream>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    size_t t, n;
    cin >> t;
    while (t--) {
        cin >> n;
        unsigned int _xor = 0, x;
        for (auto i{0U}; i < n; ++i) {
            cin >> x;
            _xor ^= x;
        }
        cout << (_xor ? "first" : "second") << "\n";
    }
}
\end{minted}

\section{Problema \href{https://cses.fi/problemset/task/1098}{Nim Game II}}

Această problemă este precum problema anterioară, dar putem lua $1$, $2$ sau $3$ bețe. Acest joc este cel tratat în jocul dintre Nanni și Ea-nāṣir. Mai precis, este un joc de scădere. Ce putem face la astfel de probleme este să considerăm mormanul $\bmod~4$ (în general, dacă trebuie să luăm $1, 2, ..., k$ bețe atunci considerăm $\bmod~k+1$ și continuăm cu Nim ca de obicei. Se schimbă doar for-ul, adică:
\begin{minted}{cpp}
for (auto i{0U}; i < n; ++i) {
    cin >> x;
    x %= 4;
    _xor ^= x;
}
\end{minted}

\section{Problema \href{https://cses.fi/problemset/task/1099}{Stair Game}}
Aici avem o problemă mai interesantă față de cele văzute până acum. Ni se dau $n$ scări, numerotate de la 1 la $n$. Inițial, fiecare scară are un număr anume de mingi. Avem doi jucători care mută alternativ. La fiecare mutare, un jucător alege o scară $k \neq 1$ și trebuie să mute cel puțin o minge. Apoi, jucătorul mută orice număr de mingi de la scara $k$ la scara $k - 1$. Jucătorul care mută ultimul câștigă jocul. Formatul datelor de intrare și de ieșire nu se schimbă față de Nim Game I și II.

Este o variație a jocului Nim. Putem să împărțim scările în două tipuri: scări pare și scări impare. Să ne gândim ce se întâmplă dacă primul jucător mută o minge de la o scară impară la una pară. Al doilea jucător poate să mute aceste mingi la o scară pară și logica jocului nu se schimbă. Aceeași logică nu se aplică și în revers, deoarece poate exista o situație unde al doilea jucător nu poate să mute mingile pe o scară pară pentru a restaura starea. 

O consecință a argumentului de mai sus este că scările impare-s inutile, deoarece nu afectează starea jocului. Dacă mă aflu într-o poziție câștigătoare și tu muți o minge de la o scară pară, pot muta mingile iarăși la o scară impară și îmi voi menține poziția câștigătoare. 

Așadar, putem spune că această problemă se reduce, ați ghicit, la un Nim, doar că luăm în considerare doar scările pare. Problema \href{https://www.hackerrank.com/challenges/move-the-coins/problem}{Move the Coins} de pe HackerRank este similară cu aceasta, doar că implică $n$ noduri, simplu de adaptat. De fapt, recomand să vă înscrieți la contestul \href{https://www.hackerrank.com/contests/5-days-of-game-theory/challenges}{5 Days of Game Theory} pe HackerRank unde aveți mai multe probleme de antrenament din ce în ce mai grele. Se schimbă iarăși doar for-ul:
\begin{minted}{cpp}
for (auto i{0U}; i < n; ++i) {
    cin >> x;
    if (i % 2 == 0)
        continue;    
    _xor ^= x;
}
\end{minted}

\section{Problema \href{https://cses.fi/problemset/task/2207}{Grundy's Game}}

Acest joc este unul clasic în teoria jocurilor, făcut de același Grundy care a descoperit independent teorema Sprague-Grundy. Avem $n$ monede și doi jucători care, ați ghicit, mută alternativ. La fiecare mutare, un jucător alege un morman și împarte în două mormane care au un număr diferit de monezi. Avem $t$ numărul de teste și apoi $n$ numărul de monezi în mormanul inițial.

Dacă de pildă avem un morman de mărime $6$, atunci nu putem împărți în două mormane de mărime $3$, dar putem avea $5$ și $1$, $4$ și $2$, $1$ și $5$ și $2$ și $4$. Putem analiza acest joc folosind teorema Sprague-Grundy. Pentru asta, trebuie să convertim mărimea mormanelor în mărimile echivalente ale mormanelor Nim. Printr-o întâmplare, această secvență se află în \href{https://oeis.org/A002188}{OEIS A002188}. Există o conjectură că jocul devine eventual periodic, însă nu am găsit acest lucru pentru $n \leq 2^{35}$ (valori calculate de A. Flammenkamp), deci nu are rost să căutăm un șablon. Pentru această problemă ne putem folosi de programarea dinamică, funcția mex permițându-ne acest lucru. Putem găsi mex-ul tuturor stărilor care sunt valide pentru o stare anume. Cea mai mare valoare pentru care numărul său Grundy este egal cu 0 este 1222 și este conjecturat că nu mai există alte valori, deci are rost să considerăm doar ce este între 3 și 1222 (am pus 1224 de siguranță):
\begin{minted}{cpp}
#include <iostream>
#include <vector>

using uint = unsigned int;
using namespace std;

vector<uint> dp{0, 0, 0};

uint mex(vector<uint> &states) {
    vector<bool> f(states.size() + 1);
    uint mex = 0;
    for (const auto state: states) {
        if (state <= states.size()) {
            f[state] = true;
        }
    }
    while (f[mex]) ++mex;
    return mex;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    size_t t, n;
    cin >> t;
    for (size_t i{3}; i <= 1224; ++i) {
        vector<uint> v;
        for (size_t j = 1; i - j > j; j++) {
            v.push_back(dp[j] ^ dp[i - j]);
        }
        dp.push_back(mex(v));
    }
    while (t--) {
        cin >> n;
        if (n >= 1224) {
            cout << "first\n";
        } else {
            cout << (dp[n] ? "first\n" : "second\n");
        }
    }
}
\end{minted}

\section{Problema \href{https://cses.fi/problemset/task/2208}{Another Game}}