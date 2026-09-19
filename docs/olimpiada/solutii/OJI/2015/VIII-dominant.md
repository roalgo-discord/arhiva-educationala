---
id: OJI-2015-VIII-dominant
title: Soluția problemei dominant (OJI 2015, clasa a VIII-a)
problem_id: 860
authors: [pracsiu]
prerequisites:
    - partial-sums
tags:
    - OJI
    - clasa VIII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2015/08/dominant.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2015/08/dominant.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2015/08/dominant.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

using ll = long long;
#define pb push_back

const string FILE_NAME = "dominant";
const int MAX_LEN = 3e5;

int dif[MAX_LEN + 5];
map<int, pair<int, int>> pos;

int main () {
#ifndef LOCAL
    ifstream cin(FILE_NAME + ".in");
    ofstream cout(FILE_NAME + ".out");
#endif

    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int cer, n, i, num1, num0, val, posL, posR, len, maxLen, cntLen, minL;
    string s;

    cin >> cer >> s;

    n = s.size();
    pos[0].first = 0;
    num1 = num0 = 0;
    for (i = 1; i <= n; i++) {
        num1 += (s[i - 1] == '1');
        num0 += (s[i - 1] == '0');
        dif[i] = num1 - num0;

        if (pos.find(dif[i]) == pos.end()) {
            pos[dif[i]].first = i;
        }
        pos[dif[i]].second = i;
    }

    maxLen = cntLen = 0;
    minL = INT_MAX;
    for (auto e : pos) {
        val = e.first;
        posL = e.second.first;
        posR = e.second.second;
        len = posR - minL;
        minL = min(minL, posL);

        if (len > maxLen) {
            maxLen = len;
            cntLen = 1;
        } else if (len == maxLen) {
            cntLen++;
        }
    }

    cout << (cer == 1 ? maxLen : cntLen);
    return 0;
}
```
