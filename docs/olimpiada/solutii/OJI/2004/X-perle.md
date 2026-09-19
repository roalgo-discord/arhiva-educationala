---
id: OJI-2004-X-perle
title: Soluția problemei perle (OJI 2004, clasa a X-a)
problem_id: 733
authors: [mars]
prerequisites:
    - stack
    - strings
    - expression-evaluation
tags:
    - OJI
    - clasa X
---

Articolul va fi disponibil curând în arhivă.

Până atunci, puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2004/OJI%202004%20X.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2004/OJI%202004%20X.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2004/OJI%202004%20X.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>

using namespace std;
const int NMAX = 10002;

ifstream cin("perle.in");
ofstream cout("perle.out");

int v[NMAX];
int pos;

bool c(int n);
bool b(int n) {
    while(pos <= n && v[pos] == 2)
        pos++;
    if(pos + 4 > n || v[pos] != 1 || v[pos + 2] != 3)
        return false;
    pos += 4;
    return c(n);
}

bool c(int n) {
    if(v[pos] == 2) { ///2
        pos++;
        return true;
    }
    if(v[pos] == 1) { ///12A
        if(pos + 2 > n)
            return false;
        if(v[pos + 1] == 2) {
            pos += 3;
            return true;
        }
        return false;
    }
    if(n - pos + 1 < 7) ///3BC
        return false;
    pos++;
    if(!b(n))
        return false;
    return c(n);
}
int main()
{
    int t;
    cin >> t;
    while(t--) {
        int n;
        cin >> n;
        for(int i = 1; i <= n; i++)
            cin >> v[i];
        if(n == 1) {
            cout << "1\n";
            continue;
        }
        else if(n == 3) {
            if(v[1] == 1 && v[2] == 2)
                cout << "1\n";
            else
                cout << "0\n";
            continue;
        }
        else if(n < 5) {
            cout << "0\n";
            continue;
        }
        pos = 1;
        if(v[1] == 2) { ///B --> 22222....21A3AC
            while(pos <= n && v[pos] == 2)
                pos++;
            if(pos + 4 > n || v[pos] != 1 || v[pos + 2] != 3) { ///nu mai avem loc
                cout << "0\n";
                continue;
            }
            pos += 4;
        }
        else if(v[1] == 1) { ///B --> 1A3AC
            if(v[3] != 3) {
                cout << "0\n";
                continue;
            }
            pos = 5;
        }
        else if(v[1] == 3) { ///C --> 3BC
            pos++;
            if(!b(n)) {
                cout << "0\n";
                continue;
            }
        }
        bool ans = c(n);
        if(!ans)
            cout << "0\n";
        else if(pos == n + 1)
            cout << "1\n";
        else
            cout << "0\n";
    }
    return 0;
}
```
