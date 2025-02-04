---
tags:
    - meta
    - sfaturi
    - olimpiada
---

## Introducere

Aici găsiți programa claselor XI-XII pentru Olimpiada de Informatică, conform
[programei create de
SEPI](https://sepi.ro/assets/upload-file/oni2024/Programa%20pentru%20olimpiada%20de%20informatica_gimnaziu%20si%20liceu.pdf)
în anul școlar 2023-2024, împreună cu locurile de unde puteți învăța aceste
conținuturi în arhiva noastră.

Pe lângă conținuturile de mai jos, programa include și materia clasei a zecea,
care poate fi accesată în [articolul
corespunzător](./clasa-X.md).

!!! note "Observație"
    Următoarele capitole sunt atât pentru etapa județeană, cât și pentru etapa națională.

## Metoda programării dinamice

- Programare dinamică pe arbori și grafuri
  - Programare dinamică pe grafuri - [link
    articol](../dificil/graph-dp.md)
  - Programare dinamică pe arbore - [link
    articol](../dificil/tree-dp.md)
- Programare dinamică pe stări exponențiale (bitmask DP) - [link
  articol](../mediu/bitmask-dp.md)

## Grafuri orientate și neorientate - [link articol](../usor/graphs.md)

- Terminologie (graf neorientat, graf orientat, lanţ, lanţ elementar, drum, drum
  elementar, ciclu, ciclu elementar, circuit, circuit elementar, grad, graf
  parţial, subgraf, conexitate, tare conexitate, arbore, graf ponderat, arbore
  parţial, arbore parţial de cost minim) - [link
  articol](../usor/graphs.md#terminologie)
- Tipuri speciale de grafuri (graf complet, graf hamiltonian, graf eulerian,
  graf bipartit, graf turneu) - [link
  articol](../usor/graphs.md#cateva-tipuri-speciale-de-grafuri)
- Reprezentarea grafurilor (matrice de adiacenţă, liste de adiacenţă, lista
  muchiilor/arcelor) - [link
  articol](../usor/graphs.md#lucrul-cu-grafuri-moduri-de-reprezentare-in-memorie)
- Grafuri ponderate. Reprezentarea grafurilor ponderate (matricea costurilor,
  liste de adiacență cu costuri, lista muchiilor/arcelor cu costuri) - [link
  articol](../mediu/shortest-path.md#introducere)
- Algoritmi de prelucrare a grafurilor
  - Parcurgerea grafurilor în lăţime (BFS), în adâncime (DFS), parcurgerea
    euleriană
    - DFS - [link
      articol](../usor/graphs.md#conexitate-parcurgerea-dfs)
    - BFS - [link
      articol](../usor/graphs.md#drumuri-minime-parcurgerea-bfs)
  - Determinarea componentelor conexe ale unui graf neorientat - [link
    articol](../usor/graphs.md#conexitate-parcurgerea-dfs)
  - Determinarea componentelor tare conexe ale unui graf orientat. Algoritmul
    Kosaraju-Sharir. Graful componentelor tare-conexe - [link
    articol](../dificil/componente-tare-conexe.md)
  - Determinarea matricei lanţurilor/drumurilor (algoritmul Roy-Warshall) -
    [link
    articol](../mediu/shortest-path.md#algoritmul-floyd-warshall-roy-floyd)
  - Descompunerea unui graf orientat fără circuite pe niveluri. Sortare
    topologică - [link articol](../mediu/toposort.md)
  - Determinarea drumurilor de cost minim într-un graf. Algoritmul lui Dijkstra,
    algoritmul Bellman-Ford, algoritmul Roy-Floyd - [link
    articol](../mediu/shortest-path.md)
  - Determinarea unui lanț/ciclu hamiltonian - [link
    articol](../mediu/cycles.md#cicluri-hamiltoniene)
  - Determinarea unui lanț/ciclu eulerian - [link
    articol](../mediu/cycles.md#cicluri-euleriene)

## Arbori

- Definiție, proprietăți - [link articol](../mediu/tree-1.md)
- Arbori parțiali - [link articol](../mediu/apcm.md)
- Arbori parţiali de cost minim (algoritmul lui Kruskal și algoritmul lui 
Prim - [link articol](../mediu/apcm.md)

## Structuri de date arborescente  - [link articol](../cppintro/stl.md)

- Arbori cu rădăcină (definiţie, proprietăţi, reprezentarea arborilor cu
  rădăcină) - [link
  articol](../mediu/tree-1.md#terminologie-de-baza)
- Arbori binari (definiţie, proprietăţi specifice; reprezentarea arborilor
  binari) - [link articol](../mediu/tree-1.md#arbori-binari)
- Operații pe structuri de date (interogări, actualizări)
- Arbore binar complet – definiţie, proprietăţi, reprezentare secvenţială
- Heap-uri – definiţie, proprietăţi, operaţii specifice (inserare nod,
  extragerea nodului cu cheie maximă/minimă) (std::priority_queue în C++)
- Arbore binar de căutare – definiţie, proprietăţi, operaţii specifice (inserare
  nod, ştergere nod, căutare element) (std::set în C++)
- Reprezentarea mulțimilor disjuncte. Algoritmii Union-Find - [link
  articol](../mediu/dsu.md)

!!! note "Observație"
    Următoarele capitole sunt doar pentru etapa națională

## Algoritmi pe grafuri

- Determinarea punctelor de articulație, a punților și descompunerea grafurilor
  în componente biconexe. - [link
  articol](../dificil/componente-biconexe.md)
- Algoritmul lui Dial (optimizarea algoritmului lui Dijkstra pentru grafuri cu
  ponderi dintr-un interval mic de valori) - [link
  articol](../mediu/shortest-path.md#algoritmul-0-1-bfs-si-variatiile-sale)

## Structuri de date arborescente

- Determinarea celui mai apropiat strămoș comun a două noduri dintr-un arbore
  (lowest common ancestor - LCA) - [link
  articol](../dificil/lowest-common-ancestor.md)
- Determinarea diametrului unui arbore - [link
  articol](../mediu/tree-1.md#problema-exemplu-aflarea-diametrului-unui-arbore)
- Arbori indexați binar - [link
  articol](../dificil/fenwick-tree.md)
- Arbori de intervale - [link
  articol](../dificil/segment-trees.md)

## Square Root Decomposition. Algoritmul lui Mo - [link articol](../dificil/square-root-decomposition.md)

## Range Minimum Query (RMQ) - [link articol](../dificil/rmq.md)

## Tehnica Meet in the Middle - [link articol](../mediu/mitm.md)

## Ridicarea la putere a matricilor în timp logaritmic. Rezolvarea recurențelor liniare - [link articol](../dificil/pow-mat.md)

## Principiul includerii și excluderii. Funcția Mobius - [link articol](../mediu/pinex.md)
