---
id: OJI-2011-VIII-comp
title: Soluția problemei comp (OJI 2011, clasa a VIII-a)
problem_id: 814
authors: [aburta]
prerequisites:
    - ad-hoc
tags:
    - OJI
    - clasa VIII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2011/08/comp.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2011/08/comp.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2011/08/comp.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

using ll = long long;
#define pb push_back

const string FILE_NAME = "comp";

int parseNumber(string str) {
    int m = 0;
    int s = 0;
    int z = 0;
    int u = 0;

    int i = 0;
    while (i < str.size()) {
        int num = 0;
        while (isdigit(str[i])) {
            num = num * 10 + (str[i] - '0');
            i++;
        }
        if (str[i] == 'm') {
            m = num;
        } else if (str[i] == 's') {
            s = num;
        } else if (str[i] == 'z') {
            z = num;
        } else {
            u = num;
        }
        i++;
    }

    return m * 1000 + s * 100 + z * 10 + u;
}

int main() {
#ifndef LOCAL
    ifstream cin(FILE_NAME + ".in");
    ofstream cout(FILE_NAME + ".out");
#endif

    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, i, j, cnt;
    string line, t1, t2;

    cin >> n;
    cnt = 0;
    vector<int> ans;
    for (i = 1; i <= n; i++) {
        cin >> line;

        j = 0;
        t1 = "";
        int n1 = 0;
        while (line[j] != '>' && line[j] != '<') {
            if (line[j] == '+') {
                n1 += parseNumber(t1);
                t1 = "";
                j++;
                continue;
            }
            t1.push_back(line[j]);
            j++;
        }
        n1 += parseNumber(t1);

        char semn = line[j];

        j++;
        t2 = "";
        int n2 = 0;
        while (j < line.size()) {
            if (line[j] == '+') {
                n2 += parseNumber(t2);
                t2 = "";
                j++;
                continue;
            }
            t2.push_back(line[j]);
            j++;
        }
        n2 += parseNumber(t2);

        if (semn == '>') {
            ans.push_back(n1 > n2);
        } else {
            ans.push_back(n1 < n2);
        }
        cnt += (semn == '<');
    }
    cout << cnt << "\n";
    for (auto e : ans) {
        cout << e << "\n";
    }
    return 0;
}
```
