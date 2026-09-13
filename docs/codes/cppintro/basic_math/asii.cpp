#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;

    int sum = a + b;

    int diff = a;
    diff -= b;

    // Pentru ce e mai sus, puteam scrie și:
    //
    //     int diff = a - b;
    //
    // diff -= b înseamnă diff = diff - b;
    //
    // Similar, putem scrie si a /= b, a += b, a *= b

    int prod = a * b;
    int ratio = a / b;

    cout << sum << " " << diff << " " << prod << " " << ratio << '\n';
    return 0;
}