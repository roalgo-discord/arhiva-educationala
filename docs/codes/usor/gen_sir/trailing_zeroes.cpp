#include <iostream>
using namespace std;

int main() {
    long long numar;
    cin >> numar;

    long long raspuns = 0;
    long long puteri5 = 5;

    while (numar >= puteri5) {
        raspuns += numar / puteri5;
        puteri5 *= 5;
    }

    cout << raspuns << '\n';
    return 0;
}