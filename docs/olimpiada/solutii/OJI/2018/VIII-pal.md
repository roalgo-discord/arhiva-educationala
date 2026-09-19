---
id: OJI-2018-VIII-pal
title: Soluția problemei pal (OJI 2018, clasa a VIII-a)
problem_id: 899
authors: [lica]
prerequisites:
    - strings
tags:
    - OJI
    - clasa VIII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2018/08/pal.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2018/08/pal.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2018/08/pal.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
using namespace std;

using ll = long long;
#define pb push_back
#define int ll

const string FILE_NAME = "pal";

string getPal (int num) {
  string str = to_string(num);
  string left = str.substr(0, str.size() / 2);
  char mid = str[str.size() / 2];
  string right = str.substr(str.size() / 2 + 1);

  string revleft = left;
  reverse(revleft.begin(), revleft.end());
  if (revleft >= right) {
    return left + mid + revleft;
  } else {
    left += mid;
    left = to_string(stoll(left) + 1);
    revleft = left;
    revleft.pop_back();
    reverse(revleft.begin(), revleft.end());
    return left + revleft;
  }
}

// 349 9 966
// 349 9 943

signed main () {
  // #ifndef LOCAL
  ifstream cin(FILE_NAME + ".in");
  ofstream cout(FILE_NAME + ".out");
  // #endif

  ios_base::sync_with_stdio(false);
  cin.tie(nullptr);

  int cer, n, num, i, cnt, ans;
  string str;

  cin >> cer >> n;
  vector<int> v;
  map<int, int> freq;
  for (i = 1; i <= n; i++) {
    cin >> num;

    str = getPal(num);
    num = stoll(str);

    freq[num]++;
    v.push_back(num);
  }
  if (cer == 1) {
    for (auto e : v) {
      cout << e << " ";
    }
  } else {
    ans = 0;
    vector<int> vec;
    sort(v.begin(), v.end());
    for (auto e : v) {
      str = to_string(e);
      cnt = 0;
      vector<int> temp;
      while (str.size() != 1) {
        if (freq[stoll(str)]) {
          temp.push_back(stoll(str));
        }
        cnt += freq[stoll(str)];
        str = str.substr(1);
        str.pop_back();
      }
      if (freq[stoll(str)]) {
        temp.push_back(stoll(str));
      }
      cnt += freq[stoll(str)];
      if (cnt >= ans) {
        ans = cnt;
        vec = temp;
      }
    }
    reverse(vec.begin(), vec.end());
    if (cer == 3) {
      for (auto e : vec) {
        cout << e << " ";
      }
    } else {
      cout << ans << "\n";
    }
  }

  return 0;
}
```
