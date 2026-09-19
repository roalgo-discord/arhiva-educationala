---
id: OJI-2011-X-ai
title: Soluția problemei ai (OJI 2011, clasa a X-a)
problem_id: 815
authors: [dmarcu, omarcu, ciurea]
prerequisites:
    - lee
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2011/10/ai.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2011/10/ai.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2011/10/ai.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>
#include <cmath>
#include <queue>

using namespace std;
const int NMAX = 1002;
const int INF = 21e8;

ifstream cin("ai.in");
ofstream cout("ai.out");

struct coord {
    int x, y;
}tinta, s1, s2, r1, r2, obs;

int v[NMAX][NMAX];
int n;

double calcd(int x1, int y1, int x2, int y2) { ///dist dintre 2 puncte
    return (double)sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

int dist[NMAX][NMAX];
int dl[] = {-1, 0, 1, 0};
int dc[] = {0, -1, 0, 1};
bool inbound(int i, int j) {
    if(i < 1 || j < 1 || i > n || j > n)
        return false;
    return true;
}
void bfs(coord a) {
    for(int i = 1; i <= n; i++) {
        for(int j = 1; j <= n; j++) {
            dist[i][j] = INF;
        }
    }
    dist[a.x][a.y] = 0;
    queue <coord> q;
    q.push(a);
    while(!q.empty()) {
        coord now = q.front();
        q.pop();
        for(int d = 0; d < 4; d++) {
            int lin = now.x + dl[d];
            int col = now.y + dc[d];
            if(inbound(lin, col) && v[lin][col] != 1 && v[lin][col] != 2 &&
               dist[lin][col] > dist[now.x][now.y] + 1) {
                dist[lin][col] = dist[now.x][now.y] + 1;
                q.push({lin, col});
            }
        }
    }
}

void print() {
    for(int i = 1; i <= n; i++) {
        for(int j = 1; j <= n; j++) {
            cout << v[i][j] << " ";
        }
        cout << '\n';
    }
}
int main()
{
    int k;
    cin >> n;
    cin >> tinta.x >> tinta.y;
    cin >> s1.x >> s1.y >> s2.x >> s2.y;
    cin >> r1.x >> r1.y >> r2.x >> r2.y;
    cin >> k;
    for(int i = 1; i <= k; i++) {
        cin >> obs.x >> obs.y;
        v[obs.x][obs.y] = 1;
    }
    int maxzid = 0; ///CER 1
    for(int i = 1; i <= n; i++) { ///oriz
        for(int j = 1; j <= n; j++) {
            if(v[i][j] == 1 && v[i][j - 1] != 1) {
                int pos = j;
                while(pos <= n && v[i][pos] == 1)
                    pos++;
                pos--;
                maxzid = max(maxzid, pos - j + 1);
            }
        }
    }
    for(int j = 1; j <= n; j++) { ///vert
        for(int i = 1; i <= n; i++) {
            if(v[i][j] == 1 && v[i - 1][j] != 1) {
                int pos = i;
                while(pos <= n && v[pos][j] == 1)
                    pos++;
                pos--;
                maxzid = max(maxzid, pos - i + 1);
            }
        }
    }
    cout << maxzid << '\n';

    v[tinta.x][tinta.y] = 2; ///CER 2
    v[s1.x][s1.y] = 3; ///pt fulgerul 1
    v[s2.x][s2.y] = 4;///pt fulgerul 2
    double nr1 = calcd(s1.x, s1.y, tinta.x, tinta.y); ///stot a drumului
    double nr2 = calcd(s2.x, s2.y, tinta.x, tinta.y);
    for(int i = 1; i <= n; i++) {
        for(int j = 1; j <= n; j++) { ///ne ducem pe toate celulele si ver in ce drum e
            if(v[i][j])
                continue;
            double suma1 = calcd(s1.x, s1.y, i, j) + calcd(i, j, tinta.x, tinta.y);
            double suma2 = calcd(s2.x, s2.y, i, j) + calcd(i, j, tinta.x, tinta.y);
            if(abs(suma1 - nr1) <= 0.00000000001)
                v[i][j] = 3;
            if(abs(suma2 - nr2) <= 0.00000000001)
                v[i][j] = 4;
        }
    }
    bfs(r1); ///pt robotul 1
    int min1 = INF, min2 = INF; ///gasim dist min pt ambii roboti cu ambele surse si vedem dupa care suma e mai mica
    for(int i = 1; i <= n; i++) {
        for(int j = 1; j <= n; j++) {
            if(v[i][j] == 3)
                min1 = min(min1, dist[i][j]);
            if(v[i][j] == 4)
                min2 = min(min2, dist[i][j]);
        }
    }

    bfs(r2);
    int minn1 = INF, minn2 = INF;
    for(int i = 1; i <= n; i++) {
        for(int j = 1; j <= n; j++) {
            if(v[i][j] == 3)
                minn1 = min(minn1, dist[i][j]);
            if(v[i][j] == 4)
                minn2 = min(minn2, dist[i][j]);
        }
    }
    cout << min(max(min1, minn2), max(minn1, min2));
    return 0;
}
/*
1 - obstacol
2 - tinta, FORBIDDEN
3 - prin ce celule trece s1, inclusiv sursa
4 - prin ce celule trece s2, inclusiv sursa
*/
```
