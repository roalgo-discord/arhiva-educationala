#include <iostream>
using namespace std;

int main() {
    int dim;
    cin >> dim;

    int mat[dim + 1][dim + 1];

    for (int r = 1; r <= dim; r++) {
        for (int c = 1; c <= dim; c++) {
            int sus = r - 1;
            int stanga = c - 1;
            int jos = dim - r;
            int dreapta = dim - c;

            // Determinăm distanța minimă față de margini
            int distanta = sus;
            if (stanga < distanta) {
                distanta = stanga;
            }
            if (jos < distanta) {
                distanta = jos;
            }
            if (dreapta < distanta) {
                distanta = dreapta;
            }

            // Dacă distanța este pară, punem 1, altfel punem 0
            if (distanta % 2 == 0) {
                mat[r][c] = 1;
            } else {
                mat[r][c] = 0;
            }
        }
    }

    for (int r = 1; r <= dim; r++) {
        for (int c = 1; c <= dim; c++) {
            cout << mat[r][c] << " ";
        }
        cout << '\n';
    }

    return 0;
}