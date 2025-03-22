#include <iostream>

int main() {
    int numar_cifre, baza;
    std::cin >> baza >> numar_cifre;

    int putere = 1;
    for (int i = 0; i < numar_cifre - 1; ++i) {
        putere *= baza;
    }

    int numar_convertit = 0;
    while (numar_cifre--) {
        int cifra;
        std::cin >> cifra;

        numar_convertit += cifra * putere;
        putere /= baza;
    }

    std::cout << numar_convertit << "\n";
}
