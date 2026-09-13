#include <iostream>

int main() {
    int numar, b, c;
    std::cin >> numar >> b >> c;

    int valoare_zecimala = 0, putere = 1;

    while (numar > 0) {
        int cifra = numar % 10;
        valoare_zecimala += cifra * putere;
        putere *= b;
        numar /= 10;
    }

    int cifre_c[32];
    int numar_cifre = 0;

    while (valoare_zecimala > 0) {
        int cifra = valoare_zecimala % c;
        cifre_c[numar_cifre++] = cifra;
        valoare_zecimala /= c;
    }

    for (int i = numar_cifre - 1; i >= 0; i--) {
        std::cout << cifre_c[i];
    }
    std::cout << "\n";

    return 0;
}
