---
id: ONI-2026-XI-XII-loop
title: Soluția problemei loop (ONI 2026, clasele XI-XII)
problem_id: 4278
authors: []
prerequisites:
    - intro-dp
    - partial-sums
    - basic-math
tags:
    - ONI
    - clasa XI-XII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/ONI%20%28national%20olympiad%29/2026/11-12.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/ONI%20%28national%20olympiad%29/2026/11-12.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/ONI%20%28national%20olympiad%29/2026/11-12.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: FFTPeOJI (kilonova)

#include <bits/stdc++.h>
#include <cassert>
using namespace std;
ifstream cin_("loop.in");
ofstream cout_("loop.out");
#define cin cin_
#define cout cout_
constexpr int mod = 1e9 + 7;
//vreau pentru o matrice data cu punctul de pleca
vector<vector<int>> dist;
vector<vector<int>> ways;
int answer_for_matrix(int x_start, int y_start, int x_end, int y_end,const vector<vector<int>> &mat, int n, int m) {
    // {x_start, y_start} coordonatele de start
    // {x_end, y_end} coordonatele in care sfarsesc
    // n-> numarul de linii
    // m-> numarul de coloane
    dist.clear();
    ways.clear();
     dist.assign(n + 1, vector<int>(m + 1, 1e9));
    ways.assign(n + 1, vector<int>(m + 1, 0));
    //fac algoritmul lui Lee, varianta clasica pe care o stie toata lumea, cu o singura schimbare si anume, intr-o celula nu e suficient doar sa stiu distanta, ci
    //voi tine si numarul de moduri de a ajunge cu distanta minima
    queue<pair<int, int>> q; //nimic diferit pana acum, o sa vezi ca nu e ceva foarte complicat
    q.push({x_start, y_start});
    ways[x_start][y_start] = 1;
    dist[x_start][y_start] = 0;
    auto check = [&](int x, int y) {
        return 1 <= x and x <= n and 1 <= y and y <= m and !mat[x][y];
        //doar un lambda care verifica daca e in bounds
    };
    vector<int> dx = {1, -1, 0, 0};
    vector<int> dy = {0, 0, 1, -1};
    while (!q.empty()) {
        int x = q.front().first;
        int y = q.front().second;
        if (dist[x][y] > dist[x_end][y_end]) {
            return (dist[x_end][y_end] != 1e9) ? ways[x_end][y_end] % mod : -1;
        }
        q.pop();
        for (int i = 0; i < 4; i++) {
            int nx = x + dx[i];
            int ny = y + dy[i];
            if (check(nx, ny)) {
                if (dist[nx][ny] == 1e9) {
                    // inca nu am ajuns la celula asta, pot ajunge in toate modurile din care pot ajunge din vecin
                    dist[nx][ny] = dist[x][y] + 1;
                    ways[nx][ny] = ways[x][y];
                    q.push({nx, ny});
                }
                else if (dist[nx][ny] == dist[x][y] + 1) {
                    // am mai ajuns tot cu acelasi cost
                    ways[nx][ny] =  (ways[x][y] + ways[nx][ny]) % mod;
                }
            }
        }
    }
    return (dist[x_end][y_end] != 1e9) ? ways[x_end][y_end] % mod : -1;
}
vector<int> divs(int x) {
    vector<int> res;
    for (int i = 1; i * i<= x; i++) {
        if (x % i == 0) {
            res.push_back(i);
            if (x / i != i) {
                res.push_back(x / i);
            }
        }
    }
    return res;
}
void solve() {
    int n, m;
    cin >> n >> m;
    int x_start, y_start, x_end, y_end;
    cin >> x_start >> y_start >> x_end >> y_end;
    vector<vector<int>> mat(n + 1, vector<int>(m + 1, 0));
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            char c;
            cin >> c;
            if (c == '1') {
                mat[i][j] = 1;
            }
        }
    }
   // cout << answer_for_matrix(x_start, y_start, x_end, y_end, mat, n, m) << endl;
    //ideea principala a problemei e ca la fiecare iteratie tu o sa te misti din punctul de vedere al delta x si delta y identic, acum cum faci precis p iteratii
    //inseamna ca delta x | n si delta y | m
    //iteram prin numarul cu nr minim de divizori sa presupunem ca este n (analog pentru m), aflam numar_iteratii = n / divizor si delta_y = m / numar_iteratii
    //acum ideea e ca, ma pot muta intr-o matrice doar daca pe pozitia asta translatata la celelalte matrici  sunt libere, pot muta in (i, j)  <==> (i, j), (i + delta x, j + delta y)
    // si tot asa sunt libere, adica e ca un or la celulele blocate
    auto check = [&](int x, int y) {
        return 1 <= x and x <= n and 1 <= y and y <= m;
        //doar un lambda care verifica daca e in bounds
    };
    vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));
    int ans = 0;
    auto candidati_iteratii = divs(gcd(abs(x_end - x_start), abs(y_end - y_start)));
    sort(candidati_iteratii.begin(), candidati_iteratii.end());
    vector<pair<int, int>> answers;
    if (true) {
        for (auto numar_iteratii : candidati_iteratii) {
            auto lungime_transpusa_x = (x_end - x_start) / numar_iteratii;
            auto lungime_transpusa_y = (y_end - y_start) / numar_iteratii;
            dp.clear();
            dp.assign(n + 1, vector<int>(m + 1, 0));
            //smecherie: definesc dp[i][j] = pe lantul mat[i][j], mat[i + lungime_transpusa_x][j + lungime_transpusa_y], mat[i + 2 * lungime_transpusa_x][j + 2 * lungime_transpusa_y]
            //cate celule am blocate?
            //cout << "lungimile sunt: " << lungime_transpusa_x << ' ' << lungime_transpusa_y << endl;
            if (lungime_transpusa_x >= 0 and lungime_transpusa_y >= 0) {
                for (int i = n; i >= 1; i--) {
                    for (int j = m; j >= 1; j--) {
                        int capat_lant_i = i + lungime_transpusa_x * numar_iteratii;
                        int capat_lant_j = j + lungime_transpusa_y * numar_iteratii;
                        int ni = i + lungime_transpusa_x;
                        int nj = j + lungime_transpusa_y;
                        dp[i][j] = ((check(ni, nj)) ? dp[ni][nj] : numar_iteratii) - ((!check(capat_lant_i, capat_lant_j) or mat[capat_lant_i][capat_lant_j]) ? 1 : 0) + mat[i][j];
                    }
                }
            }
            else if (lungime_transpusa_x > 0 and lungime_transpusa_y < 0) {
                for (int i = n; i >= 1; i--) {
                    for (int j = 1; j <= m; j++) {
                        int capat_lant_i = i + lungime_transpusa_x * numar_iteratii;
                        int capat_lant_j = j + lungime_transpusa_y * numar_iteratii;
                        int ni = i + lungime_transpusa_x;
                        int nj = j + lungime_transpusa_y;
                        dp[i][j] = ((check(ni, nj)) ? dp[ni][nj] : numar_iteratii) - ((!check(capat_lant_i, capat_lant_j) or mat[capat_lant_i][capat_lant_j]) ? 1 : 0) + mat[i][j];
                    }
                }
            }
            else if (lungime_transpusa_x < 0 and lungime_transpusa_y > 0) {
                for (int i = 1; i <= n; i++) {
                    for (int j = m; j >= 1; j--) {
                        int capat_lant_i = i + lungime_transpusa_x * numar_iteratii;
                        int capat_lant_j = j + lungime_transpusa_y * numar_iteratii;
                        int ni = i + lungime_transpusa_x;
                        int nj = j + lungime_transpusa_y;
                        dp[i][j] = ((check(ni, nj)) ? dp[ni][nj] : numar_iteratii) - ((!check(capat_lant_i, capat_lant_j) or mat[capat_lant_i][capat_lant_j]) ? 1 : 0) + mat[i][j];
                    }
                }
            }
            else {
                for (int i = 1; i <= n; i++) {
                     for (int j = 1; j <= m; j++) {
                        int capat_lant_i = i + lungime_transpusa_x * numar_iteratii;
                        int capat_lant_j = j + lungime_transpusa_y * numar_iteratii;
                        int ni = i + lungime_transpusa_x;
                        int nj = j + lungime_transpusa_y;
                        dp[i][j] = ((check(ni, nj)) ? dp[ni][nj] : numar_iteratii) - ((!check(capat_lant_i, capat_lant_j) or mat[capat_lant_i][capat_lant_j]) ? 1 : 0) + mat[i][j];
                    }
                }
            }
            for (int i = 1; i <= n; i++) {
                for (int j = 1; j <= m; j++) {
                    dp[i][j] = (!dp[i][j]) ? 0 : 1;
                }
            }
            int to_add = answer_for_matrix(x_start, y_start, x_start + lungime_transpusa_x, y_start + lungime_transpusa_y, dp,n, m);
            if (to_add != -1) {
                answers.push_back({numar_iteratii, to_add});
            }
        }
    }
    cout << answers.size() << endl;
    for (auto answer : answers) {
        cout << answer.first << ' ' << answer.second << endl;
    }
}
int main() {
    solve();
}
```
