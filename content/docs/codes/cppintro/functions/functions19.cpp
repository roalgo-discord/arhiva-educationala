#include <fstream>
using namespace std;

int suma_cifre(int numar, int suma = 0) {
    if (numar == 0) {
        return suma;
    }

    return suma_cifre(numar / 10, suma + numar % 10);
}

int main() {
    ifstream fin("div3.in");
    ofstream fout("div3.out");

    int n;
    fin >> n;

    for (int i = 0; i < n; i++) {
        int numar;
        fin >> numar;

        if (suma_cifre(numar) % 3 == 0) {
            fout << numar << " ";
        }
    }
    return 0;
}