---
id: OJI-2009-X-reteta
title: Soluția problemei Rețetă (OJI 2009, clasa a X-a)
problem_id: 792
authors: [cerchez]
prerequisites:
    - expression-evaluation
    - strings
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2009/10/solutii.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2009/10/solutii.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2009/10/solutii.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>
#include <cstring>
#include <map>

using namespace std;
const int NMAX = 1002;

ifstream cin("reteta.in");
ofstream cout("reteta.out");

bool cifra(char ch) {
    if('0' <= ch && ch <= '9')
        return true;
    return false;
}
bool litera(char ch) {
    if('a' <= ch && ch <= 'z')
        return true;
    return false;
}

char ch[NMAX];
map <string, int> umap;
int main()
{
    //(((zahar 100 ou 3)5 unt 100 nuca 200)4 (lapte 200 cacao 50 zahar 100) 3)20
    //zahar100ou3)5unt100nuca200)4lapte200cacao50zahar100)3)20

    cin.getline(ch, NMAX);
    int timp = 0, sizee = strlen(ch);
    string s;

    for(int i = 0; i < sizee; i++) {
        if(ch[i] == ' ' || ch[i] == '(')
            continue;
        else {
            s += ch[i];
            //cout << ch[i];
        }
    }
    for(int i = 0; i < s.size(); i++) {
        string alt;
        int nr = 0;
        if(litera(s[i])) {
            while(i < s.size() && litera(s[i])) {
                alt += s[i];
                i++;
            }
            while(i < s.size() && cifra(s[i])) {
                nr = nr * 10 + (s[i] - '0');
                i++;
            }
            i--;
            umap[alt] += nr;
        }
        else if(s[i] == ')') {
            i++;
            while(i < s.size() && cifra(s[i])) {
                nr = nr * 10 + (s[i] - '0');
                i++;
            }
            i--;
            timp += nr;
        }
    }
    cout << timp << '\n';
    for(auto var : umap)
        cout << var.first << " " << var.second << '\n';
    return 0;
```
