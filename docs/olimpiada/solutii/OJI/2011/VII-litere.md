---
id: OJI-2011-VII-litere
title: Soluția problemei litere (OJI 2011, clasa a VII-a)
problem_id: 812
authors: [apintea]
prerequisites:
    - bignum
    - strings
tags:
    - OJI
    - clasa VII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2011/07/litere.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2011/07/litere.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2011/07/litere.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

ifstream fin("litere.in");
ofstream fout("litere.out");

const int ALPHABET = 40, MAXM = 27;

int let[ALPHABET], cod[MAXM];

int main() {
    int n, i, j, t, m, nrPerechi, apar;
    char ch;
    string s, vowels;

    fin >> n >> s;

    vowels = "AEIOU";
    nrPerechi = 0;
    for(i = 0; i < n - 1; i++){
        if( ( (vowels.find(s[i]) != string::npos) && (vowels.find(s[i + 1]) == string::npos) ) || 
            ( (vowels.find(s[i]) == string::npos) && (vowels.find(s[i + 1]) != string::npos) ) ){
                nrPerechi++;
        }
    }
    fout << nrPerechi << '\n';

    fin >> m;
    for(i = 0; i < m; i++){
        fin >> cod[i];
    }

    apar = 0;
    for(i = 0; i < n; i++){
        if('A' <= s[i] && s[i] <= 'Z' && let[s[i] - 'A'] == 0){
            let[s[i] - 'A'] = 1;
            replace(s.begin(), s.end(), (ch = s[i]), char(cod[apar++] + '0')); // Modificam toate cu codul sau
        }
    }

    fout << s << '\n';

    string original = s;
    for(i = 1; i < n; i++){
        string toAdd = original.substr(i); // de la i pana la final

        // Adding those 2 strings : s + toAdd
        size_t lng = max(s.size(), toAdd.size());

        if(lng > s.size()){
            s = string(lng - s.size(), '0') + s;
        }    
        if(lng > toAdd.size()){
            toAdd = string(lng - toAdd.size(), '0') + toAdd;
        }

        string ans(lng + 1, '0');
        char t = 0; // transportul

        transform(s.rbegin(), s.rend(), toAdd.rbegin(), ans.rbegin(), [&t](char a, char b){
            char c = (a - '0') + (b - '0') + t;
            if(c > 9){
                t = 1;  
                c -= 10;
            } else {
                t = 0;
            }
            
            return c + '0';
        });

        ans[0] = t + '0';

        lng = ans.find_first_not_of("0");
        if(lng != string::npos){
            ans = ans.substr(lng);
        }

        s = ans; 
        // Finished
    }

    fout << s << '\n';
    return 0;
}
```
