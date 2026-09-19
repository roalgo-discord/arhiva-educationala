---
id: OJI-2011-X-expresie
title: Soluția problemei Expresie (OJI 2011, clasa a X-a)
problem_id: 816
authors: [nodea]
prerequisites:
    - expression-evaluation
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2011/10/expresie.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2011/10/expresie.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2011/10/expresie.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>
#include <algorithm>
#include <stack>
#include <vector>

using namespace std;

ifstream cin("expresie.in");
ofstream cout("expresie.out");

bool paranteze(string s) {
    for(int i = 0; i < s.size(); i++) {
        if(s[i] == '(' || s[i] == '[')
            return true;
    }
    return false;
}
bool numar(char ch) {
    if('0' <= ch && ch <= '9')
        return true;
    return false;
}
stack <char> l;
vector <int> v;

int adunare() { ///kadane
    int maxx = -21e8, sum = 0;
    for(int i = 0; i < v.size(); i++) {
        if(sum < 0)
            sum = 0;
        sum += v[i];
        maxx = max(maxx, sum);
    }
    return maxx;
}
int mediana() {
    sort(v.begin(), v.end());
    return v[((v.size() + 1) / 2) - 1];
}
int countnr(string s) {
    int cnt = 0, i = 0;
    while(i < s.size()) {
        if(numar(s[i])) {
            cnt++;
            while(numar(s[i]))
                i++;
        }
        i++;
    }
    return cnt;
}

int main()
{
    int sum = 0, cnt = 0;
    string s;
    cin >> s;
    cnt = countnr(s);
    while(paranteze(s)) {
        string a;
        for(int i = 0; i < s.size(); i++) {
            a += s[i];
            if(s[i] == '(' || s[i] == '[')
                l.push(s[i]);
            else if((s[i] == ')' && l.top() == '(') || (s[i] == ']' && l.top() == '[')) {
                l.pop();
                char fin = s[i], start;
                if(s[i] == ')')
                    start = '(';
                else
                    start = '[';

                int pos = a.size() - 1; ///lucram pe a, NU pe s
                while(a[pos] != start)
                    pos--;
                pos++;
                int j = pos; ///sa stim de unde incepem
                while(pos < a.size()) { ///fm nr si vectorul de nr
                    int semn = 1, nr = 0;
                    if(a[pos] == '-') {
                        semn = -1;
                        pos++;
                    }
                    while(numar(a[pos])) {
                        nr = nr * 10 + (a[pos] - '0');
                        pos++;
                    }
                    v.push_back(semn * nr);
                    pos++;
                }
                while(a[a.size() - 1] != start) ///scoatem ce tocmai am folosit
                    a.pop_back();
                a.pop_back(); ///+ actual paranteza!!
                int add;
                if(start == '(')
                    add = adunare();
                else
                    add = mediana();
                if(add < 0) {
                    a += '-';
                    add *= -1;
                }
                if(add == 0)
                    a += '0';
                else {
                    string c;
                    while(add > 0) {
                        c += (char)('0' + add % 10);
                        add /= 10;
                    }
                    reverse(c.begin(), c.end());
                    a += c;
                }
                v.clear();
            }
        }
        while(!l.empty())
            l.pop();
        s = a;
    }
    int ans = 0, i = 0;
    while(i < s.size()) {
        if(s[i] == '-' || numar(s[i])) {
            int semn = 1, nr = 0;
            if(s[i] == '-') {
                semn = -1;
                i++;
            }
            while(i < s.size() && numar(s[i])) {
                nr = nr * 10 + (s[i] - '0');
                i++;
            }
            ans += (semn * nr);
        }
        i++;
    }
    cout << cnt << '\n' << ans;
    return 0;
}
```
