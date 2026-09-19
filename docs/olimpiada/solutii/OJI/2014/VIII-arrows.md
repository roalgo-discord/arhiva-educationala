---
id: OJI-2014-VIII-arrows
title: Soluția problemei arrows (OJI 2014, clasa a VIII-a)
problem_id: 848
authors: [cerchez]
prerequisites:
    - lee
tags:
    - OJI
    - clasa VIII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2014/08/arrows.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2014/08/arrows.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2014/08/arrows.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>
#include <queue>

using namespace std;
const int NMAX = 502;

ifstream cin("arrows.in");
ofstream cout("arrows.out");

int n, m;
int v[NMAX][NMAX];

int f[NMAX][NMAX]; ///0/1/2/3
int pct[NMAX][NMAX];

int dl[] = {0, -1, 0, 1};
int dc[] = {1, 0, -1, 0};

bool inbound(int i, int j) {
    if(i < 1 || j < 1 || i > n || j > m)
        return false;
    return true;
}
/*
f
0- neajuns
1- ajuns, normala
2- ajuns, o procesam
3- ajuns, ciclu
*/
void bfs(int starti, int startj) {
    if(f[starti][startj])
        return;
    int cnt = 0; ///nr de celule prin care trecem
    int lin = starti, col = startj;
    
    do { ///CAUTAM PRIN CATE AJUNGEM SI DE CE TIP
        if(!inbound(lin, col)) ///--> tip 1
            break;
        cnt++;
        if(f[lin][col] == 0)
            f[lin][col] = 2;
        else ///dc am mai trecut, stop
            break;

        int dir = v[lin][col] - 1;
        lin = lin + dl[dir];
        col = col + dc[dir];
    } while(1);
    
    if(!inbound(lin, col)) { ///am iesit --> toate de pe drum 1
        lin = starti;
        col = startj;
        do { ///reparcurgem
            f[lin][col] = 1;
            pct[lin][col] = cnt;
            cnt--;
            int dir = v[lin][col] - 1;
            lin = lin + dl[dir];
            col = col + dc[dir];

            if(!inbound(lin, col))
                break;

        } while(1);
        return;
    }
    if(f[lin][col] == 2) { ///am fm un CICLU
        int l = lin, c = col; ///le retinem p-alea de unde incepe ciclul

        cnt = 0; ///CATE sunt in ciclu
        do {
            cnt++;
            int dir = v[lin][col] - 1;
            lin = lin + dl[dir];
            col = col + dc[dir];
            if(lin == l && col == c) ///gata ciclul
                break;
        } while(1);
        do { ///UPDATE la f[][] si pct[][]
            pct[lin][col] = cnt;
            f[lin][col] = 3;
            int dir = v[lin][col] - 1;
            lin = lin + dl[dir];
            col = col + dc[dir];
            if(lin == l && col == c) ///stop
                break;
        } while(1);
        if(f[starti][startj] == 3) ///ciclu incepe de la PRIMA, stop
            return;
        lin = starti;
        col = startj;
        do { ///CATE ajung in ciclu
            cnt++;
            int dir = v[lin][col] - 1;
            lin = lin + dl[dir];
            col = col + dc[dir];
            if(f[lin][col] == 3)
                break;
        } while(1);
        lin = starti;
        col = startj;
        do { ///UPDATE la cele care ajung in ciclu
            if(f[lin][col] == 3)
                break;
            f[lin][col] = 3;
            pct[lin][col] = cnt;
            cnt--; ///cate una mai putin, pe drum
            int dir = v[lin][col] - 1;
            lin = lin + dl[dir];
            col = col + dc[dir];
        } while(1);
        return;
    }
    if(f[lin][col] == 3 || f[lin][col] == 1) { ///intram in CICLU sau OUTBOUND (same, doar f[][] dif)
        int tip = f[lin][col];
        cnt = (cnt - 1) + pct[lin][col];
        lin = starti;
        col = startj;
        do { ///UPDATE la cele care ajung in ciclu
            if(f[lin][col] == tip)
                break;
            f[lin][col] = tip;
            pct[lin][col] = cnt;
            cnt--;
            int dir = v[lin][col] - 1;
            lin = lin + dl[dir];
            col = col + dc[dir];
        } while(1);
    }
}

int main()
{
    int cer;
    cin >> cer >> n >> m;
    for(int i = 1; i <= n; i++) {
        for(int j= 1; j <= m; j++) {
            cin >> v[i][j];
        }
    }
    for(int i = 1; i <= n; i++) { ///bfs pe toate poz
        for(int j = 1; j <= m; j++) {
            bfs(i, j);
        }
    }
    int x, y;
    cin >> x >> y;
    if(cer == 1) { ///pct de la [x][y]
        if(f[x][y] == 1)
            cout << pct[x][y];
        else
            cout << pct[x][y] << "000";
        return 0;
    }
    if(cer == 2) { ///celule fav
        int cnt = 0;
        for(int i = 1; i <= n; i++) {
            for(int j = 1; j <= m; j++) {
                if(f[i][j] == 3)
                    cnt++;
            }
        }
        cout << cnt;
        return 0;
    }
    if(cer == 3) { ///pct max
        int norm = 0;
        long long ciclu = 0;
        for(int i = 1; i <= n; i++) {
            for(int j = 1; j <= m; j++) {
                if(f[i][j] == 1)
                    norm = max(norm, pct[i][j]);
                else
                    ciclu = max(ciclu, 1LL * pct[i][j]);
            }
        }
        ciclu *= 1000;
        ciclu = max(ciclu, 1LL * norm);
        cout << ciclu;
    }
    return 0;
}
```
