#include <fstream>
#include <vector>
using namespace std;

ifstream fin("numere.in");
ofstream fout("numere.out");

int main() {
    int n;
    fin >> n;

    const int limita = n * n;

    vector<int> frecventa(limita + 1);

    for (int i = 1; i <= limita; i++) {
        int numar;
        fin >> numar;
        frecventa[numar] = 1;
    }

    int primul = 0, ultimul = 0;
    for (int numar = 1; numar <= limita; numar++) {
        if (frecventa[numar] == 0) {
            if (primul == 0) {
                primul = numar;
            }
            ultimul = numar;
        }
    }

    fout << primul << " " << ultimul;
    return 0;
}