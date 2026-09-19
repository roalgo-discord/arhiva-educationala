---
id: OJI-2013-XI-XII-biperm
title: Soluția problemei biperm (OJI 2013, clasele XI-XII)
problem_id: 35
authors: [zoltan]
prerequisites:
    - graphs
    - ad-hoc
tags:
    - OJI
    - clasa XI-XII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2013/11-12/biperm.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2013/11-12/biperm.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2013/11-12/biperm.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>
#include <vector>
#include <bitset>

using namespace std;
const int NMAX = 10000;

ifstream cin("biperm.in");
ofstream cout("biperm.out");

int v[3][NMAX + 2];
vector <int> pos[NMAX + 2];
vector <vector <int>> adj;
bitset <NMAX + 2> viz;

int cnt = 0, change = 0;
void dfs(int start, int rand, int col) { ///1--> 0, 2--> 1

    ///pt Cer3
    bool ok = 0;
    int old = col;

    ///Cer2)
    cnt++;
    if(rand != 1) {
        change++;
        ok = 1;
    }

    ///Cer1)
    viz[start] = 1;
    int nou = v[3 - rand][col];
    if(viz[nou]) { ///am fm ciclul
        if(ok) ///Cer3)
            swap(v[1][old], v[2][old]);
        return;
    }
    if(pos[nou][0] == col) ///cautam coloana noua
        col = pos[nou][1];
    else
        col = pos[nou][0];
    if(v[1][col] == nou)
        rand = 1;
    else
        rand = 2;

    ///Cer3)
    if(ok) {
        swap(v[1][old], v[2][old]);
    }


    dfs(nou, rand, col);
}

int main() {
    int n;
    cin >> n;
    for(int i = 1; i <= 2; i++) {
        for(int j = 1; j <= n; j++) {
            cin >> v[i][j];
            pos[v[i][j]].push_back(j);
        }
    }
    adj.resize(n + 1);
    for(int i = 1; i <= n; i++) {
        adj[v[1][i]].push_back(v[2][i]);
        adj[v[2][i]].push_back(v[1][i]);
    }

    ///Cer 1) nr perm distincte
    ///Cer2) nrmin de mutari
    ///Cer3) o perm buna
    int put = 1, ans = 0;
    for(int i = 1; i <= n; i++) {
        if(v[1][i] == v[2][i] || viz[v[1][i]])
            continue;
        cnt = 0, change = 0;
        dfs(v[1][i], 1, i);
        put <<= 1;
        ans += min(change, cnt - change);
    }
    cout << put << " " << ans << '\n';
    for(int i = 1; i <= 2; i++) {
        for(int j = 1; j <= n; j++)
            cout << v[i][j] << " ";
        cout << '\n';
    }
    return 0;
}
```
