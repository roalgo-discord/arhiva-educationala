#include <iostream>
using namespace std;

int main() {
    // Citirea dimensiunii
    int dim;
    cin >> dim;

    int mat[21][21];

    for (int i = 1; i <= dim; i++) {
        // Prima coloană
        mat[i][1] = i;

        // Ultima linie
        mat[dim][i] = dim;
    }

    // De la penultima linie la prima
    for (int r = dim - 1; r >= 1; r--) {
        // De la a doua coloană la ultima
        for (int c = 2; c <= dim; c++) {
            mat[r][c] = mat[r][c - 1] + mat[r + 1][c - 1];
        }
    }

    // Afișare matrice
    for (int i = 1; i <= dim; i++) {
        for (int j = 1; j <= dim; j++) {
            cout << mat[i][j] << " ";
        }
        cout << '\n';
    }

    return 0;
}