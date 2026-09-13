#include <iostream>
using namespace std;

int gcd(int a, int b) {
    while (b > 0) {
        int c = a % b;
        a = b;
        b = c;
    }
    return a;
}
int main() {
    int t;
    cin >> t;
    for (int i = 1; i <= t; i++) {
        int a, b;
        cin >> a >> b;

        int cmmdc = gcd(a, b);
        long long cmmmc = 1LL * a / cmmdc * b;
        cout << cmmdc << " " << cmmmc << '\n';
    }
    return 0;
}
