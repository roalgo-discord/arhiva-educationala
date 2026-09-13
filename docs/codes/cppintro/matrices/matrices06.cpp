#include <iostream>
using namespace std;

int main() {
    // Citirea dimensiunilor matricei
    int randuri, coloane;
    cin >> randuri >> coloane;

    // Declararea matricei
    int mat[randuri][coloane];

    // Citirea elementelor
    for (int r = 0; r < randuri; r++) {
        for (int c = 0; c < coloane; c++) {
            cin >> mat[r][c];
        }
    }

    // Calculul sumei numerelor pare
    int suma = 0;
    for (int r = 0; r < randuri; r++) {
        for (int c = 0; c < coloane; c++) {
            if (mat[r][c] % 2 == 0) {
                suma += mat[r][c];
            }
        }
    }

    // Afișarea rezultatului
    cout << suma << '\n';

    return 0;
}
