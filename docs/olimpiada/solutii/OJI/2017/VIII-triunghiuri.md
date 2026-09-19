---
id: OJI-2017-VIII-triunghiuri
title: Soluția problemei triunghiuri (OJI 2017, clasa a VIII-a)
problem_id: 886
authors: [aburta]
prerequisites:
    - geometry
    - ad-hoc
tags:
    - OJI
    - clasa VIII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2017/08/triunghiuri.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2017/08/triunghiuri.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2017/08/triunghiuri.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

using ll = long long;
#define pb push_back
#define int ll

const string FILE_NAME = "triunghiuri";
const int MAX_COORD = 1e3, MOD = 1e6 + 3;

struct Point {
  int lin, col;
};

vector<Point> points;
vector<int> line_points[MAX_COORD + 1];
int freq_col[MAX_COORD + 1], freq_line[MAX_COORD + 1];
bool is_point[MAX_COORD + 1][MAX_COORD + 1];

bool eq_point (Point a, Point b) {
  return (a.lin == b.lin && a.col == b.col);
}

signed main () {
#ifndef LOCAL
  ifstream cin(FILE_NAME + ".in");
  ofstream cout(FILE_NAME + ".out");
#endif

  ios_base::sync_with_stdio(false);
  cin.tie(nullptr);

  int cer, n, i, lin, col, mx_freq, cnt, freq_sum, aux_sum, fixed_line,
      pivot_col, num_line_points, num_col_points;

  cin >> cer >> n;
  for (i = 1; i <= n; i++) {
    cin >> col >> lin;
    points.push_back({lin, col});
    is_point[lin][col] = true;
  }

  for (auto p : points) {
    freq_line[p.lin]++;
    freq_col[p.col]++;
  }

  if (cer == 1) {
    mx_freq = 0;
    for (col = 0; col <= MAX_COORD; col++) {
      mx_freq = max(mx_freq, freq_col[col]);
    }

    cout << mx_freq << "\n";
  } else {
    cnt = 0;
    for (fixed_line = 0; fixed_line <= MAX_COORD; fixed_line++) {
      for (pivot_col = 0; pivot_col <= MAX_COORD; pivot_col++) {
        // how many points can i take from the fixed_line
        num_line_points =
            freq_line[fixed_line] - is_point[fixed_line][pivot_col];

        // how many points can i take from the pivot_col
        num_col_points = freq_col[pivot_col] - is_point[fixed_line][pivot_col];

        cnt += num_col_points *
               (((num_line_points - 1) * ((num_line_points - 1) + 1)) / 2);
        cnt %= MOD;
      }
    }
    cout << cnt << "\n";
  }
  return 0;
}
```
