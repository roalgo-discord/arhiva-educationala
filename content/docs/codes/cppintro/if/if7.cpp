#include <iostream>
using namespace std;

int main() {
    int s, c, n;
    cin >> s >> c >> n;

    // Combinăm condiția într-o singură valoare
    int condition = (s % n == 0) * 1 + (s % c == 0) * 2;

    /*-----------------------------------*\
    | s % n == 0 | s % c == 0 | condition |
    |------------|------------|-----------|
    | 0          | 0          | 0         |
    | 1          | 0          | 1         |
    | 0          | 1          | 2         |
    | 1          | 1          | 3         |
    \*-----------------------------------*/

    switch (condition) {
    case 3:
        // Dacă ambele condiții sunt îndeplinite
        // (s % n == 0 && s % c == 0)
        cout << "CN" << '\n';
        break;
    case 1:
        // Dacă prima condiție este îndeplinită
        // (s % n == 0)
        cout << "N" << '\n';
        break;
    case 2:
        // Dacă a doua condiție este îndeplinită
        // (s % c == 0)
        cout << "C" << '\n';
        break;
    default:
        // Dacă nicio condiție este îndeplinită
        cout << "nimic" << '\n';
        break;
    }

    return 0;
}