---
id: OJI-2020-X-arh
title: Soluția problemei arh (OJI 2020, clasa a X-a)
problem_id: 928
authors: [nodea]
prerequisites:
    - stack
    - expression-evaluation
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2020/10.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2020/10.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2020/10.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>
#include <stack>

using namespace std;

ifstream cin("arh.in");
ofstream cout("arh.out");

bool paranteze(string x) {
    for(int i = 0; i < x.size(); i++) {
        if(x[i] == '(' || x[i] == '[' || x[i] == '*')
            return true;
    }
    return false;
}
bool numar(char ch) {
    if('0' <= ch && ch <= '9')
        return true;
    return false;
}
stack <char> ps;
int main()
{
    int cnt = 0;
    string s;
    cin >> s;
    for(int i = 0; i < s.size(); i++) {
        if(s[i] == '(' || s[i] == '[')
            cnt++;
    }
    cout << cnt << '\n';

    while(paranteze(s)) {
        string a;
        for(int i = 0; i < s.size(); i++) {
            a += s[i];
            if(s[i] == '(' || s[i] == '[')
               ps.push(s[i]);
            else if(s[i] == ')' && ps.top() == '(') {
                ps.pop();
                ps.push({'*'});
                int j = i;
                string del;
                while(j >= 0 && !numar(s[j])) {
                    del = s[j] + del;
                    j--;
                    a.pop_back();
                }
                while(j >= 0 && numar(s[j])) {
                    del = s[j] + del;
                    j--;
                    a.pop_back();
                }
                int nr = 0;
                j = 0;
                while(del[j] != '(') {
                    nr = nr * 10 + (del[j] - '0');
                    j++;
                }
                j++;
                string nou;
                while(del[j] != ')') {
                    nou += del[j];
                    j++;
                }
                for(j = 0; j < nr; j++)
                    a += nou;
            }
            else if(s[i] == ']' && ps.top() == '[') {
                ps.pop();
                ps.push({'*'});
                if(s[i - 1] == '*') {
                    string nou, inv;
                    int j = i - 2;
                    a.pop_back(), a.pop_back(); ///*]
                    bool ok = 0;
                    while(j >= 0 && s[j] != '[') {
                        nou = s[j] + nou;
                        if(ok == 1)
                            inv += s[j];
                        a.pop_back();
                        ok = 1;
                        j--;
                    }
                    a.pop_back();
                    a += nou, a += inv;
                }
                else {
                    string nou, inv;
                    int j = i - 1;
                    a.pop_back();
                    while(j >= 0 && s[j] != '*') {
                        nou = s[j] + nou;
                        inv += s[j];
                        a.pop_back();
                        j--;
                    }
                    a.pop_back(), a.pop_back();
                    a += nou, a += inv;
                }
            }
        }
        while(!ps.empty())
            ps.pop();
        s = a;
    }
    cout << s;
    return 0;
}
```
