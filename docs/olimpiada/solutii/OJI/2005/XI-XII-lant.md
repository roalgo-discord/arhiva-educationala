---
id: OJI-2005-XI-XII-lant
title: Soluția problemei lant (OJI 2005, clasele XI-XII)
problem_id: 51
authors: [cerchez]
prerequisites:
    - intro-dp
    - graphs
tags:
    - OJI
    - clasa XI-XII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2005/11-12/lant.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2005/11-12/lant.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2005/11-12/lant.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: ema_nicole (kilonova)
#include <fstream>
#include <set>
#include <vector>

using namespace std;
const int NMAX = 150;

ifstream cin("lant.in");
ofstream cout("lant.out");

int similitudine(string a, string b) {
    int dp[32][32]; /// dp[i][j] - nrmin de schimbari pt a forma primele i ch a le lui a din b
    /// init
    for (int i = 0; i <= a.size(); i++)
        for (int j = 0; j <= b.size(); j++)
            dp[i][j] = 0;
    for (int i = 1; i <= a.size(); i++)
        dp[i][0] = i;
    for (int j = 1; j <= b.size(); j++)
        dp[0][j] = j;

    for (int i = 1; i <= a.size(); i++) {
        for (int j = 1; j <= b.size(); j++) {
            dp[i][j] = min(dp[i][j - 1] + 1, dp[i - 1][j] + 1); /// adaugi / scazi
            if (a[i - 1] == b[j - 1])                           /// ac ch
                dp[i][j] = min(dp[i][j], dp[i - 1][j - 1]);
        }
    }
    return dp[a.size()][b.size()];
}
vector<string> v;
set<string> check;
int dp[NMAX + 2];
bool fin[NMAX + 2]; /// 0--> merge, 1--> e blocat

int main() {
    int k;
    string s;
    cin >> k;
    while (cin >> s) {
        string nou = "";
        for (int i = 0; i < s.size(); i++) {
            if (s[i] == ',' || s[i] == ':' || s[i] == ';' || s[i] == '.' || s[i] == '!' || s[i] == '?' || s[i] == '-') {
                if (nou.size() > 0 && check.find(nou) == check.end()) {
                    check.insert(nou);
                    v.push_back(nou);
                }
                nou = "";
            } else
                nou += s[i];
        }
        if (nou.size() > 0 && check.find(nou) == check.end()) {
            check.insert(nou);
            v.push_back(nou);
        }
    }
    dp[0] = 1;
    for (int j = 1; j < v.size(); j++) { /// j e cuv nou
        for (int i = 0; i < j; i++) {
            if (similitudine(v[i], v[j]) <= k) {
                dp[j] += dp[i];
                fin[i] = 1;
            }
        }
    }
    int ans = 0;
    for (int i = 0; i < v.size(); i++) {
        if (!fin[i])
            ans += dp[i];
    }
    cout << ans;
    return 0;
}
```
