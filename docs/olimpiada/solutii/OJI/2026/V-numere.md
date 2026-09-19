---
id: OJI-2026-V-numere
title: Soluția problemei numere (OJI 2026, clasa a V-a)
problem_id: 4215
authors: [timplaru]
prerequisites:
    - ad-hoc
tags:
    - OJI
    - clasa V
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2026/05.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2026/05.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2026/05.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
#include <fstream>
#include <vector>
using namespace std;

int main() {
    ifstream fin("numere.in");
    ofstream fout("numere.out");

    int C;
    long long X;
    fin >> C >> X;

    if (C == 1) {
        int unit = X % 10;
        int tens = (X / 10) % 10;
        int num1 = tens * 10 + unit;
        int num2 = unit * 10 + tens;
        fout << (num1 > num2 ? num1 : num2);
    }

    else if (C == 2) {
        int N;
        fin >> N;
        long long val;
        int position = 0;

        for (int i = 1; i <= N; i++) {
            fin >> val;
            if (val == X && position == 0) {
                position = i;
            }
        }
        fout << position;
    }

    else if (C == 3) {
        int N;
        fin >> N;
        long long val;
        int last = 0, second_last = 0;

        for (int i = 1; i <= N; i++) {
            fin >> val;
            if (val == X) {
                second_last = last;
                last = i;
            }
        }

        if (last == 0) {
            fout << "0 0";
        } else if (second_last == 0) {
            fout << "0 " << last;
        } else {
            fout << second_last << " " << last;
        }
    }

    else if (C == 4) {
        vector<int> digits;
        long long temp = X;

        while (temp > 0) {
            digits.push_back(temp % 10);
            temp /= 10;
        }

        int n = digits.size();

        // digits are reversed (units first), so reverse to normal order
        for (int i = 0; i < n / 2; i++) {
            int aux = digits[i];
            digits[i] = digits[n - 1 - i];
            digits[n - 1 - i] = aux;
        }

        vector<int> odd_digits;
        for (int i = 0; i < n; i++) {
            if (digits[i] % 2 == 1) {
                odd_digits.push_back(digits[i]);
            }
        }

        int idx = odd_digits.size() - 1;
        for (int i = 0; i < n; i++) {
            if (digits[i] % 2 == 1) {
                digits[i] = odd_digits[idx--];
            }
        }

        long long result = 0;
        for (int i = 0; i < n; i++) {
            result = result * 10 + digits[i];
        }

        fout << result;
    }
    return 0;
}
```
