\ChapterWithAuthor{Stivă}{Traian Mihai Danciu}

\section{Cunoștințe necesare}

\begin{enumerate}
    \item Vectori (tablouri unidimensionale)
\end{enumerate}

\section{Noțiuni introductive}

Stiva este ca un teanc de obiecte. Ea are $4$ operații principale:
\begin{enumerate}
    \item \textit{push(value)}: Adaugă \textit{value} pe vârful stivei.
    \item \textit{top()}: Spune care este valoarea de pe vârful stivei.
    \item \textit{pop()}: Scoate elementul de pe vârful stivei.
    \item \textit{empty()}: Spune dacă stiva este goală.
\end{enumerate}

\begin{observation}
Valorile vor fi returnate după regula \textit{LIFO}, adică \textit{last in, first out}.
\end{observation}

\section{Problema \href{https://kilonova.ro/problems/2001}{stack}}

Această problemă ne cere să implementăm exact operațiile descrise mai sus. \href{https://kilonova.ro/pastes/Z565qzCucYNl}{Acesta} este link-ul la implementare.

\subsection{Stiva din STL}

Stiva poate fi implementată și cu funcțiile din STL. Pentru mai multe detalii, vedeți \href{https://kilonova.ro/pastes/BkG7Wrt8wQ83}{implementarea} și \href{https://en.cppreference.com/w/cpp/container/stack}{cppreference}.

\section{Problema \href{https://kilonova.ro/problems/2107}{stack\_max\_min}}

Problema ne dă un șir de numere și 4 întrebări pentru câte o poziție:
\begin{enumerate}
    \item Cel mai apropiat indice la stânga, unde elementul este mai mare decât poziția din întrebare.
    \item Cel mai apropiat indice la stânga, unde elementul este mai mic decât poziția din întrebare.
    \item Cel mai apropiat indice la dreapta, unde elementul este mai mare decât poziția din întrebare.
    \item Cel mai apropiat indice la dreapta, unde elementul este mai mic decât poziția din întrebare.
\end{enumerate}

Vom precalcula, pentru fiecare element, răspunsul la fiecare tip de întrebare. Aici vom descrie algoritmul doar pentru primul tip, deoarece celelalte se rezolvă analog.

Vom parcurge vectorul de la stânga la dreapta, iar pe o stivă vom reține indicii cu elemente mai mici sau egale cu elementul curent. Cu alte cuvinte, pentru fiecare element, scoatem de pe stivă toate elementele mai mici sau egale cu el. Dacă stiva este goală, atunci răspunsul este $-1$, altfel este indicele elementului de pe vârful stivei. Apoi, îl adăugăm pe el însuși în stivă.

\begin{observation}
    Pe stivă vom reține indici, nu valori.
\end{observation}

Vom face o simulare a acestui algoritm, folosindu-ne de exemplul din problemă, $v = [1 \ 2 \ 3 \ 6 \ 4 \ 5 \ 3 \ 2 \ 1 \ 10]$. Ca în problemă, vectorul va fi indexat de la $0$.
\begin{enumerate}
    \item Suntem la indicele 0, $stiva = []$. Răspunsul va fi -1.
    \item Suntem la indicele 1, $stiva = [0]$, dar îl scoatem, iar apoi $stiva = []$. Răspunsul va fi -1.
    \item Suntem la indicele 2, $stiva = [1]$, dar îl scoatem, iar apoi $stiva = []$. Răspunsul va fi -1.
    \item Suntem la indicele 3, $stiva = [2]$, dar îl scoatem, iar apoi $stiva = []$. Răspunsul va fi -1.
    \item Suntem la indicele 4, $stiva = [3]$. Răspunsul va fi 3.
    \item Suntem la indicele 5, $stiva = [3 \ 4]$, dar îl scoatem pe 4. Răspunsul va fi 3.
    \item Suntem la indicele 6, $stiva = [3 \ 5]$. Răspunsul va fi 5.
    \item Suntem la indicele 7, $stiva = [3 \ 5 \ 6]$. Răspunsul va fi 6.
    \item Suntem la indicele 8, $stiva = [3 \ 5 \ 6 \ 7]$. Răspunsul va fi 7.
    \item Suntem la indicele 9, $stiva = [3 \ 5 \ 6 \ 7 \ 8]$, dar le scoatem pe toate, iar apoi $stiva = []$. Răspunsul va fi -1.
\end{enumerate}

Această rezolvare are complexitatea \bigO{N}, pentru că fiecare element va fi pus pe stivă și scos, deci se vor face maxim 2 operații pentru fiecare. 

Detaliii de implementare: vom reține o matrice $raspuns[tip - 1][i]$ care va reprezenta răspunsul la o întrebare de tipul $tip \ i$. De asemenea, vom folosi o santinelă, care va fi o valoare care va fi mereu mai mică (sau mai mare, în funcție de caz) decât orice valoare din vector. Pentru mai multe detalii, vezi implementarea.

\href{https://kilonova.ro/pastes/Potqb8YgrC4o}{Link} implementare

\section{Probleme rezolvate}

\subsection{Problema \href{https://kilonova.ro/problems/2114}{skyline}}



Implementarea se află \href{https://kilonova.ro/pastes/jw6H8y2ETlRb}{aici}.

\subsection{Problema \href{https://kilonova.ro/problems/2113}{Maximum Rectangle}}

Implementarea se află \href{https://kilonova.ro/pastes/iOJhQznjP1Ek}{aici}.

\subsection{Problema \href{https://kilonova.ro/problems/835}{unific - OJI 2013 VII}}

Implementarea se află \href{https://www.youtube.com/watch?v=dQw4w9WgXcQ}{aici}.

\subsection{Problema \href{https://kilonova.ro/problems/1076}{swap - ONI 2013 Baraj Juniori}}

Implementarea se află \href{https://www.youtube.com/watch?v=dQw4w9WgXcQ}{aici}.

\subsection{Problema \href{https://codeforces.com/contest/1364/problem/C}{Ehab and Prefix MEXs - Codeforces Round 649}}

Implementarea se află \href{https://www.youtube.com/watch?v=dQw4w9WgXcQ}{aici}.

\section{Probleme suplimentare}

\begin{itemize}
    \item \href{https://cses.fi/problemset/task/1147}{Maximum Building I - CSES} (Este aceeași problemă ca \textit{Maximum Rectangle})
    \item \href{https://kilonova.ro/problems/1593}{inundație - ONI 2022 VI} (Cerințele 2 și 3 pot fi rezolvate folosind o stivă, necesită și căutare binară).
    \item \href{https://kilonova.ro/problems/554}{fuziune - ONI 2023 Baraj Juniori} (Problemă asemănătoare cu \textit{unific}, dar necesită lucru cu numere mari și numere prime)
    \item \href{https://kilonova.ro/submissions/62356}{șiruri - ONI 2022 VI} (Altă problemă asemănătoare cu \textit{unific})
    \item \href{https://www.nerdarena.ro/problema/tower}{tower - Shumen 2016 Juniori} (Nu vă speriați că este de la Shumen, problema este doar o aplicație la \textit{stack\_max\_min})
    \item \href{https://kilonova.ro/problems/836}{maxp - ONI 2013 VIII} (O altă aplicație la problema \textit{stack\_max\_min})
    \item \href{https://codeforces.com/contest/1905/problem/C}{CF 1905C} (Problemă a cărei rezolvare se folosește de tehnica de la \textit{stack\_max\_min})
    \item \href{https://codeforces.com/contest/1905/problem/D}{CF 1905D} (Problemă a cărei rezolvare se folosește de tehnica de la \textit{stack\_max\_min})
    \item \href{https://codeforces.com/contest/1909/problem/C}{CF 1909C} (Problemă care are o rezolvare cu tehnica de la \textit{stack\_max\_min})
    \item \href{https://kilonova.ro/problems/1325}{reactii - ONI 2009 X} (Problemă asemănătoare cu \textit{unific})
    \item \href{https://kilonova.ro/problems/410}{dag - ONI 2019 Baraj Seniori} (Problemă care se folosește de tehnica de la \textit{stack\_max\_min})
    \item \href{https://kilonova.ro/problems/929}{leftmax - OJI 2020 X} (Problemă care se folosește de tehinca de la \textit{stack\_max\_min})
\end{itemize}

\section{Bibliografie și lectură suplimentară}

\begin{itemize}
    \item \href{https://www.youtube.com/watch?v=I37kGX-nZEI}{Un video despre stivă, pentru a vă ajuta să înțelegeți mai bine acest concept.}
    \item \href{https://www.youtube.com/watch?v=T7W5E-5mljc}{Un video despre analiza amortizată, vă va ajuta să înțelegeți mai bine rezolvarea problemei \textit{stack\_max\_min} și de ce are complexitatea \bigO{N}}
    \item \href{https://www.algopedia.ro/wiki/index.php/Clasa_a_VII-a_lec%C8%9Bia_2_-_26_sep_2019#Stive}{Algopedia - Stive}
    \item \href{https://www.algopedia.ro/wiki/index.php/Clasa_a_VII-a_lec%C8%9Bia_11_-_21_nov_2019#Lec%C8%9Bie_-_analiz%C4%83_amortizat%C4%83}{Algopedia - Analiza amortizată, mai multe detalii despre problema \textit{stack\_max\_min}}
    \item \href{https://usaco.guide/gold/stacks?lang=cpp}{Articolul de pe USACO despre stivă}
\end{itemize}
