#include <fstream>
#include <iostream>

using namespace std;

int main() {
    ifstream in("diagonal.in");
    ofstream out("diagonal.out");

    char mat[100][100];

    int dim = 0;
    while (in >> mat[dim]) {
        dim++;
    }

    // Diagonala principală

    for (int start = dim - 1; start >= 0; start--) {
        int r = start, c = 0;
        while (r < dim && c < dim) {
            out << mat[r][c];
            r++;
            c++;
        }
    }

    for (int start = 1; start < dim; start++) {
        int r = 0, c = start;
        while (r < dim && c < dim) {
            out << mat[r][c];
            r++;
            c++;
        }
    }

    out << '\n';

    // Diagonala secundară

    for (int start = 0; start < dim; start++) {
        int r = 0, c = start;
        while (r < dim && c >= 0) {
            out << mat[r][c];
            r++;
            c--;
        }
    }

    for (int start = 1; start < dim; start++) {
        int r = start, c = dim - 1;
        while (r < dim && c >= 0) {
            out << mat[r][c];
            r++;
            c--;
        }
    }

    return 0;
}