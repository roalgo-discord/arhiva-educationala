#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;

    if (n == 0) {
        // Caz particular daca n = 0
        // ...
    }

    while (n > 0) {
        int c = n % 10;
        n = n / 10;
    }
    return 0;
}