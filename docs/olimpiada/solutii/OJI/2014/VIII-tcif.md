---
id: OJI-2014-VIII-tcif
title: Soluția problemei tcif (OJI 2014, clasa a VIII-a)
problem_id: 849
authors: [pracsiu]
prerequisites:
    - frequency-arrays
    - ad-hoc
tags:
    - OJI
    - clasa VIII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2014/08/tcif.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2014/08/tcif.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2014/08/tcif.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <fstream>
#include <iostream>
#include <string>

using namespace std;

int fr[10];

int main() {
    ifstream cin("tcif.in");
    ofstream cout("tcif.out");

    int a, b, c, c1, c2, c3;
    cin >> a >> b >> c >> c1 >> c2 >> c3;

    fr[c1] = a, fr[c2] = b, fr[c3] = c;

    string s;
    cin >> s;

    if (a + b + c > (int)s.size()) {
        for (int q = 1; q <= 9; q++)
            if (fr[q] > 0) {
                cout << q;
                fr[q]--;
                break;
            }
        for (int q = 0; q <= 9; q++)
            for (int x = 1; x <= fr[q]; x++)
                cout << q;
        return 0;
    }

    string init, ans;
    for (int i = 0; i < (int)s.size(); i++) {
        for (int j = s[i] - '0' + 1; j <= 9; j++)
            if (fr[j]) {
                fr[j]--;
                string init2 = init;
                init2 += ('0' + j);
                for (int q = 0; q <= 9; q++)
                    for (int x = 1; x <= fr[q]; x++)
                        init2 += ('0' + q);
                if (ans.empty() || init2 < ans)
                    ans = init2;
                fr[j]++;
                break;
            }
        init += s[i];
        fr[s[i] - '0']--;
        if (fr[s[i] - '0'] < 0)
            break;
    }

    cout << ans;
    return 0;
}
```
