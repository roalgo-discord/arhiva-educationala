#include <iostream>
using namespace std;

int main() {
    int dim;
    cin >> dim;

    int frecventa[1000] = {0};
    for (int r = 1; r <= dim; r++) {
        for (int c = 1; c <= dim; c++) {
            int elem;
            cin >> elem;

            // Verificăm dacă este în zona de sud:
            // sub diagonala principală și sub diagonala secundară.
            if (r > c && r + c > dim + 1) {
                frecventa[elem]++;
            }
        }
    }

    for (int i = 0; i < 1000; i++) {
        if (frecventa[i] >= 2) {
            cout << i << " ";
        }
    }

    return 0;
}