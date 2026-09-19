---
id: OJI-2006-X-ecuatii
title: Soluția problemei ecuatii (OJI 2006, clasa a X-a)
problem_id: 397
authors: [cerchez]
prerequisites:
    - expression-evaluation
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2006/10/ecuatii.txt).

<div class="editorial-text" markdown>

```text
Vom citi ecuatia intr-un sir de caractere, apoi vom imparti sirul in doua subsiruri (membrul stang, cu alte cuvinte caracterele pana la semnul egal formeaza primul sir, iar membrul drept, cu alte cuvinte caracterele de dupa semnul egal formeaza al doilea sir).
Problema este de a determina pentru fiecare dintre cele doua subsiruri coeficientul lui x si termenul liber.
Sa notam:
nr1 termenul liber din membrul stang
nr2 termenul liber din membrul stang
nrx1 coeficientul lui x din membrul stang
nrx2 coeficientul lui x din membrul drept.
Solutia ecuatiei este (nr2-nr1)/(nrx1-nrx2) daca nrx1<>nrx2.
Daca nrx1=nrx2, atunci ecuatia este imposibila (daca nr1<>nr2) sau nedeterminata (daca nr1=nr2).
Pentru a determina nr1 si nrx1, respectiv nr2 si nrx2 se prelucreaza cele doua siruri, identificand coeficientii necunoscutei, respectiv termenii liberi.
```

</div>

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>
#include <iomanip>

using namespace std;

ifstream cin("ecuatii.in");
ofstream cout("ecuatii.out");

struct ecuatii {
    int x = 0;
    int add = 0;
};
bool numar(char ch) {
    if ('0' <= ch && ch <= '9')
        return true;
    return false;
}

int main() {
    int q;
    cin >> q;
    while (q--) {
        ecuatii st, dr;
        string s;
        cin >> s;
        int semn = 1; /// 1=adunare, -1=scadere
        int i = 0;
        int place = -1; /// poz =
        while (i < s.size()) {
            if (i == 0 || i - 1 == place)
                semn = 1;
            else {
                if (s[i] == '-')
                    semn = -1;
                else if (s[i] == '+')
                    semn = 1;
                else if (s[i] == '=') {
                    place = i;
                    i++;
                    continue;
                }
                i++;
            }
            int nr = 0;
            if (numar(s[i])) {
                while (i < s.size() && numar(s[i])) {
                    nr = nr * 10 + (s[i] - '0');
                    i++;
                }
            } else
                nr = 1;
            nr *= semn;
            if (s[i] == 'x') {
                if (place == -1)
                    st.x += nr;
                else
                    dr.x += nr;
                i++;
            } else {
                if (place == -1)
                    st.add += nr;
                else
                    dr.add += nr;
            }
        }
        int x = st.x - dr.x, add = dr.add - st.add;
        if (x == 0) {
            if (add == 0)
                cout << "infinit\n";
            else
                cout << "imposibil\n";
        } else {
            double ans = (double)add / x;
            cout << setprecision(4) << fixed << ans << '\n';
        }
    }
    return 0;
}
```
