---
id: OJI-2015-VI-covor
title: Soluția problemei covor (OJI 2015, clasa a VI-a)
problem_id: 856
authors: [sichim]
prerequisites:
    - math
tags:
    - OJI
    - clasa VI
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2015/06/covor.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2015/06/covor.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2015/06/covor.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: AntonioCC (kilonova)
#include <bits/stdc++.h>
using namespace std;

int main()
{
    ifstream fin("covor.in");
    ofstream fout("covor.out");

    int n, k, c;

    fin >> n >> k >> c;

    if(c == 1){
        int sum = 4, randAnt = 7, cnt = 1;

        while(sum + randAnt <= n){
            sum = sum + randAnt;
            randAnt = randAnt + 4;
            cnt++;
        }

        fout << cnt;
    }
    else{
        int sum = 4, randAnt = 7, cnt = 1, dif, val, OK = 1, i;

        while(sum + randAnt <= n){
            sum = sum + randAnt;
            randAnt = randAnt + 4;
            cnt++;
        }

        dif = 4; val = 3;

        for(i = 2; i <= cnt && OK == 1; i++){
            val = val + dif;
            dif = dif + 2;
            if(val >= k){
                fout << i;
                OK = 0;
            }
        }

        if(OK == 1){
            dif = dif - 3;
            for(i = cnt; i >= 1 && OK == 1; i--){
                val = val + dif;
                dif = dif - 2;
                if(val >= k){
                    fout << i;
                    OK = 0;
                }
            }

            if(OK == 1)
                fout << 0;
        }
    }
    return 0;
}
```
