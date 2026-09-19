---
id: OJI-2007-X-alee
title: Soluția problemei Alee (OJI 2007, clasa a X-a)
problem_id: 768
authors: [marinel]
prerequisites:
    - lee
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2007/10/alee.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2007/10/alee.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2007/10/alee.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>

using namespace std;

int ox[4] = {0, 1, 0, -1};
int oy[4] = {-1, 0, 1, 0};

bool isValid(int x, int y, int n, int m, vector<vector<int>> &mat) { return x > 0 && y > 0 && x <= n && y <= n && mat[x][y] == 0; }

int main() {

    ifstream cin("alee.in");
    ofstream cout("alee.out");

    int x, y, n, m, final_x, final_y;
    cin >> n >> m;

    vector<vector<int>> mat(n + 1, vector<int>(n + 1));
    for (short i = 0; i < m; i++) {
        cin >> x >> y;
        mat[x][y] = -1;
    }

    cin >> final_x >> final_y;
    mat[final_x][final_y] = 1;

    queue<pair<int, int>> q;

    q.push({final_x, final_y});
    cin >> final_x >> final_y;

    while (!q.empty()) {
        pair<int, int> temp = q.front();
        q.pop();

        for (int i = 0; i < 4; i++) {
            int new_x = temp.first + ox[i];
            int new_y = temp.second + oy[i];
            if (isValid(new_x, new_y, n, m, mat)) {
                mat[new_x][new_y] = mat[temp.first][temp.second] + 1;
                q.push({new_x, new_y});
            }
        }
    }

    cout << mat[final_x][final_y] << '\n';
    return 0;
}
```
