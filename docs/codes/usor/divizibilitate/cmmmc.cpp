#include <iostream>
using namespace std;

int cmmdc(int a, int b) {
    while (b > 0) {
        int c = a % b;
        a = b;
        b = c;
    }
    return a;
}

long long cmmmc(int a, int b) { 
    return 1LL * a / cmmdc(a, b) * b; 
}

int main() {
    int t;
    cin >> t;

    while (t--) {
        int a, b;
        cin >> a >> b;

        int gcd = cmmdc(a, b);
        long long lcm = cmmmc(a, b);
        cout << gcd << " " << lcm << '\n';
    }
    return 0;
}