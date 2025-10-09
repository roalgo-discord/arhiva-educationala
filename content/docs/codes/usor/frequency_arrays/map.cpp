#include <fstream>
#include <iostream>
#include <map>

using namespace std;

ifstream fin("map.in");
ofstream fout("map.out");

map<long long, int> frecventa;

int main() {
    int n;
    fin >> n;

    for (int i = 1; i <= n; ++i) {
        long long valoare;
        fin >> valoare;
        frecventa[valoare]++;

        fout << frecventa[valoare] << " ";
    }

    return 0;
}