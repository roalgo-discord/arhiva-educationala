#include <fstream>
using namespace std;

int main() {
    ifstream in("rotire.in");
    ofstream out("rotire.out");

    int randuri, coloane;
    in >> randuri >> coloane;

    int mat[11][11];
    int matRot[11][11];

    for (int r = 1; r <= randuri; r++) {
        for (int c = 1; c <= coloane; c++) {
            in >> mat[r][c];
        }
    }

    for (int r = 1; r <= randuri; r++) {
        for (int c = 1; c <= coloane; c++) {
            matRot[coloane - c + 1][r] = mat[r][c];
        }
    }

    for (int r = 1; r <= coloane; r++) {
        for (int c = 1; c <= randuri; c++) {
            out << matRot[r][c] << " ";
        }
        out << '\n';
    }
    return 0;
}