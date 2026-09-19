---
id: OJI-2015-X-charlie
title: Soluția problemei charlie (OJI 2015, clasa a X-a)
problem_id: 862
authors: [nodea]
prerequisites:
    - greedy
    - stack
    - strings
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2015/10/charlie.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2015/10/charlie.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2015/10/charlie.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>

using namespace std;

ifstream cin("charlie.in");
ofstream cout("charlie.out");

int main()
{
    int cer;
    string s;
    cin >> cer >> s;
    if(cer == 1) {
        int mic = 0, mare = 1, maxx = 1;
        for(int i = 1; i < s.size(); i++) {
            int newm, newM;
            if(s[i - 1] > s[i])
                newm = mare + 1;
            else
                newm = 0;
            if(s[i - 1] < s[i])
                newM = mic + 1;
            else
                newM = 1;
            maxx = max(maxx, newM);
            mare = newM;
            mic = newm;
        }
        cout << maxx;
        return 0;
    }
    bool ok = 1;
    int ans = 0;
    while(ok) {
        ok = 0;
        for(int i = 1; i < s.size(); i++) {
            if(i < s.size() - 1 && s[i - 1] > s[i] && s[i] < s[i + 1]) {
                ans += (max(s[i - 1], s[i + 1]) - 'a' + 1);
                s.erase(i, 1);
                ok = 1;
                i--;
            }
        }
    }
    cout << s << '\n' << ans;
    return 0;
}
```
