---
id: OJI-2016-X-interesant
title: Soluția problemei Interesant (OJI 2016, clasa a X-a)
problem_id: 874
authors: [vnicu]
prerequisites:
    - strings
    - stl
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2016/10/interesant.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2016/10/interesant.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2016/10/interesant.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>
#include <algorithm>
#include <vector>
#include <map>

using namespace std;

ifstream cin("interesant.in");
ofstream cout("interesant.out");

struct siruri {
    string s;
    int id;
    bool ok = true;
};
bool cmp1(siruri x, siruri y) {
    if(x.s.size() != y.s.size())
        return x.s.size() < y.s.size();
    return x.s < y.s;
}
bool cmp2(siruri x, siruri y) {
    if(x.ok != y.ok)
        return x.ok > y.ok;
    return x.id < y.id;
}

map <string, int> umap;
vector <siruri> temp, v;
int main()
{
    int cer, n;
    string c;
    cin >> cer >> n;
    for(int i = 1; i <= n; i++) {
        cin >> c;
        umap[c]++;
        temp.push_back({c, i});
    }
    sort(temp.begin(), temp.end(), cmp1);
    if(cer == 1) {
        int pos = temp.size() - 1;
        for(int i = temp.size() - 1; i >= 0; i--) {
            if(temp[i].s.size() == temp[pos].s.size())
                pos = i;
        }
        cout << temp[pos].s;
        return 0;
    }
    for(int i = 0; i < temp.size(); i++) {
        if(umap[temp[i].s] == 1)
            v.push_back(temp[i]);
    }
    int cnt = v.size();
    for(int i = 0; i < v.size(); i++) {
        for(int j = i + 1; j < v.size(); j++) {
            int nr = 0;
            bool ok = 0;
            for(int pos = 0; pos < v[j].s.size(); pos++) {
                if(v[j].s[pos] == v[i].s[nr])
                    nr++;
                if(nr == v[i].s.size()) {
                    ok = 1;
                    break;
                }
                if((v[j].s.size() - pos - 1) < (v[i].s.size() - nr))
                    break;
            }
            if(ok == 1) {
                cnt--;
                v[i].ok = false;
                break;
            }
        }
    }
    cout << cnt << '\n';
    sort(v.begin(), v.end(), cmp2);
    for(int i = 0; i < v.size(); i++) {
        if(v[i].ok == false)
            break;
        cout << v[i].s << '\n';
    }
    return 0;
}
```
