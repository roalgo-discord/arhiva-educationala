**Autor**: Raul Ardelean

**Heavy-light decomposition** este o tehnică ce ne ajută să efectuăm query-uri și update-uri într-un timp eficient pe un **arbore**.

## Introducere

Să zicem că avem un arbore $G$ cu $N$ noduri și implicit $N-1$ muchii, iar rădăcina acestuia să fie $1$.

Ideea din spatele algoritmului este de a **sparge arborele în mai multe lanțuri** pentru a atinge rădăcina din orice nod din arbore în timp **logaritmic**.

Evident, dacă efectuăm această descompunere pe arborele nostru, ne va permite să reducem anumite interogări sau update-uri unice de forma: "calculează ceva pe lanțul care leagă nodul $a$ pe nodul $b$" în mai multe interogări sau update-uri de forma: "calculează ceva pe segmentul $[l,r]$ din lanțul $K$". Pentru a calcula eficient pe segmentul $[l,r]$ din lanțul $K$, ne vom folosi de arbori de intervale.

## Construcția lanțurilor

Pentru început, vom presupune că pentru fiecare nod din $G$ se va efectua același pattern.

Știm că funcția logaritmică crește foarte lent, astfel ne este convenabil să construim lanțuri de lungimi cât mai mari, pentru a minimiza numărul de operații necesare pentru interogări și update-uri pe un număr cât mai mare de noduri din lanț. Așadar, pentru fiecare nod $x$, vom alege să continuăm crearea lanțului cu fiul care are cele mai multe noduri în subarbore.

De ce nu am ales fiul care are cel mai lung lanț creat până la el? Când avem $\sqrt N$ lanțuri elementare, atunci vom avea o complexitate de $O(\sqrt N)$ pentru parcurgerea de la un nod $x$ până la rădăcină. În concluzie, vom avea o complexitate de $O(\sqrt N \cdot \log N)$ pentru fiecare interogare sau update.

<p align="center">
<img src="../images/hld/pathssqrtn.png" width="600" />
</p>

Dacă alegem fiul care are cele mai multe noduri în subarbore, constatăm că numărul de lanțuri pe care le vom parcurgem până la rădăcină se reduce la $\log N$.

Următoarea imagine ilustrează descompunerea arborelui cu tehnica descrisă anterior, cunoscută în termeni de specialitate sub denumirea de **heavy path decomposition**.

<p align="center">
<img src="../images/hld/pathslogn.png" width="600" />
</p>

Complexitatea finală pe fiecare interogare sau update: $O(( \log N ) ^ 2)$.

## Implementarea în C++

Există și alte tehnici de precalculare a lanțurilor, dar aceasta este cea mai ușor de înțeles.

```cpp
/// nodurile arborelui sunt inițializați de la 1

const int MAX=2e5+5; /// limita de noduri din arbore

bitset<MAX> viz; /// viz[i] - verificăm dacă am intrat în nodul i
int w[MAX]; /// w[i] - dimensiunea subarborelui cu root i
int nrL; /// numărul de lanțuri
int L[MAX]; /// L[i] - în ce lanț se află nodul i
int Lfather[MAX]; /// Lfather[L[i]] - primul nod al lanțului în care se află i
int Lniv[MAX]; /// Lniv[L[i]] - nivelul primului nod al lanțului în care se află i
vector<int> Lant[MAX]; /// Lant[i] - toate nodurile din lanțul i de la frunză până la nodul root al lanțului

void dfs(int node)
{
    viz[node] = 1;
    w[node] = 1;
    int leaf = 1, maxl = -1;

    for (auto x : G[node])
    {
        if (viz[x])
            continue;
        leaf = 0;
        niv[x] = niv[node] + 1;
        dfs(x);
        w[node] += w[x];

        /// actualizăm fiul care are cea mai mare dimensiune al subarborelui
        if (maxl == -1)
            maxl = x;
        else if (w[maxl] < w[x])
            maxl = x;
    }
    /// daca node este o frunză
    if (leaf){
        L[node] = ++nrL; /// se crează un nou lanț
        Lant[L[node]].push_back(node);
    }
    /// altfel o să legăm pe node de maxl
    else{
        L[node] = L[maxl];
        Lant[L[node]].push_back(node);

        /// aici vom fixa nodul de start pentru fii care au rămas, aceștia fiind primi în lanțul creat păna la ei
        for (auto x : G[node])
        {
            if (x == maxl or niv[x] < niv[node])
                continue;
            Lfather[L[x]] = node;
            Lniv[L[x]] = niv[node];
        }
    }
}
```

## Probleme rezolvate

### Problema [Heavy Path Decomposition](https://www.infoarena.ro/problema/heavypath)

Se dă un arbore cu $N$ noduri, fiecare având asociată o valoare $v_i$, $1 \leq i \leq N$. Se dau $M$ operații de forma $(t, x, y)$, cu următoarea semnificație:
<ol>
    <li> dacă $t$ este $0$, operația este de tipul update, iar valoarea $v_x$ asociata nodului cu indicele $x$ devine $y$;</li>
    <li> dacă $t$ este $1$, operația este de tipul query și se cere să se afișeze valoarea maximă asociată unui nod aflat pe lanțul elementar care unește nodurile $x$ și $y$.</li>
</ol>
Pentru a rezolva această problemă clasică, trebuie să implementăm arbori de intervale pentru lanțurile create de noi, iar apoi să efectuăm cele două tipuri de operații: query și update.

Pentru operația de tip update, putem opera doar pe lanțul unde se află nodul $x$. 

Pentru operația de tip query, va trebuie să parcurgem mai multe lanțuri până când vom ajunge cu cele două noduri în același lanț. Această operațiune este chiar cea de la [Lowest common ancestor (LCA)](https://edu.roalgo.ro/dificil/lowest-common-ancestor/).

O implementare de $100$ de puncte pentru această problemă se poate găsi [aici](https://www.infoarena.ro/job_detail/3250975?action=view-source).



## Concluzii

## Probleme suplimentare

## Resurse suplimentare
