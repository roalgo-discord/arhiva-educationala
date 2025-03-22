#include <iostream>
using namespace std;

int main() {
    int numar;
    cin >> numar;

    // Eroare! Funcția `sum_div` nu este cunoscută în acest moment.
    cout << sum_div(numar) << '\n';
    return 0;
}

long long sum_div(int numar) {
    long long suma = 0;
    for (int divizor = 1; divizor * divizor <= numar; divizor++) {
        if (numar % divizor == 0) {
            suma += divizor;

            if (divizor * divizor != numar) {
                suma += numar / divizor;
            }
        }
    }
    return suma;
}