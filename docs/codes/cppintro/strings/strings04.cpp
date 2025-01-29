#include <iostream>
#include <string>
using namespace std;

int main() {
    char s[100];
    cin >> s;

    cout << s << '\n';

    // Sare peste următorul caracter, de obicei spațiu sau newline.
    cin.get();

    // Citește cel mult 100 de caractere, până la newline,
    // dar sare și de acesta.
    cin.getline(s, 100);

    cout << s << '\n';
    return 0;
}