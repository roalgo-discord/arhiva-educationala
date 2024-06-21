\ChapterWithAuthor{Sortare Topologica}{Radu Mocănașu}

\section{Cunoștințe necesare}

Grafuri, Recursivitate, Liste de Adiacență, Câteva noțiuni legate de vectorii STL

\section{Teorie}
Într-un graf orientat și aciclic, definim sortarea topologică ca fiind o ordine a nodurilor (nu neapărat unică), astfel încât, dacă notăm cu \textbf{P} lista pozițiilor nodurilor, iar \textbf{A} și \textbf{B} sunt două noduri, cu muchie de la \textbf{A} la \textbf{B},

$$ P_A < P_B$$

\begin{flushleft}
Spre exemplu: \hfill \break
\end{flushleft}

\begin{Center}
\begin{tikzpicture}[-latex, node distance = 2 cm]

\node [circle, draw](a){1};
\node [circle, draw](b)[right=of a]{2};
\node [circle, draw](c)[right=of b]{3};
\node [circle, draw](d)[below=of a]{4};
\node [circle, draw](e)[below=of b]{5};

\draw[->](a)--node[]{}(b);
\draw[->](b)--node[]{}(c);
\draw[->](e)--node[]{}(c);
\draw[->](a)--node[]{}(d);
\draw[->](a)--node[]{}(e);



\end{tikzpicture}

\end{Center}

\begin{flushleft}

\hfill \break
O sortare topologică validă ar fi: \textbf{1, 2, 5, 3, 4}, deoarece \textbf{1} se află înaintea lui \textbf{2}, \textbf{5} înaintea lui \textbf{3}, etc. Un alt exemplu ar fi \textbf{1, 4, 5, 2, 3}.
\hfill \break
O ordine incorectă ar fi însă \textbf{1, 4, 2, 3, 5}, deoarece \textbf{5} se află înaintea lui \textbf{3}, deși există muchie de la \textbf{3} la \textbf{5}.

\end{flushleft}

\hfill \break
\hfill \break
\begin{flushleft}
Un alt exemplu: \hfill \break
\end{flushleft}

\begin{Center}
\begin{tikzpicture}[-latex, node distance = 2 cm]

\node [circle, draw](a){1};
\node [circle, draw](b)[right=of a]{2};
\node [circle, draw](c)[below=of a]{3};
\node [circle, draw](d)[below=of b]{4};

\draw[->](a)--node[]{}(b);
\draw[->](b)--node[]{}(d);
\draw[->](c)--node[]{}(a);
\draw[->](d)--node[]{}(c);

\end{tikzpicture}

\end{Center}

\begin{flushleft}
\justifying
Acest graf conține un ciclu (de fapt chiar este unul), mai exact \textbf{1, 2, 3, 4}. Astfel, putem alege două noduri, \textbf{A} și \textbf{B}, astfel încât ele aparțin aceluiași ciclu (se poate ajunge de la \textbf{A} la \textbf{B} și viceversa). Dar asta implică faptul că în sortarea topologică, \textbf{A} se află în fața lui \textbf{B}, dar și că \textbf{B} se află înaintea lui \textbf{A}, ceea ce duce la o contradicție.
Așadar, într-un graf ce conține un ciclu, nu există nicio sortare topologică.

\end{flushleft}

\section{Algoritmul}

\begin{flushleft}


Întâi, vom presupune că graful este aciclic. \hfill \break
\break
\justifying
Numim vecin al unui nod \textbf{U}, un nod \textbf{V}, astfel încât există muchie de la \textbf{U} la \textbf{V}. Însă, știm că pentru orice două noduri \textbf{U} și \textbf{V}, pentru care există muchie de la \textbf{U} la \textbf{V}, \textbf{U} se află înaintea lui \textbf{V} în ordinea topologică. \hfill \break
\break
Așadar, în sortarea topologică, orice nod se află înaintea vecinilor săi. \hfill \break
\break
În același timp, într-o parcurgere DFS, vom intra în vecinii unui nod după ce intrăm în acesta. Putem defini timpul de ieșire al unui nod ca fiind momentul la care ne întoarcem din recursivitate înapoi la el (pentru simplitate, timpii pot fi numerotați de la \textbf{1} la \textbf{n}, unde \textbf{n} este numărul de noduri). Astfel, timpul de ieșire al unui nod va fi tot timpul mai mare decât cel al vecinilor săi, deci pentru a afla ordinea topologică, trebuie doar să sortăm nodurile descrescător după timpii de ieșire. \hfill \break
\break
Pentru a face acest lucru mai simplu, putem doar să adăugăm nodurile într-o listă goală, pe care o vom inversa la sfârșit. \hfill \break
\break
Sa ne uitam la următoarea secvență de cod:
\end{flushleft}

\begin{minted}{cpp}
#include <iostream>
#include <vector>
#include <algorithm>

//Valoare maximă arbitrară pentru numărul maxim de noduri.
const int NMAX = 10002;

//Listele de adiacență
std::vector <int> lista_adj[NMAX];

//Lista nodurilor sortate după timpii de ieșire.
std::vector <int> ord;

//Dacă un nod a mai fost vizitat până acum sau nu.
bool viz[NMAX];
void dfs(int nod){
    
    viz[nod] = 1;
    //Parcurgem lista vecinilor
    for(int vecin : lista_adj[nod]){
        //Ne interesează doar cei care nu au mai fost vizitați.
        if(!viz[vecin])
            dfs(vecin);
    }
    
    //La întoarcerea din recursivitate, adăugăm nodul în listă.
    ord.push_back(nod);
    
}

int main()
{
    int n,m,u,v;
    //Citire
    std::cin >> n >> m;
    while(m--){
        std::cin >> u >> v;
        lista_adj[u].push_back(v);
    }
    
    //Începem parcurgerea DFS.
    dfs(1);
    
    //Inversăm lista nodurilor sortate după timpii de ieșire.
    std::reverse(ord.begin(), ord.end());
    for(int nod : ord){
        std::cout << nod << " ";
    }
    return 0;
}
\end{minted}

\begin{flushleft}
Acest cod este însă greșit și nu va da rezultatul corect pentru anumite cazuri. Să luăm următorul exemplu:\hfill \break
\break
\begin{Center}
\begin{tikzpicture}[-latex, node distance = 2 cm]

\node [circle, draw](a){1};
\node [circle, draw](b)[right=of a]{2};
\node [circle, draw](c)[below=of a]{3};

\draw[->](a)--node[]{}(b);
\draw[->](c)--node[]{}(a);
\draw[->](c)--node[]{}(b);

\end{tikzpicture}
\break
\end{Center}
\justifying
Începând dintr-un nod arbitrar(în acest caz, \textbf{1}), noi vom vizita doar nodurile în care putem ajunge din el. Însă, în exemplul dat, asta înseamnă ca vom ignora nodul \textbf{3}, care în sortare s-ar afla înaintea lui \textbf{1}. \hfill \break
\break
Pentru a rezolva această problemă, putem parcurge lista tuturor nodurilor și să verificăm pentru fiecare dacă este vizitat sau nu. Pentru orice nod nevizitat, știm că nu se poate ajunge la el din niciun nod vizitat, deci este corect să spunem că orice nod nevizitat se poate afla înaintea nodurilor deja vizitate. Astfel, pentru orice nod nevizitat, putem începe o parcurgere DFS din el și putem adăuga în continuare nodurile în lista finală, în funcție de timpul lor de ieșire.

\begin{minted}{cpp}
#include <iostream>
#include <vector>
#include <algorithm>

//Valoare maximă arbitrară pentru numărul maxim de noduri.
const int NMAX = 10002;

//Listele de adiacență
std::vector <int> lista_adj[NMAX];

//Lista nodurilor sortate după timpii de ieșire.
std::vector <int> ord;

//Dacă un nod a mai fost vizitat până acum sau nu.
bool viz[NMAX];
void dfs(int nod){
    
    viz[nod] = 1;
    //Parcurgem lista vecinilor
    for(int vecin : lista_adj[nod]){
        //Ne interesează doar cei care nu au mai fost vizitați.
        if(!viz[vecin])
            dfs(vecin);
    }
    
    //La întoarcerea din recursivitate, adăugăm nodul în listă.
    ord.push_back(nod);
    
}

int main()
{
    int n,m,u,v;
    //Citire
    std::cin >> n >> m;
    while(m--){
        std::cin >> u >> v;
        lista_adj[u].push_back(v);
    }

    //Iteram prin lista nodurilor
    for(int i = 1; i <= n; i++){
        //Dacă este nevizitat, începem parcurgerea DFS din el
        if(!viz[i]){
            dfs(i);
        }
    }
    
    //Inversăm lista nodurilor sortate după timpii de ieșire.
    std::reverse(ord.begin(), ord.end());
    for(int nod : ord){
        std::cout << nod << " ";
    }
    return 0;
}
\end{minted}

\end{flushleft}

\begin{flushleft}

Acest cod este corect și va returna o sortare topologica valida (nu neapărat unica).

\end{flushleft}

\section{Exemplu de Problema: \href{https://cses.fi/problemset/task/1679}{CSES - Course Schedule}}

\begin{flushleft}
\textbf{Cerința}: \hfill \break

Se dau \textbf{n} cursuri, numerotate de la \textbf{1} la \textbf{n} și \textbf{m} condiții ce trebuie îndeplinite, de forma a doi indici, \textbf{i} și \textbf{j}, cu proprietatea ca acel curs cu numărul \textbf{i} trebuie terminat înaintea cursului cu numărul \textbf{j}.

$$1 \leqslant i < j \leqslant n$$

Se cere să se afișeze o ordine în care să fie făcute aceste cursuri din, astfel încât toate condițiile să fie îndeplinite. Dacă nu exista nicio soluție, se va afișa "IMPOSSIBLE". \hfill \break
\break
\textbf{Soluție}: \hfill \break
\justifying
Nu este greu să ne dăm seama că acele 'condiții' pot fi reprezentate ca niște muchii orientate într-un graf, iar ordinea validă a realizării task-urilor va fi cea din sortarea topologică a grafului rezultat. În cazul în care graful conține cicluri, algoritmul tot va returna o anumita ordine a nodurilor. Astfel, putem parcurge din nou fiecare condiție și să verificăm dacă e îndeplinită, iar dacă nu e, înseamna că nu avem soluție. Putem verifica acest lucru ușor ținând minte într-un vector pozițiile nodurilor din sortarea topologică.
\end{flushleft}

\section{Resurse utile}
\subsection{Probleme și Articole Recomandate}
\begin{enumerate}
    \item \href{https://usaco.guide/gold/toposort}{USACO Guide}
    \item \href{https://www.infoarena.ro/problema/sortaret}{Sortare Topologica - Infoarena}
    \item \href{https://www.infoarena.ro/problema/path}{Path - Infoarena}
    \item \href{https://kilonova.ro/problems/1016}{Leximin - Kilonova}
    
    
\end{enumerate}

\subsection{Probleme adiționale}
\begin{enumerate}
    \item \href{https://www.infoarena.ro/problema/easygraph}{Easygraph - Infoarena}
    \item \href{https://kilonova.ro/problems/2627}{xy - Kilonova}
    \item \href{https://kilonova.ro/problems/677}{Somnoros - Kilonova}
    \item \href{https://infoarena.ro/problema/alpin}{Alpin - Infoarena}
\end{enumerate}