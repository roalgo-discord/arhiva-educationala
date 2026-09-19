---
id: OJI-2012-X-culori
title: Soluția problemei Culori (OJI 2012, clasa a X-a)
problem_id: 828
authors: [cpopescu]
prerequisites:
    - bignum
    - intro-dp
tags:
    - OJI
    - clasa X
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2012/10/culori.txt).

<div class="editorial-text" markdown>

```text
culori - Descrierea solutiei
prof. Carmen Popescu - Col. Nat. Gh. Lazar sibiu


Notam
 nr[i,j] = numarul de variante de a vopsi primele i scanduri, daca scandura i o vopsim cu culoarea j, j=1,2,3,4,5
 S[i] = numarul de variante de a vopsi primele i scanduri din gard

Se observa ca au loc urmatoarele relatii:
  S[i]=nr[i,1]+nr[i,2]+nr[i,3]+nr[i,4]+nr[i,5]

  nr[i,1]=nr[i-1,2]
  nr[i,2]=nr[i-1,1]+nr[i-1,3]
  nr[i,3]=nr[i-1,2]+nr[i-1,4]
  nr[i,4]=nr[i-1,3]+nr[i-1,5]
  nr[i,5]=nr[i-1,4]

  Cum nr[1,j]=1 se poate observa usor ca
=>  nr[i,1]=nr[i,5]  si
    nr[i,2]=nr[i,4]

si
    nr[i,3]=2*nr[i,2]


  Asadar:
    nr[i,2]=nr[i-1,1]+nr[i-1,3]=nr[i-2,2]+2*nr[i-2,2]=3*nr[i-2,2]  pt i>2

    nr[i,1]=nr[i-1,2]=3*nr[i-3,2]=3*nr[i-2,1]  pt i>4

    nr[i,3]=2*nr[i-1,2]=6*nr[i-3,2]=3*nr[i-2,3]  pt i>4

=>  S[i]= 2*nr[i,1]+2*nr[i,2]+nr[i,3] =
        = 6*nr[i-2,1]+6*nr[i,2,2]+3*nr[i-2,3] = 3*S[i-2]

In concluzie obtinem:
     S[1]=5
     S[2]=8
     S[3]=14

     S[2k] = 3^(k-1) * S[2]  pt k>1
si   S[2k+1] = 3^(k-1) *S[3]  pt k>1

Pentru calcularea acestor expresii se vor folosi numere mari!
```

</div>

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>
#include <vector>

using namespace std;
const int NMAX = 5002;

ifstream cin("culori.in");
ofstream cout("culori.out");

struct bignum {
    vector <int> cifs;
    void init(int cif) {
        cifs.clear();
        cifs.push_back(cif);
    }
    void clearZeros() {
        while(cifs.size() > 1 && cifs.back() == 0)
            cifs.pop_back();
    }
    void adunare(bignum x, bignum y) {
        int t = 0;
        int minn = min(x.cifs.size(), y.cifs.size());
        int maxx = max(x.cifs.size(), y.cifs.size());
        cifs.resize(maxx);
        bool prim = true; ///care e mai MIC
        if(y.cifs.size() == minn)
            prim = false;
        for(int i = 0; i < minn; i++) {
            t += x.cifs[i] + y.cifs[i];
            cifs[i] = t % 10;
            t /= 10;
        }
        for(int i = minn; i < maxx; i++) {
            if(prim == false) ///y ii mic --> il adaugam pe x
                t += x.cifs[i];
            else
                t += y.cifs[i];
            cifs[i] = t % 10;
            t /= 10;
        }
        if(t)
            cifs.push_back(t);
        clearZeros();
    }
    void egal(bignum y) {
        cifs = y.cifs;
    }
    void print() {
        for(int i = cifs.size() - 1; i >= 0; i--)
            cout << cifs[i];
    }
}dp[3][7], ans;
int main()
{
    int n;
    cin >> n;
    for(int i = 1; i <= 5; i++)
        dp[1][i].init(1);
    for(int i = 2; i <= n; i++) {
        dp[2][1].egal(dp[1][2]);
        dp[2][5].egal(dp[1][4]);
        for(int cul = 2; cul <= 4; cul++) {
            dp[2][cul].adunare(dp[1][cul - 1], dp[1][cul + 1]);
        }
        for(int cul = 1; cul <= 5; cul++) {
            dp[1][cul].egal(dp[2][cul]);
        }
    }
    ans.adunare(dp[1][1], dp[1][2]);
    for(int i = 3; i <= 5; i++)
        ans.adunare(ans, dp[1][i]);
    ans.print();
    return 0;
}
```
