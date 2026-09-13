#include <cmath>
#include <iostream>
#include <vector>
using namespace std;

std::vector<bool> primes(65, true);

int main() {
    primes[0] = primes[1] = false;
    for (int i = 2; i <= 64; ++i) {
        if (primes[i]) {
            for (int j = i * i; j <= 64; j += i) {
                primes[j] = false;
            }
        }
    }

    unsigned long long a, b;
    cin >> a >> b;

    int start = (int)log2(a) + 1;
    int stop = (int)log2(b);

    unsigned long long p = 1;
    for (int i = 1; i <= start; i++) {
        p = p * 2;
    }

    unsigned long long nr = 0;

    if (primes[start]) {
        nr += p - a;
    }

    for (int i = start; i < stop; ++i) {
        if (primes[i + 1]) {
            nr += p;
        }
        p *= 2;
    }

    if (primes[stop + 1]) {
        nr += b - p + 1;
    }

    cout << nr << " ";
    return 0;
}
