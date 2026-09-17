---
id: OJI-2002-X-triang
title: Soluția problemei Triang (OJI 2002, clasa a X-a)
problem_id: 709
authors: []
prerequisites:
    - intro-dp
    - intro-combinatorics
tags:
    - OJI
    - clasa X
---

Daca vreti sa ne ajutati cu acest articol, ne puteti gasi pe [github](https://github.com/roalgo-discord/arhiva-educationala) sau pe [serverul nostru de discord](https://discord.gg/vdDRSmg3fC)

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: Andrei_ierdnA (kilonova)
#include <fstream>
#include <vector>

using namespace std;

ifstream f("triang.in");
ofstream g("triang.out");

#define BASE 137LL
#define MOD 1000000007LL

int n, i, j, len;
vector<int> dp[17][17];
bool viz[17][17];
long long catalan[17];

long long getCatalan(int n)
{
    return catalan[n];
}

void pushBackVec(vector<int> &dst, vector<int> &src, long long multi)
{
    multi %= MOD;
    for (unsigned int i = 0; i < src.size(); i++) {
        dst.push_back((src[i] * multi) % MOD);
    }
}

void printVec(vector<int> &src, long long multi)
{
    multi %= MOD;
    for (unsigned int i = 0; i < src.size(); i++) {
        g << ((src[i] * multi) % MOD) << '\n';
    }
}

int getDiag(int i, int j)
{
    if (i > j) {
        swap(i, j);
    }
    return i*BASE + j;
}

void calcDp(int i, int j)
{
    if (viz[i][j]) return;
    if (j-i < n-1) {
        dp[i][j].reserve(getCatalan(j-i-1));
        /// fara diag din i
        calcDp(i+1, j);
        pushBackVec(dp[i][j], dp[i+1][j], getDiag(i+1, j));
        /// ultima diag este i --- j-1
        calcDp(i, j-1);
        pushBackVec(dp[i][j], dp[i][j-1], getDiag(i, j-1));
        /// ultima diag este i --- i+2
        calcDp(i+2, j);
        pushBackVec(dp[i][j], dp[i+2][j], getDiag(i, i+2) * getDiag(i+2, j));
        /// ultima diag este k
        for (int k = i+3; k <= j-2; k++) {
            long long multi = getDiag(i, k) * getDiag(k, j);
            calcDp(i, k);
            calcDp(k, j);
            for (auto x : dp[i][k]) {
                pushBackVec(dp[i][j], dp[k][j], multi * x);
            }
        }
        viz[i][j] = true;
        return;
    }
    /// fara diag din i
    calcDp(i+1, j);
    printVec(dp[i+1][j], getDiag(i+1, j));
    /// ultima diag este i --- j-1
    calcDp(i, j-1);
    printVec(dp[i][j-1], getDiag(i, j-1));
    /// ultima diag este i --- i+2
    calcDp(i+2, j);
    printVec(dp[i+2][j], getDiag(i, i+2) * getDiag(i+2, j));
    /// ultima diag este k
    for (int k = i+3; k <= j-2; k++) {
        long long multi = getDiag(i, k) * getDiag(k, j);
        calcDp(i, k);
        calcDp(k, j);
        for (auto x : dp[i][k]) {
            printVec(dp[k][j], multi * x);
        }
    }
    viz[i][j] = true;
}

int main()
{
    f >> n;
    if (n <= 2) {
        g << 0;
        f.close();
        g.close();
        return 0;
    }
    if (n == 3) {
        g << 1 << '\n' << 1;
        f.close();
        g.close();
        return 0;
    }
    if (n == 4) {
        g << 2 << '\n';
        g << 1 * BASE + 3 << '\n';
        g << 2 * BASE + 4 << '\n';
        f.close();
        g.close();
        return 0;
    }
    catalan[0] = catalan[1] = 1;
    for (i = 2; i <= n; i++) {
        for (j = 0; j < i; j++) {
            catalan[i] = catalan[i] + catalan[j] * catalan[i-j-1];
        }
    }
    for (i = 1; i <= n-2; i++) {
        for (j = i; j <= i+2; j++) {
            dp[i][j].push_back(1);
            viz[i][j] = true;
        }
    }
    for (i = 1; i <= n-3; i++) {
        j = i+3;
        dp[i][j].push_back(i*BASE + (i+2));
        dp[i][j].push_back((i+1)*BASE + (i+3));
        viz[i][j] = true;
    }
    g << getCatalan(n-2) << '\n';
    calcDp(1, n);
    f.close();
    g.close();
    return 0;
}
```
