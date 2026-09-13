---
id: OJI-2010-VII-cuvinte
title: Soluția problemei cuvinte (OJI 2010, clasa a VII-a)
problem_id: 799
authors: [timplaru]
prerequisites:
    - strings
tags:
    - OJI
    - clasa VII
---

Articolul va fi disponibil curând în arhivă.

Până atunci, editorialul poate fi accesat în repo-ul nostru de GitHub, linkul fiind [acesta](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20(regional%20olympiad)/2010/07/cuvinte.pdf).

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <bits/stdc++.h>
using namespace std;

vector<string> words;
vector<int> ordine;

ifstream fin("cuvinte.in");
ofstream fout("cuvinte.out");

int main() {
    int cnt, i, firstRemovePnt;
    char ch;
    string word;

    word = "";
    cnt = 1;
    while (fin.get(ch)) {
        if (ch != ' ' && ch != '!') {
            word += ch;
        } else {
            words.push_back(word);
            ordine.push_back(cnt++);
            word = "";
        }
    }

    i = 1;
    firstRemovePnt = -1;
    while (i < words.size()) {
        cnt = 0;
        string original = words[i - 1];
        do {
            words[i - 1] = words[i - 1].substr(1, words[i - 1].size()) + words[i - 1][0];
            ++cnt;
        } while (cnt < words[i - 1].size() - 1 && words[i - 1] != words[i]);

        if (words[i - 1] == words[i]) {
            words[i - 1] = original;

            words.erase(words.begin() + i);
            ordine.erase(ordine.begin() + i);
            if (firstRemovePnt == -1) firstRemovePnt = i;
            i--;
        } else {
            words[i - 1] = original;
        }

        ++i;
    }

    fout << ++firstRemovePnt << '\n';
    for (i = 0; i < words.size(); i++) {
        fout << ordine[i] << " ";
    }
    return 0;
}
```
