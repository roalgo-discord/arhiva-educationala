#include <iostream>
using namespace std;

int main() {
    int s, c, n;
    cin >> s >> c >> n;

    if (s % n == 0 && s % c == 0) {
        // Dacă ambele condiții sunt îndeplinite
        cout << "CN" << '\n';
    } else {
        if (s % n == 0) {
            // Dacă prima condiție este îndeplinită
            cout << "N" << '\n';
        } else {
            if (s % c == 0) {
                // Dacă a doua condiție este îndeplinită
                cout << "C" << '\n';
            } else {
                // Dacă nicio condiție nu este îndeplinită
                cout << "nimic" << '\n';
            }
        }
    }
    return 0;
}