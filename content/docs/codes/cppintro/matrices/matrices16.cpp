#include <fstream>
using namespace std;

ifstream in("spirala.in");
ofstream fout("spirala.out");

int main() {
    int dim;
    in >> dim;

    int mat[dim + 1][dim + 1];

    // Citirea matricei
    for (int i = 1; i <= dim; i++) {
        for (int j = 1; j <= dim; j++) {
            in >> mat[i][j];
        }
    }

    int N = dim / 2 + dim % 2;

    // Iterăm pentru fiecare zonă concentrică
    for (int r = 1; r <= N; r++) {
        // Dreapta
        for (int c = r; c <= dim - r + 1; c++) {
            fout << mat[r][c] << " ";
        }

        // Jos
        for (int c = r + 1; c <= dim - r + 1; c++) {
            fout << mat[c][dim - r + 1] << " ";
        }

        // Stânga
        for (int c = dim - r; c >= r; c--) {
            fout << mat[dim - r + 1][c] << " ";
        }

        // Dreapta
        for (int c = dim - r; c >= r + 1; c--) {
            fout << mat[c][r] << " ";
        }
    }

    return 0;
}