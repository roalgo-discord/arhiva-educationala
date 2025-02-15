---
id: OJI-2020-XI-XII-ateleport
authors:
    - stefdasca
prerequisites:
    - shortest-path
    - intro-dp
tags:
    - OJI
    - clasa XI-XII
    - dijkstra
    - programare dinamica
---

# Soluția problemei ateleport (OJI 2020, clasele XI-XII)

!!! note "Link problemă"
    Această problemă poate fi accesată [aici](https://kilonova.ro/problems/17/).

Încă de la citirea enunțului, se poate observa foarte clar faptul că această
problemă va folosi într-o oarecare măsură cunoștințele legate de drumuri minime,
mai cu seamă algoritmul lui Dijkstra.

Înainte de a explica soluții parțiale și implicit, soluția ce obține punctajul
maxim, vom recurge la folosirea unei observații care se va dovedi foarte
importantă de-a lungul rezolvării acestei probleme:

Deoarece $L$ și $K$ sunt foarte mici, ne vom putea gândi la o stare care să țină
cont de numărul de teleportări folosite până acum, precum și de numărul de mutări
pe care l-am efectuat în teleportarea curentă (dat fiind că o teleportare poate
fi folosită pe o rază de cel mult $L$ noduri, ne putem gândi la această mutare
ca o mutare care ne costă la început $P$ secunde, iar mai apoi celelalte mutări
sunt gratis).

Având această observație în minte, vom recurge la explicarea diverselor soluții,
ținând cont de faptul că graful nostru va avea acum $N \cdot K \cdot L$ stări,
corespunzătoare fiecărui nod, numărului de teleportări folosite și numărului
de mutări folosite în teleportarea curentă (0 dacă nu folosim vreo teleportare).

Mai întâi, pentru testele cu restricții mici, va fi îndeajuns o implementare
corectă a algoritmului lui Dijkstra în care plecăm din nodul 1 și ajungem în
nodul $n$.

Ba mai mult, pentru primul subtask vom putea folosi chiar un simplu algoritm
de tip BFS deoarece costurile muchiilor sunt toate identice.

Pentru a ajunge la punctajul maxim, va trebui să folosim observația inițială,
având o stare de tip $dp[i][j][x]$, cu semnificația că avem costul minim până
la nodul $i$, dacă am folosit $j$ teleportări și teleportarea curentă a avut
$x$ mutări.

Această soluție va avea o complexitate $\mathcal{O}(N \cdot K \cdot L \log N)$, fiind
suficient de bună pentru obținerea celor 100 de puncte.

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
--8<-- "olimpiada/XI-XII/2020-ateleport.cpp"
```