#include <iostream>
using namespace std;

int main() {
    // Cel mai mare număr de tip unsigned long long
    unsigned long long huge = 18446744073709551615;

    int n;
    cin >> n;

    for (int i = 0; i < n; i++) {
        unsigned long long nr1, nr2;
        cin >> nr1 >> nr2;

        // Evităm împărțirea la zero
        if (nr2 && nr1 > huge / nr2) {
            cout << "Overflow!" << '\n';
        } else {
            cout << nr1 * nr2 << '\n';
        }
    }

    return 0;
}