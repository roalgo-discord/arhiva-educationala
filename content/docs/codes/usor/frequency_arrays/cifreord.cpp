#include <fstream>
using namespace std;

ifstream fin("cifreord.in");
ofstream fout("cifreord.out");

int main() {
    int n;
    fin >> n;

    int frecventa[10] = {0};

    for (int i = 1; i <= n; i++) {
        int cifra;
        fin >> cifra;

        frecventa[cifra]++;
    }

    int numere_afisate = 0;

    for (int cifra = 0; cifra <= 9; cifra++) {
        while (frecventa[cifra] > 0) {
            fout << cifra << " ";

            numere_afisate++;

            if (numere_afisate == 20) {
                fout << '\n';
                numere_afisate = 0;
            }

            frecventa[cifra]--;
        }
    }

    return 0;
}