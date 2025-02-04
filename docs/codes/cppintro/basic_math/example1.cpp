#include <iostream>
using namespace std;

int main() {
    int a = 6, b = 8;

    cout << (a--) << '\n';
    cout << (++b) + a << '\n';
    cout << (--a) - (--b) << '\n';
    cout << a << " " << b << '\n';
    return 0;
}