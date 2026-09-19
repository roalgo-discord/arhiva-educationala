---
id: OJI-2017-XI-XII-ninjago
title: Soluția problemei ninjago (OJI 2017, clasele XI-XII)
problem_id: 27
authors: [cmuresan]
prerequisites:
    - dsu
    - graphs
    - apcm
tags:
    - OJI
    - clasa XI-XII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2017/11-12/ninjago.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2017/11-12/ninjago.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2017/11-12/ninjago.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.
```cpp
// credits: adimiclaus15 (kilonova)
#include <bits/stdc++.h>
using namespace std;

const int NMAX = 31200;
vector<int> G[NMAX + 1];
int vis[NMAX + 1];
int p[NMAX + 1], sz[NMAX + 1];

struct muchie {
    int x, y, nre, energie;
};

muchie v[NMAX + 1];

int Find(int x) {
    if(x == p[x]) {
        return x;
    }
    return Find(p[x]);
}

void Union(int x, int y) {
    x = Find(x);
    y = Find(y);
    if(sz[x] < sz[y]) {
        swap(x, y);
    }
    p[y] = x;
    sz[x] += sz[y];
}

bool cmp(muchie a, muchie b) {
    return a.nre < b.nre;
}

bool cmp1(muchie a, muchie b) {
    if(a.nre == b.nre) {
        return a.energie < b.energie;
    }
    return a.nre < b.nre;
}

int main() {
    ifstream cin("ninjago.in");
    ofstream cout("ninjago.out");
	int c;
    cin >> c;
    int n, m;
    cin >> n >> m;
    for(int i = 1; i <= m; i++) {
        int x, y;
        cin >> x >> y;
        string s;
        cin >> s;
        int nrE = 0;
        int en = 0;
        int p = 1; //5^0
        for(int j = 0; j < 4; j++) {
            if(s[j] == 'E') {
                nrE++;
            } else {
                en += (s[j] - 'A' + 1) * pow(5, j);
            }
            //p = p * 5;
        }
        v[i] = {x, y, nrE, en};
        if(nrE == 0) {
            G[x].push_back(y);
            G[y].push_back(x);
            //Union(x, y)
        }
    }
    if(c == 1) {
        //cout << sz[Find(1)]
        queue<int> q;
        q.push(1);
        vis[1] = 1;
        int nr = 0;
        while(!q.empty()) {
            int x = q.front();
            q.pop();
            nr++;
            for(int i = 0; i < G[x].size(); i++) {
                int vec = G[x][i];
                if(!vis[vec]) {
                    vis[vec] = 1;
                    q.push(vec);
                }
            }
        }
        cout << nr;
    }
    if(c == 2) {
        for(int i = 1; i <= n; i++) {
            p[i] = i;
            sz[i] = 1;
        }
        sort(v + 1, v + m + 1, cmp);
        int nrm = 0;
        int sol = 0;
        for(int i = 1; i <= m; i++) {
            if(Find(v[i].x) != Find(v[i].y)) {
                if(v[i].nre != 0) {
                    nrm++;
                    sol += v[i].nre;
                }
                Union(v[i].x, v[i].y);
            }
        }
        cout << nrm << '\n';
        cout << sol;
    }
    if(c == 3) {
        for(int i = 1; i <= n; i++) {
            p[i] = i;
            sz[i] = 1;
        }
        sort(v + 1, v + m + 1, cmp1);
        int sol = 0;
        for(int i = 1; i <= m; i++) {
            if(Find(v[i].x) != Find(v[i].y)) {
                sol += v[i].energie;
                Union(v[i].x, v[i].y);
            }
        }
        cout << sol;
    }
}
```
