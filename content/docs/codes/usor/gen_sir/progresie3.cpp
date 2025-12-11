#include <fstream>
using namespace std;

ifstream fin("progresie3.in");
ofstream fout("progresie3.out");

int main() {
    int aparitii[1001] = {0};
    int numar;
    while (fin >> numar) {
        aparitii[numar] = 1;
    }

    int ratie = -1;
    int precedent = -1;

    for (int numar = 0; numar <= 1000; numar++) {
        if (aparitii[numar] == 1) {
            if (precedent == -1) {
                precedent = numar;
            } else {
                int delta = numar - precedent;

                if (ratie == -1) {
                    ratie = delta;
                } else if (delta != ratie) {
                    fout << "NU\n";
                    return 0;
                }

                precedent = numar;
            }
        }
    }

    fout << ratie << '\n';
    return 0;
}