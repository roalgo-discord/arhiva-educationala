#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;

    int frecventa[1000] = {0};

    for (int i = 1; i <= n; i++) {
        int numar;
        cin >> numar;

        if (numar >= 100 && numar <= 999) {
            frecventa[numar]++;
        }
    }

    int a = 0, b = 0;

    for (int numar = 999; numar >= 100; numar--) {
        if (frecventa[numar] == 0) {
            if (a == 0) {
                a = numar;
            } else if (b == 0) {
                b = numar;
            }
        }
    }

    if (a == 0 || b == 0) {
        cout << "NU EXISTA";
    } else {
        cout << b << " " << a << '\n';
    }
    return 0;
}