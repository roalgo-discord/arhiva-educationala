#include <iostream>

int main() {
    int numar;
    std::cin >> numar;

    int numar_0 = 0, numar_1 = 0;

    while (numar > 0) {
        if (numar % 2 == 0) {
            numar_0++;
        } else {
            numar_1++;
        }

        numar /= 2;
    }

    std::cout << numar_0 << " " << numar_1 << "\n";

    return 0;
}
