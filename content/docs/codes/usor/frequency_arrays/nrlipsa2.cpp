#include <fstream>
using namespace std;

ifstream fin("nrlipsa2.in");
ofstream fout("nrlipsa2.out");

int main() {
    // 201 = 100 - (-100) + 1
    int frecventa[201] = {0};
    int numar;

    while (fin >> numar) {
        if (numar >= -100 && numar <= 100) {
            frecventa[numar + 100]++;
        }
    }

    bool gasit = false;
    for (int numar = -100; numar <= 100; numar++) {
        if (frecventa[numar + 100] == 0) {
            fout << numar << '\n';
            return 0;
        }
    }

    fout << "nu exista";

    return 0;
}