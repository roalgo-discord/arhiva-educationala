#include <cmath>
#include <iomanip>
#include <iostream>
using namespace std;

int main() {
    double pi = atan(1) * 4;  // pi in functie de arctg
                              // arctg(1) = π/4

    cout << setprecision(7) << pi << '\n';           // 3.141593
    cout << setprecision(7) << 10 * pi << '\n';      // 31.41593
    cout << fixed << setprecision(7) << pi << '\n';  // 3.1415927
    cout << setprecision(7) << pi * 10 << '\n';      // 31.4159265
    return 0;
}