---
id: OJI-2005-VIII-volei
title: Soluția problemei volei (OJI 2005, clasa a VIII-a)
problem_id: 744
authors: [rpintea]
prerequisites:
    - greedy
    - binary-search
tags:
    - OJI
    - clasa VIII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2005/08.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2005/08.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2005/08.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

using ll = long long;
#define pb push_back

const string FILE_NAME = "volei";
const int MAX_N = 2e3, MAX_M = 2e3;

int f[MAX_N + 5], b[MAX_M + 5];
bool visited[MAX_N + 5];
int val[MAX_N + 5];

int main() {
#ifndef LOCAL
    ifstream cin(FILE_NAME + ".in");
    ofstream cout(FILE_NAME + ".out");
#endif

    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, i, m, j, cnt;
    bool ok;

    cin >> n;
    for (i = 1; i <= n; i++) {
        cin >> f[i];
    }

    cin >> m;
    for (i = 1; i <= m; i++) {
        cin >> b[i];
    }
    sort(b + 1, b + m + 1);
    cnt = 0;
    for (i = 1; i <= m; i++) {
        for (j = 1; j <= n; j++) {
            if (visited[j]) {
                continue;
            }
            if (b[i] > f[j] && b[i] > f[j % n + 1]) {
                visited[j] = true;
                cnt++;
                val[j] = b[i];
                break;
            }
        }
    }

    cout << cnt << "\n";
    for (i = 1; i <= n; i++) {
        cout << f[i] << " ";
        if (visited[i]) {
            cout << "(" << val[i] << ") ";
        }
    }
    return 0;
}
```
