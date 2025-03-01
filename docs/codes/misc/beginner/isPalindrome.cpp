#include <iostream>

using namespace std;

int main() {
    int t;
    cin >> t;

    for (int i = 1; i <= t; i++) {
        long long n;
        cin >> n;

        long long n_copy = n;
        long long og = 0;
        while (n_copy > 0) {
            int cifra = n_copy % 10;
            n_copy /= 10;
            og = og * 10 + cifra;
        }

        if (og == n) {
            cout << "DA" << '\n';
        } else {
            cout << "NU" << '\n';
        }
    }
    return 0;
}
