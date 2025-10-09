#include <fstream>
using namespace std;

int main() {
    ifstream in("wind.in");
    ofstream out("wind.out");

    int c, n, r, rx, re, cur, x[200005];
    long long so[200005];
    in >> c >> n;
    if (c == 1) {
        r = 1;
        for (int i = 2; i * i <= n; i++) {
            cur = 1;
            while (!(n % i)) {
                cur++;
                n /= i;
            }
            r *= cur;
        }
        if (n > 1) {
            r *= 2;
        }
        out << r - 1;
    }
    if (c == 2) {
        r = -1;
        for (int i = 0; i < n; i++) {
            in >> x[i];
        }
        for (int i = 2; i <= n; i++) {
            if (!(n % i)) {
                long long ec = -(1LL << 60), rec,
                          mi = (1LL << 60);  // (1LL << 60) = 2^60, un numar
                                             // foarte mare
                for (int j = 0; j < n; j += n / i) {
                    so[j / (n / i)] = 0;
                    for (int k = j; k < j + n / i; k++) {
                        so[j / (n / i)] += x[k];
                    }
                }
                for (int j = 0; j < i; j++) {
                    if (so[j] < mi || mi == (1LL << 60)) {
                        mi = so[j];
                    }
                    if (so[j] >= ec || ec == -(1LL << 60)) {
                        ec = so[j];
                        rec = j * (n / i) + 1;
                    }
                }
                if (ec - mi <= r || r == -1) {
                    r = ec - mi;
                    rx = i;
                    re = rec;
                }
            }
        }
        out << rx << " " << re;
    }
}