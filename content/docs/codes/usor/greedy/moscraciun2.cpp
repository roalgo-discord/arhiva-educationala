#include <iostream>
#include <vector>
using namespace std;

int main() {
    int numar_copii, numar_magazine;
    cin >> numar_copii >> numar_magazine;

    vector<int> stoc_cadouri(101, 0);

    for (int i = 1; i <= numar_magazine; i++) {
        int pret, cantitate;
        cin >> pret >> cantitate;
        stoc_cadouri[pret] += cantitate;
    }

    int cost_total = 0;
    for (int pret = 0; pret <= 100; pret++) {
        int cadouri_cumparate = min(numar_copii, stoc_cadouri[pret]);

        cost_total += cadouri_cumparate * pret;
        numar_copii -= cadouri_cumparate;

        if (numar_copii == 0) {
            cout << cost_total << '\n';
            return 0;
        }
    }

    cout << "imposibil" << '\n';

    return 0;
}