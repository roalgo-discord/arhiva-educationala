---
id: OJI-2010-X-text
title: Soluția problemei Text (OJI 2010, clasa a X-a)
problem_id: 804
authors: [cristurean]
prerequisites:
    - intro-dp
    - strings
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2010/10/text.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2010/10/text.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2010/10/text.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>
#include <vector>
#include <stack>

using namespace std;
const int NMAX = 28;

ifstream cin("text.in");
ofstream cout("text.out");

vector <string> v;
struct solutie_duh {
    int val = -1;
    vector <int> id;
}dp[NMAX];

int main()
{
    string ch;
    while(cin >> ch)
        v.push_back(ch);
	
    int cnt = 0;
    for(auto s : v) {
        if(dp[s[0] - 'a'].val != -1) { ///pot sa continui cv
            if(dp[s[0] - 'a'].val + 1 > dp[s[s.size() - 1] - 'a'].val) {
                dp[s[s.size() - 1] - 'a'].val = dp[s[0] - 'a'].val + 1;
                dp[s[s.size() - 1] - 'a'].id = dp[s[0] - 'a'].id;
                dp[s[s.size() - 1] - 'a'].id .push_back(cnt);
            }
        }
        if(1 > dp[s[s.size() - 1] - 'a'].val) {
            dp[s[s.size() - 1] - 'a'].val = 1;
            dp[s[s.size() - 1] - 'a'].id.push_back(cnt);
        }
        cnt++;
    }
    int maxx = -1, ind = -1;
    for(int i = 0; i <= 26; i++) {
        if(dp[i].val > maxx) {
            maxx = dp[i].val;
            ind = i;
        }
    }
    cout << v.size() - maxx << '\n';
    cout << v.size() << '\n';

    for(auto idd : dp[ind].id)
        cout << v[idd] << '\n';
    return 0;
}
```
