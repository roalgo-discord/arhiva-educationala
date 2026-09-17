---
id: OJI-2026-X-mister
title: Soluția problemei mister (OJI 2026, clasa a X-a)
problem_id: 4228
authors: []
prerequisites:
    - deque
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2026/10.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2026/10.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2026/10.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <cassert>
#include <cstdio>
#include <deque>
#include <fstream>
#include <iostream>
#include <vector>

using namespace std;

ifstream fin("mister.in");
ofstream fout("mister.out");

void runSimulation(int N, int K, const vector<int> &A, vector<int> &B) {
  deque<int> dq;
  B.assign(N + 1, 0);

  for (int i = 1; i <= N; ++i) {
    while (!dq.empty() && A[i] > A[dq.back()]) {
      dq.pop_back();
    }

    if (!dq.empty() && dq.front() == i - K) {
      dq.pop_front();
    }

    dq.emplace_back(i);
    B[i] = dq.size();
  }
}

void runReconstruction(int N, int K, const vector<int> &B, vector<int> &sol) {
  sol.assign(N + 1, 0);
  deque<int> dq;
  int low = 1;
  int high = N;

  for (int i = 1; i <= N; ++i) {
    if (!dq.empty() && dq.front() == i - K) {
      sol[dq.front()] = high--;
      dq.pop_front();
    }

    int reqSize = B[i] - 1;

    while ((int)dq.size() > reqSize) {
      sol[dq.back()] = low++;
      dq.pop_back();
    }

    dq.emplace_back(i);
  }

  while (!dq.empty()) {
    sol[dq.front()] = high--;
    dq.pop_front();
  }
}

int main() {
  int N, K;
  fin >> N >> K;

  vector<int> B(N + 1);
  vector<int> A;
  for (int i = 1; i <= N; ++i) {
    fin >> B[i];
  }

  runReconstruction(N, K, B, A);

  for (int i = 1; i <= N; ++i) {
    fout << A[i] << " \n"[i == N];
  }

  vector<int> checkB;
  runSimulation(N, K, A, checkB);

  return 0;
}
```
