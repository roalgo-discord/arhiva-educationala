#include <cmath>
#include <iostream>

using namespace std;

// 10⁻⁹, o valoare reală foarte mică.
double eps = 1e-9;

int main() {
    double a, b;
    cin >> a >> b;

    if (abs(a - b) <= eps) {
        cout << "Egale" << '\n';
    } else {
        cout << "Inegale" << '\n';
    }
    return 0;
}