---
id: OJI-2021-VIII-cartofi
title: Soluția problemei cartofi (OJI 2021, clasa a VIII-a)
problem_id: 936
authors: [boian]
prerequisites:
    - simulating-solution
tags:
    - OJI
    - clasa VIII
---

Puteți citi mai jos editorialul oficial, disponibil și în [repo-ul nostru de GitHub](https://github.com/roalgo-discord/Romanian-Olympiad-Solutions/blob/main/OJI%20%28regional%20olympiad%29/2021/08.pdf).

<div class="editorial-embed">
  <iframe src="https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2021/08.pdf" title="Editorialul oficial" loading="lazy"></iframe>
</div>

[Deschide PDF-ul :material-open-in-new:](https://cdn.jsdelivr.net/gh/roalgo-discord/Romanian-Olympiad-Solutions@main/OJI%20%28regional%20olympiad%29/2021/08.pdf){ .md-button target="_blank" rel="noopener" }

## Rezolvare

Mai jos puteți găsi o soluție neoficială care ia punctajul maxim.

```cpp
// credits: BurloiEmilAndrei (kilonova)
#include <bits/stdc++.h>
#define int ll

using namespace std;

using ll = long long;
#define pb push_back

const string FILE_NAME = "cartofi";
const int PISANO_CYCLE = 60;

int sumCols[PISANO_CYCLE + 5], numCol[PISANO_CYCLE + 5], lastDigitFib[PISANO_CYCLE + 5], spCols[PISANO_CYCLE + 5];

signed main() {
    ifstream cin("cartofi.in");
    ofstream cout("cartofi.out");

    int cer, n, m, i, lin, col, ans, q, a, b, j;

    cin >> cer >> n >> m;
    if (cer == 1) {
        /* according to the Pisano Period if we only take the last digit
         * we could find a cycle of length 60, in which 0 appears 4 times
         */

        int numTerms = n * m;
        int cycleSize = 60, zerosPerCycle = 4;
        int cycleRepeats = numTerms / cycleSize;
        int remainingTerms = numTerms % cycleSize;

        int numZeros = cycleRepeats * zerosPerCycle;

        /* after this we can just simulate, since we will have less
         * than 60 elements + we can simulate only the last digit
         */
        int fib1 = 0;
        int fib2 = 1;
        int fib3;
        for (i = 0; i < remainingTerms; i++) {
            if (fib2 == 0)
                numZeros++;

            fib3 = (fib1 + fib2) % 10;
            fib1 = fib2;
            fib2 = fib3;
        }
        cout << numZeros;
    } else {
        /* calculate the last digit for only the first PISANO_CYCLE elements */
        lastDigitFib[0] = 0;
        lastDigitFib[1] = lastDigitFib[2] = 1;
        for (i = 3; i <= PISANO_CYCLE; i++)
            lastDigitFib[i] = (lastDigitFib[i - 1] + lastDigitFib[i - 2]) % 10;

        /* build the table but only for 60 elements, since they repeat
         * after that
         */

        int numLins = min(n, PISANO_CYCLE), numCols = min(m, PISANO_CYCLE);

        int pos, maxSquareSum = 0;
        for (col = 1; col <= numCols; col++) {
            for (lin = 1; lin <= numLins; lin++) {
                /* for even we go 1 -> M */
                if (lin % 2 == 0)
                    pos = m * lin - col + 1;

                else
                    pos = m * (lin - 1) + col;

                /* check if it went over */
                pos = pos % PISANO_CYCLE;
                if (pos == 0) /* correct the 0 case */
                    pos = PISANO_CYCLE;
                int lastDigit = lastDigitFib[pos];
                numCol[lin] = lastDigit;
                sumCols[col] += lastDigit;
            }

            /* it repeats */
            if (n >= PISANO_CYCLE)
                sumCols[col] *= (n / PISANO_CYCLE);

            /* then we must add the excess */
            if (n > PISANO_CYCLE) {
                int remainingTerms = n % PISANO_CYCLE;
                for (i = 1; i <= remainingTerms; i++)
                    sumCols[col] += numCol[i];
            }

            /* then we compute the maximal square sum ( N * N )*/
            if (col <= n)
                maxSquareSum += sumCols[col];
        }

        if (cer == 2) {
            /* it repeats */
            if (n >= PISANO_CYCLE)
                maxSquareSum *= (n / PISANO_CYCLE);

            /* then we must add the excess */
            if (n > PISANO_CYCLE) {
                int remainingTerms = n % PISANO_CYCLE;
                for (i = 1; i <= remainingTerms; i++)
                    maxSquareSum += sumCols[i];
            }

            ans = maxSquareSum;
            pos = (n % PISANO_CYCLE) + 1;
            /* removing and adding elements to form all possible squares */
            for (i = 1; i <= numCols; i++) {
                /* removing the first one */
                maxSquareSum -= sumCols[i];
                /* adding the last one */
                maxSquareSum += sumCols[pos++];
                /* checking if we went over */
                if (pos > numCols)
                    pos = 1;
                /* updating the answer */
                ans = max(ans, maxSquareSum);
            }

            cout << ans;
        } else {
            cin >> q;
            for (i = 1; i <= numCols; i++)
                spCols[i] = spCols[i - 1] + sumCols[i];
            for (i = 0; i < q; i++) {
                cin >> a >> b;
                int sumB = (b / numCols) * spCols[numCols] + spCols[b % numCols];
                a--;
                int sumA = (a / numCols) * spCols[numCols] + spCols[a % numCols];
                cout << sumB - sumA << '\n';
            }
        }
    }
    return 0;
}
```
