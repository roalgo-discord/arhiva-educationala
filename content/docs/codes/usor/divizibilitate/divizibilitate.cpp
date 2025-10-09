#include <iostream>
using namespace std;

bool este_prim(int numar) {
    // n == 0 || n == 1
    if (numar <= 1) {
        return false;
    }

    // n == 2 || n == 3
    if (numar <= 3) {
        return true;
    }

    if (numar % 2 == 0 || numar % 3 == 0) {
        return false;
    }

    // Iterăm prin toți divizorii primi, care-s de forma 6k ± 1
    for (int divizor = 5; divizor * divizor <= numar; divizor += 6) {
        if (numar % divizor == 0 || numar % (divizor + 2) == 0) {
            return false;
        }
    }

    return true;
}

int numar_divizori(int numar) {
    int numar_divizori = 0;

    for (int divizor = 1; divizor * divizor <= numar; ++divizor) {
        if (numar % divizor == 0) {
            // Dacă divizor = numar/divizor, atunci înseamnă că avem
            // un singur divizor distinct.
            numar_divizori++;

            if (divizor != numar / divizor) {
                numar_divizori++;
            }
        }
    }
    return numar_divizori;
}

int numar_divizori_primi(int numar) {
    int numar_divizori = 0;

    for (int divizor = 2; divizor * divizor <= numar; ++divizor) {
        if (numar % divizor == 0) {
            numar_divizori++;

            // Eliminăm toți multiplii divizorului, deoarece
            // l-am contorizat deja.

            while (numar % divizor == 0) {
                numar /= divizor;
            }
        }
    }

    if (numar > 1) {
        numar_divizori++;
    }

    return numar_divizori;
}

void afiseaza_divizorii_primi(int numar) {
    for (int divizor = 2; divizor * divizor <= numar; ++divizor) {
        if (numar % divizor == 0) {
            int exponent = 0;

            // Dacă am găsit un divizor, calculăm exponentul său.
            while (numar % divizor == 0) {
                exponent++;
                numar /= divizor;
            }

            cout << divizor << " " << exponent << '\n';
        }
    }

    if (numar > 1) {
        cout << numar << " 1\n";
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int tip, numar;
        cin >> tip >> numar;

        switch (tip) {
        case 1:
            cout << (este_prim(numar) ? "YES" : "NO") << '\n';
            break;
        case 2:
            cout << numar_divizori(numar) << '\n';
            break;
        case 3:
            cout << numar_divizori_primi(numar) << '\n';
            break;
        case 4:
            afiseaza_divizorii_primi(numar);
            break;
        default:
            break;
        }
    }

    return 0;
}