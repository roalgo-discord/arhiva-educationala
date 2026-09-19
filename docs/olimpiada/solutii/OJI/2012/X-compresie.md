---
id: OJI-2012-X-compresie
title: Soluția problemei Compresie (OJI 2012, clasa a X-a)
problem_id: 827
authors: [nodea]
prerequisites:
    - divide-et-impera
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2012/10/compresie.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2012/10/compresie.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2012/10/compresie.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <cmath>
#include <fstream>
#include <vector>

using namespace std;

ifstream cin("compresie.in");
ofstream cout("compresie.out");

bool numar(char ch) {
    if ('0' <= ch && ch <= '9')
        return true;
    return false;
}
bool litera(char ch) {
    if ('a' <= ch && ch <= 'z')
        return true;
    return false;
}
vector<vector<char>> v;
string s;

//*4b*bbab4a*abbb
int pos = 0;
void constr(int x1, int y1, int x2, int y2) { /// size, pos
    if (s[pos] == '*') {                      /// impartim
        pos++;
        int x = (x1 + x2) / 2, y = (y1 + y2) / 2;
        if (x1 == x2) { /// caz 4, rand
            constr(x, y1, x, y);
            constr(x, y + 1, x, y2);
        } else if (y1 == y2) { /// caz 5, col
            constr(x1, y, x, y);
            constr(x + 1, y, x2, y);
        } else { /// caz 3
            constr(x1, y1, x, y);
            constr(x1, y + 1, x, y2);
            constr(x + 1, y1, x2, y);
            constr(x + 1, y + 1, x2, y2);
        }
    } else {
        if (x1 == x2 && y1 == y2) { /// caz 1
            v[x1].push_back(s[pos]);
            pos++;
        } else {                                    /// caz 2, cu nr
            while (pos < s.size() && numar(s[pos])) /// nu ne pasa nr, ci doar poz
                pos++;
            for (int x = x1; x <= x2; x++) {
                for (int i = y1; i <= y2; i++)
                    v[x].push_back(s[pos]);
            }
            pos++;
        }
    }
}

int main() {
    int cnt = 0;
    cin >> s;
    for (int i = 0; i < s.size(); i++) {
        if (s[i] == '*')
            cnt++;
    }
    int tot = 0;
    while (pos < s.size()) {
        if (numar(s[pos])) {
            int nr = 0;
            while (numar(s[pos])) { /// litera de la fin nu o mai punem
                nr = nr * 10 + (s[pos] - '0');
                pos++;
            }
            tot += nr;
        } else if (litera(s[pos]))
            tot++;
        pos++;
    }
    pos = 0;
    tot = (int)(sqrt(tot));
    v.resize(tot + 2);
    constr(1, 1, tot, tot);
    cout << cnt << '\n';
    for (int i = 1; i <= tot; i++) {
        for (auto var : v[i])
            cout << var;
        cout << '\n';
    }
    return 0;
}
```
