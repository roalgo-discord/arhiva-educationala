#include <iostream>
using namespace std;

int main() {
    // Declaram variabilele
    int n, a, b;

    // Citim o singură valoare
    cin >> n;

    // Citim două valori separate prin spațiu
    cin >> a >> b;

    /* Alternativ, putem să citim toate cele 3 variabile pe același rând:
    cin >> n >> a >> b;
    */

    // Afișăm o singură valoare
    cout << n;

    // Afișăm două valori separate prin spațiu, urmate de o linie nouă
    cout << a << " " << b << '\n';

    // Afișăm din nou n, urmat de o linie nouă
    cout << n << endl;

    return 0;
}