---
id: OJI-2026-VIII-pisicesc
title: Soluția problemei pisicesc (OJI 2026, clasa a VIII-a)
problem_id: 4222
authors: [cerches]
prerequisites:
    - hashing
    - strings
tags:
    - OJI
    - clasa VIII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2026/08.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2026/08.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2026/08.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// Cristian Luchian
#include <bits/stdc++.h>
std::ifstream cin("pisicesc.in");
std::ofstream cout("pisicesc.out");
bool ans[210];
int c;
char a[2010];
char sir[2010], sirf[2010];
int fr;
int poz[2010];
void solve(char c1, char c2) {
    poz[0] = 0;
    int l = 0;
    for (int i = 0; a[i]; ++i)
        if (a[i] == c1 && a[i + 1] == c2)
            poz[++poz[0]] = i;
    if (poz[0] < fr || poz[0] == 0)
        return;
    bool ok = true;
    while (ok) {
        sir[l] = a[poz[1] + l];
        ++l;
        if (a[poz[1] + l] == 0)
            ok = false;
        else {
            for (int i = 1; i < poz[0]; ++i)
                if (a[poz[i] + l] != a[poz[i + 1] + l])
                    ok = false;
        }
    }
    sir[l] = 0;
    if (fr < poz[0] || l > strlen(sirf)) {
        fr = poz[0];
        for (int i = 0; i <= l; ++i)
            sirf[i] = sir[i];
    }
    return;
}
int main() {
    cin >> c >> a;
    if (c == 1) {
        for (int i = 0; a[i]; ++i)
            if (a[i] != 'm')
                ans[a[i]] = true;
        int sum = 0;
        for (int i = 'a'; i <= 'z'; ++i)
            sum += ans[i];
        cout << sum << '\n';
        return 0;
    } else if (c == 2) {
        int nr = 0;
        for (int i = 0; a[i]; ++i)
            if (a[i] == 'm' && a[i + 1] == 'a' && a[i + 2] == 'u')
                ++nr;
        cout << nr;
        return 0;
    } else if (c == 3) {
        for (char c1 = 'a'; c1 <= 'z'; ++c1)
            if (c1 == 'a' || c1 == 'e' || c1 == 'i' || c1 == 'o' || c1 == 'u' || c1 == 'm') {
                for (char c2 = 'a'; c2 <= 'z'; ++c2)
                    if (c2 == 'a' || c2 == 'e' || c2 == 'i' || c2 == 'o' || c2 == 'u' || c2 == 'm')
                        solve(c1, c2);
            }
        cout << sirf << '\n';
    }
    return 0;
}
```
