#include <iostream>
using namespace std;

int main() {
    // Automat adaugă '\0' (caracterul nul).
    // Din acest motiv, lungimea lui `c` este dată de lungimea
    // șirului de caractere + 1, pentru '\0'.
    char nume[7] = "roalgo";
    cout << nume << '\n';

    // Creăm un vector de caractere manual. C++ poate determina
    // automat mărimea vectorului, deci nu este nevoie să îl
    // scriem.
    char caractere[] = {'r', 'o', 'a', 'l', 'g', 'o', '\0'};
    cout << caractere << '\n';

    // Putem atribui și un șir de caractere direct, ca la primul
    // exemplu.
    char adevar[] = "roalgo este cel mai bun server de informatica";
    cout << adevar << '\n';

    // Afișează 't'
    cout << adevar[9] << '\n';

    // Afișează 'roalgo'.
    for (int i = 0; i < 6; i++) {
        cout << adevar[i];
    }
    cout << '\n';
    return 0;
}