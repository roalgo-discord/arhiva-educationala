#include <iostream>

int main() {
    int numar, baza;
    std::cin >> numar >> baza;

    int cifra_maxima = 0;

    while (numar > 0) {
        int cifra = numar % baza;

        cifra_maxima = std::max(cifra, cifra_maxima);

        numar /= baza;
    }

    std::cout << cifra_maxima << "\n";

    return 0;
}
