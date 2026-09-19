---
id: OJI-2010-X-expozitie
title: Soluția problemei Expozitie (OJI 2010, clasa a X-a)
problem_id: 803
authors: [lmiron]
prerequisites:
    - bignum
    - intro-combinatorics
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2010/10/expozitie.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2010/10/expozitie.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2010/10/expozitie.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>
#include <vector>

using namespace std;

ifstream cin("expozitie.in");
ofstream cout("expozitie.out");

struct bignum {
    vector <int> cifs;
    void init() {
        cifs.push_back(1);
    }
    void clearZero() {
        while(cifs.size() > 1 && cifs.back() == 0)
            cifs.pop_back();
    }
    void inm(int a) {
        int t = 0;
        for(int i = 0; i < cifs.size(); i++) {
            t += cifs[i] * a;
            cifs[i] = t % 10;
            t /= 10;
        }
        while(t > 0) {
            cifs.push_back(t % 10);
            t /= 10;
        }
    }
    void divide(int a) {
        int r = 0;
        clearZero();
        for(int i = cifs.size() - 1; i >= 0; i--) {
            r = r * 10 + cifs[i];
            cifs[i] = r / a;
            r %= a;
        }
        clearZero();
    }
    void print() {
        for(int i = cifs.size() - 1; i >= 0; i--)
            cout << cifs[i];
        cout << '\n';
    }
};
bignum nr;
void comb(int n, int k) {
    for(int i = 1; i <= n; i++) ///n!
        nr.inm(i);
    for(int i = 1; i <= k; i++) ///k!
        nr.divide(i);
    for(int i = 1; i <= n - k; i++) ///(n - k)!
        nr.divide(i);
}

int main()
{
    int n, d, k;
    cin >> n >> d >> k;
    int x = n - d * k;
    if(x <= 0) {
        cout << (x == 0 ? 1 : 0);
        return 0;
    }
    nr.init();
    ///te gandesti INVERS: ai x obiecte si le pui in d cutii
    comb(d + x - 1, d - 1); ///comb de n - 1 luate cate n + k - 1, ca-i stars and bars
    nr.print();
    return 0;
}
```
