---
tags:
    - meta
    - sfaturi
    - olimpiada
---

## Introducere

Aici găsiți programa claselor XI-XII pentru Olimpiada de Informatică, conform [programei create de SEPI](https://sepi.ro/assets/upload-file/oni2024/Programa%20pentru%20olimpiada%20de%20informatica_gimnaziu%20si%20liceu.pdf) în anul școlar 2023-2024, împreună cu locurile de unde puteți învăța aceste conținuturi în arhiva noastră. 

Pe lângă conținuturile de mai jos, programa include și materia clasei a zecea, care poate fi accesată în [articolul corespunzător](https://edu.roalgo.ro/olimpiada/clasa-X/).

!!! note "Observație"
    Următoarele capitole sunt atât pentru etapa județeană, cât și pentru etapa națională.

## Metoda programării dinamice

* Programare dinamică pe arbori și grafuri
    * Programare dinamică pe grafuri - [link articol](https://edu.roalgo.ro/dificil/graph-dp/)
    * Programare dinamică pe arbore - [link articol](https://edu.roalgo.ro/dificil/tree-dp/)
* Programare dinamică pe stări exponențiale (bitmask DP) - [link articol](https://edu.roalgo.ro/mediu/bitmask-dp/)

## Grafuri orientate și neorientate - [link articol](https://edu.roalgo.ro/usor/graphs/)

* Terminologie (graf neorientat, graf orientat, lanţ, lanţ elementar, drum, drum elementar, ciclu, ciclu elementar, circuit, circuit elementar, grad, graf parţial, subgraf, conexitate, tare conexitate, arbore, graf ponderat, arbore parţial, arbore parţial de cost minim) - [link articol](https://edu.roalgo.ro/usor/graphs/#terminologie)
* Tipuri speciale de grafuri (graf complet, graf hamiltonian, graf eulerian, graf bipartit, graf turneu) - [link articol](https://edu.roalgo.ro/usor/graphs/#cateva-tipuri-speciale-de-grafuri)
* Reprezentarea grafurilor (matrice de adiacenţă, liste de adiacenţă, lista muchiilor/arcelor) - [link articol](https://edu.roalgo.ro/usor/graphs/#lucrul-cu-grafuri-moduri-de-reprezentare-in-memorie)
* Grafuri ponderate. Reprezentarea grafurilor ponderate (matricea costurilor, liste de adiacență cu costuri, lista muchiilor/arcelor cu costuri) - [link articol](https://edu.roalgo.ro/mediu/shortest-path/#introducere)
* Algoritmi de prelucrare a grafurilor
    * Parcurgerea grafurilor în lăţime (BFS), în adâncime (DFS), parcurgerea euleriană
        * DFS - [link articol](https://edu.roalgo.ro/usor/graphs/#conexitate-parcurgerea-dfs)
        * BFS - [link articol](https://edu.roalgo.ro/usor/graphs/#drumuri-minime-parcurgerea-bfs)
    * Determinarea componentelor conexe ale unui graf neorientat - [link articol](https://edu.roalgo.ro/usor/graphs/#conexitate-parcurgerea-dfs)
    * Determinarea componentelor tare conexe ale unui graf orientat. Algoritmul Kosaraju-Sharir. Graful componentelor tare-conexe - [link articol](https://edu.roalgo.ro/dificil/componente-tare-conexe/)
    * Determinarea matricei lanţurilor/drumurilor (algoritmul Roy-Warshall) - [link articol](https://edu.roalgo.ro/mediu/shortest-path/#algoritmul-floyd-warshall-roy-floyd)
    * Descompunerea unui graf orientat fără circuite pe niveluri. Sortare topologică - [link articol](https://edu.roalgo.ro/mediu/toposort/)
    * Determinarea drumurilor de cost minim într-un graf. Algoritmul lui Dijkstra, algoritmul Bellman-Ford, algoritmul Roy-Floyd - [link articol](https://edu.roalgo.ro/mediu/shortest-path/)
    * Determinarea unui lanț/ciclu hamiltonian - [link articol](https://edu.roalgo.ro/mediu/cycles/#cicluri-hamiltoniene)
    * Determinarea unui lanț/ciclu eulerian - [link articol](https://edu.roalgo.ro/mediu/cycles/#cicluri-euleriene) 

## Arbori

* Definiție, proprietăți - [link articol](https://edu.roalgo.ro/mediu/tree-1/) 
* Arbori parțiali - [link articol](https://edu.roalgo.ro/mediu/apcm/)
* Arbori parţiali de cost minim (algoritmul lui Kruskal și algoritmul lui Prim) - [link articol](https://edu.roalgo.ro/mediu/apcm/)

## Structuri de date arborescente  - [link articol](https://edu.roalgo.ro/cppintro/stl/)

* Arbori cu rădăcină (definiţie, proprietăţi, reprezentarea arborilor cu rădăcină) - [link articol](https://edu.roalgo.ro/mediu/tree-1/#terminologie-de-baza) 
* Arbori binari (definiţie, proprietăţi specifice; reprezentarea arborilor binari) - [link articol](https://edu.roalgo.ro/mediu/tree-1/#arbori-binari) 
* Operații pe structuri de date (interogări, actualizări)
* Arbore binar complet – definiţie, proprietăţi, reprezentare secvenţială
* Heap-uri – definiţie, proprietăţi, operaţii specifice (inserare nod, extragerea nodului cu cheie maximă/minimă) (std::priority_queue în C++)
* Arbore binar de căutare – definiţie, proprietăţi, operaţii specifice (inserare nod, ştergere nod, căutare element) (std::set în C++)
* Reprezentarea mulțimilor disjuncte. Algoritmii Union-Find - [link articol](https://edu.roalgo.ro/mediu/dsu/)

!!! note "Observație"
    Următoarele capitole sunt doar pentru etapa națională

## Algoritmi pe grafuri

* Determinarea punctelor de articulație, a punților și descompunerea grafurilor în componente biconexe. - [link articol](https://edu.roalgo.ro/dificil/componente-biconexe/)
* Algoritmul lui Dial (optimizarea algoritmului lui Dijkstra pentru grafuri cu ponderi dintr-un interval mic de valori) - [link articol](https://edu.roalgo.ro/mediu/shortest-path/#algoritmul-0-1-bfs-si-variatiile-sale)

## Structuri de date arborescente

* Determinarea celui mai apropiat strămoș comun a două noduri dintr-un arbore (lowest common ancestor - LCA) - [link articol](https://edu.roalgo.ro/dificil/lowest-common-ancestor/)
* Determinarea diametrului unui arbore - [link articol](https://edu.roalgo.ro/mediu/tree-1/#problema-exemplu-aflarea-diametrului-unui-arbore)
* Arbori indexați binar - [link articol](https://edu.roalgo.ro/dificil/fenwick-tree/)
* Arbori de intervale - [link articol](https://edu.roalgo.ro/dificil/segment-trees/)

## Square Root Decomposition. Algoritmul lui Mo - [link articol](https://edu.roalgo.ro/dificil/square-root-decomposition/) 

## Range Minimum Query (RMQ) - [link articol](https://edu.roalgo.ro/dificil/rmq/)

## Tehnica Meet in the Middle - [link articol](https://edu.roalgo.ro/mediu/mitm/)

## Ridicarea la putere a matricilor în timp logaritmic. Rezolvarea recurențelor liniare - [link articol](https://edu.roalgo.ro/dificil/pow-mat/)

## Principiul includerii și excluderii. Funcția Mobius - [link articol](https://edu.roalgo.ro/mediu/pinex/)