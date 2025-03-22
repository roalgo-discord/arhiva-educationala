#include <fstream>
using namespace std;

ifstream fin("date.in");
ofstream fout("date.out");

int main() {
    // Declaram variabilele
    int n, a, b;

    // Citim o singură valoare
    fin >> n;

    // Citim două valori separate prin spațiu
    fin >> a >> b;

    /* Alternativ, putem să citim toate cele 3 variabile pe același rând:
    fin >> n >> a >> b;
    */

    // Afișăm o singură valoare
    fout << n;

    // Afișăm două valori separate prin spațiu, urmate de o linie nouă
    fout << a << " " << b << '\n';

    // Afișăm din nou n, urmat de o linie nouă
    fout << n << endl;

    return 0;
}