#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;

    int total = 1;

    // Scădem grupele complete
    while (n > total) {
        n -= total;
        total++;
    }

    // Valoarea rămasă
    cout << total - n + 1 << '\n';
    return 0;
}