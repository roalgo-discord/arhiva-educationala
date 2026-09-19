---
id: OJI-2017-IX-admitere
title: Soluția problemei admitere (OJI 2017, clasa a IX-a)
problem_id: 877
authors: [calancea]
prerequisites:
    - sorting
    - simulating-solution
tags:
    - OJI
    - clasa IX
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2017/09/admitere.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2017/09/admitere.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2017/09/admitere.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>
#include <vector>
#include <algorithm>
#include <set>

using namespace std;
const int NMAX = 2002;

ifstream cin("admitere.in");
ofstream cout("admitere.out");

int n, m;
struct liceu {
    int r, u, id;
};
vector < liceu > v;
bool desc(liceu a, liceu b) {
    if(a.u != b.u)
        return a.u > b.u;
    if(a.r != b.r)
        return a.r > b.r;
}
bool cresc(liceu a, liceu b) {
    if(a.u != b.u)
        return a.u < b.u;
    if(a.r != b.r)
        return a.r < b.r;
}

struct admisi {
    int a, id;
    bool ok = 0;
};
vector < admisi > r, u;
bool cmp(admisi a, admisi b) { ///cresc
    if(a.a != b.a)
        return a.a > b.a;
    return a.ok > b.ok;
}

int ans[NMAX]; ///1-u, 2-r
bool used[NMAX];
int change(int nr) {
    int p = -1;
    for(int i = 1; i <= n; i++) { ///reset
        ans[i] = 0;
        used[i] = 0;
    }
    ans[nr] = 2; used[nr] = 1;
    for(int i = 1; i <= m; i++) {
        if(v[nr].r > r[i].a) { ///ii gasim pos in sirul de note
            p = i;
            break;
        }
    }
    if(p == -1) ///nu putem sa il bagam deloc, ouch
        return 0;
    int spatiu = m - p;
    liceu var[NMAX];
    int pos = 0;
    for(int i = 1; i <= n; i++) {
        if(v[i].r > v[nr].r)
            var[++pos] = v[i];
    }
    sort(var + 1, var + pos + 1, cresc);
    for(int i = 1; i <= min(pos, spatiu); i++) {
        ans[var[i].id] = 2;
        used[var[i].id] = 1;
    }

    pos = 0;
    for(int i = 1; i <= n; i++) { ///incercam sa-i bagam pe restul la uman
        if(used[i] == 0)
            var[++pos] = v[i];
    }
    sort(var + 1, var + pos + 1, desc); 
    for(int i = 1; i <= pos; i++) {
        if(m - i + 1 >= 1 && v[var[i].id].u > u[m - i + 1].a)
            ans[var[i].id] = 1;
    }
    int cnt = 0;
    for(int i = 1; i <= n; i++) {
        if(ans[i] != 0)
            cnt++;
    }
    return cnt;
}

int main()
{
    int cer;
    cin >> cer >> n >> m;
    if(cer == 1) {
        u.resize(n + m + 1);
        r.resize(n + m + 1);
        for(int i = 1; i <= m; i++)
            cin >> r[i].a;
        for(int i = 1; i <= m; i++)
            cin >> u[i].a;
        for(int i = 1; i <= n; i++) {
            cin >> r[m + i].a >> u[m + i].a;

            r[m + i].ok = 1; 
            u[m + i].ok = 1;
            r[m + i].id = i;
            u[m + i].id = i;
        }
        sort(r.begin() + 1, r.begin() + n + m + 1, cmp);
        sort(u.begin()  + 1, u.begin() + n + m + 1, cmp);

        int cnt = 0, maxx = 0, profil = -1;
        for(int i = 1; i <= m; i++) ///real
            cnt += r[i].ok;
        if(cnt > maxx) {
            maxx = cnt;
            profil = 1;
        }
        cnt = 0;
        for(int i = 1; i <= m; i++) ///uman
            cnt += u[i].ok;
        if(cnt > maxx) {
            maxx = cnt;
            profil = 2;
        }
        if(profil == 1) { ///real
            for(int i = 1; i <= m; i++) {
                if(r[i].ok == 1)
                    ans[r[i].id] = 1;
            }
        }
        else { ///uman
            for(int i = 1; i <= m; i++) {
                if(u[i].ok == 1)
                    ans[u[i].id] = 1;
            }
        }
        cout << maxx << '\n';
        for(int i = 1; i <= n; i++)
        {
            if(ans[i] == 0)
                cout << "X";
            else {
                if(profil == 1)
                    cout << "R";
                else
                    cout << "U";
            }
        }
        return 0;
    }
    v.resize(n + 1);
    u.resize(m + 1);
    r.resize(m + 1);
    for(int i = 1; i <= m; i++)
        cin >> r[i].a;
    for(int i = 1; i <= m; i++)
        cin >> u[i].a;
    for(int i = 1; i <= n; i++) {
        cin >> v[i].r >> v[i].u;
        v[i].id = i;
    }
    sort(r.begin() + 1, r.begin() + m + 1, cmp);
    sort(u.begin() + 1, u.begin() + m + 1, cmp);
    int cnt = 0;
    for(int i = 1; i <= n; i++)
        cnt = max(cnt, change(i)); ///alegem copilul cel mai slab
    cout << cnt << '\n';
    for(int i = 1; i <= n; i++) {
        if(change(i) == cnt) {
            for(int j = 1; j <= n; j++) {
                if(ans[j] == 0)
                    cout << "X";
                else if(ans[j] == 1)
                    cout << "U";
                else
                    cout << "R";
            }
            return 0;
        }
    }
    return 0;
}
```
