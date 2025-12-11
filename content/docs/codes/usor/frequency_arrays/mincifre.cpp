#include <fstream>
using namespace std;

ifstream fin("mincifre.in");
ofstream fout("mincifre.out");

int main() {
    char cifra;
    int frecventa[10] = {0};

    // Facem frecvența cifrelor din număr
    while (fin >> cifra) {
        frecventa[cifra - '0']++;
    }

    // Aflăm cea mai mică cifră nenulă
    for (int cifra = 1; cifra <= 9; cifra++) {
        if (frecventa[cifra] > 0) {
            fout << cifra;
            frecventa[cifra]--;
            break;
        }
    }

    // Afișăm cifrele în ordine crescătoare
    for (int cifra = 0; cifra <= 9; cifra++) {
        while (frecventa[cifra] > 0) {
            fout << cifra;
            frecventa[cifra]--;
        }
    }

    return 0;
}