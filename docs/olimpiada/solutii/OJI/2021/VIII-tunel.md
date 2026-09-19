---
id: OJI-2021-VIII-tunel
title: Soluția problemei tunel (OJI 2021, clasa a VIII-a)
problem_id: 937
authors: [sichim]
prerequisites:
    - simulating-solution
tags:
    - OJI
    - clasa VIII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2021/08.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2021/08.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2021/08.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

using ll = long long;
#define pb push_back

const string FILE_NAME = "tunel";

const int MAX_N = 1e3, MAX_M = 2e4;
const int DIR_UP = -1, DIR_DOWN = 1;

set<pair<int, int>> tunnels[MAX_N + 1];

int bkt (int lin, int col) {
  int cnt = 0;
  while (true) {
    if (col == 0) {
      break;
    }
    
    if (tunnels[lin].count(make_pair(col, DIR_DOWN)) > 0) {
      lin += DIR_DOWN;
      col--;
      cnt += 3;
    } else if (tunnels[lin].count(make_pair(col, DIR_UP)) > 0) {
      lin += DIR_UP;
      col--;
      cnt += 3;
    } else {
      col--;
      cnt++;
    }
  }
  return cnt;
}
signed main () {
  #ifndef LOCAL 
    ifstream cin(FILE_NAME + ".in");
    ofstream cout(FILE_NAME + ".out");
  #endif
  ios_base::sync_with_stdio(false);
  cin.tie(nullptr);
  
  int cer, n, m, x, q, i, pos, lin, col, exit_lin, cnt, ans;
  bool reach_reward;
  
  cin >> cer;
  cin >> n >> m >> x;
  for (i = 1; i <= n - 1; i++) {
    cin >> q;
    while (q--) {
      cin >> pos;
      tunnels[i].insert(make_pair(pos, DIR_DOWN));
      tunnels[i + 1].insert(make_pair(pos, DIR_UP));
    }
  }
  
  if (cer == 1) {
    lin = x;
    col = 1;
    exit_lin = -1;
    while (true) {
      if (lin == n && col == m) {
        exit_lin = n;
        break;
      }
      if (lin == n - 1 && col == m) {
        if (tunnels[lin].count(make_pair(col, DIR_DOWN)) > 0) {
          exit_lin = n;
          break;
        }
        
        exit_lin = n - 1;
        break;
      }
      if (lin < n - 1 && col == m) {
        exit_lin = lin;
        break;
      }
      
      if (tunnels[lin].count(make_pair(col, DIR_DOWN)) > 0) {
        lin += DIR_DOWN;
        col++;
      } else if (tunnels[lin].count(make_pair(col, DIR_UP)) > 0) {
        lin += DIR_UP;
        col++;
      } else {
        col++;
      }
    }
    
    cout << exit_lin << "\n";
  } else {
    ans = 1 + bkt(n, m - 1);
    if (tunnels[n - 1].count(make_pair(m, DIR_DOWN)) > 0) {
      ans = min(ans, 3 + bkt(n - 1, m - 1));
    }
    cout << ans << "\n";
  }
  return 0;
}
```
