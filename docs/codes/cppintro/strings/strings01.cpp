#include <iostream>
using namespace std;

int main() {
    char c = '5';
    cout << (int)c << '\n';          // 53 - ASCII pentru '5'
    cout << (int)(c - '0') << '\n';  // 5  - convertește caracterul '5' în număr

    c = 'P';
    cout << (int)c << '\n';          // 80 - ASCII pentru 'P'
    cout << (int)(c - 'A') << '\n';  // 15 - indexul 'P' în alfabet

    c += 32;                         // 'P' -> 'p'
    cout << (int)c << '\n';          // 112 - ASCII pentru 'p'
    cout << (int)(c - 'a') << '\n';  // 15  - indexul 'p' în alfabetul mic

    c = 'g';
    cout << (int)c << '\n';          // 103 - ASCII pentru 'g'
    cout << (int)(c - 'a') << '\n';  // 6   - indexul 'g' în alfabetul mic

    c -= 32;                         // 'g' -> 'G'
    cout << (int)c << '\n';          // 71  - ASCII pentru 'G'
    cout << (int)(c - 'A') << '\n';  // 6   - indexul 'G' în alfabetul mare

    c = 35;             // caracterul '#'
    cout << c << '\n';  // #

    c = 99;             // caracterul 'c'
    cout << c << '\n';  // c

    return 0;
}