\ChapterWithAuthor{Funcția Möbius}{Ionescu Matei}
\section{Noțiuni introductive}
În teoria numerelor, o funcție aritmetică este o funcție $f(n) : \mathbb{N} \to \mathbb{C}$. O funcție aritmetică exprimă proprietăți aritmetice pentru $n$.

Pentru $m, n$ numere prime între ele (adică $\cmmdc(m, n) = 1$), avem două feluri de funcții aritmetice:
\begin{enumerate}
    \item funcții \textit{aditive}, unde $f(mn) = f(n) + f(m)$;
    \item funcții \textit{multiplicative}, unde $f(mn)$ = $f(m)f(n)$.
\end{enumerate}
Pentru simplitate vom defini următoarele aspecte: 
\begin{enumerate}
    \item $[p] = 1$ dacă $p$ este o propoziție adevărată sau 0 în caz contrar.
    \item $\lfloor n \rfloor$ = partea întreagă a lui $n$.
    
\end{enumerate}
Cât și următoarele proprietăți celebre:
\begin{enumerate}
    \item $\sum_{k = 1}^{N} \frac{1}{k} \approx \log{N}$.
    \item Șirul $ a_i = \lfloor \frac{N}{i} \rfloor $, cu $\leq N$, are $\bigO{\sqrt N}$ valori distincte.
\end{enumerate}
Pentru $\forall p \in \mathbb{N}$, $p$ număr prim, și $\forall k \in \mathbb{N}$, definim următoarele funcții multiplicative:
\begin{enumerate}
    \item funcția identică $I(p^k) = p^k$;
    \item funcția putere $P_a(p^k) = p^{ka}$, unde $a$ este constantă (nu confundăm cu funcția exponențiala $f_a(p^k) = a^{p^k}$);
    \item funcția unitate $U(p^k) = [p^k = 1]$;
    \item funcția divizorilor $\sigma (p^k)$ = numărul de divizori ai lui $p^k$; 
    \item indicatorul lui Euler $\varphi(p^k) $ = $p^{k} - p^{k-1}$, câte numere $x$, cu $1 \leq x \leq p^k$ și $\cmmdc(x, p^k) = 1$ există 
    \item funcția Möbius $\mu(p^k) = [k = 0] - [k = 1]$.
\end{enumerate}

\begin{definition}
    Două funcții multiplicative , $f(n)$ și $g(n) $,  sunt identice dacă pentru oricare $p$ număr prim și oricare $k \geq 0$, $g(p^k) = f(p^k)$.
\end{definition}
\section{Precalcularea funcțiilor multiplicative}
În contextul nostru, vom lucra cel mai des cu funcții multiplicative, iar de cele mai multe ori avem nevoie să știm valorile unei funcții pentru un set mai larg de elemente. Și se dovedește că Ciurul învățat în clasa a 6-a este bun nu numai la aflarea numerelor prime.

% o sa trebuiasca sa dam link la articolul pe care l-am facut cu ciur (sieve.tex)

\subsection{Ciurul lui Eratostene}
%explic aici care e ciuru, dc merge in \bigO{N \cdot \log{N}}
Acest algoritm este poate cel mai popular printre elevii de liceu și gimnaziu pentru a afla numerele prime într-un interval. 
\cpp{codes/mobius/ciur_eratostene.cpp}

La finalul programului, $k$ va fi număr prim doar dacă $\operatorname{ciur}(k) = 0$.

Complexitatea de timp este $\bigO{\sum_{k=1}^N \frac{N}{k}} = \bigO{N \log{N}}$. 
\subsection{Ciur liniar} 
%cum il faci liniar gen
Observăm că fiecare număr compus $X$ este parcurs de către cel de-al doilea for de mai multe ori. Dacă am putea să iterăm prin fiecare număr compus exact o singură dată am ajunge la complexitatea de \bigO{N}. Reținem într-un vector auxiliar numerele prime, și pentru un $i$ fixat vom parcurge numerele prime până când un număr prim  divide $i$.
\cpp{codes/mobius/ciur_liniar.cpp}
\begin{proof}
    Ca să demonstrăm faptul că ciurul de mai sus iterează prin fiecare număr compus exact odată avem nevoie de cel mai mic factor prim al acestuia, $p$. Să presupunem că $q = i \cdot p$. Pentru oricare $j > i$, $j$ este divizor a lui  $q$, presupunem ca $k = \frac{q}{j}$ este prim. Cum $i < j$, atunci $k < p$, însă $p$ este cel mai mic număr prim care divide $q$, deci nu există un astfel $k$. Deci odată luată în considerare perechea $(i, p)$,\, $i \cdot p$ va fi calculat doar o singură dată, transformând complexitatea finală în \bigO{N}.
\end{proof}

\subsection{Precalcularea indicatorului lui Euler folosind Ciurul Liniar}
Pentru a calcula $\varphi(n)$ trebuie să luam în considerare $3$ cazuri:
\begin{enumerate}
    \item $n$ este prim \Rightarrow~$\varphi(n) = n-1$
    \item $n = i \cdot p$ și $p \nmid i$ \Rightarrow~$\varphi(n) = \varphi(i) \varphi(p)$. \textit{Prin $a \nmid b$ înțelegem : "a nu divide pe b"}.
    \item $n = i \cdot p$ și $p \mid i$. Acest caz este uneori greu de tratat, dar din fericire știm sigur că $\varphi(ip) = p\varphi(i)\ \forall i, p$.
\end{enumerate}
\cpp{codes/mobius/phi_ciur_liniar.cpp}
\subsection{Generalizare a ciurului liniar}
Totuși, putem să generalizăm algoritmul prezentat mai sus pentru a funcționa pentru oricare funcție multiplicativă.
Fie $sml(n) = $ puterea celui mai mic factor din descompunerea în factori primi a lui $n$. Pentru oricare $i$ și $p$, $p$ cel mai mic număr prim care divide $i$, putem scrie $f(ip) = f(\frac{i}{p^{sml(i)}}) \cdot f(p^{sml(i) + 1})$.
\cpp{codes/mobius/phi_ciur_generalizat.cpp}
\noindent Gândim similar pentru funcția Möbius: 
\begin{enumerate}
    \item $n$ prim \Rightarrow~$\mu(n) = -1$
    \item $n = i \cdot p$, $p \nmid i$ \Rightarrow~$\mu(n) = \mu(i) \cdot \mu(p)$
    \item $n = i \cdot p$, $p \mid i$ \Rightarrow~$\mu(n) = \frac{\mu(i)}{[sml(i)=0]-[sml(i)=1]} \cdot ([sml(i)+1=0]-[sml(i)+1=1])$.
\end{enumerate}
\begin{observation}
    În cazul în care fracția de mai sus nu este definită (numitorul este $0$), putem spune din start că $\mu(n) = 0$.
\end{observation}
\cpp{codes/mobius/mobius_ciur_generalizat.cpp}

\subsection{Implementare mai populară}
Rare ori avem nevoie de ciur liniar, și dacă nu intră în timp $\bigO{N \log{N}}$ pentru precalculare, de ce ar intra $\bigO{N}$? 
\cpp{codes/mobius/phi_mobius.cpp}

\section{Inversiunea lui Möbius}
Ultimele din cele $3$ funcții prezentate la începutul articolului sunt mai cunoscute ca restul, însă noi ne vom folosi cel mai mult de ultimele $2$, anume indicatorul lui Euler și funcția Möbius.

Fie $g(n)$ = $\sum_{d\mid n} f(d)$. Inversiunea lui Möbius ne spune:
\begin{equation*}
    f(n) = \sum_{d\mid n} g(d) \cdot \mu \left(\frac{n}{d}\right)
\end{equation*}
Cu toate astea, o proprietate mai importantă este $\sum_{d\mid n} \mu(d) = U(n)$. Ceea ce sugerează expresia este că pentru oricare număr natural $n$ suma va da $1$ doar dacă $n = 1$. Pare nesemnificativă proprietatea, însă este foarte utilă în rezolvarea multor probleme de informatică.

\textbf{Exercițiu} $1$: Calculează câte perechi $(a,b)$ ($1 \leq a,b \leq n$) există cu proprietatea că $\cmmdc(a,b) = 1$.

Rezolvare: Noi trebuie să calculăm $\sum_{i=1}^{n} \sum_{j=1}^{n} [\cmmdc(i, j) = 1]$. Ne putem folosi de proprietatea de mai sus și să scriem relația astfel: 
\begin{equation*}
    \sum_{i=1}^{n} \sum_{j=1}^{n} \sum_{d \mid  \cmmdc(i,j)} \mu(d)
\end{equation*}
Iterăm prin toate numerele $\leq n$ în loc de divizorii lui $n$ și obținem 
\begin{equation*}
    \sum_{i=1}^{n} \sum_{j=1}^{n} \sum_{d = 1}^{n} \mu(d) \cdot [d\mid \cmmdc(i,j)] = \sum_{i=1}^{n} \sum_{j=1}^{n} \sum_{d = 1}^{n} \mu(d) \cdot [d\mid i] \cdot [d\mid j]
\end{equation*}
Rearanjăm termenii și obținem
\begin{equation*}
    \sum_{d=1}^{n} \mu(d) \left(\sum_{i=1}^{n} [d\mid i]\right) \left(\sum_{j=1}^{n} [d\mid j]\right)
\end{equation*}
Observăm că \begin{equation*}
    \sum_{i=1}^{n} [d\mid i] = \sum_{j=1}^{n} [d\mid j] = \left\lfloor \frac{n}{d} \right\rfloor
\end{equation*} deci relația finală devine $\sum_{d=1}^{n} \mu(d) \cdot (\frac{n}{d})^2$, care poate fi calculată în \bigO{n}.

\textbf{Exercițiu} $2$: Calculează câte perechi $(a,b)$ exisă, astfel încât $1 \leq a,b \leq n$ și $\cmmdc(a, b)$ = $P$.

Rezolvare: \begin{equation*}
    \sum_{i=1}^{n} \sum_{j=1}^{n} [\cmmdc(i,j) = P] = \sum_{i=1}^{\frac{n}{P}} \sum_{j=1}^{\frac{n}{P}} [\cmmdc(i,j) = 1]
\end{equation*}
Observăm că e identic cu exercițiul precedent, rezultatul fiind $\sum_{d=1}^{\frac{n}{P}} \mu(d) \cdot \left(\frac{n}{dP}\right)^2$.\\


\textbf{Exercițiul} $3$: Calculează $\sum_{1 \leq i,j \leq N} lcm(i,j)$, unde $lcm(i,j) = $ cel mai mic multiplu comun al numerelor $i$ și $j$.

Rezolvare: Știm totuși că $lcm(i,j) = \dfrac{i\cdot j}{\cmmdc(i,j)}$, astfel problema ne cere să calculăm suma:
\begin{equation*}
    \sum_{1 \leq i, j \leq N} \dfrac{i \cdot j}{\cmmdc(i,j)}
\end{equation*}
Pentru a ne ușura calculul, putem defini:
\begin{equation*}
    f(k) = \sum_{1 \leq i, j \leq N} \dfrac{i \cdot j}{\cmmdc(i,j)} \cdot [\cmmdc(i,j) = k]
\end{equation*}
Observăm deci că dacă știm suma produselor $i \cdot j$, cu $\cmmdc(i,j) = k$, fie această sumă $p(k)$, atunci rezultatul devine:
\begin{equation*}
    f(k) = \dfrac{p(k)}{k}
\end{equation*}
Pentru a calcula $p(k)$ ne putem folosi de funcția mobius astfel:

\begin{align*}
    p(k) &= \sum_{1 \leq i,j \leq N} i \cdot j \cdot [\cmmdc(i,j) = k]\\ 
    &= \sum_{a = 1}^{\frac{N}{k}} \sum_{b = 1}^{\frac{N}{k}} a \cdot b \cdot k^2 \cdot [\cmmdc(a,b) = 1]\\
    &= \sum_{a = 1}^{\frac{N}{k}} \sum_{b = 1}^{\frac{N}{k}} a \cdot b \cdot k^2 \cdot \sum_{d = 1}^{\frac{N}{k}} \mu(d) \cdot [d \mid a] \cdot [d\mid b]\\
    &= k^2 \cdot \sum_{d=1}^{\frac{N}{k}} \mu(d) \cdot \left(\sum_{a = 1}^{\frac{N}{k}} a \cdot [d \mid a] \right) \cdot \left(\sum_{b=1}^{\frac{N}{k}} b \cdot [d \mid b] \right)\\ 
\end{align*}

\noindent Observăm că:
\begin{equation*}
    \sum_{a=1}^{\frac{N}{k}} a \cdot [d \mid a] = \sum_{b=1}^{\frac{N}{k}} b \cdot [d \mid b] = \left(d \cdot (1 + 2 + \dots + \frac{N}{kd}) \right) ^ 2 = \left( d \cdot \dfrac{\frac{N}{kd} \cdot (\frac{N}{kd} + 1)}{2} \right) ^ 2
\end{equation*}
Deci:
\begin{equation*}
    p(k) = k^2 \cdot \sum_{d = 1}^{\frac{N}{k}} \mu(d) \cdot \left( d \cdot \dfrac{\frac{N}{kd} \cdot (\frac{N}{kd} + 1)}{2} \right) ^ 2
\end{equation*}
Revenim la problema noastră inițială:
\begin{equation*}
    f(k) = \frac{p(k)}{k} = k \cdot \sum_{d = 1}^{\frac{N}{k}} \mu(d) \cdot \left( d \cdot \dfrac{\frac{N}{kd} \cdot (\frac{N}{kd} + 1)}{2} \right) ^ 2
\end{equation*}
Iar răspunsul final este $\sum_{k=1}^{N} f(k)$, care este calculabil în $\bigO{N \log N}$.
\section{Probleme propuse spre rezolvare}
\subsection{Problema \href{https://kilonova.ro/problems/2004}{sumgcd} de pe Kilonova}

Pentru $N$ și $M$ date la tastatură, trebuie să calculați $\sum_{V} \cmmdc(V)$, unde $V$ reprezintă un $M$-tuplu. Un $M$-tuplu reprezintă o mulțime de $M$ elemente nu neapărat distincte cu valori cuprinse între 1 și $N$. Formal, noi trebuie să calculam $\sum_{i_1 = 1}^{N} \sum_{i_2 = 1}^{N} \dots \sum_{i_M = 1}^{N} \cmmdc(i_1, i_2, \dots, i_M)$.

Dacă pentru un $K$ fixat aflăm câte M-tupluri există cu \cmmdc-ul egal cu $K$, atunci putem rezolva foarte ușor problema. Fie $f(K)$ numărul de tupluri $(m, n)$ pentru care $\cmmdc(m, n) = K$:
\begin{align*}
    f(K) &= \sum_{i_1 = 1}^{N} \sum_{i_2 = 1}^{N} \dots \sum_{i_M = 1}^{N} [\cmmdc(i_1, i_2, \dots, i_M) = K] \Leftrightarrow \\
    \Leftrightarrow f(k) &= \sum_{i_1 = 1}^{\frac{N}{K}} \sum_{i_2 = 1}^{\frac{N}{K}} \dots \sum_{i_M = 1}^{\frac{N}{K}} [\cmmdc(i_1, i_2, \dots, i_M) = 1] \Leftrightarrow\\
    \Leftrightarrow f(k) &= \sum_{i_1 = 1}^{\frac{N}{K}} \sum_{i_2 = 1}^{\frac{N}{K}} \dots \sum_{i_M = 1}^{\frac{N}{K}} \sum_{d = 1}^{\frac{N}{K}} \mu(d) \cdot [d\mid i_1] \cdot \dots \cdot [d\mid i_M] \Leftrightarrow\\
    \Leftrightarrow f(k) &= \sum_{d = 1}^{\frac{N}{K}} \mu(d) \cdot \left(\sum_{i_1 = 1}^{\frac{N}{K}} [d\mid i_1]\right) \cdots \left(\sum_{i_M = 1}^{\frac{N}{K}} [d\mid i_M]\right) \Leftrightarrow\\
    \Leftrightarrow f(k) &= \sum_{d = 1}^{\frac{N}{K}} \mu(d) \cdot \left(\frac{N}{Kd}\right)^M.
\end{align*}

Rezultatul problemei este dat de $\sum_{i=1}^{N} f(i) \cdot i$. Complexitatea de timp pentru a calcula $f(K)$ este \bigO{\frac{N}{K}\log{M}}, astfel complexitatea finală  este 
\begin{align*}
    \sum_{i=1}^{N} \bigO{\frac{N}{i} \log{M}} 
    &= \bigO{\left(N + \frac{N}{2} + \frac{N}{3} + \cdots + \frac{N}{N}\right) \log{M}}\\
    &= \bigO{N \left(1 + \frac{1}{2} + \frac{1}{3} + \cdots + \frac{1}{N}\right) \log{M}}\\
    &= \bigO{N\log{N}\log{M}}.
\end{align*}

Altă soluție este următoarea: 

Vom pune pe cele $M$ poziții doar multiplii de $K$, astfel se formează $M^{\lfloor\frac{N}{K} \rfloor}$ șiruri posibile, dintre care scădem $f(K \cdot Q), Q \geq 1$.
\begin{align*}
    f(K) &= M^{\left\lfloor \frac{N}{K} \right\rfloor} - \sum_{K\mid i} f(i)\\
    &= M^{\left\lfloor \frac{N}{K} \right\rfloor} - \sum_{i=1}^{N} f(i) \cdot [K\mid i] \\
    &= M^{\left\lfloor \frac{N}{K} \right\rfloor} - \sum_{i=1}^{\frac{N}{K}} f(K \cdot i)
\end{align*}

Complexitatea devine:
\begin{align*}
    \sum_{i=1}^{N} \bigO{\left\lfloor \frac{N}{i} \right\rfloor + \log{M}} &= \bigO{N \left(1 + \frac{1}{2} + \frac{1}{3} + \dots \frac{1}{N}\right) + N \log{M}}\\
    &= \bigO{N \log{N} + N \log{M}}\\
    &= \bigO{N\left(\log{N} + \log{M}\right)}\\
    &= \bigO{N\log{(MN)}}
\end{align*}
Putem precalcula puterile lui $M$, obținem astfel $\bigO{N \log{N}}$.

\noindent Ambele iau $100$ puncte.

\subsection{Problema \href{https://kilonova.ro/problems/372}{cntgcd}}
Se dau două numere naturale $N$ și $D$. Calculați câte perechi de numere $A$ și $B$ mai mici ca $N$ există, astfel încât $\cmmdc(A,B) = D$. Perechea $(A,B)$ = $(B, A)$.

Putem să luăm rezultatul de la primul exercițiu, pentru că probleme sunt echivalente. Singura restricție este faptul că perechea $(A,B)$ = $(B,A)$, dar putem efectiv să împărțim rezultatul la 2.
\begin{equation*}
ans = \frac{\sum_{d=1}^{\frac{N}{D}} \mu(d) \cdot \left(\frac{N}{dD}\right)^2 + 1}{2}
\end{equation*}
Soluția ia undeva la $45$ puncte, datorită faptului că $D \leq N \leq 10^9$.

Fie $f(n)$ = numărul de perechi $(A,B)$, unde $\cmmdc(A,B) = 1$. Noi trebuie să calculăm practic $f(\left\lfloor \frac{N}{D} \right\rfloor ) = \sum_{d = 1}^{\left\lfloor \frac{N}{D} \right\rfloor } \varphi(d)$.

Pentru $N \leq 10^6$ putem calcula suma brut. Pentru $N > 10^6$ putem elimina perechile care au cmmdc-ul 2, 3 etc.
\begin{equation*}
    f(n) = \frac{n^2 - n}{2} - \sum_{d=2}^{n} f\left(\lfloor \frac{n}{d} \rfloor\right)
\end{equation*}

Datorită faptului că șirul $a_i = \lfloor \frac{N}{i} \rfloor$ are $\bigO{\sqrt{N}}$ elemente diferite, putem doar să calculăm câte numere $d_1$ există, astfel încât $\frac{n}{d} = \frac{n}{d_1}$ și să adunăm la rezultat $f(\lfloor \frac{n}{d} \rfloor) \cdot nr$.

\begin{observation}
    Fie $d$ = cel mai mic număr astfel încât $\frac{n}{d} = x$. Atunci cel mai mare număr care îndeplinește aceeași proprietate este $\left\lfloor \frac{n}{\lfloor \frac{n}{d} \rfloor} \right\rfloor$.
\end{observation}
\cpp{codes/mobius/cod_cntgcd.cpp}

Complexitatea algoritmului de mai sus este foarte interesantă, ea fiind $\bigO{N^\frac{2}{3}}$.
\subsection{Problema \href{https://kilonova.ro/problems/1820}{tupleco}}
% un tuplu, doua tupluri
Se dau două numere $K$ și $N$. Să se afle $T$, numărul de tupluri formate din $K$ elemente $(X_1, X_2, X_3, \dots , X_K)$ cu proprietatea că:
\begin{enumerate}
    \item $1 \leq X_1 \leq X_2 \leq \dots \leq X_K \leq N$.
    \item $\cmmdc(X_1, X_2, \dots, X_K) = 1$.
\end{enumerate}

\noindent Soluție de $75 \rightarrow 80$ (sau chiar $100$ ) puncte:
Ne vom folosi de funcția Möbius pentru a calcula rezultatul. Dacă facem abstracție de prima proprietate, răspunsul nostru devine:
\begin{equation*}
    \sum_{d=1}^{N} \mu(d) \cdot \lfloor \frac{N}{d} \rfloor ^K
\end{equation*}
\\
Ce înseamnă însă $\lfloor \dfrac{N}{d} \rfloor ^ K$? Reprezintă numărul de șiruri de lungime $K$ , unde $X_i$ este multiplu de $d$. Ca să numărăm doar numărul de șiruri care sunt sortate, ne vom folosi de \textit{Stars and Bars}, astfel numărul de șiruri $(X_1, X_2, X_3, .. ,X_K)$ cu $X_i \leq X_{i+1} \leq N$ este egal cu $N-K+1 \choose K$. 

Rezultatul nostru devine: 
\begin{equation*}
    \sum_{d=1}^{N} \mu(d) \cdot {\left\lfloor \frac{N}{d} \right\rfloor - K + 1 \choose K}
\end{equation*}
Soluția rulează în $\bigO{N}$ cu $\bigO{N}$ sau $\bigO{N \cdot \log N}$ precalcularea.
\cpp{codes/mobius/tupleco_70.cpp}

\noindent \textit{Ok, dar putem mai bine?} 

Ne folosim de ideea prezentată la problema anterioară.
\begin{equation*}
    f(n) = {n-k+1 \choose k} - \sum_{d=2}^{n} f\left(\left\lfloor \frac{n}{d} \right\rfloor \right).
\end{equation*}
\begin{observation}
Deducem cu puternicele noastre simțuri că modulul ($M$)  în problema asta este mult mai mic decât $N$, astfel putem să calculăm combinările mult mai rapid :
\begin{enumerate}
    \item $n \leq M \rightarrow$ putem precalcula combinările în $\bigO{M}$.
    \item $\displaystyle n > M \rightarrow {n \choose k} \
     \ \text{modulo} \ \  M = {\lfloor \frac{n}{mod} \rfloor \choose \lfloor \frac{k}{mod} \rfloor} \cdot {n \bmod M \choose k \bmod M} \ \  \text{modulo} \ \ M$

    
\end{enumerate}
\end{observation}
\cpp{codes/mobius/tupleco_100.cpp}

\section{Alte probleme}
\begin{enumerate}
    \item \href{https://kilonova.ro/problems/69}{Pastile}
    \item \href{https://kilonova.ro/problems/640}{countall}
    \item \href{https://kilonova.ro/problems/2017}{Gya-chan and the gcd operation}
\end{enumerate}

