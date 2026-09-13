#include <iostream>
using namespace std;

int numar, fib[150];

int main() {
    cin >> numar;

    fib[1] = 1;
    fib[2] = 2;

    int i = 2;
    while (fib[i] <= numar) {
        ++i;
        fib[i] = fib[i - 1] + fib[i - 2];
    }

    // Descompunem numărul n în termeni din șirul Fibonacci
    while (numar > 0) {
        // Căutăm cel mai mare termen mai mic sau egal cu numărul rămas
        while (numar >= fib[i]) {
            cout << fib[i] << " ";

            // Am folosit termenul, îl scădem și mergem la următorul
            numar -= fib[i];
        }

        // Trecem la următorul termen mai mic din Fibonacci
        --i;
    }
    return 0;
}