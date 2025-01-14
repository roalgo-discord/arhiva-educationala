---
tags:
    - OJI
    - clasa VIII
---

# Soluția problemei Mun (OJI 2024, clasa a VIII-a)

!!! example "Cunoștințe necesare"
    - [Șiruri de caractere](https://edu.roalgo.ro/cppintro/strings/)
    - [(Opțional): Introducere în STL](https://edu.roalgo.ro/cppintro/stl/)

**Autor soluție**: Lucia Miron

!!! note "Link problemă"
    Această problemă poate fi accesată [aici](https://kilonova.ro/problems/2510/).

Cerința $1$: Soluția în complexitate $O(N \log N)$ obține punctaj maxim, adică $40$ de puncte. Se determină pentru fiecare cod, codul ordonat crescător; se ordonează delegații crescător după codul ordonat, dacă doi delegați de pe poziții consecutive au codul ordonat diferit, se incrementează numărul de țări. Deoarece valoarea lui $N$ nu este foarte mare, există și alte abordări mai puțin eficiente care în funcție de implementare pot obține punctajul maxim. În cazul testelor cu $N \leq 1000$ și codurile formate dintr-un singur caracter, o soluție care utilizează vector de apariții pentru caractere, corect implementată, va obține $30$ de puncte.

Cerința $2$: Soluția în complexitate $O(N)$ obține punctaj maxim, adică $30$ de puncte. Se determină în $mx_{freq}$, frecvența elementului majoritar (țara gazdă) utilizând un algoritm liniar, pe vectorul ordonat obținut la cerința $1$, se calculează lungimea maximă a unei secvențe care are codurile ordonate crescător egale (sunt mai multe abordări, se poate utiliza și algoritmul clasic de determinare a elementului majoritar). Valoarea afișată pentru $S$ este $N − 2 \cdot (N − mx_{freq})$. Valoarea afișată pentru $V$ va fi $2 \cdot (N − mx_{freq})$

Cerința $3$. Soluția în complexitate $O(N \log N)$ obține punctaj maxim, adică $30$ de puncte. Se vor construi doi vectori de coduri: codurile delegaților care fac parte din țara gazdă $(hosts[])$ și codurile celorlalți delegați $(rest[])$; se vor ordona lexicografic, se va afișa un cod dintr-o mulțime și unul din cealaltă mulțime conform ordinii lexicografice, având grijă să nu se depășească numărul de persoane de la masa rotundă. O soluție care determină ordinea lexicografică în complexitate $O(N^2)$ poate obține în funcție de implementare $70$ - $80$ de puncte.

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;

string inv(string s) {
    for (int i = 0; i < (int)s.size(); i++) {
        int poz = 25 - (s[i] - 'A');
        s[i] = 'A' + poz;
    }
    return s;
}
int main() {
    ifstream cin("mun.in");
    ofstream cout("mun.out");

    int c, n;
    cin >> c >> n;

    map<int, int> s;
    vector<string> v(n + 1);
    for (int i = 1; i <= n; i++)
        cin >> v[i];
    sort(v.begin() + 1, v.begin() + n + 1, greater<string>());
    unordered_map<int, vector<string>> s2;
    for (int i = 1; i <= n; i++) {
        int msk = 0;
        for (int j = 0; j < (int)v[i].size(); j++)
            msk ^= (1 << (v[i][j] - 'A'));
        s[msk]++;
        s2[msk].push_back(v[i]);
    }
    if (c == 1) {
        cout << s.size() << '\n';
        return 0;
    }
    multiset<int> st;
    for (auto x : s)
        st.insert(x.second);
    int cnt = 0;
    int prv = 0;
    while (st.size() + (prv != 0) > 1) {
        int x = *st.rbegin();
        st.erase(st.lower_bound(x));
        cnt++;
        x--;
        if (prv != 0)
            st.insert(prv), prv = 0;
        prv = x;
    }
    if (c == 2) {
        cout << n - cnt << " " << cnt << '\n';
        return 0;
    }
    if (c == 3) {
        int prv = -1;
        int rem = cnt;
        vector<string> vv;
        set<pair<string, int>> ss;
        for (auto x : s2) {
            if (prv == -1)
                prv = x.first;
            else if (x.second.size() > s2[prv].size())
                prv = x.first;
        }
        vv = s2[prv];
        for (auto x : s2) {
            if (x.first != prv)
                ss.insert({x.second.back(), x.first});
        }
        prv = -1;
        while (rem) {
            if (prv != -2 &&
                ((vv.size() >= (rem / 2 + rem % 2) && rem % 2 == 1) || ss.empty() || vv.back() < (*ss.begin()).first)) {
                cout << vv.back() << " ";
                if (prv > 0 && s2[prv].size())
                    ss.insert({s2[prv].back(), prv});
                prv = -2;
                vv.pop_back();
            } else {
                pair<string, int> px = *ss.begin();
                ss.erase(px);
                cout << px.first << " ";
                s2[px.second].pop_back();
                if (prv > 0 && s2[prv].size())
                    ss.insert({s2[prv].back(), prv});
                prv = px.second;
            }
            rem--;
        }
    }
    return 0;
}
```