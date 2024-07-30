---
tags:
    - structuri de date
    - arbori de intervale
---

În unele probleme, avem nevoie de structuri de date care să ne dea posibilitatea de a accesa stări din trecut.

## Introducere

!!! info "Definiție" 
    Arborele de intervale persistent este o structură de date care ne dă posibilitatea de a accesa versiuni din trecut.

## Problema clasică

Să se implementeze o structură de date care rezolvă **online** următoarea problemă:

Se dă $N, Q$, un șir $a_1, a_2, \dots a_N$ de numere întregi. Să se răspundă la $Q$ interogări de două tipuri:

$1.$ Se dă $p, x$. $a_p$ devine $x$ ($1 \leq p \leq N$)

$2.$ Se dă $l, r, t$. Află $a_l + a_{l+1} + \dots + a_r$ după a $t$-a operație de tipul 1.

$N, Q \leq 200 \ 000$

## Soluție

Observăm că dacă am avea $t = $ numărul de operații de tipul $1$ (adică dacă nu ar trebui să răspundem la întrebări din trecut), am putea doar să folosim un arbore de intervale.

!!! info "Observație"
    Când facem o operație de tipul $1.$  se schimbă valoarea a cel mult $O(\log_2 N)$ noduri (doar nodurile pe care le-am parcurge în funcția de update într-un arbore de intervale normal)

Așadar, pentru fiecare update, am putea creea o nouă versiune a nodurilor care se schimbă.

Pentru claritate, vom folosi o implementare cu pointeri.


```cpp
struct Node {
  ll sum;
  Node* l;
  Node* r;
  Node() {
    sum = 0;
    l = r = NULL;
  }
  Node(ll _sum, Node* _l, Node* _r) {
    sum = _sum;
    l = _l;
    r = _r;
  }
};

Node* build(int tl, int tr, int* a) {
  if (tl == tr) {
    return new Node {
      a[tl - 1],
      NULL, NULL
    };
  } else {
    int mid = (tl + tr) / 2;
    Node* ret = new Node();
    ret -> l = build(tl, mid, a);
    ret -> r = build(mid + 1, tr, a);
    ret -> sum = ret -> l -> sum + ret -> r -> sum;
    return ret;
  }
}

Node* update(const Node* node, int tl, int tr, int p, int v) {
  if (tl == tr) {
    return new Node {
      v,
      NULL,
      NULL
    };
  } else {
    Node *ret = new Node();
    *ret = *node;
    int mid = (tl + tr) / 2;
    if (p <= mid) {
      ret -> l = update(node -> l, tl, mid, p, v);
    } else {
      ret -> r = update(node -> r, mid + 1, tr, p, v);
    }
    return ret;
  }
}

int n;
std::vector<Node*> versions;

void init(int _n, int* a) {
  n = _n;
  versions.push_back(build(1, n, a));
}

void updateValue(int pos, int value) {
  versions.push_back(update(versions.back(), 1, n, pos, value)); // creem o versiune nouă, pornim inițial cu versiunea trecută
}

ll sequenceQuery(int l, int r, int t) {
  return query(versions[t], 1, n, l, r);
}
```

!!! info "Atenție!"
    Arborele de interval persistent nu poate fi folosit cu lazy propagation, deoarece nu știm pentru fiecare nod când se modifică.

# Problema History

Această problemă este foarte asemănătoare cu problema precedentă, dar în loc să răspundem la interogări de forma "care e suma valorilor din această subsecvență?", treubie să răspundem la întrebări de forma "care e suma maximă a unei subsecvențe incluse în această subsecvență?".

Știm că putem răspunde la înterbări de acest fel cu un arbore de intervale puțin modificat. Acum, tot ce trebuie e să îl facem persistent.

```cpp
#include <algorithm>
#include <vector>

int readNumber();

struct Node {
  long long sum, value, prefmax, suffmax;
  Node* l;
  Node* r;
  Node() {}
  Node(int x) {
    sum = value = prefmax = suffmax = x;
    l = r = NULL;
  }
  Node operator + (const Node &other) const {
    Node ret;
    ret.sum = sum + other.sum;
    ret.prefmax = std::max(prefmax, sum + other.prefmax);
    ret.suffmax = std::max(other.suffmax, other.sum + suffmax);
    ret.value = std::max({value, other.value, suffmax + other.prefmax, ret.prefmax, ret.suffmax});
    return ret;
  }
  void refresh() {
    Node* ll = l;
    Node* rr = r;
    *this = *l + *r;
    this -> l = ll;
    this -> r = rr;
  }
};

struct PST {
  std::vector<Node*> aint;

  PST() {}
  Node* build(int tl, int tr) {
    if (tl == tr) {
      int x;
      x = readNumber();
      Node* ret = new Node(x);
      return ret;
    } else {
      int mid = (tl + tr) / 2;
      Node* ret = new Node(0);
      ret -> l = build(tl, mid);
      ret -> r = build(mid + 1, tr);
      ret -> refresh();
      return ret;
    }
  }
  Node* init(int n) {
    return build(1, n);
  }
  Node* update(Node* node, int tl, int tr, int p, int x) {
    if (tl == tr) {
      Node* ret = new Node(x);
      return ret;
    } else {
      int mid = (tl + tr) / 2;
      Node* ret = new Node();
      *ret = *node;
      if (p <= mid) {
        ret -> l = update(node -> l, tl, mid, p, x);
      } else {
        ret -> r = update(node -> r, mid + 1, tr, p, x);
      }
      ret -> refresh();
      return ret;
    }
  }
  Node query(Node* node, int tl, int tr, int l, int r) {
    if (l <= tl && tr <= r) {
      return *node;
    } else {
      int mid = (tl + tr) / 2;
      if (l <= mid && mid < r) {
        return query(node -> l, tl, mid, l, r) + query(node -> r, mid + 1, tr, l, r);
      } else if (l <= mid) {
        return query(node -> l, tl, mid, l, r);
      } else {
        return query(node -> r, mid + 1, tr, l, r);
      }
    }
  }
};

PST pst;
Node* cur;
int n;
std::vector<Node*> version;

void initializeValues(int _n) {
  n = _n;
  cur = pst.init(n);
  version.push_back(cur);
}

void updateValue(int p, int x) {
  cur = pst.update(cur, 1, n, p, x);
  version.push_back(cur);
}

long long querySequence(int l, int r, int t) {
  return pst.query(version[t], 1, n, l, r).value;
}
```

# Probleme suplimentare

* [History](https://kilonova.ro/problems/2029)
* [Range Queries and Copies](https://cses.fi/problemset/task/1737)
* [Two currencies](https://oj.uz/problem/view/JOI23_currencies)
* [Teams](https://oj.uz/problem/view/IOI15_teams)


## Lectură suplimentară 

* [Usaco Guide](https://usaco.guide/adv/persistent?lang=cpp)
* [Cp Algo](https://cp-algorithms.com/data_structures/segment_tree.html)
* [OI Wiki](https://en.oi-wiki.org/ds/persistent/)