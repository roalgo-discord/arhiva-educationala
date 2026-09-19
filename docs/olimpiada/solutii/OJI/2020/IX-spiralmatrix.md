---
id: OJI-2020-IX-spiralmatrix
title: Soluția problemei spiralmatrix (OJI 2020, clasa a IX-a)
problem_id: 918
authors: [mdragan]
prerequisites:
    - ad-hoc
    - binary-search
tags:
    - OJI
    - clasa IX
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2020/09.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2020/09.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2020/09.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
/* 

11^2 = 121
9^2 = 81
7^2 = 49
5^2 = 25
3^2 = 9
1^2 = 1

1 8 16 24 32 40


10^2 = 100
8^2 = 64
6^2 = 36
4^2 = 16
2^2 = 4

4 12 20 28 36

Arithmetic progressions for even and odd cases and we can figure out like that where will each value pop up 

*/
#include <bits/stdc++.h>
using namespace std;

long long gauss (long long x) {
    return x * (x+1) / 2;
}
pair<int, int> pos (long long number, int n) {
    number--;
    long long ans = 0, dif = 0;
    // find top-left corner on the same layer as the number
    if (n % 2 == 0) {
        int L = 0;
        int R = n/2;
        while (L <= R) {
            int mid = (L + R) / 2;
            if ((gauss(n/2 - 1) - gauss(n/2 - 1 - mid)) * 8 + 4 * mid <= number) {
                ans = mid, dif = (gauss(n/2 - 1) - gauss(n/2 - 1 - mid)) * 8 + 4 * mid;
                L = mid + 1;
            }
            else {
                R = mid - 1;
            }
        }
    }
    else {
        int L = 0;
        int R = n/2;
        while (L <= R) {
            int mid = (L + R) / 2;
            if ((gauss(n/2) - gauss(n/2 - mid)) * 8 <= number) {
                ans = mid, dif = (gauss(n/2) - gauss(n/2 - mid)) * 8;
                L = mid + 1;
            }
            else {
                R = mid - 1;
            }
        }
    }
    number -= dif;
    pair<int, int> anss = {ans+1, ans+1};
    if(number < n - 2 * ans - 1) {
        anss.second += number;
    }
    else {
        anss.second = n - ans;
        number -= (n - 2 * ans - 1);
        if (number < n - 2 * ans - 1) {
            anss.first += number;
        }
        else {
            number -= (n - 2 * ans - 1);
            anss.first = n - ans;
            if (number < n - 2 * ans - 1) {
                anss.second -= number;
            }
            else {
                number -= (n - 2 * ans - 1);
                anss.second = ans + 1;
                anss.first -= number;
            }
        }
    }
    return anss;
}
int main() {
    ifstream cin("spiralmatrix.in");
	ofstream cout("spiralmatrix.out");
    
    long long n;
    cin >> n;
	
    long long sq = n * n;
    
    long long a = sq/2;
    long long b = a + 1 + n%2;
    
    pair<int, int> ansa = pos(a, n);
    pair<int, int> ansb = pos(b, n);
    
    cout << ansa.first << " " << ansa.second << '\n';
    cout << ansb.first << " " << ansb.second << '\n';
    return 0;
}
```
