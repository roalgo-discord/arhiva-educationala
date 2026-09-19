---
id: OJI-2006-VIII-mare
title: Soluția problemei mare (OJI 2006, clasa a VIII-a)
problem_id: 756
authors: [dapopescu]
prerequisites:
    - bignum
tags:
    - OJI
    - clasa VIII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2006/08/mare.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2006/08/mare.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2006/08/mare.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

using ll = long long;
#define pb push_back

const string FILE_NAME = "mare";
const int MAX_N = 100;

string str[MAX_N + 5];

int main() {
#ifndef LOCAL
    ifstream cin(FILE_NAME + ".in");
    ofstream cout(FILE_NAME + ".out");
#endif

    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, i, j;
    string s, rs, ans;

    cin >> n;
    for (i = 1; i <= n; i++) {
        cin >> str[i];
    }

    ans = "";
    for (i = 1; i <= n; i++) {
        s = "";
        for (j = i; j <= n; j++) {
            s += str[j];
            rs = s;
            reverse(rs.begin(), rs.end());
            if (s == rs && s.size() > ans.size()) {
                ans = s;
            }
        }
    }
    cout << ans << "\n";
    return 0;
}
```
