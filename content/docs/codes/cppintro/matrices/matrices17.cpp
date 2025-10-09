#include <fstream>
using namespace std;

// Dreapta, jos, stânga, sus
int deltaX[4] = {0, 1, 0, -1};
int deltaY[4] = {1, 0, -1, 0};

int main() {
    ifstream in("spirala.in");
    ofstream out("spirala.out");

    int dim;
    in >> dim;

    int mat[dim + 1][dim + 1];
    for (int r = 1; r <= dim; r++) {
        for (int c = 1; c <= dim; c++) {
            in >> mat[r][c];
        }
    }

    // Rândul curent
    int rand = 1;

    // Coloana curentă (pornind din afara matricii)
    int coloana = 0;

    // Direcția curentă (0: dreapta, 1: jos, 2: stânga, 3: sus)
    int directie = 0;

    // Numărul de pași pe care trebuie să îi facem înainte de
    // a schimba direcția
    int pasiRamasi = dim;

    // Numărul de schimbări de direcție rămase pentru acest număr de pași
    int schimbari = 1;

    // Algoritmul de parcurgere în spirală
    while (pasiRamasi > 0) {
        // Mergem în direcția curentă pentru pașii rămași
        for (int pas = 1; pas <= pasiRamasi; pas++) {
            rand += deltaX[directie];
            coloana += deltaY[directie];

            out << mat[rand][coloana] << " ";
        }

        // Schimbăm direcția în sensul acelor de ceasornic
        directie = (directie + 1) % 4;

        // Un set de mutări rămase este gata
        schimbari--;

        // Dacă s-au efectuat două schimbări, reducem numărul de pași rămași
        if (schimbari == 0) {
            schimbari = 2;
            // Reducem dimensiunea spiralei
            pasiRamasi--;
        }
    }

    return 0;
}